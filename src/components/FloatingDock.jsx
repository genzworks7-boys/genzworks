import React from 'react';
import { Menu, Home, Folder, Sliders, Workflow, UserCheck, Zap, Mail } from 'lucide-react';

export default function FloatingDock({
  heroRevealed,
  dockRef,
  dockHoverTimeoutRef,
  setDockHovered,
  setDockManuallyOpen,
  isDockCollapsed,
  activeNav,
  activeTooltip,
  setActiveTooltip,
  jumpTo
}) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${
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
          dockHoverTimeoutRef.current = setTimeout(() => {
            setDockHovered(false);
          }, 90);
        }}
        onClick={() => {
          setDockManuallyOpen(true);
          setDockHovered(true);
        }}
        style={{
          width: isDockCollapsed ? '58px' : 'min(540px, calc(100vw - 24px))',
          height: '58px'
        }}
        className={`liquid-glass-dock rounded-full relative overflow-hidden select-none cursor-pointer flex items-center justify-center ${
          isDockCollapsed
            ? 'shadow-[0_16px_40px_rgba(0,0,0,0.35)] hover:scale-110 active:scale-95'
            : 'shadow-2xl'
        }`}
        title={isDockCollapsed ? 'Menu — Click or hover to open navigation' : ''}
      >
        {/* Collapsed Menubar Icon View */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isDockCollapsed
              ? 'opacity-100 scale-100 rotate-0 pointer-events-auto delay-100'
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
            className="w-full h-full flex items-center justify-center cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <div className="relative flex items-center justify-center">
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-900 dark:text-white group-hover:text-[#D9FF3F] transition-all duration-300" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#D9FF3F] shadow-[0_0_8px_#D9FF3F] animate-pulse" />
            </div>
          </button>
        </div>

        {/* Full Expanded Dock Items View */}
        <div
          className={`w-[520px] max-w-[calc(100vw-36px)] h-full px-2 sm:px-4 flex items-center justify-between shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isDockCollapsed
              ? 'opacity-0 scale-95 pointer-events-none'
              : 'opacity-100 scale-100 pointer-events-auto'
          }`}
        >
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'works', label: 'Products', icon: Folder },
            { id: 'why-us', label: 'Why Us', icon: Sliders },
            { id: 'process', label: 'Process', icon: Workflow },
            { id: 'about', label: 'About', icon: UserCheck },
            { id: 'services', label: 'Services', icon: Zap },
            { id: 'contact', label: 'Contact Us', icon: Mail }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            const isHovered = activeTooltip === item.id;

            return (
              <div
                key={item.id}
                className="relative flex items-center"
                onMouseEnter={() => setActiveTooltip(item.id)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.currentTarget.blur();
                    jumpTo(item.id);
                    setDockManuallyOpen(false);
                    setDockHovered(false);
                    if (dockHoverTimeoutRef.current) clearTimeout(dockHoverTimeoutRef.current);
                  }}
                  className={`p-2 sm:p-2.5 md:p-3 rounded-full transition-all flex items-center justify-center ${
                    isActive
                      ? 'bg-[#0E0E10] text-[#D9FF3F] dark:bg-white dark:text-black scale-110 shadow-xl'
                      : 'hover:bg-black/10 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 hover:scale-105'
                  }`}
                  title=""
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {isHovered && (
                  <div className="absolute left-1/2 -top-10 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-[#0E0E10] text-[#D9FF3F] text-[11px] font-mono-tech font-bold uppercase tracking-wider shadow-2xl border border-[#D9FF3F]/30 whitespace-nowrap z-50 animate-fadeIn pointer-events-none">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
