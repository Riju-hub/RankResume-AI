import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAuthContext } from '../../context/AuthContext';
import geminiLogo from '../../assets/gemini-svg.svg';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  Loader2, 
  ShieldCheck, 
  UserCheck,
  CheckCircle2,
  Sparkles,
  Zap
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
  const [activeDemoRole, setActiveDemoRole] = useState(null);

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
    setActiveDemoRole(role);
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
      // Handled via useAuth state
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-slate-950 px-4 py-12 text-slate-100 selection:bg-pink-500 selection:text-white antialiased font-sans">
      
      {/* ========================================================================= */}
      {/* --- Ambient Glowing Mesh (Hardware Accelerated) --- */}
      {/* ========================================================================= */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu">
        <div className="absolute -top-32 -left-20 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[120px] will-change-transform" />
        <div className="absolute -bottom-32 -right-20 h-[520px] w-[520px] rounded-full bg-pink-600/15 blur-[130px] will-change-transform" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[550px] rounded-full bg-indigo-600/10 blur-[140px] will-change-transform" />
        
        {/* Dynamic Vector Matrix Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      {/* ========================================================================= */}
      {/* --- Login Glass Container --- */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-[440px]">
        <div className="relative rounded-3xl border border-slate-800 bg-slate-900/80 p-7 sm:p-9 shadow-2xl backdrop-blur-2xl">
          
          {/* Subtle Ambient Border Glow */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-blue-500/20 via-pink-500/20 to-purple-500/20 opacity-40 blur-sm pointer-events-none" />

          {/* Header & Logo */}
          <div className="relative flex flex-col items-center text-center">
            <Link
              to="/"
              className="group flex items-center justify-center transition-transform duration-300 hover:scale-105"
              title="Return to Landing Page"
            >
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-pink-500 p-2.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-pink-500/30 transition-all">
                <img 
                  src={geminiLogo} 
                  alt="RankResume AI" 
                  className="h-full w-full object-contain" 
                />
              </div>
            </Link>

            <h1 className="mt-4 text-2xl font-black tracking-tight text-white">
              Welcome back
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              Access your{' '}
              <span className="font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
                RankResume AI
              </span>{' '}
              workspace
            </p>
          </div>

          {/* 1-Click Demo Accounts Box */}
          <div className="relative mt-6 flex flex-col gap-2.5 rounded-2xl border border-slate-800/90 bg-slate-950/60 p-3.5 shadow-inner">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-pink-400" /> Demo Accounts
              </span>
              <span className="flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-400">
                <CheckCircle2 className="h-3 w-3" /> 1-Click Auto Fill
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('recruiter')}
                className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-[11px] font-bold transition-all cursor-pointer ${
                  activeDemoRole === 'recruiter'
                    ? 'border-pink-500/60 bg-pink-950/50 text-pink-300 shadow-md shadow-pink-500/10'
                    : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-pink-500/40 hover:text-pink-300'
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5 text-pink-400" />
                Recruiter
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('candidate')}
                className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-[11px] font-bold transition-all cursor-pointer ${
                  activeDemoRole === 'candidate'
                    ? 'border-cyan-500/60 bg-cyan-950/50 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300'
                }`}
              >
                <UserCheck className="h-3.5 w-3.5 text-cyan-400" />
                Candidate
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {loginError && (
            <div className="relative mt-4 flex items-center gap-2.5 rounded-2xl border border-rose-500/30 bg-rose-950/40 p-3 text-xs font-medium text-rose-300 backdrop-blur-md">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative mt-5 space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="h-11 w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 pl-10 text-xs font-medium text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-semibold text-cyan-400 transition hover:text-pink-400"
                >
                  Forgot?
                </Link>
              </div>
              
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="h-11 w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 pl-10 pr-10 text-xs font-medium text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500 transition hover:text-slate-300 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="group relative mt-2 flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 font-bold text-xs text-white shadow-xl shadow-indigo-600/20 transition-all hover:scale-[1.01] hover:shadow-indigo-600/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Zap className="h-3.5 w-3.5" />
                  <span>Sign In to Platform</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          {/* Footer / Switch to Register */}
          <div className="relative mt-6 border-t border-slate-800/80 pt-4 text-center">
            <p className="text-xs text-slate-400">
              Don't have an account yet?{' '}
              <Link
                to="/register"
                className="font-bold text-cyan-400 underline-offset-4 transition hover:text-pink-400 hover:underline"
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