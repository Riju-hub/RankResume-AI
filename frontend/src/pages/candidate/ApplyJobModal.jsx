import React, { useState } from 'react';
import { useApplications } from '../../hooks/useApplications';
import { 
  UploadCloud, 
  FileText, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Sparkles,
  Building2,
  MapPin,
  FileCheck2,
  Trash2
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
      setValidationError('Resume file size must be less than 5MB.');
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
      }, 2200);
    } catch {
      // Error is caught and surfaced via applyError
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md transition-all">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none fixed h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px]" />

      {/* Main Modal Window */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/90 p-6 sm:p-7 shadow-2xl backdrop-blur-2xl transition-all">
        {/* Top Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-zinc-800/70 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-300">
              <Sparkles className="h-3 w-3 text-indigo-400" />
              Gemini AI Auto-Ranking
            </div>
            <h2 className="text-lg font-bold text-zinc-100 sm:text-xl">
              Apply for {job.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 text-xs text-zinc-400">
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3 text-zinc-500" />
                {job.department || 'General'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-zinc-500" />
                {job.location || 'Remote'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isApplying}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-zinc-700 hover:text-zinc-100 active:scale-95 disabled:opacity-50"
            aria-label="Close application modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Feedback Alert */}
        {(validationError || applyError) && (
          <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-rose-500/25 bg-rose-500/10 p-3 text-xs text-rose-300 backdrop-blur-md">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>{validationError || applyError}</span>
          </div>
        )}

        {/* Success Confirmation State */}
        {success ? (
          <div className="py-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-xl shadow-emerald-500/10">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-base font-bold text-zinc-100">Application Submitted!</h3>
            <p className="mt-1.5 text-xs text-zinc-400 max-w-xs mx-auto">
              Your resume was parsed by Gemini ATS and submitted to the recruiter.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Resume Upload Dropzone */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Resume / CV Document (PDF) <span className="text-indigo-400">*</span>
              </label>

              {file ? (
                /* Selected File Card */
                <div className="flex items-center justify-between rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-3.5 transition-all">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/20 text-indigo-300">
                      <FileCheck2 className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-zinc-200">
                        {file.name}
                      </p>
                      <p className="font-mono text-[10px] text-indigo-300/80">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-zinc-700/60 bg-zinc-800/80 text-zinc-400 transition hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-300"
                    title="Remove attached resume"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                /* Drag & Drop Surface */
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-200 ${
                    isDragOver
                      ? 'border-indigo-500 bg-indigo-500/10 shadow-inner'
                      : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-950/90'
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
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-400 transition group-hover:scale-105 group-hover:border-indigo-500/30 group-hover:text-indigo-400">
                      <UploadCloud className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-xs font-medium text-zinc-300">
                      <span className="font-semibold text-indigo-400 underline underline-offset-2">Click to upload</span> or drag and drop
                    </p>
                    <p className="mt-1 text-[11px] text-zinc-400">PDF document only (up to 5MB)</p>
                  </label>
                </div>
              )}
            </div>

            {/* Note & Pitch Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Candidate Note / Portfolio Link <span className="text-zinc-500 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={3}
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder="Share your GitHub, portfolio, or a brief note for the hiring team..."
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3 text-xs text-zinc-100 placeholder-zinc-500 outline-none transition focus:border-indigo-500/60 focus:bg-zinc-950 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2.5 border-t border-zinc-800/70 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isApplying}
                className="h-10 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 text-xs font-medium text-zinc-400 transition hover:border-zinc-700 hover:text-zinc-200 active:scale-95 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isApplying}
                className="group relative flex h-10 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-5 text-xs font-medium text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:from-indigo-500 hover:to-violet-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
                {isApplying ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Extracting & Submitting...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
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