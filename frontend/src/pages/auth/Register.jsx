// // frontend/src/pages/auth/Register.jsx
// import React, { useState, useMemo } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuth } from '../../hooks/useAuth';
// import geminiLogo from '../../assets/gemini-svg.svg';
// import { 
//   Mail, 
//   Lock, 
//   User, 
//   Eye, 
//   EyeOff, 
//   ArrowRight, 
//   AlertCircle, 
//   Loader2, 
//   ShieldCheck, 
//   UserCheck, 
//   Check, 
//   Sparkles, 
//   Zap, 
//   ArrowLeft,
//   BellRing
// } from 'lucide-react';

// const Register = () => {
//   const { register, isRegistering, registerError } = useAuth();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'candidate',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [emailTouched, setEmailTouched] = useState(false);
//   const [isEmailFocused, setIsEmailFocused] = useState(false);

//   const isValidEmail = (email) => {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleRoleSelect = (role) => {
//     setFormData((prev) => ({ ...prev, role }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await register(formData);
//     } catch {
//       // Handled via useAuth hook state
//     }
//   };

//   const strength = useMemo(() => {
//     const pass = formData.password;
//     if (!pass) return { score: 0, label: '', color: 'bg-slate-200' };
//     let score = 0;
//     if (pass.length >= 6) score += 1;
//     if (pass.length >= 10) score += 1;
//     if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score += 1;
//     if (/[^A-Za-z0-9]/.test(pass)) score += 1;

//     if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600' };
//     if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-500', text: 'text-amber-600' };
//     if (score === 3) return { score: 3, label: 'Good', color: 'bg-blue-600', text: 'text-blue-700' };
//     return { score: 4, label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-700' };
//   }, [formData.password]);

//   return (
//     <div className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-[#f4f8ff] px-4 py-12 text-slate-900 selection:bg-pink-500 selection:text-white antialiased font-sans">
      
//       {/* Ambient Aura Mesh */}
//       <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu">
//         <div className="absolute -top-32 -left-24 h-[650px] w-[650px] rounded-full bg-gradient-to-br from-blue-500/40 via-cyan-400/30 to-indigo-500/20 blur-[130px] transform-gpu will-change-transform" />
//         <div className="absolute -top-24 -right-24 h-[680px] w-[680px] rounded-full bg-gradient-to-bl from-pink-500/45 via-fuchsia-500/35 to-rose-400/25 blur-[140px] transform-gpu will-change-transform" />
//         <div className="absolute -bottom-36 -left-28 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-sky-400/35 via-blue-600/30 to-transparent blur-[140px] transform-gpu will-change-transform" />
//         <div className="absolute -bottom-32 -right-28 h-[650px] w-[650px] rounded-full bg-gradient-to-tl from-pink-600/40 via-rose-400/30 to-transparent blur-[140px] transform-gpu will-change-transform" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.25)_1px,transparent_1px),radial-gradient(circle_at_center,rgba(236,72,153,0.2)_1px,transparent_1px)] [background-size:26px_26px] opacity-40 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,#000_70%,transparent_100%)]" />
//       </div>

//       {/* Return to Home */}
//       <Link 
//         to="/" 
//         className="fixed top-6 left-6 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/95 px-4 py-2 text-xs font-bold text-slate-800 shadow-[0_4px_15px_rgba(37,99,235,0.12)] backdrop-blur-md transition-all hover:border-pink-400 hover:text-slate-950 hover:shadow-md hover:scale-[1.02]"
//       >
//         <ArrowLeft className="h-4 w-4 text-blue-600 stroke-[2.5]" />
//         <span>Back to Home</span>
//       </Link>

//       {/* Container */}
//       <div className="relative z-10 w-full max-w-[470px]">
//         <div className="relative rounded-3xl border border-white/95 bg-white/90 p-7 sm:p-9 shadow-[0_20px_60px_rgba(37,99,235,0.16),0_10px_30px_rgba(236,72,153,0.14)] backdrop-blur-2xl transition-all duration-300">
          
//           <div className="absolute -top-px left-1/2 h-[3px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-blue-600 via-pink-500 to-indigo-600 rounded-full shadow-[0_0_12px_rgba(236,72,153,0.6)]" />

//           {/* Header */}
//           <div className="relative flex flex-col items-center text-center">
//             <Link
//               to="/"
//               className="group flex items-center justify-center transition-transform duration-300 hover:scale-105"
//               title="Return to Landing Page"
//             >
//               <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-pink-500 p-2.5 shadow-lg shadow-blue-500/30 group-hover:shadow-pink-500/40 transition-all">
//                 <img 
//                   src={geminiLogo} 
//                   alt="RankResume AI" 
//                   className="h-full w-full object-contain filter brightness-110" 
//                 />
//               </div>
//             </Link>

