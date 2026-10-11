import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobService } from '../services/jobService';

export const useSavedJobs = () => {
  const queryClient = useQueryClient();

  const savedJobsQuery = useQuery({
    queryKey: ['saved-jobs'],
    queryFn: () => jobService.getSavedJobs(),
  });

  const toggleSaveMutation = useMutation({
    mutationFn: (jobId) => jobService.toggleSaveJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-jobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  const savedJobsList = savedJobsQuery.data?.savedJobs || [];
  const savedJobIds = new Set(
    savedJobsList.map((job) => (typeof job === 'string' ? job : job._id))
  );

  return {
    savedJobs: savedJobsList,
    totalSaved: savedJobsList.length,
    isLoading: savedJobsQuery.isLoading,
    isError: savedJobsQuery.isError,
    refetchSavedJobs: savedJobsQuery.refetch,
    toggleSave: toggleSaveMutation.mutateAsync,
    isToggling: toggleSaveMutation.isPending,
    isJobSaved: (jobId) => savedJobIds.has(jobId),
  };
};