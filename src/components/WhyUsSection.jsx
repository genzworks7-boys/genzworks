import React, { useState, useEffect, useRef, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { ArrowUpRight, Plus } from 'lucide-react';
import { WHY_GENZWORKS_PILLARS } from '../data/whyUs';

const FLIP_DURATION = 260;
const FLIP_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

const WhyPillarCard = React.memo(function WhyPillarCard({
  p,
  i,
  isCurrent,
  isExpanded,
  onToggle,
  registerCardRef,
  registerFlipRef,
  registerBgRef
}) {
  return (
    <div
      id={`why-card-${i}`}
      ref={(el) => {
        registerCardRef(i, el);
        registerFlipRef(i, el);
      }}
      style={{ contain: 'layout style' }}
      className="scroll-mt-28 relative"
    >
      <div
        className={`relative transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isCurrent ? 'lg:scale-[1.01]' : 'opacity-95 lg:scale-[0.99]'
        }`}
      >
        {/* Dedicated GPU-scaled background chrome so card border/shadow animates with 0 mid-flight repaints */}
        <div
          ref={(el) => registerBgRef(i, el)}
          style={{ transformOrigin: 'top center' }}
          className={`why-pillar-card absolute inset-0 rounded-[28px] liquid-glass pointer-events-none transition-[border-color] duration-300 ${
            isCurrent ? 'border-[#FF4F18]/50 ring-1 ring-[#FF4F18]/20' : ''
          }`}
        />

        <div className="relative z-10 p-8 sm:p-10">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">{p.title}</h3>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed mb-7">{p.desc}</p>

          <div className="flex flex-wrap gap-2.5">
            {p.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl liquid-glass-chip text-xs font-semibold shadow-sm"
              >
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FF4F18]" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 border-t border-black/10 dark:border-white/10 px-8 sm:px-10 py-5">
          <button
            type="button"
            onClick={() => onToggle(i)}
            aria-expanded={isExpanded}
            className="w-full flex items-center justify-between text-left group/btn cursor-pointer py-1 active:scale-[0.99] transition-transform duration-150"
          >
            <span className="text-sm font-bold tracking-tight transition-colors duration-200 group-hover/btn:text-[#FF4F18]">
              {isExpanded ? 'Hide Details' : 'View Details'}
            </span>
            <span
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isExpanded
                  ? 'bg-[#FF4F18] text-white scale-105'
                  : 'bg-black/10 dark:bg-white/10 text-current group-hover/btn:bg-[#FF4F18] group-hover/btn:text-white group-hover/btn:scale-105'
              }`}
            >
              <Plus
                className={`w-4 h-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] transform ${
                  isExpanded ? 'rotate-45' : 'rotate-0'
                }`}
              />
            </span>
          </button>

          {isExpanded && (
            <div className="why-details-enter pt-4">
              <div className="pt-4 border-t border-black/10 dark:border-white/10 text-xs sm:text-sm opacity-85 leading-relaxed">
                {p.details}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

const WhyUsSection = React.memo(function WhyUsSection() {
  const [activeWhyIndex, setActiveWhyIndex] = useState(0);
  const [expandedWhyIndex, setExpandedWhyIndex] = useState(null);

  const sectionRef = useRef(null);
  const stickyNavRef = useRef(null);
  const cardRefs = useRef([]);
  const flipRefs = useRef([]);
  const bgRefs = useRef([]);
  const animsRef = useRef([]);
  const activeRef = useRef(0);

  const registerCardRef = useCallback((idx, el) => {
    cardRefs.current[idx] = el;
  }, []);

  const registerFlipRef = useCallback((idx, el) => {
    flipRefs.current[idx] = el;
  }, []);

  const registerBgRef = useCallback((idx, el) => {
    bgRefs.current[idx] = el;
  }, []);

  useEffect(() => {
    return () => {
      animsRef.current.forEach((a) => {
        try { a.cancel(); } catch { /* ignore cancelled animations */ }
      });
      animsRef.current = [];
    };
  }, []);

  const handleToggleCard = useCallback((idx) => {
    const canAnimate =
      typeof document !== 'undefined' &&
      typeof Element !== 'undefined' &&
      typeof Element.prototype.animate === 'function' &&
      !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (!canAnimate) {
      setExpandedWhyIndex((prev) => (prev === idx ? null : idx));
      return;
    }

    // Step 1: Measure the 6 pillar cards ONLY (avoids promoting downstream heavy sections to GPU)
    const beforeRects = flipRefs.current.map((el) => (el ? el.getBoundingClientRect() : null));

    animsRef.current.forEach((a) => {
      try { a.cancel(); } catch { /* ignore cancelled animations */ }
    });
    animsRef.current = [];

    // Step 2: Single synchronous DOM commit
    flushSync(() => {
      setExpandedWhyIndex((prev) => (prev === idx ? null : idx));
    });

    // Step 3: Batch ALL after-measurements BEFORE queueing ANY .animate() write
    const afterRects = flipRefs.current.map((el) => (el ? el.getBoundingClientRect() : null));

    // Step 4: Only animate cards near the viewport so offscreen cards never allocate GPU textures
    const vh = window.innerHeight || 900;
    const nextAnims = [];

    flipRefs.current.forEach((el, k) => {
      const prev = beforeRects[k];
      const next = afterRects[k];
      if (!el || !prev || !next) return;

      const isVisible =
        (prev.bottom >= -80 && prev.top <= vh + 80) ||
        (next.bottom >= -80 && next.top <= vh + 80);
      if (!isVisible) return;

      const dy = prev.top - next.top;
      if (Math.abs(dy) > 0.5) {
        nextAnims.push(
          el.animate(
            [
              { transform: `translate3d(0, ${dy}px, 0)` },
              { transform: 'translate3d(0, 0, 0)' }
            ],
            { duration: FLIP_DURATION, easing: FLIP_EASING }
          )
        );
      }

      const bg = bgRefs.current[k];
      if (bg && prev.height > 0 && next.height > 0) {
        const scaleY = prev.height / next.height;
        if (Math.abs(scaleY - 1) > 0.004) {
          nextAnims.push(
            bg.animate(
              [
                { transform: `scaleY(${scaleY})` },
                { transform: 'scaleY(1)' }
              ],
              { duration: FLIP_DURATION, easing: FLIP_EASING }
            )
          );
        }
      }
    });

    animsRef.current = nextAnims;
  }, []);

  // Self-contained viewport-scoped scroll spy (0 sibling re-renders)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let inViewport = false;
    let ticking = false;

    const updateActivePillar = () => {
      ticking = false;
      if (!inViewport) return;

      const cards = cardRefs.current;
      if (cards.length === 0) return;

      const triggerY = stickyNavRef.current
        ? stickyNavRef.current.getBoundingClientRect().top + 90
        : window.innerHeight * 0.34;

      let currentWhy = 0;
      for (let idx = 0; idx < cards.length; idx++) {
        const card = cards[idx];
        if (!card) continue;
        const rect = card.getBoundingClientRect();
        if (rect.top <= triggerY + 80) {
          currentWhy = idx;
        } else if (idx === 0 && rect.top > triggerY + 80) {
          currentWhy = 0;
        }
      }

      if (activeRef.current !== currentWhy) {
        activeRef.current = currentWhy;
        setActiveWhyIndex(currentWhy);
      }
    };

    const onScroll = () => {
      if (!inViewport || ticking) return;
      ticking = true;
      requestAnimationFrame(updateActivePillar);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        if (inViewport) requestAnimationFrame(updateActivePillar);
      },
      { rootMargin: '150px 0px 150px 0px' }
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
    <section id="why-us" ref={sectionRef} className="py-24 border-y border-black/10 dark:border-white/10 relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
        <div className="max-w-3xl mb-16">
          <div className="font-mono-tech text-xs uppercase tracking-widest text-[#FF4F18] font-bold mb-3">[02] / WHY GENZWORKS?</div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Different Minds. One <span className="font-editorial italic font-normal underline decoration-[#FF4F18]">Forward Vision.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base opacity-80 leading-relaxed">
            Great digital products come from clear design, clean technology, and close teamwork.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16 relative">
          <div
            id="why-sticky-nav"
            ref={stickyNavRef}
            className="w-full lg:w-[36%] lg:sticky lg:top-28 self-start z-20"
          >
            <div className="relative py-2 space-y-1.5">
              {WHY_GENZWORKS_PILLARS.map((p, i) => {
                const isCurrent = activeWhyIndex === i;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      activeRef.current = i;
                      setActiveWhyIndex(i);
                      const el = cardRefs.current[i];
                      if (el) {
                        const y = el.getBoundingClientRect().top + window.scrollY - 112;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }}
                    className={`group relative w-full text-left py-2.5 px-3 rounded-xl transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.99] flex items-center overflow-hidden ${
                      isCurrent
                        ? 'opacity-100 translate-x-2'
                        : 'opacity-70 hover:opacity-100 translate-x-0'
                    }`}
                  >
                    {/* Pure GPU transform arrow (avoids w-0 -> w-5 width layout reflow during scroll) */}
                    <span
                      style={{
                        transform: isCurrent
                          ? 'translate3d(0px, 0, 0) scale(1.1)'
                          : 'translate3d(-12px, 0, 0) scale(0.75)'
                      }}
                      className={`absolute left-3 text-[#FF4F18] font-extrabold text-lg leading-none transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
                        isCurrent ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      ›
                    </span>
                    <span
                      style={{
                        transform: isCurrent
                          ? 'translate3d(20px, 0, 0) scale(1.03)'
                          : 'translate3d(0px, 0, 0) scale(1)'
                      }}
                      className={`text-base sm:text-[17px] tracking-tight origin-left transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isCurrent ? 'font-extrabold' : 'font-medium opacity-80'
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
            {WHY_GENZWORKS_PILLARS.map((p, i) => (
              <WhyPillarCard
                key={i}
                p={p}
                i={i}
                isCurrent={activeWhyIndex === i}
                isExpanded={expandedWhyIndex === i}
                onToggle={handleToggleCard}
                registerCardRef={registerCardRef}
                registerFlipRef={registerFlipRef}
                registerBgRef={registerBgRef}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default WhyUsSection;
