'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Link2, 
  Briefcase, 
  Code2, 
  FileText, 
  Mail, 
  Image as ImageIcon, 
  MousePointerClick, 
  Smartphone, 
  Palette, 
  BarChart3,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';

export function WhatIsWebloomSection() {
  const { setAuthModalMode, setIsAuthModalOpen } = useApp();

  const capabilities = [
    { label: 'Profile Photo, Name & Bio', desc: 'A rich personal introduction with verified badge and location.', icon: User },
    { label: 'Social Media Links', desc: 'Unified links to X, GitHub, LinkedIn, Instagram, and more.', icon: Link2 },
    { label: 'Projects & Portfolio', desc: 'Featured case studies, open-source work, and live demos.', icon: Briefcase },
    { label: 'Skills & Tech Stack', desc: 'Showcase technologies, tools, and areas of expertise.', icon: Code2 },
    { label: 'Resume & Experience', desc: 'Instant downloadable CV or structured career timeline.', icon: FileText },
    { label: 'Direct Contact', desc: 'Email inquiries and direct calendar booking integrations.', icon: Mail },
    { label: 'Images & Media', desc: 'Visual galleries, product screenshots, and creative artwork.', icon: ImageIcon },
    { label: 'Custom Buttons & Links', desc: 'Custom actions, stores, newsletters, and donation links.', icon: MousePointerClick },
    { label: 'Mobile-First Website', desc: 'Optimized touch-friendly UI that loads in under 100ms.', icon: Smartphone },
    { label: 'Custom Themes & Fonts', desc: 'Tailored typography, background physics, and palettes.', icon: Palette },
    { label: 'Real-Time Analytics', desc: 'Privacy-friendly visitor counts, CTR, and top referrers.', icon: BarChart3 },
  ];

  return (
    <section id="what-is-webloom" className="relative py-28 md:py-36 border-t border-white/[0.06] bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-[12px] font-mono tracking-widest text-[#A78BFA] uppercase">
            🌱 WHAT IS WEBLOOM
          </span>
          <span className="h-[1px] w-12 bg-white/[0.1]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          {/* Left Column: Core Definition */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-[36px] sm:text-[46px] md:text-[52px] font-normal leading-[1.08] tracking-tight text-[#F4F3F0]">
              Linktree + Portfolio + <br />
              <span className="text-[#E9E1D5] font-serif italic">Personal Website.</span>
            </h2>

            <p className="text-[18px] md:text-[20px] leading-relaxed text-[#A6A7AE] font-light">
              Think of Webloom as a modern personal presence platform that lets anyone turn one link into a beautiful, customizable digital identity hub.
            </p>

            <div className="p-5 rounded-2xl bg-[#0D0F12] border border-[#A78BFA]/30 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#A78BFA] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                THE CORE IDEA
              </span>
              <p className="text-[16px] text-[#F4F3F0] font-normal leading-relaxed">
                Instead of maintaining LinkedIn + GitHub + a complex portfolio site + resume + Instagram + multiple scattered URLs...
              </p>
              <p className="text-[18px] text-[#A78BFA] font-serif italic">
                One link &rarr; everything about you.
              </p>
            </div>
          </div>

          {/* Right Column: Key Difference Callout */}
          <div className="lg:col-span-6 bg-[#0D0F12] border border-white/[0.08] rounded-2xl p-8 space-y-6">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#6F7179] block">
              NOT ANOTHER GENERIC LINKTREE CLONE
            </span>

            <p className="text-[16px] text-[#F4F3F0] font-light leading-relaxed">
              The important difference is that Webloom doesn&apos;t feel like a list of buttons in a generic mobile frame.
            </p>

            <p className="text-[15px] text-[#A6A7AE] font-light leading-relaxed">
              The goal is to make each person&apos;s page feel like a <strong className="text-[#F4F3F0] font-medium">real personal website</strong>, while keeping creation as fast and effortless as building a link tree.
            </p>

            {/* Example Link Pill */}
            <div className="p-4 rounded-xl bg-[#12141A] border border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#86EFAC]" />
                <span className="text-[14px] font-mono text-[#F4F3F0]">
                  webloom.site/younus
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#A78BFA] uppercase">
                Active Link Hub
              </span>
            </div>
          </div>
        </div>

        {/* 11 Capabilities Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#6F7179]">
              EVERYTHING YOUR WEBLOOM CAN CONTAIN
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {capabilities.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.label}
                  className="p-4 rounded-xl bg-[#0D0F12] border border-white/[0.06] hover:border-[#A78BFA]/30 transition-all duration-200 space-y-2 group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-[#12141A] border border-white/[0.08] flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-[#A78BFA]" />
                    </div>
                    <h3 className="text-[14px] text-[#F4F3F0] font-medium">
                      {c.label}
                    </h3>
                  </div>
                  <p className="text-[12px] text-[#A6A7AE] font-light leading-relaxed">
                    {c.desc}
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
