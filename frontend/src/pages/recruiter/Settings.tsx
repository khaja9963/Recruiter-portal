import React, { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  Sliders,
  Save,
  Check,
  Lock,
  Building2,
  Camera,
  MapPin,
  Clock,
  Briefcase,
  AlertCircle,
  KeyRound,
  Smartphone
} from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';

export const Settings: React.FC = () => {
  const { profile, updateProfile } = useRecruiterStore();

  // Profile Form States
  const [name, setName] = useState(profile.name || '');
  const [email, setEmail] = useState(profile.email || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [title, setTitle] = useState(profile.title || '');
  const [department, setDepartment] = useState(profile.department || 'Talent Acquisition & Technical Hiring');
  const [location, setLocation] = useState(profile.location || 'San Francisco, CA');
  const [bio, setBio] = useState(
    profile.bio ||
      'Experienced Technical Recruiter specializing in scaling high-growth engineering teams across React, Node.js, AI, and Cloud Infrastructure.'
  );
  const [timezone, setTimezone] = useState(profile.timezone || 'Pacific Time (US & Canada) (PST/PDT)');
  const [avatar, setAvatar] = useState(profile.avatar || '');

  // Password & Security States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [enable2FA, setEnable2FA] = useState(true);
  const [passwordSaved, setPasswordSaved] = useState(false);

  // Notification States
  const [notifAppAlerts, setNotifAppAlerts] = useState(true);
  const [notifInterviewDigest, setNotifInterviewDigest] = useState(true);
  const [notifFeedbackAlerts, setNotifFeedbackAlerts] = useState(true);
  const [notifOfferUpdates, setNotifOfferUpdates] = useState(true);

  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      phone,
      title,
      department,
      location,
      bio,
      timezone,
      avatar
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }
    setPasswordSaved(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans antialiased text-slate-900 pb-12 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Recruiter Profile & Settings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your personal profile, contact information, notification alerts, and security settings.
          </p>
        </div>
      </div>

      {/* Governance & Boundary Banner */}
      <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900 shadow-2xs">
        <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <h4 className="font-bold text-amber-950 text-xs">Organization Scope & Governance Policy</h4>
          <p className="text-amber-800 leading-snug">
            As a Recruiter user, you can update your personal profile details, notification preferences, and account security. You <strong>cannot modify organization ownership</strong>, organization-level security policies, or billing configurations.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        {[
          { id: 'profile', label: 'Personal & Profile Info', icon: User },
          { id: 'notifications', label: 'Notification Preferences', icon: Bell },
          { id: 'security', label: 'Password & Security Settings', icon: Shield }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[#4F46E5] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Profile Info */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6 text-xs">
          {/* Avatar & Summary Card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
            <div className="relative group">
              <img
                src={avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'}
                alt={name}
                className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md shrink-0"
              />
              <button
                type="button"
                onClick={() => {
                  const newAvatar = prompt('Enter image URL for profile photo:', avatar);
                  if (newAvatar) setAvatar(newAvatar);
                }}
                className="absolute bottom-0 right-0 p-1.5 bg-slate-900 text-white rounded-full shadow-md hover:bg-indigo-600 transition-colors"
                title="Change photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1 text-center sm:text-left flex-1 min-w-0">
              <h3 className="font-extrabold text-slate-900 text-base">{name || 'Recruiter User'}</h3>
              <div className="text-slate-600 font-medium text-xs flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span>{title || 'Senior Recruiter'}</span>
                <span>•</span>
                <span>{department || 'Talent Acquisition'}</span>
              </div>
              <div className="text-[11px] text-slate-400 font-normal">
                Organization: <strong className="text-slate-700 font-semibold">{profile.organizationName}</strong> (ID: {profile.organizationId})
              </div>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Designation / Professional Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Work Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 234-5678"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Technical Talent Acquisition"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Office Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Preferred Time Zone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 text-xs font-medium"
              >
                <option value="Pacific Time (US & Canada) (PST/PDT)">Pacific Time (US & Canada) (PST/PDT)</option>
                <option value="Eastern Time (US & Canada) (EST/EDT)">Eastern Time (US & Canada) (EST/EDT)</option>
                <option value="Central Time (US & Canada) (CST/CDT)">Central Time (US & Canada) (CST/CDT)</option>
                <option value="UTC / GMT">UTC / GMT</option>
                <option value="India Standard Time (IST)">India Standard Time (IST)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Recruiter Bio & Focus Summary
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write a brief professional bio describing your recruitment specialization..."
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-xs leading-relaxed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Last saved: Just now
            </span>
            <div className="flex items-center gap-3">
              {isSaved && (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 animate-in fade-in duration-150">
                  <Check className="w-4 h-4" /> Profile Updated!
                </span>
              )}
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-colors"
              >
                <Save className="w-4 h-4" /> Save Profile Changes
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab 2: Notification Preferences */}
      {activeTab === 'notifications' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6 text-xs">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Notification Preferences</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose which recruitment activity alerts and digests you wish to receive.
            </p>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:bg-slate-100/60 transition-colors">
              <input
                type="checkbox"
                checked={notifAppAlerts}
                onChange={(e) => setNotifAppAlerts(e.target.checked)}
                className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <div>
                <div className="font-bold text-slate-900">New Application Received Alerts</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Receive real-time notifications when candidates submit applications to your requisitions.
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:bg-slate-100/60 transition-colors">
              <input
                type="checkbox"
                checked={notifInterviewDigest}
                onChange={(e) => setNotifInterviewDigest(e.target.checked)}
                className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <div>
                <div className="font-bold text-slate-900">Daily Morning Interview Digest</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Receive a daily email summary of interviews scheduled for your candidates.
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:bg-slate-100/60 transition-colors">
              <input
                type="checkbox"
                checked={notifFeedbackAlerts}
                onChange={(e) => setNotifFeedbackAlerts(e.target.checked)}
                className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <div>
                <div className="font-bold text-slate-900">Interviewer Scorecard Submission Alerts</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Get notified immediately when an interviewer submits scorecard feedback for your candidate.
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:bg-slate-100/60 transition-colors">
              <input
                type="checkbox"
                checked={notifOfferUpdates}
                onChange={(e) => setNotifOfferUpdates(e.target.checked)}
                className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <div>
                <div className="font-bold text-slate-900">Candidate Offer Acceptance / Rejection Status</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Receive priority alerts when candidates accept or decline extended offer letters.
                </div>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Tab 3: Password & Personal Security */}
      {activeTab === 'security' && (
        <div className="space-y-6 text-xs">
          {/* Change Password Card */}
          <form onSubmit={handleUpdatePassword} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-indigo-600" /> Change Personal Password
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Ensure your account is using a strong password to protect recruiter access.
              </p>
            </div>

            <div className="space-y-3 max-w-md">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-xs"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors"
                >
                  Update Password
                </button>

                {passwordSaved && (
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 animate-in fade-in duration-150">
                    <Check className="w-4 h-4" /> Password Updated!
                  </span>
                )}
              </div>
            </div>
          </form>

          {/* Personal 2FA Security Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-indigo-600" /> Two-Factor Authentication (2FA)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Require an authenticator app code when signing into your recruiter account.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={enable2FA}
                  onChange={(e) => setEnable2FA(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
