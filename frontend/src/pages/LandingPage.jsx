// import React, { useState, useEffect, memo } from 'react';
// import { Link } from 'react-router-dom';
// import geminiLogo from '../assets/gemini-svg.svg';
// import { 
//   Sparkles, 
//   ArrowRight, 
//   Bot, 
//   Kanban, 
//   TrendingUp, 
//   ChevronRight, 
//   Target,
//   CheckCircle2,
//   FileSearch,
//   Cpu,
//   ShieldCheck,
//   Zap,
//   Users,
//   BarChart3,
//   Flame
// } from 'lucide-react';

// // Multicolor phrases with their own unique neon/modern gradient palettes
// const TYPEWRITER_DATA = [
//   { 
//     text: 'Parse Complex Resumes with Multi-Modal AI.', 
//     gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
//     cursor: 'bg-cyan-500'
//   },
//   { 
//     text: 'Rank High-Signal Candidates in Realtime.', 
//     gradient: 'from-pink-600 via-rose-500 to-amber-500',
//     cursor: 'bg-rose-500'
//   },
//   { 
//     text: 'Automate Kanban Workflows & Screening.', 
//     gradient: 'from-violet-600 via-purple-600 to-pink-500',
//     cursor: 'bg-purple-500'
//   },
//   { 
//     text: 'Eliminate Manual ATS Inefficiencies Forever.', 
//     gradient: 'from-emerald-600 via-teal-600 to-blue-600',
//     cursor: 'bg-emerald-500'
//   },
// ];

// // High-speed, isolated typewriter with custom multicolor gradient switching
// const SmoothMulticolorTypewriter = memo(() => {
//   const [phraseIdx, setPhraseIdx] = useState(0);
//   const [displayText, setDisplayText] = useState('');
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     const currentItem = TYPEWRITER_DATA[phraseIdx];
//     let timer;

//     if (!isDeleting && displayText === currentItem.text) {
//       timer = setTimeout(() => setIsDeleting(true), 2500);
//     } else if (isDeleting && displayText === '') {
//       timer = setTimeout(() => {
//         setIsDeleting(false);
//         setPhraseIdx((prev) => (prev + 1) % TYPEWRITER_DATA.length);
//       }, 350);
//     } else {
//       const stepSpeed = isDeleting ? 28 : 55;
//       timer = setTimeout(() => {
//         setDisplayText((prev) =>
//           isDeleting
//             ? currentItem.text.substring(0, prev.length - 1)
//             : currentItem.text.substring(0, prev.length + 1)
//         );
//       }, stepSpeed);
//     }

//     return () => clearTimeout(timer);
//   }, [displayText, isDeleting, phraseIdx]);

//   const activePhrase = TYPEWRITER_DATA[phraseIdx];

//   return (
//     <div className="inline-flex items-center justify-center min-h-[2.75rem] sm:min-h-[3.5rem] px-1">
//       <span className={`bg-gradient-to-r ${activePhrase.gradient} bg-clip-text text-transparent font-extrabold text-xl sm:text-3xl md:text-4xl tracking-tight transition-all duration-300`}>
//         {displayText}
//       </span>
//       <span className={`ml-1.5 inline-block h-6 sm:h-8 md:h-9 w-0.5 sm:w-1 rounded-full ${activePhrase.cursor} animate-pulse`} />
//     </div>
//   );
// });

// SmoothMulticolorTypewriter.displayName = 'SmoothMulticolorTypewriter';

// export const LandingPage = () => {
//   return (
//     <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-pink-500 selection:text-white antialiased overflow-x-hidden font-sans">
      
//       {/* ========================================================================= */}
//       {/* --- Ambient Live Interactive Background Mesh (Hardware Accelerated) --- */}
//       {/* ========================================================================= */}
//       <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu">
//         {/* Glowing Orbs */}
//         <div className="absolute -top-32 -left-32 h-[550px] w-[550px] rounded-full bg-blue-600/15 blur-[120px] will-change-transform" />
//         <div className="absolute top-1/4 -right-32 h-[600px] w-[600px] rounded-full bg-pink-600/15 blur-[140px] will-change-transform" />
//         <div className="absolute -bottom-32 left-1/3 h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-[110px] will-change-transform" />
        
