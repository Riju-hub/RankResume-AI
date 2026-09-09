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
    <div className="mx-auto max-w-3xl space-y-6 font-sans text-slate-900 antialiased">
      
      {/* Background Soft Ambient Orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu">
        <div className="absolute -top-32 -left-20 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px] will-change-transform" />
        <div className="absolute top-1/3 -right-20 h-[520px] w-[520px] rounded-full bg-pink-500/20 blur-[130px] will-change-transform" />
      </div>

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
      <div className="relative z-10 overflow-hidden rounded-3xl border border-white/90 bg-white/90 p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(37,99,235,0.08)] space-y-6">
        {/* Top Multi-Color Neon Accent Rim */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-pink-500 to-indigo-600 shadow-[0_0_12px_rgba(236,72,153,0.4)]" />

        {/* Identity Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-200 bg-gradient-to-tr from-blue-50 to-pink-50 font-mono text-base font-black text-blue-700 shadow-xs">
              {initials}
              <span
                className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${
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
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-wider ${
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
                className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-xs font-bold text-slate-950 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-xs"
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
                className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-xs font-bold text-slate-950 placeholder:text-slate-400 outline-none transition-all focus:border-pink-500 focus:ring-4 focus:ring-pink-500/15 shadow-xs"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isUpdating}
              className="group relative inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 px-6 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-pink-500/35 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
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
      <div className="relative z-10 rounded-3xl border border-rose-200/90 bg-rose-50/50 p-6 sm:p-7 backdrop-blur-xl shadow-xs">
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
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-rose-300 bg-white px-5 text-xs font-extrabold text-rose-700 shadow-xs transition-all hover:bg-rose-50 hover:border-rose-400 active:scale-95 cursor-pointer shrink-0"
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