// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { 
//   Sparkles, 
//   ArrowLeft, 
//   Compass, 
//   FileQuestion, 
//   Briefcase,
//   Zap,
//   Home
// } from 'lucide-react';

// export const NotFound = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-slate-950 px-4 py-16 text-slate-100 selection:bg-pink-500 selection:text-white antialiased font-sans">
      
//       {/* ========================================================================= */}
//       {/* --- Ambient Glowing Mesh & Vector Matrix (Hardware Accelerated) --- */}
//       {/* ========================================================================= */}
//       <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu">
//         <div className="absolute -top-32 -left-20 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[120px] will-change-transform" />
//         <div className="absolute -bottom-32 -right-20 h-[520px] w-[520px] rounded-full bg-pink-600/15 blur-[130px] will-change-transform" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[550px] rounded-full bg-indigo-600/10 blur-[140px] will-change-transform" />
        
//         {/* Dynamic Vector Matrix Grid */}
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
//       </div>

//       <div className="relative z-10 w-full max-w-lg text-center">
//         {/* Main 404 Glass Container Card */}
//         <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl transition-all">
          
//           {/* Subtle Horizon Glow Line */}
//           <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

//           {/* Animated 404 Emblem Badge */}
//           <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-950/40 shadow-xl shadow-cyan-500/10">
//             <FileQuestion className="h-8 w-8 text-cyan-400" />
//           </div>

//           {/* Error Tag & Numeric Status */}
//           <div className="mt-6 flex flex-col items-center">
//             <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 font-mono text-xs font-bold text-cyan-300">
//               <Compass className="h-3.5 w-3.5 text-cyan-400" />
//               Error 404 • Resource Relocated
//             </span>

//             <h1 className="mt-4 font-mono text-6xl font-black tracking-tight text-white sm:text-7xl">
//               4<span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">0</span>4
//             </h1>
            
//             <h2 className="mt-2 text-lg font-bold text-white sm:text-xl">
//               Page Lost in the Pipeline
//             </h2>
            
//             <p className="mt-2 max-w-sm text-xs leading-relaxed text-slate-400">
//               The page, job posting, or candidate view you are looking for has been archived, renamed, or does not exist.
//             </p>
//           </div>

//           {/* Quick Route Discovery Shortcuts */}
//           <div className="mt-7 grid grid-cols-2 gap-2.5 text-left">
//             <Link
//               to="/jobs"
//               className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5 transition-all hover:border-cyan-500/40 hover:bg-cyan-950/20 cursor-pointer"
//             >
//               <div className="flex items-center gap-2">
//                 <Briefcase className="h-4 w-4 text-cyan-400" />
//                 <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
//                   Job Board
//                 </span>
//               </div>
//               <p className="mt-1 font-mono text-[10px] text-slate-400">Explore open positions</p>
//             </Link>

//             <Link
//               to="/"
//               className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5 transition-all hover:border-pink-500/40 hover:bg-pink-950/20 cursor-pointer"
//             >
//               <div className="flex items-center gap-2">
//                 <Sparkles className="h-4 w-4 text-pink-400" />
//                 <span className="text-xs font-bold text-slate-200 group-hover:text-pink-300 transition-colors">
//                   Landing Page
//                 </span>
//               </div>
//               <p className="mt-1 font-mono text-[10px] text-slate-400">Platform overview</p>
//             </Link>
//           </div>

//           {/* Navigation Action Buttons */}
//           <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-center">
//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-5 text-xs font-bold text-slate-300 transition-all hover:border-slate-700 hover:text-white active:scale-95 sm:w-auto cursor-pointer"
//             >
//               <ArrowLeft className="h-3.5 w-3.5" />
//               <span>Go Back</span>
//             </button>

//             <Link
//               to="/"
//               className="group relative inline-flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 px-6 text-xs font-bold text-white shadow-xl shadow-indigo-600/20 transition-all hover:scale-[1.02] hover:shadow-indigo-600/30 active:scale-95 sm:w-auto cursor-pointer"
//             >
//               <Home className="h-3.5 w-3.5" />
//               <span>Return Home</span>
//             </Link>
//           </div>
//         </div>

