// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// // If in src/pages/LandingPage.jsx:
// import geminiLogo from '../assets/gemini-svg.svg';

// // OR if in src/components/common/Navbar.jsx:
// // import geminiLogo from '../../assets/gemini-svg.svg';
// import { 
//   Sparkles, 
//   ArrowRight, 
//   Bot, 
//   Layers, 
//   ShieldCheck, 
//   Zap, 
//   FileText, 
//   TrendingUp, 
//   CheckCircle2, 
//   Users, 
//   Kanban,
//   Code2
// } from 'lucide-react';

// const TYPEWRITER_PHRASES = [
//   'Parsing PDF Resumes with Gemini AI',
//   'Automating Candidate Semantic Matching',
//   'Streamlining Recruiter Kanban Pipelines',
//   'Accelerating Tech Talent Acquisition',
// ];

// export const LandingPage = () => {
//   // --- Modern Typewriter State Machine ---
//   const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
//   const [currentText, setCurrentText] = useState('');
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [typingSpeed, setTypingSpeed] = useState(70);

//   useEffect(() => {
//     const handleTyping = () => {
//       const fullText = TYPEWRITER_PHRASES[currentPhraseIndex];

//       if (isDeleting) {
//         setCurrentText((prev) => fullText.substring(0, prev.length - 1));
//         setTypingSpeed(35);
//       } else {
//         setCurrentText((prev) => fullText.substring(0, prev.length + 1));
//         setTypingSpeed(75);
//       }

//       if (!isDeleting && currentText === fullText) {
//         setTimeout(() => setIsDeleting(true), 2000);
//       } else if (isDeleting && currentText === '') {
//         setIsDeleting(false);
//         setCurrentPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
//         setTypingSpeed(500);
//       }
//     };

//     const timer = setTimeout(handleTyping, typingSpeed);
//     return () => clearTimeout(timer);
//   }, [currentText, isDeleting, currentPhraseIndex, typingSpeed]);

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100 selection:bg-indigo-500 selection:text-white">
//       {/* Dynamic Ambient Glows & Grid Mesh */}
//       <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-600/15 via-violet-600/10 to-transparent blur-[140px]" />
//       <div className="pointer-events-none absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-violet-600/15 via-indigo-600/10 to-transparent blur-[140px]" />
//       <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

//       {/* Top Floating Glass Navigation */}
//       <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-zinc-800/80 bg-zinc-950/80 px-6 sm:px-12 backdrop-blur-xl">
//         <div className="flex items-center gap-2.5">
//   <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 p-1.5 shadow-md shadow-indigo-500/25">
//     <img 
//       src={geminiLogo} 
//       alt="RankResume AI Logo" 
//       className="h-full w-full object-contain" 
//     />
//   </div>
//   <span className="text-sm font-bold tracking-tight text-zinc-100 sm:text-base">
//     RankResume <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">AI</span>
//   </span>
// </div>

//         <div className="flex items-center gap-3">
//           <Link
//             to="/login"
//             className="rounded-xl px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:text-zinc-100"
//           >
//             Sign In
//           </Link>
//           <Link
//             to="/register"
//             className="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-medium text-white shadow-md shadow-indigo-500/20 transition-all hover:from-indigo-500 hover:to-violet-500 active:scale-95"
//           >
//             <span>Get Started</span>
//             <ArrowRight className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5" />
//           </Link>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-20 text-center sm:pt-24 sm:pb-28">
//         {/* Release / AI Pill Tag */}
//         <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-md shadow-inner">
//           <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
//           Powered by Google Gemini 2.5 Semantic Engine
//         </div>

//         {/* Hero Title with Dynamic Gradient */}
//         <h1 className="mx-auto mt-6 max-w-4xl text-3xl font-extrabold tracking-tight sm:text-6xl sm:leading-[1.15]">
//           Intelligent ATS Hiring. <br className="hidden sm:inline" />
//           <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-200 bg-clip-text text-transparent">
//             Rank Resumes Automatically.
//           </span>
//         </h1>

//         {/* Live Typewriter Container */}
//         <div className="mx-auto mt-5 flex h-10 max-w-xl items-center justify-center">
//           <p className="font-mono text-xs text-zinc-400 sm:text-sm">
//             <span className="text-indigo-400 font-semibold">&gt;</span> {currentText}
//             <span className="ml-1 inline-block h-4 w-1.5 bg-indigo-400 animate-pulse align-middle" />
//           </p>
//         </div>

//         <p className="mx-auto mt-3 max-w-2xl text-xs text-zinc-400 sm:text-base leading-relaxed">
//           Eliminate manual resume filtering. Candidates get instant skill alignment feedback, while recruiters manage candidates across intelligent Kanban stages with zero friction.
//         </p>

