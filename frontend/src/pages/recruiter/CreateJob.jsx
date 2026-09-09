// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useJobs } from '../../hooks/useJobs';
// import JobCard from '../../components/jobs/JobCard';
// import { 
//   PlusCircle, 
//   Loader2, 
//   Sparkles, 
//   X, 
//   Building2, 
//   MapPin, 
//   Briefcase, 
//   Clock, 
//   Layers, 
//   AlertCircle, 
//   ArrowLeft,
//   Check,
//   Eye,
//   EyeOff,
//   Zap,
//   Target
// } from 'lucide-react';

// const SUGGESTED_SKILLS = [
//   'React', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS', 
//   'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'Next.js', 'REST APIs', 'GraphQL'
// ];

// const CreateJob = () => {
//   const navigate = useNavigate();
//   const { createJob, isCreating } = useJobs();

//   const [formData, setFormData] = useState({
//     title: '',
//     department: '',
//     location: 'Remote',
//     jobType: 'Full-time',
//     experienceRequired: '2-4 years',
//     description: '',
//     requirements: '',
//     skillsRequired: [],
//   });

//   const [skillInput, setSkillInput] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');
//   const [showPreview, setShowPreview] = useState(false);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleAddSkill = (skillToAdd) => {
//     const target = (skillToAdd || skillInput).trim();
//     if (!target) return;
//     if (!formData.skillsRequired.includes(target)) {
//       setFormData((prev) => ({
//         ...prev,
//         skillsRequired: [...prev.skillsRequired, target],
//       }));
//     }
//     setSkillInput('');
//   };

//   const handleKeyDownSkill = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleAddSkill();
//     }
//   };

//   const handleRemoveSkill = (skillToRemove) => {
//     setFormData((prev) => ({
//       ...prev,
//       skillsRequired: prev.skillsRequired.filter((s) => s !== skillToRemove),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg('');
//     try {
//       await createJob(formData);
//       navigate('/recruiter/dashboard');
//     } catch (err) {
//       setErrorMsg(err.response?.data?.message || 'Failed to publish job position.');
//     }
//   };

//   return (
//     <div className="mx-auto max-w-4xl space-y-6 font-sans">
//       {/* ========================================================================= */}
//       {/* --- Header Navigation & Preview Toggle --- */}
//       {/* ========================================================================= */}
//       <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//         <div className="space-y-1">
//           <Link
//             to="/recruiter/dashboard"
//             className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-400 transition hover:text-pink-400"
//           >
//             <ArrowLeft className="h-3.5 w-3.5" />
//             Back to Dashboard
//           </Link>
          
//           <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
//             Create Job <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Opening</span>
//           </h1>
          
//           <p className="text-xs text-slate-400">
//             Define requirements and target skills to configure the Gemini ATS semantic vector matcher.
//           </p>
//         </div>

//         {/* Live Preview Toggle Button */}
//         <button
//           type="button"
//           onClick={() => setShowPreview(!showPreview)}
//           className={`inline-flex h-9 items-center gap-2 rounded-xl border px-3.5 text-xs font-bold transition-all self-start sm:self-auto cursor-pointer active:scale-95 ${
//             showPreview
//               ? 'border-pink-500/50 bg-pink-950/40 text-pink-300 shadow-md shadow-pink-500/10'
//               : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700 hover:text-white'
//           }`}
//         >
//           {showPreview ? <EyeOff className="h-3.5 w-3.5 text-pink-400" /> : <Eye className="h-3.5 w-3.5 text-pink-400" />}
//           <span>{showPreview ? 'Hide Candidate Preview' : 'Live Candidate Preview'}</span>
//         </button>
//       </div>

//       {/* ========================================================================= */}
//       {/* --- Live Candidate Preview Card --- */}
//       {/* ========================================================================= */}
//       {showPreview && (
//         <div className="rounded-3xl border border-pink-500/30 bg-pink-950/15 p-5 backdrop-blur-md transition-all shadow-xl">
//           <div className="mb-3 flex items-center justify-between">
//             <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
//               <Sparkles className="h-3 w-3" /> Candidate Preview Mode
//             </span>
//             <span className="font-mono text-[10px] text-slate-500">Live Synchronized</span>
//           </div>
//           <JobCard
//             job={{
//               _id: 'preview-mode',
//               title: formData.title || 'Senior Software Engineer (Preview)',
//               department: formData.department || 'Engineering',
//               location: formData.location || 'Remote',
//               jobType: formData.jobType,
//               description: formData.description || 'Job description preview will populate here as you type...',
//               skillsRequired: formData.skillsRequired,
//               createdAt: new Date().toISOString(),
//               applicantCount: 0,
//             }}
//             isRecruiter={false}
//           />
//         </div>
//       )}

