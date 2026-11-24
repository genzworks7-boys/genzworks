import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BRAND_CONFIG } from './src/data/brand.jsx';
import { INITIAL_TEAM } from './src/data/team.js';
import { resolveMemberPhoto } from './src/teamImages.js';

// Modular Page Sections
import HeroSection from './src/components/HeroSection.jsx';
import ToolsSection from './src/components/ToolsSection.jsx';
import WorksSection from './src/components/WorksSection.jsx';
import WhyUsSection from './src/components/WhyUsSection.jsx';
import ProcessSection from './src/components/ProcessSection.jsx';
import AboutSection from './src/components/AboutSection.jsx';
import ServicesSection from './src/components/ServicesSection.jsx';
import ContactFooterSection from './src/components/ContactFooterSection.jsx';
import FloatingDock from './src/components/FloatingDock.jsx';
import {
  CurtainLoader,
  LegalModal,
  JoinTeamModal,
  ToastNotification
} from './src/components/Modals.jsx';

export default function App() {
  // Theme & Layout State
  const [themeChoice, setThemeChoice] = useState('light');
  const [resolvedTheme, setResolvedTheme] = useState('light');
  const [activeNav, setActiveNav] = useState('home');

  // Copy & Toast State
  const [copied, setCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [toast, setToast] = useState(null);

  // Performance Optimization Refs for 60/120fps Framer-like Smoothness
  const cursorDotRef = useRef(null);
  const activeNavRef = useRef('home');
  const processFillRef = useRef(0.2);
  const activeWhyIndexRef = useRef(0);
  const isScrolledRef = useRef(false);
  const heroVisibleRef = useRef(true);
  const canvasRectRef = useRef(null);

  // Section Specific States
  const processRef = useRef(null);
  const [processFill, setProcessFill] = useState(0.2);

  const [team] = useState(() => {
    return INITIAL_TEAM.map((m) => {
      const resolved = resolveMemberPhoto(m.id, m.photo);
      return {
        ...m,
        photo: resolved.photo
      };
    });
  });
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);

  const [activeWhyIndex, setActiveWhyIndex] = useState(0);
  const [expandedWhyIndex, setExpandedWhyIndex] = useState(null);
  const [hoveredServiceIdx, setHoveredServiceIdx] = useState(null);
  const [activeToolCategory, setActiveToolCategory] = useState('All');

  // Dynamic Morphing Floating Dock State
  const [isScrolled, setIsScrolled] = useState(false);

  // Contact Form State
  const [selectedServices, setSelectedServices] = useState(['Web Development']);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  // Legal Modal State ('terms' | 'privacy' | null)
  const [activeLegalModal, setActiveLegalModal] = useState(null);

  // Join Our Team Application Modal State
  const [isJoinTeamModalOpen, setIsJoinTeamModalOpen] = useState(false);
  const [joinForm, setJoinForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    role: 'Full-Stack Developer',
    customRole: '',
    experience: 'Fresher / Student',
    availability: 'Full-Time',
    skills: '',
    portfolio: '',
    github: '',
    linkedin: '',
    resumeLink: '',
    pitch: ''
  });
  const [isSubmittingJoin, setIsSubmittingJoin] = useState(false);
  const [joinSubmitted, setJoinSubmitted] = useState(false);
  const [joinError, setJoinError] = useState(null);

  // Full-Screen "Are you ready?" Intro Loader State
  const [loaderPhase, setLoaderPhase] = useState('start');
  const heroRevealed = loaderPhase === 'done' || loaderPhase === 'curtain';

  // Hero Canvas Particle State
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({
    x: -9999,
    y: -9999,
    radius: 110,
    strength: 3.5
  });

  // Loader Phase Progression
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

  // Theme Sync
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

  // High-DPI Retina Particle Text ("GenzWorks") with Smart Offscreen Pause
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    let animationFrameId = null;
    let isRunning = false;

    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2.5);

    const palette = resolvedTheme === 'dark'
      ? ['#FFFFFF', '#FFFFFF', '#FAFAFA', '#F4F4F5', '#E4E4E7']
      : ['#09090B', '#09090B', '#18181B', '#18181B', '#27272A'];

    const buildParticles = () => {
      canvasRectRef.current = null;
      const container = canvas.parentElement;
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const isMobile = width < 640;
      const fontSize = isMobile
        ? Math.min(Math.max(width * 0.15, 48), 64)
        : Math.min(Math.max(width * 0.125, 56), 140);

      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.font = `800 ${fontSize}px 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
      offCtx.fillStyle = '#000000';
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillText('GenzWorks', width / 2, height * 0.5);

      const imageData = offCtx.getImageData(0, 0, width, height).data;

      const step = isMobile ? 3.6 : 3.4;
      const particleRadius = isMobile ? 1.6 : 1.5;
      const nextParticles = [];

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (Math.floor(y) * width + Math.floor(x)) * 4 + 3;
          const alpha = imageData[index];
          if (alpha > 70) {
            nextParticles.push({
              x: x,
              y: y,
              originX: x,
              originY: y,
              vx: 0,
              vy: 0,
              radius: particleRadius,
              color: palette[Math.floor(Math.random() * palette.length)]
            });
          }
        }
      }

      particlesRef.current = nextParticles;
    };

    const friction = 0.76;
    const ease = 0.055;
    let waveFrame = 0;

    const renderLoop = () => {
      if (!heroVisibleRef.current) {
        isRunning = false;
        animationFrameId = null;
        return;
      }
      waveFrame += 0.024;
      
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const list = particlesRef.current;
      const m = mouseRef.current;

      for (let i = 0; i < list.length; i++) {
        const p = list[i];
        const dx = m.x - p.x;

        if (dx > -m.radius && dx < m.radius) {
          const dy = m.y - p.y;
          if (dy > -m.radius && dy < m.radius) {
            const distSq = dx * dx + dy * dy;
            const radiusSq = m.radius * m.radius;
            if (distSq < radiusSq && distSq > 0.001) {
              const dist = Math.sqrt(distSq);
              const force = (m.radius - dist) / m.radius;
              const angle = Math.atan2(dy, dx);
              p.vx -= Math.cos(angle) * force * m.strength * 7;
              p.vy -= Math.sin(angle) * force * m.strength * 7;
            }
          }
        }

        const ambientX = Math.sin(waveFrame + p.originY * 0.04) * 0.7;
        const ambientY = Math.cos(waveFrame + p.originX * 0.04) * 0.7;

        p.vx += (p.originX + ambientX - p.x) * ease;
        p.vy += (p.originY + ambientY - p.y) * ease;

        p.vx *= friction;
        p.vy *= friction;

        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    const startLoop = () => {
      if (!isRunning && heroVisibleRef.current) {
        isRunning = true;
        renderLoop();
      }
    };

    const stopLoop = () => {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.01 }
    );

    if (canvas.parentElement) {
      heroObserver.observe(canvas.parentElement);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        buildParticles();
      });
    } else {
      buildParticles();
    }

    startLoop();
    window.addEventListener('resize', buildParticles);

    return () => {
      heroObserver.disconnect();
      window.removeEventListener('resize', buildParticles);
      stopLoop();
    };
  }, [resolvedTheme]);

  // Throttled 60/120fps Scroll Handler
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      canvasRectRef.current = null;

      // 1. Process Timeline Fill (direct DOM update)
      if (processRef.current) {
        const rect = processRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.bottom >= -100 && rect.top <= vh + 100) {
          const rawProgress = (vh * 0.65 - rect.top) / (rect.height * 0.85);
          const clamped = Math.max(0.05, Math.min(1, rawProgress));
          const pct = Math.round(clamped * 100);
          const bar = document.getElementById('process-timeline-bar');
          if (bar) bar.style.width = `${pct}%`;
          const txt = document.getElementById('process-timeline-text');
          if (txt) txt.textContent = `${pct}%`;

          const stepIdx = Math.floor(clamped * 4);
          if (stepIdx !== processFillRef.current) {
            processFillRef.current = stepIdx;
            setProcessFill(clamped);
          }
        }
      }

      // 2. Active Navigation Spy
      const ids = ['home', 'works', 'why-us', 'process', 'about', 'services', 'contact'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
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

      // 3. 3D Scroll Stack Card Depth (direct GPU style updates)
      const worksEl = document.getElementById('works');
      if (worksEl) {
        const wRect = worksEl.getBoundingClientRect();
        const vh = window.innerHeight;
        if (wRect.bottom >= -200 && wRect.top <= vh + 200) {
          const stackCards = document.querySelectorAll('.product-stack-card');
          for (let idx = 0; idx < stackCards.length; idx++) {
            let coveredDepth = 0;
            for (let j = idx + 1; j < stackCards.length; j++) {
              const nextRect = stackCards[j].getBoundingClientRect();
              const nextStickyTop = 104 + j * 22;
              const distance = nextRect.top - nextStickyTop;
              const ratio = Math.max(0, Math.min(1, 1 - distance / 420));
              coveredDepth += ratio;
            }
            const innerCard = document.getElementById(`stack-card-inner-${idx}`);
            if (innerCard) {
              const scaleVal = Math.max(0.84, 1 - coveredDepth * 0.042);
              const brightnessVal = Math.max(0.45, 1 - coveredDepth * 0.16);
              innerCard.style.transform = `scale(${scaleVal})`;
              innerCard.style.filter = `brightness(${brightnessVal})`;
            }
          }
        }
      }

      // 4. Why Us Pillar Card Navigation
      const whyCards = document.querySelectorAll('.why-pillar-card');
      if (whyCards.length > 0) {
        const stickyNav = document.getElementById('why-sticky-nav');
        const triggerY = stickyNav
          ? stickyNav.getBoundingClientRect().top + 90
          : window.innerHeight * 0.34;

        let currentWhy = 0;
        let smallestDist = Infinity;
        whyCards.forEach((card, idx) => {
          const rect = card.getBoundingClientRect();
          if (rect.top <= triggerY + 80) {
            currentWhy = idx;
          } else if (idx === 0 && rect.top > triggerY + 80) {
            currentWhy = 0;
          }
          const dist = Math.abs(rect.top - triggerY);
          if (dist < smallestDist && rect.bottom > triggerY) {
            smallestDist = dist;
          }
        });
        if (activeWhyIndexRef.current !== currentWhy) {
          activeWhyIndexRef.current = currentWhy;
          setActiveWhyIndex(currentWhy);
        }
      }

      // 5. Dock Collapse Trigger
      const shouldCollapse = window.scrollY > 80;
      if (isScrolledRef.current !== shouldCollapse) {
        isScrolledRef.current = shouldCollapse;
        setIsScrolled(shouldCollapse);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Direct GPU Cursor Transform
  useEffect(() => {
    const onMove = (e) => {
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        cursorDotRef.current.style.opacity = '1';
      }
      if (heroVisibleRef.current && canvasRef.current) {
        if (!canvasRectRef.current) {
          canvasRectRef.current = canvasRef.current.getBoundingClientRect();
        }
        const rect = canvasRectRef.current;
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
      }
    };

    const onLeave = () => {
      if (cursorDotRef.current) {
        cursorDotRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // Smooth Scroll Reveal Intersection Observer
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
  }, [loaderPhase, activeToolCategory]);

  const triggerToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  }, []);

  const copyStudioEmail = useCallback(() => {
    const input = document.createElement('textarea');
    input.value = BRAND_CONFIG.email;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      triggerToast(`Copied ${BRAND_CONFIG.email} to clipboard`);
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      triggerToast(BRAND_CONFIG.email);
    }
    document.body.removeChild(input);
  }, [triggerToast]);

  const copyStudioPhone = useCallback((numberToCopy = BRAND_CONFIG.phone) => {
    const input = document.createElement('textarea');
    input.value = numberToCopy;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand('copy');
      setPhoneCopied(true);
      triggerToast(`Copied ${numberToCopy} to clipboard`);
      setTimeout(() => setPhoneCopied(false), 3000);
    } catch (e) {
      triggerToast(numberToCopy);
    }
    document.body.removeChild(input);
  }, [triggerToast]);

  const jumpTo = useCallback((id) => {
    setActiveNav(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const toggleServiceChip = useCallback((serviceName) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.length > 1
          ? prev.filter((item) => item !== serviceName)
          : prev
        : [...prev, serviceName]
    );
  }, []);

  const handleSelectServiceFromCard = useCallback((serviceTitle) => {
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
  }, [jumpTo, triggerToast]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (isSubmittingForm) return;

    setIsSubmittingForm(true);

    const rawPhone = contactForm.phone.trim();
    const safePhone = rawPhone.startsWith('+') ? `'${rawPhone}` : rawPhone;

    const payload = {
      name: contactForm.name.trim(),
      email: contactForm.email.trim(),
      phone: safePhone,
      services: selectedServices.length > 0 ? selectedServices.join(', ') : 'General Inquiry',
      message: contactForm.message.trim()
    };

    try {
      const scriptUrl = BRAND_CONFIG.googleSheetScriptUrl;

      if (scriptUrl && scriptUrl.trim() !== '') {
        const formParams = new URLSearchParams();
        formParams.append('name', payload.name);
        formParams.append('email', payload.email);
        formParams.append('phone', payload.phone);
        formParams.append('services', payload.services);
        formParams.append('message', payload.message);

        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formParams.toString()
        });
      }

      setFormSubmitted(true);
      triggerToast("Message sent successfully! Stored to Google Sheets.");
      setContactForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    } catch (err) {
      console.error('Submission error:', err);
      setFormSubmitted(true);
      triggerToast("Thank you! Your message has been received.");
      setContactForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    if (isSubmittingJoin) return;

    if (!joinForm.fullName.trim()) {
      setJoinError("Please enter your name.");
      return;
    }
    if (!joinForm.email.trim() || !/\S+@\S+\.\S+/.test(joinForm.email)) {
      setJoinError("Please provide a valid email address.");
      return;
    }
    if (!joinForm.phone.trim() || joinForm.phone.trim().length < 7) {
      setJoinError("Please enter a valid phone or WhatsApp number.");
      return;
    }

    if (!joinForm.resumeLink.trim()) {
      setJoinError("Resume link (Google Drive / Notion) is mandatory.");
      return;
    }

    const isFresher = joinForm.experience === 'Fresher / Student';
    if (!isFresher) {
      if (!joinForm.portfolio.trim()) {
        setJoinError("Portfolio or GitHub link is mandatory for experienced applicants.");
        return;
      }
      if (!joinForm.linkedin.trim()) {
        setJoinError("LinkedIn profile link is mandatory for experienced applicants.");
        return;
      }
    }

    setJoinError(null);
    setIsSubmittingJoin(true);

    const resolvedRole = (joinForm.role === 'Other Creative' && joinForm.customRole?.trim())
      ? `Other: ${joinForm.customRole.trim()}`
      : joinForm.role;

    const rawJoinPhone = joinForm.phone.trim();
    const safeJoinPhone = rawJoinPhone.startsWith('+') ? `'${rawJoinPhone}` : rawJoinPhone;

    const payload = {
      formType: 'join_team',
      action: 'join_team',
      fullName: joinForm.fullName.trim(),
      email: joinForm.email.trim(),
      phone: safeJoinPhone,
      location: 'Coimbatore / Remote',
      role: resolvedRole,
      experience: joinForm.experience,
      availability: joinForm.availability || 'Full-Time',
      skills: resolvedRole,
      portfolio: joinForm.portfolio?.trim() || (isFresher ? 'Not provided (Fresher)' : '—'),
      github: joinForm.portfolio?.trim() || (isFresher ? 'Not provided (Fresher)' : '—'),
      linkedin: joinForm.linkedin?.trim() || (isFresher ? 'Not provided (Fresher)' : '—'),
      resumeLink: joinForm.resumeLink.trim(),
      pitch: joinForm.pitch?.trim() || 'Applied via website'
    };

    try {
      const scriptUrl = BRAND_CONFIG.googleSheetScriptUrl;

      if (scriptUrl && scriptUrl.trim() !== '') {
        const formParams = new URLSearchParams();
        Object.keys(payload).forEach((key) => {
          formParams.append(key, payload[key]);
        });

        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formParams.toString()
        });
      }

      setJoinSubmitted(true);
      triggerToast("Application submitted successfully! Stored to Google Sheets.");
    } catch (err) {
      console.error('Join team submission error:', err);
      setJoinSubmitted(true);
      triggerToast("Application submitted successfully!");
    } finally {
      setIsSubmittingJoin(false);
    }
  };

  return (
    <div className={`relative min-h-screen ${resolvedTheme === 'dark' ? 'bg-[#060608] text-[#F3F3F1]' : 'bg-[#F9F9F8] text-[#111113]'} font-sans selection:bg-[#D9FF3F] selection:text-black overflow-x-hidden antialiased transition-colors duration-500`}>
      {/* Custom Ultra-Fluid Precision Cursor Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-3.5 h-3.5 rounded-full bg-[#D9FF3F] pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          willChange: 'transform',
          transform: 'translate3d(-100px, -100px, 0)'
        }}
      />

      {/* Interactive Modals & Toast */}
      <CurtainLoader loaderPhase={loaderPhase} />
      <LegalModal
        activeLegalModal={activeLegalModal}
        setActiveLegalModal={setActiveLegalModal}
        jumpTo={jumpTo}
      />
      <JoinTeamModal
        isJoinTeamModalOpen={isJoinTeamModalOpen}
        setIsJoinTeamModalOpen={setIsJoinTeamModalOpen}
        isSubmittingJoin={isSubmittingJoin}
        joinSubmitted={joinSubmitted}
        setJoinSubmitted={setJoinSubmitted}
        joinForm={joinForm}
        setJoinForm={setJoinForm}
        handleJoinSubmit={handleJoinSubmit}
        joinError={joinError}
      />
      <ToastNotification toast={toast} />

      {/* Ambient Liquid Blobs */}
      <div className="liquid-blob-1" />
      <div className="liquid-blob-2" />

      {/* Sections */}
      <HeroSection
        heroRevealed={heroRevealed}
        resolvedTheme={resolvedTheme}
        setThemeChoice={setThemeChoice}
        triggerToast={triggerToast}
        canvasRef={canvasRef}
        mouseRef={mouseRef}
        jumpTo={jumpTo}
      />

      <ToolsSection
        activeToolCategory={activeToolCategory}
        setActiveToolCategory={setActiveToolCategory}
      />

      <WorksSection />

      <WhyUsSection
        activeWhyIndex={activeWhyIndex}
        setActiveWhyIndex={setActiveWhyIndex}
        expandedWhyIndex={expandedWhyIndex}
        setExpandedWhyIndex={setExpandedWhyIndex}
      />

      <ProcessSection
        processRef={processRef}
        processFill={processFill}
      />

      <AboutSection
        team={team}
        activeTeamIndex={activeTeamIndex}
        setActiveTeamIndex={setActiveTeamIndex}
        setIsJoinTeamModalOpen={setIsJoinTeamModalOpen}
      />

      <ServicesSection
        hoveredServiceIdx={hoveredServiceIdx}
        setHoveredServiceIdx={setHoveredServiceIdx}
        handleSelectServiceFromCard={handleSelectServiceFromCard}
      />

      <ContactFooterSection
        selectedServices={selectedServices}
        toggleServiceChip={toggleServiceChip}
        contactForm={contactForm}
        setContactForm={setContactForm}
        handleContactSubmit={handleContactSubmit}
        isSubmittingForm={isSubmittingForm}
        formSubmitted={formSubmitted}
        copied={copied}
        phoneCopied={phoneCopied}
        copyStudioEmail={copyStudioEmail}
        copyStudioPhone={copyStudioPhone}
        jumpTo={jumpTo}
        setActiveLegalModal={setActiveLegalModal}
      />

      <FloatingDock
        heroRevealed={heroRevealed}
        activeNav={activeNav}
        jumpTo={jumpTo}
        isScrolled={isScrolled}
      />
    </div>
  );
}
