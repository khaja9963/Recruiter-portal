import React, { useState } from 'react';
import { X, Star, CheckCircle, AlertCircle, XCircle, Award, MessageSquare } from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';
import { Interview, RecommendationType } from '../../types/recruiter.types';

interface InterviewFeedbackModalProps {
  interview: Interview | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InterviewFeedbackModal: React.FC<InterviewFeedbackModalProps> = ({
  interview,
  isOpen,
  onClose
}) => {
  const { addInterviewFeedback, profile } = useRecruiterStore();

  const [techScore, setTechScore] = useState<number>(interview?.feedback?.technicalScore || 4);
  const [commScore, setCommScore] = useState<number>(interview?.feedback?.communicationScore || 4);
  const [problemScore, setProblemScore] = useState<number>(interview?.feedback?.problemSolvingScore || 4);
  const [suitabilityScore, setSuitabilityScore] = useState<number>(interview?.feedback?.suitabilityScore || 4);
  const [recommendation, setRecommendation] = useState<RecommendationType>(interview?.feedback?.recommendation || 'Proceed');
  const [strengths, setStrengths] = useState(interview?.feedback?.strengths || '');
  const [weaknesses, setWeaknesses] = useState(interview?.feedback?.weaknesses || '');
  const [comments, setComments] = useState(interview?.feedback?.comments || '');

  if (!isOpen || !interview) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInterviewFeedback(interview.id, {
      technicalScore: techScore,
      communicationScore: commScore,
      problemSolvingScore: problemScore,
      suitabilityScore: suitabilityScore,
      recommendation,
      strengths,
      weaknesses,
      comments,
      submittedBy: profile.name
    });
    onClose();
  };

  const renderRatingStars = (label: string, value: number, onChange: (val: number) => void) => (
    <div className="flex items-center justify-between py-1">
      <span className="text-xs font-medium text-slate-700">{label}</span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`p-1 transition-colors ${
              star <= value ? 'text-amber-400' : 'text-slate-200 hover:text-amber-200'
            }`}
          >
            <Star className="w-5 h-5 fill-current" />
          </button>
        ))}
        <span className="ml-2 text-xs font-bold text-slate-600 w-4">{value}/5</span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-100 text-indigo-700 rounded-md">
                {interview.roundName}
              </span>
              <h3 className="font-semibold text-slate-900">Interview Feedback</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Evaluating <strong className="text-slate-700">{interview.candidateName}</strong> for{' '}
              <span className="text-slate-700">{interview.jobTitle}</span>
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-sm max-h-[80vh] overflow-y-auto">
          {/* Skill Ratings */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-600" /> Key Competencies Assessment
            </h4>
            {renderRatingStars('Technical Skills', techScore, setTechScore)}
            {renderRatingStars('Communication', commScore, setCommScore)}
            {renderRatingStars('Problem Solving', problemScore, setProblemScore)}
            {renderRatingStars('Role & Cultural Fit', suitabilityScore, setSuitabilityScore)}
          </div>

          {/* Recommendation Options */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Hiring Recommendation
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setRecommendation('Proceed')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border font-medium text-xs transition-all ${
                  recommendation === 'Proceed'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <CheckCircle className="w-4 h-4" /> Proceed to Next
              </button>
              <button
                type="button"
                onClick={() => setRecommendation('Hold')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border font-medium text-xs transition-all ${
                  recommendation === 'Hold'
                    ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <AlertCircle className="w-4 h-4" /> Hold / Standby
              </button>
              <button
                type="button"
                onClick={() => setRecommendation('Reject')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border font-medium text-xs transition-all ${
                  recommendation === 'Reject'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <XCircle className="w-4 h-4" /> Reject Candidate
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Key Strengths
              </label>
              <textarea
                rows={3}
                value={strengths}
                onChange={(e) => setStrengths(e.target.value)}
                placeholder="Highlight candidate's strongest points..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Areas for Improvement
              </label>
              <textarea
                rows={3}
                value={weaknesses}
                onChange={(e) => setWeaknesses(e.target.value)}
                placeholder="Key growth areas or reservations..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Detailed Feedback & Summary
            </label>
            <textarea
              rows={3}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Provide context for your recommendation..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-xs transition-colors"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
