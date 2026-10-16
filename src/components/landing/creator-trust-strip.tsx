'use client';

import React from 'react';
import { 
  GithubIcon, 
  SpotifyIcon, 
  FigmaIcon, 
  VercelIcon, 
  NotionIcon, 
  LinearIcon 
} from '@/components/ui/brand-icons';

export function CreatorTrustStrip() {
  const partners = [
    { name: 'GitHub', icon: GithubIcon },
    { name: 'Figma', icon: FigmaIcon },
    { name: 'Vercel', icon: VercelIcon },
    { name: 'Notion', icon: NotionIcon },
    { name: 'Linear', icon: LinearIcon },
    { name: 'Spotify', icon: SpotifyIcon },
  ];

  return (
    <section className="relative py-12 md:py-16 bg-[#08090B] border-b border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Centered Heading */}
        <p className="text-center text-[14px] text-zinc-400 font-normal mb-8 tracking-wide">
          Trusted by creators, developers and professionals
        </p>

        {/* Clean Logo Row without heavy bounding boxes, matching screenshot */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
          {partners.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.name}
                className="group flex items-center gap-2.5 text-zinc-300 hover:text-white transition-colors cursor-default"
              >
                <Icon className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />
                <span className="text-[15px] sm:text-[16px] font-medium tracking-tight text-zinc-200 group-hover:text-white transition-colors">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
