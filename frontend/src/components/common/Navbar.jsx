import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { Sparkles, LogOut, Menu, ShieldCheck, UserCheck } from 'lucide-react';

export const Navbar = ({ toggleSidebar }) => {
  const { user, isAuthenticated, logout, isRecruiter } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-between border-b border-zinc-800/80 bg-zinc-950/80 px-4 sm:px-8 backdrop-blur-xl transition-all">
      {/* Left: Brand & Mobile Sidebar Toggle */}
      <div className="flex items-center gap-3.5">
        {isAuthenticated && (
          <button
            onClick={toggleSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 lg:hidden"
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="h-4 w-4" />
          </button>
        )}

        <Link to="/" className="group flex items-center gap-2.5" title="Go to Home">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 shadow-md shadow-indigo-500/25 transition-transform duration-200 group-hover:scale-105">
            <Sparkles className="h-4 w-4 text-white" />
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-zinc-100 sm:text-base">
              RankResume<span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">AI</span>
            </span>
          </div>
        </Link>
      </div>

      {/* Right: Authenticated User Controls or Auth Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-3 sm:gap-4">
            {/* User Profile Overview */}
            <div className="flex items-center gap-3 border-r border-zinc-800/80 pr-3 sm:pr-4">
              <div className="hidden text-right sm:block">
                <p className="text-xs font-semibold text-zinc-200 leading-tight">
                  {user?.name || 'Authorized User'}
                </p>
                <div className="mt-0.5 flex items-center justify-end gap-1.5">
                  {isRecruiter ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                      <ShieldCheck className="h-2.5 w-2.5" />
                      Recruiter
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-400">
                      <UserCheck className="h-2.5 w-2.5" />
                      Candidate
                    </span>
                  )}
                </div>
              </div>

              {/* Avatar with Status Dot */}
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-700/60 bg-gradient-to-b from-zinc-800 to-zinc-900 font-mono text-xs font-semibold text-zinc-200 shadow-inner">
                {getInitials(user?.name)}
                <span
                  className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-zinc-950 ${
                    isRecruiter ? 'bg-emerald-500 ring-1 ring-emerald-400/40' : 'bg-indigo-500 ring-1 ring-indigo-400/40'
                  }`}
                  title="Active"
                />
              </div>
            </div>

            {/* Logout CTA */}
            <button
              onClick={handleLogout}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 text-xs font-medium text-zinc-400 transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 active:scale-95 cursor-pointer"
              title="Sign out to Home"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="rounded-lg px-3.5 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-100"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="relative inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-1.5 text-xs font-medium text-white shadow-md shadow-indigo-500/20 transition-all hover:from-indigo-500 hover:to-violet-500 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;