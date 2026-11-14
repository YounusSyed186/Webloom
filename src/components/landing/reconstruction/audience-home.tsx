'use client';

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useWebloomTheme, useIsWebloomOverlay } from './webloom-dual-theme-context';
import { getThemeAsset } from '@/lib/webloom-theme-assets';

const AUDIENCES = [
  {
    label: 'Developers & Engineers',
    tapeAlign: 'left-4 -rotate-2',
    noteRotate: '-rotate-[0.6deg]',
    iconPath: (
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="13.5" y1="4" x2="10.5" y2="20" />
      </>
    ),
  },
  {
    label: 'Designers & Creatives',
    tapeAlign: 'right-6 rotate-2',
    noteRotate: 'rotate-[0.5deg]',
    iconPath: (
      <>
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </>
    ),
  },
  {
    label: 'Students & Job Seekers',
    tapeAlign: 'left-1/2 -translate-x-1/2 rotate-1',
    noteRotate: '-rotate-[0.4deg]',
    iconPath: (
      <>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </>
    ),
  },
  {
    label: 'Writers & Knowledge Builders',
    tapeAlign: 'left-6 rotate-2',
    noteRotate: 'rotate-[0.6deg]',
    iconPath: (
      <>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </>
    ),
  },
  {
    label: 'Professionals & Freelancers',
    tapeAlign: 'right-8 -rotate-2',
    noteRotate: '-rotate-[0.5deg]',
    iconPath: (
      <>
        <rect width="20" height="14" x="2" y="7" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </>
    ),
  },
];

