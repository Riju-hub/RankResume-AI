// // frontend/src/components/common/ActionConfirmModal.jsx
// import React, { memo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { AlertTriangle, Trash2, CheckCircle2, Pencil, PlusCircle, X, Loader2 } from 'lucide-react';

// export const ActionConfirmModal = memo(({
//   isOpen,
//   onClose,
//   onConfirm,
//   title = 'Confirm Action',
//   description = 'Are you sure you want to proceed?',
//   confirmLabel = 'Confirm',
//   cancelLabel = 'Cancel',
//   type = 'danger', // 'danger' | 'warning' | 'primary'
//   isLoading = false,
// }) => {
//   const getTheme = () => {
//     switch (type) {
//       case 'danger':
//         return {
//           icon: Trash2,
//           iconBg: 'bg-rose-50 text-rose-600 border-rose-200',
//           btnBg: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20',
//           ringColor: 'ring-rose-500/10',
//           accentBorder: 'from-rose-500 via-pink-500 to-rose-500',
//         };
//       case 'warning':
//         return {
//           icon: Pencil,
//           iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
//           btnBg: 'bg-slate-900 hover:bg-blue-600 text-white shadow-slate-900/20',
//           ringColor: 'ring-amber-500/10',
//           accentBorder: 'from-amber-400 via-orange-500 to-amber-400',
//         };
//       case 'primary':
//       default:
//         return {
//           icon: PlusCircle,
//           iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
//           btnBg: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 text-white shadow-blue-500/20',
//           ringColor: 'ring-blue-500/10',
//           accentBorder: 'from-blue-600 via-indigo-500 to-pink-500',
//         };
//     }
//   };

//   const theme = getTheme();
//   const Icon = theme.icon;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 font-sans">
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             onClick={!isLoading ? onClose : undefined}
//             className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
//             aria-hidden="true"
//           />

//           {/* Modal Card */}
//           <motion.div
//             role="dialog"
//             aria-modal="true"
//             initial={{ opacity: 0, scale: 0.94, y: 14 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.96, y: 10 }}
//             transition={{ type: 'spring', damping: 25, stiffness: 320 }}
//             className={`relative w-full max-w-md overflow-hidden rounded-[28px] border border-slate-200/90 bg-white p-6 sm:p-7 text-center shadow-2xl ${theme.ringColor} ring-8`}
//           >
//             {/* Top Accent Strip */}
//             <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${theme.accentBorder}`} />

//             {/* Close Button */}
//             <button
//               type="button"
//               disabled={isLoading}
//               onClick={onClose}
//               className="absolute right-4 top-4 rounded-xl p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
//             >
//               <X className="h-4 w-4" />
//             </button>

//             {/* Icon Banner */}
//             <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border ${theme.iconBg} shadow-sm`}>
//               <Icon className="h-6 w-6 stroke-[2.2]" />
//             </div>

//             {/* Title & Description */}
//             <h3 className="mt-4 text-lg font-black tracking-tight text-slate-950 sm:text-xl">
//               {title}
//             </h3>

//             <p className="mt-2 text-xs leading-relaxed text-slate-500 font-medium">
//               {description}
//             </p>

//             {/* Button Actions */}
//             <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
//               <button
//                 type="button"
//                 disabled={isLoading}
//                 onClick={onClose}
//                 className="h-10 w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 active:scale-95 disabled:opacity-50"
//               >
//                 {cancelLabel}
//               </button>

//               <button
//                 type="button"
//                 disabled={isLoading}
//                 onClick={onConfirm}
//                 className={`inline-flex h-10 w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-5 text-xs font-bold shadow-md transition active:scale-95 disabled:opacity-50 ${theme.btnBg}`}
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="h-3.5 w-3.5 animate-spin" />
//                     <span>Processing...</span>
//                   </>
//                 ) : (
//                   <span>{confirmLabel}</span>
//                 )}
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// });

// ActionConfirmModal.displayName = 'ActionConfirmModal';
// export default ActionConfirmModal;





// frontend/src/components/common/ActionConfirmModal.jsx
import React, { memo, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Trash2, 
  CheckCircle2, 
  HelpCircle, 
  Info, 
  X, 
  Loader2 
} from 'lucide-react';

