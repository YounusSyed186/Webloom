'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Type, Sliders, Sparkles, Check } from 'lucide-react';

export function CustomizationSection() {
  const [selectedPreset, setSelectedPreset] = useState(0);

  const presets = [
    {
      name: 'Midnight Obsidian',
      font: 'Geist Sans',
      bg: '#0D0F12',
      accent: '#A78BFA',
      desc: 'Deep near-black charcoal with restrained violet highlights for engineers & founders.',
    },
    {
      name: 'Editorial Sand',
      font: 'Newsreader Serif',
      bg: '#161412',
      accent: '#E9E1D5',
      desc: 'Warm paper tone with high-contrast typography for writers, journalists & thinkers.',
    },
    {
      name: 'Hyper Monochrome',
      font: 'Space Grotesk',
      bg: '#080808',
      accent: '#F4F3F0',
      desc: 'Brutalist geometric black-and-white for creative coders & digital artists.',
    },
  ];

  return (
    <section id="customization" className="relative py-28 md:py-36 border-t border-white/[0.06] bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-[12px] font-mono tracking-widest text-[#A78BFA] uppercase">
            CUSTOMIZATION
          </span>
          <span className="h-[1px] w-12 bg-white/[0.1]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-[38px] sm:text-[48px] font-normal leading-[1.08] tracking-tight text-[#F4F3F0]">
              No two Weblooms <br />
              <span className="text-[#A6A7AE] font-serif italic">should look the same.</span>
            </h2>

            <p className="text-[17px] leading-relaxed text-[#A6A7AE] font-light">
              Your online identity shouldn&apos;t look like everyone else&apos;s. Webloom gives you the tools to create a page that feels uniquely like you.
            </p>

            <div className="space-y-3 pt-2 text-[14px] text-[#A6A7AE]">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
                <span>Typography that sets an authentic tone</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
                <span>Color systems calibrated for optimal legibility</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
                <span>Background treatments from minimal to expressive</span>
              </div>
            </div>

            <p className="text-[15px] text-[#F4F3F0] font-normal pt-2">
              The result isn&apos;t another template. It&apos;s <span className="text-[#E9E1D5]">your space on the web.</span>
            </p>
          </div>

          {/* Right Column: Visual Preset Explorer */}
          <div className="lg:col-span-7 bg-[#0D0F12] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#6F7179]">
                CURATED AESTHETIC ENGINES
              </span>
              <span className="text-[11px] font-mono text-[#A78BFA]">
                CLICK TO SWITCH PREVIEW
              </span>
            </div>

            {/* Presets Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {presets.map((preset, idx) => (
                <button
                  key={preset.name}
                  onClick={() => setSelectedPreset(idx)}
                  className={`p-4 rounded-xl text-left transition-all border ${
                    selectedPreset === idx
                      ? 'bg-[#12141A] border-[#A78BFA]/50 shadow-lg'
                      : 'bg-[#08090B] border-white/[0.06] opacity-70 hover:opacity-100 hover:border-white/[0.14]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: preset.accent }}
                    />
                    {selectedPreset === idx && (
                      <Check className="w-3.5 h-3.5 text-[#A78BFA]" />
                    )}
                  </div>
                  <h4 className="text-[14px] font-medium text-[#F4F3F0]">
                    {preset.name}
                  </h4>
                  <span className="text-[11px] font-mono text-[#6F7179]">
                    {preset.font}
                  </span>
                </button>
              ))}
            </div>

            {/* Live Stylized Canvas Box */}
            <div
              className="p-6 rounded-xl border border-white/[0.08] space-y-4 transition-all duration-300"
              style={{ backgroundColor: presets[selectedPreset].bg }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[15px] text-[#F4F3F0] font-medium">
                  {presets[selectedPreset].name}
                </span>
                <span
                  className="text-[11px] font-mono px-2 py-0.5 rounded"
                  style={{
                    color: presets[selectedPreset].accent,
                    backgroundColor: `${presets[selectedPreset].accent}15`,
                  }}
                >
                  Active Styling
                </span>
              </div>

              <p className="text-[13px] text-[#A6A7AE] leading-relaxed">
                {presets[selectedPreset].desc}
              </p>

              {/* Sample link element */}
              <div className="p-3 rounded-lg bg-black/40 border border-white/[0.08] flex items-center justify-between text-[13px] text-[#F4F3F0]">
                <span>Sample Button Link</span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: presets[selectedPreset].accent }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
