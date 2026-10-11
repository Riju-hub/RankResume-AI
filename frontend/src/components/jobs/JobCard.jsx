// frontend/src/components/jobs/JobCard.jsx
import React, { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  Building2,
  MapPin,
  Clock,
  ArrowUpRight,
  Users,
  Coins,
  Flame,
  Pencil,
  Trash2,
  Briefcase,
  Bookmark,
  Layers,
  GraduationCap,
  Eye,
} from 'lucide-react';

const SKILL_THEMES = [
  'bg-blue-50/80 text-blue-700 ring-blue-500/20',
  'bg-indigo-50/80 text-indigo-700 ring-indigo-500/20',
  'bg-violet-50/80 text-violet-700 ring-violet-500/20',
  'bg-fuchsia-50/80 text-fuchsia-700 ring-fuchsia-500/20',
  'bg-sky-50/80 text-sky-700 ring-sky-500/20',
];

const getUserId = (userObj) => {
  if (!userObj) return null;
  if (typeof userObj === 'string') return userObj;
  return userObj._id || userObj.id || userObj.userId || userObj.sub || null;
};

const JobCard = memo(
  ({
    job,
    onApply,
    isRecruiter = false,
    onViewApplicants,
    onEdit,
    onDelete,
    onBookmark,
    isBookmarked = false,
  }) => {
    const navigate = useNavigate();
    const authContext = useAuth ? useAuth() : null;

    const {
      _id,
      title = 'Untitled Position',
      companyName = 'Confidential Company',
      salary = 'Competitive CTC',
      isActivelyHiring = true,
      department = 'Engineering',
      location = 'Remote',
      jobType = 'Full-time',
      experienceRequired = '2-4 years',
      skillsRequired = [],
      createdAt,
      applicantCount = 0,
      status = 'open',
      recruiterId,
    } = job || {};

    // Determine current user ID
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

    // Check ownership
    const creatorId = getUserId(recruiterId);
    const isOwner = Boolean(
      currentUserId &&
      creatorId &&
      String(currentUserId).trim() === String(creatorId).trim()
    );

    const formattedDate = createdAt
      ? new Date(createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })
      : 'Just now';

    const isClosed = status === 'closed';

    const handleNavigateDetails = () => {
      if (_id && _id !== 'preview-mode') {
        navigate(`/candidate/jobs/${_id}`);
      }
    };

    return (
      <article
        onClick={handleNavigateDetails}
        className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 sm:p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer ${
          isClosed
            ? 'border-slate-200/60 bg-slate-100/60 opacity-75'
            : 'border-slate-200/80 bg-gradient-to-br from-white via-slate-50/60 to-indigo-50/30 hover:border-indigo-200/80 hover:via-white hover:to-blue-50/40'
        }`}
      >
        {!isClosed && (
          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-400/10 blur-2xl transition-all duration-500 group-hover:bg-indigo-400/20" />
        )}

        <div className="relative z-10">
          {/* Header Row: Company Monogram, Title, & Bookmarking */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/10 via-blue-500/10 to-violet-500/10 ring-1 ring-indigo-500/20 text-indigo-700 shadow-xs group-hover:scale-105 transition-transform">
                <Building2 className="h-5 w-5 text-indigo-600 transition-colors" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="truncate text-xs font-semibold tracking-wider text-slate-500 uppercase">
                    {companyName}
                  </h4>
                  {isActivelyHiring && !isClosed && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/70 px-2 py-0.5 text-[11px] font-semibold text-emerald-800 ring-1 ring-emerald-600/20">
                      <Flame className="h-3 w-3 fill-emerald-600 text-emerald-600" />
                      Hiring
                    </span>
                  )}
                </div>
                <h3 className="mt-0.5 truncate text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors sm:text-lg">
                  {title}
                </h3>
              </div>
            </div>

            {/* Status chip or bookmark */}
            <div className="flex items-center gap-2 shrink-0">
              {isClosed ? (
                <span className="rounded-full bg-slate-200/80 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                  Closed
                </span>
              ) : !isRecruiter && (
                <button
                  type="button"
                  aria-label={isBookmarked ? 'Unsave job' : 'Save job'}
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookmark && onBookmark(_id);
                  }}
                  className={`rounded-xl p-2 transition active:scale-90 cursor-pointer ${
                    isBookmarked
                      ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-500/20'
                      : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
                  }`}
                >
                  <Bookmark
                    className={`h-4 w-4 transition-colors ${
                      isBookmarked ? 'fill-blue-600 text-blue-600' : ''
                    }`}
                  />
                </button>
              )}
            </div>
          </div>

          {/* Key Parameters */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-800 ring-1 ring-emerald-600/20">
              <Coins className="h-3.5 w-3.5 text-emerald-600" />
              {salary}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-lg bg-sky-50 px-2.5 py-1 font-medium text-sky-800 ring-1 ring-sky-500/20">
              <MapPin className="h-3.5 w-3.5 text-sky-600" />
              {location}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100/90 px-2.5 py-1 font-medium text-slate-700 ring-1 ring-slate-300/50">
              <Briefcase className="h-3.5 w-3.5 text-slate-500" />
              {jobType}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1 font-medium text-amber-800 ring-1 ring-amber-600/20">
              <GraduationCap className="h-3.5 w-3.5 text-amber-600" />
              {experienceRequired}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-lg bg-purple-50 px-2.5 py-1 font-medium text-purple-800 ring-1 ring-purple-600/20">
              <Layers className="h-3.5 w-3.5 text-purple-600" />
              {department}
            </span>

            {/* Show applicant counter only to the owning recruiter */}
            {isRecruiter && isOwner && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-pink-50 px-2.5 py-1 font-semibold text-pink-800 ring-1 ring-pink-600/20">
                <Users className="h-3.5 w-3.5 text-pink-600" />
                {applicantCount} {applicantCount === 1 ? 'Applicant' : 'Applicants'}
              </span>
            )}
          </div>

          {/* Skills Required Row */}
          {skillsRequired.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              {skillsRequired.slice(0, 4).map((skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className={`rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 backdrop-blur-xs ${
                    SKILL_THEMES[idx % SKILL_THEMES.length]
                  }`}
                >
                  {skill}
                </span>
              ))}
              {skillsRequired.length > 4 && (
                <span className="rounded-md bg-slate-100/60 px-1.5 py-0.5 text-[11px] font-medium text-slate-500">
                  +{skillsRequired.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer Area with Authorization Guards */}
        <div className="relative z-10 mt-5 flex items-center justify-between border-t border-slate-200/60 pt-3.5">
          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
            <Clock className="h-3 w-3" />
            <span>Posted {formattedDate}</span>
          </div>

          {/* Recruiter Actions: ONLY IF OWNER */}
          {isRecruiter && isOwner ? (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit && onEdit(job);
                }}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition active:scale-95 cursor-pointer"
                title="Edit Position"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete && onDelete(_id);
                }}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition active:scale-95 cursor-pointer"
                title="Delete Position"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewApplicants && onViewApplicants(_id);
                }}
                className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-600 active:scale-95 transition-all cursor-pointer"
              >
                <span>Applicants</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : isRecruiter && !isOwner ? (
            /* Recruiter viewing ANOTHER recruiter's job -> No edit/delete, only inspect details */
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigateDetails();
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition active:scale-95 cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5 text-slate-500" />
              <span>View Opening</span>
            </button>
          ) : (
            /* Candidate Apply Button */
            <button
              type="button"
              disabled={isClosed}
              onClick={(e) => {
                e.stopPropagation();
                if (!isClosed) onApply && onApply(job);
              }}
              className={`inline-flex items-center gap-1 rounded-xl px-4 py-1.5 text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer ${
                isClosed
                  ? 'cursor-not-allowed bg-slate-200 text-slate-400 shadow-none'
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white shadow-indigo-500/20 hover:brightness-105 hover:shadow-md'
              }`}
            >
              <span>{isClosed ? 'Closed' : 'Apply Now'}</span>
              {!isClosed && <ArrowUpRight className="h-3.5 w-3.5" />}
            </button>
          )}
        </div>
      </article>
    );
  }
);

JobCard.displayName = 'JobCard';

export default JobCard;