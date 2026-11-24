import React, { useState, useEffect, useRef } from 'react';
import { PROCESS_STEPS } from '../data/process';

const ProcessSection = React.memo(function ProcessSection() {
  const [processFill, setProcessFill] = useState(0.2);
  const processRef = useRef(null);
  const barRef = useRef(null);
  const textRef = useRef(null);
  const stepIdxRef = useRef(-1);

  // Scoped scroll tracker: updates GPU transform directly via ref (0 React re-renders per frame; quantized 0..4 step state only)
  useEffect(() => {
    const section = processRef.current;
    if (!section) return;

    let inViewport = false;
    let ticking = false;

    const updateProgress = () => {
      ticking = false;
      if (!inViewport || !section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom >= -100 && rect.top <= vh + 100) {
        const rawProgress = (vh * 0.65 - rect.top) / (rect.height * 0.85);
        const clamped = Math.max(0.05, Math.min(1, rawProgress));
        const pct = Math.round(clamped * 100);

        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${clamped.toFixed(4)})`;
        }
        if (textRef.current) {
          textRef.current.textContent = `${pct}%`;
        }

        const stepIdx = Math.floor(clamped * PROCESS_STEPS.length);
        if (stepIdx !== stepIdxRef.current) {
          stepIdxRef.current = stepIdx;
          setProcessFill(clamped);
        }
      }
    };

    const onScroll = () => {
      if (!inViewport || ticking) return;
      ticking = true;
      requestAnimationFrame(updateProgress);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        if (inViewport) requestAnimationFrame(updateProgress);
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
    <section id="process" ref={processRef} className="py-24 px-4 sm:px-10 max-w-[1280px] mx-auto relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-14 border-b border-current/10 gap-6 reveal-on-scroll">
        <div>
          <div className="font-mono-tech text-xs uppercase tracking-widest opacity-60 mb-3">[03] / OUR WORK PROCESS</div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            A Clear Direction. A <span className="font-editorial italic font-normal">Collaborative</span> Journey.
          </h2>
        </div>

        <div className="flex items-center gap-3 px-4 py-2.5 rounded-full liquid-glass font-mono-tech text-xs shadow-sm">
          <span>TIMELINE PROGRESS</span>
          <div className="w-24 h-2 rounded-full bg-current/10 overflow-hidden">
            <div
              id="process-timeline-bar"
              ref={barRef}
              className="h-full w-full origin-left bg-[#FF4F18] transition-transform duration-300 ease-out"
              style={{ transform: `scaleX(${processFill})`, willChange: 'transform' }}
            />
          </div>
          <span id="process-timeline-text" ref={textRef} className="font-bold">{Math.round(processFill * 100)}%</span>
        </div>
      </div>

      <div className="relative mt-16 max-w-5xl mx-auto">
        <div className="space-y-16 sm:space-y-24">
          {PROCESS_STEPS.map((step, idx) => {
            const stepRatio = (idx + 0.2) / PROCESS_STEPS.length;
            const active = processFill >= stepRatio;
            const cleanNum = step.num.replace('.', '');

            return (
              <div key={step.num} className="relative grid grid-cols-[56px_1fr] sm:grid-cols-[76px_1fr] md:grid-cols-12 gap-3.5 sm:gap-6 md:gap-10 items-stretch md:items-start">
                {/* Left Column: Number + Vertical Stem */}
                <div className="flex flex-col items-center relative self-stretch md:self-auto md:col-span-3">
                  <div
                    className={`text-3xl sm:text-5xl md:text-7xl font-extrabold font-mono-tech tracking-tighter select-none transition-[transform,opacity,color] duration-700 ${
                      active
                        ? 'text-[#FF4F18] drop-shadow-[0_0_25px_rgba(255,79,24,0.45)] scale-105'
                        : 'opacity-20 scale-95'
                    }`}
                  >
                    {cleanNum}
                  </div>

                  {/* Animated Timeline Connecting Line (pure GPU scaleY avoids layout reflow) */}
                  {idx < PROCESS_STEPS.length - 1 && (
                    <div className="w-[2px] flex-1 min-h-[90px] md:h-36 md:flex-initial bg-current/10 relative mt-3 md:mt-4 overflow-hidden rounded-full">
                      <div
                        className="w-full h-full origin-top bg-gradient-to-b from-[#FF4F18] via-[#D9FF3F] to-transparent transition-transform duration-500 ease-out"
                        style={{
                          transform: active ? 'scaleY(1)' : 'scaleY(0)'
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Right Column: Step Content Card */}
                <div
                  className={`md:col-span-9 rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 md:p-10 liquid-glass transition-[transform,opacity,border-color,box-shadow] duration-700 ${
                    active
                      ? 'border-[#FF4F18]/50 shadow-[0_25px_60px_rgba(255,79,24,0.1)] translate-y-0 opacity-100'
                      : 'opacity-55 translate-y-3'
                  }`}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4F18]/15 border border-[#FF4F18]/30 text-[#FF4F18] font-mono-tech text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-3.5 sm:mb-4">
                    <span>STEP {cleanNum}</span>
                    <span>•</span>
                    <span>{step.tag}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mb-2 sm:mb-3">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm md:text-base opacity-75 leading-relaxed mb-5 sm:mb-6">
                    {step.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 pt-3.5 sm:pt-4 border-t border-current/10">
                    {step.deliverables.map((d, i) => (
                      <div key={i} className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl liquid-glass-chip text-[10px] sm:text-[11px] font-bold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F18] shrink-0" />
                        <span className="truncate">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default ProcessSection;
