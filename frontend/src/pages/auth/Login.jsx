// frontend/src/pages/auth/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useAuthContext } from '../../context/AuthContext';
import geminiLogo from '../../assets/gemini-svg.svg';
import ForgotPasswordModal from '../../components/common/ForgotPasswordModal';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  ArrowLeft
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
  const [showForgotModal, setShowForgotModal] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
    } catch {
      // Handled via useAuth state
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-slate-50 px-4 py-12 text-slate-900 antialiased selection:bg-cyan-500/20 selection:text-slate-900 font-sans">
      
      {/* Universal Pearlescent Aurora Backdrop */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0]" />
        <div className="absolute -top-40 left-[10%] h-[550px] w-[550px] rounded-full bg-cyan-400/20 blur-[130px]" />
        <div className="absolute top-[20%] right-[-5%] h-[600px] w-[600px] rounded-full bg-indigo-500/15 blur-[150px]" />
        <div className="absolute bottom-[10%] left-[20%] h-[650px] w-[650px] rounded-full bg-violet-400/15 blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Return to Landing Page */}
      <Link 
        to="/" 
        className="fixed top-6 left-6 z-20 hidden sm:inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:text-slate-900 hover:shadow-md"
      >
        <ArrowLeft className="h-4 w-4 text-indigo-600 stroke-[2.2]" />
        <span>Back to Home</span>
      </Link>

      {/* Login Card Container */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[430px]"
      >
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 p-7 sm:p-9 shadow-[0_20px_55px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          
          {/* Top Rainbow Accent Strip */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500" />

          {/* Header */}
          <div className="relative flex flex-col items-center text-center">
            <Link
              to="/"
              className="group flex items-center justify-center transition-transform duration-300 hover:scale-105"
              title="Return to Landing Page"
            >
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-2.5 shadow-sm">
                <img 
                  src={geminiLogo} 
                  alt="RankResume AI" 
                  className="h-full w-full object-contain" 
                />
              </div>
            </Link>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Welcome back
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-500 font-medium">
              Access your{' '}
              <span className="font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                RankResume AI
              </span>{' '}
              workspace
            </p>
          </div>

          {/* Error Banner */}
          {loginError && (
            <motion.div 
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mt-5 flex items-center gap-2.5 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-800 shadow-sm"
            >
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 stroke-[2.2]" />
              <span>{loginError}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative mt-6 space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Mail className="h-4 w-4 stroke-[2]" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 pl-10 text-xs font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-800 cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Lock className="h-4 w-4 stroke-[2]" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 pl-10 pr-10 text-xs font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 transition hover:text-slate-700 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4 stroke-[2]" /> : <Eye className="h-4 w-4 stroke-[2]" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="group relative mt-2 flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 font-bold text-xs text-white shadow-[0_4px_16px_rgba(99,102,241,0.25)] transition-all hover:shadow-[0_6px_22px_rgba(99,102,241,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-cyan-200" />
                  <span>Sign In to Platform</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Register */}
          <div className="relative mt-6 border-t border-slate-100 pt-4 text-center">
            <p className="text-xs font-medium text-slate-500">
              Don't have an account yet?{' '}
              <Link
                to="/register"
                className="font-bold text-indigo-600 underline-offset-4 transition hover:text-indigo-800 hover:underline ml-1"
              >
                Sign up
              </Link>
            </p>
          </div>

        </div>
      </motion.div>

      {/* Integrated Forgot Password Modal */}
      <ForgotPasswordModal 
        isOpen={showForgotModal} 
        onClose={() => setShowForgotModal(false)} 
      />
    </div>
  );
};

export default Login;