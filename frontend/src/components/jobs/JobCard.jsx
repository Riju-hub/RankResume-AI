import React, { memo } from 'react';
import {
  Building2,
  MapPin,
  Clock,
  ArrowRight,
  Users,
  Layers,
  Zap,
  Sparkles,
  BriefcaseBusiness,
} from 'lucide-react';

const TONE_STYLES = {
  blue: {
    icon: 'border-blue-200/80 bg-blue-50 text-blue-600',
    glow: 'bg-blue-500/15',
    badge: 'border-blue-200 bg-blue-50 text-blue-700',
  },
  pink: {
    icon: 'border-pink-200/80 bg-pink-50 text-pink-600',
    glow: 'bg-pink-500/15',
    badge: 'border-pink-200 bg-pink-50 text-pink-700',
  },
  violet: {
    icon: 'border-violet-200/80 bg-violet-50 text-violet-600',
    glow: 'bg-violet-500/15',
    badge: 'border-violet-200 bg-violet-50 text-violet-700',
  },
  cyan: {
    icon: 'border-cyan-200/80 bg-cyan-50 text-cyan-600',
    glow: 'bg-cyan-500/15',
    badge: 'border-cyan-200 bg-cyan-50 text-cyan-700',
  },
};

const SKILL_TONES = [
  'border-blue-200 bg-blue-50/70 text-blue-700',
  'border-violet-200 bg-violet-50/70 text-violet-700',
  'border-pink-200 bg-pink-50/70 text-pink-700',
  'border-cyan-200 bg-cyan-50/70 text-cyan-700',
  'border-indigo-200 bg-indigo-50/70 text-indigo-700',
];

