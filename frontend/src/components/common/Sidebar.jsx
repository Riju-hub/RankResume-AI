// // frontend/src/components/common/Sidebar.jsx
// import React, { useState, useMemo, memo, useCallback, useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuthContext } from '../../context/AuthContext';
// import { useSavedJobs } from '../../hooks/useSavedJobs';
// import { DeleteAccountModal } from './DeleteAccountModal';
// import {
//   LayoutDashboard,
//   PlusCircle,
//   Briefcase,
//   FileText,
//   User,
//   HelpCircle,
//   FileCheck2,
//   Trash2,
//   X,
//   Bot,
//   ScanSearch,
//   ChevronRight,
//   ShieldCheck,
//   UserCheck,
//   LogOut,
//   Bookmark,
//   Compass,
// } from 'lucide-react';

// const PRIMARY_NAV = {
//   recruiter: [
//     { name: 'Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
//     { name: 'Explore Openings', path: '/recruiter/market-jobs', icon: Compass },
//     { name: 'Create Job Post', path: '/recruiter/create-job', icon: PlusCircle },
//   ],
//   candidate: [
//     { name: 'Job Board', path: '/jobs', icon: Briefcase },
//     { name: 'Saved Jobs', path: '/candidate/saved-jobs', icon: Bookmark, badgeKey: 'savedJobs' },
//     { name: 'My Applications', path: '/my-applications', icon: FileText },
//   ],
// };

// const SECONDARY_NAV = [
//   { name: 'ATS Diagnostic', path: '/ats', icon: ScanSearch, ats: true },
//   { name: 'My Profile', path: '/profile', icon: User },
//   { name: 'Help & Feedback', path: '/help', icon: HelpCircle },
//   { name: 'Terms & Policy', path: '/terms', icon: FileCheck2 },
// ];

// // ============================================================================
// // Modern Pearlescent Aurora Sign Out Modal
// // ============================================================================
// const SignOutConfirmModal = memo(({ isOpen, onClose, onConfirm }) => {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     return () => setMounted(false);
//   }, []);

//   if (!mounted || typeof document === 'undefined') return null;

//   return createPortal(
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 font-sans">
//           {/* Backdrop Blur */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             onClick={onClose}
//             className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transform-gpu will-change-[opacity]"
//             aria-hidden="true"
//           />

//           {/* Modal Container */}
//           <motion.div
//             role="dialog"
//             aria-modal="true"
//             initial={{ opacity: 0, scale: 0.94, y: 16 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 12 }}
//             transition={{ type: 'spring', damping: 25, stiffness: 320 }}
//             className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 p-6 text-center text-slate-900 shadow-[0_25px_60px_rgba(15,23,42,0.18)] backdrop-blur-2xl sm:p-7 transform-gpu will-change-[transform,opacity]"
//           >
//             {/* Gradient Accent Bar */}
//             <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500" />

//             {/* Close Button */}
//             <button
//               type="button"
//               onClick={onClose}
//               className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
//               aria-label="Close dialog"
//             >
//               <X className="h-4 w-4" />
//             </button>

//             {/* Icon */}
//             <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-600 shadow-sm">
//               <LogOut className="h-6 w-6 stroke-[2.2]" />
//             </div>

//             {/* Content */}
//             <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
//               Sign out of platform?
//             </h3>
//             <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
//               Are you sure you want to end your current session? You will need to sign in again to access your workspace.
//             </p>

//             {/* Actions */}
//             <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
//               <button
//                 type="button"
//                 onClick={onConfirm}
//                 className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-xs font-bold text-white shadow-[0_4px_16px_rgba(99,102,241,0.25)] transition-all hover:shadow-[0_6px_22px_rgba(99,102,241,0.35)] active:scale-[0.98]"
//               >
//                 <LogOut className="h-4 w-4" />
//                 <span>Yes, Sign Out</span>
//               </button>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200"
//               >
//                 Cancel
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>,
//     document.body
//   );
// });

