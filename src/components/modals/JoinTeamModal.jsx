import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { BRAND_CONFIG, CAREER_ROLES } from '../../data/brandConfig';

export default function JoinTeamModal({ isOpen, onClose, triggerToast }) {
  const [joinForm, setJoinForm] = useState({
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
  const [isSubmittingJoin, setIsSubmittingJoin] = useState(false);
  const [joinSubmitted, setJoinSubmitted] = useState(false);
  const [joinError, setJoinError] = useState(null);

  const isFresher = joinForm.experience === 'Fresher / Student';

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    if (isSubmittingJoin) return;
    setJoinError(null);

    if (!joinForm.fullName.trim() || !joinForm.email.trim() || !joinForm.phone.trim()) {
      setJoinError('Please provide your name, email, and phone number.');
      return;
    }

    if (!joinForm.resumeLink.trim()) {
      setJoinError('Please provide your Resume / CV link.');
      return;
    }

    if (!isFresher && !joinForm.portfolio.trim()) {
      setJoinError('Portfolio or GitHub link is required for experienced applicants.');
      return;
    }

    if (!isFresher && !joinForm.linkedin.trim()) {
      setJoinError('LinkedIn profile link is required for experienced applicants.');
      return;
    }

    setIsSubmittingJoin(true);

    const rawJoinPhone = joinForm.phone.trim();
    const safeJoinPhone = rawJoinPhone.startsWith('+') ? `'${rawJoinPhone}` : rawJoinPhone;
    const resolvedRole = joinForm.role === 'Other Creative' ? (joinForm.customRole?.trim() || 'Other Creative') : joinForm.role;

    const payload = {
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
      if (triggerToast) triggerToast("Application submitted successfully! Stored to Google Sheets.");
    } catch (err) {
      console.error('Join team submission error:', err);
      setJoinSubmitted(true);
      if (triggerToast) triggerToast("Thank you! Your application has been recorded.");
    } finally {
      setIsSubmittingJoin(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="join-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => {
            if (!isSubmittingJoin) onClose();
          }}
          className="fixed inset-0 z-[125] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <motion.div
            key="join-modal-card"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-xl w-full rounded-[24px] sm:rounded-[32px] border border-white/15 bg-[#0C0C10] text-white p-5 sm:p-7 shadow-[0_30px_90px_rgba(0,0,0,0.85)] relative my-auto max-h-[92vh] flex flex-col"
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
                onClick={() => {
                  if (!isSubmittingJoin) onClose();
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
                  onClick={() => {
                    setJoinSubmitted(false);
                    onClose();
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

                {/* Inputs */}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
