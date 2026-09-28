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
  joinedDate: '2023-03-15'
};

// Initial Jobs
const initialJobs: Job[] = [
  {
    id: 'job-101',
    organizationId: 'clyptus',
    title: 'Senior Frontend Engineer (React/TypeScript)',
    department: 'Engineering',
    location: 'San Francisco, CA',
    employmentType: 'Full-time',
    workMode: 'Hybrid',
    experienceLevel: 'Senior',
    salaryMin: 140000,
    salaryMax: 180000,
    currency: 'USD',
    status: 'Published',
    postedDate: '2026-09-10',
    deadline: '2026-10-31',
    openings: 2,
    assignedRecruiterId: 'rec_01',
    assignedRecruiterName: 'Sarah Jenkins',
    summary: 'We are seeking a seasoned Senior Frontend Engineer to build high-performance web applications using React, TypeScript, and modern CSS architectures.',
    responsibilities: [
      'Architect and implement intuitive, responsive UI components.',
      'Optimize web applications for maximum speed and scalability.',
      'Collaborate with product designers and backend engineers.',
      'Mentor junior and mid-level frontend developers.'
    ],
    requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'State Management (Zustand/Redux)', 'REST/GraphQL APIs'],
    preferredSkills: ['Next.js', 'WebSockets', 'Jest/RTL', 'Performance Profiling'],
    qualifications: [
      'B.S. in Computer Science or equivalent work experience.',
      '5+ years of software engineering experience focusing on modern web frontends.'
    ],
    interviewProcess: ['Initial Recruiter Screening (30 mins)', 'Technical Assessment & Deep Dive (60 mins)', 'System Architecture Interview (60 mins)', 'Culture & Leadership Chat (45 mins)'],
    screeningQuestions: [
      { id: 'sq-1', question: 'How many years of commercial React & TypeScript experience do you have?', required: true },
      { id: 'sq-2', question: 'Are you comfortable working in a hybrid environment in San Francisco?', required: true }
    ],
    applicationsCount: 42,
    shortlistedCount: 8,
    viewsCount: 680
  },
  {
    id: 'job-102',
    organizationId: 'clyptus',
    title: 'Lead Backend Developer (Node.js/NestJS)',
    department: 'Engineering',
    location: 'Austin, TX',
    employmentType: 'Full-time',
    workMode: 'Remote',
    experienceLevel: 'Lead',
    salaryMin: 160000,
    salaryMax: 200000,
    currency: 'USD',
    status: 'Published',
    postedDate: '2026-09-15',
    deadline: '2026-11-15',
    openings: 1,
    assignedRecruiterId: 'rec_01',
    assignedRecruiterName: 'Sarah Jenkins',
    summary: 'Join our backend core team to lead the design and microservices architecture supporting millions of real-time requests.',
    responsibilities: [
      'Design modular RESTful and WebSocket APIs in NestJS/Node.js.',
      'Ensure high database query performance on PostgreSQL and Redis.',
      'Oversee CI/CD deployment pipelines on AWS.'
    ],
    requiredSkills: ['Node.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
    preferredSkills: ['Kafka', 'AWS Lambda', 'OpenSearch'],
    qualifications: ['6+ years of backend development experience.', 'Proven track record leading technical projects.'],
    interviewProcess: ['Recruiter Screen', 'Backend System Design', 'Coding & Data Structures', 'Exec Culture Interview'],
    screeningQuestions: [
      { id: 'sq-3', question: 'Describe your experience with microservices and NestJS.', required: true }
    ],
    applicationsCount: 28,
    shortlistedCount: 5,
    viewsCount: 410
  },
  {
    id: 'job-103',
    organizationId: 'clyptus',
    title: 'Product Designer (UI/UX)',
    department: 'Design',
    location: 'New York, NY',
    employmentType: 'Full-time',
    workMode: 'Hybrid',
    experienceLevel: 'Mid-level',
    salaryMin: 110000,
    salaryMax: 145000,
    currency: 'USD',
    status: 'Published',
    postedDate: '2026-09-20',
    deadline: '2026-10-25',
    openings: 1,
    assignedRecruiterId: 'rec_01',
    assignedRecruiterName: 'Sarah Jenkins',
    summary: 'Looking for a creative UI/UX Product Designer to shape user journeys and design sleek SaaS dashboards.',
    responsibilities: [
      'Create wireframes, user flows, and high-fidelity Figma mockups.',
      'Maintain and expand our enterprise UI design system.',
      'Conduct user testing and synthesize feedback.'
    ],
    requiredSkills: ['Figma', 'User Research', 'Design Systems', 'Prototyping', 'Design Tokens'],
    preferredSkills: ['HTML/CSS basics', 'Framer', 'Micro-animations'],
    qualifications: ['3+ years in UX/UI product design for Web/Mobile.'],
    interviewProcess: ['Recruiter Call', 'Portfolio Review', 'Design Challenge', 'Team Interview'],
    screeningQuestions: [
      { id: 'sq-4', question: 'Please share your Figma portfolio link.', required: true }
    ],
    applicationsCount: 35,
    shortlistedCount: 6,
    viewsCount: 520
  },
  {
    id: 'job-104',
    organizationId: 'clyptus',
    title: 'DevOps & Cloud Infrastructure Engineer',
    department: 'Infrastructure',
    location: 'Remote',
    employmentType: 'Full-time',
    workMode: 'Remote',
    experienceLevel: 'Senior',
    salaryMin: 150000,
    salaryMax: 190000,
    currency: 'USD',
    status: 'Draft',
    postedDate: '2026-09-25',
    deadline: '2026-11-30',
    openings: 2,
    assignedRecruiterId: 'rec_01',
    assignedRecruiterName: 'Sarah Jenkins',
    summary: 'Draft requisition for scaling infrastructure on AWS with Terraform and Kubernetes.',
    responsibilities: ['Automate cloud infrastructure provisioning', 'Monitor site reliability'],
    requiredSkills: ['AWS', 'Kubernetes', 'Terraform', 'GitHub Actions'],
    preferredSkills: ['Datadog', 'Prometheus', 'Helm'],
    qualifications: ['4+ years in DevOps / SRE roles.'],
    interviewProcess: ['Recruiter Screen', 'DevOps Practical', 'Architecture Review'],
    screeningQuestions: [],
    applicationsCount: 0,
    shortlistedCount: 0,
    viewsCount: 15
  },
  {
    id: 'job-105',
    organizationId: 'clyptus',
    title: 'Data Science & AI Engineer',
    department: 'Data & AI',
    location: 'San Francisco, CA',
    employmentType: 'Full-time',
    workMode: 'On-site',
    experienceLevel: 'Senior',
    salaryMin: 165000,
    salaryMax: 210000,
    currency: 'USD',
    status: 'Paused',
    postedDate: '2026-08-10',
    deadline: '2026-10-15',
    openings: 1,
    assignedRecruiterId: 'rec_01',
    assignedRecruiterName: 'Sarah Jenkins',
    summary: 'Build recommendation engines and AI agent workflows.',
    responsibilities: ['Fine-tune LLMs', 'Integrate vector search'],
    requiredSkills: ['Python', 'PyTorch', 'LangChain', 'OpenSearch'],
    preferredSkills: ['Milvus', 'CUDA'],
    qualifications: ['M.S. or Ph.D. in CS or AI.'],
    interviewProcess: ['Recruiter Screen', 'ML System Design'],
    screeningQuestions: [],
    applicationsCount: 19,
    shortlistedCount: 3,
    viewsCount: 310
  }
];

// Initial Candidates
const initialCandidates: Candidate[] = [
  {
    id: 'cand-01',
    organizationId: 'clyptus',
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    title: 'Senior Frontend Engineer',
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 987-6543',
    location: 'San Francisco, CA',
    experienceYears: 6,
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Next.js', 'GraphQL'],
    education: 'B.S. Computer Science, UC Berkeley',
    currentCompany: 'Veloce Systems',
    resumeUrl: 'https://example.com/resumes/alex-rivera-resume.pdf',
    matchScore: 95,
    overallRating: 4.8,
    availability: 'Immediate (2 weeks notice)',
    appliedJobsCount: 1,
    summary: 'Passionate Frontend Engineer with 6 years experience building modular, high-scale web applications. Passionate about web performance, design systems, and accessible UX.',
    workHistory: [
      { company: 'Veloce Systems', role: 'Senior Frontend Developer', duration: '2023 - Present', description: 'Led frontend engineering for real-time analytics dashboard.' },
      { company: 'PixelCraft Labs', role: 'Frontend Engineer', duration: '2020 - 2023', description: 'Built UI component libraries used by over 50k monthly active users.' }
    ],
    educationList: [
      { degree: 'B.S. Computer Science', institution: 'University of California, Berkeley', year: '2020' }
    ],
    projects: [
      { title: 'React Canvas Flow Chart', description: 'Open-source flowchart builder with 1.2k GitHub stars.', link: 'https://github.com/example/react-flow' }
    ],
    certifications: ['AWS Certified Developer Associate', 'Meta Frontend Developer Professional']
  },
  {
    id: 'cand-02',
    organizationId: 'clyptus',
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    title: 'Lead Backend Engineer',
    email: 'marcus.chen@example.com',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    experienceYears: 8,
    skills: ['Node.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    education: 'M.S. Software Engineering, UT Austin',
    currentCompany: 'CloudScale Inc',
    resumeUrl: 'https://example.com/resumes/marcus-chen-resume.pdf',
    matchScore: 92,
    overallRating: 4.7,
    availability: '1 month notice',
    appliedJobsCount: 1,
    summary: 'Backend Architect specializing in event-driven microservices, high-concurrency database optimizations, and cloud infrastructure.',
    workHistory: [
      { company: 'CloudScale Inc', role: 'Lead Backend Engineer', duration: '2022 - Present', description: 'Architected distributed messaging queue handling 10M events daily.' }
    ],
    educationList: [
      { degree: 'M.S. Software Engineering', institution: 'University of Texas at Austin', year: '2018' }
    ],
    projects: [
      { title: 'Fast-Nest Queue', description: 'High throughput BullMQ wrapper for NestJS microservices.' }
    ],
    certifications: ['AWS Solutions Architect Associate']
  },
  {
    id: 'cand-03',
    organizationId: 'clyptus',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    title: 'Lead UX/UI Product Designer',
    email: 'elena.rostova@example.com',
    phone: '+1 (555) 456-7890',
    location: 'New York, NY',
    experienceYears: 5,
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'User Research', 'Prototyping', 'Framer'],
    education: 'B.A. Interactive Design, Pratt Institute',
    currentCompany: 'Aura Studio',
    resumeUrl: 'https://example.com/resumes/elena-rostova-resume.pdf',
    matchScore: 88,
    overallRating: 4.5,
    availability: 'Immediate',
    appliedJobsCount: 1,
    summary: 'Senior Product Designer crafting elegant, intuitive SaaS user interfaces and cohesive design systems for tech enterprises.',
    workHistory: [
      { company: 'Aura Studio', role: 'Senior UX Designer', duration: '2021 - Present', description: 'Designed mobile & desktop products for fintech clients.' }
    ],
    educationList: [
      { degree: 'B.A. Interactive Design', institution: 'Pratt Institute', year: '2021' }
    ],
    projects: [
      { title: 'Fintech Dashboard Design System', description: 'Comprehensive design system with 200+ Figma components.' }
    ],
    certifications: ['Nielsen Norman Group UX Certification']
  },
  {
    id: 'cand-04',
    organizationId: 'clyptus',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    title: 'Full Stack Engineer',
    email: 'david.kim@example.com',
    phone: '+1 (555) 567-8901',
    location: 'Seattle, WA',
    experienceYears: 4,
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Tailwind CSS'],
    education: 'B.S. CS, University of Washington',
    currentCompany: 'Apex Tech',
    resumeUrl: 'https://example.com/resumes/david-kim-resume.pdf',
    matchScore: 84,
    overallRating: 4.2,
    availability: '2 weeks notice',
    appliedJobsCount: 2,
    summary: 'Product-focused Full Stack Engineer experienced with React and Node.js REST APIs.',
    workHistory: [
      { company: 'Apex Tech', role: 'Software Engineer', duration: '2022 - Present', description: 'Built customer portal features.' }
    ],
    educationList: [
      { degree: 'B.S. Computer Science', institution: 'University of Washington', year: '2022' }
    ],
    projects: [],
    certifications: []
  },
  {
    id: 'cand-05',
    organizationId: 'clyptus',
    name: 'Sophia Martinez',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    title: 'Frontend Developer',
    email: 'sophia.m@example.com',
    phone: '+1 (555) 678-9012',
    location: 'San Francisco, CA',
    experienceYears: 3,
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Vue.js', 'Tailwind CSS'],
    education: 'B.S. Information Systems, SFSU',
    currentCompany: 'Nova Digital',
    resumeUrl: 'https://example.com/resumes/sophia-martinez-resume.pdf',
    matchScore: 78,
    overallRating: 4.0,
    availability: 'Immediate',
    appliedJobsCount: 1,
    summary: 'Creative frontend developer with strong eye for detail and responsive layouts.',
    workHistory: [
      { company: 'Nova Digital', role: 'Frontend Developer', duration: '2023 - Present', description: 'Developed client marketing websites.' }
    ],
    educationList: [
      { degree: 'B.S. Information Systems', institution: 'SFSU', year: '2023' }
    ],
    projects: [],
    certifications: []
  }
];

