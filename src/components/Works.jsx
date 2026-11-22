import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowUpRight } from 'lucide-react';
import { SHARP_CRACKERS_STACK } from '../data/portfolioData.js';

export default function Works({ stackProgress }) {
  return (
    <section id="works" className="py-24 px-4 sm:px-10 max-w-[1280px] mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-current/10 gap-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-[#FF4F18] font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>[01] / OUR PRODUCTS • FIRST FLAGSHIP PROJECT</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.04em] leading-none">
            SHARP <span className="font-editorial italic font-normal text-[#FF4F18]">CRACKERS.</span>
          </h2>
        </div>

        <div className="flex flex-col sm:items-end gap-3">
          <p className="max-w-md text-sm opacity-75 leading-relaxed sm:text-right">
            Our very first live client launch (<span className="font-mono-tech font-bold">sharpcrackers.com</span>) — scroll through the stacked showcase cards below to explore how we engineered their Sivakasi factory-direct store.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://sharpcrackers.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#FF4F18] text-white text-xs font-extrabold uppercase tracking-wider shadow-lg hover:bg-[#e03e0b] transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>Visit sharpcrackers.com</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </div>
      </motion.div>

      {/* Exact Scroll-Stack Card Animation */}
      <div className="mt-14 relative max-w-[1120px] mx-auto pb-16">
        {SHARP_CRACKERS_STACK.map((slide, index) => {
          const depth = stackProgress[index] || 0;
          const scaleVal = Math.max(0.84, 1 - depth * 0.042);
          const brightnessVal = Math.max(0.45, 1 - depth * 0.16);
          const stickyTop = 104 + index * 22;

          return (
            <div
              key={slide.id}
              style={{
                top: `${stickyTop}px`,
                zIndex: index + 10
              }}
              className="product-stack-card sticky mb-10 sm:mb-14"
            >
              <div
                style={{
                  transform: `scale(${scaleVal})`,
                  filter: `brightness(${brightnessVal})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.18s ease-out, filter 0.18s ease-out'
                }}
                className="relative w-full h-[360px] sm:h-[490px] rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/15 bg-[#0B0B10] shadow-[0_-18px_50px_rgba(0,0,0,0.45),0_30px_70px_rgba(0,0,0,0.4)] group"
              >
                {slide.isLiveBrowser && (
                  <div className="absolute top-0 inset-x-0 h-10 px-5 bg-[#121218]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-[11px] font-mono-tech text-zinc-300 z-20">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="px-3 py-0.5 rounded-md bg-black/60 border border-white/10 text-[#D9FF3F] flex items-center gap-1.5">
                      <Globe className="w-3 h-3" />
                      <span>https://sharpcrackers.com</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold hidden sm:inline">LIVE CLIENT PROJECT</span>
                  </div>
                )}

                <img
                  src={slide.image}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    if (slide.fallbackImage) {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = slide.fallbackImage;
                    }
                  }}
                  alt={slide.title}
                  className={`w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 ${
                    slide.isLiveBrowser ? 'pt-10' : ''
                  }`}
                />

                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-white/15 via-white/50 to-white/15 pointer-events-none z-30" />

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://sharpcrackers.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`absolute right-5 sm:right-8 ${
                    slide.isLiveBrowser ? 'top-14 sm:top-16' : 'top-5 sm:top-8'
                  } z-30 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D9FF3F] text-[#0E0E10] text-xs font-extrabold uppercase tracking-wider whitespace-nowrap shadow-xl`}
                >
                  <span>Explore Live Store</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </motion.a>

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent p-6 sm:p-10 flex flex-col justify-end text-white z-20">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div className="max-w-2xl space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4F18] text-white font-mono-tech text-[10px] font-bold uppercase tracking-wider shadow">
                        <span>{slide.badge}</span>
                      </div>
                      <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                        {slide.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {slide.desc}
                      </p>
                    </div>

                    <div className="flex flex-col items-start sm:items-end justify-end gap-3 shrink-0">
                      <div className="flex flex-wrap gap-1.5">
                        {slide.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
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
}
