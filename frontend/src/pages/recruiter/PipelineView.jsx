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
  AlertCircle 
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
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  if (isJobLoading || isApplicantsLoading) {
    return (
      <div className="flex min-h-[450px] w-full flex-col items-center justify-center gap-3">
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-xl backdrop-blur-md">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
        </div>
        <p className="text-xs font-medium text-zinc-400">Loading candidate pipeline...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Job Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900/90 via-zinc-950/80 to-zinc-950 p-6 sm:p-7 backdrop-blur-xl shadow-xl shadow-black/20">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

        <div className="relative z-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <Link
              to="/recruiter/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition hover:text-zinc-200"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Dashboard
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl font-bold tracking-tight text-zinc-100 sm:text-2xl">
                {job?.title || 'Pipeline Kanban'}
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-300">
                <Sparkles className="h-3 w-3 text-indigo-400" />
                Live AI Drag & Drop
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 text-xs text-zinc-400">
              <span className="flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5 text-zinc-500" />
                {job?.department || 'General'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                {job?.location || 'Remote'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Layers className="h-3.5 w-3.5 text-zinc-500" />
                {job?.jobType || 'Full-time'}
              </span>
            </div>
          </div>

          <Link
            to={`/recruiter/jobs/${jobId}/applicants`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 text-xs font-medium text-zinc-200 shadow-md transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-white active:scale-95 self-start sm:self-auto"
          >
            <TableProperties className="h-4 w-4 text-indigo-400" />
            <span>Switch to Table View</span>
          </Link>
        </div>
      </div>

      {/* Error Alert Box if status update fails */}
      {appError && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-rose-500/25 bg-rose-500/10 p-4 text-xs text-rose-300 backdrop-blur-md">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{appError}</span>
        </div>
      )}

      {/* Kanban Board Container */}
      <KanbanBoard
        applicants={applicants}
        onStatusChange={handleStatusChange}
        onSelectCandidate={(candidate) => setSelectedCandidate(candidate)}
      />

      {/* Candidate AI Inspection Drawer Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md transition-all">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/95 p-6 sm:p-7 shadow-2xl backdrop-blur-2xl space-y-5">
            {/* Top Accent Horizon Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-zinc-800/70 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-800 font-mono text-sm font-bold text-zinc-100">
                  {getInitials((selectedCandidate.candidateId || selectedCandidate.candidate)?.name)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-100">
                    {(selectedCandidate.candidateId || selectedCandidate.candidate)?.name || 'Candidate Evaluation'}
                  </h3>
                  <p className="text-xs text-zinc-400">
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
                  onClick={() => setSelectedCandidate(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-zinc-700 hover:text-zinc-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* AI Evaluation Body */}
            <div className="space-y-4 text-xs">
              {/* Gemini Narrative Summary */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-indigo-400">
                  <Bot className="h-3.5 w-3.5" />
                  <span>Gemini ATS Evaluation Narrative</span>
                </div>
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-4 leading-relaxed text-zinc-300">
                  {selectedCandidate.aiFeedback || selectedCandidate.aiAnalysis?.summary || 'No detailed AI feedback recorded for this candidate.'}
                </div>
              </div>

              {/* Matched Skills */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Matched Technical Skills
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedCandidate.matchedSkills || selectedCandidate.aiAnalysis?.matchedSkills || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      {skill}
                    </span>
                  ))}
                  {(selectedCandidate.matchedSkills || selectedCandidate.aiAnalysis?.matchedSkills || []).length === 0 && (
                    <span className="text-xs text-zinc-500">No direct skill matches extracted.</span>
                  )}
                </div>
              </div>

              {/* Resume Document Link */}
              {selectedCandidate.resumeUrl && (
                <div className="pt-2">
                  <a
                    href={selectedCandidate.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-2.5 text-xs font-medium text-indigo-300 transition hover:bg-indigo-500/20"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Open Uploaded Resume Document (PDF)</span>
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end border-t border-zinc-800/70 pt-4">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="rounded-xl border border-zinc-800 bg-zinc-800 px-4 py-2 text-xs font-medium text-zinc-200 transition hover:bg-zinc-700"
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