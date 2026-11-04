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
  AnimatedCounter,
  CinematicCameraScene,
} from './motion-primitives';
import {
  useWebloomTheme,
  useWebloomSyncState,
  useIsWebloomOverlay,
} from './webloom-dual-theme-context';

const REFERRERS = [
  { source: 'X / Twitter', share: '46%', pct: '82%', color: 'bg-[#5B7A47]', darkColor: 'bg-[#7DA365]' },
  { source: 'GitHub Profile & Repos', share: '28%', pct: '58%', color: 'bg-[#8B7355]', darkColor: 'bg-[#C89D54]' },
  { source: 'LinkedIn & Portfolio', share: '16%', pct: '38%', color: 'bg-[#A68A64]', darkColor: 'bg-[#B8976C]' },
  { source: 'Direct & QR Calling Card', share: '10%', pct: '24%', color: 'bg-[#947E9E]', darkColor: 'bg-[#A68EB2]' },
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
  const theme = useWebloomTheme();
  const isOverlay = useIsWebloomOverlay();
  const isDark = theme === 'dark';
  const { copiedLink, triggerCopyLink } = useWebloomSyncState();
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

  const leftCardRotateY = useTransform(smoothScroll, [0.08, 0.42, 0.72, 0.98], [10, 0, 0, -6]);
  const rightCardRotateY = useTransform(smoothScroll, [0.08, 0.42, 0.72, 0.98], [-10, 0, 0, 6]);
  const leftCardX = useTransform(smoothScroll, [0.08, 0.42, 0.72, 0.98], [-16, 0, 0, -34]);
  const rightCardX = useTransform(smoothScroll, [0.08, 0.42, 0.72, 0.98], [16, 0, 0, 34]);
  const leftCardZ = useTransform(smoothScroll, [0.08, 0.45, 0.95], [24, 20, 8]);
  const rightCardZ = useTransform(smoothScroll, [0.08, 0.48, 0.95], [-22, 18, 12]);

  return (
    <section
      ref={sectionRef}
      id="insights-ledger"
      className="w-full max-w-6xl mx-auto px-6 sm:px-8 py-12 md:py-18 select-none"
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
          className="text-center max-w-2xl mx-auto mb-10 md:mb-13"
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
            <span>Share & understand</span>
          </div>
          <h2
            className={`font-serif text-[34px] sm:text-[42px] md:text-[46px] leading-[1.08] font-normal tracking-tight ${
              isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
            }`}
          >
            One timeless link.{' '}
            <span
              className={`italic font-normal ${
                isDark ? 'text-[#D6C9B8]' : 'text-[#3A322A]'
              }`}
            >
              Thoughtful insights.
            </span>
          </h2>
          <p
            className={`mt-2.5 text-[14.5px] sm:text-[15.5px] leading-relaxed ${
              isDark ? 'text-[#C8BDB0]' : 'text-[#4A4138]'
            }`}
          >
            Share your space anywhere online or in person—and see what resonates without noisy corporate dashboards.
          </p>
        </motion.div>

        {/* Two-Column 3D Converging Tactile Studio Showcase */}
        <div
          style={{ transformStyle: 'preserve-3d' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-7 md:gap-8 max-w-5xl mx-auto items-stretch"
        >
          {/* Left Card: Field Journal Analytics Ledger */}
          <motion.div
            initial={isOverlay ? false : { opacity: 0, x: -20 }}
            animate={isOverlay ? { opacity: 1, x: 0 } : undefined}
            whileInView={isOverlay ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={
              prefersReducedMotion
                ? undefined
                : {
                    rotateY: leftCardRotateY,
                    x: leftCardX,
                    z: leftCardZ,
                    transformStyle: 'preserve-3d',
                  }
            }
            className="lg:col-span-7 flex"
          >
            <Tilt3DCard
              maxTilt={5}
              scaleOnHover={1.012}
              className="w-full relative rounded-[16px] p-6 sm:p-7 flex flex-col justify-between"
              style={{
                background: isDark
                  ? 'linear-gradient(155deg, #251F1A 0%, #1C1713 100%)'
                  : 'linear-gradient(155deg, #F6EFE2 0%, #EDE2CE 100%)',
                border: isDark ? '1px solid #3D3228' : '1px solid #DCD0BC',
                boxShadow: isDark
                  ? '0 16px 36px -6px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 248, 235, 0.06)'
                  : '0 14px 32px -6px rgba(38, 28, 18, 0.11), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
              }}
            >
              {/* Top Masking Tape */}
              <div
                className={`absolute -top-2.5 left-10 w-14 h-4 -rotate-2 shadow-2xs ${
                  isDark ? 'bg-[#9A7E52]/80' : 'bg-[#E0C88B]/85'
                }`}
              />

              <div>
                {/* Card Header */}
                <div
                  className={`flex items-center justify-between pb-4 border-b ${
                    isDark ? 'border-[#3A3027]' : 'border-[#D8CBB8]'
                  }`}
                >
                  <div>
                    <span
                      className={`text-[11px] uppercase tracking-wider font-medium block ${
                        isDark ? 'text-[#A89B8C]' : 'text-[#786D5F]'
                      }`}
                    >
                      Calm Analytics · Last 30 Days
                    </span>
                    <h3
                      className={`font-serif text-[22px] sm:text-[24px] font-normal mt-0.5 ${
                        isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
                      }`}
                    >
                      Know what people actually explore.
                    </h3>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium ${
                      isDark
                        ? 'bg-[#22301F] border-[#364D31] text-[#B8D8A8]'
                        : 'bg-[#DCE5CE] border-[#C2CFAF] text-[#2D3B22]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                        isDark ? 'bg-[#86B86A]' : 'bg-[#4A6838]'
                      }`}
                    />
                    <span>Live</span>
                  </span>
                </div>

                {/* 3 KPI Mini Slips */}
                <div
                  style={{ transform: 'translateZ(14px)' }}
                  className="grid grid-cols-3 gap-3 my-5"
                >
                  <div
                    className={`border rounded-xl p-3 sm:p-3.5 shadow-2xs ${
                      isDark
                        ? 'bg-[#181410]/85 border-[#362C23]'
                        : 'bg-[#FAF6EE]/85 border-[#E2D6C3]'
                    }`}
                  >
                    <span
                      className={`text-[11px] block ${
                        isDark ? 'text-[#A89B8C]' : 'text-[#6E6254]'
                      }`}
                    >
                      Visitors
                    </span>
                    <span
                      className={`font-serif text-[24px] sm:text-[28px] leading-tight block mt-0.5 ${
                        isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
                      }`}
                    >
                      <AnimatedCounter value={4820} />
                    </span>
                    <span
                      className={`text-[10.5px] font-medium ${
                        isDark ? 'text-[#86B86A]' : 'text-[#4A6838]'
                      }`}
                    >
                      +14% this week
                    </span>
                  </div>
                  <div
                    className={`border rounded-xl p-3 sm:p-3.5 shadow-2xs ${
                      isDark
                        ? 'bg-[#181410]/85 border-[#362C23]'
                        : 'bg-[#FAF6EE]/85 border-[#E2D6C3]'
                    }`}
                  >
                    <span
                      className={`text-[11px] block ${
                        isDark ? 'text-[#A89B8C]' : 'text-[#6E6254]'
                      }`}
                    >
                      Link Clicks
                    </span>
                    <span
                      className={`font-serif text-[24px] sm:text-[28px] leading-tight block mt-0.5 ${
                        isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
                      }`}
                    >
                      <AnimatedCounter value={1340} />
                    </span>
                    <span
                      className={`text-[10.5px] font-medium ${
                        isDark ? 'text-[#86B86A]' : 'text-[#4A6838]'
                      }`}
                    >
                      +22% clicks
                    </span>
                  </div>
                  <div
                    className={`border rounded-xl p-3 sm:p-3.5 shadow-2xs ${
                      isDark
                        ? 'bg-[#181410]/85 border-[#362C23]'
                        : 'bg-[#FAF6EE]/85 border-[#E2D6C3]'
                    }`}
                  >
                    <span
                      className={`text-[11px] block ${
                        isDark ? 'text-[#A89B8C]' : 'text-[#6E6254]'
                      }`}
                    >
                      Engagement
                    </span>
                    <span
                      className={`font-serif text-[24px] sm:text-[28px] leading-tight block mt-0.5 ${
                        isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
                      }`}
                    >
                      <AnimatedCounter value={27.8} decimals={1} suffix="%" />
                    </span>
                    <span
                      className={`text-[10.5px] font-medium ${
                        isDark ? 'text-[#A89B8C]' : 'text-[#786D5F]'
                      }`}
                    >
                      Avg CTR
                    </span>
                  </div>
                </div>

                {/* Top Referral Channels */}
                <div
                  style={{ transform: 'translateZ(10px)' }}
                  className={`border rounded-xl p-4 space-y-3 ${
                    isDark
                      ? 'bg-[#181410]/75 border-[#362C23]'
                      : 'bg-[#FAF6EE]/75 border-[#E2D6C3]'
                  }`}
                >
                  <div
                    className={`flex items-center justify-between text-[11px] uppercase tracking-wider font-medium ${
                      isDark ? 'text-[#A89B8C]' : 'text-[#6E6254]'
                    }`}
                  >
                    <span>Top Discovery Channels</span>
                    <span>Share of Visits</span>
                  </div>
                  {REFERRERS.map((ref, i) => (
                    <div key={ref.source} className="space-y-1">
                      <div
                        className={`flex items-center justify-between text-[12.5px] ${
                          isDark ? 'text-[#EAE0D2]' : 'text-[#28211B]'
                        }`}
                      >
                        <span className="font-medium">{ref.source}</span>
                        <span className="font-serif font-semibold">{ref.share}</span>
                      </div>
                      <div
                        className={`w-full h-2 rounded-full overflow-hidden ${
                          isDark ? 'bg-[#2C241D]' : 'bg-[#EAE0CE]'
                        }`}
                      >
                        <motion.div
                          initial={{ width: '12%' }}
                          whileInView={{ width: ref.pct }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.85, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                          className={`h-full rounded-full ${
                            isDark ? ref.darkColor : ref.color
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p
                className={`text-[11.5px] mt-4 italic font-serif ${
                  isDark ? 'text-[#A89B8C]' : 'text-[#6E6254]'
                }`}
              >
                ✦ Privacy-first by design — no invasive cookies or third-party ad trackers.
              </p>
            </Tilt3DCard>
          </motion.div>

          {/* Right Card: Personal Calling Card, Vector QR Pass & Distribution Surfaces */}
          <motion.div
            initial={isOverlay ? false : { opacity: 0, x: 20 }}
            animate={isOverlay ? { opacity: 1, x: 0 } : undefined}
            whileInView={isOverlay ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={
              prefersReducedMotion
                ? undefined
                : {
                    rotateY: rightCardRotateY,
                    x: rightCardX,
                    z: rightCardZ,
                    transformStyle: 'preserve-3d',
                  }
            }
            className="lg:col-span-5 flex"
          >
            <Tilt3DCard
              maxTilt={5.5}
              scaleOnHover={1.014}
              className="w-full relative rounded-[16px] p-6 sm:p-7 flex flex-col justify-between"
              style={{
                background: isDark
                  ? 'linear-gradient(155deg, #2A2019 0%, #1F1813 100%)'
                  : 'linear-gradient(155deg, #F5E8D3 0%, #EBD8BE 100%)',
                border: isDark ? '1px solid #44352A' : '1px solid #D8C2A3',
                boxShadow: isDark
                  ? '0 16px 36px -6px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 248, 235, 0.06)'
                  : '0 14px 32px -6px rgba(38, 28, 18, 0.11), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
              }}
            >
              {/* Top Masking Tape */}
              <div
                className={`absolute -top-2.5 right-12 w-14 h-4 rotate-2 shadow-2xs ${
                  isDark ? 'bg-[#9A7E52]/80' : 'bg-[#E0C88B]/85'
                }`}
              />

              <div>
                <span
                  className={`text-[11px] uppercase tracking-wider font-medium block ${
                    isDark ? 'text-[#A89B8C]' : 'text-[#786D5F]'
                  }`}
                >
                  Everywhere You Are
                </span>
                <h3
                  className={`font-serif text-[22px] sm:text-[24px] font-normal mt-0.5 mb-4 ${
                    isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
                  }`}
                >
                  Your personal calling card.
                </h3>

                {/* Tactile Calling Card & Vector QR Pass */}
                <div
                  style={{ transform: 'translateZ(18px)' }}
                  className={`border rounded-xl p-4 shadow-sm flex items-center justify-between gap-4 mb-5 ${
                    isDark
                      ? 'bg-[#181410] border-[#3B2F25]'
                      : 'bg-[#FAF6EE] border-[#DCD0BC]'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div
                      className={`inline-flex items-center gap-1 text-[10.5px] font-serif ${
                        isDark ? 'text-[#C89D54]' : 'text-[#786D5F]'
                      }`}
                    >
                      <span>✿</span>
                      <span>Permanent Address</span>
                    </div>
                    <div
                      className={`font-serif font-bold text-[17px] sm:text-[18px] truncate ${
                        isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
                      }`}
                    >
                      webloom.me/ayaan
                    </div>
                    <p
                      className={`text-[11.5px] ${
                        isDark ? 'text-[#B8AEA2]' : 'text-[#5E5246]'
                      }`}
                    >
                      Includes high-res vector QR card
                    </p>
                    <button
                      type="button"
                      onClick={triggerCopyLink}
                      className={`mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-medium transition-all hover:scale-105 ${
                        isDark
                          ? 'bg-[#2C231C] hover:bg-[#382D24] border-[#4A3B30] text-[#F4EFE6]'
                          : 'bg-[#EFE6D5] hover:bg-[#E5D8C1] border-[#D4C5AE] text-[#28211B]'
                      }`}
                    >
                      <span>{copiedLink ? '✓ Copied link' : 'Copy personal link'}</span>
                    </button>
                  </div>

                  {/* Stylized Vector QR Code Stamp */}
                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : {
                            rotateY: [-10, 10, -10],
                            rotateZ: [-1.5, 1.5, -1.5],
                            y: [0, -2, 0],
                          }
                    }
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    whileHover={{ rotate: 4, scale: 1.08 }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className={`w-20 h-20 rounded-lg border p-2 shrink-0 flex items-center justify-center shadow-2xs ${
                      isDark
                        ? 'bg-[#251E18] border-[#42352B]'
                        : 'bg-[#F5EFE2] border-[#D8CBB8]'
                    }`}
                  >
                    <svg
                      className={`w-full h-full ${
                        isDark ? 'fill-[#F4EFE6]' : 'fill-[#1F1A16]'
                      }`}
                      viewBox="0 0 36 36"
                    >
                      <path d="M2 2h10v10H2V2zm2 2v6h6V4H4zm2 2h2v2H6V6zm18-4h10v10H24V2zm2 2v6h6V4h-6zm2 2h2v2h-2V6zM2 24h10v10H2V24zm2 2v6h6v-6H4zm2 2h2v2H6v-2zm10-24h2v4h-2V4zm4 2h2v4h-2V6zm-4 6h4v2h-4v-2zm-2 4h4v2h-4v-2zm6 0h2v4h-2v-4zm-12 2h2v2H12v-2zm14 4h4v2h-4v-2zm4 2h4v4h-4v-4zm-8 2h2v6h-2v-6zm4 4h4v4h-4v-4zm6 0h2v4h-2v-4z" />
                    </svg>
                  </motion.div>
                </div>

                {/* Where Creators Place Their Webloom */}
                <div style={{ transform: 'translateZ(10px)' }}>
                  <span
                    className={`text-[11px] uppercase tracking-wider font-medium block mb-2.5 ${
                      isDark ? 'text-[#A89B8C]' : 'text-[#6E6254]'
                    }`}
                  >
                    Where creators place their Webloom
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {SURFACES.map((surface) => (
                      <motion.span
                        key={surface}
                        whileHover={{ y: -2, scale: 1.04 }}
                        className={`px-3 py-1 rounded-full border text-[12px] font-normal shadow-2xs cursor-default ${
                          isDark
                            ? 'bg-[#1A1512]/85 border-[#3E3228] text-[#E6DDD0]'
                            : 'bg-[#FAF6EE]/80 border-[#D8C9B2] text-[#2B231D]'
                        }`}
                      >
                        {surface}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              <p
                className={`text-[11.5px] mt-4 italic font-serif ${
                  isDark ? 'text-[#A89B8C]' : 'text-[#6E6254]'
                }`}
              >
                ✦ Update your page anytime—your shared link & QR code stay the same forever.
              </p>
            </Tilt3DCard>
          </motion.div>
        </div>
      </CinematicCameraScene>
    </section>
  );
}
