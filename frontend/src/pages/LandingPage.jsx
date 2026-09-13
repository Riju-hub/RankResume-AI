// import React, { useState, useEffect, useMemo, memo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import geminiLogo from '../assets/gemini-svg.svg';

// import {
//   Sparkles,
//   ArrowRight,
//   ChevronRight,
//   Target,
//   CheckCircle2,
//   FileSearch,
//   Cpu,
//   Zap,
//   Flame,
//   Layers,
//   ArrowUpRight,
//   MousePointerClick,
//   Sliders,
//   Workflow,
//   FileCheck2,
//   BarChart3,
//   Download,
//   ExternalLink,
//   X
// } from 'lucide-react';


// // ============================================================================
// // Single-Line Compact Typewriter Data
// // ============================================================================

// const TYPEWRITER_DATA = [
//   {
//     text: 'Multi-Modal Resume Extraction with Zero ATS Hallucinations.',
//     gradient: 'from-cyan-300 via-blue-400 to-indigo-400',
//     cursor: 'bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.9)]'
//   },
//   {
//     text: 'Real-Time Vector Similarity & Deep Competency Alignment.',
//     gradient: 'from-fuchsia-300 via-cyan-300 to-blue-400',
//     cursor: 'bg-fuchsia-300 shadow-[0_0_14px_rgba(232,121,249,0.9)]'
//   },
//   {
//     text: 'Autonomous Kanban Screening & Intelligent Candidate Routing.',
//     gradient: 'from-indigo-300 via-blue-300 to-cyan-300',
//     cursor: 'bg-indigo-300 shadow-[0_0_14px_rgba(165,180,252,0.9)]'
//   },
//   {
//     text: 'High-Signal Engineering Talent Discovery in Seconds.',
//     gradient: 'from-sky-300 via-cyan-300 to-blue-400',
//     cursor: 'bg-sky-300 shadow-[0_0_14px_rgba(125,211,252,0.9)]'
//   }
// ];


// // ============================================================================
// // Smooth Multicolor Typewriter
// // ============================================================================

// const SmoothMulticolorTypewriter = memo(() => {
//   const [phraseIdx, setPhraseIdx] = useState(0);
//   const [displayText, setDisplayText] = useState('');
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     const currentItem = TYPEWRITER_DATA[phraseIdx];
//     let timer;

//     if (!isDeleting && displayText === currentItem.text) {
//       timer = setTimeout(() => setIsDeleting(true), 2200);
//     } else if (isDeleting && displayText === '') {
//       timer = setTimeout(() => {
//         setIsDeleting(false);
//         setPhraseIdx((prev) => (prev + 1) % TYPEWRITER_DATA.length);
//       }, 250);
//     } else {
//       const stepSpeed = isDeleting ? 18 : 38;

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
//     <motion.div
//       initial={{ opacity: 0, scale: 0.96 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.5 }}
//       className="
//         inline-flex items-center justify-center max-w-full
//         px-4 py-1.5 rounded-full
//         border border-cyan-300/20
//         bg-slate-950/65
//         shadow-[0_0_30px_rgba(34,211,238,0.08)]
//         backdrop-blur-xl
//       "
//     >
//       <span className="
//         font-mono text-[11px] font-black uppercase
//         tracking-wider text-cyan-300 mr-2
//         flex-shrink-0
//       ">
//         AI Live:
//       </span>

//       <span
//         className={`
//           bg-gradient-to-r ${activePhrase.gradient}
//           bg-clip-text text-transparent
//           font-bold text-xs sm:text-sm md:text-base
//           tracking-tight whitespace-nowrap
//           overflow-hidden text-ellipsis
//         `}
//       >
//         {displayText}
//       </span>

//       <motion.span
//         animate={{ opacity: [1, 0.2, 1] }}
//         transition={{
//           duration: 0.8,
//           repeat: Infinity
//         }}
//         className={`
//           ml-1.5 inline-block
//           h-3.5 sm:h-4 w-[2px]
//           rounded-full flex-shrink-0
//           ${activePhrase.cursor}
//         `}
//       />
//     </motion.div>
//   );
// });

// SmoothMulticolorTypewriter.displayName =
//   'SmoothMulticolorTypewriter';


// // ============================================================================
// // Animated Winter Night Snowfall
// // ============================================================================

// const Snowfall = memo(() => {
//   // CSS handles the snow animation on the compositor instead of
//   // running 100+ independent Framer Motion animations every frame.
//   const flakes = useMemo(() => {
//     return Array.from({ length: 72 }, (_, i) => ({
//       id: i,
//       left: `${(i * 47.17) % 100}%`,
//       size: `${1.4 + ((i * 13) % 7) * 0.45}px`,
//       duration: `${8 + ((i * 23) % 75) / 10}s`,
//       delay: `-${((i * 29) % 100) / 10}s`,
//       drift: `${-30 + ((i * 41) % 61)}px`,
//       opacity: 0.25 + ((i * 17) % 65) / 100,
//     }));
//   }, []);

//   return (
//     <div
//       aria-hidden="true"
//       className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
//     >
//       <style>{`
//         .rankresume-snowflake {
//           position: absolute;
//           top: -12px;
//           border-radius: 9999px;
//           background: rgba(255, 255, 255, 0.95);
//           box-shadow: 0 0 6px rgba(255, 255, 255, 0.45);
//           will-change: transform;
//           transform: translate3d(0, -5vh, 0);
//           animation-name: rankresume-snowfall;
//           animation-timing-function: linear;
//           animation-iteration-count: infinite;
//         }

