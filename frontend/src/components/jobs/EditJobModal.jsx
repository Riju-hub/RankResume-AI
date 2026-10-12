// import React, { useState, useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import {
//   X,
//   Loader2,
//   Building2,
//   Coins,
//   Flame,
//   Save,
// } from 'lucide-react';

// const EditJobModal = ({ job, isOpen, onClose, onSave, isSaving }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     companyName: '',
//     salary: '',
//     isActivelyHiring: true,
//     department: '',
//     location: '',
//     jobType: 'Full-time',
//     experienceRequired: '',
//     description: '',
//     requirements: '',
//     skillsRequired: [],
//     status: 'open',
//   });

//   const [skillInput, setSkillInput] = useState('');

//   // Lock background window scroll while modal is active
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   useEffect(() => {
//     if (job) {
//       setFormData({
//         title: job.title || '',
//         companyName: job.companyName || '',
//         salary: job.salary || '',
//         isActivelyHiring: job.isActivelyHiring ?? true,
//         department: job.department || '',
//         location: job.location || '',
//         jobType: job.jobType || 'Full-time',
//         experienceRequired: job.experienceRequired || '',
//         description: job.description || '',
//         requirements: job.requirements || '',
//         skillsRequired: job.skillsRequired || job.requiredSkills || [],
//         status: job.status || 'open',
//       });
//     }
//   }, [job]);

//   if (!isOpen || typeof document === 'undefined') return null;

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleAddSkill = () => {
//     const trimmed = skillInput.trim();
//     if (trimmed && !formData.skillsRequired.includes(trimmed)) {
//       setFormData((prev) => ({
//         ...prev,
//         skillsRequired: [...prev.skillsRequired, trimmed],
//       }));
//       setSkillInput('');
//     }
//   };

//   const handleRemoveSkill = (skill) => {
//     setFormData((prev) => ({
//       ...prev,
//       skillsRequired: prev.skillsRequired.filter((s) => s !== skill),
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(job._id, formData);
//   };

//   return createPortal(
//     <div className="fixed inset-0 z-[999999] overflow-y-auto bg-slate-950/70 p-4 sm:p-6 backdrop-blur-sm">
//       {/* Outer Flex Container for Centering */}
//       <div className="flex min-h-full items-center justify-center">
//         {/* Click-away backdrop overlay */}
//         <div
//           onClick={onClose}
//           className="fixed inset-0 -z-10"
//           aria-hidden="true"
//         />

//         {/* Modal Card */}
//         <div
//           role="dialog"
//           aria-modal="true"
//           className="relative w-full max-w-3xl my-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 text-slate-900 shadow-2xl font-sans"
//         >
//           {/* Close Button */}
//           <button
//             type="button"
//             onClick={onClose}
//             className="absolute right-5 top-5 rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition cursor-pointer"
//           >
//             <X className="h-4 w-4 stroke-[2.5]" />
//           </button>

//           <h2 className="text-xl font-black text-slate-950">Update Job Opening</h2>
//           <p className="text-xs text-slate-500 font-semibold mb-6">
//             Edit specifications, active status, or target semantic vector keywords.
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="sm:col-span-2 space-y-1">
//                 <label className="text-xs font-mono font-bold text-slate-700">Job Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   required
//                   value={formData.title}
//                   onChange={handleChange}
//                   className="h-10 w-full rounded-xl border border-slate-300 px-3 text-xs font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-mono font-bold text-slate-700 flex items-center gap-1">
//                   <Building2 className="h-3.5 w-3.5 text-blue-600" /> Company Name
//                 </label>
//                 <input
//                   type="text"
//                   name="companyName"
//                   value={formData.companyName}
//                   onChange={handleChange}
//                   className="h-10 w-full rounded-xl border border-slate-300 px-3 text-xs font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-mono font-bold text-slate-700 flex items-center gap-1">
//                   <Coins className="h-3.5 w-3.5 text-emerald-600" /> Salary / CTC
//                 </label>
//                 <input
//                   type="text"
//                   name="salary"
//                   value={formData.salary}
//                   onChange={handleChange}
//                   className="h-10 w-full rounded-xl border border-slate-300 px-3 text-xs font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-mono font-bold text-slate-700">Department</label>
//                 <input
//                   type="text"
//                   name="department"
//                   value={formData.department}
//                   onChange={handleChange}
//                   className="h-10 w-full rounded-xl border border-slate-300 px-3 text-xs font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-mono font-bold text-slate-700">Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleChange}
//                   className="h-10 w-full rounded-xl border border-slate-300 px-3 text-xs font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-mono font-bold text-slate-700">Job Type</label>
//                 <select
//                   name="jobType"
//                   value={formData.jobType}
//                   onChange={handleChange}
//                   className="h-10 w-full rounded-xl border border-slate-300 px-3 text-xs font-semibold bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 >
//                   <option value="Full-time">Full-time</option>
//                   <option value="Part-time">Part-time</option>
//                   <option value="Contract">Contract</option>
//                   <option value="Internship">Internship</option>
//                 </select>
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-mono font-bold text-slate-700">Opening Status</label>
//                 <select
//                   name="status"
//                   value={formData.status}
//                   onChange={handleChange}
//                   className="h-10 w-full rounded-xl border border-slate-300 px-3 text-xs font-semibold bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 >
//                   <option value="open">Open (Accepting Resumes)</option>
//                   <option value="closed">Closed (Archived)</option>
//                 </select>
//               </div>

//               <div className="sm:col-span-2">
//                 <label className="flex items-center gap-2.5 p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="isActivelyHiring"
//                     checked={formData.isActivelyHiring}
//                     onChange={handleChange}
//                     className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
//                   />
//                   <span className="text-xs font-bold text-emerald-900 flex items-center gap-1">
//                     <Flame className="h-3.5 w-3.5 fill-emerald-500 text-emerald-600" />
//                     Actively Hiring Priority Badge
//                   </span>
//                 </label>
//               </div>
//             </div>

//             {/* Target Skills */}
//             <div className="space-y-2">
//               <label className="text-xs font-mono font-bold text-slate-700">Target Skills</label>
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   value={skillInput}
//                   onChange={(e) => setSkillInput(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter') {
//                       e.preventDefault();
//                       handleAddSkill();
//                     }
//                   }}
//                   placeholder="Add skill (e.g. React)..."
//                   className="h-10 flex-1 rounded-xl border border-slate-300 px-3 text-xs font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleAddSkill}
//                   className="px-4 rounded-xl border border-blue-200 bg-blue-50 text-xs font-bold text-blue-700 hover:bg-blue-100 cursor-pointer"
//                 >
//                   Add
//                 </button>
//               </div>
//               <div className="flex flex-wrap gap-1.5 pt-1">
//                 {formData.skillsRequired.map((skill) => (
//                   <span
//                     key={skill}
//                     className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700"
//                   >
//                     {skill}
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveSkill(skill)}
//                       className="hover:text-rose-600 cursor-pointer"
//                     >
//                       <X className="h-3 w-3" />
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Description */}
//             <div className="space-y-1">
//               <label className="text-xs font-mono font-bold text-slate-700">Job Description</label>
//               <textarea
//                 name="description"
//                 required
//                 rows={4}
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="w-full rounded-xl border border-slate-300 p-3 text-xs font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
//               />
//             </div>

//             {/* Requirements */}
//             <div className="space-y-1">
//               <label className="text-xs font-mono font-bold text-slate-700">Requirements</label>
//               <textarea
//                 name="requirements"
//                 rows={3}
//                 value={formData.requirements}
//                 onChange={handleChange}
//                 className="w-full rounded-xl border border-slate-300 p-3 text-xs font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
//               />
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 disabled={isSaving}
//                 className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isSaving}
//                 className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 disabled:opacity-50 cursor-pointer"
//               >
//                 {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default EditJobModal;







// frontend/src/components/jobs/EditJobModal.jsx
import React, { useState, useEffect, memo } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Loader2,
  Building2,
  Coins,
  Flame,
  Save,
  MapPin,
  Briefcase,
  Layers,
  Sparkles,
  Plus,
} from 'lucide-react';

