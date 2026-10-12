// // frontend/src/pages/candidate/JobDetails.jsx
// import React, { useState, useEffect, useMemo } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useJobs, useJobReviews } from '../../hooks/useJobs';
// import { useSavedJobs } from '../../hooks/useSavedJobs';
// import { useAuth } from '../../hooks/useAuth';
// import ApplyJobModal from './ApplyJobModal';
// import EditJobModal from '../../components/jobs/EditJobModal';
// import ActionConfirmModal from '../../components/common/ActionConfirmModal';
// import {
//   ArrowLeft,
//   Building2,
//   MapPin,
//   Clock,
//   Briefcase,
//   Coins,
//   Flame,
//   Sparkles,
//   CheckCircle2,
//   AlertCircle,
//   Loader2,
//   Share2,
//   Check,
//   Users,
//   Pencil,
//   ShieldCheck,
//   ArrowUpRight,
//   Star,
//   MessageSquare,
//   Trash2,
//   Send,
//   X,
//   Bookmark,
// } from 'lucide-react';

// const SKILL_THEMES = [
//   'bg-blue-50/90 text-blue-700 border-blue-200/70',
//   'bg-indigo-50/90 text-indigo-700 border-indigo-200/70',
//   'bg-violet-50/90 text-violet-700 border-violet-200/70',
//   'bg-sky-50/90 text-sky-700 border-sky-200/70',
//   'bg-emerald-50/90 text-emerald-700 border-emerald-200/70',
// ];

// const getUserId = (userObj) => {
//   if (!userObj) return null;
//   if (typeof userObj === 'string') return userObj;
//   return userObj._id || userObj.id || userObj.userId || userObj.sub || null;
// };

// const FormattedBulletList = ({
//   content,
//   icon: Icon = CheckCircle2,
//   iconColor = 'text-blue-600',
//   dotBg = 'bg-blue-50 ring-1 ring-blue-500/20',
// }) => {
//   if (!content) return null;

//   const points = content
//     .split(/\r?\n|•|\u2022/)
//     .map((line) => line.trim().replace(/^[-*•\d+.)]\s*/, ''))
//     .filter((line) => line.length > 0);

//   const formattedPoints =
//     points.length === 1 && points[0].includes('.')
//       ? points[0].split(/(?<=[.!?])\s+/).filter(Boolean)
//       : points;

//   return (
//     <div className="grid gap-2.5 sm:gap-3">
//       {formattedPoints.map((item, idx) => (
//         <div
//           key={idx}
//           className="group flex items-start gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-slate-200/60 hover:bg-slate-50/60"
//         >
//           <div
//             className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg ${dotBg}`}
//           >
//             <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
//           </div>
//           <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-normal">
//             {item}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// const JobDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const authContext = useAuth ? useAuth() : null;
//   const { jobs = [], isLoading: isJobsLoading, updateJob, isUpdating } = useJobs();
//   const { toggleSave, isJobSaved, isToggling } = useSavedJobs();
//   const {
//     reviews,
//     totalReviews,
//     averageRating,
//     isLoading: isReviewsLoading,
//     isSubmitting: isReviewSubmitting,
//     isUpdatingReview,
//     addReview,
//     updateReview,
//     deleteReview,
//   } = useJobReviews(id);

//   const [job, setJob] = useState(null);
//   const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [showEditConfirm, setShowEditConfirm] = useState(false);
//   const [copied, setCopied] = useState(false);

//   const [commentText, setCommentText] = useState('');
//   const [rating, setRating] = useState(5);
//   const [formError, setFormError] = useState('');

//   const [editingReviewId, setEditingReviewId] = useState(null);
//   const [editCommentText, setEditCommentText] = useState('');
//   const [editRating, setEditRating] = useState(5);

//   const isSaved = isJobSaved(id);

//   const currentUserId = useMemo(() => {
//     if (authContext?.user) {
//       const idFromContext = getUserId(authContext.user);
//       if (idFromContext) return String(idFromContext);
//     }
//     try {
//       const stored = localStorage.getItem('user') || localStorage.getItem('authUser');
//       if (stored) {
//         const parsed = JSON.parse(stored);
//         const resolved = parsed?.user || parsed?.data || parsed;
//         const idFromStorage = getUserId(resolved);
//         if (idFromStorage) return String(idFromStorage);
//       }
//     } catch (e) {}
//     return null;
//   }, [authContext]);

//   const isRecruiter = useMemo(() => {
//     if (authContext?.user?.role) return authContext.user.role === 'recruiter';
//     try {
//       const stored = JSON.parse(localStorage.getItem('user') || '{}');
//       return (stored?.user?.role || stored?.role) === 'recruiter';
//     } catch {
//       return false;
//     }
//   }, [authContext]);

//   useEffect(() => {
//     if (jobs.length > 0) {
//       const found = jobs.find((j) => String(j._id) === String(id));
//       setJob(found || null);
//     }
//   }, [jobs, id]);

//   // Ownership Check for the Job Post
//   const isJobOwner = useMemo(() => {
//     if (!job || !currentUserId) return false;
//     const creatorId = getUserId(job.recruiterId);
//     return Boolean(
//       creatorId && String(currentUserId).trim() === String(creatorId).trim()
//     );
//   }, [job, currentUserId]);

//   const handleShare = () => {
//     navigator.clipboard.writeText(window.location.href);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleToggleBookmark = async () => {
//     try {
//       await toggleSave(id);
//     } catch (err) {
//       alert(err.response?.data?.message || 'Failed to update saved job.');
//     }
//   };

//   const handlePromptEditPosting = () => {
//     setShowEditConfirm(true);
//   };

//   const handleProceedToEdit = () => {
//     setShowEditConfirm(false);
//     setIsEditModalOpen(true);
//   };

