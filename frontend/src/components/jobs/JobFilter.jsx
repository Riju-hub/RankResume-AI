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
    <div className="relative rounded-3xl border border-white/90 bg-white/90 p-3.5 sm:p-5 backdrop-blur-xl shadow-[0_15px_40px_rgba(37,99,235,0.06),0_5px_20px_rgba(236,72,153,0.04)] font-sans text-slate-900 antialiased">
      {/* Top Multi-Color Neon Accent Rim */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] rounded-t-3xl bg-gradient-to-r from-blue-600 via-pink-500 to-indigo-600 shadow-[0_0_10px_rgba(236,72,153,0.3)]" />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search Input Field */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 stroke-[2.2] transition-colors peer-focus:text-blue-600" />
          <input
            type="text"
            placeholder="Search roles, technical capabilities, or keywords..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="peer h-11 w-full rounded-2xl border border-slate-300 bg-white pl-10 pr-10 text-xs font-bold text-slate-950 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-xs"
          />
          {isSearchActive && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
              aria-label="Clear search input"
            >
              <X className="h-3.5 w-3.5 stroke-[2.5]" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns & Reset Button Strip */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Department Select Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <Filter
              className={`pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 stroke-[2.2] transition-colors ${
                isDeptActive ? 'text-blue-600' : 'text-slate-500'
              }`}
            />
            <select
              value={department}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className={`h-11 w-full sm:w-auto appearance-none rounded-2xl border pl-10 pr-9 font-mono text-xs font-bold outline-none transition-all cursor-pointer shadow-xs ${
                isDeptActive
                  ? 'border-blue-300 bg-gradient-to-r from-blue-50/80 to-indigo-50/60 text-blue-700 shadow-sm shadow-blue-500/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15'
                  : 'border-slate-300 bg-white text-slate-800 hover:border-blue-300 hover:text-blue-700 focus:border-blue-400'
              }`}
            >
              <option value="All">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          </div>

          {/* Job Type Select Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <Briefcase
              className={`pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 stroke-[2.2] transition-colors ${
                isJobTypeActive ? 'text-pink-600' : 'text-slate-500'
              }`}
            />
            <select
              value={jobType}
              onChange={(e) => onJobTypeChange(e.target.value)}
              className={`h-11 w-full sm:w-auto appearance-none rounded-2xl border pl-10 pr-9 font-mono text-xs font-bold outline-none transition-all cursor-pointer shadow-xs ${
                isJobTypeActive
                  ? 'border-pink-300 bg-gradient-to-r from-pink-50/80 to-rose-50/60 text-pink-700 shadow-sm shadow-pink-500/10 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/15'
                  : 'border-slate-300 bg-white text-slate-800 hover:border-pink-300 hover:text-pink-700 focus:border-pink-400'
              }`}
            >
              <option value="All">All Employment Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          </div>

          {/* Clear & Reset Active Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50/80 px-4 text-xs font-extrabold text-rose-700 shadow-xs transition-all hover:border-rose-300 hover:bg-rose-100/70 hover:text-rose-800 active:scale-95 cursor-pointer"
              title="Reset all active search parameters"
            >
              <RotateCcw className="h-3.5 w-3.5 stroke-[2.5] text-rose-600" />
              <span>Reset</span>
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 font-mono text-[9px] font-black text-white shadow-xs">
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