//         {/* Dynamic Vector Matrix Grid */}
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
//       </div>

//       {/* ========================================================================= */}
//       {/* --- Modern Frosted Navbar --- */}
//       {/* ========================================================================= */}
//       <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-xl shadow-2xl">
//         <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
          
//           <Link to="/" className="flex items-center gap-3 group">
//             <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-pink-500 p-2 shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-pink-500/30">
//               <img src={geminiLogo} alt="RankResume AI" className="h-full w-full object-contain" />
//             </div>
//             <div className="flex flex-col">
//               <span className="text-base font-black tracking-tight text-white flex items-center gap-1">
//                 RankResume <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">AI</span>
//               </span>
//               <span className="text-[10px] font-mono text-slate-400 -mt-1 tracking-widest uppercase">Autonomous ATS</span>
//             </div>
//           </Link>

//           {/* Quick Stats Banner */}
//           <div className="hidden md:flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3.5 py-1 text-xs text-slate-300">
//             <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
//             <span className="text-slate-400">Gemini 2.5 Neural Engine:</span>
//             <span className="font-semibold text-emerald-400">Operational</span>
//           </div>

//           <div className="flex items-center gap-3">
//             <Link
//               to="/login"
//               className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-300 transition-colors hover:text-white hover:bg-slate-800/50"
//             >
//               Sign In
//             </Link>
//             <Link
//               to="/register"
//               className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-95"
//             >
//               <span>Get Started</span>
//               <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
//             </Link>
//           </div>
//         </nav>
//       </header>

//       {/* ========================================================================= */}
//       {/* --- Hero Section & Animated Compact Typewriter --- */}
//       {/* ========================================================================= */}
//       <section className="relative z-10 mx-auto max-w-7xl px-4 pt-14 pb-20 text-center sm:px-6 lg:pt-18">
        
//         {/* Status Pill */}
//         <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-4 py-1.5 text-xs font-medium text-indigo-300 shadow-inner backdrop-blur-md">
//           <Sparkles className="h-3.5 w-3.5 text-pink-400 animate-spin" style={{ animationDuration: '4s' }} />
//           <span className="text-slate-200">Next-Gen Recruitment Platform</span>
//           <span className="text-slate-600">|</span>
//           <span className="font-semibold text-indigo-400">Zero ATS Hallucinations</span>
//         </div>

//         {/* Primary Punchy Statement */}
//         <h2 className="mt-6 text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
//           Smarter Applicant Tracking Powered by <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">Multi-Modal Intelligence</span>
//         </h2>

//         {/* Compact, Ultra-Smooth Multicolor Typewriter */}
//         <div className="mt-3 flex justify-center items-center">
//           <SmoothMulticolorTypewriter />
//         </div>

//         {/* Value Proposition Description */}
//         <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base font-normal text-slate-400 leading-relaxed">
//           RankResume AI bridges the gap between hiring managers and top engineers. Upload resumes to parse <span className="text-indigo-400 font-semibold">raw technical stacks</span>, compute <span className="text-pink-400 font-semibold">semantic match vectors</span>, and manage candidates across <span className="text-cyan-400 font-semibold">live Kanban pipelines</span>.
//         </p>

//         {/* Action Buttons */}
//         <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
//           <Link
//             to="/register"
//             className="flex h-12 w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 px-8 text-xs font-bold text-white shadow-xl shadow-indigo-500/25 transition-all hover:scale-[1.02] hover:shadow-indigo-500/40 active:scale-95 sm:w-auto"
//           >
//             <Zap className="h-4 w-4" />
//             <span>Start Free Evaluation</span>
//           </Link>
//           <Link
//             to="/jobs"
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 px-8 text-xs font-bold text-slate-300 shadow-lg shadow-black/40 transition-all hover:bg-slate-800 hover:text-white sm:w-auto"
//           >
//             <span>Browse Active Openings</span>
//             <ChevronRight className="h-4 w-4" />
//           </Link>
//         </div>

