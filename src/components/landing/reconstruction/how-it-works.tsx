'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tilt3DCard, MagneticWrapper } from './motion-primitives';
import { useApp } from '@/lib/context/app-context';

const STEPS = [
  {
    num: '01',
    title: 'Claim your corner',
    desc: 'Pick your personal handle (webloom.me/you) or connect your own custom domain in seconds.',
    bg: '/generated/card-sage-hd.png',
    rotate: '-rotate-1',
    badge: 'Takes 15 seconds',
    icon: (
      <svg className="w-7 h-7 stroke-[#28211B] fill-none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M3.6 9h16.8M3.6 15h16.8" />
        <path d="M11.5 3a17 17 0 0 0 0 18M12.5 3a17 17 0 0 1 0 18" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Arrange your world',
    desc: 'Drop in your projects, writing, links, photos, and reading lists using tactile modular blocks.',
    bg: '/generated/card-peach-hd.png',
    rotate: 'rotate-1',
    badge: 'Zero code needed',
    icon: (
      <svg className="w-7 h-7 stroke-[#28211B] fill-none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" rx="1.2" />
        <rect x="14" y="3" width="7" height="5" rx="1.2" />
        <rect x="14" y="12" width="7" height="9" rx="1.2" />
        <rect x="3" y="16" width="7" height="5" rx="1.2" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Share & watch it bloom',
    desc: 'Place one timeless link in your bio, resume, and email signature—and see what visitors love most.',
    bg: '/generated/card-lavender-hd.png',
    rotate: '-rotate-1',
    badge: 'Live instantly',
    icon: (
      <svg className="w-7 h-7 stroke-[#28211B] fill-none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22v-8" />
        <path d="M12 14C8.5 14 6 11.5 6 8c3.5 0 6 2.5 6 6Z" />
        <path d="M12 16c3.5 0 6-2.5 6-6-3.5 0-6 2.5-6 6Z" />
        <circle cx="12" cy="5" r="2" />
      </svg>
    ),
  },
];

export function HowItWorksReconstructed() {
  const [handle, setHandle] = useState('ayaan');
  const { setAuthModalMode, setIsAuthModalOpen } = useApp();

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthModalMode('signup');
    setIsAuthModalOpen(true);
  };

  return (
    <section className="relative w-full max-w-6xl mx-auto px-6 sm:px-8 py-12 md:py-16 select-none">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto mb-9 md:mb-12"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EFE4D4] border border-[#DFD0BC] text-[#4E3E30] text-[11px] sm:text-[12px] font-medium tracking-wide shadow-2xs mb-3">
          <span className="text-[10px] text-[#9C7248]">✦</span>
          <span>Effortless setup</span>
        </div>
        <h2 className="font-serif text-[34px] sm:text-[42px] md:text-[46px] leading-[1.08] text-[#1F1A16] font-normal tracking-tight">
          From blank page to blooming space{' '}
          <span className="italic font-normal text-[#3A322A]">in minutes.</span>
        </h2>
      </motion.div>

      {/* Interactive Handle Claim Bar (Stationery Slip Style) */}
      <motion.form
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.08 }}
        onSubmit={handleClaim}
        className="max-w-lg mx-auto mb-10 md:mb-12 p-1.5 pl-4 rounded-full bg-[#F6EFE2] border border-[#DACBB4] shadow-[0_6px_20px_rgba(38,28,18,0.08)] flex items-center justify-between gap-2"
      >
        <div className="flex items-center gap-0.5 text-[13.5px] sm:text-[14.5px] flex-1 min-w-0">
          <span className="text-[#786D5F] font-serif shrink-0">✿ webloom.me/</span>
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="yourname"
            aria-label="Choose your Webloom handle"
            className="bg-transparent text-[#1F1A16] font-semibold focus:outline-none w-full truncate"
          />
        </div>
        <MagneticWrapper strength={0.2}>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 bg-[#181614] hover:bg-black text-[#FAF6EE] h-[36px] sm:h-[38px] px-4.5 sm:px-5.5 rounded-full text-[12px] sm:text-[13px] font-medium shrink-0 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Claim handle</span>
            <span className="text-[11px] font-sans">↗</span>
          </button>
        </MagneticWrapper>
      </motion.form>

      {/* 3 Handmade Deckle-Edge Step Cards with 3D Perspective Tilt */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 max-w-5xl mx-auto relative"
      >
        {STEPS.map((step, idx) => (
          <motion.div
            key={step.num}
            variants={{
              hidden: { opacity: 0, y: 24, rotateX: 10 },
              visible: {
                opacity: 1,
                y: 0,
                rotateX: 0,
                transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="relative"
          >
            <Tilt3DCard
              maxTilt={8}
              scaleOnHover={1.025}
              className={`relative aspect-[600/460] w-full max-w-[310px] mx-auto flex flex-col items-center justify-center text-center p-7 cursor-pointer ${step.rotate}`}
            >
              {/* Top Masking Tape */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-[#E0C88B]/85 rotate-1 z-20 shadow-2xs" />

              {/* High-Res Handmade Cotton-Rag Deckle-Edge Card Texture */}
              <img
                src={step.bg}
                alt={step.title}
                className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_8px_18px_rgba(38,28,18,0.09)]"
              />

              {/* Step Number Pill & Icon */}
              <div
                style={{ transform: 'translateZ(16px)' }}
                className="relative z-10 flex items-center gap-2 mb-2"
              >
                <span className="font-serif italic text-[14px] px-2.5 py-0.5 rounded-full bg-[#FAF6EE]/80 border border-[#D5C8B4] text-[#4E3E30] font-medium">
                  Step {step.num}
                </span>
                <span className="text-[11px] text-[#5E5246] bg-[#FAF6EE]/60 px-2 py-0.5 rounded-full border border-black/5">
                  {step.badge}
                </span>
              </div>

              <div
                style={{ transform: 'translateZ(20px)' }}
                className="relative z-10 my-1 opacity-90"
              >
                {step.icon}
              </div>

              <h3
                style={{ transform: 'translateZ(14px)' }}
                className="relative z-10 font-serif font-bold text-[20px] sm:text-[21px] text-[#1F1A16] leading-snug mt-0.5"
              >
                {step.title}
              </h3>

              <p
                style={{ transform: 'translateZ(10px)' }}
                className="relative z-10 text-[12.5px] sm:text-[13px] leading-relaxed text-[#4A4036] mt-1.5 max-w-[220px]"
              >
                {step.desc}
              </p>
            </Tilt3DCard>

            {/* Subtle curved connector arrow between cards on desktop */}
            {idx < 2 && (
              <div className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 z-30 text-[#9C8E7B] pointer-events-none">
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
    </section>
  );
}
