import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowLeft, 
  Compass, 
  FileQuestion, 
  Layers, 
  HelpCircle,
  Briefcase
} from 'lucide-react';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-zinc-950 px-4 py-16 selection:bg-indigo-500 selection:text-white">
      {/* Ambient Radial Background Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-indigo-600/15 via-violet-600/10 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[550px] w-[550px] rounded-full bg-gradient-to-tl from-violet-600/15 via-indigo-600/10 to-transparent blur-[140px]" />

      {/* Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 w-full max-w-lg text-center">
        {/* Main 404 Glass Container Card */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/60 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl transition-all hover:border-zinc-700/80">
          {/* Subtle Top Ambient Border Highlight */}
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

          {/* Animated 404 Emblem Badge */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-500/30 bg-gradient-to-tr from-indigo-500/10 via-zinc-900 to-violet-500/10 shadow-xl shadow-indigo-500/10">
            <FileQuestion className="h-8 w-8 text-indigo-400" />
          </div>

          {/* Error Tag & Numeric Status */}
          <div className="mt-6 flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 font-mono text-xs font-semibold text-indigo-300">
              <Compass className="h-3.5 w-3.5 text-indigo-400" />
              Error 404 • Resource Relocated
            </span>

            <h1 className="mt-4 font-mono text-6xl font-extrabold tracking-tight text-zinc-100 sm:text-7xl">
              4<span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">0</span>4
            </h1>
            <h2 className="mt-2 text-lg font-bold text-zinc-100 sm:text-xl">
              Page Lost in the Pipeline
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400 max-w-sm">
              The page, job posting, or candidate view you are looking for has been archived, renamed, or does not exist.
            </p>
          </div>

          {/* Quick Route Discovery Shortcuts */}
          <div className="mt-7 grid grid-cols-2 gap-2.5 text-left">
            <Link
              to="/jobs"
              className="group flex flex-col rounded-2xl border border-zinc-800/80 bg-zinc-950/50 p-3 transition-all hover:border-indigo-500/30 hover:bg-indigo-500/5 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Briefcase className="h-3.5 w-3.5 text-indigo-400" />
                <span className="text-xs font-semibold text-zinc-200 group-hover:text-indigo-300">Job Board</span>
              </div>
              <p className="mt-1 text-[10px] text-zinc-500">Explore open positions</p>
            </Link>

            <Link
              to="/"
              className="group flex flex-col rounded-2xl border border-zinc-800/80 bg-zinc-950/50 p-3 transition-all hover:border-violet-500/30 hover:bg-violet-500/5 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                <span className="text-xs font-semibold text-zinc-200 group-hover:text-violet-300">Landing Page</span>
              </div>
              <p className="mt-1 text-[10px] text-zinc-500">ATS platform home</p>
            </Link>
          </div>

          {/* Navigation Action Buttons */}
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 text-xs font-medium text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 active:scale-95 sm:w-auto cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Go Back</span>
            </button>

            <Link
              to="/"
              className="group relative inline-flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-6 text-xs font-medium text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:from-indigo-500 hover:to-violet-500 active:scale-95 sm:w-auto cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>

        {/* System Telemetry Footer */}
        <p className="mt-6 text-[11px] text-zinc-600">
          RankResume AI • Autonomous Semantic Screening Engine
        </p>
      </div>
    </div>
  );
};

export default NotFound;