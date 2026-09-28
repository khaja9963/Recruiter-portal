import React from 'react';
import { BarChart3, TrendingUp, Clock, Award, Users, Target, CheckCircle2 } from 'lucide-react';
import { RecruiterCharts } from '../../components/recruiter/RecruiterCharts';

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Recruiter Performance Analytics</h1>
        <p className="text-xs text-slate-500">Analytics and hiring performance for your assigned requisitions</p>
      </div>

      {/* Recruiter Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-400">Applications Recv.</span>
          <div className="text-2xl font-bold text-blue-600 mt-1">124</div>
          <span className="text-[10px] text-emerald-600 font-bold mt-0.5 inline-block">+18% this month</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-400">Shortlist Rate</span>
          <div className="text-2xl font-bold text-indigo-600 mt-1">27.4%</div>
          <span className="text-[10px] text-slate-400 mt-0.5 inline-block">Industry avg: 22%</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-400">Interview Rate</span>
          <div className="text-2xl font-bold text-cyan-600 mt-1">14.5%</div>
          <span className="text-[10px] text-emerald-600 font-bold mt-0.5 inline-block">+4% vs target</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-400">Time to Hire</span>
          <div className="text-2xl font-bold text-emerald-600 mt-1">18 Days</div>
          <span className="text-[10px] text-emerald-600 font-bold mt-0.5 inline-block">8 days faster</span>
        </div>
      </div>

      {/* Detailed Analytics Charts */}
      <RecruiterCharts />
    </div>
  );
};
