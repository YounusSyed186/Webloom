'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { useApp } from '@/lib/context/app-context';

const FAQS = [
  {
    q: 'What makes Webloom different from a traditional link-in-bio?',
    a: 'Traditional link-in-bio tools give you a sterile list of buttons. Webloom gives you a warm, personal corner of the internet where your portfolio projects, writing, links, and visual identity live together like a thoughtfully crafted website.',
  },
  {
    q: 'Do I need any design or coding experience?',
    a: 'Not at all. Every Webloom template is designed with balanced typography, warm palettes, and responsive layouts out of the box. You simply add your content and customize colors or fonts with a click.',
  },
  {
    q: 'Can I connect my own custom domain?',
    a: 'Yes! You can start with a free webloom.me/yourname address and connect your own custom domain (like yourname.com or studio.co) anytime on Creator Pro or Studio.',
  },
  {
    q: 'Can I showcase my portfolio projects and writing?',
    a: 'Absolutely. You can combine rich project case studies, image galleries, blog notes, reading lists, and social links on a single cohesive page or organize them into dedicated sections.',
  },
  {
    q: 'Is my page fast, accessible, and mobile-friendly?',
    a: 'Every Webloom space is optimized for instant loading, clean SEO metadata, automatic social preview cards, and seamless responsiveness across desktop, tablet, and mobile screens.',
  },
  {
    q: 'Can I update or redesign my space later?',
    a: 'Your Webloom is meant to grow with you. You can switch templates, rearrange blocks, or update your links in real time without ever breaking your shared URL or QR code.',
  },
];