//         {/* System Telemetry Footer */}
//         <p className="mt-6 font-mono text-[11px] text-slate-400">
//           RankResume AI • Autonomous Multi-Modal ATS Engine
//         </p>
//       </div>
//     </div>
//   );
// };

// export default NotFound;






import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowLeft, 
  Compass, 
  FileQuestion, 
  Briefcase, 
  Home 
} from 'lucide-react';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-[#f8fbff] px-4 py-16 text-slate-900 selection:bg-pink-500 selection:text-white antialiased font-sans">
      
      {/* Background Soft Ambient Orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu">
        <div className="absolute -top-32 -left-20 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px] will-change-transform" />
        <div className="absolute -bottom-32 -right-20 h-[520px] w-[520px] rounded-full bg-pink-500/20 blur-[130px] will-change-transform" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[550px] rounded-full bg-indigo-500/10 blur-[140px] will-change-transform" />
        
        {/* Dynamic Dual-Tone Grid Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.18)_1px,transparent_1px),radial-gradient(circle_at_center,rgba(236,72,153,0.15)_1px,transparent_1px)] [background-size:26px_26px] opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 w-full max-w-lg text-center">
        {/* Main 404 Glass Container Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/95 bg-white/90 p-8 sm:p-10 shadow-[0_20px_60px_rgba(37,99,235,0.12),0_10px_30px_rgba(236,72,153,0.1)] backdrop-blur-2xl transition-all">
          
          {/* Top Multi-Color Neon Rim */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-pink-500 to-indigo-600 shadow-[0_0_12px_rgba(236,72,153,0.4)]" />

          {/* Animated 404 Emblem Badge */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 text-blue-600 shadow-md shadow-blue-500/10">
            <FileQuestion className="h-8 w-8 stroke-[2.2]" />
          </div>

          {/* Error Tag & Numeric Status */}
          <div className="mt-6 flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 font-mono text-xs font-bold text-blue-700 shadow-xs backdrop-blur-sm">
              <Compass className="h-3.5 w-3.5 text-pink-600" />
              Error 404 • Resource Relocated
            </span>

            <h1 className="mt-4 font-mono text-6xl font-black tracking-tight text-slate-950 sm:text-7xl">
              4<span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">0</span>4
            </h1>
            
            <h2 className="mt-2 text-lg font-black text-slate-950 sm:text-xl">
              Page Lost in the Pipeline
            </h2>
            
            <p className="mt-2 max-w-sm text-xs font-semibold leading-relaxed text-slate-600">
              The page, job posting, or candidate view you are looking for has been archived, renamed, or does not exist.
            </p>
          </div>

          {/* Quick Route Discovery Shortcuts */}
          <div className="mt-7 grid grid-cols-2 gap-3 text-left">
            <Link
              to="/jobs"
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs transition-all hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 stroke-[2.2] text-blue-600" />
                <span className="text-xs font-bold text-slate-950 group-hover:text-blue-700 transition-colors">
                  Job Board
                </span>
              </div>
              <p className="mt-1 font-mono text-[10px] font-semibold text-slate-500">Explore open positions</p>
            </Link>

            <Link
              to="/"
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs transition-all hover:border-pink-300 hover:bg-pink-50/40 hover:shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 stroke-[2.2] text-pink-600" />
                <span className="text-xs font-bold text-slate-950 group-hover:text-pink-700 transition-colors">
                  Landing Page
                </span>
              </div>
              <p className="mt-1 font-mono text-[10px] font-semibold text-slate-500">Platform overview</p>
            </Link>
          </div>

          {/* Navigation Action Buttons */}
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:text-slate-950 active:scale-95 sm:w-auto cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Go Back</span>
            </button>

            <Link
              to="/"
              className="group relative inline-flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 px-6 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-pink-500/35 hover:-translate-y-0.5 active:translate-y-0 sm:w-auto cursor-pointer"
            >
              <Home className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>

        {/* System Telemetry Footer */}
        <p className="mt-6 font-mono text-[11px] font-bold text-slate-500">
          RankResume AI • Autonomous Multi-Modal ATS Engine
        </p>
      </div>
    </div>
  );
};

export default NotFound;