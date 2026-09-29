import { create } from 'zustand';
import {
  RecruiterProfile,
  Job,
  Candidate,
  Application,
  Interview,
  InterviewFeedback,
  Offer,
  NotificationItem,
  RecruiterKPIs,
  ActivityItem,
  ApplicationStage,
  JobStatus,
  InterviewStatus,
  OfferStatus
} from '../types/recruiter.types';

// Mock Profile
const initialProfile: RecruiterProfile = {
  id: 'rec_01',
  name: 'Sarah Jenkins',
  email: 'sarah.jenkins@clyptus.com',
  phone: '+1 (555) 234-5678',
  title: 'Senior Technical Recruiter',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
  organizationId: 'clyptus',
  organizationName: 'Clyptus',
  role: 'Senior Recruiter',
  joinedDate: '2023-03-15',
  department: 'Talent Acquisition & Technical Hiring',
  location: 'San Francisco, CA',
  bio: 'Experienced Technical Recruiter specializing in scaling high-growth engineering teams across React, Node.js, AI, and Cloud Infrastructure.',
  timezone: 'Pacific Time (US & Canada) (PST/PDT)'
};

// Initial State (Clean, Empty Collections)
const initialJobs: Job[] = [];
const initialCandidates: Candidate[] = [];
const initialApplications: Application[] = [];
const initialInterviews: Interview[] = [];
const initialOffers: Offer[] = [];
const initialNotifications: NotificationItem[] = [];
const initialActivities: ActivityItem[] = [];

interface RecruiterState {
  profile: RecruiterProfile;
  jobs: Job[];
  candidates: Candidate[];
  applications: Application[];
  interviews: Interview[];
  offers: Offer[];
  notifications: NotificationItem[];
  activities: ActivityItem[];
  sidebarOpen: boolean;
  globalSearchQuery: string;
  isGlobalSearchOpen: boolean;

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setGlobalSearchQuery: (query: string) => void;
  setGlobalSearchOpen: (open: boolean) => void;

  // Job Actions
  createJob: (jobData: Omit<Job, 'id' | 'organizationId' | 'postedDate' | 'applicationsCount' | 'shortlistedCount' | 'viewsCount'>) => Job;
  updateJob: (jobId: string, updates: Partial<Job>) => void;
  updateJobStatus: (jobId: string, status: JobStatus) => void;
  deleteJob: (jobId: string) => void;

  // Application & Candidate Actions
  updateApplicationStage: (applicationId: string, newStage: ApplicationStage) => void;
  addRecruiterNote: (applicationId: string, noteContent: string) => void;
  shortlistCandidate: (candidateId: string, jobId?: string) => void;
  rejectCandidate: (applicationId: string) => void;

  // Interview Actions
  scheduleInterview: (interviewData: Omit<Interview, 'id' | 'organizationId' | 'status'>) => Interview;
  updateInterviewStatus: (interviewId: string, status: InterviewStatus) => void;
  addInterviewFeedback: (interviewId: string, feedback: Omit<InterviewFeedback, 'id' | 'interviewId' | 'submittedAt'>) => void;

  // Offer Actions
  createOffer: (offerData: Omit<Offer, 'id' | 'organizationId' | 'offerDate' | 'status'>) => Offer;
  updateOfferStatus: (offerId: string, status: OfferStatus) => void;

  // Notifications & Settings Actions
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  updateProfile: (profileUpdates: Partial<RecruiterProfile>) => void;
}

