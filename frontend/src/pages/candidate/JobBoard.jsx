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
  RefreshCw,
  Cpu,
  Target
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
      <div className="flex min-h-[450px] w-full flex-col items-center justify-center gap-3 font-sans">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-md">
          <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
        </div>
        <p className="font-mono text-xs font-semibold text-slate-400">
          Syncing open vector positions...
        </p>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="flex min-h-[350px] w-full flex-col items-center justify-center rounded-3xl border border-rose-500/30 bg-rose-950/20 p-8 text-center backdrop-blur-xl font-sans">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-500/40 bg-rose-950/50 text-rose-400 shadow-lg shadow-rose-500/10">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-base font-bold text-slate-100">Failed to load positions</h3>
        <p className="mt-1 max-w-sm text-xs text-slate-400 leading-relaxed">
          We encountered an issue retrieving available listings. Please check your network and retry.
        </p>
        {refetch && (
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2 text-xs font-bold text-slate-200 transition hover:border-slate-700 hover:bg-slate-800 active:scale-95 cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry Query
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      
      {/* ========================================================================= */}
      {/* --- SaaS Hero Header Banner --- */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        
        {/* Hardware-Accelerated Ambient Glows */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-600/15 blur-3xl transform-gpu will-change-transform" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-pink-600/15 blur-3xl transform-gpu will-change-transform" />
        <div className="pointer-events-none absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Gemini 2.5 Multi-Modal Matching</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
              Explore Active <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">Positions</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Upload your CV to compute instant <span className="text-cyan-400 font-semibold">vector match scores</span> and bypass standard ATS keyword filters.
            </p>
          </div>

          {/* Quick Metrics Badge Strip */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="rounded-2xl border border-slate-800/90 bg-slate-950/60 px-4 py-3 shadow-inner">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                <Briefcase className="h-3 w-3 text-cyan-400" /> Roles
              </div>
              <p className="font-mono text-lg font-black text-white mt-0.5">{jobs.length}</p>
            </div>

            <div className="rounded-2xl border border-slate-800/90 bg-slate-950/60 px-4 py-3 shadow-inner">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                <Layers className="h-3 w-3 text-pink-400" /> Departments
              </div>
              <p className="font-mono text-lg font-black text-pink-400 mt-0.5">{departments.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* --- Filter Control Bar --- */}
      {/* ========================================================================= */}
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

      {/* ========================================================================= */}
      {/* --- Results Status Line --- */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between px-1 text-xs">
        <span className="font-medium text-slate-400">
          Showing <span className="font-mono font-bold text-cyan-400">{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'position' : 'positions'}
        </span>
        
        {searchTerm || departmentFilter !== 'All' || typeFilter !== 'All' ? (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-xs font-semibold text-pink-400 transition hover:text-pink-300 hover:underline cursor-pointer"
          >
            Clear active filters
          </button>
        ) : null}
      </div>

      {/* ========================================================================= */}
      {/* --- Job Cards Listing --- */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 p-8 text-center backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-500 shadow-md">
              <SearchX className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-white">No matching positions found</h3>
            <p className="mt-1 text-xs text-slate-400 max-w-sm leading-relaxed">
              We could not find any active postings matching your exact search parameters or filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-bold text-cyan-400 transition-all hover:bg-slate-800 hover:text-cyan-300 active:scale-95 cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reset All Filters
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

      {/* ========================================================================= */}
      {/* --- Apply Modal Integration --- */}
      {/* ========================================================================= */}
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