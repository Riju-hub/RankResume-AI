import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import geminiLogo from '../../assets/gemini-svg.svg';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  Loader2, 
  ShieldCheck, 
  UserCheck,
  Check,
  Sparkles,
  Zap
} from 'lucide-react';

const Register = () => {
  const { register, isRegistering, registerError } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'candidate',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
    } catch {
      // Handled via useAuth hook state
    }
  };

  const strength = useMemo(() => {
    const pass = formData.password;
    if (!pass) return { score: 0, label: '', color: 'bg-slate-800' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500', text: 'text-rose-400' };
    if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-500', text: 'text-amber-400' };
    if (score === 3) return { score: 3, label: 'Good', color: 'bg-blue-500', text: 'text-blue-400' };
    return { score: 4, label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-400' };
  }, [formData.password]);

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
      {/* --- Register Glass Container --- */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-[460px]">
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
              Create your account
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              Start ranking and matching resumes with{' '}
              <span className="font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
                RankResume AI
              </span>
            </p>
          </div>

          {/* Error Banner */}
          {registerError && (
            <div className="relative mt-5 flex items-center gap-2.5 rounded-2xl border border-rose-500/30 bg-rose-950/40 p-3 text-xs font-medium text-rose-300 backdrop-blur-md">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{registerError}</span>
            </div>
          )}

          {/* Role Selection */}
          <div className="relative mt-6 space-y-2">
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-pink-400" /> Select Workspace Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              
              {/* Candidate Button */}
              <button
                type="button"
                onClick={() => handleRoleSelect('candidate')}
                className={`group relative flex flex-col items-start rounded-2xl border p-3.5 text-left transition-all duration-200 cursor-pointer ${
                  formData.role === 'candidate'
                    ? 'border-cyan-500/60 bg-cyan-950/30 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/50'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${
                    formData.role === 'candidate'
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    <UserCheck className="h-4 w-4" />
                  </div>
                  {formData.role === 'candidate' && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-slate-950 shadow-xs">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="mt-2.5">
                  <p className={`text-xs font-bold ${formData.role === 'candidate' ? 'text-cyan-300' : 'text-slate-300'}`}>
                    Candidate
                  </p>
                  <p className="text-[10px] text-slate-400">Apply & parse CV</p>
                </div>
              </button>

              {/* Recruiter Button */}
              <button
                type="button"
                onClick={() => handleRoleSelect('recruiter')}
                className={`group relative flex flex-col items-start rounded-2xl border p-3.5 text-left transition-all duration-200 cursor-pointer ${
                  formData.role === 'recruiter'
                    ? 'border-pink-500/60 bg-pink-950/30 shadow-lg shadow-pink-500/10 ring-1 ring-pink-500/50'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${
                    formData.role === 'recruiter'
                      ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  {formData.role === 'recruiter' && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-white shadow-xs">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="mt-2.5">
                  <p className={`text-xs font-bold ${formData.role === 'recruiter' ? 'text-pink-300' : 'text-slate-300'}`}>
                    Recruiter
                  </p>
                  <p className="text-[10px] text-slate-400">Post jobs & review</p>
                </div>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative mt-5 space-y-3.5">
            
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
                Full Name
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Mercer"
                  className="h-10 w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 pl-10 text-xs font-medium text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            {/* Email Input */}
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
                  className="h-10 w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 pl-10 text-xs font-medium text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a secure password"
                  className="h-10 w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 pl-10 pr-10 text-xs font-medium text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
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

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-1 pt-1.5">
                  <div className="flex h-1.5 w-full gap-1 overflow-hidden rounded-full bg-slate-800/80">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-full flex-1 rounded-full transition-all duration-300 ${
                          step <= strength.score ? strength.color : 'bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-slate-500">Security Score</span>
                    <span className={`font-bold ${strength.text}`}>{strength.label}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Terms text */}
            <p className="text-[11px] leading-relaxed text-slate-400">
              By creating an account, you agree to our{' '}
              <a href="#terms" className="font-semibold text-cyan-400 underline underline-offset-2 hover:text-pink-400">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#privacy" className="font-semibold text-cyan-400 underline underline-offset-2 hover:text-pink-400">
                Privacy Policy
              </a>.
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isRegistering}
              className="group relative mt-2 flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 font-bold text-xs text-white shadow-xl shadow-indigo-600/20 transition-all hover:scale-[1.01] hover:shadow-indigo-600/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {isRegistering ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <Zap className="h-3.5 w-3.5" />
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="relative mt-5 border-t border-slate-800/80 pt-4 text-center">
            <p className="text-xs text-slate-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-cyan-400 underline-offset-4 transition hover:text-pink-400 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;