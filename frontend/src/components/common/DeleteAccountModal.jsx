// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuthContext } from '../../context/AuthContext';
// import { 
//   AlertOctagon, 
//   Loader2, 
//   X, 
//   Trash2, 
//   ShieldAlert, 
//   AlertCircle 
// } from 'lucide-react';

// export const DeleteAccountModal = ({ isOpen, onClose }) => {
//   const { deleteAccount, user } = useAuthContext();
//   const navigate = useNavigate();
//   const [confirmText, setConfirmText] = useState('');
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [error, setError] = useState('');

//   if (!isOpen) return null;

//   const handleDelete = async () => {
//     if (confirmText !== 'DELETE') {
//       setError('Please type DELETE to confirm account destruction.');
//       return;
//     }
//     setIsDeleting(true);
//     setError('');
//     try {
//       await deleteAccount();
//       navigate('/', { replace: true });
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to execute account purging.');
//       setIsDeleting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-md transition-all font-sans antialiased">
      
//       {/* Background Soft Ambient Orbs */}
//       <div className="pointer-events-none fixed -top-20 -left-20 h-80 w-80 rounded-full bg-blue-500/20 blur-[100px] transform-gpu will-change-transform" />
//       <div className="pointer-events-none fixed -bottom-20 -right-20 h-80 w-80 rounded-full bg-pink-500/25 blur-[100px] transform-gpu will-change-transform" />

//       {/* Main Modal Window */}
//       <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-white/95 bg-white/95 p-6 sm:p-8 shadow-[0_25px_65px_rgba(225,29,72,0.15),0_12px_35px_rgba(236,72,153,0.12)] backdrop-blur-2xl transition-all duration-300">
        
//         {/* Top Gradient Warning Rim */}
//         <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 shadow-[0_0_12px_rgba(225,29,72,0.5)]" />

//         {/* Modal Header */}
//         <div className="flex items-start justify-between border-b border-slate-200 pb-5">
//           <div className="flex items-center gap-3.5">
//             <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-600 shadow-xs">
//               <AlertOctagon className="h-6 w-6 stroke-[2.2]" />
//             </div>
//             <div>
//               <h3 className="text-lg font-black tracking-tight text-slate-950">
//                 Permanent Account Deletion
//               </h3>
//               <p className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-rose-600">
//                 Irreversible Action
//               </p>
//             </div>
//           </div>
          
//           <button
//             type="button"
//             onClick={onClose}
//             disabled={isDeleting}
//             className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-pink-300 hover:bg-pink-50 hover:text-pink-700 active:scale-95 disabled:opacity-50 cursor-pointer shadow-xs"
//             aria-label="Close delete modal"
//           >
//             <X className="h-4 w-4 stroke-[2.5]" />
//           </button>
//         </div>

//         {/* Warning Body */}
//         <div className="mt-5 space-y-4 text-xs leading-relaxed text-slate-700">
//           <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-4 text-slate-800 shadow-xs">
//             <div className="flex items-center gap-2 font-extrabold text-rose-700">
//               <ShieldAlert className="h-4 w-4 stroke-[2.2]" />
//               <span className="font-mono text-[11px] uppercase tracking-wider">
//                 Data Cascading Notice
//               </span>
//             </div>
//             <p className="mt-2 text-xs font-semibold text-slate-700 leading-relaxed">
//               Terminating <span className="font-black text-slate-950 underline decoration-rose-300">{user?.email || 'this account'}</span> will permanently erase all PDF resumes, parsed applicant records, ATS candidate pipelines, and multi-modal Gemini vector evaluations.
//             </p>
//           </div>

//           <div className="space-y-1.5 pt-1">
//             <label className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-800">
//               Type <span className="text-rose-600 font-black">DELETE</span> to confirm
//             </label>
//             <input
//               type="text"
//               value={confirmText}
//               onChange={(e) => {
//                 setConfirmText(e.target.value);
//                 if (error) setError('');
//               }}
//               placeholder="DELETE"
//               disabled={isDeleting}
//               className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 font-mono text-xs font-extrabold text-slate-950 placeholder:text-slate-400 outline-none transition-all focus:border-rose-500 focus:ring-4 focus:ring-rose-500/15 shadow-xs"
//             />
//           </div>

//           {error && (
//             <div className="flex items-center gap-2 rounded-xl border border-rose-300 bg-rose-50 p-3 text-xs font-bold text-rose-800 shadow-xs">
//               <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 stroke-[2.5]" />
//               <span>{error}</span>
//             </div>
//           )}
//         </div>

//         {/* Action Controls */}
//         <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
//           <button
//             type="button"
//             onClick={onClose}
//             disabled={isDeleting}
//             className="h-11 rounded-xl border border-slate-300 bg-white px-5 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:text-slate-950 active:scale-95 disabled:opacity-50 cursor-pointer"
//           >
//             Cancel
//           </button>
          
