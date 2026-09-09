// import React, { useState } from 'react';
// import { useApplications } from '../../hooks/useApplications';
// import { 
//   UploadCloud, 
//   FileText, 
//   X, 
//   AlertCircle, 
//   CheckCircle2, 
//   Loader2, 
//   Sparkles,
//   Building2,
//   MapPin,
//   FileCheck2,
//   Trash2,
//   Zap,
//   Cpu
// } from 'lucide-react';

// const ApplyJobModal = ({ job, isOpen, onClose }) => {
//   const { applyToJob, isApplying, applyError } = useApplications();
//   const [file, setFile] = useState(null);
//   const [coverNote, setCoverNote] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [validationError, setValidationError] = useState('');
//   const [isDragOver, setIsDragOver] = useState(false);

//   if (!isOpen || !job) return null;

//   const validateAndSetFile = (selectedFile) => {
//     if (!selectedFile) return;

//     if (selectedFile.type !== 'application/pdf') {
//       setValidationError('Please upload a valid PDF document.');
//       setFile(null);
//       return;
//     }

//     if (selectedFile.size > 5 * 1024 * 1024) {
//       setValidationError('Resume file size must be under 5MB.');
//       setFile(null);
//       return;
//     }

//     setValidationError('');
//     setFile(selectedFile);
//   };

