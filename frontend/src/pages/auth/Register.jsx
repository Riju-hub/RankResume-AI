import React, { useState } from 'react';
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
  Sparkles
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
    if (!pass) return { score: 0, label: '', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-500' };
    if (score === 3) return { score: 3, label: 'Good', color: 'bg-blue-500' };
    return { score: 4, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(formData.password);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-gradient-to-br from-blue-100 via-pink-100 to-indigo-100 px-4 py-12 text-slate-900 selection:bg-pink-500 selection:text-white antialiased">
      
      {/* --- Blue & Pink Ambient Dynamic Mesh Glows --- */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-28 -left-20 h-[520px] w-[520px] rounded-full bg-blue-400/25 blur-3xl" />
        <div className="absolute -bottom-28 -right-20 h-[560px] w-[560px] rounded-full bg-pink-400/25 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[600px] rounded-full bg-indigo-300/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-15" />
      </div>

      <div className="relative z-10 w-full max-w-[460px]">
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
              Create your account
            </h1>
            <p className="mt-1.5 text-xs text-slate-600">
              Start ranking and matching resumes with{' '}
              <Link to="/" className="font-bold text-slate-800 hover:text-pink-600 transition-colors">
                RankResume AI
              </Link>
            </p>
          </div>

          {/* Error Banner */}
          {registerError && (
            <div className="mt-5 flex items-center gap-2.5 rounded-2xl border border-rose-200 bg-rose-50/90 p-3 text-xs font-medium text-rose-700">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
              <span>{registerError}</span>
            </div>
          )}

          {/* Role Selection */}
          <div className="mt-6 space-y-2">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              I am joining as a
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Candidate Button */}
              <button
                type="button"
                onClick={() => handleRoleSelect('candidate')}
                className={`group relative flex flex-col items-start rounded-2xl border p-3.5 text-left transition-all duration-200 cursor-pointer ${
                  formData.role === 'candidate'
                    ? 'border-blue-500 bg-blue-50/80 shadow-sm shadow-blue-500/10 ring-2 ring-blue-500/20'
                    : 'border-slate-200/80 bg-white/60 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                    formData.role === 'candidate'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    <UserCheck className="h-4 w-4" />
                  </div>
                  {formData.role === 'candidate' && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="mt-2.5">
                  <p className={`text-xs font-bold ${formData.role === 'candidate' ? 'text-blue-900' : 'text-slate-800'}`}>
                    Candidate
                  </p>
                  <p className="text-[10px] text-slate-500">Apply & parse CV</p>
                </div>
              </button>

              {/* Recruiter Button */}
              <button
                type="button"
                onClick={() => handleRoleSelect('recruiter')}
                className={`group relative flex flex-col items-start rounded-2xl border p-3.5 text-left transition-all duration-200 cursor-pointer ${
                  formData.role === 'recruiter'
                    ? 'border-pink-500 bg-pink-50/80 shadow-sm shadow-pink-500/10 ring-2 ring-pink-500/20'
                    : 'border-slate-200/80 bg-white/60 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                    formData.role === 'recruiter'
                      ? 'bg-pink-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  {formData.role === 'recruiter' && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-white">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="mt-2.5">
                  <p className={`text-xs font-bold ${formData.role === 'recruiter' ? 'text-pink-900' : 'text-slate-800'}`}>
                    Recruiter
                  </p>
                  <p className="text-[10px] text-slate-500">Post jobs & review</p>
                </div>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                Full Name
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Mercer"
                  className="h-10 w-full rounded-xl border border-slate-200/80 bg-white px-3.5 pl-10 text-xs font-medium text-slate-800 placeholder-slate-400 shadow-xs outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

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
                  className="h-10 w-full rounded-xl border border-slate-200/80 bg-white px-3.5 pl-10 text-xs font-medium text-slate-800 placeholder-slate-400 shadow-xs outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
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
                  className="h-10 w-full rounded-xl border border-slate-200/80 bg-white px-3.5 pl-10 pr-10 text-xs font-medium text-slate-800 placeholder-slate-400 shadow-xs outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-1 pt-1">
                  <div className="flex h-1.5 w-full gap-1 overflow-hidden rounded-full bg-slate-200">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-full flex-1 rounded-full transition-all duration-300 ${
                          step <= strength.score ? strength.color : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Strength</span>
                    <span className="font-bold text-slate-700">{strength.label}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Terms text */}
            <p className="text-[11px] leading-relaxed text-slate-500">
              By creating an account, you agree to our{' '}
              <a href="#terms" className="font-semibold text-slate-700 underline underline-offset-2 hover:text-blue-600">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#privacy" className="font-semibold text-slate-700 underline underline-offset-2 hover:text-blue-600">
                Privacy Policy
              </a>.
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isRegistering}
              className="group relative mt-2 flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 font-bold text-xs text-white shadow-lg shadow-pink-500/20 transition-all hover:opacity-95 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
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

          {/* Sign In Link */}
          <div className="mt-5 border-t border-slate-200/60 pt-4 text-center">
            <p className="text-xs text-slate-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-blue-600 underline-offset-4 transition hover:text-pink-600 hover:underline"
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