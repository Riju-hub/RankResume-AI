import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import geminiLogo from '../../assets/gemini-svg.svg';
import { 
  LogOut, 
  Menu, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

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
      .trim()
      .split(/\s+/)
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-4 sm:px-8 backdrop-blur-xl transition-all font-sans">
      {/* Left: Brand Logo & Mobile Sidebar Toggle */}
      <div className="flex items-center gap-3.5">
        {isAuthenticated && (
          <button
            type="button"
            onClick={toggleSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 transition-all hover:border-slate-700 hover:bg-slate-800 hover:text-white lg:hidden cursor-pointer active:scale-95"
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="h-4 w-4" />
          </button>
        )}

        <Link to="/" className="group flex items-center gap-3" title="RankResume AI Home">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-pink-500 p-1.5 shadow-md shadow-indigo-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-pink-500/30">
            <img 
              src={geminiLogo} 
              alt="RankResume AI Logo" 
              className="h-full w-full object-contain" 
            />
          </div>
          
          <div className="flex flex-col select-none">
            <span className="text-sm font-black tracking-tight text-white sm:text-base flex items-center gap-1 leading-none">
              RankResume{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
                AI
              </span>
            </span>
            <span className="text-[9px] font-mono tracking-widest uppercase text-slate-500 mt-0.5">
              Neural ATS
            </span>
          </div>
        </Link>
      </div>

      {/* Right: Authenticated Profile or Guest Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-3 sm:gap-4">
            {/* User Profile Info */}
            <div className="flex items-center gap-3 border-r border-slate-800/90 pr-3 sm:pr-4">
              <div className="hidden text-right sm:block">
                <p className="text-xs font-bold text-white leading-tight">
                  {user?.name || 'Authorized User'}
                </p>
                <div className="mt-0.5 flex items-center justify-end gap-1.5">
                  {isRecruiter ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-pink-500/30 bg-pink-950/40 px-2 py-0.5 font-mono text-[10px] font-bold text-pink-300">
                      <ShieldCheck className="h-3 w-3 text-pink-400" />
                      Recruiter
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
                      <UserCheck className="h-3 w-3 text-cyan-400" />
                      Candidate
                    </span>
                  )}
                </div>
              </div>

              {/* Avatar with Status Pip */}
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 font-mono text-xs font-bold text-white shadow-inner">
                {getInitials(user?.name)}
                <span
                  className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 ${
                    isRecruiter ? 'bg-pink-500 ring-1 ring-pink-400/40' : 'bg-cyan-400 ring-1 ring-cyan-400/40'
                  }`}
                  title="Active Session"
                />
              </div>
            </div>

            {/* Logout Action */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3 text-xs font-semibold text-slate-300 transition-all hover:border-rose-500/40 hover:bg-rose-950/30 hover:text-rose-300 active:scale-95 cursor-pointer"
              title="Sign out of account"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-800/50 hover:text-white"
            >
              Sign In
            </Link>
            
            <Link
              to="/register"
              className="group inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] hover:shadow-indigo-600/30 active:scale-95"
            >
              <Sparkles className="h-3 w-3 text-pink-300" />
              <span>Get Started</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;