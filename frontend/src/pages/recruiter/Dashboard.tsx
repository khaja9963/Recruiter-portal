import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Briefcase,
  Users,
  Calendar,
  FileText,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Building2,
  Video
} from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';
import { RecruiterStats } from '../../components/recruiter/RecruiterStats';
import { RecruiterCharts } from '../../components/recruiter/RecruiterCharts';
import { ScheduleInterviewModal } from '../../components/recruiter/ScheduleInterviewModal';
import { ChangeStageModal } from '../../components/recruiter/ChangeStageModal';
import { Application } from '../../types/recruiter.types';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const { profile, jobs, applications, interviews, activities } = useRecruiterStore();

  const [selectedAppForStage, setSelectedAppForStage] = useState<Application | null>(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  // Compute KPIs
  const kpis = {
    activeJobs: jobs.filter((j) => j.status === 'Published').length,
    draftJobs: jobs.filter((j) => j.status === 'Draft').length,
    totalApplications: applications.length,
    newApplications: applications.filter((a) => a.stage === 'Applied').length,
    shortlistedCandidates: applications.filter((a) => a.stage === 'Shortlisted').length,
    interviewsScheduled: interviews.filter((i) => i.status === 'Scheduled').length,
    offersSent: 1,
    hiredCandidates: applications.filter((a) => a.stage === 'Hired').length
  };

  const recentApplications = applications.slice(0, 5);
  const activeJobsList = jobs.filter((j) => j.status === 'Published').slice(0, 4);
  const upcomingInterviews = interviews.filter((i) => i.status === 'Scheduled').slice(0, 3);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans antialiased text-slate-900">
      {/* Human-designed Executive Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span>{profile.organizationName || 'Clyptus'}</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-800">Recruitment Dashboard</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Hiring Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Welcome back, {profile.name} · <strong className="text-slate-700 font-medium">{kpis.newApplications} candidates</strong> require initial screening · <strong className="text-slate-700 font-medium">{kpis.interviewsScheduled} interviews</strong> scheduled
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsScheduleOpen(true)}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" /> Schedule Interview
          </button>

          <button
            onClick={() => navigate(`/org/${organizationId}/recruiter/jobs/create`)}
            className="px-3.5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Create Job
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div>
        <RecruiterStats kpis={kpis} />
      </div>

      {/* Pipeline Analytics & Trends */}
      <div>
        <RecruiterCharts />
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Columns: Applications & Active Jobs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Applications Table */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-200/80 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Recent Applications</h3>
                <p className="text-xs text-slate-500">Candidates who submitted applications recently</p>
              </div>
              <button
                onClick={() => navigate(`/org/${organizationId}/recruiter/applications`)}
                className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 transition-colors"
              >
                View all applications <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-4">Candidate</th>
                    <th className="py-2.5 px-4">Requisition</th>
                    <th className="py-2.5 px-4">Applied</th>
                    <th className="py-2.5 px-4">Match</th>
                    <th className="py-2.5 px-4">Stage</th>
                    <th className="py-2.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={app.candidateAvatar}
                            alt={app.candidateName}
                            className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200"
                          />
                          <div className="min-w-0">
                            <div
                              onClick={() => navigate(`/org/${organizationId}/recruiter/candidates/${app.candidateId}`)}
                              className="font-semibold text-slate-900 hover:text-[#2563EB] cursor-pointer text-xs truncate"
                            >
                              {app.candidateName}
                            </div>
                            <div className="text-[11px] text-slate-500 truncate">{app.candidateTitle}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-800 font-medium truncate max-w-[180px]">
                        {app.jobTitle}
                      </td>
                      <td className="py-3 px-4 text-slate-500">{app.appliedDate}</td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                          {app.matchScore}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                          {app.stage}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedAppForStage(app)}
                          className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-md text-[11px] border border-slate-200 transition-colors shadow-2xs"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Job Openings */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Active Requisitions</h3>
                <p className="text-xs text-slate-500">Currently open positions with active pipelines</p>
              </div>
              <button
                onClick={() => navigate(`/org/${organizationId}/recruiter/jobs`)}
                className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 transition-colors"
              >
                Manage all jobs <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {activeJobsList.map((job) => (
                <div
                  key={job.id}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                      <span className="font-semibold text-[#2563EB]">{job.department}</span>
                      <span>{job.workMode}</span>
                    </div>
                    <h4
                      onClick={() => navigate(`/org/${organizationId}/recruiter/jobs/${job.id}`)}
                      className="font-bold text-slate-900 text-xs hover:text-[#2563EB] cursor-pointer transition-colors leading-snug"
                    >
                      {job.title}
                    </h4>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {job.location} · {job.openings} opening{job.openings > 1 ? 's' : ''}
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px]">
                      <strong className="text-slate-900 font-semibold">{job.applicationsCount}</strong> candidates in pipeline
                    </span>
                    <button
                      onClick={() => navigate(`/org/${organizationId}/recruiter/jobs/${job.id}`)}
                      className="text-[11px] font-semibold text-[#2563EB] hover:underline"
                    >
                      View Requisition
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Interviews & Activity */}
        <div className="space-y-6">
          {/* Upcoming Interviews Card */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Upcoming Interviews</h3>
                <p className="text-xs text-slate-500">Scheduled rounds this week</p>
              </div>
              <button
                onClick={() => navigate(`/org/${organizationId}/recruiter/interviews`)}
                className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8]"
              >
                Calendar
              </button>
            </div>

            <div className="space-y-3">
              {upcomingInterviews.map((int) => (
                <div
                  key={int.id}
                  className="p-3 rounded-lg border border-slate-200/80 hover:bg-slate-50/60 transition-colors space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold text-xs text-slate-900">{int.candidateName}</div>
                      <div className="text-[11px] text-slate-500">{int.roundName}</div>
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-blue-50 text-[#2563EB] text-[10px] font-semibold border border-blue-200">
                      {int.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <Clock className="w-3 h-3 text-slate-400" /> {int.date} at {int.time}
                    </span>
                    {int.meetingLink && (
                      <a
                        href={int.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#2563EB] hover:underline font-semibold flex items-center gap-1"
                      >
                        <Video className="w-3 h-3" /> Join
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Recruitment Activity Feed */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-5">
            <h3 className="font-bold text-slate-900 text-sm mb-1">Audit & Team Activity</h3>
            <p className="text-xs text-slate-500 mb-4">Latest actions performed in this organization</p>

            <div className="space-y-3">
              {activities.slice(0, 4).map((act) => (
                <div key={act.id} className="flex items-start gap-2.5 text-xs">
                  <div className="w-2 h-2 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-slate-800 leading-snug">
                      <strong className="font-semibold text-slate-900">{act.user}</strong> {act.action}{' '}
                      <span className="text-slate-600 font-medium">{act.target}</span>
                    </p>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedAppForStage && (
        <ChangeStageModal
          isOpen={!!selectedAppForStage}
          application={selectedAppForStage}
          onClose={() => setSelectedAppForStage(null)}
        />
      )}

      {isScheduleOpen && (
        <ScheduleInterviewModal
          isOpen={isScheduleOpen}
          onClose={() => setIsScheduleOpen(false)}
        />
      )}
    </div>
  );
};
