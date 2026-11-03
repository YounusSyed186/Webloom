'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Tilt3DCard } from './motion-primitives';

const CARDS = [
  {
    title: 'Portfolio',
    desc: 'Showcase your work beautifully.',
    bg: '/generated/card-sage-hd.png',
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9 stroke-[#28211B] fill-none mb-1.5" viewBox="0 0 32 26" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="3" width="22" height="15" rx="1.5" />
        <rect x="7" y="5" width="18" height="11" rx="0.5" strokeWidth="1" />
        <path d="M2 20h28l-2 2.5H4L2 20Z" />
      </svg>
    ),
  },
  {
    title: 'Blog / Journal',
    desc: 'Share ideas, learnings, and stories.',
    bg: '/generated/card-peach-hd.png',
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9 stroke-[#28211B] fill-none mb-1.5" viewBox="0 0 32 26" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 5.5C13 4 8.5 3.8 4.5 5v15.5c4-1.2 8.5-1 11.5 0.5 3-1.5 7.5-1.7 11.5-0.5V5c-4-1.2-8.5-1-11.5 0.5Z" />
        <path d="M16 5.5v15.5" />
        <path d="M7.5 9h5M7.5 12h5M7.5 15h4" strokeWidth="1.15" />
        <path d="M19.5 9h5M19.5 12h5M19.5 15h4" strokeWidth="1.15" />
      </svg>
    ),
  },
  {
    title: 'Link in Bio',
    desc: 'A simple, elegant home for your links.',
    bg: '/generated/card-lavender-hd.png',
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9 stroke-[#28211B] fill-none mb-1.5" viewBox="0 0 28 26" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11.5 14.5a5 5 0 0 0 7.07 0l3.5-3.5a5 5 0 0 0-7.07-7.07l-1.75 1.75" />
        <path d="M16.5 11.5a5 5 0 0 0-7.07 0l-3.5 3.5a5 5 0 0 0 7.07 7.07l1.75-1.75" />
        <path d="M22 2l1.5-1M24 5l1.8-.3M4 21l-1.5 1" strokeWidth="1.1" />
      </svg>
    ),
  },
  {
    title: 'Personal Website',
    desc: 'Build a fully customized space, your way.',
    bg: '/generated/card-sand-hd.png',
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9 stroke-[#28211B] fill-none mb-1.5" viewBox="0 0 28 26" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3.5" width="8.5" height="19" rx="1.2" />
        <rect x="15.5" y="3.5" width="8.5" height="8.5" rx="1.2" />
        <rect x="15.5" y="14" width="8.5" height="8.5" rx="1.2" />
      </svg>
    ),
  },
];

