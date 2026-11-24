import React from 'react';
import { ArrowRight, Sun, Moon } from 'lucide-react';
import { BRAND_CONFIG, CRAFT_TICKER, Instagram, Github } from '../data/brand';

export default function HeroSection({
  heroRevealed,
  resolvedTheme,
  setThemeChoice,
  triggerToast,
  canvasRef,
  mouseRef,
  jumpTo
}) {
  return (
    <section id="home" className={`relative pt-12 sm:pt-16 pb-20 z-10 px-4 sm:px-10 max-w-[1280px] mx-auto transition-opacity duration-500 ${heroRevealed ? 'hero-visible opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col items-center text-center relative z-10">
        <div className="framer-hero-card w-full max-w-[820px] px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-2xl sm:rounded-[28px] liquid-glass-nav mb-3 sm:mb-5">
          <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
              <div className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl p-1 sm:p-1.5 liquid-glass-btn shadow-sm shrink-0 flex items-center justify-center">
                <div className="w-full h-full rounded-[10px] sm:rounded-[14px] flex items-center justify-center overflow-hidden">
                  <img src="/logo.png" alt="GENZWORKS Studio Logo" className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,240,255,0.35)]" />
                </div>
              </div>
              <div className="text-left min-w-0">
                <h3 className="font-extrabold text-xs sm:text-base tracking-tight text-zinc-950 dark:text-white truncate">{BRAND_CONFIG.brandName}</h3>
                <p className="text-[10px] sm:text-xs text-zinc-600 dark:text-zinc-300 font-medium truncate">Technology &amp; Creative Studio</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <a
                  href={BRAND_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-full liquid-glass-btn text-zinc-800 hover:text-black dark:text-zinc-100 dark:hover:text-white"
                  title={`Instagram (${BRAND_CONFIG.instagram})`}
                >
                  <Instagram className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </a>
                <a
                  href={BRAND_CONFIG.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-full liquid-glass-btn text-zinc-800 hover:text-black dark:text-zinc-100 dark:hover:text-white"
                  title="GitHub (genzworks7-boys)"
                >
                  <Github className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </a>
                <button
                  onClick={() => {
                    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
                    setThemeChoice(next);
                    triggerToast(`Theme set to ${next}`);
                  }}
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-full liquid-glass-btn text-zinc-800 hover:text-black dark:text-zinc-100 dark:hover:text-white"
                  title="Toggle Light / Dark Mode"
                >
                  {resolvedTheme === 'dark' ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D9FF3F]" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive React Bits Particle Text — High-DPI Retina Sharp with Mobile Touch */}
        <div className="w-full max-w-[1080px] h-[110px] sm:h-[180px] md:h-[230px] my-1 sm:my-3 flex items-center justify-center relative select-none">
          <canvas
            ref={canvasRef}
            onTouchStart={(e) => {
              if (!canvasRef.current || !e.touches || e.touches.length === 0) return;
              const touch = e.touches[0];
              const rect = canvasRef.current.getBoundingClientRect();
              mouseRef.current.x = touch.clientX - rect.left;
              mouseRef.current.y = touch.clientY - rect.top;
            }}
            onTouchMove={(e) => {
              if (!canvasRef.current || !e.touches || e.touches.length === 0) return;
              const touch = e.touches[0];
              const rect = canvasRef.current.getBoundingClientRect();
              mouseRef.current.x = touch.clientX - rect.left;
              mouseRef.current.y = touch.clientY - rect.top;
            }}
            onTouchEnd={() => {
              mouseRef.current.x = -1000;
              mouseRef.current.y = -1000;
            }}
            className="w-full h-full block cursor-pointer touch-pan-y"
          />
        </div>

        <h1 className="framer-hero-title max-w-[940px] text-[2.75rem] sm:text-[4.8rem] lg:text-[5.8rem] font-extrabold tracking-[-0.04em] leading-[0.98] mb-6">
          We craft websites <br className="hidden sm:inline" />
          that hustle as hard <br className="hidden sm:inline" />
          as you do
        </h1>

        <p className="framer-hero-subtitle max-w-[580px] text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium mb-8">
          {BRAND_CONFIG.heroSubheading}
        </p>

        <div className="framer-hero-cta flex items-center gap-4">
          <button
            onClick={() => jumpTo('contact')}
            className="px-8 py-4 rounded-2xl text-xs font-extrabold uppercase tracking-wider bg-[#0E0E10] text-white dark:bg-white dark:text-[#0E0E10] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => jumpTo('works')}
            className="px-8 py-4 rounded-2xl text-xs font-extrabold uppercase tracking-wider liquid-glass hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-3"
          >
            <span>Our Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-20 py-4 liquid-glass overflow-hidden rounded-3xl shadow-xl relative z-10">
        <div className="animate-ticker flex items-center gap-10">
          {[...CRAFT_TICKER, ...CRAFT_TICKER].map((item, idx) => (
            <div key={idx} className="flex items-center gap-10 shrink-0">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest">{item}</span>
              <span className="w-2 h-2 rounded-full bg-[#0E0E10] dark:bg-white" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
