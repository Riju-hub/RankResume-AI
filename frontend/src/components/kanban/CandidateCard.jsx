// import React, { memo } from 'react';
// import { Draggable } from '@hello-pangea/dnd';
// import ScoreBadge from '../common/ScoreBadge';
// import { Mail, FileText, Calendar } from 'lucide-react';

// export const CandidateCard = memo(({ applicant, index, onSelect }) => {
//   const score = applicant?.matchScore ?? applicant?.aiAnalysis?.matchScore ?? 0;
//   const candidate = applicant?.candidateId || applicant?.candidate || {};
//   const candidateName = candidate?.name || 'Anonymous Candidate';
//   const candidateEmail = candidate?.email || 'No email registered';
//   const matchedSkills = applicant?.matchedSkills || applicant?.aiAnalysis?.matchedSkills || [];

//   // Candidate initials helper
//   const initials = candidateName
//     .trim()
//     .split(/\s+/)
//     .map((n) => n[0])
//     .slice(0, 2)
//     .join('')
//     .toUpperCase();

//   const formattedDate = (applicant?.appliedAt || applicant?.createdAt)
//     ? new Date(applicant.appliedAt || applicant.createdAt).toLocaleDateString('en-US', {
//         month: 'short',
//         day: 'numeric',
//       })
//     : 'Recent';

//   return (
//     <Draggable draggableId={applicant._id} index={index}>
//       {(provided, snapshot) => (
//         <div
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           onClick={() => onSelect && onSelect(applicant)}
//           className={`group relative select-none rounded-2xl border p-4 backdrop-blur-xl transition-all duration-200 cursor-grab active:cursor-grabbing font-sans antialiased text-slate-900 ${
//             snapshot.isDragging
//               ? 'z-50 rotate-1 scale-105 border-pink-400 bg-white shadow-2xl shadow-pink-500/20 ring-2 ring-pink-400/30'
//               : 'border-slate-200/90 bg-white/95 hover:border-pink-300 hover:shadow-[0_12px_30px_rgba(37,99,235,0.08),0_4px_16px_rgba(236,72,153,0.06)] shadow-xs'
//           }`}
//         >
//           {/* Subtle Top Accent Horizon on Hover */}
//           <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-blue-500/20 via-pink-500/40 to-indigo-500/20 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />

//           {/* Top Row: Avatar, Candidate Details & Score Badge */}
//           <div className="flex items-start justify-between gap-2.5">
//             <div className="flex items-center gap-2.5 min-w-0">
//               {/* Micro Avatar */}
//               <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 font-mono text-[10px] font-black text-blue-700 shadow-2xs">
//                 {initials}
//               </div>

//               <div className="min-w-0">
//                 <h4 className="truncate text-xs font-black text-slate-950 transition-colors group-hover:text-blue-700">
//                   {candidateName}
//                 </h4>
//                 <div className="flex items-center gap-1 text-[10px] font-mono font-semibold text-slate-500">
//                   <Mail className="h-3 w-3 shrink-0 text-slate-400 stroke-[2.2]" />
//                   <span className="truncate">{candidateEmail}</span>
//                 </div>
//               </div>
//             </div>

//             <ScoreBadge score={score} size="xs" showLabel={false} />
//           </div>

//           {/* Matched Capabilities Badges */}
//           {matchedSkills.length > 0 && (
//             <div className="mt-3 flex flex-wrap items-center gap-1.5">
//               {matchedSkills.slice(0, 3).map((skill, idx) => (
//                 <span
//                   key={idx}
//                   className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-700 shadow-2xs"
//                 >
//                   {skill}
//                 </span>
//               ))}
//               {matchedSkills.length > 3 && (
//                 <span className="font-mono text-[10px] font-extrabold text-pink-600 pl-0.5">
//                   +{matchedSkills.length - 3}
//                 </span>
//               )}
//             </div>
//           )}

//           {/* Card Footer: Timestamp & PDF Link */}
//           <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-[11px] font-semibold text-slate-600">
//             <div className="flex items-center gap-1 font-mono">
//               <Calendar className="h-3 w-3 text-slate-400 stroke-[2.2]" />
//               <span>{formattedDate}</span>
//             </div>

//             {applicant?.resumeUrl && (
//               <a
//                 href={applicant.resumeUrl}
//                 target="_blank"
//                 rel="noreferrer"
//                 onClick={(e) => e.stopPropagation()}
//                 className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-extrabold text-blue-700 shadow-2xs transition-colors hover:border-blue-300 hover:bg-blue-100"
//                 title="View candidate resume PDF"
//               >
//                 <FileText className="h-3 w-3 stroke-[2.2]" />
//                 <span>PDF</span>
//               </a>
//             )}
//           </div>
//         </div>
//       )}
//     </Draggable>
//   );
// });

