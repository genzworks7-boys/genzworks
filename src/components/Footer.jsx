import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BRAND_CONFIG } from '../data/brandConfig';

export default function Footer({ jumpTo, onOpenLegalModal }) {
  const footerBrandRef = useRef(null);
  const [footerBrandVisible, setFooterBrandVisible] = useState(false);

  useEffect(() => {
    const el = footerBrandRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFooterBrandVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const NAV_LINKS = [
    { id: 'home', label: 'Home' },
    { id: 'works', label: 'Products' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'process', label: 'Process' },
    { id: 'about', label: 'Team' },
    { id: 'services', label: 'Services' }
  ];

  return (
    <div>
      {/* Minimalist Navigation & Original Brand Social Icons Row */}
      <div className="py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-white/10 text-sm">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-medium text-zinc-300">
          {NAV_LINKS.map((item) => (
            <button
              key={item.id}
              onClick={() => jumpTo && jumpTo(item.id)}
              className="hover:text-[#D9FF3F] transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Official Brand SVG Icons */}
        <div className="flex items-center gap-3">
          {/* Instagram */}
          <a
            href={BRAND_CONFIG.instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            title={`Instagram (${BRAND_CONFIG.instagram})`}
            className="group w-11 h-11 rounded-full bg-white/[0.05] border border-white/15 hover:border-pink-500/50 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] flex items-center justify-center text-zinc-300 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-md"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href={BRAND_CONFIG.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub (genzworks7-boys)"
            className="group w-11 h-11 rounded-full bg-white/[0.05] border border-white/15 hover:border-white hover:bg-white flex items-center justify-center text-zinc-300 hover:text-[#08080A] transition-all duration-300 hover:-translate-y-1 shadow-md"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Clean Legal & Copyright Bar */}
      <div className="pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
        <div className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="GENZWORKS Studio Logo"
            width="20"
            height="20"
            loading="lazy"
            decoding="async"
            className="w-5 h-5 object-contain"
          />
          <span>
            © {BRAND_CONFIG.year.replace('®', '')} {BRAND_CONFIG.brandName} Studio. All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => onOpenLegalModal && onOpenLegalModal('terms')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Terms of Service
          </button>
          <button
            onClick={() => onOpenLegalModal && onOpenLegalModal('privacy')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-zinc-300 hover:text-[#D9FF3F] transition-colors font-medium cursor-pointer"
          >
            Back to top ↑
          </button>
        </div>
      </div>

      {/* Giant Edge-to-Edge Scroll-Triggered Gradient "GenzWorks" Wordmark Reveal */}
      <div
        ref={footerBrandRef}
        className="relative z-10 w-full pt-6 sm:pt-8 pb-20 sm:pb-28 px-1 sm:px-4 select-none flex items-center justify-center overflow-hidden"
      >
        {/* Apple Monochromatic Soft White Spotlight Glow behind Wordmark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-0">
          <div
            style={{
              opacity: footerBrandVisible ? 0.75 : 0,
              transition: 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
            }}
            className="w-[88%] h-[160px] sm:h-[240px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.03)_50%,transparent_75%)] blur-[50px] sm:blur-[80px] rounded-full pointer-events-none"
          />
        </div>

        <div className="relative z-10 inline-flex items-start justify-center leading-[1.08] sm:leading-[1.05] tracking-[-0.052em] font-extrabold text-[11.8vw] sm:text-[12.4vw] lg:text-[12.8vw]">
          {"GenzWorks".split("").map((char, index) => {
            const isLast = index === "GenzWorks".length - 1;
            return (
              <span
                key={index}
                className={`inline-block py-1 sm:py-2 ${isLast ? 'relative' : ''}`}
              >
                <span
                  style={{
                    transform: footerBrandVisible ? 'translateY(0px) scale(1)' : 'translateY(52px) scale(0.96)',
                    opacity: footerBrandVisible ? 1 : 0,
                    transition: `transform 1.15s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.045}s, opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.045}s`
                  }}
                  className="inline-block footer-gradient-text hover:scale-[1.03] hover:-translate-y-2 active:scale-95 transition-transform duration-300 ease-out cursor-default"
                >
                  {char}
                </span>

                {isLast && (
                  <span
                    style={{
                      transform: footerBrandVisible ? 'translateY(0px) scale(1)' : 'translateY(24px) scale(0.6)',
                      opacity: footerBrandVisible ? 1 : 0,
                      transition: 'transform 1.15s cubic-bezier(0.16, 1, 0.3, 1) 0.42s, opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.42s'
                    }}
                    className="absolute -top-2 sm:-top-3.5 md:-top-5 -right-1.5 sm:-right-3 text-[2.8vw] sm:text-[2.2vw] lg:text-[1.9vw] font-bold footer-gradient-text hover:scale-125 transition-transform duration-300 cursor-default select-none pointer-events-auto leading-none"
                    title="Copyright © GENZWORKS Studio"
                  >
                    ©
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