// Initial Applications
const initialApplications: Application[] = [
  {
    id: 'app-01',
    candidateId: 'cand-01',
    jobId: 'job-101',
    organizationId: 'clyptus',
    candidateName: 'Alex Rivera',
    candidateAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    candidateEmail: 'alex.rivera@example.com',
    candidatePhone: '+1 (555) 987-6543',
    candidateTitle: 'Senior Frontend Engineer',
    candidateLocation: 'San Francisco, CA',
    candidateExperienceYears: 6,
    candidateSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Redux'],
    jobTitle: 'Senior Frontend Engineer (React/TypeScript)',
    department: 'Engineering',
    appliedDate: '2026-09-12',
    stage: 'Interview',
    matchScore: 95,
    resumeUrl: 'https://example.com/resumes/alex-rivera-resume.pdf',
    notes: [
      {
        id: 'note-1',
        authorName: 'Sarah Jenkins',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        content: 'Great initial recruiter screening. Strong grasp of React state management and performance optimization.',
        createdAt: '2026-09-14 10:30 AM'
      }
    ],
    timeline: [
      { id: 'tl-1', stage: 'Applied', date: '2026-09-12', description: 'Application submitted online', updatedBy: 'Alex Rivera' },
      { id: 'tl-2', stage: 'Screening', date: '2026-09-13', description: 'Shortlisted by recruiter Sarah Jenkins', updatedBy: 'Sarah Jenkins' },
      { id: 'tl-3', stage: 'Shortlisted', date: '2026-09-14', description: 'Moved to shortlisted pipeline', updatedBy: 'Sarah Jenkins' },
      { id: 'tl-4', stage: 'Interview', date: '2026-09-16', description: 'Scheduled Technical Interview', updatedBy: 'Sarah Jenkins' }
    ]
  },
  {
    id: 'app-02',
    candidateId: 'cand-02',
    jobId: 'job-102',
    organizationId: 'clyptus',
    candidateName: 'Marcus Chen',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    candidateEmail: 'marcus.chen@example.com',
    candidatePhone: '+1 (555) 345-6789',
    candidateTitle: 'Lead Backend Engineer',
    candidateLocation: 'Austin, TX',
    candidateExperienceYears: 8,
    candidateSkills: ['Node.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Redis'],
    jobTitle: 'Lead Backend Developer (Node.js/NestJS)',
    department: 'Engineering',
    appliedDate: '2026-09-16',
    stage: 'Offer',
    matchScore: 92,
    resumeUrl: 'https://example.com/resumes/marcus-chen-resume.pdf',
    notes: [
      {
        id: 'note-2',
        authorName: 'Sarah Jenkins',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        content: 'Passed system design interview with flying colors. Offer package drafted.',
        createdAt: '2026-09-22 04:15 PM'
      }
    ],
    timeline: [
      { id: 'tl-5', stage: 'Applied', date: '2026-09-16', description: 'Application submitted', updatedBy: 'Marcus Chen' },
      { id: 'tl-6', stage: 'Interview', date: '2026-09-18', description: 'Completed System Architecture round', updatedBy: 'Sarah Jenkins' },
      { id: 'tl-7', stage: 'Offer', date: '2026-09-23', description: 'Offer letter generated and sent', updatedBy: 'Sarah Jenkins' }
    ]
  },
  {
    id: 'app-03',
    candidateId: 'cand-03',
    jobId: 'job-103',
    organizationId: 'clyptus',
    candidateName: 'Elena Rostova',
    candidateAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    candidateEmail: 'elena.rostova@example.com',
    candidatePhone: '+1 (555) 456-7890',
    candidateTitle: 'Lead UX/UI Product Designer',
    candidateLocation: 'New York, NY',
    candidateExperienceYears: 5,
    candidateSkills: ['Figma', 'UI/UX Design', 'Design Systems', 'Prototyping'],
    jobTitle: 'Product Designer (UI/UX)',
    department: 'Design',
    appliedDate: '2026-09-21',
    stage: 'Shortlisted',
    matchScore: 88,
    resumeUrl: 'https://example.com/resumes/elena-rostova-resume.pdf',
    notes: [],
    timeline: [
      { id: 'tl-8', stage: 'Applied', date: '2026-09-21', description: 'Applied for Product Designer', updatedBy: 'Elena Rostova' },
      { id: 'tl-9', stage: 'Shortlisted', date: '2026-09-23', description: 'Shortlisted for Portfolio Review', updatedBy: 'Sarah Jenkins' }
    ]
  },
  {
    id: 'app-04',
    candidateId: 'cand-04',
    jobId: 'job-101',
    organizationId: 'clyptus',
    candidateName: 'David Kim',
    candidateAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    candidateEmail: 'david.kim@example.com',
    candidatePhone: '+1 (555) 567-8901',
    candidateTitle: 'Full Stack Engineer',
    candidateLocation: 'Seattle, WA',
    candidateExperienceYears: 4,
    candidateSkills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    jobTitle: 'Senior Frontend Engineer (React/TypeScript)',
    department: 'Engineering',
    appliedDate: '2026-09-22',
    stage: 'Screening',
    matchScore: 84,
    resumeUrl: 'https://example.com/resumes/david-kim-resume.pdf',
    notes: [],
    timeline: [
      { id: 'tl-10', stage: 'Applied', date: '2026-09-22', description: 'Applied online', updatedBy: 'David Kim' }
    ]
  },
  {
    id: 'app-05',
    candidateId: 'cand-05',
    jobId: 'job-101',
    organizationId: 'clyptus',
    candidateName: 'Sophia Martinez',
    candidateAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    candidateEmail: 'sophia.m@example.com',
    candidatePhone: '+1 (555) 678-9012',
    candidateTitle: 'Frontend Developer',
    candidateLocation: 'San Francisco, CA',
    candidateExperienceYears: 3,
    candidateSkills: ['React', 'JavaScript', 'Vue.js', 'CSS'],
    jobTitle: 'Senior Frontend Engineer (React/TypeScript)',
    department: 'Engineering',
    appliedDate: '2026-09-24',
    stage: 'Applied',
    matchScore: 78,
    resumeUrl: 'https://example.com/resumes/sophia-martinez-resume.pdf',
    notes: [],
    timeline: [
      { id: 'tl-11', stage: 'Applied', date: '2026-09-24', description: 'Application received', updatedBy: 'Sophia Martinez' }
    ]
  }
];

