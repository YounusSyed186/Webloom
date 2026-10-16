'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';

export function FinalCTA() {
  const { setAuthModalMode, setIsAuthModalOpen } = useApp();

  const handleStart = () => {
    setAuthModalMode('signup');
    setIsAuthModalOpen(true);
  };

  return (
    <section className="relative py-36 md:py-48 border-t border-white/[0.06] bg-[#08090B] overflow-hidden">
      {/* Faint subtle ambient background aura */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle at center, rgba(167, 139, 250, 0.08) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10 space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-[40px] sm:text-[54px] md:text-[68px] font-normal leading-[1.08] tracking-tight text-[#F4F3F0]"
        >
          Make your corner <br />
          <span className="text-[#E9E1D5] font-serif italic">of the internet.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[18px] md:text-[20px] text-[#A6A7AE] font-light max-w-lg mx-auto space-y-1"
        >
          <p>Your work is everywhere. Your projects are everywhere. Your ideas are everywhere.</p>
          <p className="text-[#F4F3F0]">Give them somewhere to come together.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4"
        >
          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-[#F4F3F0] text-[#08090B] font-medium text-[15px] hover:bg-white transition-all duration-200 active:translate-y-[1px] flex items-center justify-center gap-2"
          >
            <span>Create your Webloom</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[13px] font-mono text-[#6F7179] pt-2"
        >
          One link. Your whole world.
        </motion.div>
      </div>
    </section>
  );
}
