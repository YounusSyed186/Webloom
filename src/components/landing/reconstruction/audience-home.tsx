'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AUDIENCES = [
  {
    label: 'Developers & Engineers',
    icon: (
      <svg className="w-4 h-4 stroke-[#2B231D] fill-none shrink-0" viewBox="0 0 24 24" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="13.5" y1="4" x2="10.5" y2="20" />
      </svg>
    ),
  },
  {
    label: 'Designers & Creatives',
    icon: (
      <svg className="w-4 h-4 stroke-[#2B231D] fill-none shrink-0" viewBox="0 0 24 24" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    label: 'Students & Job Seekers',
    icon: (
      <svg className="w-4 h-4 stroke-[#2B231D] fill-none shrink-0" viewBox="0 0 24 24" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    label: 'Writers & Knowledge Builders',
    icon: (
      <svg className="w-4 h-4 stroke-[#2B231D] fill-none shrink-0" viewBox="0 0 24 24" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
  },
  {
    label: 'Professionals & Freelancers',
    icon: (
      <svg className="w-4 h-4 stroke-[#2B231D] fill-none shrink-0" viewBox="0 0 24 24" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="7" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
];

export function AudienceHomeReconstructed() {
  return (
    <section
      id="explore"
      className="relative isolate w-full bg-[#FAF6EE] pt-8 sm:pt-12 pb-28 sm:pb-32 md:pb-36 overflow-hidden select-none"
    >
      {/* 1. Full-Width Panoramic Watercolor Countryside Cottage & Low Rolling Hills Horizon */}
      <motion.div
        initial={{ opacity: 0.85, scale: 1.015 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img
          src="/generated/audience-hills-authentic.jpg"
          alt="Panoramic watercolor countryside cottage and rolling green hills"
          className="w-full h-full object-cover object-bottom"
        />
        {/* Smooth top blend into #FAF6EE cream page background */}
        <div
          className="absolute inset-x-0 top-0 h-12"
          style={{
            background:
              'linear-gradient(180deg, #FAF6EE 0%, rgba(250,246,238,0) 100%)',
          }}
        />
      </motion.div>

      {/* 2. Foreground Content: Positioned snugly above the low central hills */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Spacer on Desktop so the Terracotta Cottage on the far-left hill is completely visible */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Center Column: Eyebrow Badge + Editorial Heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start lg:pl-4"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EFE4D4]/95 border border-[#DFD0BC] text-[#4E3E30] text-[11px] sm:text-[12px] font-medium tracking-wide shadow-2xs mb-3">
              <span className="text-[10px] text-[#9C7248]">✦</span>
              <span>Made for everyone</span>
            </div>

            <h2 className="font-serif text-[30px] sm:text-[36px] xl:text-[42px] leading-[1.12] text-[#1F1A16] font-normal tracking-tight">
              A home for builders, thinkers, <br className="hidden sm:inline" />
              creators, and dreamers.
            </h2>
          </motion.div>

          {/* Right Column: Vertical Divider Rule + Staggered 5 Audience Roles */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07 } },
            }}
            className="lg:col-span-4 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-[#D5C9B6] pt-5 lg:pt-1 lg:pl-8"
          >
            <div className="flex flex-col gap-2.5 sm:gap-3">
              {AUDIENCES.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, x: 14 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-[#221D18] group cursor-pointer"
                >
                  <div className="w-6 h-6 flex items-center justify-center opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all">
                    {item.icon}
                  </div>
                  <span className="text-[13px] sm:text-[13.5px] font-medium tracking-tight group-hover:text-black transition-colors">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. Authentic Torn-Paper / Deckle Edge Transition at Bottom of Green Hills */}
      <div className="absolute bottom-0 inset-x-0 w-full h-4 sm:h-6 z-20 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full drop-shadow-[0_-2px_3px_rgba(30,25,15,0.1)]"
        >
          <path
            d="M0 22L35 16L72 25L110 15L150 23L195 14L240 24L285 17L330 26L375 15L420 22L465 14L510 25L555 18L600 24L645 15L690 23L735 16L780 26L825 15L870 22L915 14L960 24L1005 17L1050 25L1095 16L1140 23L1185 15L1230 24L1275 17L1320 25L1365 16L1405 22L1440 17V48H0V22Z"
            fill="#FAF6EE"
          />
        </svg>
      </div>
    </section>
  );
}
