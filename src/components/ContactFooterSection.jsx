import React from 'react';
import { Check, Copy, ArrowUpRight } from 'lucide-react';
import { BRAND_CONFIG, WhatsApp } from '../data/brand';

export default function ContactFooterSection({
  copyStudioEmail,
  copied,
  copyStudioPhone,
  phoneCopied,
  coimbatoreTime,
  contactForm,
  setContactForm,
  selectedServices,
  toggleServiceChip,
  handleContactSubmit,
  isSubmittingForm,
  formSubmitted,
  jumpTo,
  setActiveLegalModal,
  footerBrandRef,
  footerBrandVisible
}) {
  return (
    <footer id="contact" className="relative z-10 bg-[#08080A] text-[#F5F5F3] pt-24 sm:pt-32 pb-14 sm:pb-20 rounded-t-[40px] sm:rounded-t-[64px] mt-12 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12">
        {/* Main Contact Split — Clean, Spacious & Refined */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 pb-24 border-b border-white/10 reveal-on-scroll">
          
          {/* Left Side: Statement & Direct Email */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-12">
            <div>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-medium text-zinc-300 mb-7">
                <span className="w-2 h-2 rounded-full bg-[#D9FF3F]" />
                <span>Available for new projects — {BRAND_CONFIG.availability}</span>
              </div>

              <h2 className="text-5xl sm:text-7xl font-extrabold tracking-[-0.04em] leading-[1.15] text-white mb-8">
                Let’s build <br />
                something <span className="font-editorial italic font-normal text-[#D9FF3F] inline-block pr-2">great.</span>
              </h2>

              <p className="text-base sm:text-lg text-zinc-400 max-w-md leading-relaxed font-normal">
                Have a project in mind? Reach out directly or fill out the brief. You’ll hear straight from our studio lead within 24 hours.
              </p>
            </div>

            {/* Clean Direct Contact Info */}
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-zinc-500 block mb-2 font-mono-tech">
                  Direct Email
                </span>
                <button
                  onClick={copyStudioEmail}
                  className="group inline-flex items-center gap-3 text-2xl sm:text-3xl font-bold tracking-tight text-white hover:text-[#D9FF3F] transition-colors"
                >
                  <span>{BRAND_CONFIG.email}</span>
                  <span className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-[#D9FF3F] group-hover:text-black flex items-center justify-center transition-all">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </span>
                </button>
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-zinc-500 block mb-2 font-mono-tech">
                  Studio Phone &amp; WhatsApp
                </span>
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => copyStudioPhone(BRAND_CONFIG.phone)}
                      className="group inline-flex items-center gap-2.5 text-lg sm:text-xl font-bold tracking-tight text-white hover:text-[#D9FF3F] transition-colors"
                    >
                      <span>{BRAND_CONFIG.phone}</span>
                      <span className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#D9FF3F] group-hover:text-black flex items-center justify-center transition-all">
                        {phoneCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </span>
                    </button>
                    <a
                      href={`https://wa.me/918754277982?text=Hi%20GenzWorks,%20I'd%20like%20to%20discuss%20a%20project.`}
                      target="_blank"
                      rel="noreferrer"
                      title="Chat on WhatsApp (+91 87542 77982)"
                      aria-label="WhatsApp (+91 87542 77982)"
                      className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_2px_10px_rgba(37,211,102,0.35)] shrink-0"
                    >
                      <WhatsApp className="w-4 h-4 fill-current" />
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => copyStudioPhone(BRAND_CONFIG.phone2)}
                      className="group inline-flex items-center gap-2.5 text-lg sm:text-xl font-bold tracking-tight text-white hover:text-[#D9FF3F] transition-colors"
                    >
                      <span>{BRAND_CONFIG.phone2}</span>
                      <span className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#D9FF3F] group-hover:text-black flex items-center justify-center transition-all">
                        {phoneCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </span>
                    </button>
                    <a
                      href={`https://wa.me/919566980426?text=Hi%20GenzWorks,%20I'd%20like%20to%20discuss%20a%20project.`}
                      target="_blank"
                      rel="noreferrer"
                      title="Chat on WhatsApp (+91 95669 80426)"
                      aria-label="WhatsApp (+91 95669 80426)"
                      className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_2px_10px_rgba(37,211,102,0.35)] shrink-0"
                    >
                      <WhatsApp className="w-4 h-4 fill-current" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-zinc-400 pt-2">
                <span>Coimbatore, Tamil Nadu</span>
                <span className="text-white/20">•</span>
                <span className="font-mono-tech text-xs text-zinc-300">{coimbatoreTime}</span>
              </div>
            </div>
          </div>

          {/* Right Side: Simple, Effortless Form */}
          <div className="lg:col-span-6 lg:pl-8">
            <form onSubmit={handleContactSubmit} className="space-y-8">
              {/* Interactive Service Chips */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-zinc-400 block font-mono-tech">
                  I'm interested in:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Web Development',
                    'Graphic Design',
                    'Commercial Posters',
                    'Academic Mentorship',
                    'Video & Multimedia',
                    'Content & Copywriting'
                  ].map((svc) => {
                    const isSelected = selectedServices.includes(svc);
                    return (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => toggleServiceChip(svc)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all ${
                          isSelected
                            ? 'bg-[#D9FF3F] text-[#08080A] border-[#D9FF3F] shadow-sm font-bold'
                            : 'bg-white/[0.05] text-zinc-400 border-white/15 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {svc}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Clean Minimalist Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <input
                    required
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-transparent border-b border-white/25 focus:border-[#D9FF3F] py-3.5 text-base text-white placeholder:text-zinc-400 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    required
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="Your email"
                    className="w-full bg-transparent border-b border-white/25 focus:border-[#D9FF3F] py-3.5 text-base text-white placeholder:text-zinc-400 focus:outline-none transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <input
                    required
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="Phone / WhatsApp"
                    className="w-full bg-transparent border-b border-white/25 focus:border-[#D9FF3F] py-3.5 text-base text-white placeholder:text-zinc-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <textarea
                  required
                  rows={3}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Your message..."
                  className="w-full bg-transparent border-b border-white/25 focus:border-[#D9FF3F] py-3.5 text-base text-white placeholder:text-zinc-400 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmittingForm}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#D9FF3F] hover:bg-white text-[#08080A] font-extrabold text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmittingForm ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Sending to Sheets...</span>
                    </>
                  ) : (
                    <>
                      <span>{formSubmitted ? 'Message Sent ✓' : 'Send Message'}</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Minimalist Navigation & Original Brand Social Icons Row */}
        <div className="py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-white/10 text-sm">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-medium text-zinc-300">
            {[
              { id: 'home', label: 'Home' },
              { id: 'works', label: 'Products' },
              { id: 'why-us', label: 'Why Us' },
              { id: 'process', label: 'Process' },
              { id: 'about', label: 'Team' },
              { id: 'services', label: 'Services' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => jumpTo(item.id)}
                className="hover:text-[#D9FF3F] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Official Original Brand SVG Icons */}
          <div className="flex items-center gap-3">
            {/* Instagram Original SVG */}
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

            {/* GitHub Original SVG */}
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
        <div className="pt-8 pb-6 sm:pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="GENZWORKS Studio Logo" className="w-5 h-5 object-contain" />
            <span>© {BRAND_CONFIG.year.replace('®', '')} {BRAND_CONFIG.brandName} Studio. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveLegalModal('terms')}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => setActiveLegalModal('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-zinc-300 hover:text-[#D9FF3F] transition-colors font-medium"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>

      {/* Giant Edge-to-Edge Scroll-Triggered Gradient "GenzWorks®" Wordmark Reveal */}
      <div
        ref={footerBrandRef}
        className="relative z-10 w-full pt-10 sm:pt-14 md:pt-16 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-8 select-none flex items-center justify-center overflow-visible"
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

        <div className="relative z-10 inline-flex items-start justify-center leading-[1.12] sm:leading-[1.1] tracking-[-0.045em] font-extrabold text-[11vw] sm:text-[11.8vw] lg:text-[12.2vw]">
          {"GenzWorks".split("").map((char, index) => {
            const isLast = index === "GenzWorks".length - 1;
            return (
              <span
                key={index}
                className={`inline-block py-1 sm:py-2 ${isLast ? 'relative pr-3 sm:pr-4 md:pr-5' : ''}`}
              >
                <span
                  style={{
                    transform: footerBrandVisible ? 'translateY(0px) scale(1)' : 'translateY(40px) scale(0.96)',
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
                      transform: footerBrandVisible ? 'translateY(0px) scale(1)' : 'translateY(16px) scale(0.7)',
                      opacity: footerBrandVisible ? 1 : 0,
                      transition: 'transform 1.15s cubic-bezier(0.16, 1, 0.3, 1) 0.42s, opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.42s'
                    }}
                    className="absolute top-1 sm:top-2 md:top-3 right-0 text-[2.2vw] sm:text-[1.8vw] lg:text-[1.4vw] font-bold text-zinc-300/90 hover:text-white hover:scale-125 transition-all duration-300 cursor-default select-none pointer-events-auto leading-none"
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
    </footer>
  );
}
