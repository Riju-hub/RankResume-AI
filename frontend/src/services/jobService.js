import api from './api';

export const jobService = {
  getAllJobs: async (params = {}) => {
    const res = await api.get('/jobs', { params });
    return res.data;
  },

  getJobById: async (id) => {
    const res = await api.get(`/jobs/${id}`);
    return res.data.job || res.data;
  },

  getRecruiterJobs: async () => {
    const res = await api.get('/jobs/recruiter');
    return res.data.jobs || res.data;
  },

  createJob: async (jobData) => {
    const res = await api.post('/jobs', jobData);
    return res.data.job || res.data;
  },

  updateJob: async (id, jobData) => {
    const res = await api.put(`/jobs/${id}`, jobData);
    return res.data.job || res.data;
  },

  deleteJob: async (id) => {
    const res = await api.delete(`/jobs/${id}`);
    return res.data;
  },

  // Saved Jobs API
  toggleSaveJob: async (jobId) => {
    const res = await api.post(`/jobs/${jobId}/save`);
    return res.data;
  },

  getSavedJobs: async () => {
    const res = await api.get('/jobs/saved/all');
    return res.data;
  },

  // Reviews & Comments API
  getJobReviews: async (jobId) => {
    const res = await api.get(`/jobs/${jobId}/reviews`);
    return res.data;
  },

  addJobReview: async ({ jobId, comment, rating }) => {
    const res = await api.post(`/jobs/${jobId}/reviews`, { comment, rating });
    return res.data;
  },

  updateJobReview: async ({ jobId, reviewId, comment, rating }) => {
    const res = await api.put(`/jobs/${jobId}/reviews/${reviewId}`, { comment, rating });
    return res.data;
  },

  deleteJobReview: async ({ jobId, reviewId }) => {
    const res = await api.delete(`/jobs/${jobId}/reviews/${reviewId}`);
    return res.data;
  },
};