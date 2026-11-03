'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tilt3DCard, MagneticWrapper } from './motion-primitives';
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
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { setAuthModalMode, setIsAuthModalOpen } = useApp();

  return (
    <section id="faq" className="w-full max-w-6xl mx-auto px-6 sm:px-8 py-12 md:py-18 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 max-w-5xl mx-auto items-start">
        {/* Left Column: Editorial Heading & 3D Pinned Studio Support Note */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EFE4D4] border border-[#DFD0BC] text-[#4E3E30] text-[11px] sm:text-[12px] font-medium tracking-wide shadow-2xs mb-3">
            <span className="text-[10px] text-[#9C7248]">✦</span>
            <span>Common questions</span>
          </div>

          <h2 className="font-serif text-[34px] sm:text-[42px] leading-[1.08] text-[#1F1A16] font-normal tracking-tight">
            Questions, <br />
            <span className="italic font-normal text-[#3A322A]">thoughtfully answered.</span>
          </h2>

          <p className="mt-3 text-[#4A4138] text-[14.5px] sm:text-[15.5px] leading-relaxed">
            Everything you need to know about building and growing your personal space on Webloom.
          </p>

          {/* Pinned Botanical Studio Note Card with 3D Tilt */}
          <Tilt3DCard
            maxTilt={7}
            scaleOnHover={1.02}
            className="mt-7 relative w-full max-w-[340px] rounded-[14px] p-5 bg-[#F6EFE2] border border-[#DCD0BC] shadow-[0_8px_20px_rgba(38,28,18,0.08)] -rotate-1"
          >
            {/* Top Masking Tape */}
            <div className="absolute -top-2 left-8 w-12 h-3.5 bg-[#E0C88B]/85 rotate-2 shadow-2xs" />

            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-serif font-bold text-[17px] text-[#1F1A16]">
                  Ready to try it yourself?
                </h3>
                <p className="text-[12.5px] text-[#544A40] mt-1 leading-relaxed">
                  Claim your free handle in under a minute—no credit card required.
                </p>
                <MagneticWrapper strength={0.2}>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthModalMode('signup');
                      setIsAuthModalOpen(true);
                    }}
                    className="mt-3.5 inline-flex items-center gap-1.5 bg-[#181614] hover:bg-black text-[#FAF6EE] px-4.5 py-1.5 rounded-full text-[12px] font-medium shadow-xs transition-transform hover:scale-[1.02]"
                  >
                    <span>Start for free</span>
                    <span className="text-[10.5px] font-sans">↗</span>
                  </button>
                </MagneticWrapper>
              </div>

              {/* Mini Botanical Illustration */}
              <div className="w-11 h-14 bg-[#FAF6EE] border border-[#D8CBB8] p-1 rounded shadow-2xs shrink-0 flex items-center justify-center rotate-3">
                <svg className="w-7 h-9" viewBox="0 0 32 40" fill="none">
                  <path d="M16 18V36" stroke="#4D6B3C" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M16 27C12 24 10 25 9 28C12 29 14 28 16 27Z" fill="#5D7E49" />
                  <circle cx="16" cy="13" r="5.5" fill="#E3969E" />
                  <circle cx="11.5" cy="11" r="3.5" fill="#ECA8B0" />
                  <circle cx="20.5" cy="11" r="3.5" fill="#ECA8B0" />
                  <circle cx="16" cy="13.5" r="2.3" fill="#E6B84C" />
                </svg>
              </div>
            </div>
          </Tilt3DCard>
        </motion.div>

        {/* Right Column: Stationery Slip Accordion List */}
        <motion.div
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col gap-3 w-full"
        >
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-[14px] border transition-all duration-200 ${
                  isOpen
                    ? 'bg-[#F5EDE0] border-[#D5C6AF] shadow-[0_6px_18px_rgba(38,28,18,0.07)]'
                    : 'bg-[#FAF6EE] border-[#E4D9C6] hover:border-[#D5C6AF]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-5 sm:px-6 py-4 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-serif font-medium text-[17px] sm:text-[18.5px] text-[#1F1A16] leading-snug">
                    {faq.q}
                  </span>
                  <span
                    className={`w-6 h-6 rounded-full border border-[#C8B9A2] bg-[#FAF6EE] flex items-center justify-center text-[14px] text-[#4E3E30] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-45 bg-[#EFE4D4]' : ''
                    }`}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-4.5 pt-0.5 text-[13.5px] sm:text-[14px] text-[#4A4036] leading-relaxed border-t border-[#E6DBC8]/60">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
