import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  Home,
  Folder,
  Sliders,
  Workflow,
  UserCheck,
  Zap,
  Mail
} from 'lucide-react';

export default function Navbar({
  activeNav,
  jumpTo,
  isScrolled,
  heroRevealed
}) {
  const [dockHovered, setDockHovered] = useState(false);
  const [dockManuallyOpen, setDockManuallyOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const dockHoverTimeoutRef = useRef(null);
  const dockRef = useRef(null);

  const isDockCollapsed = isScrolled && !dockHovered && !dockManuallyOpen;

  const NAV_ITEMS = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'works', label: 'Products', icon: Folder },
    { id: 'why-us', label: 'Why Us', icon: Sliders },
    { id: 'process', label: 'Process', icon: Workflow },
    { id: 'about', label: 'About', icon: UserCheck },
    { id: 'services', label: 'Services', icon: Zap },
    { id: 'contact', label: 'Contact Us', icon: Mail }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: heroRevealed ? 1 : 0,
        y: heroRevealed ? 0 : 40
      }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.2 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <motion.div
        ref={dockRef}
        onMouseEnter={() => {
          if (dockHoverTimeoutRef.current) clearTimeout(dockHoverTimeoutRef.current);
          setDockHovered(true);
        }}
        onMouseLeave={() => {
          if (dockHoverTimeoutRef.current) clearTimeout(dockHoverTimeoutRef.current);
          dockHoverTimeoutRef.current = setTimeout(() => {
            setDockHovered(false);
          }, 120);
        }}
        onClick={() => {
          setDockManuallyOpen(true);
          setDockHovered(true);
        }}
        animate={{
          width: isDockCollapsed ? 58 : 'min(540px, calc(100vw - 24px))'
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        style={{ height: 58 }}
        className={`liquid-glass-dock rounded-full relative overflow-hidden select-none cursor-pointer flex items-center justify-center ${
          isDockCollapsed
            ? 'shadow-[0_16px_40px_rgba(0,0,0,0.35)] hover:scale-105 active:scale-95'
            : 'shadow-2xl'
        }`}
        title={isDockCollapsed ? 'Menu — Click or hover to open navigation' : ''}
      >
        {/* Collapsed Menubar Icon View */}
        <AnimatePresence>
          {isDockCollapsed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: 90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: -90 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-auto"
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
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-900 dark:text-white group-hover:text-[#D9FF3F] transition-colors" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#D9FF3F] shadow-[0_0_8px_#D9FF3F] animate-pulse" />
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full Expanded Dock Items View */}
        <div
          className={`w-[520px] max-w-[calc(100vw-36px)] h-full px-2 sm:px-4 flex items-center justify-between shrink-0 transition-opacity duration-200 ${
            isDockCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
          }`}
        >
          {NAV_ITEMS.map((item) => {
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
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.currentTarget.blur();
                    jumpTo(item.id);
                    setDockManuallyOpen(false);
                    setDockHovered(false);
                    if (dockHoverTimeoutRef.current) clearTimeout(dockHoverTimeoutRef.current);
                  }}
                  className={`p-2 sm:p-2.5 md:p-3 rounded-full transition-colors flex items-center justify-center cursor-pointer ${
                    isActive
                      ? 'bg-[#0E0E10] text-[#D9FF3F] dark:bg-white dark:text-black shadow-lg font-bold'
                      : 'hover:bg-black/10 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="absolute left-1/2 -top-10 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-[#0E0E10] text-[#D9FF3F] text-[11px] font-mono-tech font-bold uppercase tracking-wider shadow-2xl border border-[#D9FF3F]/30 whitespace-nowrap z-50 pointer-events-none"
                    >
                      {item.label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
