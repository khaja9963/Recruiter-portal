import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  User,
  LogOut,
  ChevronDown,
  Briefcase,
  PlusCircle,
  Users,
  FileText,
  Bookmark
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecruiterStore } from '../../store/recruiterStore';

export const RecruiterHeader: React.FC = () => {
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const navigate = useNavigate();
  const { profile, toggleSidebar, setGlobalSearchOpen } = useRecruiterStore();

  const [activeDropdown, setActiveDropdown] = useState<'jobs' | 'search' | 'apps' | 'profile' | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header ref={headerRef} className="h-16 bg-white border-b border-slate-200/90 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-40 shadow-xs select-none">
      {/* Left Branding */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(`/org/${organizationId}/recruiter/dashboard`)}>
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-lg shadow-sm shrink-0">
            C
          </div>
          <div className="leading-none">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-slate-900 tracking-tight">Clyptus</span>
              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-100 uppercase tracking-wider">
                RECRUITER PORTAL
              </span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
              Clyptus Software Solution • Recruiter Workspace
            </div>
          </div>
        </div>
      </div>

      {/* Center Top Navigation Dropdowns (Foundit & Naukri Style) */}
      <nav className="hidden md:flex items-center gap-2">
        {/* Jobs Dropdown */}
        <div className="relative">
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'jobs' ? null : 'jobs')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeDropdown === 'jobs' ? 'bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Briefcase className="w-4 h-4 text-indigo-600" />
            <span>Jobs</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {activeDropdown === 'jobs' && (
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in duration-150">
              <button
                onClick={() => {
                  setActiveDropdown(null);
                  navigate(`/org/${organizationId}/recruiter/jobs/create`);
                }}
                className="w-full px-4 py-2.5 text-left text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-indigo-600" /> Post a Job
              </button>
              <button
                onClick={() => {
                  setActiveDropdown(null);
                  navigate(`/org/${organizationId}/recruiter/jobs`);
                }}
                className="w-full px-4 py-2.5 text-left text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2.5 transition-colors border-t border-slate-100 cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-indigo-600" /> Total Jobs Posted
              </button>
            </div>
          )}
        </div>

        {/* Search Dropdown */}
        <div className="relative">
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'search' ? null : 'search')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeDropdown === 'search' ? 'bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Search className="w-4 h-4 text-indigo-600" />
            <span>Search</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {activeDropdown === 'search' && (
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in duration-150">
              <button
                onClick={() => {
                  setActiveDropdown(null);
                  navigate(`/org/${organizationId}/recruiter/candidates/search`);
                }}
                className="w-full px-4 py-2.5 text-left text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <Users className="w-4 h-4 text-indigo-600" /> Candidate Search
              </button>
            </div>
          )}
        </div>

        {/* Applications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'apps' ? null : 'apps')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeDropdown === 'apps' ? 'bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>Applications</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {activeDropdown === 'apps' && (
            <div className="absolute left-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in duration-150">
              <button
                onClick={() => {
                  setActiveDropdown(null);
                  navigate(`/org/${organizationId}/recruiter/candidates`);
                }}
                className="w-full px-4 py-2.5 text-left text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <Bookmark className="w-4 h-4 text-indigo-600" /> Saved Candidate Profiles
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Right Controls: Global Search & Recruiter Avatar */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setGlobalSearchOpen(true)}
          className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-400 text-xs px-3 py-1.5 rounded-xl border border-slate-200 transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline font-medium">Search...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white text-slate-400 rounded border border-slate-200">
            Ctrl K
          </kbd>
        </button>

        {/* Profile Avatar */}
        <div className="relative">
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'profile' ? null : 'profile')}
            className="flex items-center gap-2.5 p-1 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
            />
            <div className="hidden lg:block text-left leading-tight">
              <div className="text-xs font-bold text-slate-900">{profile.name}</div>
              <div className="text-[10px] text-slate-500">{profile.email}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
          </button>

          {activeDropdown === 'profile' && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in duration-150">
              <div className="px-4 py-2 border-b border-slate-100">
                <div className="font-bold text-xs text-slate-900">{profile.name}</div>
                <div className="text-[11px] text-slate-500">{profile.email}</div>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setActiveDropdown(null);
                    if (confirm('Log out of Employee Portal?')) {
                      navigate('/');
                    }
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 font-bold flex items-center gap-2 cursor-pointer"
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
