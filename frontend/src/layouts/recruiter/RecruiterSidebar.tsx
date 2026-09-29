import React from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  Users,
  Search,
  FileText,
  Kanban,
  Calendar,
  Gift,
  MessageSquare,
  CheckSquare,
  Sparkles,
  Coins,
  BarChart3,
  Bell,
  UserCheck,
  LogOut
} from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';

export const RecruiterSidebar: React.FC = () => {
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const navigate = useNavigate();
  const { profile, sidebarOpen, notifications } = useRecruiterStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { label: 'Dashboard', path: `/org/${organizationId}/recruiter/dashboard`, icon: LayoutDashboard },
    { label: 'My Jobs', path: `/org/${organizationId}/recruiter/jobs`, icon: Briefcase },
    { label: 'Create Job', path: `/org/${organizationId}/recruiter/jobs/create`, icon: PlusCircle },
    { label: 'Candidates', path: `/org/${organizationId}/recruiter/candidates`, icon: Users },
    { label: 'Candidate Search', path: `/org/${organizationId}/recruiter/candidates/search`, icon: Search },
    { label: 'Applications', path: `/org/${organizationId}/recruiter/applications`, icon: FileText },
    { label: 'ATS / Pipeline', path: `/org/${organizationId}/recruiter/ats`, icon: Kanban },
    { label: 'Interviews', path: `/org/${organizationId}/recruiter/interviews`, icon: Calendar },
    { label: 'Offers', path: `/org/${organizationId}/recruiter/offers`, icon: Gift },
    { label: 'Messages', path: `/org/${organizationId}/recruiter/messages`, icon: MessageSquare },
    { label: 'Tasks', path: `/org/${organizationId}/recruiter/tasks`, icon: CheckSquare },
    { label: 'AI Tools', path: `/org/${organizationId}/recruiter/ai-tools`, icon: Sparkles },
    { label: 'Token Usage', path: `/org/${organizationId}/recruiter/tokens`, icon: Coins },
    { label: 'Analytics', path: `/org/${organizationId}/recruiter/analytics`, icon: BarChart3 },
    { label: 'Notifications', path: `/org/${organizationId}/recruiter/notifications`, icon: Bell, badge: unreadCount },
    { label: 'Profile & Settings', path: `/org/${organizationId}/recruiter/profile`, icon: UserCheck }
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
                `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all relative group ${
                  isActive
                    ? 'bg-[#4F46E5] text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`px-1.5 py-0.2 text-[10px] font-semibold rounded-full shrink-0 ${
                        isActive
                          ? 'bg-white text-indigo-700 font-bold'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Profile Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-[#0B0F19]/60 shrink-0">
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
          <div className="flex items-center gap-2.5 overflow-hidden min-w-0">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-700"
            />
            <div className="overflow-hidden min-w-0">
              <div className="text-xs font-semibold text-slate-200 truncate">{profile.name}</div>
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
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-md transition-colors shrink-0"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};