//             <h1 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
//               Create your account
//             </h1>
//             <p className="mt-1.5 text-xs sm:text-sm text-slate-700 font-medium">
//               Start ranking and matching resumes with{' '}
//               <span className="font-extrabold bg-gradient-to-r from-blue-700 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
//                 RankResume AI
//               </span>
//             </p>
//           </div>

//           {/* Error Banner */}
//           {registerError && (
//             <div className="relative mt-5 flex items-center gap-2.5 rounded-2xl border border-rose-300 bg-rose-50 p-3 text-xs font-bold text-rose-800 shadow-sm backdrop-blur-md">
//               <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 stroke-[2.5]" />
//               <span>{registerError}</span>
//             </div>
//           )}

//           {/* Role Selection */}
//           <div className="relative mt-6 space-y-2">
//             <label className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
//               <Sparkles className="h-3.5 w-3.5 text-pink-600" /> Select Workspace Role
//             </label>
//             <div className="grid grid-cols-2 gap-3">
              
//               {/* Candidate Option */}
//               <button
//                 type="button"
//                 onClick={() => handleRoleSelect('candidate')}
//                 className={`group relative flex flex-col items-start rounded-2xl border p-3.5 text-left transition-all duration-200 cursor-pointer ${
//                   formData.role === 'candidate'
//                     ? 'border-blue-500 bg-gradient-to-br from-blue-50 via-white to-blue-100/50 shadow-md shadow-blue-500/20 ring-2 ring-blue-500/30'
//                     : 'border-slate-300 bg-white/80 hover:border-blue-300 hover:bg-blue-50/30'
//                 }`}
//               >
//                 <div className="flex w-full items-center justify-between">
//                   <div className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${
//                     formData.role === 'candidate'
//                       ? 'bg-blue-600 text-white shadow-sm'
//                       : 'bg-slate-100 text-slate-600'
//                   }`}>
//                     <UserCheck className="h-4 w-4 stroke-[2.5]" />
//                   </div>
//                   {formData.role === 'candidate' && (
//                     <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs">
//                       <Check className="h-3 w-3 stroke-[3]" />
//                     </span>
//                   )}
//                 </div>
//                 <div className="mt-2.5">
//                   <p className={`text-xs font-bold ${formData.role === 'candidate' ? 'text-blue-900' : 'text-slate-800'}`}>
//                     Candidate
//                   </p>
//                   <p className="text-[11px] text-slate-600 font-medium">Apply & parse CV</p>
//                 </div>
//               </button>

//               {/* Recruiter Option */}
//               <button
//                 type="button"
//                 onClick={() => handleRoleSelect('recruiter')}
//                 className={`group relative flex flex-col items-start rounded-2xl border p-3.5 text-left transition-all duration-200 cursor-pointer ${
//                   formData.role === 'recruiter'
//                     ? 'border-pink-500 bg-gradient-to-br from-pink-50 via-white to-pink-100/50 shadow-md shadow-pink-500/20 ring-2 ring-pink-500/30'
//                     : 'border-slate-300 bg-white/80 hover:border-pink-300 hover:bg-pink-50/30'
//                 }`}
//               >
//                 <div className="flex w-full items-center justify-between">
//                   <div className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${
//                     formData.role === 'recruiter'
//                       ? 'bg-pink-600 text-white shadow-sm'
//                       : 'bg-slate-100 text-slate-600'
//                   }`}>
//                     <ShieldCheck className="h-4 w-4 stroke-[2.5]" />
//                   </div>
//                   {formData.role === 'recruiter' && (
//                     <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-white shadow-xs">
//                       <Check className="h-3 w-3 stroke-[3]" />
//                     </span>
//                   )}
//                 </div>
//                 <div className="mt-2.5">
//                   <p className={`text-xs font-bold ${formData.role === 'recruiter' ? 'text-pink-900' : 'text-slate-800'}`}>
//                     Recruiter
//                   </p>
//                   <p className="text-[11px] text-slate-600 font-medium">Post jobs & review</p>
//                 </div>
//               </button>

//             </div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="relative mt-5 space-y-3.5">
            
//             {/* Name Input */}
//             <div className="space-y-1.5">
//               <label className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-800">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-blue-600">
//                   <User className="h-4 w-4 stroke-[2.2]" />
//                 </div>
//                 <input
//                   type="text"
//                   name="name"
//                   required
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="e.g. Alex Mercer"
//                   className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 pl-10 text-xs font-bold text-slate-950 placeholder:text-slate-400 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/20 shadow-xs"
//                 />
//               </div>
//             </div>

//             {/* Email Input */}
//             <div className="space-y-1.5">
//               <label className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-800 flex items-center justify-between">
//                 <span>Email Address</span>
//                 {emailTouched && formData.email && (
//                   <span className={`text-[10px] font-bold ${isValidEmail(formData.email) ? 'text-emerald-600' : 'text-rose-600'}`}>
//                     {isValidEmail(formData.email) ? 'Valid email format' : 'Invalid email format'}
//                   </span>
//                 )}
//               </label>
//               <div className="relative">
//                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-blue-600">
//                   <Mail className="h-4 w-4 stroke-[2.2]" />
//                 </div>
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   value={formData.email}
//                   onFocus={() => setIsEmailFocused(true)}
//                   onBlur={() => {
//                     setIsEmailFocused(false);
//                     setEmailTouched(true);
//                   }}
//                   onChange={handleChange}
//                   placeholder="name@company.com"
//                   className={`h-11 w-full rounded-xl border bg-white px-3.5 pl-10 text-xs font-bold text-slate-950 placeholder:text-slate-400 outline-none transition-all shadow-xs ${
//                     emailTouched && formData.email && !isValidEmail(formData.email)
//                       ? 'border-rose-400 focus:border-rose-600 focus:ring-4 focus:ring-rose-500/20'
//                       : 'border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/20'
//                   }`}
//                 />
//               </div>

//               {/* Conditional Flash Message: Only displays when the email input is clicked/focused */}
//               <AnimatePresence>
//                 {isEmailFocused && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0, y: -4 }}
//                     animate={{ opacity: 1, height: 'auto', y: 0 }}
//                     exit={{ opacity: 0, height: 0, y: -4 }}
//                     transition={{ duration: 0.2 }}
//                     className="overflow-hidden pt-1"
//                   >
//                     <div className="rounded-2xl border border-blue-200/90 bg-gradient-to-r from-blue-50/95 to-indigo-50/80 p-3 shadow-xs">
//                       <div className="flex items-start gap-2.5">
//                         <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
//                           <BellRing className="h-3.5 w-3.5" />
//                         </div>
//                         <div className="flex-1">
//                           <p className="text-[11px] font-black uppercase tracking-wider text-blue-900">
//                             Valid Email Required
//                           </p>
//                           <p className="mt-0.5 text-[11px] font-medium leading-relaxed text-slate-600">
//                             Please provide an <strong>authentic, active email address</strong>. Otherwise, you won't receive interview notifications, status alerts, or account updates.
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Password Input */}
//             <div className="space-y-1.5">
//               <label className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-800">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-pink-600">
//                   <Lock className="h-4 w-4 stroke-[2.2]" />
//                 </div>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   required
//                   minLength={6}
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Create a secure password"
//                   className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 pl-10 pr-10 text-xs font-bold text-slate-950 placeholder:text-slate-400 outline-none transition-all focus:border-pink-600 focus:bg-white focus:ring-4 focus:ring-pink-500/20 shadow-xs"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500 transition hover:text-slate-800 cursor-pointer"
//                   aria-label={showPassword ? 'Hide password' : 'Show password'}
//                 >
//                   {showPassword ? <EyeOff className="h-4 w-4 stroke-[2.2]" /> : <Eye className="h-4 w-4 text-blue-600 stroke-[2.2]" />}
//                 </button>
//               </div>

//               {/* Password Strength Indicator */}
//               {formData.password && (
//                 <div className="space-y-1 pt-1.5">
//                   <div className="flex h-1.5 w-full gap-1 overflow-hidden rounded-full bg-slate-200">
//                     {[1, 2, 3, 4].map((step) => (
//                       <div
//                         key={step}
//                         className={`h-full flex-1 rounded-full transition-all duration-300 ${
//                           step <= strength.score ? strength.color : 'bg-slate-200'
//                         }`}
//                       />
//                     ))}
//                   </div>
//                   <div className="flex justify-between text-[11px] font-mono">
//                     <span className="text-slate-600 font-semibold">Security Score</span>
//                     <span className={`font-extrabold ${strength.text}`}>{strength.label}</span>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Terms text */}
//             <p className="text-xs leading-relaxed text-slate-700 font-medium pt-1">
//               By creating an account, you agree to our{' '}
//               <a href="#terms" className="font-bold text-blue-700 underline underline-offset-2 hover:text-pink-600">
//                 Terms of Service
//               </a>{' '}
//               and{' '}
//               <a href="#privacy" className="font-bold text-blue-700 underline underline-offset-2 hover:text-pink-600">
//                 Privacy Policy
//               </a>.
//             </p>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isRegistering}
//               className="group relative mt-2 flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 font-extrabold text-xs text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-pink-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
//             >
//               {isRegistering ? (
//                 <>
//                   <Loader2 className="h-4 w-4 animate-spin text-white" />
//                   <span>Creating Account...</span>
//                 </>
//               ) : (
//                 <>
//                   <Zap className="h-4 w-4 fill-white text-white" />
//                   <span>Create Account</span>
//                   <ArrowRight className="h-4 w-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
//                 </>
//               )}
//             </button>
//           </form>

