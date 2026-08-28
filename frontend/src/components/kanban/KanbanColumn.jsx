import React, { memo } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import CandidateCard from './CandidateCard';
import { Inbox } from 'lucide-react';

export const KanbanColumn = memo(({ column, applicants = [], onSelectCandidate }) => {
  const count = applicants.length;

  return (
    <div className="flex w-80 shrink-0 flex-col rounded-3xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-xl shadow-2xl transition-all font-sans">
      {/* Column Header */}
      <div className="mb-3.5 flex items-center justify-between px-1 py-0.5">
        <div className="flex items-center gap-2.5">
          {/* Status Indicator Dot with subtle pulse */}
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`h-2.5 w-2.5 rounded-full ${column.dotColor || 'bg-cyan-400'}`}
            />
          </span>
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
            {column.title}
          </h3>
        </div>

        {/* Candidate Count Badge */}
        <span
          className={`inline-flex items-center justify-center rounded-xl border px-2.5 py-0.5 font-mono text-[11px] font-bold tabular-nums shadow-sm ${
            column.badgeClass || 'border-slate-800 bg-slate-950/80 text-slate-400'
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
            className={`flex min-h-[500px] flex-1 flex-col gap-3 rounded-2xl p-1.5 transition-all duration-200 ${
              snapshot.isDraggingOver
                ? 'border-2 border-dashed border-cyan-500/50 bg-cyan-950/20 shadow-inner'
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

            {/* Empty Column State */}
            {count === 0 && !snapshot.isDraggingOver && (
              <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800/80 bg-slate-950/30 p-6 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-600">
                  <Inbox className="h-5 w-5" />
                </div>
                <p className="mt-2.5 font-mono text-xs font-bold text-slate-400">Empty Swimlane</p>
                <p className="mt-0.5 text-[10px] text-slate-400">Drag candidate cards here</p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
});

KanbanColumn.displayName = 'KanbanColumn';

export default KanbanColumn;