//         @keyframes rankresume-snowfall {
//           0% {
//             transform: translate3d(0, -5vh, 0);
//           }
//           25% {
//             transform: translate3d(var(--snow-drift), 27vh, 0);
//           }
//           50% {
//             transform: translate3d(calc(var(--snow-drift) * -0.45), 55vh, 0);
//           }
//           75% {
//             transform: translate3d(var(--snow-drift), 82vh, 0);
//           }
//           100% {
//             transform: translate3d(0, 108vh, 0);
//           }
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .rankresume-snowflake {
//             animation: none !important;
//             opacity: 0.35 !important;
//             transform: translate3d(0, 20vh, 0);
//           }
//         }
//       `}</style>

//       {/* Static winter sky — avoids continuously repainting a full-screen gradient. */}
//       <div
//         className="
//           absolute inset-0
//           bg-[radial-gradient(circle_at_50%_0%,rgba(30,64,175,0.30),transparent_42%),linear-gradient(180deg,#020817_0%,#06132e_45%,#081a38_100%)]
//         "
//       />

//       {/* Slow GPU-friendly atmospheric glows. */}
//       <motion.div
//         className="
//           absolute -top-40 left-[12%]
//           h-[520px] w-[520px]
//           rounded-full bg-blue-500/15
//           blur-[110px]
//           will-change-transform
//         "
//         animate={{
//           x: [0, 70, -20, 0],
//           y: [0, 25, -8, 0],
//         }}
//         transition={{
//           duration: 24,
//           repeat: Infinity,
//           ease: 'easeInOut',
//         }}
//       />

//       <motion.div
//         className="
//           absolute top-[28%] right-[-8%]
//           h-[560px] w-[560px]
//           rounded-full bg-cyan-400/10
//           blur-[125px]
//           will-change-transform
//         "
//         animate={{
//           x: [0, -55, 20, 0],
//           y: [0, -30, 18, 0],
//         }}
//         transition={{
//           duration: 28,
//           repeat: Infinity,
//           ease: 'easeInOut',
//         }}
//       />

//       {/* Very subtle static stars. */}
//       <div
//         className="
//           absolute inset-0 opacity-35
//           bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.75)_0.65px,transparent_0.9px)]
//           [background-size:80px_80px]
//         "
//       />

//       {/* Lightweight compositor-based snow. */}
//       {flakes.map((flake) => (
//         <span
//           key={flake.id}
//           className="rankresume-snowflake"
//           style={{
//             left: flake.left,
//             width: flake.size,
//             height: flake.size,
//             opacity: flake.opacity,
//             animationDuration: flake.duration,
//             animationDelay: flake.delay,
//             '--snow-drift': flake.drift,
//           }}
//         />
//       ))}
//     </div>
//   );
// });

// Snowfall.displayName = 'Snowfall';


// // ============================================================================
// // ResumeIQ ATS floating launch panel
// // ============================================================================
// const ATS_URL = 'https://resumeiq-jxzub6fh22sedvgffpftsr.streamlit.app/';

// const ATSLaunchPanel = memo(({ onClose }) => (
//   <motion.aside
//     initial={{ opacity: 0, x: 30, y: 10, scale: 0.96 }}
//     animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
//     exit={{ opacity: 0, x: 30, y: 10, scale: 0.96 }}
//     transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
//     className="fixed right-4 top-24 z-[60] w-[min(370px,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-white/15 bg-slate-950/90 p-4 text-left shadow-[0_25px_80px_rgba(0,0,0,0.45),0_0_45px_rgba(34,211,238,0.1)] backdrop-blur-2xl"
//     role="dialog"
//     aria-label="ResumeIQ ATS"
//   >
//     <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-fuchsia-400 via-blue-400 to-cyan-300" />
//     <div className="pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />
//     <div className="pointer-events-none absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
//     <div className="relative">
//       <div className="flex items-start justify-between gap-3">
//         <div className="flex items-center gap-3">
//           <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-400/20 via-blue-500/15 to-fuchsia-500/20 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.12)]">
//             <FileCheck2 className="h-5 w-5" />
//           </div>
//           <div>
//             <div className="flex items-center gap-2">
//               <span className="text-sm font-black text-white">ResumeIQ <span className="text-cyan-300">ATS</span></span>
//               <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-2 py-0.5 font-mono text-[8px] font-black uppercase tracking-wider text-emerald-300">Live</span>
//             </div>
//             <p className="mt-0.5 text-[10px] font-semibold text-slate-400">Resume intelligence workspace</p>
//           </div>
//         </div>
//         <button type="button" onClick={onClose} aria-label="Close ATS panel" className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white active:scale-95">
//           <X className="h-3.5 w-3.5" />
//         </button>
//       </div>
//       <div className="mt-4 grid grid-cols-3 gap-2">
//         <div className="rounded-xl border border-cyan-300/10 bg-cyan-400/5 p-2.5"><BarChart3 className="h-3.5 w-3.5 text-cyan-300" /><p className="mt-1 text-[9px] font-bold leading-tight text-slate-300">Resume score</p></div>
//         <div className="rounded-xl border border-fuchsia-300/10 bg-fuchsia-400/5 p-2.5"><FileCheck2 className="h-3.5 w-3.5 text-fuchsia-300" /><p className="mt-1 text-[9px] font-bold leading-tight text-slate-300">ATS analysis</p></div>
//         <div className="rounded-xl border border-blue-300/10 bg-blue-400/5 p-2.5"><Download className="h-3.5 w-3.5 text-blue-300" /><p className="mt-1 text-[9px] font-bold leading-tight text-slate-300">PDF / text</p></div>
//       </div>
//       <p className="mt-4 text-[11px] font-medium leading-relaxed text-slate-400">Check your resume score, identify ATS gaps, and generate a detailed report in PDF or text format.</p>
//       <a href={ATS_URL} target="_blank" rel="noopener noreferrer" className="group relative mt-4 flex h-11 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-fuchsia-500 via-blue-600 to-cyan-500 text-xs font-black text-white shadow-[0_10px_30px_rgba(34,211,238,0.18)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0">
//         <span className="relative z-10">Open ResumeIQ ATS</span><ExternalLink className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//         <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[420%]" />
//       </a>
//       <p className="mt-2 text-center font-mono text-[8px] font-bold uppercase tracking-wider text-slate-600">Opens securely in a new tab</p>
//     </div>
//   </motion.aside>
// ));
// ATSLaunchPanel.displayName = 'ATSLaunchPanel';

// // ============================================================================
// // Main Landing Page
// // ============================================================================

// export const LandingPage = () => {
//   const [activeTab, setActiveTab] =
//     useState('recruiter');
//   const [showATSPanel, setShowATSPanel] = useState(true);

//   return (
//     <div
//       className="
//         relative
//         min-h-screen
//         bg-[#020817]
//         text-slate-100
//         selection:bg-cyan-400
//         selection:text-slate-950
//         antialiased
//         overflow-x-hidden
//         font-sans
//       "
//     >

//       {/* ================================================================
//           GLOBAL WINTER BACKGROUND
//       ================================================================ */}

//       <Snowfall />


//       {/* ================================================================
//           NAVBAR
//       ================================================================ */}

//       <motion.header
//         initial={{
//           y: -24,
//           opacity: 0
//         }}
//         animate={{
//           y: 0,
//           opacity: 1
//         }}
//         transition={{
//           duration: 0.7,
//           ease: 'easeOut'
//         }}
//         className="
//           sticky top-0
//           z-50
//           border-b border-white/10
//           bg-slate-950/60
//           backdrop-blur-2xl
//           shadow-[0_8px_35px_rgba(0,0,0,0.25)]
//         "
//       >

//         {/* Frozen top light */}
//         <div
//           className="
//             absolute top-0 left-0 right-0
//             h-[2px]
//             bg-gradient-to-r
//             from-cyan-300
//             via-blue-500
//             to-indigo-400
//             shadow-[0_0_18px_rgba(34,211,238,0.65)]
//           "
//         />

//         <nav
//           className="
//             mx-auto
//             flex
//             h-16
//             max-w-7xl
//             items-center
//             justify-between
//             px-3.5
//             sm:px-8
//           "
//         >

//           {/* Brand */}

//           <Link
//             to="/"
//             className="
//               flex items-center
//               gap-2 sm:gap-3
//               group
//               min-w-0
//             "
//           >
//             <motion.div
//               whileHover={{
//                 scale: 1.08,
//                 rotate: 3
//               }}
//               className="
//                 relative
//                 flex
//                 h-8 w-8
//                 sm:h-9 sm:w-9
//                 shrink-0
//                 items-center
//                 justify-center
//                 rounded-xl
//                 bg-gradient-to-tr
//                 from-blue-600
//                 via-indigo-600
//                 to-cyan-400
//                 p-1.5
//                 shadow-[0_0_25px_rgba(34,211,238,0.25)]
//               "
//             >
//               <img
//                 src={geminiLogo}
//                 alt="RankResume AI"
//                 className="
//                   h-full
//                   w-full
//                   object-contain
//                   filter brightness-125
//                 "
//               />
//             </motion.div>

//             <div
//               className="
//                 flex flex-col
//                 select-none
//                 truncate
//               "
//             >
//               <span
//                 className="
//                   text-xs sm:text-base
//                   font-black
//                   tracking-tight
//                   text-white
//                   flex
//                   items-center
//                   gap-1
//                   leading-none
//                 "
//               >
//                 <span className="truncate">
//                   RankResume
//                 </span>

//                 <span
//                   className="
//                     bg-gradient-to-r
//                     from-cyan-300
//                     to-blue-400
//                     bg-clip-text
//                     text-transparent
//                   "
//                 >
//                   AI
//                 </span>
//               </span>

//               <span
//                 className="
//                   hidden sm:inline
//                   text-[9px]
//                   font-mono
//                   tracking-widest
//                   uppercase
//                   font-extrabold
//                   text-cyan-300
//                   mt-0.5
//                 "
//               >
//                 Autonomous ATS
//               </span>
//             </div>
//           </Link>


//           {/* Engine Status */}

//           <div
//             className="
//               hidden md:flex
//               items-center
//               gap-2.5
//               rounded-full
//               border border-cyan-300/20
//               bg-slate-950/55
//               px-4 py-1.5
//               text-xs
//               text-slate-200
//               shadow-[0_0_20px_rgba(34,211,238,0.05)]
//               backdrop-blur-xl
//             "
//           >
//             <span className="relative flex h-2 w-2">

//               <motion.span
//                 animate={{
//                   scale: [1, 1.8, 1],
//                   opacity: [0.8, 0, 0.8]
//                 }}
//                 transition={{
//                   duration: 1.8,
//                   repeat: Infinity
//                 }}
//                 className="
//                   absolute
//                   inline-flex
//                   h-full
//                   w-full
//                   rounded-full
//                   bg-cyan-300
//                 "
//               />

//               <span
//                 className="
//                   relative
//                   inline-flex
//                   rounded-full
//                   h-2 w-2
//                   bg-cyan-300
//                 "
//               />
//             </span>

//             <span className="text-slate-400 font-medium">
//               Gemini 2.5 Engine:
//             </span>

//             <span
//               className="
//                 font-bold
//                 bg-gradient-to-r
//                 from-cyan-300
//                 to-blue-400
//                 bg-clip-text
//                 text-transparent
//               "
//             >
//               Operational
//             </span>
//           </div>


//           {/* Actions */}

//           <div
//             className="
//               flex items-center
//               gap-1.5 sm:gap-3
//               shrink-0
//             "
//           >

//             <Link
//               to="/login"
//               className="
//                 rounded-xl
//                 px-2.5 sm:px-4
//                 py-1.5 sm:py-2
//                 text-xs
//                 font-bold
//                 text-slate-300
//                 transition-all
//                 hover:bg-white/10
//                 hover:text-white
//               "
//             >
//               Sign In
//             </Link>

//             <a
//               href={ATS_URL}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="group hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-fuchsia-300/20 bg-white/5 px-3 py-1.5 text-xs font-extrabold text-cyan-200 transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-400/10 active:translate-y-0"
//             >
//               <FileCheck2 className="h-3.5 w-3.5 text-fuchsia-300" /> ATS <ExternalLink className="h-3 w-3 text-cyan-300" />
//             </a>

//             <Link
//               to="/register"
//               className="
//                 group
//                 inline-flex
//                 items-center
//                 gap-1.5
//                 rounded-xl
//                 bg-gradient-to-r
//                 from-blue-600
//                 via-indigo-600
//                 to-cyan-500
//                 px-3 sm:px-4
//                 py-1.5 sm:py-2
//                 text-xs
//                 font-extrabold
//                 text-white
//                 shadow-[0_0_25px_rgba(34,211,238,0.18)]
//                 transition-all
//                 hover:shadow-[0_0_35px_rgba(34,211,238,0.35)]
//                 hover:scale-[1.02]
//                 active:scale-95
//               "
//             >
//               <Sparkles
//                 className="
//                   h-3.5
//                   w-3.5
//                   text-white
//                 "
//               />

//               <span className="hidden xs:inline">
//                 Get Started
//               </span>

//               <span className="xs:hidden">
//                 Join
//               </span>

//               <ArrowRight
//                 className="
//                   h-3.5
//                   w-3.5
//                   stroke-[2.5]
//                   transition-transform
//                   group-hover:translate-x-0.5
//                 "
//               />
//             </Link>

//           </div>
//         </nav>
//       </motion.header>


//       {/* ================================================================
//           HERO
//       ================================================================ */}

//       <motion.section
//         initial={{
//           opacity: 0,
//           y: 24
//         }}
//         animate={{
//           opacity: 1,
//           y: 0
//         }}
//         transition={{
//           duration: 0.8,
//           ease: 'easeOut'
//         }}
//         className="
//           relative
//           z-10
//           mx-auto
//           max-w-7xl
//           px-4
//           pt-16
//           pb-20
//           text-center
//           sm:px-6
//           lg:pt-24
//         "
//       >

//         {/* Badge */}

//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 12
//           }}
//           animate={{
//             opacity: 1,
//             y: 0
//           }}
//           transition={{
//             delay: 0.15,
//             duration: 0.5
//           }}
//           className="
//             inline-flex
//             items-center
//             gap-2
//             rounded-full
//             border border-cyan-300/20
//             bg-slate-950/65
//             px-4
//             py-1.5
//             text-xs
//             font-semibold
//             text-slate-200
//             shadow-[0_0_30px_rgba(34,211,238,0.08)]
//             backdrop-blur-xl
//           "
//         >
//           <Sparkles
//             className="
//               h-3.5
//               w-3.5
//               text-cyan-300
//             "
//           />

//           <span>
//             Next-Generation Evaluation Engine
//           </span>

//           <span className="text-slate-600">
//             |
//           </span>

//           <span
//             className="
//               font-bold
//               text-cyan-300
//             "
//           >
//             Zero Hallucinations
//           </span>
//         </motion.div>


//         {/* Headline */}

//         <motion.h1
//           initial={{
//             opacity: 0,
//             y: 18
//           }}
//           animate={{
//             opacity: 1,
//             y: 0
//           }}
//           transition={{
//             delay: 0.25,
//             duration: 0.7
//           }}
//           className="
//             mt-8
//             text-3xl
//             sm:text-5xl
//             md:text-6xl
//             font-black
//             tracking-tight
//             text-white
//             max-w-4xl
//             mx-auto
//             leading-tight
//           "
//         >
//           Smarter Applicant Screening with{' '}

//           <span
//             className="
//               bg-gradient-to-r
//               from-cyan-300
//               via-blue-400
//               to-indigo-400
//               bg-clip-text
//               text-transparent
//               drop-shadow-[0_0_25px_rgba(34,211,238,0.12)]
//             "
//           >
//             Multi-Modal Intelligence
//           </span>
//         </motion.h1>


//         {/* Typewriter */}

//         <div
//           className="
//             mt-6
//             flex
//             justify-center
//             items-center
//             px-2
//           "
//         >
//           <SmoothMulticolorTypewriter />
//         </div>


//         {/* Description */}

//         <motion.p
//           initial={{
//             opacity: 0
//           }}
//           animate={{
//             opacity: 1
//           }}
//           transition={{
//             delay: 0.45,
//             duration: 0.7
//           }}
//           className="
//             mx-auto
//             mt-6
//             max-w-2xl
//             text-sm
//             sm:text-base
//             font-medium
//             text-slate-300
//             leading-relaxed
//           "
//         >
//           Eliminate keyword guessing and manual screening backlogs.
//           RankResume AI computes{' '}

//           <span
//             className="
//               text-cyan-300
//               font-bold
//               underline
//               decoration-cyan-500/40
//               underline-offset-4
//             "
//           >
//             multidimensional cosine scores
//           </span>

//           , verifies{' '}

//           <span
//             className="
//               text-fuchsia-300
//               font-bold
//               underline
//               decoration-fuchsia-500/40
//               underline-offset-4
//             "
//           >
//             practical technical stacks
//           </span>

//           , and orchestrates candidate flow across{' '}

//           <span
//             className="
//               text-indigo-300
//               font-bold
//               underline
//               decoration-indigo-500/40
//               underline-offset-4
//             "
//           >
//             instant Kanban pipelines
//           </span>.
//         </motion.p>


//         {/* CTAs */}

//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 15
//           }}
//           animate={{
//             opacity: 1,
//             y: 0
//           }}
//           transition={{
//             delay: 0.55,
//             duration: 0.6
//           }}
//           className="
//             mt-10
//             flex
//             flex-col
//             items-center
//             justify-center
//             gap-4
//             sm:flex-row
//           "
//         >

//           <Link
//             to="/register"
//             className="
//               flex
//               h-12
//               w-full
//               items-center
//               justify-center
//               gap-2.5
//               rounded-xl
//               bg-gradient-to-r
//               from-blue-600
//               via-indigo-600
//               to-cyan-500
//               px-8
//               text-xs
//               font-bold
//               text-white
//               shadow-[0_0_35px_rgba(34,211,238,0.16)]
//               transition-all
//               duration-300
//               hover:shadow-[0_0_45px_rgba(34,211,238,0.3)]
//               hover:-translate-y-0.5
//               active:translate-y-0
//               sm:w-auto
//             "
//           >
//             <Zap
//               className="
//                 h-4
//                 w-4
//                 fill-white
//               "
//             />

//             <span>
//               Launch Free Trial
//             </span>
//           </Link>


//           <Link
//             to="/jobs"
//             className="
//               flex
//               h-12
//               w-full
//               items-center
//               justify-center
//               gap-2
//               rounded-xl
//               border border-cyan-300/20
//               bg-slate-950/60
//               px-8
//               text-xs
//               font-bold
//               text-slate-200
//               shadow-[0_0_25px_rgba(0,0,0,0.12)]
//               backdrop-blur-xl
//               transition-all
//               hover:bg-white/10
//               hover:border-cyan-300/40
//               hover:text-white
//               sm:w-auto
//             "
//           >
//             <span>
//               Explore Active Jobs
//             </span>

//             <ChevronRight
//               className="
//                 h-4
//                 w-4
//                 text-cyan-300
//               "
//             />
//           </Link>

//           <a
//             href={ATS_URL}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-fuchsia-300/25 bg-gradient-to-r from-fuchsia-500/10 via-blue-500/10 to-cyan-400/10 px-7 text-xs font-black text-fuchsia-200 shadow-[0_0_25px_rgba(217,70,239,0.08)] backdrop-blur-xl transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-400/10 hover:text-cyan-100 active:translate-y-0 sm:w-auto"
//           >
//             <FileCheck2 className="h-4 w-4 text-fuchsia-300" />
//             <span>Check Resume with ATS</span>
//             <ExternalLink className="h-3.5 w-3.5 text-cyan-300" />
//           </a>

//         </motion.div>


//         {/* ================================================================
//             TELEMETRY CARD
//         ================================================================ */}

//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 35
//           }}
//           animate={{
//             opacity: 1,
//             y: 0
//           }}
//           transition={{
//             delay: 0.7,
//             duration: 0.8
//           }}
//           whileHover={{
//             y: -4
//           }}
//           className="
//             relative
//             mx-auto
//             mt-16
//             max-w-4xl
//             rounded-3xl
//             border border-white/10
//             bg-slate-950/60
//             p-6 sm:p-8
//             text-left
//             shadow-[0_25px_80px_rgba(0,0,0,0.3)]
//             backdrop-blur-2xl
//           "
//         >

//           {/* Card glow */}

//           <div
//             className="
//               pointer-events-none
//               absolute
//               inset-0
//               rounded-3xl
//               bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.08),transparent_35%)]
//             "
//           />


//           <div
//             className="
//               relative
//               flex
//               flex-col
//               gap-4
//               border-b
//               border-white/10
//               pb-5
//               sm:flex-row
//               sm:items-center
//               sm:justify-between
//             "
//           >

//             <div
//               className="
//                 flex
//                 items-center
//                 gap-3.5
//               "
//             >

//               <span className="relative flex h-3.5 w-3.5">

//                 <motion.span
//                   animate={{
//                     scale: [1, 1.8, 1],
//                     opacity: [0.8, 0, 0.8]
//                   }}
//                   transition={{
//                     duration: 1.8,
//                     repeat: Infinity
//                   }}
//                   className="
//                     absolute
//                     inline-flex
//                     h-full
//                     w-full
//                     rounded-full
//                     bg-cyan-300
//                   "
//                 />

//                 <span
//                   className="
//                     relative
//                     inline-flex
//                     rounded-full
//                     h-3.5
//                     w-3.5
//                     bg-cyan-300
//                   "
//                 />

//               </span>


//               <div>

//                 <span
//                   className="
//                     font-mono
//                     text-[11px]
//                     font-bold
//                     uppercase
//                     tracking-wider
//                     text-cyan-300
//                   "
//                 >
//                   Live Neural Telemetry
//                 </span>

//                 <h3
//                   className="
//                     text-base
//                     font-bold
//                     text-white
//                   "
//                 >
//                   Alex Mercer

//                   <span
//                     className="
//                       font-normal
//                       text-slate-400
//                     "
//                   >
//                     {' '}· Senior Full-Stack Engineer
//                   </span>
//                 </h3>

//               </div>

//             </div>


//             <div
//               className="
//                 flex
//                 items-center
//                 gap-2
//               "
//             >

//               <span
//                 className="
//                   inline-flex
//                   items-center
//                   gap-1.5
//                   rounded-full
//                   border border-fuchsia-300/20
//                   bg-fuchsia-400/10
//                   px-3.5
//                   py-1.5
//                   font-mono
//                   text-xs
//                   font-bold
//                   text-fuchsia-300
//                   shadow-[0_0_20px_rgba(217,70,239,0.08)]
//                 "
//               >
//                 <CheckCircle2
//                   className="
//                     h-3.5
//                     w-3.5
//                     text-fuchsia-300
//                   "
//                 />

//                 97.4% Match Vector
//               </span>

//             </div>

//           </div>


//           {/* Metrics */}

//           <div
//             className="
//               relative
//               mt-6
//               grid
//               grid-cols-1
//               gap-4
//               sm:grid-cols-3
//             "
//           >

//             {/* Cosine */}

//             <motion.div
//               whileHover={{
//                 y: -4,
//                 scale: 1.01
//               }}
//               className="
//                 group
//                 rounded-2xl
//                 border border-cyan-300/15
//                 bg-gradient-to-br
//                 from-blue-500/10
//                 via-slate-900/55
//                 to-slate-950/70
//                 p-5
//                 shadow-[0_10px_30px_rgba(0,0,0,0.15)]
//                 transition-all
//               "
//             >
//               <div
//                 className="
//                   flex
//                   items-center
//                   gap-2
//                   text-xs
//                   font-bold
//                   uppercase
//                   tracking-wider
//                   text-cyan-300
//                 "
//               >
//                 <Target
//                   className="
//                     h-4
//                     w-4
//                     text-cyan-300
//                   "
//                 />

//                 Cosine Match
//               </div>

//               <p
//                 className="
//                   mt-2
//                   text-xl
//                   font-black
//                   text-white
//                 "
//               >
//                 Top 1.5% Tier
//               </p>

//               <p
//                 className="
//                   mt-1
//                   text-xs
//                   text-slate-400
//                 "
//               >
//                 Ranked against 412 role criteria
//               </p>
//             </motion.div>


//             {/* Tech Alignment */}

//             <motion.div
//               whileHover={{
//                 y: -4,
//                 scale: 1.01
//               }}
//               className="
//                 group
//                 rounded-2xl
//                 border border-fuchsia-300/15
//                 bg-gradient-to-br
//                 from-fuchsia-500/10
//                 via-slate-900/55
//                 to-slate-950/70
//                 p-5
//                 shadow-[0_10px_30px_rgba(0,0,0,0.15)]
//                 transition-all
//               "
//             >
//               <div
//                 className="
//                   flex
//                   items-center
//                   gap-2
//                   text-xs
//                   font-bold
//                   uppercase
//                   tracking-wider
//                   text-fuchsia-300
//                 "
//               >
//                 <Flame
//                   className="
//                     h-4
//                     w-4
//                     text-fuchsia-300
//                   "
//                 />

//                 Tech Alignment
//               </div>

//               <p
//                 className="
//                   mt-2
//                   text-sm
//                   font-bold
//                   text-slate-100
//                 "
//               >
//                 React 19, TypeScript, Go, Redis
//               </p>

//               <p
//                 className="
//                   mt-1
//                   text-xs
//                   text-slate-400
//                 "
//               >
//                 12 of 12 required skills verified
//               </p>
//             </motion.div>


//             {/* Workflow */}

//             <motion.div
//               whileHover={{
//                 y: -4,
//                 scale: 1.01
//               }}
//               className="
//                 group
//                 rounded-2xl
//                 border border-indigo-300/15
//                 bg-gradient-to-br
//                 from-indigo-500/10
//                 via-slate-900/55
//                 to-slate-950/70
//                 p-5
//                 shadow-[0_10px_30px_rgba(0,0,0,0.15)]
//                 transition-all
//               "
//             >
//               <div
//                 className="
//                   flex
//                   items-center
//                   gap-2
//                   text-xs
//                   font-bold
//                   uppercase
//                   tracking-wider
//                   text-indigo-300
//                 "
//               >
//                 <Workflow
//                   className="
//                     h-4
//                     w-4
//                     text-indigo-300
//                   "
//                 />

//                 Workflow State
//               </div>

//               <p
//                 className="
//                   mt-2
//                   text-sm
//                   font-bold
//                   text-indigo-300
//                 "
//               >
//                 Interview Fast-Tracked
//               </p>

//               <p
//                 className="
//                   mt-1
//                   text-xs
//                   text-slate-400
//                 "
//               >
//                 Autonomous calendar trigger sent
//               </p>
//             </motion.div>

//           </div>
//         </motion.div>

//       </motion.section>


//       {/* ================================================================
//           ARCHITECTURAL PILLARS
//       ================================================================ */}

//       <motion.section
//         initial={{
//           opacity: 0,
//           y: 30
//         }}
//         whileInView={{
//           opacity: 1,
//           y: 0
//         }}
//         viewport={{
//           once: true,
//           amount: 0.15
//         }}
//         transition={{
//           duration: 0.7
//         }}
//         className="
//           relative
//           z-10
//           border-t border-white/10
//           bg-slate-950/35
//           py-24
//           px-6
//           backdrop-blur-md
//         "
//       >

//         <div className="mx-auto max-w-6xl">

//           <div
//             className="
//               text-center
//               max-w-3xl
//               mx-auto
//             "
//           >

//             <span
//               className="
//                 font-mono
//                 text-xs
//                 font-bold
//                 uppercase
//                 tracking-widest
//                 text-cyan-300
//               "
//             >
//               High-Precision ATS Pipeline
//             </span>

//             <h2
//               className="
//                 mt-3
//                 text-2xl
//                 font-black
//                 text-white
//                 sm:text-4xl
//               "
//             >
//               Engineered to Replace Flawed Keyword Filters
//             </h2>

//             <p
//               className="
//                 mt-3
//                 text-sm
//                 text-slate-300
//                 leading-relaxed
//               "
//             >
//               Legacy ATS platforms drop top engineers over missed
//               synonyms. Our multi-modal LLM architecture parses raw
//               contextual experience, project impact, and system design
//               capability.
//             </p>

//           </div>


//           <div
//             className="
//               mt-14
//               grid
//               grid-cols-1
//               gap-6
//               sm:grid-cols-3
//             "
//           >

//             {/* Card 1 */}

//             <motion.div
//               whileHover={{
//                 y: -7
//               }}
//               className="
//                 group
//                 rounded-3xl
//                 border border-cyan-300/15
//                 bg-gradient-to-b
//                 from-slate-900/70
//                 to-blue-950/40
//                 p-8
//                 shadow-[0_15px_45px_rgba(0,0,0,0.2)]
//                 backdrop-blur-xl
//                 transition-all
//               "
//             >

//               <div
//                 className="
//                   flex
//                   h-12
//                   w-12
//                   items-center
//                   justify-center
//                   rounded-2xl
//                   bg-cyan-400/10
//                   text-cyan-300
//                   border border-cyan-300/20
//                 "
//               >
//                 <FileSearch
//                   className="
//                     h-6
//                     w-6
//                   "
//                 />
//               </div>

//               <h3
//                 className="
//                   mt-6
//                   text-base
//                   font-bold
//                   text-white
//                 "
//               >
//                 1. Contextual PDF Parsing
//               </h3>

//               <p
//                 className="
//                   mt-2.5
//                   text-xs
//                   leading-relaxed
//                   text-slate-300
//                 "
//               >
//                 Direct visual layout understanding extracts
//                 multi-column structures, GitHub references,
//                 and technical deliverables without truncation.
//               </p>

//             </motion.div>


//             {/* Card 2 */}

//             <motion.div
//               whileHover={{
//                 y: -7
//               }}
//               className="
//                 group
//                 rounded-3xl
//                 border border-fuchsia-300/15
//                 bg-gradient-to-b
//                 from-slate-900/70
//                 to-fuchsia-950/35
//                 p-8
//                 shadow-[0_15px_45px_rgba(0,0,0,0.2)]
//                 backdrop-blur-xl
//                 transition-all
//               "
//             >

//               <div
//                 className="
//                   flex
//                   h-12
//                   w-12
//                   items-center
//                   justify-center
//                   rounded-2xl
//                   bg-fuchsia-400/10
//                   text-fuchsia-300
//                   border border-fuchsia-300/20
//                 "
//               >
//                 <Cpu
//                   className="
//                     h-6
//                     w-6
//                   "
//                 />
//               </div>

//               <h3
//                 className="
//                   mt-6
//                   text-base
//                   font-bold
//                   text-white
//                 "
//               >
//                 2. Dense Vector Embeddings
//               </h3>

//               <p
//                 className="
//                   mt-2.5
//                   text-xs
//                   leading-relaxed
//                   text-slate-300
//                 "
//               >
//                 Matches candidate achievements against specific
//                 team deliverables using high-dimensional cosine
//                 similarity vectors.
//               </p>

//             </motion.div>


//             {/* Card 3 */}

//             <motion.div
//               whileHover={{
//                 y: -7
//               }}
//               className="
//                 group
//                 rounded-3xl
//                 border border-indigo-300/15
//                 bg-gradient-to-b
//                 from-slate-900/70
//                 to-indigo-950/40
//                 p-8
//                 shadow-[0_15px_45px_rgba(0,0,0,0.2)]
//                 backdrop-blur-xl
//                 transition-all
//               "
//             >

//               <div
//                 className="
//                   flex
//                   h-12
//                   w-12
//                   items-center
//                   justify-center
//                   rounded-2xl
//                   bg-indigo-400/10
//                   text-indigo-300
//                   border border-indigo-300/20
//                 "
//               >
//                 <Layers
//                   className="
//                     h-6
//                     w-6
//                   "
//                 />
//               </div>

//               <h3
//                 className="
//                   mt-6
//                   text-base
//                   font-bold
//                   text-white
//                 "
//               >
//                 3. Live Kanban Pipeline
//               </h3>

//               <p
//                 className="
//                   mt-2.5
//                   text-xs
//                   leading-relaxed
//                   text-slate-300
//                 "
//               >
//                 Automatically transitions high-fit candidates
//                 across customized interview rounds, generating
//                 briefing sheets for hiring leads.
//               </p>

//             </motion.div>

//           </div>

//         </div>

//       </motion.section>


//       {/* ================================================================
//           DUAL ROLE WORKSPACES
//       ================================================================ */}

//       <motion.section
//         initial={{
//           opacity: 0
//         }}
//         whileInView={{
//           opacity: 1
//         }}
//         viewport={{
//           once: true,
//           amount: 0.1
//         }}
//         transition={{
//           duration: 0.7
//         }}
//         className="
//           py-24
//           px-6
//           relative
//           z-10
//         "
//       >

//         <div className="mx-auto max-w-5xl">

//           <div
//             className="
//               text-center
//               mb-10
//             "
//           >

//             <h2
//               className="
//                 text-2xl
//                 font-black
//                 text-white
//                 sm:text-3xl
//               "
//             >
//               Tailored Workspaces Built for Speed
//             </h2>

//             <p
//               className="
//                 text-xs
//                 text-slate-400
//                 mt-2
//                 font-medium
//               "
//             >
//               Switch roles to view specialized workflows
//             </p>


//             {/* Tabs */}

//             <div
//               className="
//                 mt-6
//                 inline-flex
//                 p-1
//                 rounded-2xl
//                 bg-slate-950/60
//                 border border-white/10
//                 shadow-[0_0_25px_rgba(0,0,0,0.15)]
//                 backdrop-blur-xl
//               "
//             >

//               <button
//                 type="button"
//                 onClick={() =>
//                   setActiveTab('recruiter')
//                 }
//                 className={`
//                   flex
//                   items-center
//                   gap-2
//                   rounded-xl
//                   px-5
//                   py-2
//                   text-xs
//                   font-bold
//                   transition-all
//                   ${
//                     activeTab === 'recruiter'
//                       ? 'bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white shadow-[0_0_25px_rgba(217,70,239,0.25)]'
//                       : 'text-slate-400 hover:text-white hover:bg-white/5'
//                   }
//                 `}
//               >

//                 <Sliders
//                   className="
//                     h-3.5
//                     w-3.5
//                   "
//                 />

//                 For Recruiters

//               </button>


//               <button
//                 type="button"
//                 onClick={() =>
//                   setActiveTab('candidate')
//                 }
//                 className={`
//                   flex
//                   items-center
//                   gap-2
//                   rounded-xl
//                   px-5
//                   py-2
//                   text-xs
//                   font-bold
//                   transition-all
//                   ${
//                     activeTab === 'candidate'
//                       ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_25px_rgba(34,211,238,0.25)]'
//                       : 'text-slate-400 hover:text-white hover:bg-white/5'
//                   }
//                 `}
//               >

//                 <MousePointerClick
//                   className="
//                     h-3.5
//                     w-3.5
//                   "
//                 />

//                 For Candidates

//               </button>

//             </div>

//           </div>


//           {/* Workspace cards */}

//           <div
//             className="
//               grid
//               grid-cols-1
//               gap-6
//               sm:grid-cols-2
//             "
//           >

//             {/* ============================================================
//                 Recruiter
//             ============================================================ */}

//             <motion.div
//               whileHover={{
//                 y: -6
//               }}
//               className={`
//                 flex
//                 flex-col
//                 justify-between
//                 rounded-3xl
//                 border
//                 p-8
//                 shadow-[0_15px_45px_rgba(0,0,0,0.2)]
//                 backdrop-blur-xl
//                 transition-all
//                 ${
//                   activeTab === 'recruiter'
//                     ? 'border-fuchsia-300/30 bg-gradient-to-br from-fuchsia-500/15 via-slate-900/75 to-indigo-950/45 ring-1 ring-fuchsia-400/20 shadow-[0_20px_60px_rgba(217,70,239,0.12)]'
//                     : 'border-white/10 bg-slate-950/45 opacity-70 hover:opacity-100'
//                 }
//               `}
//             >

//               <div>

//                 <div
//                   className="
//                     flex
//                     items-center
//                     gap-2
//                   "
//                 >

//                   <span
//                     className="
//                       rounded-full
//                       bg-fuchsia-400/10
//                       border border-fuchsia-300/30
//                       px-3
//                       py-1
//                       font-mono
//                       text-[10px]
//                       font-bold
//                       text-fuchsia-300
//                       shadow-sm
//                     "
//                   >
//                     TALENT ACQUISITION
//                   </span>

//                 </div>

//                 <h3
//                   className="
//                     mt-4
//                     text-xl
//                     font-bold
//                     text-white
//                   "
//                 >
//                   Rank Candidate Batches Instantly
//                 </h3>

//                 <p
//                   className="
//                     mt-2.5
//                     text-xs
//                     leading-relaxed
//                     text-slate-300
//                   "
//                 >
//                   Ingest 500+ applications at once. The neural
//                   ranking pipeline filters out superficial keyword
//                   stuffers and bubbles up candidates who have
//                   executed real-world production code.
//                 </p>


//                 <ul
//                   className="
//                     mt-5
//                     space-y-2
//                     text-xs
//                     text-slate-300
//                   "
//                 >

//                   <li
//                     className="
//                       flex
//                       items-center
//                       gap-2
//                     "
//                   >
//                     <CheckCircle2
//                       className="
//                         h-4
//                         w-4
//                         text-fuchsia-300
//                       "
//                     />

//                     Automated candidate scoring matrices
//                   </li>

//                   <li
//                     className="
//                       flex
//                       items-center
//                       gap-2
//                     "
//                   >
//                     <CheckCircle2
//                       className="
//                         h-4
//                         w-4
//                         text-fuchsia-300
//                       "
//                     />

//                     One-click interview stage progression
//                   </li>

//                 </ul>

//               </div>


//               <Link
//                 to="/register"
//                 className="
//                   mt-8
//                   inline-flex
//                   items-center
//                   gap-2
//                   text-xs
//                   font-bold
//                   text-fuchsia-300
//                   hover:text-fuchsia-200
//                   transition-colors
//                   group
//                 "
//               >
//                 Explore Recruiter Workspace

//                 <ArrowUpRight
//                   className="
//                     h-4
//                     w-4
//                     transition-transform
//                     group-hover:translate-x-0.5
//                     group-hover:-translate-y-0.5
//                   "
//                 />
//               </Link>

//             </motion.div>


//             {/* ============================================================
//                 Candidate
//             ============================================================ */}

//             <motion.div
//               whileHover={{
//                 y: -6
//               }}
//               className={`
//                 flex
//                 flex-col
//                 justify-between
//                 rounded-3xl
//                 border
//                 p-8
//                 shadow-[0_15px_45px_rgba(0,0,0,0.2)]
//                 backdrop-blur-xl
//                 transition-all
//                 ${
//                   activeTab === 'candidate'
//                     ? 'border-cyan-300/30 bg-gradient-to-br from-blue-500/15 via-slate-900/75 to-indigo-950/45 ring-1 ring-cyan-400/20 shadow-[0_20px_60px_rgba(34,211,238,0.12)]'
//                     : 'border-white/10 bg-slate-950/45 opacity-70 hover:opacity-100'
//                 }
//               `}
//             >

//               <div>

//                 <div
//                   className="
//                     flex
//                     items-center
//                     gap-2
//                   "
//                 >

//                   <span
//                     className="
//                       rounded-full
//                       bg-cyan-400/10
//                       border border-cyan-300/30
//                       px-3
//                       py-1
//                       font-mono
//                       text-[10px]
//                       font-bold
//                       text-cyan-300
//                       shadow-sm
//                     "
//                   >
//                     SOFTWARE ENGINEERS
//                   </span>

//                 </div>

//                 <h3
//                   className="
//                     mt-4
//                     text-xl
//                     font-bold
//                     text-white
//                   "
//                 >
//                   Real-Time Alignment Telemetry
//                 </h3>

//                 <p
//                   className="
//                     mt-2.5
//                     text-xs
//                     leading-relaxed
//                     text-slate-300
//                   "
//                 >
//                   Upload your resume to uncover actionable gap
//                   analysis. Learn which architectural skills or
//                   system design competencies your profile is missing
//                   before submitting.
//                 </p>


//                 <ul
//                   className="
//                     mt-5
//                     space-y-2
//                     text-xs
//                     text-slate-300
//                   "
//                 >

//                   <li
//                     className="
//                       flex
//                       items-center
//                       gap-2
//                     "
//                   >
//                     <CheckCircle2
//                       className="
//                         h-4
//                         w-4
//                         text-cyan-300
//                       "
//                     />

//                     Semantic keyword gap diagnostics
//                   </li>

//                   <li
//                     className="
//                       flex
//                       items-center
//                       gap-2
//                     "
//                   >
//                     <CheckCircle2
//                       className="
//                         h-4
//                         w-4
//                         text-cyan-300
//                       "
//                     />

//                     Real-time application stage visibility
//                   </li>

//                 </ul>

//               </div>


//               <Link
//                 to="/register"
//                 className="
//                   mt-8
//                   inline-flex
//                   items-center
//                   gap-2
//                   text-xs
//                   font-bold
//                   text-cyan-300
//                   hover:text-cyan-200
//                   transition-colors
//                   group
//                 "
//               >
//                 Create Candidate Profile

//                 <ArrowUpRight
//                   className="
//                     h-4
//                     w-4
//                     transition-transform
//                     group-hover:translate-x-0.5
//                     group-hover:-translate-y-0.5
//                   "
//                 />
//               </Link>

//             </motion.div>

//           </div>

//         </div>

//       </motion.section>


//       <AnimatePresence>
//         {showATSPanel && <ATSLaunchPanel onClose={() => setShowATSPanel(false)} />}
//       </AnimatePresence>

//       {/* ================================================================
//           FOOTER
//       ================================================================ */}

//       <motion.footer
//         initial={{
//           opacity: 0
//         }}
//         whileInView={{
//           opacity: 1
//         }}
//         viewport={{
//           once: true
//         }}
//         transition={{
//           duration: 0.6
//         }}
//         className="
//           relative
//           z-10
//           border-t
//           border-white/10
//           bg-slate-950/60
//           py-10
//           px-6
//           text-center
//           text-xs
//           text-slate-400
//           backdrop-blur-xl
//         "
//       >

//         <div
//           className="
//             mx-auto
//             max-w-7xl
//             flex
//             flex-col
//             sm:flex-row
//             items-center
//             justify-between
//             gap-4
//           "
//         >

//           <div
//             className="
//               flex
//               items-center
//               gap-2
//             "
//           >

//             <motion.span
//               animate={{
//                 opacity: [0.5, 1, 0.5]
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity
//               }}
//               className="
//                 h-2.5
//                 w-2.5
//                 rounded-full
//                 bg-cyan-300
//                 shadow-[0_0_12px_rgba(103,232,249,0.8)]
//               "
//             />

//             <span
//               className="
//                 font-medium
//                 text-slate-300
//               "
//             >
//               RankResume AI · Next-Generation Multi-Modal Recruitment
//             </span>

//           </div>

//           <p>
//             © 2026 RankResume AI. All rights reserved.
//           </p>

//         </div>

//       </motion.footer>

//     </div>
//   );
// };


// export default LandingPage;













import React, { useState, useEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import geminiLogo from '../assets/gemini-svg.svg';

import {
  Sparkles,
  ArrowRight,
  ChevronRight,
  Target,
  CheckCircle2,
  FileSearch,
  Cpu,
  Zap,
  Flame,
  Layers,
  ArrowUpRight,
  MousePointerClick,
  Sliders,
  Workflow,
  FileCheck2,
  BarChart3,
  Download,
  ExternalLink,
  X
} from 'lucide-react';


// ============================================================================
// Single-Line Compact Typewriter Data
// ============================================================================

const TYPEWRITER_DATA = [
  {
    text: 'Multi-Modal Resume Extraction with Zero ATS Hallucinations.',
    gradient: 'from-cyan-300 via-blue-400 to-indigo-400',
    cursor: 'bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.9)]'
  },
  {
    text: 'Real-Time Vector Similarity & Deep Competency Alignment.',
    gradient: 'from-fuchsia-300 via-cyan-300 to-blue-400',
    cursor: 'bg-fuchsia-300 shadow-[0_0_14px_rgba(232,121,249,0.9)]'
  },
  {
    text: 'Autonomous Kanban Screening & Intelligent Candidate Routing.',
    gradient: 'from-indigo-300 via-blue-300 to-cyan-300',
    cursor: 'bg-indigo-300 shadow-[0_0_14px_rgba(165,180,252,0.9)]'
  },
  {
    text: 'High-Signal Engineering Talent Discovery in Seconds.',
    gradient: 'from-sky-300 via-cyan-300 to-blue-400',
    cursor: 'bg-sky-300 shadow-[0_0_14px_rgba(125,211,252,0.9)]'
  }
];


// ============================================================================
// Smooth Multicolor Typewriter
// ============================================================================

const SmoothMulticolorTypewriter = memo(() => {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentItem = TYPEWRITER_DATA[phraseIdx];
    let timer;

    if (!isDeleting && displayText === currentItem.text) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === '') {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIdx((prev) => (prev + 1) % TYPEWRITER_DATA.length);
      }, 250);
    } else {
      const stepSpeed = isDeleting ? 18 : 38;

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
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="
        inline-flex items-center justify-center max-w-full
        px-4 py-1.5 rounded-full
        border border-cyan-300/20
        bg-slate-950/65
        shadow-[0_0_30px_rgba(34,211,238,0.08)]
        backdrop-blur-xl
      "
    >
      <span className="
        font-mono text-[11px] font-black uppercase
        tracking-wider text-cyan-300 mr-2
        flex-shrink-0
      ">
        AI Live:
      </span>

      <span
        className={`
          bg-gradient-to-r ${activePhrase.gradient}
          bg-clip-text text-transparent
          font-bold text-xs sm:text-sm md:text-base
          tracking-tight whitespace-nowrap
          overflow-hidden text-ellipsis
        `}
      >
        {displayText}
      </span>

      <motion.span
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{
          duration: 0.8,
          repeat: Infinity
        }}
        className={`
          ml-1.5 inline-block
          h-3.5 sm:h-4 w-[2px]
          rounded-full flex-shrink-0
          ${activePhrase.cursor}
        `}
      />
    </motion.div>
  );
});

