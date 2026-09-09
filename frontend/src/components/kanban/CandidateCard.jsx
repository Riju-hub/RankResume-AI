// import React, { memo } from 'react';
// import { Draggable } from '@hello-pangea/dnd';
// import ScoreBadge from '../common/ScoreBadge';
// import { Mail, FileText, Calendar, GripVertical } from 'lucide-react';

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
//           className={`group relative select-none rounded-2xl border p-4 backdrop-blur-xl transition-all duration-200 cursor-grab active:cursor-grabbing font-sans ${
//             snapshot.isDragging
//               ? 'z-50 rotate-1 scale-105 border-pink-500/80 bg-slate-900/95 shadow-2xl shadow-pink-500/20 ring-1 ring-pink-500/50'
//               : 'border-slate-800/80 bg-slate-900/60 hover:border-pink-500/40 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-black/40'
//           }`}
//         >
//           {/* Subtle Top Accent Horizon */}
//           <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-pink-500/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

//           {/* Top Row: Avatar, Candidate Details & Score Badge */}
//           <div className="flex items-start justify-between gap-2.5">
//             <div className="flex items-center gap-2.5 min-w-0">
//               {/* Micro Avatar */}
//               <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 font-mono text-[10px] font-bold text-white shadow-inner">
//                 {initials}
//               </div>

//               <div className="min-w-0">
//                 <h4 className="truncate text-xs font-bold text-white transition-colors group-hover:text-pink-300">
//                   {candidateName}
//                 </h4>
//                 <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
//                   <Mail className="h-3 w-3 shrink-0 text-slate-500" />
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
//                   className="rounded-lg border border-slate-800 bg-slate-950/70 px-2 py-0.5 font-mono text-[9px] font-semibold text-slate-300"
//                 >
//                   {skill}
//                 </span>
//               ))}
//               {matchedSkills.length > 3 && (
//                 <span className="font-mono text-[9px] font-bold text-pink-400 pl-0.5">
//                   +{matchedSkills.length - 3}
//                 </span>
//               )}
//             </div>
//           )}

//           {/* Card Footer: Timestamp & PDF Link */}
//           <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2.5 text-[10px] text-slate-400">
//             <div className="flex items-center gap-1 font-mono">
//               <Calendar className="h-3 w-3 text-slate-500" />
//               <span>{formattedDate}</span>
//             </div>

//             {applicant?.resumeUrl && (
//               <a
//                 href={applicant.resumeUrl}
//                 target="_blank"
//                 rel="noreferrer"
//                 onClick={(e) => e.stopPropagation()}
//                 className="inline-flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-2 py-0.5 font-mono text-[9px] font-bold text-cyan-300 transition-colors hover:border-cyan-500/60 hover:bg-cyan-950/70"
//                 title="View candidate resume PDF"
//               >
//                 <FileText className="h-3 w-3" />
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













import React, { memo } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import ScoreBadge from '../common/ScoreBadge';
import { Mail, FileText, Calendar } from 'lucide-react';

export const CandidateCard = memo(({ applicant, index, onSelect }) => {
  const score = applicant?.matchScore ?? applicant?.aiAnalysis?.matchScore ?? 0;
  const candidate = applicant?.candidateId || applicant?.candidate || {};
  const candidateName = candidate?.name || 'Anonymous Candidate';
  const candidateEmail = candidate?.email || 'No email registered';
  const matchedSkills = applicant?.matchedSkills || applicant?.aiAnalysis?.matchedSkills || [];

  // Candidate initials helper
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
          onClick={() => onSelect && onSelect(applicant)}
          className={`group relative select-none rounded-2xl border p-4 backdrop-blur-xl transition-all duration-200 cursor-grab active:cursor-grabbing font-sans antialiased text-slate-900 ${
            snapshot.isDragging
              ? 'z-50 rotate-1 scale-105 border-pink-400 bg-white shadow-2xl shadow-pink-500/20 ring-2 ring-pink-400/30'
              : 'border-slate-200/90 bg-white/95 hover:border-pink-300 hover:shadow-[0_12px_30px_rgba(37,99,235,0.08),0_4px_16px_rgba(236,72,153,0.06)] shadow-xs'
          }`}
        >
          {/* Subtle Top Accent Horizon on Hover */}
          <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-blue-500/20 via-pink-500/40 to-indigo-500/20 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />

          {/* Top Row: Avatar, Candidate Details & Score Badge */}
          <div className="flex items-start justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Micro Avatar */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 font-mono text-[10px] font-black text-blue-700 shadow-2xs">
                {initials}
              </div>

              <div className="min-w-0">
                <h4 className="truncate text-xs font-black text-slate-950 transition-colors group-hover:text-blue-700">
                  {candidateName}
                </h4>
                <div className="flex items-center gap-1 text-[10px] font-mono font-semibold text-slate-500">
                  <Mail className="h-3 w-3 shrink-0 text-slate-400 stroke-[2.2]" />
                  <span className="truncate">{candidateEmail}</span>
                </div>
              </div>
            </div>

            <ScoreBadge score={score} size="xs" showLabel={false} />
          </div>

          {/* Matched Capabilities Badges */}
          {matchedSkills.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {matchedSkills.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-700 shadow-2xs"
                >
                  {skill}
                </span>
              ))}
              {matchedSkills.length > 3 && (
                <span className="font-mono text-[10px] font-extrabold text-pink-600 pl-0.5">
                  +{matchedSkills.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Card Footer: Timestamp & PDF Link */}
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-[11px] font-semibold text-slate-600">
            <div className="flex items-center gap-1 font-mono">
              <Calendar className="h-3 w-3 text-slate-400 stroke-[2.2]" />
              <span>{formattedDate}</span>
            </div>

            {applicant?.resumeUrl && (
              <a
                href={applicant.resumeUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-extrabold text-blue-700 shadow-2xs transition-colors hover:border-blue-300 hover:bg-blue-100"
                title="View candidate resume PDF"
              >
                <FileText className="h-3 w-3 stroke-[2.2]" />
                <span>PDF</span>
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