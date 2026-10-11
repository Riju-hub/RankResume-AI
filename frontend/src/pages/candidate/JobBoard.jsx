import React, { useMemo, useState, useEffect, memo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useJobs } from '../../hooks/useJobs';
import { useSavedJobs } from '../../hooks/useSavedJobs'; // <--- Added
import ApplyJobModal from './ApplyJobModal';
import JobCard from '../../components/jobs/JobCard';
import JobFilter from '../../components/jobs/JobFilter';
import geminiLogo from '../../assets/gemini-svg.svg';
import {
  Sparkles,
  Loader2,
  AlertCircle,
  SearchX,
  Briefcase,
  Layers,
  RefreshCw,
  Target,
  ArrowRight,
  X,
  FileCheck2,
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

const CandidateWelcomeModal = memo(({ isOpen, onClose, totalRoles = 0 }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex h-screen w-screen items-center justify-center p-4 sm:p-6 font-sans">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 h-full w-full bg-slate-950/75 backdrop-blur-md transform-gpu will-change-[opacity]"
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-[30px] border border-cyan-300/30 bg-[#070d1e] p-6 sm:p-8 text-center text-white shadow-[0_20px_60px_rgba(0,0,0,0.8)] transform-gpu will-change-[transform,opacity]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-2xl transform-gpu" />
            <div className="pointer-events-none absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-indigo-500/10 blur-2xl transform-gpu" />

            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-cyan-300/30 hover:bg-cyan-500/10 hover:text-cyan-300 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-400 p-3 shadow-[0_0_25px_rgba(34,211,238,0.25)]">
              <img
                src={geminiLogo}
                alt="RankResume AI"
                className="h-full w-full object-contain filter brightness-125"
              />
            </div>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-wider text-cyan-300">
              <Sparkles className="h-3 w-3 text-cyan-300" />
              Your Career Co-Pilot
            </div>

            <h3 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              Ready to find your{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                next big role?
              </span>
            </h3>

            <p className="mt-2.5 text-xs sm:text-sm font-medium leading-relaxed text-slate-300">
              Never wonder if your resume made the cut. We evaluate your real-world experience, practical skills, and project impact—matching you directly with {totalRoles ? `${totalRoles} verified tech openings` : 'top engineering roles'} without keyword traps.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2.5 text-left">
              <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-slate-900/80 p-2.5">
                <Target className="h-4 w-4 shrink-0 text-cyan-300" />
                <span className="text-[11px] font-semibold text-slate-200">Instant Match Telemetry</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-slate-900/80 p-2.5">
                <FileCheck2 className="h-4 w-4 shrink-0 text-fuchsia-400" />
                <span className="text-[11px] font-semibold text-slate-200">No Keyword Traps</span>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-5 text-xs font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-transform duration-150 hover:scale-[1.01] active:scale-95 cursor-pointer"
              >
                <span>Explore Jobs Now</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer"
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
});

CandidateWelcomeModal.displayName = 'CandidateWelcomeModal';

const JobBoard = () => {
  const { jobs = [], isLoading, isError, refetch } = useJobs();
  const { toggleSave, isJobSaved } = useSavedJobs(); // <--- Connect Saved Jobs

  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGreetingModal, setShowGreetingModal] = useState(false);

  useEffect(() => {
    const greetingTimer = window.setTimeout(() => {
      setShowGreetingModal(true);
    }, 2000);

    return () => window.clearTimeout(greetingTimer);
  }, []);

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
    const term = searchTerm.toLowerCase().trim();

    return jobs.filter((job) => {
      const matchesSearch =
        !term ||
        job.title?.toLowerCase().includes(term) ||
        job.companyName?.toLowerCase().includes(term) ||
        job.description?.toLowerCase().includes(term) ||
        job.skillsRequired?.some((s) => s.toLowerCase().includes(term));

      const matchesDept =
        departmentFilter === 'All' || job.department === departmentFilter;

      const matchesType = typeFilter === 'All' || job.jobType === typeFilter;

      const isNotClosed = job.status !== 'closed';

      return matchesSearch && matchesDept && matchesType && isNotClosed;
    });
  }, [jobs, searchTerm, departmentFilter, typeFilter]);

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
    <main className="relative isolate min-h-screen overflow-hidden font-sans antialiased text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-pink-50/35" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-7xl space-y-6"
      >
        {/* Header Hero */}
        <motion.section
          variants={itemVariants}
          className="group relative overflow-hidden rounded-[2rem] border border-white/90 bg-white/75 p-6 shadow-[0_24px_70px_rgba(37,99,235,0.10),0_10px_35px_rgba(236,72,153,0.07)] backdrop-blur-2xl sm:p-8"
        >
          <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-600 via-violet-500 to-pink-500" />
          <div className="relative z-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700 shadow-sm backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-pink-600" />
                Gemini 2.5 Multi-Modal Matching
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                Explore Active{' '}
                <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
                  Positions
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-xs font-semibold leading-6 text-slate-600 sm:text-sm">
                Click any role or use View in Details to inspect specifications, requirements, and compensation packages.
              </p>
            </div>

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
            </div>
          </div>
        </motion.section>

        {/* Filter Controls */}
        <motion.section variants={itemVariants}>
          <div className="relative overflow-hidden rounded-[1.6rem] border border-white/90 bg-white/70 p-2 shadow-[0_12px_35px_rgba(15,23,42,0.05)] backdrop-blur-xl">
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
        </motion.section>

        {/* Feed Results */}
        <AnimatePresence mode="popLayout">
          {filteredJobs.length === 0 ? (
            <motion.section
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="relative flex min-h-[340px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-white/75 p-8 text-center"
            >
              <SearchX className="h-8 w-8 text-slate-400" />
              <h3 className="mt-4 text-base font-black text-slate-950">
                No matching positions found
              </h3>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-4 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white cursor-pointer"
              >
                Reset Filters
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
                    isBookmarked={isJobSaved(job._id)}
                    onBookmark={() => toggleSave(job._id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <CandidateWelcomeModal
        isOpen={showGreetingModal}
        onClose={() => setShowGreetingModal(false)}
        totalRoles={jobs.length}
      />

      <ApplyJobModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedJob(null);
        }}
      />
    </main>
  );
};

export default JobBoard;