export function AudienceHomeReconstructed() {
  const theme = useWebloomTheme();
  const isOverlay = useIsWebloomOverlay();
  const isDark = theme === 'dark';
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 105,
    damping: 26,
  });

  const farHillsY = useTransform(smoothScroll, [0, 0.5, 1], [-16, 0, 14]);
  const farHillsScale = useTransform(smoothScroll, [0, 0.5, 1], [1.05, 1.01, 1.04]);

  const cloudLeftX = useTransform(smoothScroll, [0, 1], [-18, 24]);
  const cloudRightX = useTransform(smoothScroll, [0, 1], [22, -20]);

  const cottageY = useTransform(smoothScroll, [0, 0.5, 1], [-12, 0, 10]);
  const cottageScale = useTransform(smoothScroll, [0, 0.5, 1], [1.04, 1.01, 1.055]);

  const groveY = useTransform(smoothScroll, [0, 0.5, 1], [-10, 0, 8]);
  const groveScale = useTransform(smoothScroll, [0, 0.5, 1], [1.04, 1.01, 1.065]);

  const foregroundRotateX = useTransform(smoothScroll, [0, 0.45, 1], [7, 0, -3.5]);
  const foregroundY = useTransform(smoothScroll, [0, 0.45, 1], [18, 0, -12]);

  return (
    <section
      ref={sectionRef}
      id="explore"
      style={{ perspective: 1400 }}
      className={`relative isolate w-full pt-8 sm:pt-12 pb-28 sm:pb-32 md:pb-36 overflow-hidden select-none ${
        isDark ? 'bg-[#161310]' : 'bg-[#FAF6EE]'
      }`}
    >
      {/* PLANE 1 (FAR Z-PLANE): Far Rolling Hills & Valley Horizon */}
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : {
                y: farHillsY,
                scale: farHillsScale,
              }
        }
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img
          src={getThemeAsset('/generated/audience-hills-authentic.jpg', theme)}
          alt="Panoramic watercolor countryside cottage and rolling green hills"
          className="w-full h-full object-cover object-bottom"
        />
        <div
          className="absolute inset-x-0 top-0 h-12"
          style={{
            background: isDark
              ? 'linear-gradient(180deg, #161310 0%, rgba(22,19,16,0) 100%)'
              : 'linear-gradient(180deg, #FAF6EE 0%, rgba(250,246,238,0) 100%)',
          }}
        />
      </motion.div>

      {/* PLANE 2 (SKY Z-PLANE): Drifting Paper-Cutout Clouds in the Background Sky */}
      <div
        aria-hidden="true"
        className="hidden sm:block absolute inset-x-0 top-4 h-36 z-[2] pointer-events-none overflow-hidden"
      >
        <motion.div
          style={prefersReducedMotion ? undefined : { x: cloudLeftX }}
          className="absolute left-[6%] top-3 w-44 h-14 opacity-70 drop-shadow-[0_6px_10px_rgba(40,30,18,0.06)]"
        >
          <svg viewBox="0 0 220 70" fill="none" className="w-full h-full">
            <path
              d="M28 56H188C201 56 210 47 210 36C210 25 201 17 189 17C185 8 175 2 163 2C149 2 138 10 134 21C128 16 120 13 110 13C93 13 79 25 77 40C71 36 64 34 56 34C39 34 26 44 28 56Z"
              fill={isDark ? '#222730' : '#FBF8F1'}
              stroke={isDark ? '#353D4B' : '#E6DEC8'}
              strokeWidth="1.2"
            />
          </svg>
        </motion.div>

        <motion.div
          style={prefersReducedMotion ? undefined : { x: cloudRightX }}
          className="absolute left-[44%] top-4 w-44 h-13 opacity-60 drop-shadow-[0_6px_10px_rgba(40,30,18,0.05)]"
        >
          <svg viewBox="0 0 220 70" fill="none" className="w-full h-full">
            <path
              d="M22 56H192C204 56 212 48 212 38C212 28 203 20 192 20C188 9 176 3 162 3C146 3 133 13 129 26C122 20 112 17 101 17C84 17 70 28 67 43C60 39 51 37 42 37C28 37 19 45 22 56Z"
              fill={isDark ? '#222730' : '#FBF8F1'}
              stroke={isDark ? '#353D4B' : '#E6DEC8'}
              strokeWidth="1.2"
            />
          </svg>
        </motion.div>
      </div>

      {/* PLANE 3 (MIDGROUND DIORAMA CUTOUT): Terracotta Cottage & Cypress Trees on Left Hill */}
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : {
                y: cottageY,
                scale: cottageScale,
              }
        }
        className="absolute inset-0 z-[5] pointer-events-none origin-bottom-left"
      >
        <img
          src={getThemeAsset('/generated/diorama-cottage-cutout.png', theme)}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-bottom drop-shadow-[0_-6px_14px_rgba(32,24,14,0.16)]"
        />
      </motion.div>

      {/* PLANE 4 (FOREGROUND DIORAMA CUTOUT): Right Meadow & Green Tree Grove */}
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : {
                y: groveY,
                scale: groveScale,
              }
        }
        className="absolute inset-0 z-[8] pointer-events-none origin-bottom-right"
      >
        <img
          src={getThemeAsset('/generated/diorama-right-grove-cutout.png', theme)}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-bottom drop-shadow-[0_-8px_16px_rgba(28,20,12,0.18)]"
        />
      </motion.div>

      {/* PLANE 5 (FOREGROUND 3D EDITORIAL STAGE): Heading + 5 Audience Categories */}
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : {
                rotateX: foregroundRotateX,
                y: foregroundY,
                transformStyle: 'preserve-3d',
              }
        }
        className="relative z-15 max-w-6xl mx-auto px-6 sm:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          <div className="hidden lg:block lg:col-span-2" />

          {/* Center Column: Eyebrow Badge + Dimensional Editorial Heading */}
          <motion.div
            initial={isOverlay ? false : { opacity: 0, y: 18, rotateX: 10 }}
            animate={isOverlay ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
            whileInView={isOverlay ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: 'translateZ(32px)' }}
            className="lg:col-span-6 flex flex-col items-start lg:pl-4"
          >
            <div
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-[11px] sm:text-[12px] font-medium tracking-wide shadow-2xs mb-3 ${
                isDark
                  ? 'bg-[#26201B]/95 border-[#3E332A] text-[#E6D8C5]'
                  : 'bg-[#EFE4D4]/95 border-[#DFD0BC] text-[#4E3E30]'
              }`}
            >
              <span className={`text-[10px] ${isDark ? 'text-[#E6B86A]' : 'text-[#9C7248]'}`}>
                ✦
              </span>
              <span>Made for everyone</span>
            </div>

            <h2
              className={`font-serif text-[30px] sm:text-[36px] xl:text-[42px] leading-[1.12] font-normal tracking-tight ${
                isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
              }`}
            >
              A home for builders, thinkers, <br className="hidden sm:inline" />
              creators, and dreamers.
            </h2>
          </motion.div>

          {/* Right Column: 5 Audience Categories Floating as Taped Paper Notes */}
          <motion.div
            initial={isOverlay ? false : "hidden"}
            animate={isOverlay ? "visible" : undefined}
            whileInView={isOverlay ? undefined : "visible"}
            viewport={{ once: true, amount: 0.3 }}
            variants={
              isOverlay
                ? undefined
                : {
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.075 } },
                  }
            }
            style={{ transform: 'translateZ(42px)', transformStyle: 'preserve-3d' }}
            className={`lg:col-span-4 flex flex-col justify-center border-t lg:border-t-0 lg:border-l pt-5 lg:pt-1 lg:pl-7 ${
              isDark ? 'border-[#3B3027]/80' : 'border-[#D5C9B6]/80'
            }`}
          >
            <div className="flex flex-col gap-2.5">
              {AUDIENCES.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={isOverlay ? false : undefined}
                  animate={isOverlay ? { opacity: 1, x: 0, rotateY: 0 } : undefined}
                  variants={
                    isOverlay
                      ? undefined
                      : {
                          hidden: { opacity: 0, x: 18, rotateY: -10 },
                          visible: {
                            opacity: 1,
                            x: 0,
                            rotateY: 0,
                            transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] },
                          },
                        }
                  }
                  whileHover={{
                    x: 6,
                    y: -2,
                    scale: 1.025,
                    rotateZ: 0,
                  }}
                  style={{ transform: `translateZ(${(idx + 1) * 4}px)` }}
                  className={`relative flex items-center gap-3 px-3.5 py-2 rounded-[9px] border group cursor-pointer transition-colors ${
                    isDark
                      ? 'bg-[#231D18]/92 border-[#3E332A] shadow-[0_6px_16px_rgba(0,0,0,0.38)] text-[#EAE0D2] hover:bg-[#2C241E] hover:border-[#544538]'
                      : 'bg-[#FAF6EE]/92 border-[#DFD2BD] shadow-[0_4px_12px_rgba(35,25,15,0.07)] text-[#221D18] hover:bg-[#FCF9F3] hover:border-[#CBB89D]'
                  } ${item.noteRotate}`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -top-1.5 w-7 h-2.5 border shadow-2xs pointer-events-none ${
                      isDark
                        ? 'bg-[#9A7E52]/80 border-[#846B43]/40'
                        : 'bg-[#E2C88A]/80 border-[#D4B878]/40'
                    } ${item.tapeAlign}`}
                  />

                  <div
                    className={`w-6 h-6 rounded-md border flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all shrink-0 ${
                      isDark
                        ? 'bg-[#1A1512]/85 border-[#3A3027]'
                        : 'bg-[#EFE6D5]/80 border-[#DFD2BD]'
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 fill-none shrink-0 ${
                        isDark ? 'stroke-[#EAE0D2]' : 'stroke-[#2B231D]'
                      }`}
                      viewBox="0 0 24 24"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {item.iconPath}
                    </svg>
                  </div>
                  <span
                    className={`text-[13px] sm:text-[13.5px] font-medium tracking-tight transition-colors ${
                      isDark ? 'group-hover:text-white' : 'group-hover:text-black'
                    }`}
                  >
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* PLANE 6: Authentic Torn-Paper / Deckle Edge Transition at Bottom of Hills */}
      <div className="absolute bottom-0 inset-x-0 w-full h-4 sm:h-6 z-20 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full drop-shadow-[0_-2px_3px_rgba(15,12,8,0.18)]"
        >
          <path
            d="M0 22L35 16L72 25L110 15L150 23L195 14L240 24L285 17L330 26L375 15L420 22L465 14L510 25L555 18L600 24L645 15L690 23L735 16L780 26L825 15L870 22L915 14L960 24L1005 17L1050 25L1095 16L1140 23L1185 15L1230 24L1275 17L1320 25L1365 16L1405 22L1440 17V48H0V22Z"
            fill={isDark ? '#161310' : '#FAF6EE'}
          />
        </svg>
      </div>
    </section>
  );
}
