import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Loader2,
  Building2,
  Coins,
  Flame,
  Save,
} from 'lucide-react';

const EditJobModal = ({ job, isOpen, onClose, onSave, isSaving }) => {
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

  // Lock background window scroll while modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
    <div className="fixed inset-0 z-[999999] overflow-y-auto bg-slate-950/70 p-4 sm:p-6 backdrop-blur-sm">
      {/* Outer Flex Container for Centering */}
      <div className="flex min-h-full items-center justify-center">
        {/* Click-away backdrop overlay */}
        <div
          onClick={onClose}
          className="fixed inset-0 -z-10"
          aria-hidden="true"
        />

        {/* Modal Card */}
        <div
          role="dialog"
          aria-modal="true"
          className="relative w-full max-w-3xl my-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 text-slate-900 shadow-2xl font-sans"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition cursor-pointer"
          >
            <X className="h-4 w-4 stroke-[2.5]" />
          </button>

          <h2 className="text-xl font-black text-slate-950">Update Job Opening</h2>
          <p className="text-xs text-slate-500 font-semibold mb-6">
            Edit specifications, active status, or target semantic vector keywords.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700">Job Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="h-10 w-full rounded-xl border border-slate-300 px-3 text-xs font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5 text-blue-600" /> Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="h-10 w-full rounded-xl border border-slate-300 px-3 text-xs font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 flex items-center gap-1">
                  <Coins className="h-3.5 w-3.5 text-emerald-600" /> Salary / CTC
                </label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="h-10 w-full rounded-xl border border-slate-300 px-3 text-xs font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="h-10 w-full rounded-xl border border-slate-300 px-3 text-xs font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="h-10 w-full rounded-xl border border-slate-300 px-3 text-xs font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700">Job Type</label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="h-10 w-full rounded-xl border border-slate-300 px-3 text-xs font-semibold bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700">Opening Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="h-10 w-full rounded-xl border border-slate-300 px-3 text-xs font-semibold bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="open">Open (Accepting Resumes)</option>
                  <option value="closed">Closed (Archived)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActivelyHiring"
                    checked={formData.isActivelyHiring}
                    onChange={handleChange}
                    className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                    <Flame className="h-3.5 w-3.5 fill-emerald-500 text-emerald-600" />
                    Actively Hiring Priority Badge
                  </span>
                </label>
              </div>
            </div>

            {/* Target Skills */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-700">Target Skills</label>
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
                  placeholder="Add skill (e.g. React)..."
                  className="h-10 flex-1 rounded-xl border border-slate-300 px-3 text-xs font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 rounded-xl border border-blue-200 bg-blue-50 text-xs font-bold text-blue-700 hover:bg-blue-100 cursor-pointer"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {formData.skillsRequired.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-rose-600 cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-700">Job Description</label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 p-3 text-xs font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
              />
            </div>

            {/* Requirements */}
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-700">Requirements</label>
              <textarea
                name="requirements"
                rows={3}
                value={formData.requirements}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 p-3 text-xs font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 disabled:opacity-50 cursor-pointer"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EditJobModal;