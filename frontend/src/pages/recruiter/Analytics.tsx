import React, { useState } from 'react';
import { BarChart3, TrendingUp, Briefcase, Filter } from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';

export const Analytics: React.FC = () => {
  const { jobs, applications } = useRecruiterStore();
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D' | 'YTD'>('30D');

  // Compute funnel stage counts
  const funnel = {
    applications: applications.length || 4,
    screening: applications.filter((a) => a.stage === 'Screening').length,
    shortlisted: applications.filter((a) => a.stage === 'Shortlisted').length || 2,
    interviews: applications.filter((a) => a.stage === 'Interview').length || 1,
    offers: applications.filter((a) => a.stage === 'Offer').length || 1,
    hired: applications.filter((a) => a.stage === 'Hired').length
  };

  const performanceBreakdown = [
    {
      title: 'Senior Python & FastAPI Engineer',
      status: 'PUBLISHED',
      applications: 34,
      shortlisted: 6,
      conversionRate: '18%'
    },
    {
      title: 'Lead React & Frontend Architect',
      status: 'PUBLISHED',
      applications: 42,
      shortlisted: 8,
      conversionRate: '19%'
    },
    {
      title: 'DevOps & Cloud Systems Lead',
      status: 'REVIEW',
      applications: 12,
      shortlisted: 2,
      conversionRate: '17%'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans antialiased text-slate-900">
      {/* Page Title Header + Time Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#4F46E5]" />
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Recruiter Performance Analytics
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Authorized workload and funnel conversion metrics for your recruiter account.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl text-xs font-bold self-start sm:self-auto shadow-2xs border border-slate-200/60">
          {(['7D', '30D', '90D', 'YTD'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg transition-all ${
                timeRange === range
                  ? 'bg-[#4F46E5] text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Card 1: Application to Hire Conversion Funnel */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#4F46E5]" />
          <h3 className="font-extrabold text-slate-900 text-sm">
            Application to Hire Conversion Funnel
          </h3>
        </div>

        <div className="space-y-5">
          {/* Applications */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 font-bold">Applications</span>
              <span className="text-slate-900 font-extrabold">{funnel.applications} Candidates</span>
            </div>
            <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
              <div className="bg-[#4F46E5] h-full rounded-full w-full transition-all duration-300" />
            </div>
          </div>

          {/* Screening */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 font-bold">Screening</span>
              <span className="text-slate-900 font-extrabold">{funnel.screening} Candidates</span>
            </div>
            <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
              <div
                className="bg-[#4F46E5] h-full rounded-full transition-all duration-300"
                style={{ width: funnel.screening > 0 ? `${(funnel.screening / funnel.applications) * 100}%` : '0%' }}
              />
            </div>
          </div>

          {/* Shortlisted */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 font-bold">Shortlisted</span>
              <span className="text-slate-900 font-extrabold">{funnel.shortlisted} Candidates</span>
            </div>
            <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
              <div className="bg-[#4F46E5] h-full rounded-full w-1/2 transition-all duration-300" />
            </div>
          </div>

          {/* Interviews */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 font-bold">Interviews</span>
              <span className="text-slate-900 font-extrabold">{funnel.interviews} Candidates</span>
            </div>
            <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
              <div className="bg-[#4F46E5] h-full rounded-full w-1/4 transition-all duration-300" />
            </div>
          </div>

          {/* Offers */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 font-bold">Offers</span>
              <span className="text-slate-900 font-extrabold">{funnel.offers} Candidates</span>
            </div>
            <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
              <div className="bg-[#4F46E5] h-full rounded-full w-1/4 transition-all duration-300" />
            </div>
          </div>

          {/* Hired */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 font-bold">Hired</span>
              <span className="text-slate-900 font-extrabold">{funnel.hired} Candidates</span>
            </div>
            <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
              <div
                className="bg-[#4F46E5] h-full rounded-full transition-all duration-300"
                style={{ width: funnel.hired > 0 ? '100%' : '5%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Assigned Job Performance Breakdown */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-[#4F46E5]" />
          <h3 className="font-extrabold text-slate-900 text-sm">
            Assigned Job Performance Breakdown
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/70 border-b border-slate-200/80 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Job Requisition Title</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Total Applications</th>
                <th className="py-3 px-4">Shortlisted</th>
                <th className="py-3 px-4">Conversion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {performanceBreakdown.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{row.title}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 text-[9px] font-extrabold rounded-md uppercase tracking-wider border ${
                        row.status === 'PUBLISHED'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-semibold">{row.applications}</td>
                  <td className="py-3.5 px-4 text-[#4F46E5] font-extrabold">{row.shortlisted}</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-extrabold">{row.conversionRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