export const EditJobModal = memo(({ job, isOpen, onClose, onSave, isSaving }) => {
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    salary: '',
    isActivelyHiring: true,
    department: '',
    location: '',
    jobType: 'Full-time',
    experienceRequired: '',
    description: '',
    requirements: '',
    skillsRequired: [],
    status: 'open',
  });

  const [skillInput, setSkillInput] = useState('');

  // Lock background window scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isSaving) {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isSaving, onClose]);

  // Sync state when job prop changes
  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || '',
        companyName: job.companyName || '',
        salary: job.salary || '',
        isActivelyHiring: job.isActivelyHiring ?? true,
        department: job.department || '',
        location: job.location || '',
        jobType: job.jobType || 'Full-time',
        experienceRequired: job.experienceRequired || '',
        description: job.description || '',
        requirements: job.requirements || '',
        skillsRequired: job.skillsRequired || job.requiredSkills || [],
        status: job.status || 'open',
      });
    }
  }, [job]);

  if (!isOpen || typeof document === 'undefined') return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !formData.skillsRequired.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, trimmed],
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter((s) => s !== skill),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(job._id, formData);
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-5 md:p-6 font-sans overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Lag-Free Scrim Backdrop */}
      <div
        onClick={!isSaving ? onClose : undefined}
        className="fixed inset-0 bg-slate-950/65 transition-opacity duration-150"
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative my-auto w-full max-w-3xl overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 md:p-8 text-slate-900 shadow-2xl ring-4 sm:ring-8 ring-indigo-500/10 transition-transform">
        {/* Top Multi-Color Brand Line (Cyan -> Indigo -> Violet -> Pink) */}
        <div 
          aria-hidden="true" 
          className="absolute inset-x-0 top-0 h-1 sm:h-1.5 bg-gradient-to-r from-cyan-400 via-indigo-600 to-pink-500" 
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isSaving}
          className="absolute right-3.5 top-3.5 sm:right-5 sm:top-5 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-40"
          aria-label="Close modal"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.2]" />
        </button>

        {/* Header */}
        <div className="pr-8 sm:pr-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200/80 bg-indigo-50/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700 mb-1.5">
            <Sparkles className="h-3 w-3" />
            <span>Position Editor</span>
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-slate-950">
            Update Job Opening
          </h2>
          <p className="mt-1 text-xs sm:text-[13px] leading-relaxed text-slate-500 font-normal">
            Refine requisition parameters, hiring priority, and target semantic match keywords.
          </p>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="mt-5 sm:mt-6 space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            
            {/* Job Title */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Job Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior Full Stack Engineer"
                className="h-10 sm:h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15"
              />
            </div>

            {/* Company Name */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <Building2 className="h-3.5 w-3.5 text-blue-600" />
                <span>Company Name</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company or Studio"
                className="h-10 sm:h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15"
              />
            </div>

            {/* Salary / CTC */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <Coins className="h-3.5 w-3.5 text-emerald-600" />
                <span>Salary / Compensation</span>
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g. $120k - $150k or Competitive"
                className="h-10 sm:h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500/15"
              />
            </div>

            {/* Department */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <Layers className="h-3.5 w-3.5 text-purple-600" />
                <span>Department</span>
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g. Engineering, Design"
                className="h-10 sm:h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-purple-500 focus:ring-3 focus:ring-purple-500/15"
              />
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <MapPin className="h-3.5 w-3.5 text-sky-600" />
                <span>Location</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Remote, San Francisco, CA"
                className="h-10 sm:h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-500 focus:ring-3 focus:ring-sky-500/15"
              />
            </div>

            {/* Job Type */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <Briefcase className="h-3.5 w-3.5 text-indigo-600" />
                <span>Job Type</span>
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="h-10 sm:h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15 cursor-pointer"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Opening Status */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Opening Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="h-10 sm:h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15 cursor-pointer"
              >
                <option value="open">Open (Accepting Resumes)</option>
                <option value="closed">Closed (Archived)</option>
              </select>
            </div>

            {/* Actively Hiring Checkbox Card */}
            <div className="sm:col-span-2">
              <label className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl border border-emerald-200/90 bg-emerald-50/60 cursor-pointer transition hover:bg-emerald-50 select-none">
                <input
                  type="checkbox"
                  name="isActivelyHiring"
                  checked={formData.isActivelyHiring}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <span className="text-xs sm:text-sm font-semibold text-emerald-950 flex items-center gap-1.5">
                  <Flame className="h-4 w-4 fill-emerald-500 text-emerald-600" />
                  <span>Actively Hiring Priority Badge</span>
                </span>
              </label>
            </div>
          </div>

          {/* Target Skills Required */}
          <div className="space-y-2 pt-1">
            <label className="block text-xs font-semibold text-slate-700">
              Target Skills & Keywords
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder="Add skill (e.g. React, PyTorch, Node.js)..."
                className="h-10 sm:h-11 flex-1 rounded-xl border border-slate-300 bg-white px-3.5 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="inline-flex h-10 sm:h-11 items-center gap-1 px-4 sm:px-5 rounded-xl border border-indigo-200 bg-indigo-50 text-xs sm:text-sm font-bold text-indigo-700 transition hover:bg-indigo-100 active:scale-95 cursor-pointer shrink-0"
              >
                <Plus className="h-4 w-4" />
                <span>Add</span>
              </button>
            </div>

            {/* Rendered Skill Chips */}
            {formData.skillsRequired.length > 0 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1.5">
                {formData.skillsRequired.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200/90 bg-indigo-50/80 px-2.5 py-1 text-xs font-semibold text-indigo-800 shadow-2xs"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-indigo-400 hover:text-rose-600 transition cursor-pointer"
                      aria-label={`Remove ${skill}`}
                    >
                      <X className="h-3 w-3 stroke-[2.2]" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Job Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Job Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Outline the responsibilities, core impact, and objectives..."
              className="w-full rounded-xl border border-slate-300 bg-white p-3 sm:p-3.5 text-xs sm:text-sm font-normal text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15 resize-none"
            />
          </div>

          {/* Requirements */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Candidate Requirements & Qualifications
            </label>
            <textarea
              name="requirements"
              rows={3}
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Required years of experience, core tech stack, education..."
              className="w-full rounded-xl border border-slate-300 bg-white p-3 sm:p-3.5 text-xs sm:text-sm font-normal text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15 resize-none"
            />
          </div>

          {/* Action Footer: Mobile stacked, Tablet/Desktop row */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5 sm:gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="inline-flex h-10 sm:h-11 w-full sm:w-auto items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex h-10 sm:h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 px-6 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-500/25 transition-all hover:brightness-105 active:scale-[0.98] focus:outline-none disabled:pointer-events-none disabled:opacity-60 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin stroke-[2.2]" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 stroke-[2.2]" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
});

EditJobModal.displayName = 'EditJobModal';
export default EditJobModal;