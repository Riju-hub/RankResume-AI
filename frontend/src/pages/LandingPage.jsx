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
import { Link, useNavigate } from 'react-router-dom';
import geminiLogo from '../assets/gemini-svg.svg';
import {
  Search,
  MapPin,
  Briefcase,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ChevronRight,
  CheckCircle2,
  Building2,
  Clock,
  DollarSign,
  Flame,
  Filter,
  Layers,
  GraduationCap,
  ShieldCheck,
  Star,
  Users
} from 'lucide-react';

// Dynamic search highlights
const POPULAR_SEARCHES = [
  'React Developer',
  'Full Stack MERN',
  'AI / ML Engineer',
  'Data Analyst',
  'DevOps Specialist',
  'Product Designer'
];

// Quick category exploration cards (Naukri / Internshala style)
const TOP_CATEGORIES = [
  { name: 'Engineering & Tech', count: '1,420+ Openings', icon: Layers, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
  { name: 'AI & Data Science', count: '680+ Openings', icon: Sparkles, color: 'text-pink-400 bg-pink-500/10 border-pink-500/20' },
  { name: 'Fresher & Internships', count: '950+ Openings', icon: GraduationCap, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  { name: 'Product & Management', count: '310+ Openings', icon: Briefcase, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
];

// Live featured job feed preview (Indeed / Internshala job card format)
const FEATURED_JOBS = [
  {
    id: '1',
    role: 'Full Stack Engineer (MERN)',
    company: 'NexusCloud Systems',
    location: 'Bengaluru / Remote',
    type: 'Full-time',
    salary: '₹14 - ₹22 LPA',
    atsScoreNeeded: '85% ATS Fit',
    tags: ['React', 'Node.js', 'MongoDB', 'AWS'],
    posted: '2 hours ago',
    urgent: true,
  },
  {
    id: '2',
    role: 'AI / Prompt Engineer Intern',
    company: 'CortexAI Labs',
    location: 'Remote',
    type: 'Internship (6 Mos)',
    salary: '₹35,000 / month',
    atsScoreNeeded: '80% ATS Fit',
    tags: ['Gemini API', 'Python', 'LangChain', 'FastAPI'],
    posted: '5 hours ago',
    urgent: false,
  },
  {
    id: '3',
    role: 'DevOps & Cloud Architect',
    company: 'HyperScale Data',
    location: 'Hyderabad / Hybrid',
    type: 'Full-time',
    salary: '₹18 - ₹28 LPA',
    atsScoreNeeded: '88% ATS Fit',
    tags: ['Docker', 'K8s', 'Terraform', 'CI/CD'],
    posted: '1 day ago',
    urgent: true,
  },
];

export const LandingPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('any');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams({
      query: keyword,
      loc: location,
      exp: experience,
    }).toString();
    navigate(`/jobs?${query}`);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 antialiased font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-[550px] w-[550px] rounded-full bg-pink-600/15 blur-[130px]" />
        <div className="absolute -bottom-32 left-1/3 h-[500px] w-[500px] rounded-full bg-cyan-600/15 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
      </div>

      {/* Modern Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl shadow-lg">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
          
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-pink-500 p-2 shadow-md shadow-blue-500/20 transition-transform group-hover:scale-105">
                <img src={geminiLogo} alt="RankResume AI" className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-tight text-white flex items-center gap-1">
                  RankResume <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">AI</span>
                </span>
                <span className="text-[9px] font-mono text-slate-400 -mt-1 tracking-wider uppercase">Smart Job & ATS Hub</span>
              </div>
            </Link>

            {/* Portal navigation links */}
            <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
              <Link to="/jobs" className="hover:text-white transition-colors">Jobs</Link>
              <Link to="/jobs?type=internship" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
                Internships
                <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-1.5 py-0.2 text-[9px] text-emerald-400 font-bold">New</span>
              </Link>
              <Link to="/register" className="hover:text-white transition-colors">Candidate ATS Test</Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-300 transition-colors hover:text-white hover:bg-slate-800/60"
            >
              Candidate Login
            </Link>
            <Link
              to="/register"
              className="group inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>Employer / Post Job</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Hero & Central Search Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:pt-14 text-center">
        
        {/* Market Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3.5 py-1 text-xs text-indigo-300 backdrop-blur-md">
          <Flame className="h-3.5 w-3.5 text-pink-400" />
          <span>India’s AI-Powered Job Board: </span>
          <span className="font-semibold text-cyan-300">Over 10,000+ Pre-Filtered Roles</span>
        </div>

        <h1 className="mt-5 text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Find Jobs Where Your Resume <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">Actually Matches</span>
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Search verified roles across tech, startups, and enterprises. Get an instant Gemini match score before applying.
        </p>

        {/* Central Job Search Bar (Indeed/Naukri inspired) */}
        <div className="mt-8 mx-auto max-w-4xl rounded-2xl border border-slate-700/80 bg-slate-900/90 p-2 sm:p-3 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-center gap-2 text-left">
            
            {/* Role / Skill */}
            <div className="relative flex-1 w-full flex items-center border-b md:border-b-0 md:border-r border-slate-800 px-3 py-2">
              <Search className="h-4 w-4 text-slate-400 shrink-0 mr-2" />
              <input
                type="text"
                placeholder="Job title, keywords, or tech stack..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            {/* Location */}
            <div className="relative flex-1 w-full flex items-center border-b md:border-b-0 md:border-r border-slate-800 px-3 py-2">
              <MapPin className="h-4 w-4 text-slate-400 shrink-0 mr-2" />
              <input
                type="text"
                placeholder="City, state, or 'Remote'..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            {/* Experience Dropdown (Naukri style) */}
            <div className="w-full md:w-44 flex items-center px-3 py-2">
              <Filter className="h-4 w-4 text-slate-400 shrink-0 mr-2" />
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="any" className="bg-slate-900 text-slate-200">Experience (All)</option>
                <option value="fresher" className="bg-slate-900 text-slate-200">Fresher / 0 Yrs</option>
                <option value="1-3" className="bg-slate-900 text-slate-200">1 - 3 Years</option>
                <option value="3-5" className="bg-slate-900 text-slate-200">3 - 5 Years</option>
                <option value="5+" className="bg-slate-900 text-slate-200">5+ Years</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full md:w-auto shrink-0 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:opacity-95 active:scale-95 transition-all"
            >
              <span>Search Jobs</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </form>

          {/* Quick-pill search tags */}
          <div className="mt-3 flex flex-wrap items-center gap-2 px-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 text-left">
            <span className="font-semibold text-slate-300 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-cyan-400" /> Trending:
            </span>
            {POPULAR_SEARCHES.map((term, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setKeyword(term)}
                className="rounded-lg bg-slate-800/60 px-2 py-0.5 text-slate-300 hover:bg-slate-700/80 hover:text-cyan-300 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Category Badges */}
        <div className="mt-12 mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {TOP_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                to={`/jobs?cat=${encodeURIComponent(cat.name)}`}
                className="group flex flex-col items-start p-4 rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 hover:border-slate-700 transition-all text-left"
              >
                <div className={`p-2.5 rounded-xl border ${cat.color} mb-3 group-hover:scale-105 transition-transform`}>
                  <Icon className="h-4 w-4" />
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">{cat.name}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">{cat.count}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Jobs Feed Section (Indeed / Naukri Feed Layout) */}
      <section className="relative z-10 border-t border-slate-800/90 bg-slate-900/40 py-14 px-4 sm:px-6 backdrop-blur-md">
        <div className="mx-auto max-w-6xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-3">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">Fresh Vacancies</span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">Recommended for High-Signal Applicants</h2>
            </div>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 hover:text-pink-300 transition-colors"
            >
              <span>View All 2,500+ Jobs</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURED_JOBS.map((job) => (
              <div
                key={job.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg transition-all hover:border-indigo-500/50 hover:bg-slate-900/95"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      {job.urgent && (
                        <span className="inline-block rounded-md bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 text-[9px] font-bold text-rose-400 uppercase tracking-wide mb-2">
                          Urgently Hiring
                        </span>
                      )}
                      <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                        {job.role}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mt-1">
                        <Building2 className="h-3.5 w-3.5 text-slate-500" />
                        {job.company}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-lg border border-pink-500/30 bg-pink-950/40 px-2 py-1 text-[10px] font-mono font-bold text-pink-300">
                      {job.atsScoreNeeded}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-300">
                    <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                      <MapPin className="h-3 w-3 text-slate-500" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                      <Clock className="h-3 w-3 text-slate-500" /> {job.type}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-semibold">
                      <DollarSign className="h-3 w-3 text-emerald-400" /> {job.salary}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded-md border border-slate-800 bg-slate-800/60 px-2 py-0.5 text-[10px] text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">{job.posted}</span>
                  <Link
                    to={`/jobs/${job.id}`}
                    className="font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    Apply Now <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Dual Value Split: Candidate vs Recruiter */}
      <section className="py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div className="flex flex-col justify-between rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-7 shadow-xl">
            <div>
              <span className="rounded-full bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
                CANDIDATE DASHBOARD
              </span>
              <h3 className="mt-4 text-lg font-bold text-white">Upload CV & Track In Real Time</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Stop submitting into dark holes. Check your resume score against actual role requirements before you hit apply.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" /> Instant Gemini ATS Match Percentage
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" /> Missing keyword and skill suggestions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" /> Real-time status in the recruiter's Kanban
                </li>
              </ul>
            </div>
            <Link
              to="/register"
              className="mt-6 inline-flex items-center justify-center gap-1 rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-bold text-cyan-400 hover:bg-slate-700 hover:text-white transition-all"
            >
              Get Free Resume Score <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex flex-col justify-between rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-7 shadow-xl">
            <div>
              <span className="rounded-full bg-pink-950/60 border border-pink-500/30 px-2.5 py-0.5 font-mono text-[10px] font-bold text-pink-300">
                HIRING MANAGER WORKSPACE
              </span>
              <h3 className="mt-4 text-lg font-bold text-white">Post Jobs & Auto-Rank Applicants</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Save 15+ hours weekly. Let multi-modal parsing evaluate technical stack depth and push candidates down your Kanban pipeline.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-pink-400" /> 1-Click job posting and auto-publishing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-pink-400" /> Automated resume parsing with zero setup
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-pink-400" /> Drag-and-drop Kanban candidate stages
                </li>
              </ul>
            </div>
            <Link
              to="/register"
              className="mt-6 inline-flex items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all"
            >
              Post a Job for Free <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-slate-400">RankResume AI · Empowering Next-Gen Job Discovery</span>
          </div>
          <p>© 2026 RankResume AI. Built for candidates and recruiters.</p>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;