SmoothMulticolorTypewriter.displayName =
  'SmoothMulticolorTypewriter';


// ============================================================================
// Animated Winter Night Snowfall
// ============================================================================

const Snowfall = memo(() => {
  // CSS handles the snow animation on the compositor instead of
  // running 100+ independent Framer Motion animations every frame.
  const flakes = useMemo(() => {
    return Array.from({ length: 72 }, (_, i) => ({
      id: i,
      left: `${(i * 47.17) % 100}%`,
      size: `${1.4 + ((i * 13) % 7) * 0.45}px`,
      duration: `${8 + ((i * 23) % 75) / 10}s`,
      delay: `-${((i * 29) % 100) / 10}s`,
      drift: `${-30 + ((i * 41) % 61)}px`,
      opacity: 0.25 + ((i * 17) % 65) / 100,
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <style>{`
        .rankresume-snowflake {
          position: absolute;
          top: -12px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.45);
          will-change: transform;
          transform: translate3d(0, -5vh, 0);
          animation-name: rankresume-snowfall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes rankresume-snowfall {
          0% {
            transform: translate3d(0, -5vh, 0);
          }
          25% {
            transform: translate3d(var(--snow-drift), 27vh, 0);
          }
          50% {
            transform: translate3d(calc(var(--snow-drift) * -0.45), 55vh, 0);
          }
          75% {
            transform: translate3d(var(--snow-drift), 82vh, 0);
          }
          100% {
            transform: translate3d(0, 108vh, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .rankresume-snowflake {
            animation: none !important;
            opacity: 0.35 !important;
            transform: translate3d(0, 20vh, 0);
          }
        }
      `}</style>

      {/* Static winter sky — avoids continuously repainting a full-screen gradient. */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_50%_0%,rgba(30,64,175,0.30),transparent_42%),linear-gradient(180deg,#020817_0%,#06132e_45%,#081a38_100%)]
        "
      />

      {/* Slow GPU-friendly atmospheric glows. */}
      <motion.div
        className="
          absolute -top-40 left-[12%]
          h-[520px] w-[520px]
          rounded-full bg-blue-500/15
          blur-[110px]
          will-change-transform
        "
        animate={{
          x: [0, 70, -20, 0],
          y: [0, 25, -8, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="
          absolute top-[28%] right-[-8%]
          h-[560px] w-[560px]
          rounded-full bg-cyan-400/10
          blur-[125px]
          will-change-transform
        "
        animate={{
          x: [0, -55, 20, 0],
          y: [0, -30, 18, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Very subtle static stars. */}
      <div
        className="
          absolute inset-0 opacity-35
          bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.75)_0.65px,transparent_0.9px)]
          [background-size:80px_80px]
        "
      />

      {/* Lightweight compositor-based snow. */}
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className="rankresume-snowflake"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animationDuration: flake.duration,
            animationDelay: flake.delay,
            '--snow-drift': flake.drift,
          }}
        />
      ))}
    </div>
  );
});

Snowfall.displayName = 'Snowfall';


// ============================================================================
// ResumeIQ ATS floating launch panel
// ============================================================================
const ATS_URL = 'https://resumeiq-jxzub6fh22sedvgffpftsr.streamlit.app/';

const ATSLaunchPanel = memo(({ onClose }) => (
  <motion.aside
    initial={{ opacity: 0, x: 56, y: 28, scale: 0.94 }}
    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
    exit={{ opacity: 0, x: 56, y: 28, scale: 0.94 }}
    transition={{
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1]
    }}
    className="fixed bottom-5 right-5 z-[60] w-[min(380px,calc(100vw-2rem))] overflow-hidden rounded-[28px] border border-white/15 bg-slate-950/92 p-4 text-left shadow-[0_28px_90px_rgba(0,0,0,0.5),0_0_55px_rgba(99,102,241,0.13)] backdrop-blur-2xl sm:bottom-6 sm:right-6"
    role="dialog"
    aria-label="ResumeIQ ATS"
  >
    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-fuchsia-400 via-blue-400 to-cyan-300" />
    <div className="pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />
    <div className="pointer-events-none absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
    <div className="relative">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-violet-400/20 via-indigo-500/15 to-cyan-400/20 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.12)]">
            <FileCheck2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white">ResumeIQ <span className="text-cyan-300">ATS</span></span>
              <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-2 py-0.5 font-mono text-[8px] font-black uppercase tracking-wider text-emerald-300">Live</span>
            </div>
            <p className="mt-0.5 text-[10px] font-semibold text-slate-400">Resume intelligence workspace</p>
          </div>
        </div>
        <button type="button" onClick={onClose} aria-label="Close ATS panel" className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white active:scale-95">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-cyan-300/10 bg-cyan-400/5 p-2.5"><BarChart3 className="h-3.5 w-3.5 text-cyan-300" /><p className="mt-1 text-[9px] font-bold leading-tight text-slate-300">Resume score</p></div>
        <div className="rounded-xl border border-fuchsia-300/10 bg-fuchsia-400/5 p-2.5"><FileCheck2 className="h-3.5 w-3.5 text-fuchsia-300" /><p className="mt-1 text-[9px] font-bold leading-tight text-slate-300">ATS analysis</p></div>
        <div className="rounded-xl border border-blue-300/10 bg-blue-400/5 p-2.5"><Download className="h-3.5 w-3.5 text-blue-300" /><p className="mt-1 text-[9px] font-bold leading-tight text-slate-300">PDF / text</p></div>
      </div>
      <p className="mt-4 text-[11px] font-medium leading-relaxed text-slate-400">Check your resume score, identify ATS gaps, and generate a detailed report in PDF or text format.</p>
      <a href={ATS_URL} target="_blank" rel="noopener noreferrer" className="group relative mt-4 flex h-11 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 text-xs font-black text-white shadow-[0_10px_30px_rgba(99,102,241,0.20)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0">
        <span className="relative z-10">Open ResumeIQ ATS</span><ExternalLink className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[420%]" />
      </a>
      <p className="mt-2 text-center font-mono text-[8px] font-bold uppercase tracking-wider text-slate-600">Opens securely in a new tab</p>
    </div>
  </motion.aside>
));
ATSLaunchPanel.displayName = 'ATSLaunchPanel';

