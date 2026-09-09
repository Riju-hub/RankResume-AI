// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useApplications } from '../../hooks/useApplications';
// import ScoreBadge from '../../components/common/ScoreBadge';
// import { 
//   Briefcase, 
//   Clock, 
//   FileText, 
//   Sparkles, 
//   Building2, 
//   Loader2, 
//   ArrowRight,
//   CheckCircle2,
//   XCircle,
//   Layers,
//   ChevronRight,
//   Bot,
//   Zap
// } from 'lucide-react';

// const STAGES = [
//   { id: 'applied', label: 'Applied' },
//   { id: 'screening', label: 'AI Screening' },
//   { id: 'interview', label: 'Interview' },
//   { id: 'offered', label: 'Decision' },
// ];

// const MyApplications = () => {
//   const { myApplications = [], isMyApplicationsLoading } = useApplications();

//   const getStageIndex = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'applied':
//         return 0;
//       case 'screening':
//         return 1;
//       case 'interview':
//         return 2;
//       case 'offered':
//       case 'rejected':
//         return 3;
//       default:
//         return 0;
//     }
//   };

//   const getStatusBadge = (status) => {
//     const s = status?.toLowerCase();
//     switch (s) {
//       case 'applied':
//         return 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300 shadow-sm shadow-cyan-500/10';
//       case 'screening':
//         return 'border-indigo-500/40 bg-indigo-950/40 text-indigo-300 shadow-sm shadow-indigo-500/10';
//       case 'interview':
//         return 'border-amber-500/40 bg-amber-950/40 text-amber-300 shadow-sm shadow-amber-500/10';
//       case 'offered':
//         return 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 shadow-sm shadow-emerald-500/10';
//       case 'rejected':
//         return 'border-rose-500/40 bg-rose-950/40 text-rose-300 shadow-sm shadow-rose-500/10';
//       default:
//         return 'border-slate-800 bg-slate-900 text-slate-400';
//     }
//   };

//   if (isMyApplicationsLoading) {
//     return (
//       <div className="flex min-h-[450px] w-full flex-col items-center justify-center gap-3 font-sans">
//         <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-md">
//           <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
//         </div>
//         <p className="font-mono text-xs font-semibold text-slate-400">
//           Syncing application vector pipelines...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 font-sans">
//       {/* ========================================================================= */}
//       {/* --- Candidate Hub Header Banner --- */}
//       {/* ========================================================================= */}
//       <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 sm:flex sm:items-center sm:justify-between sm:p-8 backdrop-blur-xl shadow-2xl">
        
//         {/* Hardware-Accelerated Ambient Glows */}
//         <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-500/15 blur-3xl transform-gpu will-change-transform" />
//         <div className="pointer-events-none absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-indigo-500/15 blur-3xl transform-gpu will-change-transform" />
//         <div className="pointer-events-none absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

//         <div className="relative z-10 space-y-2">
//           <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-0.5 text-xs font-semibold text-cyan-300">
//             <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
//             <span>Candidate Portal</span>
//           </div>
          
//           <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
//             My <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">Applications</span>
//           </h1>
          
//           <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
//             Monitor dynamic hiring pipelines, stage advancements, and multi-modal ATS vector match scores in real time.
//           </p>
//         </div>

//         <div className="relative z-10 mt-5 sm:mt-0">
//           <Link
//             to="/jobs"
//             className="group inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 px-5 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] hover:shadow-indigo-600/30 active:scale-95"
//           >
//             <Zap className="h-3.5 w-3.5" />
//             <span>Explore Open Roles</span>
//             <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
//           </Link>
//         </div>
//       </div>

//       {/* ========================================================================= */}
//       {/* --- Applications Listing --- */}
//       {/* ========================================================================= */}
//       {myApplications.length === 0 ? (
//         <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 p-8 text-center backdrop-blur-sm">
//           <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-500 shadow-md">
//             <Briefcase className="h-6 w-6" />
//           </div>
//           <h3 className="mt-4 text-base font-bold text-white">No applications submitted yet</h3>
//           <p className="mt-1 text-xs text-slate-400 max-w-sm leading-relaxed">
//             You haven't applied to any job postings yet. Find a position matching your profile and test your semantic score.
//           </p>
//           <Link
//             to="/jobs"
//             className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-bold text-cyan-400 transition-all hover:bg-slate-800 hover:text-cyan-300 active:scale-95"
//           >
//             <span>Browse Job Board</span>
//             <ChevronRight className="h-3.5 w-3.5" />
//           </Link>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {myApplications.map((app) => {
//             const jobInfo = app.jobId || app.job || {};
//             const jobTitle = jobInfo.title || 'Position';
//             const department = jobInfo.department || 'Engineering';
//             const location = jobInfo.location || 'Remote';
//             const score = app.matchScore ?? app.aiAnalysis?.matchScore ?? 0;
//             const feedback = app.aiFeedback || app.aiAnalysis?.summary || '';
//             const matchedSkills = app.aiAnalysis?.matchedSkills || [];
//             const appliedDate = app.appliedAt || app.createdAt;
//             const status = (app.status || 'applied').toLowerCase();
//             const currentStageIndex = getStageIndex(status);
//             const isRejected = status === 'rejected';

