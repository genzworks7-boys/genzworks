import React, { memo } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { WHY_GENZWORKS_PILLARS } from '../data/whyUs.js';

const WhyUsSection = memo(function WhyUsSection({
  activeWhyIndex,
  setActiveWhyIndex,
  expandedWhyIndex,
  setExpandedWhyIndex
}) {
  return (
    <section id="why-us" className="py-24 border-y border-current/10 relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
        <div className="max-w-3xl mb-16">
          <div className="font-mono-tech text-xs uppercase tracking-widest text-[#FF4F18] font-bold mb-3">
            [02] / WHY GENZWORKS?
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Different Minds. One <span className="font-editorial italic font-normal underline decoration-[#FF4F18]">Forward Vision.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base opacity-80 leading-relaxed">
            We believe great digital experiences emerge when technology, creativity, and collaboration work together.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16 relative">
          <div
            id="why-sticky-nav"
            className="w-full lg:w-[36%] lg:sticky lg:top-28 self-start z-20"
          >
            <div className="relative py-2 space-y-1.5">
              {WHY_GENZWORKS_PILLARS.map((p, i) => {
                const isCurrent = activeWhyIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveWhyIndex(i);
                      const el = document.getElementById(`why-card-${i}`);
                      if (el) {
                        const y = el.getBoundingClientRect().top + window.scrollY - 112;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }}
                    className={`group w-full text-left py-2.5 px-3 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center cursor-pointer ${
                      isCurrent
                        ? 'opacity-100 translate-x-2'
                        : 'opacity-70 hover:opacity-100 translate-x-0'
                    }`}
                  >
                    <span
                      className={`text-[#FF4F18] font-extrabold text-lg leading-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center ${
                        isCurrent
                          ? 'opacity-100 translate-x-0 w-5 mr-1.5 scale-110'
                          : 'opacity-0 -translate-x-3 w-0 mr-0 scale-75 overflow-hidden'
                      }`}
                    >
                      ›
                    </span>
                    <span
                      className={`text-base sm:text-[17px] tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isCurrent
                          ? 'font-extrabold scale-[1.03] origin-left'
                          : 'font-medium opacity-80 scale-100'
                      }`}
                    >
                      {p.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full lg:w-[64%] space-y-10 pb-24">
            {WHY_GENZWORKS_PILLARS.map((p, i) => {
              const isCurrent = activeWhyIndex === i;
              const isExpanded = expandedWhyIndex === i;
              return (
                <div
                  key={i}
                  id={`why-card-${i}`}
                  className={`why-pillar-card scroll-mt-28 rounded-[28px] liquid-glass transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden shadow-lg ${
                    isCurrent
                      ? 'border-[#FF4F18]/50 ring-1 ring-[#FF4F18]/20 scale-[1.01]'
                      : 'opacity-95 scale-[0.99]'
                  }`}
                >
                  <div className="p-8 sm:p-10">
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                      {p.title}
                    </h3>
                    <p className="text-sm sm:text-base opacity-80 leading-relaxed mb-7">
                      {p.desc}
                    </p>

                    <div className="flex flex-wrap gap-2.5">
                      {p.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl liquid-glass text-xs font-semibold shadow-sm"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#FF4F18]" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-current/10 px-8 sm:px-10 py-5">
                    <button
                      onClick={() => setExpandedWhyIndex(isExpanded ? null : i)}
                      className="w-full flex items-center justify-between text-left group/btn cursor-pointer py-1"
                    >
                      <span className="text-sm font-bold tracking-tight transition-colors duration-300 group-hover/btn:text-[#FF4F18]">
                        {isExpanded ? 'Hide Details' : 'View Details'}
                      </span>
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sm ${
                          isExpanded
                            ? 'bg-[#FF4F18] text-white shadow-md shadow-[#FF4F18]/30 scale-105'
                            : 'bg-current/10 text-current group-hover/btn:bg-[#FF4F18] group-hover/btn:text-white group-hover/btn:scale-105'
                        }`}
                      >
                        <Plus
                          className={`w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
                            isExpanded ? 'rotate-45' : 'rotate-0'
                          }`}
                        />
                      </span>
                    </button>

                    {/* Smooth Animated Accordion Dropdown */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pt-4 border-t border-current/10 text-xs sm:text-sm opacity-85 leading-relaxed">
                          {p.details}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

export default WhyUsSection;
