import React, { useState, useEffect, useRef } from 'react';
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

  // Interactive Keyword Tags System (starts 100% empty)
  const [keywordTags, setKeywordTags] = useState<KeywordTag[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTooltipId, setActiveTooltipId] = useState<string | null>(null);

  // Boolean Search Mode (Matching Screenshot 1)
  const [booleanSearch, setBooleanSearch] = useState(false);
  const [booleanQuery, setBooleanQuery] = useState('');
  const [searchIn, setSearchIn] = useState('Profile');
  const [excludeSynonyms, setExcludeSynonyms] = useState(false);
  const [showAiBanner, setShowAiBanner] = useState(true);

  // Experience Minimum & Maximum (Years only, no months)
  const [experienceMinYears, setExperienceMinYears] = useState<string>('');
  const [experienceMaxYears, setExperienceMaxYears] = useState<string>('');

  // Multi-Location Tag System (Matching Keyword Tags style)
  const [locationTags, setLocationTags] = useState<string[]>([]);
  const [locationInput, setLocationInput] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const allCitiesList = [
    'Ahmedabad',
    'Bengaluru',
    'Chennai',
    'Delhi',
    'Gurugram',
    'Hyderabad',
    'Mumbai',
    'Pune',
    'Kolkata',
    'Noida',
    'Austin',
    'San Francisco',
    'New York',
    'London',
    'Dubai',
    'Remote'
  ];

  // Filter cities: matching search query displays FIRST
  const filteredCities = allCitiesList.filter(
    (c) =>
      !locationTags.includes(c) &&
      (locationInput.trim() === '' || c.toLowerCase().includes(locationInput.toLowerCase().trim()))
  );

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

  // Education Details with Toggle / Undo support
  const [educationOpen, setEducationOpen] = useState(true);
  const [ugQual, setUgQual] = useState<string>('');
  const [pgQual, setPgQual] = useState<string>('');
  const [phdQual, setPhdQual] = useState<string>('');

  // Employment Details
  const [employmentOpen, setEmploymentOpen] = useState(true);
  const [industryInput, setIndustryInput] = useState('');
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [selectedIndustryCategory, setSelectedIndustryCategory] = useState<string>('Software');
  const [selectedSubIndustries, setSelectedSubIndustries] = useState<string[]>([]);
  const [companyInput, setCompanyInput] = useState('');

  const industrySubCategories: Record<string, string[]> = {
    Software: ['Select All', 'Apps', 'Retail Technology', 'Enterprise Applications', 'Text Analytics', 'PaaS'],
    'Media and Entertainment': ['Select All', 'Digital Media', 'Gaming', 'Broadcasting', 'Publishing'],
    'Tech Hardware': ['Select All', 'Semiconductors', 'Embedded Systems', 'IoT Devices', 'Hardware Design'],
    'Banking / Financial Services': ['Select All', 'Fintech', 'Investment Banking', 'Retail Banking', 'Risk & Compliance'],
    'Information Technology': ['Select All', 'IT Services', 'Software Development', 'Data Analytics', 'Cybersecurity'],
    Other: ['Select All', 'Consulting', 'Education', 'Healthcare', 'E-commerce']
  };

  // Additional Details Collapsible
  const [additionalDetailsOpen, setAdditionalDetailsOpen] = useState(true);
  const [genderFilter, setGenderFilter] = useState<string>('');
  const [selectedDiffAbled, setSelectedDiffAbled] = useState<string[]>([]);
  const [languageInput, setLanguageInput] = useState('');
  const [selectedVisas, setSelectedVisas] = useState<string[]>([]);

  // Age
  const [ageMin, setAgeMin] = useState<string>('');
  const [ageMax, setAgeMax] = useState<string>('');
  const [includeNoAge, setIncludeNoAge] = useState(true);

  // Show Only Filters
  const [showOnlyFilters, setShowOnlyFilters] = useState<string[]>([]);

  // Time Range Dropdown
  const [timeRangeFilter, setTimeRangeFilter] = useState<string>('In last 6 months');
  const [timeRangeOpen, setTimeRangeOpen] = useState(false);

  // Search Execution & Results
  const [hasSearched, setHasSearched] = useState(initialQuery ? true : false);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Autocomplete Suggestions for Keyword Tags
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowLocationDropdown(false);
        setShowIndustryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Location Tag Handlers
  const handleAddLocationTag = (cityToAdd: string) => {
    const trimmed = cityToAdd.trim();
    if (trimmed && !locationTags.includes(trimmed)) {
      setLocationTags([...locationTags, trimmed]);
      setLocationInput('');
    }
  };

  const handleKeyDownLocationTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (locationInput.trim()) {
        handleAddLocationTag(locationInput);
      }
    }
  };

  const handleRemoveLocationTag = (cityToRemove: string) => {
    setLocationTags(locationTags.filter((c) => c !== cityToRemove));
  };

  const handleClearAll = () => {
    setKeywordTags([]);
    setTagInput('');
    setBooleanSearch(false);
    setBooleanQuery('');
    setSearchIn('Profile');
    setExperienceMinYears('');
    setExperienceMaxYears('');
    setLocationTags([]);
    setLocationInput('');
    setSalaryMin('');
    setSalaryMax('');
    setNoticePeriod('Any');
    setUgQual('');
    setPgQual('');
    setPhdQual('');
    setIndustryInput('');
    setSelectedSubIndustries([]);
    setCompanyInput('');
    setGenderFilter('');
    setSelectedDiffAbled([]);
    setLanguageInput('');
    setSelectedVisas([]);
    setAgeMin('');
    setAgeMax('');
    setShowOnlyFilters([]);
    setTimeRangeFilter('In last 6 months');
    setHasSearched(false);
  };

  const handleSearch = () => {
    setHasSearched(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const toggleDiffAbled = (item: string) => {
    setSelectedDiffAbled((prev) => (prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]));
  };

  const toggleVisa = (visa: string) => {
    setSelectedVisas((prev) => (prev.includes(visa) ? prev.filter((v) => v !== visa) : [...prev, visa]));
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

    if (mandatoryTags.length > 0) {
      const matchesAllMandatory = mandatoryTags.every((t) => fullCandidateText.includes(t));
      if (!matchesAllMandatory) return false;
    }

    if (mandatoryTags.length === 0 && optionalTags.length > 0) {
      const matchesAnyOptional = optionalTags.some((t) => fullCandidateText.includes(t));
      if (!matchesAnyOptional) return false;
    }

    if (locationTags.length > 0) {
      const matchesLocation = locationTags.some((loc) => cand.location.toLowerCase().includes(loc.toLowerCase()));
      if (!matchesLocation) return false;
    }

    if (experienceMinYears && cand.experienceYears < Number(experienceMinYears)) return false;
    if (experienceMaxYears && cand.experienceYears > Number(experienceMaxYears)) return false;

    return true;
  });

  return (
    <div ref={dropdownRef} className="space-y-6 max-w-6xl mx-auto pb-32 font-sans text-slate-900 select-none animate-in fade-in duration-200">
      
      {/* Top Title & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-indigo-600" />
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Candidate Search
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

      {/* Mode Switcher Tabs */}
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
        
        {/* Card 1: Keywords / Boolean Search & Basic Criteria */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-5">
          
          {/* AI Search Banner (Shown when Boolean Search is Active - Matching Screenshot 1) */}
          {booleanSearch && showAiBanner && (
            <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-4 flex items-start justify-between gap-4 animate-in fade-in duration-150">
              <div className="space-y-0.5">
                <h3 className="text-sm font-extrabold text-slate-900">Search just got smarter!</h3>
                <p className="text-xs text-slate-600 font-medium">
                  Find more relevant results with AI that understands your search intent
                </p>
              </div>
              <button
                onClick={() => setShowAiBanner(false)}
                className="text-slate-400 hover:text-slate-700 rounded-lg p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Keywords or Boolean Search Row */}
          <div>
            {!booleanSearch ? (
              // Standard Keyword Search Mode
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

                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag.id)}
                            className="hover:text-rose-600 rounded-full cursor-pointer ml-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>

                        {tag.isMandatory && activeTooltipId === tag.id && (
                          <div className="absolute bottom-full left-0 mb-1.5 z-50 whitespace-nowrap bg-[#1E1B4B] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-xl animate-in fade-in duration-100">
                            This keyword is marked as 'Mandatory'.
                          </div>
                        )}
                      </div>
                    ))}

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

                  {/* Autocomplete Dropdown */}
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
              </div>
            ) : (
              // Boolean Search Mode (Matching Screenshot 1)
              <div className="space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
                    <span>Boolean search</span>
                    <span className="text-purple-600 font-bold">(AI-powered)</span>
                  </div>

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
                        className="bg-white border border-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                      >
                        <option value="Profile">Profile</option>
                        <option value="Job Title">Job Title</option>
                        <option value="Skills Only">Skills Only</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    value={booleanQuery}
                    onChange={(e) => {
                      if (e.target.value.length <= 300) {
                        setBooleanQuery(e.target.value);
                      }
                    }}
                    rows={4}
                    maxLength={300}
                    placeholder='Try something like: (Java OR J2EE) AND "php" NOT css'
                    className="w-full p-4 bg-white border border-slate-300 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400 resize-none"
                  />
                  <div className="text-right text-[11px] font-bold text-slate-400 mt-1">
                    {booleanQuery.length}/ 300 characters limit
                  </div>
                </div>

                <div className="pt-1">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={excludeSynonyms}
                      onChange={(e) => setExcludeSynonyms(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded border-slate-300"
                    />
                    <span>Exclude synonyms</span>
                    <Info className="w-3.5 h-3.5 text-slate-400" title="Only match exact query terms without AI keyword expansion" />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Experience row (Years only, no months) */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Experience (Minimum)
                </label>
                <div className="relative">
                  <select
                    value={experienceMinYears}
                    onChange={(e) => setExperienceMinYears(e.target.value)}
                    className="w-full appearance-none bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500 cursor-pointer pr-8"
                  >
                    <option value="">Years</option>
                    {[0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 15].map((y) => (
                      <option key={y} value={y}>{y} Years</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Experience (Maximum)
                </label>
                <div className="relative">
                  <select
                    value={experienceMaxYears}
                    onChange={(e) => setExperienceMaxYears(e.target.value)}
                    className="w-full appearance-none bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500 cursor-pointer pr-8"
                  >
                    <option value="">Years</option>
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((y) => (
                      <option key={y} value={y}>{y} Years</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Current Location Multi-Tag System (Matching Keyword Tags style) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Current location
            </label>
            <div className="relative">
              <div className="flex flex-wrap items-center gap-2 p-2.5 min-h-[46px] border border-slate-300 rounded-xl focus-within:ring-2 focus-within:ring-indigo-500 bg-white">
                <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1" />

                {/* Location Tags Chips */}
                {locationTags.map((loc) => (
                  <span
                    key={loc}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200"
                  >
                    <MapPin className="w-3 h-3 text-indigo-500" />
                    <span>{loc}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLocationTag(loc)}
                      className="hover:text-rose-600 rounded-full cursor-pointer ml-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => {
                    setLocationInput(e.target.value);
                    setShowLocationDropdown(true);
                  }}
                  onKeyDown={handleKeyDownLocationTag}
                  onFocus={() => setShowLocationDropdown(true)}
                  placeholder={locationTags.length === 0 ? "Enter current location" : "Add another location"}
                  className="flex-1 min-w-[160px] bg-transparent text-xs font-semibold text-slate-900 border-none focus:outline-none py-1"
                />

                {locationTags.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setLocationTags([])}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded-lg shrink-0 cursor-pointer ml-auto"
                    title="Clear all locations"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Top Cities Dropdown (Searched results shown FIRST at top!) */}
              {showLocationDropdown && (
                <div className="absolute left-0 right-0 mt-1.5 bg-white border border-slate-300 rounded-xl shadow-xl p-4 z-40 max-w-xl animate-in fade-in zoom-in duration-100">
                  <div className="flex items-center justify-between font-bold text-xs text-slate-800 pb-2.5 border-b border-slate-100 mb-2">
                    <span>{locationInput.trim() ? `Matching Cities for "${locationInput}"` : 'In Top Cities'}</span>
                    <div className="flex flex-col text-[10px] text-slate-400 leading-none">
                      <span>▲</span>
                      <span>▼</span>
                    </div>
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-1 pr-2">
                    {filteredCities.length === 0 ? (
                      <div className="text-xs text-slate-400 py-2">No matching city found. Press Enter to add "{locationInput}"</div>
                    ) : (
                      filteredCities.map((city) => (
                        <div
                          key={city}
                          onClick={() => {
                            handleAddLocationTag(city);
                            setShowLocationDropdown(false);
                          }}
                          className="flex items-center justify-between text-xs font-medium text-slate-800 hover:bg-slate-100 p-2 rounded-lg cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{city}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold">+ Select</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
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
                  onClick={() => setNoticePeriod(noticePeriod === item ? '' : item)}
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

        {/* Card 3: Collapsible Education Details (With Toggle / Undo support) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
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
                      onClick={() => setUgQual(ugQual === opt ? '' : opt)}
                      className={`px-4 py-1.5 rounded-full font-bold border transition-all cursor-pointer ${
                        ugQual === opt ? 'bg-indigo-50 text-indigo-700 border-indigo-300 ring-2 ring-indigo-500/20' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
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
                      onClick={() => setPgQual(pgQual === opt ? '' : opt)}
                      className={`px-4 py-1.5 rounded-full font-bold border transition-all cursor-pointer ${
                        pgQual === opt ? 'bg-indigo-50 text-indigo-700 border-indigo-300 ring-2 ring-indigo-500/20' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-bold text-slate-800 mb-2">Doctorate qualification</div>
                <div className="flex items-center gap-2">
                  {(['Any PhD', 'Specific PhD', 'No PhD'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setPhdQual(phdQual === opt ? '' : opt)}
                      className={`px-4 py-1.5 rounded-full font-bold border transition-all cursor-pointer ${
                        phdQual === opt ? 'bg-indigo-50 text-indigo-700 border-indigo-300 ring-2 ring-indigo-500/20' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card 4: Collapsible Employment Details */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
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
                <div className="relative">
                  <input
                    type="text"
                    value={industryInput}
                    onChange={(e) => setIndustryInput(e.target.value)}
                    onFocus={() => setShowIndustryDropdown(true)}
                    placeholder="Enter industry"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  {/* 2-Column Industry Dropdown */}
                  {showIndustryDropdown && (
                    <div className="mt-1.5 bg-white border border-slate-300 rounded-xl shadow-xl p-3 z-40 max-w-2xl grid grid-cols-2 gap-3 divide-x divide-slate-200 animate-in fade-in duration-100">
                      {/* Left Column: Categories */}
                      <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                        {[
                          { name: 'Software', count: 87 },
                          { name: 'Media and Entertainment', count: 60 },
                          { name: 'Tech Hardware', count: 51 },
                          { name: 'Banking / Financial Services', count: 44 },
                          { name: 'Information Technology', count: 43 },
                          { name: 'Other', count: 31 }
                        ].map((cat) => {
                          const isSelectedCat = selectedIndustryCategory === cat.name;
                          return (
                            <div
                              key={cat.name}
                              onClick={() => setSelectedIndustryCategory(cat.name)}
                              className={`flex items-center justify-between p-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                                isSelectedCat ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-50 text-slate-800'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={isSelectedCat}
                                  readOnly
                                  className="w-3.5 h-3.5 text-indigo-600 rounded border-slate-300"
                                />
                                <span>{cat.name} ({cat.count})</span>
                              </div>
                              <span className="text-slate-400 font-bold">&gt;</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Right Column: Sub Categories */}
                      <div className="pl-3 space-y-1.5 max-h-56 overflow-y-auto">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold mb-1">
                          <span>Sub Categories</span>
                          <span>▲▼</span>
                        </div>
                        {industrySubCategories[selectedIndustryCategory]?.map((sub) => {
                          const isChecked = selectedSubIndustries.includes(sub);
                          return (
                            <label
                              key={sub}
                              className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 p-1.5 rounded-lg cursor-pointer select-none"
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  let updated: string[];
                                  if (sub === 'Select All') {
                                    if (isChecked) {
                                      updated = [];
                                    } else {
                                      updated = [...industrySubCategories[selectedIndustryCategory]];
                                    }
                                  } else {
                                    if (isChecked) {
                                      updated = selectedSubIndustries.filter((s) => s !== sub);
                                    } else {
                                      updated = [...selectedSubIndustries, sub];
                                    }
                                  }
                                  setSelectedSubIndustries(updated);
                                  setIndustryInput(updated.filter(s => s !== 'Select All').join(', '));
                                }}
                                className="w-3.5 h-3.5 text-indigo-600 rounded border-slate-300"
                              />
                              <span>{sub}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
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

        {/* Card 5: Collapsible Additional Details */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-5">
          <button
            type="button"
            onClick={() => setAdditionalDetailsOpen(!additionalDetailsOpen)}
            className="w-full flex items-center justify-between text-left text-sm font-extrabold text-slate-900 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <span>Additional details</span>
            </div>
            {additionalDetailsOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {additionalDetailsOpen && (
            <div className="space-y-5 pt-2 text-xs">
              {/* Gender */}
              <div>
                <div className="font-bold text-slate-800 mb-2">Gender</div>
                <div className="flex flex-wrap items-center gap-2">
                  {['Male candidates', 'Female candidates'].map((g) => {
                    const isSelected = genderFilter === g;
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGenderFilter(isSelected ? '' : g)}
                        className={`px-4 py-2 rounded-full font-semibold border text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-300 ring-2 ring-indigo-500/20 shadow-2xs'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span>{g}</span>
                        <span className="font-bold">{isSelected ? '✓' : '+'}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Differently abled */}
              <div>
                <div className="font-bold text-slate-800 mb-2">Differently abled</div>
                <div className="bg-slate-100/90 border border-slate-200/70 text-slate-600 px-3.5 py-2 rounded-xl text-xs font-medium mb-3 flex items-center gap-2 max-w-2xl">
                  <Info className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Filter not applicable to sourced profiles</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {['Developmental', 'Mental', 'Physical'].map((item) => {
                    const isSelected = selectedDiffAbled.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleDiffAbled(item)}
                        className={`px-4 py-2 rounded-full font-semibold border text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-300 ring-2 ring-indigo-500/20 shadow-2xs'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span>{item}</span>
                        <span className="font-bold">{isSelected ? '✓' : '+'}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Languages */}
              <div>
                <div className="font-bold text-slate-800 mb-2">Languages</div>
                <div className="bg-slate-100/90 border border-slate-200/70 text-slate-600 px-3.5 py-2 rounded-xl text-xs font-medium mb-3 flex items-center gap-2 max-w-2xl">
                  <Info className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Filter not applicable to sourced profiles</span>
                </div>
                <input
                  type="text"
                  value={languageInput}
                  onChange={(e) => setLanguageInput(e.target.value)}
                  placeholder="Enter language"
                  className="w-full max-w-xl px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400"
                />
              </div>

              {/* Visa status */}
              <div>
                <div className="font-bold text-slate-800 mb-2">Visa status</div>
                <div className="bg-slate-100/90 border border-slate-200/70 text-slate-600 px-3.5 py-2 rounded-xl text-xs font-medium mb-3 flex items-center gap-2 max-w-2xl">
                  <Info className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Filter not applicable to sourced profiles</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    'Have H1 Visa',
                    'Have L1 Visa',
                    'TN Permit Holder',
                    'Green Card Holder',
                    'US Citizen',
                    'Authorized to work in the US'
                  ].map((v) => {
                    const isSelected = selectedVisas.includes(v);
                    return (
                      <button
                        key={v}
                        type="button"
                        onClick={() => toggleVisa(v)}
                        className={`px-4 py-2 rounded-full font-semibold border text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-300 ring-2 ring-indigo-500/20 shadow-2xs'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span>{v}</span>
                        <span className="font-bold">{isSelected ? '✓' : '+'}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card 6: Age & Show Only Preferences */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-6 text-xs">
          
          {/* Age (Years) */}
          <div className="space-y-3">
            <div className="font-bold text-slate-800 text-sm">Age (Years)</div>
            
            <div className="bg-slate-100/90 border border-slate-200/70 text-slate-600 px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-2 max-w-2xl">
              <Info className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Filter not applicable to sourced profiles</span>
            </div>

            <div className="flex items-center gap-3 max-w-xs">
              <div className="relative flex-1">
                <select
                  value={ageMin}
                  onChange={(e) => setAgeMin(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer pr-8"
                >
                  <option value="">Min</option>
                  {[18, 20, 22, 25, 28, 30, 35, 40, 45, 50].map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>

              <div className="relative flex-1">
                <select
                  value={ageMax}
                  onChange={(e) => setAgeMax(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer pr-8"
                >
                  <option value="">Max</option>
                  {[22, 25, 30, 35, 40, 45, 50, 55, 60, 65].map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Switch toggle */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setIncludeNoAge(!includeNoAge)}
                className="flex items-center gap-2.5 cursor-pointer group select-none"
              >
                <div className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${includeNoAge ? 'bg-[#2D1B69]' : 'bg-slate-300'}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform flex items-center justify-center ${includeNoAge ? 'translate-x-4' : 'translate-x-0'}`}>
                    {includeNoAge && <span className="text-[9px] text-[#2D1B69] font-black">✓</span>}
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-800">Include profiles without age</span>
              </button>
            </div>
          </div>

          {/* Show only section */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="font-bold text-slate-800 text-sm">Show only</div>
            <div className="flex flex-wrap items-center gap-2">
              {[
                'Unseen profiles',
                'Profiles with verified email-id',
                'Profiles with verified mobile no.',
                'Profiles with resume'
              ].map((item) => {
                const isSelected = showOnlyFilters.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleShowOnly(item)}
                    className={`px-4 py-2 rounded-full font-semibold border text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-300 ring-2 ring-indigo-500/20 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item}</span>
                    <span className="font-bold">{isSelected ? '✓' : '+'}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-xl z-40 flex items-center justify-between px-6 lg:px-12">
        <div className="relative">
          <button
            type="button"
            onClick={() => setTimeRangeOpen(!timeRangeOpen)}
            className="bg-white border border-slate-300 px-4 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <span>{timeRangeFilter}</span>
            <ChevronUp className={`w-4 h-4 text-slate-500 transition-transform ${timeRangeOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Time Range Dropdown Menu Popup */}
          {timeRangeOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
              <div className="max-h-60 overflow-y-auto divide-y divide-slate-100">
                {[
                  'In last 1 day',
                  'In last 3 days',
                  'In last 7 days',
                  'In last 15 days',
                  'In last 1 month',
                  'In last 3 months',
                  'In last 6 months'
                ].map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => {
                      setTimeRangeFilter(range);
                      setTimeRangeOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      timeRangeFilter === range
                        ? 'bg-slate-100 text-indigo-700 font-extrabold'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>{range}</span>
                    {timeRangeFilter === range && (
                      <ChevronUp className="w-3.5 h-3.5 text-indigo-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
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
                Matching query criteria within Clyptus Talent Directory
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
