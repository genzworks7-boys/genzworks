import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowUpRight } from 'lucide-react';
import { STUDIO_TOOLS } from '../data/brandConfig';

export default function ToolsEcosystem() {
  const [activeToolCategory, setActiveToolCategory] = useState('All');

  const filteredStudioTools =
    activeToolCategory === 'All'
      ? STUDIO_TOOLS
      : STUDIO_TOOLS.filter((t) => t.group === activeToolCategory);

  return (
    <section id="tools" className="py-20 border-y border-current/10 relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#FF4F18]/30 bg-[#FF4F18]/10 text-[#FF4F18] font-mono-tech text-[11px] uppercase tracking-widest font-bold mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>/ TOOLS &amp; ECOSYSTEM • FRAMER PHYSICS</span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
              Powered by <span className="font-editorial italic font-normal text-[#FF4F18]">Industry-Standard</span> Craft Tools.
            </h3>
          </div>

          {/* Interactive Category Filter Pills with Framer Spring Physics */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl liquid-glass self-start lg:self-end">
            {['All', 'Frontend', 'Design', 'Motion & Media', 'Backend & Cloud'].map((cat) => {
              const active = activeToolCategory === cat;
              return (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveToolCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold tracking-tight transition-all cursor-pointer ${
                    active
                      ? 'bg-[#0E0E10] text-[#D9FF3F] dark:bg-white dark:text-[#0E0E10] shadow-lg scale-[1.03]'
                      : 'opacity-65 hover:opacity-100 hover:bg-current/5'
                  }`}
                >
                  {cat}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Studio Craft Tools Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredStudioTools.map((tool, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 22, delay: index * 0.04 }}
              key={tool.name}
              className="group relative p-6 sm:p-7 rounded-[28px] bg-white/90 dark:bg-[#111116]/90 border border-black/[0.08] dark:border-white/10 hover:border-[#FF4F18]/40 dark:hover:border-[#FF4F18]/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              {/* Subtle Radial Glow on Hover */}
              <div
                className="absolute -right-12 -top-12 w-44 h-44 rounded-full opacity-0 group-hover:opacity-25 transition-opacity duration-500 blur-2xl pointer-events-none"
                style={{ backgroundColor: tool.accent === '#FFFFFF' ? '#FF4F18' : tool.accent }}
              />

              <div>
                {/* Top Row: Squircle Icon & Monospace Pill Badge */}
                <div className="flex items-center justify-between gap-4 mb-7">
                  <div className="w-14 h-14 rounded-2xl bg-black/[0.04] dark:bg-white/[0.08] border border-black/[0.06] dark:border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:rotate-[-2deg] transition-transform duration-500 shadow-sm">
                    {tool.svg}
                  </div>

                  <span className="px-3.5 py-1.5 rounded-full text-[11px] font-mono-tech font-bold uppercase tracking-wider border border-black/10 dark:border-white/15 text-zinc-600 dark:text-zinc-300 bg-black/[0.02] dark:bg-white/[0.05] group-hover:border-[#FF4F18] group-hover:text-[#FF4F18] group-hover:bg-[#FF4F18]/10 transition-all duration-300">
                    {tool.proficiency}
                  </span>
                </div>

                {/* Middle Content: Title, Category & Arrow */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug group-hover:text-[#FF4F18] transition-colors duration-300">
                      {tool.name}
                    </h4>
                    <ArrowUpRight className="w-5 h-5 text-[#FF4F18] opacity-0 -translate-x-1.5 translate-y-1.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-1">
                    {tool.category}
                  </p>
                </div>
              </div>

              {/* Animated Bottom Progress Accent Bar */}
              <div className="mt-6 h-[2.5px] w-full bg-current/10 rounded-full overflow-hidden">
                <div
                  className="h-full w-0 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ backgroundColor: tool.accent === '#FFFFFF' ? '#FF4F18' : tool.accent }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
