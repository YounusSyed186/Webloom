'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, Download, Trash2 } from 'lucide-react';

export function PrivacySection() {
  const controls = [
    { title: 'What you publish', desc: 'Toggle individual links, projects, or sections on and off with one switch.' },
    { title: 'What you share', desc: 'Choose what information is public and what remains unlisted.' },
    { title: 'How your page looks', desc: 'No forced branding, badges, or third-party ad injects.' },
    { title: 'When your page is live', desc: 'Draft mode, password protection, and instant unpublish controls.' },
  ];

  return (
    <section id="privacy" className="relative py-28 md:py-36 border-t border-white/[0.06] bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-[12px] font-mono tracking-widest text-[#A78BFA] uppercase">
            PRIVACY & TRUST
          </span>
          <span className="h-[1px] w-12 bg-white/[0.1]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-[38px] sm:text-[48px] font-normal leading-[1.08] tracking-tight text-[#F4F3F0]">
              Your page. Your content. <br />
              <span className="text-[#A6A7AE] font-serif italic">Your control.</span>
            </h2>

            <p className="text-[17px] leading-relaxed text-[#A6A7AE] font-light">
              Webloom is built around your digital identity. We believe your personal corner of the web should belong wholly to you.
            </p>

            <div className="pt-2 text-[15px] text-[#F4F3F0] font-normal">
              No invasive tracking networks. No ad pixels selling your visitor data. Just your work, presented cleanly.
            </div>
          </div>

          {/* Right Column: Control Dimensions */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {controls.map((c) => (
              <div
                key={c.title}
                className="p-5 rounded-xl bg-[#0D0F12] border border-white/[0.08] hover:border-white/[0.18] transition-all space-y-1.5"
              >
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#A78BFA] block">
                  {c.title}
                </span>
                <p className="text-[13px] text-[#A6A7AE] font-light leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
