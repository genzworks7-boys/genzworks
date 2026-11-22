import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoader({ loaderPhase }) {
  return (
    <AnimatePresence>
      {loaderPhase !== 'done' && (
        <motion.div
          key="intro-loader"
          initial={{ y: 0 }}
          animate={{ y: loaderPhase === 'curtain' ? '-100%' : '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.88, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9500] bg-[#0B0B0D] text-white flex flex-col items-center justify-center select-none overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1.5 h-24 bg-[#00F0FF] shadow-[0_0_18px_#00F0FF]" />

          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-14 h-14 sm:w-16 sm:h-16 mb-5 flex items-center justify-center"
            >
              <img
                src="/logo.png"
                alt="GENZWORKS Studio"
                width="64"
                height="64"
                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(0,240,255,0.75)]"
              />
            </motion.div>

            <div className="flex items-baseline gap-2.5 sm:gap-3.5 text-3xl sm:text-5xl md:text-[54px] tracking-[-0.03em] pb-3.5 sm:pb-4">
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{
                  opacity: loaderPhase === 'are-you' || loaderPhase === 'ready' || loaderPhase === 'curtain' ? 1 : 0,
                  y: loaderPhase === 'are-you' || loaderPhase === 'ready' || loaderPhase === 'curtain' ? 0 : 14
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-semibold text-white"
              >
                Are you
              </motion.span>

              <motion.span
                initial={{ opacity: 0.12, y: 10 }}
                animate={{
                  opacity: loaderPhase === 'ready' || loaderPhase === 'curtain' ? 1 : 0.12,
                  y: loaderPhase === 'ready' || loaderPhase === 'curtain' ? 0 : 10
                }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="font-normal text-white/95"
              >
                ready?
              </motion.span>
            </div>

            <div className="w-full h-[1.5px] bg-white/15 overflow-hidden rounded-full">
              <motion.div
                initial={{ width: '0%' }}
                animate={{
                  width:
                    loaderPhase === 'start'
                      ? '0%'
                      : loaderPhase === 'are-you'
                      ? '48%'
                      : '100%'
                }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-white"
              />
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-white/15" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
