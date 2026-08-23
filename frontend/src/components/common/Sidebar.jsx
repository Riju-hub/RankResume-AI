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
  Sparkles,
  ChevronRight
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

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 flex w-64 flex-col justify-between border-r border-zinc-800/80 bg-zinc-950/95 p-4 backdrop-blur-xl transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="space-y-5 overflow-y-auto pr-1 [scrollbar-width:none]">
          <div className="flex items-center justify-between px-2 pt-1 lg:hidden">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Navigation</span>
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Primary Role Hub */}
          <div className="space-y-1.5">
            <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              {isRecruiter ? 'Recruitment Hub' : 'Candidate Portal'}
            </p>
            <nav className="space-y-1">
              {primaryLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                        isActive
                          ? 'border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 shadow-sm'
                          : 'text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900/60 hover:text-zinc-200'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-2.5">
                          <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-400' : 'text-zinc-400'}`} />
                          <span>{link.name}</span>
                        </div>
                        <ChevronRight className={`h-3 w-3 ${isActive ? 'opacity-100 text-indigo-400' : 'opacity-0'}`} />
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Utility & Settings Links */}
          <div className="space-y-1.5 pt-2 border-t border-zinc-800/60">
            <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Account & Support</p>
            <nav className="space-y-1">
              {secondaryLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                        isActive
                          ? 'border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 shadow-sm'
                          : 'text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900/60 hover:text-zinc-200'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-2.5">
                          <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-400' : 'text-zinc-400'}`} />
                          <span>{link.name}</span>
                        </div>
                        <ChevronRight className={`h-3 w-3 ${isActive ? 'opacity-100 text-indigo-400' : 'opacity-0'}`} />
                      </>
                    )}
                  </NavLink>
                );
              })}

              {/* Danger Zone: Delete Account Button */}
              <button
                type="button"
                onClick={() => {
                  if (onClose) onClose();
                  setShowDeleteModal(true);
                }}
                className="group flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-rose-400/80 transition-all hover:bg-rose-500/10 hover:text-rose-300 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Trash2 className="h-4 w-4 text-rose-400" />
                  <span>Delete Account</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* ATS Telemetry Status Badge */}
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-3 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-3.5 w-3.5 text-indigo-400" />
              <span className="text-xs font-semibold text-zinc-200">Gemini ATS</span>
            </div>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
          </div>
          <p className="mt-1.5 text-[10px] text-zinc-400 leading-relaxed">
            Real-time parser online.
          </p>
        </div>
      </aside>

      <DeleteAccountModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} />
    </>
  );
};

export default Sidebar;