//   const handleSaveEdit = async (jobId, updatedData) => {
//     try {
//       await updateJob({ id: jobId, jobData: updatedData });
//       setIsEditModalOpen(false);
//       setJob((prev) => ({ ...prev, ...updatedData }));
//     } catch (err) {
//       alert(err.response?.data?.message || 'Failed to update job post.');
//     }
//   };

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!commentText.trim()) {
//       setFormError('Please enter a feedback message.');
//       return;
//     }
//     setFormError('');
//     try {
//       await addReview({ comment: commentText, rating });
//       setCommentText('');
//       setRating(5);
//     } catch (err) {
//       setFormError(err.response?.data?.message || 'Failed to publish comment.');
//     }
//   };

//   const handleStartEdit = (rev) => {
//     setEditingReviewId(rev._id);
//     setEditCommentText(rev.comment);
//     setEditRating(rev.rating || 5);
//   };

//   const handleCancelEdit = () => {
//     setEditingReviewId(null);
//     setEditCommentText('');
//   };

//   const handleSaveEditReview = async (reviewId) => {
//     if (!editCommentText.trim()) return;
//     try {
//       await updateReview({
//         reviewId,
//         comment: editCommentText,
//         rating: editRating,
//       });
//       setEditingReviewId(null);
//     } catch (err) {
//       alert(err.response?.data?.message || 'Failed to update comment.');
//     }
//   };

//   const handleDeleteReview = async (reviewId) => {
//     if (window.confirm('Are you sure you want to delete this comment?')) {
//       try {
//         await deleteReview(reviewId);
//       } catch (err) {
//         alert(err.response?.data?.message || 'Failed to delete comment.');
//       }
//     }
//   };

//   if (isJobsLoading) {
//     return (
//       <div className="flex min-h-[60vh] w-full items-center justify-center font-sans">
//         <div className="flex flex-col items-center gap-3">
//           <Loader2 className="h-9 w-9 animate-spin text-blue-600" />
//           <p className="text-xs font-semibold tracking-wide uppercase text-slate-500">
//             Loading position details...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (!job) {
//     return (
//       <div className="mx-auto max-w-xl px-4 py-16 sm:py-20 text-center font-sans">
//         <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-rose-200">
//           <AlertCircle className="h-7 w-7 stroke-[2]" />
//         </div>
//         <h2 className="mt-5 text-xl font-bold text-slate-900">Position Unavailable</h2>
//         <p className="mt-2 text-sm text-slate-500">
//           This listing has been closed, filled, or moved by the hiring team.
//         </p>
//         <button
//           type="button"
//           onClick={() => navigate(-1)}
//           className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition active:scale-95 cursor-pointer"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to Listings
//         </button>
//       </div>
//     );
//   }

//   const isClosed = job.status === 'closed';
//   const formattedDate = job.createdAt
//     ? new Date(job.createdAt).toLocaleDateString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric',
//       })
//     : 'Recently';

//   return (
//     <div className="relative mx-auto max-w-6xl space-y-5 sm:space-y-6 px-3.5 py-5 sm:px-6 lg:px-8 font-sans antialiased">
//       {/* Top Header Navigation */}
//       <nav className="flex items-center justify-between gap-2">
//         <button
//           type="button"
//           onClick={() => navigate(-1)}
//           className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition cursor-pointer"
//         >
//           <ArrowLeft className="h-4 w-4 stroke-[2]" />
//           <span>Back to Open Positions</span>
//         </button>

//         <div className="flex items-center gap-2">
//           {!isRecruiter && (
//             <button
//               type="button"
//               disabled={isToggling}
//               onClick={handleToggleBookmark}
//               className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-medium transition active:scale-95 cursor-pointer ${
//                 isSaved
//                   ? 'border-blue-200 bg-blue-50 text-blue-700 font-semibold'
//                   : 'border-slate-200/90 bg-white text-slate-700 hover:bg-slate-50'
//               }`}
//             >
//               <Bookmark
//                 className={`h-3.5 w-3.5 ${
//                   isSaved ? 'fill-blue-600 text-blue-600' : 'text-slate-400'
//                 }`}
//               />
//               <span>{isSaved ? 'Saved' : 'Save Job'}</span>
//             </button>
//           )}

//           <button
//             type="button"
//             onClick={handleShare}
//             className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-xs hover:border-slate-300 hover:bg-slate-50 transition active:scale-95 cursor-pointer"
//           >
//             {copied ? (
//               <>
//                 <Check className="h-3.5 w-3.5 text-emerald-600" />
//                 <span className="text-emerald-700 font-semibold">Copied</span>
//               </>
//             ) : (
//               <>
//                 <Share2 className="h-3.5 w-3.5 text-slate-400" />
//                 <span>Share</span>
//               </>
//             )}
//           </button>
//         </div>
//       </nav>

//       {/* Hero Overview Header Box */}
//       <motion.div
//         initial={{ opacity: 0, y: 8 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-slate-50/40 to-blue-50/30 p-4 sm:p-7 lg:p-8 shadow-sm"
//       >
//         <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

//         <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
//           <div className="flex items-start gap-3.5 sm:gap-5">
//             <div className="flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-slate-100 ring-1 ring-slate-900/10 text-slate-700 shadow-xs">
//               <Building2 className="h-5 w-5 sm:h-7 sm:w-7 text-blue-600" />
//             </div>

//             <div className="space-y-1.5 sm:space-y-2 min-w-0">
//               <div className="flex flex-wrap items-center gap-2">
//                 <span className="truncate text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-slate-500">
//                   {job.companyName || 'Confidential Company'}
//                 </span>

//                 <div className="h-1 w-1 rounded-full bg-slate-300 hidden sm:block" />

//                 {job.isActivelyHiring && !isClosed && (
//                   <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
//                     <Flame className="h-3 w-3 fill-emerald-600 text-emerald-600" />
//                     Actively Hiring
//                   </span>
//                 )}

//                 {isClosed && (
//                   <span className="rounded-full bg-slate-100 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium text-slate-600">
//                     Closed
//                   </span>
//                 )}
//               </div>

//               <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-950 break-words">
//                 {job.title}
//               </h1>

//               {/* Quick Info Tags */}
//               <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-600">
//                 <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50/80 px-2 sm:px-2.5 py-1 font-semibold text-emerald-800 ring-1 ring-emerald-600/20">
//                   <Coins className="h-3.5 w-3.5 text-emerald-600" />
//                   {job.salary || 'Competitive CTC'}
//                 </span>

//                 <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100/70 px-2 py-1 font-medium">
//                   <MapPin className="h-3.5 w-3.5 text-slate-400" />
//                   {job.location}
//                 </span>

//                 <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100/70 px-2 py-1 font-medium">
//                   <Briefcase className="h-3.5 w-3.5 text-slate-400" />
//                   {job.jobType}
//                 </span>

//                 <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
//                   <Clock className="h-3.5 w-3.5 text-slate-400" />
//                   Posted {formattedDate}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Action CTAs: Owner Recruiter vs Other Recruiter vs Candidate */}
//           <div className="flex items-center gap-2.5 pt-1 lg:pt-0 w-full sm:w-auto">
//             {isRecruiter && isJobOwner ? (
//               <div className="flex items-center gap-2 w-full sm:w-auto">
//                 <button
//                   type="button"
//                   onClick={handlePromptEditPosting}
//                   className="inline-flex h-10 sm:h-11 flex-1 sm:flex-initial items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 shadow-xs hover:border-slate-300 hover:bg-slate-50 transition active:scale-95 cursor-pointer"
//                 >
//                   <Pencil className="h-3.5 w-3.5 text-slate-500" />
//                   Edit Posting
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)}
//                   className="inline-flex h-10 sm:h-11 flex-1 sm:flex-initial items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 text-xs font-semibold text-white shadow-xs hover:bg-blue-600 transition active:scale-95 cursor-pointer"
//                 >
//                   <Users className="h-3.5 w-3.5" />
//                   Applicants ({job.applicantCount || 0})
//                 </button>
//               </div>
//             ) : isRecruiter && !isJobOwner ? (
//               <div className="flex items-center gap-2 w-full sm:w-auto">
//                 <span className="text-xs font-semibold text-slate-500 italic bg-slate-100 px-3 py-1.5 rounded-xl">
//                   Published by another Recruiter
//                 </span>
//               </div>
//             ) : (
//               <div className="flex items-center gap-2 w-full sm:w-auto">
//                 <button
//                   type="button"
//                   disabled={isToggling}
//                   onClick={handleToggleBookmark}
//                   className={`inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border px-4 text-xs font-semibold transition active:scale-95 cursor-pointer ${
//                     isSaved
//                       ? 'border-blue-200 bg-blue-50 text-blue-700'
//                       : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
//                   }`}
//                 >
//                   <Bookmark
//                     className={`h-4 w-4 ${
//                       isSaved ? 'fill-blue-600 text-blue-600' : 'text-slate-400'
//                     }`}
//                   />
//                   <span>{isSaved ? 'Saved' : 'Save'}</span>
//                 </button>

