'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Tilt3DCard } from './motion-primitives';

const TEMPLATES = [
  {
    id: 'default',
    thumb: '/generated/thumb-landscape.jpg',
    previewBg: '/generated/botanical-leaves-dark.jpg',
    name: 'Ayaan Khan',
    role: 'Product Designer',
    cta: 'Work',
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
  const [selectedIdx, setSelectedIdx] = useState<number>(2); // Default shows Ayaan Khan / Product Designer over botanical-leaves-dark.jpg
  const activeTemplate = TEMPLATES[selectedIdx] ?? TEMPLATES[0];

  return (
    <section id="templates" className="w-full max-w-6xl mx-auto px-6 sm:px-8 py-8 md:py-12 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Authentic 3-Layer Stacked Browser Window Mockup with 3D Perspective */}
        <motion.div
          initial={{ opacity: 0, x: -24, rotateY: 8 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex justify-center"
        >
          <Tilt3DCard
            maxTilt={6.5}
            scaleOnHover={1.018}
            className="relative w-full max-w-[490px] pt-6 pl-5 sm:pl-7 pb-2 group"
          >
            {/* Layer 1 (Back-most Dark Charcoal Browser Window) */}
            <div
              style={{ transform: 'translateZ(-24px)' }}
              className="absolute top-1 left-0 w-[86%] aspect-[16/10] bg-[#22282A] rounded-[12px] p-2 shadow-md -rotate-[4.5deg] group-hover:-rotate-[6deg] group-hover:-translate-x-1.5 transition-transform duration-500 border border-black/20 pointer-events-none"
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
            </div>

            {/* Layer 2 (Middle Cream Browser Window Peeking Out Left) */}
            <div
              style={{ transform: 'translateZ(-12px)' }}
              className="absolute top-4 left-2.5 w-[88%] aspect-[16/10] bg-[#F6EFE2] rounded-[12px] p-2 shadow-lg -rotate-[2deg] group-hover:-rotate-[3.2deg] group-hover:-translate-x-1 transition-transform duration-500 border border-[#DDD2C0] pointer-events-none flex flex-col"
            >
              <div className="flex items-center gap-1.5 px-1.5 py-1 border-b border-[#E6DDD0]">
                <span className="w-2 h-2 rounded-full bg-[#D99B82]" />
                <span className="w-2 h-2 rounded-full bg-[#DFC18B]" />
                <span className="w-2 h-2 rounded-full bg-[#A3B899]" />
              </div>
              <div className="flex-1 bg-[#FAF6EE] rounded-b-[8px] p-3 flex items-center">
                <div className="w-10 h-12 rounded bg-[#EED6C4] border border-[#DFC2AD] flex items-center justify-center">
                  <span className="text-[10px] text-[#B85D43]">✿</span>
                </div>
              </div>
            </div>

            {/* Layer 3 (Front Main Portfolio Browser Window) */}
            <div
              style={{ transform: 'translateZ(12px)' }}
              className="relative z-10 w-full bg-[#F7F2E7] rounded-[14px] p-2 sm:p-2.5 shadow-[0_18px_40px_rgba(30,22,14,0.16)] border border-[#E2D8C5] rotate-[1deg] group-hover:rotate-0 transition-transform duration-500"
            >
              {/* Browser Top Chrome Bar */}
              <div className="flex items-center justify-between px-2 pb-2 text-[#8C8173]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D5CBB8]" />
                  <span className="w-2 h-2 rounded-full bg-[#D5CBB8]" />
                  <span className="w-2 h-2 rounded-full bg-[#D5CBB8]" />
                </div>
                <div className="flex items-center gap-1.5 opacity-70">
                  <span className="w-2 h-2 rounded-full border border-[#8C8173]" />
                  <span className="w-2 h-2 rounded-full border border-[#8C8173]" />
                  <span className="text-[9px] leading-none">›</span>
                </div>
              </div>

              {/* Browser Viewport: Dark Botanical Portfolio ("Ayaan Khan — Product Designer") */}
              <div className="relative w-full aspect-[16/9.6] rounded-[9px] overflow-hidden bg-[#19231B] text-[#FAF6EE] p-5 sm:p-7 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeTemplate.previewBg}
                    initial={{ opacity: 0.4, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 0.35 }}
                    src={activeTemplate.previewBg}
                    alt="Portfolio background artwork"
                    className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none"
                  />
                </AnimatePresence>

                {/* Left gradient scrim to guarantee crisp text contrast */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(22,32,24,0.92) 0%, rgba(22,32,24,0.72) 48%, rgba(22,32,24,0.08) 100%)',
                  }}
                />

                {/* Top-Left Mini Brand */}
                <div className="relative z-10 flex items-center gap-1 text-[#FAF6EE]/75 text-[9.5px] sm:text-[10.5px] font-serif">
                  <span>✿</span>
                  <span>webloom</span>
                </div>

                {/* Center-Left Editorial Portfolio Title */}
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
            </div>
          </Tilt3DCard>
        </motion.div>

        {/* Right Column: Editorial Copy & 4 Interactive High-Res Template Previews */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col items-start lg:pl-4"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EFE4D4] border border-[#DFD0BC] text-[#4E3E30] text-[11px] sm:text-[12px] font-medium tracking-wide shadow-2xs mb-3">
            <span className="text-[10px] text-[#9C7248]">✦</span>
            <span>Beautiful by default</span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-[30px] sm:text-[38px] xl:text-[45px] leading-[1.08] text-[#1F1A16] font-normal tracking-tight">
            Designs that feel like you.
          </h2>

          {/* Subtitle */}
          <p className="mt-2.5 text-[#4A4138] text-[14.5px] sm:text-[15.5px] leading-relaxed max-w-md mb-5">
            Choose from thoughtfully crafted templates, <br className="hidden sm:inline" />
            customize with ease, and publish in minutes.
          </p>

          {/* 4 High-Res Full-Bleed Template Thumbnails (Click to preview in 3D Browser Stack) */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 w-full max-w-[460px] mb-4">
            {TEMPLATES.map((tpl, idx) => (
              <motion.div
                key={tpl.id}
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedIdx(idx)}
                className={`group relative aspect-[16/10.5] rounded-[8px] overflow-hidden border transition-all cursor-pointer ${
                  selectedIdx === idx
                    ? 'border-[#8C6A42] shadow-md'
                    : 'border-[#D8CBB8] shadow-xs hover:shadow-md'
                }`}
              >
                <img
                  src={tpl.thumb}
                  alt={tpl.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>

          {/* 100+ templates link */}
          <Link
            href="#templates"
            className="inline-flex items-center gap-1.5 text-[13.5px] sm:text-[14px] font-medium text-[#2A231D] hover:text-black transition-colors border-b border-[#8C7F70] pb-0.5 group"
          >
            <span>100+ templates</span>
            <span className="font-sans text-[12px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              ↗
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
