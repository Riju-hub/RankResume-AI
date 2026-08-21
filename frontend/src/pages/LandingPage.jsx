import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Bot, 
  Layers, 
  ShieldCheck, 
  Zap, 
  FileText, 
  TrendingUp, 
  CheckCircle2, 
  Users, 
  Kanban,
  Code2
} from 'lucide-react';

const TYPEWRITER_PHRASES = [
  'Parsing PDF Resumes with Gemini AI',
  'Automating Candidate Semantic Matching',
  'Streamlining Recruiter Kanban Pipelines',
  'Accelerating Tech Talent Acquisition',
];

export const LandingPage = () => {
  // --- Modern Typewriter State Machine ---
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = TYPEWRITER_PHRASES[currentPhraseIndex];

      if (isDeleting) {
        setCurrentText((prev) => fullText.substring(0, prev.length - 1));
        setTypingSpeed(35);
      } else {
        setCurrentText((prev) => fullText.substring(0, prev.length + 1));
        setTypingSpeed(75);
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, typingSpeed]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100 selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Ambient Glows & Grid Mesh */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-600/15 via-violet-600/10 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-violet-600/15 via-indigo-600/10 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

      {/* Top Floating Glass Navigation */}
      <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-zinc-800/80 bg-zinc-950/80 px-6 sm:px-12 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 shadow-md shadow-indigo-500/25">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-bold tracking-tight text-zinc-100 sm:text-base">
            RankResume <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">AI</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-xl px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:text-zinc-100"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-medium text-white shadow-md shadow-indigo-500/20 transition-all hover:from-indigo-500 hover:to-violet-500 active:scale-95"
          >
            <span>Get Started</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-20 text-center sm:pt-24 sm:pb-28">
        {/* Release / AI Pill Tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-md shadow-inner">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Powered by Google Gemini 2.5 Semantic Engine
        </div>

        {/* Hero Title with Dynamic Gradient */}
        <h1 className="mx-auto mt-6 max-w-4xl text-3xl font-extrabold tracking-tight sm:text-6xl sm:leading-[1.15]">
          Intelligent ATS Hiring. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-200 bg-clip-text text-transparent">
            Rank Resumes Automatically.
          </span>
        </h1>

        {/* Live Typewriter Container */}
        <div className="mx-auto mt-5 flex h-10 max-w-xl items-center justify-center">
          <p className="font-mono text-xs text-zinc-400 sm:text-sm">
            <span className="text-indigo-400 font-semibold">&gt;</span> {currentText}
            <span className="ml-1 inline-block h-4 w-1.5 bg-indigo-400 animate-pulse align-middle" />
          </p>
        </div>

        <p className="mx-auto mt-3 max-w-2xl text-xs text-zinc-400 sm:text-base leading-relaxed">
          Eliminate manual resume filtering. Candidates get instant skill alignment feedback, while recruiters manage candidates across intelligent Kanban stages with zero friction.
        </p>

        {/* Main Hero CTAs */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            to="/register"
            className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-7 text-xs font-semibold text-white shadow-xl shadow-indigo-500/25 transition-all duration-200 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] sm:w-auto"
          >
            <span>Get Started for Free</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/jobs"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-7 text-xs font-semibold text-zinc-300 backdrop-blur-md transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-white sm:w-auto"
          >
            <span>Browse Job Board</span>
          </Link>
        </div>

        {/* Live Interactive UI Glass Preview Card */}
        <div className="relative mx-auto mt-14 max-w-4xl overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-4 sm:p-6 backdrop-blur-2xl shadow-2xl shadow-black/50">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

          {/* Window Mockup Header */}
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/70" />
              <span className="h-3 w-3 rounded-full bg-amber-500/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
              <span className="ml-2 font-mono text-[11px] text-zinc-500">Gemini ATS Live Extraction Matrix</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Real-time Parsed
            </div>
          </div>

          {/* Live Mock Telemetry Content */}
          <div className="mt-4 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Candidate Match</span>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-semibold text-zinc-100 text-sm">Alex Mercer</span>
                <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-400">
                  92% Match
                </span>
              </div>
              <p className="mt-2 text-[11px] text-zinc-400">Top alignment with Senior Full-Stack role</p>
            </div>

            <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Semantic Engine</span>
              <div className="mt-2 flex items-center gap-1.5 font-semibold text-indigo-400 text-sm">
                <Bot className="h-4 w-4" />
                <span>Extracted 14 Skills</span>
              </div>
              <p className="mt-2 text-[11px] text-zinc-400">React, TypeScript, Node.js, AWS, GraphQL</p>
            </div>

            <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Pipeline State</span>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-semibold text-zinc-100 text-sm">Screening Stage</span>
                <span className="h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-indigo-400/30" />
              </div>
              <p className="mt-2 text-[11px] text-zinc-400">Kanban swimlane updated live</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Value Grid */}
      <section className="relative z-10 border-t border-zinc-800/80 bg-zinc-950/90 py-20 px-6 sm:px-12">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">Architected for Speed & Precision</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
            Everything you need to hire and get hired
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 text-left sm:grid-cols-3">
            {/* Feature 1 */}
            <div className="group rounded-3xl border border-zinc-800/80 bg-zinc-900/30 p-6 backdrop-blur-xl transition hover:border-zinc-700 hover:bg-zinc-900/60">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
                <Bot className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-zinc-100">Gemini Resume Parsing</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Upload raw PDF documents. The AI instantly extracts experience, tech stacks, and formats profiles for immediate matching.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-3xl border border-zinc-800/80 bg-zinc-900/30 p-6 backdrop-blur-xl transition hover:border-zinc-700 hover:bg-zinc-900/60">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
                <Kanban className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-zinc-100">Drag & Drop Pipelines</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Organize applicants intuitively across Applied, Screening, Interview, and Offer columns with live optimistic state updates.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-3xl border border-zinc-800/80 bg-zinc-900/30 p-6 backdrop-blur-xl transition hover:border-zinc-700 hover:bg-zinc-900/60">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-zinc-100">Objective Match Scoring</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Candidates receive transparent match percentages and missing skill recommendations to improve alignment for every role.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Split Section */}
      <section className="relative z-10 border-t border-zinc-800/80 py-16 px-6 sm:px-12 bg-zinc-900/20">
        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Candidates Card */}
          <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-7 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-400">
                For Job Seekers
              </span>
              <h3 className="mt-3 text-lg font-bold text-zinc-100">Fast-track your applications</h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                Upload your resume, discover your exact semantic match percentage for open roles, and track status transitions in real time.
              </p>
            </div>
            <Link
              to="/register"
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Sign up as Candidate <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Recruiters Card */}
          <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-7 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-violet-400">
                For Recruiters & Teams
              </span>
              <h3 className="mt-3 text-lg font-bold text-zinc-100">Cut screening time by 80%</h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                Publish positions, let Gemini ATS rank every inbound candidate by relevance, and move qualified talent seamlessly through Kanban boards.
              </p>
            </div>
            <Link
              to="/register"
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-violet-400 hover:text-violet-300"
            >
              Sign up as Recruiter <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 py-8 px-6 text-center text-xs text-zinc-500">
        <p>© 2026 RankResume AI ATS Platform. Designed for modern recruitment.</p>
      </footer>
    </div>
  );
};

export default LandingPage;