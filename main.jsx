import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import { resolveMemberPhoto } from './src/teamImages.js';
import { INITIAL_TEAM } from './src/data/team';

import Modals from './src/components/Modals';
import HeroSection from './src/components/HeroSection';
import ToolsSection from './src/components/ToolsSection';
import WorksSection from './src/components/WorksSection';
import WhyUsSection from './src/components/WhyUsSection';
import ProcessSection from './src/components/ProcessSection';
import AboutSection from './src/components/AboutSection';
import ServicesSection from './src/components/ServicesSection';
import ContactFooterSection from './src/components/ContactFooterSection';
import FloatingDock from './src/components/FloatingDock';

const RESOLVED_TEAM = INITIAL_TEAM.map((m) => {
  const resolved = resolveMemberPhoto(m.id, m.photo);
  return { ...m, photo: resolved.photo };
});

const NAV_SECTION_IDS = ['home', 'works', 'why-us', 'process', 'about', 'services', 'contact'];

export default function App() {
  const [themeChoice, setThemeChoice] = useState('light');
  const [resolvedTheme, setResolvedTheme] = useState('light');
  const [activeNav, setActiveNav] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeLegalModal, setActiveLegalModal] = useState(null);
  const [isJoinTeamModalOpen, setIsJoinTeamModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState(null);
  const [loaderPhase, setLoaderPhase] = useState('start');

  const activeNavRef = useRef('home');
  const isScrolledRef = useRef(false);
  const toastTimerRef = useRef(null);

  // Full-Screen "Are you ready?" Intro Loader
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

  // Theme resolution
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

  // Lightweight global scroll tracker for Active Nav & Floating Dock Collapse (cached elements, rAF throttled)
  useEffect(() => {
    let ticking = false;
    const cachedSections = {};
    NAV_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) cachedSections[id] = el;
    });

    const handleScroll = () => {
      ticking = false;
      const shouldCollapse = window.scrollY > 80;
      if (isScrolledRef.current !== shouldCollapse) {
        isScrolledRef.current = shouldCollapse;
        setIsScrolled(shouldCollapse);
      }

      for (let i = 0; i < NAV_SECTION_IDS.length; i++) {
        const id = NAV_SECTION_IDS[i];
        const el = cachedSections[id] || document.getElementById(id);
        if (el) {
          cachedSections[id] = el;
          const r = el.getBoundingClientRect();
          if (r.top <= 240 && r.bottom >= 240) {
            if (activeNavRef.current !== id) {
              activeNavRef.current = id;
              setActiveNav(id);
            }
            break;
          }
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(handleScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveal IntersectionObserver (unobserves immediately after reveal — zero scroll overhead)
  useEffect(() => {
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

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loaderPhase]);

  const triggerToast = useCallback((msg) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(msg);
    toastTimerRef.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const jumpTo = useCallback((id) => {
    activeNavRef.current = id;
    setActiveNav(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleSelectServiceFromCard = useCallback(
    (serviceTitle) => {
      let chipName = serviceTitle;
      if (serviceTitle.includes('Commercial Poster')) chipName = 'Commercial Posters';
      else if (serviceTitle.includes('Academic')) chipName = 'Academic Mentorship';
      else if (serviceTitle.includes('Video')) chipName = 'Video & Multimedia';
      else if (serviceTitle.includes('Content')) chipName = 'Content & Copywriting';
      else if (serviceTitle.includes('Graphic')) chipName = 'Graphic Design';
      else if (serviceTitle.includes('Web')) chipName = 'Web Development';

      setPreselectedService({ name: chipName, ts: Date.now() });
      jumpTo('contact');
      triggerToast(`Selected "${chipName}" for your project inquiry!`);
    },
    [jumpTo, triggerToast]
  );

  const isDark = resolvedTheme === 'dark';
  const heroRevealed = loaderPhase === 'curtain' || loaderPhase === 'done';

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div
          className={`min-h-screen transition-colors duration-700 selection:bg-[#0E0E10] selection:text-[#D9FF3F] ${
            isDark ? 'dark bg-[#060608] text-[#F5F5F3]' : 'bg-[#FFFFFF] text-[#0E0E10]'
          } antialiased overflow-x-clip relative has-custom-cursor`}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          <Modals
            loaderPhase={loaderPhase}
            toast={toast}
            activeLegalModal={activeLegalModal}
            setActiveLegalModal={setActiveLegalModal}
            isJoinTeamModalOpen={isJoinTeamModalOpen}
            setIsJoinTeamModalOpen={setIsJoinTeamModalOpen}
            triggerToast={triggerToast}
          />

          <div className="liquid-blob-1" />
          <div className="liquid-blob-2" />

          <HeroSection
            heroRevealed={heroRevealed}
            resolvedTheme={resolvedTheme}
            setThemeChoice={setThemeChoice}
            triggerToast={triggerToast}
            jumpTo={jumpTo}
          />

          <ToolsSection />

          <WorksSection />

          <WhyUsSection />

          <ProcessSection />

          <AboutSection
            team={RESOLVED_TEAM}
            setIsJoinTeamModalOpen={setIsJoinTeamModalOpen}
          />

          <ServicesSection handleSelectServiceFromCard={handleSelectServiceFromCard} />

          <ContactFooterSection
            preselectedService={preselectedService}
            triggerToast={triggerToast}
            jumpTo={jumpTo}
            setActiveLegalModal={setActiveLegalModal}
          />

          <FloatingDock
            heroRevealed={heroRevealed}
            isScrolled={isScrolled}
            activeNav={activeNav}
            jumpTo={jumpTo}
          />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