//       {/* ========================================================================= */}
//       {/* --- Error Alert Box --- */}
//       {/* ========================================================================= */}
//       {errorMsg && (
//         <div className="flex items-center gap-2.5 rounded-2xl border border-rose-500/30 bg-rose-950/40 p-4 text-xs font-medium text-rose-300 backdrop-blur-md">
//           <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
//           <span>{errorMsg}</span>
//         </div>
//       )}

//       {/* ========================================================================= */}
//       {/* --- Main Creation Form Container --- */}
//       {/* ========================================================================= */}
//       <form
//         onSubmit={handleSubmit}
//         className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-8"
//       >
//         {/* Hardware-Accelerated Ambient Top Border Glow */}
//         <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />

//         {/* Section 1: Role Overview */}
//         <div className="space-y-4">
//           <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
//             <Briefcase className="h-4 w-4 text-pink-400" />
//             <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
//               1. Role Identity
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//             <div className="sm:col-span-2 space-y-1.5">
//               <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
//                 Job Title <span className="text-pink-400">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 required
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="e.g. Senior Full-Stack Engineer"
//                 className="h-10 w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 text-xs text-slate-100 placeholder-slate-500 outline-none transition focus:border-pink-500/60 focus:bg-slate-950 focus:ring-2 focus:ring-pink-500/20"
//               />
//             </div>

//             <div className="space-y-1.5">
//               <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
//                 Department
//               </label>
//               <input
//                 type="text"
//                 name="department"
//                 value={formData.department}
//                 onChange={handleChange}
//                 placeholder="e.g. Platform Engineering / Product"
//                 className="h-10 w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 text-xs text-slate-100 placeholder-slate-500 outline-none transition focus:border-pink-500/60 focus:bg-slate-950 focus:ring-2 focus:ring-pink-500/20"
//               />
//             </div>

//             <div className="space-y-1.5">
//               <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
//                 Work Location
//               </label>
//               <input
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 placeholder="e.g. Remote / San Francisco, CA"
//                 className="h-10 w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 text-xs text-slate-100 placeholder-slate-500 outline-none transition focus:border-pink-500/60 focus:bg-slate-950 focus:ring-2 focus:ring-pink-500/20"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Section 2: Specifications */}
//         <div className="space-y-4">
//           <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
//             <Layers className="h-4 w-4 text-purple-400" />
//             <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
//               2. Position Parameters
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//             <div className="space-y-1.5">
//               <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
//                 Employment Type
//               </label>
//               <select
//                 name="jobType"
//                 value={formData.jobType}
//                 onChange={handleChange}
//                 className="h-10 w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 text-xs font-semibold text-slate-200 outline-none transition focus:border-pink-500/60 focus:ring-2 focus:ring-pink-500/20 cursor-pointer"
//               >
//                 <option value="Full-time" className="bg-slate-950">Full-time</option>
//                 <option value="Part-time" className="bg-slate-950">Part-time</option>
//                 <option value="Contract" className="bg-slate-950">Contract</option>
//                 <option value="Internship" className="bg-slate-950">Internship</option>
//               </select>
//             </div>

//             <div className="space-y-1.5">
//               <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
//                 Experience Level
//               </label>
//               <input
//                 type="text"
//                 name="experienceRequired"
//                 value={formData.experienceRequired}
//                 onChange={handleChange}
//                 placeholder="e.g. 3+ years / Mid-Senior"
//                 className="h-10 w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 text-xs text-slate-100 placeholder-slate-500 outline-none transition focus:border-pink-500/60 focus:bg-slate-950 focus:ring-2 focus:ring-pink-500/20"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Section 3: Semantic Skills Config */}
//         <div className="space-y-4">
//           <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
//             <Target className="h-4 w-4 text-cyan-400" />
//             <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
//               3. AI Semantic Matching Vector Criteria
//             </h2>
//           </div>

