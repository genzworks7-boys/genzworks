import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ShieldCheck, X } from 'lucide-react';
import { LEGAL_DOCS } from '../../data/legalData.js';
import { BRAND_CONFIG } from '../../data/brandConfig';

export default function LegalModal({ activeLegalModal, setActiveLegalModal, jumpTo }) {
  return (
    <AnimatePresence>
      {activeLegalModal && (
        <motion.div
          key="legal-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setActiveLegalModal(null)}
          className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
        >
          <motion.div
            key="legal-modal-card"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full rounded-[32px] border border-white/15 bg-[#0C0C10] text-white p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.75)] relative max-h-[88vh] flex flex-col"
          >
            {/* Top Bar with Tab Switcher & Close Button */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
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
                onClick={() => {
                  setActiveLegalModal(null);
                  jumpTo('contact');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#D9FF3F] text-black font-extrabold uppercase tracking-wider text-[11px] hover:bg-lime-300 transition-colors cursor-pointer"
              >
                Acknowledge &amp; Continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
