import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import {
  Search,
  Sparkles,
  MapPin,
  Briefcase,
  GraduationCap,
  X,
  Plus,
  Info,
  ChevronDown,
  ChevronUp,
  Bookmark,
  ExternalLink,
  CheckCircle2,
  Globe,
  SlidersHorizontal,
  Mail,
  Phone,
  FileText,
  Star
} from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';

interface KeywordTag {
  id: string;
  text: string;
  isMandatory: boolean;
}

export const CandidateSearch: React.FC = () => {
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const { candidates } = useRecruiterStore();

  // Search Mode Tabs
  const [searchMode, setSearchMode] = useState<'form' | 'jd'>('form');
  const [selectedCountry, setSelectedCountry] = useState('India');

  // Interactive Keyword Tags System (Matching Screenshots 1, 2, 3)
  const [keywordTags, setKeywordTags] = useState<KeywordTag[]>([
    { id: '1', text: 'ai', isMandatory: true },
    { id: '2', text: 'frontend', isMandatory: false },
    { id: '3', text: 'Backend Developer', isMandatory: true }
  ]);
  const [tagInput, setTagInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTooltipId, setActiveTooltipId] = useState<string | null>('1');

  const [booleanSearch, setBooleanSearch] = useState(false);
  const [searchIn, setSearchIn] = useState('Profile');
  const [excludeSynonyms, setExcludeSynonyms] = useState(false);
  const [showExcludeKeywords, setShowExcludeKeywords] = useState(false);
  const [excludeKeywordInput, setExcludeKeywordInput] = useState('');

  // Experience
  const [experienceMin, setExperienceMin] = useState<string>('');
  const [experienceMax, setExperienceMax] = useState<string>('');
  const [showMonths, setShowMonths] = useState(false);

  // Location
  const [currentLocation, setCurrentLocation] = useState('');
  const [includeRelocating, setIncludeRelocating] = useState(true);
  const [showPreferredLocation, setShowPreferredLocation] = useState(false);
  const [preferredLocationInput, setPreferredLocationInput] = useState('');

  // Salary
  const [salaryMin, setSalaryMin] = useState<string>('');
  const [salaryMax, setSalaryMax] = useState<string>('');
  const [includeNoSalary, setIncludeNoSalary] = useState(true);

  // Notice Period
  const [noticePeriod, setNoticePeriod] = useState<string>('Any');
  const [noticePeriodType, setNoticePeriodType] = useState<'without' | 'serving'>('without');

  // Education & Employment Collapsibles
  const [educationOpen, setEducationOpen] = useState(true);
  const [ugQual, setUgQual] = useState<'Any UG' | 'Specific UG' | 'No UG'>('Any UG');
  const [pgQual, setPgQual] = useState<'Any PG' | 'Specific PG' | 'No PG'>('Any PG');

  const [employmentOpen, setEmploymentOpen] = useState(true);
  const [industryInput, setIndustryInput] = useState('');
  const [companyInput, setCompanyInput] = useState('');

  // Visa & Filters
  const [selectedVisas, setSelectedVisas] = useState<string[]>([]);
  const [hideCandidatesWith, setHideCandidatesWith] = useState<string[]>([]);
  const [showOnlyFilters, setShowOnlyFilters] = useState<string[]>([]);

  // Search Execution & Results
  const [hasSearched, setHasSearched] = useState(initialQuery ? true : false);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  // Autocomplete Suggestions
  const availableSuggestions = [
    'Frontend',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Engineer',
    'React',
    'TypeScript',
    'Node.js',
    'Python',
    'Java',
    'System Design',
    'DevOps',
    'PostgreSQL'
  ].filter(
    (s) =>
      tagInput.trim().length > 0 &&
      s.toLowerCase().includes(tagInput.toLowerCase().trim()) &&
      !keywordTags.some((t) => t.text.toLowerCase() === s.toLowerCase())
  );

  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam !== null && queryParam.trim().length > 0) {
      // Parse initial query into tags if provided
      const terms = queryParam
        .replace(/["()]/g, '')
        .split(/\s+AND\s+|\s+OR\s+|\s+/)
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      if (terms.length > 0) {
        setKeywordTags(
          terms.map((t, idx) => ({
            id: Date.now().toString() + idx,
            text: t,
            isMandatory: idx === 0
          }))
        );
      }
      setHasSearched(true);
    }
  }, [searchParams]);

  const handleAddTag = (textToAdd: string) => {
    const trimmed = textToAdd.trim();
    if (trimmed && !keywordTags.some((t) => t.text.toLowerCase() === trimmed.toLowerCase())) {
      setKeywordTags([
        ...keywordTags,
        { id: Date.now().toString(), text: trimmed, isMandatory: false }
      ]);
      setTagInput('');
      setShowSuggestions(false);
    }
  };

  const handleKeyDownTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (tagInput.trim()) {
        handleAddTag(tagInput);
      }
    }
  };

  const toggleTagMandatory = (id: string) => {
    setKeywordTags(
      keywordTags.map((t) => (t.id === id ? { ...t, isMandatory: !t.isMandatory } : t))
    );
  };

  const handleRemoveTag = (id: string) => {
    setKeywordTags(keywordTags.filter((t) => t.id !== id));
  };

  const handleClearAll = () => {
    setKeywordTags([]);
    setTagInput('');
    setBooleanSearch(false);
    setSearchIn('Profile');
    setExcludeSynonyms(false);
    setExperienceMin('');
    setExperienceMax('');
    setCurrentLocation('');
    setSalaryMin('');
    setSalaryMax('');
    setNoticePeriod('Any');
    setUgQual('Any UG');
    setPgQual('Any PG');
    setIndustryInput('');
    setCompanyInput('');
    setSelectedVisas([]);
    setHideCandidatesWith([]);
    setShowOnlyFilters([]);
    setHasSearched(false);
  };

  const handleSearch = () => {
    setHasSearched(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const toggleVisa = (visa: string) => {
    setSelectedVisas((prev) => (prev.includes(visa) ? prev.filter((v) => v !== visa) : [...prev, visa]));
  };

  const toggleHideCandidate = (item: string) => {
    setHideCandidatesWith((prev) => (prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]));
  };

  const toggleShowOnly = (item: string) => {
    setShowOnlyFilters((prev) => (prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]));
  };

  const toggleSave = (id: string) => {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  // Filter candidates matching tags and experience
  const filteredCandidates = candidates.filter((cand) => {
    const mandatoryTags = keywordTags.filter((t) => t.isMandatory).map((t) => t.text.toLowerCase());
    const optionalTags = keywordTags.filter((t) => !t.isMandatory).map((t) => t.text.toLowerCase());

    const fullCandidateText = `${cand.name} ${cand.title} ${cand.skills.join(' ')} ${cand.location} ${cand.summary || ''}`.toLowerCase();

    // Must match ALL mandatory tags if any exist
    if (mandatoryTags.length > 0) {
      const matchesAllMandatory = mandatoryTags.every((t) => fullCandidateText.includes(t));
      if (!matchesAllMandatory) return false;
    }

    // Must match at least ONE optional tag if no mandatory tags exist
    if (mandatoryTags.length === 0 && optionalTags.length > 0) {
      const matchesAnyOptional = optionalTags.some((t) => fullCandidateText.includes(t));
      if (!matchesAnyOptional) return false;
    }

    if (currentLocation.trim() && !cand.location.toLowerCase().includes(currentLocation.toLowerCase())) {
      return false;
    }

    if (experienceMin && cand.experienceYears < Number(experienceMin)) return false;
    if (experienceMax && cand.experienceYears > Number(experienceMax)) return false;

    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-32 font-sans text-slate-900 select-none animate-in fade-in duration-200">
      
      {/* Top Title & Mode Switcher (Clean Header) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-indigo-600" />
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Find the right candidates with AI
          </h1>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800">
          <Globe className="w-3.5 h-3.5 text-indigo-600" />
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="UAE">UAE</option>
          </select>
        </div>
      </div>

      {/* Mode Switcher Tabs (Removed BETA badge and Voice Search as requested) */}
      <div className="flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-2xl max-w-md border border-slate-200">
        <button
          onClick={() => setSearchMode('form')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer text-center ${
            searchMode === 'form' ? 'bg-white text-indigo-700 shadow-2xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Search form
        </button>

        <button
          onClick={() => setSearchMode('jd')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer text-center ${
            searchMode === 'jd' ? 'bg-white text-indigo-700 shadow-2xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Search by Job Description
        </button>
      </div>

      {/* Main Search Form */}
      <div className="space-y-6">
        
        {/* Card 1: Keywords & Basic Criteria */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-5">
          
          {/* Keywords row (Interactive Tag Input Box matching Screenshots 1, 2, 3) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-800">
                Keywords
              </label>
              
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={booleanSearch}
                    onChange={(e) => setBooleanSearch(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                  />
                  <span>Boolean search</span>
                </label>

                <div className="flex items-center gap-1">
                  <span>Search in</span>
                  <select
                    value={searchIn}
                    onChange={(e) => setSearchIn(e.target.value)}
                    className="bg-slate-50 border border-slate-300 px-2.5 py-1 rounded-lg text-xs font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="Profile">Profile</option>
                    <option value="Job Title">Job Title</option>
                    <option value="Skills Only">Skills Only</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tag Input Box */}
            <div className="relative">
              <div className="flex flex-wrap items-center gap-2 p-2.5 min-h-[46px] border border-slate-300 rounded-xl focus-within:ring-2 focus-within:ring-indigo-500 bg-white">
                <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1" />

                {/* Tag Chips */}
                {keywordTags.map((tag) => (
                  <div key={tag.id} className="relative group">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all border ${
                        tag.isMandatory
                          ? 'bg-purple-100 text-purple-900 border-purple-300 shadow-2xs'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {/* Star Button for Mandatory Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleTagMandatory(tag.id)}
                        onMouseEnter={() => setActiveTooltipId(tag.id)}
                        onMouseLeave={() => setActiveTooltipId(null)}
                        className="cursor-pointer focus:outline-none transition-transform hover:scale-110"
                        title={tag.isMandatory ? "Marked as Mandatory" : "Click to mark as Mandatory"}
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            tag.isMandatory
                              ? 'text-purple-700 fill-purple-700'
                              : 'text-slate-400 hover:text-purple-600'
                          }`}
                        />
                      </button>

                      <span>{tag.text}</span>

                      {/* Remove Tag Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag.id)}
                        className="hover:text-rose-600 rounded-full cursor-pointer ml-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>

                    {/* Tooltip for Mandatory Keyword */}
                    {tag.isMandatory && activeTooltipId === tag.id && (
                      <div className="absolute bottom-full left-0 mb-1.5 z-50 whitespace-nowrap bg-[#1E1B4B] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-xl animate-in fade-in duration-100">
                        This keyword is marked as 'Mandatory'.
                      </div>
                    )}
                  </div>
                ))}

                {/* Text input inside box */}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => {
                    setTagInput(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onKeyDown={handleKeyDownTag}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder={keywordTags.length === 0 ? "Enter keywords like Skills and Job Title" : "Type another keyword"}
                  className="flex-1 min-w-[160px] bg-transparent text-xs font-semibold text-slate-900 border-none focus:outline-none py-1"
                />

                {/* Clear All Keywords Button */}
                {keywordTags.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setKeywordTags([])}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded-lg shrink-0 cursor-pointer ml-auto"
                    title="Clear all keywords"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Autocomplete Dropdown (Matching Screenshot 2) */}
              {showSuggestions && availableSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in duration-100">
                  {availableSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleAddTag(suggestion)}
                      className="w-full px-4 py-2 text-left text-xs font-bold text-slate-800 hover:bg-slate-100 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span>{suggestion}</span>
                      <span className="text-[10px] text-slate-400 font-normal">+ Add Tag</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 mt-2 text-xs">
              <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={excludeSynonyms}
                  onChange={(e) => setExcludeSynonyms(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300"
                />
                <span>Exclude synonyms</span>
                <Info className="w-3.5 h-3.5 text-slate-400" title="Only match exact query terms without AI keyword expansion" />
              </label>

              <button
                type="button"
                onClick={() => setShowExcludeKeywords(!showExcludeKeywords)}
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add keywords to exclude from search
              </button>
            </div>

            {showExcludeKeywords && (
              <div className="mt-2">
                <input
                  type="text"
                  value={excludeKeywordInput}
                  onChange={(e) => setExcludeKeywordInput(e.target.value)}
                  placeholder="Enter keywords to exclude (e.g. Intern, Trainee)"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
                />
              </div>
            )}
          </div>

          {/* Experience row */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Experience (Minimum)
                </label>
                <select
                  value={experienceMin}
                  onChange={(e) => setExperienceMin(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="">Years</option>
                  {[0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 15].map((y) => (
                    <option key={y} value={y}>{y} Years</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Experience (Maximum)
                </label>
                <div className="flex items-center gap-3">
                  <select
                    value={experienceMax}
                    onChange={(e) => setExperienceMax(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="">Years</option>
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((y) => (
                      <option key={y} value={y}>{y} Years</option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => setShowMonths(!showMonths)}
                    className="text-xs font-bold text-indigo-600 hover:underline shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add months
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Current Location row */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Current location
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                placeholder="Enter current location (e.g. San Francisco, Austin, Remote)"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between mt-2.5 text-xs font-semibold">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeRelocating}
                  onChange={(e) => setIncludeRelocating(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300"
                />
                <span className="text-slate-800">Include relocating candidates</span>
              </label>

              <button
                type="button"
                onClick={() => setShowPreferredLocation(!showPreferredLocation)}
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add different preferred location
              </button>
            </div>

            {showPreferredLocation && (
              <div className="mt-2">
                <input
                  type="text"
                  value={preferredLocationInput}
                  onChange={(e) => setPreferredLocationInput(e.target.value)}
                  placeholder="Enter preferred work location"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Annual Salary & Notice Period */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-5">
          
          {/* Annual Salary */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Annual Salary (Minimum)
                </label>
                <select
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="">Lacs</option>
                  <option value="3">3 Lacs</option>
                  <option value="5">5 Lacs</option>
                  <option value="8">8 Lacs</option>
                  <option value="12">12 Lacs</option>
                  <option value="18">18 Lacs</option>
                  <option value="25">25 Lacs</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Annual Salary (Maximum)
                </label>
                <div className="flex items-center gap-3">
                  <select
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="">Lacs</option>
                    <option value="6">6 Lacs</option>
                    <option value="10">10 Lacs</option>
                    <option value="15">15 Lacs</option>
                    <option value="22">22 Lacs</option>
                    <option value="30">30 Lacs</option>
                    <option value="50">50 Lacs+</option>
                  </select>

                  <button
                    type="button"
                    className="text-xs font-bold text-indigo-600 hover:underline shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add thousands
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-2 text-xs">
              <label className="flex items-center gap-2 font-semibold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeNoSalary}
                  onChange={(e) => setIncludeNoSalary(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300"
                />
                <span>Include profiles who have not mentioned current salary</span>
              </label>
            </div>
          </div>

          {/* Notice Period Pills */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700">
              Notice period
            </label>
            
            <div className="flex flex-wrap items-center gap-2">
              {['Immediate joiner', 'Upto 30 days', 'Upto 45 days', 'Upto 60 days', 'Upto 90 days', 'Any'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setNoticePeriod(item)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                    noticePeriod === item
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-300 ring-2 ring-indigo-500/20'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-6 text-xs font-semibold text-slate-800 pt-1">
              <span className="text-slate-600">Include candidates:</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="noticeType"
                  checked={noticePeriodType === 'without'}
                  onChange={() => setNoticePeriodType('without')}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Without notice period</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="noticeType"
                  checked={noticePeriodType === 'serving'}
                  onChange={() => setNoticePeriodType('serving')}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Serving notice period</span>
              </label>
            </div>
          </div>
        </div>

        {/* Card 3: Collapsible Education & Employment Details */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
          
          {/* Education Details */}
          <div className="p-6 space-y-4">
            <button
              type="button"
              onClick={() => setEducationOpen(!educationOpen)}
              className="w-full flex items-center justify-between text-left text-sm font-extrabold text-slate-900 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <span>Education details</span>
              </div>
              {educationOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {educationOpen && (
              <div className="space-y-4 pt-2 text-xs">
                <div>
                  <div className="font-bold text-slate-800 mb-2">Under graduation qualification</div>
                  <div className="flex items-center gap-2">
                    {(['Any UG', 'Specific UG', 'No UG'] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setUgQual(opt)}
                        className={`px-4 py-1.5 rounded-full font-bold border transition-all cursor-pointer ${
                          ugQual === opt ? 'bg-indigo-50 text-indigo-700 border-indigo-300' : 'bg-white text-slate-700 border-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="font-bold text-slate-800 mb-2">Post graduation qualification</div>
                  <div className="flex items-center gap-2">
                    {(['Any PG', 'Specific PG', 'No PG'] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setPgQual(opt)}
                        className={`px-4 py-1.5 rounded-full font-bold border transition-all cursor-pointer ${
                          pgQual === opt ? 'bg-indigo-50 text-indigo-700 border-indigo-300' : 'bg-white text-slate-700 border-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <button type="button" className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer">
                    + Add Doctorate qualification
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Employment Details */}
          <div className="p-6 space-y-4">
            <button
              type="button"
              onClick={() => setEmploymentOpen(!employmentOpen)}
              className="w-full flex items-center justify-between text-left text-sm font-extrabold text-slate-900 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                <span>Employment details</span>
              </div>
              {employmentOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {employmentOpen && (
              <div className="space-y-4 pt-2 text-xs">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Industry</label>
                  <input
                    type="text"
                    value={industryInput}
                    onChange={(e) => setIndustryInput(e.target.value)}
                    placeholder="Enter industry (e.g. IT Software, Fintech, Healthcare)"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="text-[11px] text-slate-400 mt-1 font-medium">Include: Current or past industry</div>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Company</label>
                  <input
                    type="text"
                    value={companyInput}
                    onChange={(e) => setCompanyInput(e.target.value)}
                    placeholder="Enter company name"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="text-[11px] text-slate-400 mt-1 font-medium">Include: Current employees</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card 4: Advanced Visa & Filter Preferences */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-5 text-xs">
          <div>
            <div className="font-bold text-slate-800 mb-2">Visa status</div>
            <div className="flex flex-wrap items-center gap-2">
              {['Have H1 Visa', 'Have L1 Visa', 'TN Permit Holder', 'Green Card Holder', 'US Citizen', 'Authorized to work in the US'].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => toggleVisa(v)}
                  className={`px-3.5 py-1.5 rounded-full font-bold border transition-all cursor-pointer ${
                    selectedVisas.includes(v)
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-300 ring-1 ring-indigo-200'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {v} +
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="font-bold text-slate-800 mb-2">Hide candidates with</div>
            <div className="flex flex-wrap items-center gap-2">
              {['Already contacted by SMS', 'Already contacted by Email', 'Already downloaded resumes'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleHideCandidate(item)}
                  className={`px-3.5 py-1.5 rounded-full font-bold border transition-all cursor-pointer ${
                    hideCandidatesWith.includes(item)
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-300 ring-1 ring-indigo-200'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {item} +
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="font-bold text-slate-800 mb-2">Show only</div>
            <div className="flex flex-wrap items-center gap-2">
              {['Unseen profiles', 'Profiles with verified email-id', 'Profiles with verified mobile no.', 'Profiles with resume'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleShowOnly(item)}
                  className={`px-3.5 py-1.5 rounded-full font-bold border transition-all cursor-pointer ${
                    showOnlyFilters.includes(item)
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-300 ring-1 ring-indigo-200'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {item} +
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-xl z-30 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-3 text-xs font-semibold">
          <select className="bg-slate-50 border border-slate-300 px-3.5 py-2 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 cursor-pointer">
            <option>In last 6 months</option>
            <option>In last 3 months</option>
            <option>In last 1 month</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs font-extrabold text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            Clear All
          </button>

          <button
            type="button"
            onClick={handleSearch}
            className="px-8 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl text-xs font-extrabold shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search Candidates</span>
          </button>
        </div>
      </div>

      {/* Search Results Area */}
      {hasSearched && (
        <div className="mt-12 space-y-4 pt-6 border-t-2 border-indigo-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Search Results ({filteredCandidates.length} Candidates Found)
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Matching keyword tags within Clyptus Talent Directory
              </p>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              ↑ Back to Search Filters
            </button>
          </div>

          {filteredCandidates.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <div className="text-sm font-bold text-slate-700">No candidates found matching your criteria.</div>
              <div className="text-xs text-slate-400 mt-1">Try broadening your keywords or location filters.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCandidates.map((cand) => {
                const isSaved = savedIds.includes(cand.id);

                return (
                  <div
                    key={cand.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={cand.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'}
                          alt={cand.name}
                          className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <h3
                            onClick={() => navigate(`/org/${organizationId}/recruiter/candidates/${cand.id}`)}
                            className="font-extrabold text-sm text-slate-900 hover:text-indigo-600 cursor-pointer"
                          >
                            {cand.name}
                          </h3>
                          <div className="text-xs font-medium text-slate-600">{cand.title}</div>
                          <div className="text-[11px] text-slate-400 font-medium">📍 {cand.location} • {cand.experienceYears} Years Exp</div>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold rounded-full">
                        {cand.matchScore || 92}% Match
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {cand.skills.map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-bold">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <button
                        onClick={() => toggleSave(cand.id)}
                        className={`font-bold flex items-center gap-1 cursor-pointer ${isSaved ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}
                      >
                        <Bookmark className="w-3.5 h-3.5" /> {isSaved ? 'Saved Profile' : 'Save Profile'}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => alert(`Email invitation dispatched to ${cand.name}`)}
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Mail className="w-3.5 h-3.5" /> Email
                        </button>
                        <button
                          onClick={() => navigate(`/org/${organizationId}/recruiter/candidates/${cand.id}`)}
                          className="px-3.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-lg transition-colors cursor-pointer"
                        >
                          View Resume
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
