import api from './api';

export const jobService = {
  getAllJobs: async (params = {}) => {
    const res = await api.get('/jobs', { params });
    return res.data;
  },
  getJobById: async (id) => {
    const res = await api.get(`/jobs/${id}`);
    return res.data;
  },
  createJob: async (data) => {
    const res = await api.post('/jobs', data);
    return res.data;
  },
  updateJob: async (id, data) => {
    const res = await api.put(`/jobs/${id}`, data);
    return res.data;
  },
  deleteJob: async (id) => {
    const res = await api.delete(`/jobs/${id}`);
    return res.data;
  },
};