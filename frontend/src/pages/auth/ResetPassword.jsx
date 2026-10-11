import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import geminiLogo from '../../assets/gemini-svg.svg';
import { authService } from '../../services/authService';

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
        message: data.message || 'Password successfully updated!'
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'The reset link is invalid or has expired.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50 p-4 text-slate-900 antialiased selection:bg-cyan-500/20 selection:text-slate-900">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0]" />
        <div className="absolute -top-40 left-[15%] h-[500px] w-[500px] rounded-full bg-cyan-400/20 blur-[130px]" />
        <div className="absolute top-[25%] -right-20 h-[550px] w-[550px] rounded-full bg-indigo-500/15 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-8"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500" />

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 p-2 shadow-sm">
            <img src={geminiLogo} alt="RankResume" className="h-full w-full object-contain" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">RankResume AI</h2>
            <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Credential Service</p>
          </div>
        </div>

        <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Set New Password
        </h3>
        <p className="mt-1 text-xs text-slate-600 sm:text-sm">
          Please enter your new password below.
        </p>

        {status.message && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 flex items-start gap-2.5 rounded-xl border p-3 text-xs font-medium ${
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

        <form onSubmit={handleReset} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              New Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-type new password"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading || status.type === 'success'}
            className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-xs font-bold text-white shadow-[0_4px_16px_rgba(99,102,241,0.25)] transition-all hover:shadow-[0_6px_22px_rgba(99,102,241,0.35)] active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            ) : (
              <>
                <span>Save New Password</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
            Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;