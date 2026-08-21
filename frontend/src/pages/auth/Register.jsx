import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  Sparkles, 
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
  Check
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

  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'bg-zinc-800' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-500' };
    if (score === 3) return { score: 3, label: 'Good', color: 'bg-indigo-500' };
    return { score: 4, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(formData.password);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-zinc-950 px-4 py-12 selection:bg-indigo-500 selection:text-white">
      {/* Ambient Background Elements */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-600/15 via-violet-600/10 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-violet-600/15 via-indigo-600/10 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Main Container Card */}
      <div className="relative z-10 w-full max-w-[480px]">
        <div className="relative rounded-3xl border border-zinc-800/80 bg-zinc-900/60 p-7 sm:p-9 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-zinc-700/80 hover:shadow-indigo-500/5">
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

          {/* Header & Clickable Logo */}
          <div className="flex flex-col items-center text-center">
            <Link
              to="/"
              className="group relative flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-500/20 bg-gradient-to-tr from-indigo-500/10 via-zinc-900 to-violet-500/10 p-2.5 shadow-lg shadow-indigo-500/10 transition-transform duration-200 hover:scale-105"
              title="Return to Landing Page"
            >
              <Sparkles className="h-5 w-5 text-indigo-400 transition-transform duration-300 group-hover:scale-110" />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-indigo-500 ring-2 ring-zinc-950" />
              </span>
            </Link>

            <h1 className="mt-4 text-xl font-bold tracking-tight text-zinc-100 sm:text-2xl">
              Create your account
            </h1>
            <p className="mt-1 text-xs text-zinc-400">
              Start ranking and matching resumes with <Link to="/" className="font-semibold text-zinc-200 hover:text-indigo-300 transition-colors">RankResume AI</Link>
            </p>
          </div>

          {/* Error Message */}
          {registerError && (
            <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-rose-500/25 bg-rose-500/10 p-3 text-xs text-rose-300 backdrop-blur-md">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{registerError}</span>
            </div>
          )}

          {/* Account Role Selector Cards */}
          <div className="mt-6 space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              I am joining as a
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleRoleSelect('candidate')}
                className={`group relative flex flex-col items-start rounded-2xl border p-3 text-left transition-all duration-200 cursor-pointer ${
                  formData.role === 'candidate'
                    ? 'border-indigo-500/80 bg-indigo-500/10 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                    : 'border-zinc-800/80 bg-zinc-950/40 hover:border-zinc-700 hover:bg-zinc-950/70'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-xl border ${
                    formData.role === 'candidate'
                      ? 'border-indigo-500/40 bg-indigo-500/20 text-indigo-300'
                      : 'border-zinc-800 bg-zinc-900 text-zinc-400'
                  }`}>
                    <UserCheck className="h-4 w-4" />
                  </div>
                  {formData.role === 'candidate' && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-white">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="mt-2">
                  <p className={`text-xs font-semibold ${formData.role === 'candidate' ? 'text-indigo-200' : 'text-zinc-200'}`}>
                    Candidate
                  </p>
                  <p className="text-[10px] text-zinc-400">Apply & parse CV</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('recruiter')}
                className={`group relative flex flex-col items-start rounded-2xl border p-3 text-left transition-all duration-200 cursor-pointer ${
                  formData.role === 'recruiter'
                    ? 'border-indigo-500/80 bg-indigo-500/10 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                    : 'border-zinc-800/80 bg-zinc-950/40 hover:border-zinc-700 hover:bg-zinc-950/70'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-xl border ${
                    formData.role === 'recruiter'
                      ? 'border-indigo-500/40 bg-indigo-500/20 text-indigo-300'
                      : 'border-zinc-800 bg-zinc-900 text-zinc-400'
                  }`}>
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  {formData.role === 'recruiter' && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-white">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="mt-2">
                  <p className={`text-xs font-semibold ${formData.role === 'recruiter' ? 'text-indigo-200' : 'text-zinc-200'}`}>
                    Recruiter
                  </p>
                  <p className="text-[10px] text-zinc-400">Post jobs & review</p>
                </div>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Full Name
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Mercer"
                  className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-950/70 pl-10 pr-4 text-xs font-medium text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-indigo-500/60 focus:bg-zinc-950 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

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
                  className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-950/70 pl-10 pr-4 text-xs font-medium text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-indigo-500/60 focus:bg-zinc-950 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-950/70 pl-10 pr-10 text-xs font-medium text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-indigo-500/60 focus:bg-zinc-950 focus:ring-2 focus:ring-indigo-500/20"
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

              {formData.password && (
                <div className="space-y-1 pt-1">
                  <div className="flex h-1 w-full gap-1 overflow-hidden rounded-full bg-zinc-800">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-full flex-1 rounded-full transition-all duration-300 ${
                          step <= strength.score ? strength.color : 'bg-zinc-800'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-zinc-500">
                    <span>Password strength</span>
                    <span className="font-semibold text-zinc-300">{strength.label}</span>
                  </div>
                </div>
              )}
            </div>

            <p className="text-[11px] leading-relaxed text-zinc-500">
              By creating an account, you agree to our{' '}
              <a href="#terms" className="text-zinc-400 underline underline-offset-2 hover:text-zinc-200">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#privacy" className="text-zinc-400 underline underline-offset-2 hover:text-zinc-200">
                Privacy Policy
              </a>.
            </p>

            <button
              type="submit"
              disabled={isRegistering}
              className="group relative mt-2 flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 font-medium text-xs text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
              {isRegistering ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 border-t border-zinc-800/80 pt-4 text-center">
            <p className="text-xs text-zinc-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-indigo-400 underline-offset-4 transition hover:text-indigo-300 hover:underline"
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