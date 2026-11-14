'use client';

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Tilt3DCard, CinematicCameraScene } from './motion-primitives';
import { useWebloomTheme, useIsWebloomOverlay } from './webloom-dual-theme-context';
import { getThemeAsset } from '@/lib/webloom-theme-assets';

const CARDS = [
  {
    title: 'Portfolio',
    desc: 'Showcase your work beautifully.',
    bg: '/generated/card-sage-hd.png',
    enterRotateY: 14,
    enterY: 20,
    iconPath: (
      <>
        <rect x="5" y="3" width="22" height="15" rx="1.5" />
        <rect x="7" y="5" width="18" height="11" rx="0.5" strokeWidth="1" />
        <path d="M2 20h28l-2 2.5H4L2 20Z" />
      </>
    ),
    viewBox: '0 0 32 26',
    strokeWidth: '1.4',
  },
  {
    title: 'Blog / Journal',
    desc: 'Share ideas, learnings, and stories.',
    bg: '/generated/card-peach-hd.png',
    enterRotateY: 5,
    enterY: 10,
    iconPath: (
      <>
        <path d="M16 5.5C13 4 8.5 3.8 4.5 5v15.5c4-1.2 8.5-1 11.5 0.5 3-1.5 7.5-1.7 11.5-0.5V5c-4-1.2-8.5-1-11.5 0.5Z" />
        <path d="M16 5.5v15.5" />
        <path d="M7.5 9h5M7.5 12h5M7.5 15h4" strokeWidth="1.15" />
        <path d="M19.5 9h5M19.5 12h5M19.5 15h4" strokeWidth="1.15" />
      </>
    ),
    viewBox: '0 0 32 26',
    strokeWidth: '1.4',
  },
  {
    title: 'Link in Bio',
    desc: 'A simple, elegant home for your links.',
    bg: '/generated/card-lavender-hd.png',
    enterRotateY: -5,
    enterY: 10,
    iconPath: (
      <>
        <path d="M11.5 14.5a5 5 0 0 0 7.07 0l3.5-3.5a5 5 0 0 0-7.07-7.07l-1.75 1.75" />
        <path d="M16.5 11.5a5 5 0 0 0-7.07 0l-3.5 3.5a5 5 0 0 0 7.07 7.07l1.75-1.75" />
        <path d="M22 2l1.5-1M24 5l1.8-.3M4 21l-1.5 1" strokeWidth="1.1" />
      </>
    ),
    viewBox: '0 0 28 26',
    strokeWidth: '1.6',
  },
  {
    title: 'Personal Website',
    desc: 'Build a fully customized space, your way.',
    bg: '/generated/card-sand-hd.png',
    enterRotateY: -14,
    enterY: 20,
    iconPath: (
      <>
        <rect x="4" y="3.5" width="8.5" height="19" rx="1.2" />
        <rect x="15.5" y="3.5" width="8.5" height="8.5" rx="1.2" />
        <rect x="15.5" y="14" width="8.5" height="8.5" rx="1.2" />
      </>
    ),
    viewBox: '0 0 28 26',
    strokeWidth: '1.4',
  },
];

