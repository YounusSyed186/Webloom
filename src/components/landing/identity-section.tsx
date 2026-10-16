'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Palette, Camera, Music, Rocket, GraduationCap, Briefcase, Feather } from 'lucide-react';

export function IdentitySection() {
  const identities = [
    { label: 'Developers', desc: 'Code, repos, tech stack, and documentation', icon: Terminal },
    { label: 'Designers', desc: 'Case studies, Figma assets, and portfolios', icon: Palette },
    { label: 'Photographers', desc: 'Galleries, presets, and booking channels', icon: Camera },
    { label: 'Musicians', desc: 'Releases, tour dates, and streaming profiles', icon: Music },
    { label: 'Founders', desc: 'Products, mission, pitch decks, and essays', icon: Rocket },
    { label: 'Writers', desc: 'Substack, publications, and selected essays', icon: Feather },
    { label: 'Students', desc: 'Research, resume, projects, and coursework', icon: GraduationCap },
    { label: 'Freelancers', desc: 'Services, availability, pricing, and contact', icon: Briefcase },
  ];

  return (
    <section className="relative py-28 md:py-36 border-t border-white/[0.06] bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-[12px] font-mono tracking-widest text-[#A78BFA] uppercase">
            PERSONAL IDENTITY
          </span>
          <span className="h-[1px] w-12 bg-white/[0.1]" />
        </div>

        <div className="max-w-3xl space-y-6 mb-16">
          <h2 className="text-[38px] sm:text-[50px] font-normal leading-[1.08] tracking-tight text-[#F4F3F0]">
            Build a page <br />
            <span className="text-[#A6A7AE] font-serif italic">people remember.</span>
          </h2>

          <p className="text-[18px] md:text-[20px] leading-relaxed text-[#A6A7AE] font-light">
            Your Webloom isn&apos;t just a collection of links. It is your <strong className="text-[#F4F3F0] font-normal">Name, Work, Projects, Interests, Social presence, and Creative identity</strong> unified in one memorable home.
          </p>
        </div>

        {/* 8 Identities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {identities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="p-5 rounded-xl bg-[#0D0F12] border border-white/[0.08] hover:border-[#A78BFA]/30 transition-all duration-200 space-y-2 group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#12141A] border border-white/[0.08] flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#A78BFA]" />
                </div>
                <h3 className="text-[16px] text-[#F4F3F0] font-medium pt-1">
                  {item.label}
                </h3>
                <p className="text-[13px] text-[#A6A7AE] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