export const useRecruiterStore = create<RecruiterState>((set, get) => ({
  profile: initialProfile,
  jobs: initialJobs,
  candidates: initialCandidates,
  applications: initialApplications,
  interviews: initialInterviews,
  offers: initialOffers,
  notifications: initialNotifications,
  activities: initialActivities,
  sidebarOpen: true,
  globalSearchQuery: '',
  isGlobalSearchOpen: false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setGlobalSearchQuery: (query) => set({ globalSearchQuery: query }),
  setGlobalSearchOpen: (open) => set({ isGlobalSearchOpen: open }),

  createJob: (jobData) => {
    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}`,
      organizationId: get().profile.organizationId,
      postedDate: new Date().toISOString().split('T')[0],
      applicationsCount: 0,
      shortlistedCount: 0,
      viewsCount: 1
    };

    set((state) => ({
      jobs: [newJob, ...state.jobs],
      activities: [
        {
          id: `act-${Date.now()}`,
          type: 'job',
          user: state.profile.name,
          action: 'created job',
          target: newJob.title,
          time: 'Just now',
          badgeColor: 'bg-emerald-100 text-emerald-800'
        },
        ...state.activities
      ]
    }));

    return newJob;
  },

  updateJob: (jobId, updates) => {
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === jobId ? { ...j, ...updates } : j))
    }));
  },

  updateJobStatus: (jobId, status) => {
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === jobId ? { ...j, status } : j))
    }));
  },

  deleteJob: (jobId) => {
    set((state) => ({
      jobs: state.jobs.filter((j) => j.id !== jobId)
    }));
  },

  updateApplicationStage: (applicationId, newStage) => {
    set((state) => {
      const app = state.applications.find((a) => a.id === applicationId);
      if (!app) return state;

      const updatedTimeline = [
        ...app.timeline,
        {
          id: `tl-${Date.now()}`,
          stage: newStage,
          date: new Date().toISOString().split('T')[0],
          description: `Moved stage to ${newStage}`,
          updatedBy: state.profile.name
        }
      ];

      const updatedApps = state.applications.map((a) =>
        a.id === applicationId ? { ...a, stage: newStage, timeline: updatedTimeline } : a
      );

      return {
        applications: updatedApps,
        activities: [
          {
            id: `act-${Date.now()}`,
            type: 'stage',
            user: state.profile.name,
            action: 'updated stage',
            target: `${app.candidateName} moved to ${newStage}`,
            time: 'Just now',
            badgeColor: 'bg-blue-100 text-blue-800'
          },
          ...state.activities
        ]
      };
    });
  },

  addRecruiterNote: (applicationId, noteContent) => {
    set((state) => {
      const app = state.applications.find((a) => a.id === applicationId);
      if (!app) return state;

      const newNote = {
        id: `note-${Date.now()}`,
        authorName: state.profile.name,
        authorAvatar: state.profile.avatar,
        content: noteContent,
        createdAt: new Date().toLocaleString()
      };

      return {
        applications: state.applications.map((a) =>
          a.id === applicationId ? { ...a, notes: [newNote, ...a.notes] } : a
        )
      };
    });
  },

  shortlistCandidate: (candidateId, jobId) => {
    set((state) => {
      const cand = state.candidates.find((c) => c.id === candidateId);
      const app = state.applications.find(
        (a) => a.candidateId === candidateId && (!jobId || a.jobId === jobId)
      );

      if (app) {
        get().updateApplicationStage(app.id, 'Shortlisted');
      }

      return {
        notifications: [
          {
            id: `notif-${Date.now()}`,
            title: 'Candidate Shortlisted',
            message: `${cand?.name || 'Candidate'} was moved to Shortlisted.`,
            type: 'stage',
            timestamp: 'Just now',
            read: false,
            link: '/applications'
          },
          ...state.notifications
        ]
      };
    });
  },

  rejectCandidate: (applicationId) => {
    get().updateApplicationStage(applicationId, 'Rejected');
  },

  scheduleInterview: (interviewData) => {
    const newInterview: Interview = {
      ...interviewData,
      id: `int-${Date.now()}`,
      organizationId: get().profile.organizationId,
      status: 'Scheduled'
    };

    set((state) => ({
      interviews: [newInterview, ...state.interviews],
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: 'Interview Scheduled',
          message: `${newInterview.roundName} with ${newInterview.candidateName} scheduled for ${newInterview.date}.`,
          type: 'interview',
          timestamp: 'Just now',
          read: false,
          link: '/interviews'
        },
        ...state.notifications
      ],
      activities: [
        {
          id: `act-${Date.now()}`,
          type: 'interview',
          user: state.profile.name,
          action: 'scheduled interview',
          target: `${newInterview.candidateName} (${newInterview.roundName})`,
          time: 'Just now',
          badgeColor: 'bg-indigo-100 text-indigo-800'
        },
        ...state.activities
      ]
    }));

    // Update application stage to Interview if not already
    get().updateApplicationStage(interviewData.applicationId, 'Interview');

    return newInterview;
  },

  updateInterviewStatus: (interviewId, status) => {
    set((state) => ({
      interviews: state.interviews.map((i) => (i.id === interviewId ? { ...i, status } : i))
    }));
  },

  addInterviewFeedback: (interviewId, feedback) => {
    set((state) => {
      const fullFeedback: InterviewFeedback = {
        ...feedback,
        id: `fb-${Date.now()}`,
        interviewId,
        submittedAt: new Date().toLocaleString()
      };

      const updatedInterviews = state.interviews.map((i) =>
        i.id === interviewId ? { ...i, status: 'Completed' as InterviewStatus, feedback: fullFeedback } : i
      );

      return {
        interviews: updatedInterviews,
        notifications: [
          {
            id: `notif-${Date.now()}`,
            title: 'Interview Feedback Submitted',
            message: `Feedback recorded with recommendation: ${feedback.recommendation}`,
            type: 'feedback',
            timestamp: 'Just now',
            read: false,
            link: '/interviews'
          },
          ...state.notifications
        ]
      };
    });
  },

  createOffer: (offerData) => {
    const newOffer: Offer = {
      ...offerData,
      id: `off-${Date.now()}`,
      organizationId: get().profile.organizationId,
      offerDate: new Date().toISOString().split('T')[0],
      status: 'Sent'
    };

    set((state) => ({
      offers: [newOffer, ...state.offers],
      activities: [
        {
          id: `act-${Date.now()}`,
          type: 'offer',
          user: state.profile.name,
          action: 'created offer',
          target: `Offer sent to ${newOffer.candidateName}`,
          time: 'Just now',
          badgeColor: 'bg-amber-100 text-amber-800'
        },
        ...state.activities
      ]
    }));

    // Move stage to Offer
    get().updateApplicationStage(offerData.applicationId, 'Offer');

    return newOffer;
  },

  updateOfferStatus: (offerId, status) => {
    set((state) => {
      const off = state.offers.find((o) => o.id === offerId);
      if (off && status === 'Accepted') {
        get().updateApplicationStage(off.applicationId, 'Hired');
      }

      return {
        offers: state.offers.map((o) => (o.id === offerId ? { ...o, status } : o))
      };
    });
  },

  markNotificationAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    }));
  },

  markAllNotificationsAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true }))
    }));
  },

  updateProfile: (profileUpdates) => {
    set((state) => ({
      profile: { ...state.profile, ...profileUpdates }
    }));
  }
}));
