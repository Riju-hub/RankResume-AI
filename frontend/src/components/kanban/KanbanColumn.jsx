// import React, { memo } from 'react';
// import { Droppable } from '@hello-pangea/dnd';
// import CandidateCard from './CandidateCard';
// import { Inbox } from 'lucide-react';

// export const KanbanColumn = memo(({ column, applicants = [], onSelectCandidate }) => {
//   const count = applicants.length;

//   return (
//     <div className="flex w-80 shrink-0 flex-col rounded-3xl border border-white/90 bg-white/80 p-4 backdrop-blur-xl shadow-[0_12px_35px_rgba(37,99,235,0.06),0_4px_16px_rgba(236,72,153,0.04)] transition-all font-sans antialiased text-slate-900">
      
//       {/* Column Header */}
//       <div className="mb-3.5 flex items-center justify-between px-1.5 py-0.5">
//         <div className="flex items-center gap-2.5">
//           {/* Status Indicator Dot */}
//           <span className="relative flex h-2.5 w-2.5">
//             <span
//               className={`h-2.5 w-2.5 rounded-full ${column.dotColor || 'bg-blue-600'} shadow-xs`}
//             />
//           </span>
//           <h3 className="font-mono text-xs font-black uppercase tracking-wider text-slate-950">
//             {column.title}
//           </h3>
//         </div>

//         {/* Candidate Count Badge */}
//         <span
//           className={`inline-flex items-center justify-center rounded-xl border px-2.5 py-0.5 font-mono text-[11px] font-extrabold tabular-nums shadow-2xs ${
//             column.badgeClass || 'border-slate-200 bg-slate-50 text-slate-700'
//           }`}
//         >
//           {count}
//         </span>
//       </div>

//       {/* Droppable Drop Zone */}
//       <Droppable droppableId={column.id}>
//         {(provided, snapshot) => (
//           <div
//             ref={provided.innerRef}
//             {...provided.droppableProps}
//             className={`flex min-h-[500px] flex-1 flex-col gap-3 rounded-2xl p-1.5 transition-all duration-200 ${
//               snapshot.isDraggingOver
//                 ? 'border-2 border-dashed border-pink-400 bg-pink-50/50 shadow-inner'
//                 : 'border border-transparent bg-transparent'
//             }`}
//           >
//             {applicants.map((applicant, index) => (
//               <CandidateCard
//                 key={applicant._id}
//                 applicant={applicant}
//                 index={index}
//                 onSelect={onSelectCandidate}
//               />
//             ))}

//             {provided.placeholder}

//             {/* Empty Column State */}
//             {count === 0 && !snapshot.isDraggingOver && (
//               <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200/90 bg-slate-50/50 p-6 text-center shadow-2xs">
//                 <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 shadow-xs">
//                   <Inbox className="h-5 w-5 stroke-[2.2]" />
//                 </div>
//                 <p className="mt-2.5 font-mono text-xs font-black text-slate-800">Empty Swimlane</p>
//                 <p className="mt-0.5 text-[11px] font-semibold text-slate-500">Drag candidate cards here</p>
//               </div>
//             )}
//           </div>
//         )}
//       </Droppable>
//     </div>
//   );
// });

// KanbanColumn.displayName = 'KanbanColumn';

// export default KanbanColumn;





// frontend/src/components/kanban/KanbanColumn.jsx
import React, { memo } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import CandidateCard from './CandidateCard';
import { Inbox } from 'lucide-react';

export const KanbanColumn = memo(({ column, applicants = [], onSelectCandidate }) => {
  const count = applicants.length;

  return (
    <div className="flex h-full w-full flex-col rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 p-3.5 sm:p-4 shadow-2xs font-sans text-slate-800 antialiased select-none">
      {/* Column Header */}
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2 min-w-0">
          {/* Status Indicator Dot */}
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span
              className={`h-2.5 w-2.5 rounded-full ${column.dotColor || 'bg-blue-600'}`}
            />
          </span>

          <h3 className="truncate font-mono text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-slate-900">
            {column.title}
          </h3>
        </div>

        {/* Candidate Count Badge */}
        <span
          className={`inline-flex shrink-0 items-center justify-center rounded-xl border px-2.5 py-0.5 font-mono text-[10px] sm:text-[11px] font-bold tabular-nums shadow-2xs ${
            column.badgeClass || 'border-slate-200 bg-slate-50 text-slate-700'
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
            className={`flex min-h-[460px] sm:min-h-[520px] flex-1 flex-col gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl p-1 transition-colors duration-150 ${
              snapshot.isDraggingOver
                ? 'border-2 border-dashed border-indigo-400 bg-indigo-50/40 ring-2 ring-indigo-500/10'
                : 'border border-transparent bg-slate-50/50'
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
              <div className="flex flex-1 flex-col items-center justify-center rounded-xl sm:rounded-2xl border-2 border-dashed border-slate-200/90 bg-white/70 p-6 text-center">
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50 text-slate-400 shadow-2xs">
                  <Inbox className="h-5 w-5 stroke-[2]" />
                </div>
                <p className="mt-2.5 font-mono text-xs font-bold text-slate-800">
                  Empty Swimlane
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500 font-normal">
                  Drag candidate cards here
                </p>
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