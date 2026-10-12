// import React, { useState, useEffect, useMemo, memo } from 'react';
// import { DragDropContext } from '@hello-pangea/dnd';
// import KanbanColumn from './KanbanColumn';
// import { Users, Layers } from 'lucide-react';

// const DEFAULT_COLUMNS = [
//   {
//     id: 'applied',
//     title: 'Applied',
//     dotColor: 'bg-blue-600',
//     badgeClass: 'border-blue-200 bg-blue-50 text-blue-700',
//   },
//   {
//     id: 'screening',
//     title: 'AI Screening',
//     dotColor: 'bg-indigo-600',
//     badgeClass: 'border-indigo-200 bg-indigo-50 text-indigo-700',
//   },
//   {
//     id: 'interview',
//     title: 'Interview',
//     dotColor: 'bg-amber-500',
//     badgeClass: 'border-amber-200 bg-amber-50 text-amber-800',
//   },
//   {
//     id: 'offered',
//     title: 'Offered',
//     dotColor: 'bg-emerald-600',
//     badgeClass: 'border-emerald-200 bg-emerald-50 text-emerald-700',
//   },
//   {
//     id: 'rejected',
//     title: 'Archived / Rejected',
//     dotColor: 'bg-rose-500',
//     badgeClass: 'border-rose-200 bg-rose-50 text-rose-700',
//   },
// ];

// export const KanbanBoard = memo(({ applicants = [], onStatusChange, onSelectCandidate }) => {
//   const [columnsData, setColumnsData] = useState({});

//   useEffect(() => {
//     const grouped = DEFAULT_COLUMNS.reduce((acc, col) => {
//       acc[col.id] = applicants.filter((app) => (app.status || 'applied') === col.id);
//       return acc;
//     }, {});
//     setColumnsData(grouped);
//   }, [applicants]);

//   const totalCandidates = useMemo(() => applicants.length, [applicants]);

//   const handleDragEnd = (result) => {
//     const { source, destination, draggableId } = result;
//     if (!destination) return;

//     // Dropped in exact same slot
//     if (
//       source.droppableId === destination.droppableId &&
//       source.index === destination.index
//     ) {
//       return;
//     }

//     // Reorder within the same column
//     if (source.droppableId === destination.droppableId) {
//       const colItems = Array.from(columnsData[source.droppableId] || []);
//       const [reorderedItem] = colItems.splice(source.index, 1);
//       colItems.splice(destination.index, 0, reorderedItem);

//       setColumnsData((prev) => ({
//         ...prev,
//         [source.droppableId]: colItems,
//       }));
//       return;
//     }

//     // Move to another pipeline column
//     const sourceList = Array.from(columnsData[source.droppableId] || []);
//     const destList = Array.from(columnsData[destination.droppableId] || []);
//     const [movedItem] = sourceList.splice(source.index, 1);

//     const updatedItem = { ...movedItem, status: destination.droppableId };
//     destList.splice(destination.index, 0, updatedItem);

//     setColumnsData((prev) => ({
//       ...prev,
//       [source.droppableId]: sourceList,
//       [destination.droppableId]: destList,
//     }));

//     if (onStatusChange) {
//       onStatusChange(draggableId, destination.droppableId);
//     }
//   };

//   return (
//     <div className="space-y-4 font-sans text-slate-900 antialiased">
//       {/* Board Pipeline Metrics Strip */}
//       <div className="flex items-center justify-between rounded-2xl border border-white/90 bg-white/90 px-4 py-3 backdrop-blur-xl shadow-xs">
//         <div className="flex items-center gap-2.5">
//           <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700 shadow-2xs">
//             <Layers className="h-4 w-4 stroke-[2.2]" />
//           </div>
//           <span className="font-mono text-xs font-black uppercase tracking-wider text-slate-950">
//             Realtime Pipeline Synchronizer
//           </span>
//         </div>

//         <div className="flex items-center gap-2">
//           <span className="inline-flex items-center gap-1.5 rounded-xl border border-pink-200 bg-pink-50 px-3.5 py-1 font-mono text-xs font-extrabold text-pink-700 shadow-2xs">
//             <Users className="h-3.5 w-3.5 stroke-[2.5]" />
//             <span>{totalCandidates}</span>
//             <span className="text-[10px] uppercase text-pink-600 font-bold">
//               {totalCandidates === 1 ? 'Candidate' : 'Candidates'}
//             </span>
//           </span>
//         </div>
//       </div>

//       {/* Drag and Drop Swimlanes Container */}
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <div className="flex gap-4 overflow-x-auto pb-6 pt-1 [scrollbar-color:rgba(59,130,246,0.3)_transparent] [scrollbar-width:thin]">
//           {DEFAULT_COLUMNS.map((column) => (
//             <KanbanColumn
//               key={column.id}
//               column={column}
//               applicants={columnsData[column.id] || []}
//               onSelectCandidate={onSelectCandidate}
//             />
//           ))}
//         </div>
//       </DragDropContext>
//     </div>
//   );
// });

// KanbanBoard.displayName = 'KanbanBoard';

// export default KanbanBoard;




// frontend/src/components/kanban/KanbanBoard.jsx
import React, { useState, useEffect, useMemo, memo } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import KanbanColumn from './KanbanColumn';
import { Users, Layers, Sparkles } from 'lucide-react';