const JobCard = memo(
  ({ job, onApply, isRecruiter = false, onViewApplicants }) => {
    const {
      _id,
      title,
      department = 'Engineering',
      location = 'Remote',
      jobType = 'Full-time',
      description,
      skillsRequired = [],
      createdAt,
      applicantCount = 0,
    } = job || {};

    const formattedDate = createdAt
      ? new Date(createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : 'Recent';

    return (
      <>
        <style>{`
          @keyframes jobCardSpectrum {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          @keyframes jobCardGlow {
            0%, 100% { opacity: .45; transform: scale(1); }
            50% { opacity: .72; transform: scale(1.05); }
          }

          @keyframes jobCardShimmer {
            0% { transform: translateX(-130%); }
            100% { transform: translateX(160%); }
          }

          .job-card-spectrum {
            background-size: 220% 100%;
            animation: jobCardSpectrum 7s ease-in-out infinite;
            will-change: background-position;
          }

          .job-card-glow {
            animation: jobCardGlow 5s ease-in-out infinite;
            will-change: transform, opacity;
          }

          .job-card-shimmer {
            animation: jobCardShimmer 3.5s ease-in-out infinite;
            will-change: transform;
          }

          @media (prefers-reduced-motion: reduce) {
            .job-card-spectrum,
            .job-card-glow,
            .job-card-shimmer {
              animation: none !important;
            }
          }
        `}</style>

        <article
          className="
            group relative isolate flex min-h-[250px] flex-col justify-between
            overflow-hidden rounded-[1.75rem] border border-white/90
            bg-white/80 p-5 font-sans text-slate-900 antialiased
            shadow-[0_12px_35px_rgba(15,23,42,0.06)]
            backdrop-blur-2xl
            transition-[transform,box-shadow,border-color,background-color]
            duration-300 ease-out
            hover:-translate-y-1
            hover:border-blue-200/90
            hover:bg-white/95
            hover:shadow-[0_24px_60px_rgba(37,99,235,0.12),0_10px_30px_rgba(236,72,153,0.07)]
            transform-gpu
            sm:p-6 lg:flex-row lg:items-center lg:gap-8
          "
        >
          {/* Lightweight multicolor top spectrum */}
          <div
            className="
              job-card-spectrum pointer-events-none absolute left-0 right-0 top-0
              h-[3px] rounded-t-[1.75rem]
              bg-gradient-to-r from-cyan-400 via-blue-600 via-violet-500 to-pink-500
              opacity-70
            "
          />

          {/* Ambient card glow */}
          <div
            className="
              job-card-glow pointer-events-none absolute -right-20 -top-24
              h-48 w-48 rounded-full bg-blue-500/10 blur-3xl
              transform-gpu
            "
          />

          <div
            className="
              pointer-events-none absolute -bottom-24 -left-16
              h-40 w-40 rounded-full bg-pink-500/10 blur-3xl
              opacity-0 transition-opacity duration-300
              group-hover:opacity-100 transform-gpu
            "
          />

          {/* Main details */}
          <div className="relative z-10 min-w-0 flex-1 space-y-4">
            {/* Title row */}
            <div className="flex items-start gap-3">
              <div
                className="
                  hidden h-11 w-11 shrink-0 items-center justify-center
                  rounded-2xl border border-blue-200/80
                  bg-gradient-to-br from-blue-50 via-white to-pink-50
                  text-blue-600 shadow-sm sm:flex
                  transition-transform duration-300
                  group-hover:scale-105
                "
              >
                <BriefcaseBusiness className="h-5 w-5 stroke-[2.1]" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3
                    className="
                      min-w-0 text-base font-black tracking-tight text-slate-950
                      transition-colors duration-200
                      group-hover:text-blue-700
                      sm:text-lg
                    "
                  >
                    {title}
                  </h3>

                  <span
                    className="
                      inline-flex items-center rounded-lg border
                      border-blue-200 bg-blue-50 px-2.5 py-1
                      font-mono text-[9px] font-extrabold uppercase
                      tracking-wider text-blue-700 shadow-sm
                    "
                  >
                    {jobType}
                  </span>

                  <span
                    className="
                      inline-flex items-center gap-1.5 rounded-lg border
                      border-slate-200 bg-slate-50 px-2.5 py-1
                      font-mono text-[9px] font-bold text-slate-700 shadow-sm
                    "
                  >
                    <Layers className="h-3 w-3 text-slate-500 stroke-[2.3]" />
                    {department}
                  </span>
                </div>

                {/* Metadata */}
                <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-600">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-blue-600 stroke-[2.2]" />
                    {location}
                  </span>

                  <span className="hidden text-slate-300 sm:inline">•</span>

                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-slate-500 stroke-[2.2]" />
                    Posted {formattedDate}
                  </span>

                  {isRecruiter && (
                    <>
                      <span className="hidden text-slate-300 sm:inline">•</span>

                      <span
                        className="
                          inline-flex items-center gap-1.5 rounded-full
                          border border-pink-200 bg-pink-50 px-2.5 py-1
                          font-mono text-[9px] font-extrabold text-pink-700
                          shadow-sm
                        "
                      >
                        <Users className="h-3 w-3 text-pink-600 stroke-[2.2]" />
                        {applicantCount}{' '}
                        {applicantCount === 1 ? 'Applicant' : 'Applicants'}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            {description && (
              <div className="relative max-w-3xl rounded-2xl border border-slate-100/90 bg-slate-50/60 px-4 py-3 transition-colors duration-200 group-hover:border-blue-100 group-hover:bg-blue-50/25">
                <p className="line-clamp-2 text-xs font-semibold leading-5 text-slate-600 sm:text-[13px]">
                  {description}
                </p>
              </div>
            )}

            {/* Skills */}
            {skillsRequired.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-slate-400">
                  <Sparkles className="h-3 w-3" />
                  Skills
                </span>

                {skillsRequired.slice(0, 5).map((skill, idx) => (
                  <span
                    key={`${skill}-${idx}`}
                    className={`
                      rounded-lg border px-2.5 py-1
                      font-mono text-[9px] font-bold shadow-sm
                      transition-transform duration-200
                      hover:-translate-y-0.5
                      ${SKILL_TONES[idx % SKILL_TONES.length]}
                    `}
                  >
                    {skill}
                  </span>
                ))}

                {skillsRequired.length > 5 && (
                  <span
                    className="
                      rounded-lg border border-pink-200 bg-pink-50/70
                      px-2.5 py-1 font-mono text-[9px] font-extrabold
                      text-pink-600 shadow-sm
                    "
                  >
                    +{skillsRequired.length - 5} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* CTA */}
          <div
            className="
              relative z-10 flex shrink-0 items-center justify-end
              border-t border-slate-100/90 pt-4
              lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0
            "
          >
            {isRecruiter ? (
              <button
                type="button"
                onClick={() => onViewApplicants && onViewApplicants(_id)}
                className="
                  group/btn relative inline-flex h-11 w-full cursor-pointer
                  items-center justify-center gap-2 overflow-hidden
                  rounded-xl border border-pink-300/90
                  bg-gradient-to-r from-pink-50 to-rose-50
                  px-5 text-xs font-extrabold text-pink-700
                  shadow-sm
                  transition-[transform,box-shadow,border-color,background-color]
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-pink-400
                  hover:shadow-[0_10px_25px_rgba(236,72,153,0.16)]
                  active:translate-y-0 active:scale-[0.98]
                  sm:w-auto
                  transform-gpu
                "
              >
                <span className="relative z-10">Review Candidates</span>
                <ArrowRight
                  className="
                    relative z-10 h-3.5 w-3.5 stroke-[2.6]
                    transition-transform duration-200
                    group-hover/btn:translate-x-1
                  "
                />

                <span
                  className="
                    pointer-events-none absolute inset-y-0 left-0 w-1/3
                    -translate-x-[130%] bg-gradient-to-r
                    from-transparent via-white/70 to-transparent
                    group-hover/btn:animate-[jobCardShimmer_1.5s_ease-out]
                  "
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onApply && onApply(job)}
                className="
                  group/btn relative inline-flex h-11 w-full cursor-pointer
                  items-center justify-center gap-2 overflow-hidden
                  rounded-xl bg-gradient-to-r
                  from-blue-600 via-violet-600 to-pink-600
                  bg-[length:180%_100%]
                  px-6 text-xs font-extrabold text-white
                  shadow-[0_10px_25px_rgba(37,99,235,0.24)]
                  transition-[transform,box-shadow,background-position]
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[position:100%_50%]
                  hover:shadow-[0_14px_32px_rgba(236,72,153,0.25)]
                  active:translate-y-0 active:scale-[0.98]
                  sm:w-auto
                  transform-gpu
                "
              >
                <Zap className="relative z-10 h-3.5 w-3.5 fill-white text-white" />
                <span className="relative z-10">Apply Now</span>
                <ArrowRight
                  className="
                    relative z-10 h-3.5 w-3.5 stroke-[2.6]
                    transition-transform duration-200
                    group-hover/btn:translate-x-1
                  "
                />

                {/* Button shine */}
                <span
                  className="
                    pointer-events-none absolute inset-y-0 left-0 w-1/3
                    -translate-x-[130%] bg-gradient-to-r
                    from-transparent via-white/35 to-transparent
                    group-hover/btn:animate-[jobCardShimmer_1.5s_ease-out]
                  "
                />
              </button>
            )}
          </div>
        </article>
      </>
    );
  }
);

JobCard.displayName = 'JobCard';

export default JobCard;