export function WhatYouCanBuildReconstructed() {
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

  const leftCardSpreadX = useTransform(smoothScroll, [0.1, 0.45], [8, -4]);
  const rightSketchSpreadX = useTransform(smoothScroll, [0.1, 0.45], [-8, 6]);
  const polaroidLiftY = useTransform(smoothScroll, [0.1, 0.5, 0.9], [14, -4, -12]);

  const card0X = useTransform(smoothScroll, [0.05, 0.38, 0.72, 0.98], [-16, 0, 0, 48]);
  const card1X = useTransform(smoothScroll, [0.05, 0.38, 0.72, 0.98], [-6, 0, 0, -14]);
  const card2X = useTransform(smoothScroll, [0.05, 0.38, 0.72, 0.98], [6, 0, 0, -76]);
  const card3X = useTransform(smoothScroll, [0.05, 0.38, 0.72, 0.98], [16, 0, 0, -138]);

  const card0Z = useTransform(smoothScroll, [0.05, 0.38, 0.72, 0.98], [-26, 0, 0, 22]);
  const card1Z = useTransform(smoothScroll, [0.05, 0.38, 0.72, 0.98], [18, 0, 0, 8]);
  const card2Z = useTransform(smoothScroll, [0.05, 0.38, 0.72, 0.98], [-16, 0, 0, -10]);
  const card3Z = useTransform(smoothScroll, [0.05, 0.38, 0.72, 0.98], [22, 0, 0, -26]);

  const card0RotZ = useTransform(smoothScroll, [0.05, 0.38, 0.72, 0.98], [-3.5, 0, 0, -2]);
  const card1RotZ = useTransform(smoothScroll, [0.05, 0.38, 0.72, 0.98], [2.5, 0, 0, 1]);
  const card2RotZ = useTransform(smoothScroll, [0.05, 0.38, 0.72, 0.98], [-2.5, 0, 0, -1.5]);
  const card3RotZ = useTransform(smoothScroll, [0.05, 0.38, 0.72, 0.98], [3.5, 0, 0, -3]);

  const cardTransforms = [
    { x: card0X, z: card0Z, rotateZ: card0RotZ },
    { x: card1X, z: card1Z, rotateZ: card1RotZ },
    { x: card2X, z: card2Z, rotateZ: card2RotZ },
    { x: card3X, z: card3Z, rotateZ: card3RotZ },
  ];

  return (
    <section
      ref={sectionRef}
      id={!isDark ? 'product' : undefined}
      className="relative w-full max-w-6xl mx-auto px-6 sm:px-8 pt-6 pb-10 md:pt-8 md:pb-14 select-none"
    >
      <CinematicCameraScene enterRotateX={7} exitRotateX={-4}>
        {/* Multi-Layered Coastal Polaroid + Botanical Flower Sketch Collage on Left */}
        <motion.div
          initial={isOverlay ? false : { opacity: 0, x: -20, rotate: -4 }}
          animate={isOverlay ? { opacity: 1, x: 0, rotate: 0 } : undefined}
          whileInView={isOverlay ? undefined : { opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          className="hidden lg:block absolute left-3 xl:left-0 top-0 w-[235px] h-[205px] z-10 group"
        >
          {/* Back Lined Note Card (Left) */}
          <motion.div
            style={prefersReducedMotion ? undefined : { x: leftCardSpreadX, z: -15 }}
            whileHover={{ rotate: -16, x: -8 }}
            className={`absolute top-11 left-0 w-[98px] h-[122px] border shadow-sm -rotate-12 p-3 flex flex-col gap-2.5 transition-transform duration-300 ${
              isDark
                ? 'bg-[#251E19] border-[#3F342B]'
                : 'bg-[#F4EAD9] border-[#DDD0BA]'
            }`}
          >
            <div className={`w-full h-px ${isDark ? 'bg-[#463A30]' : 'bg-[#D5C5AD]'}`} />
            <div className={`w-4/5 h-px ${isDark ? 'bg-[#463A30]' : 'bg-[#D5C5AD]'}`} />
            <div className={`w-full h-px ${isDark ? 'bg-[#463A30]' : 'bg-[#D5C5AD]'}`} />
            <div className={`w-3/4 h-px ${isDark ? 'bg-[#463A30]' : 'bg-[#D5C5AD]'}`} />
            <div className={`w-5/6 h-px ${isDark ? 'bg-[#463A30]' : 'bg-[#D5C5AD]'}`} />
          </motion.div>

          {/* Right Botanical Line-Art Sketch Card */}
          <motion.div
            style={prefersReducedMotion ? undefined : { x: rightSketchSpreadX, z: 5 }}
            whileHover={{ rotate: 16, x: 10, y: -4 }}
            className={`absolute top-7 right-1 w-[110px] h-[132px] border rotate-12 flex items-center justify-center p-2 cursor-pointer ${
              isDark
                ? 'bg-[#28211B] border-[#42362C] shadow-[0_8px_20px_rgba(0,0,0,0.5)]'
                : 'bg-[#F5ECE0] border-[#DFD2BD] shadow-[0_6px_16px_rgba(35,25,15,0.1)]'
            }`}
          >
            <div
              className={`absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3.5 rotate-6 shadow-2xs ${
                isDark ? 'bg-[#9E7E47]/85' : 'bg-[#E0BE6E]/90'
              }`}
            />
            <svg
              className={`w-16 h-20 fill-none ${
                isDark ? 'stroke-[#E5DACB]' : 'stroke-[#382E26]'
              }`}
              viewBox="0 0 64 80"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M32 38C31 52 28 64 25 75" />
              <path d="M29 56C22 52 18 54 15 58C20 60 25 58 29 56Z" />
              <path d="M30 62C37 58 42 60 45 64C39 66 34 64 30 62Z" />
              <circle cx="32" cy="26" r="4.5" />
              <path d="M32 21.5C29 12 35 12 32 21.5Z" />
              <path d="M35.5 23C43 16 46 21 36.5 26Z" />
              <path d="M36.5 27.5C46 29 44 35 35 30Z" />
              <path d="M33.5 30.5C38 39 32 41 31 31Z" />
              <path d="M29.5 30C23 38 19 34 27.5 27.5Z" />
              <path d="M27.5 25.5C18 24 20 18 28.5 23Z" />
            </svg>
          </motion.div>

          {/* Front Perforated-Edge Coastal Village Polaroid Frame */}
          <motion.div
            style={
              prefersReducedMotion
                ? {
                    backgroundImage: isDark
                      ? 'radial-gradient(circle, transparent 72%, #3E342B 74%)'
                      : 'radial-gradient(circle, transparent 72%, #E2D8C5 74%)',
                    backgroundSize: '8px 8px',
                  }
                : {
                    y: polaroidLiftY,
                    z: 25,
                    backgroundImage: isDark
                      ? 'radial-gradient(circle, transparent 72%, #3E342B 74%)'
                      : 'radial-gradient(circle, transparent 72%, #E2D8C5 74%)',
                    backgroundSize: '8px 8px',
                  }
            }
            whileHover={{ scale: 1.07, rotate: -3, y: -6 }}
            className={`absolute top-2 left-5 w-[134px] p-2 pb-5 border -rotate-8 cursor-pointer ${
              isDark
                ? 'bg-[#26201B] border-[#42362C] shadow-[0_12px_28px_rgba(0,0,0,0.6)]'
                : 'bg-[#FCF9F2] border-[#E2D8C5] shadow-[0_10px_24px_rgba(30,22,14,0.16)]'
            }`}
          >
            <div
              className={`absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3.5 -rotate-3 shadow-2xs ${
                isDark ? 'bg-[#947A52]/80' : 'bg-[#DCCBA9]/85'
              }`}
            />
            <div
              className={`w-full aspect-[4/3.5] overflow-hidden border ${
                isDark
                  ? 'bg-[#191512] border-[#382E26]'
                  : 'bg-[#D5CFC2] border-[#EAE2D3]'
              }`}
            >
              <img
                src={getThemeAsset('/generated/photo-coastal.jpg', theme)}
                alt="Mediterranean coastal village polaroid"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Dimensional Section Header */}
        <motion.div
          initial={isOverlay ? false : { opacity: 0, y: 16, rotateX: 12 }}
          animate={isOverlay ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
          whileInView={isOverlay ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ transform: 'translateZ(20px)' }}
          className="text-center max-w-2xl mx-auto mb-7 md:mb-9 relative z-20"
        >
          <div
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-[11px] sm:text-[12px] font-medium tracking-wide shadow-2xs mb-2.5 ${
              isDark
                ? 'bg-[#26201B] border-[#3E332A] text-[#E6D8C5]'
                : 'bg-[#EFE4D4] border-[#DFD0BC] text-[#4E3E30]'
            }`}
          >
            <span className={`text-[10px] ${isDark ? 'text-[#E6B86A]' : 'text-[#9C7248]'}`}>
              ✦
            </span>
            <span>What you can build</span>
          </div>
          <h2
            className={`font-serif text-[36px] sm:text-[44px] md:text-[48px] leading-[1.06] font-normal tracking-tight ${
              isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
            }`}
          >
            More than a website.
          </h2>
          <p
            className={`font-serif italic text-[20px] sm:text-[24px] md:text-[26px] mt-0.5 ${
              isDark ? 'text-[#D6C9B8]' : 'text-[#3A322A]'
            }`}
          >
            A space for everything you do.
          </p>
        </motion.div>

        {/* 4 High-Resolution Handmade Cotton-Rag Deckle-Edge Feature Cards */}
        <motion.div
          initial={isOverlay ? false : "hidden"}
          animate={isOverlay ? "visible" : undefined}
          whileInView={isOverlay ? undefined : "visible"}
          viewport={{ once: true, amount: 0.2 }}
          variants={
            isOverlay
              ? undefined
              : {
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } },
                }
          }
          style={{ transformStyle: 'preserve-3d' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto relative z-20"
        >
          {CARDS.map((card, idx) => {
            const ct = cardTransforms[idx];
            return (
              <motion.div
                key={idx}
                initial={isOverlay ? false : undefined}
                animate={isOverlay ? { opacity: 1, y: 0, rotateX: 0, rotateY: 0 } : undefined}
                style={
                  prefersReducedMotion
                    ? undefined
                    : {
                        x: ct.x,
                        z: ct.z,
                        rotateZ: ct.rotateZ,
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
                          rotateX: 14,
                          rotateY: card.enterRotateY,
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          rotateY: 0,
                          transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                        },
                      }
                }
              >
                <Tilt3DCard
                  maxTilt={9.5}
                  scaleOnHover={1.035}
                  className="group relative aspect-[600/460] w-full max-w-[260px] mx-auto flex flex-col items-center justify-center text-center p-6 cursor-pointer"
                >
                  <img
                    src={getThemeAsset(card.bg, theme)}
                    alt={card.title}
                    className={`absolute inset-0 w-full h-full object-contain pointer-events-none select-none ${
                      isDark
                        ? 'drop-shadow-[0_14px_28px_rgba(0,0,0,0.65)] brightness-115 contrast-105'
                        : 'drop-shadow-[0_8px_18px_rgba(38,28,18,0.1)]'
                    }`}
                  />

                  <div
                    style={{ transform: 'translateZ(24px)' }}
                    className="relative z-10 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                  >
                    <svg
                      className={`w-8 h-8 sm:w-9 sm:h-9 fill-none mb-1.5 ${
                        isDark ? 'stroke-[#E8C88B]' : 'stroke-[#28211B]'
                      }`}
                      viewBox={card.viewBox}
                      strokeWidth={card.strokeWidth}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {card.iconPath}
                    </svg>
                  </div>

                  <h3
                    style={{ transform: 'translateZ(16px)' }}
                    className={`relative z-10 font-serif font-bold text-[18px] sm:text-[19.5px] leading-snug ${
                      isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
                    }`}
                  >
                    {card.title}
                  </h3>

                  <p
                    style={{ transform: 'translateZ(10px)' }}
                    className={`relative z-10 text-[12px] sm:text-[12.5px] leading-snug mt-1 font-normal max-w-[175px] ${
                      isDark ? 'text-[#C8BDB0]' : 'text-[#4A4036]'
                    }`}
                  >
                    {card.desc}
                  </p>
                </Tilt3DCard>
              </motion.div>
            );
          })}
        </motion.div>
      </CinematicCameraScene>
    </section>
  );
}
