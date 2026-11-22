import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sun, Moon } from 'lucide-react';
import { BRAND_CONFIG, CRAFT_TICKER } from '../data/brandConfig';
import { Instagram, Github } from './icons/SocialIcons';

export default function Hero({
  resolvedTheme,
  setThemeChoice,
  triggerToast,
  jumpTo
}) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({
    x: -9999,
    y: -9999,
    radius: 110,
    strength: 3.5
  });

  // High-DPI Retina Particle Text ("GenzWorks")
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    let animationFrameId = null;
    let isCanvasVisible = true;

    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 640;
    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, isMobileDevice ? 1.5 : 2);

    const palette = resolvedTheme === 'dark'
      ? ['#FFFFFF', '#FFFFFF', '#FAFAFA', '#F4F4F5', '#E4E4E7']
      : ['#09090B', '#09090B', '#18181B', '#18181B', '#27272A'];

    const buildParticles = () => {
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
      const step = isMobile ? 3.6 : 2.6;
      const particleRadius = isMobile ? 1.05 : 1.15;
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
      if (!isCanvasVisible) {
        animationFrameId = null;
        return;
      }

      waveFrame += 0.024;
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const list = particlesRef.current;
      const m = mouseRef.current;
      const isMobile = canvas.width / dpr < 640;

      for (let i = 0; i < list.length; i++) {
        const p = list[i];
        const dx = m.x - p.x;
        const dy = m.y - p.y;
        const distSq = dx * dx + dy * dy;
        const radiusSq = m.radius * m.radius;

        if (distSq < radiusSq && distSq > 0.001) {
          const dist = Math.sqrt(distSq);
          const force = (m.radius - dist) / m.radius;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * m.strength * 7;
          p.vy -= Math.sin(angle) * force * m.strength * 7;
        }

        if (!isMobile) {
          const wave = Math.sin(waveFrame + p.originX * 0.015) * 0.45;
          p.vx += (p.originX - p.x) * ease;
          p.vy += (p.originY + wave - p.y) * ease;
        } else {
          p.vx += (p.originX - p.x) * ease;
          p.vy += (p.originY - p.y) * ease;
        }

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

    buildParticles();
    renderLoop();

    const handleWindowMouseMove = (e) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
      }
    };
    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });

    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildParticles();
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isCanvasVisible = entry.isIntersecting;
        if (isCanvasVisible && !animationFrameId) {
          animationFrameId = requestAnimationFrame(renderLoop);
        }
      });
    }, { threshold: 0.05 });
    observer.observe(canvas);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [resolvedTheme]);

  return (
    <section id="home" className="pt-8 sm:pt-14 pb-16 px-4 sm:px-6 relative z-10 flex flex-col items-center">
      <div className="w-full max-w-[1280px] mx-auto flex flex-col items-center text-center">
        {/* Top Floating Glass Navigation Header Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.1 }}
          className="w-full max-w-[820px] px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-2xl sm:rounded-[28px] liquid-glass-nav mb-4 sm:mb-6 shadow-lg"
        >
          <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
              <div className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl p-1 sm:p-1.5 liquid-glass-btn shadow-sm shrink-0 flex items-center justify-center">
                <div className="w-full h-full rounded-[10px] sm:rounded-[14px] flex items-center justify-center overflow-hidden">
                  <img
                    src="/logo.png"
                    alt="GENZWORKS Studio Logo"
                    width="44"
                    height="44"
                    className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,240,255,0.35)]"
                  />
                </div>
              </div>
              <div className="text-left min-w-0">
                <h3 className="font-extrabold text-xs sm:text-base tracking-tight text-zinc-950 dark:text-white truncate">
                  {BRAND_CONFIG.brandName}
                </h3>
                <p className="text-[10px] sm:text-xs text-zinc-600 dark:text-zinc-300 font-medium truncate">
                  Technology &amp; Creative Studio
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <a
                  href={BRAND_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  title="Follow us on Instagram"
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-full liquid-glass-btn text-zinc-800 hover:text-black dark:text-zinc-100 dark:hover:text-white flex items-center justify-center transition-all hover:scale-105"
                >
                  <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>

                <a
                  href={BRAND_CONFIG.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  title="View open source projects on GitHub"
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-full liquid-glass-btn text-zinc-800 hover:text-black dark:text-zinc-100 dark:hover:text-white flex items-center justify-center transition-all hover:scale-105"
                >
                  <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
                    setThemeChoice(next);
                    if (triggerToast) triggerToast(`Switched to ${next} mode`);
                  }}
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-full liquid-glass-btn text-zinc-800 hover:text-black dark:text-zinc-100 dark:hover:text-white flex items-center justify-center cursor-pointer"
                  title="Toggle Light / Dark Mode"
                >
                  {resolvedTheme === 'dark' ? (
                    <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D9FF3F]" />
                  ) : (
                    <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive React Bits Particle Text Canvas */}
        <div className="w-full max-w-[1080px] h-[110px] sm:h-[180px] md:h-[230px] my-1 sm:my-3 flex items-center justify-center relative select-none">
          <canvas
            ref={canvasRef}
            onTouchStart={(e) => {
              if (!canvasRef.current || !e.touches || e.touches.length === 0) return;
              const touch = e.touches[0];
              const rect = canvasRef.current.getBoundingClientRect();
              mouseRef.current.x = touch.clientX - rect.left;
              mouseRef.current.y = touch.clientY - rect.top;
            }}
            onTouchMove={(e) => {
              if (!canvasRef.current || !e.touches || e.touches.length === 0) return;
              const touch = e.touches[0];
              const rect = canvasRef.current.getBoundingClientRect();
              mouseRef.current.x = touch.clientX - rect.left;
              mouseRef.current.y = touch.clientY - rect.top;
            }}
            onTouchEnd={() => {
              mouseRef.current.x = -1000;
              mouseRef.current.y = -1000;
            }}
            className="w-full h-full block cursor-pointer touch-none"
          />
        </div>

        {/* Hero Headings with Framer Motion Rise */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.15 }}
          className="max-w-[940px] text-[2.75rem] sm:text-[4.8rem] lg:text-[5.8rem] font-extrabold tracking-[-0.04em] leading-[0.98] mb-6"
        >
          We craft websites <br className="hidden sm:inline" />
          that hustle as hard <br className="hidden sm:inline" />
          as you do
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.25 }}
          className="max-w-[580px] text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium mb-8"
        >
          {BRAND_CONFIG.heroSubheading}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.35 }}
          className="flex items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => jumpTo('contact')}
            className="px-8 py-4 rounded-2xl text-xs font-extrabold uppercase tracking-wider bg-[#0E0E10] text-white dark:bg-white dark:text-[#0E0E10] shadow-2xl transition-colors flex items-center gap-3 cursor-pointer"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => jumpTo('works')}
            className="px-8 py-4 rounded-2xl text-xs font-extrabold uppercase tracking-wider liquid-glass hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-3 cursor-pointer"
          >
            <span>Our Products</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>

      {/* Infinite Ticker Bar */}
      <div className="w-full max-w-[1280px] mt-16 sm:mt-20 py-4 liquid-glass overflow-hidden rounded-3xl shadow-xl relative z-10">
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
}
