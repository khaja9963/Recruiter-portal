import React, { useState } from 'react';
import { User, Bell, Shield, Sliders, Save, Check } from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';

export const Settings: React.FC = () => {
  const { profile, updateProfile } = useRecruiterStore();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [title, setTitle] = useState(profile.title);
  const [avatar, setAvatar] = useState(profile.avatar);

  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'preferences' | 'security'>('profile');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone, title, avatar });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200 pb-12">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Recruiter Profile & Preferences</h1>
        <p className="text-xs text-slate-500">Manage your recruiter profile details and application preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'profile', label: 'Profile Info', icon: User },
          { id: 'notifications', label: 'Notification Alerts', icon: Bell },
          { id: 'preferences', label: 'ATS Preferences', icon: Sliders },
          { id: 'security', label: 'Password & Security', icon: Shield }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-5 text-xs">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
            <img src={avatar} alt={name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
            <div>
              <h3 className="font-bold text-slate-900 text-sm">{profile.name}</h3>
              <p className="text-slate-500">{profile.role} — {profile.organizationName}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Professional Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Work Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            {isSaved && (
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <Check className="w-4 h-4" /> Profile Updated!
              </span>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Save Profile
            </button>
          </div>
        </form>
      )}

      {activeTab === 'notifications' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm">Notification Alert Preferences</h3>
          <div className="space-y-3">
            {[
              { label: 'New Application Received Alerts', desc: 'Email when a new candidate applies to your job' },
              { label: 'Interview Reminder Digest', desc: 'Daily morning summary of upcoming scheduled interviews' },
              { label: 'Interview Feedback Submitted', desc: 'Notification when an interviewer completes feedback' },
              { label: 'Offer Decision Updates', desc: 'Real-time alert when a candidate accepts or declines an offer' }
            ].map((item, idx) => (
              <label key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                <input type="checkbox" defaultChecked className="mt-0.5 rounded text-blue-600" />
                <div>
                  <div className="font-bold text-slate-800">{item.label}</div>
                  <div className="text-[11px] text-slate-500">{item.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'preferences' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm">ATS Workflow Preferences</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Default Timezone</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white">
                <option>Pacific Time (US & Canada) (PST/PDT)</option>
                <option>Eastern Time (US & Canada) (EST/EDT)</option>
                <option>UTC / GMT</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Default Interview Length</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white">
                <option>45 Minutes</option>
                <option>60 Minutes</option>
                <option>30 Minutes</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm">Password & Security</h3>
          <div className="space-y-3 max-w-md">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Current Password</label>
              <input type="password" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">New Password</label>
              <input type="password" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
            </div>
            <button className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl">Update Password</button>
          </div>
        </div>
      )}
    </div>
  );
};