// ============================================================================
// Main Landing Page
// ============================================================================

export const LandingPage = () => {
  const [activeTab, setActiveTab] =
    useState('recruiter');
  const [showATSPanel, setShowATSPanel] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowATSPanel(true);
    }, 500);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className="
        relative
        min-h-screen
        bg-[#020817]
        text-slate-100
        selection:bg-cyan-400
        selection:text-slate-950
        antialiased
        overflow-x-hidden
        font-sans
      "
    >

      {/* ================================================================
          GLOBAL WINTER BACKGROUND
      ================================================================ */}

      <Snowfall />


      {/* ================================================================
          NAVBAR
      ================================================================ */}

      <motion.header
        initial={{
          y: -24,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: 0.7,
          ease: 'easeOut'
        }}
        className="
          sticky top-0
          z-50
          border-b border-white/10
          bg-slate-950/60
          backdrop-blur-2xl
          shadow-[0_8px_35px_rgba(0,0,0,0.25)]
        "
      >

        {/* Frozen top light */}
        <div
          className="
            absolute top-0 left-0 right-0
            h-[2px]
            bg-gradient-to-r
            from-cyan-300
            via-blue-500
            to-indigo-400
            shadow-[0_0_18px_rgba(34,211,238,0.65)]
          "
        />

        <nav
          className="
            mx-auto
            flex
            h-16
            max-w-7xl
            items-center
            justify-between
            px-3.5
            sm:px-8
          "
        >

          {/* Brand */}

          <Link
            to="/"
            className="
              flex items-center
              gap-2 sm:gap-3
              group
              min-w-0
            "
          >
            <motion.div
              whileHover={{
                scale: 1.08,
                rotate: 3
              }}
              className="
                relative
                flex
                h-8 w-8
                sm:h-9 sm:w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-tr
                from-blue-600
                via-indigo-600
                to-cyan-400
                p-1.5
                shadow-[0_0_25px_rgba(34,211,238,0.25)]
              "
            >
              <img
                src={geminiLogo}
                alt="RankResume AI"
                className="
                  h-full
                  w-full
                  object-contain
                  filter brightness-125
                "
              />
            </motion.div>

            <div
              className="
                flex flex-col
                select-none
                truncate
              "
            >
              <span
                className="
                  text-xs sm:text-base
                  font-black
                  tracking-tight
                  text-white
                  flex
                  items-center
                  gap-1
                  leading-none
                "
              >
                <span className="truncate">
                  RankResume
                </span>

                <span
                  className="
                    bg-gradient-to-r
                    from-cyan-300
                    to-blue-400
                    bg-clip-text
                    text-transparent
                  "
                >
                  AI
                </span>
              </span>

              <span
                className="
                  hidden sm:inline
                  text-[9px]
                  font-mono
                  tracking-widest
                  uppercase
                  font-extrabold
                  text-cyan-300
                  mt-0.5
                "
              >
                Autonomous ATS
              </span>
            </div>
          </Link>


          {/* Engine Status */}

          <div
            className="
              hidden md:flex
              items-center
              gap-2.5
              rounded-full
              border border-cyan-300/20
              bg-slate-950/55
              px-4 py-1.5
              text-xs
              text-slate-200
              shadow-[0_0_20px_rgba(34,211,238,0.05)]
              backdrop-blur-xl
            "
          >
            <span className="relative flex h-2 w-2">

              <motion.span
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.8, 0, 0.8]
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity
                }}
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  rounded-full
                  bg-cyan-300
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  rounded-full
                  h-2 w-2
                  bg-cyan-300
                "
              />
            </span>

            <span className="text-slate-400 font-medium">
              Gemini 2.5 Engine:
            </span>

            <span
              className="
                font-bold
                bg-gradient-to-r
                from-cyan-300
                to-blue-400
                bg-clip-text
                text-transparent
              "
            >
              Operational
            </span>
          </div>


          {/* Actions */}

          <div
            className="
              flex items-center
              gap-1.5 sm:gap-3
              shrink-0
            "
          >

            <Link
              to="/login"
              className="
                rounded-xl
                px-2.5 sm:px-4
                py-1.5 sm:py-2
                text-xs
                font-bold
                text-slate-300
                transition-all
                hover:bg-white/10
                hover:text-white
              "
            >
              Sign In
            </Link>

            <a
              href={ATS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-fuchsia-300/20 bg-white/5 px-3 py-1.5 text-xs font-extrabold text-cyan-200 transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-400/10 active:translate-y-0"
            >
              <FileCheck2 className="h-3.5 w-3.5 text-fuchsia-300" /> ATS <ExternalLink className="h-3 w-3 text-cyan-300" />
            </a>

            <Link
              to="/register"
              className="
                group
                inline-flex
                items-center
                gap-1.5
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                via-indigo-600
                to-cyan-500
                px-3 sm:px-4
                py-1.5 sm:py-2
                text-xs
                font-extrabold
                text-white
                shadow-[0_0_25px_rgba(99,102,241,0.20)]
                transition-all
                hover:shadow-[0_0_35px_rgba(34,211,238,0.35)]
                hover:scale-[1.02]
                active:scale-95
              "
            >
              <Sparkles
                className="
                  h-3.5
                  w-3.5
                  text-white
                "
              />

              <span className="hidden xs:inline">
                Get Started
              </span>

              <span className="xs:hidden">
                Join
              </span>

              <ArrowRight
                className="
                  h-3.5
                  w-3.5
                  stroke-[2.5]
                  transition-transform
                  group-hover:translate-x-0.5
                "
              />
            </Link>

          </div>
        </nav>
      </motion.header>


      {/* ================================================================
          HERO
      ================================================================ */}

      <motion.section
        initial={{
          opacity: 0,
          y: 24
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.8,
          ease: 'easeOut'
        }}
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-4
          pt-16
          pb-20
          text-center
          sm:px-6
          lg:pt-24
        "
      >

        {/* Badge */}

        <motion.div
          initial={{
            opacity: 0,
            y: 12
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.15,
            duration: 0.5
          }}
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border border-cyan-300/20
            bg-slate-950/65
            px-4
            py-1.5
            text-xs
            font-semibold
            text-slate-200
            shadow-[0_0_30px_rgba(34,211,238,0.08)]
            backdrop-blur-xl
          "
        >
          <Sparkles
            className="
              h-3.5
              w-3.5
              text-cyan-300
            "
          />

          <span>
            Next-Generation Evaluation Engine
          </span>

          <span className="text-slate-600">
            |
          </span>

          <span
            className="
              font-bold
              text-cyan-300
            "
          >
            Zero Hallucinations
          </span>
        </motion.div>


        {/* Headline */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 18
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.25,
            duration: 0.7
          }}
          className="
            mt-8
            text-3xl
            sm:text-5xl
            md:text-6xl
            font-black
            tracking-tight
            text-white
            max-w-4xl
            mx-auto
            leading-tight
          "
        >
          Smarter Applicant Screening with{' '}

          <span
            className="
              bg-gradient-to-r
              from-cyan-300
              via-blue-400
              to-indigo-400
              bg-clip-text
              text-transparent
              drop-shadow-[0_0_25px_rgba(34,211,238,0.12)]
            "
          >
            Multi-Modal Intelligence
          </span>
        </motion.h1>


        {/* Typewriter */}

        <div
          className="
            mt-6
            flex
            justify-center
            items-center
            px-2
          "
        >
          <SmoothMulticolorTypewriter />
        </div>


        {/* Description */}

        <motion.p
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 0.45,
            duration: 0.7
          }}
          className="
            mx-auto
            mt-6
            max-w-2xl
            text-sm
            sm:text-base
            font-medium
            text-slate-300
            leading-relaxed
          "
        >
          Eliminate keyword guessing and manual screening backlogs.
          RankResume AI computes{' '}

          <span
            className="
              text-cyan-300
              font-bold
              underline
              decoration-cyan-500/40
              underline-offset-4
            "
          >
            multidimensional cosine scores
          </span>

          , verifies{' '}

          <span
            className="
              text-fuchsia-300
              font-bold
              underline
              decoration-fuchsia-500/40
              underline-offset-4
            "
          >
            practical technical stacks
          </span>

          , and orchestrates candidate flow across{' '}

          <span
            className="
              text-indigo-300
              font-bold
              underline
              decoration-indigo-500/40
              underline-offset-4
            "
          >
            instant Kanban pipelines
          </span>.
        </motion.p>


        {/* CTAs */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.55,
            duration: 0.6
          }}
          className="
            mt-10
            flex
            flex-col
            items-center
            justify-center
            gap-4
            sm:flex-row
          "
        >

          <Link
            to="/register"
            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-2.5
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              via-indigo-600
              to-cyan-500
              px-8
              text-xs
              font-bold
              text-white
              shadow-[0_0_35px_rgba(34,211,238,0.16)]
              transition-all
              duration-300
              hover:shadow-[0_0_45px_rgba(34,211,238,0.3)]
              hover:-translate-y-0.5
              active:translate-y-0
              sm:w-auto
            "
          >
            <Zap
              className="
                h-4
                w-4
                fill-white
              "
            />

            <span>
              Launch Free Trial
            </span>
          </Link>


          <Link
            to="/jobs"
            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border border-cyan-300/20
              bg-slate-950/60
              px-8
              text-xs
              font-bold
              text-slate-200
              shadow-[0_0_25px_rgba(0,0,0,0.12)]
              backdrop-blur-xl
              transition-all
              hover:bg-white/10
              hover:border-cyan-300/40
              hover:text-white
              sm:w-auto
            "
          >
            <span>
              Explore Active Jobs
            </span>

            <ChevronRight
              className="
                h-4
                w-4
                text-cyan-300
              "
            />
          </Link>

          <a
            href={ATS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-fuchsia-300/25 bg-gradient-to-r from-fuchsia-500/10 via-blue-500/10 to-cyan-400/10 px-7 text-xs font-black text-fuchsia-200 shadow-[0_0_25px_rgba(217,70,239,0.08)] backdrop-blur-xl transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-400/10 hover:text-cyan-100 active:translate-y-0 sm:w-auto"
          >
            <FileCheck2 className="h-4 w-4 text-fuchsia-300" />
            <span>Check Resume with ATS</span>
            <ExternalLink className="h-3.5 w-3.5 text-cyan-300" />
          </a>

        </motion.div>


        {/* ================================================================
            TELEMETRY CARD
        ================================================================ */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.7,
            duration: 0.8
          }}
          whileHover={{
            y: -4
          }}
          className="
            relative
            mx-auto
            mt-16
            max-w-4xl
            rounded-3xl
            border border-white/10
            bg-slate-950/60
            p-6 sm:p-8
            text-left
            shadow-[0_25px_80px_rgba(0,0,0,0.3)]
            backdrop-blur-2xl
          "
        >

          {/* Card glow */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-3xl
              bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.08),transparent_35%)]
            "
          />


          <div
            className="
              relative
              flex
              flex-col
              gap-4
              border-b
              border-white/10
              pb-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div
              className="
                flex
                items-center
                gap-3.5
              "
            >

              <span className="relative flex h-3.5 w-3.5">

                <motion.span
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.8, 0, 0.8]
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity
                  }}
                  className="
                    absolute
                    inline-flex
                    h-full
                    w-full
                    rounded-full
                    bg-cyan-300
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    rounded-full
                    h-3.5
                    w-3.5
                    bg-cyan-300
                  "
                />

              </span>


              <div>

                <span
                  className="
                    font-mono
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-cyan-300
                  "
                >
                  Live Neural Telemetry
                </span>

                <h3
                  className="
                    text-base
                    font-bold
                    text-white
                  "
                >
                  Alex Mercer

                  <span
                    className="
                      font-normal
                      text-slate-400
                    "
                  >
                    {' '}· Senior Full-Stack Engineer
                  </span>
                </h3>

              </div>

            </div>


            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border border-fuchsia-300/20
                  bg-fuchsia-400/10
                  px-3.5
                  py-1.5
                  font-mono
                  text-xs
                  font-bold
                  text-fuchsia-300
                  shadow-[0_0_20px_rgba(217,70,239,0.08)]
                "
              >
                <CheckCircle2
                  className="
                    h-3.5
                    w-3.5
                    text-fuchsia-300
                  "
                />

                97.4% Match Vector
              </span>

            </div>

          </div>


          {/* Metrics */}

          <div
            className="
              relative
              mt-6
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-3
            "
          >

            {/* Cosine */}

            <motion.div
              whileHover={{
                y: -4,
                scale: 1.01
              }}
              className="
                group
                rounded-2xl
                border border-cyan-300/15
                bg-gradient-to-br
                from-blue-500/10
                via-slate-900/55
                to-slate-950/70
                p-5
                shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                transition-all
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-cyan-300
                "
              >
                <Target
                  className="
                    h-4
                    w-4
                    text-cyan-300
                  "
                />

                Cosine Match
              </div>

              <p
                className="
                  mt-2
                  text-xl
                  font-black
                  text-white
                "
              >
                Top 1.5% Tier
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-400
                "
              >
                Ranked against 412 role criteria
              </p>
            </motion.div>


            {/* Tech Alignment */}

            <motion.div
              whileHover={{
                y: -4,
                scale: 1.01
              }}
              className="
                group
                rounded-2xl
                border border-fuchsia-300/15
                bg-gradient-to-br
                from-fuchsia-500/10
                via-slate-900/55
                to-slate-950/70
                p-5
                shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                transition-all
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-fuchsia-300
                "
              >
                <Flame
                  className="
                    h-4
                    w-4
                    text-fuchsia-300
                  "
                />

                Tech Alignment
              </div>

              <p
                className="
                  mt-2
                  text-sm
                  font-bold
                  text-slate-100
                "
              >
                React 19, TypeScript, Go, Redis
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-400
                "
              >
                12 of 12 required skills verified
              </p>
            </motion.div>


            {/* Workflow */}

            <motion.div
              whileHover={{
                y: -4,
                scale: 1.01
              }}
              className="
                group
                rounded-2xl
                border border-indigo-300/15
                bg-gradient-to-br
                from-indigo-500/10
                via-slate-900/55
                to-slate-950/70
                p-5
                shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                transition-all
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-indigo-300
                "
              >
                <Workflow
                  className="
                    h-4
                    w-4
                    text-indigo-300
                  "
                />

                Workflow State
              </div>

              <p
                className="
                  mt-2
                  text-sm
                  font-bold
                  text-indigo-300
                "
              >
                Interview Fast-Tracked
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-400
                "
              >
                Autonomous calendar trigger sent
              </p>
            </motion.div>

          </div>
        </motion.div>

      </motion.section>


      {/* ================================================================
          ARCHITECTURAL PILLARS
      ================================================================ */}

      <motion.section
        initial={{
          opacity: 0,
          y: 30
        }}
        whileInView={{
          opacity: 1,
          y: 0
        }}
        viewport={{
          once: true,
          amount: 0.15
        }}
        transition={{
          duration: 0.7
        }}
        className="
          relative
          z-10
          border-t border-white/10
          bg-slate-950/35
          py-24
          px-6
          backdrop-blur-md
        "
      >

        <div className="mx-auto max-w-6xl">

          <div
            className="
              text-center
              max-w-3xl
              mx-auto
            "
          >

            <span
              className="
                font-mono
                text-xs
                font-bold
                uppercase
                tracking-widest
                text-cyan-300
              "
            >
              High-Precision ATS Pipeline
            </span>

            <h2
              className="
                mt-3
                text-2xl
                font-black
                text-white
                sm:text-4xl
              "
            >
              Engineered to Replace Flawed Keyword Filters
            </h2>

            <p
              className="
                mt-3
                text-sm
                text-slate-300
                leading-relaxed
              "
            >
              Legacy ATS platforms drop top engineers over missed
              synonyms. Our multi-modal LLM architecture parses raw
              contextual experience, project impact, and system design
              capability.
            </p>

          </div>


          <div
            className="
              mt-14
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-3
            "
          >

            {/* Card 1 */}

            <motion.div
              whileHover={{
                y: -7
              }}
              className="
                group
                rounded-3xl
                border border-cyan-300/15
                bg-gradient-to-b
                from-slate-900/70
                to-blue-950/40
                p-8
                shadow-[0_15px_45px_rgba(0,0,0,0.2)]
                backdrop-blur-xl
                transition-all
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-cyan-400/10
                  text-cyan-300
                  border border-cyan-300/20
                "
              >
                <FileSearch
                  className="
                    h-6
                    w-6
                  "
                />
              </div>

              <h3
                className="
                  mt-6
                  text-base
                  font-bold
                  text-white
                "
              >
                1. Contextual PDF Parsing
              </h3>

              <p
                className="
                  mt-2.5
                  text-xs
                  leading-relaxed
                  text-slate-300
                "
              >
                Direct visual layout understanding extracts
                multi-column structures, GitHub references,
                and technical deliverables without truncation.
              </p>

            </motion.div>


            {/* Card 2 */}

            <motion.div
              whileHover={{
                y: -7
              }}
              className="
                group
                rounded-3xl
                border border-fuchsia-300/15
                bg-gradient-to-b
                from-slate-900/70
                to-fuchsia-950/35
                p-8
                shadow-[0_15px_45px_rgba(0,0,0,0.2)]
                backdrop-blur-xl
                transition-all
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-fuchsia-400/10
                  text-fuchsia-300
                  border border-fuchsia-300/20
                "
              >
                <Cpu
                  className="
                    h-6
                    w-6
                  "
                />
              </div>

              <h3
                className="
                  mt-6
                  text-base
                  font-bold
                  text-white
                "
              >
                2. Dense Vector Embeddings
              </h3>

              <p
                className="
                  mt-2.5
                  text-xs
                  leading-relaxed
                  text-slate-300
                "
              >
                Matches candidate achievements against specific
                team deliverables using high-dimensional cosine
                similarity vectors.
              </p>

            </motion.div>


            {/* Card 3 */}

            <motion.div
              whileHover={{
                y: -7
              }}
              className="
                group
                rounded-3xl
                border border-indigo-300/15
                bg-gradient-to-b
                from-slate-900/70
                to-indigo-950/40
                p-8
                shadow-[0_15px_45px_rgba(0,0,0,0.2)]
                backdrop-blur-xl
                transition-all
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-indigo-400/10
                  text-indigo-300
                  border border-indigo-300/20
                "
              >
                <Layers
                  className="
                    h-6
                    w-6
                  "
                />
              </div>

              <h3
                className="
                  mt-6
                  text-base
                  font-bold
                  text-white
                "
              >
                3. Live Kanban Pipeline
              </h3>

              <p
                className="
                  mt-2.5
                  text-xs
                  leading-relaxed
                  text-slate-300
                "
              >
                Automatically transitions high-fit candidates
                across customized interview rounds, generating
                briefing sheets for hiring leads.
              </p>

            </motion.div>

          </div>

        </div>

      </motion.section>


      {/* ================================================================
          DUAL ROLE WORKSPACES
      ================================================================ */}

      <motion.section
        initial={{
          opacity: 0
        }}
        whileInView={{
          opacity: 1
        }}
        viewport={{
          once: true,
          amount: 0.1
        }}
        transition={{
          duration: 0.7
        }}
        className="
          py-24
          px-6
          relative
          z-10
        "
      >

        <div className="mx-auto max-w-5xl">

          <div
            className="
              text-center
              mb-10
            "
          >

            <h2
              className="
                text-2xl
                font-black
                text-white
                sm:text-3xl
              "
            >
              Tailored Workspaces Built for Speed
            </h2>

            <p
              className="
                text-xs
                text-slate-400
                mt-2
                font-medium
              "
            >
              Switch roles to view specialized workflows
            </p>


            {/* Tabs */}

            <div
              className="
                mt-6
                inline-flex
                p-1
                rounded-2xl
                bg-slate-950/60
                border border-white/10
                shadow-[0_0_25px_rgba(0,0,0,0.15)]
                backdrop-blur-xl
              "
            >

              <button
                type="button"
                onClick={() =>
                  setActiveTab('recruiter')
                }
                className={`
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  px-5
                  py-2
                  text-xs
                  font-bold
                  transition-all
                  ${
                    activeTab === 'recruiter'
                      ? 'bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white shadow-[0_0_25px_rgba(217,70,239,0.25)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >

                <Sliders
                  className="
                    h-3.5
                    w-3.5
                  "
                />

                For Recruiters

              </button>


              <button
                type="button"
                onClick={() =>
                  setActiveTab('candidate')
                }
                className={`
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  px-5
                  py-2
                  text-xs
                  font-bold
                  transition-all
                  ${
                    activeTab === 'candidate'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_25px_rgba(34,211,238,0.25)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >

                <MousePointerClick
                  className="
                    h-3.5
                    w-3.5
                  "
                />

                For Candidates

              </button>

            </div>

          </div>


          {/* Workspace cards */}

          <div
            className="
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
            "
          >

            {/* ============================================================
                Recruiter
            ============================================================ */}

            <motion.div
              whileHover={{
                y: -6
              }}
              className={`
                flex
                flex-col
                justify-between
                rounded-3xl
                border
                p-8
                shadow-[0_15px_45px_rgba(0,0,0,0.2)]
                backdrop-blur-xl
                transition-all
                ${
                  activeTab === 'recruiter'
                    ? 'border-fuchsia-300/30 bg-gradient-to-br from-fuchsia-500/15 via-slate-900/75 to-indigo-950/45 ring-1 ring-fuchsia-400/20 shadow-[0_20px_60px_rgba(217,70,239,0.12)]'
                    : 'border-white/10 bg-slate-950/45 opacity-70 hover:opacity-100'
                }
              `}
            >

              <div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <span
                    className="
                      rounded-full
                      bg-fuchsia-400/10
                      border border-fuchsia-300/30
                      px-3
                      py-1
                      font-mono
                      text-[10px]
                      font-bold
                      text-fuchsia-300
                      shadow-sm
                    "
                  >
                    TALENT ACQUISITION
                  </span>

                </div>

                <h3
                  className="
                    mt-4
                    text-xl
                    font-bold
                    text-white
                  "
                >
                  Rank Candidate Batches Instantly
                </h3>

                <p
                  className="
                    mt-2.5
                    text-xs
                    leading-relaxed
                    text-slate-300
                  "
                >
                  Ingest 500+ applications at once. The neural
                  ranking pipeline filters out superficial keyword
                  stuffers and bubbles up candidates who have
                  executed real-world production code.
                </p>


                <ul
                  className="
                    mt-5
                    space-y-2
                    text-xs
                    text-slate-300
                  "
                >

                  <li
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <CheckCircle2
                      className="
                        h-4
                        w-4
                        text-fuchsia-300
                      "
                    />

                    Automated candidate scoring matrices
                  </li>

                  <li
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <CheckCircle2
                      className="
                        h-4
                        w-4
                        text-fuchsia-300
                      "
                    />

                    One-click interview stage progression
                  </li>

                </ul>

              </div>


              <Link
                to="/register"
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  font-bold
                  text-fuchsia-300
                  hover:text-fuchsia-200
                  transition-colors
                  group
                "
              >
                Explore Recruiter Workspace

                <ArrowUpRight
                  className="
                    h-4
                    w-4
                    transition-transform
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </Link>

            </motion.div>


            {/* ============================================================
                Candidate
            ============================================================ */}

            <motion.div
              whileHover={{
                y: -6
              }}
              className={`
                flex
                flex-col
                justify-between
                rounded-3xl
                border
                p-8
                shadow-[0_15px_45px_rgba(0,0,0,0.2)]
                backdrop-blur-xl
                transition-all
                ${
                  activeTab === 'candidate'
                    ? 'border-cyan-300/30 bg-gradient-to-br from-blue-500/15 via-slate-900/75 to-indigo-950/45 ring-1 ring-cyan-400/20 shadow-[0_20px_60px_rgba(34,211,238,0.12)]'
                    : 'border-white/10 bg-slate-950/45 opacity-70 hover:opacity-100'
                }
              `}
            >

              <div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <span
                    className="
                      rounded-full
                      bg-cyan-400/10
                      border border-cyan-300/30
                      px-3
                      py-1
                      font-mono
                      text-[10px]
                      font-bold
                      text-cyan-300
                      shadow-sm
                    "
                  >
                    SOFTWARE ENGINEERS
                  </span>

                </div>

                <h3
                  className="
                    mt-4
                    text-xl
                    font-bold
                    text-white
                  "
                >
                  Real-Time Alignment Telemetry
                </h3>

                <p
                  className="
                    mt-2.5
                    text-xs
                    leading-relaxed
                    text-slate-300
                  "
                >
                  Upload your resume to uncover actionable gap
                  analysis. Learn which architectural skills or
                  system design competencies your profile is missing
                  before submitting.
                </p>


                <ul
                  className="
                    mt-5
                    space-y-2
                    text-xs
                    text-slate-300
                  "
                >

                  <li
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <CheckCircle2
                      className="
                        h-4
                        w-4
                        text-cyan-300
                      "
                    />

                    Semantic keyword gap diagnostics
                  </li>

                  <li
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <CheckCircle2
                      className="
                        h-4
                        w-4
                        text-cyan-300
                      "
                    />

                    Real-time application stage visibility
                  </li>

                </ul>

              </div>


              <Link
                to="/register"
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  font-bold
                  text-cyan-300
                  hover:text-cyan-200
                  transition-colors
                  group
                "
              >
                Create Candidate Profile

                <ArrowUpRight
                  className="
                    h-4
                    w-4
                    transition-transform
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </Link>

            </motion.div>

          </div>

        </div>

      </motion.section>


      <AnimatePresence>
        {showATSPanel && <ATSLaunchPanel onClose={() => setShowATSPanel(false)} />}
      </AnimatePresence>

      {/* ================================================================
          FOOTER
      ================================================================ */}

      <motion.footer
        initial={{
          opacity: 0
        }}
        whileInView={{
          opacity: 1
        }}
        viewport={{
          once: true
        }}
        transition={{
          duration: 0.6
        }}
        className="
          relative
          z-10
          border-t
          border-white/10
          bg-slate-950/60
          py-10
          px-6
          text-center
          text-xs
          text-slate-400
          backdrop-blur-xl
        "
      >

        <div
          className="
            mx-auto
            max-w-7xl
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-4
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <motion.span
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-cyan-300
                shadow-[0_0_12px_rgba(103,232,249,0.8)]
              "
            />

            <span
              className="
                font-medium
                text-slate-300
              "
            >
              RankResume AI · Next-Generation Multi-Modal Recruitment
            </span>

          </div>

          <p>
            © 2026 RankResume AI. All rights reserved.
          </p>

        </div>

      </motion.footer>

    </div>
  );
};


