import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe } from 'lucide-react';
import { INITIAL_TEAM } from '../data/teamData';
import { BRAND_CONFIG } from '../data/brandConfig';
import { resolveMemberPhoto } from '../teamImages';
import { Instagram, Linkedin, Github } from './icons/SocialIcons';

export default function Team({ onOpenJoinModal }) {
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);

  // Initialize team with resolved photos from localStorage if customized
  const [team] = useState(() => {
    return INITIAL_TEAM.map((m) => {
      const resolved = resolveMemberPhoto(m.id, m.photo);
      return { ...m, photo: resolved };
    });
  });

  return (
    <section id="about" className="py-24 border-t border-current/10 relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
        {/* Mission & Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 280, damping: 25 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20"
        >
          <div className="lg:col-span-7 space-y-6">
            <div className="font-mono-tech text-xs uppercase tracking-widest opacity-60">
              [04] / ABOUT GENZWORKS
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              A New Generation of{' '}
              <span className="font-editorial italic font-normal underline decoration-[#FF4F18]">
                Digital Thinking.
              </span>
            </h2>
            <p className="text-sm sm:text-base opacity-80 leading-relaxed">
              GenzWorks is a growing technology and creative studio built around one simple idea: bring different skills together to make great ideas happen.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl liquid-glass shadow-md">
              <h4 className="font-mono-tech text-xs uppercase font-bold text-[#FF4F18] mb-1">
                OUR MISSION
              </h4>
              <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
                To bring technology and creativity together to create useful, engaging, and accessible digital solutions.
              </p>
            </div>

            <div className="p-6 rounded-2xl liquid-glass shadow-md">
              <h4 className="font-mono-tech text-xs uppercase font-bold text-amber-500 mb-1">
                OUR VISION
              </h4>
              <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
                To become a trusted digital and creative studio recognized for innovative thinking and quality.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Meet the Team Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 280, damping: 25 }}
            className="lg:col-span-4 flex flex-col items-start text-left space-y-6"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-current/15 bg-current/[0.03] text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-current" />
              <span>THE PEOPLE BEHIND GENZWORKS</span>
            </div>

            <h3 className="text-5xl sm:text-6xl font-bold tracking-[-0.04em] leading-[1.02]">
              Meet The <br className="hidden sm:inline" />
              Team
            </h3>

            <p className="text-sm sm:text-base opacity-70 leading-relaxed max-w-sm">
              Our team of talented designers and engineers brings fresh ideas, thoughtful design, and deep expertise to every project.
            </p>

            <button
              onClick={onOpenJoinModal}
              className="group relative inline-flex items-center h-14 rounded-full bg-[#1C1C1F] dark:bg-white text-white dark:text-[#0E0E10] pr-7 pl-[3.5rem] overflow-hidden shadow-xl transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.03] hover:shadow-2xl cursor-pointer"
            >
              <span className="absolute left-1.5 w-11 h-11 rounded-full bg-white dark:bg-[#0E0E10] text-[#0E0E10] dark:text-white flex items-center justify-center shadow-sm transition-transform duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105">
                <ArrowRight className="w-4 h-4 transition-transform duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5" />
              </span>

              <span className="text-xs font-extrabold uppercase tracking-wider ml-1.5 transition-transform duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1">
                JOIN OUR TEAM
              </span>
            </button>
          </motion.div>

          {/* Interactive Accordion Cards */}
          <div className="lg:col-span-8 w-full overflow-x-auto lg:overflow-visible pb-2">
            <div className="flex flex-row items-stretch gap-2.5 sm:gap-3.5 h-[430px] sm:h-[490px] min-w-[640px] sm:min-w-0 w-full select-none">
              {team.map((member, idx) => {
                const isOpen = activeTeamIndex === idx;

                return (
                  <div
                    key={member.id}
                    onClick={() => setActiveTeamIndex(idx)}
                    onMouseEnter={() => setActiveTeamIndex(idx)}
                    style={{
                      flex: isOpen ? '4.6 1 0%' : '1 1 0%',
                      transition: 'flex 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    className="group/card relative h-full rounded-[24px] sm:rounded-[28px] overflow-hidden cursor-pointer bg-[#141417] shadow-lg"
                  >
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      style={{
                        transform: isOpen ? 'scale(1)' : 'scale(1.08)',
                        transition:
                          'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      className={`absolute inset-0 w-full h-full object-cover object-top pointer-events-none ${
                        isOpen
                          ? 'grayscale-0 brightness-100 contrast-100'
                          : 'grayscale brightness-90 contrast-110 group-hover/card:brightness-100'
                      }`}
                    />

                    <div
                      className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                        isOpen
                          ? 'bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-100'
                          : 'bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-90'
                      }`}
                    />

                    {/* Rotated Name on Collapsed Card */}
                    <div
                      className={`absolute inset-0 flex items-end justify-center pb-6 pointer-events-none z-20 transition-all duration-300 ${
                        isOpen ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                      }`}
                    >
                      <span
                        style={{ writingMode: 'vertical-rl' }}
                        className="rotate-180 text-white font-bold text-base sm:text-lg tracking-tight whitespace-nowrap drop-shadow-md"
                      >
                        {member.name}
                      </span>
                    </div>

                    {/* Expanded Card Details */}
                    <div
                      className={`absolute inset-0 z-20 p-5 sm:p-7 flex flex-col justify-between transition-all duration-500 ${
                        isOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto delay-75'
                          : 'opacity-0 translate-y-4 pointer-events-none'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                        <span className="px-3.5 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-tight shadow-sm">
                          {member.funkyBgRole.charAt(0) + member.funkyBgRole.slice(1).toLowerCase()}
                        </span>
                      </div>

                      <div className="space-y-3 max-w-md text-left" onClick={(e) => e.stopPropagation()}>
                        <div>
                          <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                            {member.name}
                          </h4>
                          <div className="text-xs sm:text-sm text-white/75 font-medium mt-0.5">
                            {member.role}
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-white/85 leading-relaxed line-clamp-2 sm:line-clamp-3">
                          {member.desc}
                        </p>

                        <div className="flex items-center gap-2 pt-1">
                          <a
                            href={member.socials.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white hover:text-black backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
                            title="LinkedIn"
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={member.socials.instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white hover:text-black backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
                            title="Instagram"
                          >
                            <Instagram className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={member.socials.github}
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white hover:text-black backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
                            title="GitHub"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`mailto:${BRAND_CONFIG.email}`}
                            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white hover:text-black backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
                            title="Email"
                          >
                            <Globe className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
