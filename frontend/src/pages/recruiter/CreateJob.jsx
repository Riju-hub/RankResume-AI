import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useJobs } from '../../hooks/useJobs';
import JobCard from '../../components/jobs/JobCard';
import { 
  PlusCircle, 
  Loader2, 
  Sparkles, 
  X, 
  Building2, 
  MapPin, 
  Briefcase, 
  Clock, 
  Layers, 
  AlertCircle, 
  ArrowLeft,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';

const SUGGESTED_SKILLS = [
  'React', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS', 
  'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'Next.js', 'REST APIs'
];

const CreateJob = () => {
  const navigate = useNavigate();
  const { createJob, isCreating } = useJobs();

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: 'Remote',
    jobType: 'Full-time',
    experienceRequired: '2-4 years',
    description: '',
    requirements: '',
    skillsRequired: [],
  });

  const [skillInput, setSkillInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddSkill = (skillToAdd) => {
    const target = (skillToAdd || skillInput).trim();
    if (!target) return;
    if (!formData.skillsRequired.includes(target)) {
      setFormData((prev) => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, target],
      }));
    }
    setSkillInput('');
  };

  const handleKeyDownSkill = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter((s) => s !== skillToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await createJob(formData);
      navigate('/recruiter/dashboard');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to publish job position.');
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Top Header & Navigation Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Link
            to="/recruiter/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition hover:text-zinc-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Dashboard
          </Link>
          <h1 className="text-xl font-bold tracking-tight text-zinc-100 sm:text-2xl">
            Create Job Opening
          </h1>
          <p className="text-xs text-zinc-400">
            Define requirements and target skills to configure the Gemini ATS semantic matcher.
          </p>
        </div>

        {/* Live Preview Toggle */}
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="inline-flex h-9 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 text-xs font-medium text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 self-start sm:self-auto"
        >
          {showPreview ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          <span>{showPreview ? 'Hide Preview' : 'Live Preview'}</span>
        </button>
      </div>

      {/* Optional Live Preview Card */}
      {showPreview && (
        <div className="rounded-3xl border border-indigo-500/30 bg-indigo-500/5 p-5 backdrop-blur-md">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
              Candidate Preview Mode
            </span>
            <span className="text-[10px] text-zinc-400">Updates live as you type</span>
          </div>
          <JobCard
            job={{
              _id: 'preview-mode',
              title: formData.title || 'Job Title Placeholder',
              department: formData.department || 'General',
              location: formData.location || 'Remote',
              jobType: formData.jobType,
              description: formData.description || 'Job description preview will appear here...',
              skillsRequired: formData.skillsRequired,
              createdAt: new Date().toISOString(),
              applicantCount: 0,
            }}
            isRecruiter={false}
          />
        </div>
      )}

      {/* Error Alert Box */}
      {errorMsg && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-rose-500/25 bg-rose-500/10 p-4 text-xs text-rose-300 backdrop-blur-md">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Creation Form Container */}
      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-8"
      >
        {/* Subtle Top Ambient Accent */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

        {/* Section 1: Role Overview */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-800/60 pb-2">
            <Briefcase className="h-4 w-4 text-indigo-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              1. Role Identity
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Job Title <span className="text-indigo-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior Full-Stack Engineer"
                className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-950/70 px-3.5 text-xs text-zinc-100 placeholder-zinc-500 outline-none transition focus:border-indigo-500/60 focus:bg-zinc-950 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g. Engineering / Product"
                className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-950/70 px-3.5 text-xs text-zinc-100 placeholder-zinc-500 outline-none transition focus:border-indigo-500/60 focus:bg-zinc-950 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Work Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Remote / San Francisco, CA"
                className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-950/70 px-3.5 text-xs text-zinc-100 placeholder-zinc-500 outline-none transition focus:border-indigo-500/60 focus:bg-zinc-950 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Specifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-800/60 pb-2">
            <Layers className="h-4 w-4 text-indigo-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              2. Position Parameters
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Employment Type
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-950/70 px-3.5 text-xs font-medium text-zinc-200 outline-none transition focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
              >
                <option value="Full-time" className="bg-zinc-950">Full-time</option>
                <option value="Part-time" className="bg-zinc-950">Part-time</option>
                <option value="Contract" className="bg-zinc-950">Contract</option>
                <option value="Internship" className="bg-zinc-950">Internship</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Experience Level
              </label>
              <input
                type="text"
                name="experienceRequired"
                value={formData.experienceRequired}
                onChange={handleChange}
                placeholder="e.g. 3+ years / Mid-Senior"
                className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-950/70 px-3.5 text-xs text-zinc-100 placeholder-zinc-500 outline-none transition focus:border-indigo-500/60 focus:bg-zinc-950 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Semantic Skills Config */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-800/60 pb-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              3. AI Semantic Matching Criteria
            </h2>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Required Target Skills (Type & press Enter)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleKeyDownSkill}
                placeholder="e.g. React, PostgreSQL, Docker..."
                className="h-10 flex-1 rounded-xl border border-zinc-800 bg-zinc-950/70 px-3.5 text-xs text-zinc-100 placeholder-zinc-500 outline-none transition focus:border-indigo-500/60 focus:bg-zinc-950 focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                type="button"
                onClick={() => handleAddSkill()}
                className="h-10 rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-xs font-medium text-zinc-200 transition hover:border-zinc-700 hover:bg-zinc-800 active:scale-95"
              >
                Add
              </button>
            </div>

            {/* Quick 1-Click Suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mr-1">
                Suggested:
              </span>
              {SUGGESTED_SKILLS.filter((s) => !formData.skillsRequired.includes(s)).map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleAddSkill(skill)}
                  className="rounded-lg border border-zinc-800/80 bg-zinc-950/40 px-2 py-0.5 text-[10px] font-medium text-zinc-400 transition hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-300"
                >
                  + {skill}
                </button>
              ))}
            </div>

            {/* Active Selected Skills List */}
            {formData.skillsRequired.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.skillsRequired.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="rounded p-0.5 text-indigo-400/80 hover:bg-indigo-500/20 hover:text-indigo-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Narrative Description */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-800/60 pb-2">
            <Clock className="h-4 w-4 text-indigo-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              4. Job Narrative & Details
            </h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Job Overview & Scope <span className="text-indigo-400">*</span>
              </label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Outline the responsibilities, project scope, and impact of this role..."
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3.5 text-xs text-zinc-100 placeholder-zinc-500 outline-none transition focus:border-indigo-500/60 focus:bg-zinc-950 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Key Requirements & Qualifications
              </label>
              <textarea
                name="requirements"
                rows={3}
                value={formData.requirements}
                onChange={handleChange}
                placeholder="List specific must-haves, degree expectations, or certifications..."
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3.5 text-xs text-zinc-100 placeholder-zinc-500 outline-none transition focus:border-indigo-500/60 focus:bg-zinc-950 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
        </div>

        {/* Form Submission Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-zinc-800/80 pt-5">
          <button
            type="button"
            onClick={() => navigate('/recruiter/dashboard')}
            disabled={isCreating}
            className="h-10 rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 text-xs font-medium text-zinc-400 transition hover:border-zinc-700 hover:text-zinc-200 active:scale-95 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isCreating}
            className="group relative flex h-10 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-6 text-xs font-medium text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:from-indigo-500 hover:to-violet-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
            {isCreating ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Configuring ATS & Publishing...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                <span>Publish Job Opening</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;