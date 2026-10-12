// import React, { useMemo, useState, useEffect, memo } from 'react';
// import { createPortal } from 'react-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useJobs } from '../../hooks/useJobs';
// import { useSavedJobs } from '../../hooks/useSavedJobs'; // <--- Added
// import ApplyJobModal from './ApplyJobModal';
// import JobCard from '../../components/jobs/JobCard';
// import JobFilter from '../../components/jobs/JobFilter';
// import geminiLogo from '../../assets/gemini-svg.svg';
// import {
//   Sparkles,
//   Loader2,
//   AlertCircle,
//   SearchX,
//   Briefcase,
//   Layers,
//   RefreshCw,
//   Target,
//   ArrowRight,
//   X,
//   FileCheck2,
// } from 'lucide-react';

// const EASE = [0.22, 1, 0.36, 1];

// const containerVariants = {
//   hidden: {},
//   show: {
//     transition: {
//       staggerChildren: 0.055,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 14 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.42, ease: EASE },
//   },
// };

// const CandidateWelcomeModal = memo(({ isOpen, onClose, totalRoles = 0 }) => {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     return () => setMounted(false);
//   }, []);

//   if (!mounted || typeof document === 'undefined') return null;

//   return createPortal(
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-[999999] flex h-screen w-screen items-center justify-center p-4 sm:p-6 font-sans">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.25, ease: 'easeOut' }}
//             onClick={onClose}
//             className="fixed inset-0 h-full w-full bg-slate-950/75 backdrop-blur-md transform-gpu will-change-[opacity]"
//             aria-hidden="true"
//           />

//           <motion.div
//             role="dialog"
//             aria-modal="true"
//             initial={{ opacity: 0, scale: 0.95, y: 12 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.96, y: 8 }}
//             transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
//             className="relative z-10 w-full max-w-lg overflow-hidden rounded-[30px] border border-cyan-300/30 bg-[#070d1e] p-6 sm:p-8 text-center text-white shadow-[0_20px_60px_rgba(0,0,0,0.8)] transform-gpu will-change-[transform,opacity]"
//           >
//             <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
//             <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-2xl transform-gpu" />
//             <div className="pointer-events-none absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-indigo-500/10 blur-2xl transform-gpu" />

//             <button
//               type="button"
//               onClick={onClose}
//               className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-cyan-300/30 hover:bg-cyan-500/10 hover:text-cyan-300 cursor-pointer"
//               aria-label="Close modal"
//             >
//               <X className="h-4 w-4" />
//             </button>

//             <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-400 p-3 shadow-[0_0_25px_rgba(34,211,238,0.25)]">
//               <img
//                 src={geminiLogo}
//                 alt="RankResume AI"
//                 className="h-full w-full object-contain filter brightness-125"
//               />
//             </div>

//             <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-wider text-cyan-300">
//               <Sparkles className="h-3 w-3 text-cyan-300" />
//               Your Career Co-Pilot
//             </div>

//             <h3 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
//               Ready to find your{' '}
//               <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
//                 next big role?
//               </span>
//             </h3>

//             <p className="mt-2.5 text-xs sm:text-sm font-medium leading-relaxed text-slate-300">
//               Never wonder if your resume made the cut. We evaluate your real-world experience, practical skills, and project impact—matching you directly with {totalRoles ? `${totalRoles} verified tech openings` : 'top engineering roles'} without keyword traps.
//             </p>

//             <div className="mt-4 grid grid-cols-2 gap-2.5 text-left">
//               <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-slate-900/80 p-2.5">
//                 <Target className="h-4 w-4 shrink-0 text-cyan-300" />
//                 <span className="text-[11px] font-semibold text-slate-200">Instant Match Telemetry</span>
//               </div>
//               <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-slate-900/80 p-2.5">
//                 <FileCheck2 className="h-4 w-4 shrink-0 text-fuchsia-400" />
//                 <span className="text-[11px] font-semibold text-slate-200">No Keyword Traps</span>
//               </div>
//             </div>

