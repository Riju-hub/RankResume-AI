// import { useMutation } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
// import { authService } from '../services/authService';
// import { useAuthContext } from '../context/AuthContext';

// export const useAuth = () => {
//   const navigate = useNavigate();
//   const { login, logout, user, isAuthenticated, isRecruiter, isCandidate } = useAuthContext();

//   const loginMutation = useMutation({
//     mutationFn: (credentials) => authService.login(credentials),
//     onSuccess: (data) => {
//       login(data.token, data.user);
//       if (data.user.role === 'recruiter') {
//         navigate('/recruiter/dashboard');
//       } else {
//         navigate('/jobs');
//       }
//     },
//   });

//   const registerMutation = useMutation({
//     mutationFn: (userData) => authService.register(userData),
//     onSuccess: (data) => {
//       login(data.token, data.user);
//       if (data.user.role === 'recruiter') {
//         navigate('/recruiter/dashboard');
//       } else {
//         navigate('/jobs');
//       }
//     },
//   });

//   return {
//     user,
//     isAuthenticated,
//     isRecruiter,
//     isCandidate,
//     logout,
//     login: loginMutation.mutateAsync,
//     isLoggingIn: loginMutation.isPending,
//     loginError: loginMutation.error?.response?.data?.message || loginMutation.error?.message,
//     register: registerMutation.mutateAsync,
//     isRegistering: registerMutation.isPending,
//     registerError: registerMutation.error?.response?.data?.message || registerMutation.error?.message,
//   };
// };









import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const navigate = useNavigate();
  const { login, logout, user, isAuthenticated, isRecruiter, isCandidate } = useAuthContext();

  const loginMutation = useMutation({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: (data) => {
      // Handles both { token, user } and nested { token, data: user }
      const token = data?.token || data?.data?.token;
      const userData = data?.user || data?.data?.user || data?.data;

      if (token && userData) {
        login(token, userData);
        if (userData.role === 'recruiter') {
          navigate('/recruiter/dashboard', { replace: true });
        } else {
          navigate('/jobs', { replace: true });
        }
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: (userData) => authService.register(userData),
    onSuccess: (data) => {
      const token = data?.token || data?.data?.token;
      const userData = data?.user || data?.data?.user || data?.data;

      if (token && userData) {
        login(token, userData);
        if (userData.role === 'recruiter') {
          navigate('/recruiter/dashboard', { replace: true });
        } else {
          navigate('/jobs', { replace: true });
        }
      }
    },
  });

  return {
    user,
    isAuthenticated,
    isRecruiter,
    isCandidate,
    logout,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error?.response?.data?.message || loginMutation.error?.message,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error?.response?.data?.message || registerMutation.error?.message,
  };
};