import React, { useState, useEffect, useRef, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { Plus, ArrowUpRight, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/faq';

const FLIP_DURATION = 260;
const FLIP_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

const FaqRow = React.memo(function FaqRow({
  item,
  idx,
  isOpen,
  onToggle,
  registerFlipRef,
  registerBgRef
}) {
  return (
    <div
      ref={(el) => registerFlipRef(idx, el)}
      style={{ contain: 'layout style' }}
      className="relative"
    >
      {/* Dedicated GPU-scaled background layer so open/close height changes animate with 0 per-frame layout reflow */}
      <div
        ref={(el) => registerBgRef(idx, el)}
        style={{ transformOrigin: 'top center' }}
        className={`absolute inset-0 rounded-2xl border pointer-events-none transition-[border-color,background-color] duration-200 ${
          isOpen
            ? 'bg-white dark:bg-[#13131A] border-[#FF4F18]/50 shadow-sm'
            : 'bg-white/85 dark:bg-[#111116]/85 border-black/[0.08] dark:border-white/10'
        }`}
      />

      <div className="relative z-10">
        <button
          type="button"
          onClick={() => onToggle(idx)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${idx}`}
          className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer active:scale-[0.995] transition-transform duration-150 group/faq"
        >
          <span className="text-sm sm:text-base font-bold tracking-tight leading-snug transition-colors duration-200 group-hover/faq:text-[#FF4F18]">
            {item.q}
          </span>
          <span
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-[transform,background-color,color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isOpen
                ? 'bg-[#FF4F18] text-white rotate-45 scale-105'
                : 'bg-black/[0.05] dark:bg-white/[0.08] text-current rotate-0 group-hover/faq:bg-[#FF4F18] group-hover/faq:text-white'
            }`}
          >
            <Plus className="w-4 h-4" />
          </span>
        </button>

        {isOpen && (
          <div id={`faq-answer-${idx}`} className="why-details-enter px-5 pb-5 sm:px-6 sm:pb-6">
            <div className="pt-3.5 border-t border-black/10 dark:border-white/10 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {item.a}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

const FaqSection = React.memo(function FaqSection({ jumpTo }) {
  const [openIdx, setOpenIdx] = useState(0);
  const flipRefs = useRef([]);
  const bgRefs = useRef([]);
  const animsRef = useRef([]);

  const registerFlipRef = useCallback((idx, el) => {
    flipRefs.current[idx] = el;
  }, []);

  const registerBgRef = useCallback((idx, el) => {
    bgRefs.current[idx] = el;
  }, []);

  useEffect(() => {
    return () => {
      animsRef.current.forEach((a) => {
        try {
          a.cancel();
        } catch {
          // Ignore cancelled animations during unmount
        }
      });
      animsRef.current = [];
    };
  }, []);

  const handleToggle = useCallback((idx) => {
    const canAnimate =
      typeof document !== 'undefined' &&
      typeof Element !== 'undefined' &&
      typeof Element.prototype.animate === 'function' &&
      !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (!canAnimate) {
      setOpenIdx((prev) => (prev === idx ? null : idx));
      return;
    }

    const beforeRects = flipRefs.current.map((el) => (el ? el.getBoundingClientRect() : null));

    animsRef.current.forEach((a) => {
      try {
        a.cancel();
      } catch {
        // Ignore cancelled animations before starting next FLIP transition
      }
    });
    animsRef.current = [];

    flushSync(() => {
      setOpenIdx((prev) => (prev === idx ? null : idx));
    });

    const afterRects = flipRefs.current.map((el) => (el ? el.getBoundingClientRect() : null));
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

  return (
    <section id="faq" className="py-24 px-4 sm:px-10 max-w-[1280px] mx-auto relative z-10 border-t border-black/10 dark:border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
          <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-[#FF4F18] font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>[06] / FAQ &amp; CLARITY</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.06]">
            Questions Clients Ask <span className="font-editorial italic font-normal text-[#FF4F18]">Before Launch.</span>
          </h2>

          <p className="text-sm sm:text-base opacity-75 leading-relaxed max-w-md">
            Straight answers on timelines, ownership, academic mentorship, and how we collaborate at GENZWORKS.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => jumpTo('contact')}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#0E0E10] text-white dark:bg-white dark:text-[#0E0E10] font-bold text-xs uppercase tracking-wider hover:scale-[1.03] active:scale-95 transition-transform duration-200 cursor-pointer shadow-lg"
            >
              <span>Ask Your Question</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        <div style={{ contain: 'layout style' }} className="lg:col-span-7 space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => (
            <FaqRow
              key={item.q}
              item={item}
              idx={idx}
              isOpen={openIdx === idx}
              onToggle={handleToggle}
              registerFlipRef={registerFlipRef}
              registerBgRef={registerBgRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default FaqSection;
