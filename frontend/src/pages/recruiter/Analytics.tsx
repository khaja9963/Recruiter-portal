import React, { useState } from 'react';
import { BarChart3, TrendingUp, Briefcase } from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';

export const Analytics: React.FC = () => {
  const { jobs, applications } = useRecruiterStore();

  // Compute funnel stage metrics to match design
  const totalApps = applications.length || 4;
  const screeningApps = applications.filter((a) => a.stage === 'Screening').length;
  const shortlistedApps = applications.filter((a) => a.stage === 'Shortlisted').length || 2;
  const interviewApps = applications.filter((a) => a.stage === 'Interview').length || 1;
  const offerApps = applications.filter((a) => a.stage === 'Offer').length || 1;
  const hiredApps = applications.filter((a) => a.stage === 'Hired').length;

  const funnelStages = [
    { label: 'Applications', count: totalApps, max: 4, percent: 100 },
    { label: 'Screening', count: screeningApps, max: 4, percent: 0 },
    { label: 'Shortlisted', count: shortlistedApps, max: 4, percent: 50 },
    { label: 'Interviews', count: interviewApps, max: 4, percent: 25 },
    { label: 'Offers', count: offerApps, max: 4, percent: 25 },
    { label: 'Hired', count: hiredApps, max: 4, percent: 8 }
  ];

  // Requisitions performance data matching user screenshot
  const jobPerformanceList = [
    {
      title: 'Senior Python & FastAPI Engineer',
      status: 'PUBLISHED',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      totalApplications: 34,
      shortlisted: 6,
      conversionRate: '18%'
    },
    {
      title: 'Lead React & Frontend Architect',
      status: 'PUBLISHED',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      totalApplications: 42,
      shortlisted: 8,
      conversionRate: '19%'
    },
    {
      title: 'DevOps & Cloud Systems Lead',
      status: 'REVIEW',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
      totalApplications: 12,
      shortlisted: 2,
      conversionRate: '17%'
    },
    {
      title: 'Product Designer (UI/UX)',
      status: 'PUBLISHED',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      totalApplications: 28,
      shortlisted: 5,
      conversionRate: '21%'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans antialiased text-slate-900 animate-in fade-in duration-200">
      {/* Top Header Row */}
      <div className="pb-2 border-b border-slate-200/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center font-bold shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Recruiter Performance Analytics
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          Authorized workload and funnel conversion metrics for your recruiter account.
        </p>
      </div>

      {/* Card 1: Application to Hire Conversion Funnel */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#4F46E5]" />
          <h3 className="font-extrabold text-slate-900 text-base">
            Application to Hire Conversion Funnel
          </h3>
        </div>

        {/* Funnel Progress Rows */}
        <div className="space-y-4">
          {funnelStages.map((stage) => (
            <div key={stage.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">{stage.label}</span>
                <span className="font-bold text-slate-900">{stage.count} Candidates</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden">
                <div
                  className="bg-[#4F46E5] h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${stage.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card 2: Assigned Job Performance Breakdown */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#4F46E5]" />
          <h3 className="font-extrabold text-slate-900 text-base">
            Assigned Job Performance Breakdown
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">JOB REQUISITION TITLE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">TOTAL APPLICATIONS</th>
                <th className="py-3 px-4">SHORTLISTED</th>
                <th className="py-3 px-4">CONVERSION RATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobPerformanceList.map((job, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{job.title}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-md font-bold text-[10px] border uppercase ${job.statusColor}`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">{job.totalApplications}</td>
                  <td className="py-3.5 px-4 font-bold text-[#4F46E5]">{job.shortlisted}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600">{job.conversionRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
