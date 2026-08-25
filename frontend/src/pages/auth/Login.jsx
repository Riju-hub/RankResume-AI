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
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-gradient-to-br from-blue-100 via-pink-100 to-indigo-100 px-4 py-12 text-slate-900 selection:bg-pink-500 selection:text-white antialiased">
      
      {/* --- Ambient Dynamic Mesh Glows --- */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-28 -left-20 h-[520px] w-[520px] rounded-full bg-blue-400/25 blur-3xl" />
        <div className="absolute -bottom-28 -right-20 h-[560px] w-[560px] rounded-full bg-pink-400/25 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[600px] rounded-full bg-indigo-300/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-15" />
      </div>

      <div className="relative z-10 w-full max-w-[440px]">
        {/* Card Container */}
        <div className="rounded-3xl border border-white/80 bg-white/75 p-7 sm:p-9 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl">
          
          {/* Header & Logo */}
          <div className="flex flex-col items-center text-center">
            <Link
              to="/"
              className="group flex items-center justify-center transition-transform duration-200 hover:scale-105"
              title="Return to Landing Page"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-pink-500 p-2.5 shadow-md shadow-pink-500/20">
                <img 
                  src={geminiLogo} 
                  alt="RankResume AI" 
                  className="h-full w-full object-contain" 
                />
              </div>
            </Link>

            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900">
              Welcome back
            </h1>
            <p className="mt-1.5 text-xs text-slate-600">
              Log in to your{' '}
              <Link to="/" className="font-bold text-slate-800 hover:text-pink-600 transition-colors">
                RankResume AI
              </Link>{' '}
              workspace
            </p>
          </div>

          {/* Demo Accounts Quick-Fill Box */}
          <div className="mt-6 flex flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white/60 p-3 shadow-xs">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                Demo Accounts
              </span>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                <CheckCircle2 className="h-3 w-3" /> 1-Click Auto Fill
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('recruiter')}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-pink-200/80 bg-pink-50/60 px-3 py-2 text-[11px] font-bold text-pink-700 transition-all hover:bg-pink-100 hover:text-pink-800 active:scale-95 cursor-pointer"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-pink-600" />
                Recruiter
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('candidate')}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-blue-200/80 bg-blue-50/60 px-3 py-2 text-[11px] font-bold text-blue-700 transition-all hover:bg-blue-100 hover:text-blue-800 active:scale-95 cursor-pointer"
              >
                <UserCheck className="h-3.5 w-3.5 text-blue-600" />
                Candidate
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {loginError && (
            <div className="mt-4 flex items-center gap-2.5 rounded-2xl border border-rose-200 bg-rose-50/90 p-3 text-xs font-medium text-rose-700">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="h-11 w-full rounded-xl border border-slate-200/80 bg-white px-3.5 pl-10 text-xs font-medium text-slate-800 placeholder-slate-400 shadow-xs outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-semibold text-blue-600 transition hover:text-pink-600"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="h-11 w-full rounded-xl border border-slate-200/80 bg-white px-3.5 pl-10 pr-10 text-xs font-medium text-slate-800 placeholder-slate-400 shadow-xs outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 transition hover:text-slate-600 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="group relative mt-2 flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 font-bold text-xs text-white shadow-lg shadow-pink-500/20 transition-all hover:opacity-95 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
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

          {/* Sign Up Link */}
          <div className="mt-6 border-t border-slate-200/60 pt-4 text-center">
            <p className="text-xs text-slate-600">
              Don't have an account yet?{' '}
              <Link
                to="/register"
                className="font-bold text-blue-600 underline-offset-4 transition hover:text-pink-600 hover:underline"
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