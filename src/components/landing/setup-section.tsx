'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function SetupSection() {
  const steps = [
    { num: '01', title: 'Create', desc: 'Choose your Webloom username and claim your personal URL.' },
    { num: '02', title: 'Build', desc: 'Add your profile, essential links, socials, and featured projects.' },
    { num: '03', title: 'Customize', desc: 'Fine-tune typography, background themes, and button aesthetics.' },
    { num: '04', title: 'Publish', desc: 'Share your one memorable link in bios, emails, and portfolios.' },
    { num: '05', title: 'Grow', desc: 'See what people interact with and evolve your page over time.' },
  ];

  return (
    <section className="relative py-28 md:py-36 border-t border-white/[0.06] bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-[12px] font-mono tracking-widest text-[#A78BFA] uppercase">
            SIMPLE SETUP
          </span>
          <span className="h-[1px] w-12 bg-white/[0.1]" />
        </div>

        <div className="max-w-3xl space-y-4 mb-16">
          <h2 className="text-[38px] sm:text-[48px] font-normal leading-[1.08] tracking-tight text-[#F4F3F0]">
            From nothing to your own page <br />
            <span className="text-[#A6A7AE] font-serif italic">in minutes.</span>
          </h2>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((s) => (
            <div
              key={s.num}
              className="p-5 rounded-xl bg-[#0D0F12] border border-white/[0.08] hover:border-[#A78BFA]/40 transition-all flex flex-col justify-between space-y-6"
            >
              <span className="text-[12px] font-mono text-[#A78BFA]">
                {s.num}
              </span>

              <div className="space-y-1.5">
                <h3 className="text-[17px] text-[#F4F3F0] font-medium">
                  {s.title}
                </h3>
                <p className="text-[13px] text-[#A6A7AE] font-light leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
