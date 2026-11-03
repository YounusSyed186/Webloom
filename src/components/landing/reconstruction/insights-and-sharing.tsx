'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tilt3DCard, AnimatedCounter } from './motion-primitives';

const REFERRERS = [
  { source: 'X / Twitter', share: '46%', pct: '82%', color: 'bg-[#5B7A47]' },
  { source: 'GitHub Profile & Repos', share: '28%', pct: '58%', color: 'bg-[#8B7355]' },
  { source: 'LinkedIn & Portfolio', share: '16%', pct: '38%', color: 'bg-[#A68A64]' },
  { source: 'Direct & QR Calling Card', share: '10%', pct: '24%', color: 'bg-[#947E9E]' },
];

const SURFACES = [
  'Instagram Bio',
  'X / Twitter Profile',
  'GitHub README',
  'LinkedIn Header',
  'Email Signature',
  'PDF Resume',
  'Print Calling Card',
  'Event QR Badge',
];

export function InsightsAndSharingReconstructed() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-6 sm:px-8 py-12 md:py-18 select-none">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto mb-10 md:mb-13"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EFE4D4] border border-[#DFD0BC] text-[#4E3E30] text-[11px] sm:text-[12px] font-medium tracking-wide shadow-2xs mb-3">
          <span className="text-[10px] text-[#9C7248]">✦</span>
          <span>Share & understand</span>
        </div>
        <h2 className="font-serif text-[34px] sm:text-[42px] md:text-[46px] leading-[1.08] text-[#1F1A16] font-normal tracking-tight">
          One timeless link.{' '}
          <span className="italic font-normal text-[#3A322A]">Thoughtful insights.</span>
        </h2>
        <p className="mt-2.5 text-[#4A4138] text-[14.5px] sm:text-[15.5px] leading-relaxed">
          Share your space anywhere online or in person—and see what resonates without noisy corporate dashboards.
        </p>
      </motion.div>

      {/* Two-Column Tactile Studio Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 md:gap-8 max-w-5xl mx-auto items-stretch">
        {/* Left Card: Field Journal Analytics Ledger with 3D Tilt & Animated Metrics */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex"
        >
          <Tilt3DCard
            maxTilt={4.5}
            scaleOnHover={1.01}
            className="w-full relative rounded-[16px] p-6 sm:p-7 flex flex-col justify-between"
            style={{
              background: 'linear-gradient(155deg, #F6EFE2 0%, #EDE2CE 100%)',
              border: '1px solid #DCD0BC',
              boxShadow:
                '0 12px 28px -6px rgba(38, 28, 18, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
            }}
          >
            {/* Top Masking Tape */}
            <div className="absolute -top-2.5 left-10 w-14 h-4 bg-[#E0C88B]/85 -rotate-2 shadow-2xs" />

            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#D8CBB8]">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#786D5F] font-medium block">
                    Calm Analytics · Last 30 Days
                  </span>
                  <h3 className="font-serif text-[22px] sm:text-[24px] text-[#1F1A16] font-normal mt-0.5">
                    Know what people actually explore.
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#DCE5CE] border border-[#C2CFAF] text-[#2D3B22] text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4A6838] animate-pulse" />
                  <span>Live</span>
                </span>
              </div>

              {/* 3 KPI Mini Slips with Animated Counters */}
              <div className="grid grid-cols-3 gap-3 my-5">
                <div className="bg-[#FAF6EE]/85 border border-[#E2D6C3] rounded-xl p-3 sm:p-3.5 shadow-2xs">
                  <span className="text-[11px] text-[#6E6254] block">Visitors</span>
                  <span className="font-serif text-[24px] sm:text-[28px] text-[#1F1A16] leading-tight block mt-0.5">
                    <AnimatedCounter value={4820} />
                  </span>
                  <span className="text-[10.5px] text-[#4A6838] font-medium">+14% this week</span>
                </div>
                <div className="bg-[#FAF6EE]/85 border border-[#E2D6C3] rounded-xl p-3 sm:p-3.5 shadow-2xs">
                  <span className="text-[11px] text-[#6E6254] block">Link Clicks</span>
                  <span className="font-serif text-[24px] sm:text-[28px] text-[#1F1A16] leading-tight block mt-0.5">
                    <AnimatedCounter value={1340} />
                  </span>
                  <span className="text-[10.5px] text-[#4A6838] font-medium">+22% clicks</span>
                </div>
                <div className="bg-[#FAF6EE]/85 border border-[#E2D6C3] rounded-xl p-3 sm:p-3.5 shadow-2xs">
                  <span className="text-[11px] text-[#6E6254] block">Engagement</span>
                  <span className="font-serif text-[24px] sm:text-[28px] text-[#1F1A16] leading-tight block mt-0.5">
                    <AnimatedCounter value={27.8} decimals={1} suffix="%" />
                  </span>
                  <span className="text-[10.5px] text-[#786D5F] font-medium">Avg CTR</span>
                </div>
              </div>

              {/* Top Referral Channels with Scroll-Animated Progress Bars */}
              <div className="bg-[#FAF6EE]/75 border border-[#E2D6C3] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#6E6254] font-medium">
                  <span>Top Discovery Channels</span>
                  <span>Share of Visits</span>
                </div>
                {REFERRERS.map((ref, i) => (
                  <div key={ref.source} className="space-y-1">
                    <div className="flex items-center justify-between text-[12.5px] text-[#28211B]">
                      <span className="font-medium">{ref.source}</span>
                      <span className="font-serif font-semibold">{ref.share}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#EAE0CE] overflow-hidden">
                      <motion.div
                        initial={{ width: '12%' }}
                        whileInView={{ width: ref.pct }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.85, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className={`h-full rounded-full ${ref.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11.5px] text-[#6E6254] mt-4 italic font-serif">
              ✦ Privacy-first by design — no invasive cookies or third-party ad trackers.
            </p>
          </Tilt3DCard>
        </motion.div>

        {/* Right Card: Personal Calling Card, Vector QR Pass & Distribution Surfaces */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex"
        >
          <Tilt3DCard
            maxTilt={5}
            scaleOnHover={1.012}
            className="w-full relative rounded-[16px] p-6 sm:p-7 flex flex-col justify-between"
            style={{
              background: 'linear-gradient(155deg, #F5E8D3 0%, #EBD8BE 100%)',
              border: '1px solid #D8C2A3',
              boxShadow:
                '0 12px 28px -6px rgba(38, 28, 18, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
            }}
          >
            {/* Top Masking Tape */}
            <div className="absolute -top-2.5 right-12 w-14 h-4 bg-[#E0C88B]/85 rotate-2 shadow-2xs" />

            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#786D5F] font-medium block">
                Everywhere You Are
              </span>
              <h3 className="font-serif text-[22px] sm:text-[24px] text-[#1F1A16] font-normal mt-0.5 mb-4">
                Your personal calling card.
              </h3>

              {/* Tactile Calling Card & Vector QR Pass */}
              <div
                style={{ transform: 'translateZ(14px)' }}
                className="bg-[#FAF6EE] border border-[#DCD0BC] rounded-xl p-4 shadow-sm flex items-center justify-between gap-4 mb-5"
              >
                <div className="space-y-1 min-w-0">
                  <div className="inline-flex items-center gap-1 text-[10.5px] text-[#786D5F] font-serif">
                    <span>✿</span>
                    <span>Permanent Address</span>
                  </div>
                  <div className="font-serif font-bold text-[17px] sm:text-[18px] text-[#1F1A16] truncate">
                    webloom.me/ayaan
                  </div>
                  <p className="text-[11.5px] text-[#5E5246]">
                    Includes high-res vector QR card
                  </p>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE6D5] hover:bg-[#E5D8C1] border border-[#D4C5AE] text-[11px] font-medium text-[#28211B] transition-all hover:scale-105"
                  >
                    <span>{copied ? '✓ Copied link' : 'Copy personal link'}</span>
                  </button>
                </div>

                {/* Stylized Vector QR Code Stamp */}
                <motion.div
                  whileHover={{ rotate: 4, scale: 1.06 }}
                  className="w-20 h-20 rounded-lg bg-[#F5EFE2] border border-[#D8CBB8] p-2 shrink-0 flex items-center justify-center shadow-2xs"
                >
                  <svg className="w-full h-full fill-[#1F1A16]" viewBox="0 0 36 36">
                    <path d="M2 2h10v10H2V2zm2 2v6h6V4H4zm2 2h2v2H6V6zm18-4h10v10H24V2zm2 2v6h6V4h-6zm2 2h2v2h-2V6zM2 24h10v10H2V24zm2 2v6h6v-6H4zm2 2h2v2H6v-2zm10-24h2v4h-2V4zm4 2h2v4h-2V6zm-4 6h4v2h-4v-2zm-2 4h4v2h-4v-2zm6 0h2v4h-2v-4zm-12 2h2v2H12v-2zm14 4h4v2h-4v-2zm4 2h4v4h-4v-4zm-8 2h2v6h-2v-6zm4 4h4v4h-4v-4zm6 0h2v4h-2v-4z" />
                  </svg>
                </motion.div>
              </div>

              {/* Where Creators Place Their Webloom */}
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#6E6254] font-medium block mb-2.5">
                  Where creators place their Webloom
                </span>
                <div className="flex flex-wrap gap-2">
                  {SURFACES.map((surface) => (
                    <motion.span
                      key={surface}
                      whileHover={{ y: -2, scale: 1.04 }}
                      className="px-3 py-1 rounded-full bg-[#FAF6EE]/80 border border-[#D8C9B2] text-[12px] text-[#2B231D] font-normal shadow-2xs cursor-default"
                    >
                      {surface}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-[11.5px] text-[#6E6254] mt-4 italic font-serif">
              ✦ Update your page anytime—your shared link & QR code stay the same forever.
            </p>
          </Tilt3DCard>
        </motion.div>
      </div>
    </section>
  );
}