//                 <button
//                   type="button"
//                   disabled={isClosed}
//                   onClick={() => setIsApplyModalOpen(true)}
//                   className={`inline-flex h-11 flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl px-6 text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer ${
//                     isClosed
//                       ? 'cursor-not-allowed bg-slate-200 text-slate-400 shadow-none'
//                       : 'bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700 hover:shadow-md'
//                   }`}
//                 >
//                   <span>{isClosed ? 'Listing Closed' : 'Apply for Position'}</span>
//                   {!isClosed && <ArrowUpRight className="h-4 w-4" />}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </motion.div>

//       {/* Main Container */}
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//         {/* Left Column (Job Description & Requirements) */}
//         <div className="space-y-6 lg:col-span-2">
//           <section className="rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-xs">
//             <div className="flex items-center gap-2 border-b border-slate-100 pb-3.5 mb-4">
//               <Briefcase className="h-4 w-4 text-blue-600" />
//               <h2 className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 uppercase">
//                 About the Position
//               </h2>
//             </div>

//             <FormattedBulletList content={job.description} />
//           </section>

//           {job.requirements && (
//             <section className="rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-xs">
//               <div className="flex items-center gap-2 border-b border-slate-100 pb-3.5 mb-4">
//                 <ShieldCheck className="h-4 w-4 text-emerald-600" />
//                 <h2 className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 uppercase">
//                   Qualifications & Requirements
//                 </h2>
//               </div>

//               <FormattedBulletList
//                 content={job.requirements}
//                 icon={CheckCircle2}
//                 iconColor="text-emerald-600"
//                 dotBg="bg-emerald-50 ring-1 ring-emerald-600/20"
//               />
//             </section>
//           )}

//           {/* Desktop Only: Reviews rendered here on large screens */}
//           <div className="hidden lg:block">
//             <section className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
//               <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
//                 <div className="flex items-center gap-2.5">
//                   <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 ring-1 ring-amber-500/20">
//                     <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
//                   </div>
//                   <div>
//                     <h2 className="text-sm font-bold tracking-tight text-slate-900 uppercase">
//                       Feedback & Questions
//                     </h2>
//                     <p className="text-[11px] text-slate-500">
//                       {totalReviews} {totalReviews === 1 ? 'comment' : 'comments'} • Average {averageRating} / 5
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <form onSubmit={handleCommentSubmit} className="mb-8 space-y-3">
//                 <div className="flex items-center gap-2">
//                   <span className="text-xs font-semibold text-slate-700">Rating:</span>
//                   <div className="flex items-center gap-1">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <button
//                         type="button"
//                         key={star}
//                         onClick={() => setRating(star)}
//                         className="p-1 transition hover:scale-110 active:scale-95 cursor-pointer"
//                       >
//                         <Star
//                           className={`h-4 w-4 ${
//                             star <= rating
//                               ? 'fill-amber-400 text-amber-500'
//                               : 'fill-transparent text-slate-300'
//                           }`}
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <textarea
//                   rows={3}
//                   value={commentText}
//                   onChange={(e) => setCommentText(e.target.value)}
//                   placeholder="Ask a question about this role, culture, or interview process..."
//                   className="w-full rounded-2xl border border-slate-200/90 bg-slate-50/50 p-3.5 text-xs text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
//                 />

//                 {formError && <p className="text-xs font-medium text-rose-600">{formError}</p>}

//                 <div className="flex justify-end">
//                   <button
//                     type="submit"
//                     disabled={isReviewSubmitting}
//                     className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-600 active:scale-95 disabled:opacity-50 cursor-pointer"
//                   >
//                     {isReviewSubmitting ? (
//                       <Loader2 className="h-3.5 w-3.5 animate-spin" />
//                     ) : (
//                       <Send className="h-3.5 w-3.5" />
//                     )}
//                     <span>Post Feedback</span>
//                   </button>
//                 </div>
//               </form>

//               {isReviewsLoading ? (
//                 <div className="flex justify-center py-6">
//                   <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
//                 </div>
//               ) : reviews.length === 0 ? (
//                 <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center text-xs text-slate-400">
//                   <MessageSquare className="mx-auto mb-2 h-6 w-6 text-slate-300" />
//                   No comments or questions yet. Be the first to leave one!
//                 </div>
//               ) : (
//                 <div className="divide-y divide-slate-100">
//                   {reviews.map((rev) => {
//                     const authorId = getUserId(rev.userId);
//                     const isAuthor = Boolean(
//                       currentUserId &&
//                       authorId &&
//                       String(authorId).trim() === String(currentUserId).trim()
//                     );
//                     const isEditing = editingReviewId === rev._id;

//                     return (
//                       <div key={rev._id} className="py-4 first:pt-0 last:pb-0">
//                         <div className="flex items-start justify-between">
//                           <div className="flex items-center gap-2.5">
//                             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700 ring-1 ring-slate-900/5">
//                               {rev.userId?.name?.charAt(0) || 'U'}
//                             </div>
//                             <div>
//                               <div className="flex items-center gap-2">
//                                 <span className="text-xs font-bold text-slate-900">
//                                   {rev.userId?.name || 'Anonymous User'}
//                                 </span>
//                                 {isAuthor && (
//                                   <span className="rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-600/20">
//                                     You
//                                   </span>
//                                 )}
//                               </div>
//                               <span className="text-[10px] text-slate-400">
//                                 {new Date(rev.createdAt).toLocaleDateString('en-US', {
//                                   month: 'short',
//                                   day: 'numeric',
//                                   year: 'numeric',
//                                 })}
//                               </span>
//                             </div>
//                           </div>

//                           <div className="flex items-center gap-2">
//                             {!isEditing && (
//                               <div className="flex items-center gap-0.5">
//                                 {[1, 2, 3, 4, 5].map((st) => (
//                                   <Star
//                                     key={st}
//                                     className={`h-3 w-3 ${
//                                       st <= rev.rating
//                                         ? 'fill-amber-400 text-amber-500'
//                                         : 'text-slate-200'
//                                     }`}
//                                   />
//                                 ))}
//                               </div>
//                             )}

//                             {isAuthor && !isEditing && (
//                               <div className="flex items-center gap-1.5 ml-2">
//                                 <button
//                                   type="button"
//                                   onClick={() => handleStartEdit(rev)}
//                                   className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition cursor-pointer"
//                                   title="Edit"
//                                 >
//                                   <Pencil className="h-3.5 w-3.5" />
//                                 </button>
//                                 <button
//                                   type="button"
//                                   onClick={() => handleDeleteReview(rev._id)}
//                                   className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
//                                   title="Delete"
//                                 >
//                                   <Trash2 className="h-3.5 w-3.5" />
//                                 </button>
//                               </div>
//                             )}
//                           </div>
//                         </div>

