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
  Sparkles,
  Coins,
  Video,
  UserCheck,
  Building2
} from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';
import { ScheduleInterviewModal } from '../../components/recruiter/ScheduleInterviewModal';
import { ChangeStageModal } from '../../components/recruiter/ChangeStageModal';
import { Application } from '../../types/recruiter.types';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const { profile, jobs, applications, interviews } = useRecruiterStore();

  const [selectedAppForStage, setSelectedAppForStage] = useState<Application | null>(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const kpis = {
    activeJobs: jobs.filter((j) => j.status === 'Published').length,
    draftJobs: jobs.filter((j) => j.status === 'Draft').length,
    assignedJobs: jobs.length,
    totalApplications: applications.length,
    newApplications: applications.filter((a) => a.stage === 'Applied').length,
    screeningCount: applications.filter((a) => a.stage === 'Screening').length,
    shortlistedCount: applications.filter((a) => a.stage === 'Shortlisted').length,
    interviewCount: applications.filter((a) => a.stage === 'Interview').length,
    offerCount: applications.filter((a) => a.stage === 'Offer').length,
    hiredCount: applications.filter((a) => a.stage === 'Hired').length,
    interviewsScheduled: interviews.filter((i) => i.status === 'Scheduled').length,
    tokensRemaining: 840,
    tokensUsed: 160
  };

  const recentApplications = applications.slice(0, 5);
  const upcomingInterviews = interviews.filter((i) => i.status === 'Scheduled').slice(0, 3);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans antialiased text-slate-900">
      {/* Hero Banner Card */}
      <div className="bg-[#13113C] rounded-2xl p-6 lg:p-7 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            <span>RECRUITER EXECUTION WORKSPACE</span>
            <span>•</span>
            <span className="capitalize">{profile.name || 'Elena Rostova'}</span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
            Recruitment Command Center
          </h1>

          <p className="text-slate-300 text-xs leading-relaxed max-w-xl">
            Manage authorized jobs, ATS pipelines, interviews, and candidate offers for ABC Recruitment.
          </p>
        </div>

        {/* Hero Actions */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => navigate(`/org/${organizationId}/recruiter/jobs/create`)}
            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-colors"
          >
            <Briefcase className="w-4 h-4" /> + Post New Job
          </button>

          <button
            onClick={() => navigate(`/org/${organizationId}/recruiter/ai-tools`)}
            className="bg-white/10 hover:bg-white/15 text-white font-semibold text-xs px-4 py-2.5 rounded-xl border border-white/20 flex items-center gap-2 transition-colors backdrop-blur-xs"
          >
            <Sparkles className="w-4 h-4 text-indigo-300" /> AI Co-Pilot
          </button>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Jobs */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              ACTIVE JOBS
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {kpis.activeJobs}
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
              <span className="font-bold text-emerald-600">{kpis.draftJobs} Drafts</span>
              <span>•</span>
              <span>{kpis.assignedJobs} Assigned</span>
            </div>
          </div>
        </div>

        {/* Card 2: Applications */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              APPLICATIONS
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {kpis.totalApplications}
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
              <span className="font-bold text-blue-600">{kpis.newApplications} New</span>
              <span>•</span>
              <span>{kpis.shortlistedCount} Shortlisted</span>
            </div>
          </div>
        </div>

        {/* Card 3: Scheduled Interviews */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              SCHEDULED INTERVIEWS
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {kpis.interviewsScheduled}
            </div>
            <div className="text-xs font-medium text-amber-600 mt-1">
              0 Feedback Pending
            </div>
          </div>
        </div>

        {/* Card 4: Token Balance */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              TOKEN BALANCE
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Coins className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-baseline gap-1.5">
              <span>{kpis.tokensRemaining}</span>
              <span className="text-xs font-normal text-slate-400">Tokens</span>
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
              <span>Used: {kpis.tokensUsed}</span>
              <span>•</span>
              <button
                onClick={() => navigate(`/org/${organizationId}/recruiter/tokens`)}
                className="text-blue-600 font-bold hover:underline"
              >
                View Log
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hiring Pipeline Funnel Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <h3 className="font-extrabold text-slate-900 text-base">Hiring Pipeline Funnel</h3>
          </div>
          <button
            onClick={() => navigate(`/org/${organizationId}/recruiter/ats`)}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors"
          >
            Open Kanban ATS <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-xs text-slate-400">
          Real-time breakdown of candidates progressing across ATS stages.
        </p>

        {/* 6 Stage Mini Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-5">
          {/* Stage 1: Applications */}
          <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100 flex flex-col justify-between h-24">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                APPLICATIONS
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{kpis.newApplications}</div>
            <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden mt-1" />
          </div>

          {/* Stage 2: Screening */}
          <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100 flex flex-col justify-between h-24">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                SCREENING
              </span>
              <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{kpis.screeningCount}</div>
            <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden mt-1" />
          </div>

          {/* Stage 3: Shortlisted */}
          <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100 flex flex-col justify-between h-24">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                SHORTLISTED
              </span>
              <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{kpis.shortlistedCount}</div>
            <div className="w-full bg-purple-500 h-1 rounded-full mt-1" />
          </div>

          {/* Stage 4: Interview */}
          <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100 flex flex-col justify-between h-24">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                INTERVIEW
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{kpis.interviewCount}</div>
            <div className="w-full bg-amber-500 h-1 rounded-full mt-1" />
          </div>

          {/* Stage 5: Offer */}
          <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100 flex flex-col justify-between h-24">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                OFFER
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{kpis.offerCount}</div>
            <div className="w-full bg-emerald-500 h-1 rounded-full mt-1" />
          </div>

          {/* Stage 6: Hired */}
          <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100 flex flex-col justify-between h-24">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                HIRED
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{kpis.hiredCount}</div>
            <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden mt-1" />
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Applications & Scheduled Interviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Recent Job Applications */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm">Recent Job Applications</h3>
            </div>
            <button
              onClick={() => navigate(`/org/${organizationId}/recruiter/applications`)}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentApplications.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No applications received yet. Post a job to start receiving candidates.
              </div>
            ) : (
              recentApplications.map((app) => (
                <div key={app.id} className="p-3.5 hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={app.candidateAvatar}
                      alt={app.candidateName}
                      className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-200"
                    />
                    <div className="min-w-0">
                      <div
                        onClick={() => navigate(`/org/${organizationId}/recruiter/candidates/${app.candidateId}`)}
                        className="font-bold text-slate-900 text-xs hover:text-blue-600 cursor-pointer truncate"
                      >
                        {app.candidateName}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{app.jobTitle}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                      {app.matchScore}% Match
                    </span>
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-slate-100 text-slate-700 rounded-lg">
                      {app.stage}
                    </span>
                    <button
                      onClick={() => setSelectedAppForStage(app)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 font-bold text-[11px] rounded-lg border border-slate-200 transition-colors shadow-2xs"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Scheduled Interviews */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              <h3 className="font-bold text-slate-900 text-sm">Scheduled Interviews</h3>
            </div>
            <button
              onClick={() => navigate(`/org/${organizationId}/recruiter/interviews`)}
              className="text-xs font-bold text-purple-600 hover:underline"
            >
              Manage Interviews
            </button>
          </div>

          <div className="space-y-3">
            {upcomingInterviews.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No interviews scheduled yet.
              </div>
            ) : (
              upcomingInterviews.map((int) => (
                <div
                  key={int.id}
                  className="p-3.5 rounded-xl border border-slate-200/80 hover:bg-slate-50/70 transition-colors space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-xs text-slate-900">{int.candidateName}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{int.roundName}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-200">
                      {int.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-100">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {int.date} at {int.time}
                    </span>
                    {int.meetingLink && (
                      <a
                        href={int.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline font-bold flex items-center gap-1"
                      >
                        <Video className="w-3.5 h-3.5" /> Join Meeting
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
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
