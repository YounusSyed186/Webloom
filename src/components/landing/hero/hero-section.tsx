'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { HeroPreview } from './hero-preview';
import { useApp } from '@/lib/context/app-context';
import { normalizeUsername, validateUsername } from '@/lib/validation';
import { useToast } from '@/components/ui/toast';

export function HeroSection() {
  const [handle, setHandle] = useState('');
  const { setAuthModalMode, setIsAuthModalOpen } = useApp();
  const { error } = useToast();

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (handle) {
      const clean = normalizeUsername(handle);
      const check = validateUsername(clean);
      if (!check.valid) {
        error(check.error || 'Please enter a valid username');
        return;
      }
    }
    setAuthModalMode('signup');
    setIsAuthModalOpen(true);
  };

  const handleCreate = () => {
    setAuthModalMode('signup');
    setIsAuthModalOpen(true);
  };

  return (
    <section className="relative min-h-[90vh] pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#08090B] flex items-center">
      
      {/* 🌌 Background Atmosphere: Left deep black, Right soft violet/electric-blue glow */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/webloom-hero-bg.jpg"
          alt="Webloom Atmosphere"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right-top opacity-90"
        />
        {/* Gradients ensuring deep pitch-black behind left text and soft illumination behind right preview */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090B] via-[#08090B]/85 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-[#08090B]/60 z-[1]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
          
          {/* ======================================================== */}
          {/* 📝 LEFT COLUMN: Editorial Headline & Actions (lg:col-span-6) */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 flex flex-col items-start z-10 pr-0 lg:pr-4">
            
            {/* Pill Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full bg-[#14121F] border border-[#9B6BFF]/30 text-[11px] font-mono tracking-widest text-[#B48AFF] uppercase shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#9B6BFF]" />
              <span>PERSONAL DIGITAL IDENTITY</span>
            </motion.div>

            {/* Monumental Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-[48px] sm:text-[60px] md:text-[68px] lg:text-[64px] xl:text-[74px] font-bold leading-[1.04] tracking-tight text-white mb-6"
            >
              Your corner <br />
              <span className="font-serif italic font-normal bg-gradient-to-r from-[#C4B5FD] via-[#A78BFA] to-[#60A5FA] bg-clip-text text-transparent">
                of the internet.
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[17px] sm:text-[18px] leading-relaxed text-[#9CA3AF] font-light max-w-[490px] mb-8"
            >
              Your work, projects, links, and social presence deserve more than a list of URLs. Webloom gives you one beautiful, customizable place to bring it all together.
            </motion.p>

            {/* Username Claim Input Box */}
            <motion.form
              onSubmit={handleClaim}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="w-full max-w-[460px] p-1.5 rounded-xl bg-[#0D0F14]/95 border border-white/[0.12] focus-within:border-[#9B6BFF]/70 flex items-center justify-between gap-2 mb-7 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center pl-3.5 font-mono text-[14px] flex-1 min-w-0">
                <span className="text-[#9CA3AF] select-none">webloom.site/</span>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="yourname"
                  aria-label="Your desired Webloom handle"
                  className="bg-transparent border-0 text-white font-mono text-[14px] focus:outline-none pl-1 placeholder-zinc-500 w-full"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-white hover:bg-zinc-100 text-[#09090B] font-semibold text-[13px] shrink-0 flex items-center gap-1.5 transition-all shadow-md active:translate-y-[1px]"
              >
                <span>Claim</span>
                <ArrowRight className="w-3.5 h-3.5 text-black" />
              </button>
            </motion.form>

            {/* CTA Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-6 mb-8 w-full sm:w-auto"
            >
              <button
                onClick={handleCreate}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#9B6BFF] via-[#855DFF] to-[#4F75FF] hover:opacity-95 text-white font-medium text-[15px] flex items-center justify-center gap-2 shadow-lg shadow-[#9B6BFF]/30 active:translate-y-[1px] transition-all"
              >
                <span>Create your Webloom</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#more-than-link"
                className="text-[14px] text-zinc-300 hover:text-white font-medium flex items-center gap-1.5 transition-colors py-2"
              >
                <span>Explore examples</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </a>
            </motion.div>

            {/* Microcopy Row with Purple Circular Checks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center gap-y-2 gap-x-5 text-[13px] text-zinc-300"
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-[10px] font-bold">
                  ✓
                </div>
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-[10px] font-bold">
                  ✓
                </div>
                <span>No complicated setup</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-[10px] font-bold">
                  ✓
                </div>
                <span>Customize everything</span>
              </div>
            </motion.div>

          </div>

          {/* ======================================================== */}
          {/* 📱 RIGHT COLUMN: Interactive Product Preview (lg:col-span-6) */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <HeroPreview />
          </div>

        </div>
      </div>
    </section>
  );
}
