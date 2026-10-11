import api from './api';

export const authService = {
  login: async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  },

  register: async (userData) => {
    const res = await api.post('/auth/register', userData);
    return res.data;
  },

  forgotPassword: async (email) => {
    const res = await api.post('/auth/forgot-password', { email });
    return res.data;
  },

  resetPassword: async (token, password) => {
    const res = await api.post(`/auth/reset-password/${token}`, { password });
    return res.data;
  },

  getProfile: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  },

  updateProfile: async (payload) => {
    const res = await api.put('/auth/profile', payload);
    return res.data;
  },
  
  deleteAccount: async () => {
    const res = await api.delete('/auth/account');
    return res.data;
  },
};