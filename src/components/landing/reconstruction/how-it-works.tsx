'use client';

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import {
  Tilt3DCard,
  MagneticWrapper,
  CinematicCameraScene,
} from './motion-primitives';
import {
  useWebloomTheme,
  useWebloomSyncState,
  useIsWebloomOverlay,
} from './webloom-dual-theme-context';
import { getThemeAsset } from '@/lib/webloom-theme-assets';
import { useApp } from '@/lib/context/app-context';

const STEPS = [
  {
    num: '01',
    title: 'Claim your corner',
    desc: 'Pick your personal handle (webloom.me/you) or connect your own custom domain in seconds.',
    bg: '/generated/card-sage-hd.png',
    rotate: '-rotate-1',
    enterRotateY: 12,
    badge: 'Takes 15 seconds',
    iconPath: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3.6 9h16.8M3.6 15h16.8" />
        <path d="M11.5 3a17 17 0 0 0 0 18M12.5 3a17 17 0 0 1 0 18" />
      </>
    ),
  },
  {
    num: '02',
    title: 'Arrange your world',
    desc: 'Drop in your projects, writing, links, photos, and reading lists using tactile modular blocks.',
    bg: '/generated/card-peach-hd.png',
    rotate: 'rotate-1',
    enterRotateY: 0,
    badge: 'Zero code needed',
    iconPath: (
      <>
        <rect x="3" y="3" width="7" height="9" rx="1.2" />
        <rect x="14" y="3" width="7" height="5" rx="1.2" />
        <rect x="14" y="12" width="7" height="9" rx="1.2" />
        <rect x="3" y="16" width="7" height="5" rx="1.2" />
      </>
    ),
  },
  {
    num: '03',
    title: 'Share & watch it bloom',
    desc: 'Place one timeless link in your bio, resume, and email signature—and see what visitors love most.',
    bg: '/generated/card-lavender-hd.png',
    rotate: '-rotate-1',
    enterRotateY: -12,
    badge: 'Live instantly',
    iconPath: (
      <>
        <path d="M12 22v-8" />
        <path d="M12 14C8.5 14 6 11.5 6 8c3.5 0 6 2.5 6 6Z" />
        <path d="M12 16c3.5 0 6-2.5 6-6-3.5 0-6 2.5-6 6Z" />
        <circle cx="12" cy="5" r="2" />
      </>
    ),
  },
];

