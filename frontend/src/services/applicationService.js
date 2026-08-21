import api from './api';

export const applicationService = {
  applyToJob: async (jobId, formData) => {
    const res = await api.post(`/applications/apply/${jobId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
  getJobApplications: async (jobId) => {
    const res = await api.get(`/applications/job/${jobId}`);
    return res.data;
  },
  getMyApplications: async () => {
    const res = await api.get('/applications/my-applications');
    return res.data;
  },
  updateStatus: async (applicationId, status) => {
    const res = await api.patch(`/applications/${applicationId}/status`, { status });
    return res.data;
  },
};