//             <div className="mt-5 flex flex-col gap-2 sm:flex-row">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-5 text-xs font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-transform duration-150 hover:scale-[1.01] active:scale-95 cursor-pointer"
//               >
//                 <span>Explore Jobs Now</span>
//                 <ArrowRight className="h-4 w-4" />
//               </button>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer"
//               >
//                 Maybe Later
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>,
//     document.body
//   );
// });

// CandidateWelcomeModal.displayName = 'CandidateWelcomeModal';

// const JobBoard = () => {
//   const { jobs = [], isLoading, isError, refetch } = useJobs();
//   const { toggleSave, isJobSaved } = useSavedJobs(); // <--- Connect Saved Jobs

//   const [searchTerm, setSearchTerm] = useState('');
//   const [departmentFilter, setDepartmentFilter] = useState('All');
//   const [typeFilter, setTypeFilter] = useState('All');
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showGreetingModal, setShowGreetingModal] = useState(false);

//   useEffect(() => {
//     const greetingTimer = window.setTimeout(() => {
//       setShowGreetingModal(true);
//     }, 2000);

//     return () => window.clearTimeout(greetingTimer);
//   }, []);

//   const handleApplyClick = (job) => {
//     setSelectedJob(job);
//     setIsModalOpen(true);
//   };

//   const handleResetFilters = () => {
//     setSearchTerm('');
//     setDepartmentFilter('All');
//     setTypeFilter('All');
//   };

//   const departments = useMemo(() => {
//     return Array.from(new Set(jobs.map((j) => j.department).filter(Boolean)));
//   }, [jobs]);

//   const filteredJobs = useMemo(() => {
//     const term = searchTerm.toLowerCase().trim();

//     return jobs.filter((job) => {
//       const matchesSearch =
//         !term ||
//         job.title?.toLowerCase().includes(term) ||
//         job.companyName?.toLowerCase().includes(term) ||
//         job.description?.toLowerCase().includes(term) ||
//         job.skillsRequired?.some((s) => s.toLowerCase().includes(term));

//       const matchesDept =
//         departmentFilter === 'All' || job.department === departmentFilter;

//       const matchesType = typeFilter === 'All' || job.jobType === typeFilter;

//       const isNotClosed = job.status !== 'closed';

//       return matchesSearch && matchesDept && matchesType && isNotClosed;
//     });
//   }, [jobs, searchTerm, departmentFilter, typeFilter]);

//   if (isLoading) {
//     return (
//       <div className="relative flex min-h-[520px] w-full items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-white via-blue-50/50 to-pink-50/50 font-sans">
//         <div className="pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full bg-blue-500/15 blur-[100px]" />
//         <div className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-pink-500/15 blur-[110px]" />

//         <div className="relative z-10 flex flex-col items-center gap-4 text-center">
//           <div className="relative flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-white bg-white/85 shadow-[0_18px_45px_rgba(37,99,235,0.14)] backdrop-blur-xl">
//             <div className="absolute inset-0 rounded-[1.4rem] bg-gradient-to-br from-blue-500/10 to-pink-500/10" />
//             <Loader2 className="relative h-7 w-7 animate-spin text-blue-600 stroke-[2.3]" />
//           </div>
//           <div>
//             <p className="font-mono text-xs font-black text-slate-800">
//               Syncing open positions...
//             </p>
//             <p className="mt-1 text-[10px] font-semibold text-slate-500">
//               Loading AI-ranked opportunities
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, scale: 0.98 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="relative flex min-h-[380px] w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-rose-200/80 bg-white/90 p-8 text-center font-sans shadow-[0_20px_55px_rgba(244,63,94,0.08)] backdrop-blur-xl"
//       >
//         <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-rose-500/10 blur-3xl" />
//         <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-600 shadow-sm">
//           <AlertCircle className="h-7 w-7 stroke-[2.4]" />
//         </div>
//         <h3 className="mt-5 text-base font-black text-slate-950">
//           Failed to load positions
//         </h3>
//         <p className="mt-2 max-w-sm text-xs font-semibold leading-6 text-slate-600">
//           We encountered an issue retrieving available listings. Please check
//           your connection and retry.
//         </p>
//         {refetch && (
//           <button
//             type="button"
//             onClick={() => refetch()}
//             className="mt-5 inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-xs font-extrabold text-slate-800 shadow-sm transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-pink-300 hover:text-pink-600 hover:shadow-md active:translate-y-0"
//           >
//             <RefreshCw className="h-3.5 w-3.5 stroke-[2.5]" />
//             Retry Query
//           </button>
//         )}
//       </motion.div>
//     );
//   }

//   return (
//     <main className="relative isolate min-h-screen overflow-hidden font-sans antialiased text-slate-900">
//       <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-pink-50/35" />

//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="show"
//         className="mx-auto max-w-7xl space-y-6"
//       >
//         {/* Header Hero */}
//         <motion.section
//           variants={itemVariants}
//           className="group relative overflow-hidden rounded-[2rem] border border-white/90 bg-white/75 p-6 shadow-[0_24px_70px_rgba(37,99,235,0.10),0_10px_35px_rgba(236,72,153,0.07)] backdrop-blur-2xl sm:p-8"
//         >
//           <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-600 via-violet-500 to-pink-500" />
//           <div className="relative z-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
//             <div className="max-w-3xl">
//               <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700 shadow-sm backdrop-blur-md">
//                 <Sparkles className="h-3.5 w-3.5 text-pink-600" />
//                 Gemini 2.5 Multi-Modal Matching
//               </div>

//               <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
//                 Explore Active{' '}
//                 <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
//                   Positions
//                 </span>
//               </h1>

//               <p className="mt-3 max-w-2xl text-xs font-semibold leading-6 text-slate-600 sm:text-sm">
//                 Click any role or use View in Details to inspect specifications, requirements, and compensation packages.
//               </p>
//             </div>

//             <div className="grid shrink-0 grid-cols-2 gap-3">
//               <div className="rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-50/80 to-white/90 px-4 py-3 shadow-sm">
//                 <div className="flex items-center gap-1.5 text-[9px] font-mono font-black uppercase tracking-wider text-blue-700">
//                   <Briefcase className="h-3.5 w-3.5 stroke-[2.5]" />
//                   Open Roles
//                 </div>
//                 <p className="mt-1 font-mono text-2xl font-black text-slate-950">
//                   {jobs.length}
//                 </p>
//               </div>

//               <div className="rounded-2xl border border-pink-200/80 bg-gradient-to-br from-pink-50/80 to-white/90 px-4 py-3 shadow-sm">
//                 <div className="flex items-center gap-1.5 text-[9px] font-mono font-black uppercase tracking-wider text-pink-700">
//                   <Layers className="h-3.5 w-3.5 stroke-[2.5]" />
//                   Departments
//                 </div>
//                 <p className="mt-1 font-mono text-2xl font-black text-pink-600">
//                   {departments.length}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </motion.section>

//         {/* Filter Controls */}
//         <motion.section variants={itemVariants}>
//           <div className="relative overflow-hidden rounded-[1.6rem] border border-white/90 bg-white/70 p-2 shadow-[0_12px_35px_rgba(15,23,42,0.05)] backdrop-blur-xl">
//             <JobFilter
//               searchTerm={searchTerm}
//               onSearchChange={setSearchTerm}
//               department={departmentFilter}
//               onDepartmentChange={setDepartmentFilter}
//               jobType={typeFilter}
//               onJobTypeChange={setTypeFilter}
//               departments={departments}
//               onReset={handleResetFilters}
//             />
//           </div>
//         </motion.section>

//         {/* Feed Results */}
//         <AnimatePresence mode="popLayout">
//           {filteredJobs.length === 0 ? (
//             <motion.section
//               key="empty"
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="relative flex min-h-[340px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-white/75 p-8 text-center"
//             >
//               <SearchX className="h-8 w-8 text-slate-400" />
//               <h3 className="mt-4 text-base font-black text-slate-950">
//                 No matching positions found
//               </h3>
//               <button
//                 type="button"
//                 onClick={handleResetFilters}
//                 className="mt-4 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white cursor-pointer"
//               >
//                 Reset Filters
//               </button>
//             </motion.section>
//           ) : (
//             <motion.div
//               key="results"
//               variants={containerVariants}
//               initial="hidden"
//               animate="show"
//               className="grid grid-cols-1 gap-5 md:grid-cols-2"
//             >
//               {filteredJobs.map((job) => (
//                 <motion.div
//                   key={job._id}
//                   variants={itemVariants}
//                   whileHover={{ y: -3, transition: { duration: 0.2, ease: EASE } }}
//                   className="transform-gpu"
//                 >
//                   <JobCard
//                     job={job}
//                     isRecruiter={false}
//                     onApply={handleApplyClick}
//                     isBookmarked={isJobSaved(job._id)}
//                     onBookmark={() => toggleSave(job._id)}
//                   />
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>

//       <CandidateWelcomeModal
//         isOpen={showGreetingModal}
//         onClose={() => setShowGreetingModal(false)}
//         totalRoles={jobs.length}
//       />

//       <ApplyJobModal
//         job={selectedJob}
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedJob(null);
//         }}
//       />
//     </main>
//   );
// };

// export default JobBoard;



// frontend/src/pages/candidate/JobBoard.jsx
import React, { useMemo, useState, useEffect, memo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useJobs } from '../../hooks/useJobs';
import { useSavedJobs } from '../../hooks/useSavedJobs';
import ApplyJobModal from './ApplyJobModal';
import JobCard from '../../components/jobs/JobCard';
import JobFilter from '../../components/jobs/JobFilter';
import geminiLogo from '../../assets/gemini-svg.svg';
import {
  Sparkles,
  Loader2,
  AlertCircle,
  SearchX,
  Briefcase,
  Layers,
  RefreshCw,
  Target,
  ArrowRight,
  X,
  FileCheck2,
} from 'lucide-react';

// ============================================================================
// Modern Black Theme Candidate Welcome Modal (Compact, GPU Spring Animated)
// ============================================================================
const CandidateWelcomeModal = memo(({ isOpen, onClose, totalRoles = 0 }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <div 
          className="fixed inset-0 z-[999999] flex items-center justify-center p-4 font-sans overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Smooth Hardware-Composited Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transform-gpu will-change-[opacity]"
            aria-hidden="true"
          />

          {/* Smooth Spring Card Entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ 
              type: 'spring', 
              damping: 26, 
              stiffness: 350, 
              mass: 0.85 
            }}
            className="relative my-auto w-full max-w-[390px] overflow-hidden rounded-[26px] border border-slate-800/90 bg-[#0B0F19] p-5 sm:p-6 text-center text-slate-100 shadow-[0_25px_60px_rgba(0,0,0,0.85)] ring-1 ring-white/10 transform-gpu will-change-[transform,opacity]"
          >
            {/* Top Multi-Color Accent Rim (Cyan -> Indigo -> Violet -> Pink) */}
            <div 
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan-400 via-indigo-500 via-violet-500 to-pink-500" 
            />

            {/* Ambient Accent Lighting */}
            <div 
              aria-hidden="true" 
              className="pointer-events-none absolute inset-0 overflow-hidden transform-gpu"
            >
              <div className="absolute -left-12 -top-12 h-36 w-36 rounded-full bg-cyan-500/10 blur-2xl" />
              <div className="absolute -right-12 bottom-0 h-36 w-36 rounded-full bg-pink-500/10 blur-2xl" />
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3.5 top-3.5 flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="Close modal"
            >
              <X className="h-4 w-4 stroke-[2]" />
            </button>

            {/* Center Logo Tile */}
            <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-pink-500 p-[1.5px] shadow-lg shadow-blue-500/20">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#0E1322] p-2">
                <img
                  src={geminiLogo}
                  alt="RankResume AI"
                  className="h-full w-full object-contain brightness-110"
                />
              </div>
            </div>

            {/* Subtitle Pill Tag */}
            <div className="relative z-10 mt-3 inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/60 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-300">
              <Sparkles className="h-3 w-3 text-pink-400" />
              <span>Your Career Co-Pilot</span>
            </div>

            {/* Heading */}
            <h3 className="relative z-10 mt-2.5 text-lg sm:text-xl font-extrabold tracking-tight text-white">
              Ready to find your{' '}
              <span className="text-cyan-400">next big</span>{' '}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">role?</span>
            </h3>

            {/* Description */}
            <p className="relative z-10 mt-1.5 text-xs font-normal leading-relaxed text-slate-400 px-1">
              Never wonder if your resume passed automated ATS screening. We match your experience and project metrics directly with {totalRoles ? <strong className="font-semibold text-slate-200">{totalRoles} verified tech openings</strong> : 'verified tech openings'} without keyword traps.
            </p>

            {/* Pill Feature Blocks */}
            <div className="relative z-10 mt-4 space-y-2 text-left">
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-200">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                  <Target className="h-3.5 w-3.5 stroke-[2.2]" />
                </div>
                <span>Instant Match Telemetry</span>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-200">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-pink-500/20 text-pink-400">
                  <FileCheck2 className="h-3.5 w-3.5 stroke-[2.2]" />
                </div>
                <span>No Keyword Traps</span>
              </div>
            </div>

            {/* Full-Width Action Buttons */}
            <div className="relative z-10 mt-5 space-y-2">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 px-4 text-xs sm:text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110 active:scale-[0.98] cursor-pointer"
              >
                <span>Explore Jobs Now</span>
                <ArrowRight className="h-4 w-4 stroke-[2.2]" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-full items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-xs font-semibold text-slate-400 transition hover:bg-slate-800 hover:text-slate-200 active:scale-[0.98]"
              >
                Maybe Later
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
});

CandidateWelcomeModal.displayName = 'CandidateWelcomeModal';

// ============================================================================
// Main JobBoard Component (Clean & Flush)
// ============================================================================
export const JobBoard = memo(() => {
  const { jobs = [], isLoading, isError, refetch } = useJobs();
  const { toggleSave, isJobSaved } = useSavedJobs();

  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGreetingModal, setShowGreetingModal] = useState(false);

  // Exact 1-second delay before displaying the welcome modal
  useEffect(() => {
    const greetingTimer = window.setTimeout(() => {
      setShowGreetingModal(true);
    }, 1000);

    return () => window.clearTimeout(greetingTimer);
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('All');
    setTypeFilter('All');
  };

  const departments = useMemo(() => {
    return Array.from(new Set(jobs.map((j) => j.department).filter(Boolean)));
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return jobs.filter((job) => {
      const matchesSearch =
        !term ||
        job.title?.toLowerCase().includes(term) ||
        job.companyName?.toLowerCase().includes(term) ||
        job.description?.toLowerCase().includes(term) ||
        job.skillsRequired?.some((s) => s.toLowerCase().includes(term));

      const matchesDept =
        departmentFilter === 'All' || job.department === departmentFilter;

      const matchesType = typeFilter === 'All' || job.jobType === typeFilter;

      const isNotClosed = job.status !== 'closed';

      return matchesSearch && matchesDept && matchesType && isNotClosed;
    });
  }, [jobs, searchTerm, departmentFilter, typeFilter]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-200/80 bg-indigo-50 text-indigo-600 shadow-2xs">
            <Loader2 className="h-6 w-6 animate-spin stroke-[2.4]" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 text-center">
              Syncing open positions...
            </p>
            <p className="mt-0.5 text-xs text-slate-500 text-center">
              Loading verified engineering listings
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-rose-200/90 bg-white/95 p-6 text-center font-sans shadow-xs">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-600 shadow-2xs">
          <AlertCircle className="h-6 w-6 stroke-[2.2]" />
        </div>
        <h3 className="mt-3 text-base font-bold text-slate-950">
          Failed to load positions
        </h3>
        <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
          We encountered an issue retrieving available listings. Please check your connection and retry.
        </p>
        {refetch && (
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 shadow-2xs transition hover:bg-slate-50 active:scale-[0.98] cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5 stroke-[2.2]" />
            <span>Retry Query</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 sm:space-y-5 font-sans text-slate-800 antialiased">
      {/* Hero Header Banner (Tightened padding to p-4 sm:p-5) */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-4 sm:p-5 shadow-2xs">
        <div 
          aria-hidden="true" 
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-600 to-pink-500" 
        />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/90 bg-blue-50/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 shadow-2xs">
              <Sparkles className="h-3 w-3 text-pink-500" />
              <span>Gemini 2.5 Multi-Modal Matching</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-950">
              Explore Active{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                Positions
              </span>
            </h1>

            <p className="text-xs text-slate-500 leading-relaxed">
              Review requirements, tech stacks, and compensation packages. Apply directly with real-time match scoring.
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid shrink-0 grid-cols-2 gap-2 sm:gap-3">
            <div className="rounded-xl border border-blue-200/80 bg-blue-50/60 p-2.5 sm:px-3.5 sm:py-2.5 shadow-2xs">
              <div className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700">
                <Briefcase className="h-3 w-3 stroke-[2.2]" />
                <span>Open Roles</span>
              </div>
              <p className="mt-0.5 font-mono text-lg sm:text-xl font-extrabold text-slate-900">
                {jobs.length}
              </p>
            </div>

            <div className="rounded-xl border border-pink-200/80 bg-pink-50/60 p-2.5 sm:px-3.5 sm:py-2.5 shadow-2xs">
              <div className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-pink-700">
                <Layers className="h-3 w-3 stroke-[2.2]" />
                <span>Departments</span>
              </div>
              <p className="mt-0.5 font-mono text-lg sm:text-xl font-extrabold text-pink-700">
                {departments.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Controls */}
      <section>
        <JobFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          department={departmentFilter}
          onDepartmentChange={setDepartmentFilter}
          jobType={typeFilter}
          onJobTypeChange={setTypeFilter}
          departments={departments}
          onReset={handleResetFilters}
        />
      </section>

      {/* Job Listings Feed */}
      {filteredJobs.length === 0 ? (
        <section className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/80 p-6 text-center shadow-2xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-400">
            <SearchX className="h-5 w-5 stroke-[2]" />
          </div>
          <h3 className="mt-3 text-sm font-bold text-slate-900">
            No matching positions found
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Try adjusting your search criteria or resetting filters
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-3.5 inline-flex h-8 items-center justify-center rounded-xl bg-slate-900 px-3.5 text-xs font-bold text-white shadow-2xs transition hover:bg-indigo-600 active:scale-[0.98] cursor-pointer"
          >
            Reset Filters
          </button>
        </section>
      ) : (
        <div className="grid grid-cols-1 gap-3.5 sm:gap-4 md:grid-cols-2">
          {filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              isRecruiter={false}
              onApply={handleApplyClick}
              isBookmarked={isJobSaved(job._id)}
              onBookmark={() => toggleSave(job._id)}
            />
          ))}
        </div>
      )}

      {/* Candidate Welcome Modal */}
      <CandidateWelcomeModal
        isOpen={showGreetingModal}
        onClose={() => setShowGreetingModal(false)}
        totalRoles={jobs.length}
      />

      {/* Apply Job Modal */}
      <ApplyJobModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedJob(null);
        }}
      />
    </div>
  );
});

JobBoard.displayName = 'JobBoard';
export default JobBoard;