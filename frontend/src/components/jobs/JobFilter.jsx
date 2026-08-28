import React, { memo } from 'react';
import { Search, Filter, RotateCcw, X, ChevronDown, Briefcase } from 'lucide-react';

export const JobFilter = memo(({
  searchTerm = '',
  onSearchChange,
  department = 'All',
  onDepartmentChange,
  jobType = 'All',
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
    <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-3.5 sm:p-5 backdrop-blur-xl shadow-2xl font-sans">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search Input Field */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors peer-focus:text-cyan-400" />
          <input
            type="text"
            placeholder="Search roles, technical capabilities, or keywords..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="peer h-11 w-full rounded-2xl border border-slate-800 bg-slate-950/70 pl-10 pr-10 text-xs font-medium text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-cyan-500/60 focus:bg-slate-950 focus:ring-2 focus:ring-cyan-500/20"
          />
          {isSearchActive && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-500 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
              aria-label="Clear search input"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns & Reset Button Strip */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Department Select Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <Filter
              className={`pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 transition-colors ${
                isDeptActive ? 'text-cyan-400' : 'text-slate-500'
              }`}
            />
            <select
              value={department}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className={`h-11 w-full sm:w-auto appearance-none rounded-2xl border pl-10 pr-9 font-mono text-xs font-semibold outline-none transition-all cursor-pointer ${
                isDeptActive
                  ? 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300 shadow-sm shadow-cyan-500/10 focus:border-cyan-400'
                  : 'border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-700 hover:text-white focus:border-slate-600'
              }`}
            >
              <option value="All" className="bg-slate-950 text-slate-200">
                All Departments
              </option>
              {departments.map((dept) => (
                <option key={dept} value={dept} className="bg-slate-950 text-slate-200">
                  {dept}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          </div>

          {/* Job Type Select Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <Briefcase
              className={`pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 transition-colors ${
                isJobTypeActive ? 'text-pink-400' : 'text-slate-500'
              }`}
            />
            <select
              value={jobType}
              onChange={(e) => onJobTypeChange(e.target.value)}
              className={`h-11 w-full sm:w-auto appearance-none rounded-2xl border pl-10 pr-9 font-mono text-xs font-semibold outline-none transition-all cursor-pointer ${
                isJobTypeActive
                  ? 'border-pink-500/50 bg-pink-950/40 text-pink-300 shadow-sm shadow-pink-500/10 focus:border-pink-400'
                  : 'border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-700 hover:text-white focus:border-slate-600'
              }`}
            >
              <option value="All" className="bg-slate-950 text-slate-200">
                All Employment Types
              </option>
              <option value="Full-time" className="bg-slate-950 text-slate-200">
                Full-time
              </option>
              <option value="Part-time" className="bg-slate-950 text-slate-200">
                Part-time
              </option>
              <option value="Contract" className="bg-slate-950 text-slate-200">
                Contract
              </option>
              <option value="Internship" className="bg-slate-950 text-slate-200">
                Internship
              </option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          </div>

          {/* Clear & Reset Active Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/80 px-4 text-xs font-bold text-slate-400 transition-all hover:border-rose-500/40 hover:bg-rose-950/30 hover:text-rose-300 active:scale-95 cursor-pointer"
              title="Reset all active search parameters"
            >
              <RotateCcw className="h-3.5 w-3.5 text-rose-400" />
              <span>Reset</span>
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-800 font-mono text-[9px] font-bold text-white shadow-xs">
                {activeCount}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

JobFilter.displayName = 'JobFilter';

export default JobFilter;