// SignOutConfirmModal.displayName = 'SignOutConfirmModal';

// export const Sidebar = memo(({ isOpen, onClose }) => {
//   const { isRecruiter, logout } = useAuthContext();
//   const { totalSaved } = useSavedJobs();
//   const navigate = useNavigate();
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showSignOutModal, setShowSignOutModal] = useState(false);

//   const isRecruiterRole = Boolean(isRecruiter);

//   const roleTheme = useMemo(() => {
//     return isRecruiterRole
//       ? {
//           label: 'Recruitment Hub',
//           subtitle: 'Recruiter workspace',
//           Icon: ShieldCheck,
//           gradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
//           badge: 'border-pink-200 bg-pink-50 text-pink-700',
//           iconColor: 'text-pink-600',
//           activeBg: 'border-pink-200 bg-pink-50/70 text-slate-900',
//         }
//       : {
//           label: 'Candidate Portal',
//           subtitle: 'Candidate workspace',
//           Icon: UserCheck,
//           gradient: 'from-cyan-500 via-blue-600 to-violet-600',
//           badge: 'border-blue-200 bg-blue-50 text-blue-700',
//           iconColor: 'text-blue-600',
//           activeBg: 'border-blue-200 bg-blue-50/70 text-slate-900',
//         };
//   }, [isRecruiterRole]);

//   const RoleIcon = roleTheme.Icon;
//   const primaryLinks = isRecruiterRole ? PRIMARY_NAV.recruiter : PRIMARY_NAV.candidate;

//   // Prompt signout modal
//   const handlePromptSignOut = useCallback(() => {
//     onClose?.();
//     setShowSignOutModal(true);
//   }, [onClose]);

//   // Execute signout upon user confirmation
//   const handleConfirmSignOut = useCallback(() => {
//     setShowSignOutModal(false);
//     logout();
//     navigate('/', { replace: true });
//   }, [logout, navigate]);

//   const handleDelete = useCallback(() => {
//     onClose?.();
//     setShowDeleteModal(true);
//   }, [onClose]);

//   return (
//     <>
//       {/* Backdrop overlay for mobile */}
//       {isOpen && (
//         <div
//           onClick={onClose}
//           aria-hidden="true"
//           className="fixed inset-0 z-40 bg-slate-900/30 transition-opacity duration-150 lg:hidden"
//         />
//       )}

//       {/* Main Drawer */}
//       <aside
//         className={`fixed left-0 top-16 bottom-0 z-50 flex w-[280px] flex-col border-r border-slate-200 bg-white shadow-lg transition-transform duration-200 ease-out will-change-transform lg:translate-x-0 ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}
//       >
//         {/* Scrollable Container with GPU Layer Isolation */}
//         <div 
//           className="flex-1 overflow-y-auto px-3.5 pb-4 pt-3 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] transform-gpu will-change-scroll [&::-webkit-scrollbar]:hidden"
//           style={{ overscrollBehavior: 'contain' }}
//         >
//           {/* Mobile Header */}
//           <div className="mb-2 flex items-center justify-between px-1.5 pb-2 pt-1 lg:hidden">
//             <div>
//               <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
//                 Navigation
//               </p>
//               <p className="text-sm font-bold text-slate-900">Workspace</p>
//             </div>
//             <button
//               type="button"
//               onClick={onClose}
//               aria-label="Close navigation"
//               className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-900"
//             >
//               <X className="h-4 w-4" />
//             </button>
//           </div>

//           {/* Role Status Card */}
//           <div className="relative mb-5 overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-50/70 p-3">
//             <div className="flex items-center gap-3">
//               <div
//                 className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${roleTheme.gradient} text-white shadow-xs`}
//               >
//                 <RoleIcon className="h-5 w-5" strokeWidth={2.2} />
//               </div>

//               <div className="min-w-0 flex-1">
//                 <div className="flex items-center gap-2">
//                   <h2 className="truncate text-xs font-bold text-slate-900">
//                     {roleTheme.label}
//                   </h2>
//                   <span
//                     className={`inline-flex shrink-0 items-center rounded-full border px-1.5 py-0.2 text-[8px] font-bold uppercase tracking-wider ${roleTheme.badge}`}
//                   >
//                     Active
//                   </span>
//                 </div>
//                 <p className="truncate text-[10px] font-medium text-slate-500">
//                   {roleTheme.subtitle}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Primary Workspace Nav */}
//           <section className="mb-5">
//             <div className="mb-2 flex items-center justify-between px-2">
//               <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
//                 Workspace
//               </span>
//               <span className="h-1 w-1 rounded-full bg-slate-300" />
//             </div>

//             <nav className="space-y-1" aria-label="Workspace navigation">
//               {primaryLinks.map((link) => {
//                 const Icon = link.icon;
//                 const isSavedJobs = link.badgeKey === 'savedJobs';

//                 return (
//                   <NavLink
//                     key={link.path}
//                     to={link.path}
//                     onClick={onClose}
//                     className={({ isActive }) =>
//                       `group flex h-10 items-center justify-between rounded-xl border px-3 text-xs font-semibold transition-colors duration-100 ${
//                         isActive
//                           ? `${roleTheme.activeBg} font-bold shadow-xs`
//                           : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900'
//                       }`
//                     }
//                   >
//                     {({ isActive }) => (
//                       <>
//                         <div className="flex min-w-0 items-center gap-2.5">
//                           <span
//                             className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
//                               isActive
//                                 ? `bg-white ${roleTheme.iconColor} shadow-xs`
//                                 : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-900'
//                             }`}
//                           >
//                             <Icon className="h-4 w-4" strokeWidth={2.2} />
//                           </span>
//                           <span className="truncate">{link.name}</span>
//                         </div>

//                         <div className="flex items-center gap-1.5">
//                           {isSavedJobs && Boolean(totalSaved > 0) && (
//                             <span
//                               className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
//                                 isActive
//                                   ? 'bg-blue-600 text-white'
//                                   : 'bg-blue-50 text-blue-700 border border-blue-200'
//                               }`}
//                             >
//                               {totalSaved}
//                             </span>
//                           )}

//                           <ChevronRight
//                             className={`h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 ${
//                               isActive ? roleTheme.iconColor : 'text-slate-400 opacity-60'
//                             }`}
//                             strokeWidth={2.2}
//                           />
//                         </div>
//                       </>
//                     )}
//                   </NavLink>
//                 );
//               })}
//             </nav>
//           </section>

//           <div className="mb-4 h-px bg-slate-100" />

//           {/* Secondary Account & Diagnostic Nav */}
//           <section>
//             <div className="mb-2 px-2">
//               <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
//                 Account & Diagnostics
//               </span>
//             </div>

//             <nav className="space-y-1" aria-label="Account navigation">
//               {SECONDARY_NAV.map((link) => {
//                 const Icon = link.icon;
//                 return (
//                   <NavLink
//                     key={link.path}
//                     to={link.path}
//                     onClick={onClose}
//                     className={({ isActive }) =>
//                       `group flex h-10 items-center justify-between rounded-xl border px-3 text-xs font-semibold transition-colors duration-100 ${
//                         isActive
//                           ? link.ats
//                             ? 'border-violet-200 bg-violet-50 text-violet-950 font-bold shadow-xs'
//                             : 'border-slate-200 bg-slate-100 text-slate-950 font-bold shadow-xs'
//                           : link.ats
//                           ? 'border-transparent bg-violet-50/40 text-violet-700 hover:border-violet-200 hover:bg-violet-50'
//                           : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900'
//                       }`
//                     }
//                   >
//                     {({ isActive }) => (
//                       <>
//                         <div className="flex min-w-0 items-center gap-2.5">
//                           <span
//                             className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
//                               isActive
//                                 ? link.ats
//                                   ? 'bg-violet-600 text-white shadow-xs'
//                                   : 'bg-white text-indigo-600 shadow-xs'
//                                 : link.ats
//                                 ? 'bg-violet-100 text-violet-600'
//                                 : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-900'
//                             }`}
//                           >
//                             <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
//                           </span>
//                           <span className="truncate">{link.name}</span>
//                         </div>
//                         <ChevronRight
//                           className={`h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 ${
//                             isActive
//                               ? link.ats
//                                 ? 'text-violet-600'
//                                 : 'text-slate-700'
//                               : 'text-slate-400 opacity-60'
//                           }`}
//                           strokeWidth={2.2}
//                         />
//                       </>
//                     )}
//                   </NavLink>
//                 );
//               })}

//               {/* Sign Out Trigger Button */}
//               <button
//                 type="button"
//                 onClick={handlePromptSignOut}
//                 className="group flex h-10 w-full items-center justify-between rounded-xl border border-transparent px-3 text-left text-xs font-semibold text-slate-600 transition-colors duration-100 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
//               >
//                 <div className="flex min-w-0 items-center gap-2.5">
//                   <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-900">
//                     <LogOut className="h-3.5 w-3.5" strokeWidth={2.2} />
//                   </span>
//                   <span>Sign Out</span>
//                 </div>
//                 <ChevronRight className="h-3.5 w-3.5 text-slate-400 opacity-60" strokeWidth={2.2} />
//               </button>

//               {/* Delete Account Button */}
//               <button
//                 type="button"
//                 onClick={handleDelete}
//                 className="group flex h-10 w-full items-center justify-between rounded-xl border border-transparent px-3 text-left text-xs font-semibold text-rose-600 transition-colors duration-100 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 cursor-pointer"
//               >
//                 <div className="flex min-w-0 items-center gap-2.5">
//                   <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-500 group-hover:bg-white">
//                     <Trash2 className="h-3.5 w-3.5" strokeWidth={2.2} />
//                   </span>
//                   <span>Delete Account</span>
//                 </div>
//                 <ChevronRight className="h-3.5 w-3.5 text-rose-400 opacity-60" strokeWidth={2.2} />
//               </button>
//             </nav>
//           </section>
//         </div>

//         {/* Fixed Engine Status Footer */}
//         <div className="border-t border-slate-200/90 bg-white p-3">
//           <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-2.5">
//             <div className="flex items-center justify-between">
//               <div className="flex min-w-0 items-center gap-2">
//                 <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 text-white shadow-xs">
//                   <Bot className="h-3.5 w-3.5" strokeWidth={2.2} />
//                 </div>
//                 <div className="min-w-0">
//                   <p className="truncate text-[11px] font-bold text-slate-900">
//                     Gemini 2.5 ATS
//                   </p>
//                   <p className="font-mono text-[8px] font-bold uppercase tracking-wider text-blue-600">
//                     Operational
//                   </p>
//                 </div>
//               </div>
//               <span className="relative flex h-2 w-2 shrink-0">
//                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
//                 <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
//               </span>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* Modern Center Sign Out Confirmation Modal */}
//       <SignOutConfirmModal
//         isOpen={showSignOutModal}
//         onClose={() => setShowSignOutModal(false)}
//         onConfirm={handleConfirmSignOut}
//       />

//       {/* Account Deletion Dialog */}
//       <DeleteAccountModal
//         isOpen={showDeleteModal}
//         onClose={() => setShowDeleteModal(false)}
//       />
//     </>
//   );
// });

// Sidebar.displayName = 'Sidebar';
// export default Sidebar;







