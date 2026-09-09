// import React, { useState, useEffect, useMemo, memo } from 'react';
// import { DragDropContext } from '@hello-pangea/dnd';
// import KanbanColumn from './KanbanColumn';
// import { Users, Layers, Sparkles } from 'lucide-react';

// const DEFAULT_COLUMNS = [
//   {
//     id: 'applied',
//     title: 'Applied',
//     dotColor: 'bg-cyan-400',
//     badgeClass: 'border-cyan-500/30 bg-cyan-950/40 text-cyan-300',
//   },
//   {
//     id: 'screening',
//     title: 'AI Screening',
//     dotColor: 'bg-indigo-400',
//     badgeClass: 'border-indigo-500/30 bg-indigo-950/40 text-indigo-300',
//   },
//   {
//     id: 'interview',
//     title: 'Interview',
//     dotColor: 'bg-amber-400',
//     badgeClass: 'border-amber-500/30 bg-amber-950/40 text-amber-300',
//   },
//   {
//     id: 'offered',
//     title: 'Offered',
//     dotColor: 'bg-emerald-400',
//     badgeClass: 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300',
//   },
//   {
//     id: 'rejected',
//     title: 'Archived / Rejected',
//     dotColor: 'bg-rose-500',
//     badgeClass: 'border-rose-500/30 bg-rose-950/40 text-rose-300',
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
//     <div className="space-y-4 font-sans">
//       {/* Board Pipeline Metrics Strip */}
//       <div className="flex items-center justify-between rounded-2xl border border-slate-800/80 bg-slate-950/60 px-4 py-3 backdrop-blur-md shadow-inner">
//         <div className="flex items-center gap-2">
//           <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-950/40 text-cyan-400">
//             <Layers className="h-3.5 w-3.5" />
//           </div>
//           <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
//             Realtime Pipeline Synchronizer
//           </span>
//         </div>

//         <div className="flex items-center gap-2">
//           <span className="inline-flex items-center gap-1.5 rounded-xl border border-pink-500/30 bg-pink-950/40 px-3 py-1 font-mono text-xs font-bold text-pink-300">
//             <Users className="h-3.5 w-3.5 text-pink-400" />
//             <span>{totalCandidates}</span>
//             <span className="text-[10px] uppercase text-pink-300/80 font-normal">
//               {totalCandidates === 1 ? 'Candidate' : 'Candidates'}
//             </span>
//           </span>
//         </div>
//       </div>

//       {/* Drag and Drop Swimlanes Container */}
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <div className="flex gap-4 overflow-x-auto pb-6 pt-1 [scrollbar-color:rgba(148,163,184,0.2)_transparent] [scrollbar-width:thin]">
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









import React, { useState, useEffect, useMemo, memo } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import KanbanColumn from './KanbanColumn';
import { Users, Layers } from 'lucide-react';

const DEFAULT_COLUMNS = [
  {
    id: 'applied',
    title: 'Applied',
    dotColor: 'bg-blue-600',
    badgeClass: 'border-blue-200 bg-blue-50 text-blue-700',
  },
  {
    id: 'screening',
    title: 'AI Screening',
    dotColor: 'bg-indigo-600',
    badgeClass: 'border-indigo-200 bg-indigo-50 text-indigo-700',
  },
  {
    id: 'interview',
    title: 'Interview',
    dotColor: 'bg-amber-500',
    badgeClass: 'border-amber-200 bg-amber-50 text-amber-800',
  },
  {
    id: 'offered',
    title: 'Offered',
    dotColor: 'bg-emerald-600',
    badgeClass: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  {
    id: 'rejected',
    title: 'Archived / Rejected',
    dotColor: 'bg-rose-500',
    badgeClass: 'border-rose-200 bg-rose-50 text-rose-700',
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
    <div className="space-y-4 font-sans text-slate-900 antialiased">
      {/* Board Pipeline Metrics Strip */}
      <div className="flex items-center justify-between rounded-2xl border border-white/90 bg-white/90 px-4 py-3 backdrop-blur-xl shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700 shadow-2xs">
            <Layers className="h-4 w-4 stroke-[2.2]" />
          </div>
          <span className="font-mono text-xs font-black uppercase tracking-wider text-slate-950">
            Realtime Pipeline Synchronizer
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-pink-200 bg-pink-50 px-3.5 py-1 font-mono text-xs font-extrabold text-pink-700 shadow-2xs">
            <Users className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>{totalCandidates}</span>
            <span className="text-[10px] uppercase text-pink-600 font-bold">
              {totalCandidates === 1 ? 'Candidate' : 'Candidates'}
            </span>
          </span>
        </div>
      </div>

      {/* Drag and Drop Swimlanes Container */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-6 pt-1 [scrollbar-color:rgba(59,130,246,0.3)_transparent] [scrollbar-width:thin]">
          {DEFAULT_COLUMNS.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              applicants={columnsData[column.id] || []}
              onSelectCandidate={onSelectCandidate}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
});

KanbanBoard.displayName = 'KanbanBoard';

export default KanbanBoard;