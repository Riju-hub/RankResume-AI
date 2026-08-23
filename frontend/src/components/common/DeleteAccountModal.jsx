import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { AlertTriangle, Loader2, X, Trash2 } from 'lucide-react';

export const DeleteAccountModal = ({ isOpen, onClose }) => {
  const { deleteAccount, user } = useAuthContext();
  const navigate = useNavigate();
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleDelete = async () => {
    if (confirmText !== 'DELETE') {
      setError('Please type DELETE to confirm.');
      return;
    }
    setIsDeleting(true);
    setError('');
    try {
      await deleteAccount();
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete account.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-rose-500/30 bg-zinc-900/95 p-6 shadow-2xl backdrop-blur-2xl">
        <div className="flex items-start justify-between border-b border-zinc-800/70 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-100">Delete Account</h3>
              <p className="text-xs text-rose-400 font-medium">Irreversible action</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 space-y-3 text-xs text-zinc-400">
          <p>
            This action will permanently delete your account (<span className="text-zinc-200 font-semibold">{user?.email}</span>) and all associated resumes, scores, and records.
          </p>
          <div className="space-y-1.5 pt-2">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Type <span className="font-mono font-bold text-rose-400">DELETE</span> to confirm
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
              className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-950/70 px-3.5 text-xs font-medium text-zinc-100 outline-none focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
        </div>

        <div className="mt-6 flex items-center justify-end gap-2.5 border-t border-zinc-800/70 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="h-9 rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={confirmText !== 'DELETE' || isDeleting}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-rose-600 px-4 text-xs font-medium text-white shadow-lg shadow-rose-600/20 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
            <span>Permanently Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};