//             const formattedDate = appliedDate
//               ? new Date(appliedDate).toLocaleDateString('en-US', {
//                   month: 'short',
//                   day: 'numeric',
//                   year: 'numeric',
//                 })
//               : 'Recently';

//             return (
//               <div
//                 key={app._id}
//                 className="group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5 sm:p-7 backdrop-blur-xl transition-all duration-200 hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-2xl hover:shadow-black/40"
//               >
//                 {/* Subtle Ambient Border Flare */}
//                 <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

//                 {/* Top Row: Title, Metadata, Status, Score */}
//                 <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
//                   <div className="space-y-2">
//                     <div className="flex flex-wrap items-center gap-2.5">
//                       <h2 className="text-base sm:text-lg font-bold text-white transition-colors group-hover:text-cyan-300">
//                         {jobTitle}
//                       </h2>
//                       <span
//                         className={`inline-flex items-center rounded-md border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(
//                           status
//                         )}`}
//                       >
//                         {status}
//                       </span>
//                     </div>

//                     <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
//                       <span className="flex items-center gap-1.5">
//                         <Building2 className="h-3.5 w-3.5 text-slate-500" />
//                         {department}
//                       </span>
//                       <span className="text-slate-600">•</span>
//                       <span className="flex items-center gap-1.5">
//                         <Layers className="h-3.5 w-3.5 text-slate-500" />
//                         {location}
//                       </span>
//                       <span className="text-slate-600">•</span>
//                       <span className="flex items-center gap-1.5">
//                         <Clock className="h-3.5 w-3.5 text-slate-500" />
//                         Applied {formattedDate}
//                       </span>
//                       {app.resumeUrl && (
//                         <>
//                           <span className="text-slate-600">•</span>
//                           <a
//                             href={app.resumeUrl}
//                             target="_blank"
//                             rel="noreferrer"
//                             className="inline-flex items-center gap-1 font-semibold text-cyan-400 transition hover:text-cyan-300 hover:underline"
//                           >
//                             <FileText className="h-3.5 w-3.5" />
//                             Resume PDF
//                           </a>
//                         </>
//                       )}
//                     </div>
//                   </div>

//                   {/* AI Match Badge */}
//                   <div className="flex items-center gap-2 self-start sm:self-auto">
//                     <ScoreBadge score={score} size="md" variant="glow" />
//                   </div>
//                 </div>

//                 {/* Pipeline Progression Stepper */}
//                 <div className="mt-6 border-t border-slate-800/80 pt-5">
//                   <div className="flex items-center justify-between">
//                     <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                       Live Stage Pipeline
//                     </p>
//                     {isRejected && (
//                       <span className="font-mono text-[10px] font-bold text-rose-400">
//                         Application Concluded
//                       </span>
//                     )}
//                   </div>

//                   <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-4">
//                     {STAGES.map((stg, idx) => {
//                       const isCompleted = idx < currentStageIndex;
//                       const isCurrent = idx === currentStageIndex;

//                       return (
//                         <div key={stg.id} className="relative flex flex-col gap-1.5">
//                           {/* Step Progress Line */}
//                           <div
//                             className={`h-1.5 w-full rounded-full transition-all duration-300 ${
//                               isRejected && isCurrent
//                                 ? 'bg-rose-500 shadow-sm shadow-rose-500/50'
//                                 : isCompleted || isCurrent
//                                 ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500'
//                                 : 'bg-slate-800'
//                             }`}
//                           />