//           <div className="space-y-3">
//             <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
//               Required Target Skills <span className="text-slate-500 lowercase">(Type & press Enter)</span>
//             </label>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={skillInput}
//                 onChange={(e) => setSkillInput(e.target.value)}
//                 onKeyDown={handleKeyDownSkill}
//                 placeholder="e.g. React, PostgreSQL, Docker, AWS..."
//                 className="h-10 flex-1 rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 text-xs text-slate-100 placeholder-slate-500 outline-none transition focus:border-cyan-500/60 focus:bg-slate-950 focus:ring-2 focus:ring-cyan-500/20"
//               />
//               <button
//                 type="button"
//                 onClick={() => handleAddSkill()}
//                 className="h-10 rounded-xl border border-slate-800 bg-slate-900 px-5 text-xs font-bold text-slate-200 transition hover:border-slate-700 hover:bg-slate-800 active:scale-95 cursor-pointer"
//               >
//                 Add
//               </button>
//             </div>

//             {/* Suggested 1-Click Skills */}
//             <div className="flex flex-wrap items-center gap-1.5 pt-1">
//               <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 mr-1">
//                 Suggested:
//               </span>
//               {SUGGESTED_SKILLS.filter((s) => !formData.skillsRequired.includes(s)).map((skill) => (
//                 <button
//                   key={skill}
//                   type="button"
//                   onClick={() => handleAddSkill(skill)}
//                   className="rounded-lg border border-slate-800 bg-slate-950/40 px-2 py-1 font-mono text-[10px] font-medium text-slate-400 transition hover:border-cyan-500/40 hover:bg-cyan-950/30 hover:text-cyan-300 cursor-pointer"
//                 >
//                   + {skill}
//                 </button>
//               ))}
//             </div>

//             {/* Active Selected Skills Badges */}
//             {formData.skillsRequired.length > 0 && (
//               <div className="flex flex-wrap gap-2 pt-2">
//                 {formData.skillsRequired.map((skill) => (
//                   <span
//                     key={skill}
//                     className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 font-mono text-xs font-bold text-cyan-300 shadow-sm shadow-cyan-500/5"
//                   >
//                     <span>{skill}</span>
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveSkill(skill)}
//                       className="rounded p-0.5 text-cyan-400/80 hover:bg-cyan-500/20 hover:text-cyan-200 cursor-pointer"
//                     >
//                       <X className="h-3 w-3" />
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Section 4: Narrative Description */}
//         <div className="space-y-4">
//           <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
//             <Clock className="h-4 w-4 text-indigo-400" />
//             <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
//               4. Job Narrative & Details
//             </h2>
//           </div>

//           <div className="space-y-4">
//             <div className="space-y-1.5">
//               <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
//                 Job Overview & Scope <span className="text-pink-400">*</span>
//               </label>
//               <textarea
//                 name="description"
//                 required
//                 rows={4}
//                 value={formData.description}
//                 onChange={handleChange}
//                 placeholder="Outline the responsibilities, project scope, architecture stack, and expected engineering deliverables..."
//                 className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 p-3.5 text-xs text-slate-100 placeholder-slate-500 outline-none transition focus:border-pink-500/60 focus:bg-slate-950 focus:ring-2 focus:ring-pink-500/20 resize-none"
//               />
//             </div>

//             <div className="space-y-1.5">
//               <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
//                 Key Requirements & Qualifications
//               </label>
//               <textarea
//                 name="requirements"
//                 rows={3}
//                 value={formData.requirements}
//                 onChange={handleChange}
//                 placeholder="List must-haves, degree expectations, architectural experience, or certifications..."
//                 className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 p-3.5 text-xs text-slate-100 placeholder-slate-500 outline-none transition focus:border-pink-500/60 focus:bg-slate-950 focus:ring-2 focus:ring-pink-500/20 resize-none"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Form Submission Action Bar */}
//         <div className="flex items-center justify-end gap-3 border-t border-slate-800/80 pt-5">
//           <button
//             type="button"
//             onClick={() => navigate('/recruiter/dashboard')}
//             disabled={isCreating}
//             className="h-10 rounded-xl border border-slate-800 bg-slate-900/80 px-5 text-xs font-bold text-slate-400 transition hover:border-slate-700 hover:text-slate-200 active:scale-95 disabled:opacity-50 cursor-pointer"
//           >
//             Cancel
//           </button>

//           <button
//             type="submit"
//             disabled={isCreating}
//             className="group relative flex h-10 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 px-6 text-xs font-bold text-white shadow-xl shadow-indigo-600/20 transition-all hover:scale-[1.02] hover:shadow-indigo-600/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
//           >
//             {isCreating ? (
//               <>
//                 <Loader2 className="h-3.5 w-3.5 animate-spin" />
//                 <span>Configuring ATS & Publishing...</span>
//               </>
//             ) : (
//               <>
//                 <Zap className="h-3.5 w-3.5" />
//                 <span>Publish Job Opening</span>
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateJob;












