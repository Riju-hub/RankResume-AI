import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { DeleteAccountModal } from '../../components/common/DeleteAccountModal';
import { User, Mail, ShieldCheck, UserCheck, CheckCircle2, AlertCircle, Loader2, Trash2 } from 'lucide-react';

export const Profile = () => {
  const { user, isRecruiter, updateUserState } = useAuthContext();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setFeedback({ type: '', message: '' });
    try {
      const res = await authService.updateProfile(formData);
      updateUserState(res.user);
      setFeedback({ type: 'success', message: 'Profile updated successfully!' });
    } catch (err) {
      setFeedback({ type: 'error', message: err.response?.data?.message || 'Failed to update profile.' });
    } finally {
      setIsUpdating(false);
    }
  };

  const initials = (user?.name || 'U')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-100 sm:text-2xl">Account Profile</h1>
        <p className="text-xs text-zinc-400">Manage your identity and authentication credentials.</p>
      </div>

      {feedback.message && (
        <div
          className={`flex items-center gap-2.5 rounded-2xl p-4 text-xs backdrop-blur-md border ${
            feedback.type === 'success'
              ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300'
              : 'border-rose-500/25 bg-rose-500/10 text-rose-300'
          }`}
        >
          {feedback.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Profile Overview Card */}
      <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-7 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-800 font-mono text-base font-bold text-zinc-100">
            {initials}
          </div>
          <div>
            <h2 className="text-base font-semibold text-zinc-100">{user?.name}</h2>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs text-zinc-400">{user?.email}</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-400">
                {isRecruiter ? <ShieldCheck className="h-3 w-3 text-emerald-400" /> : <UserCheck className="h-3 w-3 text-indigo-400" />}
                {isRecruiter ? 'Recruiter' : 'Candidate'}
              </span>
            </div>
          </div>
        </div>

        {/* Update Form */}
        <form onSubmit={handleUpdate} className="mt-6 space-y-4 border-t border-zinc-800/60 pt-5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Full Name</label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-950/70 pl-10 pr-4 text-xs text-zinc-100 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Email Address</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-950/70 pl-10 pr-4 text-xs text-zinc-100 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isUpdating}
              className="inline-flex h-9 items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-xs font-medium text-white shadow-md hover:from-indigo-500 hover:to-violet-500 active:scale-95 disabled:opacity-50"
            >
              {isUpdating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="rounded-3xl border border-rose-500/20 bg-rose-500/5 p-6 sm:p-7 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-rose-300">Danger Zone</h3>
            <p className="mt-1 text-xs text-zinc-400">Permanently delete your account and all associated pipeline records.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 active:scale-95 cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete Account</span>
          </button>
        </div>
      </div>

      <DeleteAccountModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} />
    </div>
  );
};

export default Profile;