// import React, { useState } from 'react';
// import { useAuthContext } from '../../context/AuthContext';
// import { authService } from '../../services/authService';
// import { DeleteAccountModal } from '../../components/common/DeleteAccountModal';
// import { 
//   User, 
//   Mail, 
//   ShieldCheck, 
//   UserCheck, 
//   CheckCircle2, 
//   AlertCircle, 
//   Loader2, 
//   Trash2,
//   Sparkles,
//   Zap,
//   ShieldAlert
// } from 'lucide-react';

// export const Profile = () => {
//   const { user, isRecruiter, updateUserState } = useAuthContext();
//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//   });
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [feedback, setFeedback] = useState({ type: '', message: '' });
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setIsUpdating(true);
//     setFeedback({ type: '', message: '' });
//     try {
//       const res = await authService.updateProfile(formData);
//       updateUserState(res.user);
//       setFeedback({ type: 'success', message: 'Profile updated successfully!' });
//     } catch (err) {
//       setFeedback({ type: 'error', message: err.response?.data?.message || 'Failed to update profile.' });
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const initials = (user?.name || 'U')
//     .trim()
//     .split(/\s+/)
//     .map((n) => n[0])
//     .slice(0, 2)
//     .join('')
//     .toUpperCase();

//   return (
//     <div className="mx-auto max-w-3xl space-y-6 font-sans">
      
//       {/* ========================================================================= */}
//       {/* --- Header Section --- */}
//       {/* ========================================================================= */}
//       <div className="space-y-1">
//         <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-0.5 text-xs font-semibold text-cyan-300">
//           <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
//           <span>Identity & Access Control</span>
//         </div>
//         <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
//           Account <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">Profile</span>
//         </h1>
//         <p className="text-xs text-slate-400">
//           Manage your verified credentials, workspace role, and system authorizations.
//         </p>
//       </div>

//       {/* ========================================================================= */}
//       {/* --- Feedback Alert Toast --- */}
//       {/* ========================================================================= */}
//       {feedback.message && (
//         <div
//           className={`flex items-center gap-2.5 rounded-2xl p-4 text-xs font-medium backdrop-blur-md border ${
//             feedback.type === 'success'
//               ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300'
//               : 'border-rose-500/30 bg-rose-950/40 text-rose-300'
//           }`}
//         >
//           {feedback.type === 'success' ? (
//             <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
//           ) : (
//             <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
//           )}
//           <span>{feedback.message}</span>
//         </div>
//       )}

//       {/* ========================================================================= */}
//       {/* --- Profile Overview & Edit Form Card --- */}
//       {/* ========================================================================= */}
//       <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
//         {/* Hardware-Accelerated Ambient Top Horizon Glow */}
//         <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

//         {/* Identity Row */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950 font-mono text-base font-black text-white shadow-inner">
//               {initials}
//               <span
//                 className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-900 ${
//                   isRecruiter ? 'bg-pink-500 ring-1 ring-pink-400/40' : 'bg-cyan-400 ring-1 ring-cyan-400/40'
//                 }`}
//                 title="Active Session"
//               />
//             </div>
//             <div>
//               <h2 className="text-base sm:text-lg font-bold text-white">{user?.name || 'Authorized User'}</h2>
//               <div className="mt-1 flex flex-wrap items-center gap-2">
//                 <span className="font-mono text-xs text-slate-400">{user?.email}</span>
//                 <span
//                   className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
//                     isRecruiter
//                       ? 'border-pink-500/30 bg-pink-950/40 text-pink-300'
//                       : 'border-cyan-500/30 bg-cyan-950/40 text-cyan-300'
//                   }`}
//                 >
//                   {isRecruiter ? <ShieldCheck className="h-3 w-3 text-pink-400" /> : <UserCheck className="h-3 w-3 text-cyan-400" />}
//                   {isRecruiter ? 'Recruiter' : 'Candidate'}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Edit Form */}
//         <form onSubmit={handleUpdate} className="space-y-4 border-t border-slate-800/80 pt-6">
//           <div className="space-y-1.5">
//             <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
//               Full Name
//             </label>
//             <div className="relative">
//               <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
//               <input
//                 type="text"
//                 name="name"
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Your full name"
//                 className="h-10 w-full rounded-xl border border-slate-800 bg-slate-950/70 pl-10 pr-4 text-xs font-medium text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
//               />
//             </div>
//           </div>