export function WhatYouCanBuildReconstructed() {
  return (
    <section id="product" className="relative w-full max-w-6xl mx-auto px-6 sm:px-8 pt-6 pb-10 md:pt-8 md:pb-14 select-none">
      {/* Authentic Multi-Layered Coastal Polaroid + Botanical Flower Sketch Collage on Left with Interactive Fan-Out */}
      <motion.div
        initial={{ opacity: 0, x: -20, rotate: -4 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block absolute left-3 xl:left-0 top-0 w-[235px] h-[205px] z-10 group"
      >
        {/* Back Lined Note Card (Left) */}
        <motion.div
          whileHover={{ rotate: -16, x: -6 }}
          className="absolute top-11 left-0 w-[98px] h-[122px] bg-[#F4EAD9] border border-[#DDD0BA] shadow-sm -rotate-12 p-3 flex flex-col gap-2.5 transition-transform duration-300"
        >
          <div className="w-full h-px bg-[#D5C5AD]" />
          <div className="w-4/5 h-px bg-[#D5C5AD]" />
          <div className="w-full h-px bg-[#D5C5AD]" />
          <div className="w-3/4 h-px bg-[#D5C5AD]" />
          <div className="w-5/6 h-px bg-[#D5C5AD]" />
        </motion.div>

        {/* Right Botanical Line-Art Sketch Card */}
        <motion.div
          whileHover={{ rotate: 16, x: 8, y: -4 }}
          className="absolute top-7 right-1 w-[110px] h-[132px] bg-[#F5ECE0] border border-[#DFD2BD] shadow-[0_6px_16px_rgba(35,25,15,0.1)] rotate-12 flex items-center justify-center p-2 cursor-pointer"
        >
          {/* Golden Masking Tape Strip */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3.5 bg-[#E0BE6E]/90 rotate-6 shadow-2xs" />
          {/* Hand-drawn Botanical Cosmos Flower SVG */}
          <svg className="w-16 h-20 stroke-[#382E26] fill-none" viewBox="0 0 64 80" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
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
          whileHover={{ scale: 1.06, rotate: -3, y: -4 }}
          className="absolute top-2 left-5 w-[134px] bg-[#FCF9F2] p-2 pb-5 shadow-[0_10px_24px_rgba(30,22,14,0.16)] border border-[#E2D8C5] -rotate-8 cursor-pointer"
          style={{
            backgroundImage:
              'radial-gradient(circle, transparent 72%, #E2D8C5 74%)',
            backgroundSize: '8px 8px',
          }}
        >
          {/* Top Masking Tape */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3.5 bg-[#DCCBA9]/85 -rotate-3 shadow-2xs" />
          <div className="w-full aspect-[4/3.5] overflow-hidden bg-[#D5CFC2] border border-[#EAE2D3]">
            <img
              src="/generated/photo-coastal.jpg"
              alt="Mediterranean coastal village polaroid"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto mb-7 md:mb-9 relative z-20"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EFE4D4] border border-[#DFD0BC] text-[#4E3E30] text-[11px] sm:text-[12px] font-medium tracking-wide shadow-2xs mb-2.5">
          <span className="text-[10px] text-[#9C7248]">✦</span>
          <span>What you can build</span>
        </div>
        <h2 className="font-serif text-[36px] sm:text-[44px] md:text-[48px] leading-[1.06] text-[#1F1A16] font-normal tracking-tight">
          More than a website.
        </h2>
        <p className="font-serif italic text-[20px] sm:text-[24px] md:text-[26px] text-[#3A322A] mt-0.5">
          A space for everything you do.
        </p>
      </motion.div>

      {/* 4 High-Resolution Handmade Cotton-Rag Torn/Deckle-Edge Feature Cards with 3D Perspective Tilt */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto relative z-20"
      >
        {CARDS.map((card, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 22, rotateX: 12 },
              visible: {
                opacity: 1,
                y: 0,
                rotateX: 0,
                transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            <Tilt3DCard
              maxTilt={9}
              scaleOnHover={1.03}
              className="group relative aspect-[600/460] w-full max-w-[260px] mx-auto flex flex-col items-center justify-center text-center p-6 cursor-pointer"
            >
              {/* High-Resolution Handmade Cotton-Rag Deckle-Edge Card Texture */}
              <img
                src={card.bg}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_6px_14px_rgba(38,28,18,0.08)]"
              />

              {/* Crisp Vector Line Icon elevated in Z-space */}
              <div
                style={{ transform: 'translateZ(20px)' }}
                className="relative z-10 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
              >
                {card.icon}
              </div>

              {/* Card Title */}
              <h3
                style={{ transform: 'translateZ(14px)' }}
                className="relative z-10 font-serif font-bold text-[18px] sm:text-[19.5px] text-[#1F1A16] leading-snug"
              >
                {card.title}
              </h3>

              {/* Card Description */}
              <p
                style={{ transform: 'translateZ(10px)' }}
                className="relative z-10 text-[12px] sm:text-[12.5px] leading-snug text-[#4A4036] mt-1 font-normal max-w-[175px]"
              >
                {card.desc}
              </p>
            </Tilt3DCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
