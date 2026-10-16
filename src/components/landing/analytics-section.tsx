'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, MousePointer, Globe, ArrowRight, Eye } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';

export function AnalyticsSection() {
  const { setAuthModalMode, setIsAuthModalOpen } = useApp();

  const metrics = [
    { label: 'Profile views', val: '4,820', change: '+14% this week', icon: Eye },
    { label: 'Link clicks', val: '1,340', change: '+22% conversion', icon: MousePointer },
    { label: 'Avg CTR', val: '27.8%', change: 'High engagement', icon: TrendingUp },
  ];

  const topReferrers = [
    { source: 'X / Twitter', share: '46%' },
    { source: 'GitHub Repos', share: '28%' },
    { source: 'LinkedIn Profile', share: '16%' },
    { source: 'Direct / QR Code', share: '10%' },
  ];

  return (
    <section id="analytics" className="relative py-28 md:py-36 border-t border-white/[0.06] bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-[12px] font-mono tracking-widest text-[#A78BFA] uppercase">
            ANALYTICS & INSIGHTS
          </span>
          <span className="h-[1px] w-12 bg-white/[0.1]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-[38px] sm:text-[48px] font-normal leading-[1.08] tracking-tight text-[#F4F3F0]">
              Know what people <br />
              <span className="text-[#A6A7AE] font-serif italic">actually find.</span>
            </h2>

            <p className="text-[17px] leading-relaxed text-[#A6A7AE] font-light">
              Your page shouldn&apos;t just look good. It should tell you what matters. Webloom gives you a clear view of how people interact with your corner of the internet.
            </p>

            <p className="text-[15px] leading-relaxed text-[#6F7179] font-light">
              No complicated corporate dashboards. Just clean, useful information about your audience, top destinations, and referral channels.
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  setAuthModalMode('signup');
                  setIsAuthModalOpen(true);
                }}
                className="inline-flex items-center gap-2 text-[14px] text-[#F4F3F0] font-medium hover:text-[#A78BFA] transition-colors py-2"
              >
                <span>Explore your analytics</span>
                <ArrowRight className="w-4 h-4 text-[#A78BFA]" />
              </button>
            </div>
          </div>

          {/* Right Column: Clean Analytics Dashboard Preview */}
          <div className="lg:col-span-7 bg-[#0D0F12] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2 text-[12px] font-mono text-[#F4F3F0]">
                <BarChart3 className="w-4 h-4 text-[#A78BFA]" />
                <span>30-Day Activity Stream</span>
              </div>
              <span className="text-[11px] font-mono text-[#6F7179]">
                UPDATED REAL-TIME
              </span>
            </div>

            {/* Metric KPI cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {metrics.map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.label}
                    className="p-4 rounded-xl bg-[#12141A] border border-white/[0.06] space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#6F7179] uppercase">
                        {m.label}
                      </span>
                      <Icon className="w-3.5 h-3.5 text-[#A78BFA]" />
                    </div>
                    <div className="text-[22px] font-normal text-[#F4F3F0]">
                      {m.val}
                    </div>
                    <div className="text-[11px] text-[#86EFAC] font-mono">
                      {m.change}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Referral Sources Stack */}
            <div className="p-4 rounded-xl bg-[#12141A] border border-white/[0.06] space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#6F7179] block">
                TOP TRAFFIC SOURCES
              </span>
              <div className="space-y-2">
                {topReferrers.map((r) => (
                  <div key={r.source} className="space-y-1">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-[#F4F3F0] font-normal">{r.source}</span>
                      <span className="text-[#A78BFA] font-mono">{r.share}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#08090B] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#A78BFA] to-[#E9E1D5] rounded-full"
                        style={{ width: r.share }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
