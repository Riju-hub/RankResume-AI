import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  ScanSearch,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  LogOut,
} from 'lucide-react';

/*
  Modern, smooth and lightweight Sidebar
  --------------------------------------
  - Pure JSX / JavaScript
  - No TypeScript
  - No animation library required
  - CSS transforms/opacity are used for smooth GPU-friendly motion
  - Existing routes, auth logic and DeleteAccountModal are preserved
*/

const primaryNav = {
  recruiter: [
    { name: 'Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
    { name: 'Create Job Post', path: '/recruiter/create-job', icon: PlusCircle },
  ],
  candidate: [
    { name: 'Job Board', path: '/jobs', icon: Briefcase },
    { name: 'My Applications', path: '/my-applications', icon: FileText },
  ],
};

const secondaryNav = [
  {
    name: 'ATS',
    path: '/ats',
    icon: ScanSearch,
    ats: true,
  },
  { name: 'My Profile', path: '/profile', icon: User },
  { name: 'Help & Feedback', path: '/help', icon: HelpCircle },
  { name: 'Terms & Policy', path: '/terms', icon: FileCheck2 },
];

export const Sidebar = ({ isOpen, onClose }) => {
  const { isRecruiter, logout } = useAuthContext();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isRecruiterRole = Boolean(isRecruiter);

  const roleTheme = isRecruiterRole
    ? {
        label: 'Recruitment Hub',
        subtitle: 'Recruiter workspace',
        Icon: ShieldCheck,
        accent: 'pink',
        gradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
        softGradient: 'from-fuchsia-50 via-pink-50 to-rose-50',
        icon: 'text-pink-600',
        badge: 'border-pink-200 bg-pink-50 text-pink-700',
        active:
          'border-pink-200/80 bg-gradient-to-r from-pink-50 via-white to-rose-50 text-slate-950 shadow-[0_8px_28px_rgba(236,72,153,0.10)]',
      }
    : {
        label: 'Candidate Portal',
        subtitle: 'Candidate workspace',
        Icon: UserCheck,
        accent: 'blue',
        gradient: 'from-cyan-500 via-blue-600 to-violet-600',
        softGradient: 'from-cyan-50 via-blue-50 to-violet-50',
        icon: 'text-blue-600',
        badge: 'border-blue-200 bg-blue-50 text-blue-700',
        active:
          'border-blue-200/80 bg-gradient-to-r from-cyan-50 via-white to-violet-50 text-slate-950 shadow-[0_8px_28px_rgba(59,130,246,0.10)]',
      };

  const RoleIcon = roleTheme.Icon;
  const primaryLinks = isRecruiterRole
    ? primaryNav.recruiter
    : primaryNav.candidate;

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
      <style>{`
        .rr-sidebar,
        .rr-sidebar *,
        .rr-sidebar *::before,
        .rr-sidebar *::after {
          box-sizing: border-box;
        }

        .rr-sidebar {
          --rr-blue: #2563eb;
          --rr-cyan: #06b6d4;
          --rr-violet: #7c3aed;
          --rr-pink: #ec4899;
          --rr-text: #0f172a;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
            "Segoe UI", sans-serif;
          -webkit-font-smoothing: antialiased;
          isolation: isolate;
          overflow: hidden;
          background:
            radial-gradient(circle at 12% 8%, rgba(6,182,212,.10), transparent 28%),
            radial-gradient(circle at 88% 28%, rgba(236,72,153,.08), transparent 30%),
            radial-gradient(circle at 20% 82%, rgba(124,58,237,.07), transparent 30%),
            linear-gradient(180deg, rgba(255,255,255,.96), rgba(248,250,255,.94));
        }

        /* Lightweight animated color atmosphere.
           Only transform/opacity animate, keeping the effect compositor-friendly. */
        .rr-bg-orb {
          position: absolute;
          z-index: -2;
          border-radius: 9999px;
          pointer-events: none;
          filter: blur(42px);
          will-change: transform;
          opacity: .55;
          animation: rr-orb-float 18s ease-in-out infinite;
        }

        .rr-bg-orb-a {
          width: 170px;
          height: 170px;
          top: -70px;
          left: -70px;
          background: rgba(6,182,212,.18);
        }

        .rr-bg-orb-b {
          width: 190px;
          height: 190px;
          top: 32%;
          right: -100px;
          background: rgba(236,72,153,.14);
          animation-delay: -6s;
          animation-duration: 22s;
        }

        .rr-bg-orb-c {
          width: 160px;
          height: 160px;
          bottom: 4%;
          left: -85px;
          background: rgba(124,58,237,.12);
          animation-delay: -11s;
          animation-duration: 25s;
        }

        @keyframes rr-orb-float {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(18px, -14px, 0) scale(1.06);
          }
        }

        /* Subtle static dot grid: visual depth without a constantly animated paint layer. */
        .rr-dot-grid {
          position: absolute;
          z-index: -1;
          inset: 0;
          pointer-events: none;
          opacity: .26;
          background-image: radial-gradient(
            rgba(59,130,246,.22) .7px,
            transparent .8px
          );
          background-size: 22px 22px;
          mask-image: linear-gradient(to bottom, black, transparent 92%);
          -webkit-mask-image: linear-gradient(to bottom, black, transparent 92%);
        }

        .rr-sidebar-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .rr-sidebar-scroll::-webkit-scrollbar {
          display: none;
        }

        .rr-sidebar-item {
          position: relative;
          isolation: isolate;
          transform: translate3d(0, 0, 0);
          transition:
            transform 180ms cubic-bezier(.22,1,.36,1),
            background-color 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease,
            color 180ms ease;
        }

        .rr-sidebar-item::before {
          content: "";
          position: absolute;
          inset: 1px;
          z-index: -1;
          border-radius: 15px;
          opacity: 0;
          background: linear-gradient(
            105deg,
            rgba(6,182,212,.10),
            rgba(59,130,246,.08),
            rgba(124,58,237,.08),
            rgba(236,72,153,.09)
          );
          transition: opacity 180ms ease;
        }

        .rr-sidebar-item:hover {
          transform: translate3d(3px, 0, 0);
        }

        .rr-sidebar-item:hover::before {
          opacity: 1;
        }

        .rr-sidebar-chevron {
          transform: translate3d(-5px, 0, 0);
          opacity: 0;
          transition:
            transform 180ms cubic-bezier(.22,1,.36,1),
            opacity 180ms ease;
        }

        .rr-sidebar-item:hover .rr-sidebar-chevron,
        .rr-sidebar-item[aria-current="page"] .rr-sidebar-chevron {
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }

        .rr-sidebar-icon {
          transition: transform 180ms cubic-bezier(.22,1,.36,1), color 180ms ease;
        }

        .rr-sidebar-item:hover .rr-sidebar-icon {
          transform: scale(1.08);
        }

        .rr-sidebar-brand-orb {
          position: relative;
          overflow: hidden;
        }

        .rr-sidebar-brand-orb::after {
          content: "";
          position: absolute;
          width: 70px;
          height: 70px;
          top: -35px;
          left: -35px;
          border-radius: 999px;
          background: rgba(255,255,255,.38);
          filter: blur(2px);
          pointer-events: none;
        }

        .rr-sidebar-status {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 100% 0%, rgba(99,102,241,.12), transparent 45%),
            linear-gradient(135deg, rgba(255,255,255,.92), rgba(239,246,255,.78));
        }

        .rr-sidebar-status::before {
          content: "";
          position: absolute;
          width: 120px;
          height: 120px;
          right: -58px;
          top: -70px;
          border-radius: 999px;
          background: rgba(99,102,241,.13);
          pointer-events: none;
        }

        .rr-sidebar-status::after {
          content: "";
          position: absolute;
          left: -30%;
          top: 0;
          width: 28%;
          height: 100%;
          transform: skewX(-18deg);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.75),
            transparent
          );
          animation: rr-status-shimmer 5s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes rr-status-shimmer {
          0%, 55% {
            transform: translate3d(-180%,0,0) skewX(-18deg);
          }
          75%, 100% {
            transform: translate3d(520%,0,0) skewX(-18deg);
          }
        }

        .rr-sidebar-pulse {
          animation: rr-soft-pulse 2.4s ease-in-out infinite;
        }

        @keyframes rr-soft-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(16,185,129,.20);
          }
          50% {
            box-shadow: 0 0 0 5px rgba(16,185,129,0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .rr-bg-orb,
          .rr-sidebar-status::after,
          .rr-sidebar-pulse {
            animation: none !important;
          }

          .rr-sidebar-item,
          .rr-sidebar-item::before,
          .rr-sidebar-chevron,
          .rr-sidebar-icon {
            transition: none !important;
          }

          .rr-sidebar-item:hover {
            transform: none;
          }
        }
      `}</style>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          aria-hidden="true"
          className="
            fixed inset-0 z-40 lg:hidden
            bg-slate-950/30 backdrop-blur-[3px]
          "
        />
      )}

      <aside
        className={`
          rr-sidebar fixed left-0 top-16 bottom-0 z-50
          flex w-[280px] flex-col
          border-r border-slate-200/70
          bg-white/90
          shadow-[12px_0_40px_rgba(15,23,42,0.05)]
          backdrop-blur-2xl
          transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Lightweight multicolor background atmosphere */}
        <span aria-hidden="true" className="rr-bg-orb rr-bg-orb-a" />
        <span aria-hidden="true" className="rr-bg-orb rr-bg-orb-b" />
        <span aria-hidden="true" className="rr-bg-orb rr-bg-orb-c" />
        <span aria-hidden="true" className="rr-dot-grid" />

        {/* Thin multicolor edge */}
        <div
          aria-hidden="true"
          className={`absolute right-0 top-0 h-full w-px bg-gradient-to-b ${roleTheme.gradient} opacity-30`}
        />

        <div className="rr-sidebar-scroll flex-1 overflow-y-auto px-3 pb-3">
          {/* Mobile heading */}
          <div className="flex items-center justify-between px-2 pb-3 pt-4 lg:hidden">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                Navigation
              </p>
              <p className="mt-0.5 text-sm font-extrabold text-slate-900">
                Workspace
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation"
              className="
                flex h-9 w-9 items-center justify-center rounded-xl
                border border-slate-200 bg-white text-slate-500
                shadow-sm transition-all duration-200
                hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900
                active:scale-95
              "
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Role header */}
          <div
            className={`
              relative mt-2 overflow-hidden rounded-[22px]
              border border-slate-200/70 bg-gradient-to-br ${roleTheme.softGradient}
              p-3.5 shadow-[0_10px_35px_rgba(30,41,59,0.06)]
            `}
          >
            <div
              aria-hidden="true"
              className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${roleTheme.gradient} opacity-10 blur-2xl`}
            />

            <div className="relative flex items-center gap-3">
              <div
                className={`
                  rr-sidebar-brand-orb flex h-11 w-11 shrink-0 items-center justify-center
                  rounded-2xl bg-gradient-to-br ${roleTheme.gradient}
                  text-white shadow-lg shadow-blue-500/15
                `}
              >
                <RoleIcon className="h-5 w-5" strokeWidth={2.3} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="truncate text-[13px] font-black tracking-tight text-slate-950">
                    {roleTheme.label}
                  </h2>
                  <span
                    className={`
                      inline-flex shrink-0 items-center rounded-full border
                      px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider
                      ${roleTheme.badge}
                    `}
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

          {/* Primary navigation */}
          <section className="mt-6">
            <div className="mb-2 flex items-center justify-between px-2">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                Workspace
              </p>
              <span className="h-1 w-1 rounded-full bg-gradient-to-r from-blue-500 to-pink-500" />
            </div>

            <nav className="space-y-1.5" aria-label="Workspace navigation">
              {primaryLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `
                        rr-sidebar-item group flex min-h-[48px] items-center
                        justify-between rounded-2xl border px-3
                        text-[12px] font-extrabold
                        ${isActive
                          ? roleTheme.active
                          : 'border-transparent text-slate-600 hover:border-slate-200/80 hover:bg-slate-50/80 hover:text-slate-950'}
                      `
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex min-w-0 items-center gap-3">
                          <span
                            className={`
                              flex h-8 w-8 shrink-0 items-center justify-center rounded-xl
                              transition-colors duration-180
                              ${isActive
                                ? `bg-white shadow-sm ${roleTheme.icon}`
                                : 'bg-slate-100/80 text-slate-500 group-hover:bg-white group-hover:text-blue-600'}
                            `}
                          >
                            <Icon className="rr-sidebar-icon h-[17px] w-[17px]" strokeWidth={2.25} />
                          </span>

                          <span className="truncate">{link.name}</span>
                        </div>

                        <ChevronRight
                          className={`
                            rr-sidebar-chevron h-4 w-4 shrink-0
                            ${isActive ? roleTheme.icon : 'text-slate-400'}
                          `}
                          strokeWidth={2.5}
                        />
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </section>

          {/* Divider */}
          <div className="my-5 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          {/* Account / support */}
          <section>
            <div className="mb-2 px-2">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                Account & Support
              </p>
            </div>

            <nav className="space-y-1" aria-label="Account and support navigation">
              {secondaryNav.map((link) => {
                const Icon = link.icon;

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `
                        rr-sidebar-item group flex min-h-[44px] items-center
                        justify-between rounded-2xl border px-3
                        text-[12px] font-bold
                        ${isActive
                          ? link.ats
                            ? 'border-violet-200/90 bg-gradient-to-r from-violet-50 via-white to-cyan-50 text-slate-950 shadow-[0_10px_30px_rgba(124,58,237,0.12)]'
                            : 'border-indigo-200/80 bg-gradient-to-r from-indigo-50 via-white to-cyan-50 text-slate-950 shadow-[0_8px_25px_rgba(99,102,241,0.08)]'
                          : link.ats
                            ? 'border-violet-100/80 bg-gradient-to-r from-violet-50/60 via-white/70 to-cyan-50/60 text-violet-700 hover:border-violet-200 hover:shadow-[0_8px_24px_rgba(124,58,237,0.10)]'
                            : 'border-transparent text-slate-600 hover:border-slate-200/80 hover:bg-slate-50/80 hover:text-slate-950'}
                      `
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex min-w-0 items-center gap-3">
                          <span
                            className={`
                              flex h-8 w-8 shrink-0 items-center justify-center rounded-xl
                              transition-colors duration-180
                              ${isActive
                                ? link.ats
                                  ? 'bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-500/20'
                                  : 'bg-white text-indigo-600 shadow-sm'
                                : link.ats
                                  ? 'bg-violet-100/80 text-violet-600 group-hover:bg-white group-hover:text-violet-700'
                                  : 'bg-slate-100/80 text-slate-500 group-hover:bg-white group-hover:text-indigo-600'}
                            `}
                          >
                            <Icon className="rr-sidebar-icon h-4 w-4" strokeWidth={2.2} />
                          </span>
                          <span className="truncate">{link.name}</span>
                        </div>

                        <ChevronRight
                          className={`
                            rr-sidebar-chevron h-4 w-4 shrink-0
                            ${isActive
                              ? link.ats
                                ? 'text-violet-600'
                                : 'text-indigo-600'
                              : link.ats
                                ? 'text-violet-300 group-hover:text-violet-500'
                                : 'text-slate-400'}
                          `}
                          strokeWidth={2.5}
                        />
                      </>
                    )}
                  </NavLink>
                );
              })}

              {/* Sign out */}
              <button
                type="button"
                onClick={handleLogout}
                className="
                  rr-sidebar-item group flex min-h-[44px] w-full items-center
                  justify-between rounded-2xl border border-transparent px-3
                  text-left text-[12px] font-bold text-slate-600
                  hover:border-slate-200/80 hover:bg-slate-50/80 hover:text-slate-950
                  cursor-pointer
                "
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="
                    flex h-8 w-8 shrink-0 items-center justify-center rounded-xl
                    bg-slate-100/80 text-slate-500 transition-colors duration-180
                    group-hover:bg-white group-hover:text-slate-900
                  ">
                    <LogOut className="rr-sidebar-icon h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <span>Sign Out</span>
                </div>

                <ChevronRight
                  className="rr-sidebar-chevron h-4 w-4 text-slate-400"
                  strokeWidth={2.5}
                />
              </button>

              {/* Delete account */}
              <button
                type="button"
                onClick={handleDelete}
                className="
                  rr-sidebar-item group flex min-h-[44px] w-full items-center
                  justify-between rounded-2xl border border-transparent px-3
                  text-left text-[12px] font-bold text-rose-600
                  hover:border-rose-200/80 hover:bg-rose-50/70 hover:text-rose-700
                  cursor-pointer
                "
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="
                    flex h-8 w-8 shrink-0 items-center justify-center rounded-xl
                    bg-rose-50 text-rose-500 transition-colors duration-180
                    group-hover:bg-white
                  ">
                    <Trash2 className="rr-sidebar-icon h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <span>Delete Account</span>
                </div>

                <ChevronRight
                  className="rr-sidebar-chevron h-4 w-4 text-rose-400"
                  strokeWidth={2.5}
                />
              </button>
            </nav>
          </section>
        </div>

        {/* Engine status */}
        <div className="px-3 pb-3 pt-1">
          <div
            className="
              rr-sidebar-status rounded-[22px]
              border border-slate-200/80
              bg-white/80 p-3
              shadow-[0_12px_35px_rgba(15,23,42,0.07)]
              backdrop-blur-xl
            "
          >
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex min-w-0 items-center gap-2.5">
                <div
                  className="
                    flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
                    bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600
                    text-white shadow-md shadow-blue-500/20
                  "
                >
                  <Bot className="h-[17px] w-[17px]" strokeWidth={2.2} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-[11px] font-black tracking-tight text-slate-950">
                    Gemini 2.5 ATS
                  </p>
                  <p className="mt-0.5 text-[8px] font-black uppercase tracking-[0.16em] text-blue-600">
                    Neural Engine
                  </p>
                </div>
              </div>

              <span
                className="rr-sidebar-pulse relative ml-2 flex h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500"
                aria-label="Engine online"
                title="Engine online"
              >
                <span className="absolute inset-0 rounded-full bg-emerald-400/40" />
              </span>
            </div>

            <div className="relative z-10 mt-2.5 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-emerald-500" />
              <p className="text-[9px] font-semibold leading-relaxed text-slate-500">
                Vector pipeline ready for real-time parsing.
              </p>
            </div>
          </div>
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
