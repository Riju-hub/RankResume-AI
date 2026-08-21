import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../../hooks/useJobs';
import { 
  Briefcase, 
  Users, 
  PlusCircle, 
  TrendingUp, 
  ArrowRight, 
  Clock, 
  MapPin,
  Building2,
  Loader2,
  Sparkles,
  Kanban,
  AlertCircle,
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const Dashboard = () => {
  const { jobs = [], isLoading, error } = useJobs();

  const activeJobs = useMemo(
    () => jobs.filter((job) => job.status !== 'closed'),
    [jobs]
  );

  const totalApplicants = useMemo(
    () => jobs.reduce((acc, curr) => acc + (curr.applicantCount || 0), 0),
    [jobs]
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[450px] w-full flex-col items-center justify-center gap-3">
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-xl backdrop-blur-md">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
        </div>
        <p className="text-xs font-medium text-zinc-400">Loading recruiter telemetry...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[350px] w-full flex-col items-center justify-center rounded-3xl border border-rose-500/20 bg-rose-500/5 p-8 text-center backdrop-blur-xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-400">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-zinc-200">Failed to load dashboard</h3>
        <p className="mt-1 max-w-sm text-xs text-zinc-400">
          We encountered an issue fetching your recruitment pipeline. Please refresh the page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* SaaS Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900/90 via-zinc-950/80 to-zinc-950 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-black/20">
        {/* Ambient Top Lighting Flare */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

        <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-300">
              <ShieldCheck className="h-3 w-3 text-indigo-400" />
              Recruiter Command Center
            </div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
              Recruiter Dashboard
            </h1>
            <p className="text-xs leading-relaxed text-zinc-400 sm:text-sm">
              Manage candidate pipelines, review AI semantic scores, and configure job openings.
            </p>
          </div>

          <Link
            to="/recruiter/create-job"
            className="group inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-xs font-medium text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:from-indigo-500 hover:to-violet-500 active:scale-95 self-start sm:self-auto shrink-0"
          >
            <PlusCircle className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
            <span>Create New Job</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Active Openings Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-xl transition-all duration-200 hover:border-zinc-700/80 hover:bg-zinc-900/60">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Active Job Posts
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
              <Briefcase className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-bold tracking-tight text-zinc-100">
              {activeJobs.length}
            </span>
            <span className="text-xs text-zinc-400">of {jobs.length} total</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-zinc-400 border-t border-zinc-800/60 pt-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>Live & accepting resumes</span>
          </div>
        </div>

        {/* Total Applicants Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-xl transition-all duration-200 hover:border-zinc-700/80 hover:bg-zinc-900/60">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Total Candidates
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/10 text-sky-400">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-bold tracking-tight text-zinc-100">
              {totalApplicants}
            </span>
            <span className="text-xs text-zinc-400">resumes</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-zinc-400 border-t border-zinc-800/60 pt-2.5">
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            <span>Extracted via Gemini ATS</span>
          </div>
        </div>

        {/* Quality Semantic Fit Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-xl transition-all duration-200 hover:border-zinc-700/80 hover:bg-zinc-900/60">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Avg Match Quality
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-bold tracking-tight text-emerald-400">
              78%
            </span>
            <span className="text-xs text-emerald-400/80 font-medium">Strong Fit</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-zinc-400 border-t border-zinc-800/60 pt-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Semantic keyword alignment</span>
          </div>
        </div>
      </div>

      {/* Posted Jobs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
            Active Job Openings & Pipelines
          </h2>
          <span className="text-xs text-zinc-400">
            {jobs.length} {jobs.length === 1 ? 'Opening' : 'Openings'}
          </span>
        </div>

        {jobs.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-800/80 bg-zinc-900/20 p-8 text-center backdrop-blur-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-500">
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-zinc-200">No jobs posted yet</h3>
            <p className="mt-1 max-w-sm text-xs text-zinc-400">
              Get started by creating your first job opening to start receiving and scoring resumes.
            </p>
            <Link
              to="/recruiter/create-job"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-indigo-500"
            >
              <PlusCircle className="h-4 w-4" />
              Create Job
            </Link>
          </div>
        ) : (
          <div className="space-y-3.5">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="group relative flex flex-col justify-between gap-5 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-xl transition-all duration-200 hover:border-zinc-700/80 hover:bg-zinc-900/60 hover:shadow-xl hover:shadow-black/20 lg:flex-row lg:items-center"
              >
                {/* Job Metadata Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-base font-semibold text-zinc-100 transition-colors group-hover:text-indigo-300">
                      {job.title}
                    </h3>
                    <span className="inline-flex items-center rounded-md border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-[11px] font-medium text-indigo-400">
                      {job.jobType || 'Full-time'}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[11px] font-medium text-zinc-400">
                      <Layers className="h-2.5 w-2.5 text-zinc-400" />
                      {job.department || 'Engineering'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                      {job.location || 'Remote'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-zinc-500" />
                      Posted {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Pipeline & Candidate Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center shrink-0 border-t border-zinc-800/60 pt-3 lg:border-none lg:pt-0">
                  {/* Kanban Swimlane Link */}
                  <Link
                    to={`/recruiter/jobs/${job._id}/pipeline`}
                    className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3.5 text-xs font-medium text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 active:scale-95"
                  >
                    <Kanban className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Kanban Pipeline</span>
                  </Link>

                  {/* Ranked Candidates Link */}
                  <Link
                    to={`/recruiter/jobs/${job._id}/applicants`}
                    className="group/btn inline-flex h-9 items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 text-xs font-medium text-white shadow-md shadow-indigo-500/20 transition-all hover:from-indigo-500 hover:to-violet-500 active:scale-95"
                  >
                    <span>Candidates ({job.applicantCount || 0})</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover/btn:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;