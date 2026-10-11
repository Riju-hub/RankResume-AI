import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle2, AlertCircle, X, Loader2 } from 'lucide-react';
import { authService } from '../../services/authService';

export const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const data = await authService.forgotPassword(email);
      setStatus({
        type: 'success',
        message: data.message || 'If an account exists, a reset link has been dispatched.'
      });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Unable to send link. Please try again shortly.'
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/35 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:p-8"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500" />

            <button
              type="button"
              onClick={handleClose}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-600 shadow-sm">
              <Mail className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Forgot Password?
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
              Enter your registered email address and we will send you a single-use reset link valid for 15 minutes.
            </p>

            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 flex items-start gap-2.5 rounded-xl border p-3 text-xs font-medium leading-relaxed ${
                  status.type === 'success'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                    : 'border-rose-200 bg-rose-50 text-rose-800'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                )}
                <span>{status.message}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 sm:text-sm"
                />
              </div>

              <div className="flex flex-col gap-2.5 pt-2 sm:flex-row">
                <button
                  type="submit"
                  disabled={loading || status.type === 'success'}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-xs font-bold text-white shadow-[0_4px_16px_rgba(99,102,241,0.25)] transition-all hover:shadow-[0_6px_22px_rgba(99,102,241,0.35)] active:scale-[0.98] disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-4 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ForgotPasswordModal;