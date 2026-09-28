import React, { useState } from 'react';
import { Calendar, Plus, Search, Filter, LayoutGrid, List } from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';
import { InterviewCard } from '../../components/recruiter/InterviewCard';
import { InterviewTable } from '../../components/recruiter/InterviewTable';
import { ScheduleInterviewModal } from '../../components/recruiter/ScheduleInterviewModal';
import { InterviewFeedbackModal } from '../../components/recruiter/InterviewFeedbackModal';
import { Interview } from '../../types/recruiter.types';

export const Interviews: React.FC = () => {
  const { interviews } = useRecruiterStore();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [selectedInterviewForFeedback, setSelectedInterviewForFeedback] = useState<Interview | null>(null);

  const filteredInterviews = interviews.filter((item) => {
    const matchesSearch =
      item.candidateName.toLowerCase().includes(search.toLowerCase()) ||
      item.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      item.roundName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Interview Management</h1>
          <p className="text-xs text-slate-500">Schedule rounds, track status, and submit candidate feedback</p>
        </div>

        <button
          onClick={() => setIsScheduleOpen(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Schedule Interview
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search candidate, job, or round..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-44 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium"
          >
            <option value="all">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Rescheduled">Rescheduled</option>
          </select>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
              viewMode === 'grid' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
              viewMode === 'table' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInterviews.map((item) => (
            <InterviewCard
              key={item.id}
              interview={item}
              onOpenFeedback={(int) => setSelectedInterviewForFeedback(int)}
            />
          ))}
        </div>
      ) : (
        <InterviewTable
          interviews={filteredInterviews}
          onOpenFeedback={(int) => setSelectedInterviewForFeedback(int)}
        />
      )}

      {/* Modals */}
      <ScheduleInterviewModal isOpen={isScheduleOpen} onClose={() => setIsScheduleOpen(false)} />
      <InterviewFeedbackModal
        interview={selectedInterviewForFeedback}
        isOpen={!!selectedInterviewForFeedback}
        onClose={() => setSelectedInterviewForFeedback(null)}
      />
    </div>
  );
};
