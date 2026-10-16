'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, CheckCircle2, Clock, Feather, ShieldCheck } from 'lucide-react';

export function HeroVisual() {
  const [activeMood, setActiveMood] = useState<'calm' | 'focused' | 'clear'>('calm');

  const moods = [
    { label: 'CALM', color: '#A78BFA', bg: 'rgba(167, 139, 250, 0.12)' },
    { label: 'FOCUSED', color: '#E9E1D5', bg: 'rgba(233, 225, 213, 0.12)' },
    { label: 'CLEAR', color: '#9B7AEF', bg: 'rgba(155, 122, 239, 0.12)' },
  ];

  return (
    <div className="relative w-full max-w-[620px] mx-auto lg:max-w-none">
      {/* Background ambient light - extremely subtle radial */}
      <div 
        className="absolute -top-12 -right-12 w-96 h-96 rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* Main Journal Canvas Interface */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="relative z-10 bg-[#0D0F12] border border-white/[0.08] rounded-xl p-6 md:p-8 transition-colors hover:border-white/[0.14]"
      >
        {/* Journal Top Meta Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#A78BFA]" />
            <span className="text-[12px] font-mono uppercase tracking-widest text-[#A6A7AE]">
              TODAY • OCT 08 • 08:45 AM
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#6F7179] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A78BFA]" />
              ENCRYPTED
            </span>
          </div>
        </div>

        {/* Thought Body Area */}
        <div className="py-6 space-y-4">
          <div className="flex items-center gap-2">
            <Feather className="w-4 h-4 text-[#A78BFA]" />
            <span className="text-[13px] tracking-wide text-[#A6A7AE]">
              Daily Reflection
            </span>
          </div>

          <p className="text-[17px] md:text-[19px] leading-relaxed text-[#F4F3F0] font-light">
            &ldquo;Today I felt more focused after giving myself twenty minutes of uninterrupted space before checking the morning feed. The noise quietly dissolved once my intentions were put on paper.&rdquo;
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#12141A] border border-white/[0.06] text-[11px] font-mono text-[#A6A7AE]">
              #clarity
            </span>
            <span className="px-2.5 py-1 rounded bg-[#12141A] border border-white/[0.06] text-[11px] font-mono text-[#A6A7AE]">
              #morning-routine
            </span>
            <span className="px-2.5 py-1 rounded bg-[#12141A] border border-white/[0.06] text-[11px] font-mono text-[#A6A7AE]">
              #deep-work
            </span>
          </div>
        </div>

        {/* Subtle Mood Selector & Micro Trace */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#6F7179]">
              MOOD
            </span>
            <div className="flex items-center gap-1.5 bg-[#12141A] p-1 rounded-md border border-white/[0.06]">
              {moods.map((m) => {
                const isSelected = activeMood === m.label.toLowerCase();
                return (
                  <button
                    key={m.label}
                    onClick={() => setActiveMood(m.label.toLowerCase() as any)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono tracking-wider transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#08090B] text-[#F4F3F0] border border-white/[0.14]'
                        : 'text-[#6F7179] hover:text-[#A6A7AE]'
                    }`}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3 text-[12px] font-mono text-[#A6A7AE]">
            <span>WORDS: <strong className="text-[#F4F3F0] font-normal">42</strong></span>
            <span className="text-white/[0.1]">•</span>
            <span>TIME: <strong className="text-[#F4F3F0] font-normal">3m 12s</strong></span>
          </div>
        </div>
      </motion.div>

      {/* Floating Context Fragment 1: FOCUS DELTA (Asymmetric Top Right) */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className="hidden sm:flex absolute -top-5 -right-4 z-20 items-center gap-3 bg-[#12141A] border border-white/[0.1] rounded-lg px-4 py-2.5 shadow-2xl backdrop-blur-sm"
      >
        <div className="w-2 h-2 rounded-full bg-[#A78BFA] animate-pulse" />
        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#6F7179]">
            FOCUS METRIC
          </span>
          <span className="text-[13px] font-medium text-[#F4F3F0]">
            +18% clarity score
          </span>
        </div>
      </motion.div>

      {/* Floating Context Fragment 2: PROMPT SPARK (Asymmetric Bottom Left) */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="hidden sm:flex absolute -bottom-6 -left-6 z-20 items-start gap-3 bg-[#12141A] border border-white/[0.1] rounded-lg p-3.5 max-w-[280px] shadow-2xl backdrop-blur-sm"
      >
        <Compass className="w-4 h-4 text-[#A78BFA] shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#6F7179]">
            PROMPT OF THE DAY
          </span>
          <p className="text-[12px] text-[#A6A7AE] leading-snug">
            &ldquo;What thought is asking for your patience right now?&rdquo;
          </p>
        </div>
      </motion.div>

      {/* Fine connecting decorative line */}
      <div 
        className="hidden lg:block absolute -left-12 top-1/2 w-12 h-[1px] border-t border-dashed border-white/[0.12] pointer-events-none"
      />
    </div>
  );
}