//           <div className="space-y-1.5">
//             <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
//               Email Address
//             </label>
//             <div className="relative">
//               <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
//               <input
//                 type="email"
//                 name="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="name@company.com"
//                 className="h-10 w-full rounded-xl border border-slate-800 bg-slate-950/70 pl-10 pr-4 text-xs font-medium text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
//               />
//             </div>
//           </div>

//           <div className="flex justify-end pt-2">
//             <button
//               type="submit"
//               disabled={isUpdating}
//               className="group relative inline-flex h-10 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 px-6 text-xs font-bold text-white shadow-xl shadow-indigo-600/20 transition-all hover:scale-[1.02] hover:shadow-indigo-600/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
//             >
//               {isUpdating ? (
//                 <>
//                   <Loader2 className="h-3.5 w-3.5 animate-spin" />
//                   <span>Updating Credentials...</span>
//                 </>
//               ) : (
//                 <>
//                   <Zap className="h-3.5 w-3.5" />
//                   <span>Save Changes</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* ========================================================================= */}
//       {/* --- Danger Zone Container --- */}
//       {/* ========================================================================= */}
//       <div className="rounded-3xl border border-rose-500/25 bg-rose-950/20 p-6 sm:p-7 backdrop-blur-xl shadow-xl">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div className="space-y-1">
//             <div className="flex items-center gap-2 font-bold text-rose-400">
//               <ShieldAlert className="h-4 w-4" />
//               <h3 className="font-mono text-xs uppercase tracking-wider">Danger Zone</h3>
//             </div>
//             <p className="text-xs text-slate-400 leading-relaxed">
//               Permanently purge this account, parsed PDF evaluations, and active hiring pipelines.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={() => setShowDeleteModal(true)}
//             className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-950/40 px-5 text-xs font-bold text-rose-300 transition-all hover:border-rose-500/60 hover:bg-rose-950/70 hover:text-rose-200 active:scale-95 cursor-pointer shrink-0"
//           >
//             <Trash2 className="h-4 w-4 text-rose-400" />
//             <span>Delete Account</span>
//           </button>
//         </div>
//       </div>

//       <DeleteAccountModal 
//         isOpen={showDeleteModal} 
//         onClose={() => setShowDeleteModal(false)} 
//       />
//     </div>
//   );
// };

// export default Profile;









import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { DeleteAccountModal } from '../../components/common/DeleteAccountModal';
import { 
  User, 
  Mail, 
  ShieldCheck, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Trash2,
  Sparkles,
  Zap,
  ShieldAlert
} from 'lucide-react';

/*
  RankResume AI — Modern Profile UI
  ---------------------------------
  Pure JSX / JavaScript.
  Uses lightweight CSS transforms/opacity for smooth animation.
*/