export const ActionConfirmModal = memo(({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  description = 'Are you sure you want to proceed?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  type = 'primary', // 'primary' | 'danger' | 'warning' | 'success' | 'info'
  isLoading = false,
}) => {
  const titleId = useId();
  const descId = useId();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  const getTheme = () => {
    switch (type) {
      case 'danger':
        return {
          icon: Trash2,
          iconBg: 'bg-rose-50 text-rose-600 border-rose-200/80 shadow-rose-100',
          btnBg: 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-rose-500/25 focus-visible:ring-rose-500',
          accentBorder: 'from-rose-500 via-pink-500 to-red-500',
          glowRing: 'ring-rose-500/10',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          iconBg: 'bg-amber-50 text-amber-600 border-amber-200/80 shadow-amber-100',
          btnBg: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white shadow-amber-500/25 focus-visible:ring-amber-500',
          accentBorder: 'from-amber-400 via-orange-500 to-yellow-400',
          glowRing: 'ring-amber-500/10',
        };
      case 'success':
        return {
          icon: CheckCircle2,
          iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200/80 shadow-emerald-100',
          btnBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/25 focus-visible:ring-emerald-500',
          accentBorder: 'from-emerald-400 via-teal-500 to-emerald-500',
          glowRing: 'ring-emerald-500/10',
        };
      case 'info':
        return {
          icon: Info,
          iconBg: 'bg-sky-50 text-sky-600 border-sky-200/80 shadow-sky-100',
          btnBg: 'bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white shadow-sky-500/25 focus-visible:ring-sky-500',
          accentBorder: 'from-sky-400 via-blue-500 to-cyan-400',
          glowRing: 'ring-sky-500/10',
        };
      case 'primary':
      default:
        return {
          icon: HelpCircle,
          iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200/80 shadow-indigo-100',
          // Balanced multi-color gradient (Indigo -> Violet -> Cyan)
          btnBg: 'bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 hover:from-indigo-500 hover:via-violet-500 hover:to-cyan-500 text-white shadow-indigo-500/25 focus-visible:ring-indigo-500',
          accentBorder: 'from-indigo-500 via-purple-500 to-cyan-400',
          glowRing: 'ring-indigo-500/10',
        };
    }
  };

  const theme = getTheme();
  const Icon = theme.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={!isLoading ? onClose : undefined}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', damping: 26, stiffness: 340 }}
            className={`relative my-auto w-full max-w-sm sm:max-w-md md:max-w-lg overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 md:p-7 shadow-2xl ${theme.glowRing} ring-4 sm:ring-8`}
          >
            {/* Top Accent Gradient Bar */}
            <div className={`absolute inset-x-0 top-0 h-1 sm:h-1.5 bg-gradient-to-r ${theme.accentBorder}`} />

            {/* Close Button */}
            <button
              type="button"
              disabled={isLoading}
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-3.5 top-3.5 sm:right-4 sm:top-4 rounded-lg sm:rounded-xl p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-40"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Responsive Content Container: centered on mobile, row-oriented on tablet+ */}
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
              {/* Icon Container */}
              <div className={`flex-shrink-0 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl border shadow-sm ${theme.iconBg}`}>
                <Icon className="h-6 w-6 stroke-[2.2]" />
              </div>

              {/* Title & Description */}
              <div className="flex-1 min-w-0 pt-0.5">
                <h3 
                  id={titleId} 
                  className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-slate-900"
                >
                  {title}
                </h3>
                <p 
                  id={descId} 
                  className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-slate-500 font-normal"
                >
                  {description}
                </p>
              </div>
            </div>

            {/* Action Buttons: Full-width stacked on mobile, right-aligned row on sm+ */}
            <div className="mt-6 sm:mt-7 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5 sm:gap-3">
              <button
                type="button"
                disabled={isLoading}
                onClick={onClose}
                className="inline-flex h-10 sm:h-11 w-full sm:w-auto items-center justify-center rounded-xl border border-slate-200/90 bg-white px-4 sm:px-5 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50"
              >
                {cancelLabel}
              </button>

              <button
                type="button"
                disabled={isLoading}
                onClick={onConfirm}
                className={`inline-flex h-10 sm:h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-5 sm:px-6 text-xs sm:text-sm font-semibold shadow-md transition active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 ${theme.btnBg}`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>{confirmLabel}</span>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

ActionConfirmModal.displayName = 'ActionConfirmModal';
export default ActionConfirmModal;