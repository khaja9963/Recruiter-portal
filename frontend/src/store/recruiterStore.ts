import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
  RecentSearchItem,
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
    applicationsCount: 4,
    shortlistedCount: 3,
    viewsCount: 248
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
  },
  {
    id: 'cand-02',
    organizationId: 'clyptus',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=250',
    title: 'Senior Frontend Developer',
    email: 'priya.sharma@example.com',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    experienceYears: 5,
    skills: ['React', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'GraphQL', 'Jest'],
    education: 'B.Tech Computer Science, UT Austin (2019)',
    currentCompany: 'CloudScale Inc.',
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    matchScore: 89,
    overallRating: 4.6,
    availability: 'Immediate (1 week notice)',
    appliedJobsCount: 1,
    summary: 'Senior Frontend Engineer with expertise in building responsive single-page applications, UI design systems, and automated test suites.',
    workHistory: [
      {
        company: 'CloudScale Inc.',
        role: 'Senior Frontend Developer',
        duration: '2022 - Present',
        description: 'Built customer analytics dashboards with React and Tailwind CSS. Implemented end-to-end testing with Cypress.'
      }
    ],
    educationList: [
      {
        degree: 'B.Tech Computer Science',
        institution: 'UT Austin',
        year: '2015 - 2019'
      }
    ],
    projects: [
      {
        title: 'React Micro-Frontend Starter Kit',
        description: 'Modular boilerplate for quick micro-frontend deployment with Module Federation.',
        link: 'https://github.com/example/react-mfe-starter'
      }
    ],
    certifications: ['Certified Web Developer (W3C)']
  },
  {
    id: 'cand-03',
    organizationId: 'clyptus',
    name: 'David Miller',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    title: 'Lead Backend Engineer',
    email: 'david.miller@example.com',
    phone: '+1 (555) 456-7890',
    location: 'Seattle, WA',
    experienceYears: 8,
    skills: ['Node.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'TypeScript', 'Redis'],
    education: 'M.S. Software Engineering, University of Washington (2017)',
    currentCompany: 'DataPulse Systems',
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    matchScore: 92,
    overallRating: 4.9,
    availability: '1 Month notice',
    appliedJobsCount: 1,
    summary: 'Seasoned Backend Systems Architect specializing in microservice design, relational databases, distributed caching, and cloud infrastructure.',
    workHistory: [
      {
        company: 'DataPulse Systems',
        role: 'Lead Backend Engineer',
        duration: '2020 - Present',
        description: 'Architected scalable event-driven backend services serving 2M+ active daily API requests.'
      }
    ],
    educationList: [
      {
        degree: 'M.S. Software Engineering',
        institution: 'University of Washington',
        year: '2015 - 2017'
      }
    ],
    projects: [
      {
        title: 'Distributed Rate-Limiting Middleware',
        description: 'Redis-backed token bucket algorithm for Express and Fastify endpoints.',
        link: 'https://github.com/example/rate-limiter'
      }
    ],
    certifications: ['AWS Certified DevOps Engineer - Professional']
  },
  {
    id: 'cand-04',
    organizationId: 'clyptus',
    name: 'Rajesh Kumar',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    title: 'Full Stack Developer',
    email: 'rajesh.kumar@example.com',
    phone: '+1 (555) 567-8901',
    location: 'New York, NY',
    experienceYears: 4,
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'CSS3'],
    education: 'B.S. Information Technology, NYU (2020)',
    currentCompany: 'InnovateX Solutions',
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    matchScore: 84,
    overallRating: 4.4,
    availability: '2 Weeks notice',
    appliedJobsCount: 1,
    summary: 'Enthusiastic Full Stack Developer passionate about clean code, intuitive UI component development, and RESTful API integrations.',
    workHistory: [
      {
        company: 'InnovateX Solutions',
        role: 'Full Stack Developer',
        duration: '2021 - Present',
        description: 'Developed client features across Node.js services and React frontend web interfaces.'
      }
    ],
    educationList: [
      {
        degree: 'B.S. Information Technology',
        institution: 'NYU',
        year: '2016 - 2020'
      }
    ],
    projects: [
      {
        title: 'Realtime Kanban Board App',
        description: 'Drag-and-drop workflow tracking tool using Socket.io and React.',
        link: 'https://github.com/example/kanban-react'
      }
    ],
    certifications: ['MongoDB Certified Developer']
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
  },
  {
    id: 'app-02',
    candidateId: 'cand-02',
    jobId: 'job-01',
    organizationId: 'clyptus',
    candidateName: 'Priya Sharma',
    candidateAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=250',
    candidateEmail: 'priya.sharma@example.com',
    candidatePhone: '+1 (555) 345-6789',
    candidateTitle: 'Senior Frontend Developer',
    candidateLocation: 'Austin, TX',
    candidateExperienceYears: 5,
    candidateSkills: ['React', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'GraphQL'],
    jobTitle: 'Senior Full Stack Engineer',
    department: 'Engineering',
    appliedDate: '2026-09-27',
    stage: 'Screening',
    matchScore: 89,
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    notes: [
      {
        id: 'note-2',
        authorName: 'Sarah Jenkins',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        content: 'Solid frontend background. Reviewing code samples and scheduling recruiter screening call.',
        createdAt: '2026-09-28 02:15 PM'
      }
    ],
    timeline: [
      { id: 'tl-21', stage: 'Applied', date: '2026-09-27', description: 'Application submitted via portal', updatedBy: 'Priya Sharma' },
      { id: 'tl-22', stage: 'Screening', date: '2026-09-28', description: 'Initial HR review in progress', updatedBy: 'Sarah Jenkins' }
    ]
  },
  {
    id: 'app-03',
    candidateId: 'cand-03',
    jobId: 'job-01',
    organizationId: 'clyptus',
    candidateName: 'David Miller',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    candidateEmail: 'david.miller@example.com',
    candidatePhone: '+1 (555) 456-7890',
    candidateTitle: 'Lead Backend Engineer',
    candidateLocation: 'Seattle, WA',
    candidateExperienceYears: 8,
    candidateSkills: ['Node.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS'],
    jobTitle: 'Senior Full Stack Engineer',
    department: 'Engineering',
    appliedDate: '2026-09-20',
    stage: 'Offer',
    matchScore: 92,
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    notes: [
      {
        id: 'note-3',
        authorName: 'Sarah Jenkins',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        content: 'Passed system architecture round with top score. Executive team approved official job offer.',
        createdAt: '2026-09-29 11:00 AM'
      }
    ],
    timeline: [
      { id: 'tl-31', stage: 'Applied', date: '2026-09-20', description: 'Application received', updatedBy: 'David Miller' },
      { id: 'tl-32', stage: 'Screening', date: '2026-09-21', description: 'Screening complete', updatedBy: 'Sarah Jenkins' },
      { id: 'tl-33', stage: 'Interview', date: '2026-09-24', description: 'Architecture Onsite completed', updatedBy: 'Sarah Jenkins' },
      { id: 'tl-34', stage: 'Offer', date: '2026-09-29', description: 'Formal Offer Letter issued', updatedBy: 'Sarah Jenkins' }
    ]
  },
  {
    id: 'app-04',
    candidateId: 'cand-04',
    jobId: 'job-01',
    organizationId: 'clyptus',
    candidateName: 'Rajesh Kumar',
    candidateAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    candidateEmail: 'rajesh.kumar@example.com',
    candidatePhone: '+1 (555) 567-8901',
    candidateTitle: 'Full Stack Developer',
    candidateLocation: 'New York, NY',
    candidateExperienceYears: 4,
    candidateSkills: ['React', 'Node.js', 'Express', 'MongoDB'],
    jobTitle: 'Senior Full Stack Engineer',
    department: 'Engineering',
    appliedDate: '2026-09-30',
    stage: 'Applied',
    matchScore: 84,
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    notes: [],
    timeline: [
      { id: 'tl-41', stage: 'Applied', date: '2026-09-30', description: 'Application submitted', updatedBy: 'Rajesh Kumar' }
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

const initialRecentSearches: RecentSearchItem[] = [
  { id: '1', query: '"React 19" AND "TypeScript" AND "Full Stack"', location: 'San Francisco, CA', candidatesCount: 24, timestamp: '1 hour ago' },
  { id: '2', query: '("Node.js" OR "Python") AND ("PostgreSQL" OR "System Design")', location: 'Remote', candidatesCount: 18, timestamp: '3 hours ago' },
  { id: '3', query: '"Senior Frontend Engineer" AND ("Tailwind CSS" OR "Zustand")', location: 'Austin, TX', candidatesCount: 12, timestamp: 'Yesterday' }
];

const initialSavedSearches: RecentSearchItem[] = [
  { id: 's1', query: 'Lead Software Architect AND ("Cloud" OR "AWS")', location: 'San Francisco, CA', candidatesCount: 8, timestamp: '2 days ago', isSaved: true },
  { id: 's2', query: 'Data Engineer AND ("Python" OR "Spark")', location: 'Remote', candidatesCount: 15, timestamp: '3 days ago', isSaved: true }
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
  recentSearches: RecentSearchItem[];
  savedSearches: RecentSearchItem[];
  sidebarOpen: boolean;
  globalSearchQuery: string;
  isGlobalSearchOpen: boolean;

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setGlobalSearchQuery: (query: string) => void;
  setGlobalSearchOpen: (open: boolean) => void;

  // Search Actions
  addRecentSearch: (query: string, location?: string, candidatesCount?: number) => void;
  toggleSaveSearch: (id: string) => void;
  deleteRecentSearch: (id: string) => void;

  // Job Actions
  createJob: (jobData: Omit<Job, 'id' | 'organizationId' | 'postedDate' | 'applicationsCount' | 'shortlistedCount' | 'viewsCount'>) => Job;
  updateJob: (jobId: string, updates: Partial<Job>) => void;
  updateJobStatus: (jobId: string, status: JobStatus) => void;
  deleteJob: (jobId: string) => void;

  // Application & Candidate Actions
  submitCandidateApplication: (data: {
    jobId: string;
    candidateName: string;
    candidateEmail: string;
    candidatePhone?: string;
    candidateTitle?: string;
    candidateLocation?: string;
    candidateExperienceYears?: number;
    candidateSkills?: string[];
    resumeUrl?: string;
    summary?: string;
  }) => Application;
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

export const useRecruiterStore = create<RecruiterState>()(
  persist(
    (set, get) => ({
  profile: initialProfile,
  jobs: initialJobs,
  candidates: initialCandidates,
  applications: initialApplications,
  interviews: initialInterviews,
  offers: initialOffers,
  notifications: initialNotifications,
  activities: initialActivities,
  recentSearches: initialRecentSearches,
  savedSearches: initialSavedSearches,
  sidebarOpen: true,
  globalSearchQuery: '',
  isGlobalSearchOpen: false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setGlobalSearchQuery: (query) => set({ globalSearchQuery: query }),
  setGlobalSearchOpen: (open) => set({ isGlobalSearchOpen: open }),

  addRecentSearch: (query, location = 'All Locations', candidatesCount = 0) => {
    if (!query || query.trim().length === 0) return;
    const cleanQuery = query.trim();
    set((state) => {
      const filtered = state.recentSearches.filter(
        (s) => s.query.toLowerCase() !== cleanQuery.toLowerCase()
      );
      const newSearch: RecentSearchItem = {
        id: `search-${Date.now()}`,
        query: cleanQuery,
        location: location.trim() || 'All Locations',
        candidatesCount: typeof candidatesCount === 'number' ? candidatesCount : 0,
        timestamp: 'Just now'
      };
      return {
        recentSearches: [newSearch, ...filtered].slice(0, 10)
      };
    });
  },

  toggleSaveSearch: (id) => {
    set((state) => {
      const isSaved = state.savedSearches.some((s) => s.id === id);
      if (isSaved) {
        return {
          savedSearches: state.savedSearches.filter((s) => s.id !== id)
        };
      }
      const itemToSave = state.recentSearches.find((s) => s.id === id);
      if (itemToSave) {
        return {
          savedSearches: [{ ...itemToSave, isSaved: true }, ...state.savedSearches]
        };
      }
      return state;
    });
  },

  deleteRecentSearch: (id) => {
    set((state) => ({
      recentSearches: state.recentSearches.filter((s) => s.id !== id),
      savedSearches: state.savedSearches.filter((s) => s.id !== id)
    }));
  },

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

  submitCandidateApplication: (data) => {
    const job = get().jobs.find((j) => j.id === data.jobId);
    const candidateId = `cand-${Date.now()}`;
    const newCandidate: Candidate = {
      id: candidateId,
      organizationId: get().profile.organizationId,
      name: data.candidateName,
      email: data.candidateEmail,
      phone: data.candidatePhone || '+1 (555) 000-0000',
      title: data.candidateTitle || job?.title || 'Job Applicant',
      location: data.candidateLocation || 'Remote',
      experienceYears: data.candidateExperienceYears || 3,
      skills: data.candidateSkills || job?.requiredSkills || ['JavaScript', 'React'],
      education: 'Bachelor Degree',
      currentCompany: 'Candidate Applicant',
      resumeUrl: data.resumeUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      matchScore: Math.floor(Math.random() * 15) + 84,
      overallRating: 4.5,
      availability: 'Immediate',
      appliedJobsCount: 1,
      summary: data.summary || `Applicant for ${job?.title || 'position'} via Clyptus Candidate Portal.`
    };

    const newApp: Application = {
      id: `app-${Date.now()}`,
      candidateId,
      jobId: data.jobId,
      organizationId: get().profile.organizationId,
      candidateName: data.candidateName,
      candidateAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      candidateEmail: data.candidateEmail,
      candidatePhone: data.candidatePhone || '+1 (555) 000-0000',
      candidateTitle: data.candidateTitle || job?.title || 'Job Applicant',
      candidateLocation: data.candidateLocation || 'Remote',
      candidateExperienceYears: data.candidateExperienceYears || 3,
      candidateSkills: data.candidateSkills || job?.requiredSkills || ['JavaScript', 'React'],
      jobTitle: job?.title || 'Position',
      department: job?.department || 'Engineering',
      appliedDate: new Date().toISOString().split('T')[0],
      stage: 'Applied',
      matchScore: newCandidate.matchScore,
      resumeUrl: newCandidate.resumeUrl,
      notes: [],
      timeline: [
        {
          id: `tl-${Date.now()}`,
          stage: 'Applied',
          date: new Date().toISOString().split('T')[0],
          description: 'Application submitted via Clyptus Candidate Portal',
          updatedBy: data.candidateName
        }
      ]
    };

    set((state) => ({
      candidates: [newCandidate, ...state.candidates],
      applications: [newApp, ...state.applications],
      jobs: state.jobs.map((j) => (j.id === data.jobId ? { ...j, applicationsCount: j.applicationsCount + 1 } : j)),
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: 'New Application Received',
          message: `${data.candidateName} applied for ${job?.title || 'position'} (${newCandidate.matchScore}% Match)`,
          type: 'application',
          timestamp: 'Just now',
          read: false,
          link: `/applications`
        },
        ...state.notifications
      ],
      activities: [
        {
          id: `act-${Date.now()}`,
          type: 'application',
          user: data.candidateName,
          action: 'applied for job',
          target: job?.title || 'position',
          time: 'Just now',
          badgeColor: 'bg-blue-100 text-blue-800'
        },
        ...state.activities
      ]
    }));

    return newApp;
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
}),
    {
      name: 'clyptus_recruiter_store_v2'
    }
  )
);

if (typeof window !== 'undefined') {
  // Ensure candidates and applications are populated with the 4 dummy candidates
  const state = useRecruiterStore.getState();
  if (!state.candidates || state.candidates.length < 4) {
    useRecruiterStore.setState({
      candidates: initialCandidates,
      applications: initialApplications,
      jobs: initialJobs.length > 0 ? state.jobs : initialJobs
    });
  }

  (window as any).ClyptusPortalAPI = {
    getPublishedJobs: () => useRecruiterStore.getState().jobs.filter((j) => j.status === 'Published'),
    submitCandidateApplication: (data: any) => useRecruiterStore.getState().submitCandidateApplication(data),
    getApplications: () => useRecruiterStore.getState().applications,
    getCandidates: () => useRecruiterStore.getState().candidates,
    updateApplicationStage: (appId: string, stage: ApplicationStage) =>
      useRecruiterStore.getState().updateApplicationStage(appId, stage),
    resetDemoCandidates: () =>
      useRecruiterStore.setState({
        candidates: initialCandidates,
        applications: initialApplications,
        jobs: initialJobs
      })
  };
}
