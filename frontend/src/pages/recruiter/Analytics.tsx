import React from 'react';
import { BarChart3, TrendingUp, Briefcase } from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';

export const Analytics: React.FC = () => {
  const { jobs, applications } = useRecruiterStore();

  // Dynamically compute funnel metrics directly from applications array
  const totalApps = applications.length;
  const screeningApps = applications.filter((a) => a.stage === 'Screening').length;
  const shortlistedApps = applications.filter((a) => a.stage === 'Shortlisted').length;
  const interviewApps = applications.filter((a) => a.stage === 'Interview').length;
  const offerApps = applications.filter((a) => a.stage === 'Offer').length;
  const hiredApps = applications.filter((a) => a.stage === 'Hired').length;

  const funnelStages = [
    { label: 'Applications', count: totalApps, percent: totalApps > 0 ? 100 : 0 },
    { label: 'Screening', count: screeningApps, percent: totalApps > 0 ? Math.round((screeningApps / totalApps) * 100) : 0 },
    { label: 'Shortlisted', count: shortlistedApps, percent: totalApps > 0 ? Math.round((shortlistedApps / totalApps) * 100) : 0 },
    { label: 'Interviews', count: interviewApps, percent: totalApps > 0 ? Math.round((interviewApps / totalApps) * 100) : 0 },
    { label: 'Offers', count: offerApps, percent: totalApps > 0 ? Math.round((offerApps / totalApps) * 100) : 0 },
    { label: 'Hired', count: hiredApps, percent: totalApps > 0 ? Math.round((hiredApps / totalApps) * 100) : 0 }
  ];

  // Dynamically compute job performance list from jobs & applications
  const jobPerformanceList = jobs.map((job) => {
    const jobApps = applications.filter((a) => a.jobId === job.id);
    const totalJobApps = jobApps.length;
    const shortlistedCount = jobApps.filter(
      (a) => a.stage === 'Shortlisted' || a.stage === 'Interview' || a.stage === 'Offer' || a.stage === 'Hired'
    ).length;
    const conversionRate = totalJobApps > 0 ? `${Math.round((shortlistedCount / totalJobApps) * 100)}%` : '0%';

    let statusColor = 'bg-slate-100 text-slate-700 border-slate-200';
    if (job.status === 'Published') statusColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (job.status === 'Draft') statusColor = 'bg-slate-100 text-slate-700 border-slate-200';
    if (job.status === 'Paused') statusColor = 'bg-amber-50 text-amber-700 border-amber-200';
    if (job.status === 'Closed') statusColor = 'bg-rose-50 text-rose-700 border-rose-200';

    return {
      title: job.title,
      status: job.status.toUpperCase(),
      statusColor,
      totalApplications: totalJobApps,
      shortlisted: shortlistedCount,
      conversionRate
    };
  });

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
              {jobPerformanceList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-xs text-slate-400">
                    No job requisitions found. Create a job to view performance metrics.
                  </td>
                </tr>
              ) : (
                jobPerformanceList.map((job, idx) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
