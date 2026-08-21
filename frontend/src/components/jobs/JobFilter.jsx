import React from 'react';
import { Search, Filter, RotateCcw, X, ChevronDown, Briefcase } from 'lucide-react';

export const JobFilter = ({
  searchTerm,
  onSearchChange,
  department,
  onDepartmentChange,
  jobType,
  onJobTypeChange,
  departments = [],
  onReset,
}) => {
  const isSearchActive = searchTerm.trim() !== '';
  const isDeptActive = department !== 'All';
  const isJobTypeActive = jobType !== 'All';
  const hasActiveFilters = isSearchActive || isDeptActive || isJobTypeActive;

  const activeCount = [isSearchActive, isDeptActive, isJobTypeActive].filter(Boolean).length;

  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl shadow-black/20">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors peer-focus:text-indigo-400" />
          <input
            type="text"
            placeholder="Search roles, skills, or keywords..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="peer h-10 w-full rounded-xl border border-zinc-800 bg-zinc-950/70 pl-10 pr-9 text-xs text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-indigo-500/50 focus:bg-zinc-950 focus:ring-2 focus:ring-indigo-500/20"
          />
          {isSearchActive && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
              aria-label="Clear search text"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns & Reset Action */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Department Select */}
          <div className="relative flex-1 sm:flex-none">
            <Filter
              className={`pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 transition-colors ${
                isDeptActive ? 'text-indigo-400' : 'text-zinc-500'
              }`}
            />
            <select
              value={department}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className={`h-10 w-full sm:w-auto appearance-none rounded-xl border pl-9 pr-9 text-xs font-medium outline-none transition-all cursor-pointer ${
                isDeptActive
                  ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300 focus:border-indigo-500'
                  : 'border-zinc-800 bg-zinc-950/70 text-zinc-300 hover:border-zinc-700 focus:border-zinc-600'
              }`}
            >
              <option value="All" className="bg-zinc-950 text-zinc-200">
                All Departments
              </option>
              {departments.map((dept) => (
                <option key={dept} value={dept} className="bg-zinc-950 text-zinc-200">
                  {dept}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" />
          </div>

          {/* Job Type Select */}
          <div className="relative flex-1 sm:flex-none">
            <Briefcase
              className={`pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 transition-colors ${
                isJobTypeActive ? 'text-indigo-400' : 'text-zinc-500'
              }`}
            />
            <select
              value={jobType}
              onChange={(e) => onJobTypeChange(e.target.value)}
              className={`h-10 w-full sm:w-auto appearance-none rounded-xl border pl-9 pr-9 text-xs font-medium outline-none transition-all cursor-pointer ${
                isJobTypeActive
                  ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300 focus:border-indigo-500'
                  : 'border-zinc-800 bg-zinc-950/70 text-zinc-300 hover:border-zinc-700 focus:border-zinc-600'
              }`}
            >
              <option value="All" className="bg-zinc-950 text-zinc-200">
                All Job Types
              </option>
              <option value="Full-time" className="bg-zinc-950 text-zinc-200">
                Full-time
              </option>
              <option value="Part-time" className="bg-zinc-950 text-zinc-200">
                Part-time
              </option>
              <option value="Contract" className="bg-zinc-950 text-zinc-200">
                Contract
              </option>
              <option value="Internship" className="bg-zinc-950 text-zinc-200">
                Internship
              </option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" />
          </div>

          {/* Reset Filters CTA */}
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3.5 text-xs font-medium text-zinc-400 transition-all hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-300 active:scale-95"
              title="Reset all active filters"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-800 text-[10px] font-bold text-zinc-300">
                {activeCount}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobFilter;