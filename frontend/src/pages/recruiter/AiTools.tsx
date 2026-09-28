import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Sparkles,
  FileSearch,
  Wand2,
  HelpCircle,
  Coins,
  CheckCircle,
  Copy,
  AlertTriangle,
  Lightbulb,
  FileText,
  UserCheck
} from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';

export const AiTools: React.FC = () => {
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const { jobs, candidates } = useRecruiterStore();

  const [activeTab, setActiveTab] = useState<'RESUME_PARSE' | 'JD_GEN' | 'MATCH' | 'QUESTIONS'>('RESUME_PARSE');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // Resume Parse inputs
  const [resumeText, setResumeText] = useState(
    'Alex Rivera, Senior Frontend Engineer with 6+ years specializing in React, TypeScript, Redux, Tailwind CSS, and Next.js. Architected high scale SaaS web applications for 150k active daily users, reduced bundle load times by 40%, and led 5 junior engineers.'
  );

  // JD Gen inputs
  const [jdTitle, setJdTitle] = useState('Senior Frontend Engineer (React/TypeScript)');
  const [jdDept, setJdDept] = useState('Engineering');

  // Match inputs
  const [selectedJob, setSelectedJob] = useState(jobs[0]?.id || 'job-101');
  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0]?.id || 'cand-01');

  // Questions inputs
  const [questionRole, setQuestionRole] = useState('Senior Full Stack Engineer');
  const [questionRound, setQuestionRound] = useState('Technical Deep Dive & Architecture');

  const handleRunAi = (featureName: string, tokenCost: number) => {
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setLoading(false);

      if (activeTab === 'RESUME_PARSE') {
        setResult({
          type: 'RESUME_PARSE',
          headline: 'Senior Frontend Engineer | React, TypeScript & Web Performance',
          yearsExperience: '6.2 Years',
          skills: ['React', 'TypeScript', 'Redux', 'Tailwind CSS', 'Next.js', 'Web Performance'],
          summary: 'High-performing frontend engineer with proven success in reducing bundle latency and mentoring engineering teams.',
          tokensConsumed: tokenCost
        });
      } else if (activeTab === 'JD_GEN') {
        setResult({
          type: 'JD_GEN',
          title: jdTitle,
          summary: `Clyptus is seeking a talented ${jdTitle} to join our Engineering team. You will lead the delivery of scalable UI components, establish frontend standards, and collaborate closely with product management.`,
          responsibilities: [
            'Architect responsive web applications in React 19 and TypeScript.',
            'Optimize core web vitals and minimize application bundle size.',
            'Collaborate with UI/UX designers to translate Figma design systems into reusable components.',
            'Maintain 90%+ automated test coverage with Jest and React Testing Library.'
          ],
          requirements: [
            '5+ years production experience with React and modern TypeScript.',
            'Deep understanding of state management, browser rendering cycles, and REST/WebSocket APIs.',
            'Excellent communication and mentoring capabilities.'
          ],
          tokensConsumed: tokenCost
        });
      } else if (activeTab === 'MATCH') {
        setResult({
          type: 'MATCH',
          score: 94,
          fitRating: 'High Confidence Fit',
          summary: 'Candidate skills exceed requirements for TypeScript and React. High semantic overlap with requisition criteria.',
          overlappingSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
          missingSkills: ['GraphQL (minor)'],
          tokensConsumed: tokenCost
        });
      } else if (activeTab === 'QUESTIONS') {
        setResult({
          type: 'QUESTIONS',
          role: questionRole,
          round: questionRound,
          questions: [
            {
              q: 'How do you design a robust state management strategy for offline-first React applications?',
              criteria: 'Look for knowledge of normalized caching, IndexedDB persistence, and optimistic state updates.'
            },
            {
              q: 'Explain how you identify and mitigate memory leaks and unwanted re-renders in heavy data tables.',
              criteria: 'Evaluates proficiency with Chrome DevTools Profiler, virtualization, and memoization.'
            },
            {
              q: 'How do you enforce multi-tenant isolation and security boundaries in frontend client state?',
              criteria: 'Candidate should emphasize tenant scoping, avoiding leaked session storage, and sanitization.'
            }
          ],
          tokensConsumed: tokenCost
        });
      }
    }, 1200);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" /> AI Recruitment Intelligence
          </h1>
          <p className="text-xs text-slate-500">
            Authorized Gemini AI tools for resume analysis, JD generation, semantic candidate matching, and interview prep
          </p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-amber-800 text-xs font-semibold">
          <Coins className="w-4 h-4 text-amber-600" />
          <span>Balance: 7,160 Tokens</span>
        </div>
      </div>

      {/* Human In The Loop Notice */}
      <div className="bg-blue-50/70 border border-blue-200 p-3 rounded-xl flex items-start gap-2.5 text-xs text-blue-900">
        <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Decision Support Only:</strong> AI outputs assist recruiters in evaluating information faster. Critical hiring, shortlisting, and rejection decisions remain strictly human-controlled.
        </p>
      </div>

      {/* Tool Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { id: 'RESUME_PARSE', label: 'Resume Parser', icon: FileSearch, cost: 50, desc: 'Extract skills & timeline' },
          { id: 'JD_GEN', label: 'JD Assistant', icon: Wand2, cost: 60, desc: 'Draft descriptions & questions' },
          { id: 'MATCH', label: 'Candidate Matcher', icon: UserCheck, cost: 40, desc: 'Semantic score & overlap' },
          { id: 'QUESTIONS', label: 'Interview Questions', icon: HelpCircle, cost: 45, desc: 'Scorecard prompt generator' }
        ].map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTab === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => {
                setActiveTab(tool.id as any);
                setResult(null);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isActive
                  ? 'border-blue-600 bg-white shadow-sm ring-1 ring-blue-600'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                  <Coins className="w-3 h-3" /> {tool.cost} pts
                </span>
              </div>
              <h3 className="text-xs font-bold text-slate-900">{tool.label}</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">{tool.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Tool Execution & Results Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left: Inputs */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {activeTab === 'RESUME_PARSE' && 'Resume Content Input'}
              {activeTab === 'JD_GEN' && 'Job Requisition Parameters'}
              {activeTab === 'MATCH' && 'Job & Candidate Target'}
              {activeTab === 'QUESTIONS' && 'Interview Round Details'}
            </h3>
          </div>

          {activeTab === 'RESUME_PARSE' && (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-700 block">Candidate Resume Text / Bio</label>
              <textarea
                rows={6}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 leading-relaxed focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={() => handleRunAi('AI Resume Analysis', 50)}
                disabled={loading || !resumeText.trim()}
                className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-2xs flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" /> {loading ? 'Analyzing with Gemini...' : 'Extract Profile & Skills (50 Tokens)'}
              </button>
            </div>
          )}

          {activeTab === 'JD_GEN' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Target Job Title</label>
                <input
                  type="text"
                  value={jdTitle}
                  onChange={(e) => setJdTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Department</label>
                <input
                  type="text"
                  value={jdDept}
                  onChange={(e) => setJdDept(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => handleRunAi('Job Description Assistance', 60)}
                disabled={loading || !jdTitle.trim()}
                className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-2xs flex items-center justify-center gap-1.5"
              >
                <Wand2 className="w-4 h-4" /> {loading ? 'Generating JD with AI...' : 'Generate Description Draft (60 Tokens)'}
              </button>
            </div>
          )}

          {activeTab === 'MATCH' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Select Requisition</label>
                <select
                  value={selectedJob}
                  onChange={(e) => setSelectedJob(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                >
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>{j.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Select Candidate</label>
                <select
                  value={selectedCandidate}
                  onChange={(e) => setSelectedCandidate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                >
                  {candidates.map((c) => (
                    <option key={c.id} value={c.id}>{c.name} — {c.title}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => handleRunAi('Candidate-Job Matching', 40)}
                disabled={loading}
                className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-2xs flex items-center justify-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" /> {loading ? 'Evaluating Suitability...' : 'Compute AI Match Score (40 Tokens)'}
              </button>
            </div>
          )}

          {activeTab === 'QUESTIONS' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Target Role</label>
                <input
                  type="text"
                  value={questionRole}
                  onChange={(e) => setQuestionRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Interview Round</label>
                <input
                  type="text"
                  value={questionRound}
                  onChange={(e) => setQuestionRound(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => handleRunAi('Interview Question Generation', 45)}
                disabled={loading}
                className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-2xs flex items-center justify-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4" /> {loading ? 'Formulating Questions...' : 'Generate Interview Questions (45 Tokens)'}
              </button>
            </div>
          )}
        </div>

        {/* Right: Output Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs min-h-[380px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" /> AI Generated Insights
              </span>
              {result && (
                <button
                  onClick={() => handleCopy(JSON.stringify(result, null, 2))}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" /> {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>

            {loading ? (
              <div className="p-12 text-center space-y-3">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div className="text-xs text-slate-500">Gemini AI is processing your recruitment request...</div>
              </div>
            ) : !result ? (
              <div className="p-12 text-center text-slate-400 space-y-2">
                <Sparkles className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs">Configure your inputs on the left and click execute to view AI results.</p>
              </div>
            ) : (
              <div className="mt-4 space-y-4 text-xs">
                {result.type === 'RESUME_PARSE' && (
                  <div className="space-y-3">
                    <div>
                      <div className="text-slate-400 text-[11px]">Recommended Headline</div>
                      <div className="font-bold text-slate-900 text-sm mt-0.5">{result.headline}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[11px]">Calculated Experience</div>
                      <div className="font-semibold text-slate-800">{result.yearsExperience}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[11px] mb-1">Extracted Core Skills</div>
                      <div className="flex flex-wrap gap-1">
                        {result.skills.map((s: string) => (
                          <span key={s} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-medium border border-blue-200">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[11px]">Summary Profile</div>
                      <p className="text-slate-700 leading-relaxed mt-0.5">{result.summary}</p>
                    </div>
                  </div>
                )}

                {result.type === 'JD_GEN' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 leading-relaxed text-slate-800">
                      {result.summary}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 mb-1">Core Responsibilities</div>
                      <ul className="list-disc list-inside space-y-1 text-slate-700">
                        {result.responsibilities.map((r: string, idx: number) => (
                          <li key={idx}>{r}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 mb-1">Key Qualifications</div>
                      <ul className="list-disc list-inside space-y-1 text-slate-700">
                        {result.requirements.map((req: string, idx: number) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {result.type === 'MATCH' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <div className="text-3xl font-black text-emerald-700">{result.score}%</div>
                      <div>
                        <div className="font-bold text-emerald-900">{result.fitRating}</div>
                        <div className="text-[11px] text-emerald-700">{result.summary}</div>
                      </div>
                    </div>

                    <div>
                      <div className="font-bold text-slate-900 mb-1">Strongly Aligned Skills</div>
                      <div className="flex flex-wrap gap-1">
                        {result.overlappingSkills.map((s: string) => (
                          <span key={s} className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[11px]">
                            ✓ {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="font-bold text-slate-900 mb-1">Areas To Probe in Interview</div>
                      <div className="flex flex-wrap gap-1">
                        {result.missingSkills.map((s: string) => (
                          <span key={s} className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[11px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {result.type === 'QUESTIONS' && (
                  <div className="space-y-3">
                    {result.questions.map((item: any, idx: number) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                        <div className="font-bold text-slate-900">
                          {idx + 1}. {item.q}
                        </div>
                        <div className="text-[11px] text-slate-500 italic">
                          <strong className="text-blue-700 not-italic">Evaluation Criteria:</strong> {item.criteria}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {result && (
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Consumed {result.tokensConsumed} tokens</span>
              <span className="text-emerald-600 font-medium">Recorded in organization audit ledger</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
