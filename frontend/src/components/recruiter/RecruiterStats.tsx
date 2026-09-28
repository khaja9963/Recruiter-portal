import React from 'react';
import { Briefcase, FileText, UserCheck, Calendar, Gift, Award } from 'lucide-react';
import { RecruiterKPIs } from '../../types/recruiter.types';

interface RecruiterStatsProps {
  kpis: RecruiterKPIs;
}

export const RecruiterStats: React.FC<RecruiterStatsProps> = ({ kpis }) => {
  const statCards = [
    {
      title: 'Active Requisitions',
      value: kpis.activeJobs,
      subtitle: `${kpis.draftJobs} drafts in review`,
      icon: Briefcase
    },
    {
      title: 'Total Applications',
      value: kpis.totalApplications,
      subtitle: `${kpis.newApplications} new this week`,
      icon: FileText
    },
    {
      title: 'Shortlisted',
      value: kpis.shortlistedCandidates,
      subtitle: 'Screened & qualified',
      icon: UserCheck
    },
    {
      title: 'Interviews Scheduled',
      value: kpis.interviewsScheduled,
      subtitle: 'Active rounds scheduled',
      icon: Calendar
    },
    {
      title: 'Offers Extended',
      value: kpis.offersSent,
      subtitle: 'Awaiting candidate signature',
      icon: Gift
    },
    {
      title: 'Total Hired',
      value: kpis.hiredCandidates,
      subtitle: 'Placed this quarter',
      icon: Award
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {statCards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-colors flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium truncate">{card.title}</span>
              <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 tracking-tight">{card.value}</div>
              <div className="text-[11px] text-slate-500 mt-0.5 truncate">{card.subtitle}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
