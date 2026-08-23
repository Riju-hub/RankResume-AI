import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('rankresume_user');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('rankresume_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem('rankresume_token');
      if (storedToken) {
        try {
          const res = await authService.getProfile();
          const userData = res?.user || res?.data?.user || res;
          if (userData && userData.role) {
            setUser(userData);
            localStorage.setItem('rankresume_user', JSON.stringify(userData));
          }
        } catch (err) {
          if (err.response?.status === 401) {
            logout();
          }
        }
      }
      setLoading(false);
    };
    verifyUser();
  }, []);

  const login = (authToken, userData) => {
    localStorage.setItem('rankresume_token', authToken);
    localStorage.setItem('rankresume_user', JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('rankresume_token');
    localStorage.removeItem('rankresume_user');
    setToken(null);
    setUser(null);
  };

  const updateUserState = (newUserData) => {
    const updated = { ...user, ...newUserData };
    setUser(updated);
    localStorage.setItem('rankresume_user', JSON.stringify(updated));
  };

  const deleteAccount = async () => {
    await authService.deleteAccount();
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isRecruiter: user?.role === 'recruiter',
        isCandidate: user?.role === 'candidate',
        login,
        logout,
        updateUserState,
        deleteAccount,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);