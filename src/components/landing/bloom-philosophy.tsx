'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Sprout, Compass, Layers, Heart } from 'lucide-react';

export function BloomPhilosophySection() {
  const pillars = [
    { title: 'Growth', desc: 'Your page evolves automatically as you publish new work, repositories, and essays.', icon: Sprout },
    { title: 'Identity', desc: 'Craft a digital space that feels human and distinct rather than corporate or cookie-cutter.', icon: Compass },
    { title: 'Creativity', desc: 'Express your taste with custom typography, responsive card layouts, and palettes.', icon: Sparkles },
    { title: 'Connection', desc: 'Give collaborators, clients, and audiences one clear doorway to reach you.', icon: Heart },
  ];

  return (
    <section className="relative py-28 md:py-36 border-t border-white/[0.06] bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-[12px] font-mono tracking-widest text-[#A78BFA] uppercase">
            🌸 WHY THE NAME WEBLOOM
          </span>
          <span className="h-[1px] w-12 bg-white/[0.1]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Web + Bloom Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-[38px] sm:text-[48px] font-normal leading-[1.08] tracking-tight text-[#F4F3F0]">
              Web + Bloom. <br />
              <span className="text-[#A78BFA] font-serif italic">Designed to flourish.</span>
            </h2>

            <blockquote className="text-[20px] md:text-[22px] font-serif italic text-[#E9E1D5] leading-relaxed border-l-2 border-[#A78BFA] pl-4">
              &ldquo;Your identity. Your work. Your presence — in one place, designed to bloom.&rdquo;
            </blockquote>

            <p className="text-[17px] leading-relaxed text-[#A6A7AE] font-light">
              Webloom represents the organic convergence of your creations online. A digital presence should not feel like static paperwork — it should feel alive, evolving alongside everything you make.
            </p>
          </div>

          {/* Right Column: 4 Growth Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="p-6 rounded-2xl bg-[#0D0F12] border border-white/[0.08] hover:border-[#A78BFA]/30 transition-all space-y-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#12141A] border border-white/[0.08] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#A78BFA]" />
                  </div>
                  <h3 className="text-[17px] text-[#F4F3F0] font-medium">
                    {p.title}
                  </h3>
                  <p className="text-[13px] text-[#A6A7AE] font-light leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
