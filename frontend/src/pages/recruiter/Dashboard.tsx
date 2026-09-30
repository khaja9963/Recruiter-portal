import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Briefcase,
  Users,
  FileText,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Coins,
  Search,
  Bookmark,
  X,
  History,
  Mail,
  CheckCircle2
} from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';
import { ChangeStageModal } from '../../components/recruiter/ChangeStageModal';
import { Application, ApplicationStage } from '../../types/recruiter.types';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const { profile, jobs, applications, candidates, seedDemoApplications } = useRecruiterStore();

  const [selectedAppForStage, setSelectedAppForStage] = useState<Application | null>(null);
  const [searchTab, setSearchTab] = useState<'recent' | 'saved'>('recent');

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
    totalCandidates: candidates.length,
    tokensRemaining: 840,
    tokensUsed: 160
  };

  const funnelStages: { id: ApplicationStage; label: string; count: number; color: string }[] = [
    { id: 'Applied', label: 'APPLICATIONS', count: kpis.newApplications, color: 'bg-blue-500' },
    { id: 'Screening', label: 'SCREENING', count: kpis.screeningCount, color: 'bg-purple-500' },
    { id: 'Shortlisted', label: 'SHORTLISTED', count: kpis.shortlistedCount, color: 'bg-indigo-500' },
    { id: 'Interview', label: 'INTERVIEW', count: kpis.interviewCount, color: 'bg-amber-500' },
    { id: 'Offer', label: 'OFFER', count: kpis.offerCount, color: 'bg-emerald-500' },
    { id: 'Hired', label: 'HIRED', count: kpis.hiredCount, color: 'bg-teal-500' }
  ];

  const recentSearches = [
    { id: '1', query: '"React 19" AND "TypeScript" AND "Full Stack"', location: 'San Francisco, CA', candidatesCount: 24 },
    { id: '2', query: '("Node.js" OR "Python") AND ("PostgreSQL" OR "System Design")', location: 'Remote', candidatesCount: 18 },
    { id: '3', query: '"Senior Frontend Engineer" AND ("Tailwind CSS" OR "Zustand")', location: 'Austin, TX', candidatesCount: 12 }
  ];

  const savedSearches = [
    { id: 's1', query: 'Lead Software Architect AND ("Cloud" OR "AWS")', location: 'San Francisco, CA', candidatesCount: 8 },
    { id: 's2', query: 'Data Engineer AND ("Python" OR "Spark")', location: 'Remote', candidatesCount: 15 }
  ];

  const recentApplications = applications.slice(0, 5);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans antialiased text-slate-900 select-none">
      
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
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
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

        {/* Card 3: Saved Candidate Profiles */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              SAVED CANDIDATES
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {kpis.totalCandidates}
            </div>
            <div className="text-xs font-semibold text-indigo-600 mt-1 cursor-pointer hover:underline" onClick={() => navigate(`/org/${organizationId}/recruiter/candidates`)}>
              View Talent Directory →
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
                className="text-blue-600 font-bold hover:underline cursor-pointer"
              >
                View Log
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Foundit Style: Your Searches Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-indigo-600" />
            <h3 className="font-extrabold text-slate-900 text-base">Your Searches</h3>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setSearchTab('recent')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                searchTab === 'recent' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Recent
            </button>
            <button
              onClick={() => setSearchTab('saved')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                searchTab === 'saved' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Saved
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-400 mb-2">
            {searchTab === 'recent' ? 'Continue Your Recent Candidate Searches' : 'Your Saved Search Queries'}
          </div>

          {(searchTab === 'recent' ? recentSearches : savedSearches).map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/org/${organizationId}/recruiter/candidates/search?q=${encodeURIComponent(item.query)}`)}
              className="p-3 bg-slate-50/80 hover:bg-indigo-50/50 hover:border-indigo-300 rounded-xl border border-slate-100 flex items-center justify-between transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0 transition-colors" />
                <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 truncate transition-colors">
                  {item.query}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-xs text-slate-500">
                <span className="hidden sm:inline font-medium text-slate-400">{item.location}</span>
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[10px] border border-indigo-100">
                  {item.candidatesCount} Candidates
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hiring Pipeline Funnel Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <h3 className="font-extrabold text-slate-900 text-base">Hiring Pipeline Funnel</h3>
          </div>
          <div className="flex items-center gap-2">
            {applications.length === 0 && (
              <button
                onClick={seedDemoApplications}
                className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                + Populate Demo Funnel Data
              </button>
            )}
            <button
              onClick={() => navigate(`/org/${organizationId}/recruiter/ats`)}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors cursor-pointer"
            >
              Open Kanban ATS <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <p className="text-xs text-slate-400">
          Real-time breakdown of candidates progressing across ATS stages. Click any stage to open ATS pipeline.
        </p>

        {/* 6 Stage Mini Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-5">
          {funnelStages.map((stage) => {
            const pct = applications.length > 0 ? Math.round((stage.count / applications.length) * 100) : 0;

            return (
              <div
                key={stage.id}
                onClick={() => navigate(`/org/${organizationId}/recruiter/ats?stage=${stage.id}`)}
                className="bg-slate-50/80 hover:bg-indigo-50/50 hover:border-indigo-300 transition-all duration-200 rounded-xl p-3.5 border border-slate-100 flex flex-col justify-between h-24 cursor-pointer group shadow-2xs hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-indigo-600">
                    {stage.label}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${stage.color} shrink-0`} />
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-slate-900">{stage.count}</span>
                  <span className="text-[10px] font-semibold text-slate-400">{pct}%</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className={`h-full ${stage.color} transition-all duration-500 rounded-full`}
                    style={{ width: `${Math.max(pct, stage.count > 0 ? 15 : 0)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Grid: Recent Applications & Requisition Shortcuts */}
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
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
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
                      className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 font-bold text-[11px] rounded-lg border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Requisition Shortcuts & Candidate Actions */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-600" /> Requisition Quick Actions
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => navigate(`/org/${organizationId}/recruiter/jobs/create`)}
              className="p-4 bg-indigo-50/70 hover:bg-indigo-100/70 border border-indigo-100 rounded-xl flex flex-col justify-between text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-indigo-900 group-hover:text-indigo-700">Post New Requisition</span>
                <Plus className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-[11px] text-slate-500">Create & publish job requisition</p>
            </button>

            <button
              onClick={() => navigate(`/org/${organizationId}/recruiter/candidates/search`)}
              className="p-4 bg-blue-50/70 hover:bg-blue-100/70 border border-blue-100 rounded-xl flex flex-col justify-between text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-blue-900 group-hover:text-blue-700">Candidate Search</span>
                <Search className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-[11px] text-slate-500">Search database by skills & location</p>
            </button>

            <button
              onClick={() => navigate(`/org/${organizationId}/recruiter/jobs`)}
              className="p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex flex-col justify-between text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-slate-800">Total Jobs Posted</span>
                <Briefcase className="w-4 h-4 text-slate-500" />
              </div>
              <p className="text-[11px] text-slate-500">Manage all requisition status</p>
            </button>

            <button
              onClick={() => navigate(`/org/${organizationId}/recruiter/candidates`)}
              className="p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex flex-col justify-between text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-slate-800">Saved Candidate Profiles</span>
                <Bookmark className="w-4 h-4 text-slate-500" />
              </div>
              <p className="text-[11px] text-slate-500">View saved talent pool</p>
            </button>
          </div>
        </div>
      </div>

      {/* Change Stage Modal */}
      {selectedAppForStage && (
        <ChangeStageModal
          isOpen={!!selectedAppForStage}
          application={selectedAppForStage}
          onClose={() => setSelectedAppForStage(null)}
        />
      )}
    </div>
  );
};