//   const handleFileChange = (e) => {
//     const selected = e.target.files[0];
//     validateAndSetFile(selected);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragOver(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setIsDragOver(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragOver(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       validateAndSetFile(e.dataTransfer.files[0]);
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (!bytes) return '0 KB';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setValidationError('Please attach your PDF resume.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('resume', file);
//     if (coverNote) {
//       formData.append('coverNote', coverNote);
//     }

//     try {
//       await applyToJob({ targetJobId: job._id, formData });
//       setSuccess(true);
//       setTimeout(() => {
//         setSuccess(false);
//         setFile(null);
//         setCoverNote('');
//         onClose();
//       }, 2000);
//     } catch {
//       // Error handled by hook state
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md transition-all font-sans">
      
//       {/* Background Ambient Glow */}
//       <div className="pointer-events-none fixed h-96 w-96 rounded-full bg-blue-600/10 blur-[120px] transform-gpu will-change-transform" />

//       {/* Main Modal Window */}
//       <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-7 shadow-2xl backdrop-blur-2xl transition-all">
        
//         {/* Top Gradient Bar Accent */}
//         <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

//         {/* Modal Header */}
//         <div className="flex items-start justify-between border-b border-slate-800/80 pb-4">
//           <div className="space-y-1">
//             <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-2.5 py-0.5 text-[10px] font-mono font-bold text-cyan-300">
//               <Sparkles className="h-3 w-3 text-cyan-400" />
//               Gemini 2.5 Neural Scoring
//             </div>
            
//             <h2 className="text-lg sm:text-xl font-black tracking-tight text-white">
//               Apply for {job.title}
//             </h2>
            
//             <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-400 font-medium">
//               <span className="flex items-center gap-1">
//                 <Building2 className="h-3 w-3 text-slate-500" />
//                 {job.department || 'General Engineering'}
//               </span>
//               <span className="text-slate-600">•</span>
//               <span className="flex items-center gap-1">
//                 <MapPin className="h-3 w-3 text-slate-500" />
//                 {job.location || 'Remote'}
//               </span>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             disabled={isApplying}
//             className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-slate-400 transition-all hover:border-slate-700 hover:text-white active:scale-95 disabled:opacity-50 cursor-pointer"
//             aria-label="Close application modal"
//           >
//             <X className="h-4 w-4" />
//           </button>
//         </div>

//         {/* Feedback Alert */}
//         {(validationError || applyError) && (
//           <div className="mt-4 flex items-center gap-2.5 rounded-2xl border border-rose-500/30 bg-rose-950/40 p-3 text-xs font-medium text-rose-300 backdrop-blur-md">
//             <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
//             <span>{validationError || applyError}</span>
//           </div>
//         )}

//         {/* Success Confirmation State */}
//         {success ? (
//           <div className="py-12 text-center">
//             <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-950/50 text-emerald-400 shadow-xl shadow-emerald-500/10">
//               <CheckCircle2 className="h-7 w-7" />
//             </div>
//             <h3 className="mt-4 text-base font-bold text-white">Application Submitted!</h3>
//             <p className="mt-1.5 text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
//               Your resume was extracted and queued for multi-modal vector alignment ranking.
//             </p>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            
//             {/* Resume Upload Dropzone */}
//             <div className="space-y-2">
//               <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
//                 Resume / CV Document (PDF) <span className="text-cyan-400">*</span>
//               </label>

//               {file ? (
//                 /* Selected File Card */
//                 <div className="flex items-center justify-between rounded-2xl border border-cyan-500/40 bg-cyan-950/20 p-3.5 shadow-md shadow-cyan-500/5">
//                   <div className="flex items-center gap-3 min-w-0">
//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
//                       <FileCheck2 className="h-5 w-5" />
//                     </div>
//                     <div className="min-w-0">
//                       <p className="truncate text-xs font-bold text-slate-100">
//                         {file.name}
//                       </p>
//                       <p className="font-mono text-[10px] text-cyan-400">
//                         {formatFileSize(file.size)}
//                       </p>
//                     </div>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={() => setFile(null)}
//                     className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition-all hover:border-rose-500/40 hover:bg-rose-950/30 hover:text-rose-300 cursor-pointer"
//                     title="Remove attached resume"
//                   >
//                     <Trash2 className="h-3.5 w-3.5" />
//                   </button>
//                 </div>
//               ) : (
//                 /* Drag & Drop Surface */
//                 <div
//                   onDragOver={handleDragOver}
//                   onDragLeave={handleDragLeave}
//                   onDrop={handleDrop}
//                   className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-200 ${
//                     isDragOver
//                       ? 'border-cyan-400 bg-cyan-950/30 shadow-lg shadow-cyan-500/10'
//                       : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-950/90'
//                   }`}
//                 >
//                   <input
//                     type="file"
//                     id="resume-upload"
//                     accept="application/pdf"
//                     onChange={handleFileChange}
//                     className="hidden"
//                   />
//                   <label htmlFor="resume-upload" className="cursor-pointer">
//                     <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-400 transition-transform group-hover:scale-105 group-hover:border-cyan-500/40 group-hover:text-cyan-400">
//                       <UploadCloud className="h-5 w-5" />
//                     </div>
//                     <p className="mt-3 text-xs font-medium text-slate-200">
//                       <span className="font-bold text-cyan-400 underline underline-offset-2">Click to upload</span> or drag and drop
//                     </p>
//                     <p className="mt-1 font-mono text-[10px] text-slate-500">PDF document only (max 5MB)</p>
//                   </label>
//                 </div>
//               )}
//             </div>

//             {/* Note & Pitch Field */}
//             <div className="space-y-1.5">
//               <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
//                 Candidate Note / Portfolio Link <span className="text-slate-500 font-normal lowercase">(optional)</span>
//               </label>
//               <textarea
//                 rows={3}
//                 value={coverNote}
//                 onChange={(e) => setCoverNote(e.target.value)}
//                 placeholder="Share your GitHub, portfolio, or a brief note for the engineering lead..."
//                 className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 p-3 text-xs text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20 resize-none"
//               />
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center justify-end gap-2.5 border-t border-slate-800/80 pt-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 disabled={isApplying}
//                 className="h-10 rounded-xl border border-slate-800 bg-slate-900/80 px-4 text-xs font-bold text-slate-400 transition-all hover:border-slate-700 hover:text-slate-200 active:scale-95 disabled:opacity-50 cursor-pointer"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 disabled={isApplying}
//                 className="group relative flex h-10 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 px-5 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] hover:shadow-indigo-600/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
//               >
//                 {isApplying ? (
//                   <>
//                     <Loader2 className="h-3.5 w-3.5 animate-spin" />
//                     <span>Extracting & Submitting...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Zap className="h-3.5 w-3.5" />
//                     <span>Submit Application</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ApplyJobModal;









import React, { useState } from 'react';
import { useApplications } from '../../hooks/useApplications';
import { 
  UploadCloud, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Sparkles,
  Building2,
  MapPin,
  FileCheck2,
  Trash2,
  Zap
} from 'lucide-react';

const ApplyJobModal = ({ job, isOpen, onClose }) => {
  const { applyToJob, isApplying, applyError } = useApplications();
  const [file, setFile] = useState(null);
  const [coverNote, setCoverNote] = useState('');
  const [success, setSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  if (!isOpen || !job) return null;

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      setValidationError('Please upload a valid PDF document.');
      setFile(null);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setValidationError('Resume file size must be under 5MB.');
      setFile(null);
      return;
    }

    setValidationError('');
    setFile(selectedFile);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    validateAndSetFile(selected);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 KB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setValidationError('Please attach your PDF resume.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);
    if (coverNote) {
      formData.append('coverNote', coverNote);
    }

    try {
      await applyToJob({ targetJobId: job._id, formData });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFile(null);
        setCoverNote('');
        onClose();
      }, 2000);
    } catch {
      // Handled via useApplications hook state
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-md transition-all font-sans antialiased">
      
      {/* Background Soft Ambient Orbs */}
      <div className="pointer-events-none fixed -top-20 -left-20 h-80 w-80 rounded-full bg-blue-500/25 blur-[100px] transform-gpu will-change-transform" />
      <div className="pointer-events-none fixed -bottom-20 -right-20 h-80 w-80 rounded-full bg-pink-500/25 blur-[100px] transform-gpu will-change-transform" />

      {/* Main Modal Window */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-white/90 bg-white/95 p-6 sm:p-8 shadow-[0_25px_65px_rgba(37,99,235,0.18),0_12px_35px_rgba(236,72,153,0.15)] backdrop-blur-2xl transition-all duration-300">
        
        {/* Top Multi-Color Neon Rim */}
        <div className="absolute -top-px left-1/2 h-[3px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-blue-600 via-pink-500 to-indigo-600 rounded-full shadow-[0_0_12px_rgba(236,72,153,0.5)]" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-0.5 text-[11px] font-mono font-extrabold text-blue-700 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-pink-600" />
              Gemini 2.5 Neural Scoring
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950">
              Apply for {job.title}
            </h2>
            
            <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-700 font-semibold">
              <span className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-blue-600" />
                {job.department || 'General Engineering'}
              </span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-pink-600" />
                {job.location || 'Remote'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isApplying}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:border-pink-300 hover:bg-pink-50 hover:text-pink-700 active:scale-95 disabled:opacity-50 cursor-pointer shadow-xs"
            aria-label="Close application modal"
          >
            <X className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Feedback Alert */}
        {(validationError || applyError) && (
          <div className="mt-4 flex items-center gap-2.5 rounded-2xl border border-rose-300 bg-rose-50 p-3 text-xs font-bold text-rose-800 shadow-sm backdrop-blur-md">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 stroke-[2.5]" />
            <span>{validationError || applyError}</span>
          </div>
        )}

        {/* Success State */}
        {success ? (
          <div className="py-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-300 bg-emerald-50 text-emerald-600 shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="h-8 w-8 stroke-[2.5]" />
            </div>
            <h3 className="mt-4 text-lg font-black text-slate-950">Application Submitted!</h3>
            <p className="mt-1.5 text-xs font-semibold text-slate-600 max-w-xs mx-auto leading-relaxed">
              Your resume was extracted and queued for multi-modal vector alignment ranking.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            
            {/* Resume Upload Dropzone */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-800">
                Resume / CV Document (PDF) <span className="text-pink-600">*</span>
              </label>

              {file ? (
                /* Selected File Card */
                <div className="flex items-center justify-between rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50/70 via-white to-pink-50/50 p-3.5 shadow-sm">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-100/70 text-blue-700 shadow-xs">
                      <FileCheck2 className="h-5 w-5 stroke-[2.5]" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-extrabold text-slate-950">
                        {file.name}
                      </p>
                      <p className="font-mono text-[11px] font-bold text-blue-700 mt-0.5">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 cursor-pointer shadow-xs"
                    title="Remove attached resume"
                  >
                    <Trash2 className="h-4 w-4 stroke-[2]" />
                  </button>
                </div>
              ) : (
                /* Drag & Drop Surface */
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-200 cursor-pointer ${
                    isDragOver
                      ? 'border-blue-500 bg-blue-50/80 shadow-md shadow-blue-500/10'
                      : 'border-slate-300 bg-gradient-to-b from-blue-50/30 via-white to-pink-50/20 hover:border-blue-400 hover:bg-white'
                  }`}
                >
                  <input
                    type="file"
                    id="resume-upload"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 text-blue-600 transition-transform group-hover:scale-105 group-hover:border-pink-300 group-hover:text-pink-600 group-hover:bg-pink-50 shadow-xs">
                      <UploadCloud className="h-6 w-6 stroke-[2.2]" />
                    </div>
                    <p className="mt-3 text-xs font-semibold text-slate-700">
                      <span className="font-extrabold text-blue-700 underline underline-offset-2 hover:text-pink-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="mt-1 font-mono text-[11px] font-bold text-slate-500">PDF document only (max 5MB)</p>
                  </label>
                </div>
              )}
            </div>

            {/* Note & Pitch Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-800">
                Candidate Note / Portfolio Link <span className="text-slate-500 font-semibold normal-case">(optional)</span>
              </label>
              <textarea
                rows={3}
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder="Share your GitHub, portfolio, or a brief note for the engineering lead..."
                className="w-full rounded-2xl border border-slate-300 bg-white p-3.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/15 shadow-xs resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isApplying}
                className="h-10 rounded-xl border border-slate-300 bg-white px-5 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50 hover:text-slate-950 active:scale-95 disabled:opacity-50 cursor-pointer shadow-xs"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isApplying}
                className="group relative flex h-10 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 px-6 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-pink-500/35 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {isApplying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Extracting & Submitting...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 fill-white text-white" />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplyJobModal;