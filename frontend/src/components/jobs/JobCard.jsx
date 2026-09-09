// import React, { memo } from 'react';
// import { 
//   Building2, 
//   MapPin, 
//   Clock, 
//   ArrowRight, 
//   Users, 
//   Sparkles,
//   Layers,
//   Zap,
//   ShieldCheck
// } from 'lucide-react';

// export const JobCard = memo(({ job, onApply, isRecruiter = false, onViewApplicants }) => {
//   const {
//     _id,
//     title,
//     department = 'Engineering',
//     location = 'Remote',
//     jobType = 'Full-time',
//     description,
//     skillsRequired = [],
//     createdAt,
//     applicantCount = 0,
//   } = job || {};

//   const formattedDate = createdAt
//     ? new Date(createdAt).toLocaleDateString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric',
//       })
//     : 'Recent';

//   return (
//     <div className="group relative flex flex-col justify-between gap-6 rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5 sm:p-7 backdrop-blur-xl transition-all duration-200 hover:border-cyan-500/40 hover:bg-slate-900/90 hover:shadow-2xl hover:shadow-cyan-500/5 lg:flex-row lg:items-center font-sans">
      
//       {/* Dynamic Hover Ambient Indicator Stripe */}
//       <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full bg-gradient-to-b from-cyan-400 via-indigo-500 to-pink-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none" />

//       {/* Main Details Body */}
//       <div className="flex-1 space-y-3.5">
//         {/* Title & Employment Type Badges */}
//         <div className="flex flex-wrap items-center gap-2.5">
//           <h3 className="text-base sm:text-lg font-bold text-white transition-colors group-hover:text-cyan-300">
//             {title}
//           </h3>

//           <div className="flex items-center gap-1.5">
//             <span className="inline-flex items-center rounded-md border border-cyan-500/30 bg-cyan-950/40 px-2.5 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
//               {jobType}
//             </span>
//             <span className="inline-flex items-center gap-1 rounded-md border border-slate-800 bg-slate-950/60 px-2.5 py-0.5 font-mono text-[10px] font-medium text-slate-400">
//               <Layers className="h-3 w-3 text-slate-500" />
//               {department}
//             </span>
//           </div>
//         </div>

//         {/* Metadata Details Strip */}
//         <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
//           <span className="inline-flex items-center gap-1.5">
//             <MapPin className="h-3.5 w-3.5 text-slate-500" />
//             {location}
//           </span>
//           <span className="text-slate-600">•</span>
//           <span className="inline-flex items-center gap-1.5">
//             <Clock className="h-3.5 w-3.5 text-slate-500" />
//             Posted {formattedDate}
//           </span>
//           {isRecruiter && (
//             <>
//               <span className="text-slate-600">•</span>
//               <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-950/40 px-2.5 py-0.5 font-mono text-[10px] font-bold text-pink-300">
//                 <Users className="h-3 w-3 text-pink-400" />
//                 {applicantCount} {applicantCount === 1 ? 'Applicant' : 'Applicants'}
//               </span>
//             </>
//           )}
//         </div>

//         {/* Description Snippet */}
//         {description && (
//           <p className="line-clamp-2 text-xs leading-relaxed text-slate-400 max-w-2xl">
//             {description}
//           </p>
//         )}

//         {/* Skill Requirement Badges */}
//         {skillsRequired.length > 0 && (
//           <div className="flex flex-wrap items-center gap-1.5 pt-1">
//             {skillsRequired.slice(0, 5).map((skill, idx) => (
//               <span
//                 key={idx}
//                 className="rounded-lg border border-slate-800 bg-slate-950/70 px-2.5 py-0.5 font-mono text-[10px] font-medium text-slate-300"
//               >
//                 {skill}
//               </span>
//             ))}
//             {skillsRequired.length > 5 && (
//               <span className="font-mono text-[10px] font-bold text-cyan-400 pl-1">
//                 +{skillsRequired.length - 5} more
//               </span>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Action CTA Section */}
//       <div className="flex shrink-0 items-center justify-end border-t border-slate-800/80 pt-4 lg:border-none lg:pt-0">
//         {isRecruiter ? (
//           <button
//             type="button"
//             onClick={() => onViewApplicants && onViewApplicants(_id)}
//             className="group/btn inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-pink-500/30 bg-pink-950/30 px-5 text-xs font-bold text-pink-300 transition-all hover:border-pink-500/60 hover:bg-pink-950/60 active:scale-95 sm:w-auto cursor-pointer"
//           >
//             <span>Review Candidates</span>
//             <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
//           </button>
//         ) : (
//           <button
//             type="button"
//             onClick={() => onApply && onApply(job)}
//             className="group/btn inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 px-6 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] hover:shadow-indigo-600/30 active:scale-95 sm:w-auto cursor-pointer"
//           >
//             <Zap className="h-3.5 w-3.5" />
//             <span>Apply Now</span>
//             <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
//           </button>
//         )}
//       </div>

