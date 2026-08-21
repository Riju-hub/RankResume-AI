import React, { useState, useEffect, useMemo } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import KanbanColumn from './KanbanColumn';
import { Users, Layers } from 'lucide-react';

const DEFAULT_COLUMNS = [
  {
    id: 'applied',
    title: 'Applied',
    dotColor: 'bg-sky-400',
    badgeClass: 'border-sky-500/20 bg-sky-500/10 text-sky-300',
  },
  {
    id: 'screening',
    title: 'AI Screening',
    dotColor: 'bg-indigo-400',
    badgeClass: 'border-indigo-500/20 bg-indigo-500/10 text-indigo-300',
  },
  {
    id: 'interview',
    title: 'Interview',
    dotColor: 'bg-amber-400',
    badgeClass: 'border-amber-500/20 bg-amber-500/10 text-amber-300',
  },
  {
    id: 'offered',
    title: 'Offered',
    dotColor: 'bg-emerald-400',
    badgeClass: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
  },
  {
    id: 'rejected',
    title: 'Archived / Rejected',
    dotColor: 'bg-zinc-500',
    badgeClass: 'border-zinc-700 bg-zinc-800/80 text-zinc-400',
  },
];

export const KanbanBoard = ({ applicants = [], onStatusChange, onSelectCandidate }) => {
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
    <div className="space-y-4">
      {/* Board Pipeline Metrics Strip */}
      <div className="flex items-center justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/30 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
          <Layers className="h-4 w-4 text-indigo-400" />
          <span>Hiring Pipeline</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          <Users className="h-3.5 w-3.5 text-zinc-500" />
          <span className="font-semibold text-zinc-200">{totalCandidates}</span>
          <span>Total {totalCandidates === 1 ? 'Candidate' : 'Candidates'}</span>
        </div>
      </div>

      {/* Drag and Drop Swimlanes */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-6 pt-1 [scrollbar-color:rgba(113,113,122,0.3)_transparent] [scrollbar-width:thin]">
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
};

export default KanbanBoard;