//                         {isEditing ? (
//                           <div className="mt-3 pl-10 space-y-2.5">
//                             <div className="flex items-center gap-2">
//                               <span className="text-xs font-semibold text-slate-700">
//                                 Update rating:
//                               </span>
//                               <div className="flex items-center gap-1">
//                                 {[1, 2, 3, 4, 5].map((st) => (
//                                   <button
//                                     type="button"
//                                     key={st}
//                                     onClick={() => setEditRating(st)}
//                                     className="p-0.5 transition hover:scale-110 active:scale-95 cursor-pointer"
//                                   >
//                                     <Star
//                                       className={`h-3.5 w-3.5 ${
//                                         st <= editRating
//                                           ? 'fill-amber-400 text-amber-500'
//                                           : 'text-slate-200'
//                                       }`}
//                                     />
//                                   </button>
//                                 ))}
//                               </div>
//                             </div>

//                             <textarea
//                               rows={2}
//                               value={editCommentText}
//                               onChange={(e) => setEditCommentText(e.target.value)}
//                               className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
//                             />

//                             <div className="flex justify-end gap-2">
//                               <button
//                                 type="button"
//                                 onClick={handleCancelEdit}
//                                 className="px-2.5 py-1 text-xs text-slate-600 cursor-pointer hover:bg-slate-100 rounded-lg"
//                               >
//                                 Cancel
//                               </button>
//                               <button
//                                 type="button"
//                                 disabled={isUpdatingReview}
//                                 onClick={() => handleSaveEditReview(rev._id)}
//                                 className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white cursor-pointer hover:bg-blue-700 disabled:opacity-50"
//                               >
//                                 Save
//                               </button>
//                             </div>
//                           </div>
//                         ) : (
//                           <p className="mt-1.5 text-xs text-slate-600 pl-9">
//                             {rev.comment}
//                           </p>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </section>
//           </div>
//         </div>

//         {/* Right Sidebar: Snapshot & Target Skills */}
//         <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
//           {job.skillsRequired && job.skillsRequired.length > 0 && (
//             <section className="rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
//               <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-3">
//                 <Sparkles className="h-4 w-4 text-indigo-600" />
//                 <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
//                   Required Competencies
//                 </h3>
//               </div>
//               <p className="text-xs text-slate-500 leading-relaxed">
//                 Candidate applications will be evaluated against proficiency in these technologies:
//               </p>
//               <div className="mt-3.5 flex flex-wrap gap-1.5">
//                 {job.skillsRequired.map((skill, idx) => (
//                   <span
//                     key={skill}
//                     className={`rounded-lg border px-2.5 py-1 text-xs font-medium ${
//                       SKILL_THEMES[idx % SKILL_THEMES.length]
//                     }`}
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </section>
//           )}

//           {/* Quick Specifications Snapshot */}
//           <section className="rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
//             <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 mb-4">
//               Role Snapshot
//             </h3>

//             <dl className="space-y-3 text-xs">
//               <div className="flex justify-between items-center gap-2">
//                 <dt className="text-slate-500">Department</dt>
//                 <dd className="font-semibold text-slate-900 text-right">
//                   {job.department || 'Engineering'}
//                 </dd>
//               </div>

//               <div className="flex justify-between items-center gap-2">
//                 <dt className="text-slate-500">Experience</dt>
//                 <dd className="font-semibold text-slate-900 text-right">
//                   {job.experienceRequired || '2-4 years'}
//                 </dd>
//               </div>

//               <div className="flex justify-between items-center gap-2">
//                 <dt className="text-slate-500">Employment Type</dt>
//                 <dd className="font-semibold text-slate-900 text-right">
//                   {job.jobType || 'Full-time'}
//                 </dd>
//               </div>

//               <div className="flex justify-between items-center gap-2">
//                 <dt className="text-slate-500">Workplace</dt>
//                 <dd className="font-semibold text-slate-900 text-right">
//                   {job.location || 'Remote'}
//                 </dd>
//               </div>

//               <div className="flex justify-between items-center gap-2 pt-2 border-t border-slate-100">
//                 <dt className="text-slate-500">Compensation</dt>
//                 <dd className="font-bold text-emerald-700 text-right">
//                   {job.salary || 'Competitive'}
//                 </dd>
//               </div>
//             </dl>

//             {!isRecruiter && (
//               <div className="mt-5 pt-3.5 border-t border-slate-100 space-y-2">
//                 <button
//                   type="button"
//                   disabled={isClosed}
//                   onClick={() => setIsApplyModalOpen(true)}
//                   className={`w-full rounded-xl py-3 text-xs font-semibold transition active:scale-95 cursor-pointer ${
//                     isClosed
//                       ? 'cursor-not-allowed bg-slate-100 text-slate-400'
//                       : 'bg-slate-950 text-white hover:bg-blue-600 shadow-xs'
//                   }`}
//                 >
//                   {isClosed ? 'Listing Closed' : 'Apply Now'}
//                 </button>
//               </div>
//             )}
//           </section>
//         </div>

//         {/* Mobile Only: Comments render at the absolute bottom */}
//         <div className="block lg:hidden col-span-1">
//           <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
//             <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
//               <div className="flex items-center gap-2">
//                 <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 ring-1 ring-amber-500/20">
//                   <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
//                 </div>
//                 <div>
//                   <h2 className="text-xs font-bold tracking-tight text-slate-900 uppercase">
//                     Feedback & Questions
//                   </h2>
//                   <p className="text-[10px] text-slate-500">
//                     {totalReviews} {totalReviews === 1 ? 'comment' : 'comments'} • Average {averageRating} / 5
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <form onSubmit={handleCommentSubmit} className="mb-6 space-y-3">
//               <div className="flex items-center gap-2">
//                 <span className="text-xs font-semibold text-slate-700">Rating:</span>
//                 <div className="flex items-center gap-1">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <button
//                       type="button"
//                       key={star}
//                       onClick={() => setRating(star)}
//                       className="p-0.5 cursor-pointer"
//                     >
//                       <Star
//                         className={`h-4 w-4 ${
//                           star <= rating
//                             ? 'fill-amber-400 text-amber-500'
//                             : 'fill-transparent text-slate-300'
//                         }`}
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <textarea
//                 rows={3}
//                 value={commentText}
//                 onChange={(e) => setCommentText(e.target.value)}
//                 placeholder="Ask a question about this role, culture, or interview process..."
//                 className="w-full rounded-xl border border-slate-200/90 bg-slate-50/50 p-3 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
//               />

//               {formError && <p className="text-xs font-medium text-rose-600">{formError}</p>}

//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   disabled={isReviewSubmitting}
//                   className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-600 active:scale-95 disabled:opacity-50 cursor-pointer"
//                 >
//                   {isReviewSubmitting ? (
//                     <Loader2 className="h-3.5 w-3.5 animate-spin" />
//                   ) : (
//                     <Send className="h-3.5 w-3.5" />
//                   )}
//                   <span>Post Feedback</span>
//                 </button>
//               </div>
//             </form>

