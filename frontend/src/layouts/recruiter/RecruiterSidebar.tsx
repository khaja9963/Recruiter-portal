import React from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Kanban,
  MessageSquare,
  Sparkles,
  Coins,
  BarChart3,
  LogOut,
  UserCheck
} from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';

export const RecruiterSidebar: React.FC = () => {
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const navigate = useNavigate();
  const { profile, sidebarOpen } = useRecruiterStore();

  const navItems = [
    { label: 'Dashboard', path: `/org/${organizationId}/recruiter/dashboard`, icon: LayoutDashboard },
    { label: 'Applications', path: `/org/${organizationId}/recruiter/applications`, icon: FileText },
    { label: 'ATS / Pipeline', path: `/org/${organizationId}/recruiter/ats`, icon: Kanban },
    { label: 'Messages', path: `/org/${organizationId}/recruiter/messages`, icon: MessageSquare },
    { label: 'AI Tools', path: `/org/${organizationId}/recruiter/ai-tools`, icon: Sparkles },
    { label: 'Token Usage', path: `/org/${organizationId}/recruiter/tokens`, icon: Coins },
    { label: 'Analytics', path: `/org/${organizationId}/recruiter/analytics`, icon: BarChart3 }
  ];

  if (!sidebarOpen) return null;

  return (
    <aside className="w-64 bg-[#0F172A] text-slate-300 flex flex-col h-screen sticky top-0 z-30 border-r border-slate-800/80 shrink-0 select-none">
      {/* Scope Header */}
      <div className="h-14 px-4 border-b border-slate-800/80 flex items-center shrink-0">
        <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
          RECRUITER WORKSPACE
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all relative group ${
                  isActive
                    ? 'bg-[#4F46E5] text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`
              }
            >
              {({ isActive }) => (
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Profile Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-[#0B0F19]/60 shrink-0 space-y-2">
        <button
          onClick={() => navigate(`/org/${organizationId}/recruiter/profile`)}
          className="w-full px-3 py-2 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors border border-slate-700/60 cursor-pointer"
        >
          <UserCheck className="w-4 h-4 text-indigo-400" />
          <span>Profile & Settings</span>
        </button>

        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
          <div className="flex items-center gap-2.5 overflow-hidden min-w-0">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-700"
            />
            <div className="overflow-hidden min-w-0">
              <div className="text-xs font-bold text-slate-200 truncate">{profile.name}</div>
              <div className="text-[11px] text-slate-500 truncate">{profile.email}</div>
            </div>
          </div>
          <button
            onClick={() => {
              if (confirm('Log out of Employee Portal?')) {
                navigate('/');
              }
            }}
            title="Sign out"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-md transition-colors shrink-0 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
