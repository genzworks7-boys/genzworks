import React, { memo } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { DETAILED_SERVICES } from '../data/services.js';

const ServicesSection = memo(function ServicesSection({
  hoveredServiceIdx,
  setHoveredServiceIdx,
  handleSelectServiceFromCard
}) {
  return (
    <section id="services" className="py-24 px-4 sm:px-10 max-w-[1280px] mx-auto relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-current/10 gap-6">
        <div>
          <div className="font-mono-tech text-xs uppercase tracking-widest opacity-60 mb-3">
            [05] / OUR SERVICES
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Everything Your Idea Needs to <span className="font-editorial italic font-normal">Move Forward.</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm opacity-75">
          We bring development, design, multimedia, and communication together to support projects from concept to completion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-14">
        {DETAILED_SERVICES.map((s, i) => {
          const isCardHovered = hoveredServiceIdx === i;

          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredServiceIdx(i)}
              onMouseLeave={() => setHoveredServiceIdx(null)}
              onClick={() => setHoveredServiceIdx(isCardHovered ? null : i)}
              style={{
                boxShadow: isCardHovered
                  ? `0 32px 75px -10px ${s.glow}`
                  : '0 16px 40px -10px rgba(0,0,0,0.3)',
                transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease'
              }}
              className={`group/folder relative h-[520px] sm:h-[560px] rounded-[34px] p-2.5 ${s.outerBg} ${s.outerBorder} border overflow-hidden cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2`}
            >
              <div className="relative w-full h-[320px] sm:h-[360px] rounded-[26px] overflow-hidden bg-black/40">
                <img
                  src={s.image}
                  loading="lazy"
                  decoding="async"
                  alt={s.title}
                  style={{
                    transform: isCardHovered ? 'scale(1.08) translateY(-4px)' : 'scale(1) translateY(0px)',
                    transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/40 pointer-events-none" />
              </div>

              <div
                style={{
                  transform: isCardHovered ? 'translateY(48px)' : 'translateY(0px)',
                  transition: 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
                className="absolute inset-x-2.5 bottom-2.5 top-[150px] sm:top-[165px] z-20 flex flex-col pointer-events-none"
              >
                {/* Single Unified macOS Folder Background (Balanced Proportions, Zero Line) */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <svg
                    viewBox="0 0 400 390"
                    preserveAspectRatio="none"
                    className="w-full h-full block drop-shadow-[0_-12px_28px_rgba(0,0,0,0.32)]"
                  >
                    <defs>
                      <linearGradient id={`mac-folder-unified-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={s.tabGradTop} />
                        <stop offset="14%" stopColor={s.tabGradMid} />
                        <stop offset="55%" stopColor={s.tabGradBot} />
                        <stop offset="100%" stopColor={s.tabGradBot} />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,390 L 0,26 Q 0,0 26,0 L 130,0 Q 155,0 168,18 L 180,34 Q 192,48 216,48 L 374,48 Q 400,48 400,74 L 400,364 Q 400,390 374,390 L 26,390 Q 0,390 0,364 Z"
                      fill={`url(#mac-folder-unified-${i})`}
                    />
                  </svg>
                </div>

                {/* Folder Tab Header Bar (Pure Bold Number without folder icon) */}
                <div className="relative z-10 w-full h-[50px] px-5 sm:px-6 flex items-center justify-between shrink-0">
                  <span className={`text-3xl sm:text-4xl font-black font-mono-tech tracking-tighter leading-none ${s.textColor} drop-shadow-sm`}>
                    {s.num}
                  </span>

                  {/* Top-Right Dedicated Interactive Action Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectServiceFromCard(s.title);
                    }}
                    title={`Book ${s.title}`}
                    className="w-9 h-9 rounded-full bg-white text-zinc-950 hover:bg-[#D9FF3F] hover:text-black hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl border border-white/40 flex items-center justify-center pointer-events-auto cursor-pointer group/arrow translate-y-1"
                  >
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5" />
                  </button>
                </div>

                {/* Folder Body Content (Compact, Balanced & Zero Wasted Space, No Scrollbars) */}
                <div className={`relative z-10 flex-1 px-5 sm:px-6 pt-2 pb-4 sm:pb-5 flex flex-col justify-between ${s.textColor} pointer-events-auto overflow-hidden`}>
                  <div className="space-y-1.5">
                    {/* Main Title */}
                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight drop-shadow-sm">
                      {s.title}
                    </h3>

                    {/* Subtitle */}
                    <p
                      style={{ color: s.accentColor }}
                      className="text-xs sm:text-[13px] font-semibold tracking-wide leading-snug opacity-95"
                    >
                      {s.subtitle}
                    </p>

                    {/* Description */}
                    <p className={`text-xs leading-relaxed line-clamp-2 sm:line-clamp-3 ${s.subTextColor}`}>
                      {s.desc}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {/* Interactive Capabilities Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {s.bullets.map((b, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectServiceFromCard(s.title);
                          }}
                          title={`Inquire about ${b}`}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all duration-200 pointer-events-auto cursor-pointer hover:scale-[1.03] active:scale-95 flex items-center gap-1.5 ${s.tagBg}`}
                        >
                          <span className="w-1 h-1 rounded-full bg-white/80 shrink-0" />
                          <span>{b}</span>
                        </button>
                      ))}
                    </div>

                    {/* Compact, Sleek Action Button */}
                    <div className="pt-1 flex items-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectServiceFromCard(s.title);
                        }}
                        className="group/btn inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-zinc-950 font-bold text-[10px] tracking-wide uppercase shadow-sm hover:shadow hover:bg-[#D9FF3F] hover:text-black active:scale-95 transition-all duration-200 pointer-events-auto cursor-pointer"
                      >
                        <span>Start Project</span>
                        <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});

export default ServicesSection;