//         {/* Main Hero CTAs */}
//         <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
//           <Link
//             to="/register"
//             className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-7 text-xs font-semibold text-white shadow-xl shadow-indigo-500/25 transition-all duration-200 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] sm:w-auto"
//           >
//             <span>Get Started for Free</span>
//             <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
//           </Link>
//           <Link
//             to="/jobs"
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-7 text-xs font-semibold text-zinc-300 backdrop-blur-md transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-white sm:w-auto"
//           >
//             <span>Browse Job Board</span>
//           </Link>
//         </div>

//         {/* Live Interactive UI Glass Preview Card */}
//         <div className="relative mx-auto mt-14 max-w-4xl overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-4 sm:p-6 backdrop-blur-2xl shadow-2xl shadow-black/50">
//           <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

//           {/* Window Mockup Header */}
//           <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
//             <div className="flex items-center gap-2">
//               <span className="h-3 w-3 rounded-full bg-rose-500/70" />
//               <span className="h-3 w-3 rounded-full bg-amber-500/70" />
//               <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
//               <span className="ml-2 font-mono text-[11px] text-zinc-500">Gemini ATS Live Extraction Matrix</span>
//             </div>
//             <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
//               <CheckCircle2 className="h-3.5 w-3.5" />
//               Real-time Parsed
//             </div>
//           </div>

//           {/* Live Mock Telemetry Content */}
//           <div className="mt-4 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
//             <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-4">
//               <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Candidate Match</span>
//               <div className="mt-2 flex items-center justify-between">
//                 <span className="font-semibold text-zinc-100 text-sm">Alex Mercer</span>
//                 <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-400">
//                   92% Match
//                 </span>
//               </div>
//               <p className="mt-2 text-[11px] text-zinc-400">Top alignment with Senior Full-Stack role</p>
//             </div>

//             <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-4">
//               <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Semantic Engine</span>
//               <div className="mt-2 flex items-center gap-1.5 font-semibold text-indigo-400 text-sm">
//                 <Bot className="h-4 w-4" />
//                 <span>Extracted 14 Skills</span>
//               </div>
//               <p className="mt-2 text-[11px] text-zinc-400">React, TypeScript, Node.js, AWS, GraphQL</p>
//             </div>

//             <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-4">
//               <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Pipeline State</span>
//               <div className="mt-2 flex items-center justify-between">
//                 <span className="font-semibold text-zinc-100 text-sm">Screening Stage</span>
//                 <span className="h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-indigo-400/30" />
//               </div>
//               <p className="mt-2 text-[11px] text-zinc-400">Kanban swimlane updated live</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Feature Value Grid */}
//       <section className="relative z-10 border-t border-zinc-800/80 bg-zinc-950/90 py-20 px-6 sm:px-12">
//         <div className="mx-auto max-w-6xl text-center">
//           <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">Architected for Speed & Precision</p>
//           <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
//             Everything you need to hire and get hired
//           </h2>

//           <div className="mt-12 grid grid-cols-1 gap-6 text-left sm:grid-cols-3">
//             {/* Feature 1 */}
//             <div className="group rounded-3xl border border-zinc-800/80 bg-zinc-900/30 p-6 backdrop-blur-xl transition hover:border-zinc-700 hover:bg-zinc-900/60">
//               <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
//                 <Bot className="h-5 w-5" />
//               </div>
//               <h3 className="mt-4 text-base font-bold text-zinc-100">Gemini Resume Parsing</h3>
//               <p className="mt-2 text-xs leading-relaxed text-zinc-400">
//                 Upload raw PDF documents. The AI instantly extracts experience, tech stacks, and formats profiles for immediate matching.
//               </p>
//             </div>

//             {/* Feature 2 */}
//             <div className="group rounded-3xl border border-zinc-800/80 bg-zinc-900/30 p-6 backdrop-blur-xl transition hover:border-zinc-700 hover:bg-zinc-900/60">
//               <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
//                 <Kanban className="h-5 w-5" />
//               </div>
//               <h3 className="mt-4 text-base font-bold text-zinc-100">Drag & Drop Pipelines</h3>
//               <p className="mt-2 text-xs leading-relaxed text-zinc-400">
//                 Organize applicants intuitively across Applied, Screening, Interview, and Offer columns with live optimistic state updates.
//               </p>
//             </div>