// Initial Interviews
const initialInterviews: Interview[] = [
  {
    id: 'int-101',
    applicationId: 'app-01',
    candidateId: 'cand-01',
    jobId: 'job-101',
    organizationId: 'clyptus',
    candidateName: 'Alex Rivera',
    candidateAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    candidateEmail: 'alex.rivera@example.com',
    jobTitle: 'Senior Frontend Engineer (React/TypeScript)',
    roundName: 'Technical Deep Dive',
    interviewerName: 'Michael Vance (Staff FE Eng)',
    interviewerEmail: 'michael.vance@clyptus.com',
    date: '2026-09-29',
    time: '02:00 PM - 03:00 PM',
    type: 'Video',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    status: 'Scheduled',
    notes: 'Focus on React component state, custom hooks, and virtualized lists performance.'
  },
  {
    id: 'int-102',
    applicationId: 'app-02',
    candidateId: 'cand-02',
    jobId: 'job-102',
    organizationId: 'clyptus',
    candidateName: 'Marcus Chen',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    candidateEmail: 'marcus.chen@example.com',
    jobTitle: 'Lead Backend Developer (Node.js/NestJS)',
    roundName: 'System Architecture',
    interviewerName: 'David Vance (VP of Engineering)',
    interviewerEmail: 'david.vance@clyptus.com',
    date: '2026-09-22',
    time: '11:00 AM - 12:00 PM',
    type: 'Video',
    meetingLink: 'https://meet.google.com/xyz-uvwx-rst',
    status: 'Completed',
    notes: 'Candidate demonstrated outstanding knowledge of distributed queuing and Redis caching.',
    feedback: {
      id: 'fb-102',
      interviewId: 'int-102',
      technicalScore: 5,
      communicationScore: 4.5,
      problemSolvingScore: 5,
      suitabilityScore: 5,
      strengths: 'Deep understanding of NestJS modules, database indexing, and fault tolerance.',
      weaknesses: 'Minor reluctance to do pure frontend tasks, which is fine for backend lead role.',
      recommendation: 'Proceed',
      comments: 'Strongly recommend moving to offer stage immediately.',
      submittedAt: '2026-09-22 01:30 PM',
      submittedBy: 'David Vance'
    }
  },
  {
    id: 'int-103',
    applicationId: 'app-03',
    candidateId: 'cand-03',
    jobId: 'job-103',
    organizationId: 'clyptus',
    candidateName: 'Elena Rostova',
    candidateAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    candidateEmail: 'elena.rostova@example.com',
    jobTitle: 'Product Designer (UI/UX)',
    roundName: 'Portfolio Review & Challenge',
    interviewerName: 'Rachel Miller (Lead Designer)',
    interviewerEmail: 'rachel.m@clyptus.com',
    date: '2026-09-30',
    time: '10:00 AM - 11:30 AM',
    type: 'Video',
    meetingLink: 'https://meet.google.com/des-ign-rev',
    status: 'Scheduled',
    notes: 'Review candidate Figma design tokens and component workflow.'
  }
];

