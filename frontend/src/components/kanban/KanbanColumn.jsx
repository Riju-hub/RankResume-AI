import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import CandidateCard from './CandidateCard';
import { Inbox } from 'lucide-react';

export const KanbanColumn = ({ column, applicants = [], onSelectCandidate }) => {
  const count = applicants.length;

  return (
    <div className="flex w-80 shrink-0 flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 backdrop-blur-xl shadow-lg shadow-black/20">
      {/* Column Header */}
      <div className="mb-3 flex items-center justify-between px-1.5 py-1">
        <div className="flex items-center gap-2">
          {/* Status Indicator Dot */}
          <span className="relative flex h-2 w-2">
            <span
              className={`h-2 w-2 rounded-full ${column.dotColor || 'bg-indigo-400'}`}
            />
          </span>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
            {column.title}
          </h3>
        </div>

        {/* Candidate Count Badge */}
        <span
          className={`inline-flex items-center justify-center rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold tabular-nums ${
            column.badgeClass || 'border-zinc-800 bg-zinc-950/80 text-zinc-400'
          }`}
        >
          {count}
        </span>
      </div>

      {/* Droppable Drop Zone */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex min-h-[500px] flex-1 flex-col gap-3 rounded-xl p-1.5 transition-all duration-200 ${
              snapshot.isDraggingOver
                ? 'border border-dashed border-indigo-500/40 bg-indigo-500/5 shadow-inner'
                : 'border border-transparent bg-transparent'
            }`}
          >
            {applicants.map((applicant, index) => (
              <CandidateCard
                key={applicant._id}
                applicant={applicant}
                index={index}
                onSelect={onSelectCandidate}
              />
            ))}

            {provided.placeholder}

            {/* Empty Column Indicator */}
            {count === 0 && !snapshot.isDraggingOver && (
              <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800/60 p-6 text-center">
                <Inbox className="h-5 w-5 text-zinc-600" />
                <p className="mt-2 text-xs font-medium text-zinc-500">No candidates</p>
                <p className="mt-0.5 text-[10px] text-zinc-600">Drag cards here</p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;