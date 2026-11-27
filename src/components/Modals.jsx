import React, { useState, useEffect, useRef, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import {
  X,
  FileText,
  ShieldCheck,
  User,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { BRAND_CONFIG } from '../data/brand.jsx';
import { LEGAL_DOCS } from '../data/legal.js';
import { CAREER_ROLES } from '../data/team.js';

const INITIAL_JOIN_FORM = {
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
};

// Self-contained cursor tracker — desktop fine pointer only, 0 App re-renders
function CustomCursor() {
  const cursorDotRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    let rafId = null;
    let lastX = -100;
    let lastY = -100;

    const onMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = null;
          if (cursorDotRef.current) {
            cursorDotRef.current.style.transform = `translate3d(${lastX}px, ${lastY}px, 0)`;
            cursorDotRef.current.style.opacity = '1';
          }
        });
      }
    };

    const onLeave = () => {
      if (cursorDotRef.current) {
        cursorDotRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorDotRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] w-4 h-4 rounded-full bg-[#FF4F18] shadow-[0_0_16px_rgba(255,79,24,0.95)] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 ease-out hidden lg:block opacity-0"
      style={{
        willChange: 'transform',
        transform: 'translate3d(-100px, -100px, 0)'
      }}
    />
  );
}

const Modals = React.memo(function Modals({
  loaderPhase,
  toast,
  activeLegalModal,
  setActiveLegalModal,
  isJoinTeamModalOpen,
  setIsJoinTeamModalOpen,
  triggerToast
}) {
  const [joinForm, setJoinForm] = useState(INITIAL_JOIN_FORM);
  const [isSubmittingJoin, setIsSubmittingJoin] = useState(false);
  const [joinSubmitted, setJoinSubmitted] = useState(false);
  const [joinError, setJoinError] = useState(null);

  const isFresher = joinForm.experience === 'Fresher / Student';

  const handleJoinTeamSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isSubmittingJoin) return;

      if (!joinForm.fullName.trim()) {
        setJoinError('Please enter your name.');
        return;
      }
      if (!joinForm.email.trim() || !/\S+@\S+\.\S+/.test(joinForm.email)) {
        setJoinError('Please provide a valid email address.');
        return;
      }
      if (!joinForm.phone.trim() || joinForm.phone.trim().length < 7) {
        setJoinError('Please enter a valid phone or WhatsApp number.');
        return;
      }
      if (!joinForm.resumeLink.trim()) {
        setJoinError('Resume link (Google Drive / Notion) is mandatory.');
        return;
      }

      if (!isFresher) {
        if (!joinForm.portfolio.trim()) {
          setJoinError('Portfolio or GitHub link is mandatory for experienced applicants.');
          return;
        }
        if (!joinForm.linkedin.trim()) {
          setJoinError('LinkedIn profile link is mandatory for experienced applicants.');
          return;
        }
      }

      setJoinError(null);
      setIsSubmittingJoin(true);

      const resolvedRole =
        joinForm.role === 'Other Creative' && joinForm.customRole?.trim()
          ? `Other: ${joinForm.customRole.trim()}`
          : joinForm.role;

      const rawJoinPhone = joinForm.phone.trim();
      const safeJoinPhone = rawJoinPhone.startsWith('+') ? `'${rawJoinPhone}` : rawJoinPhone;

      const payload = {
        formType: 'join_team',
        action: 'join_team',
        fullName: joinForm.fullName.trim(),
        email: joinForm.email.trim(),
        phone: safeJoinPhone,
        location: 'Coimbatore / Remote',
        role: resolvedRole,
        experience: joinForm.experience,
        availability: joinForm.availability || 'Full-Time',
        skills: resolvedRole,
        portfolio: joinForm.portfolio?.trim() || (isFresher ? 'Not provided (Fresher)' : '—'),
        github: joinForm.portfolio?.trim() || (isFresher ? 'Not provided (Fresher)' : '—'),
        linkedin: joinForm.linkedin?.trim() || (isFresher ? 'Not provided (Fresher)' : '—'),
        resumeLink: joinForm.resumeLink.trim(),
        pitch: joinForm.pitch?.trim() || 'Applied via website'
      };

      try {
        const scriptUrl = BRAND_CONFIG.joinTeamScriptUrl || BRAND_CONFIG.googleSheetScriptUrl;

        if (scriptUrl && scriptUrl.trim() !== '') {
          const formParams = new URLSearchParams();
          Object.keys(payload).forEach((key) => {
            formParams.append(key, payload[key]);
          });

          await fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formParams.toString()
          });
        }

        setJoinSubmitted(true);
        triggerToast('Application sent! Our team will review it soon.');
      } catch (err) {
        console.error('Join team submission error:', err);
        setJoinSubmitted(true);
        triggerToast('Application sent! Our team will review it soon.');
      } finally {
        setIsSubmittingJoin(false);
      }
    },
    [joinForm, isFresher, isSubmittingJoin, triggerToast]
  );

  return (
    <>
      <CustomCursor />

      {/* Full-Screen "Are you ready?" Curtain Loader Animation */}
      {loaderPhase !== 'done' && (
        <div
          style={{
            transform: loaderPhase === 'curtain' ? 'translate3d(0, -100%, 0)' : 'translate3d(0, 0, 0)',
            transition: 'transform 0.88s cubic-bezier(0.76, 0, 0.24, 1)',
            willChange: 'transform'
          }}
          className={`fixed inset-0 z-[9500] bg-[#0B0B0D] text-white flex flex-col items-center justify-center select-none overflow-hidden ${
            loaderPhase === 'curtain' ? 'pointer-events-none' : ''
          }`}
        >
          <div
            style={{
              opacity: loaderPhase === 'curtain' ? 0 : 1,
              transform: loaderPhase === 'curtain' ? 'translate3d(0, -24px, 0) scale(0.96)' : 'translate3d(0, 0, 0) scale(1)',
              transition: 'opacity 0.38s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="relative flex flex-col items-center"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 mb-5 flex items-center justify-center">
              <img
                src="/logo.webp"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/logo.png';
                }}
                alt="GENZWORKS Studio"
                decoding="async"
                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(0,240,255,0.75)]"
              />
            </div>
            <div className="flex items-baseline gap-2.5 sm:gap-3.5 text-3xl sm:text-5xl md:text-[54px] tracking-[-0.03em] pb-3.5 sm:pb-4">
              <span
                style={{
                  opacity: loaderPhase === 'are-you' || loaderPhase === 'ready' || loaderPhase === 'curtain' ? 1 : 0,
                  transform:
                    loaderPhase === 'are-you' || loaderPhase === 'ready' || loaderPhase === 'curtain'
                      ? 'translate3d(0, 0, 0)'
                      : 'translate3d(0, 14px, 0)',
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
                      ? 'translate3d(0, 0, 0)'
                      : 'translate3d(0, 10px, 0)',
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
                  transform:
                    loaderPhase === 'start'
                      ? 'scaleX(0)'
                      : loaderPhase === 'are-you'
                      ? 'scaleX(0.48)'
                      : 'scaleX(1)',
                  transition: 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
                className="w-full h-full origin-left bg-white"
              />
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-white/15" />
        </div>
      )}

      {/* Interactive Legal Modal (Terms of Use & Privacy Policy) */}
      <AnimatePresence>
        {activeLegalModal && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setActiveLegalModal(null)}
            className="fixed inset-0 z-[9000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <m.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[85vh] rounded-[32px] bg-[#0E0E12] border border-white/15 text-white p-6 sm:p-10 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-2 pb-3 sm:pb-4 border-b border-white/10 shrink-0">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#D9FF3F] text-black shadow text-[11px] sm:text-xs font-extrabold uppercase tracking-wider whitespace-nowrap">
                  {activeLegalModal === 'terms' ? (
                    <>
                      <FileText className="w-3.5 h-3.5 shrink-0" />
                      <span>Terms &amp; Conditions</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>Privacy Policy</span>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setActiveLegalModal(null)}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 hover:bg-[#FF4F18] text-white text-[11px] sm:text-xs font-mono-tech font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0 whitespace-nowrap transition-colors"
                >
                  <span>Close</span>
                  <X className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>

              {/* Scrollable Document Content */}
              <div key={activeLegalModal} className="overflow-y-auto pr-2 pt-5 pb-2 space-y-5 text-left">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                    {LEGAL_DOCS[activeLegalModal].title}
                  </h2>
                  <div className="text-xs font-mono-tech text-zinc-400">
                    {LEGAL_DOCS[activeLegalModal].updated}
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
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Join Our Team Application Modal */}
      <AnimatePresence>
        {isJoinTeamModalOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => {
              setIsJoinTeamModalOpen(false);
              if (joinSubmitted) setJoinSubmitted(false);
              setJoinError(null);
            }}
            className="fixed inset-0 z-[9100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <m.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] rounded-[32px] bg-[#0E0E12] border border-white/15 text-white p-6 sm:p-9 shadow-2xl overflow-y-auto flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 shrink-0 rounded-full bg-[#FF4F18]/15 border border-[#FF4F18]/30 text-[#FF4F18] flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">Join The GENZWORKS Squad</h3>
                    <p className="text-[11px] text-zinc-400">Coimbatore, TN • In-Person / Remote Hybrid</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsJoinTeamModalOpen(false);
                    if (joinSubmitted) setJoinSubmitted(false);
                    setJoinError(null);
                  }}
                  className="w-8 h-8 shrink-0 rounded-full bg-white/10 hover:bg-[#FF4F18] text-white flex items-center justify-center transition-colors cursor-pointer"
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
                      setJoinSubmitted(false);
                      setJoinForm(INITIAL_JOIN_FORM);
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#D9FF3F] text-black font-extrabold text-xs uppercase tracking-wider hover:scale-105 transition-transform mt-4"
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
                            onClick={() => setJoinForm((f) => ({ ...f, role: r }))}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold text-left border transition-colors ${
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
                    {joinForm.role === 'Other Creative' && (
                      <div className="mt-3">
                        <input
                          type="text"
                          value={joinForm.customRole}
                          onChange={(e) => setJoinForm((f) => ({ ...f, customRole: e.target.value }))}
                          placeholder="Specify your creative or technical role *"
                          className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                        />
                      </div>
                    )}
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
                          onClick={() => setJoinForm((f) => ({ ...f, experience: exp }))}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold text-center border transition-colors ${
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
                          onChange={(e) => setJoinForm((f) => ({ ...f, fullName: e.target.value }))}
                          placeholder="Full Name *"
                          className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <input
                          required
                          type="email"
                          value={joinForm.email}
                          onChange={(e) => setJoinForm((f) => ({ ...f, email: e.target.value }))}
                          placeholder="Email Address *"
                          className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <input
                          required
                          type="tel"
                          value={joinForm.phone}
                          onChange={(e) => setJoinForm((f) => ({ ...f, phone: e.target.value }))}
                          placeholder="Phone / WhatsApp *"
                          className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <input
                          required
                          type="url"
                          value={joinForm.resumeLink}
                          onChange={(e) => setJoinForm((f) => ({ ...f, resumeLink: e.target.value }))}
                          placeholder="Resume link (Drive / Notion) *"
                          className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <input
                          required={!isFresher}
                          type="url"
                          value={joinForm.portfolio}
                          onChange={(e) => setJoinForm((f) => ({ ...f, portfolio: e.target.value }))}
                          placeholder={isFresher ? 'Portfolio or GitHub link (optional)' : 'Portfolio or GitHub link *'}
                          className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <input
                          type="url"
                          value={joinForm.linkedin}
                          onChange={(e) => setJoinForm((f) => ({ ...f, linkedin: e.target.value }))}
                          placeholder={isFresher ? 'LinkedIn link (optional)' : 'LinkedIn link *'}
                          className="w-full bg-transparent border-b border-white/20 focus:border-[#D9FF3F] py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={joinForm.pitch}
                          onChange={(e) => setJoinForm((f) => ({ ...f, pitch: e.target.value }))}
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
                      className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#D9FF3F] hover:bg-lime-300 active:scale-95 text-[#08080A] font-extrabold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-[background-color,transform] duration-200 cursor-pointer disabled:opacity-50"
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
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toast && (
          <m.div
            initial={{ opacity: 0, y: -12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.94 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 right-4 sm:top-6 sm:right-6 z-[9600] max-w-[calc(100vw-2rem)] flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#0E0E10] text-white text-xs font-bold tracking-wide shadow-2xl border border-white/15"
          >
            <span className="w-2 h-2 rounded-full bg-[#D9FF3F] animate-pulse" />
            <span>{toast}</span>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default Modals;
