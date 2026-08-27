import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { DeleteAccountModal } from './DeleteAccountModal';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Briefcase, 
  FileText, 
  User, 
  HelpCircle, 
  FileCheck2, 
  Trash2, 
  X,
  Bot,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Sparkles
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { isRecruiter } = useAuthContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const recruiterLinks = [
    { name: 'Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
    { name: 'Create Job Post', path: '/recruiter/create-job', icon: PlusCircle },
  ];

  const candidateLinks = [
    { name: 'Job Board', path: '/jobs', icon: Briefcase },
    { name: 'My Applications', path: '/my-applications', icon: FileText },
  ];

  const secondaryLinks = [
    { name: 'My Profile', path: '/profile', icon: User },
    { name: 'Help & Feedback', path: '/help', icon: HelpCircle },
    { name: 'Terms & Policy', path: '/terms', icon: FileCheck2 },
  ];

  const primaryLinks = isRecruiter ? recruiterLinks : candidateLinks;

  // Role-specific accents
  const roleTheme = isRecruiter
    ? {
        label: 'Recruitment Hub',
        badgeColor: 'text-pink-400 border-pink-500/30 bg-pink-950/40',
        activeNav: 'border-pink-500/50 bg-pink-950/30 text-pink-300 shadow-lg shadow-pink-500/10',
        activeIcon: 'text-pink-400',
        activeChevron: 'text-pink-400',
        Icon: ShieldCheck,
      }
    : {
        label: 'Candidate Portal',
        badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40',
        activeNav: 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300 shadow-lg shadow-cyan-500/10',
        activeIcon: 'text-cyan-400',
        activeChevron: 'text-cyan-400',
        Icon: UserCheck,
      };

  return (
    <>
      {/* --- Mobile Backdrop Overlay --- */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm transition-opacity lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* --- Main Sidebar Container --- */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 flex w-64 flex-col justify-between border-r border-slate-800/80 bg-slate-950/95 p-4 backdrop-blur-2xl transition-all duration-300 ease-in-out font-sans lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl shadow-black/80' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6 overflow-y-auto pr-1 [scrollbar-width:none]">
          
          {/* Mobile Header Close Row */}
          <div className="flex items-center justify-between px-2 pt-1 lg:hidden">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Navigation Menu
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition-colors hover:border-slate-700 hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Primary Workspace Navigation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {roleTheme.label}
              </span>
              <span className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-tight ${roleTheme.badgeColor}`}>
                <roleTheme.Icon className="h-2.5 w-2.5" />
                Active
              </span>
            </div>

            <nav className="space-y-1">
              {primaryLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex items-center justify-between rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? `${roleTheme.activeNav}`
                          : 'border-transparent text-slate-400 hover:border-slate-800 hover:bg-slate-900/60 hover:text-slate-100'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-2.5">
                          <Icon className={`h-4 w-4 transition-colors ${isActive ? roleTheme.activeIcon : 'text-slate-500 group-hover:text-slate-300'}`} />
                          <span>{link.name}</span>
                        </div>
                        <ChevronRight className={`h-3.5 w-3.5 transition-all ${isActive ? `opacity-100 translate-x-0 ${roleTheme.activeChevron}` : 'opacity-0 -translate-x-1'}`} />
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Utility & Settings Links */}
          <div className="space-y-2 border-t border-slate-800/80 pt-4">
            <p className="px-2 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Account & Support
            </p>
            <nav className="space-y-1">
              {secondaryLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex items-center justify-between rounded-xl border px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? 'border-indigo-500/40 bg-indigo-950/30 text-indigo-300 shadow-md shadow-indigo-500/10'
                          : 'border-transparent text-slate-400 hover:border-slate-800 hover:bg-slate-900/60 hover:text-slate-100'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-2.5">
                          <Icon className={`h-4 w-4 transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                          <span>{link.name}</span>
                        </div>
                        <ChevronRight className={`h-3.5 w-3.5 transition-all ${isActive ? 'opacity-100 text-indigo-400' : 'opacity-0'}`} />
                      </>
                    )}
                  </NavLink>
                );
              })}

              {/* Danger Zone: Delete Account CTA */}
              <button
                type="button"
                onClick={() => {
                  if (onClose) onClose();
                  setShowDeleteModal(true);
                }}
                className="group flex w-full items-center justify-between rounded-xl border border-transparent px-3 py-2 text-xs font-semibold text-rose-400/80 transition-all hover:border-rose-500/30 hover:bg-rose-950/30 hover:text-rose-300 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Trash2 className="h-4 w-4 text-rose-400 transition-transform group-hover:scale-110" />
                  <span>Delete Account</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* --- Live Engine Status Glass Badge --- */}
        <div className="relative mt-4 overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/60 p-3 shadow-inner backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-pink-500 p-1 shadow-xs">
                <Bot className="h-3.5 w-3.5 text-white" />
              </div>
              <div>
                <span className="block text-[11px] font-bold text-slate-200 leading-none">
                  Gemini 2.5 ATS
                </span>
                <span className="font-mono text-[9px] text-cyan-400">Neural Engine</span>
              </div>
            </div>
            
            {/* Live Pulsing Beacon */}
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
          </div>
          
          <p className="mt-2 text-[10px] text-slate-400 leading-tight">
            Vector pipeline ready for real-time parsing.
          </p>
        </div>
      </aside>

      <DeleteAccountModal 
        isOpen={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)} 
      />
    </>
  );
};

export default Sidebar;