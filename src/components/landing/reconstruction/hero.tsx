'use client';

import React, { useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from 'framer-motion';
import { SparkleStar } from './sparkle';
import { MagneticWrapper } from './motion-primitives';
import {
  useWebloomTheme,
  useWebloomSyncState,
} from './webloom-dual-theme-context';
import { getThemeAsset } from '@/lib/webloom-theme-assets';
import { useApp } from '@/lib/context/app-context';

const STUDIO_TABS = [
  { id: 'Pages', label: 'Pages', previewNote: 'Home · Portfolio' },
  { id: 'Design', label: 'Design', previewNote: 'Warm Botanical · Serif' },
  { id: 'Blocks', label: 'Blocks', previewNote: 'Hero · Gallery · Links' },
  { id: 'Settings', label: 'Settings', previewNote: 'webloom.me/ayaan' },
] as const;

interface ShowcaseSite {
  id: string;
  handle: string;
  creator: string;
  role: string;
  cta: string;
  image: string;
  canvasBg: string;
  textColor: string;
  subColor: string;
  pillBg: string;
  pillText: string;
  chromeBg: string;
  darkCanvasBg: string;
  darkTextColor: string;
  darkSubColor: string;
  darkPillBg: string;
  darkPillText: string;
}

const SHOWCASE_SITES: ShowcaseSite[] = [
  {
    id: 'villa',
    handle: 'webloom.me/ayaan',
    creator: "Hi, I'm Ayaan",
    role: 'Designer & Builder',
    cta: 'See my work',
    image: '/generated/villa-courtyard.jpg',
    canvasBg: '#FAF6EE',
    textColor: '#1F1A16',
    subColor: '#3A322A',
    pillBg: '#25211D',
    pillText: '#FAF6EE',
    chromeBg: '#F6F0E4',
    darkCanvasBg: '#1E1915',
    darkTextColor: '#F4EFE6',
    darkSubColor: '#C8BDB0',
    darkPillBg: '#E6B86A',
    darkPillText: '#181410',
  },
  {
    id: 'botanical',
    handle: 'webloom.me/ayaan-design',
    creator: 'Ayaan Khan',
    role: 'Product Designer',
    cta: 'Work',
    image: '/generated/botanical-leaves-dark.jpg',
    canvasBg: '#1B281E',
    textColor: '#F7F3EA',
    subColor: '#C9D6C8',
    pillBg: '#F4EFE4',
    pillText: '#1B281E',
    chromeBg: '#233226',
    darkCanvasBg: '#141B15',
    darkTextColor: '#F4EFE6',
    darkSubColor: '#B8C7B7',
    darkPillBg: '#E6B86A',
    darkPillText: '#141B15',
  },
  {
    id: 'landscape',
    handle: 'webloom.me/elena',
    creator: 'Elena Rostova',
    role: 'Visual Storyteller',
    cta: 'Read journal',
    image: '/generated/thumb-landscape.jpg',
    canvasBg: '#F2EFE7',
    textColor: '#1F2922',
    subColor: '#4A5B4F',
    pillBg: '#233329',
    pillText: '#FAF6EE',
    chromeBg: '#E6E1D5',
    darkCanvasBg: '#182126',
    darkTextColor: '#F2EFE9',
    darkSubColor: '#B6C5CE',
    darkPillBg: '#D8E2E8',
    darkPillText: '#182126',
  },
  {
    id: 'monogram',
    handle: 'webloom.me/clara',
    creator: 'Clara Vance',
    role: 'Creative Director',
    cta: 'Selected works',
    image: '/generated/thumb-monogram.jpg',
    canvasBg: '#F4E8EA',
    textColor: '#2B1E21',
    subColor: '#664B51',
    pillBg: '#2B1E21',
    pillText: '#FAF6EE',
    chromeBg: '#EAD9DC',
    darkCanvasBg: '#23191D',
    darkTextColor: '#F4EAE6',
    darkSubColor: '#CBB6BC',
    darkPillBg: '#F4EAE6',
    darkPillText: '#23191D',
  },
  {
    id: 'daisy',
    handle: 'webloom.me/sora',
    creator: 'Sora Takahashi',
    role: 'Botanical Press',
    cta: 'Explore archive',
    image: '/generated/thumb-daisy.jpg',
    canvasBg: '#1F241B',
    textColor: '#F5EFE2',
    subColor: '#CEC5B2',
    pillBg: '#E8C56B',
    pillText: '#1F241B',
    chromeBg: '#2A3025',
    darkCanvasBg: '#171C15',
    darkTextColor: '#F4EFE6',
    darkSubColor: '#C5BFA8',
    darkPillBg: '#E6B86A',
    darkPillText: '#171C15',
  },
];

// Ambient sunlit / firefly dust motes drifting through the studio window beam
const SUN_PARTICLES = [
  { id: 1, left: '18%', top: '24%', size: 3, duration: 7.2, delay: 0 },
  { id: 2, left: '29%', top: '38%', size: 2.5, duration: 8.6, delay: 1.4 },
  { id: 3, left: '72%', top: '28%', size: 3, duration: 7.9, delay: 0.8 },
  { id: 4, left: '64%', top: '44%', size: 2, duration: 9.1, delay: 2.1 },
  { id: 5, left: '44%', top: '20%', size: 2.5, duration: 8.0, delay: 1.1 },
];

export function HeroReconstructed() {
  const theme = useWebloomTheme();
  const isDark = theme === 'dark';
  const {
    activeStudioTab,
    setActiveStudioTab,
    activeSiteId,
    setActiveSiteId,
    checkedNotes,
    toggleNote,
  } = useWebloomSyncState();
  const { setAuthModalMode, setIsAuthModalOpen } = useApp();
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const activeSite =
    SHOWCASE_SITES.find((s) => s.id === activeSiteId) ?? SHOWCASE_SITES[0];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const scrollStageRotateX = useTransform(scrollYProgress, [0, 0.7, 1], [0, 3.5, 5]);
  const scrollStageY = useTransform(scrollYProgress, [0, 1], [0, 16]);
  const scrollWingSpreadLeft = useTransform(scrollYProgress, [0, 1], [0, -38]);
  const scrollWingSpreadRight = useTransform(scrollYProgress, [0, 1], [0, 38]);
  const scrollLaptopScale = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1.075, 1.11]);
  const scrollLaptopZ = useTransform(scrollYProgress, [0, 1], [75, 125]);
  const scrollCopyY = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0, -14]);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const smoothX = useSpring(rawX, { stiffness: 95, damping: 24, mass: 0.7 });
  const smoothY = useSpring(rawY, { stiffness: 95, damping: 24, mass: 0.7 });

  const bgX = useTransform(smoothX, [-0.5, 0.5], [7, -7]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [4, -4]);

  const wallX = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const wallY = useTransform(smoothY, [-0.5, 0.5], [-9, 9]);
  const wallRotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const wallRotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);

  const textX = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  const deepPreviewX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const deepPreviewY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);
  const deepRotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const deepRotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);

  const midPreviewX = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const midPreviewY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);
  const midRotateY = useTransform(smoothX, [-0.5, 0.5], [-8.5, 8.5]);
  const midRotateX = useTransform(smoothY, [-0.5, 0.5], [6.5, -6.5]);

  const laptopX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const laptopY = useTransform(smoothY, [-0.5, 0.5], [-7, 7]);
  const laptopRotateY = useTransform(smoothX, [-0.5, 0.5], [-6.5, 6.5]);
  const laptopRotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const screenGlareX = useTransform(smoothX, [-0.5, 0.5], ['10%', '90%']);
  const screenGlareY = useTransform(smoothY, [-0.5, 0.5], ['10%', '90%']);

  // Zero-layout-thrash pointer tracking so both Light and Dark Hero instances tilt in lockstep
  useEffect(() => {
    if (prefersReducedMotion) return;
    const onPointerMove = (e: PointerEvent) => {
      if (window.scrollY > 900) return;
      if (e.clientY <= 900) {
        rawX.set(e.clientX / (window.innerWidth || 1440) - 0.5);
        rawY.set(e.clientY / 860 - 0.5);
      } else if (rawX.get() !== 0 || rawY.get() !== 0) {
        rawX.set(0);
        rawY.set(0);
      }
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [prefersReducedMotion, rawX, rawY]);

  const handleCreate = () => {
    setAuthModalMode('signup');
    setIsAuthModalOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      style={{ perspective: 1500 }}
      className={`relative isolate w-full overflow-hidden select-none pt-20 sm:pt-24 lg:pt-24 pb-8 sm:pb-10 lg:pb-11 ${
        isDark ? 'bg-[#161310]' : 'bg-[#F5EFE4]'
      }`}
    >
      {/* 1. Plane 1: High-Resolution Studio Room Background (Sunlit vs Nighttime Counterpart) */}
      <motion.div
        initial={{ opacity: 0.7, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1.024 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          x: prefersReducedMotion ? 0 : bgX,
          y: prefersReducedMotion ? 0 : bgY,
        }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img
          src={getThemeAsset('/generated/hero-studio-bg.jpg', theme)}
          alt="Creative studio workspace with arched ivy window, wooden desk, lamp, books, and vintage camera"
          className="w-full h-full object-cover object-bottom"
        />
        {/* Subtle top gradient so navbar is crisp, and center radial backdrop for headline legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'linear-gradient(180deg, rgba(22,19,16,0.78) 0%, rgba(22,19,16,0.22) 18%, rgba(22,19,16,0.12) 65%, rgba(0,0,0,0.35) 100%), radial-gradient(ellipse 46% 42% at 50% 28%, rgba(22,19,16,0.62) 0%, rgba(22,19,16,0) 100%)'
              : 'linear-gradient(180deg, rgba(250,246,238,0.78) 0%, rgba(250,246,238,0.18) 16%, rgba(250,246,238,0.08) 65%, rgba(0,0,0,0.08) 100%), radial-gradient(ellipse 46% 42% at 50% 28%, rgba(250,246,238,0.72) 0%, rgba(250,246,238,0) 100%)',
          }}
        />
        {/* Ambient window beam pulse */}
        {!prefersReducedMotion && (
          <motion.div
            animate={{ opacity: [0.18, 0.34, 0.18] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isDark
                ? 'linear-gradient(122deg, rgba(94,132,178,0.18) 0%, rgba(230,184,106,0.10) 42%, rgba(22,19,16,0) 68%)'
                : 'linear-gradient(122deg, rgba(255,244,204,0.32) 0%, rgba(255,244,204,0.12) 38%, rgba(255,244,204,0) 68%)',
            }}
          />
        )}

        {/* Restrained Dust Motes Drifting in the Window Beam */}
        {!prefersReducedMotion &&
          SUN_PARTICLES.map((p) => (
            <motion.span
              key={p.id}
              animate={{
                y: [0, -18, 0],
                x: [0, 8, 0],
                opacity: [0.2, 0.65, 0.2],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
              }}
              className={`hidden md:block absolute rounded-full pointer-events-none ${
                isDark
                  ? 'bg-[#F5C97B] shadow-[0_0_8px_rgba(230,184,106,0.85)]'
                  : 'bg-[#FFF6D6] shadow-[0_0_8px_rgba(247,220,111,0.85)]'
              }`}
            />
          ))}
      </motion.div>

      {/* 2. Plane 2: Right Wall Pinned Polaroids & Interactive Checklist Note (3D Mid-Depth Layer) */}
      <motion.div
        initial={{ opacity: 0, x: 24, rotateY: -8 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{
          x: prefersReducedMotion ? 0 : wallX,
          y: prefersReducedMotion ? 0 : wallY,
          rotateY: prefersReducedMotion ? 0 : wallRotateY,
          rotateX: prefersReducedMotion ? 0 : wallRotateX,
          transformStyle: 'preserve-3d',
        }}
        className="hidden lg:block absolute right-[1.5%] xl:right-[5.5%] 2xl:right-[8.5%] top-[68px] w-[225px] xl:w-[250px] h-[350px] z-10 scale-[0.86] xl:scale-100 origin-top-right"
      >
        {/* Polaroid 1: Mountain Landscape (Top Left) */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : { rotate: [-6, -4.6, -6], y: [0, -2.5, 0] }
          }
          transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.07, rotate: -2, zIndex: 30 }}
          className={`absolute top-0 left-6 w-[108px] p-1.5 pb-4 border cursor-pointer ${
            isDark
              ? 'bg-[#26201B] border-[#3F352C] shadow-[0_8px_22px_rgba(0,0,0,0.55)]'
              : 'bg-[#FBF8F1] border-[#E5DEC9] shadow-[0_6px_16px_rgba(35,25,15,0.16)]'
          }`}
        >
          <div
            className={`absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-3.5 rotate-2 shadow-2xs ${
              isDark ? 'bg-[#8F764E]/80' : 'bg-[#DFCFAF]/85'
            }`}
          />
          <div className="w-full aspect-[4/3.4] overflow-hidden bg-[#1D1916]">
            <img
              src={getThemeAsset('/generated/photo-mountain.jpg', theme)}
              alt="Mountain landscape polaroid"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Polaroid 2: Ocean Sunset / Twilight (Top Right, overlapping) */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : { rotate: [3, 4.5, 3], y: [0, 2.5, 0] }
          }
          transition={{ duration: 7.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          whileHover={{ scale: 1.07, rotate: 0, zIndex: 30 }}
          className={`absolute top-9 right-2 w-[108px] p-1.5 pb-4 border cursor-pointer ${
            isDark
              ? 'bg-[#26201B] border-[#3F352C] shadow-[0_10px_24px_rgba(0,0,0,0.6)]'
              : 'bg-[#FBF8F1] border-[#E5DEC9] shadow-[0_8px_18px_rgba(35,25,15,0.18)]'
          }`}
        >
          <div
            className={`absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-3.5 -rotate-3 shadow-2xs ${
              isDark ? 'bg-[#8F764E]/80' : 'bg-[#D4BE94]/90'
            }`}
          />
          <div className="w-full aspect-[4/3.4] overflow-hidden bg-[#1D1916]">
            <img
              src={getThemeAsset('/generated/photo-sunset.jpg', theme)}
              alt="Ocean sunset polaroid"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Interactive Taped Checklist Note (Below Polaroids) */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : { rotate: [-6, -5, -6], y: [0, -2, 0] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
          whileHover={{ scale: 1.04, rotate: -3 }}
          className={`absolute top-[138px] left-1 w-[156px] p-3.5 pt-4 border ${
            isDark
              ? 'bg-[#28211B] border-[#42362C] shadow-[0_10px_24px_rgba(0,0,0,0.55)]'
              : 'bg-[#F7EFE0] border-[#E5D9C3] shadow-[0_8px_20px_rgba(35,25,15,0.15)]'
          }`}
        >
          <div
            className={`absolute -top-2 left-3 w-8 h-3.5 -rotate-12 shadow-2xs ${
              isDark ? 'bg-[#947A52]/80' : 'bg-[#DCCBA9]/85'
            }`}
          />
          <div
            className={`absolute -top-2 right-4 w-8 h-3.5 rotate-6 shadow-2xs ${
              isDark ? 'bg-[#947A52]/80' : 'bg-[#DCCBA9]/85'
            }`}
          />

          <ul
            className={`space-y-1.5 text-[12px] font-serif ${
              isDark ? 'text-[#EDE3D5]' : 'text-[#2C241D]'
            }`}
          >
            {(['Portfolio', 'Blog', 'Links', 'Projects', 'More...'] as const).map(
              (item) => {
                const isChecked = checkedNotes[item];
                return (
                  <li
                    key={item}
                    onClick={() => toggleNote(item)}
                    className={`flex items-center gap-2 cursor-pointer transition-colors ${
                      isDark ? 'hover:text-white' : 'hover:text-black'
                    }`}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-3.5 h-3.5 border rounded-[2px] text-[9px] leading-none transition-colors ${
                        isChecked
                          ? isDark
                            ? 'border-[#E6B86A] bg-[#3A2F24] text-[#E6B86A] font-semibold'
                            : 'border-[#4A3E33] bg-[#EFE5D2] font-semibold'
                          : isDark
                            ? 'border-[#7A6B5C] bg-transparent'
                            : 'border-[#6E6052] bg-transparent'
                      }`}
                    >
                      {isChecked ? '✓' : ''}
                    </span>
                    <span className={isChecked ? 'font-medium' : ''}>{item}</span>
                  </li>
                );
              }
            )}
          </ul>

          {/* Perforated Botanical Postage Stamp on bottom-right corner of note */}
          <motion.div
            whileHover={{ rotate: 14, scale: 1.1 }}
            className={`absolute -bottom-3 -right-5 w-12 h-14 p-1 shadow-md rotate-6 border ${
              isDark
                ? 'bg-[#2E251E] border-[#4A3D31]'
                : 'bg-[#F9F3E6] border-[#D8CCB8]'
            }`}
            style={{
              backgroundImage: isDark
                ? 'radial-gradient(circle, transparent 70%, #4A3D31 72%)'
                : 'radial-gradient(circle, transparent 70%, #D8CCB8 72%)',
              backgroundSize: '6px 6px',
            }}
          >
            <div
              className={`w-full h-full border flex flex-col items-center justify-center p-0.5 ${
                isDark
                  ? 'bg-[#231C17] border-[#524336]'
                  : 'bg-[#EFE6D5] border-[#C8B9A2]'
              }`}
            >
              <svg className="w-7 h-8" viewBox="0 0 32 36" fill="none">
                <path d="M16 18V33" stroke="#6E9458" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M16 25C13 23 11 24 10 26C12 27 14 26 16 25Z" fill="#7DA365" />
                <path d="M16 27C19 25 21 26 22 28C20 29 18 28 16 27Z" fill="#7DA365" />
                <circle cx="16" cy="12" r="5" fill="#E3969E" />
                <circle cx="12" cy="10" r="3.5" fill="#ECA8B0" />
                <circle cx="20" cy="10" r="3.5" fill="#ECA8B0" />
                <circle cx="13" cy="15" r="3.5" fill="#E598A0" />
                <circle cx="19" cy="15" r="3.5" fill="#E598A0" />
                <circle cx="16" cy="12.5" r="2.2" fill="#E6B84C" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 3. Main Foreground Container: Choreographed Typography + Multi-Layered 3D Website Showcase */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Plane 3: Top Editorial Copy */}
        <motion.div
          style={{
            x: prefersReducedMotion ? 0 : textX,
            y: prefersReducedMotion ? 0 : scrollCopyY,
          }}
          className="flex flex-col items-center text-center max-w-[650px] mx-auto"
        >
          {/* Eyebrow Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-[11px] sm:text-[12px] font-medium tracking-wide shadow-2xs mb-3.5 ${
              isDark
                ? 'bg-[#26201B]/95 border-[#3E332A] text-[#E6D8C5]'
                : 'bg-[#EFE4D4]/95 border-[#DFD0BC] text-[#4E3E30]'
            }`}
          >
            <motion.span
              animate={prefersReducedMotion ? undefined : { rotate: [0, 180, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className={`text-[10px] inline-block ${
                isDark ? 'text-[#E6B86A]' : 'text-[#9C7248]'
              }`}
            >
              ✦
            </motion.span>
            <span>Build · Share · Grow</span>
          </motion.div>

          {/* Monumental Headline with Twinkling Sparkles & Brush Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full px-2 sm:px-8"
          >
            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : { scale: [1, 1.22, 1], rotate: [-5, 8, -5] }
              }
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-2 left-1 sm:left-4 hidden xs:block"
            >
              <SparkleStar className="w-5 sm:w-6 h-5 sm:h-6 opacity-80" />
            </motion.div>

            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : { scale: [1, 1.18, 1], rotate: [6, -7, 6] }
              }
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              className="absolute -top-1 right-1 sm:right-4 hidden xs:block"
            >
              <SparkleStar className="w-5 sm:w-6 h-5 sm:h-6 opacity-80" />
            </motion.div>

            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : { scale: [1, 1.25, 1], rotate: [-8, 8, -8] }
              }
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
              className="absolute top-[58%] -left-2 sm:left-0 hidden sm:block"
            >
              <SparkleStar className="w-4 sm:w-5 h-4 sm:h-5 opacity-70" />
            </motion.div>

            <h1
              className={`font-serif text-[42px] xs:text-[50px] sm:text-[60px] md:text-[68px] leading-[1.03] font-normal tracking-[-0.02em] ${
                isDark ? 'text-[#F4EFE6]' : 'text-[#1D1814]'
              }`}
            >
              Your corner <br />
              of the{' '}
              <span className="relative inline-block italic font-normal px-1">
                <span className="relative z-10">internet.</span>
                <motion.svg
                  initial={{ scaleX: 0, opacity: 0.4 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.65, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                  className="absolute -inset-x-2 -bottom-0.5 top-2.5 sm:top-3.5 w-[calc(100%+16px)] h-[78%] -z-0 pointer-events-none"
                  viewBox="0 0 260 64"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M8 22C45 14 195 10 250 16C257 17 258 29 252 34C246 39 256 49 246 53C188 58 58 59 10 54C3 53 2 43 7 38C2 33 3 23 8 22Z"
                    fill={isDark ? '#A87424' : '#F7DC6F'}
                    fillOpacity={isDark ? '0.68' : '0.92'}
                  />
                </motion.svg>
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={`mt-3.5 sm:mt-4 text-[14px] sm:text-[15.5px] md:text-[16.5px] font-normal leading-relaxed max-w-[460px] ${
              isDark ? 'text-[#C8BDB0]' : 'text-[#3F362E]'
            }`}
          >
            Create a personal website, portfolio, or digital space{' '}
            <br className="hidden sm:inline" />
            that truly feels like you.
          </motion.p>

          {/* Dual Magnetic CTA Pill Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-3.5"
          >
            <MagneticWrapper strength={0.22}>
              <button
                onClick={handleCreate}
                className={`inline-flex items-center justify-center gap-2 h-[38px] sm:h-[42px] px-5.5 sm:px-7 rounded-full text-[13px] sm:text-[14px] font-medium shadow-md transition-all hover:scale-[1.03] active:scale-[0.98] ${
                  isDark
                    ? 'bg-[#F4EFE6] hover:bg-white text-[#161310]'
                    : 'bg-[#181614] hover:bg-black text-[#FAF6EE]'
                }`}
              >
                <span>Create your space — Free</span>
                <span className="text-[12px] font-sans">↗</span>
              </button>
            </MagneticWrapper>

            <MagneticWrapper strength={0.18}>
              <a
                href="#templates"
                className={`inline-flex items-center justify-center border h-[38px] sm:h-[42px] px-5.5 sm:px-6.5 rounded-full text-[13px] sm:text-[14px] font-medium shadow-2xs transition-all hover:scale-[1.02] ${
                  isDark
                    ? 'bg-[#241E19]/90 hover:bg-[#2F2721] border-[#4A3E33] text-[#F4EFE6]'
                    : 'bg-[#FAF5EB]/90 hover:bg-white border-[#B8AC99] text-[#1F1A16] hover:border-[#8C7F6D]'
                }`}
              >
                Explore examples
              </a>
            </MagneticWrapper>
          </motion.div>
        </motion.div>

        {/* 4. Plane 4: Immersive Multi-Layered 3D Website Showcase Stage */}
        <motion.div
          style={{
            rotateX: prefersReducedMotion ? 0 : scrollStageRotateX,
            y: prefersReducedMotion ? 0 : scrollStageY,
            transformPerspective: 1500,
            transformStyle: 'preserve-3d',
          }}
          className="relative mt-7 sm:mt-9 w-full max-w-[1040px] mx-auto flex flex-col items-center justify-center"
        >
          {/* Ambient Warm Halo & Delicate Orbital Arcs Behind the 3D Website Previews */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 inset-x-0 h-[340px] -z-10 flex items-center justify-center"
          >
            <div
              className="w-[560px] h-[270px] rounded-full blur-2xl opacity-75"
              style={{
                background: isDark
                  ? 'radial-gradient(ellipse at center, rgba(230,184,106,0.22) 0%, rgba(22,19,16,0) 70%)'
                  : 'radial-gradient(ellipse at center, rgba(247,220,111,0.28) 0%, rgba(250,246,238,0) 70%)',
              }}
            />
            <svg
              className="hidden md:block absolute w-[860px] h-[310px] opacity-40"
              viewBox="0 0 860 310"
              fill="none"
            >
              <ellipse
                cx="430"
                cy="165"
                rx="395"
                ry="112"
                stroke={isDark ? '#6E5A42' : '#B8A386'}
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              <ellipse
                cx="430"
                cy="165"
                rx="325"
                ry="82"
                stroke={isDark ? '#584836' : '#C9B79C'}
                strokeWidth="0.8"
              />
            </svg>
          </div>

          {/* Panel A (Left-Deep Wing, Z = -85px): Elena Rostova Pastoral Landscape Website */}
          <motion.div
            initial={{ opacity: 0, x: -95, y: -25, scale: 0.78 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            style={{
              x: prefersReducedMotion ? 0 : deepPreviewX,
              y: prefersReducedMotion ? 0 : deepPreviewY,
              z: -85,
              rotateY: prefersReducedMotion ? 0 : deepRotateY,
              rotateX: prefersReducedMotion ? 0 : deepRotateX,
              transformStyle: 'preserve-3d',
            }}
            className="hidden lg:block absolute left-[0%] xl:left-[1.5%] -top-6 z-10 pointer-events-auto"
          >
            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [0, -7, 0], rotateZ: [-7.5, -6.2, -7.5] }
              }
              transition={{ duration: 7.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              whileHover={{ scale: 1.06, y: -6 }}
              onClick={() => setActiveSiteId('landscape')}
              style={{
                transformOrigin: 'left center',
                transform: 'rotateY(18deg) rotateX(5deg)',
              }}
              title="Click to preview Elena's site in Webloom Studio"
              className={`w-[195px] xl:w-[215px] rounded-[11px] overflow-hidden border transition-shadow cursor-pointer ${
                activeSiteId === 'landscape'
                  ? 'border-[#C89D54] shadow-[0_20px_42px_rgba(25,18,10,0.32),0_0_0_2px_rgba(247,220,111,0.7)]'
                  : isDark
                    ? 'border-[#3E342B] shadow-[0_18px_38px_rgba(0,0,0,0.55)]'
                    : 'border-[#DCD0BE]/90 shadow-[0_18px_38px_rgba(25,18,10,0.24)]'
              } ${isDark ? 'bg-[#1D2429]' : 'bg-[#F2EFE7]'}`}
            >
              <div
                className={`h-5 px-2 flex items-center justify-between border-b ${
                  isDark
                    ? 'bg-[#25201B] border-white/10 text-[#BFB3A4]'
                    : 'bg-[#E6E1D5] border-black/8 text-[#5B5349]'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D98276]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E3B869]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BA679]" />
                </div>
                <span className="text-[7.5px] font-medium truncate">
                  webloom.me/elena
                </span>
                <span className="text-[7px] opacity-75">↗</span>
              </div>
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={getThemeAsset('/generated/thumb-landscape.jpg', theme)}
                  alt="Elena Rostova pastoral landscape website preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent p-2.5 flex flex-col justify-end text-left">
                  <span className="font-serif text-[11px] text-[#FAF6EE] leading-tight">
                    Elena Rostova
                  </span>
                  <span className="text-[8px] text-[#E6DFD3]/90">
                    Visual Storyteller · Journal
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Panel B (Left-Mid Wing, Z = -35px): Ayaan Khan Dark Botanical Portfolio */}
          <motion.div
            initial={{ opacity: 0, x: -75, y: 20, scale: 0.82 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{ duration: 0.82, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              x: prefersReducedMotion ? 0 : midPreviewX,
              y: prefersReducedMotion ? 0 : midPreviewY,
              z: -35,
              rotateY: prefersReducedMotion ? 0 : midRotateY,
              rotateX: prefersReducedMotion ? 0 : midRotateX,
              marginLeft: prefersReducedMotion ? 0 : scrollWingSpreadLeft,
              transformStyle: 'preserve-3d',
            }}
            className="hidden md:block absolute left-[0.5%] lg:left-[3.5%] xl:left-[5.5%] top-[68px] z-20 pointer-events-auto"
          >
            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [0, -8.5, 0], rotateZ: [-4.5, -3.2, -4.5] }
              }
              transition={{ duration: 6.3, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.06, y: -5 }}
              onClick={() => setActiveSiteId('botanical')}
              style={{
                transformOrigin: 'left center',
                transform: 'rotateY(15deg) rotateX(3.5deg)',
              }}
              title="Click to preview Botanical Portfolio in Webloom Studio"
              className={`w-[205px] lg:w-[230px] xl:w-[242px] rounded-[12px] overflow-hidden border transition-shadow cursor-pointer ${
                activeSiteId === 'botanical'
                  ? 'border-[#F7DC6F] shadow-[0_24px_48px_rgba(15,12,8,0.42),0_0_0_2px_rgba(247,220,111,0.75)]'
                  : isDark
                    ? 'border-[#3E352B] shadow-[0_22px_44px_rgba(0,0,0,0.6)]'
                    : 'border-[#E6DEC8]/85 shadow-[0_22px_44px_rgba(18,14,9,0.34)]'
              } bg-[#1E2B20]`}
            >
              <div
                className={`h-5.5 px-2.5 flex items-center justify-between border-b ${
                  isDark
                    ? 'bg-[#241E1A] border-[#382F27] text-[#C8BDB0]'
                    : 'bg-[#F4EFE4] border-[#DED5C4] text-[#5B5349]'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D98276]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E3B869]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BA679]" />
                </div>
                <span className="text-[7.5px] font-medium truncate">
                  webloom.me/ayaan-design
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#5D8A58]" />
              </div>
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={getThemeAsset('/generated/botanical-leaves-dark.jpg', theme)}
                  alt="Ayaan Khan Product Designer dark botanical website preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#141F16]/90 via-[#141F16]/55 to-transparent p-3 flex flex-col justify-between text-left">
                  <span className="text-[7.5px] text-[#D8E2D5]/80 font-serif">
                    ✿ webloom
                  </span>
                  <div>
                    <p className="font-serif text-[12.5px] text-[#F7F3EA] leading-tight">
                      Ayaan Khan
                    </p>
                    <p className="font-serif text-[10px] text-[#D5E0D4]/90 leading-tight mb-1.5">
                      Product Designer
                    </p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-[#F7F3EA]/40 bg-black/25 text-[7.5px] text-[#F7F3EA]">
                      Work ↗
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Panel C (Right-Deep Wing, Z = -85px): Sora Takahashi Botanical Press Website */}
          <motion.div
            initial={{ opacity: 0, x: 95, y: -25, scale: 0.78 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            style={{
              x: prefersReducedMotion ? 0 : deepPreviewX,
              y: prefersReducedMotion ? 0 : deepPreviewY,
              z: -85,
              rotateY: prefersReducedMotion ? 0 : deepRotateY,
              rotateX: prefersReducedMotion ? 0 : deepRotateX,
              transformStyle: 'preserve-3d',
            }}
            className="hidden lg:block absolute right-[0%] xl:right-[1.5%] -top-5 z-10 pointer-events-auto"
          >
            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [0, -6.5, 0], rotateZ: [7.5, 6.1, 7.5] }
              }
              transition={{ duration: 8.1, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              whileHover={{ scale: 1.06, y: -6 }}
              onClick={() => setActiveSiteId('daisy')}
              style={{
                transformOrigin: 'right center',
                transform: 'rotateY(-18deg) rotateX(5deg)',
              }}
              title="Click to preview Sora's site in Webloom Studio"
              className={`w-[195px] xl:w-[215px] rounded-[11px] overflow-hidden border transition-shadow cursor-pointer ${
                activeSiteId === 'daisy'
                  ? 'border-[#F7DC6F] shadow-[0_20px_42px_rgba(25,18,10,0.34),0_0_0_2px_rgba(247,220,111,0.75)]'
                  : isDark
                    ? 'border-[#3E342B] shadow-[0_18px_38px_rgba(0,0,0,0.55)]'
                    : 'border-[#DCD0BE]/90 shadow-[0_18px_38px_rgba(25,18,10,0.24)]'
              } bg-[#23291E]`}
            >
              <div
                className={`h-5 px-2 flex items-center justify-between border-b ${
                  isDark
                    ? 'bg-[#25201B] border-white/10 text-[#BFB3A4]'
                    : 'bg-[#EAE3D5] border-black/10 text-[#5B5349]'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D98276]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E3B869]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BA679]" />
                </div>
                <span className="text-[7.5px] font-medium truncate">
                  webloom.me/sora
                </span>
                <span className="text-[7px] opacity-75">↗</span>
              </div>
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={getThemeAsset('/generated/thumb-daisy.jpg', theme)}
                  alt="Sora Takahashi botanical press website preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent p-2.5 flex flex-col justify-end text-left">
                  <span className="font-serif text-[11px] text-[#FAF6EE] leading-tight">
                    Sora Takahashi
                  </span>
                  <span className="text-[8px] text-[#E6DFD3]/90">
                    Botanical Press · Tokyo
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Panel D (Right-Mid Wing, Z = -35px): Clara Vance Editorial Monogram Website */}
          <motion.div
            initial={{ opacity: 0, x: 75, y: 20, scale: 0.82 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{ duration: 0.82, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            style={{
              x: prefersReducedMotion ? 0 : midPreviewX,
              y: prefersReducedMotion ? 0 : midPreviewY,
              z: -35,
              rotateY: prefersReducedMotion ? 0 : midRotateY,
              rotateX: prefersReducedMotion ? 0 : midRotateX,
              marginRight: prefersReducedMotion ? 0 : scrollWingSpreadRight,
              transformStyle: 'preserve-3d',
            }}
            className="hidden md:block absolute right-[0.5%] lg:right-[3.5%] xl:right-[5.5%] top-[72px] z-20 pointer-events-auto"
          >
            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [0, -8, 0], rotateZ: [4.5, 3.1, 4.5] }
              }
              transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              whileHover={{ scale: 1.06, y: -5 }}
              onClick={() => setActiveSiteId('monogram')}
              style={{
                transformOrigin: 'right center',
                transform: 'rotateY(-15deg) rotateX(3.5deg)',
              }}
              title="Click to preview Clara Vance Editorial site in Webloom Studio"
              className={`w-[205px] lg:w-[230px] xl:w-[242px] rounded-[12px] overflow-hidden border transition-shadow cursor-pointer ${
                activeSiteId === 'monogram'
                  ? 'border-[#C89D54] shadow-[0_24px_48px_rgba(25,18,12,0.38),0_0_0_2px_rgba(247,220,111,0.75)]'
                  : isDark
                    ? 'border-[#3E3136] shadow-[0_22px_44px_rgba(0,0,0,0.6)]'
                    : 'border-[#DFD2C0]/95 shadow-[0_22px_44px_rgba(25,18,12,0.28)]'
              } ${isDark ? 'bg-[#23191D]' : 'bg-[#F4E8EA]'}`}
            >
              <div
                className={`h-5.5 px-2.5 flex items-center justify-between border-b ${
                  isDark
                    ? 'bg-[#2A1E23] border-[#3E2D34] text-[#D4BFC5]'
                    : 'bg-[#FAF4F5] border-[#E5D4D7] text-[#664B51]'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D98276]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E3B869]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BA679]" />
                </div>
                <span className="text-[7.5px] font-medium truncate">
                  webloom.me/clara
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C98A95]" />
              </div>
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={getThemeAsset('/generated/thumb-monogram.jpg', theme)}
                  alt="Clara Vance editorial monogram website preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1114]/70 via-transparent to-transparent p-3 flex flex-col justify-end text-left">
                  <p className="font-serif text-[12.5px] text-[#FAF6EE] leading-tight drop-shadow-xs">
                    Clara Vance
                  </p>
                  <p className="text-[8.5px] text-[#F4E8EA]/95">
                    Creative Direction &amp; Archive
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* PRIMARY FRONTMOST SHOWCASE (Z = +75px): MacBook Pro Running Live Webloom Studio */}
          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.94, rotateX: 12 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.85, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            style={{
              x: prefersReducedMotion ? 0 : laptopX,
              y: prefersReducedMotion ? 0 : laptopY,
              z: prefersReducedMotion ? 75 : scrollLaptopZ,
              scale: prefersReducedMotion ? 1 : scrollLaptopScale,
              rotateY: prefersReducedMotion ? 0 : laptopRotateY,
              rotateX: prefersReducedMotion ? 0 : laptopRotateX,
              transformStyle: 'preserve-3d',
            }}
            className="relative z-30 w-full max-w-[490px] sm:max-w-[530px] md:max-w-[550px] mx-auto flex flex-col items-center"
          >
            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
              transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full flex flex-col items-center"
            >
              {/* Laptop Screen Lid / Bezel */}
              <div className="w-[92%] bg-[#161616] rounded-t-[16px] sm:rounded-t-[20px] p-[7px] sm:p-[9px] pb-[10px] sm:pb-[12px] shadow-[0_26px_60px_rgba(12,8,4,0.62)] border border-[#32302E] relative overflow-hidden">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2C2C2C] mx-auto mb-1" />

                {!prefersReducedMotion && (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-30 opacity-30"
                    style={{
                      background: useTransform(
                        [screenGlareX, screenGlareY],
                        ([gx, gy]) =>
                          `radial-gradient(circle at ${gx} ${gy}, rgba(255,244,214,0.38) 0%, rgba(255,244,214,0) 58%)`
                      ),
                    }}
                  />
                )}

                {/* Inner Webloom Studio Application Screen */}
                <div
                  className={`w-full aspect-[16/10] rounded-[8px] sm:rounded-[10px] overflow-hidden flex flex-col border relative z-10 ${
                    isDark
                      ? 'bg-[#1D1814] border-white/10 text-[#F4EFE6]'
                      : 'bg-[#FAF6EE] border-black/10 text-[#1F1A16]'
                  }`}
                >
                  {/* Studio Top Header Bar */}
                  <div
                    className={`h-7 sm:h-8 border-b px-2.5 sm:px-3.5 flex items-center justify-between shrink-0 ${
                      isDark
                        ? 'bg-[#1D1814] border-[#332B23]'
                        : 'bg-[#FAF6EE] border-[#EAE2D3]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <svg
                        className={`w-3.5 h-3.5 ${
                          isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="2.2" />
                        <circle cx="12" cy="6.5" r="2.2" />
                        <circle cx="12" cy="17.5" r="2.2" />
                        <circle cx="7.2" cy="9.2" r="2.2" />
                        <circle cx="16.8" cy="14.8" r="2.2" />
                        <circle cx="16.8" cy="9.2" r="2.2" />
                        <circle cx="7.2" cy="14.8" r="2.2" />
                      </svg>
                      <span className="font-serif font-bold text-[10px] sm:text-[11px] tracking-tight">
                        Webloom
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveSiteId('villa')}
                        className={`hidden sm:inline-flex items-center gap-1 ml-1.5 px-1.5 py-0.2 rounded text-[8px] font-medium transition-colors ${
                          isDark
                            ? 'bg-[#2C241E] hover:bg-[#382E26] text-[#D8CBB8]'
                            : 'bg-[#EFE5D2] hover:bg-[#E5D7BE] text-[#5C4E3E]'
                        }`}
                      >
                        <span>{activeSite.handle}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div
                        className={`hidden xs:flex items-center gap-1.5 ${
                          isDark ? 'text-[#A89B8C]' : 'text-[#786E62]'
                        }`}
                      >
                        <svg
                          className="w-2.5 h-2.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M3 7v6h6" />
                          <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                        </svg>
                        <svg
                          className="w-2.5 h-2.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M3.6 9h16.8M3.6 15h16.8" />
                        </svg>
                      </div>
                      <button
                        onClick={handleCreate}
                        className={`text-[8.5px] sm:text-[9.5px] font-medium px-2.5 py-0.5 rounded-full transition-transform hover:scale-105 ${
                          isDark
                            ? 'bg-[#E6B86A] text-[#181410]'
                            : 'bg-[#181614] hover:bg-black text-[#FAF6EE]'
                        }`}
                      >
                        Publish
                      </button>
                    </div>
                  </div>

                  {/* Studio Main Split Body */}
                  <div className="flex-1 flex overflow-hidden">
                    {/* Interactive Left Sidebar Navigation */}
                    <div
                      className={`w-[23%] sm:w-[21%] border-r p-1.5 sm:p-2 flex flex-col justify-between text-[8.5px] sm:text-[9.5px] shrink-0 ${
                        isDark
                          ? 'bg-[#181411] border-[#332B23] text-[#BFB3A4]'
                          : 'bg-[#F6F0E4] border-[#EAE2D3] text-[#544B41]'
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        {STUDIO_TABS.map((tab) => {
                          const isActive = activeStudioTab === tab.id;
                          return (
                            <button
                              key={tab.id}
                              type="button"
                              onClick={() => setActiveStudioTab(tab.id)}
                              className={`flex items-center gap-1.5 px-1.5 py-1 rounded text-left transition-all ${
                                isActive
                                  ? isDark
                                    ? 'bg-[#2C241D] text-[#F4EFE6] font-medium shadow-2xs'
                                    : 'bg-[#EAE0CE] text-[#1F1A16] font-medium shadow-2xs'
                                  : isDark
                                    ? 'hover:bg-white/5 text-[#A89B8C]'
                                    : 'hover:bg-black/5 text-[#544B41]'
                              }`}
                            >
                              {tab.id === 'Pages' && (
                                <svg
                                  className="w-2.5 h-2.5 shrink-0"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <rect x="4" y="4" width="16" height="16" rx="2" />
                                  <path d="M8 9h8M8 13h6" />
                                </svg>
                              )}
                              {tab.id === 'Design' && (
                                <svg
                                  className="w-2.5 h-2.5 shrink-0"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <circle cx="12" cy="12" r="9" />
                                  <circle cx="8.5" cy="10.5" r="1" fill="currentColor" />
                                  <circle cx="15.5" cy="10.5" r="1" fill="currentColor" />
                                </svg>
                              )}
                              {tab.id === 'Blocks' && (
                                <svg
                                  className="w-2.5 h-2.5 shrink-0"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <rect x="3" y="3" width="7" height="7" rx="1" />
                                  <rect x="14" y="3" width="7" height="7" rx="1" />
                                  <rect x="3" y="14" width="7" height="7" rx="1" />
                                  <rect x="14" y="14" width="7" height="7" rx="1" />
                                </svg>
                              )}
                              {tab.id === 'Settings' && (
                                <svg
                                  className="w-2.5 h-2.5 shrink-0"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <circle cx="12" cy="12" r="3" />
                                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
                                </svg>
                              )}
                              <span className="truncate">{tab.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      <div
                        className={`hidden sm:flex items-center justify-center gap-1 pt-1 border-t ${
                          isDark ? 'border-[#332B23]' : 'border-[#E5DEC9]'
                        }`}
                      >
                        {SHOWCASE_SITES.map((site) => (
                          <button
                            key={site.id}
                            type="button"
                            onClick={() => setActiveSiteId(site.id)}
                            title={`Preview ${site.creator}`}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              activeSiteId === site.id
                                ? isDark
                                  ? 'bg-[#E6B86A] scale-125'
                                  : 'bg-[#1F1A16] scale-125'
                                : isDark
                                  ? 'bg-[#5A4D40] hover:bg-[#8C7A66]'
                                  : 'bg-[#C7BBA8] hover:bg-[#8C7F6D]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Right Live User Portfolio Canvas */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSite.id}
                        initial={{ opacity: 0.25, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0.25, y: -4 }}
                        transition={{ duration: 0.24, ease: 'easeOut' }}
                        style={{
                          backgroundColor: isDark
                            ? activeSite.darkCanvasBg
                            : activeSite.canvasBg,
                        }}
                        className="flex-1 p-3 sm:p-5 flex items-center justify-between gap-2.5 sm:gap-4 relative overflow-hidden"
                      >
                        <div className="flex flex-col items-start z-10 max-w-[52%] text-left">
                          <h2
                            style={{
                              color: isDark
                                ? activeSite.darkTextColor
                                : activeSite.textColor,
                            }}
                            className="font-serif text-[16px] xs:text-[19px] sm:text-[23px] leading-[1.12] font-normal"
                          >
                            {activeSite.creator}
                          </h2>
                          <p
                            style={{
                              color: isDark
                                ? activeSite.darkSubColor
                                : activeSite.subColor,
                            }}
                            className="font-serif text-[11px] xs:text-[13px] sm:text-[15px] mt-0.5 mb-2.5 sm:mb-3.5"
                          >
                            {activeSite.role}
                          </p>
                          <button
                            onClick={handleCreate}
                            style={{
                              backgroundColor: isDark
                                ? activeSite.darkPillBg
                                : activeSite.pillBg,
                              color: isDark
                                ? activeSite.darkPillText
                                : activeSite.pillText,
                            }}
                            className="inline-flex items-center gap-1 text-[8px] sm:text-[9.5px] font-medium px-2.5 sm:px-3 py-1 rounded-full shadow-xs transition-transform hover:scale-105"
                          >
                            <span>{activeSite.cta}</span>
                            <span className="text-[7.5px]">↗</span>
                          </button>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.04 }}
                          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                          className={`w-[48%] aspect-[4/3.1] rounded-lg overflow-hidden shadow-sm border shrink-0 cursor-pointer ${
                            isDark ? 'border-[#3E342A]' : 'border-[#E5DEC9]/60'
                          }`}
                        >
                          <img
                            src={getThemeAsset(activeSite.image, theme)}
                            alt={activeSite.creator}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Realistic Metallic MacBook Base Sitting on the Wooden Desk */}
              <div className="w-full relative flex flex-col items-center">
                <div
                  className="w-[96%] h-[8px] sm:h-[10px] rounded-t-[2px]"
                  style={{
                    background: isDark
                      ? 'linear-gradient(90deg, #524B44 0%, #8E857B 18%, #ABA297 50%, #8E857B 82%, #524B44 100%)'
                      : 'linear-gradient(90deg, #9E978D 0%, #DFDBD2 18%, #F4F1EA 50%, #DFDBD2 82%, #9E978D 100%)',
                  }}
                >
                  <div className="w-12 sm:w-16 h-1 bg-[#6B635B] rounded-b-full mx-auto" />
                </div>
                <div
                  className="w-full h-[6px] sm:h-[8px] rounded-b-[10px] shadow-[0_14px_32px_rgba(18,12,6,0.62)]"
                  style={{
                    background: isDark
                      ? 'linear-gradient(180deg, #787067 0%, #46403A 100%)'
                      : 'linear-gradient(180deg, #C7C1B7 0%, #857D72 100%)',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* 5. Authentic Torn-Paper / Deckle Edge Transition at Bottom of Wooden Desk */}
      <div className="absolute bottom-0 inset-x-0 w-full h-5 sm:h-7 z-30 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full drop-shadow-[0_-2px_3px_rgba(15,10,5,0.22)]"
        >
          <path
            d="M0 24L28 19L58 26L92 16L130 22L168 18L205 27L248 15L288 21L330 14L372 24L415 17L455 25L498 16L540 22L585 13L628 24L670 18L715 26L760 15L805 23L848 16L890 25L935 14L980 22L1025 17L1068 27L1112 16L1158 23L1205 15L1248 25L1292 18L1338 24L1382 16L1415 22L1440 18V48H0V24Z"
            fill={isDark ? '#161310' : '#FAF6EE'}
          />
        </svg>
      </div>
    </section>
  );
}
