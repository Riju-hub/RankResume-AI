import React, { useState, useMemo } from 'react';
import { useJobs } from '../../hooks/useJobs';
import ApplyJobModal from './ApplyJobModal';
import JobCard from '../../components/jobs/JobCard';
import JobFilter from '../../components/jobs/JobFilter';
import { 
  Sparkles, 
  Loader2, 
  AlertCircle, 
  SearchX, 
  Briefcase,
  Layers,
  RefreshCw
} from 'lucide-react';

const JobBoard = () => {
  const { jobs = [], isLoading, isError, refetch } = useJobs();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('All');
    setTypeFilter('All');
  };

  const departments = useMemo(() => {
    return Array.from(new Set(jobs.map((j) => j.department).filter(Boolean)));
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        job.title?.toLowerCase().includes(term) ||
        job.description?.toLowerCase().includes(term) ||
        job.skillsRequired?.some((s) => s.toLowerCase().includes(term));

      const matchesDept = departmentFilter === 'All' || job.department === departmentFilter;
      const matchesType = typeFilter === 'All' || job.jobType === typeFilter;
      const isNotClosed = job.status !== 'closed';

      return matchesSearch && matchesDept && matchesType && isNotClosed;
    });
  }, [jobs, searchTerm, departmentFilter, typeFilter]);

  // Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-[450px] w-full flex-col items-center justify-center gap-3">
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-xl backdrop-blur-md">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
        </div>
        <p className="text-xs font-medium text-zinc-400">Loading open positions...</p>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="flex min-h-[350px] w-full flex-col items-center justify-center rounded-3xl border border-rose-500/20 bg-rose-500/5 p-8 text-center backdrop-blur-xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-400">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-zinc-200">Failed to load positions</h3>
        <p className="mt-1 max-w-sm text-xs text-zinc-400">
          We encountered an issue retrieving the job openings. Please check your connection and try again.
        </p>
        {refetch && (
          <button
            onClick={() => refetch()}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-200 transition hover:border-zinc-700 hover:bg-zinc-800"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* SaaS Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900/90 via-zinc-950/80 to-zinc-950 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-black/20">
        {/* Ambient Top Glow Flare */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-0.5 text-[11px] font-semibold text-indigo-300">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              Automated Resume Matching
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
              Explore Open Positions
            </h1>
            <p className="text-xs leading-relaxed text-zinc-400 sm:text-sm">
              Submit your resume to get instant semantic match scoring powered by Gemini ATS.
            </p>
          </div>

          {/* Quick Metrics Badge Strip */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 px-4 py-2.5 backdrop-blur-md">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Available</span>
              <p className="font-mono text-base font-bold text-zinc-100">{jobs.length} Roles</p>
            </div>
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 px-4 py-2.5 backdrop-blur-md">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Departments</span>
              <p className="font-mono text-base font-bold text-indigo-400">{departments.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Control Bar */}
      <JobFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        department={departmentFilter}
        onDepartmentChange={setDepartmentFilter}
        jobType={typeFilter}
        onJobTypeChange={setTypeFilter}
        departments={departments}
        onReset={handleResetFilters}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between px-1 text-xs text-zinc-400">
        <span className="font-medium">
          Showing <span className="font-semibold text-zinc-200">{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'position' : 'positions'}
        </span>
      </div>

      {/* Job Cards Listing */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-800/80 bg-zinc-900/20 p-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-500">
              <SearchX className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-zinc-200">No matching positions</h3>
            <p className="mt-1 text-xs text-zinc-500 max-w-sm">
              We couldn't find any job postings matching your current search criteria or filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-medium text-indigo-400 transition hover:bg-zinc-800 hover:text-indigo-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              isRecruiter={false}
              onApply={handleApplyClick}
            />
          ))
        )}
      </div>

      {/* Apply Modal Integration */}
      <ApplyJobModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedJob(null);
        }}
      />
    </div>
  );
};

export default JobBoard;