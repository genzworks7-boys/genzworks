import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { m, AnimatePresence } from 'framer-motion';
import { Globe, ArrowUpRight, FileText, X, CheckCircle2 } from 'lucide-react';
import { FEATURED_PRODUCTS_STACK } from '../data/products';

const WorksSection = React.memo(function WorksSection({ handleSelectServiceFromCard }) {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const sectionRef = useRef(null);
  const outerRefs = useRef([]);
  const innerRefs = useRef([]);
  const shadeRefs = useRef([]);
  const lastStateRef = useRef([]);

  // Gently pre-decode Works screenshots during browser idle time so scrolling to #works has 0ms decode hitch
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const scheduleIdle = window.requestIdleCallback || ((cb) => setTimeout(cb, 900));
    const cancelIdle = window.cancelIdleCallback || clearTimeout;
    const id = scheduleIdle(() => {
      FEATURED_PRODUCTS_STACK.forEach((item) => {
        if (!item.image) return;
        const img = new Image();
        img.decoding = 'async';
        img.src = item.image;
        if (typeof img.decode === 'function') img.decode().catch(() => {});
      });
    }, { timeout: 2000 });
    return () => cancelIdle(id);
  }, []);

  // Self-contained GPU scroll depth listener: only active when #works is near viewport, read-then-write batched, zero React re-renders
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let inViewport = false;
    let ticking = false;

    const updateCards = () => {
      ticking = false;
      if (!inViewport) return;

      const cards = outerRefs.current;
      const count = cards.length;
      if (count === 0) return;

      // Phase 1: Batch ALL geometric reads first (zero layout thrashing)
      const tops = new Array(count);
      for (let i = 0; i < count; i++) {
        tops[i] = cards[i] ? cards[i].getBoundingClientRect().top : 0;
      }

      // Phase 2: Batch ALL GPU compositor-only writes and skip unchanged cards
      for (let idx = 0; idx < count; idx++) {
        let coveredDepth = 0;
        for (let j = idx + 1; j < count; j++) {
          const nextStickyTop = 104 + j * 22;
          const distance = tops[j] - nextStickyTop;
          const ratio = Math.max(0, Math.min(1, 1 - distance / 420));
          coveredDepth += ratio;
        }

        const scaleVal = +Math.max(0.84, 1 - coveredDepth * 0.042).toFixed(4);
        const shadeOpacity = +(1 - Math.max(0.45, 1 - coveredDepth * 0.16)).toFixed(3);
        const prev = lastStateRef.current[idx];
        if (prev && prev.scale === scaleVal && prev.shade === shadeOpacity) continue;
        lastStateRef.current[idx] = { scale: scaleVal, shade: shadeOpacity };

        const innerCard = innerRefs.current[idx];
        if (innerCard) {
          innerCard.style.transform = `translate3d(0, 0, 0) scale(${scaleVal})`;
        }
        const shadeLayer = shadeRefs.current[idx];
        if (shadeLayer) {
          shadeLayer.style.opacity = String(shadeOpacity);
        }
      }
    };

    const onScroll = () => {
      if (!inViewport || ticking) return;
      ticking = true;
      requestAnimationFrame(updateCards);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        if (inViewport) {
          requestAnimationFrame(updateCards);
        }
      },
      { rootMargin: '250px 0px 250px 0px' }
    );

    io.observe(section);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="works" ref={sectionRef} className="py-24 px-4 sm:px-10 max-w-[1280px] mx-auto relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-black/10 dark:border-white/10 gap-6 reveal-on-scroll">
        <div>
          <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-[#C83200] dark:text-[#FF6B3D] font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>[01] / OUR PRODUCTS</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.04em] leading-none">
            FEATURED <span className="font-editorial italic font-normal text-[#C83200] dark:text-[#FF6B3D]">PROJECTS.</span>
          </h2>
        </div>

        <div className="flex flex-col sm:items-end gap-3">
          <p className="max-w-md text-sm opacity-75 leading-relaxed sm:text-right">
            Real websites and digital platforms we built for clients. Scroll down to explore our recent launches.
          </p>
        </div>
      </div>

      {/* Exact Scroll-Stack Card Animation */}
      <div className="mt-14 relative max-w-[1120px] mx-auto pb-16">
        {FEATURED_PRODUCTS_STACK.map((slide, index) => {
          const stickyTop = 104 + index * 22;

          return (
            <div
              key={slide.id}
              ref={(el) => (outerRefs.current[index] = el)}
              style={{
                top: `${stickyTop}px`,
                zIndex: index + 10
              }}
              className="product-stack-card sticky mb-10 sm:mb-14"
            >
              <div
                id={`stack-card-inner-${index}`}
                ref={(el) => (innerRefs.current[index] = el)}
                style={{
                  transform: 'translate3d(0, 0, 0) scale(1)',
                  transformOrigin: 'top center',
                  contain: 'layout style paint',
                  willChange: 'transform'
                }}
                className="relative w-full h-[430px] sm:h-[490px] rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/15 bg-[#0B0B10] shadow-[0_18px_45px_rgba(0,0,0,0.42)] group"
              >
                {slide.isLiveBrowser && (
                  <div className="absolute top-0 inset-x-0 h-10 px-4 sm:px-5 bg-[#121218]/95 border-b border-white/10 flex items-center justify-between gap-2 text-[11px] font-mono-tech text-zinc-300 z-20">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="min-w-0 max-w-[calc(100%-54px)] sm:max-w-none px-3 py-0.5 rounded-md bg-black/60 border border-white/10 text-[#D9FF3F] flex items-center gap-1.5">
                      <Globe className="w-3 h-3 shrink-0" />
                      <span className="truncate">{slide.urlClean || slide.url}</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold hidden sm:inline shrink-0">LIVE CLIENT PROJECT</span>
                  </div>
                )}

                <img
                  src={slide.image}
                  alt={slide.title}
                  width="800"
                  height="450"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  onError={(e) => {
                    if (slide.fallbackImage) {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = slide.fallbackImage;
                    }
                  }}
                  className={`w-full h-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${
                    slide.isLiveBrowser ? 'pt-10' : ''
                  }`}
                />

                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-white/15 via-white/50 to-white/15 pointer-events-none z-30" />

                <a
                  href={slide.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`absolute right-5 sm:right-8 ${
                    slide.isLiveBrowser ? 'top-14 sm:top-16' : 'top-5 sm:top-8'
                  } z-30 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D9FF3F] text-[#0E0E10] text-xs font-extrabold uppercase tracking-wider whitespace-nowrap hover:scale-105 active:scale-95 transition-transform duration-200 shadow-xl border border-black/25`}
                >
                  <span>{slide.buttonText || 'Explore Live Site'}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </a>

                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.97)_0%,rgba(0,0,0,0.82)_44%,rgba(0,0,0,0.3)_74%,rgba(0,0,0,0.08)_100%)] p-5 sm:p-10 pt-24 sm:pt-10 flex flex-col justify-end text-white z-20">
                  <div className="flex flex-wrap items-end justify-between gap-4 min-w-0">
                    <div className="max-w-2xl space-y-2 min-w-0">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C83200] text-white font-mono-tech text-[10px] font-bold uppercase tracking-wider shadow">
                        <span>{slide.badge}</span>
                      </div>
                      <h3 className="text-xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                        {slide.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {slide.desc}
                      </p>
                      {slide.caseStudy && (
                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => setSelectedCaseStudy(slide)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#0E0E10] border border-white/25 text-[11px] font-bold tracking-wide transition-[transform,background-color,color] duration-200 active:scale-95 cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>View Case Study</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="w-full sm:w-auto max-w-full min-w-0 flex flex-col items-start sm:items-end justify-end gap-3 sm:shrink-0">
                      <div className="flex flex-wrap gap-1.5 max-w-full">
                        {slide.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 rounded-full bg-white/[0.12] border border-white/15 text-[11px] font-semibold text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pure GPU alpha-composited depth dimming shade (replaces expensive CSS filter brightness repaints) */}
                <div
                  ref={(el) => (shadeRefs.current[index] = el)}
                  style={{ opacity: 0, willChange: 'opacity' }}
                  className="absolute inset-0 bg-black pointer-events-none z-40"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Case Study Modal rendered at document.body portal level above FloatingDock */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedCaseStudy && selectedCaseStudy.caseStudy && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedCaseStudy(null)}
                className="fixed inset-0 z-[9050] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
              >
                <m.div
                  initial={{ opacity: 0, scale: 0.95, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 12 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${selectedCaseStudy.title} Case Study`}
                  className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-[#121216] border border-white/15 text-white shadow-2xl my-auto"
                >
                  <div className="relative h-48 sm:h-60 bg-black overflow-hidden">
                    <img
                      src={selectedCaseStudy.image}
                      alt={selectedCaseStudy.title}
                      width="800"
                      height="450"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-black/30 to-transparent" />
                    <button
                      type="button"
                      onClick={() => setSelectedCaseStudy(null)}
                      aria-label="Close Case Study"
                      className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-black/75 hover:bg-white text-white hover:text-black border border-white/20 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Close</span>
                    </button>
                  </div>

                  <div className="p-6 sm:p-8 space-y-5 -mt-6 relative z-10">
                    <div>
                      <div className="font-mono-tech text-[11px] uppercase tracking-widest text-[#FF4F18] font-bold mb-1.5">
                        {selectedCaseStudy.caseStudy.category} • {selectedCaseStudy.caseStudy.client}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                        {selectedCaseStudy.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {selectedCaseStudy.caseStudy.summary}
                    </p>

                    <div className="space-y-2.5">
                      <div className="font-mono-tech text-[10px] uppercase tracking-widest text-zinc-400">
                        Key Deliverables
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedCaseStudy.caseStudy.deliverables.map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-2 text-xs text-zinc-200 bg-white/[0.04] border border-white/10 rounded-xl p-2.5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#D9FF3F] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedCaseStudy.caseStudy.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono-tech text-zinc-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <a
                        href={selectedCaseStudy.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D9FF3F] hover:bg-white text-[#08080A] text-xs font-extrabold uppercase tracking-wider active:scale-95 transition-[transform,background-color] duration-200"
                      >
                        <span>{selectedCaseStudy.buttonText || 'Visit Live Site'}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>

                      {handleSelectServiceFromCard && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCaseStudy(null);
                            handleSelectServiceFromCard('Web Development');
                          }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-wider active:scale-95 transition-[transform,background-color] duration-200 cursor-pointer"
                        >
                          <span>Build Similar Project</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </m.div>
              </m.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
});

export default WorksSection;
