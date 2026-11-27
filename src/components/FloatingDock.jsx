import React, { useState, useRef, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Menu, Home, Folder, Sliders, Workflow, UserCheck, Zap, Mail } from 'lucide-react';

const DOCK_ITEMS = [
  { id: 'home', label: 'Home', hint: 'Top', icon: Home },
  { id: 'works', label: 'Products', hint: 'Our Work', icon: Folder },
  { id: 'why-us', label: 'Why Us', hint: 'Why Choose Us', icon: Sliders },
  { id: 'process', label: 'Process', hint: 'How We Work', icon: Workflow },
  { id: 'about', label: 'About', hint: 'Team & Vision', icon: UserCheck },
  { id: 'services', label: 'Services', hint: 'What We Do', icon: Zap },
  { id: 'contact', label: 'Contact', fullLabel: 'Contact Us', hint: 'Start Project', icon: Mail }
];

const FloatingDock = React.memo(function FloatingDock({
  heroRevealed,
  isScrolled,
  activeNav,
  jumpTo
}) {
  const [dockHovered, setDockHovered] = useState(false);
  const [dockManuallyOpen, setDockManuallyOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const dockRef = useRef(null);
  const dockHoverTimeoutRef = useRef(null);

  const isDockCollapsed = isScrolled && !dockHovered && !dockManuallyOpen;
  const activeTooltipItem = hoveredIdx !== null ? DOCK_ITEMS[hoveredIdx] : null;

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dockRef.current && !dockRef.current.contains(e.target)) {
        setDockManuallyOpen(false);
        setHoveredIdx(null);
      }
    };
    document.addEventListener('pointerdown', handleOutsideClick);
    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
      if (dockHoverTimeoutRef.current) clearTimeout(dockHoverTimeoutRef.current);
    };
  }, []);

  return (
    <nav
      aria-label="Section Navigation"
      className={`fixed bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-50 transition-[transform,opacity] duration-700 ${
        heroRevealed ? 'framer-floating-dock' : 'opacity-0 translate-y-12'
      }`}
    >
      <div
        ref={dockRef}
        onMouseEnter={() => {
          if (dockHoverTimeoutRef.current) clearTimeout(dockHoverTimeoutRef.current);
          setDockHovered(true);
        }}
        onMouseLeave={() => {
          if (dockHoverTimeoutRef.current) clearTimeout(dockHoverTimeoutRef.current);
          setHoveredIdx(null);
          dockHoverTimeoutRef.current = setTimeout(() => {
            setDockHovered(false);
          }, 90);
        }}
        onClick={() => {
          setDockManuallyOpen(true);
          setDockHovered(true);
        }}
        style={{
          width: isDockCollapsed ? '58px' : 'min(580px, calc(100vw - 20px))',
          height: isDockCollapsed ? '58px' : '64px'
        }}
        className={`liquid-glass-dock rounded-full relative select-none cursor-pointer flex items-center justify-center ${
          isDockCollapsed
            ? 'shadow-[0_16px_40px_rgba(0,0,0,0.35)] hover:scale-110 active:scale-95'
            : 'shadow-2xl'
        }`}
        title={isDockCollapsed ? 'Menu — Click or hover to open navigation' : ''}
      >
        {/* Interactive Gliding Page Preview Pill (unclipped above the glass dock on hover/focus) */}
        <AnimatePresence>
          {!isDockCollapsed && activeTooltipItem && hoveredIdx !== null && (
            <m.div
              key="dock-floating-label"
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.92 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              style={{
                left: `${((hoveredIdx + 0.5) / DOCK_ITEMS.length) * 100}%`,
                transition: 'left 200ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="hidden sm:flex absolute -top-11 -translate-x-1/2 items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0E0E10] dark:bg-white text-white dark:text-[#0E0E10] text-[11px] font-mono-tech font-bold tracking-wide shadow-xl border border-white/15 dark:border-black/10 whitespace-nowrap z-40 pointer-events-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9FF3F] dark:bg-[#FF4F18]" />
              <span>{activeTooltipItem.fullLabel || activeTooltipItem.label}</span>
              <span className="opacity-55 font-normal">· {activeTooltipItem.hint}</span>
            </m.div>
          )}
        </AnimatePresence>

        {/* Rounded Inner Clip Shell for Dock Tracks */}
        <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
          {/* Collapsed Menubar Icon View */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isDockCollapsed
                ? 'opacity-100 scale-100 rotate-0 pointer-events-auto delay-75'
                : 'opacity-0 scale-50 rotate-90 pointer-events-none'
            }`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setDockManuallyOpen((prev) => !prev);
                setDockHovered(true);
              }}
              className="w-full h-full flex items-center justify-center cursor-pointer active:scale-95 transition-transform duration-150"
              aria-label="Open Navigation Menu"
            >
              <div className="relative flex items-center justify-center">
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-900 dark:text-white group-hover:text-[#D9FF3F] transition-colors duration-200" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#D9FF3F] shadow-[0_0_8px_#D9FF3F] animate-pulse" />
              </div>
            </button>
          </div>

          {/* Full Expanded Dock Items View with Staggered Animated Page Labels */}
          <div
            className={`w-[580px] max-w-[calc(100vw-20px)] h-full px-1.5 sm:px-3 grid grid-cols-7 items-center shrink-0 transition-opacity duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isDockCollapsed
                ? 'opacity-0 pointer-events-none'
                : 'opacity-100 pointer-events-auto'
            }`}
          >
            {DOCK_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              const isItemHovered = hoveredIdx === idx;
              const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onFocus={() => setHoveredIdx(idx)}
                  onBlur={() => setHoveredIdx(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.currentTarget.blur();
                    setHoveredIdx(null);
                    jumpTo(item.id);
                    setDockManuallyOpen(false);
                    setDockHovered(false);
                    if (dockHoverTimeoutRef.current) clearTimeout(dockHoverTimeoutRef.current);
                  }}
                  style={{
                    transitionDelay: isDockCollapsed ? '0ms' : `${idx * 24}ms`
                  }}
                  className={`group/dockitem relative flex flex-col items-center justify-center gap-1 py-1 px-0.5 rounded-2xl transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-90 cursor-pointer ${
                    isDockCollapsed ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                  }`}
                  aria-label={item.fullLabel || item.label}
                >
                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-[transform,background-color,color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isItemHovered
                        ? '-translate-y-0.5 scale-[1.12] bg-[#0E0E10] text-[#D9FF3F] dark:bg-white dark:text-black'
                        : isNeighbor
                        ? '-translate-y-0.5 scale-105 bg-black/10 dark:bg-white/15 text-zinc-900 dark:text-white'
                        : isActive
                        ? 'bg-[#0E0E10] text-[#D9FF3F] dark:bg-white dark:text-black scale-105'
                        : 'text-zinc-700 dark:text-zinc-300 group-hover/dockitem:bg-black/10 dark:group-hover/dockitem:bg-white/10'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>

                  <span
                    className={`text-[8.5px] min-[375px]:text-[9.5px] sm:text-[10px] leading-none tracking-tight whitespace-nowrap transition-[transform,color,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isItemHovered
                        ? 'translate-y-0.5 font-bold text-zinc-950 dark:text-white opacity-100 scale-105'
                        : isActive
                        ? 'font-bold text-zinc-950 dark:text-white opacity-100 scale-105'
                        : 'font-semibold text-zinc-600 dark:text-zinc-300 opacity-85'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
});

export default FloatingDock;
