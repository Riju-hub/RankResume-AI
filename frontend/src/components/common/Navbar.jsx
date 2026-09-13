import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import geminiLogo from '../../assets/gemini-svg.svg';
import {
  Menu,
  ShieldCheck,
  Sparkles,
  ScanSearch,
  ArrowRight,
  User as UserIcon,
} from 'lucide-react';

/*
  RankResume AI — Modern Live Navbar
  ----------------------------------
  Pure JSX / JavaScript
  - No TypeScript
  - No animation library required
  - GPU-friendly transform/opacity animations
  - Multicolor animated atmosphere
  - Existing routes + auth behavior preserved
*/

export const Navbar = ({ toggleSidebar }) => {
  const { user, isAuthenticated, isRecruiter } = useAuthContext();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getInitials = (name) => {
    if (!name) return 'U';

    return name
      .trim()
      .split(/\s+/)
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <>
      <style>{`
        .rr-navbar {
          --rr-blue: #2563eb;
          --rr-cyan: #06b6d4;
          --rr-violet: #7c3aed;
          --rr-pink: #ec4899;
          --rr-rose: #f43f5e;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system,
            BlinkMacSystemFont, "Segoe UI", sans-serif;
          -webkit-font-smoothing: antialiased;
          isolation: isolate;
        }

        /*
          Advanced animated light field.
          Only transform + opacity are animated to avoid expensive layout/paint work.
        */
        .rr-navbar-glow {
          position: absolute;
          z-index: -2;
          pointer-events: none;
          border-radius: 9999px;
          filter: blur(28px);
          will-change: transform, opacity;
          opacity: .42;
          transform: translate3d(0, 0, 0);
          animation: rr-navbar-float 16s ease-in-out infinite;
        }

        .rr-navbar-glow-blue {
          width: 230px;
          height: 90px;
          left: 5%;
          top: -65px;
          background: rgba(37, 99, 235, .24);
        }

        .rr-navbar-glow-pink {
          width: 220px;
          height: 90px;
          right: 12%;
          top: -70px;
          background: rgba(236, 72, 153, .20);
          animation-delay: -5s;
          animation-duration: 20s;
        }

        .rr-navbar-glow-cyan {
          width: 160px;
          height: 80px;
          right: -30px;
          bottom: -65px;
          background: rgba(6, 182, 212, .16);
          animation-delay: -9s;
          animation-duration: 22s;
        }

        @keyframes rr-navbar-float {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: .38;
          }
          50% {
            transform: translate3d(18px, 5px, 0) scale(1.07);
            opacity: .52;
          }
        }

        /* Moving multicolor accent line */
        .rr-navbar-spectrum {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 2px;
          overflow: hidden;
          background: linear-gradient(
            90deg,
            #06b6d4 0%,
            #2563eb 24%,
            #7c3aed 50%,
            #ec4899 76%,
            #f43f5e 100%
          );
          background-size: 220% 100%;
          animation: rr-spectrum 9s linear infinite;
          box-shadow: 0 0 14px rgba(99, 102, 241, .25);
        }

        @keyframes rr-spectrum {
          0% { background-position: 0% 50%; }
          100% { background-position: 220% 50%; }
        }

        /* Soft moving highlight beneath the navbar */
        .rr-navbar-bottom-glow {
          position: absolute;
          left: 8%;
          right: 8%;
          bottom: -9px;
          height: 18px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            rgba(6,182,212,0),
            rgba(37,99,235,.16),
            rgba(124,58,237,.13),
            rgba(236,72,153,.16),
            rgba(244,63,94,0)
          );
          filter: blur(9px);
          opacity: .65;
          pointer-events: none;
        }

        .rr-navbar-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Brand icon */
        .rr-brand-icon {
          position: relative;
          overflow: hidden;
          transform: translate3d(0,0,0);
          transition:
            transform 220ms cubic-bezier(.22,1,.36,1),
            box-shadow 220ms ease;
        }

        .rr-brand-icon::after {
          content: "";
          position: absolute;
          width: 80px;
          height: 80px;
          left: -42px;
          top: -42px;
          border-radius: 9999px;
          background: rgba(255,255,255,.38);
          pointer-events: none;
        }

        .rr-brand-link:hover .rr-brand-icon {
          transform: translate3d(0,-1px,0) scale(1.055) rotate(-1deg);
        }

        .rr-brand-link {
          transform: translate3d(0,0,0);
        }

        .rr-brand-ai {
          background: linear-gradient(
            90deg,
            #06b6d4,
            #2563eb,
            #7c3aed,
            #ec4899
          );
          background-size: 220% 100%;
          animation: rr-ai-gradient 8s ease-in-out infinite;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        @keyframes rr-ai-gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Generic modern interactive control */
        .rr-nav-control {
          transform: translate3d(0,0,0);
          transition:
            transform 180ms cubic-bezier(.22,1,.36,1),
            border-color 180ms ease,
            background-color 180ms ease,
            box-shadow 180ms ease,
            color 180ms ease;
        }

        .rr-nav-control:hover {
          transform: translate3d(0,-1px,0);
        }

        .rr-nav-control:active {
          transform: translate3d(0,0,0) scale(.97);
        }

        /* Profile capsule */
        .rr-profile {
          position: relative;
          overflow: hidden;
        }

        .rr-profile::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 15%,
            rgba(255,255,255,.65) 48%,
            transparent 70%
          );
          transform: translate3d(-125%,0,0) skewX(-16deg);
          animation: rr-profile-shine 7s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes rr-profile-shine {
          0%, 65% {
            transform: translate3d(-125%,0,0) skewX(-16deg);
          }
          82%, 100% {
            transform: translate3d(140%,0,0) skewX(-16deg);
          }
        }

        .rr-avatar {
          position: relative;
          overflow: hidden;
          transform: translate3d(0,0,0);
          transition: transform 180ms cubic-bezier(.22,1,.36,1);
        }

        .rr-profile:hover .rr-avatar {
          transform: scale(1.035);
        }

        .rr-avatar::after {
          content: "";
          position: absolute;
          width: 34px;
          height: 34px;
          left: -22px;
          top: -22px;
          border-radius: 9999px;
          background: rgba(255,255,255,.45);
          pointer-events: none;
        }

        .rr-status-ring {
          animation: rr-status 2.8s ease-in-out infinite;
        }

        @keyframes rr-status {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(37,99,235,.18);
          }
          50% {
            box-shadow: 0 0 0 5px rgba(37,99,235,0);
          }
        }

        .rr-get-started {
          position: relative;
          overflow: hidden;
          transform: translate3d(0,0,0);
          background: linear-gradient(
            105deg,
            #2563eb,
            #4f46e5,
            #7c3aed,
            #ec4899
          );
          background-size: 220% 100%;
          animation: rr-cta-gradient 8s ease-in-out infinite;
          transition:
            transform 180ms cubic-bezier(.22,1,.36,1),
            box-shadow 180ms ease;
        }

        .rr-get-started::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 15%,
            rgba(255,255,255,.24) 48%,
            transparent 68%
          );
          transform: translate3d(-130%,0,0);
          animation: rr-cta-shine 5.5s ease-in-out infinite;
          pointer-events: none;
        }

        .rr-get-started:hover {
          transform: translate3d(0,-1px,0) scale(1.018);
          box-shadow:
            0 10px 28px rgba(79,70,229,.22),
            0 0 18px rgba(236,72,153,.10);
        }

        @keyframes rr-cta-gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes rr-cta-shine {
          0%, 60% {
            transform: translate3d(-130%,0,0);
          }
          78%, 100% {
            transform: translate3d(130%,0,0);
          }
        }

        .rr-sparkle {
          animation: rr-sparkle 4s ease-in-out infinite;
        }

        @keyframes rr-sparkle {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(12deg) scale(1.08);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .rr-navbar-glow,
          .rr-navbar-spectrum,
          .rr-brand-ai,
          .rr-profile::before,
          .rr-status-ring,
          .rr-get-started,
          .rr-get-started::before,
          .rr-sparkle {
            animation: none !important;
          }

          .rr-nav-control,
          .rr-brand-icon,
          .rr-avatar {
            transition: none !important;
          }

          .rr-nav-control:hover,
          .rr-brand-link:hover .rr-brand-icon,
          .rr-get-started:hover {
            transform: none;
          }
        }
      `}</style>

      <header
        className={`
          rr-navbar fixed left-0 right-0 top-0 z-50
          flex h-16 w-full items-center
          border-b px-3 sm:px-8
          transition-[background-color,box-shadow,border-color] duration-300
          ${scrolled
            ? 'border-slate-200/80 bg-white/88 shadow-[0_8px_30px_rgba(15,23,42,0.09)]'
            : 'border-white/70 bg-white/78 shadow-[0_4px_25px_rgba(59,130,246,0.08)]'}
          backdrop-blur-2xl
          antialiased
        `}
      >
        {/* Animated multicolor top rim */}
        <div className="rr-navbar-spectrum" />

        {/* Background atmosphere */}
        <span className="rr-navbar-glow rr-navbar-glow-blue" aria-hidden="true" />
        <span className="rr-navbar-glow rr-navbar-glow-pink" aria-hidden="true" />
        <span className="rr-navbar-glow rr-navbar-glow-cyan" aria-hidden="true" />
        <span className="rr-navbar-bottom-glow" aria-hidden="true" />

        <div className="rr-navbar-content w-full">
          {/* Left: mobile toggle + brand */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3.5">
            {isAuthenticated && (
              <button
                type="button"
                onClick={toggleSidebar}
                aria-label="Toggle Navigation Sidebar"
                className="
                  rr-nav-control flex h-9 w-9 shrink-0 items-center justify-center
                  rounded-xl border border-slate-200/90 bg-white/85
                  text-slate-700 shadow-sm
                  hover:border-blue-300 hover:bg-blue-50/70 hover:text-blue-600
                  lg:hidden cursor-pointer
                "
              >
                <Menu className="h-4 w-4" strokeWidth={2.3} />
              </button>
            )}

            <Link
              to="/"
              title="RankResume AI Home"
              className="rr-brand-link group flex min-w-0 items-center gap-2 sm:gap-3"
            >
              <div
                className="
                  rr-brand-icon flex h-8 w-8 shrink-0 items-center justify-center
                  rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600
                  via-indigo-600 to-pink-500 p-1.5
                  shadow-[0_6px_18px_rgba(37,99,235,.22)]
                "
              >
                <img
                  src={geminiLogo}
                  alt="RankResume AI Logo"
                  className="h-full w-full object-contain brightness-110"
                />
              </div>

              <div className="flex min-w-0 select-none flex-col">
                <span className="flex items-center gap-1 text-xs font-black leading-none tracking-tight text-slate-950 sm:text-base">
                  <span className="truncate">RankResume</span>
                  <span className="rr-brand-ai">AI</span>
                </span>

                <span className="
                  mt-0.5 hidden text-[9px] font-black uppercase
                  tracking-[0.18em] text-blue-600 sm:inline
                ">
                  Neural ATS
                </span>
              </div>
            </Link>
          </div>

          {/* ATS navigation */}
          <div className="ml-auto mr-2 hidden sm:flex items-center">
            <Link
              to="/ats"
              title="Open ATS"
              className="
                rr-nav-control group inline-flex items-center gap-2
                rounded-xl border border-blue-200/80
                bg-white/85 px-3.5 py-2
                text-xs font-black text-slate-700
                shadow-sm backdrop-blur-md
                hover:border-pink-300
                hover:bg-gradient-to-r hover:from-blue-50 hover:to-pink-50
                hover:text-blue-700
                hover:shadow-[0_8px_24px_rgba(59,130,246,.14)]
              "
            >
              <span
                className="
                  flex h-6 w-6 items-center justify-center rounded-lg
                  bg-gradient-to-br from-blue-600 via-violet-600 to-pink-500
                  text-white shadow-sm
                  transition-transform duration-200
                  group-hover:scale-105
                "
              >
                <ScanSearch className="h-3.5 w-3.5" strokeWidth={2.4} />
              </span>

              <span>ATS</span>

              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </Link>
          </div>

          {/* Right */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            {isAuthenticated ? (
              <Link
                to="/profile"
                title="View Account Profile"
                className="
                  rr-nav-control rr-profile group relative flex items-center
                  gap-1.5 rounded-xl border border-slate-200/90
                  bg-white/82 p-1 shadow-sm backdrop-blur-md
                  hover:border-violet-300 hover:shadow-[0_8px_25px_rgba(124,58,237,.10)]
                  sm:gap-3 sm:rounded-2xl sm:py-1.5 sm:pl-2.5 sm:pr-3.5
                "
              >
                {/* Avatar */}
                <div
                  className="
                    rr-avatar relative flex h-8 w-8 shrink-0 items-center
                    justify-center rounded-lg bg-gradient-to-tr
                    from-cyan-500 via-blue-600 via-violet-600 to-pink-500
                    p-[1.5px] shadow-sm sm:rounded-xl
                  "
                >
                  <div className="
                    flex h-full w-full items-center justify-center
                    rounded-[7px] bg-white font-mono text-[11px]
                    font-black tracking-wider text-slate-900 sm:rounded-[10px]
                  ">
                    {getInitials(user?.name)}
                  </div>

                  {/* Live status */}
                  <span className="rr-status-ring absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 rounded-full">
                    <span
                      className={`
                        absolute inset-0 rounded-full opacity-70
                        ${isRecruiter ? 'bg-pink-500' : 'bg-blue-500'}
                      `}
                    />
                    <span
                      className={`
                        relative h-2.5 w-2.5 rounded-full border-2 border-white
                        ${isRecruiter ? 'bg-pink-600' : 'bg-blue-600'}
                      `}
                    />
                  </span>
                </div>

                {/* Mobile */}
                <div className="
                  flex items-center pr-1 text-slate-600
                  transition-colors group-hover:text-violet-600 sm:hidden
                ">
                  <UserIcon className="h-3.5 w-3.5" strokeWidth={2.2} />
                </div>

                {/* Desktop metadata */}
                <div className="hidden flex-col text-left sm:flex">
                  <div className="flex items-center gap-1.5">
                    <span className="
                      max-w-[120px] truncate text-xs font-black tracking-tight
                      text-slate-950 transition-colors group-hover:text-violet-700
                      md:max-w-[160px]
                    ">
                      {user?.name || 'Candidate'}
                    </span>
                    <span
                      className={`
                        h-1.5 w-1.5 rounded-full
                        ${isRecruiter ? 'bg-pink-500' : 'bg-blue-500'}
                      `}
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isRecruiter ? (
                      <span className="
                        inline-flex items-center gap-1 font-mono text-[10px]
                        font-black uppercase tracking-wider text-pink-700
                      ">
                        <ShieldCheck
                          className="h-3 w-3 text-pink-600"
                          strokeWidth={2.5}
                        />
                        Recruiter Hub
                      </span>
                    ) : (
                      <span className="
                        inline-flex items-center gap-1 font-mono text-[10px]
                        font-black uppercase tracking-wider text-blue-700
                      ">
                        <Sparkles
                          className="h-3 w-3 text-blue-600"
                          strokeWidth={2.3}
                        />
                        Pro Candidate
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-3">
                <Link
                  to="/login"
                  className="
                    rr-nav-control rounded-xl px-2.5 py-1.5
                    text-xs font-bold text-slate-700
                    hover:bg-slate-100/80 hover:text-slate-950 sm:px-4 sm:py-2
                  "
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="
                    rr-get-started group inline-flex items-center gap-1.5
                    rounded-xl px-3 py-1.5 text-xs font-extrabold text-white
                    shadow-[0_7px_20px_rgba(37,99,235,.20)]
                    active:scale-95 sm:px-4 sm:py-2
                  "
                >
                  <Sparkles
                    className="rr-sparkle h-3.5 w-3.5 text-white"
                    strokeWidth={2.2}
                  />

                  <span className="hidden xs:inline">Get Started</span>
                  <span className="xs:hidden">Join</span>

                  <ArrowRight
                    className="
                      h-3.5 w-3.5 stroke-[2.5]
                      transition-transform duration-200
                      group-hover:translate-x-0.5
                    "
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
