// import React, { useState, useMemo } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useApplications } from '../../hooks/useApplications';
// import { useJobDetails } from '../../hooks/useJobs';
// import ScoreBadge from '../../components/common/ScoreBadge';
// import { 
//   Sparkles, 
//   Search, 
//   FileText, 
//   ExternalLink, 
//   Loader2,
//   Kanban,
//   ArrowLeft,
//   X,
//   Bot,
//   CheckCircle2,
//   ChevronDown,
//   Building2,
//   MapPin,
//   Layers
// } from 'lucide-react';

// const JobApplicants = () => {
//   const { jobId } = useParams();
//   const { data: jobData, isLoading: isJobLoading } = useJobDetails(jobId);
//   const { applicants = [], isApplicantsLoading, updateStatus } = useApplications(jobId);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [minScore, setMinScore] = useState(0);
//   const [selectedApplicant, setSelectedApplicant] = useState(null);

//   const job = jobData?.job || jobData;

//   // Filter & rank applicants by AI Match Score descending
//   const filteredApplicants = useMemo(() => {
//     return (applicants || [])
//       .filter((app) => {
//         const candidate = app.candidateId || app.candidate || {};
//         const name = candidate.name?.toLowerCase() || '';
//         const email = candidate.email?.toLowerCase() || '';
//         const term = searchTerm.toLowerCase().trim();
//         const score = app.matchScore ?? app.aiAnalysis?.matchScore ?? 0;
//         return (name.includes(term) || email.includes(term)) && score >= minScore;
//       })
//       .sort((a, b) => {
//         const scoreA = a.matchScore ?? a.aiAnalysis?.matchScore ?? 0;
//         const scoreB = b.matchScore ?? b.aiAnalysis?.matchScore ?? 0;
//         return scoreB - scoreA;
//       });
//   }, [applicants, searchTerm, minScore]);

//   const getStageBadgeStyle = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'applied':
//         return 'border-blue-300 bg-blue-50 text-blue-700 shadow-xs';
//       case 'screening':
//         return 'border-indigo-300 bg-indigo-50 text-indigo-700 shadow-xs';
//       case 'interview':
//         return 'border-amber-300 bg-amber-50 text-amber-800 shadow-xs';
//       case 'offered':
//         return 'border-emerald-300 bg-emerald-50 text-emerald-700 shadow-xs';
//       case 'rejected':
//         return 'border-rose-300 bg-rose-50 text-rose-700 shadow-xs';
//       default:
//         return 'border-slate-300 bg-slate-100 text-slate-700';
//     }
//   };

//   const getInitials = (name) => {
//     if (!name) return 'U';
//     return name
//       .trim()
//       .split(/\s+/)
//       .map((n) => n[0])
//       .slice(0, 2)
//       .join('')
//       .toUpperCase();
//   };

//   if (isJobLoading || isApplicantsLoading) {
//     return (
//       <div className="flex min-h-[450px] w-full flex-col items-center justify-center gap-3 font-sans">
//         <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-200 bg-white shadow-xl shadow-blue-500/10 backdrop-blur-md">
//           <Loader2 className="h-6 w-6 animate-spin text-pink-600 stroke-[2.5]" />
//         </div>
//         <p className="font-mono text-xs font-bold text-slate-700">
//           Computing neural candidate rankings with Gemini ATS...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 font-sans text-slate-900 antialiased">
      
//       {/* ========================================================================= */}
//       {/* --- Top Breadcrumb & Header Banner --- */}
//       {/* ========================================================================= */}
//       <div className="relative overflow-hidden rounded-3xl border border-white/90 bg-white/80 p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(37,99,235,0.12),0_10px_30px_rgba(236,72,153,0.1)] transition-all">
//         {/* Hardware-Accelerated Ambient Glows */}
//         <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-pink-500/30 via-rose-400/20 to-transparent blur-3xl transform-gpu will-change-transform" />
//         <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-500/30 via-sky-400/20 to-transparent blur-3xl transform-gpu will-change-transform" />
//         <div className="pointer-events-none absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-blue-600 via-pink-500 to-indigo-600 shadow-[0_0_12px_rgba(236,72,153,0.4)]" />

//         <div className="relative z-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
//           <div className="space-y-2">
//             <Link
//               to="/recruiter/dashboard"
//               className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-slate-600 transition hover:text-pink-600"
//             >
//               <ArrowLeft className="h-4 w-4 text-blue-600 stroke-[2.5]" />
//               Back to Dashboard
//             </Link>

