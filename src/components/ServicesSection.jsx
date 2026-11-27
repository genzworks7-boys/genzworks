import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { DETAILED_SERVICES } from '../data/services';

const ServiceCard = React.memo(function ServiceCard({
  s,
  i,
  isCardHovered,
  onHover,
  onSelectService
}) {
  return (
    <div
      onMouseEnter={() => onHover(i)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onHover(isCardHovered ? null : i)}
      style={{
        contain: 'layout style paint',
        boxShadow: isCardHovered
          ? `0 28px 65px -12px ${s.glow}`
          : '0 16px 40px -10px rgba(0,0,0,0.3)',
        transition: 'transform 0.38s cubic-bezier(0.16,1,0.3,1), border-color 0.25s ease'
      }}
      className={`group/folder relative h-[575px] sm:h-[630px] rounded-[34px] p-2.5 ${s.outerBg} ${s.outerBorder} border overflow-hidden cursor-pointer select-none hover:-translate-y-2`}
    >
      <div className="relative w-full h-[320px] sm:h-[360px] rounded-[26px] overflow-hidden bg-black/40">
        <img
          src={s.image}
          alt={s.title}
          width="640"
          height="427"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          style={{
            transform: isCardHovered ? 'scale(1.08) translate3d(0, -4px, 0)' : 'scale(1) translate3d(0, 0, 0)',
            transition: 'transform 0.52s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/40 pointer-events-none" />
      </div>

      <div
        style={{
          transform: isCardHovered ? 'translate3d(0, 48px, 0)' : 'translate3d(0, 0, 0)',
          transition: 'transform 0.48s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="absolute inset-x-2.5 bottom-2.5 top-[148px] sm:top-[162px] z-20 flex flex-col pointer-events-none"
      >
        {/* Single Unified macOS Folder Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg
            viewBox="0 0 400 390"
            preserveAspectRatio="none"
            className="w-full h-full block"
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
              stroke="rgba(255,255,255,0.32)"
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* Folder Tab Header Bar */}
        <div className="relative z-10 w-full h-[50px] px-5 sm:px-6 flex items-center justify-between shrink-0">
          <span className={`text-3xl sm:text-4xl font-black font-mono-tech tracking-tighter leading-none ${s.textColor} [text-shadow:0_1px_2px_rgba(0,0,0,0.22)]`}>
            {s.num}
          </span>

          {/* Top-Right Dedicated Interactive Action Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectService(s.title);
            }}
            aria-label={`Book ${s.title}`}
            title={`Book ${s.title}`}
            className="w-9 h-9 rounded-full bg-white text-zinc-950 hover:bg-[#D9FF3F] hover:text-black hover:scale-110 active:scale-95 transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-lg border border-white/40 flex items-center justify-center pointer-events-auto cursor-pointer group/arrow translate-y-1"
          >
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5" />
          </button>
        </div>

        {/* Folder Body Content */}
        <div className={`relative z-10 flex-1 px-5 sm:px-6 pt-1.5 pb-16 sm:pb-16 flex flex-col justify-between ${s.textColor} pointer-events-auto overflow-hidden`}>
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.22)]">
              {s.title}
            </h3>

            <p
              style={{ color: s.accentColor }}
              className="text-xs sm:text-[13px] font-semibold tracking-wide leading-snug opacity-95"
            >
              {s.subtitle}
            </p>

            <p className={`text-xs leading-relaxed line-clamp-2 sm:line-clamp-3 ${s.subTextColor}`}>
              {s.desc}
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <div className="flex flex-wrap gap-1.5">
              {s.bullets.map((b, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectService(s.title);
                  }}
                  title={`Inquire about ${b}`}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-[transform,background-color] duration-150 pointer-events-auto cursor-pointer hover:scale-[1.03] active:scale-95 flex items-center gap-1.5 ${s.tagBg}`}
                >
                  <span className="w-1 h-1 rounded-full bg-white/80 shrink-0" />
                  <span>{b}</span>
                </button>
              ))}
            </div>

            <div className="pt-1 flex items-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectService(s.title);
                }}
                className="group/btn inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-zinc-950 font-bold text-[10px] tracking-wide uppercase hover:bg-[#D9FF3F] hover:text-black active:scale-95 transition-[transform,background-color] duration-150 pointer-events-auto cursor-pointer"
              >
                <span>Start Project</span>
                <ArrowRight className="w-3 h-3 transition-transform duration-150 group-hover/btn:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const ServicesSection = React.memo(function ServicesSection({
  handleSelectServiceFromCard
}) {
  const [hoveredServiceIdx, setHoveredServiceIdx] = useState(null);

  return (
    <section id="services" className="py-24 px-4 sm:px-10 max-w-[1280px] mx-auto relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-black/10 dark:border-white/10 gap-6">
        <div>
          <div className="font-mono-tech text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mb-3">[05] / OUR SERVICES</div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Everything Your Idea Needs to <span className="font-editorial italic font-normal">Move Forward.</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm opacity-75">
          Design, development, video, and writing under one roof — everything needed to take your idea live.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-14">
        {DETAILED_SERVICES.map((s, i) => (
          <ServiceCard
            key={s.num || i}
            s={s}
            i={i}
            isCardHovered={hoveredServiceIdx === i}
            onHover={setHoveredServiceIdx}
            onSelectService={handleSelectServiceFromCard}
          />
        ))}
      </div>
    </section>
  );
});

export default ServicesSection;