//           {/* Sign In Link */}
//           <div className="relative mt-5 border-t border-slate-200 pt-4 text-center">
//             <p className="text-xs font-semibold text-slate-700">
//               Already have an account?{' '}
//               <Link
//                 to="/login"
//                 className="font-extrabold text-blue-700 underline-offset-4 transition hover:text-pink-600 hover:underline ml-1"
//               >
//                 Sign in
//               </Link>
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;





// frontend/src/pages/auth/Register.jsx
import React, { useState, useMemo, memo } from 'react';
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
  Zap, 
  ArrowLeft,
  BellRing
} from 'lucide-react';

export const Register = memo(() => {
  const { register, isRegistering, registerError } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'candidate',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

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
    if (!pass) return { score: 0, label: '', color: 'bg-slate-200', text: 'text-slate-400' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600' };
    if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-500', text: 'text-amber-600' };
    if (score === 3) return { score: 3, label: 'Good', color: 'bg-blue-600', text: 'text-blue-700' };
    return { score: 4, label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-700' };
  }, [formData.password]);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-slate-50 px-4 py-8 sm:py-12 font-sans text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* 
        Zero-Lag Static Light Atmosphere:
        Static CSS radial gradients composited without CPU thread locking.
      */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl sm:h-[450px] sm:w-[450px]" />
        <div className="absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl sm:h-[450px] sm:w-[450px]" />
        <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
        
        {/* Subtle geometric dot grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Return to Home Pill */}
      <Link 
        to="/" 
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-20 inline-flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white/95 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
      >
        <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-600 stroke-[2.2]" />
        <span className="hidden xs:inline">Back to Home</span>
        <span className="xs:hidden">Home</span>
      </Link>

      {/* Main Register Card Container */}
      <div className="relative z-10 w-full max-w-[460px] my-auto">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 p-6 sm:p-8 md:p-9 shadow-sm sm:shadow-md shadow-slate-200/60">
          
          {/* Top Multi-Color Brand Line (Cyan -> Indigo -> Violet -> Pink) */}
          <div 
            aria-hidden="true" 
            className="absolute inset-x-0 top-0 h-1 sm:h-1.5 bg-gradient-to-r from-cyan-400 via-indigo-600 to-pink-500" 
          />

          {/* Header & Logo */}
          <div className="relative flex flex-col items-center text-center">
            <Link
              to="/"
              className="group flex items-center justify-center transition-transform duration-200 active:scale-95"
              title="Return to Landing Page"
            >
              <div className="relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 via-indigo-600 to-pink-500 p-[2px] shadow-sm shadow-blue-500/20">
                <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-white p-2">
                  <img 
                    src={geminiLogo} 
                    alt="RankResume AI Logo" 
                    className="h-full w-full object-contain" 
                  />
                </div>
              </div>
            </Link>

            <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950">
              Create your account
            </h1>
            
            <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500">
              Start ranking and matching resumes with{' '}
              <span className="font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                RankResume AI
              </span>
            </p>
          </div>

          {/* Error Banner */}
          {registerError && (
            <div className="relative mt-5 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-800 shadow-2xs">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600 stroke-[2.2]" />
              <span className="flex-1 leading-snug">{registerError}</span>
            </div>
          )}

          {/* Role Selection */}
          <div className="relative mt-5 sm:mt-6 space-y-2">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-pink-600" />
              <span>Select Workspace Role</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              
              {/* Candidate Option */}
              <button
                type="button"
                onClick={() => handleRoleSelect('candidate')}
                className={`group relative flex flex-col items-start rounded-xl sm:rounded-2xl border p-3 sm:p-3.5 text-left transition-all duration-150 cursor-pointer ${
                  formData.role === 'candidate'
                    ? 'border-indigo-400 bg-indigo-50/70 shadow-2xs ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${
                    formData.role === 'candidate'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-white text-slate-500 border border-slate-200/80'
                  }`}>
                    <UserCheck className="h-4 w-4 stroke-[2.2]" />
                  </div>
                  {formData.role === 'candidate' && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-white">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="mt-2 min-w-0">
                  <p className={`text-xs font-bold ${formData.role === 'candidate' ? 'text-indigo-950' : 'text-slate-800'}`}>
                    Candidate
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 font-normal">
                    Apply & match CV
                  </p>
                </div>
              </button>

              {/* Recruiter Option */}
              <button
                type="button"
                onClick={() => handleRoleSelect('recruiter')}
                className={`group relative flex flex-col items-start rounded-xl sm:rounded-2xl border p-3 sm:p-3.5 text-left transition-all duration-150 cursor-pointer ${
                  formData.role === 'recruiter'
                    ? 'border-pink-400 bg-pink-50/70 shadow-2xs ring-2 ring-pink-500/20'
                    : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${
                    formData.role === 'recruiter'
                      ? 'bg-pink-600 text-white shadow-2xs'
                      : 'bg-white text-slate-500 border border-slate-200/80'
                  }`}>
                    <ShieldCheck className="h-4 w-4 stroke-[2.2]" />
                  </div>
                  {formData.role === 'recruiter' && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-white">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="mt-2 min-w-0">
                  <p className={`text-xs font-bold ${formData.role === 'recruiter' ? 'text-pink-950' : 'text-slate-800'}`}>
                    Recruiter
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 font-normal">
                    Post & evaluate
                  </p>
                </div>
              </button>

            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative mt-4 sm:mt-5 space-y-3.5 sm:space-y-4">
            
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Full Name
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <User className="h-4 w-4 stroke-[2]" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Mercer"
                  className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 pl-10 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700">
                  Email Address
                </label>
                {emailTouched && formData.email && (
                  <span className={`text-[10px] font-bold ${isValidEmail(formData.email) ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {isValidEmail(formData.email) ? 'Valid email format' : 'Invalid email format'}
                  </span>
                )}
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Mail className="h-4 w-4 stroke-[2]" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => {
                    setIsEmailFocused(false);
                    setEmailTouched(true);
                  }}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className={`h-11 w-full rounded-xl border bg-white px-3.5 pl-10 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition ${
                    emailTouched && formData.email && !isValidEmail(formData.email)
                      ? 'border-rose-400 focus:border-rose-600 focus:ring-3 focus:ring-rose-500/15'
                      : 'border-slate-300 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15'
                  }`}
                />
              </div>

              {/* Dynamic Notification Message */}
              {isEmailFocused && (
                <div className="rounded-xl border border-indigo-200/90 bg-indigo-50/70 p-2.5 sm:p-3 shadow-2xs transition-all">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-indigo-600 text-white">
                      <BellRing className="h-3 w-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-950">
                        Active Email Required
                      </p>
                      <p className="text-[11px] leading-relaxed text-slate-600">
                        Please provide an authentic email to receive match scores, stage updates, and recruiter notifications.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Lock className="h-4 w-4 stroke-[2]" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a secure password"
                  className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 pl-10 pr-10 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15"
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

              {/* Password Security Rating Meter */}
              {formData.password && (
                <div className="space-y-1 pt-1">
                  <div className="flex h-1.5 w-full gap-1 overflow-hidden rounded-full bg-slate-200">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-full flex-1 rounded-full transition-all duration-200 ${
                          step <= strength.score ? strength.color : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] font-mono font-medium">
                    <span className="text-slate-500">Security Score</span>
                    <span className={`font-bold ${strength.text}`}>{strength.label}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Terms Notice */}
            <p className="text-[11px] sm:text-xs leading-relaxed text-slate-500 font-normal pt-0.5">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="font-semibold text-indigo-600 underline underline-offset-2 hover:text-indigo-800">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/terms" className="font-semibold text-indigo-600 underline underline-offset-2 hover:text-indigo-800">
                Privacy Policy
              </Link>.
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isRegistering}
              className="group relative mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-500/25 transition-all hover:brightness-105 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 cursor-pointer"
            >
              {isRegistering ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 fill-white text-white" />
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.2] transition-transform duration-150 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Sign In */}
          <div className="relative mt-5 sm:mt-6 border-t border-slate-100 pt-4 text-center">
            <p className="text-xs font-medium text-slate-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-indigo-600 transition hover:text-indigo-800 hover:underline ml-1"
              >
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
});

Register.displayName = 'Register';
export default Register;