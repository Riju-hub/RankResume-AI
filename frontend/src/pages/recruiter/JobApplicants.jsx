import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApplications } from '../../hooks/useApplications';
import { useJobDetails } from '../../hooks/useJobs';
import ScoreBadge from '../../components/common/ScoreBadge';
import { 
  Sparkles, 
  Search, 
  FileText, 
  ExternalLink, 
  Loader2,
  Kanban,
  ArrowLeft,
  X,
  Bot,
  User,
  Mail,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Building2,
  MapPin,
  Layers,
  Zap,
  Target
} from 'lucide-react';

const JobApplicants = () => {
  const { jobId } = useParams();
  const { data: jobData, isLoading: isJobLoading } = useJobDetails(jobId);
  const { applicants = [], isApplicantsLoading, updateStatus } = useApplications(jobId);

  const [searchTerm, setSearchTerm] = useState('');
  const [minScore, setMinScore] = useState(0);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const job = jobData?.job || jobData;

  // Filter & rank applicants by AI Match Score descending
  const filteredApplicants = useMemo(() => {
    return (applicants || [])
      .filter((app) => {
        const candidate = app.candidateId || app.candidate || {};
        const name = candidate.name?.toLowerCase() || '';
        const email = candidate.email?.toLowerCase() || '';
        const term = searchTerm.toLowerCase().trim();
        const score = app.matchScore ?? app.aiAnalysis?.matchScore ?? 0;
        return (name.includes(term) || email.includes(term)) && score >= minScore;
      })
      .sort((a, b) => {
        const scoreA = a.matchScore ?? a.aiAnalysis?.matchScore ?? 0;
        const scoreB = b.matchScore ?? b.aiAnalysis?.matchScore ?? 0;
        return scoreB - scoreA;
      });
  }, [applicants, searchTerm, minScore]);

  const getStageBadgeStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'applied':
        return 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300 shadow-sm shadow-cyan-500/10';
      case 'screening':
        return 'border-indigo-500/40 bg-indigo-950/40 text-indigo-300 shadow-sm shadow-indigo-500/10';
      case 'interview':
        return 'border-amber-500/40 bg-amber-950/40 text-amber-300 shadow-sm shadow-amber-500/10';
      case 'offered':
        return 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 shadow-sm shadow-emerald-500/10';
      case 'rejected':
        return 'border-rose-500/40 bg-rose-950/40 text-rose-300 shadow-sm shadow-rose-500/10';
      default:
        return 'border-slate-800 bg-slate-900 text-slate-400';
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
          Computing neural candidate rankings with Gemini ATS...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      
      {/* ========================================================================= */}
      {/* --- Top Breadcrumb & Header Banner --- */}
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
                {job?.title || 'Position Applicants'}
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-950/40 px-3 py-1 font-mono text-xs font-bold text-pink-300">
                <Sparkles className="h-3.5 w-3.5 text-pink-400" />
                {filteredApplicants.length} Ranked
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
            to={`/recruiter/jobs/${jobId}/pipeline`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/80 px-4 text-xs font-bold text-slate-200 shadow-md transition-all hover:border-purple-500/40 hover:bg-purple-950/30 hover:text-purple-300 active:scale-95 self-start sm:self-auto"
          >
            <Kanban className="h-4 w-4 text-purple-400" />
            <span>Switch to Kanban Pipeline</span>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* --- Search & Score Filter Strip --- */}
      {/* ========================================================================= */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-3.5 sm:p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search candidate by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-full rounded-xl border border-slate-800 bg-slate-950/70 pl-10 pr-4 text-xs font-medium text-slate-100 placeholder-slate-500 outline-none transition focus:border-pink-500/60 focus:bg-slate-950 focus:ring-2 focus:ring-pink-500/20"
          />
        </div>

        {/* Score Threshold Select */}
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
            Min AI Fit:
          </span>
          <div className="relative">
            <select
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="h-10 appearance-none rounded-xl border border-slate-800 bg-slate-950/70 pl-3.5 pr-8 font-mono text-xs font-semibold text-slate-200 outline-none transition hover:border-slate-700 focus:border-pink-500 cursor-pointer"
            >
              <option value={0} className="bg-slate-950">All Scores (0%+)</option>
              <option value={60} className="bg-slate-950">Good Match (60%+)</option>
              <option value={75} className="bg-slate-950">Strong Fit (75%+)</option>
              <option value={85} className="bg-slate-950">Top Match (85%+)</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* --- Ranked Applicants Table --- */}
      {/* ========================================================================= */}
      <div className="overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800/80 bg-slate-950/80 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              <tr>
                <th className="px-5 py-4">Candidate</th>
                <th className="px-5 py-4">AI Semantic Match</th>
                <th className="px-5 py-4">Key Matched Capabilities</th>
                <th className="px-5 py-4">Hiring Stage</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredApplicants.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-14 text-center text-slate-500">
                    <p className="text-sm font-bold text-slate-400">No matching applicants found</p>
                    <p className="mt-1 text-xs text-slate-500">Try adjusting your search criteria or minimum score filter.</p>
                  </td>
                </tr>
              ) : (
                filteredApplicants.map((app) => {
                  const candidate = app.candidateId || app.candidate || {};
                  const score = app.matchScore ?? app.aiAnalysis?.matchScore ?? 0;
                  const skills = app.matchedSkills || app.aiAnalysis?.matchedSkills || job?.skillsRequired || [];
                  const candidateName = candidate.name || 'Anonymous Candidate';
                  const candidateEmail = candidate.email || 'No email provided';

                  return (
                    <tr
                      key={app._id}
                      className="group transition-colors duration-150 hover:bg-slate-900/90"
                    >
                      {/* Candidate Name & Initials */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs font-bold text-white shadow-inner">
                            {getInitials(candidateName)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-100 group-hover:text-pink-300 transition-colors truncate">
                              {candidateName}
                            </p>
                            <p className="text-[11px] text-slate-500 truncate">
                              {candidateEmail}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* AI Match Score Badge */}
                      <td className="px-5 py-4">
                        <ScoreBadge score={score} size="sm" variant="subtle" showPulse={score >= 80} />
                      </td>

                      {/* Key Matched Skills */}
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap items-center gap-1.5 max-w-xs">
                          {skills.slice(0, 3).map((skill, idx) => (
                            <span
                              key={idx}
                              className="rounded-lg border border-slate-800 bg-slate-950/70 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-300"
                            >
                              {skill}
                            </span>
                          ))}
                          {skills.length > 3 && (
                            <span className="font-mono text-[10px] font-bold text-pink-400">
                              +{skills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Stage Selector Dropdown */}
                      <td className="px-5 py-4">
                        <div className="relative inline-block">
                          <select
                            value={app.status || 'applied'}
                            onChange={(e) =>
                              updateStatus && updateStatus({ applicationId: app._id, status: e.target.value })
                            }
                            className={`h-7 appearance-none rounded-lg border pl-2.5 pr-6 font-mono text-[10px] font-bold uppercase tracking-wider outline-none cursor-pointer ${getStageBadgeStyle(
                              app.status
                            )}`}
                          >
                            <option value="applied" className="bg-slate-950 text-slate-200">Applied</option>
                            <option value="screening" className="bg-slate-950 text-slate-200">Screening</option>
                            <option value="interview" className="bg-slate-950 text-slate-200">Interview</option>
                            <option value="offered" className="bg-slate-950 text-slate-200">Offered</option>
                            <option value="rejected" className="bg-slate-950 text-slate-200">Rejected</option>
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 opacity-70" />
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedApplicant(app)}
                          className="inline-flex h-8 items-center gap-1.5 rounded-xl border border-pink-500/30 bg-pink-950/30 px-3 text-xs font-bold text-pink-300 transition-all hover:border-pink-500/50 hover:bg-pink-950/50 active:scale-95 cursor-pointer"
                        >
                          <FileText className="h-3.5 w-3.5 text-pink-400" />
                          <span>AI Inspection</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* --- Candidate AI Inspection Modal Window --- */}
      {/* ========================================================================= */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md transition-all">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/95 p-6 sm:p-7 shadow-2xl backdrop-blur-2xl space-y-5">
            {/* Top Horizon Glow */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />

            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950 font-mono text-sm font-bold text-white shadow-inner">
                  {getInitials((selectedApplicant.candidateId || selectedApplicant.candidate)?.name)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {(selectedApplicant.candidateId || selectedApplicant.candidate)?.name || 'Candidate Evaluation'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {(selectedApplicant.candidateId || selectedApplicant.candidate)?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ScoreBadge
                  score={selectedApplicant.matchScore ?? selectedApplicant.aiAnalysis?.matchScore ?? 0}
                  size="md"
                  variant="glow"
                />
                <button
                  type="button"
                  onClick={() => setSelectedApplicant(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-slate-400 transition hover:border-slate-700 hover:text-white cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* AI Evaluation Body */}
            <div className="space-y-4 text-xs">
              {/* Gemini Narrative */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-pink-400">
                  <Bot className="h-4 w-4" />
                  <span>Gemini ATS Evaluation Narrative</span>
                </div>
                <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 leading-relaxed text-slate-300">
                  {selectedApplicant.aiFeedback || selectedApplicant.aiAnalysis?.summary || 'No detailed AI feedback recorded for this candidate.'}
                </div>
              </div>

              {/* Matched Skills */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Matched Technical Skills
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedApplicant.matchedSkills || selectedApplicant.aiAnalysis?.matchedSkills || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-2.5 py-1 font-mono text-xs font-bold text-cyan-300"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                      {skill}
                    </span>
                  ))}
                  {(selectedApplicant.matchedSkills || selectedApplicant.aiAnalysis?.matchedSkills || []).length === 0 && (
                    <span className="text-xs text-slate-500">No direct skill matches extracted.</span>
                  )}
                </div>
              </div>

              {/* Resume Document Link */}
              {selectedApplicant.resumeUrl && (
                <div className="pt-2">
                  <a
                    href={selectedApplicant.resumeUrl}
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

            {/* Footer */}
            <div className="flex items-center justify-end border-t border-slate-800/80 pt-4">
              <button
                type="button"
                onClick={() => setSelectedApplicant(null)}
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

export default JobApplicants;