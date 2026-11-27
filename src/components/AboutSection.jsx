import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Globe } from 'lucide-react';
import { BRAND_CONFIG, Instagram, Linkedin, Github } from '../data/brand';

const AboutSection = React.memo(function AboutSection({
  team,
  heroRevealed,
  setIsJoinTeamModalOpen
}) {
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const pointerStartRef = useRef({ x: 0, y: 0 });

  // Gently pre-decode team portraits in browser idle time after Hero reveals so scrolling to #about has 0ms decode lag
  useEffect(() => {
    if (!heroRevealed || typeof window === 'undefined') return;
    let cancelled = false;

    const scheduleIdle = window.requestIdleCallback || ((cb) => setTimeout(cb, 250));
    const cancelIdle = window.cancelIdleCallback || clearTimeout;

    const urls = [];
    team.forEach((m) => {
      if (m.photo) urls.push(m.photo);
      if (m.grayPhoto) urls.push(m.grayPhoto);
    });

    let idx = 0;
    let handle = null;

    const decodeNext = () => {
      if (cancelled || idx >= urls.length) return;
      const src = urls[idx++];
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
      const onSettled = () => {
        if (!cancelled && idx < urls.length) {
          handle = scheduleIdle(decodeNext, { timeout: 1000 });
        }
      };
      if (typeof img.decode === 'function') {
        img.decode().then(onSettled, onSettled);
      } else {
        img.onload = onSettled;
        img.onerror = onSettled;
      }
    };

    handle = scheduleIdle(decodeNext, { timeout: 1000 });

    return () => {
      cancelled = true;
      if (handle) cancelIdle(handle);
    };
  }, [heroRevealed, team]);

  return (
    <section id="about" className="py-24 border-t border-black/10 dark:border-white/10 relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20 reveal-on-scroll">
          <div className="lg:col-span-7 space-y-6">
            <div className="font-mono-tech text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">[04] / ABOUT GENZWORKS</div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              A New Generation of <span className="font-editorial italic font-normal underline decoration-[#FF4F18]">Digital Thinking.</span>
            </h2>
            <p className="text-sm sm:text-base opacity-80 leading-relaxed">
              GenzWorks is a technology and creative studio built on one simple idea: bring the right skills together to turn ideas into real products.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl liquid-glass shadow-md">
              <h3 className="font-mono-tech text-xs uppercase font-bold text-[#FF4F18] mb-1">OUR MISSION</h3>
              <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
                Combine technology and creative design to build useful, fast, and easy-to-use digital products.
              </p>
            </div>

            <div className="p-6 rounded-2xl liquid-glass shadow-md">
              <h3 className="font-mono-tech text-xs uppercase font-bold text-amber-500 mb-1">OUR VISION</h3>
              <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
                Grow into a trusted studio known for fresh thinking, clean execution, and consistent quality.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-6">
          <div className="lg:col-span-4 flex flex-col items-start text-left space-y-6">
            <h3 className="text-5xl sm:text-6xl font-bold tracking-[-0.04em] leading-[1.02]">
              Meet The <br className="hidden sm:inline" />
              Team
            </h3>

            <p className="text-sm sm:text-base opacity-70 leading-relaxed max-w-sm">
              Designers, developers, and creators working together to bring fresh ideas and quality work to every project.
            </p>

            <button
              type="button"
              onClick={() => setIsJoinTeamModalOpen(true)}
              className="group relative inline-flex items-center h-14 rounded-full bg-[#1C1C1F] dark:bg-white text-white dark:text-[#0E0E10] pr-7 pl-[3.5rem] overflow-hidden shadow-xl transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <span className="absolute left-1.5 w-11 h-11 rounded-full bg-white dark:bg-[#0E0E10] text-[#0E0E10] dark:text-white flex items-center justify-center shadow-sm transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5" />
              </span>

              <span className="text-xs font-extrabold uppercase tracking-wider ml-1.5 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                JOIN OUR TEAM
              </span>
            </button>
          </div>

          <div className="lg:col-span-8 w-full">
            <div className="sm:hidden flex items-center justify-end font-mono-tech text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 px-0.5">
              <span>← Swipe to view team →</span>
            </div>
            <div className="w-full overflow-x-auto lg:overflow-visible pb-2">
            <div
              style={{ contain: 'layout style' }}
              className="flex flex-row items-stretch gap-2.5 sm:gap-3.5 h-[430px] sm:h-[490px] min-w-[640px] sm:min-w-0 w-full select-none"
            >
              {team.map((member, idx) => (
                <TeamCard
                  key={member.id}
                  member={member}
                  idx={idx}
                  isOpen={activeTeamIndex === idx}
                  onSelect={setActiveTeamIndex}
                  pointerStartRef={pointerStartRef}
                />
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

const TeamCard = React.memo(function TeamCard({
  member,
  idx,
  isOpen,
  onSelect,
  pointerStartRef
}) {
  const hasBakedGray = Boolean(member.grayPhoto);

  return (
    <div
      onPointerDown={(e) => {
        pointerStartRef.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        if (e.pointerType === 'touch') {
          const dx = Math.abs(e.clientX - pointerStartRef.current.x);
          const dy = Math.abs(e.clientY - pointerStartRef.current.y);
          if (dx < 10 && dy < 10) onSelect(idx);
        }
      }}
      onClick={() => onSelect(idx)}
      onPointerEnter={(e) => {
        if (e.pointerType !== 'touch') onSelect(idx);
      }}
      style={{
        flex: isOpen ? '4.6 1 0%' : '1 1 0%',
        contain: 'layout style paint'
      }}
      className="team-card-accordion group/card relative h-full rounded-[24px] sm:rounded-[28px] overflow-hidden cursor-pointer bg-[#141417] shadow-lg"
    >
      {/* Base color portrait */}
      <img
        src={member.photo}
        decoding="async"
        alt={member.name}
        style={{
          transform: isOpen ? 'scale(1)' : 'scale(1.08)'
        }}
        className={`team-card-img absolute inset-0 w-full h-full object-cover object-top pointer-events-none ${
          hasBakedGray
            ? ''
            : isOpen
            ? 'grayscale-0 brightness-100 contrast-100'
            : 'grayscale brightness-90 contrast-110 group-hover/card:brightness-100'
        }`}
      />

      {/* Pre-baked monochrome overlay */}
      {hasBakedGray && (
        <img
          src={member.grayPhoto}
          decoding="async"
          alt=""
          aria-hidden="true"
          style={{
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? 'scale(1)' : 'scale(1.08)'
          }}
          className="team-card-img absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
        />
      )}

      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-200 lg:duration-300 ${
          isOpen
            ? 'bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-100'
            : 'bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-90'
        }`}
      />

      <div
        className={`absolute inset-0 flex items-end justify-center pb-6 pointer-events-none z-20 transition-[transform,opacity] duration-200 lg:duration-300 ${
          isOpen ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <span
          style={{ writingMode: 'vertical-rl' }}
          className="rotate-180 text-white font-bold text-base sm:text-lg tracking-tight whitespace-nowrap [text-shadow:0_2px_6px_rgba(0,0,0,0.65)]"
        >
          {member.name}
        </span>
      </div>

      <div
        aria-hidden={!isOpen}
        className={`team-card-overlay absolute inset-0 z-20 p-5 sm:p-7 flex flex-col justify-between ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto lg:delay-75'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
          <span className="px-3.5 py-1.5 rounded-full bg-black/65 border border-white/20 text-white text-xs font-semibold tracking-tight shadow-sm">
            {member.funkyBgRole.charAt(0) + member.funkyBgRole.slice(1).toLowerCase()}
          </span>
        </div>

        <div className="space-y-3 max-w-md text-left" onClick={(e) => e.stopPropagation()}>
          <div>
            <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              {member.name}
            </h4>
            <div className="text-xs sm:text-sm text-white/75 font-medium mt-0.5">
              {member.role}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-white/85 leading-relaxed line-clamp-2 sm:line-clamp-3">
            {member.desc}
          </p>

          <div className="flex items-center gap-2 pt-1">
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isOpen ? 0 : -1}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white hover:text-black active:scale-95 border border-white/20 text-white flex items-center justify-center transition-[transform,background-color,color] duration-150"
              aria-label={`${member.name} on LinkedIn`}
              title="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href={member.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isOpen ? 0 : -1}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white hover:text-black active:scale-95 border border-white/20 text-white flex items-center justify-center transition-[transform,background-color,color] duration-150"
              aria-label={`${member.name} on Instagram`}
              title="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href={member.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isOpen ? 0 : -1}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white hover:text-black active:scale-95 border border-white/20 text-white flex items-center justify-center transition-[transform,background-color,color] duration-150"
              aria-label={`${member.name} on GitHub`}
              title="GitHub"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a
              href={`mailto:${BRAND_CONFIG.email}`}
              tabIndex={isOpen ? 0 : -1}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white hover:text-black active:scale-95 border border-white/20 text-white flex items-center justify-center transition-[transform,background-color,color] duration-150"
              aria-label={`Email ${member.name} via GENZWORKS`}
              title="Email"
            >
              <Globe className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AboutSection;
