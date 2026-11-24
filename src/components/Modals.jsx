import React from 'react';
import {
  X,
  FileText,
  ShieldCheck,
  User,
  Briefcase,
  Code2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { BRAND_CONFIG } from '../data/brand.jsx';
import { LEGAL_DOCS } from '../data/legal.js';
import { CAREER_ROLES } from '../data/team.js';

export default function Modals({
  cursorDotRef,
  loaderPhase,
  toast,
  activeLegalModal,
  setActiveLegalModal,
  isJoinTeamModalOpen,
  setIsJoinTeamModalOpen,
  joinForm,
  setJoinForm,
  isFresher,
  isSubmittingJoin,
  joinSubmitted,
  joinError,
  handleJoinTeamSubmit
}) {
  return (
    <>
      {/* Custom Red Point Cursor */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-4 h-4 rounded-full bg-[#FF4F18] shadow-[0_0_16px_rgba(255,79,24,0.95)] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 ease-out hidden lg:block opacity-0"
        style={{
          willChange: 'transform',
          transform: 'translate3d(-100px, -100px, 0)'
        }}
      />

      {/* Full-Screen "Are you ready?" Curtain Loader Animation */}
      {loaderPhase !== 'done' && (
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
      )}

      {/* Interactive Legal Modal (Terms of Use & Privacy Policy) */}
      {activeLegalModal && (
        <div
          onClick={() => setActiveLegalModal(null)}
          className="fixed inset-0 z-[9000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[85vh] rounded-[32px] bg-[#0E0E12] border border-white/15 text-white p-6 sm:p-10 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <button
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
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                      {sec.heading}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 shrink-0">
              <span>GENZWORKS Studio • Coimbatore, Tamil Nadu</span>
              <button
                onClick={() => setActiveLegalModal(null)}
                className="text-[#D9FF3F] hover:underline font-bold"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Our Team Application Modal */}
      {isJoinTeamModalOpen && (
        <div
          onClick={() => setIsJoinTeamModalOpen(false)}
          className="fixed inset-0 z-[9100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] rounded-[32px] bg-[#0E0E12] border border-white/15 text-white p-6 sm:p-9 shadow-2xl overflow-y-auto flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FF4F18]/15 border border-[#FF4F18]/30 text-[#FF4F18] flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">Join The GENZWORKS Squad</h3>
                  <p className="text-[11px] text-zinc-400">Coimbatore, TN • In-Person / Remote Hybrid</p>
                </div>
              </div>

              <button
                onClick={() => setIsJoinTeamModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF4F18] text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {joinSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold">Application Received!</h4>
                <p className="text-sm text-zinc-300 max-w-md leading-relaxed">
                  Thanks for reaching out! Our team lead will review your profile, portfolio, and code repositories within 48 hours.
                </p>
                <button
                  onClick={() => {
                    setIsJoinTeamModalOpen(false);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#D9FF3F] text-black font-extrabold text-xs uppercase tracking-wider hover:scale-105 transition-all mt-4"
                >
                  Back to Portfolio
                </button>
              </div>
            ) : (
              <form onSubmit={handleJoinTeamSubmit} className="py-6 space-y-6 text-left">
                {joinError && (
                  <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{joinError}</span>
                  </div>
                )}

                {/* Primary Role Selector */}
                <div>
                  <label className="text-xs font-mono-tech text-zinc-400 uppercase tracking-wider block mb-2">
                    Primary Role / Passion *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {CAREER_ROLES.map((r) => {
                      const isSelected = joinForm.role === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setJoinForm({ ...joinForm, role: r })}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold text-left border transition-all ${
                            isSelected
                              ? 'bg-[#FF4F18] text-white border-[#FF4F18] shadow'
                              : 'bg-white/[0.04] text-zinc-300 border-white/10 hover:border-white/25'
                          }`}
                        >
                          {r}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Experience Tier Selector */}
                <div>
                  <label className="text-xs font-mono-tech text-zinc-400 uppercase tracking-wider block mb-2">
                    Experience Level *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Fresher / Student', '1-2 Years', '3+ Years', 'Freelancer'].map((exp) => (
                      <button
                        key={exp}
                        type="button"
                        onClick={() => setJoinForm({ ...joinForm, experience: exp })}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                          joinForm.experience === exp
                            ? 'bg-[#D9FF3F] text-black border-[#D9FF3F] font-bold shadow'
                            : 'bg-white/[0.04] text-zinc-300 border-white/10 hover:border-white/25'
                        }`}
                      >
                        {exp}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personal Information Inputs */}
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        required
                        type="text"
                        value={joinForm.fullName}
                        onChange={(e) => setJoinForm({ ...joinForm, fullName: e.target.value })}
                        placeholder="Full Name *"
                        className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        required
                        type="email"
                        value={joinForm.email}
                        onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                        placeholder="Email Address *"
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
      )}

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#0E0E10] text-white text-xs font-bold tracking-wide shadow-2xl border border-white/15 framer-spring">
          <span className="w-2 h-2 rounded-full bg-[#D9FF3F] animate-pulse" />
          <span>{toast}</span>
        </div>
      )}
    </>
  );
}
