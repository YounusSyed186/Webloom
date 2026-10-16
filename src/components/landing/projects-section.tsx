'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ArrowUpRight, Code, Sparkles, Layers, Box } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';

export function ProjectsSection() {
  const { setAuthModalMode, setIsAuthModalOpen } = useApp();

  const sampleProjects = [
    {
      title: 'Solara Studio',
      category: 'SaaS Platform',
      desc: 'Collaborative audio synthesizer with WebGL audio visualizer and multi-user room sync.',
      tech: ['TypeScript', 'WebAudio', 'Next.js'],
      stars: '1.2k stars',
    },
    {
      title: 'Atelier Typography',
      category: 'Design System',
      desc: 'Variable font pairing tool for editorial web design with real-time contrast checking.',
      tech: ['React', 'CSS Houdini', 'Tailwind'],
      stars: 'Featured on SiteInspire',
    },
    {
      title: 'Whisper Notes',
      category: 'Open Source',
      desc: 'Local-first voice transcription app with client-side Whisper.cpp integration.',
      tech: ['Rust', 'WASM', 'Tauri'],
      stars: '450+ forks',
    },
  ];

  return (
    <section id="projects" className="relative py-28 md:py-36 border-t border-white/[0.06] bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-[12px] font-mono tracking-widest text-[#A78BFA] uppercase">
            PROJECTS & PORTFOLIO
          </span>
          <span className="h-[1px] w-12 bg-white/[0.1]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-[38px] sm:text-[48px] font-normal leading-[1.08] tracking-tight text-[#F4F3F0]">
              Don&apos;t just share where you are. <br />
              <span className="text-[#A6A7AE] font-serif italic">Show what you&apos;ve made.</span>
            </h2>

            <p className="text-[17px] leading-relaxed text-[#A6A7AE] font-light">
              A list of links can tell people where to go. Your projects tell them <strong className="text-[#F4F3F0] font-medium">why they should care.</strong>
            </p>

            <p className="text-[15px] leading-relaxed text-[#6F7179] font-light">
              Webloom turns your page into a lightweight portfolio. Showcase products, experiments, case studies, and open-source repos with rich descriptions, technology tags, and live demos.
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  setAuthModalMode('signup');
                  setIsAuthModalOpen(true);
                }}
                className="inline-flex items-center gap-2 text-[14px] text-[#F4F3F0] font-medium hover:text-[#A78BFA] transition-colors py-2"
              >
                <span>Showcase your work</span>
                <ArrowUpRight className="w-4 h-4 text-[#A78BFA]" />
              </button>
            </div>
          </div>

          {/* Right Column: Project Showcase Cards */}
          <div className="lg:col-span-7 space-y-4">
            {sampleProjects.map((proj) => (
              <div
                key={proj.title}
                className="p-6 rounded-xl bg-[#0D0F12] border border-white/[0.08] hover:border-[#A78BFA]/40 transition-all duration-200 group space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-[18px] text-[#F4F3F0] font-medium tracking-tight">
                        {proj.title}
                      </h3>
                      <span className="text-[11px] font-mono text-[#A78BFA] px-2 py-0.5 rounded bg-[#A78BFA]/10">
                        {proj.category}
                      </span>
                    </div>
                    <p className="text-[14px] text-[#A6A7AE] font-light leading-relaxed">
                      {proj.desc}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#6F7179] group-hover:text-[#A78BFA] transition-colors shrink-0 mt-1" />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.04]">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-[#12141A] text-[11px] font-mono text-[#A6A7AE] border border-white/[0.04]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-[#6F7179]">
                    {proj.stars}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
