// frontend/src/pages/recruiter/Dashboard.jsx
import React, { useMemo, useState, useEffect, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecruiterJobs } from '../../hooks/useJobs'; // <--- Switched to recruiter-specific query
import JobCard from '../../components/jobs/JobCard';
import EditJobModal from '../../components/jobs/EditJobModal';
import ActionConfirmModal from '../../components/common/ActionConfirmModal';
import geminiLogo from '../../assets/gemini-svg.svg';
import {
  Briefcase,
  Users,
  PlusCircle,
  TrendingUp,
  ArrowRight,
  Loader2,
  Sparkles,
  AlertCircle,
  ShieldCheck,
  Activity,
  BarChart3,
  Target,
  Zap,
  CheckCircle2,
  X,
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

const WelcomeModal = memo(({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-sans">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transform-gpu will-change-[opacity]"
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-[30px] border border-cyan-300/30 bg-[#070d1e] p-6 sm:p-8 text-center text-white shadow-[0_20px_60px_rgba(0,0,0,0.8)] transform-gpu will-change-[transform,opacity]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-500/10 blur-xl transform-gpu" />
            <div className="pointer-events-none absolute -left-16 -bottom-16 h-36 w-36 rounded-full bg-indigo-500/10 blur-xl transform-gpu" />

            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-cyan-300/30 hover:bg-cyan-500/10 hover:text-cyan-300"
              aria-label="Close greeting"
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
              Recruiter Command Center Active
            </div>

            <h3 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome back,{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Hiring Lead
              </span>
            </h3>

            <p className="mt-2.5 text-xs sm:text-sm font-medium leading-relaxed text-slate-300">
              Your AI hiring pipeline is running. Rank candidate batches in seconds, spot high-fit technical talent with cosine accuracy, and advance applicants through your Kanban stages.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2.5 text-left">
              <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-slate-900/80 p-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" />
                <span className="text-[11px] font-semibold text-slate-200">Bulk Ingestion Ready</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-slate-900/80 p-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-fuchsia-400" />
                <span className="text-[11px] font-semibold text-slate-200">Automated Shortlists</span>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-5 text-xs font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-transform duration-150 hover:scale-[1.01] active:scale-95 cursor-pointer"
              >
                <span>Review Candidates</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

WelcomeModal.displayName = 'WelcomeModal';

const Dashboard = () => {
  const navigate = useNavigate();
  // Queries ONLY jobs created by this recruiter
  const { jobs = [], isLoading, error, updateJob, isUpdating, deleteJob, isDeleting } = useRecruiterJobs();

  const [showGreetingModal, setShowGreetingModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [confirmConfig, setConfirmConfig] = useState({
    isOpen: false,
    title: '',
    description: '',
    confirmLabel: 'Proceed',
    type: 'primary',
    onConfirm: () => {},
  });

  useEffect(() => {
    const greetingTimer = window.setTimeout(() => {
      setShowGreetingModal(true);
    }, 2000);

    return () => window.clearTimeout(greetingTimer);
  }, []);

  const activeJobs = useMemo(
    () => jobs.filter((job) => job.status !== 'closed'),
    [jobs]
  );

  const totalApplicants = useMemo(
    () => jobs.reduce((acc, curr) => acc + (curr.applicantCount || 0), 0),
    [jobs]
  );

  const handlePromptCreateJob = () => {
    setConfirmConfig({
      isOpen: true,
      title: 'Create New Job Opening',
      description: 'You are about to launch a new job posting wizard. This will configure AI vector scoring and accept candidate resumes.',
      confirmLabel: 'Launch Job Creator',
      type: 'primary',
      onConfirm: () => {
        setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
        navigate('/recruiter/create-job');
      },
    });
  };

  const handlePromptEditJob = (job) => {
    setConfirmConfig({
      isOpen: true,
      title: `Edit "${job.title}"?`,
      description: 'Are you sure you want to update this position? Any changes to skills or requirements will recalibrate matching scores.',
      confirmLabel: 'Proceed to Edit',
      type: 'warning',
      onConfirm: () => {
        setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
        setEditingJob(job);
        setIsEditModalOpen(true);
      },
    });
  };

  const handlePromptDeleteJob = (jobId) => {
    const targetJob = jobs.find((j) => j._id === jobId);
    const title = targetJob?.title || 'this position';

    setConfirmConfig({
      isOpen: true,
      title: `Delete "${title}"?`,
      description: 'This will permanently remove the job posting, stored cosine vectors, and candidate rankings. This action cannot be undone.',
      confirmLabel: 'Delete Position Permanently',
      type: 'danger',
      onConfirm: async () => {
        try {
          await deleteJob(jobId);
          setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
        } catch (err) {
          alert(err.response?.data?.message || 'Failed to delete job post.');
        }
      },
    });
  };

  const handleSaveJob = async (id, updatedData) => {
    try {
      await updateJob({ id, jobData: updatedData });
      setIsEditModalOpen(false);
      setEditingJob(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update job post.');
    }
  };

  const handleViewApplicants = (jobId) => {
    navigate(`/recruiter/jobs/${jobId}/applicants`);
  };

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
          We encountered an issue fetching your recruitment pipeline. Please refresh the page.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <main className="relative isolate min-h-screen overflow-hidden font-sans text-slate-900 antialiased">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-pink-50/35">
          <div className="rr-dashboard-float-a absolute -left-40 -top-36 h-[480px] w-[480px] rounded-full bg-blue-500/10 blur-[110px] transform-gpu" />
          <div className="rr-dashboard-float-b absolute -right-40 top-[25%] h-[500px] w-[500px] rounded-full bg-pink-500/10 blur-[120px] transform-gpu" />
          <div className="absolute bottom-[-220px] left-[35%] h-[400px] w-[400px] rounded-full bg-violet-500/8 blur-[110px]" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-7xl space-y-7"
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
                  <ShieldCheck className="h-4 w-4 text-blue-600" />
                  My Published Openings
                  <span className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                  Recruiter{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
                    Dashboard
                  </span>
                </h1>

                <p className="mt-3 max-w-2xl text-xs font-semibold leading-6 text-slate-600 sm:text-sm">
                  Manage your active job postings, calibrate AI target skill parameters, and review inbound candidate applications.
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

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <Link
                  to="/recruiter/market-jobs"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-xs font-extrabold text-slate-700 shadow-xs hover:border-slate-300 hover:bg-slate-50 transition active:scale-95"
                >
                  <Briefcase className="h-4 w-4 text-blue-600" />
                  <span>Explore Other Jobs</span>
                </Link>

                <button
                  type="button"
                  onClick={handlePromptCreateJob}
                  className="group/cta relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 px-6 text-xs font-extrabold text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(236,72,153,0.24)] active:translate-y-0 cursor-pointer"
                >
                  <PlusCircle className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/cta:rotate-90" />
                  <span className="relative z-10">Create New Job</span>
                </button>
              </div>
            </div>
          </motion.section>

          {/* Key Metric KPIs */}
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
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                    Your Active Jobs
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

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50 text-pink-600 shadow-sm">
                  <Briefcase className="h-5.5 w-5.5 stroke-[2.2]" />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-3 text-[10px] font-bold text-slate-600">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                </span>
                Accepting candidate applications
              </div>
            </motion.div>

            {/* Candidates */}
            <motion.div
              variants={itemVariants}
              whileHover={cardHover}
              className="group relative overflow-hidden rounded-[1.7rem] border border-white/90 bg-white/80 p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)] backdrop-blur-xl transform-gpu sm:p-6"
            >
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
                      in your pipelines
                    </span>
                  </div>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 shadow-sm">
                  <Users className="h-5.5 w-5.5 stroke-[2.2]" />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-[10px] font-bold text-blue-700">
                <Sparkles className="h-3.5 w-3.5 text-pink-600" />
                Ranked via Multi-Modal Gemini ATS
              </div>
            </motion.div>

            {/* Pipeline Status */}
            <motion.div
              variants={itemVariants}
              whileHover={cardHover}
              className="group relative overflow-hidden rounded-[1.7rem] border border-white/90 bg-white/80 p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)] backdrop-blur-xl transform-gpu sm:p-6"
            >
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                    Pipeline Health
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-4xl font-black tracking-tight text-emerald-600">
                      100%
                    </span>
                    <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 font-mono text-[9px] font-black uppercase tracking-wider text-emerald-700">
                      Online
                    </span>
                  </div>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-cyan-50 text-emerald-600 shadow-sm">
                  <TrendingUp className="h-5.5 w-5.5 stroke-[2.2]" />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-[10px] font-semibold text-slate-600">
                <Target className="h-3.5 w-3.5 text-emerald-600" />
                Cosine semantic vectors ready
              </div>
            </motion.div>
          </motion.section>

          {/* Job List / Pipeline Management */}
          <motion.section variants={itemVariants} className="space-y-4">
            <div className="flex flex-col gap-3 px-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-violet-600 shadow-sm">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-violet-600">
                    Recruiter Workspace
                  </p>
                </div>
                <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                  Your Published Positions
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
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 text-slate-500 shadow-sm">
                    <Briefcase className="h-7 w-7 stroke-[2]" />
                  </div>

                  <h3 className="relative mt-5 text-base font-black text-slate-950">
                    No openings published by you yet
                  </h3>
                  <p className="relative mt-2 max-w-sm text-xs font-semibold leading-6 text-slate-600">
                    Create your first opening to configure AI vector weights and start ranking inbound candidate resumes.
                  </p>

                  <button
                    type="button"
                    onClick={handlePromptCreateJob}
                    className="relative mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 px-5 text-xs font-extrabold text-white shadow-md transition hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <PlusCircle className="h-4 w-4 stroke-[2.5]" />
                    <span>Create Your First Opening</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 gap-4"
                >
                  {jobs.map((job) => (
                    <motion.div
                      layout
                      key={job._id}
                      variants={itemVariants}
                      whileHover={cardHover}
                    >
                      <JobCard
                        job={job}
                        isRecruiter={true}
                        onEdit={handlePromptEditJob}
                        onDelete={handlePromptDeleteJob}
                        onViewApplicants={handleViewApplicants}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Footer Status Bar */}
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

      {/* Center Welcome Modal */}
      <WelcomeModal
        isOpen={showGreetingModal}
        onClose={() => setShowGreetingModal(false)}
      />

      {/* Central Confirmation Action Modal */}
      <ActionConfirmModal
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmConfig.onConfirm}
        title={confirmConfig.title}
        description={confirmConfig.description}
        confirmLabel={confirmConfig.confirmLabel}
        type={confirmConfig.type}
        isLoading={isDeleting}
      />

      {/* Recruiter Inline Edit Modal */}
      <EditJobModal
        job={editingJob}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingJob(null);
        }}
        onSave={handleSaveJob}
        isSaving={isUpdating}
      />
    </>
  );
};

export default Dashboard;