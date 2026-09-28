import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Eye, EyeOff, Lock, Mail, AlertCircle, Check } from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';

export const RecruiterLogin: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useRecruiterStore();

  const [email, setEmail] = useState('sarah.jenkins@clyptus.com');
  const [password, setPassword] = useState('Recruiter@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState(false);

  const validate = (): boolean => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    const emailTrimmed = email.trim();
    if (!emailTrimmed) {
      setEmailError('Email address is required');
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailTrimmed)) {
        setEmailError('Please enter a valid email address');
        isValid = false;
      }
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    setGeneralError('');

    try {
      // Simulate authenticating against existing auth service
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Validate recruiter role / credentials
      if (email.trim().toLowerCase().includes('admin') && !email.trim().toLowerCase().includes('recruiter')) {
        setGeneralError('Access denied: Only authorized recruiter accounts can access this portal.');
        setIsLoading(false);
        return;
      }

      // Success redirect to Recruiter Portal Dashboard
      const orgSlug = profile.organizationId || 'clyptus';
      navigate(`/org/${orgSlug}/recruiter/dashboard`);
    } catch {
      setGeneralError('Invalid email or password. Please verify your credentials.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 py-12 font-sans antialiased text-[#111827]">
      {/* Centered Login Card */}
      <div className="w-full max-w-[420px] bg-white rounded-xl border border-slate-200 shadow-sm p-8 space-y-6">
        {/* Top Header */}
        <div className="text-center space-y-2">
          {/* Logo / Icon */}
          <div className="w-12 h-12 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mx-auto border border-blue-100">
            <Briefcase className="w-6 h-6 text-[#2563EB]" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-[#1E3A8A]">
            Employer Login
          </h1>
          <p className="text-sm text-slate-500">
            Sign in to access your employer portal
          </p>
        </div>

        {/* General Error Banner */}
        {generalError && (
          <div className="bg-blue-50 border border-blue-200 text-blue-900 px-3.5 py-2.5 rounded-lg text-xs flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
            <span>{generalError}</span>
          </div>
        )}

        {/* Forgot Password Notice */}
        {forgotPasswordMessage && (
          <div className="bg-blue-50 border border-blue-200 text-blue-900 px-3.5 py-2.5 rounded-lg text-xs flex items-start gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
            <span>Password reset link sent to your organization administrator for security verification.</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* 1. Email Address */}
          <div className="space-y-1.5 text-left">
            <label htmlFor="email" className="block text-xs font-semibold text-[#111827]">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                disabled={isLoading}
                placeholder="Enter your email"
                className={`w-full pl-9 pr-3.5 py-2.5 bg-white border rounded-lg text-sm text-[#111827] placeholder-slate-400 transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] ${
                  emailError ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                }`}
              />
            </div>
            {emailError && (
              <p className="text-[11px] text-red-600 font-medium">{emailError}</p>
            )}
          </div>

          {/* 2. Password */}
          <div className="space-y-1.5 text-left">
            <label htmlFor="password" className="block text-xs font-semibold text-[#111827]">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError('');
                }}
                disabled={isLoading}
                placeholder="Enter your password"
                className={`w-full pl-9 pr-10 py-2.5 bg-white border rounded-lg text-sm text-[#111827] placeholder-slate-400 transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] ${
                  passwordError ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                title={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-[#2563EB] transition-colors p-0.5"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {passwordError && (
              <p className="text-[11px] text-red-600 font-medium">{passwordError}</p>
            )}
          </div>

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              onClick={() => setForgotPasswordMessage(true)}
              className="text-[#2563EB] hover:text-[#1E3A8A] font-medium hover:underline transition-colors cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          {/* Primary Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white text-sm font-semibold rounded-lg shadow-xs hover:shadow-sm disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </button>
          </div>
        </form>

        {/* Footer text */}
        <div className="pt-2 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            Don't have an account?{' '}
            <span className="text-[#2563EB] font-medium">Contact your organization administrator.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
