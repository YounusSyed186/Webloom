'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Link, FolderGit2, Palette, BarChart3, Share2, QrCode, Smartphone } from 'lucide-react';

export function FeatureSummarySection() {
  const features = [
    { title: 'Personal profile', desc: 'Introduce yourself with your name, bio, photo, location, and social handles.', icon: User },
    { title: 'Curated links', desc: 'Organize everything you want people to discover with smart ordering.', icon: Link },
    { title: 'Project showcase', desc: "Showcase the things you've built, open-source work, and case studies.", icon: FolderGit2 },
    { title: 'Deep customization', desc: 'Create a visual identity with fine-tuned typography, colors, and layout.', icon: Palette },
    { title: 'Actionable analytics', desc: 'Understand how people interact with your links and referral channels.', icon: BarChart3 },
    { title: 'Unified sharing', desc: 'Use one permanent URL everywhere and update it from one dashboard.', icon: Share2 },
    { title: 'Vector QR codes', desc: 'Turn your Webloom into a clean QR code for physical events and cards.', icon: QrCode },
    { title: 'Responsive by default', desc: 'Your page renders seamlessly across phones, tablets, and wide screens.', icon: Smartphone },
  ];

  return (
    <section className="relative py-28 md:py-36 border-t border-white/[0.06] bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-[12px] font-mono tracking-widest text-[#A78BFA] uppercase">
            FEATURE SUMMARY
          </span>
          <span className="h-[1px] w-12 bg-white/[0.1]" />
        </div>

        <div className="max-w-3xl space-y-4 mb-16">
          <h2 className="text-[38px] sm:text-[48px] font-normal leading-[1.08] tracking-tight text-[#F4F3F0]">
            Everything you need <br />
            <span className="text-[#A6A7AE] font-serif italic">to build your presence.</span>
          </h2>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="p-5 rounded-xl bg-[#0D0F12] border border-white/[0.08] hover:border-white/[0.18] transition-all space-y-3"
              >
                <div className="w-8 h-8 rounded-lg bg-[#12141A] border border-white/[0.08] flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#A78BFA]" />
                </div>
                <h3 className="text-[16px] text-[#F4F3F0] font-medium">
                  {f.title}
                </h3>
                <p className="text-[13px] text-[#A6A7AE] font-light leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
