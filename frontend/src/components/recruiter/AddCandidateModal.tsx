import React, { useState, useRef } from 'react';
import { X, Upload, User, Mail, Phone, MapPin, Briefcase, Award, FileText } from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';

interface AddCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCandidateModal: React.FC<AddCandidateModalProps> = ({ isOpen, onClose }) => {
  const { addCandidate } = useRecruiterStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('Senior Full Stack Engineer');
  const [location, setLocation] = useState('San Francisco, CA');
  const [experienceYears, setExperienceYears] = useState<number>(5);
  const [currentCompany, setCurrentCompany] = useState('');
  const [skillsText, setSkillsText] = useState('React, TypeScript, Node.js, PostgreSQL');
  const [summary, setSummary] = useState('');
  const [resumeUrl, setResumeUrl] = useState<string>('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
  const [resumeFileName, setResumeFileName] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setResumeUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert('Please provide candidate name and email.');
      return;
    }

    const created = addCandidate({
      name,
      email,
      phone,
      title,
      location,
      experienceYears,
      currentCompany: currentCompany || 'Independent Candidate',
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250`,
      skills: skillsText.split(',').map((s) => s.trim()).filter((s) => s.length > 0),
      education: 'B.S. Computer Science / Equivalent',
      resumeUrl,
      matchScore: 92,
      overallRating: 4.8,
      availability: 'Immediate / 2 Weeks',
      summary: summary || `${title} with ${experienceYears} years of hands-on technical experience.`,
      workHistory: [
        {
          company: currentCompany || 'Tech Enterprise',
          role: title,
          duration: '2022 - Present',
          description: summary || 'Led full-stack application development and team deliverables.'
        }
      ],
      educationList: [
        {
          degree: 'B.S. Computer Science',
          institution: 'University',
          year: '2016 - 2020'
        }
      ],
      projects: [],
      certifications: []
    });

    alert(`Candidate ${created.name} added successfully!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 animate-in fade-in zoom-in duration-150 font-sans text-slate-900">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600" /> Add Real Candidate Profile
            </h3>
            <p className="text-xs text-slate-500">
              Register candidate details and attach their real PDF resume
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* PDF Resume Upload Section */}
          <div className="bg-indigo-50/60 border border-dashed border-indigo-300 rounded-2xl p-4 text-center space-y-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center">
              <FileText className="w-8 h-8 text-indigo-600 mb-1" />
              <div className="font-bold text-slate-800 text-xs">
                {resumeFileName ? `Attached PDF: ${resumeFileName}` : 'Attach Real Candidate Resume (PDF)'}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Select a PDF file from your computer to embed inline</p>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors inline-flex items-center gap-1.5 shadow-2xs"
            >
              <Upload className="w-3.5 h-3.5" /> Choose PDF File
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Candidate Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rachel Adams"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rachel.adams@example.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
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
                placeholder="+1 (555) 987-6543"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Professional Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Senior React Developer"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                City / Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="San Francisco, CA"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Experience (Years)
              </label>
              <input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Current Company
            </label>
            <input
              type="text"
              value={currentCompany}
              onChange={(e) => setCurrentCompany(e.target.value)}
              placeholder="e.g. Acme Software Corp"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Key Skills (Comma separated)
            </label>
            <input
              type="text"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              placeholder="React, TypeScript, Node.js, GraphQL"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Profile Summary
            </label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief summary of candidate background and achievements..."
              className="w-full px-3 py-2 border border-slate-300 rounded-xl"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold rounded-xl shadow-xs"
            >
              Save Candidate Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
