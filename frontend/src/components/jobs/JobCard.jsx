import React from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Users, 
  Sparkles,
  Layers
} from 'lucide-react';

export const JobCard = ({ job, onApply, isRecruiter = false, onViewApplicants }) => {
  const {
    _id,
    title,
    department = 'General',
    location = 'Remote',
    jobType = 'Full-time',
    description,
    skillsRequired = [],
    createdAt,
    applicantCount = 0,
  } = job;

  // Format date helper
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent';

  return (
    <div className="group relative flex flex-col justify-between gap-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 sm:p-6 backdrop-blur-sm transition-all duration-200 hover:border-zinc-700/80 hover:bg-zinc-900/70 hover:shadow-xl hover:shadow-indigo-500/5 lg:flex-row lg:items-center">
      {/* Ambient Accent Indicator on Hover */}
      <div className="absolute left-0 top-6 bottom-6 w-[2px] rounded-r-full bg-gradient-to-b from-indigo-500 to-violet-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      {/* Main Details Section */}
      <div className="flex-1 space-y-3.5">
        {/* Title & Employment Type Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="text-base font-semibold text-zinc-100 transition-colors group-hover:text-indigo-300">
            {title}
          </h3>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center rounded-md border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-[11px] font-medium text-indigo-400">
              {jobType}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[11px] font-medium text-zinc-400">
              <Layers className="h-2.5 w-2.5 text-zinc-400" />
              {department}
            </span>
          </div>
        </div>

        {/* Metadata Details Strip */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-400">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-zinc-400" />
            {location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-zinc-400" />
            Posted {formattedDate}
          </span>
          {isRecruiter && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
              <Users className="h-3 w-3" />
              {applicantCount} {applicantCount === 1 ? 'Applicant' : 'Applicants'}
            </span>
          )}
        </div>

        {/* Description Snippet */}
        {description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-zinc-400 max-w-2xl">
            {description}
          </p>
        )}

        {/* Skill Requirement Tags */}
        {skillsRequired.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {skillsRequired.slice(0, 5).map((skill, idx) => (
              <span
                key={idx}
                className="rounded-lg border border-zinc-800/80 bg-zinc-950/60 px-2.5 py-0.5 text-[11px] font-medium text-zinc-300"
              >
                {skill}
              </span>
            ))}
            {skillsRequired.length > 5 && (
              <span className="rounded-lg border border-transparent px-1.5 py-0.5 text-[11px] font-semibold text-zinc-400">
                +{skillsRequired.length - 5} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action Button Section */}
      <div className="flex shrink-0 items-center justify-end border-t border-zinc-800/60 pt-4 lg:border-none lg:pt-0">
        {isRecruiter ? (
          <button
            onClick={() => onViewApplicants && onViewApplicants(_id)}
            className="group/btn inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-zinc-700/80 bg-zinc-800/80 px-4 text-xs font-medium text-zinc-200 transition-all duration-150 hover:border-zinc-600 hover:bg-zinc-700 hover:text-white active:scale-95 sm:w-auto"
          >
            Review Candidates
            <ArrowRight className="h-3.5 w-3.5 text-zinc-400 transition-transform duration-150 group-hover/btn:translate-x-0.5 group-hover/btn:text-white" />
          </button>
        ) : (
          <button
            onClick={() => onApply && onApply(job)}
            className="group/btn inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-xs font-medium text-white shadow-md shadow-indigo-500/20 transition-all duration-150 hover:from-indigo-500 hover:to-violet-500 active:scale-95 sm:w-auto"
          >
            Apply Now
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover/btn:translate-x-0.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;