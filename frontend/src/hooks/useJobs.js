// frontend/src/hooks/useJobs.js
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
      queryClient.invalidateQueries({ queryKey: ['recruiter-jobs'] });
    },
  });

  const updateJobMutation = useMutation({
    mutationFn: ({ id, jobData }) => jobService.updateJob(id, jobData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['recruiter-jobs'] });
      queryClient.invalidateQueries({ queryKey: ['job', id] });
    },
  });

  const deleteJobMutation = useMutation({
    mutationFn: (id) => jobService.deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['recruiter-jobs'] });
    },
  });

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

// Dedicated hook for the Logged-In Recruiter's Dashboard
export const useRecruiterJobs = () => {
  const queryClient = useQueryClient();

  const recruiterQuery = useQuery({
    queryKey: ['recruiter-jobs'],
    queryFn: () => jobService.getRecruiterJobs(),
  });

  const updateJobMutation = useMutation({
    mutationFn: ({ id, jobData }) => jobService.updateJob(id, jobData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['recruiter-jobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['job', id] });
    },
  });

  const deleteJobMutation = useMutation({
    mutationFn: (id) => jobService.deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recruiter-jobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  const rawData = recruiterQuery.data;
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
    isLoading: recruiterQuery.isLoading,
    isError: recruiterQuery.isError,
    error: recruiterQuery.error,
    refetchRecruiterJobs: recruiterQuery.refetch,
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

export const useJobReviews = (jobId) => {
  const queryClient = useQueryClient();

  const reviewsQuery = useQuery({
    queryKey: ['job-reviews', jobId],
    queryFn: () => jobService.getJobReviews(jobId),
    enabled: !!jobId,
  });

  const addReviewMutation = useMutation({
    mutationFn: ({ comment, rating }) =>
      jobService.addJobReview({ jobId, comment, rating }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-reviews', jobId] });
    },
  });

  const updateReviewMutation = useMutation({
    mutationFn: ({ reviewId, comment, rating }) =>
      jobService.updateJobReview({ jobId, reviewId, comment, rating }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-reviews', jobId] });
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (reviewId) =>
      jobService.deleteJobReview({ jobId, reviewId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-reviews', jobId] });
    },
  });

  return {
    reviews: reviewsQuery.data?.reviews || [],
    totalReviews: reviewsQuery.data?.count || 0,
    averageRating: reviewsQuery.data?.averageRating || 5,
    isLoading: reviewsQuery.isLoading,
    isSubmitting: addReviewMutation.isPending,
    isUpdatingReview: updateReviewMutation.isPending,
    isDeleting: deleteReviewMutation.isPending,
    addReview: addReviewMutation.mutateAsync,
    updateReview: updateReviewMutation.mutateAsync,
    deleteReview: deleteReviewMutation.mutateAsync,
  };
};