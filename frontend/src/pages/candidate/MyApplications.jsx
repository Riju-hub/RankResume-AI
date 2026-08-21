import React from 'react';
import { Link } from 'react-router-dom';
import { useApplications } from '../../hooks/useApplications';
import ScoreBadge from '../../components/common/ScoreBadge';
import { 
  Briefcase, 
  Clock, 
  FileText, 
  Sparkles, 
  Building2, 
  Loader2, 
  ArrowRight,
  CheckCircle2,
  XCircle,
  Layers,
  ChevronRight,
  Bot
} from 'lucide-react';

const STAGES = [
  { id: 'applied', label: 'Applied' },
  { id: 'screening', label: 'AI Screening' },
  { id: 'interview', label: 'Interview' },
  { id: 'offered', label: 'Decision' },
];

const MyApplications = () => {
  const { myApplications = [], isMyApplicationsLoading } = useApplications();

  // Helper to map current stage index
  const getStageIndex = (status) => {
    switch (status?.toLowerCase()) {
      case 'applied':
        return 0;
      case 'screening':
        return 1;
      case 'interview':
        return 2;
      case 'offered':
      case 'rejected':
        return 3;
      default:
        return 0;
    }
  };

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case 'applied':
        return 'border-sky-500/20 bg-sky-500/10 text-sky-400';
      case 'screening':
        return 'border-indigo-500/20 bg-indigo-500/10 text-indigo-400';
      case 'interview':
        return 'border-amber-500/20 bg-amber-500/10 text-amber-400';
      case 'offered':
        return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400';
      case 'rejected':
        return 'border-rose-500/20 bg-rose-500/10 text-rose-400';
      default:
        return 'border-zinc-700 bg-zinc-800 text-zinc-400';
    }
  };

  if (isMyApplicationsLoading) {
    return (
      <div className="flex min-h-[450px] w-full flex-col items-center justify-center gap-3">
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-xl backdrop-blur-md">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
        </div>
        <p className="text-xs font-medium text-zinc-400">Loading your applications...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 rounded-3xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900/90 via-zinc-950/80 to-zinc-950 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7 backdrop-blur-xl shadow-xl shadow-black/20">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-300">
            <Sparkles className="h-3 w-3 text-indigo-400" />
            Candidate Portal
          </div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-100 sm:text-2xl">
            My Applications
          </h1>
          <p className="text-xs text-zinc-400">
            Track real-time hiring stage transitions and Gemini ATS match scoring.
          </p>
        </div>

        <Link
          to="/jobs"
          className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 text-xs font-medium text-white shadow-md shadow-indigo-500/20 transition-all hover:from-indigo-500 hover:to-violet-500 active:scale-95 self-start sm:self-auto"
        >
          <span>Explore Open Roles</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Applications Listing */}
      {myApplications.length === 0 ? (
        <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-800/80 bg-zinc-900/20 p-8 text-center backdrop-blur-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-500">
            <Briefcase className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-zinc-200">No applications submitted yet</h3>
          <p className="mt-1 max-w-sm text-xs leading-relaxed text-zinc-500">
            You haven't applied to any job postings yet. Find a position that matches your profile and apply with your resume.
          </p>
          <Link
            to="/jobs"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-medium text-indigo-400 transition hover:bg-zinc-800 hover:text-indigo-300"
          >
            Browse Job Board
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {myApplications.map((app) => {
            const jobInfo = app.jobId || app.job || {};
            const jobTitle = jobInfo.title || 'Position';
            const department = jobInfo.department || 'General';
            const location = jobInfo.location || 'Remote';
            const score = app.matchScore ?? app.aiAnalysis?.matchScore ?? 0;
            const feedback = app.aiFeedback || app.aiAnalysis?.summary || '';
            const matchedSkills = app.aiAnalysis?.matchedSkills || [];
            const appliedDate = app.appliedAt || app.createdAt;
            const status = (app.status || 'applied').toLowerCase();
            const currentStageIndex = getStageIndex(status);
            const isRejected = status === 'rejected';

            const formattedDate = appliedDate
              ? new Date(appliedDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'Recently';

            return (
              <div
                key={app._id}
                className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 sm:p-6 backdrop-blur-xl transition-all duration-200 hover:border-zinc-700/80 hover:bg-zinc-900/60 hover:shadow-xl hover:shadow-black/30"
              >
                {/* Ambient Highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

                {/* Top Section: Title, Badges & AI Score */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h2 className="text-base font-semibold text-zinc-100 transition-colors group-hover:text-indigo-300">
                        {jobTitle}
                      </h2>
                      <span
                        className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(
                          status
                        )}`}
                      >
                        {status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-zinc-500" />
                        {department}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5 text-zinc-500" />
                        {location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-zinc-500" />
                        Applied {formattedDate}
                      </span>
                      {app.resumeUrl && (
                        <>
                          <span>•</span>
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 font-medium text-indigo-400 transition hover:text-indigo-300 hover:underline"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            Resume PDF
                          </a>
                        </>
                      )}
                    </div>
                  </div>

                  {/* AI Match Badge */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <ScoreBadge score={score} size="md" variant="glow" />
                  </div>
                </div>

                {/* Pipeline Progression Stepper */}
                <div className="mt-6 border-t border-zinc-800/60 pt-5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Application Stage Progression
                  </p>

                  <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-4">
                    {STAGES.map((stg, idx) => {
                      const isCompleted = idx < currentStageIndex;
                      const isCurrent = idx === currentStageIndex;

                      return (
                        <div key={stg.id} className="relative flex flex-col gap-1.5">
                          {/* Step Track Line */}
                          <div
                            className={`h-1.5 w-full rounded-full transition-all duration-300 ${
                              isRejected && isCurrent
                                ? 'bg-rose-500'
                                : isCompleted || isCurrent
                                ? 'bg-gradient-to-r from-indigo-500 to-violet-500'
                                : 'bg-zinc-800'
                            }`}
                          />

                          <div className="flex items-center gap-1">
                            {isCompleted ? (
                              <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                            ) : isCurrent && isRejected ? (
                              <XCircle className="h-3 w-3 text-rose-400 shrink-0" />
                            ) : (
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  isCurrent ? 'bg-indigo-400 animate-pulse' : 'bg-zinc-700'
                                }`}
                              />
                            )}
                            <span
                              className={`truncate text-[10px] font-semibold ${
                                isCurrent
                                  ? isRejected
                                    ? 'text-rose-400'
                                    : 'text-indigo-300'
                                  : isCompleted
                                  ? 'text-zinc-300'
                                  : 'text-zinc-600'
                              }`}
                            >
                              {isCurrent && isRejected ? 'Archived' : stg.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Gemini AI Match Feedback & Extracted Skills */}
                {(feedback || matchedSkills.length > 0) && (
                  <div className="mt-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-3.5 backdrop-blur-md">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400">
                      <Bot className="h-3.5 w-3.5" />
                      <span>Gemini Evaluation Insights</span>
                    </div>

                    {feedback && (
                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-300">
                        {feedback}
                      </p>
                    )}

                    {matchedSkills.length > 0 && (
                      <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-2 border-t border-zinc-800/60">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mr-1">
                          Matched Skills:
                        </span>
                        {matchedSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyApplications;