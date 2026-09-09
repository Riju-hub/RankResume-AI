// import React, { useMemo } from 'react';
// import { Link } from 'react-router-dom';
// import { useJobs } from '../../hooks/useJobs';
// import { 
//   Briefcase, 
//   Users, 
//   PlusCircle, 
//   TrendingUp, 
//   ArrowRight, 
//   Clock, 
//   MapPin,
//   Building2,
//   Loader2,
//   Sparkles,
//   Kanban,
//   AlertCircle,
//   Layers,
//   ChevronRight,
//   ShieldCheck,
//   Zap,
//   Target
// } from 'lucide-react';

// const Dashboard = () => {
//   const { jobs = [], isLoading, error } = useJobs();

//   const activeJobs = useMemo(
//     () => jobs.filter((job) => job.status !== 'closed'),
//     [jobs]
//   );

//   const totalApplicants = useMemo(
//     () => jobs.reduce((acc, curr) => acc + (curr.applicantCount || 0), 0),
//     [jobs]
//   );

//   if (isLoading) {
//     return (
//       <div className="flex min-h-[450px] w-full flex-col items-center justify-center gap-3 font-sans">
//         <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-md">
//           <Loader2 className="h-6 w-6 animate-spin text-pink-500" />
//         </div>
//         <p className="font-mono text-xs font-semibold text-slate-400">
//           Syncing recruiter telemetry & neural pipelines...
//         </p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex min-h-[350px] w-full flex-col items-center justify-center rounded-3xl border border-rose-500/30 bg-rose-950/20 p-8 text-center backdrop-blur-xl font-sans">
//         <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-500/40 bg-rose-950/50 text-rose-400 shadow-lg shadow-rose-500/10">
//           <AlertCircle className="h-6 w-6" />
//         </div>
//         <h3 className="mt-4 text-base font-bold text-slate-100">Failed to load recruiter dashboard</h3>
//         <p className="mt-1 max-w-sm text-xs text-slate-400 leading-relaxed">
//           We encountered an issue fetching your recruitment pipeline. Please refresh the page.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8 font-sans">
      
//       {/* ========================================================================= */}
//       {/* --- SaaS Hero Recruiter Banner --- */}
//       {/* ========================================================================= */}
//       <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        
//         {/* Hardware-Accelerated Ambient Glows */}
//         <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-pink-600/15 blur-3xl transform-gpu will-change-transform" />
//         <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-600/15 blur-3xl transform-gpu will-change-transform" />
//         <div className="pointer-events-none absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />

//         <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
//           <div className="space-y-2">
//             <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-950/40 px-3 py-0.5 text-xs font-semibold text-pink-300">
//               <ShieldCheck className="h-3.5 w-3.5 text-pink-400" />
//               <span>Recruiter Command Center</span>
//             </div>
            
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
//               Recruiter <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Dashboard</span>
//             </h1>
            
//             <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
//               Manage candidate pipelines, automate Kanban swimlanes, and evaluate real-time multi-modal Gemini match scores.
//             </p>
//           </div>

//           <Link
//             to="/recruiter/create-job"
//             className="group inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 px-6 text-xs font-bold text-white shadow-xl shadow-indigo-600/20 transition-all hover:scale-[1.02] hover:shadow-indigo-600/30 active:scale-95 self-start sm:self-auto shrink-0"
//           >
//             <PlusCircle className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
//             <span>Create New Job</span>
//           </Link>
//         </div>
//       </div>

//       {/* ========================================================================= */}
//       {/* --- Live Telemetry Metrics Row --- */}
//       {/* ========================================================================= */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        
//         {/* Active Openings Card */}
//         <div className="group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 backdrop-blur-xl transition-all duration-200 hover:border-slate-700 hover:bg-slate-900/90 shadow-xl">
//           <div className="flex items-center justify-between">
//             <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">
//               Active Job Posts
//             </span>
//             <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-pink-500/30 bg-pink-950/40 text-pink-400 shadow-sm shadow-pink-500/10">
//               <Briefcase className="h-5 w-5" />
//             </div>
//           </div>
          
//           <div className="mt-4 flex items-baseline gap-2">
//             <span className="font-mono text-3xl sm:text-4xl font-black tracking-tight text-white">
//               {activeJobs.length}
//             </span>
//             <span className="font-mono text-xs text-slate-400">of {jobs.length} total</span>
//           </div>

//           <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
//             <span className="relative flex h-2 w-2">
//               <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
//               <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
//             </span>
//             <span>Live & accepting inbound PDF resumes</span>
//           </div>
//         </div>

//         {/* Total Candidates Card */}
//         <div className="group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 backdrop-blur-xl transition-all duration-200 hover:border-slate-700 hover:bg-slate-900/90 shadow-xl">
//           <div className="flex items-center justify-between">
//             <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">
//               Total Candidates
//             </span>
//             <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 shadow-sm shadow-cyan-500/10">
//               <Users className="h-5 w-5" />
//             </div>
//           </div>

//           <div className="mt-4 flex items-baseline gap-2">
//             <span className="font-mono text-3xl sm:text-4xl font-black tracking-tight text-white">
//               {totalApplicants}
//             </span>
//             <span className="font-mono text-xs text-slate-400">resumes scored</span>
//           </div>

//           <div className="mt-4 flex items-center gap-1.5 text-[11px] text-cyan-400 border-t border-slate-800/80 pt-3">
//             <Sparkles className="h-3.5 w-3.5" />
//             <span>Extracted via Multi-Modal Gemini ATS</span>
//           </div>
//         </div>

//         {/* Quality Semantic Fit Card */}
//         <div className="group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 backdrop-blur-xl transition-all duration-200 hover:border-slate-700 hover:bg-slate-900/90 shadow-xl">
//           <div className="flex items-center justify-between">
//             <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">
//               Avg Semantic Fit
//             </span>
//             <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 shadow-sm shadow-emerald-500/10">
//               <TrendingUp className="h-5 w-5" />
//             </div>
//           </div>

//           <div className="mt-4 flex items-baseline gap-2">
//             <span className="font-mono text-3xl sm:text-4xl font-black tracking-tight text-emerald-400">
//               78%
//             </span>
//             <span className="font-mono text-xs text-emerald-400/80 font-bold uppercase tracking-wider">Optimal Match</span>
//           </div>

//           <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
//             <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
//             <span>High cosine vector alignment</span>
//           </div>
//         </div>

//       </div>

//       {/* ========================================================================= */}
//       {/* --- Posted Openings & Pipelines Section --- */}
//       {/* ========================================================================= */}
//       <div className="space-y-4">
//         <div className="flex items-center justify-between px-1">
//           <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
//             Active Job Openings & Pipelines
//           </h2>
//           <span className="font-mono text-xs text-slate-400">
//             Showing <span className="font-bold text-pink-400">{jobs.length}</span> {jobs.length === 1 ? 'Opening' : 'Openings'}
//           </span>
//         </div>

//         {jobs.length === 0 ? (
//           <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 p-8 text-center backdrop-blur-sm">
//             <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-500 shadow-md">
//               <Briefcase className="h-6 w-6" />
//             </div>
//             <h3 className="mt-4 text-base font-bold text-white">No jobs published yet</h3>
//             <p className="mt-1 max-w-sm text-xs text-slate-400 leading-relaxed">
//               Create your first opening to configure AI vector weights and start ranking inbound candidate resumes.
//             </p>
//             <Link
//               to="/recruiter/create-job"
//               className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-95"
//             >
//               <PlusCircle className="h-4 w-4" />
//               <span>Create First Job Opening</span>
//             </Link>
//           </div>
//         ) : (
//           <div className="space-y-3.5">
//             {jobs.map((job) => (
//               <div
//                 key={job._id}
//                 className="group relative flex flex-col justify-between gap-5 rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5 sm:p-6 backdrop-blur-xl transition-all duration-200 hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-2xl hover:shadow-black/30 lg:flex-row lg:items-center"
//               >
//                 {/* Job Metadata Details */}
//                 <div className="space-y-2 flex-1">
//                   <div className="flex flex-wrap items-center gap-2.5">
//                     <h3 className="text-base sm:text-lg font-bold text-white transition-colors group-hover:text-pink-300">
//                       {job.title}
//                     </h3>
//                     <span className="inline-flex items-center rounded-md border border-pink-500/30 bg-pink-950/40 px-2.5 py-0.5 font-mono text-[10px] font-bold text-pink-300">
//                       {job.jobType || 'Full-time'}
//                     </span>
//                     <span className="inline-flex items-center gap-1 rounded-md border border-slate-800 bg-slate-950/60 px-2.5 py-0.5 font-mono text-[10px] font-medium text-slate-400">
//                       <Layers className="h-3 w-3 text-slate-500" />
//                       {job.department || 'Engineering'}
//                     </span>
//                   </div>

//                   <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
//                     <span className="flex items-center gap-1.5">
//                       <MapPin className="h-3.5 w-3.5 text-slate-500" />
//                       {job.location || 'Remote'}
//                     </span>
//                     <span className="text-slate-600">•</span>
//                     <span className="flex items-center gap-1.5">
//                       <Clock className="h-3.5 w-3.5 text-slate-500" />
//                       Posted {new Date(job.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Pipeline & Candidate Action Buttons */}
//                 <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center shrink-0 border-t border-slate-800/80 pt-4 lg:border-none lg:pt-0">
//                   {/* Kanban Swimlane Link */}
//                   <Link
//                     to={`/recruiter/jobs/${job._id}/pipeline`}
//                     className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950/80 px-4 text-xs font-bold text-slate-300 transition-all hover:border-purple-500/40 hover:bg-purple-950/30 hover:text-purple-300 active:scale-95"
//                   >
//                     <Kanban className="h-4 w-4 text-purple-400" />
//                     <span>Kanban Pipeline</span>
//                   </Link>

//                   {/* Ranked Candidates Link */}
//                   <Link
//                     to={`/recruiter/jobs/${job._id}/applicants`}
//                     className="group/btn inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 px-5 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] hover:shadow-indigo-600/30 active:scale-95"
//                   >
//                     <span>Candidates ({job.applicantCount || 0})</span>
//                     <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//     </div>
//   );
// };

// export default Dashboard;








import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../../hooks/useJobs';
import { 
  Briefcase, 
  Users, 
  PlusCircle, 
  TrendingUp, 
  ArrowRight, 
  Clock, 
  MapPin,
  Loader2, 
  Sparkles, 
  Kanban, 
  AlertCircle, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';

const Dashboard = () => {
  const { jobs = [], isLoading, error } = useJobs();

  const activeJobs = useMemo(
    () => jobs.filter((job) => job.status !== 'closed'),
    [jobs]
  );

  const totalApplicants = useMemo(
    () => jobs.reduce((acc, curr) => acc + (curr.applicantCount || 0), 0),
    [jobs]
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[450px] w-full flex-col items-center justify-center gap-3 font-sans">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-200 bg-white shadow-xl shadow-blue-500/10 backdrop-blur-md">
          <Loader2 className="h-6 w-6 animate-spin text-pink-600 stroke-[2.5]" />
        </div>
        <p className="font-mono text-xs font-bold text-slate-700">
          Syncing recruiter telemetry & neural pipelines...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[350px] w-full flex-col items-center justify-center rounded-3xl border border-rose-200 bg-white p-8 text-center shadow-lg backdrop-blur-xl font-sans">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-300 bg-rose-50 text-rose-600 shadow-md shadow-rose-500/10">
          <AlertCircle className="h-7 w-7 stroke-[2.5]" />
        </div>
        <h3 className="mt-4 text-base font-black text-slate-950">Failed to load recruiter dashboard</h3>
        <p className="mt-1 max-w-sm text-xs font-semibold text-slate-600 leading-relaxed">
          We encountered an issue fetching your recruitment pipeline. Please refresh the page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans text-slate-900 antialiased">
      
      {/* ========================================================================= */}
      {/* --- SaaS Hero Recruiter Banner --- */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl border border-white/90 bg-white/80 p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(37,99,235,0.12),0_10px_30px_rgba(236,72,153,0.1)] transition-all">
        
        {/* Hardware-Accelerated Ambient Glows */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-pink-500/30 via-rose-400/20 to-transparent blur-3xl transform-gpu will-change-transform" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-500/30 via-sky-400/20 to-transparent blur-3xl transform-gpu will-change-transform" />
        <div className="pointer-events-none absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-blue-600 via-pink-500 to-indigo-600 shadow-[0_0_12px_rgba(236,72,153,0.4)]" />

        <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50/80 px-3.5 py-1 text-xs font-bold text-pink-700 shadow-xs backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4 text-pink-600 stroke-[2.5]" />
              <span>Recruiter Command Center</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950">
              Recruiter <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">Dashboard</span>
            </h1>
            
            <p className="text-xs sm:text-sm font-semibold text-slate-600 max-w-xl leading-relaxed">
              Manage candidate pipelines, automate Kanban swimlanes, and evaluate real-time multi-modal Gemini match scores.
            </p>
          </div>

          <Link
            to="/recruiter/create-job"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 px-6 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-pink-500/35 hover:-translate-y-0.5 active:translate-y-0 self-start sm:self-auto shrink-0"
          >
            <PlusCircle className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90 stroke-[2.5]" />
            <span>Create New Job</span>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* --- Live Telemetry Metrics Row --- */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        
        {/* Active Openings Card */}
        <div className="group relative overflow-hidden rounded-3xl border border-white/90 bg-white/85 p-6 backdrop-blur-xl transition-all duration-200 hover:border-pink-200 hover:shadow-[0_15px_40px_rgba(236,72,153,0.1)] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Active Job Posts
            </span>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-pink-200 bg-pink-50 text-pink-600 shadow-xs">
              <Briefcase className="h-5 w-5 stroke-[2.3]" />
            </div>
          </div>
          
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-mono text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
              {activeJobs.length}
            </span>
            <span className="font-mono text-xs font-bold text-slate-500">of {jobs.length} total</span>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-600 border-t border-slate-100 pt-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
            </span>
            <span>Live & accepting inbound PDF resumes</span>
          </div>
        </div>

        {/* Total Candidates Card */}
        <div className="group relative overflow-hidden rounded-3xl border border-white/90 bg-white/85 p-6 backdrop-blur-xl transition-all duration-200 hover:border-blue-200 hover:shadow-[0_15px_40px_rgba(37,99,235,0.1)] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Total Candidates
            </span>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 text-blue-600 shadow-xs">
              <Users className="h-5 w-5 stroke-[2.3]" />
            </div>
          </div>
          
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-mono text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
              {totalApplicants}
            </span>
            <span className="font-mono text-xs font-bold text-slate-500">resumes scored</span>
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-blue-700 border-t border-slate-100 pt-3">
            <Sparkles className="h-3.5 w-3.5 text-pink-600" />
            <span>Extracted via Multi-Modal Gemini ATS</span>
          </div>
        </div>

        {/* Quality Semantic Fit Card */}
        <div className="group relative overflow-hidden rounded-3xl border border-white/90 bg-white/85 p-6 backdrop-blur-xl transition-all duration-200 hover:border-emerald-200 hover:shadow-[0_15px_40px_rgba(16,185,129,0.1)] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Avg Semantic Fit
            </span>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-600 shadow-xs">
              <TrendingUp className="h-5 w-5 stroke-[2.3]" />
            </div>
          </div>
          
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-mono text-3xl sm:text-4xl font-black tracking-tight text-emerald-600">
              78%
            </span>
            <span className="font-mono text-xs text-emerald-700 font-extrabold uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              Optimal Match
            </span>
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-slate-600 border-t border-slate-100 pt-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>High cosine vector alignment</span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* --- Posted Openings & Pipelines Section --- */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-mono text-xs font-extrabold uppercase tracking-wider text-slate-800">
            Active Job Openings & Pipelines
          </h2>
          <span className="font-mono text-xs font-bold text-slate-600">
            Showing <span className="font-extrabold text-pink-600">{jobs.length}</span> {jobs.length === 1 ? 'Opening' : 'Openings'}
          </span>
        </div>

        {jobs.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white/80 p-8 text-center backdrop-blur-sm shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-500 shadow-xs">
              <Briefcase className="h-7 w-7 stroke-[2]" />
            </div>
            <h3 className="mt-4 text-base font-black text-slate-950">No jobs published yet</h3>
            <p className="mt-1 max-w-sm text-xs font-semibold text-slate-600 leading-relaxed">
              Create your first opening to configure AI vector weights and start ranking inbound candidate resumes.
            </p>
            <Link
              to="/recruiter/create-job"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-pink-500/35 hover:-translate-y-0.5 active:translate-y-0"
            >
              <PlusCircle className="h-4 w-4 stroke-[2.5]" />
              <span>Create First Job Opening</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-3.5">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="group relative flex flex-col justify-between gap-5 rounded-3xl border border-white/90 bg-white/90 p-5 sm:p-6 backdrop-blur-xl transition-all duration-200 hover:border-blue-200 hover:shadow-[0_15px_40px_rgba(37,99,235,0.12),0_5px_20px_rgba(236,72,153,0.08)] shadow-[0_10px_30px_rgba(37,99,235,0.06)] lg:flex-row lg:items-center"
              >
                {/* Job Metadata Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-base sm:text-lg font-black text-slate-950 transition-colors group-hover:text-blue-700">
                      {job.title}
                    </h3>
                    <span className="inline-flex items-center rounded-lg border border-pink-200 bg-pink-50 px-2.5 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-wider text-pink-700 shadow-xs">
                      {job.jobType || 'Full-time'}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-slate-700">
                      <Layers className="h-3 w-3 text-slate-500 stroke-[2.2]" />
                      {job.department || 'Engineering'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-blue-600 stroke-[2.2]" />
                      {job.location || 'Remote'}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-500 stroke-[2.2]" />
                      Posted {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Pipeline & Candidate Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center shrink-0 border-t border-slate-100 pt-4 lg:border-none lg:pt-0">
                  {/* Kanban Swimlane Link */}
                  <Link
                    to={`/recruiter/jobs/${job._id}/pipeline`}
                    className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-slate-800 shadow-xs transition-all hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50/40 active:scale-95"
                  >
                    <Kanban className="h-4 w-4 text-indigo-600 stroke-[2.2]" />
                    <span>Kanban Pipeline</span>
                  </Link>

                  {/* Ranked Candidates Link */}
                  <Link
                    to={`/recruiter/jobs/${job._id}/applicants`}
                    className="group/btn inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 px-5 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-pink-500/35 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Candidates ({job.applicantCount || 0})</span>
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.5] transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;