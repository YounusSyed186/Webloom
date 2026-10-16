'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FolderGit2, 
  FileText, 
  Mail, 
  ShoppingBag, 
  Send,
  ArrowUpRight,
  Code2,
  Share2
} from 'lucide-react';
import { GithubIcon, XIcon } from '@/components/ui/icons';

export function LinksSection() {
  const destinations = [
    { title: 'Portfolio', desc: "Show people what you've built with deep case studies.", icon: FolderGit2, tag: 'Showcase' },
    { title: 'GitHub', desc: 'Share the repositories, tools, and code behind your work.', icon: GithubIcon, tag: 'Source Code' },
    { title: 'Socials', desc: 'Connect your active presence on X, Bluesky, and LinkedIn.', icon: XIcon, tag: 'Network' },
    { title: 'Resume', desc: 'Give collaborators and hiring teams quick access to your history.', icon: FileText, tag: 'Experience' },
    { title: 'Newsletter', desc: 'Turn casual visitors into loyal readers and subscribers.', icon: Mail, tag: 'Audience' },
    { title: 'Store & Products', desc: 'Share digital assets, templates, books, or merchandise.', icon: ShoppingBag, tag: 'Commerce' },
    { title: 'Direct Contact', desc: 'Make it effortless for clients to book time or email you.', icon: Send, tag: 'Inquiries' },
  ];

  return (
    <section className="relative py-28 md:py-36 border-t border-white/[0.06] bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-[12px] font-mono tracking-widest text-[#A78BFA] uppercase">
            LINKS & DESTINATIONS
          </span>
          <span className="h-[1px] w-12 bg-white/[0.1]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-[38px] sm:text-[48px] font-normal leading-[1.08] tracking-tight text-[#F4F3F0]">
              Everything worth sharing. <br />
              <span className="text-[#A6A7AE] font-serif italic">In one place.</span>
            </h2>

            <p className="text-[17px] leading-relaxed text-[#A6A7AE] font-light">
              Your audience shouldn&apos;t have to hunt for you across fragmented platforms. Bring your most important destinations together into one elegant stream.
            </p>

            <p className="text-[15px] leading-relaxed text-[#6F7179] font-light">
              Add your links, arrange them with drag-and-drop ease, and keep your page up to date from one unified dashboard.
            </p>
          </div>

          {/* Right Column: Destination Stack */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {destinations.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.title}
                  className="p-4 rounded-xl bg-[#0D0F12] border border-white/[0.08] hover:border-white/[0.18] transition-all duration-200 group flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-md bg-[#12141A] border border-white/[0.08] flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-[#A78BFA]" />
                      </div>
                      <span className="text-[15px] font-medium text-[#F4F3F0]">
                        {d.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F7179] px-2 py-0.5 rounded bg-white/[0.04]">
                      {d.tag}
                    </span>
                  </div>

                  <p className="text-[12px] text-[#A6A7AE] font-light leading-relaxed">
                    {d.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