export default LandingPage;












// import React, { useState, useEffect, useRef, memo } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import geminiLogo from '../assets/gemini-svg.svg';
// import { 
//   Sparkles, 
//   ArrowRight, 
//   ChevronRight, 
//   Target,
//   CheckCircle2,
//   FileSearch,
//   Cpu,
//   Zap,
//   Flame,
//   Layers,
//   ArrowUpRight,
//   MousePointerClick,
//   Sliders,
//   Workflow
// } from 'lucide-react';

// // ============================================================================
// // Ultra High-Performance Canvas Snowfall (GPU Accelerated, 60fps, Zero Lag)
// // ============================================================================
// const CanvasSnowfall = memo(() => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     let animationFrameId;

//     let width = (canvas.width = window.innerWidth);
//     let height = (canvas.height = window.innerHeight);

//     const handleResize = () => {
//       width = canvas.width = window.innerWidth;
//       height = canvas.height = window.innerHeight;
//     };

//     window.addEventListener('resize', handleResize);

//     // Flake density based on screen size
//     const flakeCount = Math.min(140, Math.floor((width * height) / 10000));
//     const flakes = Array.from({ length: flakeCount }, () => ({
//       x: Math.random() * width,
//       y: Math.random() * height,
//       radius: Math.random() * 2.2 + 0.8, // dot-like snowflakes
//       speedY: Math.random() * 1.2 + 0.6,
//       speedX: (Math.random() - 0.5) * 0.5,
//       opacity: Math.random() * 0.7 + 0.3,
//       swayStep: Math.random() * 100
//     }));

