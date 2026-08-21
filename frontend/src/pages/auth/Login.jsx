import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAuthContext } from '../../context/AuthContext';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  Loader2, 
  ShieldCheck, 
  UserCheck,
  CheckCircle2
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isRecruiter } = useAuthContext();
  const { login, isLoggingIn, loginError } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(isRecruiter ? '/recruiter/dashboard' : '/jobs', { replace: true });
    }
  }, [isAuthenticated, isRecruiter, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleQuickFill = (role) => {
    if (role === 'recruiter') {
      setFormData({
        email: 'recruiter@rankresume.ai',
        password: 'Password123!',
      });
    } else {
      setFormData({
        email: 'candidate@rankresume.ai',
        password: 'Password123!',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
    } catch {
      // Error handled via useAuth state
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-zinc-950 px-4 py-12 selection:bg-indigo-500 selection:text-white">
      {/* Ambient Background Elements */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-600/15 via-violet-600/10 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-violet-600/15 via-indigo-600/10 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Card Container */}
      <div className="relative z-10 w-full max-w-[440px]">
        <div className="relative rounded-3xl border border-zinc-800/80 bg-zinc-900/60 p-7 sm:p-9 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-zinc-700/80 hover:shadow-indigo-500/5">
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

          {/* Header & Clickable Logo */}
          <div className="flex flex-col items-center text-center">
            <Link
              to="/"
              className="group relative flex h-13 w-13 items-center justify-center rounded-2xl border border-indigo-500/20 bg-gradient-to-tr from-indigo-500/10 via-zinc-900 to-violet-500/10 p-3 shadow-lg shadow-indigo-500/10 transition-transform duration-200 hover:scale-105"
              title="Return to Landing Page"
            >
              <Sparkles className="h-6 w-6 text-indigo-400 transition-transform duration-300 group-hover:scale-110" />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-indigo-500 ring-2 ring-zinc-950" />
              </span>
            </Link>

            <h1 className="mt-5 text-xl font-bold tracking-tight text-zinc-100 sm:text-2xl">
              Welcome back
            </h1>
            <p className="mt-1.5 text-xs text-zinc-400">
              Log in to your <Link to="/" className="font-semibold text-zinc-200 hover:text-indigo-300 transition-colors">RankResume AI</Link> workspace
            </p>
          </div>

          {/* Quick Demo Fill Matrix */}
          <div className="mt-6 flex flex-col gap-2 rounded-2xl border border-zinc-800/70 bg-zinc-950/60 p-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Demo Accounts
              </span>
              <span className="flex items-center gap-1 text-[10px] text-zinc-500">
                <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" /> 1-Click
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('recruiter')}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 px-2.5 py-1.5 text-[11px] font-medium text-zinc-300 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-300 active:scale-95 cursor-pointer"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
                Recruiter
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('candidate')}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 px-2.5 py-1.5 text-[11px] font-medium text-zinc-300 transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300 active:scale-95 cursor-pointer"
              >
                <UserCheck className="h-3.5 w-3.5 text-violet-400" />
                Candidate
              </button>
            </div>
          </div>

          {/* Error Alert Box */}
          {loginError && (
            <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-rose-500/25 bg-rose-500/10 p-3 text-xs text-rose-300 backdrop-blur-md">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-950/70 pl-10 pr-4 text-xs font-medium text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-indigo-500/60 focus:bg-zinc-950 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-medium text-indigo-400 transition hover:text-indigo-300"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-950/70 pl-10 pr-10 text-xs font-medium text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-indigo-500/60 focus:bg-zinc-950 focus:ring-2 focus:ring-indigo-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-zinc-500 transition hover:text-zinc-300 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="group relative mt-2 flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 font-medium text-xs text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Platform</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-zinc-800/80 pt-4 text-center">
            <p className="text-xs text-zinc-400">
              Don't have an account yet?{' '}
              <Link
                to="/register"
                className="font-semibold text-indigo-400 underline-offset-4 transition hover:text-indigo-300 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;