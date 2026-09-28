import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';

const pipelineData = [
  { stage: 'Applied', candidates: 124, fill: '#3b82f6' },
  { stage: 'Screening', candidates: 68, fill: '#a855f7' },
  { stage: 'Shortlisted', candidates: 34, fill: '#6366f1' },
  { stage: 'Interview', candidates: 18, fill: '#06b6d4' },
  { stage: 'Offer', candidates: 8, fill: '#f59e0b' },
  { stage: 'Hired', candidates: 5, fill: '#10b981' }
];

const trendData = [
  { month: 'May', applications: 45, interviews: 12, hires: 2 },
  { month: 'Jun', applications: 62, interviews: 18, hires: 3 },
  { month: 'Jul', applications: 85, interviews: 22, hires: 4 },
  { month: 'Aug', applications: 110, interviews: 28, hires: 5 },
  { month: 'Sep', applications: 124, interviews: 32, hires: 6 }
];

export const RecruiterCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pipeline Funnel */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Recruitment Funnel Pipeline</h3>
            <p className="text-xs text-slate-500">Candidate progression by stage</p>
          </div>
          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[11px] font-semibold rounded-md">
            Active Candidates
          </span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pipelineData} layout="vertical" margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" stroke="#94a3b8" fontSize={11} />
              <YAxis dataKey="stage" type="category" stroke="#475569" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              />
              <Bar dataKey="candidates" radius={[0, 6, 6, 0]}>
                {pipelineData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Applications & Hires Trend */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Monthly Recruitment Trend</h3>
            <p className="text-xs text-slate-500">Applications vs. Interviews vs. Hires</p>
          </div>
          <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-semibold rounded-md">
            +24% Growth
          </span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ left: 0, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="interviews" stroke="#06b6d4" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="hires" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
