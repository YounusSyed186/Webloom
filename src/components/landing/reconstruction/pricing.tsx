'use client';

import React, { useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useApp } from '@/lib/context/app-context';
import { SparkleStar } from './sparkle';
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

const PLANS = [
  {
    id: 'free',
    name: 'Seed · Free',
    tagline: 'Everything you need to carve out your corner of the internet.',
    monthlyPrice: '$0',
    annualPrice: '$0',
    periodLabel: 'forever free',
    ctaLabel: 'Start for free',
    featured: false,
    bgStyle: 'linear-gradient(155deg, #F6EFE2 0%, #EDE2CE 100%)',
    borderColor: '#DCD0BC',
    darkBgStyle: 'linear-gradient(155deg, #212620 0%, #191D18 100%)',
    darkBorderColor: '#363F34',
    tapeRotate: '-rotate-2',
    features: [
      'Personal Webloom page & custom handle',
      'Unlimited links, notes & social profiles',
      'Portfolio & featured projects showcase',
      'Curated editorial & botanical templates',
      'Core visitor & click analytics',
      'Custom vector QR code card',
    ],
  },
  {
    id: 'pro',
    name: 'Creator Pro',
    tagline: 'For builders, writers, and designers who want their own domain and full creative control.',
    monthlyPrice: '$8',
    annualPrice: '$5',
    periodLabel: 'per month',
    ctaLabel: 'Create your Pro space',
    featured: true,
    bgStyle: 'linear-gradient(155deg, #F5E8D3 0%, #EBD7BA 100%)',
    borderColor: '#D6BE9C',
    darkBgStyle: 'linear-gradient(155deg, #2C221A 0%, #211913 100%)',
    darkBorderColor: '#544130',
    tapeRotate: 'rotate-2',
    features: [
      'Everything in Seed Free, plus:',
      'Custom domain support (yourname.com)',
      'Full typography, layout & palette studio',
      'Blog, journal & long-form publishing',
      'Deep referral & conversion analytics',
      'Remove all Webloom branding & badges',
    ],
  },
  {
    id: 'studio',
    name: 'Studio',
    tagline: 'For small studios, collectives, and freelancers managing multiple digital spaces.',
    monthlyPrice: '$19',
    annualPrice: '$14',
    periodLabel: 'per month',
    ctaLabel: 'Start Studio trial',
    featured: false,
    bgStyle: 'linear-gradient(155deg, #EFE7F2 0%, #E4D8E9 100%)',
    borderColor: '#D2C3D8',
    darkBgStyle: 'linear-gradient(155deg, #261F2B 0%, #1C1720 100%)',
    darkBorderColor: '#3F3447',
    tapeRotate: '-rotate-1',
    features: [
      'Everything in Creator Pro, plus:',
      'Up to 5 custom-domain Webloom spaces',
      'Collaborative team editing & roles',
      'Custom CSS & head script injection',
      'Exportable client & traffic reports',
      'Priority human support',
    ],
  },
];

