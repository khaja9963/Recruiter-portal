import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  CheckSquare,
  Plus,
  Calendar,
  AlertCircle,
  Clock,
  CheckCircle2,
  Trash2,
  Filter,
  Briefcase,
  User,
  MoreVertical
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';
  relatedJob?: string;
  relatedCandidate?: string;
}

export const Tasks: React.FC = () => {
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();

  const [activeTab, setActiveTab] = useState<'ALL' | 'DUE_TODAY' | 'UPCOMING' | 'OVERDUE' | 'COMPLETED'>('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'task-1',
      title: 'Screen 12 new applicants for Lead Frontend position',
      description: 'Review portfolio links and 5+ years React/TypeScript background',
      dueDate: '2026-09-28',
      priority: 'HIGH',
      status: 'TODO',
      relatedJob: 'Senior Frontend Engineer (React/TypeScript)'
    },
    {
      id: 'task-2',
      title: 'Submit technical interview scorecard for Alex Rivera',
      description: 'Evaluate system design and code quality from yesterday round',
      dueDate: '2026-09-28',
      priority: 'URGENT',
      status: 'IN_PROGRESS',
      relatedCandidate: 'Alex Rivera'
    },
    {
      id: 'task-3',
      title: 'Prepare final compensation package for Marcus Chen',
      description: 'Coordinate with VP Engineering on equity allocation and base salary',
      dueDate: '2026-09-30',
      priority: 'HIGH',
      status: 'TODO',
      relatedCandidate: 'Marcus Chen'
    },
    {
      id: 'task-4',
      title: 'Reference check follow up with previous VP Engineering',
      description: 'Call references provided for senior DevOps candidate',
      dueDate: '2026-09-25',
      priority: 'MEDIUM',
      status: 'OVERDUE',
      relatedCandidate: 'Elena Rostova'
    },
    {
      id: 'task-5',
      title: 'Publish updated JD for Lead Platform Architect',
      description: 'Incorporate new Kubernetes and microservices qualifications',
      dueDate: '2026-09-26',
      priority: 'LOW',
      status: 'COMPLETED',
      relatedJob: 'Lead Platform Architect'
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDue, setNewDue] = useState('2026-10-01');
  const [newPriority, setNewPriority] = useState<'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW'>('MEDIUM');

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'COMPLETED' ? 'TODO' : 'COMPLETED';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim(),
      dueDate: newDue,
      priority: newPriority,
      status: 'TODO'
    };

    setTasks([newTask, ...tasks]);
    setNewTitle('');
    setNewDesc('');
    setShowCreateModal(false);
  };

  const filteredTasks = tasks.filter((t) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'COMPLETED') return t.status === 'COMPLETED';
    if (activeTab === 'OVERDUE') return t.status === 'OVERDUE';
    if (activeTab === 'DUE_TODAY') return t.dueDate === '2026-09-28' && t.status !== 'COMPLETED';
    if (activeTab === 'UPCOMING') return t.dueDate > '2026-09-28' && t.status !== 'COMPLETED';
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-blue-600" /> Recruitment Tasks & Action Items
          </h1>
          <p className="text-xs text-slate-500">
            Track daily recruitment operational tasks, candidate follow-ups, and interview deliverables
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-3.5 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors shadow-2xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Create Task
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        {[
          { id: 'ALL', label: 'All Tasks', count: tasks.length },
          { id: 'DUE_TODAY', label: 'Due Today', count: tasks.filter((t) => t.dueDate === '2026-09-28' && t.status !== 'COMPLETED').length },
          { id: 'UPCOMING', label: 'Upcoming', count: tasks.filter((t) => t.dueDate > '2026-09-28' && t.status !== 'COMPLETED').length },
          { id: 'OVERDUE', label: 'Overdue', count: tasks.filter((t) => t.status === 'OVERDUE').length },
          { id: 'COMPLETED', label: 'Completed', count: tasks.filter((t) => t.status === 'COMPLETED').length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50/50'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-slate-800">No tasks in this section</h3>
            <p className="text-xs text-slate-500 mt-1">You are all caught up on recruitment action items!</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isDone = task.status === 'COMPLETED';
            const isOverdue = task.status === 'OVERDUE';

            return (
              <div
                key={task.id}
                className={`bg-white rounded-xl border p-4 shadow-2xs hover:shadow-sm transition-all flex items-start justify-between gap-4 ${
                  isDone ? 'opacity-70 border-slate-200 bg-slate-50/50' : isOverdue ? 'border-rose-200' : 'border-slate-200/90'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => handleToggleComplete(task.id)}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300 mt-0.5 focus:ring-blue-500 cursor-pointer"
                  />
                  <div>
                    <h3 className={`text-xs font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {task.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{task.description}</p>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-slate-500">
                      <span className={`flex items-center gap-1 font-medium ${isOverdue ? 'text-rose-600' : 'text-slate-500'}`}>
                        <Calendar className="w-3.5 h-3.5" /> Due {task.dueDate}
                      </span>

                      {task.relatedJob && (
                        <span className="flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          <Briefcase className="w-3 h-3" /> {task.relatedJob}
                        </span>
                      )}

                      {task.relatedCandidate && (
                        <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                          <User className="w-3 h-3" /> {task.relatedCandidate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      task.priority === 'URGENT'
                        ? 'bg-rose-100 text-rose-800'
                        : task.priority === 'HIGH'
                        ? 'bg-amber-100 text-amber-800'
                        : task.priority === 'MEDIUM'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {task.priority}
                  </span>

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal for Creating New Task */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 border border-slate-200 shadow-xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Create New Recruitment Task</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Schedule second round interview with Priya"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Additional context or checklist items..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newDue}
                    onChange={(e) => setNewDue(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors shadow-2xs"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