//     const render = () => {
//       ctx.clearRect(0, 0, width, height);

//       for (let i = 0; i < flakes.length; i++) {
//         const flake = flakes[i];
//         flake.swayStep += 0.015;
//         flake.y += flake.speedY;
//         flake.x += flake.speedX + Math.sin(flake.swayStep) * 0.35;

//         // Reset flakes when they fall below screen or drift off-screen
//         if (flake.y > height) {
//           flake.y = -5;
//           flake.x = Math.random() * width;
//         }
//         if (flake.x > width) flake.x = 0;
//         if (flake.x < 0) flake.x = width;

//         ctx.beginPath();
//         ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
//         ctx.shadowBlur = flake.radius > 2 ? 6 : 0;
//         ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
//         ctx.fill();
//       }

//       animationFrameId = requestAnimationFrame(render);
//     };

//     render();

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="pointer-events-none fixed inset-0 z-0 h-full w-full"
//     />
//   );
// });

// CanvasSnowfall.displayName = 'CanvasSnowfall';

// // ============================================================================
// // Single-Line Compact Typewriter Data (Winter Glow Edition)
// // ============================================================================
// const TYPEWRITER_DATA = [
//   { 
//     text: 'Multi-Modal Resume Extraction with Zero ATS Hallucinations.', 
//     gradient: 'from-cyan-300 via-sky-200 to-indigo-300',
//     cursor: 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]'
//   },
//   { 
//     text: 'Real-Time Vector Similarity & Deep Competency Alignment.', 
//     gradient: 'from-sky-300 via-teal-200 to-blue-300',
//     cursor: 'bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.9)]'
//   },
//   { 
//     text: 'Autonomous Kanban Screening & Intelligent Candidate Routing.', 
//     gradient: 'from-indigo-300 via-sky-200 to-cyan-300',
//     cursor: 'bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.9)]'
//   },
//   { 
//     text: 'High-Signal Engineering Talent Discovery in Seconds.', 
//     gradient: 'from-blue-200 via-cyan-200 to-white',
//     cursor: 'bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]'
//   },
// ];

