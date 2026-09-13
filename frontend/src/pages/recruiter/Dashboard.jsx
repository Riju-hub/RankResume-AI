import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useJobs } from '../../hooks/useJobs';
import {
  Briefcase,
  Users,
  PlusCircle,
  TrendingUp,
  ArrowRight,
  Clock,
  MapPin,
  Loader2,
  Sparkles,
  Kanban,
  AlertCircle,
  Layers,
  ShieldCheck,
  Activity,
  BarChart3,
  Target,
  Zap,
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
    transition: {
      duration: 0.45,
      ease: EASE,
    },
  },
};

const cardHover = {
  y: -4,
  transition: { duration: 0.22, ease: EASE },
};

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
      <div className="relative flex min-h-[520px] w-full items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-white via-blue-50/50 to-pink-50/50 font-sans">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-pink-500/15 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-white bg-white/85 shadow-[0_18px_45px_rgba(37,99,235,0.14)] backdrop-blur-xl">
            <div className="absolute inset-0 rounded-[1.4rem] bg-gradient-to-br from-blue-500/10 to-pink-500/10" />
            <Loader2 className="relative h-7 w-7 animate-spin text-blue-600 stroke-[2.3]" />
          </div>
          <div className="text-center">
            <p className="font-mono text-xs font-black text-slate-800">
              Syncing recruiter telemetry...
            </p>
            <p className="mt-1 text-[10px] font-semibold text-slate-500">
              Initializing AI recruitment pipelines
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative flex min-h-[380px] w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-rose-200/80 bg-white/90 p-8 text-center shadow-[0_20px_55px_rgba(244,63,94,0.08)] backdrop-blur-xl font-sans"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-600 shadow-sm">
          <AlertCircle className="h-7 w-7 stroke-[2.4]" />
        </div>
        <h3 className="mt-5 text-base font-black text-slate-950">
          Failed to load recruiter dashboard
        </h3>
        <p className="mt-2 max-w-sm text-xs font-semibold leading-6 text-slate-600">
          We encountered an issue fetching your recruitment pipeline. Please
          refresh the page.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes rrDashboardSpectrum {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes rrDashboardFloatA {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(18px, -18px, 0) scale(1.04); }
        }

        @keyframes rrDashboardFloatB {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-18px, 16px, 0) scale(1.05); }
        }

        @keyframes rrDashboardPulse {
          0%, 100% { opacity: .5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.12); }
        }

        @keyframes rrDashboardShine {
          0% { transform: translateX(-130%); }
          100% { transform: translateX(170%); }
        }

        .rr-dashboard-spectrum {
          background-size: 220% 100%;
          animation: rrDashboardSpectrum 7s ease-in-out infinite;
          will-change: background-position;
        }

        .rr-dashboard-float-a {
          animation: rrDashboardFloatA 10s ease-in-out infinite;
          will-change: transform;
        }

        .rr-dashboard-float-b {
          animation: rrDashboardFloatB 12s ease-in-out infinite;
          will-change: transform;
        }

        .rr-dashboard-pulse {
          animation: rrDashboardPulse 2.8s ease-in-out infinite;
          will-change: transform, opacity;
        }

        .rr-dashboard-shine {
          animation: rrDashboardShine 2.8s ease-in-out infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .rr-dashboard-spectrum,
          .rr-dashboard-float-a,
          .rr-dashboard-float-b,
          .rr-dashboard-pulse,
          .rr-dashboard-shine {
            animation: none !important;
          }
        }
      `}</style>

      <main className="relative isolate min-h-screen overflow-hidden font-sans text-slate-900 antialiased">
        {/* Lightweight ambient background */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-pink-50/35">
          <div className="rr-dashboard-float-a absolute -left-40 -top-36 h-[480px] w-[480px] rounded-full bg-blue-500/10 blur-[110px] transform-gpu" />
          <div className="rr-dashboard-float-b absolute -right-40 top-[25%] h-[500px] w-[500px] rounded-full bg-pink-500/10 blur-[120px] transform-gpu" />
          <div className="absolute bottom-[-220px] left-[35%] h-[400px] w-[400px] rounded-full bg-violet-500/8 blur-[110px]" />

          <div
            className="absolute inset-0 opacity-[0.28]"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(59,130,246,0.15) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              maskImage:
                'linear-gradient(to bottom, black 0%, transparent 78%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 0%, transparent 78%)',
            }}
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-7xl space-y-7"
        >
          {/* Premium hero */}
          <motion.section
            variants={itemVariants}
            className="group relative overflow-hidden rounded-[2rem] border border-white/90 bg-white/75 p-6 shadow-[0_24px_70px_rgba(37,99,235,0.10),0_10px_35px_rgba(236,72,153,0.07)] backdrop-blur-2xl sm:p-8"
          >
            <div className="rr-dashboard-spectrum absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-600 via-violet-500 to-pink-500" />

            <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-gradient-to-br from-pink-500/20 via-violet-500/10 to-transparent blur-3xl transform-gpu" />
            <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-blue-500/20 via-cyan-400/10 to-transparent blur-3xl transform-gpu" />

            <div className="relative z-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700 shadow-sm backdrop-blur-md">
                  <ShieldCheck className="h-4 w-4 text-blue-600" />
                  Recruiter Command Center
                  <span className="rr-dashboard-pulse ml-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>

                <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                  Recruiter{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
                    Dashboard
                  </span>
                </h1>

                <p className="mt-3 max-w-2xl text-xs font-semibold leading-6 text-slate-600 sm:text-sm">
                  Manage candidate pipelines, automate Kanban swimlanes, and
                  evaluate real-time multi-modal Gemini match scores.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    { icon: Activity, label: 'Live pipeline' },
                    { icon: Sparkles, label: 'AI matching' },
                    { icon: ShieldCheck, label: 'Secure scoring' },
                  ].map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/65 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-slate-600 shadow-sm"
                    >
                      <Icon className="h-3 w-3 text-blue-600" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to="/recruiter/create-job"
                className="group/cta relative inline-flex h-12 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 px-6 text-xs font-extrabold text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(236,72,153,0.24)] active:translate-y-0"
              >
                <PlusCircle className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/cta:rotate-90" />
                <span className="relative z-10">Create New Job</span>
                <span className="rr-dashboard-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[130%] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </Link>
            </div>
          </motion.section>

          {/* KPI section */}
          <motion.section
            variants={containerVariants}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {/* Active jobs */}
            <motion.div
              variants={itemVariants}
              whileHover={cardHover}
              className="group relative overflow-hidden rounded-[1.7rem] border border-white/90 bg-white/80 p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)] backdrop-blur-xl transform-gpu sm:p-6"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-pink-500/10 blur-3xl transition-opacity group-hover:opacity-80" />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                    Active Job Posts
                  </p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-mono text-4xl font-black tracking-tight text-slate-950">
                      {activeJobs.length}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-slate-400">
                      of {jobs.length} total
                    </span>
                  </div>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50 text-pink-600 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Briefcase className="h-5.5 w-5.5 stroke-[2.2]" />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-3 text-[10px] font-bold text-slate-600">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                </span>
                Live & accepting inbound PDF resumes
              </div>
            </motion.div>

            {/* Candidates */}
            <motion.div
              variants={itemVariants}
              whileHover={cardHover}
              className="group relative overflow-hidden rounded-[1.7rem] border border-white/90 bg-white/80 p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)] backdrop-blur-xl transform-gpu sm:p-6"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                    Total Candidates
                  </p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-mono text-4xl font-black tracking-tight text-slate-950">
                      {totalApplicants}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-slate-400">
                      resumes scored
                    </span>
                  </div>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Users className="h-5.5 w-5.5 stroke-[2.2]" />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-[10px] font-bold text-blue-700">
                <Sparkles className="h-3.5 w-3.5 text-pink-600" />
                Extracted via Multi-Modal Gemini ATS
              </div>
            </motion.div>

            {/* Semantic fit */}
            <motion.div
              variants={itemVariants}
              whileHover={cardHover}
              className="group relative overflow-hidden rounded-[1.7rem] border border-white/90 bg-white/80 p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)] backdrop-blur-xl transform-gpu sm:p-6"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-emerald-500/10 blur-3xl" />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                    Avg Semantic Fit
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-4xl font-black tracking-tight text-emerald-600">
                      78%
                    </span>
                    <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 font-mono text-[9px] font-black uppercase tracking-wider text-emerald-700">
                      Optimal Match
                    </span>
                  </div>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-cyan-50 text-emerald-600 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <TrendingUp className="h-5.5 w-5.5 stroke-[2.2]" />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-[10px] font-semibold text-slate-600">
                <Target className="h-3.5 w-3.5 text-emerald-600" />
                High cosine vector alignment
              </div>
            </motion.div>
          </motion.section>

          {/* Pipeline header */}
          <motion.section variants={itemVariants} className="space-y-4">
            <div className="flex flex-col gap-3 px-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-violet-600 shadow-sm">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-violet-600">
                    Recruitment workspace
                  </p>
                </div>
                <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                  Active Job Openings & Pipelines
                </h2>
              </div>

              <span className="self-start rounded-xl border border-slate-200 bg-white/75 px-3 py-2 font-mono text-[10px] font-bold text-slate-600 shadow-sm sm:self-auto">
                Showing{' '}
                <span className="font-black text-pink-600">{jobs.length}</span>{' '}
                {jobs.length === 1 ? 'Opening' : 'Openings'}
              </span>
            </div>

            <AnimatePresence mode="popLayout">
              {jobs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="relative flex min-h-[330px] flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-dashed border-slate-300 bg-white/75 p-8 text-center shadow-sm backdrop-blur-xl"
                >
                  <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-pink-500/10 blur-3xl" />

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 text-slate-500 shadow-sm">
                    <Briefcase className="h-7 w-7 stroke-[2]" />
                  </div>

                  <h3 className="relative mt-5 text-base font-black text-slate-950">
                    No jobs published yet
                  </h3>
                  <p className="relative mt-2 max-w-sm text-xs font-semibold leading-6 text-slate-600">
                    Create your first opening to configure AI vector weights
                    and start ranking inbound candidate resumes.
                  </p>

                  <Link
                    to="/recruiter/create-job"
                    className="group/empty relative mt-5 inline-flex h-11 items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 px-5 text-xs font-extrabold text-white shadow-[0_10px_25px_rgba(37,99,235,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(236,72,153,0.22)] active:translate-y-0"
                  >
                    <PlusCircle className="relative z-10 h-4 w-4 stroke-[2.5]" />
                    <span className="relative z-10">Create First Job Opening</span>
                    <span className="rr-dashboard-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[130%] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="space-y-3"
                >
                  {jobs.map((job) => (
                    <motion.article
                      layout
                      variants={itemVariants}
                      whileHover={cardHover}
                      key={job._id}
                      className="group relative overflow-hidden rounded-[1.6rem] border border-white/90 bg-white/80 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl transform-gpu sm:p-6"
                    >
                      {/* Card spectrum */}
                      <div className="rr-dashboard-spectrum pointer-events-none absolute left-0 right-0 top-0 h-[2px] rounded-t-[1.6rem] bg-gradient-to-r from-cyan-400 via-blue-600 via-violet-500 to-pink-500 opacity-60 group-hover:opacity-100" />

                      <div className="pointer-events-none absolute -right-16 -top-20 h-36 w-36 rounded-full bg-blue-500/8 blur-3xl" />

                      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        {/* Job details */}
                        <div className="min-w-0 flex-1 space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-pink-50 text-blue-600 shadow-sm transition-transform duration-300 group-hover:scale-105 sm:flex">
                              <Briefcase className="h-5 w-5 stroke-[2.1]" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-base font-black tracking-tight text-slate-950 transition-colors duration-200 group-hover:text-blue-700 sm:text-lg">
                                  {job.title}
                                </h3>

                                <span className="rounded-lg border border-pink-200 bg-pink-50 px-2.5 py-1 font-mono text-[9px] font-extrabold uppercase tracking-wider text-pink-700 shadow-sm">
                                  {job.jobType || 'Full-time'}
                                </span>

                                <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[9px] font-bold text-slate-700 shadow-sm">
                                  <Layers className="h-3 w-3 text-slate-500 stroke-[2.2]" />
                                  {job.department || 'Engineering'}
                                </span>
                              </div>

                              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-600">
                                <span className="inline-flex items-center gap-1.5">
                                  <MapPin className="h-3.5 w-3.5 text-blue-600 stroke-[2.2]" />
                                  {job.location || 'Remote'}
                                </span>

                                <span className="hidden text-slate-300 sm:inline">
                                  •
                                </span>

                                <span className="inline-flex items-center gap-1.5">
                                  <Clock className="h-3.5 w-3.5 text-slate-500 stroke-[2.2]" />
                                  Posted{' '}
                                  {job.createdAt
                                    ? new Date(
                                        job.createdAt
                                      ).toLocaleDateString()
                                    : 'Recent'}
                                </span>

                                <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-2.5 py-1 font-mono text-[9px] font-extrabold text-pink-700 sm:hidden">
                                  <Users className="h-3 w-3 text-pink-600" />
                                  {job.applicantCount || 0} Candidates
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex shrink-0 flex-col gap-2 border-t border-slate-100/90 pt-4 sm:flex-row lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                          <Link
                            to={`/recruiter/jobs/${job._id}/pipeline`}
                            className="group/kanban inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 shadow-sm transition-[transform,border-color,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50/60 hover:text-violet-700 hover:shadow-sm active:scale-[0.98]"
                          >
                            <Kanban className="h-4 w-4 text-violet-600 transition-transform duration-200 group-hover/kanban:scale-110" />
                            <span>Kanban Pipeline</span>
                            <ChevronRight className="h-3 w-3 opacity-0 transition-opacity group-hover/kanban:opacity-100" />
                          </Link>

                          <Link
                            to={`/recruiter/jobs/${job._id}/applicants`}
                            className="group/candidates inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 px-5 text-xs font-extrabold text-white shadow-[0_9px_23px_rgba(37,99,235,0.2)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_13px_30px_rgba(236,72,153,0.22)] active:translate-y-0"
                          >
                            <Users className="h-3.5 w-3.5" />
                            <span>
                              Candidates ({job.applicantCount || 0})
                            </span>
                            <ArrowRight className="h-3.5 w-3.5 stroke-[2.5] transition-transform duration-200 group-hover/candidates:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Footer status strip */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-3 rounded-2xl border border-white/80 bg-white/60 px-4 py-3 shadow-sm backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
              <Zap className="h-3.5 w-3.5 text-blue-600" />
              AI-powered recruitment workspace
            </div>
            <div className="flex items-center gap-2 font-mono text-[9px] font-black uppercase tracking-wider text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Pipeline operational
            </div>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
};

export default Dashboard;
