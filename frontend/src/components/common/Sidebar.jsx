// frontend/src/components/common/Sidebar.jsx
import React, { useState, useMemo, memo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useSavedJobs } from '../../hooks/useSavedJobs';
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
  ScanSearch,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  LogOut,
  Bookmark,
  Compass,
} from 'lucide-react';

const PRIMARY_NAV = {
  recruiter: [
    { name: 'Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
    { name: 'Explore Openings', path: '/recruiter/market-jobs', icon: Compass }, // <--- New link for recruiters
    { name: 'Create Job Post', path: '/recruiter/create-job', icon: PlusCircle },
  ],
  candidate: [
    { name: 'Job Board', path: '/jobs', icon: Briefcase },
    { name: 'Saved Jobs', path: '/candidate/saved-jobs', icon: Bookmark, badgeKey: 'savedJobs' },
    { name: 'My Applications', path: '/my-applications', icon: FileText },
  ],
};

const SECONDARY_NAV = [
  { name: 'ATS', path: '/ats', icon: ScanSearch, ats: true },
  { name: 'My Profile', path: '/profile', icon: User },
  { name: 'Help & Feedback', path: '/help', icon: HelpCircle },
  { name: 'Terms & Policy', path: '/terms', icon: FileCheck2 },
];

export const Sidebar = memo(({ isOpen, onClose }) => {
  const { isRecruiter, logout } = useAuthContext();
  const { totalSaved } = useSavedJobs();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isRecruiterRole = Boolean(isRecruiter);

  const roleTheme = useMemo(() => {
    return isRecruiterRole
      ? {
          label: 'Recruitment Hub',
          subtitle: 'Recruiter workspace',
          Icon: ShieldCheck,
          gradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
          softGradient: 'from-fuchsia-50/70 via-pink-50/50 to-rose-50/40',
          icon: 'text-pink-600',
          badge: 'border-pink-200 bg-pink-50 text-pink-700',
          active:
            'border-pink-200/80 bg-gradient-to-r from-pink-50/80 via-white to-rose-50/80 text-slate-950 shadow-sm',
        }
      : {
          label: 'Candidate Portal',
          subtitle: 'Candidate workspace',
          Icon: UserCheck,
          gradient: 'from-cyan-500 via-blue-600 to-violet-600',
          softGradient: 'from-cyan-50/70 via-blue-50/50 to-violet-50/40',
          icon: 'text-blue-600',
          badge: 'border-blue-200 bg-blue-50 text-blue-700',
          active:
            'border-blue-200/80 bg-gradient-to-r from-cyan-50/80 via-white to-violet-50/80 text-slate-950 shadow-sm',
        };
  }, [isRecruiterRole]);

  const RoleIcon = roleTheme.Icon;
  const primaryLinks = isRecruiterRole ? PRIMARY_NAV.recruiter : PRIMARY_NAV.candidate;

  const handleLogout = () => {
    onClose?.();
    logout();
    navigate('/', { replace: true });
  };

  const handleDelete = () => {
    onClose?.();
    setShowDeleteModal(true);
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-slate-950/40 transition-opacity duration-200 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-16 bottom-0 z-50 flex w-[280px] flex-col border-r border-slate-200/80 bg-white/95 shadow-xl transition-transform duration-300 ease-out will-change-transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-slate-50/60 opacity-90"
        />

        <div className="flex-1 overflow-y-auto px-3 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center justify-between px-2 pb-3 pt-4 lg:hidden">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                Navigation
              </p>
              <p className="mt-0.5 text-sm font-extrabold text-slate-900">Workspace</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            className={`relative mt-2 overflow-hidden rounded-[20px] border border-slate-200/70 bg-gradient-to-br ${roleTheme.softGradient} p-3.5 shadow-sm`}
          >
            <div className="relative flex items-center gap-3">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${roleTheme.gradient} text-white shadow-md shadow-blue-500/10`}
              >
                <RoleIcon className="h-5 w-5" strokeWidth={2.2} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="truncate text-[13px] font-black tracking-tight text-slate-950">
                    {roleTheme.label}
                  </h2>
                  <span
                    className={`inline-flex shrink-0 items-center rounded-full border px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider ${roleTheme.badge}`}
                  >
                    Active
                  </span>
                </div>
                <p className="mt-0.5 truncate text-[10px] font-semibold text-slate-500">
                  {roleTheme.subtitle}
                </p>
              </div>
            </div>
          </div>

          <section className="mt-5">
            <div className="mb-2 flex items-center justify-between px-2">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                Workspace
              </p>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
            </div>

            <nav className="space-y-1" aria-label="Workspace navigation">
              {primaryLinks.map((link) => {
                const Icon = link.icon;
                const isSavedJobs = link.badgeKey === 'savedJobs';

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex min-h-[44px] items-center justify-between rounded-xl border px-3 text-[12px] font-bold transition-all duration-150 ${
                        isActive
                          ? roleTheme.active
                          : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-950'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex min-w-0 items-center gap-3">
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                              isActive
                                ? `bg-white shadow-xs ${roleTheme.icon}`
                                : 'bg-slate-100/90 text-slate-500 group-hover:bg-white group-hover:text-blue-600'
                            }`}
                          >
                            <Icon className="h-4 w-4" strokeWidth={2.2} />
                          </span>
                          <span className="truncate">{link.name}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {isSavedJobs && Boolean(totalSaved > 0) && (
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-black transition-colors ${
                                isActive
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-blue-50 text-blue-700 ring-1 ring-blue-500/20'
                              }`}
                            >
                              {totalSaved}
                            </span>
                          )}

                          <ChevronRight
                            className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                              isActive ? roleTheme.icon : 'text-slate-400 opacity-60'
                            }`}
                            strokeWidth={2.2}
                          />
                        </div>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </section>

          <div className="my-4 h-px bg-slate-100" />

          <section>
            <div className="mb-2 px-2">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                Account & Support
              </p>
            </div>

            <nav className="space-y-1" aria-label="Account navigation">
              {SECONDARY_NAV.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex min-h-[42px] items-center justify-between rounded-xl border px-3 text-[12px] font-bold transition-all duration-150 ${
                        isActive
                          ? link.ats
                            ? 'border-violet-200 bg-violet-50/80 text-violet-950 shadow-xs'
                            : 'border-slate-200 bg-slate-50 text-slate-950 shadow-xs'
                          : link.ats
                          ? 'border-transparent bg-violet-50/40 text-violet-700 hover:border-violet-200 hover:bg-violet-50'
                          : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-950'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex min-w-0 items-center gap-3">
                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                              isActive
                                ? link.ats
                                  ? 'bg-violet-600 text-white'
                                  : 'bg-white text-indigo-600'
                                : link.ats
                                ? 'bg-violet-100 text-violet-600'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                          </span>
                          <span className="truncate">{link.name}</span>
                        </div>
                        <ChevronRight
                          className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                            isActive
                              ? link.ats
                                ? 'text-violet-600'
                                : 'text-slate-600'
                              : 'text-slate-400 opacity-60'
                          }`}
                          strokeWidth={2.2}
                        />
                      </>
                    )}
                  </NavLink>
                );
              })}

              <button
                type="button"
                onClick={handleLogout}
                className="group flex min-h-[42px] w-full items-center justify-between rounded-xl border border-transparent px-3 text-left text-[12px] font-bold text-slate-600 transition-all duration-150 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-950 cursor-pointer"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-900">
                    <LogOut className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                  <span>Sign Out</span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 opacity-60" strokeWidth={2.2} />
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="group flex min-h-[42px] w-full items-center justify-between rounded-xl border border-transparent px-3 text-left text-[12px] font-bold text-rose-600 transition-all duration-150 hover:border-rose-200 hover:bg-rose-50/70 hover:text-rose-700 cursor-pointer"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-500 group-hover:bg-white">
                    <Trash2 className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                  <span>Delete Account</span>
                </div>
                <ChevronRight className="h-4 w-4 text-rose-400 opacity-60" strokeWidth={2.2} />
              </button>
            </nav>
          </section>
        </div>

        <div className="px-3 pb-3 pt-1">
          <div className="rounded-[18px] border border-slate-200/80 bg-slate-50/70 p-3">
            <div className="flex items-center justify-between">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 text-white shadow-xs">
                  <Bot className="h-4 w-4" strokeWidth={2.2} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-black tracking-tight text-slate-950">
                    Gemini 2.5 ATS
                  </p>
                  <p className="text-[8px] font-black uppercase tracking-[0.16em] text-blue-600">
                    Neural Engine
                  </p>
                </div>
              </div>
              <span
                className="relative flex h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500"
                title="Engine online"
              >
                <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping" />
              </span>
            </div>
            <p className="mt-2 text-[9px] font-medium leading-relaxed text-slate-500">
              Vector pipeline ready for real-time parsing.
            </p>
          </div>
        </div>
      </aside>

      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </>
  );
});

Sidebar.displayName = 'Sidebar';
export default Sidebar;