const DEFAULT_COLUMNS = [
  {
    id: 'applied',
    title: 'Applied',
    dotColor: 'bg-blue-600',
    headerAccent: 'from-blue-600 to-cyan-500',
    badgeClass: 'border-blue-200/90 bg-blue-50/80 text-blue-700',
  },
  {
    id: 'screening',
    title: 'AI Screening',
    dotColor: 'bg-indigo-600',
    headerAccent: 'from-indigo-600 to-violet-600',
    badgeClass: 'border-indigo-200/90 bg-indigo-50/80 text-indigo-700',
  },
  {
    id: 'interview',
    title: 'Interview',
    dotColor: 'bg-amber-500',
    headerAccent: 'from-amber-500 to-orange-500',
    badgeClass: 'border-amber-200/90 bg-amber-50/80 text-amber-800',
  },
  {
    id: 'offered',
    title: 'Offered',
    dotColor: 'bg-emerald-600',
    headerAccent: 'from-emerald-600 to-teal-500',
    badgeClass: 'border-emerald-200/90 bg-emerald-50/80 text-emerald-800',
  },
  {
    id: 'rejected',
    title: 'Archived / Rejected',
    dotColor: 'bg-rose-500',
    headerAccent: 'from-rose-500 to-pink-600',
    badgeClass: 'border-rose-200/90 bg-rose-50/80 text-rose-800',
  },
];

export const KanbanBoard = memo(({ applicants = [], onStatusChange, onSelectCandidate }) => {
  const [columnsData, setColumnsData] = useState({});

  useEffect(() => {
    const grouped = DEFAULT_COLUMNS.reduce((acc, col) => {
      acc[col.id] = applicants.filter((app) => (app.status || 'applied') === col.id);
      return acc;
    }, {});
    setColumnsData(grouped);
  }, [applicants]);

  const totalCandidates = useMemo(() => applicants.length, [applicants]);

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    // Dropped in exact same slot
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Reorder within the same column
    if (source.droppableId === destination.droppableId) {
      const colItems = Array.from(columnsData[source.droppableId] || []);
      const [reorderedItem] = colItems.splice(source.index, 1);
      colItems.splice(destination.index, 0, reorderedItem);

      setColumnsData((prev) => ({
        ...prev,
        [source.droppableId]: colItems,
      }));
      return;
    }

    // Move to another pipeline column
    const sourceList = Array.from(columnsData[source.droppableId] || []);
    const destList = Array.from(columnsData[destination.droppableId] || []);
    const [movedItem] = sourceList.splice(source.index, 1);

    const updatedItem = { ...movedItem, status: destination.droppableId };
    destList.splice(destination.index, 0, updatedItem);

    setColumnsData((prev) => ({
      ...prev,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList,
    }));

    if (onStatusChange) {
      onStatusChange(draggableId, destination.droppableId);
    }
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      {/* ================= BOARD PIPELINE HEADER STRIP ================= */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 px-4 py-3 sm:px-5 sm:py-3.5 shadow-2xs">
        {/* Top Multi-Color Brand Line (Cyan -> Indigo -> Violet -> Pink) */}
        <div 
          aria-hidden="true" 
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-600 to-pink-500" 
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
          {/* Left Telemetry Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-200/80 bg-indigo-50/80 text-indigo-600 shadow-2xs">
              <Layers className="h-4 w-4 stroke-[2.2]" />
            </div>
            
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-xs sm:text-sm font-bold tracking-tight text-slate-900">
                  Candidate Pipeline Synchronizer
                </span>
                <span className="hidden md:inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.2 text-[9px] font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-500 font-normal">
                Drag cards to trigger state updates & audit logs
              </p>
            </div>
          </div>

          {/* Right Metrics Capsule */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-pink-200/90 bg-pink-50/80 px-3 py-1 font-mono text-xs font-bold text-pink-700 shadow-2xs">
              <Users className="h-3.5 w-3.5 text-pink-600 stroke-[2.2]" />
              <span className="font-extrabold">{totalCandidates}</span>
              <span className="text-[10px] uppercase font-semibold text-pink-600">
                {totalCandidates === 1 ? 'Candidate' : 'Candidates'}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* ================= DRAG & DROP SWIMLANES ================= */}
      <DragDropContext onDragEnd={handleDragEnd}>
        {/*
          Lag-Free Scroll Track:
          - Mobile/Tablet: Horizontal scroll with touch deceleration
          - Desktop (≥1280px): Columns distribute evenly or scroll gracefully
        */}
        <div 
          className="flex gap-3.5 sm:gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory sm:snap-none overscroll-x-contain transform-gpu will-change-scroll [scrollbar-width:thin] [scrollbar-color:rgba(148,163,184,0.3)_transparent] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-track]:bg-transparent"
        >
          {DEFAULT_COLUMNS.map((column) => (
            <div 
              key={column.id} 
              className="w-[280px] sm:w-[310px] lg:w-[320px] shrink-0 snap-center"
            >
              <KanbanColumn
                column={column}
                applicants={columnsData[column.id] || []}
                onSelectCandidate={onSelectCandidate}
              />
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
});

KanbanBoard.displayName = 'KanbanBoard';

export default KanbanBoard;