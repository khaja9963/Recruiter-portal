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
// Initial State (1 Working Dummy Candidate Profile & Requisition for testing)
const initialJobs: Job[] = [
  {
    id: 'job-01',
    organizationId: 'clyptus',
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    employmentType: 'Full-time',
    workMode: 'Hybrid',
    experienceLevel: 'Senior',
    salaryMin: 140000,
    salaryMax: 185000,
    currency: 'USD',
    status: 'Published',
    postedDate: '2026-09-24',
    deadline: '2026-10-31',
    openings: 2,
    assignedRecruiterId: 'rec_01',
    assignedRecruiterName: 'Sarah Jenkins',
    summary: 'Join Clyptus engineering team to scale AI-driven recruitment portal workflows and high-performance Web applications.',
    responsibilities: [
      'Architect and deliver responsive React 19 and TypeScript web applications.',
      'Collaborate with product managers and UX designers on frontend UI systems.',
      'Optimize API performance and component lifecycle rendering.'
    ],
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
    preferredSkills: ['Next.js', 'GraphQL', 'Zustand', 'Docker'],
    qualifications: [
      'B.S. or M.S. in Computer Science or related technical discipline.',
      '5+ years of professional full-stack development experience.'
    ],
    interviewProcess: [
      '1. Recruiter HR Screen (30 mins)',
      '2. Technical Coding Assessment (60 mins)',
      '3. System Architecture & Onsite (90 mins)',
      '4. Executive Leadership Chat'
    ],
    screeningQuestions: [
      { id: 'q1', question: 'How many years of commercial React & TypeScript experience do you have?', required: true },
      { id: 'q2', question: 'What is your notice period / availability?', required: true }
    ],
    applicationsCount: 1,
    shortlistedCount: 1,
    viewsCount: 184
  }
];

const initialCandidates: Candidate[] = [
  {
    id: 'cand-01',
    organizationId: 'clyptus',
    name: 'Alex Morgan',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    title: 'Senior Full Stack Engineer',
    email: 'alex.morgan@clyptus.dev',
    phone: '+1 (555) 234-8901',
    location: 'San Francisco, CA',
    experienceYears: 6,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'Tailwind CSS'],
    education: 'B.S. Computer Science, Stanford University (2018)',
    currentCompany: 'Vanguard Tech Solutions',
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    matchScore: 94,
    overallRating: 4.8,
    availability: 'Immediate (2 weeks notice)',
    appliedJobsCount: 1,
    summary: 'Accomplished Full Stack Software Engineer with 6+ years building real-time micro-frontends, high-concurrency Node.js microservices, and slick developer tools.',
    workHistory: [
      {
        company: 'Vanguard Tech Solutions',
        role: 'Senior Full Stack Engineer',
        duration: '2021 - Present',
        description: 'Led a team of 4 engineers building enterprise SaaS dashboards using React, TypeScript, and GraphQL. Improved page render performance by 42%.'
      },
      {
        company: 'Apex Digital Labs',
        role: 'Frontend Developer',
        duration: '2018 - 2021',
        description: 'Developed scalable UI component libraries, customer portals, and optimized state management pipelines.'
      }
    ],
    educationList: [
      {
        degree: 'B.S. Computer Science',
        institution: 'Stanford University',
        year: '2014 - 2018'
      }
    ],
    projects: [
      {
        title: 'Open Source UI Design Tokens Engine',
        description: 'Created an open-source design token transpiler with over 2.4k GitHub stars.',
        link: 'https://github.com/example/tokens-engine'
      }
    ],
    certifications: [
      'AWS Certified Solutions Architect',
      'Meta Senior Front-End Developer Specialization'
    ]
  }
];