//             {isReviewsLoading ? (
//               <div className="flex justify-center py-5">
//                 <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
//               </div>
//             ) : reviews.length === 0 ? (
//               <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-5 text-center text-xs text-slate-400">
//                 <MessageSquare className="mx-auto mb-1.5 h-5 w-5 text-slate-300" />
//                 No comments or questions yet.
//               </div>
//             ) : (
//               <div className="divide-y divide-slate-100">
//                 {reviews.map((rev) => {
//                   const authorId = getUserId(rev.userId);
//                   const isAuthor = Boolean(
//                     currentUserId &&
//                     authorId &&
//                     String(authorId).trim() === String(currentUserId).trim()
//                   );
//                   const isEditing = editingReviewId === rev._id;

//                   return (
//                     <div key={rev._id} className="py-3.5 first:pt-0 last:pb-0">
//                       <div className="flex items-start justify-between gap-2">
//                         <div className="flex items-center gap-2">
//                           <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
//                             {rev.userId?.name?.charAt(0) || 'U'}
//                           </div>
//                           <div>
//                             <div className="flex items-center gap-1.5">
//                               <span className="text-xs font-bold text-slate-900 truncate max-w-[120px]">
//                                 {rev.userId?.name || 'Anonymous User'}
//                               </span>
//                               {isAuthor && (
//                                 <span className="rounded-md bg-blue-50 px-1.5 py-0.2 text-[9px] font-semibold text-blue-700">
//                                   You
//                                 </span>
//                               )}
//                             </div>
//                             <span className="text-[10px] text-slate-400">
//                               {new Date(rev.createdAt).toLocaleDateString('en-US', {
//                                 month: 'short',
//                                 day: 'numeric',
//                               })}
//                             </span>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-1.5 shrink-0">
//                           {!isEditing && (
//                             <div className="flex items-center gap-0.5">
//                               {[1, 2, 3, 4, 5].map((st) => (
//                                 <Star
//                                   key={st}
//                                   className={`h-2.5 w-2.5 ${
//                                     st <= rev.rating
//                                       ? 'fill-amber-400 text-amber-500'
//                                       : 'text-slate-200'
//                                   }`}
//                                 />
//                               ))}
//                             </div>
//                           )}

