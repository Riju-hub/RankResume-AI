import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ShieldCheck,
  Zap,
  Target,
  Activity,
  ChevronRight,
} from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.055,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: EASE },
  },
};

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
    return Array.from(
      new Set(jobs.map((j) => j.department).filter(Boolean))
    );
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return jobs.filter((job) => {
      const matchesSearch =
        !term ||
        job.title?.toLowerCase().includes(term) ||
        job.description?.toLowerCase().includes(term) ||
        job.skillsRequired?.some((s) =>
          s.toLowerCase().includes(term)
        );

      const matchesDept =
        departmentFilter === 'All' ||
        job.department === departmentFilter;

      const matchesType =
        typeFilter === 'All' ||
        job.jobType === typeFilter;

      const isNotClosed = job.status !== 'closed';

      return matchesSearch && matchesDept && matchesType && isNotClosed;
    });
  }, [jobs, searchTerm, departmentFilter, typeFilter]);

  const hasActiveFilters =
    Boolean(searchTerm) ||
    departmentFilter !== 'All' ||
    typeFilter !== 'All';

  if (isLoading) {
    return (
      <div className="relative flex min-h-[520px] w-full items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-white via-blue-50/50 to-pink-50/50 font-sans">
        <div className="pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full bg-blue-500/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-pink-500/15 blur-[110px]" />

        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-white bg-white/85 shadow-[0_18px_45px_rgba(37,99,235,0.14)] backdrop-blur-xl">
            <div className="absolute inset-0 rounded-[1.4rem] bg-gradient-to-br from-blue-500/10 to-pink-500/10" />
            <Loader2 className="relative h-7 w-7 animate-spin text-blue-600 stroke-[2.3]" />
          </div>
          <div>
            <p className="font-mono text-xs font-black text-slate-800">
              Syncing open positions...
            </p>
            <p className="mt-1 text-[10px] font-semibold text-slate-500">
              Loading AI-ranked opportunities
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative flex min-h-[380px] w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-rose-200/80 bg-white/90 p-8 text-center font-sans shadow-[0_20px_55px_rgba(244,63,94,0.08)] backdrop-blur-xl"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-rose-500/10 blur-3xl" />

        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-600 shadow-sm">
          <AlertCircle className="h-7 w-7 stroke-[2.4]" />
        </div>

        <h3 className="mt-5 text-base font-black text-slate-950">
          Failed to load positions
        </h3>

        <p className="mt-2 max-w-sm text-xs font-semibold leading-6 text-slate-600">
          We encountered an issue retrieving available listings. Please check
          your connection and retry.
        </p>

        {refetch && (
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-xs font-extrabold text-slate-800 shadow-sm transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-pink-300 hover:text-pink-600 hover:shadow-md active:translate-y-0"
          >
            <RefreshCw className="h-3.5 w-3.5 stroke-[2.5]" />
            Retry Query
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes rrBoardSpectrum {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes rrBoardFloatA {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(18px, -18px, 0) scale(1.04);
          }
        }

        @keyframes rrBoardFloatB {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-18px, 18px, 0) scale(1.05);
          }
        }

        @keyframes rrBoardPulse {
          0%, 100% { opacity: .45; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @keyframes rrBoardShine {
          0% { transform: translateX(-130%); }
          100% { transform: translateX(170%); }
        }

        .rr-board-spectrum {
          background-size: 220% 100%;
          animation: rrBoardSpectrum 7s ease-in-out infinite;
          will-change: background-position;
        }

        .rr-board-float-a {
          animation: rrBoardFloatA 10s ease-in-out infinite;
          will-change: transform;
        }

        .rr-board-float-b {
          animation: rrBoardFloatB 12s ease-in-out infinite;
          will-change: transform;
        }

        .rr-board-pulse {
          animation: rrBoardPulse 2.8s ease-in-out infinite;
          will-change: transform, opacity;
        }

        .rr-board-shine {
          animation: rrBoardShine 3s ease-in-out infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .rr-board-spectrum,
          .rr-board-float-a,
          .rr-board-float-b,
          .rr-board-pulse,
          .rr-board-shine {
            animation: none !important;
          }
        }
      `}</style>

      <main className="relative isolate min-h-screen overflow-hidden font-sans antialiased text-slate-900">
        {/* Premium lightweight background */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-pink-50/35">
          <div className="rr-board-float-a absolute -left-40 -top-36 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[115px] transform-gpu" />
          <div className="rr-board-float-b absolute -right-40 top-[30%] h-[520px] w-[520px] rounded-full bg-pink-500/10 blur-[125px] transform-gpu" />
          <div className="absolute bottom-[-220px] left-[35%] h-[420px] w-[420px] rounded-full bg-violet-500/8 blur-[110px]" />

          <div
            className="absolute inset-0 opacity-[0.25]"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(59,130,246,0.15) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              maskImage:
                'linear-gradient(to bottom, black 0%, transparent 80%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 0%, transparent 80%)',
            }}
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-7xl space-y-6"
        >
          {/* Hero */}
          <motion.section
            variants={itemVariants}
            className="group relative overflow-hidden rounded-[2rem] border border-white/90 bg-white/75 p-6 shadow-[0_24px_70px_rgba(37,99,235,0.10),0_10px_35px_rgba(236,72,153,0.07)] backdrop-blur-2xl sm:p-8"
          >
            <div className="rr-board-spectrum absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-600 via-violet-500 to-pink-500" />

            <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-gradient-to-br from-pink-500/20 via-violet-500/10 to-transparent blur-3xl transform-gpu" />
            <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-blue-500/20 via-cyan-400/10 to-transparent blur-3xl transform-gpu" />

            <div className="relative z-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700 shadow-sm backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-pink-600" />
                  Gemini 2.5 Multi-Modal Matching
                  <span className="rr-board-pulse ml-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>

                <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                  Explore Active{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
                    Positions
                  </span>
                </h1>

                <p className="mt-3 max-w-2xl text-xs font-semibold leading-6 text-slate-600 sm:text-sm">
                  Upload your CV to compute instant{' '}
                  <span className="font-extrabold text-blue-700 underline decoration-blue-300 underline-offset-4">
                    vector match scores
                  </span>{' '}
                  and bypass standard ATS keyword filters.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/70 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-blue-700">
                    <Target className="h-3 w-3" />
                    Semantic matching
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-pink-200 bg-pink-50/70 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-pink-700">
                    <Zap className="h-3 w-3" />
                    Instant scoring
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50/70 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-emerald-700">
                    <ShieldCheck className="h-3 w-3" />
                    Secure workflow
                  </span>
                </div>
              </div>

              {/* Hero metrics */}
              <div className="grid shrink-0 grid-cols-2 gap-3">
                <div className="rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-50/80 to-white/90 px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1.5 text-[9px] font-mono font-black uppercase tracking-wider text-blue-700">
                    <Briefcase className="h-3.5 w-3.5 stroke-[2.5]" />
                    Open Roles
                  </div>
                  <p className="mt-1 font-mono text-2xl font-black text-slate-950">
                    {jobs.length}
                  </p>
                </div>

                <div className="rounded-2xl border border-pink-200/80 bg-gradient-to-br from-pink-50/80 to-white/90 px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1.5 text-[9px] font-mono font-black uppercase tracking-wider text-pink-700">
                    <Layers className="h-3.5 w-3.5 stroke-[2.5]" />
                    Departments
                  </div>
                  <p className="mt-1 font-mono text-2xl font-black text-pink-600">
                    {departments.length}
                  </p>
                </div>

                <div className="col-span-2 flex items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white/65 px-3 py-2 text-[9px] font-bold text-slate-500 shadow-sm">
                  <Activity className="h-3.5 w-3.5 text-emerald-600" />
                  {filteredJobs.length} live opportunities matching your view
                </div>
              </div>
            </div>
          </motion.section>

          {/* Filters */}
          <motion.section variants={itemVariants}>
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/90 bg-white/70 p-2 shadow-[0_12px_35px_rgba(15,23,42,0.05)] backdrop-blur-xl">
              <div className="pointer-events-none absolute left-1/4 top-0 h-20 w-40 rounded-full bg-blue-500/5 blur-3xl" />
              <div className="relative z-10">
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
              </div>
            </div>
          </motion.section>

          {/* Results header */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-600 shadow-sm">
                <Briefcase className="h-4 w-4" />
              </div>

              <div>
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-blue-600">
                  Opportunity feed
                </p>
                <p className="text-sm font-black text-slate-900">
                  Showing{' '}
                  <span className="font-mono text-blue-700">
                    {filteredJobs.length}
                  </span>{' '}
                  {filteredJobs.length === 1 ? 'position' : 'positions'}
                </p>
              </div>
            </div>

            {hasActiveFilters ? (
              <button
                type="button"
                onClick={handleResetFilters}
                className="group inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-xl border border-pink-200 bg-pink-50/70 px-3 py-2 text-[10px] font-extrabold text-pink-600 transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:translate-y-0"
              >
                <RefreshCw className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" />
                Clear active filters
                <ChevronRight className="h-3 w-3" />
              </button>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50/70 px-3 py-2 text-[9px] font-extrabold uppercase tracking-wider text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                All positions live
              </span>
            )}
          </motion.div>

          {/* Jobs */}
          <AnimatePresence mode="popLayout">
            {filteredJobs.length === 0 ? (
              <motion.section
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="relative flex min-h-[340px] flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-dashed border-slate-300 bg-white/75 p-8 text-center shadow-sm backdrop-blur-xl"
              >
                <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-pink-500/10 blur-3xl" />

                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 text-slate-500 shadow-sm">
                  <SearchX className="h-7 w-7 stroke-[2]" />
                </div>

                <h3 className="relative mt-5 text-base font-black text-slate-950">
                  No matching positions found
                </h3>

                <p className="relative mt-2 max-w-sm text-xs font-semibold leading-6 text-slate-600">
                  We could not find any active postings matching your search
                  parameters or filter criteria.
                </p>

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="group relative mt-5 inline-flex h-10 cursor-pointer items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 px-5 text-xs font-extrabold text-white shadow-[0_10px_25px_rgba(37,99,235,0.22)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(236,72,153,0.22)] active:translate-y-0"
                >
                  <RefreshCw className="relative z-10 h-3.5 w-3.5 stroke-[2.5]" />
                  <span className="relative z-10">Reset All Filters</span>
                  <span className="rr-board-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[130%] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </button>
              </motion.section>
            ) : (
              <motion.div
                key="results"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-5 md:grid-cols-2"
              >
                {filteredJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    variants={itemVariants}
                    whileHover={{ y: -3, transition: { duration: 0.2, ease: EASE } }}
                    className="transform-gpu"
                  >
                    <JobCard
                      job={job}
                      isRecruiter={false}
                      onApply={handleApplyClick}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom trust strip */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-3 rounded-2xl border border-white/80 bg-white/60 px-4 py-3 shadow-sm backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
              <Sparkles className="h-3.5 w-3.5 text-pink-600" />
              Discover roles powered by semantic resume matching
            </div>

            <div className="flex items-center gap-2 font-mono text-[9px] font-black uppercase tracking-wider text-emerald-600">
              <ShieldCheck className="h-3.5 w-3.5" />
              Secure application flow
            </div>
          </motion.div>
        </motion.div>

        <ApplyJobModal
          job={selectedJob}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedJob(null);
          }}
        />
      </main>
    </>
  );
};

export default JobBoard;
