import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Kanban,
  Filter,
  ArrowRight,
  MoreVertical,
  Calendar,
  CheckCircle,
  XCircle,
  Sparkles,
  ChevronRight,
  UserCheck,
  Building2,
  Clock
} from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';
import { ApplicationStage } from '../../types/recruiter.types';

interface StageColumn {
  id: ApplicationStage;
  title: string;
  color: string;
  badgeBg: string;
  badgeText: string;
}

export const AtsPipeline: React.FC = () => {
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const navigate = useNavigate();
  const { applications, jobs, updateApplicationStage } = useRecruiterStore();

  const [selectedJobId, setSelectedJobId] = useState<string>('all');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const stages: StageColumn[] = [
    { id: 'Applied', title: 'Applications', color: 'border-slate-300', badgeBg: 'bg-slate-100', badgeText: 'text-slate-700' },
    { id: 'Screening', title: 'Screening', color: 'border-blue-300', badgeBg: 'bg-blue-50', badgeText: 'text-blue-700' },
    { id: 'Shortlisted', title: 'Shortlisted', color: 'border-indigo-300', badgeBg: 'bg-indigo-50', badgeText: 'text-indigo-700' },
    { id: 'Interview', title: 'Interview', color: 'border-purple-300', badgeBg: 'bg-purple-50', badgeText: 'text-purple-700' },
    { id: 'Offer', title: 'Offer', color: 'border-amber-300', badgeBg: 'bg-amber-50', badgeText: 'text-amber-700' },
    { id: 'Hired', title: 'Hired', color: 'border-emerald-300', badgeBg: 'bg-emerald-50', badgeText: 'text-emerald-700' },
    { id: 'Rejected', title: 'Rejected', color: 'border-rose-300', badgeBg: 'bg-rose-50', badgeText: 'text-rose-700' },
  ];

  const filteredApps = applications.filter((app) => {
    return selectedJobId === 'all' || app.jobId === selectedJobId;
  });

  const handleStageChange = (appId: string, newStage: ApplicationStage, candidateName: string) => {
    updateApplicationStage(appId, newStage);
    setSuccessToast(`Moved ${candidateName} to ${newStage}`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg border border-slate-700 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          {successToast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Kanban className="w-5 h-5 text-blue-600" /> ATS Candidate Pipeline
          </h1>
          <p className="text-xs text-slate-500">
            End-to-end recruitment funnel and Kanban pipeline for {organizationId.toUpperCase()}
          </p>
        </div>

        {/* Filter by Job Requisition */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Requisition:</span>
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Active Jobs ({applications.length} Candidates)</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>{job.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Funnel Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        {stages.map((stage) => {
          const count = filteredApps.filter((a) => a.stage === stage.id).length;
          return (
            <div key={stage.id} className="text-center p-2 rounded-lg bg-slate-50/70 border border-slate-100">
              <div className="text-[11px] font-medium text-slate-500 truncate">{stage.title}</div>
              <div className="text-lg font-bold text-slate-900 mt-0.5">{count}</div>
            </div>
          );
        })}
      </div>

      {/* Horizontal Kanban Board Columns */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 items-start min-h-[550px]">
        {stages.map((column) => {
          const stageApps = filteredApps.filter((app) => app.stage === column.id);

          return (
            <div
              key={column.id}
              className="w-72 shrink-0 bg-slate-100/80 rounded-xl p-3 border border-slate-200 flex flex-col max-h-[750px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">{column.title}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${column.badgeBg} ${column.badgeText}`}>
                    {stageApps.length}
                  </span>
                </div>
              </div>

              {/* Column Cards List */}
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                {stageApps.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
                    No candidates
                  </div>
                ) : (
                  stageApps.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white rounded-lg p-3 border border-slate-200/80 shadow-2xs hover:shadow-sm hover:border-blue-300 transition-all space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <button
                            onClick={() => navigate(`/org/${organizationId}/recruiter/candidates/${app.candidateId}`)}
                            className="text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors text-left"
                          >
                            {app.candidateName}
                          </button>
                          <div className="text-[11px] text-slate-500 font-medium truncate max-w-[170px] mt-0.5">
                            {app.jobTitle}
                          </div>
                        </div>

                        {app.matchScore && (
                          <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 shrink-0">
                            {app.matchScore}%
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {app.appliedDate}
                        </span>

                        {/* Stage Transition Quick Actions */}
                        <div className="flex items-center gap-1">
                          {column.id !== 'Interview' && column.id !== 'Hired' && column.id !== 'Rejected' && (
                            <button
                              onClick={() => {
                                const nextIndex = stages.findIndex((s) => s.id === column.id) + 1;
                                if (nextIndex < stages.length - 1) {
                                  handleStageChange(app.id, stages[nextIndex].id, app.candidateName);
                                }
                              }}
                              title="Advance to next stage"
                              className="p-1 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded transition-colors"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {column.id === 'Interview' && (
                            <button
                              onClick={() => navigate(`/org/${organizationId}/recruiter/interviews`)}
                              className="px-1.5 py-0.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded text-[10px] font-semibold transition-colors flex items-center gap-0.5"
                            >
                              <Calendar className="w-3 h-3" /> Schedule
                            </button>
                          )}

                          {column.id === 'Offer' && (
                            <button
                              onClick={() => navigate(`/org/${organizationId}/recruiter/offers`)}
                              className="px-1.5 py-0.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded text-[10px] font-semibold transition-colors"
                            >
                              Send Offer
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
