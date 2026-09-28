import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Coins,
  TrendingDown,
  History,
  ShieldAlert,
  Sparkles,
  Calendar,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';

export const Tokens: React.FC = () => {
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();

  const stats = {
    allocated: 10000,
    used: 2840,
    remaining: 7160,
    renewalDate: 'October 1, 2026',
    percentageUsed: 28.4
  };

  const tokenUsageHistory = [
    {
      id: 'tok-101',
      feature: 'AI Resume Analysis',
      candidate: 'Alex Rivera',
      tokens: 50,
      balanceAfter: 7160,
      timestamp: 'Today, 2:20 PM'
    },
    {
      id: 'tok-102',
      feature: 'Candidate-Job Matching',
      candidate: 'Marcus Chen',
      tokens: 40,
      balanceAfter: 7210,
      timestamp: 'Today, 11:05 AM'
    },
    {
      id: 'tok-103',
      feature: 'Job Description Assistance',
      candidate: 'Staff Backend Requisition',
      tokens: 60,
      balanceAfter: 7250,
      timestamp: 'Yesterday, 4:45 PM'
    },
    {
      id: 'tok-104',
      feature: 'Interview Question Generation',
      candidate: 'Technical Round 2',
      tokens: 45,
      balanceAfter: 7310,
      timestamp: 'Sep 26, 1:15 PM'
    },
    {
      id: 'tok-105',
      feature: 'AI Resume Analysis',
      candidate: 'Elena Rostova',
      tokens: 50,
      balanceAfter: 7355,
      timestamp: 'Sep 25, 10:30 AM'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Coins className="w-5 h-5 text-amber-500" /> Recruitment Token Balance & Ledger
        </h1>
        <p className="text-xs text-slate-500">
          Monitor organization AI token allocations, consumption history, and feature-level quotas for {organizationId.toUpperCase()}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500">Remaining Balance</span>
          <div className="text-2xl font-black text-slate-900 mt-1 flex items-baseline gap-1.5">
            {stats.remaining.toLocaleString()}
            <span className="text-xs font-medium text-emerald-600">Available</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${100 - stats.percentageUsed}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500">Total Tokens Used</span>
          <div className="text-2xl font-black text-slate-900 mt-1 flex items-baseline gap-1.5">
            {stats.used.toLocaleString()}
            <span className="text-xs font-medium text-slate-400">({stats.percentageUsed}%)</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">Monthly billing cycle quota</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500">Organization Allocation</span>
          <div className="text-2xl font-black text-slate-900 mt-1 flex items-baseline gap-1.5">
            {stats.allocated.toLocaleString()}
            <span className="text-xs font-medium text-blue-600">Monthly</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">Next renewal on {stats.renewalDate}</span>
        </div>
      </div>

      {/* Token Policy Guard Notice */}
      <div className="bg-slate-900 text-slate-200 rounded-xl p-4 flex items-start gap-3 border border-slate-800">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <div className="font-bold text-white">Strict Token Authorization Boundary</div>
          <p className="text-slate-400 leading-relaxed">
            Recruiter permissions allow viewing and consuming tokens for authorized AI recruitment features only.
            Token purchasing, balance replenishment, and pricing adjustments are reserved for Organization Administrators.
          </p>
        </div>
      </div>

      {/* Feature Rate Sheet */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">AI Feature Token Rates</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-500 block">AI Resume Parse</span>
            <strong className="text-slate-900 font-bold text-sm">50 Tokens</strong>
            <span className="text-[10px] text-slate-400 block mt-0.5">Per resume document</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-500 block">Candidate Match</span>
            <strong className="text-slate-900 font-bold text-sm">40 Tokens</strong>
            <span className="text-[10px] text-slate-400 block mt-0.5">Per semantic match score</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-500 block">JD Assistant</span>
            <strong className="text-slate-900 font-bold text-sm">60 Tokens</strong>
            <span className="text-[10px] text-slate-400 block mt-0.5">Per requisition draft</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-500 block">Interview Scorecard</span>
            <strong className="text-slate-900 font-bold text-sm">45 Tokens</strong>
            <span className="text-[10px] text-slate-400 block mt-0.5">Per customized rubric</span>
          </div>
        </div>
      </div>

      {/* Consumption Ledger Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <History className="w-4 h-4 text-slate-400" /> Token Consumption History
          </h3>
          <span className="text-xs text-slate-500 font-medium">Last 5 Transactions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-4">Feature Name</th>
                <th className="py-2.5 px-4">Subject Target</th>
                <th className="py-2.5 px-4">Tokens Deducted</th>
                <th className="py-2.5 px-4">Balance After</th>
                <th className="py-2.5 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tokenUsageHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    {item.feature}
                  </td>
                  <td className="py-3 px-4 text-slate-600">{item.candidate}</td>
                  <td className="py-3 px-4 font-bold text-rose-600">-{item.tokens}</td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-800">{item.balanceAfter.toLocaleString()}</td>
                  <td className="py-3 px-4 text-slate-400">{item.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
