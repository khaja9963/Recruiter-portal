import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  MessageSquare,
  Sparkles,
  Coins
} from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';

export const RecruiterSidebar: React.FC = () => {
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const { sidebarOpen } = useRecruiterStore();

  const navItems = [
    { label: 'Dashboard', path: `/org/${organizationId}/recruiter/dashboard`, icon: LayoutDashboard },
    { label: 'Token Usage', path: `/org/${organizationId}/recruiter/tokens`, icon: Coins }
  ];

  if (!sidebarOpen) return null;

  return (
    <aside className="w-64 bg-white text-slate-800 flex flex-col h-screen sticky top-0 z-30 border-r border-slate-200/90 shrink-0 select-none">
      {/* Scope Header */}
      <div className="h-14 px-4 border-b border-slate-100 flex items-center shrink-0">
        <span className="text-[11px] font-extrabold text-slate-400 tracking-wider uppercase">
          RECRUITER WORKSPACE
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all relative group ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              {({ isActive }) => (
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
