import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSavedJobs } from '../../hooks/useSavedJobs';
import JobCard from '../../components/jobs/JobCard';
import { Bookmark, Loader2, ArrowLeft, Search } from 'lucide-react';

const SavedJobs = () => {
  const navigate = useNavigate();
  const { savedJobs, totalSaved, isLoading, toggleSave, isJobSaved } = useSavedJobs();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-9 w-9 animate-spin text-blue-600" />
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Loading saved jobs...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-500/20">
              <Bookmark className="h-5 w-5 fill-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Saved Positions
              </h1>
              <p className="text-xs text-slate-500">
                {totalSaved} {totalSaved === 1 ? 'position' : 'positions'} bookmarked
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/candidate/jobs')}
          className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-600 transition"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Explore Job Board</span>
        </button>
      </div>

      {/* Grid of Saved Jobs */}
      {savedJobs.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 py-16 text-center">
          <Bookmark className="mx-auto h-10 w-10 text-slate-300" />
          <h3 className="mt-3 text-base font-semibold text-slate-800">
            No saved positions yet
          </h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            Click the bookmark icon on any position card to save it for quick access here.
          </p>
          <button
            type="button"
            onClick={() => navigate('/jobs')}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition"
          >
            Explore Openings
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {savedJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              isBookmarked={isJobSaved(job._id)}
              onBookmark={() => toggleSave(job._id)}
              onApply={() => navigate(`/candidate/jobs/${job._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;