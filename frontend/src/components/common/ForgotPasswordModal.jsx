// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Mail, ArrowRight, CheckCircle2, AlertCircle, X, Loader2 } from 'lucide-react';
// import { authService } from '../../services/authService';

// export const ForgotPasswordModal = ({ isOpen, onClose }) => {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState({ type: '', message: '' });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email) return;

//     setLoading(true);
//     setStatus({ type: '', message: '' });

//     try {
//       const data = await authService.forgotPassword(email);
//       setStatus({
//         type: 'success',
//         message: data.message || 'If an account exists, a reset link has been dispatched.'
//       });
//     } catch (err) {
//       setStatus({
//         type: 'error',
//         message: err.response?.data?.message || 'Unable to send link. Please try again shortly.'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setEmail('');
//     setStatus({ type: '', message: '' });
//     onClose();
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={handleClose}
//             className="fixed inset-0 bg-slate-900/35 backdrop-blur-sm"
//           />

//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 16 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 12 }}
//             transition={{ type: 'spring', damping: 25, stiffness: 320 }}
//             className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:p-8"
//           >
//             <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500" />

//             <button
//               type="button"
//               onClick={handleClose}
//               className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
//             >
//               <X className="h-4 w-4" />
//             </button>

//             <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-600 shadow-sm">
//               <Mail className="h-6 w-6" />
//             </div>

//             <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
//               Forgot Password?
//             </h3>
//             <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
//               Enter your registered email address and we will send you a single-use reset link valid for 15 minutes.
//             </p>

//             {status.message && (
//               <motion.div
//                 initial={{ opacity: 0, y: -8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className={`mt-4 flex items-start gap-2.5 rounded-xl border p-3 text-xs font-medium leading-relaxed ${
//                   status.type === 'success'
//                     ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
//                     : 'border-rose-200 bg-rose-50 text-rose-800'
//                 }`}
//               >
//                 {status.type === 'success' ? (
//                   <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
//                 ) : (
//                   <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
//                 )}
//                 <span>{status.message}</span>
//               </motion.div>
//             )}

//             <form onSubmit={handleSubmit} className="mt-5 space-y-4">
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="name@company.com"
//                   className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 sm:text-sm"
//                 />
//               </div>

//               <div className="flex flex-col gap-2.5 pt-2 sm:flex-row">
//                 <button
//                   type="submit"
//                   disabled={loading || status.type === 'success'}
//                   className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-xs font-bold text-white shadow-[0_4px_16px_rgba(99,102,241,0.25)] transition-all hover:shadow-[0_6px_22px_rgba(99,102,241,0.35)] active:scale-[0.98] disabled:opacity-60"
//                 >
//                   {loading ? (
//                     <Loader2 className="h-4 w-4 animate-spin text-white" />
//                   ) : (
//                     <>
//                       <span>Send Reset Link</span>
//                       <ArrowRight className="h-4 w-4" />
//                     </>
//                   )}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleClose}
//                   className="flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-4 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ForgotPasswordModal;






// frontend/src/components/common/ForgotPasswordModal.jsx
import React, { useState, useEffect, useId, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle2, AlertCircle, X, Loader2, Sparkles } from 'lucide-react';
import { authService } from '../../services/authService';

export const ForgotPasswordModal = memo(({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const titleId = useId();
  const descId = useId();

  // Reset state on open/close
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setStatus({ type: '', message: '' });
      setLoading(false);
    }
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !loading) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const data = await authService.forgotPassword(email);
      setStatus({
        type: 'success',
        message: data?.message || 'If an account exists, a password reset link has been dispatched to your inbox.',
      });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || err.message || 'Unable to send link. Please verify your email and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setStatus({ type: '', message: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
        >
          {/* Lag-Free Hardware Scrim Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={!loading ? handleClose : undefined}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Container Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', damping: 26, stiffness: 340 }}
            className="relative my-auto w-full max-w-sm sm:max-w-md md:max-w-lg overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-2xl ring-4 sm:ring-8 ring-indigo-500/10"
          >
            {/* Top Multi-Color Accent Rim (Cyan -> Indigo -> Violet -> Pink) */}
            <div 
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 sm:h-1.5 bg-gradient-to-r from-cyan-400 via-indigo-600 to-pink-500" 
            />

            {/* Close Button */}
            <button
              type="button"
              disabled={loading}
              onClick={handleClose}
              aria-label="Close dialog"
              className="absolute right-3.5 top-3.5 sm:right-4 sm:top-4 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-40"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.2]" />
            </button>

            {/* Responsive Header: Stacked on mobile, row on tablet+ */}
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-3.5 sm:gap-4 text-center sm:text-left pr-8 sm:pr-0">
              <div className="flex h-12 w-12 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-2xl border border-indigo-200/80 bg-indigo-50 text-indigo-600 shadow-xs">
                <Mail className="h-6 w-6 stroke-[2.2]" />
              </div>

              <div className="min-w-0">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200/80 bg-indigo-50/70 px-2.5 py-0.5 mb-1">
                  <Sparkles className="h-3 w-3 text-indigo-600" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-700">
                    Account Security
                  </span>
                </div>
                <h3 
                  id={titleId} 
                  className="text-lg sm:text-xl font-bold tracking-tight text-slate-950"
                >
                  Forgot Password?
                </h3>
                <p 
                  id={descId} 
                  className="mt-1 text-xs sm:text-[13px] leading-relaxed text-slate-500 font-normal"
                >
                  Enter your verified account email to receive a secure, single-use recovery link valid for 15 minutes.
                </p>
              </div>
            </div>

            {/* Dynamic Status Banner */}
            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 flex items-start gap-2.5 rounded-xl border p-3 text-xs sm:text-[13px] font-medium leading-relaxed ${
                  status.type === 'success'
                    ? 'border-emerald-200/80 bg-emerald-50/80 text-emerald-900'
                    : 'border-rose-200/80 bg-rose-50/80 text-rose-900'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600 stroke-[2.2]" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600 stroke-[2.2]" />
                )}
                <span>{status.message}</span>
              </motion.div>
            )}

            {/* Reset Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Registered Email Address:
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status.message) setStatus({ type: '', message: '' });
                    }}
                    placeholder="you@company.com"
                    disabled={loading || status.type === 'success'}
                    autoComplete="email"
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 sm:px-4 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15 disabled:bg-slate-50 disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Action Controls: Mobile stacked, Tablet/Desktop row */}
              <div className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5 sm:gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading || status.type === 'success'}
                  className="inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-6 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-500/25 transition-all hover:brightness-105 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin stroke-[2.2]" />
                      <span>Sending Link...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Recovery Link</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

ForgotPasswordModal.displayName = 'ForgotPasswordModal';
export default ForgotPasswordModal;