export function FAQReconstructed() {
  const theme = useWebloomTheme();
  const isOverlay = useIsWebloomOverlay();
  const isDark = theme === 'dark';
  const { openFaqIdx: openIdx, setOpenFaqIdx: setOpenIdx } = useWebloomSyncState();
  const { setAuthModalMode, setIsAuthModalOpen } = useApp();

  return (
    <section
      id="faq"
      className="w-full max-w-6xl mx-auto px-6 sm:px-8 py-12 md:py-18 select-none"
    >
      <CinematicCameraScene enterRotateX={6} exitRotateX={-3}>
        <div
          style={{ transformStyle: 'preserve-3d' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 max-w-5xl mx-auto items-start"
        >
          {/* Left Column: Editorial Heading & 3D Pinned Studio Support Note */}
          <motion.div
            initial={isOverlay ? false : { opacity: 0, x: -18, rotateY: 8 }}
            animate={isOverlay ? { opacity: 1, x: 0, rotateY: 0 } : undefined}
            whileInView={isOverlay ? undefined : { opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: 'translateZ(20px)' }}
            className="lg:col-span-5 flex flex-col items-start"
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
              <span>Common questions</span>
            </div>

            <h2
              className={`font-serif text-[34px] sm:text-[42px] leading-[1.08] font-normal tracking-tight ${
                isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
              }`}
            >
              Questions, <br />
              <span
                className={`italic font-normal ${
                  isDark ? 'text-[#D6C9B8]' : 'text-[#3A322A]'
                }`}
              >
                thoughtfully answered.
              </span>
            </h2>

            <p
              className={`mt-3 text-[14.5px] sm:text-[15.5px] leading-relaxed ${
                isDark ? 'text-[#C8BDB0]' : 'text-[#4A4138]'
              }`}
            >
              Everything you need to know about building and growing your personal space on Webloom.
            </p>

            {/* Pinned Botanical Studio Note Card with 3D Tilt */}
            <Tilt3DCard
              maxTilt={7}
              scaleOnHover={1.02}
              className={`mt-7 relative w-full max-w-[340px] rounded-[14px] p-5 border -rotate-1 ${
                isDark
                  ? 'bg-[#251F1A] border-[#3E332A] shadow-[0_10px_24px_rgba(0,0,0,0.45)]'
                  : 'bg-[#F6EFE2] border-[#DCD0BC] shadow-[0_8px_20px_rgba(38,28,18,0.08)]'
              }`}
            >
              <div
                className={`absolute -top-2 left-8 w-12 h-3.5 rotate-2 shadow-2xs ${
                  isDark ? 'bg-[#9A7E52]/80' : 'bg-[#E0C88B]/85'
                }`}
              />

              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3
                    className={`font-serif font-bold text-[17px] ${
                      isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
                    }`}
                  >
                    Ready to try it yourself?
                  </h3>
                  <p
                    className={`text-[12.5px] mt-1 leading-relaxed ${
                      isDark ? 'text-[#C8BDB0]' : 'text-[#544A40]'
                    }`}
                  >
                    Claim your free handle in under a minute—no credit card required.
                  </p>
                  <MagneticWrapper strength={0.2}>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthModalMode('signup');
                        setIsAuthModalOpen(true);
                      }}
                      className={`mt-3.5 inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full text-[12px] font-medium shadow-xs transition-transform hover:scale-[1.02] ${
                        isDark
                          ? 'bg-[#F4EFE6] hover:bg-white text-[#181410]'
                          : 'bg-[#181614] hover:bg-black text-[#FAF6EE]'
                      }`}
                    >
                      <span>Start for free</span>
                      <span className="text-[10.5px] font-sans">↗</span>
                    </button>
                  </MagneticWrapper>
                </div>

                {/* Mini Botanical Illustration */}
                <div
                  className={`w-11 h-14 border p-1 rounded shadow-2xs shrink-0 flex items-center justify-center rotate-3 ${
                    isDark
                      ? 'bg-[#1B1612] border-[#3F342A]'
                      : 'bg-[#FAF6EE] border-[#D8CBB8]'
                  }`}
                >
                  <svg className="w-7 h-9" viewBox="0 0 32 40" fill="none">
                    <path d="M16 18V36" stroke="#6E9458" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M16 27C12 24 10 25 9 28C12 29 14 28 16 27Z" fill="#7DA365" />
                    <circle cx="16" cy="13" r="5.5" fill="#E3969E" />
                    <circle cx="11.5" cy="11" r="3.5" fill="#ECA8B0" />
                    <circle cx="20.5" cy="11" r="3.5" fill="#ECA8B0" />
                    <circle cx="16" cy="13.5" r="2.3" fill="#E6B84C" />
                  </svg>
                </div>
              </div>
            </Tilt3DCard>
          </motion.div>

          {/* Right Column: Layered Paper-Strip Accordion List */}
          <motion.div
            initial={isOverlay ? false : { opacity: 0, x: 18, rotateY: -8 }}
            animate={isOverlay ? { opacity: 1, x: 0, rotateY: 0 } : undefined}
            whileInView={isOverlay ? undefined : { opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: 'translateZ(12px)', transformStyle: 'preserve-3d' }}
            className="lg:col-span-7 flex flex-col gap-3 w-full"
          >
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <motion.div
                  key={idx}
                  animate={{
                    z: isOpen ? 18 : 0,
                    scale: isOpen ? 1.012 : 1,
                  }}
                  whileHover={{ x: 4, z: 10 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className={`relative rounded-[14px] border transition-colors duration-200 ${
                    isOpen
                      ? isDark
                        ? 'bg-[#26201B] border-[#483B30] shadow-[0_3px_0_#15110E,0_14px_28px_rgba(0,0,0,0.45)]'
                        : 'bg-[#F5EDE0] border-[#D5C6AF] shadow-[0_3px_0_#DFD2BD,0_12px_26px_rgba(38,28,18,0.1)]'
                      : isDark
                        ? 'bg-[#1D1814] border-[#332B23] hover:border-[#483B30] shadow-[0_2px_0_#14100D,0_4px_12px_rgba(0,0,0,0.25)]'
                        : 'bg-[#FAF6EE] border-[#E4D9C6] hover:border-[#D5C6AF] shadow-[0_2px_0_#EAE0CE,0_4px_10px_rgba(38,28,18,0.03)]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full px-5 sm:px-6 py-4 text-left flex items-center justify-between gap-4"
                  >
                    <span
                      className={`font-serif font-medium text-[17px] sm:text-[18.5px] leading-snug ${
                        isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
                      }`}
                    >
                      {faq.q}
                    </span>
                    <span
                      className={`w-6 h-6 rounded-full border flex items-center justify-center text-[14px] shrink-0 transition-transform duration-200 ${
                        isDark
                          ? isOpen
                            ? 'rotate-45 bg-[#362D25] border-[#524337] text-[#E6B86A]'
                            : 'bg-[#161310] border-[#42362C] text-[#D6C9B8]'
                          : isOpen
                            ? 'rotate-45 bg-[#EFE4D4] border-[#C8B9A2] text-[#4E3E30]'
                            : 'bg-[#FAF6EE] border-[#C8B9A2] text-[#4E3E30]'
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, rotateX: -8 }}
                        animate={{ height: 'auto', opacity: 1, rotateX: 0 }}
                        exit={{ height: 0, opacity: 0, rotateX: -6 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformOrigin: 'top center' }}
                        className="overflow-hidden"
                      >
                        <div
                          className={`px-5 sm:px-6 pb-4.5 pt-1 text-[13.5px] sm:text-[14px] leading-relaxed border-t ${
                            isDark
                              ? 'text-[#C8BDB0] border-[#382F27]/70'
                              : 'text-[#4A4036] border-[#E6DBC8]/60'
                          }`}
                        >
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </CinematicCameraScene>
    </section>
  );
}