//         {/* ========================================================================= */}
//         {/* --- Live Interactive Glass Telemetry Widget --- */}
//         {/* ========================================================================= */}
//         <div className="relative mx-auto mt-16 max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 text-left shadow-2xl backdrop-blur-2xl">
          
//           {/* Subtle Glow Border Accent */}
//           <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-blue-500/20 via-pink-500/20 to-purple-500/20 opacity-50 blur-sm pointer-events-none" />

//           <div className="relative flex flex-col gap-3 border-b border-slate-800 pb-5 sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex items-center gap-3">
//               <div className="h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
//               <div>
//                 <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-cyan-400">
//                   Live Parsing Telemetry
//                 </span>
//                 <h3 className="text-base font-bold text-white">
//                   Alex Mercer <span className="font-normal text-slate-400">· Senior Full-Stack Engineer</span>
//                 </h3>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-2">
//               <span className="inline-flex items-center gap-1.5 rounded-xl border border-pink-500/30 bg-pink-950/40 px-3.5 py-1.5 font-mono text-xs font-bold text-pink-300">
//                 <CheckCircle2 className="h-3.5 w-3.5 text-pink-400" /> 96% Match Vector
//               </span>
//             </div>
//           </div>

//           <div className="relative mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
//             {/* Metric 1 */}
//             <div className="group rounded-2xl border border-blue-900/40 bg-blue-950/20 p-4 transition-all hover:border-blue-500/40">
//               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
//                 <Target className="h-4 w-4 text-blue-400" /> Vector Similarity
//               </div>
//               <p className="mt-2 text-lg font-black text-white">Top 3% Tier</p>
//               <p className="mt-1 text-xs text-slate-400">Cosine score matches Job ID #2084</p>
//             </div>

//             {/* Metric 2 */}
//             <div className="group rounded-2xl border border-pink-900/40 bg-pink-950/20 p-4 transition-all hover:border-pink-500/40">
//               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-400">
//                 <Flame className="h-4 w-4 text-pink-400" /> Verified Tech Stack
//               </div>
//               <p className="mt-2 text-sm font-bold text-slate-200">React, Node, Go, MongoDB</p>
//               <p className="mt-1 text-xs text-slate-400">14 core competencies verified</p>
//             </div>

//             {/* Metric 3 */}
//             <div className="group rounded-2xl border border-purple-900/40 bg-purple-950/20 p-4 transition-all hover:border-purple-500/40">
//               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
//                 <Kanban className="h-4 w-4 text-purple-400" /> Pipeline Stage
//               </div>
//               <p className="mt-2 text-sm font-bold text-emerald-400">Interview Scheduled</p>
//               <p className="mt-1 text-xs text-slate-400">Auto-advanced by AI threshold</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ========================================================================= */}
//       {/* --- Deep Architecture: What This Platform Actually Does --- */}
//       {/* ========================================================================= */}
//       <section className="relative z-10 border-t border-slate-800 bg-slate-900/40 py-20 px-6 backdrop-blur-md">
//         <div className="mx-auto max-w-6xl">
          
//           <div className="text-center max-w-3xl mx-auto">
//             <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
//               Intelligent Pipeline Architecture
//             </span>
//             <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
//               Engineered to Solve the Traditional ATS Breakdown
//             </h2>
//             <p className="mt-3 text-sm text-slate-400">
//               Traditional ATS software relies on primitive keyword matching that rejects qualified engineers. RankResume AI evaluates structural engineering competence using deep semantic models.
//             </p>
//           </div>

//           <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            
//             {/* Feature 1 */}
//             <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7 shadow-lg transition-all hover:border-blue-500/50 hover:bg-slate-900">
//               <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
//                 <FileSearch className="h-6 w-6" />
//               </div>
//               <h3 className="mt-5 text-base font-bold text-white">1. Deep PDF Extraction</h3>
//               <p className="mt-2.5 text-xs leading-relaxed text-slate-400">
//                 Multi-modal LLMs ingest raw PDF formats, extracting work histories, project complexity, and engineering deliverables without parsing errors.
//               </p>
//             </div>

