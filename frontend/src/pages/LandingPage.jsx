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