const initialApplications: Application[] = [
  {
    id: 'app-01',
    candidateId: 'cand-01',
    jobId: 'job-01',
    organizationId: 'clyptus',
    candidateName: 'Alex Morgan',
    candidateAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    candidateEmail: 'alex.morgan@clyptus.dev',
    candidatePhone: '+1 (555) 234-8901',
    candidateTitle: 'Senior Full Stack Engineer',
    candidateLocation: 'San Francisco, CA',
    candidateExperienceYears: 6,
    candidateSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    jobTitle: 'Senior Full Stack Engineer',
    department: 'Engineering',
    appliedDate: '2026-09-25',
    stage: 'Interview',
    matchScore: 94,
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    notes: [
      {
        id: 'note-1',
        authorName: 'Sarah Jenkins',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        content: 'Strong technical background with 6 years experience in React & TypeScript. Passed initial HR screening with high marks.',
        createdAt: '2026-09-26 10:30 AM'
      }
    ],
    timeline: [
      { id: 'tl-1', stage: 'Applied', date: '2026-09-25', description: 'Application submitted online', updatedBy: 'Alex Morgan' },
      { id: 'tl-2', stage: 'Screening', date: '2026-09-26', description: 'Passed HR Screening', updatedBy: 'Sarah Jenkins' },
      { id: 'tl-3', stage: 'Shortlisted', date: '2026-09-27', description: 'Moved to Shortlisted pool', updatedBy: 'Sarah Jenkins' },
      { id: 'tl-4', stage: 'Interview', date: '2026-09-28', description: 'Technical Deep Dive Interview Scheduled', updatedBy: 'Sarah Jenkins' }
    ]
  }
];

const initialInterviews: Interview[] = [
  {
    id: 'int-01',
    applicationId: 'app-01',
    candidateId: 'cand-01',
    jobId: 'job-01',
    organizationId: 'clyptus',
    candidateName: 'Alex Morgan',
    candidateAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    candidateEmail: 'alex.morgan@clyptus.dev',
    jobTitle: 'Senior Full Stack Engineer',
    roundName: 'Technical Coding & System Architecture',
    interviewerName: 'Sarah Jenkins',
    interviewerEmail: 'sarah.jenkins@clyptus.com',
    date: '2026-10-02',
    time: '02:00 PM',
    type: 'Video',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    status: 'Scheduled',
    notes: 'Focus on React 19 Hooks, Zustand state management, and API design.'
  }
];