//                           {isAuthor && !isEditing && (
//                             <div className="flex items-center gap-1 ml-1">
//                               <button
//                                 type="button"
//                                 onClick={() => handleStartEdit(rev)}
//                                 className="p-1 text-slate-500 hover:text-blue-600 cursor-pointer"
//                                 title="Edit"
//                               >
//                                 <Pencil className="h-3.5 w-3.5" />
//                               </button>
//                               <button
//                                 type="button"
//                                 onClick={() => handleDeleteReview(rev._id)}
//                                 className="p-1 text-slate-500 hover:text-rose-600 cursor-pointer"
//                                 title="Delete"
//                               >
//                                 <Trash2 className="h-3.5 w-3.5" />
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       {isEditing ? (
//                         <div className="mt-2.5 space-y-2">
//                           <div className="flex items-center gap-1">
//                             {[1, 2, 3, 4, 5].map((st) => (
//                               <button
//                                 type="button"
//                                 key={st}
//                                 onClick={() => setEditRating(st)}
//                                 className="p-0.5 cursor-pointer"
//                               >
//                                 <Star
//                                   className={`h-3.5 w-3.5 ${
//                                     st <= editRating
//                                       ? 'fill-amber-400 text-amber-500'
//                                       : 'text-slate-200'
//                                   }`}
//                                 />
//                               </button>
//                             ))}
//                           </div>

//                           <textarea
//                             rows={2}
//                             value={editCommentText}
//                             onChange={(e) => setEditCommentText(e.target.value)}
//                             className="w-full rounded-xl border border-slate-300 p-2 text-xs text-slate-900 outline-none"
//                           />

//                           <div className="flex justify-end gap-2">
//                             <button
//                               type="button"
//                               onClick={handleCancelEdit}
//                               className="px-2.5 py-1 text-xs text-slate-600 cursor-pointer hover:bg-slate-100 rounded-lg"
//                             >
//                               Cancel
//                             </button>
//                             <button
//                               type="button"
//                               disabled={isUpdatingReview}
//                               onClick={() => handleSaveEditReview(rev._id)}
//                               className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white cursor-pointer hover:bg-blue-700 disabled:opacity-50"
//                             >
//                               Save
//                             </button>
//                           </div>
//                         </div>
//                       ) : (
//                         <p className="mt-1.5 text-xs text-slate-600 pl-9">
//                           {rev.comment}
//                         </p>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </section>
//         </div>
//       </div>

//       {/* Confirmation Modal before launching Edit Modal */}
//       <ActionConfirmModal
//         isOpen={showEditConfirm}
//         onClose={() => setShowEditConfirm(false)}
//         onConfirm={handleProceedToEdit}
//         title={`Edit "${job?.title || 'Job'}"?`}
//         description="Position specifications, compensation, and required vector skills will become editable. Changes will recalibrate AI matching scores."
//         confirmLabel="Proceed to Edit"
//         cancelLabel="Cancel"
//         type="warning"
//       />

//       <ApplyJobModal
//         job={job}
//         isOpen={isApplyModalOpen}
//         onClose={() => setIsApplyModalOpen(false)}
//       />

//       <EditJobModal
//         job={job}
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         onSave={handleSaveEdit}
//         isSaving={isUpdating}
//       />
//     </div>
//   );
// };

// export default JobDetails;






// frontend/src/pages/candidate/JobDetails.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useJobs, useJobReviews } from '../../hooks/useJobs';
import { useSavedJobs } from '../../hooks/useSavedJobs';
import { useAuth } from '../../hooks/useAuth';
import ApplyJobModal from './ApplyJobModal';
import EditJobModal from '../../components/jobs/EditJobModal';
import ActionConfirmModal from '../../components/common/ActionConfirmModal';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Clock,
  Briefcase,
  Coins,
  Flame,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Share2,
  Check,
  Users,
  Pencil,
  ShieldCheck,
  ArrowUpRight,
  Star,
  MessageSquare,
  Trash2,
  Send,
  X,
  Bookmark,
} from 'lucide-react';

const SKILL_THEMES = [
  'bg-blue-50/80 text-blue-700 border-blue-200/90',
  'bg-indigo-50/80 text-indigo-700 border-indigo-200/90',
  'bg-violet-50/80 text-violet-700 border-violet-200/90',
  'bg-pink-50/80 text-pink-700 border-pink-200/90',
  'bg-sky-50/80 text-sky-700 border-sky-200/90',
  'bg-emerald-50/80 text-emerald-700 border-emerald-200/90',
];

const getUserId = (userObj) => {
  if (!userObj) return null;
  if (typeof userObj === 'string') return userObj;
  return userObj._id || userObj.id || userObj.userId || userObj.sub || null;
};

const FormattedBulletList = ({
  content,
  icon: Icon = CheckCircle2,
  iconColor = 'text-blue-600',
  dotBg = 'bg-blue-50 border border-blue-200/80',
}) => {
  if (!content) return null;

  const points = content
    .split(/\r?\n|•|\u2022/)
    .map((line) => line.trim().replace(/^[-*•\d+.)]\s*/, ''))
    .filter((line) => line.length > 0);

  const formattedPoints =
    points.length === 1 && points[0].includes('.')
      ? points[0].split(/(?<=[.!?])\s+/).filter(Boolean)
      : points;

  return (
    <div className="grid gap-2 sm:gap-2.5">
      {formattedPoints.map((item, idx) => (
        <div
          key={idx}
          className="group flex items-start gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-slate-200/80 hover:bg-slate-50/70"
        >
          <div
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg ${dotBg} shadow-2xs`}
          >
            <Icon className={`h-3.5 w-3.5 ${iconColor} stroke-[2.2]`} />
          </div>
          <p className="text-xs sm:text-[13px] leading-relaxed text-slate-700 font-normal">
            {item}
          </p>
        </div>
      ))}
    </div>
  );
};

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const authContext = useAuth ? useAuth() : null;
  const { jobs = [], isLoading: isJobsLoading, updateJob, isUpdating } = useJobs();
  const { toggleSave, isJobSaved, isToggling } = useSavedJobs();
  const {
    reviews,
    totalReviews,
    averageRating,
    isLoading: isReviewsLoading,
    isSubmitting: isReviewSubmitting,
    isUpdatingReview,
    addReview,
    updateReview,
    deleteReview,
  } = useJobReviews(id);

  const [job, setJob] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [copied, setCopied] = useState(false);

  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(5);
  const [formError, setFormError] = useState('');

  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  const [editRating, setEditRating] = useState(5);

  const isSaved = isJobSaved(id);

  const currentUserId = useMemo(() => {
    if (authContext?.user) {
      const idFromContext = getUserId(authContext.user);
      if (idFromContext) return String(idFromContext);
    }
    try {
      const stored = localStorage.getItem('user') || localStorage.getItem('authUser');
      if (stored) {
        const parsed = JSON.parse(stored);
        const resolved = parsed?.user || parsed?.data || parsed;
        const idFromStorage = getUserId(resolved);
        if (idFromStorage) return String(idFromStorage);
      }
    } catch (e) {}
    return null;
  }, [authContext]);

  const isRecruiter = useMemo(() => {
    if (authContext?.user?.role) return authContext.user.role === 'recruiter';
    try {
      const stored = JSON.parse(localStorage.getItem('user') || '{}');
      return (stored?.user?.role || stored?.role) === 'recruiter';
    } catch {
      return false;
    }
  }, [authContext]);

  useEffect(() => {
    if (jobs.length > 0) {
      const found = jobs.find((j) => String(j._id) === String(id));
      setJob(found || null);
    }
  }, [jobs, id]);

  // Ownership Check for the Job Post
  const isJobOwner = useMemo(() => {
    if (!job || !currentUserId) return false;
    const creatorId = getUserId(job.recruiterId);
    return Boolean(
      creatorId && String(currentUserId).trim() === String(creatorId).trim()
    );
  }, [job, currentUserId]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleBookmark = async () => {
    try {
      await toggleSave(id);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update saved job.');
    }
  };

  const handlePromptEditPosting = () => {
    setShowEditConfirm(true);
  };

  const handleProceedToEdit = () => {
    setShowEditConfirm(false);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (jobId, updatedData) => {
    try {
      await updateJob({ id: jobId, jobData: updatedData });
      setIsEditModalOpen(false);
      setJob((prev) => ({ ...prev, ...updatedData }));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update job post.');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      setFormError('Please enter a feedback message.');
      return;
    }
    setFormError('');
    try {
      await addReview({ comment: commentText, rating });
      setCommentText('');
      setRating(5);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to publish comment.');
    }
  };

  const handleStartEdit = (rev) => {
    setEditingReviewId(rev._id);
    setEditCommentText(rev.comment);
    setEditRating(rev.rating || 5);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditCommentText('');
  };

  const handleSaveEditReview = async (reviewId) => {
    if (!editCommentText.trim()) return;
    try {
      await updateReview({
        reviewId,
        comment: editCommentText,
        rating: editRating,
      });
      setEditingReviewId(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update comment.');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await deleteReview(reviewId);
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete comment.');
      }
    }
  };

  if (isJobsLoading) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-200/80 bg-indigo-50 text-indigo-600 shadow-2xs">
            <Loader2 className="h-6 w-6 animate-spin stroke-[2.4]" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Loading position details...
          </p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center font-sans">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-600 shadow-2xs">
          <AlertCircle className="h-7 w-7 stroke-[2.2]" />
        </div>
        <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-950">Position Unavailable</h2>
        <p className="mt-1.5 text-xs text-slate-500">
          This listing has been closed, filled, or moved by the hiring team.
        </p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-slate-900 px-5 text-xs font-bold text-white shadow-2xs hover:bg-indigo-600 transition active:scale-[0.98] cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Open Positions</span>
        </button>
      </div>
    );
  }

  const isClosed = job.status === 'closed';
  const formattedDate = job.createdAt
    ? new Date(job.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently';

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full overflow-x-hidden bg-slate-50 font-sans text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Static Atmospheric Mesh */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl sm:h-[450px] sm:w-[450px]" />
        <div className="absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl sm:h-[450px] sm:w-[450px]" />
        <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl space-y-5 sm:space-y-6 px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        {/* Top Header Navigation */}
        <nav className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 stroke-[2.2]" />
            <span>Back to Open Positions</span>
          </button>

          <div className="flex items-center gap-2">
            {!isRecruiter && (
              <button
                type="button"
                disabled={isToggling}
                onClick={handleToggleBookmark}
                className={`inline-flex h-9 items-center gap-1.5 rounded-xl border px-3.5 text-xs font-semibold shadow-2xs transition active:scale-[0.98] cursor-pointer ${
                  isSaved
                    ? 'border-blue-200 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Bookmark
                  className={`h-3.5 w-3.5 ${
                    isSaved ? 'fill-blue-600 text-blue-600' : 'text-slate-400'
                  }`}
                />
                <span>{isSaved ? 'Saved' : 'Save Job'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition active:scale-[0.98] cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5 text-slate-400" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </nav>

        {/* Hero Overview Header Box */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 p-5 sm:p-7 md:p-8 shadow-xs"
        >
          {/* Top Multi-Color Brand Line (Cyan -> Indigo -> Violet -> Pink) */}
          <div 
            aria-hidden="true" 
            className="absolute inset-x-0 top-0 h-1 sm:h-1.5 bg-gradient-to-r from-cyan-400 via-indigo-600 to-pink-500" 
          />

          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-3.5 sm:gap-4.5 min-w-0">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-200/80 bg-indigo-50/80 text-indigo-600 shadow-2xs">
                <Building2 className="h-6 w-6 stroke-[2]" />
              </div>

              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="truncate text-xs font-bold tracking-wider uppercase text-slate-500">
                    {job.companyName || 'Confidential Company'}
                  </span>

                  <div className="h-1 w-1 rounded-full bg-slate-300 hidden sm:block" />

                  {job.isActivelyHiring && !isClosed && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-emerald-800">
                      <Flame className="h-3 w-3 fill-emerald-600 text-emerald-600" />
                      <span>Actively Hiring</span>
                    </span>
                  )}

                  {isClosed && (
                    <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-slate-500">
                      Closed
                    </span>
                  )}
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 break-words">
                  {job.title}
                </h1>

                {/* Quick Info Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200/90 bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-800">
                    <Coins className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{job.salary || 'Competitive CTC'}</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200/90 bg-sky-50 px-2.5 py-1 font-medium text-sky-800">
                    <MapPin className="h-3.5 w-3.5 text-sky-600" />
                    <span>{job.location}</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100/90 px-2.5 py-1 font-medium text-slate-700">
                    <Briefcase className="h-3.5 w-3.5 text-slate-500" />
                    <span>{job.jobType}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>Posted {formattedDate}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTAs: Owner Recruiter vs Other Recruiter vs Candidate */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2 lg:pt-0 shrink-0">
              {isRecruiter && isJobOwner ? (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handlePromptEditPosting}
                    className="inline-flex h-10 sm:h-11 flex-1 sm:flex-initial items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition active:scale-[0.98] cursor-pointer"
                  >
                    <Pencil className="h-3.5 w-3.5 text-slate-500" />
                    <span>Edit Posting</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)}
                    className="inline-flex h-10 sm:h-11 flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-xs sm:text-sm font-bold text-white shadow-2xs hover:bg-indigo-600 transition active:scale-[0.98] cursor-pointer"
                  >
                    <Users className="h-4 w-4" />
                    <span>Applicants ({job.applicantCount || 0})</span>
                  </button>
                </div>
              ) : isRecruiter && !isJobOwner ? (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-semibold text-slate-500 italic bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200/80">
                    Published by another Recruiter
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    disabled={isToggling}
                    onClick={handleToggleBookmark}
                    className={`inline-flex h-10 sm:h-11 items-center justify-center gap-1.5 rounded-xl border px-4 text-xs sm:text-sm font-semibold transition active:scale-[0.98] cursor-pointer ${
                      isSaved
                        ? 'border-blue-200 bg-blue-50 text-blue-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Bookmark
                      className={`h-4 w-4 ${
                        isSaved ? 'fill-blue-600 text-blue-600' : 'text-slate-400'
                      }`}
                    />
                    <span>{isSaved ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    type="button"
                    disabled={isClosed}
                    onClick={() => setIsApplyModalOpen(true)}
                    className={`inline-flex h-10 sm:h-11 flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl px-6 text-xs sm:text-sm font-bold shadow-md shadow-indigo-500/20 transition-all active:scale-[0.98] cursor-pointer ${
                      isClosed
                        ? 'cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400 shadow-none'
                        : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 text-white hover:brightness-105'
                    }`}
                  >
                    <span>{isClosed ? 'Listing Closed' : 'Apply for Position'}</span>
                    {!isClosed && <ArrowUpRight className="h-4 w-4 stroke-[2.2]" />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Main Container */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column (Job Description & Requirements) */}
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 p-5 sm:p-7 shadow-xs">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                <Briefcase className="h-4 w-4 text-indigo-600" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  About the Position
                </h2>
              </div>

              <FormattedBulletList content={job.description} />
            </section>

            {job.requirements && (
              <section className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 p-5 sm:p-7 shadow-xs">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Qualifications & Requirements
                  </h2>
                </div>

                <FormattedBulletList
                  content={job.requirements}
                  icon={CheckCircle2}
                  iconColor="text-emerald-600"
                  dotBg="bg-emerald-50 border border-emerald-200/80"
                />
              </section>
            )}

            {/* Desktop Only: Reviews rendered here on large screens */}
            <div className="hidden lg:block">
              <section className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 p-5 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-600">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                    </div>
                    <div>
                      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Feedback & Questions
                      </h2>
                      <p className="text-[11px] text-slate-500">
                        {totalReviews} {totalReviews === 1 ? 'comment' : 'comments'} • Average {averageRating} / 5
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleCommentSubmit} className="mb-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-700">Rating:</span>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="p-1 transition hover:scale-110 active:scale-95 cursor-pointer"
                        >
                          <Star
                            className={`h-4 w-4 ${
                              star <= rating
                                ? 'fill-amber-400 text-amber-500'
                                : 'text-slate-200'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Ask a question about this role, culture, or interview process..."
                    className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15 resize-none"
                  />

                  {formError && <p className="text-xs font-semibold text-rose-600">{formError}</p>}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isReviewSubmitting}
                      className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-slate-900 px-4 text-xs font-bold text-white shadow-2xs hover:bg-indigo-600 transition active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                    >
                      {isReviewSubmitting ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Send className="h-3.5 w-3.5" />
                      )}
                      <span>Post Feedback</span>
                    </button>
                  </div>
                </form>

                {isReviewsLoading ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center text-xs text-slate-400">
                    <MessageSquare className="mx-auto mb-2 h-6 w-6 text-slate-300" />
                    <span>No comments or questions yet. Be the first to leave one!</span>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {reviews.map((rev) => {
                      const authorId = getUserId(rev.userId);
                      const isAuthor = Boolean(
                        currentUserId &&
                        authorId &&
                        String(authorId).trim() === String(currentUserId).trim()
                      );
                      const isEditing = editingReviewId === rev._id;

                      return (
                        <div key={rev._id} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 text-xs font-bold text-indigo-700">
                                {rev.userId?.name?.charAt(0) || 'U'}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-900">
                                    {rev.userId?.name || 'Anonymous User'}
                                  </span>
                                  {isAuthor && (
                                    <span className="rounded-md border border-blue-200 bg-blue-50 px-1.5 py-0.2 text-[9px] font-bold text-blue-700">
                                      You
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] text-slate-400">
                                  {new Date(rev.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {!isEditing && (
                                <div className="flex items-center gap-0.5">
                                  {[1, 2, 3, 4, 5].map((st) => (
                                    <Star
                                      key={st}
                                      className={`h-3 w-3 ${
                                        st <= rev.rating
                                          ? 'fill-amber-400 text-amber-500'
                                          : 'text-slate-200'
                                      }`}
                                    />
                                  ))}
                                </div>
                              )}

                              {isAuthor && !isEditing && (
                                <div className="flex items-center gap-1 ml-2">
                                  <button
                                    type="button"
                                    onClick={() => handleStartEdit(rev)}
                                    className="p-1 text-slate-400 hover:text-indigo-600 transition cursor-pointer"
                                    title="Edit"
                                  >
                                    <Pencil className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteReview(rev._id)}
                                    className="p-1 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                                    title="Delete"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          {isEditing ? (
                            <div className="mt-3 pl-10 space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-slate-700">
                                  Update rating:
                                </span>
                                <div className="flex items-center gap-0.5">
                                  {[1, 2, 3, 4, 5].map((st) => (
                                    <button
                                      type="button"
                                      key={st}
                                      onClick={() => setEditRating(st)}
                                      className="p-0.5 cursor-pointer"
                                    >
                                      <Star
                                        className={`h-3.5 w-3.5 ${
                                          st <= editRating
                                            ? 'fill-amber-400 text-amber-500'
                                            : 'text-slate-200'
                                        }`}
                                      />
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <textarea
                                rows={2}
                                value={editCommentText}
                                onChange={(e) => setEditCommentText(e.target.value)}
                                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15"
                              />

                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={handleCancelEdit}
                                  className="rounded-lg px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  disabled={isUpdatingReview}
                                  onClick={() => handleSaveEditReview(rev._id)}
                                  className="rounded-lg bg-indigo-600 px-3.5 py-1 text-xs font-bold text-white hover:bg-indigo-700 disabled:opacity-50"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="mt-2 text-xs leading-relaxed text-slate-600 pl-10">
                              {rev.comment}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            </div>
          </div>

          {/* Right Rail: Required Competencies & Role Snapshot */}
          <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            {job.skillsRequired && job.skillsRequired.length > 0 && (
              <section className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 p-5 sm:p-6 shadow-xs">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-3">
                  <Sparkles className="h-4 w-4 text-pink-500" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Required Competencies
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Candidate applications will be evaluated against proficiency in these technologies:
                </p>
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {job.skillsRequired.map((skill, idx) => (
                    <span
                      key={skill}
                      className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${
                        SKILL_THEMES[idx % SKILL_THEMES.length]
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Quick Specifications Snapshot */}
            <section className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 p-5 sm:p-6 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 mb-4">
                Role Snapshot
              </h3>

              <dl className="space-y-3 text-xs">
                <div className="flex justify-between items-center gap-2">
                  <dt className="text-slate-500">Department</dt>
                  <dd className="font-semibold text-slate-900 text-right">
                    {job.department || 'Engineering'}
                  </dd>
                </div>

                <div className="flex justify-between items-center gap-2">
                  <dt className="text-slate-500">Experience</dt>
                  <dd className="font-semibold text-slate-900 text-right">
                    {job.experienceRequired || '2-4 years'}
                  </dd>
                </div>

                <div className="flex justify-between items-center gap-2">
                  <dt className="text-slate-500">Employment Type</dt>
                  <dd className="font-semibold text-slate-900 text-right">
                    {job.jobType || 'Full-time'}
                  </dd>
                </div>

                <div className="flex justify-between items-center gap-2">
                  <dt className="text-slate-500">Workplace</dt>
                  <dd className="font-semibold text-slate-900 text-right">
                    {job.location || 'Remote'}
                  </dd>
                </div>

                <div className="flex justify-between items-center gap-2 pt-2.5 border-t border-slate-100">
                  <dt className="text-slate-500">Compensation</dt>
                  <dd className="font-bold text-emerald-700 text-right">
                    {job.salary || 'Competitive'}
                  </dd>
                </div>
              </dl>

              {!isRecruiter && (
                <div className="mt-5 pt-3.5 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={isClosed}
                    onClick={() => setIsApplyModalOpen(true)}
                    className={`w-full h-11 inline-flex items-center justify-center gap-1.5 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-indigo-500/20 transition active:scale-[0.98] cursor-pointer ${
                      isClosed
                        ? 'cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400 shadow-none'
                        : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 text-white hover:brightness-105'
                    }`}
                  >
                    <span>{isClosed ? 'Listing Closed' : 'Apply Now'}</span>
                    {!isClosed && <ArrowUpRight className="h-4 w-4 stroke-[2.2]" />}
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* Mobile Only: Comments render at the absolute bottom */}
          <div className="block lg:hidden col-span-1">
            <section className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-amber-200 bg-amber-50">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Feedback & Questions
                    </h2>
                    <p className="text-[10px] text-slate-500">
                      {totalReviews} comments • Avg {averageRating} / 5
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleCommentSubmit} className="mb-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-700">Rating:</span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`h-4 w-4 ${
                            star <= rating
                              ? 'fill-amber-400 text-amber-500'
                              : 'text-slate-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Ask a question about this role, culture, or interview process..."
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 resize-none"
                />

                {formError && <p className="text-xs font-semibold text-rose-600">{formError}</p>}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isReviewSubmitting}
                    className="inline-flex h-9 w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 text-xs font-bold text-white shadow-2xs hover:bg-indigo-600 transition active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                  >
                    {isReviewSubmitting ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Send className="h-3.5 w-3.5" />
                    )}
                    <span>Post Feedback</span>
                  </button>
                </div>
              </form>

              {isReviewsLoading ? (
                <div className="flex justify-center py-5">
                  <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
                </div>
              ) : reviews.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-5 text-center text-xs text-slate-400">
                  <MessageSquare className="mx-auto mb-1.5 h-5 w-5 text-slate-300" />
                  <span>No comments or questions yet.</span>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {reviews.map((rev) => {
                    const authorId = getUserId(rev.userId);
                    const isAuthor = Boolean(
                      currentUserId &&
                      authorId &&
                      String(authorId).trim() === String(currentUserId).trim()
                    );
                    const isEditing = editingReviewId === rev._id;

                    return (
                      <div key={rev._id} className="py-3 first:pt-0 last:pb-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-indigo-200 bg-indigo-50 text-xs font-bold text-indigo-700">
                              {rev.userId?.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-slate-900 truncate max-w-[120px]">
                                  {rev.userId?.name || 'Anonymous User'}
                                </span>
                                {isAuthor && (
                                  <span className="rounded-md border border-blue-200 bg-blue-50 px-1.5 py-0.2 text-[8px] font-bold text-blue-700">
                                    You
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400">
                                {new Date(rev.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {!isEditing && (
                              <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((st) => (
                                  <Star
                                    key={st}
                                    className={`h-2.5 w-2.5 ${
                                      st <= rev.rating
                                        ? 'fill-amber-400 text-amber-500'
                                        : 'text-slate-200'
                                    }`}
                                  />
                                ))}
                              </div>
                            )}

                            {isAuthor && !isEditing && (
                              <div className="flex items-center gap-0.5 ml-1">
                                <button
                                  type="button"
                                  onClick={() => handleStartEdit(rev)}
                                  className="p-1 text-slate-400 hover:text-indigo-600 cursor-pointer"
                                  title="Edit"
                                >
                                  <Pencil className="h-3 w-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteReview(rev._id)}
                                  className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                                  title="Delete"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {isEditing ? (
                          <div className="mt-2.5 space-y-2">
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((st) => (
                                <button
                                  type="button"
                                  key={st}
                                  onClick={() => setEditRating(st)}
                                  className="p-0.5 cursor-pointer"
                                >
                                  <Star
                                    className={`h-3 w-3 ${
                                      st <= editRating
                                        ? 'fill-amber-400 text-amber-500'
                                        : 'text-slate-200'
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>

                            <textarea
                              rows={2}
                              value={editCommentText}
                              onChange={(e) => setEditCommentText(e.target.value)}
                              className="w-full rounded-xl border border-slate-300 p-2 text-xs text-slate-900 outline-none"
                            />

                            <div className="flex justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                disabled={isUpdatingReview}
                                onClick={() => handleSaveEditReview(rev._id)}
                                className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-bold text-white disabled:opacity-50"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="mt-1.5 text-xs text-slate-600 pl-9">
                            {rev.comment}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Confirmation Modal before launching Edit Modal */}
        <ActionConfirmModal
          isOpen={showEditConfirm}
          onClose={() => setShowEditConfirm(false)}
          onConfirm={handleProceedToEdit}
          title={`Edit "${job?.title || 'Job'}"?`}
          description="Position specifications, compensation, and required vector skills will become editable. Changes will recalibrate AI matching scores."
          confirmLabel="Proceed to Edit"
          cancelLabel="Cancel"
          type="warning"
        />

        <ApplyJobModal
          job={job}
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
        />

        <EditJobModal
          job={job}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
          isSaving={isUpdating}
        />
      </div>
    </div>
  );
};

export default JobDetails;