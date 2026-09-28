import React, { useState } from 'react';
import { Bell, CheckCircle2, Filter } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecruiterStore } from '../../store/recruiterStore';

export const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useRecruiterStore();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = notifications.filter((n) => (filter === 'unread' ? !n.read : true));

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Notifications Center</h1>
          <p className="text-xs text-slate-500">Recruitment alerts, candidate updates, and interview reminders</p>
        </div>

        <button
          onClick={markAllNotificationsAsRead}
          className="px-3.5 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-xs rounded-xl border border-blue-200 flex items-center gap-1.5"
        >
          <CheckCircle2 className="w-4 h-4" /> Mark All as Read
        </button>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Notifications ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
            filter === 'unread' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Unread ({notifications.filter((n) => !n.read).length})
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">No notifications to show.</div>
        ) : (
          filtered.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                markNotificationAsRead(n.id);
                if (n.link) navigate(`/org/${organizationId}/recruiter${n.link}`);
              }}
              className={`p-4 flex items-start justify-between cursor-pointer hover:bg-slate-50/80 transition-colors ${
                !n.read ? 'bg-blue-50/30' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                    !n.read ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{n.title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                  <span className="text-[10px] text-slate-400 mt-1 inline-block font-medium">{n.timestamp}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
