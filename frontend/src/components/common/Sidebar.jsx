import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Briefcase, 
  FileText, 
  X,
  Bot,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { isRecruiter } = useAuthContext();

  const recruiterLinks = [
    { name: 'Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
    { name: 'Create Job Post', path: '/recruiter/create-job', icon: PlusCircle },
  ];

  const candidateLinks = [
    { name: 'Job Board', path: '/jobs', icon: Briefcase },
    { name: 'My Applications', path: '/my-applications', icon: FileText },
  ];

  const links = isRecruiter ? recruiterLinks : candidateLinks;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 flex w-64 flex-col justify-between border-r border-zinc-800/80 bg-zinc-950/95 p-4 backdrop-blur-xl transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Mobile Header Close */}
          <div className="flex items-center justify-between px-2 pt-1 lg:hidden">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Menu Navigation
            </span>
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-zinc-700 hover:text-zinc-100"
              aria-label="Close navigation sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Section Heading */}
          <div className="px-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              {isRecruiter ? 'Recruitment Hub' : 'Candidate Portal'}
            </p>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all duration-150 ${
                      isActive
                        ? 'border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 shadow-sm'
                        : 'text-zinc-400 hover:border-zinc-800/80 hover:bg-zinc-900/60 hover:text-zinc-200'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`h-4 w-4 transition-colors ${
                            isActive ? 'text-indigo-400' : 'text-zinc-400 group-hover:text-zinc-200'
                          }`}
                        />
                        <span>{link.name}</span>
                      </div>
                      <ChevronRight
                        className={`h-3.5 w-3.5 transition-transform ${
                          isActive
                            ? 'text-indigo-400 opacity-100'
                            : 'text-zinc-600 opacity-0 group-hover:translate-x-0.5 group-hover:opacity-100'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* ATS Telemetry & Status Pill */}
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 backdrop-blur-md">
          {/* Subtle top ambient bar */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                <Bot className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-semibold text-zinc-200">Gemini ATS</span>
            </div>
            {/* Live radar dot */}
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
          </div>

          <p className="mt-2 text-[11px] leading-relaxed text-zinc-400">
            Semantic resume ranking and Gemini parser online.
          </p>

          <div className="mt-3 flex items-center gap-1.5 border-t border-zinc-800/60 pt-2 text-[10px] text-zinc-400">
            <Sparkles className="h-3 w-3 text-indigo-400" />
            <span>Ready for parsing</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;