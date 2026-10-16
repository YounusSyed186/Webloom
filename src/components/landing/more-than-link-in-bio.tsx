'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Palette, 
  Link2, 
  FolderGit2, 
  BarChart3, 
  ArrowRight,
  ChevronRight,
  FileText,
  Mail,
  ExternalLink
} from 'lucide-react';

export function MoreThanLinkInBioSection() {
  return (
    <section id="more-than-link" className="relative py-24 md:py-32 bg-[#08090B] border-b border-white/[0.06] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-8 items-start">
          
          {/* ======================================================== */}
          {/* 📝 LEFT COLUMN: Heading & Copy (xl:col-span-3) */}
          {/* ======================================================== */}
          <div className="xl:col-span-3 space-y-4 pt-2">
            <h2 className="text-[34px] sm:text-[40px] font-bold leading-[1.1] tracking-tight text-white">
              <span className="text-[#9B6BFF]">More</span> than a link in bio
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#9CA3AF] font-light max-w-[340px]">
              Webloom helps you create a beautiful, customizable home for your work, links, projects and social presence — all in one place.
            </p>
          </div>

          {/* ======================================================== */}
          {/* 🎴 RIGHT AREA: 4 Feature Cards Grid (xl:col-span-9) */}
          {/* ======================================================== */}
          <div className="xl:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* ---------------- CARD 1: Beautiful Themes ---------------- */}
            <a
              href="#customization"
              className="group p-5 rounded-2xl bg-[#0D0F14] border border-white/[0.08] hover:border-[#9B6BFF]/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-[#9B6BFF]/5 min-h-[310px]"
            >
              {/* Upper Visual: 3D Layered Fanned Cards Stack */}
              <div className="relative h-40 w-full rounded-xl bg-[#12141A] border border-white/[0.04] p-3 flex items-center justify-center overflow-hidden">
                <div className="relative w-44 h-28 flex items-center justify-center">
                  
                  {/* Card 4 (Deep blue / cyan layer) */}
                  <div className="absolute top-2 -left-3 w-28 h-24 rounded-lg bg-[#0C1E3A] border border-[#38BDF8]/30 rotate-[-12deg] shadow-lg opacity-60 group-hover:rotate-[-15deg] transition-transform duration-300" />
                  
                  {/* Card 3 (Warm Terracotta / Amber layer) */}
                  <div className="absolute top-1 left-2 w-28 h-24 rounded-lg bg-[#2E1515] border border-[#FB923C]/40 rotate-[-6deg] shadow-lg opacity-80 group-hover:rotate-[-8deg] transition-transform duration-300" />
                  
                  {/* Card 2 (Deep Violet layer) */}
                  <div className="absolute top-0 right-1 w-28 h-24 rounded-lg bg-[#24133A] border border-[#A78BFA]/50 rotate-[6deg] shadow-xl group-hover:rotate-[8deg] transition-transform duration-300" />
                  
                  {/* Card 1 (Front Obsidian Profile Card) */}
                  <div className="absolute top-1 left-7 w-32 h-26 rounded-xl bg-[#161822] border border-white/[0.18] p-2.5 shadow-2xl flex flex-col items-center justify-between z-10">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 relative mt-0.5 bg-zinc-800">
                      <Image
                        src="/images/avatar.jpg"
                        alt="Avatar preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="w-16 h-1.5 rounded-full bg-white/30 my-1" />
                    <div className="w-full space-y-1">
                      <div className="w-full h-2 rounded bg-white/10" />
                      <div className="w-3/4 h-2 rounded bg-white/10 mx-auto" />
                    </div>
                  </div>

                </div>
              </div>

              {/* Lower Info */}
              <div className="pt-4">
                <div className="w-7 h-7 rounded-lg bg-[#9B6BFF]/20 text-[#A78BFA] border border-[#9B6BFF]/30 flex items-center justify-center mb-2.5">
                  <Palette className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-1 group-hover:text-[#C4B5FD] transition-colors">
                  Beautiful Themes
                </h3>
                <p className="text-[12px] text-[#9CA3AF] font-light leading-relaxed">
                  Choose from 13+ themes and make it truly yours.
                </p>
              </div>
            </a>

            {/* ---------------- CARD 2: Custom Links ---------------- */}
            <a
              href="#your-page"
              className="group p-5 rounded-2xl bg-[#0D0F14] border border-white/[0.08] hover:border-[#9B6BFF]/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-[#9B6BFF]/5 min-h-[310px]"
            >
              {/* Upper Visual: Miniature Links Container */}
              <div className="relative h-40 w-full rounded-xl bg-[#12141A] border border-white/[0.04] p-3 flex flex-col justify-center gap-2 overflow-hidden">
                {/* Link Row 1 */}
                <div className="p-2 rounded-lg bg-[#181A24] border border-white/[0.08] flex items-center justify-between text-[11px] text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px]">
                      📁
                    </span>
                    <span className="font-medium text-zinc-200">My Projects</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-zinc-500" />
                </div>

                {/* Link Row 2 */}
                <div className="p-2 rounded-lg bg-[#181A24] border border-white/[0.08] flex items-center justify-between text-[11px] text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px]">
                      📝
                    </span>
                    <span className="font-medium text-zinc-200">Blog</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-zinc-500" />
                </div>

                {/* Link Row 3 */}
                <div className="p-2 rounded-lg bg-[#181A24] border border-white/[0.08] flex items-center justify-between text-[11px] text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px]">
                      ✉️
                    </span>
                    <span className="font-medium text-zinc-200">Newsletter</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-zinc-500" />
                </div>
              </div>

              {/* Lower Info */}
              <div className="pt-4">
                <div className="w-7 h-7 rounded-lg bg-[#9B6BFF]/20 text-[#A78BFA] border border-[#9B6BFF]/30 flex items-center justify-center mb-2.5">
                  <Link2 className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-1 group-hover:text-[#C4B5FD] transition-colors">
                  Custom Links
                </h3>
                <p className="text-[12px] text-[#9CA3AF] font-light leading-relaxed">
                  Share anything — projects, articles, videos, products and more.
                </p>
              </div>
            </a>

            {/* ---------------- CARD 3: Showcase Projects ---------------- */}
            <a
              href="#projects"
              className="group p-5 rounded-2xl bg-[#0D0F14] border border-white/[0.08] hover:border-[#9B6BFF]/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-[#9B6BFF]/5 min-h-[310px]"
            >
              {/* Upper Visual: Project Showcase Preview */}
              <div className="relative h-40 w-full rounded-xl bg-[#12141A] border border-white/[0.04] p-2.5 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full rounded-lg bg-[#181A24] border border-white/[0.08] p-2 flex flex-col justify-between relative overflow-hidden group-hover:border-[#9B6BFF]/30 transition-colors">
                  
                  {/* Project thumbnail / cover mockup */}
                  <div className="w-full h-20 rounded-md bg-gradient-to-tr from-[#1E1B4B] via-[#2E1065] to-[#4C1D95] relative overflow-hidden flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 blur-md absolute" />
                    <FolderGit2 className="w-7 h-7 text-[#DDD6FE] relative z-10" />
                    <span className="absolute top-1.5 left-1.5 text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-zinc-300 border border-white/10">
                      Open Source
                    </span>
                  </div>

                  {/* Project Details */}
                  <div className="pt-1.5 flex items-center justify-between">
                    <div>
                      <h4 className="text-[11px] font-semibold text-white truncate max-w-[120px]">Webloom Studio</h4>
                      <p className="text-[9px] text-zinc-400 font-mono">React · Next.js · AI</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                  </div>

                </div>
              </div>

              {/* Lower Info */}
              <div className="pt-4">
                <div className="w-7 h-7 rounded-lg bg-[#9B6BFF]/20 text-[#A78BFA] border border-[#9B6BFF]/30 flex items-center justify-center mb-2.5">
                  <FolderGit2 className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-1 group-hover:text-[#C4B5FD] transition-colors">
                  Showcase Projects
                </h3>
                <p className="text-[12px] text-[#9CA3AF] font-light leading-relaxed">
                  Highlight your best work with beautiful project cards.
                </p>
              </div>
            </a>

            {/* ---------------- CARD 4: Built-in Analytics ---------------- */}
            <a
              href="#analytics"
              className="group p-5 rounded-2xl bg-[#0D0F14] border border-white/[0.08] hover:border-[#9B6BFF]/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-[#9B6BFF]/5 min-h-[310px]"
            >
              {/* Upper Visual: Metric & Purple Bar Chart matching screenshot */}
              <div className="relative h-40 w-full rounded-xl bg-[#12141A] border border-white/[0.04] p-3 flex flex-col justify-between overflow-hidden">
                
                {/* Metric Header */}
                <div>
                  <h4 className="text-[22px] font-bold text-white tracking-tight leading-none mb-1">
                    14.2K
                  </h4>
                  <span className="text-[11px] font-medium text-emerald-400 font-mono">
                    ↑ 41.6%
                  </span>
                </div>

                {/* Rising Purple Bar Chart */}
                <div className="flex items-end justify-between gap-1.5 h-16 w-full pt-2">
                  <div className="w-2 h-4 rounded-t-sm bg-[#9B6BFF]/30" />
                  <div className="w-2 h-6 rounded-t-sm bg-[#9B6BFF]/40" />
                  <div className="w-2 h-5 rounded-t-sm bg-[#9B6BFF]/45" />
                  <div className="w-2 h-8 rounded-t-sm bg-[#9B6BFF]/55" />
                  <div className="w-2 h-7 rounded-t-sm bg-[#9B6BFF]/65" />
                  <div className="w-2 h-11 rounded-t-sm bg-[#9B6BFF]/80" />
                  <div className="w-2 h-10 rounded-t-sm bg-[#9B6BFF]/90" />
                  <div className="w-2 h-14 rounded-t-sm bg-[#9B6BFF]" />
                  <div className="w-2 h-16 rounded-t-sm bg-[#C084FC]" />
                </div>

              </div>

              {/* Lower Info */}
              <div className="pt-4">
                <div className="w-7 h-7 rounded-lg bg-[#9B6BFF]/20 text-[#A78BFA] border border-[#9B6BFF]/30 flex items-center justify-center mb-2.5">
                  <BarChart3 className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-1 group-hover:text-[#C4B5FD] transition-colors">
                  Built-in Analytics
                </h3>
                <p className="text-[12px] text-[#9CA3AF] font-light leading-relaxed">
                  See what&apos;s working with detailed insights.
                </p>
              </div>
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}