// const SmoothMulticolorTypewriter = memo(() => {
//   const [phraseIdx, setPhraseIdx] = useState(0);
//   const [displayText, setDisplayText] = useState('');
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     const currentItem = TYPEWRITER_DATA[phraseIdx];
//     let timer;

//     if (!isDeleting && displayText === currentItem.text) {
//       timer = setTimeout(() => setIsDeleting(true), 2200);
//     } else if (isDeleting && displayText === '') {
//       timer = setTimeout(() => {
//         setIsDeleting(false);
//         setPhraseIdx((prev) => (prev + 1) % TYPEWRITER_DATA.length);
//       }, 250);
//     } else {
//       const stepSpeed = isDeleting ? 18 : 38;
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
//     <div className="inline-flex items-center justify-center max-w-full px-4 py-1.5 rounded-full border border-sky-400/30 bg-slate-900/60 shadow-[0_4px_25px_rgba(56,189,248,0.15)] backdrop-blur-xl">
//       <span className="font-mono text-[11px] font-black uppercase tracking-wider text-cyan-400 mr-2 flex-shrink-0">
//         AI Live:
//       </span>
//       <span className={`bg-gradient-to-r ${activePhrase.gradient} bg-clip-text text-transparent font-bold text-xs sm:text-sm md:text-base tracking-tight whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-200`}>
//         {displayText}
//       </span>
//       <span className={`ml-1.5 inline-block h-3.5 sm:h-4 w-[2px] rounded-full flex-shrink-0 ${activePhrase.cursor} animate-pulse`} />
//     </div>
//   );
// });

// SmoothMulticolorTypewriter.displayName = 'SmoothMulticolorTypewriter';

// // ============================================================================
// // Main Landing Page Component
// // ============================================================================
// export const LandingPage = () => {
//   const [activeTab, setActiveTab] = useState('recruiter');

//   return (
//     <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-slate-950 antialiased overflow-x-hidden font-sans">
      
//       {/* 1. Hardware-Accelerated Falling Snow Canvas */}
//       <CanvasSnowfall />

//       {/* 2. Winter Deep Night Ambient Background Aurora */}
//       <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu">
//         {/* Deep blue/indigo arctic orbs */}
//         <div className="absolute -top-32 left-1/4 h-[650px] w-[650px] rounded-full bg-gradient-to-br from-blue-700/25 via-sky-600/15 to-transparent blur-[140px] transform-gpu" />
//         <div className="absolute top-[20%] -right-28 h-[650px] w-[650px] rounded-full bg-gradient-to-bl from-indigo-800/25 via-cyan-700/15 to-transparent blur-[150px] transform-gpu" />
//         <div className="absolute -bottom-40 left-1/3 h-[750px] w-[750px] rounded-full bg-gradient-to-t from-sky-900/30 via-indigo-950/20 to-transparent blur-[160px] transform-gpu" />
//         {/* Frost grid texture */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_1px,transparent_1px)] [background-size:32px_32px] opacity-70 [mask-image:radial-gradient(ellipse_90%_70%_at_50%_15%,#000_70%,transparent_100%)]" />
//       </div>

//       {/* ========================================================================= */}
//       {/* Frosted Translucent Navbar */}
//       {/* ========================================================================= */}
//       <header className="sticky top-0 z-50 border-b border-sky-500/15 bg-[#030712]/70 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
//         <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
//         <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          
//           {/* Brand Logo & Name */}
//           <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
//             <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-transform duration-300 group-hover:scale-105 border border-cyan-300/30">
//               <img src={geminiLogo} alt="RankResume AI" className="h-full w-full object-contain filter brightness-125" />
//             </div>
//             <div className="flex flex-col select-none truncate">
//               <span className="text-xs sm:text-base font-black tracking-tight text-white flex items-center gap-1 leading-none">
//                 <span className="truncate">RankResume</span>
//                 <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
//                   AI
//                 </span>
//               </span>
//               <span className="hidden sm:inline text-[9px] font-mono tracking-widest uppercase font-extrabold text-cyan-400/90 mt-0.5">
//                 Autonomous ATS
//               </span>
//             </div>
//           </Link>

//           {/* Engine Status Tag */}
//           <div className="hidden md:flex items-center gap-2.5 rounded-full border border-sky-500/20 bg-slate-900/60 px-4 py-1.5 text-xs text-slate-300 shadow-inner backdrop-blur-md">
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
//             </span>
//             <span className="text-slate-400 font-medium">Gemini 2.5 Engine:</span>
//             <span className="font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Operational</span>
//           </div>

//           {/* Action CTAs */}
//           <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
//             <Link
//               to="/login"
//               className="rounded-xl px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-slate-300 transition-colors hover:bg-slate-800/80 hover:text-white"
//             >
//               Sign In
//             </Link>
//             <Link
//               to="/register"
//               className="group inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-extrabold text-white shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:scale-[1.02] active:scale-95 border border-cyan-300/30"
//             >
//               <Sparkles className="h-3.5 w-3.5 text-cyan-200 animate-spin" style={{ animationDuration: '6s' }} />
//               <span className="hidden xs:inline">Get Started</span>
//               <span className="xs:hidden">Join</span>
//               <ArrowRight className="h-3.5 w-3.5 stroke-[2.5] transition-transform group-hover:translate-x-0.5" />
//             </Link>
//           </div>
//         </nav>
//       </header>

//       {/* ========================================================================= */}
//       {/* Hero Section */}
//       {/* ========================================================================= */}
//       <section className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-20 text-center sm:px-6 lg:pt-24">
        
//         {/* Glow Frost Pill */}
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-slate-900/70 px-4 py-1.5 text-xs font-semibold text-slate-200 shadow-[0_0_20px_rgba(34,211,238,0.2)] backdrop-blur-md"
//         >
//           <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
//           <span>Next-Generation Evaluation Engine</span>
//           <span className="text-slate-600">|</span>
//           <span className="font-bold text-cyan-300">Zero Hallucinations</span>
//         </motion.div>

