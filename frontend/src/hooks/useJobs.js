import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobService } from '../services/jobService';

export const useJobs = (filters = {}) => {
  const queryClient = useQueryClient();

  const jobsQuery = useQuery({
    queryKey: ['jobs', filters],
    queryFn: () => jobService.getAllJobs(filters),
  });

  const createJobMutation = useMutation({
    mutationFn: (jobData) => jobService.createJob(jobData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  const updateJobMutation = useMutation({
    mutationFn: ({ id, jobData }) => jobService.updateJob(id, jobData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['job', id] });
    },
  });

  const deleteJobMutation = useMutation({
    mutationFn: (id) => jobService.deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  // Safely parse array regardless of response shape
  const rawData = jobsQuery.data;
  let jobList = [];
  if (Array.isArray(rawData)) {
    jobList = rawData;
  } else if (Array.isArray(rawData?.jobs)) {
    jobList = rawData.jobs;
  } else if (Array.isArray(rawData?.data)) {
    jobList = rawData.data;
  }

  return {
    jobs: jobList,
    totalJobs: jobList.length,
    isLoading: jobsQuery.isLoading,
    isError: jobsQuery.isError,
    error: jobsQuery.error,
    refetchJobs: jobsQuery.refetch,
    createJob: createJobMutation.mutateAsync,
    isCreating: createJobMutation.isPending,
    updateJob: updateJobMutation.mutateAsync,
    isUpdating: updateJobMutation.isPending,
    deleteJob: deleteJobMutation.mutateAsync,
    isDeleting: deleteJobMutation.isPending,
  };
};

export const useJobDetails = (jobId) => {
  return useQuery({
    queryKey: ['job', jobId],
    queryFn: () => jobService.getJobById(jobId),
    enabled: !!jobId,
  });
};