//             <div className="flex flex-wrap items-center gap-3">
//               <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
//                 {job?.title || 'Position Applicants'}
//               </h1>
//               <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50/90 px-3 py-1 font-mono text-xs font-extrabold text-pink-700 shadow-xs">
//                 <Sparkles className="h-3.5 w-3.5 text-pink-600 animate-spin" style={{ animationDuration: '6s' }} />
//                 {filteredApplicants.length} Ranked
//               </span>
//             </div>

//             <div className="flex flex-wrap items-center gap-x-4 text-xs font-semibold text-slate-600">
//               <span className="flex items-center gap-1.5">
//                 <Building2 className="h-3.5 w-3.5 text-blue-600 stroke-[2.2]" />
//                 {job?.department || 'Engineering'}
//               </span>
//               <span className="text-slate-300">•</span>
//               <span className="flex items-center gap-1.5">
//                 <MapPin className="h-3.5 w-3.5 text-pink-600 stroke-[2.2]" />
//                 {job?.location || 'Remote'}
//               </span>
//               <span className="text-slate-300">•</span>
//               <span className="flex items-center gap-1.5">
//                 <Layers className="h-3.5 w-3.5 text-indigo-600 stroke-[2.2]" />
//                 {job?.jobType || 'Full-time'}
//               </span>
//             </div>
//           </div>

//           <Link
//             to={`/recruiter/jobs/${jobId}/pipeline`}
//             className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-xs font-extrabold text-slate-800 shadow-xs transition-all hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50/40 active:scale-95 self-start sm:self-auto"
//           >
//             <Kanban className="h-4 w-4 text-indigo-600 stroke-[2.2]" />
//             <span>Switch to Kanban Pipeline</span>
//           </Link>
//         </div>
//       </div>

//       {/* ========================================================================= */}
//       {/* --- Search & Score Filter Strip --- */}
//       {/* ========================================================================= */}
//       <div className="flex flex-col gap-3 rounded-2xl border border-white/90 bg-white/85 p-3.5 sm:p-4 backdrop-blur-xl shadow-xs sm:flex-row sm:items-center sm:justify-between">
        
//         {/* Search Input */}
//         <div className="relative flex-1">
//           <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 stroke-[2.2]" />
//           <input
//             type="text"
//             placeholder="Search candidate by name or email..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-xs font-bold text-slate-950 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-xs"
//           />
//         </div>

//         {/* Score Threshold Select */}
//         <div className="flex items-center gap-2.5">
//           <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-slate-700 whitespace-nowrap">
//             Min AI Fit:
//           </span>
//           <div className="relative">
//             <select
//               value={minScore}
//               onChange={(e) => setMinScore(Number(e.target.value))}
//               className="h-11 appearance-none rounded-xl border border-slate-300 bg-white pl-3.5 pr-8 font-mono text-xs font-bold text-slate-900 outline-none transition hover:border-pink-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/15 cursor-pointer shadow-xs"
//             >
//               <option value={0}>All Scores (0%+)</option>
//               <option value={60}>Good Match (60%+)</option>
//               <option value={75}>Strong Fit (75%+)</option>
//               <option value={85}>Top Match (85%+)</option>
//             </select>
//             <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
//           </div>
//         </div>
//       </div>

//       {/* ========================================================================= */}
//       {/* --- Ranked Applicants Table --- */}
//       {/* ========================================================================= */}
//       <div className="overflow-hidden rounded-3xl border border-white/90 bg-white/90 backdrop-blur-xl shadow-[0_15px_40px_rgba(37,99,235,0.08)]">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left text-xs text-slate-800">
//             <thead className="border-b border-slate-200 bg-gradient-to-r from-blue-50/50 via-white to-pink-50/40 font-mono text-[11px] uppercase tracking-wider text-slate-700 font-extrabold">
//               <tr>
//                 <th className="px-5 py-4">Candidate</th>
//                 <th className="px-5 py-4">AI Semantic Match</th>
//                 <th className="px-5 py-4">Key Matched Capabilities</th>
//                 <th className="px-5 py-4">Hiring Stage</th>
//                 <th className="px-5 py-4 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {filteredApplicants.length === 0 ? (
//                 <tr>
//                   <td colSpan={5} className="py-14 text-center text-slate-500">
//                     <p className="text-sm font-black text-slate-900">No matching applicants found</p>
//                     <p className="mt-1 text-xs font-semibold text-slate-600">Try adjusting your search criteria or minimum score filter.</p>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredApplicants.map((app) => {
//                   const candidate = app.candidateId || app.candidate || {};
//                   const score = app.matchScore ?? app.aiAnalysis?.matchScore ?? 0;
//                   const skills = app.matchedSkills || app.aiAnalysis?.matchedSkills || job?.skillsRequired || [];
//                   const candidateName = candidate.name || 'Anonymous Candidate';
//                   const candidateEmail = candidate.email || 'No email provided';