//                           <div className="flex items-center gap-1">
//                             {isCompleted ? (
//                               <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
//                             ) : isCurrent && isRejected ? (
//                               <XCircle className="h-3 w-3 text-rose-400 shrink-0" />
//                             ) : (
//                               <span
//                                 className={`h-1.5 w-1.5 rounded-full ${
//                                   isCurrent ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'
//                                 }`}
//                               />
//                             )}
//                             <span
//                               className={`truncate font-mono text-[10px] font-bold ${
//                                 isCurrent
//                                   ? isRejected
//                                     ? 'text-rose-400'
//                                     : 'text-cyan-300'
//                                   : isCompleted
//                                   ? 'text-slate-300'
//                                   : 'text-slate-600'
//                               }`}
//                             >
//                               {isCurrent && isRejected ? 'Archived' : stg.label}
//                             </span>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Gemini AI Match Feedback & Extracted Skills */}
//                 {(feedback || matchedSkills.length > 0) && (
//                   <div className="mt-5 rounded-2xl border border-slate-800/90 bg-slate-950/60 p-4 shadow-inner">
//                     <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
//                       <Bot className="h-4 w-4" />
//                       <span>Gemini Evaluation Insights</span>
//                     </div>

//                     {feedback && (
//                       <p className="mt-2 text-xs leading-relaxed text-slate-300">
//                         {feedback}
//                       </p>
//                     )}

//                     {matchedSkills.length > 0 && (
//                       <div className="mt-3.5 flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-800/80">
//                         <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
//                           Matched Skills:
//                         </span>
//                         {matchedSkills.map((skill, idx) => (
//                           <span
//                             key={idx}
//                             className="rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-2.5 py-0.5 font-mono text-[10px] font-bold text-cyan-300"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyApplications;







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
  Bot,
  Zap
} from 'lucide-react';

const STAGES = [
  { id: 'applied', label: 'Applied' },
  { id: 'screening', label: 'AI Screening' },
  { id: 'interview', label: 'Interview' },
  { id: 'offered', label: 'Decision' },
];

