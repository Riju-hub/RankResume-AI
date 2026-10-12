// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSavedJobs } from '../../hooks/useSavedJobs';
// import JobCard from '../../components/jobs/JobCard';
// import { Bookmark, Loader2, ArrowLeft, Search } from 'lucide-react';

// const SavedJobs = () => {
//   const navigate = useNavigate();
//   const { savedJobs, totalSaved, isLoading, toggleSave, isJobSaved } = useSavedJobs();

//   if (isLoading) {
//     return (
//       <div className="flex min-h-[60vh] w-full items-center justify-center">
//         <div className="flex flex-col items-center gap-3">
//           <Loader2 className="h-9 w-9 animate-spin text-blue-600" />
//           <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
//             Loading saved jobs...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-6 font-sans">
//       {/* Top Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
//         <div>
//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back
//           </button>
//           <div className="flex items-center gap-2.5">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-500/20">
//               <Bookmark className="h-5 w-5 fill-blue-600" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold tracking-tight text-slate-900">
//                 Saved Positions
//               </h1>
//               <p className="text-xs text-slate-500">
//                 {totalSaved} {totalSaved === 1 ? 'position' : 'positions'} bookmarked
//               </p>
//             </div>
//           </div>
//         </div>

//         <button
//           type="button"
//           onClick={() => navigate('/candidate/jobs')}
//           className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-600 transition"
//         >
//           <Search className="h-3.5 w-3.5" />
//           <span>Explore Job Board</span>
//         </button>
//       </div>

//       {/* Grid of Saved Jobs */}
//       {savedJobs.length === 0 ? (
//         <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 py-16 text-center">
//           <Bookmark className="mx-auto h-10 w-10 text-slate-300" />
//           <h3 className="mt-3 text-base font-semibold text-slate-800">
//             No saved positions yet
//           </h3>
//           <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
//             Click the bookmark icon on any position card to save it for quick access here.
//           </p>
//           <button
//             type="button"
//             onClick={() => navigate('/jobs')}
//             className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition"
//           >
//             Explore Openings
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           {savedJobs.map((job) => (
//             <JobCard
//               key={job._id}
//               job={job}
//               isBookmarked={isJobSaved(job._id)}
//               onBookmark={() => toggleSave(job._id)}
//               onApply={() => navigate(`/candidate/jobs/${job._id}`)}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SavedJobs;






// frontend/src/pages/candidate/SavedJobs.jsx
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSavedJobs } from '../../hooks/useSavedJobs';
import JobCard from '../../components/jobs/JobCard';
import { 
  Bookmark, 
  Loader2, 
  ArrowLeft, 
  Search, 
  Sparkles, 
  Zap,
  ChevronRight 
} from 'lucide-react';

export const SavedJobs = memo(() => {
  const navigate = useNavigate();
  const { savedJobs = [], totalSaved = 0, isLoading, toggleSave, isJobSaved } = useSavedJobs();

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-200/80 bg-indigo-50 text-indigo-600">
            <Loader2 className="h-5 w-5 animate-spin stroke-[2.4]" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Loading saved jobs...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 sm:space-y-5 font-sans text-slate-800 antialiased">
      
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 stroke-[2.2]" />
          <span>Back</span>
        </button>
      </div>

      {/* Header Banner with proportional padding (p-4 sm:p-5) */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-4 sm:p-5 shadow-2xs">
        <div 
          aria-hidden="true" 
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-600 to-pink-500" 
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl border border-blue-200/80 bg-blue-50/80 text-blue-600 shadow-2xs">
              <Bookmark className="h-5 w-5 fill-blue-600 text-blue-600" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/90 bg-blue-50/80 px-2 py-0.2 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                <Sparkles className="h-3 w-3 text-pink-500" />
                <span>Bookmarked Openings</span>
              </div>

              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-950">
                Saved Positions
              </h1>

              <p className="text-xs text-slate-500">
                {totalSaved} {totalSaved === 1 ? 'position' : 'positions'} saved
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/jobs')}
            className="inline-flex h-9 sm:h-10 items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 text-xs font-bold text-white shadow-2xs transition hover:bg-indigo-600 active:scale-[0.98] cursor-pointer self-start sm:self-auto"
          >
            <Search className="h-3.5 w-3.5 stroke-[2.2]" />
            <span>Explore Job Board</span>
          </button>
        </div>
      </section>

      {/* Feed Container */}
      {savedJobs.length === 0 ? (
        <section className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/80 p-6 text-center shadow-2xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-400">
            <Bookmark className="h-5 w-5 stroke-[2]" />
          </div>

          <h3 className="mt-3 text-sm font-bold text-slate-900">
            No saved positions yet
          </h3>

          <p className="mt-1 text-xs text-slate-500 max-w-xs leading-relaxed">
            Click the bookmark icon on any job card to save it for quick access here.
          </p>

          <button
            type="button"
            onClick={() => navigate('/jobs')}
            className="mt-4 inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 px-4 text-xs font-bold text-white shadow-xs transition hover:brightness-105 active:scale-[0.98] cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 fill-white" />
            <span>Explore Openings</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </section>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {savedJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              isRecruiter={false}
              isBookmarked={isJobSaved(job._id)}
              onBookmark={() => toggleSave(job._id)}
              onApply={() => navigate(`/candidate/jobs/${job._id}`)}
            />
          ))}
        </div>
      )}

    </div>
  );
});

SavedJobs.displayName = 'SavedJobs';
export default SavedJobs;