// CandidateCard.displayName = 'CandidateCard';

// export default CandidateCard; 







// frontend/src/components/candidates/CandidateCard.jsx
import React, { memo } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import ScoreBadge from '../common/ScoreBadge';
import { Mail, FileText, Calendar, ArrowUpRight } from 'lucide-react';

const SKILL_THEMES = [
  'bg-indigo-50/80 text-indigo-700 border-indigo-200/80',
  'bg-violet-50/80 text-violet-700 border-violet-200/80',
  'bg-pink-50/80 text-pink-700 border-pink-200/80',
  'bg-sky-50/80 text-sky-700 border-sky-200/80',
];

export const CandidateCard = memo(({ applicant, index, onSelect }) => {
  const score = applicant?.matchScore ?? applicant?.aiAnalysis?.matchScore ?? 0;
  const candidate = applicant?.candidateId || applicant?.candidate || {};
  const candidateName = candidate?.name || 'Anonymous Candidate';
  const candidateEmail = candidate?.email || 'No email registered';
  const matchedSkills = applicant?.matchedSkills || applicant?.aiAnalysis?.matchedSkills || [];

  // Initials generator
  const initials = candidateName
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const formattedDate = (applicant?.appliedAt || applicant?.createdAt)
    ? new Date(applicant.appliedAt || applicant.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : 'Recent';

  return (
    <Draggable draggableId={applicant._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onSelect?.(applicant)}
          className={`group relative flex flex-col justify-between overflow-hidden rounded-xl sm:rounded-2xl border p-3.5 sm:p-4 font-sans text-slate-800 antialiased select-none cursor-grab active:cursor-grabbing transition-all duration-150 ${
            snapshot.isDragging
              ? 'z-50 scale-[1.02] border-indigo-400 bg-white shadow-xl shadow-indigo-500/15 ring-2 ring-indigo-400/30'
              : 'border-slate-200/90 bg-white/95 shadow-2xs hover:border-indigo-300 hover:shadow-md hover:shadow-slate-200/60'
          }`}
        >
          {/* Top Multi-Color Brand Line on Hover */}
          <div 
            aria-hidden="true" 
            className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none" 
          />

          <div>
            {/* Top Row: Micro Avatar, Candidate Meta & ScoreBadge */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Monogram Badge */}
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1.5px] shadow-2xs">
                  <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white font-mono text-[10px] sm:text-[11px] font-bold text-slate-900">
                    {initials}
                  </div>
                </div>

                {/* Candidate Name & Email */}
                <div className="min-w-0">
                  <h4 className="truncate text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {candidateName}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-slate-500">
                    <Mail className="h-3 w-3 shrink-0 text-slate-400 stroke-[2]" />
                    <span className="truncate max-w-[120px] sm:max-w-[150px]">{candidateEmail}</span>
                  </div>
                </div>
              </div>

              {/* Match Score Badge */}
              <div className="shrink-0">
                <ScoreBadge score={score} size="xs" showLabel={false} />
              </div>
            </div>

            {/* Matched Capabilities Badges */}
            {matchedSkills.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {matchedSkills.slice(0, 3).map((skill, idx) => (
                  <span
                    key={idx}
                    className={`rounded-md border px-2 py-0.5 text-[10px] sm:text-[11px] font-medium ${
                      SKILL_THEMES[idx % SKILL_THEMES.length]
                    }`}
                  >
                    {skill}
                  </span>
                ))}
                {matchedSkills.length > 3 && (
                  <span className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-slate-500">
                    +{matchedSkills.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Card Footer: Timestamp & PDF Resume Action */}
          <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-2.5 text-[11px] font-medium text-slate-500">
            <div className="flex items-center gap-1 text-slate-400">
              <Calendar className="h-3 w-3 stroke-[2]" />
              <span>{formattedDate}</span>
            </div>

            {applicant?.resumeUrl && (
              <a
                href={applicant.resumeUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 rounded-lg border border-blue-200/90 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 shadow-2xs transition-colors hover:border-blue-300 hover:bg-blue-100 cursor-pointer"
                title="View candidate resume PDF"
              >
                <FileText className="h-3 w-3 stroke-[2.2]" />
                <span>PDF</span>
                <ArrowUpRight className="h-2.5 w-2.5 stroke-[2.2] -ml-0.5" />
              </a>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
});

CandidateCard.displayName = 'CandidateCard';

export default CandidateCard;