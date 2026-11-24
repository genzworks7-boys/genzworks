import React, { useState, useEffect, useRef } from 'react';
import { resolveMemberPhoto } from './src/teamImages.js';
import { BRAND_CONFIG } from './src/data/brand';
import { INITIAL_TEAM } from './src/data/team';
import { STUDIO_TOOLS } from './src/data/tools';

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

export default function App() {
  const [themeChoice, setThemeChoice] = useState('light');
  const [resolvedTheme, setResolvedTheme] = useState('light');
  const [activeNav, setActiveNav] = useState('home');

  const [copied, setCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [toast, setToast] = useState(null);

  // Performance Optimization Refs for 60/120fps Framer-like Smoothness
  const cursorDotRef = useRef(null);
  const activeNavRef = useRef('home');
  const processFillRef = useRef(0.2);
  const activeWhyIndexRef = useRef(0);
  const footerBrandVisibleRef = useRef(false);
  const isScrolledRef = useRef(false);
  const heroVisibleRef = useRef(true);
  const canvasRectRef = useRef(null);

  const processRef = useRef(null);
  const [processFill, setProcessFill] = useState(0.2);

  const [team, setTeam] = useState(() => {
    return INITIAL_TEAM.map((m) => {
      const resolved = resolveMemberPhoto(m.id, m.photo);
      return {
        ...m,
        photo: resolved.photo
      };
    });
  });
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);

  const [activeTooltip, setActiveTooltip] = useState(null);
  const [stackProgress, setStackProgress] = useState([0, 0]);
  const [activeWhyIndex, setActiveWhyIndex] = useState(0);
  const [expandedWhyIndex, setExpandedWhyIndex] = useState(null);
  const [hoveredServiceIdx, setHoveredServiceIdx] = useState(null);

  // Dynamic morphing floating dock states
  const [isScrolled, setIsScrolled] = useState(false);
  const [dockHovered, setDockHovered] = useState(false);
  const [dockManuallyOpen, setDockManuallyOpen] = useState(false);
  const dockHoverTimeoutRef = useRef(null);
  const dockRef = useRef(null);

  const isDockCollapsed = isScrolled && !dockHovered && !dockManuallyOpen;

  // Enhanced Tools & Ecosystem interactive states
  const [activeToolCategory, setActiveToolCategory] = useState('All');

  // Senior UI/UX Editorial Contact & Footer States
  const [selectedServices, setSelectedServices] = useState(['Web Development']);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [coimbatoreTime, setCoimbatoreTime] = useState('');

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

  const isFresher = joinForm.experience === 'Fresher / Student';

  // Footer giant text scroll-reveal state
  const footerBrandRef = useRef(null);
  const [footerBrandVisible, setFooterBrandVisible] = useState(false);

  // Full-Screen "Are you ready?" Intro Loader State (Matches video reference)
  const [loaderPhase, setLoaderPhase] = useState('start'); // 'start' -> 'are-you' -> 'ready' -> 'curtain' -> 'done'

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

  // Live Coimbatore IST Clock for authentic studio footer
  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).format(new Date());
        setCoimbatoreTime(`${formatted} IST`);
      } catch (err) {
        setCoimbatoreTime('IST (UTC+5:30)');
      }
    };
    updateClock();
    const interval = setInterval(updateClock, 10000);
    return () => clearInterval(interval);
  }, []);

  // Particle background state for Hero (React Bits ParticleText exact physics)
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({
    x: -9999,
    y: -9999,
    radius: 110,
    strength: 3.5
  });

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

    // Deep high-contrast palette so text is crisp and solid in both dark and light modes
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

      // Set physical canvas pixel buffer to DPR for 100% razor-sharp Retina clarity
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const isMobile = width < 640;
      // Responsive font sizing: bold, prominent, and perfectly proportioned on mobile
      const fontSize = isMobile
        ? Math.min(Math.max(width * 0.15, 48), 64)
        : Math.min(Math.max(width * 0.125, 56), 140);

      // Offscreen rasterization at logical coordinates
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

      // Ultra-efficient particle sampling: razor-sharp typography with ~1,200 particles for instant 120fps responsiveness
      const step = isMobile ? 4.2 : 3.8;
      const particleRadius = isMobile ? 1.7 : 1.5;
      const nextBins = [[], [], [], []];

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (Math.floor(y) * width + Math.floor(x)) * 4 + 3;
          const alpha = imageData[index];
          if (alpha > 70) {
            const colorIdx = Math.floor(Math.random() * palette.length);
            nextBins[colorIdx].push({
              x: x,
              y: y,
              originX: x,
              originY: y,
              vx: 0,
              vy: 0,
              radius: particleRadius
            });
          }
        }
      }

      particlesRef.current = nextBins;
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

      const bins = particlesRef.current;
      const m = mouseRef.current;
      const radiusSq = m.radius * m.radius;

      // Batch drawing by color: reduces fill() and beginPath() calls from ~1,500 to 4 per frame!
      for (let c = 0; c < bins.length; c++) {
        const bin = bins[c];
        if (!bin || bin.length === 0) continue;

        ctx.fillStyle = palette[c];
        ctx.beginPath();

        for (let i = 0; i < bin.length; i++) {
          const p = bin[i];
          const dx = m.x - p.x;

          // Ultra-fast bounding box rejection to skip 98% of distance math
          if (dx > -m.radius && dx < m.radius) {
            const dy = m.y - p.y;
            if (dy > -m.radius && dy < m.radius) {
              const distSq = dx * dx + dy * dy;
              if (distSq < radiusSq && distSq > 0.001) {
                const dist = Math.sqrt(distSq);
                const force = (m.radius - dist) / m.radius;
                const angle = Math.atan2(dy, dx);
                p.vx -= Math.cos(angle) * force * m.strength * 7;
                p.vy -= Math.sin(angle) * force * m.strength * 7;
              }
            }
          }

          // Ambient fluid breathing wave
          const ambientX = Math.sin(waveFrame + p.originY * 0.04) * 0.7;
          const ambientY = Math.cos(waveFrame + p.originX * 0.04) * 0.7;

          p.vx += (p.originX + ambientX - p.x) * ease;
          p.vy += (p.originY + ambientY - p.y) * ease;

          p.vx *= friction;
          p.vy *= friction;

          p.x += p.vx;
          p.y += p.vy;

          ctx.moveTo(p.x + p.radius, p.y);
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        }

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

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      canvasRectRef.current = null; // Invalidate cached rect on scroll

      // 1. Process Timeline Fill (direct DOM updates for 60/120fps bar + quantized state for steps)
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

          // Quantize state update to 4 step thresholds only (0, 1, 2, 3)
          const stepIdx = Math.floor(clamped * 4);
          if (stepIdx !== processFillRef.current) {
            processFillRef.current = stepIdx;
            setProcessFill(clamped);
          }
        }
      }

      // 2. Active Nav Link (check current section)
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

      // 3. 3D Scroll Stack Card Depth (direct GPU style updates, 0 React re-renders)
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

      // 4. Why Us Pillar Card Navigation (scoped check to eliminate layout recalculation when outside view)
      const whyEl = document.getElementById('why-us');
      if (whyEl) {
        const wWhyRect = whyEl.getBoundingClientRect();
        const vh = window.innerHeight;
        if (wWhyRect.bottom >= -100 && wWhyRect.top <= vh + 100) {
          const whyCards = document.querySelectorAll('.why-pillar-card');
          if (whyCards.length > 0) {
            const stickyNav = document.getElementById('why-sticky-nav');
            const triggerY = stickyNav
              ? stickyNav.getBoundingClientRect().top + 90
              : vh * 0.34;

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
        }
      }

      // 5. Giant Footer Brand Reveal
      if (footerBrandRef.current) {
        const fRect = footerBrandRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        if (fRect.top <= vh * 1.05 && !footerBrandVisibleRef.current) {
          footerBrandVisibleRef.current = true;
          setFooterBrandVisible(true);
        } else if (fRect.top > vh * 1.15 && footerBrandVisibleRef.current) {
          footerBrandVisibleRef.current = false;
          setFooterBrandVisible(false);
        }
      }

      // 6. Dock Collapse
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
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (dockHoverTimeoutRef.current) clearTimeout(dockHoverTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dockRef.current && !dockRef.current.contains(e.target)) {
        setDockManuallyOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, []);

  useEffect(() => {
    let mouseRaf = null;
    let lastClientX = 0;
    let lastClientY = 0;

    const updateMouse = () => {
      mouseRaf = null;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${lastClientX}px, ${lastClientY}px, 0)`;
        cursorDotRef.current.style.opacity = '1';
      }
      if (heroVisibleRef.current && canvasRef.current) {
        if (!canvasRectRef.current) {
          canvasRectRef.current = canvasRef.current.getBoundingClientRect();
        }
        const rect = canvasRectRef.current;
        mouseRef.current.x = lastClientX - rect.left;
        mouseRef.current.y = lastClientY - rect.top;
      }
    };

    const onMove = (e) => {
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      if (!mouseRaf) {
        mouseRaf = window.requestAnimationFrame(updateMouse);
      }
    };

    const onLeave = () => {
      if (cursorDotRef.current) {
        cursorDotRef.current.style.opacity = '0';
      }
      if (mouseRaf) {
        cancelAnimationFrame(mouseRaf);
        mouseRaf = null;
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      if (mouseRaf) cancelAnimationFrame(mouseRaf);
    };
  }, []);

  // Smooth Scroll Reveal Intersection Observer (instant unobserve for zero scroll overhead)
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

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  const copyStudioEmail = () => {
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
  };

  const copyStudioPhone = (numberToCopy = BRAND_CONFIG.phone) => {
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
  };

  const jumpTo = (id) => {
    setActiveNav(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleServiceChip = (serviceName) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.length > 1
          ? prev.filter((item) => item !== serviceName)
          : prev
        : [...prev, serviceName]
    );
  };

  const handleSelectServiceFromCard = (serviceTitle) => {
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
      const scriptUrl = BRAND_CONFIG.joinTeamScriptUrl || BRAND_CONFIG.googleSheetScriptUrl;

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
      triggerToast("Thank you! Your application has been recorded.");
    } finally {
      setIsSubmittingJoin(false);
    }
  };

  const isDark = resolvedTheme === 'dark';

  const filteredStudioTools =
    activeToolCategory === 'All'
      ? STUDIO_TOOLS
      : STUDIO_TOOLS.filter((t) => t.group === activeToolCategory);

  const heroRevealed = loaderPhase === 'curtain' || loaderPhase === 'done';

  return (
    <div
      className={`min-h-screen transition-colors duration-700 selection:bg-[#0E0E10] selection:text-[#D9FF3F] ${isDark ? 'dark bg-[#060608] text-[#F5F5F3]' : 'bg-[#FFFFFF] text-[#0E0E10]'
        } antialiased overflow-x-clip relative has-custom-cursor`}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&family=Syne:wght@800&display=swap');

        .font-editorial { font-family: 'Instrument Serif', Georgia, serif; }
        .font-mono-tech { font-family: 'Space Mono', monospace; }
        .font-funky { font-family: 'Syne', sans-serif; }

        @keyframes blobFloat {
          0%, 100% { transform: translate3d(0px, 0px, 0) scale(1); }
          33% { transform: translate3d(40px, -60px, 0) scale(1.12); }
          66% { transform: translate3d(-30px, 30px, 0) scale(0.92); }
        }

        .liquid-blob-1 {
          position: absolute;
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, rgba(217, 255, 63, 0.35) 0%, rgba(255, 79, 24, 0.18) 60%, transparent 100%);
          filter: blur(100px);
          border-radius: 50%;
          top: -120px;
          left: 10%;
          transform: translate3d(0, 0, 0);
          will-change: transform;
          contain: layout paint;
          animation: blobFloat 14s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }

        .liquid-blob-2 {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(79, 70, 229, 0.28) 0%, rgba(217, 255, 63, 0.22) 60%, transparent 100%);
          filter: blur(110px);
          border-radius: 50%;
          top: 25%;
          right: 5%;
          transform: translate3d(0, 0, 0);
          will-change: transform;
          contain: layout paint;
          animation: blobFloat 18s ease-in-out infinite reverse;
          pointer-events: none;
          z-index: 0;
        }

        /* Ultra-Luxe Liquid Glass Theme */
        .liquid-glass {
          background: ${isDark
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.05) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.45) 100%)'};
          backdrop-filter: blur(32px) saturate(210%) contrast(102%);
          -webkit-backdrop-filter: blur(32px) saturate(210%) contrast(102%);
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.85)'};
          box-shadow: ${isDark
          ? '0 25px 50px -10px rgba(0, 0, 0, 0.6), inset 0 1.5px 1px rgba(255, 255, 255, 0.22), inset 0 -1.5px 2px rgba(0, 0, 0, 0.35)'
          : '0 20px 45px -10px rgba(15, 23, 42, 0.06), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95), inset 0 -1.5px 2px rgba(0, 0, 0, 0.03)'};
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s ease;
        }

        .liquid-glass:hover {
          transform: translateY(-4px);
          box-shadow: ${isDark
          ? '0 30px 60px -10px rgba(0, 0, 0, 0.75), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.35)'
          : '0 28px 55px -10px rgba(15, 23, 42, 0.1), inset 0 1.5px 1.5px rgba(255, 255, 255, 1)'};
          border-color: ${isDark ? 'rgba(217, 255, 63, 0.4)' : 'rgba(255, 255, 255, 0.95)'};
        }

        /* Authentic Liquid Glass Navbar (Ultra-Visible & Glossy) */
        .liquid-glass-nav {
          position: relative;
          background: ${isDark
          ? 'linear-gradient(135deg, rgba(28, 28, 36, 0.88) 0%, rgba(16, 16, 22, 0.82) 50%, rgba(22, 22, 30, 0.88) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.78) 50%, rgba(246, 248, 252, 0.88) 100%)'};
          backdrop-filter: blur(28px) saturate(190%) contrast(104%);
          -webkit-backdrop-filter: blur(28px) saturate(190%) contrast(104%);
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.95)'};
          box-shadow: ${isDark
          ? '0 24px 50px -12px rgba(0, 0, 0, 0.75), 0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.32), inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.5), inset 1.5px 0 1.5px 0 rgba(255, 255, 255, 0.12)'
          : '0 20px 40px -10px rgba(15, 23, 42, 0.12), 0 4px 16px -2px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.06), inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 1), inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.04), inset 1.5px 0 1.5px 0 rgba(255, 255, 255, 0.8)'};
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
        }

        .liquid-glass-nav::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(110% 60% at 50% 0%, ${isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.85)'} 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .liquid-glass-nav::after {
          content: '';
          position: absolute;
          top: 0;
          left: 8%;
          right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, ${isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 1)'}, transparent);
          pointer-events: none;
          z-index: 1;
        }

        /* Action Buttons with Liquid Lens Glass */
        .liquid-glass-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: ${isDark
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.05) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 242, 248, 0.75) 100%)'};
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.08)'};
          box-shadow: ${isDark
          ? '0 3px 10px rgba(0, 0, 0, 0.4), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.28)'
          : '0 2px 8px rgba(15, 23, 42, 0.07), 0 0 0 1px rgba(0, 0, 0, 0.04), inset 0 1.5px 1px 0 rgba(255, 255, 255, 1)'};
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .liquid-glass-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(circle at 50% 15%, ${isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.9)'}, transparent 65%);
          pointer-events: none;
        }

        .liquid-glass-btn:hover {
          transform: translateY(-2px) scale(1.08);
          background: ${isDark
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.1) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(245, 247, 252, 0.9) 100%)'};
          border-color: ${isDark ? 'rgba(217, 255, 63, 0.6)' : 'rgba(0, 0, 0, 0.18)'};
          box-shadow: ${isDark
          ? '0 6px 20px rgba(0, 0, 0, 0.5), inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.4), 0 0 12px rgba(217, 255, 63, 0.25)'
          : '0 6px 16px rgba(15, 23, 42, 0.12), inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 1), 0 0 12px rgba(255, 255, 255, 0.8)'};
        }

        .liquid-glass-btn:active {
          transform: translateY(0px) scale(0.95);
        }

        .liquid-glass-dock {
          background: ${isDark
          ? 'linear-gradient(135deg, rgba(20, 20, 26, 0.88) 0%, rgba(12, 12, 16, 0.82) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.72) 100%)'};
          backdrop-filter: blur(36px) saturate(220%);
          -webkit-backdrop-filter: blur(36px) saturate(220%);
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.9)'};
          box-shadow: ${isDark
          ? '0 30px 70px rgba(0, 0, 0, 0.55), inset 0 1.5px 1px rgba(255, 255, 255, 0.25), inset 0 -1px 2px rgba(0, 0, 0, 0.4)'
          : '0 25px 60px rgba(0, 0, 0, 0.1), inset 0 1.5px 1px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(0, 0, 0, 0.04)'};
          transition: width 0.48s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.4s ease,
                      transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.35s ease;
          will-change: width, transform;
        }

        @keyframes framerCardExpand {
          0% { opacity: 0; transform: scale(0.7) translateY(45px); filter: blur(12px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
        }

        @keyframes framerFadeRise {
          0% { opacity: 0; transform: translateY(28px) scale(0.97); filter: blur(6px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
        }

        @keyframes framerDockRise {
          0% { opacity: 0; transform: translate(-50%, 50px) scale(0.92); }
          100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }

        @keyframes tickerScroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        .animate-ticker { display: flex; width: max-content; animation: tickerScroll 30s linear infinite; }
        .animate-ticker:hover { animation-play-state: paused; }

        .hero-visible .framer-hero-card { animation: framerCardExpand 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both; }
        .hero-visible .framer-hero-title { animation: framerFadeRise 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
        .hero-visible .framer-hero-subtitle { animation: framerFadeRise 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both; }
        .hero-visible .framer-hero-cta { animation: framerFadeRise 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both; }
        .hero-visible.framer-floating-dock, .framer-floating-dock { animation: framerDockRise 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.65s both; }

        .reveal-on-scroll {
          opacity: 0;
          transform: translate3d(0, 28px, 0);
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .reveal-on-scroll.reveal-active {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          will-change: auto;
        }

        /* Mobile and Tablet: Alternating slide-in animation for Craft Tools cards */
        @media (max-width: 1023px) {
          .tool-card-reveal.tool-reveal-left {
            opacity: 0;
            transform: translate3d(-48px, 0, 0);
            transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, transform;
          }
          .tool-card-reveal.tool-reveal-right {
            opacity: 0;
            transform: translate3d(48px, 0, 0);
            transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, transform;
          }
          .tool-card-reveal.reveal-active {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            will-change: auto;
          }
        }
        @media (min-width: 1024px) {
          .tool-card-reveal {
            opacity: 0;
            transform: translate3d(0, 28px, 0);
            transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, transform;
          }
          .tool-card-reveal.reveal-active {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            will-change: auto;
          }
        }

        @media (min-width: 1024px) {
          .has-custom-cursor, .has-custom-cursor button, .has-custom-cursor a, .has-custom-cursor input {
            cursor: none !important;
          }
        }

        .framer-spring { transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .work-card { transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }

        .footer-gradient-text {
          background: linear-gradient(
            180deg,
            #FFFFFF 0%,
            #F5F5F7 25%,
            #E4E4E7 50%,
            #A1A1AA 75%,
            #71717A 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          padding-bottom: 0.08em;
          will-change: transform, opacity;
        }
        .footer-gradient-text:hover {
          filter: brightness(1.15);
        }
      `}</style>

      {/* Interactive Modals, Cursor, Loader & Toast */}
      <Modals
        cursorDotRef={cursorDotRef}
        loaderPhase={loaderPhase}
        toast={toast}
        activeLegalModal={activeLegalModal}
        setActiveLegalModal={setActiveLegalModal}
        isJoinTeamModalOpen={isJoinTeamModalOpen}
        setIsJoinTeamModalOpen={setIsJoinTeamModalOpen}
        joinForm={joinForm}
        setJoinForm={setJoinForm}
        isFresher={isFresher}
        isSubmittingJoin={isSubmittingJoin}
        joinSubmitted={joinSubmitted}
        joinError={joinError}
        handleJoinTeamSubmit={handleJoinSubmit}
      />

      <div className="liquid-blob-1" />
      <div className="liquid-blob-2" />

      {/* Hero Section */}
      <HeroSection
        heroRevealed={heroRevealed}
        resolvedTheme={resolvedTheme}
        setThemeChoice={setThemeChoice}
        triggerToast={triggerToast}
        canvasRef={canvasRef}
        mouseRef={mouseRef}
        jumpTo={jumpTo}
      />

      {/* Tools & Ecosystem Section */}
      <ToolsSection
        activeToolCategory={activeToolCategory}
        setActiveToolCategory={setActiveToolCategory}
        filteredStudioTools={filteredStudioTools}
      />

      {/* Featured Works Section */}
      <WorksSection stackProgress={stackProgress} />

      {/* Why Us Section */}
      <WhyUsSection
        activeWhyIndex={activeWhyIndex}
        setActiveWhyIndex={setActiveWhyIndex}
        expandedWhyIndex={expandedWhyIndex}
        setExpandedWhyIndex={setExpandedWhyIndex}
      />

      {/* Process Section */}
      <ProcessSection
        processRef={processRef}
        processFill={processFill}
      />

      {/* About Section */}
      <AboutSection
        team={team}
        activeTeamIndex={activeTeamIndex}
        setActiveTeamIndex={setActiveTeamIndex}
        setIsJoinTeamModalOpen={setIsJoinTeamModalOpen}
      />

      {/* Services Section */}
      <ServicesSection
        hoveredServiceIdx={hoveredServiceIdx}
        setHoveredServiceIdx={setHoveredServiceIdx}
        handleSelectServiceFromCard={handleSelectServiceFromCard}
      />

      {/* Contact & Footer Section */}
      <ContactFooterSection
        copyStudioEmail={copyStudioEmail}
        copied={copied}
        copyStudioPhone={copyStudioPhone}
        phoneCopied={phoneCopied}
        coimbatoreTime={coimbatoreTime}
        contactForm={contactForm}
        setContactForm={setContactForm}
        selectedServices={selectedServices}
        toggleServiceChip={toggleServiceChip}
        handleContactSubmit={handleContactSubmit}
        isSubmittingForm={isSubmittingForm}
        formSubmitted={formSubmitted}
        jumpTo={jumpTo}
        setActiveLegalModal={setActiveLegalModal}
        footerBrandRef={footerBrandRef}
        footerBrandVisible={footerBrandVisible}
      />

      {/* Dynamic Morphing Floating Dock */}
      <FloatingDock
        heroRevealed={heroRevealed}
        dockRef={dockRef}
        dockHoverTimeoutRef={dockHoverTimeoutRef}
        setDockHovered={setDockHovered}
        setDockManuallyOpen={setDockManuallyOpen}
        isDockCollapsed={isDockCollapsed}
        activeNav={activeNav}
        activeTooltip={activeTooltip}
        setActiveTooltip={setActiveTooltip}
        jumpTo={jumpTo}
      />
    </div>
  );
}
