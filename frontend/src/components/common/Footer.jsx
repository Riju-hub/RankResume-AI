// frontend/src/components/common/Footer.jsx
import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthContext } from '../../context/AuthContext';
import {
  Bot,
  ShieldCheck,
  ExternalLink,
  Cpu,
  ChevronRight,
  Sparkles,
  Briefcase,
  Layers,
  FileCheck2,
} from 'lucide-react';

export const Footer = memo(() => {
  const { isRecruiter, isAuthenticated } = useAuthContext();

  const isRecruiterRole = Boolean(isRecruiter);

  // Dynamic role-based navigation columns
  const footerColumns = useMemo(() => {
    const primaryWorkspaceColumn = isRecruiterRole
      ? {
          title: 'Recruiter Suite',
          icon: Layers,
          links: [
            { label: 'Talent Dashboard', path: '/recruiter/dashboard' },
            { label: 'Create Job Post', path: '/recruiter/create-job' },
            { label: 'Recruiter Profile', path: '/profile' },
          ],
        }
      : {
          title: 'Candidate Hub',
          icon: Briefcase,
          links: [
            { label: 'Explore Openings', path: '/jobs' },
            { label: 'Saved Positions', path: '/candidate/saved-jobs' },
            { label: 'My Applications', path: '/my-applications' },
            { label: 'Candidate Profile', path: '/profile' },
          ],
        };

    const publicWorkspaceColumn = {
      title: 'Job Market',
      icon: Briefcase,
      links: [
        { label: 'Browse Tech Openings', path: '/jobs' },
        { label: 'Sign In to Account', path: '/login' },
        { label: 'Create Free Account', path: '/register' },
      ],
    };

    return [
      isAuthenticated ? primaryWorkspaceColumn : publicWorkspaceColumn,
      {
        title: 'AI Diagnostics',
        icon: Cpu,
        links: [
          { label: 'ATS Analyzer', path: '/ats' },
          {
            label: 'ResumeIQ ATS Live',
            href: 'https://resume-iq-ats-live.streamlit.app/',
            external: true,
          },
        ],
      },
      {
        title: 'Support & Legal',
        icon: FileCheck2,
        links: [
          { label: 'Help & Feedback', path: '/help' },
          { label: 'Terms & Conditions', path: '/terms' },
        ],
      },
    ];
  }, [isRecruiterRole, isAuthenticated]);

  return (
    <footer className="relative z-10 border-t border-slate-200/90 bg-gradient-to-b from-white/95 via-slate-50/80 to-slate-100/60 backdrop-blur-xl font-sans text-slate-700 antialiased overflow-hidden">
      {/* Top Subtle Ambient Neon Border Accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {/* Subtle Background Glow Spot */}
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />

      {/* Added bottom padding (pb-20 sm:pb-8) so content doesn't hit mobile chatbot */}
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-20 sm:pb-8 sm:px-6 lg:px-8">
        {/* Main Grid: Brand & Specs + Role Navigation Columns */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand & Technical Architecture Overview (Cols 1-5) */}
          <div className="space-y-4 lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-md shadow-blue-500/20 ring-1 ring-white/30"
              >
                <Bot className="h-5 w-5" strokeWidth={2.2} />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-tight text-slate-950 flex items-center gap-1">
                  RankResume <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">AI</span>
                  <Sparkles className="h-3 w-3 text-cyan-400" />
                </span>
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  {isAuthenticated
                    ? isRecruiterRole
                      ? 'Enterprise Recruiter Console'
                      : 'Candidate Talent Portal'
                    : 'Autonomous Talent Infrastructure'}
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-xs leading-relaxed text-slate-500 font-normal">
              High-precision multi-modal candidate ranking and applicant tracking engine. 
              Eliminates keyword traps using dense cosine embedding vectors and neural extraction.
            </p>

            {/* Technical Engine Telemetry Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <motion.span 
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-2xs transition-colors hover:border-blue-300"
              >
                <Cpu className="h-3.5 w-3.5 text-blue-600" />
                Gemini 2.5 Flash
              </motion.span>

              <motion.span 
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200/80 bg-emerald-50/80 px-2.5 py-1 text-[11px] font-bold text-emerald-800 shadow-2xs"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                99.98% Pipeline SLA
              </motion.span>
            </div>

            {/* Repositioned Social Links: Safe on left side, free from chatbot overlap */}
            <div className="pt-2 flex items-center gap-2.5 text-slate-400">
              <span className="text-[11px] font-medium text-slate-400 mr-1">Connect:</span>
              
              {/* GitHub */}
              <motion.a
                whileHover={{ y: -2, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                className="rounded-lg p-1.5 transition-colors bg-white/80 border border-slate-200/80 hover:bg-slate-100 hover:text-slate-900 shadow-2xs"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                whileHover={{ y: -2, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-lg p-1.5 transition-colors bg-white/80 border border-slate-200/80 hover:bg-slate-100 hover:text-blue-700 shadow-2xs"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </motion.a>

              {/* Twitter / X */}
              <motion.a
                whileHover={{ y: -2, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="rounded-lg p-1.5 transition-colors bg-white/80 border border-slate-200/80 hover:bg-slate-100 hover:text-slate-900 shadow-2xs"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Categorized Nav Columns (Cols 6-12) */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:col-span-7">
            {footerColumns.map((col, idx) => {
              const Icon = col.icon;
              return (
                <div key={idx} className="space-y-3">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200/50 pb-1.5 flex items-center gap-1.5">
                    {Icon && <Icon className="h-3.5 w-3.5 text-blue-600" />}
                    <span>{col.title}</span>
                  </p>
                  <ul className="space-y-2 text-xs">
                    {col.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        {link.external ? (
                          <motion.a
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.15 }}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1 text-slate-600 transition-colors hover:text-blue-600 font-medium"
                          >
                            <span>{link.label}</span>
                            <ExternalLink className="h-3 w-3 text-slate-400 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600" />
                          </motion.a>
                        ) : (
                          <motion.div
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Link
                              to={link.path}
                              className="group inline-flex items-center gap-1 text-slate-600 transition-colors hover:text-blue-600 font-medium"
                            >
                              <ChevronRight className="h-3 w-3 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-blue-500" />
                              <span>{link.label}</span>
                            </Link>
                          </motion.div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

        </div>

        {/* Lower Legal Strip - Kept clean with extra right padding on desktop so the bot never covers text */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-6 text-xs text-slate-500 sm:flex-row sm:pr-24">
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] sm:justify-start">
            <span className="font-semibold text-slate-700">
              © 2026 RankResume AI Systems Inc.
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
              SOC2 & ISO 27001 Compliant Vector Vaults
            </span>
          </div>

          <p className="text-[11px] text-slate-400">
            All algorithms benchmarked against official Gemini multi-modal guidelines.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;