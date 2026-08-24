import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { AlertOctagon, Loader2, X, Trash2, ShieldAlert } from 'lucide-react';

export const DeleteAccountModal = ({ isOpen, onClose }) => {
  const { deleteAccount, user } = useAuthContext();
  const navigate = useNavigate();
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleDelete = async () => {
    if (confirmText !== 'DELETE') {
      setError('Please type DELETE to confirm account destruction.');
      return;
    }
    setIsDeleting(true);
    setError('');
    try {
      await deleteAccount();
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to execute account purging.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-rose-500/30 bg-zinc-950/95 p-7 shadow-2xl shadow-rose-950/30 backdrop-blur-2xl">
        {/* Glow Element */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-zinc-800/80 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-400 shadow-inner">
              <AlertOctagon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-100">Permanent Account Deletion</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-rose-400">Irreversible Action</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Warning Body */}
        <div className="mt-5 space-y-4 text-xs leading-relaxed text-zinc-400">
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4 text-rose-200/90">
            <div className="flex items-center gap-2 font-semibold text-rose-400">
              <ShieldAlert className="h-4 w-4" />
              <span>Data Cascading Notice</span>
            </div>
            <p className="mt-1 text-[11px] text-zinc-300">
              Terminating <span className="font-semibold text-white">{user?.email || 'this account'}</span> will permanently erase all PDF resumes, parsed applicant records, ATS candidate pipelines, and Gemini evaluations.
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Type <span className="font-mono font-bold text-rose-400">DELETE</span> to confirm
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => {
                setConfirmText(e.target.value);
                if (error) setError('');
              }}
              placeholder="DELETE"
              className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 font-mono text-xs font-bold text-white placeholder-zinc-600 outline-none transition-all focus:border-rose-500/70 focus:ring-4 focus:ring-rose-500/10"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-400 border border-rose-500/20">
              {error}
            </p>
          )}
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex items-center justify-end gap-3 border-t border-zinc-800/80 pt-5">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="h-10 rounded-xl border border-zinc-800 bg-zinc-900/90 px-5 text-xs font-semibold text-zinc-300 transition-all hover:bg-zinc-800 active:scale-95"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={confirmText !== 'DELETE' || isDeleting}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 px-5 text-xs font-semibold text-white shadow-lg shadow-rose-600/25 transition-all hover:scale-[1.02] hover:shadow-rose-600/35 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Purging Data...</span>
              </>
            ) : (
              <>
                <Trash2 className="h-3.5 w-3.5" />
                <span>Permanently Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;