//                   return (
//                     <tr
//                       key={app._id}
//                       className="group transition-colors duration-150 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-pink-50/20"
//                     >
//                       {/* Candidate Name & Initials */}
//                       <td className="px-5 py-4">
//                         <div className="flex items-center gap-3">
//                           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 font-mono text-xs font-extrabold text-blue-700 shadow-xs">
//                             {getInitials(candidateName)}
//                           </div>
//                           <div className="min-w-0">
//                             <p className="font-extrabold text-slate-950 group-hover:text-blue-700 transition-colors truncate">
//                               {candidateName}
//                             </p>
//                             <p className="text-[11px] font-semibold text-slate-500 truncate">
//                               {candidateEmail}
//                             </p>
//                           </div>
//                         </div>
//                       </td>

//                       {/* AI Match Score Badge */}
//                       <td className="px-5 py-4">
//                         <ScoreBadge score={score} size="sm" variant="subtle" showPulse={score >= 80} />
//                       </td>

//                       {/* Key Matched Skills */}
//                       <td className="px-5 py-4">
//                         <div className="flex flex-wrap items-center gap-1.5 max-w-xs">
//                           {skills.slice(0, 3).map((skill, idx) => (
//                             <span
//                               key={idx}
//                               className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-700"
//                             >
//                               {skill}
//                             </span>
//                           ))}
//                           {skills.length > 3 && (
//                             <span className="font-mono text-[11px] font-extrabold text-pink-600">
//                               +{skills.length - 3}
//                             </span>
//                           )}
//                         </div>
//                       </td>

//                       {/* Stage Selector Dropdown */}
//                       <td className="px-5 py-4">
//                         <div className="relative inline-block">
//                           <select
//                             value={app.status || 'applied'}
//                             onChange={(e) =>
//                               updateStatus && updateStatus({ applicationId: app._id, status: e.target.value })
//                             }
//                             className={`h-8 appearance-none rounded-lg border pl-3 pr-7 font-mono text-[11px] font-extrabold uppercase tracking-wider outline-none cursor-pointer ${getStageBadgeStyle(
//                               app.status
//                             )}`}
//                           >
//                             <option value="applied">Applied</option>
//                             <option value="screening">Screening</option>
//                             <option value="interview">Interview</option>
//                             <option value="offered">Offered</option>
//                             <option value="rejected">Rejected</option>
//                           </select>
//                           <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 opacity-75" />
//                         </div>
//                       </td>

//                       {/* Actions */}
//                       <td className="px-5 py-4 text-right">
//                         <button
//                           type="button"
//                           onClick={() => setSelectedApplicant(app)}
//                           className="inline-flex h-8 items-center gap-1.5 rounded-xl border border-pink-200 bg-pink-50 px-3 text-xs font-bold text-pink-700 shadow-xs transition-all hover:border-pink-300 hover:bg-pink-100/70 hover:shadow-sm active:scale-95 cursor-pointer"
//                         >
//                           <FileText className="h-3.5 w-3.5 text-pink-600 stroke-[2.2]" />
//                           <span>AI Inspection</span>
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ========================================================================= */}
//       {/* --- Candidate AI Inspection Modal Window --- */}
//       {/* ========================================================================= */}
//       {selectedApplicant && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-md transition-all font-sans antialiased">
//           <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/95 bg-white/95 p-6 sm:p-8 shadow-[0_25px_65px_rgba(37,99,235,0.18),0_12px_35px_rgba(236,72,153,0.15)] backdrop-blur-2xl space-y-6">
//             {/* Top Multi-Color Neon Accent Rim */}
//             <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-pink-500 to-indigo-600 shadow-[0_0_12px_rgba(236,72,153,0.5)]" />

