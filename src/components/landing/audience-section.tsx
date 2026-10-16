'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function AudienceSection() {
  const audiences = [
    { title: 'Developers', desc: 'Put your projects, GitHub repositories, technical writing, and production work in one place.' },
    { title: 'Designers', desc: 'Turn your Webloom into a living portfolio of case studies, design systems, and creative direction.' },
    { title: 'Creators', desc: 'Bring your podcasts, video channels, newsletter, and social platforms together seamlessly.' },
    { title: 'Founders', desc: 'Share your products, company vision, pitch decks, blog posts, and founder journey.' },
    { title: 'Freelancers', desc: 'Give prospective clients one clear place to review past work, pricing packages, and booking.' },
    { title: 'Artists', desc: 'Create a permanent digital gallery for everything you paint, compose, illustrate, or craft.' },
    { title: 'Students', desc: 'Build a standout professional portfolio and resume presence before you even graduate.' },
    { title: 'Everyone else', desc: 'If you have things worth sharing, Webloom gives you a quiet, customizable place to put them.' },
  ];

  return (
    <section className="relative py-28 md:py-36 border-t border-white/[0.06] bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-[12px] font-mono tracking-widest text-[#A78BFA] uppercase">
            AUDIENCE
          </span>
          <span className="h-[1px] w-12 bg-white/[0.1]" />
        </div>

        <div className="max-w-3xl space-y-4 mb-16">
          <h2 className="text-[38px] sm:text-[48px] font-normal leading-[1.08] tracking-tight text-[#F4F3F0]">
            Made for people <br />
            <span className="text-[#A6A7AE] font-serif italic">who make things.</span>
          </h2>
        </div>

        {/* 8 Audience Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {audiences.map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-xl bg-[#0D0F12] border border-white/[0.08] hover:border-white/[0.18] transition-all space-y-2"
            >
              <h3 className="text-[16px] text-[#F4F3F0] font-medium">
                {item.title}
              </h3>
              <p className="text-[13px] text-[#A6A7AE] font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