export function HowItWorksReconstructed() {
  const theme = useWebloomTheme();
  const isOverlay = useIsWebloomOverlay();
  const isDark = theme === 'dark';
  const { claimHandle, setClaimHandle } = useWebloomSyncState();
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { setAuthModalMode, setIsAuthModalOpen } = useApp();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'end 20%'],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
  });
  const threadProgress = useTransform(smoothScroll, [0.15, 0.65], [0, 1]);

  const step0Z = useTransform(smoothScroll, [0.05, 0.45, 0.85], [26, 18, 8]);
  const step1Z = useTransform(smoothScroll, [0.1, 0.5, 0.88], [-6, 16, 12]);
  const step2Z = useTransform(smoothScroll, [0.15, 0.6, 0.92], [-34, 24, 28]);
  const stepZPlanes = [step0Z, step1Z, step2Z];

  const emergingLinkY = useTransform(smoothScroll, [0.52, 0.95], [-10, 26]);
  const emergingLinkOpacity = useTransform(smoothScroll, [0.48, 0.68, 0.98], [0, 1, 1]);
  const emergingLinkScale = useTransform(smoothScroll, [0.52, 0.88], [0.92, 1.02]);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthModalMode('signup');
    setIsAuthModalOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      id="setup-steps"
      className="relative w-full max-w-6xl mx-auto px-6 sm:px-8 py-12 md:py-16 select-none"
    >
      <CinematicCameraScene enterRotateX={6.5} exitRotateX={-3.5}>
        {/* Section Header */}
        <motion.div
          initial={isOverlay ? false : { opacity: 0, y: 14, rotateX: 10 }}
          animate={isOverlay ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
          whileInView={isOverlay ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ transform: 'translateZ(18px)' }}
          className="text-center max-w-2xl mx-auto mb-9 md:mb-12"
        >
          <div
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-[11px] sm:text-[12px] font-medium tracking-wide shadow-2xs mb-3 ${
              isDark
                ? 'bg-[#26201B] border-[#3E332A] text-[#E6D8C5]'
                : 'bg-[#EFE4D4] border-[#DFD0BC] text-[#4E3E30]'
            }`}
          >
            <span className={`text-[10px] ${isDark ? 'text-[#E6B86A]' : 'text-[#9C7248]'}`}>
              ✦
            </span>
            <span>Effortless setup</span>
          </div>
          <h2
            className={`font-serif text-[34px] sm:text-[42px] md:text-[46px] leading-[1.08] font-normal tracking-tight ${
              isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
            }`}
          >
            From blank page to blooming space{' '}
            <span
              className={`italic font-normal ${
                isDark ? 'text-[#D6C9B8]' : 'text-[#3A322A]'
              }`}
            >
              in minutes.
            </span>
          </h2>
        </motion.div>

        {/* Interactive 3D Elevated Handle Claim Bar */}
        <motion.form
          initial={isOverlay ? false : { opacity: 0, y: 12, scale: 0.98 }}
          animate={isOverlay ? { opacity: 1, y: 0, scale: 1 } : undefined}
          whileInView={isOverlay ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          style={{ transform: 'translateZ(30px)' }}
          onSubmit={handleClaim}
          className={`relative max-w-lg mx-auto mb-10 md:mb-12 p-1.5 pl-4 rounded-full border flex items-center justify-between gap-2 z-20 ${
            isDark
              ? 'bg-[#26201B] border-[#42362C] shadow-[0_12px_32px_rgba(0,0,0,0.45)]'
              : 'bg-[#F6EFE2] border-[#DACBB4] shadow-[0_10px_28px_rgba(38,28,18,0.1)]'
          }`}
        >
          <div className="flex items-center gap-0.5 text-[13.5px] sm:text-[14.5px] flex-1 min-w-0">
            <span
              className={`font-serif shrink-0 ${
                isDark ? 'text-[#A89B8C]' : 'text-[#786D5F]'
              }`}
            >
              ✿ webloom.me/
            </span>
            <input
              type="text"
              value={claimHandle}
              onChange={(e) => setClaimHandle(e.target.value)}
              placeholder="yourname"
              aria-label="Choose your Webloom handle"
              className={`bg-transparent font-semibold focus:outline-none w-full truncate ${
                isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
              }`}
            />
          </div>
          <MagneticWrapper strength={0.2}>
            <button
              type="submit"
              className={`inline-flex items-center gap-1.5 h-[36px] sm:h-[38px] px-4.5 sm:px-5.5 rounded-full text-[12px] sm:text-[13px] font-medium shrink-0 transition-transform hover:scale-[1.02] active:scale-[0.98] ${
                isDark
                  ? 'bg-[#F4EFE6] hover:bg-white text-[#161310]'
                  : 'bg-[#181614] hover:bg-black text-[#FAF6EE]'
              }`}
            >
              <span>Claim handle</span>
              <span className="text-[11px] font-sans">↗</span>
            </button>
          </MagneticWrapper>
        </motion.form>

        {/* 3 Handmade Deckle-Edge Step Cards Connected by a Scroll-Drawn Golden Thread */}
        <div className="relative max-w-5xl mx-auto">
          <svg
            aria-hidden="true"
            className="hidden md:block absolute top-1/2 left-[14%] right-[14%] -translate-y-1/2 w-[72%] h-14 z-0 pointer-events-none"
            viewBox="0 0 720 56"
            fill="none"
          >
            <path
              d="M10 28 C 180 6, 360 50, 710 28"
              stroke={isDark ? '#3F342A' : '#E2D5C1'}
              strokeWidth="1.5"
              strokeDasharray="4 5"
            />
            <motion.path
              d="M10 28 C 180 6, 360 50, 710 28"
              stroke={isDark ? '#E6B86A' : '#C89D54'}
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={prefersReducedMotion ? 1 : undefined}
              style={prefersReducedMotion ? undefined : { pathLength: threadProgress }}
            />
          </svg>

          <motion.div
            initial={isOverlay ? false : "hidden"}
            animate={isOverlay ? "visible" : undefined}
            whileInView={isOverlay ? undefined : "visible"}
            viewport={{ once: true, amount: 0.25 }}
            variants={
              isOverlay
                ? undefined
                : {
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } },
                  }
            }
            style={{ transformStyle: 'preserve-3d' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 relative z-10"
          >
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={isOverlay ? false : undefined}
                animate={isOverlay ? { opacity: 1, y: 0, rotateX: 0, rotateY: 0 } : undefined}
                style={
                  prefersReducedMotion
                    ? undefined
                    : {
                        z: stepZPlanes[idx],
                        transformStyle: 'preserve-3d',
                      }
                }
                variants={
                  isOverlay
                    ? undefined
                    : {
                        hidden: {
                          opacity: 0,
                          y: 26,
                          rotateX: 12,
                          rotateY: step.enterRotateY,
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          rotateY: 0,
                          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                        },
                      }
                }
                className="relative"
              >
                <Tilt3DCard
                  maxTilt={8.5}
                  scaleOnHover={1.03}
                  className={`relative aspect-[600/460] w-full max-w-[310px] mx-auto flex flex-col items-center justify-center text-center p-7 cursor-pointer ${step.rotate}`}
                >
                  {/* Top Masking Tape */}
                  <div
                    className={`absolute top-1 left-1/2 -translate-x-1/2 w-12 h-3.5 rotate-1 z-20 shadow-2xs ${
                      isDark ? 'bg-[#9A7E52]/80' : 'bg-[#E0C88B]/85'
                    }`}
                  />

                  {/* High-Res Handmade Cotton-Rag Deckle-Edge Card Texture */}
                  <img
                    src={getThemeAsset(step.bg, theme)}
                    alt={step.title}
                    className={`absolute inset-0 w-full h-full object-contain pointer-events-none select-none ${
                      isDark
                        ? 'drop-shadow-[0_12px_26px_rgba(0,0,0,0.45)]'
                        : 'drop-shadow-[0_10px_20px_rgba(38,28,18,0.1)]'
                    }`}
                  />

                  {/* Step Number Pill & Badge */}
                  <div
                    style={{ transform: 'translateZ(18px)' }}
                    className="relative z-10 flex items-center gap-2 mb-2"
                  >
                    <span
                      className={`font-serif italic text-[14px] px-2.5 py-0.5 rounded-full border font-medium ${
                        isDark
                          ? 'bg-[#1A1512]/80 border-[#4A3D31] text-[#E6D8C5]'
                          : 'bg-[#FAF6EE]/80 border-[#D5C8B4] text-[#4E3E30]'
                      }`}
                    >
                      Step {step.num}
                    </span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full border ${
                        isDark
                          ? 'text-[#C8BDB0] bg-[#1A1512]/60 border-white/10'
                          : 'text-[#5E5246] bg-[#FAF6EE]/60 border-black/5'
                      }`}
                    >
                      {step.badge}
                    </span>
                  </div>

                  {/* Animated 3D Layered Icon */}
                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : idx === 0
                          ? { rotateZ: [-4, 4, -4], scale: [1, 1.06, 1] }
                          : idx === 1
                            ? { y: [0, -3, 0], scale: [1, 1.07, 1] }
                            : { rotateZ: [-5, 5, -5], y: [0, -2.5, 0] }
                    }
                    transition={{
                      duration: 4.5 + idx * 0.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{ transform: 'translateZ(26px)' }}
                    className="relative z-10 my-1 opacity-90"
                  >
                    <svg
                      className={`w-7 h-7 fill-none ${
                        isDark ? 'stroke-[#EAE0D2]' : 'stroke-[#28211B]'
                      }`}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {step.iconPath}
                    </svg>
                  </motion.div>

                  <h3
                    style={{ transform: 'translateZ(16px)' }}
                    className={`relative z-10 font-serif font-bold text-[20px] sm:text-[21px] leading-snug mt-0.5 ${
                      isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{ transform: 'translateZ(10px)' }}
                    className={`relative z-10 text-[12.5px] sm:text-[13px] leading-relaxed mt-1.5 max-w-[220px] ${
                      isDark ? 'text-[#C8BDB0]' : 'text-[#4A4036]'
                    }`}
                  >
                    {step.desc}
                  </p>
                </Tilt3DCard>

                {idx < 2 && (
                  <div
                    className={`hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 z-30 pointer-events-none ${
                      isDark ? 'text-[#7A6B5C]' : 'text-[#9C8E7B]'
                    }`}
                  >
                    <svg className="w-7 h-5" viewBox="0 0 28 20" fill="none">
                      <path
                        d="M2 12C9 4 19 4 25 11M25 11L20 6M25 11L19 13"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="2 2"
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Transition Bridge to Scene 05 */}
          <motion.div
            style={
              prefersReducedMotion
                ? undefined
                : {
                    y: emergingLinkY,
                    opacity: emergingLinkOpacity,
                    scale: emergingLinkScale,
                    z: 32,
                  }
            }
            className="hidden sm:flex justify-center mt-5 pointer-events-none"
          >
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[12px] ${
                isDark
                  ? 'bg-[#26201B] border-[#42362C] shadow-[0_8px_20px_rgba(0,0,0,0.45)] text-[#F4EFE6]'
                  : 'bg-[#F6EFE2] border-[#D8C9B2] shadow-[0_8px_20px_rgba(38,28,18,0.1)] text-[#2B231D]'
              }`}
            >
              <span className={isDark ? 'text-[#E6B86A]' : 'text-[#9C7248]'}>✿</span>
              <span className="font-serif font-semibold">
                webloom.me/{claimHandle || 'ayaan'}
              </span>
              <span className={isDark ? 'text-[#A89B8C]' : 'text-[#786D5F]'}>→</span>
              <span
                className={`text-[11px] ${
                  isDark ? 'text-[#C8BDB0]' : 'text-[#5E5246]'
                }`}
              >
                Travels into live analytics &amp; QR card
              </span>
            </div>
          </motion.div>
        </div>
      </CinematicCameraScene>
    </section>
  );
}
