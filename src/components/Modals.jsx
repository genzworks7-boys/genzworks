import React, { memo } from 'react';
import {
  FileText,
  ShieldCheck,
  X,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { BRAND_CONFIG } from '../data/brand.jsx';
import { LEGAL_DOCS } from '../data/legal.js';
import { CAREER_ROLES } from '../data/team.js';

export const CurtainLoader = memo(function CurtainLoader({ loaderPhase }) {
  if (loaderPhase === 'done') return null;

  return (
    <div
      style={{
        transform: loaderPhase === 'curtain' ? 'translateY(-100%)' : 'translateY(0%)',
        transition: 'transform 0.88s cubic-bezier(0.76, 0, 0.24, 1)'
      }}
      className="fixed inset-0 z-[9500] bg-[#0B0B0D] text-white flex flex-col items-center justify-center select-none overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1.5 h-24 bg-[#00F0FF] shadow-[0_0_18px_#00F0FF]" />

      <div
        style={{
          opacity: loaderPhase === 'curtain' ? 0 : 1,
          transform: loaderPhase === 'curtain' ? 'translateY(-24px) scale(0.96)' : 'translateY(0px) scale(1)',
          transition: 'opacity 0.38s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="relative flex flex-col items-center"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 mb-5 flex items-center justify-center">
          <img
            src="/logo.png"
            alt="GENZWORKS Studio"
            className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(0,240,255,0.75)]"
          />
        </div>
        <div className="flex items-baseline gap-2.5 sm:gap-3.5 text-3xl sm:text-5xl md:text-[54px] tracking-[-0.03em] pb-3.5 sm:pb-4">
          <span
            style={{
              opacity: loaderPhase === 'are-you' || loaderPhase === 'ready' || loaderPhase === 'curtain' ? 1 : 0,
              transform:
                loaderPhase === 'are-you' || loaderPhase === 'ready' || loaderPhase === 'curtain'
                  ? 'translateY(0px)'
                  : 'translateY(14px)',
              transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="font-semibold text-white"
          >
            Are you
          </span>

          <span
            style={{
              opacity: loaderPhase === 'ready' || loaderPhase === 'curtain' ? 1 : 0.12,
              transform:
                loaderPhase === 'ready' || loaderPhase === 'curtain'
                  ? 'translateY(0px)'
                  : 'translateY(10px)',
              transition: 'opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="font-normal text-white/95"
          >
            ready?
          </span>
        </div>

        <div className="w-full h-[1.5px] bg-white/15 overflow-hidden rounded-full">
          <div
            style={{
              width:
                loaderPhase === 'start'
                  ? '0%'
                  : loaderPhase === 'are-you'
                  ? '48%'
                  : '100%',
              transition: 'width 0.65s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
            className="h-full bg-white"
          />
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-white/15" />
    </div>
  );
});

export const LegalModal = memo(function LegalModal({
  activeLegalModal,
  setActiveLegalModal,
  jumpTo
}) {
  if (!activeLegalModal) return null;

  return (
    <div
      onClick={() => setActiveLegalModal(null)}
      className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl w-full rounded-[32px] border border-white/15 bg-[#0C0C10] text-white p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.75)] relative max-h-[88vh] flex flex-col framer-hero-card"
      >
        {/* Top Bar with Tab Switcher & Close Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => setActiveLegalModal('terms')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all ${
                activeLegalModal === 'terms'
                  ? 'bg-[#D9FF3F] text-black shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms &amp; Conditions</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveLegalModal('privacy')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all ${
                activeLegalModal === 'privacy'
                  ? 'bg-[#D9FF3F] text-black shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setActiveLegalModal(null)}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#FF4F18] text-white text-xs font-mono-tech font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <span>Close</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Scrollable Document Content */}
        <div className="overflow-y-auto pr-2 py-6 space-y-6 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4F18]/15 border border-[#FF4F18]/30 text-[#FF4F18] font-mono-tech text-[11px] font-bold">
              <span>{LEGAL_DOCS[activeLegalModal].badge}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {LEGAL_DOCS[activeLegalModal].title}
            </h2>
            <div className="text-xs font-mono-tech text-zinc-400">
              {LEGAL_DOCS[activeLegalModal].updated} • GENZWORKS Studio (Coimbatore, TN)
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-2 border-t border-white/10">
              {LEGAL_DOCS[activeLegalModal].summary}
            </p>
          </div>

          <div className="space-y-4">
            {LEGAL_DOCS[activeLegalModal].sections.map((sec, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D9FF3F]/40 transition-colors"
              >
                <h4 className="text-sm sm:text-base font-extrabold text-[#D9FF3F] mb-2">
                  {sec.heading}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 shrink-0">
          <span>Questions about our policies? Reach us at <strong className="text-white">{BRAND_CONFIG.email}</strong></span>
          <button
            type="button"
            onClick={() => {
              setActiveLegalModal(null);
              jumpTo('contact');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#D9FF3F] text-black font-extrabold uppercase tracking-wider text-[11px] hover:bg-lime-300 transition-colors"
          >
            Acknowledge &amp; Continue
          </button>
        </div>
      </div>
    </div>
  );
});

export const JoinTeamModal = memo(function JoinTeamModal({
  isJoinTeamModalOpen,
  setIsJoinTeamModalOpen,
  isSubmittingJoin,
  joinSubmitted,
  setJoinSubmitted,
  joinForm,
  setJoinForm,
  handleJoinSubmit,
  joinError
}) {
  if (!isJoinTeamModalOpen) return null;

  const isFresher = joinForm.experience === 'Fresher / Student';

  return (
    <div
      onClick={() => {
        if (!isSubmittingJoin) setIsJoinTeamModalOpen(false);
      }}
      className="fixed inset-0 z-[125] bg-black/85 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-xl w-full rounded-[24px] sm:rounded-[32px] border border-white/15 bg-[#0C0C10] text-white p-5 sm:p-7 shadow-[0_30px_90px_rgba(0,0,0,0.85)] relative my-auto max-h-[92vh] flex flex-col framer-hero-card"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 sm:pb-4 border-b border-white/10 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-medium text-zinc-300 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9FF3F] animate-pulse" />
              <span>Join the Crew</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Build with <span className="font-editorial italic font-normal text-[#D9FF3F]">GENZWORKS.</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
              Fast-track your application in 60 seconds.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (!isSubmittingJoin) setIsJoinTeamModalOpen(false);
            }}
            disabled={isSubmittingJoin}
            className="p-2 rounded-full bg-white/10 hover:bg-[#FF4F18] text-white transition-all shrink-0 hover:rotate-90 cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content: Success State vs Form */}
        {joinSubmitted ? (
          <div className="py-12 px-4 sm:px-8 text-center flex flex-col items-center justify-center space-y-5 my-auto">
            <div className="w-16 h-16 rounded-full bg-[#D9FF3F]/20 border border-[#D9FF3F]/40 flex items-center justify-center text-[#D9FF3F] shadow-[0_0_30px_rgba(217,255,63,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-md">
              <h3 className="text-2xl font-extrabold text-white">Application Received!</h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Thank you, <strong className="text-[#D9FF3F]">{joinForm.fullName}</strong>. Your application for <strong className="text-white">{joinForm.role}</strong> has been successfully recorded in our hiring database.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed pt-2">
                Our lead team (Mohammed Ali Khan &amp; founders) reviews every application. If your profile matches our requirements, we'll reach out within 48-72 hours.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setJoinSubmitted(false);
                setIsJoinTeamModalOpen(false);
                setJoinForm({
                  fullName: '',
                  email: '',
                  phone: '',
                  location: '',
                  role: 'Full-Stack Developer',
                  customRole: '',
                  experience: 'Fresher / Student',
                  availability: 'Full-Time',
                  skills: '',
                  portfolio: '',
                  github: '',
                  linkedin: '',
                  resumeLink: '',
                  pitch: ''
                });
              }}
              className="px-8 py-3 rounded-full bg-[#D9FF3F] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-lime-300 transition-all shadow-lg cursor-pointer"
            >
              Done &amp; Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleJoinSubmit} className="overflow-y-auto pr-1 sm:pr-2 py-4 space-y-4 sm:space-y-5 text-left">
            {joinError && (
              <div className="p-3 rounded-2xl bg-[#FF4F18]/15 border border-[#FF4F18]/40 text-[#FF8566] text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#FF4F18]" />
                <span>{joinError}</span>
              </div>
            )}

            {/* Role Selector Pills */}
            <div className="space-y-1.5">
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-mono-tech">
                Role applying for:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {CAREER_ROLES.map((roleName) => {
                  const isSelected = joinForm.role === roleName;
                  return (
                    <button
                      key={roleName}
                      type="button"
                      onClick={() => setJoinForm({ ...joinForm, role: roleName })}
                      className={`px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#D9FF3F] text-[#08080A] border-[#D9FF3F] shadow-sm font-bold'
                          : 'bg-white/[0.05] text-zinc-400 border-white/15 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {roleName}
                    </button>
                  );
                })}
              </div>

              {joinForm.role === 'Other Creative' && (
                <div className="pt-1.5">
                  <input
                    type="text"
                    required
                    value={joinForm.customRole || ''}
                    onChange={(e) => setJoinForm({ ...joinForm, customRole: e.target.value })}
                    placeholder="Specify your role (e.g. 3D Animator, Sound Designer)"
                    className="w-full bg-transparent border-b border-white/25 focus:border-[#D9FF3F] py-2 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                  />
                </div>
              )}
            </div>

            {/* Experience Level */}
            <div className="space-y-1.5">
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-mono-tech">
                Experience:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['Fresher / Student', '1-2 Years', '3-5 Years', '5+ Years'].map((exp) => {
                  const isSelected = joinForm.experience === exp;
                  return (
                    <button
                      key={exp}
                      type="button"
                      onClick={() => setJoinForm({ ...joinForm, experience: exp })}
                      className={`px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#D9FF3F] text-[#08080A] border-[#D9FF3F] font-bold shadow-sm'
                          : 'bg-white/[0.05] text-zinc-400 border-white/15 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {exp}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clean Minimalist Inputs */}
            <div className="space-y-3 pt-1">
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-mono-tech">
                Your Details:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 sm:gap-y-4">
                <div>
                  <input
                    required
                    type="text"
                    value={joinForm.fullName}
                    onChange={(e) => setJoinForm({ ...joinForm, fullName: e.target.value })}
                    placeholder="Your name *"
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <input
                    required
                    type="email"
                    value={joinForm.email}
                    onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                    placeholder="Your email *"
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <input
                    required
                    type="tel"
                    value={joinForm.phone}
                    onChange={(e) => setJoinForm({ ...joinForm, phone: e.target.value })}
                    placeholder="Phone / WhatsApp *"
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <input
                    required
                    type="url"
                    value={joinForm.resumeLink}
                    onChange={(e) => setJoinForm({ ...joinForm, resumeLink: e.target.value })}
                    placeholder="Resume link (Drive / Notion) *"
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <input
                    required={!isFresher}
                    type="url"
                    value={joinForm.portfolio}
                    onChange={(e) => setJoinForm({ ...joinForm, portfolio: e.target.value })}
                    placeholder={isFresher ? "Portfolio or GitHub link (optional)" : "Portfolio or GitHub link *"}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <input
                    required={!isFresher}
                    type="url"
                    value={joinForm.linkedin}
                    onChange={(e) => setJoinForm({ ...joinForm, linkedin: e.target.value })}
                    placeholder={isFresher ? "LinkedIn link (optional)" : "LinkedIn link *"}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={joinForm.pitch}
                    onChange={(e) => setJoinForm({ ...joinForm, pitch: e.target.value })}
                    placeholder="Short note or why you want to join (optional)"
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Submit Row */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-end">
              <button
                type="submit"
                disabled={isSubmittingJoin}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#D9FF3F] hover:bg-lime-300 text-[#08080A] font-extrabold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl hover:shadow-[0_0_25px_rgba(217,255,63,0.35)] transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmittingJoin ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
});

export const ToastNotification = memo(function ToastNotification({ toast }) {
  if (!toast) return null;

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#0E0E10] text-white text-xs font-bold tracking-wide shadow-2xl border border-white/15 framer-spring">
      <span className="w-2 h-2 rounded-full bg-[#D9FF3F] animate-pulse" />
      <span>{toast}</span>
    </div>
  );
});
