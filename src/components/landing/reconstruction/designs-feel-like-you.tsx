'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Tilt3DCard, CinematicCameraScene } from './motion-primitives';
import {
  useWebloomTheme,
  useWebloomSyncState,
  useIsWebloomOverlay,
} from './webloom-dual-theme-context';
import { getThemeAsset } from '@/lib/webloom-theme-assets';

const TEMPLATES = [
  {
    id: 'default',
    thumb: '/generated/thumb-landscape.jpg',
    previewBg: '/generated/thumb-landscape.jpg',
    name: 'Elena Rostova',
    role: 'Visual Storyteller',
    cta: 'Read journal',
    alt: 'Watercolor mountain lake template',
  },
  {
    id: 'monogram',
    thumb: '/generated/thumb-monogram.jpg',
    previewBg: '/generated/thumb-monogram.jpg',
    name: 'Mira Laurent',
    role: 'Editorial Director',
    cta: 'Journal',
    alt: 'Minimalist monogram M. template',
  },
  {
    id: 'daisy',
    thumb: '/generated/thumb-daisy.jpg',
    previewBg: '/generated/botanical-leaves-dark.jpg',
    name: 'Ayaan Khan',
    role: 'Product Designer',
    cta: 'Work',
    alt: 'Dark botanical daisy template',
  },
  {
    id: 'wave',
    thumb: '/generated/thumb-wave.jpg',
    previewBg: '/generated/thumb-wave.jpg',
    name: 'Sora Takahashi',
    role: 'Creative Technologist',
    cta: 'Experiments',
    alt: 'Golden wave abstract template',
  },
];