const MyApplications = () => {
  const { myApplications = [], isMyApplicationsLoading } = useApplications();

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
        return 'border-blue-300 bg-blue-50 text-blue-700 shadow-xs';
      case 'screening':
        return 'border-indigo-300 bg-indigo-50 text-indigo-700 shadow-xs';
      case 'interview':
        return 'border-amber-300 bg-amber-50 text-amber-800 shadow-xs';
      case 'offered':
        return 'border-emerald-300 bg-emerald-50 text-emerald-700 shadow-xs';
      case 'rejected':
        return 'border-rose-300 bg-rose-50 text-rose-700 shadow-xs';
      default:
        return 'border-slate-300 bg-slate-100 text-slate-700';
    }
  };

  if (isMyApplicationsLoading) {
    return (
      <div className="flex min-h-[450px] w-full flex-col items-center justify-center gap-3 font-sans">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-200 bg-white shadow-xl shadow-blue-500/10 backdrop-blur-md">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600 stroke-[2.5]" />
        </div>
        <p className="font-mono text-xs font-bold text-slate-700">
          Syncing application vector pipelines...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans text-slate-900 antialiased">
      {/* ========================================================================= */}
      {/* --- Candidate Hub Header Banner --- */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl border border-white/90 bg-white/80 p-6 sm:flex sm:items-center sm:justify-between sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(37,99,235,0.12),0_10px_30px_rgba(236,72,153,0.1)] transition-all">
        
        {/* Hardware-Accelerated Ambient Glows */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-pink-500/30 via-rose-400/20 to-transparent blur-3xl transform-gpu will-change-transform" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-500/30 via-sky-400/20 to-transparent blur-3xl transform-gpu will-change-transform" />
        <div className="pointer-events-none absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-blue-600 via-pink-500 to-indigo-600 shadow-[0_0_12px_rgba(236,72,153,0.4)]" />

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-bold text-blue-700 shadow-xs backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-pink-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Candidate Portal</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950">
            My <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">Applications</span>
          </h1>
          
          <p className="text-xs sm:text-sm font-semibold text-slate-600 max-w-xl leading-relaxed">
            Monitor dynamic hiring pipelines, stage advancements, and multi-modal ATS vector match scores in real time.
          </p>
        </div>

        <div className="relative z-10 mt-5 sm:mt-0">
          <Link
            to="/jobs"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 px-6 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-pink-500/35 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Zap className="h-4 w-4 fill-white" />
            <span>Explore Open Roles</span>
            <ArrowRight className="h-4 w-4 stroke-[2.5] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* --- Applications Listing --- */}
      {/* ========================================================================= */}
      {myApplications.length === 0 ? (
        <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white/80 p-8 text-center backdrop-blur-sm shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-500 shadow-xs">
            <Briefcase className="h-7 w-7 stroke-[2]" />
          </div>
          <h3 className="mt-4 text-base font-black text-slate-950">No applications submitted yet</h3>
          <p className="mt-1 text-xs font-semibold text-slate-600 max-w-sm leading-relaxed">
            You haven't applied to any job postings yet. Find a position matching your profile and test your semantic match score.
          </p>
          <Link
            to="/jobs"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-5 py-2.5 text-xs font-extrabold text-blue-700 shadow-xs transition hover:bg-blue-100 hover:border-blue-300 active:scale-95"
          >
            <span>Browse Job Board</span>
            <ChevronRight className="h-4 w-4 stroke-[2.5]" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {myApplications.map((app) => {
            const jobInfo = app.jobId || app.job || {};
            const jobTitle = jobInfo.title || 'Position';
            const department = jobInfo.department || 'Engineering';
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
                className="group relative overflow-hidden rounded-3xl border border-white/90 bg-white/90 p-5 sm:p-7 backdrop-blur-xl transition-all duration-200 shadow-[0_10px_30px_rgba(37,99,235,0.06)] hover:border-blue-200 hover:shadow-[0_15px_40px_rgba(37,99,235,0.12),0_5px_20px_rgba(236,72,153,0.08)]"
              >
                {/* Subtle Ambient Rim Flare */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/20 via-pink-500/30 to-indigo-500/20" />

                {/* Top Row: Title, Metadata, Status, Score */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h2 className="text-base sm:text-lg font-black text-slate-950 transition-colors group-hover:text-blue-700">
                        {jobTitle}
                      </h2>
                      <span
                        className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-wider ${getStatusBadge(
                          status
                        )}`}
                      >
                        {status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-blue-600 stroke-[2.2]" />
                        {department}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5 text-pink-600 stroke-[2.2]" />
                        {location}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-slate-500 stroke-[2.2]" />
                        Applied {formattedDate}
                      </span>
                      {app.resumeUrl && (
                        <>
                          <span className="text-slate-300">•</span>
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 font-bold text-blue-700 transition hover:text-pink-600 hover:underline"
                          >
                            <FileText className="h-3.5 w-3.5 stroke-[2.2]" />
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
                <div className="mt-6 border-t border-slate-100 pt-5">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Live Stage Pipeline
                    </p>
                    {isRejected && (
                      <span className="font-mono text-xs font-extrabold text-rose-600">
                        Application Concluded
                      </span>
                    )}
                  </div>

                  <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-4">
                    {STAGES.map((stg, idx) => {
                      const isCompleted = idx < currentStageIndex;
                      const isCurrent = idx === currentStageIndex;

                      return (
                        <div key={stg.id} className="relative flex flex-col gap-1.5">
                          {/* Step Progress Bar */}
                          <div
                            className={`h-2 w-full rounded-full transition-all duration-300 ${
                              isRejected && isCurrent
                                ? 'bg-rose-500 shadow-xs shadow-rose-500/50'
                                : isCompleted || isCurrent
                                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500'
                                : 'bg-slate-200'
                            }`}
                          />

                          <div className="flex items-center gap-1.5">
                            {isCompleted ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 stroke-[2.5]" />
                            ) : isCurrent && isRejected ? (
                              <XCircle className="h-3.5 w-3.5 text-rose-600 shrink-0 stroke-[2.5]" />
                            ) : (
                              <span
                                className={`h-2 w-2 rounded-full ${
                                  isCurrent ? 'bg-pink-600 animate-pulse' : 'bg-slate-400'
                                }`}
                              />
                            )}
                            <span
                              className={`truncate font-mono text-[11px] font-extrabold ${
                                isCurrent
                                  ? isRejected
                                    ? 'text-rose-700'
                                    : 'text-blue-700'
                                  : isCompleted
                                  ? 'text-slate-800'
                                  : 'text-slate-400'
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
                  <div className="mt-5 rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-50/40 via-white to-pink-50/30 p-4 shadow-xs">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-blue-700">
                      <Bot className="h-4 w-4 stroke-[2.5]" />
                      <span>Gemini Evaluation Insights</span>
                    </div>

                    {feedback && (
                      <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-700">
                        {feedback}
                      </p>
                    )}

                    {matchedSkills.length > 0 && (
                      <div className="mt-3.5 flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-200/80">
                        <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-700 mr-1">
                          Matched Skills:
                        </span>
                        {matchedSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="rounded-lg border border-blue-200 bg-white px-2.5 py-0.5 font-mono text-[10px] font-extrabold text-blue-700 shadow-xs"
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