const initialOffers: Offer[] = [];
const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-01',
    title: 'New Candidate Applied',
    message: 'Alex Morgan applied for Senior Full Stack Engineer (94% Match)',
    type: 'application',
    timestamp: '2 hours ago',
    read: false,
    link: '/candidates/cand-01'
  }
];
const initialActivities: ActivityItem[] = [
  {
    id: 'act-01',
    type: 'interview',
    user: 'Sarah Jenkins',
    action: 'scheduled interview',
    target: 'Alex Morgan (Technical Coding)',
    time: 'Yesterday',
    badgeColor: 'bg-purple-100 text-purple-800'
  }
];

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
  addCandidate: (candidateData: Omit<Candidate, 'id' | 'organizationId' | 'appliedJobsCount'>) => Candidate;
  updateCandidate: (candidateId: string, updates: Partial<Candidate>) => void;
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
  seedDemoApplications: () => void;
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

  addCandidate: (candidateData) => {
    const newCand: Candidate = {
      ...candidateData,
      id: `cand-${Date.now()}`,
      organizationId: get().profile.organizationId,
      appliedJobsCount: 0
    };

    set((state) => ({
      candidates: [newCand, ...state.candidates]
    }));

    return newCand;
  },

  updateCandidate: (candidateId, updates) => {
    set((state) => ({
      candidates: state.candidates.map((c) => (c.id === candidateId ? { ...c, ...updates } : c)),
      applications: state.applications.map((a) =>
        a.candidateId === candidateId
          ? {
              ...a,
              candidateName: updates.name || a.candidateName,
              candidateEmail: updates.email || a.candidateEmail,
              candidateTitle: updates.title || a.candidateTitle,
              resumeUrl: updates.resumeUrl || a.resumeUrl
            }
          : a
      )
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

  seedDemoApplications: () => {
    const demoJobs: Job[] = [
      {
        id: 'job-demo-1',
        organizationId: 'clyptus',
        title: 'Senior React Developer',
        department: 'Engineering',
        location: 'San Francisco, CA',
        employmentType: 'Full-time',
        workMode: 'Remote',
        experienceLevel: 'Senior',
        salaryMin: 140000,
        salaryMax: 180000,
        currency: 'USD',
        status: 'Published',
        postedDate: '2026-09-20',
        deadline: '2026-10-30',
        openings: 2,
        assignedRecruiterId: 'rec_01',
        assignedRecruiterName: 'Sarah Jenkins',
        summary: 'Build scalable front-end Web apps using React and TypeScript.',
        responsibilities: ['Architect UI components', 'Optimize state management'],
        requiredSkills: ['React', 'TypeScript', 'Tailwind CSS'],
        preferredSkills: ['Next.js', 'Zustand'],
        qualifications: ['BS in Computer Science or equivalent'],
        interviewProcess: ['HR Screening', 'Technical Assessment', 'System Design'],
        screeningQuestions: [],
        applicationsCount: 4,
        shortlistedCount: 2,
        viewsCount: 142
      }
    ];

    const demoApps: Application[] = [
      {
        id: 'app-demo-1',
        candidateId: 'cand-1',
        jobId: 'job-demo-1',
        organizationId: 'clyptus',
        candidateName: 'Alex Morgan',
        candidateAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        candidateEmail: 'alex.morgan@gmail.com',
        candidatePhone: '+1 (555) 123-4567',
        candidateTitle: 'Full Stack Engineer',
        candidateLocation: 'Austin, TX',
        candidateExperienceYears: 5,
        candidateSkills: ['React', 'TypeScript', 'Node.js'],
        jobTitle: 'Senior React Developer',
        department: 'Engineering',
        appliedDate: '2026-09-22',
        stage: 'Applied',
        matchScore: 92,
        resumeUrl: 'https://example.com/resume.pdf',
        notes: [],
        timeline: [{ id: 'tl-1', stage: 'Applied', date: '2026-09-22', description: 'Application submitted', updatedBy: 'System' }]
      },
      {
        id: 'app-demo-2',
        candidateId: 'cand-2',
        jobId: 'job-demo-1',
        organizationId: 'clyptus',
        candidateName: 'David Chen',
        candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        candidateEmail: 'david.chen@tech.io',
        candidatePhone: '+1 (555) 987-6543',
        candidateTitle: 'Senior Frontend Developer',
        candidateLocation: 'Seattle, WA',
        candidateExperienceYears: 7,
        candidateSkills: ['React', 'Redux', 'System Design'],
        jobTitle: 'Senior React Developer',
        department: 'Engineering',
        appliedDate: '2026-09-21',
        stage: 'Screening',
        matchScore: 95,
        resumeUrl: 'https://example.com/resume2.pdf',
        notes: [],
        timeline: [{ id: 'tl-2', stage: 'Screening', date: '2026-09-23', description: 'Screening initiated', updatedBy: 'Sarah Jenkins' }]
      },
      {
        id: 'app-demo-3',
        candidateId: 'cand-3',
        jobId: 'job-demo-1',
        organizationId: 'clyptus',
        candidateName: 'Sophia Martinez',
        candidateAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        candidateEmail: 'sophia.m@designcode.com',
        candidatePhone: '+1 (555) 456-7890',
        candidateTitle: 'UI Engineer',
        candidateLocation: 'San Francisco, CA',
        candidateExperienceYears: 4,
        candidateSkills: ['React', 'Tailwind', 'Figma'],
        jobTitle: 'Senior React Developer',
        department: 'Engineering',
        appliedDate: '2026-09-19',
        stage: 'Shortlisted',
        matchScore: 88,
        resumeUrl: 'https://example.com/resume3.pdf',
        notes: [],
        timeline: [{ id: 'tl-3', stage: 'Shortlisted', date: '2026-09-24', description: 'Shortlisted for interview', updatedBy: 'Sarah Jenkins' }]
      },
      {
        id: 'app-demo-4',
        candidateId: 'cand-4',
        jobId: 'job-demo-1',
        organizationId: 'clyptus',
        candidateName: 'Marcus Vance',
        candidateAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        candidateEmail: 'marcus.v@cloud.net',
        candidatePhone: '+1 (555) 321-7654',
        candidateTitle: 'Lead Web Engineer',
        candidateLocation: 'Remote',
        candidateExperienceYears: 8,
        candidateSkills: ['React', 'TypeScript', 'GraphQL'],
        jobTitle: 'Senior React Developer',
        department: 'Engineering',
        appliedDate: '2026-09-18',
        stage: 'Interview',
        matchScore: 96,
        resumeUrl: 'https://example.com/resume4.pdf',
        notes: [],
        timeline: [{ id: 'tl-4', stage: 'Interview', date: '2026-09-25', description: 'Technical Interview scheduled', updatedBy: 'Sarah Jenkins' }]
      }
    ];

    set((state) => ({
      jobs: state.jobs.length === 0 ? demoJobs : state.jobs,
      applications: demoApps
    }));
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
