'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Layout, Type, Image as ImageIcon, MousePointerClick, ArrowRight } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';

export function PageCraftSection() {
  const { setAuthModalMode, setIsAuthModalOpen } = useApp();

  const customizationDimensions = [
    { label: 'Layouts', desc: 'Standard, asymmetric, card-first, or minimalist list', icon: Layout },
    { label: 'Colors & Accents', desc: 'Curated palettes or exact custom HSL & hex values', icon: Palette },
    { label: 'Typography', desc: 'Editorial serif, modern geometric, or mono styling', icon: Type },
    { label: 'Backgrounds', desc: 'Deep obsidian, warm sand, glassmorphism, or mesh', icon: ImageIcon },
    { label: 'Button Styles', desc: 'Glass, solid, brutalist border, or subtle pill', icon: MousePointerClick },
  ];

  return (
    <section id="your-page" className="relative py-28 md:py-36 border-t border-white/[0.06] bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-[12px] font-mono tracking-widest text-[#A78BFA] uppercase">
            YOUR PAGE
          </span>
          <span className="h-[1px] w-12 bg-white/[0.1]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-[38px] sm:text-[48px] font-normal leading-[1.08] tracking-tight text-[#F4F3F0]">
              Make the web <br />
              <span className="text-[#A6A7AE] font-serif italic">feel like yours.</span>
            </h2>

            <p className="text-[17px] leading-relaxed text-[#A6A7AE] font-light">
              Webloom isn&apos;t built around one rigid template. Build a page that reflects your personality, your work, and your style.
            </p>

            <p className="text-[15px] leading-relaxed text-[#6F7179] font-light">
              Start with a simple page or create something completely your own with tailored typography, background physics, and card layouts.
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  setAuthModalMode('signup');
                  setIsAuthModalOpen(true);
                }}
                className="inline-flex items-center gap-2 text-[14px] text-[#F4F3F0] font-medium hover:text-[#A78BFA] transition-colors py-2"
              >
                <span>Start designing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Customization Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {customizationDimensions.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`p-6 rounded-xl bg-[#0D0F12] border border-white/[0.08] space-y-3 hover:border-[#A78BFA]/30 transition-all duration-200 ${
                    idx === 0 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#12141A] border border-white/[0.08] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#A78BFA]" />
                  </div>
                  <h3 className="text-[17px] text-[#F4F3F0] font-medium">
                    {item.label}
                  </h3>
                  <p className="text-[13px] text-[#A6A7AE] leading-relaxed">
                    {item.desc}
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
