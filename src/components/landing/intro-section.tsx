'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Layers, ArrowRight } from 'lucide-react';

export function IntroSection() {
  const scattered = [
    { label: 'Your portfolio', loc: 'is somewhere else' },
    { label: 'Your GitHub', loc: 'is somewhere else' },
    { label: 'Your social profiles', loc: 'are somewhere else' },
    { label: 'Your projects', loc: 'live in different places' },
  ];

  return (
    <section className="relative py-28 md:py-36 border-t border-white/[0.06] bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-[12px] font-mono tracking-widest text-[#A78BFA] uppercase">
            INTRODUCTION
          </span>
          <span className="h-[1px] w-12 bg-white/[0.1]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-[38px] sm:text-[50px] font-normal leading-[1.08] tracking-tight text-[#F4F3F0]">
              More than a link <br />
              <span className="text-[#A6A7AE] font-serif italic">in your bio.</span>
            </h2>

            <p className="text-[18px] md:text-[20px] leading-relaxed text-[#A6A7AE] font-light">
              Your online presence is scattered everywhere. Webloom brings the pieces together into one cohesive, living space.
            </p>

            <div className="pt-2 text-[15px] text-[#F4F3F0] leading-relaxed font-light">
              Create one personal page that represents <strong className="text-[#E9E1D5] font-normal">who you are, what you make, and where people can find you.</strong>
            </div>

            <div className="pt-4 flex items-center gap-3 text-[13px] font-mono text-[#A78BFA]">
              <span>One link. Your entire web presence.</span>
            </div>
          </div>

          {/* Right Column: Visual Scattering to Unity */}
          <div className="lg:col-span-6 bg-[#0D0F12] border border-white/[0.08] rounded-2xl p-8 space-y-6">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#6F7179] block">
              BEFORE WEBLOOM VS WITH WEBLOOM
            </span>

            {/* Scattered Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scattered.map((item) => (
                <div
                  key={item.label}
                  className="p-3.5 rounded-lg bg-[#12141A] border border-white/[0.06] flex items-center justify-between text-[13px]"
                >
                  <span className="text-[#F4F3F0]">{item.label}</span>
                  <span className="text-[11px] font-mono text-[#6F7179] italic">{item.loc}</span>
                </div>
              ))}
            </div>

            {/* Central Unity Convergence */}
            <div className="pt-4 p-5 rounded-xl bg-gradient-to-br from-[#12141A] to-[#1a1728] border border-[#A78BFA]/30 space-y-2">
              <div className="flex items-center gap-2 text-[12px] font-mono text-[#A78BFA]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>WITH WEBLOOM</span>
              </div>
              <p className="text-[15px] text-[#F4F3F0] font-normal">
                All your projects, writing, code, socials, and portfolio unified under one personal address.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
