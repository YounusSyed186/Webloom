'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, Share2, Link as LinkIcon, Check, Copy } from 'lucide-react';

export function SharingSection() {
  const surfaces = [
    'Instagram bio',
    'X profile',
    'LinkedIn',
    'GitHub README',
    'Email signature',
    'Business card',
    'PDF Resume',
    'Physical QR code',
  ];

  return (
    <section className="relative py-28 md:py-36 border-t border-white/[0.06] bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-[12px] font-mono tracking-widest text-[#A78BFA] uppercase">
            SHARING
          </span>
          <span className="h-[1px] w-12 bg-white/[0.1]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-[38px] sm:text-[48px] font-normal leading-[1.08] tracking-tight text-[#F4F3F0]">
              One link. <br />
              <span className="text-[#A6A7AE] font-serif italic">Everywhere.</span>
            </h2>

            <p className="text-[17px] leading-relaxed text-[#A6A7AE] font-light">
              Instead of constantly deciding which individual link to share, share one memorable address. Update what&apos;s behind it whenever you build something new.
            </p>

            <div className="p-4 rounded-xl bg-[#0D0F12] border border-white/[0.08] space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#A78BFA] block">
                PERMANENT ADDRESS
              </span>
              <p className="text-[14px] text-[#F4F3F0] font-normal">
                Your URL stays the same. Your page keeps evolving.
              </p>
            </div>
          </div>

          {/* Right Column: Surfaces Pill Grid & QR Code Card */}
          <div className="lg:col-span-7 bg-[#0D0F12] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#6F7179]">
                WHERE CREATORS PUT THEIR WEBLOOM
              </span>
              <span className="text-[11px] font-mono text-[#A78BFA]">
                UNIFIED DISTRIBUTION
              </span>
            </div>

            {/* Surfaces Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {surfaces.map((s) => (
                <div
                  key={s}
                  className="p-3 rounded-lg bg-[#12141A] border border-white/[0.06] text-[13px] text-[#F4F3F0] text-center font-normal"
                >
                  {s}
                </div>
              ))}
            </div>

            {/* Simulated Shareable Link Card */}
            <div className="p-4 rounded-xl bg-[#12141A] border border-[#A78BFA]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#08090B] border border-white/[0.08] flex items-center justify-center">
                  <QrCode className="w-4 h-4 text-[#A78BFA]" />
                </div>
                <div>
                  <div className="text-[14px] font-medium text-[#F4F3F0]">
                    webloom.me/yourname
                  </div>
                  <div className="text-[11px] font-mono text-[#6F7179]">
                    Includes auto-generated vector QR code
                  </div>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded bg-[#08090B] border border-white/[0.08] text-[12px] font-mono text-[#A78BFA] flex items-center gap-1.5">
                <Copy className="w-3.5 h-3.5" />
                <span>Ready to share</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