//         {/* Headline */}
//         <motion.h1 
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//           className="mt-8 text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-tight drop-shadow-sm"
//         >
//           Smarter Applicant Screening with{' '}
//           <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]">
//             Multi-Modal Intelligence
//           </span>
//         </motion.h1>

//         {/* Single-Line Typewriter Bar */}
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="mt-6 flex justify-center items-center px-2"
//         >
//           <SmoothMulticolorTypewriter />
//         </motion.div>

//         {/* Description */}
//         <motion.p 
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="mx-auto mt-6 max-w-2xl text-sm sm:text-base font-medium text-slate-300 leading-relaxed"
//         >
//           Eliminate keyword guessing and manual screening backlogs. RankResume AI computes{' '}
//           <span className="text-cyan-400 font-bold underline decoration-cyan-500/40 underline-offset-4">multidimensional cosine scores</span>, verifies{' '}
//           <span className="text-sky-300 font-bold underline decoration-sky-500/40 underline-offset-4">practical technical stacks</span>, and orchestrates candidate flow across{' '}
//           <span className="text-indigo-300 font-bold underline decoration-indigo-500/40 underline-offset-4">instant Kanban pipelines</span>.
//         </motion.p>

//         {/* Call to Actions */}
//         <motion.div 
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
//         >
//           <Link
//             to="/register"
//             className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-8 text-xs font-bold text-white shadow-[0_0_30px_rgba(6,182,212,0.35)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.55)] hover:-translate-y-0.5 active:translate-y-0 sm:w-auto border border-cyan-300/30"
//           >
//             <Zap className="h-4 w-4 fill-white" />
//             <span>Launch Free Trial</span>
//           </Link>
//           <Link
//             to="/jobs"
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-sky-400/25 bg-slate-900/60 px-8 text-xs font-bold text-slate-200 shadow-md backdrop-blur-md transition-all hover:bg-slate-800/80 hover:border-cyan-400/40 hover:text-white sm:w-auto"
//           >
//             <span>Explore Active Jobs</span>
//             <ChevronRight className="h-4 w-4 text-slate-400" />
//           </Link>
//         </motion.div>

//         {/* Frost Glass Telemetry Card */}
//         <motion.div 
//           initial={{ opacity: 0, y: 25 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.5 }}
//           className="relative mx-auto mt-16 max-w-4xl rounded-3xl border border-sky-400/20 bg-slate-900/50 p-6 sm:p-8 text-left shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(6,182,212,0.1)] backdrop-blur-2xl transition-all duration-300 hover:border-sky-400/35"
//         >
//           <div className="relative flex flex-col gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex items-center gap-3.5">
//               <span className="relative flex h-3.5 w-3.5">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
//                 <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
//               </span>
//               <div>
//                 <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-cyan-400">
//                   Live Neural Telemetry
//                 </span>
//                 <h3 className="text-base font-bold text-white">
//                   Alex Mercer <span className="font-normal text-slate-400">· Senior Full-Stack Engineer</span>
//                 </h3>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-2">
//               <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-950/40 px-3.5 py-1.5 font-mono text-xs font-bold text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
//                 <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" /> 97.4% Match Vector
//               </span>
//             </div>
//           </div>

//           <div className="relative mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
//             <div className="group rounded-2xl border border-sky-500/15 bg-slate-800/40 p-5 shadow-sm transition-all hover:border-cyan-400/40 hover:bg-slate-800/60">
//               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
//                 <Target className="h-4 w-4 text-cyan-400 transition-transform group-hover:scale-110" /> Cosine Match
//               </div>
//               <p className="mt-2 text-xl font-black text-white">Top 1.5% Tier</p>
//               <p className="mt-1 text-xs text-slate-400">Ranked against 412 role criteria</p>
//             </div>

//             <div className="group rounded-2xl border border-sky-500/15 bg-slate-800/40 p-5 shadow-sm transition-all hover:border-cyan-400/40 hover:bg-slate-800/60">
//               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
//                 <Flame className="h-4 w-4 text-sky-400 transition-transform group-hover:scale-110" /> Tech Alignment
//               </div>
//               <p className="mt-2 text-sm font-bold text-slate-200">React 19, TypeScript, Go, Redis</p>
//               <p className="mt-1 text-xs text-slate-400">12 of 12 required skills verified</p>
//             </div>

//             <div className="group rounded-2xl border border-sky-500/15 bg-slate-800/40 p-5 shadow-sm transition-all hover:border-cyan-400/40 hover:bg-slate-800/60">
//               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
//                 <Workflow className="h-4 w-4 text-indigo-400 transition-transform group-hover:scale-110" /> Workflow State
//               </div>
//               <p className="mt-2 text-sm font-bold text-cyan-300">Interview Fast-Tracked</p>
//               <p className="mt-1 text-xs text-slate-400">Autonomous calendar trigger sent</p>
//             </div>
//           </div>
//         </motion.div>
//       </section>

//       {/* ========================================================================= */}
//       {/* Architectural Pillars */}
//       {/* ========================================================================= */}
//       <section className="relative z-10 border-t border-sky-500/15 bg-slate-950/50 py-24 px-6 backdrop-blur-xl">
//         <div className="mx-auto max-w-6xl">
//           <div className="text-center max-w-3xl mx-auto">
//             <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
//               High-Precision ATS Pipeline
//             </span>
//             <h2 className="mt-3 text-2xl font-black text-white sm:text-4xl">
//               Engineered to Replace Flawed Keyword Filters
//             </h2>
//             <p className="mt-3 text-sm text-slate-300 leading-relaxed">
//               Legacy ATS platforms drop top engineers over missed synonyms. Our multi-modal LLM architecture parses raw contextual experience, project impact, and system design capability.
//             </p>
//           </div>

//           <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
//             <motion.div 
//               whileHover={{ y: -5 }}
//               transition={{ duration: 0.2 }}
//               className="group rounded-3xl border border-sky-400/20 bg-gradient-to-b from-slate-900/80 to-slate-950/70 p-8 shadow-lg backdrop-blur-xl transition-all hover:border-cyan-400/50 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)]"
//             >
//               <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-950/60 text-cyan-400 border border-cyan-400/30 transition-colors group-hover:bg-cyan-500 group-hover:text-slate-950">
//                 <FileSearch className="h-6 w-6" />
//               </div>
//               <h3 className="mt-6 text-base font-bold text-white">1. Contextual PDF Parsing</h3>
//               <p className="mt-2.5 text-xs leading-relaxed text-slate-400">
//                 Direct visual layout understanding extracts multi-column structures, GitHub references, and technical deliverables without truncation.
//               </p>
//             </motion.div>

//             <motion.div 
//               whileHover={{ y: -5 }}
//               transition={{ duration: 0.2 }}
//               className="group rounded-3xl border border-sky-400/20 bg-gradient-to-b from-slate-900/80 to-slate-950/70 p-8 shadow-lg backdrop-blur-xl transition-all hover:border-cyan-400/50 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)]"
//             >
//               <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-950/60 text-sky-400 border border-sky-400/30 transition-colors group-hover:bg-sky-400 group-hover:text-slate-950">
//                 <Cpu className="h-6 w-6" />
//               </div>
//               <h3 className="mt-6 text-base font-bold text-white">2. Dense Vector Embeddings</h3>
//               <p className="mt-2.5 text-xs leading-relaxed text-slate-400">
//                 Matches candidate achievements against specific team deliverables using high-dimensional cosine similarity vectors.
//               </p>
//             </motion.div>

//             <motion.div 
//               whileHover={{ y: -5 }}
//               transition={{ duration: 0.2 }}
//               className="group rounded-3xl border border-sky-400/20 bg-gradient-to-b from-slate-900/80 to-slate-950/70 p-8 shadow-lg backdrop-blur-xl transition-all hover:border-cyan-400/50 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)]"
//             >
//               <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-950/60 text-indigo-400 border border-indigo-400/30 transition-colors group-hover:bg-indigo-400 group-hover:text-slate-950">
//                 <Layers className="h-6 w-6" />
//               </div>
//               <h3 className="mt-6 text-base font-bold text-white">3. Live Kanban Pipeline</h3>
//               <p className="mt-2.5 text-xs leading-relaxed text-slate-400">
//                 Automatically transitions high-fit candidates across customized interview rounds, generating briefing sheets for hiring leads.
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ========================================================================= */}
//       {/* Dual Role Workspaces */}
//       {/* ========================================================================= */}
//       <section className="py-24 px-6 relative z-10">
//         <div className="mx-auto max-w-5xl">
//           <div className="text-center mb-10">
//             <h2 className="text-2xl font-black text-white sm:text-3xl">Tailored Workspaces Built for Speed</h2>
//             <p className="text-xs text-slate-400 mt-2 font-medium">Switch roles to view specialized workflows</p>
            
//             <div className="mt-6 inline-flex p-1 rounded-2xl bg-slate-900/80 border border-sky-500/25 shadow-inner backdrop-blur-md">
//               <button
//                 type="button"
//                 onClick={() => setActiveTab('recruiter')}
//                 className={`flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold transition-all ${
//                   activeTab === 'recruiter'
//                     ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
//                     : 'text-slate-400 hover:text-white'
//                 }`}
//               >
//                 <Sliders className="h-3.5 w-3.5" />
//                 For Recruiters
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setActiveTab('candidate')}
//                 className={`flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold transition-all ${
//                   activeTab === 'candidate'
//                     ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]'
//                     : 'text-slate-400 hover:text-white'
//                 }`}
//               >
//                 <MousePointerClick className="h-3.5 w-3.5" />
//                 For Candidates
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//             {/* Recruiter Workspace */}
//             <AnimatePresence mode="wait">
//               <motion.div 
//                 key={`tab-${activeTab}-recruiter`}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.25 }}
//                 className={`flex flex-col justify-between rounded-3xl border p-8 shadow-sm transition-all duration-300 backdrop-blur-xl ${
//                   activeTab === 'recruiter' 
//                     ? 'border-cyan-400/40 bg-slate-900/80 shadow-[0_0_35px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400/30' 
//                     : 'border-slate-800 bg-slate-950/40 opacity-50 hover:opacity-85'
//                 }`}
//               >
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <span className="rounded-full bg-cyan-950/80 border border-cyan-400/30 px-3 py-1 font-mono text-[10px] font-bold text-cyan-300 shadow-sm">
//                       TALENT ACQUISITION
//                     </span>
//                   </div>
//                   <h3 className="mt-4 text-xl font-bold text-white">Rank Candidate Batches Instantly</h3>
//                   <p className="mt-2.5 text-xs leading-relaxed text-slate-300">
//                     Ingest 500+ applications at once. The neural ranking pipeline filters out superficial keyword stuffers and bubbles up candidates who have executed real-world production code.
//                   </p>
                  
//                   <ul className="mt-5 space-y-2 text-xs text-slate-300">
//                     <li className="flex items-center gap-2">
//                       <CheckCircle2 className="h-4 w-4 text-cyan-400" /> Automated candidate scoring matrices
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <CheckCircle2 className="h-4 w-4 text-cyan-400" /> One-click interview stage progression
//                     </li>
//                   </ul>
//                 </div>

//                 <Link
//                   to="/register"
//                   className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group"
//                 >
//                   Explore Recruiter Workspace <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//                 </Link>
//               </motion.div>
//             </AnimatePresence>

//             {/* Candidate Portal */}
//             <AnimatePresence mode="wait">
//               <motion.div 
//                 key={`tab-${activeTab}-candidate`}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.25 }}
//                 className={`flex flex-col justify-between rounded-3xl border p-8 shadow-sm transition-all duration-300 backdrop-blur-xl ${
//                   activeTab === 'candidate' 
//                     ? 'border-indigo-400/40 bg-slate-900/80 shadow-[0_0_35px_rgba(99,102,241,0.15)] ring-1 ring-indigo-400/30' 
//                     : 'border-slate-800 bg-slate-950/40 opacity-50 hover:opacity-85'
//                 }`}
//               >
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <span className="rounded-full bg-indigo-950/80 border border-indigo-400/30 px-3 py-1 font-mono text-[10px] font-bold text-indigo-300 shadow-sm">
//                       SOFTWARE ENGINEERS
//                     </span>
//                   </div>
//                   <h3 className="mt-4 text-xl font-bold text-white">Real-Time Alignment Telemetry</h3>
//                   <p className="mt-2.5 text-xs leading-relaxed text-slate-300">
//                     Upload your resume to uncover actionable gap analysis. Learn which architectural skills or system design competencies your profile is missing before submitting.
//                   </p>

//                   <ul className="mt-5 space-y-2 text-xs text-slate-300">
//                     <li className="flex items-center gap-2">
//                       <CheckCircle2 className="h-4 w-4 text-indigo-400" /> Semantic keyword gap diagnostics
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <CheckCircle2 className="h-4 w-4 text-indigo-400" /> Real-time application stage visibility
//                     </li>
//                   </ul>
//                 </div>

//                 <Link
//                   to="/register"
//                   className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors group"
//                 >
//                   Create Candidate Profile <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//                 </Link>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </section>

//       {/* ========================================================================= */}
//       {/* Frosted Winter Footer */}
//       {/* ========================================================================= */}
//       <footer className="border-t border-sky-500/15 bg-slate-950/70 py-10 px-6 text-center text-xs text-slate-400 backdrop-blur-md">
//         <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div className="flex items-center gap-2">
//             <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
//             <span className="font-medium text-slate-300">RankResume AI · Next-Generation Multi-Modal Recruitment</span>
//           </div>
//           <p>© 2026 RankResume AI. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;