//             {/* Header */}
//             <div className="flex items-start justify-between border-b border-slate-200 pb-5">
//               <div className="flex items-center gap-3.5">
//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 font-mono text-sm font-black text-blue-700 shadow-xs">
//                   {getInitials((selectedApplicant.candidateId || selectedApplicant.candidate)?.name)}
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-black text-slate-950">
//                     {(selectedApplicant.candidateId || selectedApplicant.candidate)?.name || 'Candidate Evaluation'}
//                   </h3>
//                   <p className="text-xs font-semibold text-slate-500">
//                     {(selectedApplicant.candidateId || selectedApplicant.candidate)?.email}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <ScoreBadge
//                   score={selectedApplicant.matchScore ?? selectedApplicant.aiAnalysis?.matchScore ?? 0}
//                   size="md"
//                   variant="glow"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setSelectedApplicant(null)}
//                   className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-pink-300 hover:bg-pink-50 hover:text-pink-700 active:scale-95 cursor-pointer shadow-xs"
//                 >
//                   <X className="h-4 w-4 stroke-[2.5]" />
//                 </button>
//               </div>
//             </div>

//             {/* AI Evaluation Body */}
//             <div className="space-y-4 text-xs">
//               {/* Gemini Narrative */}
//               <div className="space-y-1.5">
//                 <div className="flex items-center gap-1.5 font-extrabold text-pink-700">
//                   <Bot className="h-4 w-4 stroke-[2.5] text-pink-600" />
//                   <span>Gemini ATS Evaluation Narrative</span>
//                 </div>
//                 <div className="rounded-2xl border border-pink-200/80 bg-gradient-to-br from-pink-50/40 via-white to-blue-50/30 p-4 leading-relaxed font-semibold text-slate-800 shadow-2xs">
//                   {selectedApplicant.aiFeedback || selectedApplicant.aiAnalysis?.summary || 'No detailed AI feedback recorded for this candidate.'}
//                 </div>
//               </div>

//               {/* Matched Skills */}
//               <div className="space-y-2">
//                 <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-slate-700">
//                   Matched Technical Skills
//                 </span>
//                 <div className="flex flex-wrap gap-1.5">
//                   {(selectedApplicant.matchedSkills || selectedApplicant.aiAnalysis?.matchedSkills || []).map((skill, idx) => (
//                     <span
//                       key={idx}
//                       className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 font-mono text-xs font-extrabold text-blue-700 shadow-xs"
//                     >
//                       <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 stroke-[2.5]" />
//                       {skill}
//                     </span>
//                   ))}
//                   {(selectedApplicant.matchedSkills || selectedApplicant.aiAnalysis?.matchedSkills || []).length === 0 && (
//                     <span className="text-xs font-semibold text-slate-500">No direct skill matches extracted.</span>
//                   )}
//                 </div>
//               </div>

//               {/* Resume Document Link */}
//               {selectedApplicant.resumeUrl && (
//                 <div className="pt-2">
//                   <a
//                     href={selectedApplicant.resumeUrl}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-xs font-extrabold text-blue-700 shadow-xs transition hover:bg-blue-100 hover:border-blue-300"
//                   >
//                     <ExternalLink className="h-4 w-4 stroke-[2.5]" />
//                     <span>Open Uploaded Resume Document (PDF)</span>
//                   </a>
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             <div className="flex items-center justify-end border-t border-slate-200 pt-4">
//               <button
//                 type="button"
//                 onClick={() => setSelectedApplicant(null)}
//                 className="rounded-xl border border-slate-300 bg-white px-5 py-2 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:text-slate-950 active:scale-95 cursor-pointer"
//               >
//                 Close Inspection
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobApplicants;







// frontend/src/pages/recruiter/JobApplicants.jsx
import React, { useState, useMemo, memo } from 'react';
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
  CheckCircle2,
  ChevronDown,
  Building2,
  MapPin,
  Layers,
  UserCheck
} from 'lucide-react';

