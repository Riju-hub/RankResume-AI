import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { 
  AlertOctagon, 
  Loader2, 
  X, 
  Trash2, 
  ShieldAlert, 
  AlertCircle 
} from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md transition-all font-sans">
      
      {/* Background Ambient Glow Flare (Hardware-Accelerated) */}
      <div className="pointer-events-none fixed h-96 w-96 rounded-full bg-rose-600/10 blur-[120px] transform-gpu will-change-transform" />

      {/* Main Modal Window */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-rose-500/30 bg-slate-900/95 p-6 sm:p-7 shadow-2xl backdrop-blur-2xl transition-all">
        
        {/* Top Gradient Warning Horizon */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-950/40 text-rose-400 shadow-inner">
              <AlertOctagon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Permanent Account Deletion
              </h3>
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-rose-400">
                Irreversible Action
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-slate-400 transition hover:border-slate-700 hover:text-white disabled:opacity-50 cursor-pointer"
            aria-label="Close delete modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Warning Body */}
        <div className="mt-5 space-y-4 text-xs leading-relaxed text-slate-400">
          <div className="rounded-2xl border border-rose-500/20 bg-rose-950/30 p-4 text-rose-200/90 shadow-inner">
            <div className="flex items-center gap-2 font-bold text-rose-400">
              <ShieldAlert className="h-4 w-4" />
              <span className="font-mono text-[11px] uppercase tracking-wider">
                Data Cascading Notice
              </span>
            </div>
            <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
              Terminating <span className="font-bold text-white">{user?.email || 'this account'}</span> will permanently erase all PDF resumes, parsed applicant records, ATS candidate pipelines, and multi-modal Gemini vector evaluations.
            </p>
          </div>

          <div className="space-y-1.5 pt-1">
            <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
              Type <span className="text-rose-400 font-black">DELETE</span> to confirm
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => {
                setConfirmText(e.target.value);
                if (error) setError('');
              }}
              placeholder="DELETE"
              disabled={isDeleting}
              className="h-11 w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 font-mono text-xs font-bold text-white placeholder-slate-600 outline-none transition-all focus:border-rose-500/70 focus:bg-slate-950 focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-950/40 p-3 text-xs font-medium text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-800/80 pt-5">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="h-10 rounded-xl border border-slate-800 bg-slate-900/80 px-5 text-xs font-bold text-slate-400 transition hover:border-slate-700 hover:text-slate-200 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={handleDelete}
            disabled={confirmText !== 'DELETE' || isDeleting}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 px-5 text-xs font-bold text-white shadow-lg shadow-rose-600/25 transition-all hover:scale-[1.02] hover:shadow-rose-600/35 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
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