//           <button
//             type="button"
//             onClick={handleDelete}
//             disabled={confirmText !== 'DELETE' || isDeleting}
//             className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 px-6 text-xs font-extrabold text-white shadow-lg shadow-rose-500/25 transition-all hover:shadow-rose-600/35 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
//           >
//             {isDeleting ? (
//               <>
//                 <Loader2 className="h-4 w-4 animate-spin stroke-[2.5]" />
//                 <span>Purging Data...</span>
//               </>
//             ) : (
//               <>
//                 <Trash2 className="h-4 w-4 stroke-[2.2]" />
//                 <span>Permanently Delete</span>
//               </>
//             )}
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default DeleteAccountModal;




// frontend/src/components/common/DeleteAccountModal.jsx
import React, { useState, useEffect, useId, memo } from 'react';
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

export const DeleteAccountModal = memo(({ isOpen, onClose }) => {
  const { deleteAccount, user } = useAuthContext();
  const navigate = useNavigate();
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const titleId = useId();
  const descId = useId();

  // Reset state when closing/opening
  useEffect(() => {
    if (isOpen) {
      setConfirmText('');
      setError('');
      setIsDeleting(false);
    }
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isDeleting) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isDeleting, onClose]);

  if (!isOpen) return null;

  const handleDelete = async (e) => {
    e?.preventDefault();
    if (confirmText.trim() !== 'DELETE') {
      setError('Please type DELETE in uppercase to confirm.');
      return;
    }

    setIsDeleting(true);
    setError('');

    try {
      await deleteAccount();
      navigate('/', { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Failed to process account deletion.');
      setIsDeleting(false);
    }
  };

  const isConfirmed = confirmText.trim() === 'DELETE';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      {/* 
        Lag-Free Composited Backdrop:
        Uses a static dark scrim with lightweight hardware-accelerated opacity.
        Avoids 100px multi-layer blur filters that stutter mobile and low-end GPUs.
      */}
      <div 
        className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs transition-opacity duration-200"
        onClick={!isDeleting ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Main Modal Card */}
      <div className="relative my-auto w-full max-w-sm sm:max-w-md md:max-w-lg overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-2xl ring-4 sm:ring-8 ring-rose-500/10 transition-transform">
        
        {/* Multi-Color Accent Rim: Rose to Pink to Violet */}
        <div 
          aria-hidden="true" 
          className="absolute inset-x-0 top-0 h-1 sm:h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600" 
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          className="absolute right-3.5 top-3.5 sm:right-4 sm:top-4 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 disabled:pointer-events-none disabled:opacity-40"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.2]" />
        </button>

        {/* Responsive Header: Stacked on small screens, row on sm+ */}
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-3.5 sm:gap-4 text-center sm:text-left pr-8 sm:pr-0">
          <div className="flex h-12 w-12 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-2xl border border-rose-200/90 bg-rose-50 text-rose-600 shadow-xs">
            <AlertOctagon className="h-6 w-6 stroke-[2.2]" />
          </div>

          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-200/80 bg-rose-50/70 px-2.5 py-0.5 mb-1">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-pulse" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-700">
                Permanent Action
              </span>
            </div>
            <h3 
              id={titleId} 
              className="text-lg sm:text-xl font-bold tracking-tight text-slate-950"
            >
              Delete Account
            </h3>
          </div>
        </div>

        {/* Modal Form & Warning Body */}
        <form onSubmit={handleDelete} className="mt-5 space-y-4">
          
          {/* Cascading Warning Box with Multi-Color Indicator */}
          <div className="rounded-xl sm:rounded-2xl border border-rose-200/80 bg-rose-50/60 p-3.5 sm:p-4 text-slate-800">
            <div className="flex items-center gap-2 text-rose-700 font-bold">
              <ShieldAlert className="h-4 w-4 shrink-0 stroke-[2.2]" />
              <span className="text-xs uppercase tracking-wide">
                Data Cascading Deletion
              </span>
            </div>
            <p id={descId} className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-slate-600">
              Terminating <strong className="font-semibold text-slate-900 underline decoration-rose-300 decoration-2">{user?.email || 'this account'}</strong> will permanently wipe all uploaded resumes, parsed history records, and ATS intelligence evaluations. This operation cannot be reversed.
            </p>
          </div>

          {/* User Confirmation Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Type <span className="font-mono font-bold text-rose-600">DELETE</span> to confirm:
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
              autoComplete="off"
              spellCheck="false"
              className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 sm:px-4 font-mono text-sm font-bold text-slate-900 placeholder:text-slate-300 outline-none transition focus:border-rose-500 focus:ring-3 focus:ring-rose-500/15 disabled:bg-slate-50 disabled:opacity-60"
            />
          </div>

          {/* Error Banner */}
          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-rose-300/80 bg-rose-50 px-3 py-2.5 text-xs font-semibold text-rose-800">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600 stroke-[2.2]" />
              <span className="flex-1 leading-snug">{error}</span>
            </div>
          )}

          {/* Action Controls: Full-width stacked on mobile, row on tablet/desktop */}
          <div className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5 sm:gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={!isConfirmed || isDeleting}
              className="inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 px-6 text-xs sm:text-sm font-bold text-white shadow-md shadow-rose-500/25 transition hover:brightness-105 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin stroke-[2.2]" />
                  <span>Deleting Account...</span>
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 stroke-[2.2]" />
                  <span>Permanently Delete</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
});

DeleteAccountModal.displayName = 'DeleteAccountModal';
export default DeleteAccountModal;