'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit3, Share2, Smartphone, Monitor, CheckCircle2 } from 'lucide-react';

export function LivePreviewSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: '01 — EDIT', title: 'Tweak Bio & Content', desc: 'Add or modify links, descriptions, and projects in seconds.' },
    { label: '02 — PREVIEW', title: 'Real-time Synchronous Canvas', desc: 'Observe sub-millisecond mobile and desktop renders as you type.' },
    { label: '03 — PUBLISH', title: 'Instant Worldwide Propagation', desc: 'One click and your personal link is live globally.' },
  ];

  return (
    <section className="relative py-28 md:py-36 border-t border-white/[0.06] bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-[12px] font-mono tracking-widest text-[#A78BFA] uppercase">
            LIVE PREVIEW
          </span>
          <span className="h-[1px] w-12 bg-white/[0.1]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline & Interactive Steps */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-[38px] sm:text-[48px] font-normal leading-[1.08] tracking-tight text-[#F4F3F0]">
              See it come together <br />
              <span className="text-[#A6A7AE] font-serif italic">as you build.</span>
            </h2>

            <p className="text-[17px] leading-relaxed text-[#A6A7AE] font-light">
              You shouldn&apos;t have to imagine what your page will look like. Webloom gives you a live interactive preview while you customize it.
            </p>

            {/* Small label: EDIT -> PREVIEW -> PUBLISH */}
            <div className="pt-2">
              <span className="inline-block text-[11px] font-mono tracking-widest text-[#A78BFA] px-3 py-1 rounded bg-[#A78BFA]/10 border border-[#A78BFA]/20">
                EDIT &rarr; PREVIEW &rarr; PUBLISH
              </span>
            </div>

            {/* Step Selector */}
            <div className="space-y-3 pt-4">
              {steps.map((s, idx) => (
                <button
                  key={s.label}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    activeStep === idx
                      ? 'bg-[#0D0F12] border-[#A78BFA]/40 shadow-sm'
                      : 'bg-transparent border-white/[0.04] opacity-70 hover:opacity-100 hover:border-white/[0.1]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono text-[#A78BFA]">
                      {s.label}
                    </span>
                  </div>
                  <h4 className="text-[15px] font-medium text-[#F4F3F0]">
                    {s.title}
                  </h4>
                  <p className="text-[12px] text-[#A6A7AE] font-light mt-0.5">
                    {s.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Simulated Live Editor / Split Preview */}
          <div className="lg:col-span-7 bg-[#0D0F12] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2 text-[12px] font-mono text-[#F4F3F0]">
                <Smartphone className="w-4 h-4 text-[#A78BFA]" />
                <span>Synchronous Mobile Rendering</span>
              </div>
              <span className="text-[11px] font-mono text-[#86EFAC] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> 0ms latency
              </span>
            </div>

            {/* Dual Pane Mock: Editor & Live Render */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Left Side: Editor Form */}
              <div className="p-4 rounded-xl bg-[#12141A] border border-white/[0.06] space-y-3 font-mono text-[12px]">
                <span className="text-[#6F7179] text-[10px] uppercase tracking-wider block">
                  DASHBOARD INPUT
                </span>
                <div className="space-y-1">
                  <label className="text-[#A6A7AE] text-[11px]">Display Name</label>
                  <div className="p-2 rounded bg-[#08090B] border border-white/[0.08] text-[#F4F3F0]">
                    Maya S.
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[#A6A7AE] text-[11px]">Headline</label>
                  <div className="p-2 rounded bg-[#08090B] border border-white/[0.08] text-[#F4F3F0]">
                    Creative Director & Writer
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[#A6A7AE] text-[11px]">Primary Link</label>
                  <div className="p-2 rounded bg-[#08090B] border border-white/[0.08] text-[#A78BFA]">
                    Selected Case Studies &rarr;
                  </div>
                </div>
              </div>

                {/* Right Side: Live Page Output */}
                <div className="p-4 rounded-xl bg-[#08090B] border border-[#A78BFA]/30 space-y-3 flex flex-col justify-between shadow-lg">
                  <span className="text-[#A78BFA] text-[10px] font-mono uppercase tracking-wider block">
                    LIVE VISITOR VIEW
                  </span>
                  <div className="text-center space-y-2 py-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white/[0.14] mx-auto shadow-md">
                      <img src="/images/avatar.jpg" alt="Younus" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="text-[15px] font-medium text-[#F4F3F0]">
                      Younus Syed
                    </h4>
                    <p className="text-[11px] text-[#A6A7AE]">
                      Software Engineer & Product Builder
                    </p>
                    <div className="p-2 rounded-lg bg-[#12141A] border border-white/[0.08] text-[12px] text-[#F4F3F0] mt-3 hover:border-[#A78BFA]/40 transition-colors">
                      Interactive Portfolio & Work &rarr;
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#6F7179] text-center">
                    webloom.site/younus
                  </span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