//     </div>
//   );
// });

// JobCard.displayName = 'JobCard';

// export default JobCard;










import React, { memo } from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Users, 
  Layers,
  Zap
} from 'lucide-react';

export const JobCard = memo(({ job, onApply, isRecruiter = false, onViewApplicants }) => {
  const {
    _id,
    title,
    department = 'Engineering',
    location = 'Remote',
    jobType = 'Full-time',
    description,
    skillsRequired = [],
    createdAt,
    applicantCount = 0,
  } = job || {};

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent';

  return (
    <div className="group relative flex flex-col justify-between gap-6 rounded-3xl border border-white/90 bg-white/90 p-5 sm:p-7 backdrop-blur-xl transition-all duration-200 hover:border-blue-300 hover:shadow-[0_15px_40px_rgba(37,99,235,0.12),0_5px_20px_rgba(236,72,153,0.08)] shadow-[0_10px_30px_rgba(37,99,235,0.06)] lg:flex-row lg:items-center font-sans text-slate-900 antialiased">
      
      {/* Top Multi-Color Neon Rim on Hover */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] rounded-t-3xl bg-gradient-to-r from-blue-600 via-pink-500 to-indigo-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none" />

      {/* Main Details Body */}
      <div className="flex-1 space-y-3">
        {/* Title & Employment Type Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="text-base sm:text-lg font-black text-slate-950 transition-colors group-hover:text-blue-700">
            {title}
          </h3>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-wider text-blue-700 shadow-2xs">
              {jobType}
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-slate-700">
              <Layers className="h-3 w-3 text-slate-500 stroke-[2.2]" />
              {department}
            </span>
          </div>
        </div>

        {/* Metadata Details Strip */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-blue-600 stroke-[2.2]" />
            {location}
          </span>
          <span className="text-slate-300">•</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-slate-500 stroke-[2.2]" />
            Posted {formattedDate}
          </span>
          {isRecruiter && (
            <>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-2.5 py-0.5 font-mono text-[10px] font-extrabold text-pink-700 shadow-2xs">
                <Users className="h-3 w-3 text-pink-600 stroke-[2.2]" />
                {applicantCount} {applicantCount === 1 ? 'Applicant' : 'Applicants'}
              </span>
            </>
          )}
        </div>

        {/* Description Snippet */}
        {description && (
          <p className="line-clamp-2 text-xs font-semibold leading-relaxed text-slate-600 max-w-2xl">
            {description}
          </p>
        )}

        {/* Skill Requirement Badges */}
        {skillsRequired.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {skillsRequired.slice(0, 5).map((skill, idx) => (
              <span
                key={idx}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-slate-700 shadow-2xs"
              >
                {skill}
              </span>
            ))}
            {skillsRequired.length > 5 && (
              <span className="font-mono text-[11px] font-extrabold text-pink-600 pl-1">
                +{skillsRequired.length - 5} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action CTA Section */}
      <div className="flex shrink-0 items-center justify-end border-t border-slate-100 pt-4 lg:border-none lg:pt-0">
        {isRecruiter ? (
          <button
            type="button"
            onClick={() => onViewApplicants && onViewApplicants(_id)}
            className="group/btn inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-pink-300 bg-pink-50 px-5 text-xs font-extrabold text-pink-700 shadow-xs transition-all hover:border-pink-400 hover:bg-pink-100/70 hover:shadow-sm active:scale-95 sm:w-auto cursor-pointer"
          >
            <span>Review Candidates</span>
            <ArrowRight className="h-3.5 w-3.5 stroke-[2.5] transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onApply && onApply(job)}
            className="group/btn inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 px-6 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-pink-500/35 hover:-translate-y-0.5 active:translate-y-0 sm:w-auto cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 fill-white text-white" />
            <span>Apply Now</span>
            <ArrowRight className="h-3.5 w-3.5 stroke-[2.5] transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </button>
        )}
      </div>

    </div>
  );
});

JobCard.displayName = 'JobCard';

export default JobCard;