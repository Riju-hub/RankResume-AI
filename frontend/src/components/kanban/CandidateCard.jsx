import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import ScoreBadge from '../common/ScoreBadge';
import { Mail, FileText, Calendar, GripVertical } from 'lucide-react';

export const CandidateCard = ({ applicant, index, onSelect }) => {
  const score = applicant?.aiAnalysis?.matchScore || 0;
  const candidateName = applicant?.candidate?.name || 'Anonymous Candidate';
  const candidateEmail = applicant?.candidate?.email || 'No email registered';
  const matchedSkills = applicant?.aiAnalysis?.matchedSkills || [];

  // Helper for candidate initials
  const initials = candidateName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const formattedDate = applicant?.createdAt
    ? new Date(applicant.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : 'Recent';

  return (
    <Draggable draggableId={applicant._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onSelect && onSelect(applicant)}
          className={`group relative select-none rounded-xl border p-3.5 backdrop-blur-md transition-all duration-200 cursor-grab active:cursor-grabbing ${
            snapshot.isDragging
              ? 'z-50 rotate-2 scale-105 border-indigo-500/80 bg-zinc-900/95 shadow-2xl shadow-indigo-500/20 ring-1 ring-indigo-500/40'
              : 'border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700/80 hover:bg-zinc-900/70 hover:shadow-lg hover:shadow-black/30'
          }`}
        >
          {/* Top Row: Avatar, Candidate Name & AI Match Score */}
          <div className="flex items-start justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Micro Avatar */}
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-zinc-700/60 bg-zinc-800 font-mono text-[10px] font-semibold text-zinc-300">
                {initials}
              </div>

              <div className="min-w-0">
                <h4 className="truncate text-xs font-semibold text-zinc-100 transition-colors group-hover:text-indigo-300">
                  {candidateName}
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                  <Mail className="h-3 w-3 shrink-0 text-zinc-500" />
                  <span className="truncate">{candidateEmail}</span>
                </div>
              </div>
            </div>

            <ScoreBadge score={score} size="xs" showLabel={false} />
          </div>

          {/* Matched AI Skills Badges */}
          {matchedSkills.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {matchedSkills.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded-md border border-zinc-800 bg-zinc-950/70 px-2 py-0.5 text-[10px] font-medium text-zinc-300"
                >
                  {skill}
                </span>
              ))}
              {matchedSkills.length > 3 && (
                <span className="text-[10px] font-semibold text-zinc-400">
                  +{matchedSkills.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Footer Metadata */}
          <div className="mt-3 flex items-center justify-between border-t border-zinc-800/60 pt-2.5 text-[10px] text-zinc-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-zinc-500" />
              <span>{formattedDate}</span>
            </div>

            {applicant?.resumeUrl && (
              <a
                href={applicant.resumeUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 rounded-md border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 font-medium text-indigo-300 transition-colors hover:border-indigo-500/40 hover:bg-indigo-500/20"
                title="View Resume PDF"
              >
                <FileText className="h-3 w-3" />
                <span>PDF</span>
              </a>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default CandidateCard;