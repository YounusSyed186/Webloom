'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Palette, Music, Rocket } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';

export function ExamplesSection() {
  const { setAuthModalMode, setIsAuthModalOpen } = useApp();

  const archetypes = [
    {
      role: 'Developer',
      tagline: 'Code-first portfolio',
      items: ['GitHub Repos', 'Live Demos', 'Interactive Resume', 'Tech Stack'],
      icon: Code,
      accent: '#A78BFA',
    },
    {
      role: 'Designer',
      tagline: 'Living case study space',
      items: ['Featured Portfolio', 'Case Studies', 'Figma Community', 'Direct Booking'],
      icon: Palette,
      accent: '#E9E1D5',
    },
    {
      role: 'Musician & Artist',
      tagline: 'Creative hub',
      items: ['Latest Release', 'Spotify Link', 'Tour Dates & Tickets', 'Merch Store'],
      icon: Music,
      accent: '#9B7AEF',
    },
    {
      role: 'Founder',
      tagline: 'Product & story ecosystem',
      items: ['Active Venture', 'Pitch Deck', 'Essays & Thinking', 'Press Kit'],
      icon: Rocket,
      accent: '#86EFAC',
    },
  ];

  return (
    <section className="relative py-28 md:py-36 border-t border-white/[0.06] bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-[12px] font-mono tracking-widest text-[#A78BFA] uppercase">
            EXAMPLES & USE CASES
          </span>
          <span className="h-[1px] w-12 bg-white/[0.1]" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-[38px] sm:text-[48px] font-normal leading-[1.08] tracking-tight text-[#F4F3F0]">
              One platform. <br />
              <span className="text-[#A6A7AE] font-serif italic">Infinite ways to make it yours.</span>
            </h2>
            <p className="text-[17px] text-[#A6A7AE] font-light mt-4">
              Webloom effortlessly adapts to whoever is building with it.
            </p>
          </div>

          <button
            onClick={() => {
              setAuthModalMode('signup');
              setIsAuthModalOpen(true);
            }}
            className="inline-flex items-center gap-2 text-[14px] text-[#F4F3F0] font-medium hover:text-[#A78BFA] transition-colors py-2"
          >
            <span>Explore Weblooms</span>
            <ArrowRight className="w-4 h-4 text-[#A78BFA]" />
          </button>
        </div>

        {/* 4 Archetype Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {archetypes.map((arch) => {
            const Icon = arch.icon;
            return (
              <div
                key={arch.role}
                className="p-6 rounded-xl bg-[#0D0F12] border border-white/[0.08] hover:border-[#A78BFA]/40 transition-all duration-200 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-[#12141A] border border-white/[0.08] flex items-center justify-center">
                      <Icon className="w-4 h-4" style={{ color: arch.accent }} />
                    </div>
                    <span
                      className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded"
                      style={{ color: arch.accent, backgroundColor: `${arch.accent}15` }}
                    >
                      {arch.role}
                    </span>
                  </div>

                  <h3 className="text-[18px] text-[#F4F3F0] font-medium">
                    {arch.tagline}
                  </h3>

                  <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                    {arch.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-[13px] text-[#A6A7AE]">
                        <span className="w-1 h-1 rounded-full bg-white/[0.2]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] font-mono text-[#6F7179] pt-2 border-t border-white/[0.04]">
                  Tailored Layout Engine
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
