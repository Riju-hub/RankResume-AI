// frontend/src/pages/recruiter/MarketJobs.jsx
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useJobs } from '../../hooks/useJobs';
import JobCard from '../../components/jobs/JobCard';
import JobFilter from '../../components/jobs/JobFilter';
import {
  Briefcase,
  Layers,
  SearchX,
  Sparkles,
  Loader2,
  AlertCircle,
  RefreshCw,
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

const MarketJobs = () => {
  const { jobs = [], isLoading, isError, refetchJobs } = useJobs();

  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

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
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="font-mono text-xs font-bold text-slate-800">
            Loading platform openings...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="relative flex min-h-[380px] w-full flex-col items-center justify-center rounded-[2rem] border border-rose-200/80 bg-white/90 p-8 text-center font-sans">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
          <AlertCircle className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-base font-black text-slate-950">
          Failed to load market openings
        </h3>
        <button
          type="button"
          onClick={() => refetchJobs && refetchJobs()}
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden font-sans antialiased text-slate-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-7xl space-y-6"
      >
        {/* Header Hero */}
        <motion.section
          variants={itemVariants}
          className="relative overflow-hidden rounded-[2rem] border border-white/90 bg-white/75 p-6 shadow-sm backdrop-blur-2xl sm:p-8"
        >
          <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-pink-600" />
                Platform Talent Market
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Explore Available{' '}
                <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
                  Job Openings
                </span>
              </h1>

              <p className="mt-2.5 max-w-2xl text-xs font-semibold leading-6 text-slate-600 sm:text-sm">
                Browse positions posted across the platform by other organizations to inspect market demand and skill requirements.
              </p>
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-3">
              <div className="rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-50/80 to-white/90 px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1.5 text-[9px] font-mono font-black uppercase tracking-wider text-blue-700">
                  <Briefcase className="h-3.5 w-3.5" />
                  Total Roles
                </div>
                <p className="mt-1 font-mono text-2xl font-black text-slate-950">
                  {jobs.length}
                </p>
              </div>

              <div className="rounded-2xl border border-pink-200/80 bg-gradient-to-br from-pink-50/80 to-white/90 px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1.5 text-[9px] font-mono font-black uppercase tracking-wider text-pink-700">
                  <Layers className="h-3.5 w-3.5" />
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
          <div className="relative overflow-hidden rounded-[1.6rem] border border-white/90 bg-white/70 p-2 shadow-xs backdrop-blur-xl">
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

        {/* Grid List */}
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
                    isRecruiter={true}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
};

export default MarketJobs;