//             {/* Feature 3 */}
//             <div className="group rounded-3xl border border-zinc-800/80 bg-zinc-900/30 p-6 backdrop-blur-xl transition hover:border-zinc-700 hover:bg-zinc-900/60">
//               <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
//                 <TrendingUp className="h-5 w-5" />
//               </div>
//               <h3 className="mt-4 text-base font-bold text-zinc-100">Objective Match Scoring</h3>
//               <p className="mt-2 text-xs leading-relaxed text-zinc-400">
//                 Candidates receive transparent match percentages and missing skill recommendations to improve alignment for every role.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Role Split Section */}
//       <section className="relative z-10 border-t border-zinc-800/80 py-16 px-6 sm:px-12 bg-zinc-900/20">
//         <div className="mx-auto max-w-5xl grid grid-cols-1 gap-6 sm:grid-cols-2">
//           {/* Candidates Card */}
//           <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-7 backdrop-blur-xl flex flex-col justify-between">
//             <div>
//               <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-400">
//                 For Job Seekers
//               </span>
//               <h3 className="mt-3 text-lg font-bold text-zinc-100">Fast-track your applications</h3>
//               <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
//                 Upload your resume, discover your exact semantic match percentage for open roles, and track status transitions in real time.
//               </p>
//             </div>
//             <Link
//               to="/register"
//               className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
//             >
//               Sign up as Candidate <ArrowRight className="h-3.5 w-3.5" />
//             </Link>
//           </div>

//           {/* Recruiters Card */}
//           <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-7 backdrop-blur-xl flex flex-col justify-between">
//             <div>
//               <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-violet-400">
//                 For Recruiters & Teams
//               </span>
//               <h3 className="mt-3 text-lg font-bold text-zinc-100">Cut screening time by 80%</h3>
//               <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
//                 Publish positions, let Gemini ATS rank every inbound candidate by relevance, and move qualified talent seamlessly through Kanban boards.
//               </p>
//             </div>
//             <Link
//               to="/register"
//               className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-violet-400 hover:text-violet-300"
//             >
//               Sign up as Recruiter <ArrowRight className="h-3.5 w-3.5" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-zinc-800/80 py-8 px-6 text-center text-xs text-zinc-500">
//         <p>© 2026 RankResume AI ATS Platform. Designed for modern recruitment.</p>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;









import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import geminiLogo from '../assets/gemini-svg.svg';
import { 
  Sparkles, 
  ArrowRight, 
  Bot, 
  Layers, 
  Zap, 
  CheckCircle2, 
  Kanban, 
  TrendingUp, 
  ChevronRight, 
  Target 
} from 'lucide-react';

const TYPEWRITER_PHRASES = [
  'Parse Resumes with Gemini AI.',
  'Match High-Signal Candidates.',
  'Automate Kanban Hiring Pipelines.',
  'Eliminate Manual ATS Screening.',
];

