import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Layers, ArrowUpRight } from 'lucide-react';
import { STUDIO_TOOLS } from '../data/tools';

const TOOL_CATEGORIES = ['All', 'Frontend', 'Design', 'Motion & Media', 'Backend & Cloud'];

const ToolsSection = React.memo(function ToolsSection() {
  const [activeToolCategory, setActiveToolCategory] = useState('All');
  const sectionRef = useRef(null);

  const filteredStudioTools = useMemo(() => {
    return activeToolCategory === 'All'
      ? STUDIO_TOOLS
      : STUDIO_TOOLS.filter((t) => t.group === activeToolCategory);
  }, [activeToolCategory]);

  // Scoped IntersectionObserver only re-observes filtered cards inside #tools (0 global queries)
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 80px 0px' }
    );

    const cards = root.querySelectorAll('.reveal-on-scroll');
    cards.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeToolCategory]);

  return (
    <section id="tools" ref={sectionRef} className="py-20 border-y border-black/10 dark:border-white/10 relative z-10 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 reveal-on-scroll">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#FF4F18]/30 bg-[#FF4F18]/10 text-[#FF4F18] font-mono-tech text-[11px] uppercase tracking-widest font-bold mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>/ TOOLS &amp; ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
              Powered by <span className="font-editorial italic font-normal text-[#FF4F18]">Industry-Standard</span> Craft Tools.
            </h2>
          </div>

          {/* Interactive Category Filter Pills with Framer Spring Physics */}
          <div className="flex flex-wrap lg:flex-nowrap items-center gap-1.5 xl:gap-2 p-1.5 rounded-2xl liquid-glass self-start lg:self-end lg:shrink-0">
            {TOOL_CATEGORIES.map((cat) => {
              const active = activeToolCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveToolCategory(cat)}
                  className={`px-3 py-1.5 xl:px-4 xl:py-2 rounded-xl text-xs font-extrabold tracking-tight whitespace-nowrap transition-[transform,background-color,color,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-95 ${
                    active
                      ? 'bg-[#0E0E10] text-[#D9FF3F] dark:bg-white dark:text-[#0E0E10] shadow-lg scale-[1.03]'
                      : 'opacity-65 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Studio Craft Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudioTools.map((tool, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={tool.name}
                style={{
                  contain: 'layout style paint',
                  transitionDelay: `${(index % 3) * 45}ms`
                }}
                className={`reveal-on-scroll ${activeToolCategory !== 'All' ? 'reveal-active' : ''} tool-card-reveal ${
                  isEven ? 'tool-reveal-left' : 'tool-reveal-right'
                } group relative p-6 sm:p-7 rounded-[28px] bg-white/95 dark:bg-[#111116]/95 border border-black/[0.08] dark:border-white/10 hover:border-[#FF4F18]/40 dark:hover:border-[#FF4F18]/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between`}
              >
                {/* Subtle Radial Glow on Hover (pre-faded gradient avoids GPU blur shader pass) */}
                <div
                  className="absolute -right-12 -top-12 w-56 h-56 rounded-full opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${tool.accent === '#FFFFFF' ? '#FF4F18' : tool.accent} 0%, transparent 70%)`
                  }}
                />

                <div>
                  {/* Top Row: Squircle Icon & Monospace Pill Badge */}
                  <div className="flex items-center justify-between gap-4 mb-7">
                    <div className="w-14 h-14 rounded-2xl bg-black/[0.04] dark:bg-white/[0.08] border border-black/[0.06] dark:border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:rotate-[-2deg] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sm">
                      {tool.svg}
                    </div>

                    <span className="px-3.5 py-1.5 rounded-full text-[11px] font-mono-tech font-bold uppercase tracking-wider border border-black/10 dark:border-white/15 text-zinc-600 dark:text-zinc-300 bg-black/[0.02] dark:bg-white/[0.05] group-hover:border-[#FF4F18] group-hover:text-[#FF4F18] group-hover:bg-[#FF4F18]/10 transition-colors duration-300">
                      {tool.proficiency}
                    </span>
                  </div>

                  {/* Middle Content: Title, Category & Arrow */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug group-hover:text-[#FF4F18] transition-colors duration-300">
                        {tool.name}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-[#FF4F18] shrink-0 opacity-0 -translate-x-1.5 translate-y-1.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-[transform,opacity] duration-300" />
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-1">
                      {tool.category}
                    </p>
                  </div>
                </div>

                {/* Animated Bottom Progress Accent Bar (GPU scaleX avoids width reflow) */}
                <div className="mt-6 h-[2.5px] w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ backgroundColor: tool.accent === '#FFFFFF' ? '#FF4F18' : tool.accent }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default ToolsSection;
