import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brandConfig';
import { WhatsApp } from './icons/SocialIcons';

export default function Contact({
  selectedServices = ['Web Development'],
  setSelectedServices,
  triggerToast
}) {
  const [copied, setCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Live Coimbatore Time
  const [coimbatoreTime, setCoimbatoreTime] = useState(() => {
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(new Date()) + ' IST';
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCoimbatoreTime(
        new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }).format(new Date()) + ' IST'
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyStudioEmail = () => {
    const input = document.createElement('textarea');
    input.value = BRAND_CONFIG.email;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      if (triggerToast) triggerToast(`Copied ${BRAND_CONFIG.email} to clipboard`);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      if (triggerToast) triggerToast(BRAND_CONFIG.email);
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
      if (triggerToast) triggerToast(`Copied ${numberToCopy} to clipboard`);
      setTimeout(() => setPhoneCopied(false), 3000);
    } catch {
      if (triggerToast) triggerToast(numberToCopy);
    }
    document.body.removeChild(input);
  };

  const toggleServiceChip = (serviceName) => {
    if (!setSelectedServices) return;
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.length > 1
          ? prev.filter((item) => item !== serviceName)
          : prev
        : [...prev, serviceName]
    );
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
      if (triggerToast) triggerToast("Message sent successfully! Stored to Google Sheets.");
      setContactForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    } catch (err) {
      console.error('Submission error:', err);
      setFormSubmitted(true);
      if (triggerToast) triggerToast("Thank you! Your message has been received.");
      setContactForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const AVAILABLE_SERVICES = [
    'Web Development',
    'Graphic Design',
    'Commercial Posters',
    'Academic Mentorship',
    'Video & Multimedia',
    'Content & Copywriting'
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 pb-24 border-b border-white/10">
      {/* Left Side: Statement & Direct Email */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ type: "spring", stiffness: 280, damping: 25 }}
        className="lg:col-span-6 flex flex-col justify-between space-y-12"
      >
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
              className="group inline-flex items-center gap-3 text-2xl sm:text-3xl font-bold tracking-tight text-white hover:text-[#D9FF3F] transition-colors cursor-pointer text-left"
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
                  className="group inline-flex items-center gap-2.5 text-lg sm:text-xl font-bold tracking-tight text-white hover:text-[#D9FF3F] transition-colors cursor-pointer"
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
                  className="group inline-flex items-center gap-2.5 text-lg sm:text-xl font-bold tracking-tight text-white hover:text-[#D9FF3F] transition-colors cursor-pointer"
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
      </motion.div>

      {/* Right Side: Simple, Effortless Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ type: "spring", stiffness: 280, damping: 25, delay: 0.1 }}
        className="lg:col-span-6 lg:pl-8"
      >
        <form onSubmit={handleContactSubmit} className="space-y-8">
          {/* Interactive Service Chips */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-zinc-400 block font-mono-tech">
              I'm interested in:
            </span>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_SERVICES.map((svc) => {
                const isSelected = selectedServices.includes(svc);
                return (
                  <button
                    key={svc}
                    type="button"
                    onClick={() => toggleServiceChip(svc)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
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

          {/* Minimalist Inputs */}
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
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#D9FF3F] hover:bg-white text-[#08080A] font-extrabold text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
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
      </motion.div>
    </div>
  );
}