export const JobApplicants = memo(() => {
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
        return 'border-blue-200/90 bg-blue-50 text-blue-700';
      case 'screening':
        return 'border-indigo-200/90 bg-indigo-50 text-indigo-700';
      case 'interview':
        return 'border-amber-200/90 bg-amber-50 text-amber-800';
      case 'offered':
        return 'border-emerald-200/90 bg-emerald-50 text-emerald-700';
      case 'rejected':
        return 'border-rose-200/90 bg-rose-50 text-rose-700';
      default:
        return 'border-slate-200 bg-slate-100 text-slate-700';
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
      <div className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-2.5 font-sans">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-200/80 bg-indigo-50 text-indigo-600 shadow-2xs">
          <Loader2 className="h-5 w-5 animate-spin stroke-[2.4]" />
        </div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Computing neural candidate rankings with Gemini ATS...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl space-y-4 sm:space-y-5 font-sans text-slate-800 antialiased">
      
      {/* Top Breadcrumb & Header Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-4 sm:p-5 shadow-2xs">
        {/* Top Multi-Color Brand Line */}
        <div 
          aria-hidden="true" 
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-600 to-pink-500" 
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <Link
              to="/recruiter/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
            >
              <ArrowLeft className="h-3.5 w-3.5 stroke-[2.2]" />
              <span>Back to Dashboard</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-950">
                {job?.title || 'Position Applicants'}
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-2.5 py-0.5 font-mono text-[11px] font-bold text-pink-700 shadow-2xs">
                <Sparkles className="h-3 w-3 text-pink-500" />
                <span>{filteredApplicants.length} Ranked</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-medium pt-0.5">
              <span className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-blue-600" />
                <span>{job?.department || 'Engineering'}</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-pink-600" />
                <span>{job?.location || 'Remote'}</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-indigo-600" />
                <span>{job?.jobType || 'Full-time'}</span>
              </span>
            </div>
          </div>

          <Link
            to={`/recruiter/jobs/${jobId}/pipeline`}
            className="inline-flex h-9 sm:h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition active:scale-[0.98] self-start sm:self-auto cursor-pointer"
          >
            <Kanban className="h-3.5 w-3.5 text-indigo-600 stroke-[2.2]" />
            <span>Switch to Kanban Pipeline</span>
          </Link>
        </div>
      </section>

      {/* Search & Score Filter Strip */}
      <div className="flex flex-col gap-2.5 rounded-2xl border border-slate-200/90 bg-white/95 p-3 sm:p-3.5 shadow-2xs sm:flex-row sm:items-center sm:justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 stroke-[2]" />
          <input
            type="text"
            placeholder="Search candidate by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15"
          />
        </div>

        {/* Score Threshold Select */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">
            Min AI Fit:
          </span>
          <div className="relative">
            <select
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="h-10 appearance-none rounded-xl border border-slate-300 bg-white pl-3 pr-8 font-mono text-xs font-bold text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15 cursor-pointer"
            >
              <option value={0}>All Scores (0%+)</option>
              <option value={60}>Good Match (60%+)</option>
              <option value={75}>Strong Fit (75%+)</option>
              <option value={85}>Top Match (85%+)</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Ranked Applicants Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-800">
            <thead className="border-b border-slate-100 bg-slate-50/70 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-500 font-bold">
              <tr>
                <th className="px-4 py-3 sm:px-5 sm:py-3.5">Candidate</th>
                <th className="px-4 py-3 sm:px-5 sm:py-3.5">AI Semantic Match</th>
                <th className="px-4 py-3 sm:px-5 sm:py-3.5">Key Matched Skills</th>
                <th className="px-4 py-3 sm:px-5 sm:py-3.5">Hiring Stage</th>
                <th className="px-4 py-3 sm:px-5 sm:py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApplicants.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <UserCheck className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                    <p className="text-sm font-bold text-slate-900">No matching applicants found</p>
                    <p className="mt-0.5 text-xs text-slate-500">Try adjusting your search criteria or minimum score filter.</p>
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
                      className="group transition-colors duration-100 hover:bg-slate-50/60"
                    >
                      {/* Candidate Name & Initials */}
                      <td className="px-4 py-3 sm:px-5 sm:py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 font-mono text-xs font-bold text-indigo-700 shadow-2xs">
                            {getInitials(candidateName)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-950 group-hover:text-indigo-600 transition-colors truncate">
                              {candidateName}
                            </p>
                            <p className="text-[11px] text-slate-500 truncate">
                              {candidateEmail}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* AI Match Score Badge */}
                      <td className="px-4 py-3 sm:px-5 sm:py-3.5">
                        <ScoreBadge score={score} size="sm" variant="subtle" showPulse={score >= 80} />
                      </td>

                      {/* Key Matched Skills */}
                      <td className="px-4 py-3 sm:px-5 sm:py-3.5">
                        <div className="flex flex-wrap items-center gap-1.5 max-w-xs">
                          {skills.slice(0, 3).map((skill, idx) => (
                            <span
                              key={idx}
                              className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-700"
                            >
                              {skill}
                            </span>
                          ))}
                          {skills.length > 3 && (
                            <span className="font-mono text-[11px] font-bold text-pink-600">
                              +{skills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Stage Selector Dropdown */}
                      <td className="px-4 py-3 sm:px-5 sm:py-3.5">
                        <div className="relative inline-block">
                          <select
                            value={app.status || 'applied'}
                            onChange={(e) =>
                              updateStatus && updateStatus({ applicationId: app._id, status: e.target.value })
                            }
                            className={`h-7 appearance-none rounded-lg border pl-2.5 pr-6 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider outline-none cursor-pointer ${getStageBadgeStyle(
                              app.status
                            )}`}
                          >
                            <option value="applied">Applied</option>
                            <option value="screening">Screening</option>
                            <option value="interview">Interview</option>
                            <option value="offered">Offered</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 opacity-75" />
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 sm:px-5 sm:py-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedApplicant(app)}
                          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-pink-200 bg-pink-50 px-2.5 sm:px-3 text-xs font-bold text-pink-700 shadow-2xs transition hover:bg-pink-100/70 active:scale-[0.98] cursor-pointer"
                        >
                          <FileText className="h-3.5 w-3.5 text-pink-600 stroke-[2.2]" />
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

      {/* Candidate AI Inspection Modal Window */}
      {selectedApplicant && (
        <div 
          className="fixed inset-0 z-[999999] flex items-center justify-center p-4 font-sans overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop Scrim */}
          <div
            onClick={() => setSelectedApplicant(null)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-150"
            aria-hidden="true"
          />

          <div className="relative my-auto w-full max-w-xl overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 p-5 sm:p-7 text-slate-800 shadow-2xl space-y-5">
            {/* Top Multi-Color Accent Rim */}
            <div 
              aria-hidden="true" 
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-600 to-pink-500" 
            />

            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 font-mono text-sm font-bold text-indigo-700 shadow-2xs">
                  {getInitials((selectedApplicant.candidateId || selectedApplicant.candidate)?.name)}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-950 leading-snug">
                    {(selectedApplicant.candidateId || selectedApplicant.candidate)?.name || 'Candidate Evaluation'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {(selectedApplicant.candidateId || selectedApplicant.candidate)?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ScoreBadge
                  score={selectedApplicant.matchScore ?? selectedApplicant.aiAnalysis?.matchScore ?? 0}
                  size="md"
                  variant="subtle"
                />
                <button
                  type="button"
                  onClick={() => setSelectedApplicant(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none"
                  aria-label="Close inspection modal"
                >
                  <X className="h-4 w-4 stroke-[2]" />
                </button>
              </div>
            </div>

            {/* AI Evaluation Body */}
            <div className="space-y-4 text-xs">
              {/* Gemini Narrative */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-pink-700">
                  <Bot className="h-4 w-4 stroke-[2.2] text-pink-600" />
                  <span>Gemini ATS Evaluation Narrative</span>
                </div>
                <div className="rounded-xl border border-pink-200/80 bg-pink-50/40 p-3.5 leading-relaxed font-normal text-slate-700">
                  {selectedApplicant.aiFeedback || selectedApplicant.aiAnalysis?.summary || 'No detailed AI feedback recorded for this candidate.'}
                </div>
              </div>

              {/* Matched Skills */}
              <div className="space-y-1.5">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-600">
                  Matched Technical Skills
                </span>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {(selectedApplicant.matchedSkills || selectedApplicant.aiAnalysis?.matchedSkills || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-md border border-indigo-200/90 bg-indigo-50 px-2 py-0.5 font-mono text-[11px] font-bold text-indigo-700 shadow-2xs"
                    >
                      <CheckCircle2 className="h-3 w-3 text-indigo-600 stroke-[2.2]" />
                      <span>{skill}</span>
                    </span>
                  ))}
                  {(selectedApplicant.matchedSkills || selectedApplicant.aiAnalysis?.matchedSkills || []).length === 0 && (
                    <span className="text-xs text-slate-400">No direct skill matches extracted.</span>
                  )}
                </div>
              </div>

              {/* Resume Document Link */}
              {selectedApplicant.resumeUrl && (
                <div className="pt-1">
                  <a
                    href={selectedApplicant.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3.5 py-2 text-xs font-bold text-blue-700 shadow-2xs transition hover:bg-blue-100"
                  >
                    <ExternalLink className="h-3.5 w-3.5 stroke-[2.2]" />
                    <span>Open Uploaded Resume Document (PDF)</span>
                  </a>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => setSelectedApplicant(null)}
                className="h-9 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 shadow-2xs transition hover:bg-slate-50 active:scale-[0.98] cursor-pointer"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

JobApplicants.displayName = 'JobApplicants';
export default JobApplicants;