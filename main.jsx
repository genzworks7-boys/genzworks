import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Modular Component Imports
import CustomCursor from './src/components/CustomCursor';
import IntroLoader from './src/components/IntroLoader';
import Navbar from './src/components/Navbar';
import Hero from './src/components/Hero';
import ToolsEcosystem from './src/components/ToolsEcosystem';
import Works from './src/components/Works';
import WhyUs from './src/components/WhyUs';
import Process from './src/components/Process';
import Team from './src/components/Team';
import Services from './src/components/Services';
import Contact from './src/components/Contact';
import Footer from './src/components/Footer';

// Lazy-loaded Modals for Optimum Initial Bundle Size
const LegalModal = lazy(() => import('./src/components/modals/LegalModal'));
const JoinTeamModal = lazy(() => import('./src/components/modals/JoinTeamModal'));

export default function App() {
  // Theme State
  const [themeChoice, setThemeChoice] = useState('system');
  const [resolvedTheme, setResolvedTheme] = useState('dark');
  const isDark = resolvedTheme === 'dark';

  // Navigation & Scroll State
  const [activeNav, setActiveNav] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [processFill, setProcessFill] = useState(0);
  const [stackProgress, setStackProgress] = useState([0, 0, 0, 0]);
  const [activeWhyIndex, setActiveWhyIndex] = useState(0);

  // Modals & User Feedback
  const [activeLegalModal, setActiveLegalModal] = useState(null); // 'terms' | 'privacy' | null
  const [isJoinTeamModalOpen, setIsJoinTeamModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Intro Loader State
  const [loaderPhase, setLoaderPhase] = useState('start'); // 'start' -> 'are-you' -> 'ready' -> 'curtain' -> 'done'

  // Selected Services for Inquiry
  const [selectedServices, setSelectedServices] = useState(['Web Development']);

  // Refs for Scroll Measurements
  const processRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  // Trigger Toast Notification
  const triggerToast = (msg) => {
    setToast(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToast(null), 3200);
  };

  // Smooth Scroll Jump
  const jumpTo = (id) => {
    setActiveNav(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Service Selection from Service Cards
  const handleSelectService = (serviceTitle) => {
    let chipName = serviceTitle;
    if (serviceTitle.includes('Commercial Poster')) chipName = 'Commercial Posters';
    else if (serviceTitle.includes('Academic')) chipName = 'Academic Mentorship';
    else if (serviceTitle.includes('Video')) chipName = 'Video & Multimedia';
    else if (serviceTitle.includes('Content')) chipName = 'Content & Copywriting';
    else if (serviceTitle.includes('Graphic')) chipName = 'Graphic Design';
    else if (serviceTitle.includes('Web')) chipName = 'Web Development';

    setSelectedServices((prev) => (prev.includes(chipName) ? prev : [...prev, chipName]));
    jumpTo('contact');
    triggerToast(`Selected "${chipName}" for your project inquiry!`);
  };

  // Theme Sync Effect
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const mode = themeChoice === 'system' ? (media.matches ? 'dark' : 'light') : themeChoice;
      setResolvedTheme(mode);
      if (mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [themeChoice]);

  // Intro Loader Timeline Sequence
  useEffect(() => {
    const t1 = setTimeout(() => setLoaderPhase('are-you'), 120);
    const t2 = setTimeout(() => setLoaderPhase('ready'), 780);
    const t3 = setTimeout(() => setLoaderPhase('curtain'), 1850);
    const t4 = setTimeout(() => setLoaderPhase('done'), 2750);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // High-Performance Scroll Listener (rAF throttled)
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Process timeline fill calculation
          if (processRef.current) {
            const rect = processRef.current.getBoundingClientRect();
            const vh = window.innerHeight;
            const progress = (vh * 0.65 - rect.top) / (rect.height * 0.85);
            const clamped = Math.max(0.05, Math.min(1, progress));
            setProcessFill((prev) => (Math.abs(prev - clamped) > 0.02 ? clamped : prev));
          }

          // Active navigation item tracking
          const sectionIds = ['home', 'works', 'why-us', 'process', 'about', 'services', 'contact'];
          for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el) {
              const r = el.getBoundingClientRect();
              if (r.top <= 240 && r.bottom >= 240) {
                setActiveNav((prev) => (prev !== id ? id : prev));
                break;
              }
            }
          }

          // Stack Cards Overlap Calculation (Desktop Only)
          if (window.innerWidth >= 640) {
            const stackCards = document.querySelectorAll('.product-stack-card');
            if (stackCards.length > 0) {
              const nextProgress = Array.from(stackCards).map((card, idx) => {
                let coveredDepth = 0;
                for (let j = idx + 1; j < stackCards.length; j++) {
                  const nextRect = stackCards[j].getBoundingClientRect();
                  const nextStickyTop = 104 + j * 22;
                  const distance = nextRect.top - nextStickyTop;
                  const ratio = Math.max(0, Math.min(1, 1 - distance / 420));
                  coveredDepth += ratio;
                }
                return coveredDepth;
              });
              setStackProgress((prev) => {
                const changed = nextProgress.some((v, i) => Math.abs((prev[i] || 0) - v) > 0.04);
                return changed ? nextProgress : prev;
              });
            }
          }

          // Why Us active pillar card sync
          const whyCards = document.querySelectorAll('.why-pillar-card');
          if (whyCards.length > 0) {
            const stickyNav = document.getElementById('why-sticky-nav');
            const triggerY = stickyNav
              ? stickyNav.getBoundingClientRect().top + 90
              : window.innerHeight * 0.34;

            let currentWhy = 0;
            whyCards.forEach((card, idx) => {
              const rect = card.getBoundingClientRect();
              if (rect.top <= triggerY + 80) {
                currentWhy = idx;
              }
            });
            setActiveWhyIndex((prev) => (prev !== currentWhy ? currentWhy : prev));
          }

          // Dynamic Floating Dock Collapse State
          const scrolled = window.scrollY > 80;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroRevealed = loaderPhase === 'curtain' || loaderPhase === 'done';

  return (
    <div
      className={`min-h-screen transition-colors duration-700 selection:bg-[#0E0E10] selection:text-[#D9FF3F] ${
        isDark ? 'dark bg-[#060608] text-[#F5F5F3]' : 'bg-[#FFFFFF] text-[#0E0E10]'
      } antialiased overflow-x-clip relative has-custom-cursor`}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Precision GPU Zero-Render Custom Cursor */}
      <CustomCursor />

      {/* Cinematic Curtain Reveal Intro Loader */}
      <IntroLoader loaderPhase={loaderPhase} />

      {/* Ambient Liquid Gradient Blobs */}
      <div className="liquid-blob-1" />
      <div className="liquid-blob-2" />

      {/* Floating Spring Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#0E0E10] text-white text-xs font-bold tracking-wide shadow-2xl border border-white/15"
          >
            <span className="w-2 h-2 rounded-full bg-[#D9FF3F] animate-pulse" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <Hero
        resolvedTheme={resolvedTheme}
        setThemeChoice={setThemeChoice}
        triggerToast={triggerToast}
        jumpTo={jumpTo}
      />

      {/* Tools Ecosystem Section */}
      <ToolsEcosystem />

      {/* Product Showcase (Sharp Crackers Stack) */}
      <Works stackProgress={stackProgress} />

      {/* Why Us Section */}
      <WhyUs
        activeWhyIndex={activeWhyIndex}
        setActiveWhyIndex={setActiveWhyIndex}
      />

      {/* Process Section */}
      <Process
        processRef={processRef}
        processFill={processFill}
      />

      {/* Team Section */}
      <Team
        onOpenJoinModal={() => setIsJoinTeamModalOpen(true)}
      />

      {/* Services Section */}
      <Services
        onSelectService={handleSelectService}
      />

      {/* Contact & Studio Footer (Dark Rounded Envelope) */}
      <footer
        id="contact"
        className="relative z-10 bg-[#08080A] text-[#F5F5F3] pt-24 sm:pt-32 pb-28 sm:pb-32 rounded-t-[40px] sm:rounded-t-[64px] mt-12 overflow-hidden"
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-12">
          <Contact
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
            triggerToast={triggerToast}
          />
          <Footer
            jumpTo={jumpTo}
            onOpenLegalModal={setActiveLegalModal}
          />
        </div>
      </footer>

      {/* Dynamic Morphing Floating Dock (Framer Spring Physics) */}
      <Navbar
        activeNav={activeNav}
        jumpTo={jumpTo}
        isScrolled={isScrolled}
        heroRevealed={heroRevealed}
      />

      {/* Lazy Modals with Suspense */}
      <Suspense fallback={null}>
        {activeLegalModal && (
          <LegalModal
            activeLegalModal={activeLegalModal}
            setActiveLegalModal={setActiveLegalModal}
            jumpTo={jumpTo}
          />
        )}
        {isJoinTeamModalOpen && (
          <JoinTeamModal
            isOpen={isJoinTeamModalOpen}
            onClose={() => setIsJoinTeamModalOpen(false)}
            triggerToast={triggerToast}
          />
        )}
      </Suspense>
    </div>
  );
}
