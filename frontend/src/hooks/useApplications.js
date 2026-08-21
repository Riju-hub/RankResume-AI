import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { applicationService } from '../services/applicationService';

export const useApplications = (jobId = null) => {
  const queryClient = useQueryClient();

  // Fetch applicants for a specific job (for recruiter Kanban & ranking view)
  const jobApplicantsQuery = useQuery({
    queryKey: ['applications', 'job', jobId],
    queryFn: () => applicationService.getJobApplications(jobId),
    enabled: !!jobId,
  });

  // Fetch applications submitted by the logged-in candidate
  const myApplicationsQuery = useQuery({
    queryKey: ['applications', 'me'],
    queryFn: () => applicationService.getMyApplications(),
  });

  // Apply to a job (uploading PDF resume & metadata)
  const applyMutation = useMutation({
    mutationFn: ({ targetJobId, formData }) => applicationService.applyToJob(targetJobId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications', 'me'] });
    },
  });

  // Update candidate pipeline stage (Applied -> Screening -> Interview -> Offered -> Rejected)
  const updateStatusMutation = useMutation({
    mutationFn: ({ applicationId, status }) =>
      applicationService.updateStatus(applicationId, status),
    onSuccess: () => {
      if (jobId) {
        queryClient.invalidateQueries({ queryKey: ['applications', 'job', jobId] });
      }
    },
  });

  return {
    applicants: jobApplicantsQuery.data?.applications || [],
    isApplicantsLoading: jobApplicantsQuery.isLoading,
    myApplications: myApplicationsQuery.data?.applications || [],
    isMyApplicationsLoading: myApplicationsQuery.isLoading,
    applyToJob: applyMutation.mutateAsync,
    isApplying: applyMutation.isPending,
    applyError: applyMutation.error?.response?.data?.message || applyMutation.error?.message,
    updateStatus: updateStatusMutation.mutateAsync,
    isUpdatingStatus: updateStatusMutation.isPending,
  };
};