import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApplications } from '../../hooks/useApplications';
import { useJobDetails } from '../../hooks/useJobs';
import KanbanBoard from '../../components/kanban/KanbanBoard';
import ScoreBadge from '../../components/common/ScoreBadge';
import { 
  Sparkles, 
  ArrowLeft, 
  Loader2, 
  TableProperties, 
  Building2, 
  MapPin, 
  Layers, 
  X, 
  Bot, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Kanban,
  Zap,
  Target
} from 'lucide-react';

const PipelineView = () => {
  const { jobId } = useParams();
  const { data: jobData, isLoading: isJobLoading } = useJobDetails(jobId);
  const { 
    applicants = [], 
    isApplicantsLoading, 
    updateStatus, 
    error: appError 
  } = useApplications(jobId);

  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const job = jobData?.job || jobData;

  const handleStatusChange = (applicationId, newStatus) => {
    if (updateStatus) {
      updateStatus({ applicationId, status: newStatus });
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .trim()
      .split(/\s+/)
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  if (isJobLoading || isApplicantsLoading) {
    return (
      <div className="flex min-h-[450px] w-full flex-col items-center justify-center gap-3 font-sans">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-md">
          <Loader2 className="h-6 w-6 animate-spin text-pink-500" />
        </div>
        <p className="font-mono text-xs font-semibold text-slate-400">
          Mounting live Kanban swimlanes...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      
      {/* ========================================================================= */}
      {/* --- Top Breadcrumb & Job Header Banner --- */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        {/* Hardware-Accelerated Ambient Glows */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-pink-600/15 blur-3xl transform-gpu will-change-transform" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-600/15 blur-3xl transform-gpu will-change-transform" />
        <div className="pointer-events-none absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />

        <div className="relative z-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <Link
              to="/recruiter/dashboard"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-400 transition hover:text-pink-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Dashboard
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {job?.title || 'Pipeline Kanban'}
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-950/40 px-3 py-1 font-mono text-xs font-bold text-pink-300">
                <Sparkles className="h-3.5 w-3.5 text-pink-400" />
                Live Drag & Drop Swimlanes
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-slate-500" />
                {job?.department || 'Engineering'}
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-slate-500" />
                {job?.location || 'Remote'}
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-slate-500" />
                {job?.jobType || 'Full-time'}
              </span>
            </div>
          </div>

          <Link
            to={`/recruiter/jobs/${jobId}/applicants`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/80 px-4 text-xs font-bold text-slate-200 shadow-md transition-all hover:border-pink-500/40 hover:bg-pink-950/30 hover:text-pink-300 active:scale-95 self-start sm:self-auto"
          >
            <TableProperties className="h-4 w-4 text-pink-400" />
            <span>Switch to Table View</span>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* --- Error Alert Box (if status update fails) --- */}
      {/* ========================================================================= */}
      {appError && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-rose-500/30 bg-rose-950/40 p-4 text-xs font-medium text-rose-300 backdrop-blur-md">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{appError}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* --- Live Kanban Pipeline Board Container --- */}
      {/* ========================================================================= */}
      <div className="relative rounded-3xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-6 backdrop-blur-xl shadow-2xl overflow-x-auto">
        <KanbanBoard
          applicants={applicants}
          onStatusChange={handleStatusChange}
          onSelectCandidate={(candidate) => setSelectedCandidate(candidate)}
        />
      </div>

      {/* ========================================================================= */}
      {/* --- Candidate AI Inspection Drawer Modal --- */}
      {/* ========================================================================= */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md transition-all">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/95 p-6 sm:p-7 shadow-2xl backdrop-blur-2xl space-y-5">
            {/* Top Horizon Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950 font-mono text-sm font-bold text-white shadow-inner">
                  {getInitials((selectedCandidate.candidateId || selectedCandidate.candidate)?.name)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {(selectedCandidate.candidateId || selectedCandidate.candidate)?.name || 'Candidate Evaluation'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {(selectedCandidate.candidateId || selectedCandidate.candidate)?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ScoreBadge
                  score={selectedCandidate.matchScore ?? selectedCandidate.aiAnalysis?.matchScore ?? 0}
                  size="md"
                  variant="glow"
                />
                <button
                  type="button"
                  onClick={() => setSelectedCandidate(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-slate-400 transition hover:border-slate-700 hover:text-white cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* AI Evaluation Body */}
            <div className="space-y-4 text-xs">
              {/* Gemini Narrative Summary */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-pink-400">
                  <Bot className="h-4 w-4" />
                  <span>Gemini ATS Evaluation Narrative</span>
                </div>
                <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 leading-relaxed text-slate-300">
                  {selectedCandidate.aiFeedback || selectedCandidate.aiAnalysis?.summary || 'No detailed AI feedback recorded for this candidate.'}
                </div>
              </div>

              {/* Matched Capabilities */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Matched Technical Skills
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedCandidate.matchedSkills || selectedCandidate.aiAnalysis?.matchedSkills || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-2.5 py-1 font-mono text-xs font-bold text-cyan-300"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                      {skill}
                    </span>
                  ))}
                  {(selectedCandidate.matchedSkills || selectedCandidate.aiAnalysis?.matchedSkills || []).length === 0 && (
                    <span className="text-xs text-slate-500">No direct skill matches extracted.</span>
                  )}
                </div>
              </div>

              {/* Uploaded PDF Document Link */}
              {selectedCandidate.resumeUrl && (
                <div className="pt-2">
                  <a
                    href={selectedCandidate.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-950/40 px-4 py-2.5 text-xs font-bold text-indigo-300 transition hover:bg-indigo-950/70"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Open Uploaded Resume Document (PDF)</span>
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end border-t border-slate-800/80 pt-4">
              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-2 text-xs font-bold text-slate-200 transition hover:bg-slate-800 cursor-pointer"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PipelineView;