// Initial Offers
const initialOffers: Offer[] = [
  {
    id: 'off-101',
    applicationId: 'app-02',
    candidateId: 'cand-02',
    jobId: 'job-102',
    organizationId: 'clyptus',
    candidateName: 'Marcus Chen',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    candidateEmail: 'marcus.chen@example.com',
    jobTitle: 'Lead Backend Developer (Node.js/NestJS)',
    department: 'Engineering',
    offerDate: '2026-09-23',
    joiningDate: '2026-10-20',
    baseSalary: 185000,
    bonus: 20000,
    equity: '15,000 RSUs (4-year vest)',
    currency: 'USD',
    status: 'Sent',
    notes: 'Candidate is currently reviewing the formal written offer letter.'
  }
];

// Initial Notifications
const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Application Received',
    message: 'Sophia Martinez applied for Senior Frontend Engineer (React/TypeScript).',
    type: 'application',
    timestamp: '10 minutes ago',
    read: false,
    link: '/applications'
  },
  {
    id: 'notif-2',
    title: 'Interview Reminder',
    message: 'Upcoming Technical Deep Dive interview with Alex Rivera tomorrow at 2:00 PM.',
    type: 'interview',
    timestamp: '1 hour ago',
    read: false,
    link: '/interviews'
  },
  {
    id: 'notif-3',
    title: 'Interview Feedback Submitted',
    message: 'David Vance submitted 5-star feedback for Marcus Chen.',
    type: 'feedback',
    timestamp: 'Yesterday',
    read: true,
    link: '/interviews'
  },
  {
    id: 'notif-4',
    title: 'Offer Sent',
    message: 'Offer letter successfully delivered to Marcus Chen.',
    type: 'offer',
    timestamp: '2 days ago',
    read: true,
    link: '/offers'
  }
];

// Initial Activities
const initialActivities: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'stage',
    user: 'Sarah Jenkins',
    action: 'moved candidate',
    target: 'Marcus Chen to Offer stage',
    time: '2 hours ago',
    badgeColor: 'bg-amber-100 text-amber-800'
  },
  {
    id: 'act-2',
    type: 'interview',
    user: 'Sarah Jenkins',
    action: 'scheduled interview',
    target: 'Alex Rivera for Technical Deep Dive',
    time: 'Yesterday at 3:30 PM',
    badgeColor: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'act-3',
    type: 'job',
    user: 'Sarah Jenkins',
    action: 'published job posting',
    target: 'Lead Backend Developer (Node.js/NestJS)',
    time: '3 days ago',
    badgeColor: 'bg-emerald-100 text-emerald-800'
  },
  {
    id: 'act-4',
    type: 'note',
    user: 'Sarah Jenkins',
    action: 'added recruiter note',
    target: 'Application for Alex Rivera',
    time: '4 days ago',
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
