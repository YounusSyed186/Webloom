'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export function WebloomPreloader() {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(24);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    try {
      const seen = sessionStorage.getItem('webloom_preloader_seen');
      if (seen === '1') {
        setIsVisible(false);
        return;
      }
    } catch {
      // ignore storage errors
    }

    const t1 = setTimeout(() => setProgress(72), 110);
    const t2 = setTimeout(() => setProgress(100), 280);
    const t3 = setTimeout(() => {
      setIsVisible(false);
      try {
        sessionStorage.setItem('webloom_preloader_seen', '1');
      } catch {
        // ignore
      }
    }, 520);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="webloom-preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -24,
            transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[120] bg-[#FAF6EE] text-[#1F1A16] flex flex-col items-center justify-center select-none pointer-events-none"
        >
          {/* Ambient radial warm paper glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 48%, rgba(247,220,111,0.22) 0%, rgba(250,246,238,0) 60%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {/* Animated 8-Petal Botanical Rosette Logo */}
            <motion.div
              initial={{ scale: 0.9, rotate: -18 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="w-14 h-14 rounded-2xl bg-[#F4ECE0] border border-[#DFD2BD] shadow-[0_8px_24px_rgba(45,35,25,0.08)] flex items-center justify-center mb-4"
            >
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-8 h-8 text-[#1F1A16]"
                animate={{ rotate: 90 }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
              >
                <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" fill="#F7DC6F" />
                <circle cx="12" cy="6" r="2.3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="18" r="2.3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="6" cy="12" r="2.3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="18" cy="12" r="2.3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="7.8" cy="7.8" r="2.3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="16.2" cy="16.2" r="2.3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="16.2" cy="7.8" r="2.3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="7.8" cy="16.2" r="2.3" stroke="currentColor" strokeWidth="1.5" />
              </motion.svg>
            </motion.div>

            {/* Kinetic Brand Name & Editorial Tagline */}
            <motion.div
              initial={{ y: 4 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <span className="font-serif text-[28px] sm:text-[32px] tracking-tight text-[#1F1A16] leading-none">
                Webloom
              </span>
              <span className="font-serif italic text-[14.5px] text-[#65594D] mt-1.5">
                Your corner of the{' '}
                <span className="relative inline-block px-1 text-[#1F1A16]">
                  <span className="absolute inset-0 bg-[#F7DC6F]/75 rounded-sm -rotate-1" />
                  <span className="relative">internet.</span>
                </span>
              </span>
            </motion.div>

            {/* Delicate Golden-Ochre Progress Thread */}
            <div className="mt-5 w-48 h-[3.5px] rounded-full bg-[#EAE0CE] overflow-hidden border border-[#DFD2BD]/60">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#C89D54] via-[#E6B84C] to-[#8C6A42]"
                initial={{ width: '24%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
