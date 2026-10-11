// frontend/src/components/common/ActionConfirmModal.jsx
import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, CheckCircle2, Pencil, PlusCircle, X, Loader2 } from 'lucide-react';

export const ActionConfirmModal = memo(({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  description = 'Are you sure you want to proceed?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  type = 'danger', // 'danger' | 'warning' | 'primary'
  isLoading = false,
}) => {
  const getTheme = () => {
    switch (type) {
      case 'danger':
        return {
          icon: Trash2,
          iconBg: 'bg-rose-50 text-rose-600 border-rose-200',
          btnBg: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20',
          ringColor: 'ring-rose-500/10',
          accentBorder: 'from-rose-500 via-pink-500 to-rose-500',
        };
      case 'warning':
        return {
          icon: Pencil,
          iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
          btnBg: 'bg-slate-900 hover:bg-blue-600 text-white shadow-slate-900/20',
          ringColor: 'ring-amber-500/10',
          accentBorder: 'from-amber-400 via-orange-500 to-amber-400',
        };
      case 'primary':
      default:
        return {
          icon: PlusCircle,
          iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
          btnBg: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 text-white shadow-blue-500/20',
          ringColor: 'ring-blue-500/10',
          accentBorder: 'from-blue-600 via-indigo-500 to-pink-500',
        };
    }
  };

  const theme = getTheme();
  const Icon = theme.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={!isLoading ? onClose : undefined}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className={`relative w-full max-w-md overflow-hidden rounded-[28px] border border-slate-200/90 bg-white p-6 sm:p-7 text-center shadow-2xl ${theme.ringColor} ring-8`}
          >
            {/* Top Accent Strip */}
            <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${theme.accentBorder}`} />

            {/* Close Button */}
            <button
              type="button"
              disabled={isLoading}
              onClick={onClose}
              className="absolute right-4 top-4 rounded-xl p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Icon Banner */}
            <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border ${theme.iconBg} shadow-sm`}>
              <Icon className="h-6 w-6 stroke-[2.2]" />
            </div>

            {/* Title & Description */}
            <h3 className="mt-4 text-lg font-black tracking-tight text-slate-950 sm:text-xl">
              {title}
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-slate-500 font-medium">
              {description}
            </p>

            {/* Button Actions */}
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={isLoading}
                onClick={onClose}
                className="h-10 w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 active:scale-95 disabled:opacity-50"
              >
                {cancelLabel}
              </button>

              <button
                type="button"
                disabled={isLoading}
                onClick={onConfirm}
                className={`inline-flex h-10 w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-5 text-xs font-bold shadow-md transition active:scale-95 disabled:opacity-50 ${theme.btnBg}`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
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