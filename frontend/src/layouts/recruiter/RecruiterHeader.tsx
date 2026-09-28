import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Building2,
  ChevronDown,
  CheckCircle2,
  Plus
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecruiterStore } from '../../store/recruiterStore';

export const RecruiterHeader: React.FC = () => {
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const navigate = useNavigate();
  const {
    profile,
    toggleSidebar,
    setGlobalSearchOpen,
    notifications,
    markAllNotificationsAsRead,
    markNotificationAsRead
  } = useRecruiterStore();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white/95 backdrop-blur-xs border-b border-slate-200/80 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-slate-50 border border-slate-200/70 rounded-md text-xs font-medium text-slate-700">
          <Building2 className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>{profile.organizationName}</span>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 max-w-md mx-4">
        <button
          onClick={() => setGlobalSearchOpen(true)}
          className="w-full flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 text-slate-500 text-xs px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search candidates, jobs, notes...</span>
          </div>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white text-slate-400 rounded border border-slate-200">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => navigate(`/org/${organizationId}/recruiter/jobs/create`)}
          className="hidden md:flex items-center gap-1.5 py-1.5 px-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Post Requisition
        </button>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in duration-150">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                <h4 className="font-bold text-xs text-slate-900">Notifications</h4>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[11px] font-semibold text-blue-600 hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationAsRead(n.id);
                        if (n.link) navigate(`/org/${organizationId}/recruiter${n.link}`);
                        setIsNotifOpen(false);
                      }}
                      className={`p-3 text-xs hover:bg-slate-50 cursor-pointer transition-colors ${
                        !n.read ? 'bg-blue-50/40 font-medium' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between text-slate-800 font-bold mb-0.5">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{n.timestamp}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-snug">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <img src={profile.avatar} alt={profile.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-slate-800 leading-tight">{profile.name}</div>
              <div className="text-[10px] text-slate-400 leading-tight">{profile.role}</div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden lg:block" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in duration-150">
              <div className="px-4 py-2 border-b border-slate-100">
                <div className="font-bold text-xs text-slate-900">{profile.name}</div>
                <div className="text-[11px] text-slate-500">{profile.email}</div>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate(`/org/${organizationId}/recruiter/settings`);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 font-medium flex items-center gap-2"
                >
                  <Settings className="w-4 h-4 text-slate-400" /> Recruiter Settings
                </button>
              </div>
              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    if (confirm('Log out of Employee Portal?')) {
                      navigate('/');
                    }
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 font-medium flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