const ProfileBackground = () => (
  <>
    <style>{`
      .rr-profile-page {
        position: relative;
        isolation: isolate;
      }

      .rr-profile-bg {
        position: fixed;
        inset: 0;
        z-index: -10;
        overflow: hidden;
        pointer-events: none;
        background:
          radial-gradient(circle at 8% 8%, rgba(59,130,246,.13), transparent 30%),
          radial-gradient(circle at 92% 20%, rgba(236,72,153,.12), transparent 32%),
          radial-gradient(circle at 45% 100%, rgba(99,102,241,.09), transparent 34%),
          linear-gradient(135deg, #f8fbff 0%, #ffffff 45%, #fff8fc 100%);
      }

      .rr-profile-grid {
        position: absolute;
        inset: 0;
        opacity: .32;
        background-image: radial-gradient(
          rgba(59,130,246,.20) .7px,
          transparent .8px
        );
        background-size: 24px 24px;
        mask-image: linear-gradient(to bottom, black, transparent 92%);
        -webkit-mask-image: linear-gradient(to bottom, black, transparent 92%);
      }

      .rr-profile-orb {
        position: absolute;
        border-radius: 9999px;
        pointer-events: none;
        filter: blur(50px);
        will-change: transform, opacity;
        transform: translate3d(0,0,0);
        animation: rr-profile-float 20s ease-in-out infinite;
      }

      .rr-profile-orb-blue {
        width: 360px;
        height: 360px;
        left: -170px;
        top: 70px;
        background: rgba(37,99,235,.17);
      }

      .rr-profile-orb-pink {
        width: 390px;
        height: 390px;
        right: -190px;
        top: 220px;
        background: rgba(236,72,153,.15);
        animation-delay: -7s;
        animation-duration: 24s;
      }

      .rr-profile-orb-violet {
        width: 280px;
        height: 280px;
        left: 34%;
        bottom: -150px;
        background: rgba(124,58,237,.11);
        animation-delay: -13s;
        animation-duration: 27s;
      }

      @keyframes rr-profile-float {
        0%, 100% {
          transform: translate3d(0,0,0) scale(1);
          opacity: .75;
        }
        50% {
          transform: translate3d(20px,-18px,0) scale(1.06);
          opacity: 1;
        }
      }

      .rr-profile-card {
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,.88);
        background:
          linear-gradient(
            135deg,
            rgba(255,255,255,.91),
            rgba(255,255,255,.78)
          );
        box-shadow:
          0 24px 70px rgba(37,99,235,.08),
          0 5px 22px rgba(15,23,42,.04);
        backdrop-filter: blur(22px);
        -webkit-backdrop-filter: blur(22px);
      }

      .rr-profile-card::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          radial-gradient(circle at 100% 0%, rgba(236,72,153,.08), transparent 32%),
          radial-gradient(circle at 0% 100%, rgba(6,182,212,.06), transparent 30%);
      }

      .rr-profile-spectrum {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 3px;
        background: linear-gradient(
          90deg,
          #06b6d4,
          #2563eb,
          #7c3aed,
          #ec4899,
          #f43f5e
        );
        background-size: 220% 100%;
        animation: rr-spectrum 9s linear infinite;
        box-shadow: 0 0 14px rgba(99,102,241,.24);
      }

      @keyframes rr-spectrum {
        0% { background-position: 0% 50%; }
        100% { background-position: 220% 50%; }
      }

      .rr-profile-badge {
        position: relative;
        overflow: hidden;
        background: linear-gradient(
          105deg,
          rgba(239,246,255,.92),
          rgba(255,255,255,.88),
          rgba(253,242,248,.92)
        );
      }

      .rr-profile-badge::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: -80%;
        width: 45%;
        transform: skewX(-18deg);
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255,255,255,.75),
          transparent
        );
        animation: rr-badge-shine 6s ease-in-out infinite;
      }

      @keyframes rr-badge-shine {
        0%, 65% { transform: translate3d(-180%,0,0) skewX(-18deg); }
        82%, 100% { transform: translate3d(360%,0,0) skewX(-18deg); }
      }

      .rr-profile-avatar {
        position: relative;
        overflow: hidden;
        transform: translate3d(0,0,0);
        background: linear-gradient(
          135deg,
          #06b6d4,
          #2563eb,
          #7c3aed,
          #ec4899
        );
        background-size: 180% 180%;
        animation: rr-avatar-gradient 8s ease-in-out infinite;
        box-shadow:
          0 10px 28px rgba(37,99,235,.16),
          0 0 24px rgba(236,72,153,.08);
      }

      @keyframes rr-avatar-gradient {
        0%, 100% { background-position: 0% 30%; }
        50% { background-position: 100% 70%; }
      }

      .rr-profile-avatar::after {
        content: "";
        position: absolute;
        width: 75px;
        height: 75px;
        left: -45px;
        top: -45px;
        border-radius: 9999px;
        background: rgba(255,255,255,.40);
        pointer-events: none;
      }

      .rr-live-dot {
        animation: rr-live-dot 2.6s ease-in-out infinite;
      }

      @keyframes rr-live-dot {
        0%, 100% {
          box-shadow: 0 0 0 0 rgba(37,99,235,.20);
        }
        50% {
          box-shadow: 0 0 0 6px rgba(37,99,235,0);
        }
      }

      .rr-profile-input {
        transition:
          border-color 180ms ease,
          box-shadow 180ms ease,
          transform 180ms cubic-bezier(.22,1,.36,1),
          background-color 180ms ease;
      }

      .rr-profile-input:hover {
        border-color: rgba(148,163,184,.72);
        background: rgba(255,255,255,.96);
      }

      .rr-profile-input:focus {
        transform: translate3d(0,-1px,0);
      }

      .rr-save-button {
        position: relative;
        overflow: hidden;
        transform: translate3d(0,0,0);
        background: linear-gradient(
          105deg,
          #2563eb,
          #4f46e5,
          #7c3aed,
          #ec4899
        );
        background-size: 220% 100%;
        animation: rr-save-gradient 8s ease-in-out infinite;
        transition:
          transform 180ms cubic-bezier(.22,1,.36,1),
          box-shadow 180ms ease;
      }

      .rr-save-button::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
          105deg,
          transparent 15%,
          rgba(255,255,255,.26) 48%,
          transparent 70%
        );
        transform: translate3d(-130%,0,0);
        animation: rr-save-shine 5.5s ease-in-out infinite;
        pointer-events: none;
      }

      .rr-save-button:hover:not(:disabled) {
        transform: translate3d(0,-2px,0);
        box-shadow:
          0 14px 32px rgba(37,99,235,.22),
          0 0 20px rgba(236,72,153,.10);
      }

      @keyframes rr-save-gradient {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }

      @keyframes rr-save-shine {
        0%, 60% { transform: translate3d(-130%,0,0); }
        78%, 100% { transform: translate3d(130%,0,0); }
      }

      .rr-danger-card {
        position: relative;
        overflow: hidden;
        background:
          radial-gradient(circle at 100% 0%, rgba(244,63,94,.08), transparent 34%),
          rgba(255,247,248,.72);
      }

      .rr-danger-card::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: linear-gradient(#f43f5e, #ec4899);
      }

      .rr-delete-button {
        transition:
          transform 180ms cubic-bezier(.22,1,.36,1),
          background-color 180ms ease,
          box-shadow 180ms ease;
      }

      .rr-delete-button:hover {
        transform: translate3d(0,-1px,0);
        box-shadow: 0 8px 22px rgba(244,63,94,.10);
      }

      @media (prefers-reduced-motion: reduce) {
        .rr-profile-orb,
        .rr-profile-spectrum,
        .rr-profile-badge::after,
        .rr-profile-avatar,
        .rr-live-dot,
        .rr-save-button,
        .rr-save-button::before {
          animation: none !important;
        }

        .rr-profile-input,
        .rr-save-button,
        .rr-delete-button {
          transition: none !important;
        }

        .rr-save-button:hover:not(:disabled),
        .rr-delete-button:hover {
          transform: none;
        }
      }
    `}</style>

    <div className="rr-profile-bg" aria-hidden="true">
      <div className="rr-profile-grid" />
      <div className="rr-profile-orb rr-profile-orb-blue" />
      <div className="rr-profile-orb rr-profile-orb-pink" />
      <div className="rr-profile-orb rr-profile-orb-violet" />
    </div>
  </>
);


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
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="rr-profile-page mx-auto max-w-3xl space-y-6 font-sans text-slate-900 antialiased">
      <ProfileBackground />
      
      {/* ========================================================================= */}
      {/* --- Header Section --- */}
      {/* ========================================================================= */}
      <div className="relative z-10 space-y-1.5">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-bold text-blue-700 shadow-xs backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-pink-600 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Identity & Access Control</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
          Account <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">Profile</span>
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-600">
          Manage your verified credentials, workspace role, and system authorizations.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* --- Feedback Alert Toast --- */}
      {/* ========================================================================= */}
      {feedback.message && (
        <div
          className={`relative z-10 flex items-center gap-2.5 rounded-2xl p-4 text-xs font-bold shadow-xs backdrop-blur-md border ${
            feedback.type === 'success'
              ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
              : 'border-rose-300 bg-rose-50 text-rose-800'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 stroke-[2.5]" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* --- Profile Overview & Edit Form Card --- */}
      {/* ========================================================================= */}
      <div className="rr-profile-card relative z-10 space-y-6 rounded-[28px] p-6 sm:p-8">
        {/* Top Multi-Color Neon Accent Rim */}
        <div className="rr-profile-spectrum" />

        {/* Identity Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="rr-profile-avatar relative flex h-14 w-14 items-center justify-center rounded-2xl p-[2px] font-mono text-base font-black text-blue-700">
              {initials}
              <span
                className={`rr-live-dot absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${
                  isRecruiter ? 'bg-pink-600' : 'bg-blue-600'
                }`}
                title="Active Session"
              />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-950">{user?.name || 'Authorized User'}</h2>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-semibold text-slate-500">{user?.email}</span>
                <span
                  className={`rr-profile-badge inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-wider ${
                    isRecruiter
                      ? 'border-pink-200 bg-pink-50 text-pink-700'
                      : 'border-blue-200 bg-blue-50 text-blue-700'
                  }`}
                >
                  {isRecruiter ? (
                    <ShieldCheck className="h-3.5 w-3.5 text-pink-600 stroke-[2.5]" />
                  ) : (
                    <UserCheck className="h-3.5 w-3.5 text-blue-600 stroke-[2.5]" />
                  )}
                  {isRecruiter ? 'Recruiter' : 'Candidate'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleUpdate} className="space-y-4 border-t border-slate-200 pt-6">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-800">
              Full Name
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-600 stroke-[2.2]" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="rr-profile-input h-11 w-full rounded-xl border border-slate-300/90 bg-white/85 pl-10 pr-4 text-xs font-bold text-slate-950 placeholder:text-slate-400 outline-none shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-800">
              Email Address
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-600 stroke-[2.2]" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="rr-profile-input h-11 w-full rounded-xl border border-slate-300/90 bg-white/85 pl-10 pr-4 text-xs font-bold text-slate-950 placeholder:text-slate-400 outline-none shadow-sm focus:border-pink-500 focus:ring-4 focus:ring-pink-500/15"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isUpdating}
              className="rr-save-button group relative inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-xl px-6 text-xs font-extrabold text-white shadow-lg shadow-blue-500/20 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                  <span>Updating Credentials...</span>
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 fill-white text-white" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ========================================================================= */}
      {/* --- Danger Zone Container --- */}
      {/* ========================================================================= */}
      <div className="rr-danger-card relative z-10 rounded-[28px] border border-rose-200/80 p-6 sm:p-7 backdrop-blur-xl shadow-[0_15px_40px_rgba(244,63,94,0.06)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-black text-rose-700">
              <ShieldAlert className="h-4 w-4 stroke-[2.5]" />
              <h3 className="font-mono text-xs uppercase tracking-wider">Danger Zone</h3>
            </div>
            <p className="text-xs font-semibold text-slate-600 leading-relaxed">
              Permanently purge this account, parsed PDF evaluations, and active hiring pipelines.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="rr-delete-button inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-rose-300 bg-white/90 px-5 text-xs font-extrabold text-rose-700 shadow-sm hover:bg-rose-50 hover:border-rose-400 active:scale-95 cursor-pointer shrink-0"
          >
            <Trash2 className="h-4 w-4 text-rose-600 stroke-[2.2]" />
            <span>Delete Account</span>
          </button>
        </div>
      </div>

      <DeleteAccountModal 
        isOpen={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)} 
      />
    </div>
  );
};

export default Profile;