export function DesignsFeelLikeYouReconstructed() {
  const theme = useWebloomTheme();
  const isOverlay = useIsWebloomOverlay();
  const isDark = theme === 'dark';
  const { selectedTemplateIdx, setSelectedTemplateIdx } = useWebloomSyncState();
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const activeTemplate = TEMPLATES[selectedTemplateIdx] ?? TEMPLATES[0];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 105,
    damping: 26,
  });

  const backWindowZ = useTransform(smoothScroll, [0.1, 0.5, 0.9], [-24, -52, -60]);
  const backWindowX = useTransform(smoothScroll, [0.1, 0.5, 0.9], [8, -8, -12]);
  const backWindowRotate = useTransform(smoothScroll, [0.1, 0.5, 0.9], [-2, -4.8, -5.5]);

  const midWindowZ = useTransform(smoothScroll, [0.1, 0.5, 0.9], [-12, -26, -30]);
  const midWindowX = useTransform(smoothScroll, [0.1, 0.5, 0.9], [4, -3, -5]);
  const midWindowRotate = useTransform(smoothScroll, [0.1, 0.5, 0.9], [-1, -2.2, -2.8]);

  const frontWindowZ = useTransform(smoothScroll, [0.1, 0.5, 0.95], [12, 26, 44]);
  const frontWindowScale = useTransform(smoothScroll, [0.1, 0.5, 0.95], [0.96, 1, 1.055]);

  return (
    <section
      ref={sectionRef}
      id="templates"
      className="w-full max-w-6xl mx-auto px-6 sm:px-8 py-8 md:py-12 select-none"
    >
      <CinematicCameraScene enterRotateX={6.5} exitRotateX={-3.5}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Scroll-Synchronized 3-Layer 3D Exhibition Browser Stack */}
          <motion.div
            initial={isOverlay ? false : { opacity: 0, x: -24, rotateY: 10 }}
            animate={isOverlay ? { opacity: 1, x: 0, rotateY: 0 } : undefined}
            whileInView={isOverlay ? undefined : { opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
            className="lg:col-span-6 flex justify-center"
          >
            <Tilt3DCard
              maxTilt={7}
              scaleOnHover={1.02}
              className="relative w-full max-w-[490px] pt-6 pl-5 sm:pl-7 pb-2 group"
            >
              {/* Layer 1 (Back-most Dark Charcoal Browser Window) */}
              <motion.div
                style={
                  prefersReducedMotion
                    ? { transform: 'translateZ(-32px)' }
                    : {
                        z: backWindowZ,
                        x: backWindowX,
                        rotateZ: backWindowRotate,
                      }
                }
                className={`absolute top-1 left-0 w-[86%] aspect-[16/10] rounded-[12px] p-2 shadow-lg border pointer-events-none ${
                  isDark
                    ? 'bg-[#171B1D] border-white/10'
                    : 'bg-[#22282A] border-black/20'
                }`}
              >
                <div className="flex items-center justify-between px-1.5 py-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E06C60]" />
                    <span className="w-2 h-2 rounded-full bg-[#E5B567]" />
                    <span className="w-2 h-2 rounded-full bg-[#78B87A]" />
                  </div>
                  <div className="flex items-center gap-1 opacity-50">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  </div>
                </div>
              </motion.div>

              {/* Layer 2 (Middle Browser Window Peeking Out Left) */}
              <motion.div
                style={
                  prefersReducedMotion
                    ? { transform: 'translateZ(-14px)' }
                    : {
                        z: midWindowZ,
                        x: midWindowX,
                        rotateZ: midWindowRotate,
                      }
                }
                className={`absolute top-4 left-2.5 w-[88%] aspect-[16/10] rounded-[12px] p-2 shadow-xl border pointer-events-none flex flex-col ${
                  isDark
                    ? 'bg-[#231D18] border-[#3C3128]'
                    : 'bg-[#F6EFE2] border-[#DDD2C0]'
                }`}
              >
                <div
                  className={`flex items-center gap-1.5 px-1.5 py-1 border-b ${
                    isDark ? 'border-[#332A22]' : 'border-[#E6DDD0]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#D99B82]" />
                  <span className="w-2 h-2 rounded-full bg-[#DFC18B]" />
                  <span className="w-2 h-2 rounded-full bg-[#A3B899]" />
                </div>
                <div
                  className={`flex-1 rounded-b-[8px] p-3 flex items-center ${
                    isDark ? 'bg-[#1B1612]' : 'bg-[#FAF6EE]'
                  }`}
                >
                  <div
                    className={`w-10 h-12 rounded border flex items-center justify-center ${
                      isDark
                        ? 'bg-[#31221D] border-[#4A342C]'
                        : 'bg-[#EED6C4] border-[#DFC2AD]'
                    }`}
                  >
                    <span className="text-[10px] text-[#D88268]">✿</span>
                  </div>
                </div>
              </motion.div>

              {/* Layer 3 (Front Dominant Exhibition Browser Window) */}
              <motion.div
                style={
                  prefersReducedMotion
                    ? { transform: 'translateZ(24px)' }
                    : {
                        z: frontWindowZ,
                        scale: frontWindowScale,
                      }
                }
                className={`relative z-10 w-full rounded-[14px] p-2 sm:p-2.5 border rotate-[1deg] group-hover:rotate-0 transition-transform duration-500 ${
                  isDark
                    ? 'bg-[#28211B] border-[#42362C] shadow-[0_24px_52px_rgba(0,0,0,0.65)]'
                    : 'bg-[#F7F2E7] border-[#E2D8C5] shadow-[0_22px_48px_rgba(30,22,14,0.2)]'
                }`}
              >
                {/* Browser Top Chrome Bar */}
                <div
                  className={`flex items-center justify-between px-2 pb-2 ${
                    isDark ? 'text-[#A89B8C]' : 'text-[#8C8173]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isDark ? 'bg-[#524538]' : 'bg-[#D5CBB8]'
                      }`}
                    />
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isDark ? 'bg-[#524538]' : 'bg-[#D5CBB8]'
                      }`}
                    />
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isDark ? 'bg-[#524538]' : 'bg-[#D5CBB8]'
                      }`}
                    />
                  </div>
                  <div className="flex items-center gap-1.5 opacity-70">
                    <span className="w-2 h-2 rounded-full border border-current" />
                    <span className="w-2 h-2 rounded-full border border-current" />
                    <span className="text-[9px] leading-none">›</span>
                  </div>
                </div>

                {/* Browser Viewport */}
                <div className="relative w-full aspect-[16/9.6] rounded-[9px] overflow-hidden bg-[#151D17] text-[#FAF6EE] p-5 sm:p-7 flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeTemplate.previewBg}
                      initial={{ opacity: 0.35, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.35 }}
                      transition={{ duration: 0.38, ease: 'easeOut' }}
                      src={getThemeAsset(activeTemplate.previewBg, theme)}
                      alt="Portfolio background artwork"
                      className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none"
                    />
                  </AnimatePresence>

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: isDark
                        ? 'linear-gradient(90deg, rgba(16,20,17,0.92) 0%, rgba(16,20,17,0.72) 48%, rgba(16,20,17,0.12) 100%)'
                        : 'linear-gradient(90deg, rgba(22,32,24,0.92) 0%, rgba(22,32,24,0.72) 48%, rgba(22,32,24,0.08) 100%)',
                    }}
                  />

                  <div className="relative z-10 flex items-center gap-1 text-[#FAF6EE]/75 text-[9.5px] sm:text-[10.5px] font-serif">
                    <span>✿</span>
                    <span>webloom</span>
                  </div>

                  <div className="relative z-10 my-auto py-1">
                    <h3 className="font-serif text-[21px] xs:text-[24px] sm:text-[28px] leading-[1.12] font-normal text-[#FAF6EE] tracking-tight">
                      {activeTemplate.name} <br />
                      {activeTemplate.role}
                    </h3>
                    <button className="mt-3.5 sm:mt-4 inline-flex items-center gap-1.5 px-4 py-1 rounded-full border border-[#FAF6EE]/45 bg-[#FAF6EE]/10 hover:bg-[#FAF6EE]/20 text-[#FAF6EE] text-[10.5px] sm:text-[11.5px] font-medium transition-colors">
                      <span>{activeTemplate.cta}</span>
                      <span className="text-[9.5px]">↗</span>
                    </button>
                  </div>

                  <div className="relative z-10 h-1" />
                </div>
              </motion.div>
            </Tilt3DCard>
          </motion.div>

          {/* Right Column: Editorial Copy & 4 Interactive High-Res Template Previews */}
          <motion.div
            initial={isOverlay ? false : { opacity: 0, x: 20, rotateY: -6 }}
            animate={isOverlay ? { opacity: 1, x: 0, rotateY: 0 } : undefined}
            whileInView={isOverlay ? undefined : { opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: 'translateZ(15px)' }}
            className="lg:col-span-6 flex flex-col items-start lg:pl-4"
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
              <span>Beautiful by default</span>
            </div>

            <h2
              className={`font-serif text-[30px] sm:text-[38px] xl:text-[45px] leading-[1.08] font-normal tracking-tight ${
                isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
              }`}
            >
              Designs that feel like you.
            </h2>

            <p
              className={`mt-2.5 text-[14.5px] sm:text-[15.5px] leading-relaxed max-w-md mb-5 ${
                isDark ? 'text-[#C8BDB0]' : 'text-[#4A4138]'
              }`}
            >
              Choose from thoughtfully crafted templates, <br className="hidden sm:inline" />
              customize with ease, and publish in minutes.
            </p>

            {/* 4 High-Res Full-Bleed Template Thumbnails */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 w-full max-w-[460px] mb-4">
              {TEMPLATES.map((tpl, idx) => (
                <motion.div
                  key={tpl.id}
                  whileHover={{ y: -5, scale: 1.06, rotateZ: idx % 2 === 0 ? -1.5 : 1.5 }}
                  whileTap={{ scale: 0.97 }}
                  onMouseEnter={() => setSelectedTemplateIdx(idx)}
                  onClick={() => setSelectedTemplateIdx(idx)}
                  className={`group relative aspect-[16/10.5] rounded-[8px] overflow-hidden border transition-all cursor-pointer ${
                    selectedTemplateIdx === idx
                      ? isDark
                        ? 'border-[#E6B86A] shadow-[0_8px_20px_rgba(0,0,0,0.5)] ring-2 ring-[#E6B86A]/70'
                        : 'border-[#8C6A42] shadow-[0_8px_20px_rgba(40,30,15,0.18)] ring-2 ring-[#F7DC6F]/70'
                      : isDark
                        ? 'border-[#3E342B] shadow-xs hover:shadow-md'
                        : 'border-[#D8CBB8] shadow-xs hover:shadow-md'
                  }`}
                >
                  <img
                    src={getThemeAsset(tpl.thumb, theme)}
                    alt={tpl.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>

            <Link
              href="#templates"
              className={`inline-flex items-center gap-1.5 text-[13.5px] sm:text-[14px] font-medium transition-colors border-b pb-0.5 group ${
                isDark
                  ? 'text-[#EAE0D2] hover:text-white border-[#6E5F50]'
                  : 'text-[#2A231D] hover:text-black border-[#8C7F70]'
              }`}
            >
              <span>100+ templates</span>
              <span className="font-sans text-[12px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </Link>
          </motion.div>
        </div>
      </CinematicCameraScene>
    </section>
  );
}