//             {/* Feature 2 */}
//             <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7 shadow-lg transition-all hover:border-pink-500/50 hover:bg-slate-900">
//               <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-400">
//                 <Cpu className="h-6 w-6" />
//               </div>
//               <h3 className="mt-5 text-base font-bold text-white">2. Neural Cosine Ranking</h3>
//               <p className="mt-2.5 text-xs leading-relaxed text-slate-400">
//                 Vector embeddings compare candidate history against exact role requirements, producing fair, objective percentage scores.
//               </p>
//             </div>

//             {/* Feature 3 */}
//             <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7 shadow-lg transition-all hover:border-purple-500/50 hover:bg-slate-900">
//               <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
//                 <Kanban className="h-6 w-6" />
//               </div>
//               <h3 className="mt-5 text-base font-bold text-white">3. Real-Time Kanban Automation</h3>
//               <p className="mt-2.5 text-xs leading-relaxed text-slate-400">
//                 Move talent across custom hiring stages. Trigger automated interview invites, candidate status updates, and stage progressions in real time.
//               </p>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* ========================================================================= */}
//       {/* --- Dual Role Workspaces --- */}
//       {/* ========================================================================= */}
//       <section className="py-20 px-6">
//         <div className="mx-auto max-w-5xl">
          
//           <div className="text-center mb-12">
//             <h2 className="text-2xl font-bold text-white">Tailored Workspaces for Every Role</h2>
//             <p className="text-xs text-slate-400 mt-1">Whether you are scouting talent or looking for your next high-growth team</p>
//           </div>

//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            
//             {/* Candidate Portal */}
//             <div className="flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl transition-all hover:border-cyan-500/40">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <span className="rounded-full bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 font-mono text-[10px] font-bold text-cyan-300">
//                     FOR TALENT & DEVELOPERS
//                   </span>
//                 </div>
//                 <h3 className="mt-4 text-lg font-bold text-white">Discover verified match fit</h3>
//                 <p className="mt-2 text-xs leading-relaxed text-slate-400">
//                   Upload your CV once. Get instant feedback on your alignment with active jobs, pinpoint missing keywords, and track application milestones.
//                 </p>
//               </div>
//               <Link
//                 to="/register"
//                 className="mt-8 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
//               >
//                 Create Candidate Profile <ChevronRight className="h-4 w-4" />
//               </Link>
//             </div>

//             {/* Recruiter Workspace */}
//             <div className="flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl transition-all hover:border-pink-500/40">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <span className="rounded-full bg-pink-950/60 border border-pink-500/30 px-3 py-1 font-mono text-[10px] font-bold text-pink-300">
//                     FOR HIRING MANAGERS
//                   </span>
//                 </div>
//                 <h3 className="mt-4 text-lg font-bold text-white">Screen hundreds in seconds</h3>
//                 <p className="mt-2 text-xs leading-relaxed text-slate-400">
//                   Eliminate resume review backlogs. Let the multi-modal engine rank applicant batches by technical proficiency and automate interview handoffs.
//                 </p>
//               </div>
//               <Link
//                 to="/register"
//                 className="mt-8 inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 hover:text-pink-300 transition-colors"
//               >
//                 Access Recruiter Workspace <ChevronRight className="h-4 w-4" />
//               </Link>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* ========================================================================= */}
//       {/* --- Footer --- */}
//       {/* ========================================================================= */}
//       <footer className="border-t border-slate-800 bg-slate-950 py-10 px-6 text-center text-xs text-slate-400">
//         <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div className="flex items-center gap-2">
//             <span className="h-2 w-2 rounded-full bg-cyan-400" />
//             <span>RankResume AI · Next-Generation Multi-Modal Recruitment</span>
//           </div>
//           <p>© 2026 RankResume AI. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;











import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import geminiLogo from '../assets/gemini-svg.svg';
import { 
  Sparkles, 
  ArrowRight, 
  Bot, 
  Kanban, 
  TrendingUp, 
  ChevronRight, 
  Target,
  CheckCircle2,
  FileSearch,
  Cpu,
  ShieldCheck,
  Zap,
  Users,
  BarChart3,
  Flame
} from 'lucide-react';