import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useJobs } from '../../hooks/useJobs';
import JobCard from '../../components/jobs/JobCard';
import { 
  Loader2, 
  Sparkles, 
  X, 
  Briefcase, 
  Clock, 
  Layers, 
  AlertCircle, 
  ArrowLeft,
  Eye,
  EyeOff,
  Zap,
  Target
} from 'lucide-react';

const SUGGESTED_SKILLS = [
  'React', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS', 
  'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'Next.js', 'REST APIs', 'GraphQL'
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
    <div className="relative mx-auto max-w-4xl space-y-6 font-sans text-slate-900 antialiased">
      
      {/* Background Ambient Orbs (Hardware-Accelerated) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu">
        <div className="absolute -top-32 -left-20 h-[500px] w-[500px] rounded-full bg-blue-500/25 blur-[120px] will-change-transform" />
        <div className="absolute top-1/3 -right-20 h-[520px] w-[520px] rounded-full bg-pink-500/25 blur-[130px] will-change-transform" />
      </div>

      {/* ========================================================================= */}
      {/* --- Header Navigation & Preview Toggle --- */}
      {/* ========================================================================= */}
      <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <Link
            to="/recruiter/dashboard"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-slate-600 transition hover:text-pink-600"
          >
            <ArrowLeft className="h-4 w-4 text-blue-600 stroke-[2.5]" />
            Back to Dashboard
          </Link>
          
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            Create Job <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">Opening</span>
          </h1>
          
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Define requirements and target skills to configure the Gemini ATS semantic vector matcher.
          </p>
        </div>

        {/* Live Preview Toggle Button */}
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className={`inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-xs font-extrabold transition-all self-start sm:self-auto cursor-pointer active:scale-95 shadow-xs ${
            showPreview
              ? 'border-pink-300 bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/20'
              : 'border-slate-300 bg-white text-slate-800 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50/40'
          }`}
        >
          {showPreview ? (
            <EyeOff className="h-4 w-4 stroke-[2.5]" />
          ) : (
            <Eye className="h-4 w-4 text-pink-600 stroke-[2.5]" />
          )}
          <span>{showPreview ? 'Hide Live Preview' : 'Live Candidate Preview'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* --- Live Candidate Preview Card --- */}
      {/* ========================================================================= */}
      {showPreview && (
        <div className="relative z-10 rounded-3xl border border-pink-200/90 bg-gradient-to-br from-pink-50/60 via-white to-blue-50/40 p-5 backdrop-blur-xl transition-all shadow-lg shadow-pink-500/5">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-pink-700 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-pink-600 animate-spin" style={{ animationDuration: '6s' }} />
              Candidate Preview Mode
            </span>
            <span className="font-mono text-[10px] font-bold text-slate-500 bg-white/80 border border-slate-200 px-2 py-0.5 rounded-md">
              Live Synchronized
            </span>
          </div>
          <JobCard
            job={{
              _id: 'preview-mode',
              title: formData.title || 'Senior Software Engineer (Preview)',
              department: formData.department || 'Engineering',
              location: formData.location || 'Remote',
              jobType: formData.jobType,
              description: formData.description || 'Job description preview will populate here as you type...',
              skillsRequired: formData.skillsRequired,
              createdAt: new Date().toISOString(),
              applicantCount: 0,
            }}
            isRecruiter={false}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* --- Error Alert Box --- */}
      {/* ========================================================================= */}
      {errorMsg && (
        <div className="relative z-10 flex items-center gap-2.5 rounded-2xl border border-rose-300 bg-rose-50 p-4 text-xs font-bold text-rose-800 shadow-sm backdrop-blur-md">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 stroke-[2.5]" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* --- Main Creation Form Container --- */}
      {/* ========================================================================= */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 overflow-hidden rounded-3xl border border-white/90 bg-white/90 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(37,99,235,0.12),0_10px_30px_rgba(236,72,153,0.1)] space-y-8"
      >
        {/* Top Multi-Color Accent Rim */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-pink-500 to-indigo-600 shadow-[0_0_12px_rgba(236,72,153,0.4)]" />

        {/* Section 1: Role Overview */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5">
            <Briefcase className="h-4 w-4 text-pink-600 stroke-[2.5]" />
            <h2 className="font-mono text-xs font-extrabold uppercase tracking-wider text-slate-800">
              1. Role Identity
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-800">
                Job Title <span className="text-pink-600">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior Full-Stack Engineer"
                className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-xs font-bold text-slate-950 placeholder:text-slate-400 outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-500/15 shadow-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-800">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g. Platform Engineering / Product"
                className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-xs font-bold text-slate-950 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-800">
                Work Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Remote / San Francisco, CA"
                className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-xs font-bold text-slate-950 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Specifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5">
            <Layers className="h-4 w-4 text-indigo-600 stroke-[2.5]" />
            <h2 className="font-mono text-xs font-extrabold uppercase tracking-wider text-slate-800">
              2. Position Parameters
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-800">
                Employment Type
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-xs font-bold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 cursor-pointer shadow-xs"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-800">
                Experience Level
              </label>
              <input
                type="text"
                name="experienceRequired"
                value={formData.experienceRequired}
                onChange={handleChange}
                placeholder="e.g. 3+ years / Mid-Senior"
                className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-xs font-bold text-slate-950 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Semantic Skills Config */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5">
            <Target className="h-4 w-4 text-blue-600 stroke-[2.5]" />
            <h2 className="font-mono text-xs font-extrabold uppercase tracking-wider text-slate-800">
              3. AI Semantic Matching Vector Criteria
            </h2>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-800">
              Required Target Skills <span className="text-slate-500 font-semibold normal-case">(Type & press Enter)</span>
            </label>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleKeyDownSkill}
                placeholder="e.g. React, PostgreSQL, Docker, AWS..."
                className="h-11 flex-1 rounded-xl border border-slate-300 bg-white px-3.5 text-xs font-bold text-slate-950 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-xs"
              />
              <button
                type="button"
                onClick={() => handleAddSkill()}
                className="h-11 rounded-xl border border-blue-200 bg-blue-50 px-6 text-xs font-extrabold text-blue-700 shadow-xs transition hover:bg-blue-100 hover:border-blue-300 active:scale-95 cursor-pointer"
              >
                Add Skill
              </button>
            </div>

            {/* Suggested 1-Click Skills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mr-1">
                Suggested:
              </span>
              {SUGGESTED_SKILLS.filter((s) => !formData.skillsRequired.includes(s)).map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleAddSkill(skill)}
                  className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 font-mono text-[11px] font-bold text-slate-700 shadow-2xs transition hover:border-blue-400 hover:bg-blue-50/70 hover:text-blue-700 active:scale-95 cursor-pointer"
                >
                  + {skill}
                </button>
              ))}
            </div>

            {/* Active Selected Skills Badges */}
            {formData.skillsRequired.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.skillsRequired.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/80 px-3 py-1 font-mono text-xs font-extrabold text-blue-700 shadow-xs"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="rounded p-0.5 text-blue-500 hover:bg-blue-200 hover:text-blue-900 cursor-pointer"
                      aria-label={`Remove ${skill}`}
                    >
                      <X className="h-3.5 w-3.5 stroke-[2.5]" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Narrative Description */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5">
            <Clock className="h-4 w-4 text-pink-600 stroke-[2.5]" />
            <h2 className="font-mono text-xs font-extrabold uppercase tracking-wider text-slate-800">
              4. Job Narrative & Details
            </h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-800">
                Job Overview & Scope <span className="text-pink-600">*</span>
              </label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Outline the responsibilities, project scope, architecture stack, and expected engineering deliverables..."
                className="w-full rounded-2xl border border-slate-300 bg-white p-3.5 text-xs font-semibold text-slate-950 placeholder:text-slate-400 outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-500/15 shadow-xs resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-800">
                Key Requirements & Qualifications
              </label>
              <textarea
                name="requirements"
                rows={3}
                value={formData.requirements}
                onChange={handleChange}
                placeholder="List must-haves, degree expectations, architectural experience, or certifications..."
                className="w-full rounded-2xl border border-slate-300 bg-white p-3.5 text-xs font-semibold text-slate-950 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-xs resize-none"
              />
            </div>
          </div>
        </div>

        {/* Form Submission Action Bar */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={() => navigate('/recruiter/dashboard')}
            disabled={isCreating}
            className="h-11 rounded-xl border border-slate-300 bg-white px-5 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:text-slate-950 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isCreating}
            className="group relative flex h-11 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 px-6 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-pink-500/35 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {isCreating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Configuring ATS & Publishing...</span>
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 fill-white text-white" />
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