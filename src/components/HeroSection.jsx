import React, { useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Sun, Moon } from 'lucide-react';
import { BRAND_CONFIG, CRAFT_TICKER, Instagram, Github } from '../data/brand';

const HeroSection = React.memo(function HeroSection({
  heroRevealed,
  resolvedTheme,
  setThemeChoice,
  jumpTo
}) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const colorBucketsRef = useRef([]);
  const heroVisibleRef = useRef(true);
  const canvasRectRef = useRef(null);
  const mouseRef = useRef({
    x: -9999,
    y: -9999,
    radius: 110,
    strength: 3.5
  });

  // High-DPI Retina Particle Text ("GenzWorks") with batched draw calls & offscreen/curtain pause
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = null;
    let isRunning = false;
    let pointerRafId = null;
    let pendingClientX = 0;
    let pendingClientY = 0;

    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 1.5);

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
        ? Math.min(Math.max(width * 0.15, 44), height * 0.68, 64)
        : Math.min(Math.max(width * 0.125, 56), height * 0.68, 140);

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
      const step = isMobile ? 4.0 : 3.9;
      const particleRadius = isMobile ? 1.65 : 1.55;
      const nextParticles = [];
      const buckets = palette.map(() => []);

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (Math.floor(y) * width + Math.floor(x)) * 4 + 3;
          if (imageData[index] > 70) {
            const colorIdx = Math.floor(Math.random() * palette.length);
            const p = {
              x,
              y,
              originX: x,
              originY: y,
              vx: 0,
              vy: 0,
              radius: particleRadius
            };
            nextParticles.push(p);
            buckets[colorIdx].push(p);
          }
        }
      }

      particlesRef.current = nextParticles;
      colorBucketsRef.current = buckets;
    };

    const friction = 0.76;
    const ease = 0.055;
    let waveFrame = 0;
    let lastDrawTime = 0;
    let activeUntil = 0;

    const renderLoop = (now = 0) => {
      if (!heroVisibleRef.current || document.hidden || !heroRevealed) {
        isRunning = false;
        animationFrameId = null;
        return;
      }

      // Run full native 60/120fps physics while pointer/touch interacts, or low-CPU 30fps ambient wave when idle
      const isInteractive = mouseRef.current.x > -500 || now < activeUntil;
      if (!isInteractive && now - lastDrawTime < 31) {
        animationFrameId = requestAnimationFrame(renderLoop);
        return;
      }
      lastDrawTime = now;
      waveFrame += isInteractive ? 0.024 : 0.044;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const list = particlesRef.current;
      const m = mouseRef.current;
      const mRadius = m.radius;
      const mRadiusSq = mRadius * mRadius;
      const mStrength = m.strength * 7;

      // 1. Numeric physics update
      for (let i = 0; i < list.length; i++) {
        const p = list[i];
        const dx = m.x - p.x;

        if (dx > -mRadius && dx < mRadius) {
          const dy = m.y - p.y;
          if (dy > -mRadius && dy < mRadius) {
            const distSq = dx * dx + dy * dy;
            if (distSq < mRadiusSq && distSq > 0.001) {
              const dist = Math.sqrt(distSq);
              const force = (mRadius - dist) / mRadius;
              const invDist = 1 / dist;
              p.vx -= dx * invDist * force * mStrength;
              p.vy -= dy * invDist * force * mStrength;
            }
          }
        }

        const ambientX = Math.sin(waveFrame + p.originY * 0.04) * 0.7;
        const ambientY = Math.cos(waveFrame + p.originX * 0.04) * 0.7;

        p.vx = (p.vx + (p.originX + ambientX - p.x) * ease) * friction;
        p.vy = (p.vy + (p.originY + ambientY - p.y) * ease) * friction;

        p.x += p.vx;
        p.y += p.vy;
      }

      // 2. Batched draw calls (only 5 fill calls per frame instead of 1,500+)
      const buckets = colorBucketsRef.current;
      const twoPi = 6.28318530718;
      for (let c = 0; c < buckets.length; c++) {
        const bucket = buckets[c];
        if (!bucket || bucket.length === 0) continue;
        ctx.fillStyle = palette[c];
        ctx.beginPath();
        for (let i = 0; i < bucket.length; i++) {
          const p = bucket[i];
          ctx.moveTo(p.x + p.radius, p.y);
          ctx.arc(p.x, p.y, p.radius, 0, twoPi);
        }
        ctx.fill();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    const startLoop = () => {
      if (!isRunning && heroVisibleRef.current && heroRevealed && !document.hidden) {
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

    const onMouseMove = (e) => {
      if (!heroVisibleRef.current || !heroRevealed) return;
      activeUntil = performance.now() + 1800;
      pendingClientX = e.clientX;
      pendingClientY = e.clientY;
      if (!pointerRafId) {
        pointerRafId = requestAnimationFrame(() => {
          pointerRafId = null;
          if (!canvasRef.current) return;
          if (!canvasRectRef.current) {
            canvasRectRef.current = canvasRef.current.getBoundingClientRect();
          }
          const rect = canvasRectRef.current;
          mouseRef.current.x = pendingClientX - rect.left;
          mouseRef.current.y = pendingClientY - rect.top;
        });
      }
    };

    const invalidateRect = () => {
      canvasRectRef.current = null;
    };

    const onVisibilityChange = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) startLoop();
        else stopLoop();
      },
      { threshold: 0.01 }
    );

    if (canvas.parentElement) {
      heroObserver.observe(canvas.parentElement);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(buildParticles);
    } else {
      buildParticles();
    }

    startLoop();
    window.addEventListener('resize', buildParticles, { passive: true });
    window.addEventListener('scroll', invalidateRect, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      heroObserver.disconnect();
      window.removeEventListener('resize', buildParticles);
      window.removeEventListener('scroll', invalidateRect);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (pointerRafId) cancelAnimationFrame(pointerRafId);
      stopLoop();
    };
  }, [resolvedTheme, heroRevealed]);

  const handleThemeToggle = useCallback(() => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    setThemeChoice(next);
  }, [resolvedTheme, setThemeChoice]);

  const handleTouchUpdate = useCallback((e) => {
    if (!canvasRef.current || !e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    if (!canvasRectRef.current) {
      canvasRectRef.current = canvasRef.current.getBoundingClientRect();
    }
    const rect = canvasRectRef.current;
    mouseRef.current.x = touch.clientX - rect.left;
    mouseRef.current.y = touch.clientY - rect.top;
  }, []);

  const handleTouchEnd = useCallback(() => {
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
  }, []);

  return (
    <section id="home" className={`hero-section relative pt-5 sm:pt-8 pb-20 z-10 px-4 sm:px-10 max-w-[1280px] mx-auto transition-opacity duration-500 ${heroRevealed ? 'hero-visible opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col items-center text-center relative z-10">
        <div className="framer-hero-card hero-nav-pill w-full max-w-[820px] px-3.5 py-2 sm:px-5 sm:py-3 rounded-2xl sm:rounded-[28px] liquid-glass-nav mb-2 sm:mb-3">
          <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
              <div className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl p-1 sm:p-1.5 liquid-glass-btn shadow-sm shrink-0 flex items-center justify-center">
                <div className="w-full h-full rounded-[10px] sm:rounded-[14px] flex items-center justify-center overflow-hidden">
                  <img
                    src="/logo.webp"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/logo.png';
                    }}
                    alt="GENZWORKS Studio Logo"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="text-left min-w-0">
                <h3 className="font-extrabold text-xs sm:text-base tracking-tight text-zinc-950 dark:text-white truncate">{BRAND_CONFIG.brandName}</h3>
                <p className="text-[10px] sm:text-xs text-zinc-600 dark:text-zinc-300 font-medium truncate">Technology &amp; Creative Studio</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <a
                  href={BRAND_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-full liquid-glass-btn text-zinc-800 hover:text-black dark:text-zinc-100 dark:hover:text-white"
                  title={`Instagram (${BRAND_CONFIG.instagram})`}
                >
                  <Instagram className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </a>
                <a
                  href={BRAND_CONFIG.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-full liquid-glass-btn text-zinc-800 hover:text-black dark:text-zinc-100 dark:hover:text-white"
                  title="GitHub (genzworks7-boys)"
                >
                  <Github className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </a>
                <button
                  onClick={handleThemeToggle}
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-full liquid-glass-btn text-zinc-800 hover:text-black dark:text-zinc-100 dark:hover:text-white"
                  title="Toggle Light / Dark Mode"
                >
                  {resolvedTheme === 'dark' ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D9FF3F]" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive React Bits Particle Text — High-DPI Retina Sharp with Mobile Touch */}
        <div className="hero-canvas-wrap w-full max-w-[1080px] h-[86px] sm:h-[155px] md:h-[175px] my-0.5 sm:my-1.5 flex items-center justify-center relative select-none">
          <canvas
            ref={canvasRef}
            onTouchStart={handleTouchUpdate}
            onTouchMove={handleTouchUpdate}
            onTouchEnd={handleTouchEnd}
            className="w-full h-full block cursor-pointer touch-pan-y"
          />
        </div>

        <h1 className="framer-hero-title max-w-[940px] text-[2.75rem] sm:text-[4.8rem] lg:text-[5.8rem] font-extrabold tracking-[-0.04em] leading-[0.98] mb-4 sm:mb-5">
          We craft websites <br className="hidden sm:inline" />
          that hustle as hard <br className="hidden sm:inline" />
          as you do
        </h1>

        <p className="framer-hero-subtitle max-w-[580px] text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium mb-5 sm:mb-6">
          {BRAND_CONFIG.heroSubheading}
        </p>

        <div className="framer-hero-cta flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full">
          <button
            onClick={() => jumpTo('contact')}
            className="px-5 py-3.5 sm:px-8 sm:py-4 rounded-2xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap bg-[#0E0E10] text-white dark:bg-white dark:text-[#0E0E10] shadow-xl hover:scale-105 active:scale-95 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center gap-2.5 sm:gap-3"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>

          <button
            onClick={() => jumpTo('works')}
            className="px-5 py-3.5 sm:px-8 sm:py-4 rounded-2xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap liquid-glass active:scale-95 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center gap-2.5 sm:gap-3"
          >
            <span>Our Products</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>

      <div className="mt-20 py-4 liquid-glass overflow-hidden rounded-3xl shadow-xl relative z-10">
        <div className="animate-ticker flex items-center gap-10">
          {[...CRAFT_TICKER, ...CRAFT_TICKER].map((item, idx) => (
            <div key={idx} className="flex items-center gap-10 shrink-0">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest">{item}</span>
              <span className="w-2 h-2 rounded-full bg-[#0E0E10] dark:bg-white" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
