// import React, { useState } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
// import geminiLogo from '../../assets/gemini-svg.svg';
// import { authService } from '../../services/authService';

// export const ResetPassword = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();

//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState({ type: '', message: '' });

//   const handleReset = async (e) => {
//     e.preventDefault();

//     if (password.length < 8) {
//       setStatus({ type: 'error', message: 'Password must be at least 8 characters long.' });
//       return;
//     }

//     if (password !== confirmPassword) {
//       setStatus({ type: 'error', message: 'Passwords do not match.' });
//       return;
//     }

//     setLoading(true);
//     setStatus({ type: '', message: '' });

//     try {
//       const data = await authService.resetPassword(token, password);
//       setStatus({
//         type: 'success',
//         message: data.message || 'Password successfully updated!'
//       });

//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);
//     } catch (err) {
//       setStatus({
//         type: 'error',
//         message: err.response?.data?.message || 'The reset link is invalid or has expired.'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative flex min-h-screen items-center justify-center bg-slate-50 p-4 text-slate-900 antialiased selection:bg-cyan-500/20 selection:text-slate-900">
//       <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0]" />
//         <div className="absolute -top-40 left-[15%] h-[500px] w-[500px] rounded-full bg-cyan-400/20 blur-[130px]" />
//         <div className="absolute top-[25%] -right-20 h-[550px] w-[550px] rounded-full bg-indigo-500/15 blur-[150px]" />
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 16 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-8"
//       >
//         <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500" />

//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 p-2 shadow-sm">
//             <img src={geminiLogo} alt="RankResume" className="h-full w-full object-contain" />
//           </div>
//           <div>
//             <h2 className="text-base font-bold text-slate-900">RankResume AI</h2>
//             <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Credential Service</p>
//           </div>
//         </div>

//         <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
//           Set New Password
//         </h3>
//         <p className="mt-1 text-xs text-slate-600 sm:text-sm">
//           Please enter your new password below.
//         </p>

//         {status.message && (
//           <motion.div
//             initial={{ opacity: 0, y: -6 }}
//             animate={{ opacity: 1, y: 0 }}
//             className={`mt-4 flex items-start gap-2.5 rounded-xl border p-3 text-xs font-medium ${
//               status.type === 'success'
//                 ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
//                 : 'border-rose-200 bg-rose-50 text-rose-800'
//             }`}
//           >
//             {status.type === 'success' ? (
//               <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
//             ) : (
//               <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
//             )}
//             <span>{status.message}</span>
//           </motion.div>
//         )}

//         <form onSubmit={handleReset} className="mt-6 space-y-4">
//           <div>
//             <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
//               New Password
//             </label>
//             <input
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="At least 8 characters"
//               className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               required
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder="Re-type new password"
//               className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 sm:text-sm"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading || status.type === 'success'}
//             className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-xs font-bold text-white shadow-[0_4px_16px_rgba(99,102,241,0.25)] transition-all hover:shadow-[0_6px_22px_rgba(99,102,241,0.35)] active:scale-[0.98] disabled:opacity-60"
//           >
//             {loading ? (
//               <Loader2 className="h-4 w-4 animate-spin text-white" />
//             ) : (
//               <>
//                 <span>Save New Password</span>
//                 <ArrowRight className="h-4 w-4" />
//               </>
//             )}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <Link to="/login" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
//             Back to Sign In
//           </Link>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ResetPassword;






// frontend/src/pages/auth/ResetPassword.jsx
import React, { useState, memo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Sparkles 
} from 'lucide-react';
import geminiLogo from '../../assets/gemini-svg.svg';
import { authService } from '../../services/authService';

export const ResetPassword = memo(() => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleReset = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setStatus({ type: 'error', message: 'Password must be at least 8 characters long.' });
      return;
    }

    if (password !== confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const data = await authService.resetPassword(token, password);
      setStatus({
        type: 'success',
        message: data?.message || 'Password successfully updated! Redirecting to login...',
      });

      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || err?.message || 'The reset link is invalid or has expired.',
      });
    } finally {
      setLoading(false);
    }
  };

  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

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

      {/* Return to Sign In Quick Navigation */}
      <Link 
        to="/login" 
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-20 inline-flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white/95 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
      >
        <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-600 stroke-[2.2]" />
        <span className="hidden xs:inline">Back to Sign In</span>
        <span className="xs:hidden">Sign In</span>
      </Link>

      {/* Main Form Card Container */}
      <div className="relative z-10 w-full max-w-[420px] my-auto">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 p-6 sm:p-8 md:p-9 shadow-sm sm:shadow-md shadow-slate-200/60">
          
          {/* Top Multi-Color Brand Line (Cyan -> Indigo -> Violet -> Pink) */}
          <div 
            aria-hidden="true" 
            className="absolute inset-x-0 top-0 h-1 sm:h-1.5 bg-gradient-to-r from-cyan-400 via-indigo-600 to-pink-500" 
          />

          {/* Header Brand Bar */}
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
              Set New Password
            </h1>
            
            <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500">
              Create a strong password for your{' '}
              <span className="font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                RankResume AI
              </span>{' '}
              account
            </p>
          </div>

          {/* Feedback Banner */}
          {status.message && (
            <div 
              className={`relative mt-5 flex items-start gap-2.5 rounded-xl border p-3 text-xs font-semibold shadow-2xs ${
                status.type === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                  : 'border-rose-200 bg-rose-50 text-rose-800'
              }`}
            >
              {status.type === 'success' ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600 stroke-[2.2]" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600 stroke-[2.2]" />
              )}
              <span className="flex-1 leading-snug">{status.message}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleReset} className="relative mt-5 sm:mt-6 space-y-4">
            
            {/* New Password Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                New Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Lock className="h-4 w-4 stroke-[2]" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (status.message) setStatus({ type: '', message: '' });
                  }}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 pl-10 pr-10 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 transition hover:text-slate-700 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 stroke-[2]" />
                  ) : (
                    <Eye className="h-4 w-4 stroke-[2]" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700">
                  Confirm Password
                </label>
                {passwordsMatch && (
                  <span className="text-[10px] font-bold text-emerald-600">
                    Passwords match
                  </span>
                )}
                {passwordsMismatch && (
                  <span className="text-[10px] font-bold text-rose-600">
                    Passwords do not match
                  </span>
                )}
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Lock className="h-4 w-4 stroke-[2]" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (status.message) setStatus({ type: '', message: '' });
                  }}
                  placeholder="Re-type new password"
                  autoComplete="new-password"
                  className={`h-11 w-full rounded-xl border bg-white px-3.5 pl-10 pr-10 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition ${
                    passwordsMismatch
                      ? 'border-rose-400 focus:border-rose-600 focus:ring-3 focus:ring-rose-500/15'
                      : 'border-slate-300 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 transition hover:text-slate-700 cursor-pointer"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 stroke-[2]" />
                  ) : (
                    <Eye className="h-4 w-4 stroke-[2]" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || status.type === 'success'}
              className="group relative mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-500/25 transition-all hover:brightness-105 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-cyan-200" />
                  <span>Save New Password</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.2] transition-transform duration-150 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Sign In */}
          <div className="relative mt-6 border-t border-slate-100 pt-4 text-center">
            <p className="text-xs font-medium text-slate-500">
              Remember your password?{' '}
              <Link
                to="/login"
                className="font-bold text-indigo-600 transition hover:text-indigo-800 hover:underline ml-1"
              >
                Back to Sign In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
});

ResetPassword.displayName = 'ResetPassword';
export default ResetPassword;