export const LandingPage = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // High-performance single-line typewriter engine
  useEffect(() => {
    const fullText = TYPEWRITER_PHRASES[currentPhraseIndex];
    let timer;

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? fullText.substring(0, prev.length - 1)
            : fullText.substring(0, prev.length + 1)
        );
      }, isDeleting ? 25 : 60);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-indigo-100 text-slate-900 selection:bg-pink-500 selection:text-white antialiased overflow-x-hidden">
      
      {/* --- Ambient Dynamic Mesh Overlays --- */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Deep Sky Blue Accent Layer */}
        <div className="absolute top-0 left-[-10%] h-[700px] w-[700px] rounded-full bg-blue-400/25 blur-3xl" />
        
        {/* Hot Pink Accent Layer */}
        <div className="absolute top-[10%] right-[-10%] h-[750px] w-[750px] rounded-full bg-pink-400/25 blur-3xl" />
        
        {/* Bottom Transition Layer */}
        <div className="absolute bottom-0 left-1/3 h-[600px] w-[600px] rounded-full bg-indigo-300/30 blur-3xl" />
        
        {/* Subtle Geometric Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-15" />
      </div>

      {/* --- Header --- */}
      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/40 backdrop-blur-md shadow-xs">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-pink-500 p-1.5 shadow-md shadow-pink-500/20 transition-transform group-hover:scale-105">
              <img src={geminiLogo} alt="RankResume AI" className="h-full w-full object-contain" />
            </div>
            <span className="text-base font-extrabold tracking-tight text-slate-900">
              RankResume <span className="bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 transition hover:text-slate-950"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-pink-500/20 transition-all hover:opacity-95 active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </nav>
      </header>

      {/* --- Hero Section with Single-Line H1 Typewriter --- */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-20 text-center sm:px-6 lg:pt-20">
        
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-xs backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
          <span className="bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent font-bold">
            Gemini 2.5 Neural ATS Engine
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600">Automated Vector Scoring</span>
        </div>

        {/* --- Single-Line Monumental H1 Typewriter --- */}
        <div className="mx-auto mt-8 w-full max-w-6xl">
          <h1 className="flex items-center justify-center font-extrabold tracking-tight text-slate-900 text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="whitespace-nowrap overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
              {currentText}
            </span>
            <span className="ml-1 inline-block h-8 sm:h-12 lg:h-16 w-1 sm:w-1.5 rounded-full bg-pink-500 animate-pulse" />
          </h1>
        </div>

        <p className="mx-auto mt-5 max-w-2xl text-sm font-medium text-slate-700 sm:text-base leading-relaxed">
          Upload PDF resumes, generate objective candidate match scores with multi-modal AI, and streamline hiring through live interactive Kanban swimlanes.
        </p>

        {/* Hero Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/register"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 px-7 text-xs font-bold text-white shadow-lg shadow-pink-500/20 transition hover:opacity-95 active:scale-95 sm:w-auto"
          >
            <span>Start Free Evaluation</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/jobs"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/60 bg-white/70 px-7 text-xs font-bold text-slate-800 shadow-xs backdrop-blur-sm transition hover:bg-white sm:w-auto"
          >
            <span>Browse Job Openings</span>
          </Link>
        </div>

        {/* --- Interactive Telemetry Glass Card --- */}
        <div className="mx-auto mt-14 max-w-4xl rounded-3xl border border-white/80 bg-white/70 p-6 sm:p-8 text-left shadow-xl shadow-indigo-500/5 backdrop-blur-md">
          <div className="flex flex-col gap-3 border-b border-slate-200/60 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-blue-600">
                AI Candidate Parsing
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Alex Mercer <span className="font-normal text-slate-500">· Senior Full-Stack Engineer</span>
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-3 py-1 font-mono text-xs font-bold text-pink-600">
              <CheckCircle2 className="h-3.5 w-3.5 text-pink-500" /> 96% Match Vector
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                <Target className="h-4 w-4 text-blue-600" /> Cosine Match
              </div>
              <p className="mt-1.5 text-base font-bold text-slate-900">Optimal Alignment</p>
              <p className="mt-1 text-xs text-slate-600">Top 3% among all inbound applicants</p>
            </div>

            <div className="rounded-2xl border border-pink-100 bg-pink-50/50 p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-700">
                <Sparkles className="h-4 w-4 text-pink-600" /> Extracted Stack
              </div>
              <p className="mt-1.5 text-sm font-bold text-slate-900">React, Node.js, Go, AWS</p>
              <p className="mt-1 text-xs text-slate-600">14 capabilities parsed from PDF</p>
            </div>

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700">
                <Kanban className="h-4 w-4 text-indigo-600" /> Pipeline Stage
              </div>
              <p className="mt-1.5 text-sm font-bold text-slate-900">Interview Scheduled</p>
              <p className="mt-1 text-xs text-slate-600">Auto-advanced from Screening</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Feature Grid --- */}
      <section className="relative z-10 border-t border-white/50 bg-white/40 py-16 px-6 backdrop-blur-md">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-600">
              Core Capabilities
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Precision recruitment tools built for speed
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/80 bg-white/70 p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <Bot className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Gemini Parsing Engine</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Extract candidate experiences, project history, and technical stacks from raw PDF uploads.
              </p>
            </div>

            <div className="rounded-3xl border border-white/80 bg-white/70 p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Objective Alignment</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Rank applicants using multi-factor vector similarity against real job descriptions.
              </p>
            </div>

            <div className="rounded-3xl border border-white/80 bg-white/70 p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <Kanban className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Dynamic Pipelines</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Manage talent seamlessly from Applied to Offer with drag-and-drop state sync.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Dual Role Portal Section --- */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-6 sm:grid-cols-2">
          
          <div className="flex flex-col justify-between rounded-3xl border border-white/80 bg-white/70 p-7 shadow-sm">
            <div>
              <span className="rounded-full bg-blue-100 px-3 py-1 font-mono text-[11px] font-bold text-blue-700">
                CANDIDATE PORTAL
              </span>
              <h3 className="mt-3 text-lg font-bold text-slate-900">Get discovered by top teams</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Upload your CV once, see your verified match score for open roles, and track recruitment progress live.
              </p>
            </div>
            <Link
              to="/register"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              Sign up as Candidate <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex flex-col justify-between rounded-3xl border border-white/80 bg-white/70 p-7 shadow-sm">
            <div>
              <span className="rounded-full bg-pink-100 px-3 py-1 font-mono text-[11px] font-bold text-pink-700">
                RECRUITER WORKSPACE
              </span>
              <h3 className="mt-3 text-lg font-bold text-slate-900">Screen hundreds in seconds</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Let Gemini rank inbound candidate cohorts by competence, slashing manual screening overhead by 80%.
              </p>
            </div>
            <Link
              to="/register"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 hover:text-pink-700"
            >
              Sign up as Recruiter <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="border-t border-white/50 bg-white/30 py-8 px-6 text-center text-xs text-slate-600 backdrop-blur-xs">
        <p>© 2026 RankResume AI. Modern semantic recruitment pipelines.</p>
      </footer>
    </div>
  );
};

export default LandingPage;