// Multicolor phrases with high-contrast, modern neon gradients
const TYPEWRITER_DATA = [
  { 
    text: 'Parse Complex Resumes with Multi-Modal AI.', 
    gradient: 'from-cyan-400 via-blue-500 to-indigo-400',
    cursor: 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]'
  },
  { 
    text: 'Rank High-Signal Candidates in Realtime.', 
    gradient: 'from-fuchsia-400 via-rose-400 to-amber-300',
    cursor: 'bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.8)]'
  },
  { 
    text: 'Automate Kanban Workflows & Screening.', 
    gradient: 'from-violet-400 via-purple-300 to-cyan-300',
    cursor: 'bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.8)]'
  },
  { 
    text: 'Eliminate Manual ATS Inefficiencies Forever.', 
    gradient: 'from-emerald-400 via-teal-300 to-sky-400',
    cursor: 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]'
  },
];

// High-speed, isolated typewriter with custom multicolor gradient switching
const SmoothMulticolorTypewriter = memo(() => {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentItem = TYPEWRITER_DATA[phraseIdx];
    let timer;

    if (!isDeleting && displayText === currentItem.text) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayText === '') {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIdx((prev) => (prev + 1) % TYPEWRITER_DATA.length);
      }, 350);
    } else {
      const stepSpeed = isDeleting ? 28 : 55;
      timer = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting
            ? currentItem.text.substring(0, prev.length - 1)
            : currentItem.text.substring(0, prev.length + 1)
        );
      }, stepSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIdx]);

  const activePhrase = TYPEWRITER_DATA[phraseIdx];

  return (
    <div className="inline-flex items-center justify-center min-h-[3rem] sm:min-h-[4rem] px-2">
      <span className={`bg-gradient-to-r ${activePhrase.gradient} bg-clip-text text-transparent font-black text-xl sm:text-3xl md:text-4xl tracking-tight transition-all duration-300 drop-shadow-sm`}>
        {displayText}
      </span>
      <span className={`ml-2 inline-block h-6 sm:h-8 md:h-9 w-1 rounded-full ${activePhrase.cursor} animate-pulse`} />
    </div>
  );
});

SmoothMulticolorTypewriter.displayName = 'SmoothMulticolorTypewriter';

