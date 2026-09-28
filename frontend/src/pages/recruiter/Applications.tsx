import React, { useState } from 'react';
import { Search, Filter, LayoutGrid, List, Plus, XCircle } from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';
import { ApplicationPipeline } from '../../components/recruiter/ApplicationPipeline';
import { ApplicationTable } from '../../components/recruiter/ApplicationTable';
import { ChangeStageModal } from '../../components/recruiter/ChangeStageModal';
import { AddCandidateNoteModal } from '../../components/recruiter/AddCandidateNoteModal';
import { ScheduleInterviewModal } from '../../components/recruiter/ScheduleInterviewModal';
import { CreateOfferModal } from '../../components/recruiter/CreateOfferModal';
import { Application, ApplicationStage } from '../../types/recruiter.types';

export const Applications: React.FC = () => {
  const { applications, jobs } = useRecruiterStore();
  const [viewMode, setViewMode] = useState<'pipeline' | 'table'>('pipeline');
  const [search, setSearch] = useState('');
  const [jobFilter, setJobFilter] = useState('all');
  const [showRejected, setShowRejected] = useState(false);

  // Modals state
  const [selectedAppForStage, setSelectedAppForStage] = useState<Application | null>(null);
  const [selectedAppForNote, setSelectedAppForNote] = useState<Application | null>(null);
  const [selectedAppForInterview, setSelectedAppForInterview] = useState<Application | null>(null);
  const [selectedAppForOffer, setSelectedAppForOffer] = useState<Application | null>(null);

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.candidateName.toLowerCase().includes(search.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(search.toLowerCase());

    const matchesJob = jobFilter === 'all' || app.jobId === jobFilter;
    const matchesRejected = showRejected ? app.stage === 'Rejected' : app.stage !== 'Rejected';

    return matchesSearch && matchesJob && matchesRejected;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Application Pipeline (ATS)</h1>
          <p className="text-xs text-slate-500">Track candidate movement across recruitment stages</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRejected(!showRejected)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              showRejected
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {showRejected ? 'Showing Rejected Candidates' : 'View Rejected Candidates'}
          </button>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('pipeline')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'pipeline' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid className="w-4 h-4" /> Pipeline
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'table' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="w-4 h-4" /> List Table
            </button>
          </div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate name or job title..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={jobFilter}
          onChange={(e) => setJobFilter(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium"
        >
          <option value="all">All Jobs ({jobs.length})</option>
          {jobs.map((j) => (
            <option key={j.id} value={j.id}>
              {j.title}
            </option>
          ))}
        </select>
      </div>

      {/* Display */}
      {viewMode === 'pipeline' ? (
        <ApplicationPipeline
          applications={filteredApps}
          onOpenStageModal={(app) => setSelectedAppForStage(app)}
          onOpenNoteModal={(app) => setSelectedAppForNote(app)}
          onOpenScheduleInterview={(app) => setSelectedAppForInterview(app)}
          onOpenCreateOffer={(app) => setSelectedAppForOffer(app)}
        />
      ) : (
        <ApplicationTable
          applications={filteredApps}
          onOpenStageModal={(app) => setSelectedAppForStage(app)}
          onOpenNoteModal={(app) => setSelectedAppForNote(app)}
          onOpenScheduleInterview={(app) => setSelectedAppForInterview(app)}
        />
      )}

      {/* Modals */}
      <ChangeStageModal
        application={selectedAppForStage}
        isOpen={!!selectedAppForStage}
        onClose={() => setSelectedAppForStage(null)}
      />
      {selectedAppForNote && (
        <AddCandidateNoteModal
          applicationId={selectedAppForNote.id}
          candidateName={selectedAppForNote.candidateName}
          isOpen={!!selectedAppForNote}
          onClose={() => setSelectedAppForNote(null)}
        />
      )}
      {selectedAppForInterview && (
        <ScheduleInterviewModal
          prefillApplicationId={selectedAppForInterview.id}
          isOpen={!!selectedAppForInterview}
          onClose={() => setSelectedAppForInterview(null)}
        />
      )}
      {selectedAppForOffer && (
        <CreateOfferModal
          application={selectedAppForOffer}
          isOpen={!!selectedAppForOffer}
          onClose={() => setSelectedAppForOffer(null)}
        />
      )}
    </div>
  );
};
