'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function DifferentiationSection() {
  return (
    <section className="relative py-32 md:py-44 border-t border-white/[0.06] bg-[#08090B] flex items-center justify-center overflow-hidden">
      {/* Faint subtle ambient background aura */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(167, 139, 250, 0.09) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#A78BFA] uppercase">
          <span>THE WEBLOOM DIFFERENCE</span>
        </div>

        <h2 className="text-[34px] sm:text-[46px] md:text-[54px] font-normal leading-[1.14] tracking-tight text-[#F4F3F0]">
          Your identity shouldn&apos;t <br />
          <span className="text-[#E9E1D5] font-serif italic">depend on a template.</span>
        </h2>

        <div className="max-w-2xl mx-auto space-y-4 text-[18px] md:text-[20px] text-[#A6A7AE] font-light leading-relaxed">
          <p className="line-through decoration-white/[0.2] text-[#6F7179]">
            Most link tools ask: &ldquo;Which template do you want?&rdquo;
          </p>
          <p className="text-[#F4F3F0] text-[20px] md:text-[22px] font-normal">
            Webloom asks: <span className="text-[#A78BFA] font-serif italic">&ldquo;What do you want your corner of the internet to feel like?&rdquo;</span>
          </p>
          <p className="text-[15px] text-[#A6A7AE] pt-2">
            That&apos;s the difference. You aren&apos;t choosing a page from a rigid catalog. You&apos;re building your own space on the web.
          </p>
        </div>
      </div>
    </section>
  );
}