export function PricingReconstructed() {
  const theme = useWebloomTheme();
  const isOverlay = useIsWebloomOverlay();
  const isDark = theme === 'dark';
  const { billingCycle: billing, setBillingCycle: setBilling } = useWebloomSyncState();
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { setAuthModalMode, setIsAuthModalOpen } = useApp();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 105,
    damping: 26,
  });

  const leftTierRotateY = useTransform(smoothScroll, [0.08, 0.45], [10, 0]);
  const rightTierRotateY = useTransform(smoothScroll, [0.08, 0.45], [-10, 0]);
  const centerTierZ = useTransform(smoothScroll, [0.08, 0.48, 0.9], [0, 26, 18]);

  const handleSelectPlan = () => {
    setAuthModalMode('signup');
    setIsAuthModalOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative w-full py-14 sm:py-18 md:py-22 select-none overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <CinematicCameraScene enterRotateX={6.5} exitRotateX={-3.5}>
          {/* Section Header */}
          <motion.div
            initial={isOverlay ? false : { opacity: 0, y: 14, rotateX: 10 }}
            animate={isOverlay ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
            whileInView={isOverlay ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: 'translateZ(20px)' }}
            className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 md:mb-12 relative"
          >
            <SparkleStar className="absolute -top-2 left-6 sm:left-16 w-4 sm:w-5 h-4 sm:h-5 opacity-70 hidden xs:block" />
            <SparkleStar className="absolute top-6 right-6 sm:right-14 w-4 sm:w-5 h-4 sm:h-5 opacity-70 hidden xs:block" />

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
              <span>Simple, honest pricing</span>
            </div>

            <h2
              className={`font-serif text-[34px] sm:text-[42px] md:text-[48px] leading-[1.08] font-normal tracking-tight ${
                isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
              }`}
            >
              Start{' '}
              <span className="relative inline-block italic px-1">
                <span className="relative z-10">free.</span>
                <svg
                  className="absolute -inset-x-1.5 bottom-0.5 top-2.5 w-[calc(100%+12px)] h-[72%] -z-0 pointer-events-none"
                  viewBox="0 0 120 40"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M4 14C28 9 88 7 114 11C118 12 118 22 115 26C112 30 116 34 111 36C82 39 28 39 6 36C2 35 2 22 4 14Z"
                    fill={isDark ? '#A87424' : '#F7DC6F'}
                    fillOpacity={isDark ? '0.68' : '0.88'}
                  />
                </svg>
              </span>{' '}
              Grow when ready.
            </h2>

            <p
              className={`mt-2.5 text-[14.5px] sm:text-[16px] leading-relaxed max-w-md ${
                isDark ? 'text-[#C8BDB0]' : 'text-[#4A4138]'
              }`}
            >
              Build and publish your personal corner for free forever. Upgrade anytime for custom domains and deeper tools.
            </p>

            {/* Tactile Stationery Billing Toggle */}
            <div
              className={`mt-6 inline-flex items-center p-1 rounded-full border shadow-2xs ${
                isDark
                  ? 'bg-[#231D18] border-[#3C3128]'
                  : 'bg-[#EFE6D6] border-[#DCD0BC]'
              }`}
            >
              <button
                type="button"
                onClick={() => setBilling('monthly')}
                className={`px-4 py-1.5 rounded-full text-[12.5px] sm:text-[13px] font-medium transition-all ${
                  billing === 'monthly'
                    ? isDark
                      ? 'bg-[#332A22] text-[#F4EFE6] shadow-xs border border-[#4C3F33]'
                      : 'bg-[#FAF6EE] text-[#1F1A16] shadow-xs border border-[#DFD2BD]'
                    : isDark
                      ? 'text-[#A89B8C] hover:text-[#F4EFE6]'
                      : 'text-[#65594D] hover:text-[#1F1A16]'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling('annual')}
                className={`px-4 py-1.5 rounded-full text-[12.5px] sm:text-[13px] font-medium transition-all flex items-center gap-1.5 ${
                  billing === 'annual'
                    ? isDark
                      ? 'bg-[#332A22] text-[#F4EFE6] shadow-xs border border-[#4C3F33]'
                      : 'bg-[#FAF6EE] text-[#1F1A16] shadow-xs border border-[#DFD2BD]'
                    : isDark
                      ? 'text-[#A89B8C] hover:text-[#F4EFE6]'
                      : 'text-[#65594D] hover:text-[#1F1A16]'
                }`}
              >
                <span>Yearly</span>
                <span
                  className={`text-[10.5px] border px-2 py-0.2 rounded-full font-semibold ${
                    isDark
                      ? 'bg-[#22301F] text-[#B8D8A8] border-[#364D31]'
                      : 'bg-[#DCE5CE] text-[#2D3B22] border-[#C2CFAF]'
                  }`}
                >
                  Save 35%
                </span>
              </button>
            </div>
          </motion.div>

          {/* 3 Handmade Paper Pricing Cards */}
          <motion.div
            initial={isOverlay ? "visible" : "hidden"}
            animate={isOverlay ? "visible" : undefined}
            whileInView={isOverlay ? undefined : "visible"}
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            style={{ transformStyle: 'preserve-3d' }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-7 max-w-5xl mx-auto items-stretch"
          >
            {PLANS.map((plan, idx) => {
              const price =
                billing === 'annual' ? plan.annualPrice : plan.monthlyPrice;

              const dynamic3DStyle = prefersReducedMotion
                ? undefined
                : idx === 0
                  ? { rotateY: leftTierRotateY, transformStyle: 'preserve-3d' as const }
                  : idx === 1
                    ? { z: centerTierZ, transformStyle: 'preserve-3d' as const }
                    : { rotateY: rightTierRotateY, transformStyle: 'preserve-3d' as const };

              return (
                <motion.div
                  key={plan.id}
                  variants={{
                    hidden: { opacity: 0, y: 24, rotateX: 8 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  style={dynamic3DStyle}
                  className="flex"
                >
                  <Tilt3DCard
                    maxTilt={5.5}
                    scaleOnHover={1.018}
                    className={`w-full relative rounded-[16px] p-6 sm:p-7 flex flex-col justify-between ${
                      plan.featured ? 'lg:-translate-y-2' : ''
                    }`}
                    style={{
                      background: isDark ? plan.darkBgStyle : plan.bgStyle,
                      border: `1px solid ${
                        isDark ? plan.darkBorderColor : plan.borderColor
                      }`,
                      boxShadow: isDark
                        ? plan.featured
                          ? '0 22px 44px -8px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 248, 235, 0.08)'
                          : '0 12px 28px -6px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 248, 235, 0.05)'
                        : plan.featured
                          ? '0 22px 44px -8px rgba(38, 28, 18, 0.18), 0 4px 10px -2px rgba(38, 28, 18, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.65)'
                          : '0 10px 24px -6px rgba(38, 28, 18, 0.1), 0 2px 6px -1px rgba(38, 28, 18, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.55)',
                    }}
                  >
                    {/* Top Masking Tape Strip */}
                    <div
                      className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 shadow-2xs border ${
                        isDark
                          ? 'bg-[#9A7E52]/80 border-[#846B43]/50'
                          : 'bg-[#E2C88A]/85 border-[#D4B878]/50'
                      } ${plan.tapeRotate}`}
                    />

                    {/* Perforated Botanical Stamp & 'Most Popular' Badge on Featured Pro Card */}
                    {plan.featured && (
                      <>
                        <div
                          className={`absolute -top-3.5 right-5 text-[10.5px] font-medium tracking-wide px-3 py-0.5 rounded-full shadow-sm ${
                            isDark
                              ? 'bg-[#E6B86A] text-[#181410]'
                              : 'bg-[#181614] text-[#FAF6EE]'
                          }`}
                        >
                          ✦ Most Popular
                        </div>
                        <div
                          className={`hidden sm:flex absolute top-5 right-5 w-11 h-13 p-1 shadow-sm rotate-6 border items-center justify-center pointer-events-none ${
                            isDark
                              ? 'bg-[#2C231C] border-[#4A3B30]'
                              : 'bg-[#FAF3E4] border-[#D9CCB6]'
                          }`}
                          style={{
                            backgroundImage: isDark
                              ? 'radial-gradient(circle, transparent 68%, #4A3B30 70%)'
                              : 'radial-gradient(circle, transparent 68%, #D8CBB4 70%)',
                            backgroundSize: '5px 5px',
                          }}
                        >
                          <div
                            className={`w-full h-full border flex items-center justify-center ${
                              isDark
                                ? 'bg-[#1E1813] border-[#524235]'
                                : 'bg-[#EFE6D5] border-[#C8B9A2]'
                            }`}
                          >
                            <svg className="w-6 h-7" viewBox="0 0 32 36" fill="none">
                              <path d="M16 18V33" stroke="#6E9458" strokeWidth="1.6" strokeLinecap="round" />
                              <circle cx="16" cy="12" r="5" fill="#E3969E" />
                              <circle cx="12" cy="10" r="3.2" fill="#ECA8B0" />
                              <circle cx="20" cy="10" r="3.2" fill="#ECA8B0" />
                              <circle cx="16" cy="12.5" r="2.2" fill="#E6B84C" />
                            </svg>
                          </div>
                        </div>
                      </>
                    )}

                    <div>
                      {/* Card Top Header */}
                      <div className="flex items-center gap-2.5 mb-2">
                        <div
                          className={`w-9 h-9 rounded-lg border flex items-center justify-center shadow-2xs ${
                            isDark
                              ? 'bg-[#181410]/70 border-white/10'
                              : 'bg-[#FAF6EE]/70 border-black/10'
                          }`}
                        >
                          {plan.id === 'free' && (
                            <svg
                              className={`w-6 h-6 fill-none ${
                                isDark ? 'stroke-[#EAE0D2]' : 'stroke-[#2B231D]'
                              }`}
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 22v-9" />
                              <path
                                d="M12 13C8.5 13 6 10.5 6 7c3.5 0 6 2.5 6 6Z"
                                fill={isDark ? '#32462D' : '#DCE5CE'}
                              />
                              <path
                                d="M12 16c3.5 0 6-2.5 6-6-3.5 0-6 2.5-6 6Z"
                                fill={isDark ? '#32462D' : '#DCE5CE'}
                              />
                            </svg>
                          )}
                          {plan.id === 'pro' && (
                            <svg
                              className={`w-6 h-6 fill-none ${
                                isDark ? 'stroke-[#EAE0D2]' : 'stroke-[#2B231D]'
                              }`}
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="3"
                                fill={isDark ? '#E6B86A' : '#F7DC6F'}
                              />
                              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12" />
                            </svg>
                          )}
                          {plan.id === 'studio' && (
                            <svg
                              className={`w-6 h-6 fill-none ${
                                isDark ? 'stroke-[#EAE0D2]' : 'stroke-[#2B231D]'
                              }`}
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                x="3"
                                y="3"
                                width="7.5"
                                height="7.5"
                                rx="1.2"
                                fill={isDark ? '#3D3146' : '#E3D6E7'}
                              />
                              <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.2" />
                              <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.2" />
                              <rect
                                x="13.5"
                                y="13.5"
                                width="7.5"
                                height="7.5"
                                rx="1.2"
                                fill={isDark ? '#3D3146' : '#E3D6E7'}
                              />
                            </svg>
                          )}
                        </div>
                        <h3
                          className={`font-serif font-bold text-[22px] leading-tight ${
                            isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
                          }`}
                        >
                          {plan.name}
                        </h3>
                      </div>

                      <p
                        className={`text-[12.5px] sm:text-[13px] leading-relaxed min-h-[38px] ${
                          isDark ? 'text-[#C8BDB0]' : 'text-[#4E443A]'
                        }`}
                      >
                        {plan.tagline}
                      </p>

                      {/* Animated Price Block */}
                      <div
                        className={`my-5 pb-5 border-b flex items-baseline gap-2 ${
                          isDark ? 'border-white/10' : 'border-[#1F1A16]/12'
                        }`}
                      >
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={price}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18 }}
                            className={`font-serif text-[40px] sm:text-[44px] leading-none font-normal tracking-tight inline-block ${
                              isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
                            }`}
                          >
                            {price}
                          </motion.span>
                        </AnimatePresence>
                        <div
                          className={`flex flex-col text-[11.5px] ${
                            isDark ? 'text-[#B8AEA2]' : 'text-[#5A5044]'
                          }`}
                        >
                          <span className="font-medium">{plan.periodLabel}</span>
                          {plan.id !== 'free' && (
                            <span className="text-[11px] opacity-80">
                              {billing === 'annual' ? 'billed yearly' : 'billed monthly'}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Hand-Drawn Style Checklist Features */}
                      <ul className="space-y-2.5 mb-7">
                        {plan.features.map((feat, i) => (
                          <li
                            key={i}
                            className={`flex items-start gap-2.5 text-[12.5px] sm:text-[13px] leading-snug ${
                              isDark ? 'text-[#E6DDD0]' : 'text-[#2B231D]'
                            }`}
                          >
                            <span
                              className={`inline-flex items-center justify-center w-4 h-4 rounded-[3px] border text-[10px] leading-none shrink-0 mt-0.5 ${
                                plan.featured
                                  ? isDark
                                    ? 'border-[#E6B86A] bg-[#E6B86A]/25 text-[#E6B86A] font-bold'
                                    : 'border-[#3A2E21] bg-[#F7DC6F]/65 text-[#1F1A16] font-bold'
                                  : isDark
                                    ? 'border-[#6E6052] bg-[#181410]/60 text-[#E6DDD0]'
                                    : 'border-[#5E5246] bg-[#FAF6EE]/60 text-[#2B231D]'
                              }`}
                            >
                              ✓
                            </span>
                            <span className={i === 0 && plan.id !== 'free' ? 'font-semibold' : ''}>
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Magnetic Action Button */}
                    <MagneticWrapper strength={0.18} className="w-full">
                      <button
                        type="button"
                        onClick={handleSelectPlan}
                        className={`w-full h-[40px] sm:h-[42px] rounded-full text-[13px] sm:text-[13.5px] font-medium inline-flex items-center justify-center gap-1.5 transition-all hover:scale-[1.01] active:scale-[0.99] ${
                          plan.featured
                            ? isDark
                              ? 'bg-[#F4EFE6] hover:bg-white text-[#181410] shadow-md'
                              : 'bg-[#181614] hover:bg-black text-[#FAF6EE] shadow-md'
                            : isDark
                              ? 'bg-[#181410]/90 hover:bg-[#28211B] text-[#F4EFE6] border border-[#4A3E33] shadow-2xs'
                              : 'bg-[#FAF6EE]/90 hover:bg-white text-[#1F1A16] border border-[#B8AC99] shadow-2xs'
                        }`}
                      >
                        <span>{plan.ctaLabel}</span>
                        <span className="text-[11.5px] font-sans">↗</span>
                      </button>
                    </MagneticWrapper>
                  </Tilt3DCard>
                </motion.div>
              );
            })}
          </motion.div>
        </CinematicCameraScene>
      </div>
    </section>
  );
}