// frontend/src/components/common/Sidebar.jsx
import React, { useState, useMemo, memo, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '../../context/AuthContext';
import { useSavedJobs } from '../../hooks/useSavedJobs';
import { DeleteAccountModal } from './DeleteAccountModal';
import {
  LayoutDashboard,
  PlusCircle,
  Briefcase,
  FileText,
  User,
  HelpCircle,
  FileCheck2,
  Trash2,
  X,
  Bot,
  ScanSearch,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  LogOut,
  Bookmark,
  Compass,
} from 'lucide-react';

const PRIMARY_NAV = {
  recruiter: [
    { name: 'Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
    { name: 'Explore Openings', path: '/recruiter/market-jobs', icon: Compass },
    { name: 'Create Job Post', path: '/recruiter/create-job', icon: PlusCircle },
  ],
  candidate: [
    { name: 'Job Board', path: '/jobs', icon: Briefcase },
    { name: 'Saved Jobs', path: '/candidate/saved-jobs', icon: Bookmark, badgeKey: 'savedJobs' },
    { name: 'My Applications', path: '/my-applications', icon: FileText },
  ],
};

const SECONDARY_NAV = [
  { name: 'ATS Diagnostic', path: '/ats', icon: ScanSearch, ats: true },
  { name: 'My Profile', path: '/profile', icon: User },
  { name: 'Help & Feedback', path: '/help', icon: HelpCircle },
  { name: 'Terms & Policy', path: '/terms', icon: FileCheck2 },
];

// ============================================================================
// Modern Lag-Free Sign Out Modal
// ============================================================================
const SignOutConfirmModal = memo(({ isOpen, onClose, onConfirm }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 font-sans overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Lightweight Scrim Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', damping: 26, stiffness: 340 }}
            className="relative my-auto w-full max-w-sm overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 text-center text-slate-900 shadow-2xl ring-4 sm:ring-8 ring-indigo-500/10"
          >
            {/* Top Multi-Color Accent Rim (Cyan -> Indigo -> Violet -> Pink) */}
            <div 
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 sm:h-1.5 bg-gradient-to-r from-cyan-400 via-indigo-600 to-pink-500" 
            />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3.5 top-3.5 sm:right-4 sm:top-4 flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4 stroke-[2.2]" />
            </button>

            {/* Icon */}
            <div className="mx-auto flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-indigo-200/80 bg-indigo-50 text-indigo-600 shadow-xs">
              <LogOut className="h-6 w-6 stroke-[2.2]" />
            </div>

            {/* Content */}
            <h3 className="mt-4 text-lg sm:text-xl font-bold tracking-tight text-slate-950">
              Sign out of platform?
            </h3>
            <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-slate-500 font-normal">
              Are you sure you want to end your current session? You will need to sign in again to access your workspace.
            </p>

            {/* Action Buttons: Stacked on mobile, row on sm+ */}
            <div className="mt-6 flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 sm:h-11 flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="inline-flex h-10 sm:h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-4 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-500/25 transition-all hover:brightness-105 active:scale-[0.98]"
              >
                <LogOut className="h-4 w-4" />
                <span>Yes, Sign Out</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
});

SignOutConfirmModal.displayName = 'SignOutConfirmModal';

// ============================================================================
// Main Sidebar Navigation
// ============================================================================
export const Sidebar = memo(({ isOpen, onClose }) => {
  const { isRecruiter, logout } = useAuthContext();
  const { totalSaved } = useSavedJobs();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const isRecruiterRole = Boolean(isRecruiter);

  const roleTheme = useMemo(() => {
    return isRecruiterRole
      ? {
          label: 'Recruitment Hub',
          subtitle: 'Enterprise Recruiter Console',
          Icon: ShieldCheck,
          gradient: 'from-pink-500 via-rose-500 to-fuchsia-600',
          badge: 'border-pink-200/90 bg-pink-50 text-pink-700',
          iconColor: 'text-pink-600',
          activeBg: 'border-pink-200 bg-pink-50/80 text-slate-900',
        }
      : {
          label: 'Candidate Portal',
          subtitle: 'Talent Workspace',
          Icon: UserCheck,
          gradient: 'from-cyan-500 via-blue-600 to-violet-600',
          badge: 'border-blue-200/90 bg-blue-50 text-blue-700',
          iconColor: 'text-blue-600',
          activeBg: 'border-blue-200 bg-blue-50/80 text-slate-900',
        };
  }, [isRecruiterRole]);

  const RoleIcon = roleTheme.Icon;
  const primaryLinks = isRecruiterRole ? PRIMARY_NAV.recruiter : PRIMARY_NAV.candidate;

  // Prompt signout modal
  const handlePromptSignOut = useCallback(() => {
    onClose?.();
    setShowSignOutModal(true);
  }, [onClose]);

  // Execute signout upon user confirmation
  const handleConfirmSignOut = useCallback(() => {
    setShowSignOutModal(false);
    logout();
    navigate('/', { replace: true });
  }, [logout, navigate]);

  const handleDelete = useCallback(() => {
    onClose?.();
    setShowDeleteModal(true);
  }, [onClose]);

  return (
    <>
      {/* Mobile Drawer Scrim */}
      {isOpen && (
        <div
          onClick={onClose}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs transition-opacity duration-150 lg:hidden"
        />
      )}

      {/* Main Responsive Drawer */}
      <aside
        className={`fixed left-0 top-16 bottom-0 z-50 flex w-72 flex-col border-r border-slate-200/90 bg-white font-sans text-slate-800 antialiased shadow-xl lg:shadow-none transition-transform duration-200 ease-out transform-gpu will-change-transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Multi-Color Brand Line */}
        <div 
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-600 via-violet-600 to-pink-500" 
        />

        {/* Scrollable Nav Area */}
        <div 
          className="flex-1 overflow-y-auto px-3.5 pb-4 pt-3.5 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] transform-gpu will-change-scroll [&::-webkit-scrollbar]:hidden"
          style={{ overscrollBehavior: 'contain' }}
        >
          {/* Mobile Close Bar */}
          <div className="mb-2.5 flex items-center justify-between px-1.5 pb-2 pt-0.5 lg:hidden border-b border-slate-100">
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Navigation
              </p>
              <p className="text-sm font-bold text-slate-900">Workspace</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation"
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-900 focus:outline-none"
            >
              <X className="h-4 w-4 stroke-[2.2]" />
            </button>
          </div>

          {/* User Workspace Role Card */}
          <div className="relative mb-4 overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-50/70 p-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${roleTheme.gradient} text-white shadow-2xs`}
              >
                <RoleIcon className="h-5 w-5 stroke-[2.2]" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h2 className="truncate text-xs font-bold text-slate-900">
                    {roleTheme.label}
                  </h2>
                  <span
                    className={`inline-flex shrink-0 items-center rounded-full border px-1.5 py-0.2 text-[8px] font-bold uppercase tracking-wider ${roleTheme.badge}`}
                  >
                    Active
                  </span>
                </div>
                <p className="truncate text-[10px] font-medium text-slate-500">
                  {roleTheme.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Primary Nav Links */}
          <section className="mb-4">
            <div className="mb-2 flex items-center justify-between px-2">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
                Workspace
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
            </div>

            <nav className="space-y-1" aria-label="Primary navigation">
              {primaryLinks.map((link) => {
                const Icon = link.icon;
                const isSavedJobs = link.badgeKey === 'savedJobs';

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex h-10 items-center justify-between rounded-xl border px-3 text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? `${roleTheme.activeBg} font-bold shadow-2xs`
                          : 'border-transparent text-slate-600 hover:border-slate-200/90 hover:bg-slate-50 hover:text-slate-900'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-150 ${
                              isActive
                                ? `bg-white ${roleTheme.iconColor} shadow-2xs`
                                : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-900'
                            }`}
                          >
                            <Icon className="h-4 w-4 stroke-[2.2]" />
                          </span>
                          <span className="truncate">{link.name}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {isSavedJobs && Boolean(totalSaved > 0) && (
                            <span
                              className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                                isActive
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-blue-50 text-blue-700 border border-blue-200'
                              }`}
                            >
                              {totalSaved}
                            </span>
                          )}

                          <ChevronRight
                            className={`h-3.5 w-3.5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 ${
                              isActive ? roleTheme.iconColor : 'text-slate-400 opacity-60'
                            }`}
                            strokeWidth={2.2}
                          />
                        </div>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </section>

          <div className="mb-4 h-px bg-slate-100" />

          {/* Secondary Nav & Actions */}
          <section>
            <div className="mb-2 px-2">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
                Account & Diagnostics
              </span>
            </div>

            <nav className="space-y-1" aria-label="Secondary navigation">
              {SECONDARY_NAV.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex h-10 items-center justify-between rounded-xl border px-3 text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? link.ats
                            ? 'border-violet-200 bg-violet-50 text-violet-950 font-bold shadow-2xs'
                            : 'border-slate-200 bg-slate-100 text-slate-950 font-bold shadow-2xs'
                          : link.ats
                          ? 'border-transparent bg-violet-50/40 text-violet-700 hover:border-violet-200 hover:bg-violet-50'
                          : 'border-transparent text-slate-600 hover:border-slate-200/90 hover:bg-slate-50 hover:text-slate-900'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-150 ${
                              isActive
                                ? link.ats
                                  ? 'bg-violet-600 text-white shadow-2xs'
                                  : 'bg-white text-indigo-600 shadow-2xs'
                                : link.ats
                                ? 'bg-violet-100 text-violet-600'
                                : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-900'
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5 stroke-[2.2]" />
                          </span>
                          <span className="truncate">{link.name}</span>
                        </div>
                        <ChevronRight
                          className={`h-3.5 w-3.5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 ${
                            isActive
                              ? link.ats
                                ? 'text-violet-600'
                                : 'text-slate-700'
                              : 'text-slate-400 opacity-60'
                          }`}
                          strokeWidth={2.2}
                        />
                      </>
                    )}
                  </NavLink>
                );
              })}

              {/* Sign Out Trigger Button */}
              <button
                type="button"
                onClick={handlePromptSignOut}
                className="group flex h-10 w-full items-center justify-between rounded-xl border border-transparent px-3 text-left text-xs font-semibold text-slate-600 transition-colors duration-150 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-900 transition-colors duration-150">
                    <LogOut className="h-3.5 w-3.5 stroke-[2.2]" />
                  </span>
                  <span>Sign Out</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 opacity-60 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={2.2} />
              </button>

              {/* Delete Account Button */}
              <button
                type="button"
                onClick={handleDelete}
                className="group flex h-10 w-full items-center justify-between rounded-xl border border-transparent px-3 text-left text-xs font-semibold text-rose-600 transition-colors duration-150 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 cursor-pointer"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-500 group-hover:bg-white transition-colors duration-150">
                    <Trash2 className="h-3.5 w-3.5 stroke-[2.2]" />
                  </span>
                  <span>Delete Account</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-rose-400 opacity-60 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={2.2} />
              </button>
            </nav>
          </section>
        </div>

        {/* Engine Telemetry Bottom Status Card */}
        <div className="border-t border-slate-200/90 bg-white p-3">
          <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 text-white shadow-2xs">
                  <Bot className="h-3.5 w-3.5 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-bold text-slate-900">
                    Gemini 2.5 ATS
                  </p>
                  <p className="font-mono text-[8px] font-bold uppercase tracking-wider text-blue-600">
                    Operational
                  </p>
                </div>
              </div>
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Confirmation Modals */}
      <SignOutConfirmModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={handleConfirmSignOut}
      />

      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </>
  );
});

Sidebar.displayName = 'Sidebar';
export default Sidebar;