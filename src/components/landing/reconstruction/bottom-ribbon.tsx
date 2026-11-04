'use client';

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Tilt3DCard, MagneticWrapper } from './motion-primitives';
import { useWebloomTheme } from './webloom-dual-theme-context';
import { getThemeAsset } from '@/lib/webloom-theme-assets';
import { useApp } from '@/lib/context/app-context';

export function BottomRibbonReconstructed() {
  const theme = useWebloomTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { setAuthModalMode, setIsAuthModalOpen } = useApp();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 95%', 'end 50%'],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
  });

  const ribbonRotateX = useTransform(smoothScroll, [0, 0.65, 1], [12, 0, 0]);
  const ribbonScale = useTransform(smoothScroll, [0, 0.65, 1], [1.035, 1, 1]);
  const ribbonY = useTransform(smoothScroll, [0, 0.65, 1], [18, 0, 0]);

  const handleStart = () => {
    setAuthModalMode('signup');
    setIsAuthModalOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      id="finale-ribbon"
      style={{ perspective: 1300 }}
      className="w-full py-6 sm:py-8 md:py-10 select-none overflow-hidden"
    >
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : {
                rotateX: ribbonRotateX,
                scale: ribbonScale,
                y: ribbonY,
                transformStyle: 'preserve-3d',
              }
        }
        className="max-w-5xl mx-auto px-4 sm:px-8"
      >
        {/* Desktop & Tablet: High-Res Handmade Cotton-Rag Lavender Deckle-Edge Paper Banner */}
        <Tilt3DCard
          maxTilt={3.5}
          scaleOnHover={1.008}
          className="hidden md:flex relative w-full aspect-[1293/265] min-h-[168px] items-center justify-between pl-[17%] pr-[15%]"
        >
          <img
            src={getThemeAsset('/generated/lavender-ribbon-clean.png', theme)}
            alt="Handmade lavender deckle-edge paper banner with pressed wildflower"
            className={`absolute inset-0 w-full h-full object-fill pointer-events-none select-none ${
              isDark
                ? 'drop-shadow-[0_14px_26px_rgba(0,0,0,0.55)]'
                : 'drop-shadow-[0_10px_18px_rgba(45,32,55,0.12)]'
            }`}
          />

          {/* Top-Right Tilted Perforated Vintage Floral Postage Stamp + Bottom-Right Wavy Postmark Lines */}
          <div
            style={{ transform: 'translateZ(26px)' }}
            className="absolute right-[2.5%] top-0 bottom-0 w-36 z-20 pointer-events-none"
          >
            <motion.div
              animate={{ rotate: [12, 13.8, 12], y: [0, -2, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              className={`absolute right-3 top-1 w-[62px] h-[76px] p-1.5 border ${
                isDark
                  ? 'bg-[#2C241E] border-[#4A3D31] shadow-[0_10px_22px_rgba(0,0,0,0.55)]'
                  : 'bg-[#FAF3E4] border-[#D9CCB6] shadow-[0_8px_18px_rgba(35,25,15,0.16)]'
              }`}
              style={{
                backgroundImage: isDark
                  ? 'radial-gradient(circle, transparent 68%, #4A3D31 70%)'
                  : 'radial-gradient(circle, transparent 68%, #D8CBB4 70%)',
                backgroundSize: '6px 6px',
              }}
            >
              <div
                className={`w-full h-full border flex flex-col items-center justify-center p-1 relative overflow-hidden ${
                  isDark
                    ? 'bg-[#362C1E] border-[#6E5A3B]'
                    : 'bg-[#F1DA93] border-[#C8B072]'
                }`}
              >
                <svg className="w-10 h-12" viewBox="0 0 40 48" fill="none">
                  <path d="M20 22V44" stroke="#688E52" strokeWidth="2" strokeLinecap="round" />
                  <path d="M20 33C15 30 12 31 10 34C13 36 17 35 20 33Z" fill="#78A060" />
                  <path d="M20 36C25 33 28 34 30 37C27 39 23 38 20 36Z" fill="#78A060" />
                  <circle cx="20" cy="15" r="7" fill="#D9828C" />
                  <circle cx="14" cy="13" r="4.5" fill="#E5969F" />
                  <circle cx="26" cy="13" r="4.5" fill="#E5969F" />
                  <circle cx="16" cy="19" r="4.5" fill="#DF8C96" />
                  <circle cx="24" cy="19" r="4.5" fill="#DF8C96" />
                  <circle cx="20" cy="15" r="3" fill="#E5B84B" />
                </svg>
              </div>
            </motion.div>

            {/* Wavy Cancellation Postmark Lines at Bottom-Right */}
            <svg
              className={`absolute bottom-3 -right-4 w-36 h-11 ${
                isDark ? 'text-[#A896BA]/55' : 'text-[#7D7089]/65'
              }`}
              viewBox="0 0 150 44"
              fill="none"
            >
              <path
                d="M4 10C18 4 32 16 46 10C60 4 74 16 88 10C102 4 116 16 130 10C138 7 144 9 148 11"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
              <path
                d="M4 18C18 12 32 24 46 18C60 12 74 24 88 18C102 12 116 24 130 18C138 15 144 17 148 19"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
              <path
                d="M4 26C18 20 32 32 46 26C60 20 74 32 88 26C102 20 116 32 130 26C138 23 144 25 148 27"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
              <path
                d="M4 34C18 28 32 40 46 34C60 28 74 40 88 34C102 28 116 40 130 34C138 31 144 33 148 35"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Left Copy inside the lavender ribbon */}
          <div style={{ transform: 'translateZ(18px)' }} className="relative z-10 text-left">
            <h2
              className={`font-serif text-[26px] lg:text-[32px] xl:text-[35px] font-normal leading-tight tracking-tight ${
                isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
              }`}
            >
              Create your Webloom today.
            </h2>
            <p
              className={`text-[13px] lg:text-[14.5px] mt-1 font-normal ${
                isDark ? 'text-[#D2C5DB]' : 'text-[#423832]'
              }`}
            >
              It&apos;s free, simple, and takes less than a minute.
            </p>
          </div>

          {/* Right Magnetic CTA Pill Button */}
          <div style={{ transform: 'translateZ(22px)' }} className="relative z-10 pr-2 lg:pr-4 shrink-0">
            <MagneticWrapper strength={0.22}>
              <button
                onClick={handleStart}
                className={`inline-flex items-center justify-center gap-2 h-[38px] lg:h-[42px] px-6 lg:px-7 rounded-full text-[12.5px] lg:text-[13.5px] font-medium shadow-md transition-all hover:scale-[1.03] active:scale-[0.98] ${
                  isDark
                    ? 'bg-[#F4EFE6] hover:bg-white text-[#181410]'
                    : 'bg-[#1D1A17] hover:bg-black text-[#FAF6EE]'
                }`}
              >
                <span>Get started for free</span>
                <span className="text-[11px] font-sans">↗</span>
              </button>
            </MagneticWrapper>
          </div>
        </Tilt3DCard>

        {/* Mobile (< md): Responsive Cotton-Rag Lavender Deckle-Edge Paper Banner */}
        <div className="md:hidden relative w-full p-8 text-center flex flex-col items-center gap-4">
          <img
            src={getThemeAsset('/generated/card-lavender-hd.png', theme)}
            alt="Lavender cotton paper texture"
            className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none drop-shadow-[0_8px_16px_rgba(45,32,55,0.1)]"
          />
          <div className="relative z-10">
            <h2
              className={`font-serif text-[26px] font-normal leading-tight ${
                isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
              }`}
            >
              Create your Webloom today.
            </h2>
            <p
              className={`text-[13.5px] mt-1.5 font-normal ${
                isDark ? 'text-[#D2C5DB]' : 'text-[#423832]'
              }`}
            >
              It&apos;s free, simple, and takes less than a minute.
            </p>
          </div>
          <button
            onClick={handleStart}
            className={`relative z-10 inline-flex items-center justify-center gap-2 h-[40px] px-6 rounded-full text-[13px] font-medium shadow-md ${
              isDark
                ? 'bg-[#F4EFE6] text-[#181410]'
                : 'bg-[#1D1A17] hover:bg-black text-[#FAF6EE]'
            }`}
          >
            <span>Get started for free</span>
            <span className="text-[11px] font-sans">↗</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