export const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-[#070b14] text-slate-100 selection:bg-cyan-500 selection:text-slate-950 antialiased overflow-x-hidden font-sans">
      
      {/* ========================================================================= */}
      {/* --- Optimized Lag-Free Multicolor Ambient Backdrop (Hardware Accelerated) --- */}
      {/* ========================================================================= */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu">
        <div className="absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full bg-cyan-600/15 blur-[130px] transform-gpu will-change-transform" />
        <div className="absolute top-1/3 -right-24 h-[580px] w-[580px] rounded-full bg-fuchsia-600/15 blur-[150px] transform-gpu will-change-transform" />
        <div className="absolute -bottom-24 -left-20 h-[520px] w-[520px] rounded-full bg-violet-600/15 blur-[140px] transform-gpu will-change-transform" />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 h-[480px] w-[480px] rounded-full bg-emerald-600/10 blur-[130px] transform-gpu will-change-transform" />
        
        {/* Subtle Precision Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415518_1px,transparent_1px),linear-gradient(to_bottom,#33415518_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      {/* ========================================================================= */}
      {/* --- Modern Frosted Navbar --- */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#070b14]/80 backdrop-blur-xl shadow-xl shadow-black/20">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
          
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-2 shadow-md shadow-indigo-500/20 transition-transform duration-300 group-hover:scale-105">
              <img src={geminiLogo} alt="RankResume AI" className="h-full w-full object-contain filter brightness-110" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-white flex items-center gap-1">
                RankResume <span className="bg-gradient-to-r from-cyan-400 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent">AI</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 -mt-0.5 tracking-widest uppercase">Autonomous ATS</span>
            </div>
          </Link>

          {/* Quick Engine Status */}
          <div className="hidden md:flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-950/20 px-4 py-1.5 text-xs text-slate-300 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-slate-400">Gemini 2.5 Engine:</span>
            <span className="font-semibold text-emerald-300">Operational</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:text-white hover:bg-white/[0.06]"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-500 p-[1px] shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-fuchsia-500/25"
            >
              <div className="flex h-full w-full items-center gap-2 rounded-[11px] bg-[#0b1120] px-4 py-2 transition-colors group-hover:bg-transparent">
                <span className="text-xs font-bold text-white">Get Started</span>
                <ArrowRight className="h-3.5 w-3.5 text-cyan-400 transition-transform group-hover:translate-x-1 group-hover:text-white" />
              </div>
            </Link>
          </div>
        </nav>
      </header>

      {/* ========================================================================= */}
      {/* --- Hero Section & Animated Compact Typewriter --- */}
      {/* ========================================================================= */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-20 text-center sm:px-6 lg:pt-20">
        
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/30 px-4 py-1.5 text-xs font-medium text-violet-300 shadow-[0_0_20px_rgba(139,92,246,0.15)] backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-spin" style={{ animationDuration: '5s' }} />
          <span className="text-slate-200">Next-Gen Recruitment Platform</span>
          <span className="text-slate-600">|</span>
          <span className="font-semibold text-cyan-300">Zero ATS Hallucinations</span>
        </div>

        {/* Primary Headline */}
        <h1 className="mt-8 text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
          Smarter Applicant Tracking Powered by{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
            Multi-Modal Intelligence
          </span>
        </h1>

        {/* Typewriter Output */}
        <div className="mt-4 flex justify-center items-center">
          <SmoothMulticolorTypewriter />
        </div>

        {/* Value Proposition Description */}
        <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base font-normal text-slate-400 leading-relaxed">
          RankResume AI bridges the gap between hiring teams and top engineering talent. Parse{' '}
          <span className="text-cyan-400 font-semibold">raw technical stacks</span>, compute{' '}
          <span className="text-fuchsia-400 font-semibold">semantic match vectors</span>, and manage candidates smoothly across{' '}
          <span className="text-emerald-400 font-semibold">live Kanban pipelines</span>.
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/register"
            className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-500 px-8 text-xs font-bold text-white shadow-xl shadow-indigo-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/30 active:scale-95 sm:w-auto"
          >
            <Zap className="h-4 w-4 fill-white" />
            <span>Start Free Evaluation</span>
          </Link>
          <Link
            to="/jobs"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-8 text-xs font-bold text-slate-300 shadow-md backdrop-blur-md transition-all hover:bg-white/[0.08] hover:text-white sm:w-auto"
          >
            <span>Browse Active Openings</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* --- Live Interactive Glass Telemetry Widget --- */}
        {/* ========================================================================= */}
        <div className="relative mx-auto mt-16 max-w-4xl rounded-2xl border border-white/[0.08] bg-[#0c1322]/70 p-6 sm:p-8 text-left shadow-2xl backdrop-blur-2xl">
          <div className="relative flex flex-col gap-3 border-b border-white/[0.06] pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
              </span>
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-cyan-400">
                  Live Parsing Telemetry
                </span>
                <h3 className="text-base font-bold text-white">
                  Alex Mercer <span className="font-normal text-slate-400">· Senior Full-Stack Engineer</span>
                </h3>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1.5 font-mono text-xs font-bold text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> 96% Match Vector
              </span>
            </div>
          </div>

          <div className="relative mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Metric 1 */}
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/15 p-4 transition-all hover:border-cyan-500/40">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <Target className="h-4 w-4 text-cyan-400" /> Vector Similarity
              </div>
              <p className="mt-2 text-lg font-black text-white">Top 3% Tier</p>
              <p className="mt-1 text-xs text-slate-400">Cosine score matches Job ID #2084</p>
            </div>

            {/* Metric 2 */}
            <div className="rounded-xl border border-fuchsia-500/20 bg-fuchsia-950/15 p-4 transition-all hover:border-fuchsia-500/40">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fuchsia-400">
                <Flame className="h-4 w-4 text-fuchsia-400" /> Verified Tech Stack
              </div>
              <p className="mt-2 text-sm font-bold text-slate-200">React, Node, Go, MongoDB</p>
              <p className="mt-1 text-xs text-slate-400">14 core competencies verified</p>
            </div>

            {/* Metric 3 */}
            <div className="rounded-xl border border-violet-500/20 bg-violet-950/15 p-4 transition-all hover:border-violet-500/40">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400">
                <Kanban className="h-4 w-4 text-violet-400" /> Pipeline Stage
              </div>
              <p className="mt-2 text-sm font-bold text-emerald-400">Interview Scheduled</p>
              <p className="mt-1 text-xs text-slate-400">Auto-advanced by AI threshold</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* --- Deep Architecture: What This Platform Actually Does --- */}
      {/* ========================================================================= */}
      <section className="relative z-10 border-t border-white/[0.08] bg-[#090e1a]/60 py-20 px-6 backdrop-blur-md">
        <div className="mx-auto max-w-6xl">
          
          <div className="text-center max-w-3xl mx-auto">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
              Intelligent Pipeline Architecture
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
              Engineered to Solve the Traditional ATS Breakdown
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Traditional ATS software relies on primitive keyword matching that rejects qualified engineers. RankResume AI evaluates structural engineering competence using deep semantic models.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            
            {/* Feature 1 */}
            <div className="rounded-2xl border border-white/[0.08] bg-slate-900/60 p-7 shadow-lg transition-all hover:border-cyan-500/40 hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <FileSearch className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-base font-bold text-white">1. Deep PDF Extraction</h3>
              <p className="mt-2.5 text-xs leading-relaxed text-slate-400">
                Multi-modal LLMs ingest raw PDF formats, extracting work histories, project complexity, and engineering deliverables without parsing errors.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-white/[0.08] bg-slate-900/60 p-7 shadow-lg transition-all hover:border-fuchsia-500/40 hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-base font-bold text-white">2. Neural Cosine Ranking</h3>
              <p className="mt-2.5 text-xs leading-relaxed text-slate-400">
                Vector embeddings compare candidate history against exact role requirements, producing fair, objective percentage scores.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-white/[0.08] bg-slate-900/60 p-7 shadow-lg transition-all hover:border-violet-500/40 hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                <Kanban className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-base font-bold text-white">3. Real-Time Kanban Automation</h3>
              <p className="mt-2.5 text-xs leading-relaxed text-slate-400">
                Move talent across custom hiring stages. Trigger automated interview invites, candidate status updates, and stage progressions in real time.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* --- Dual Role Workspaces --- */}
      {/* ========================================================================= */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white">Tailored Workspaces for Every Role</h2>
            <p className="text-xs text-slate-400 mt-1">Whether you are scouting talent or looking for your next high-growth team</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            
            {/* Candidate Portal */}
            <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-slate-900/60 p-8 shadow-xl transition-all hover:border-cyan-500/40 hover:-translate-y-0.5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 font-mono text-[10px] font-bold text-cyan-300">
                    FOR TALENT & DEVELOPERS
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">Discover verified match fit</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  Upload your CV once. Get instant feedback on your alignment with active jobs, pinpoint missing keywords, and track application milestones.
                </p>
              </div>
              <Link
                to="/register"
                className="mt-8 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Create Candidate Profile <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Recruiter Workspace */}
            <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-slate-900/60 p-8 shadow-xl transition-all hover:border-fuchsia-500/40 hover:-translate-y-0.5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-fuchsia-950/60 border border-fuchsia-500/30 px-3 py-1 font-mono text-[10px] font-bold text-fuchsia-300">
                    FOR HIRING MANAGERS
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">Screen hundreds in seconds</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  Eliminate resume review backlogs. Let the multi-modal engine rank applicant batches by technical proficiency and automate interview handoffs.
                </p>
              </div>
              <Link
                to="/register"
                className="mt-8 inline-flex items-center gap-1.5 text-xs font-bold text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
              >
                Access Recruiter Workspace <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* --- Footer --- */}
      {/* ========================================================================= */}
      <footer className="border-t border-white/[0.08] bg-[#070b14] py-10 px-6 text-center text-xs text-slate-400">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            <span>RankResume AI · Next-Generation Multi-Modal Recruitment</span>
          </div>
          <p>© 2026 RankResume AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;