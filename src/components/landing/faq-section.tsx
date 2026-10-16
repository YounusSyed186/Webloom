'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is Webloom?',
      a: 'Webloom is a personal digital identity platform that lets you create one customizable page for your links, projects, social profiles, and online presence.',
    },
    {
      q: 'Is Webloom just another link-in-bio tool?',
      a: "It's designed to go further. You can use Webloom for links, but you can also showcase projects, build a portfolio-like presence, customize your visual identity, and understand how visitors interact with your page.",
    },
    {
      q: 'Do I need to know how to code?',
      a: 'No. Webloom is designed so you can create and customize your page without building a website from scratch.',
    },
    {
      q: 'Can I customize my page?',
      a: 'Yes. You can customize the visual appearance of your page, including themes, colors, typography, backgrounds, buttons, layouts, and other appearance settings supported by your plan.',
    },
    {
      q: 'Can I add my projects?',
      a: "Yes. Projects are a core part of Webloom. Add work you've built and give visitors more context than a simple URL can provide.",
    },
    {
      q: 'Can I use Webloom for my portfolio?',
      a: 'Absolutely. Webloom can function as a lightweight portfolio by combining your profile, projects, links, social presence, and contact information into one page.',
    },
    {
      q: 'Can I use my own domain?',
      a: 'If custom domains are enabled for your plan, you can connect your own custom domain (e.g. yourname.com) directly to your Webloom.',
    },
    {
      q: 'Can I see analytics?',
      a: 'Webloom provides clean, privacy-conscious analytics for supported interactions, including profile views, top destinations, and referral traffic.',
    },
    {
      q: 'Can I change my page later?',
      a: 'Yes. Your Webloom is meant to evolve with you. Update your links, projects, profile, and appearance whenever you want.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-28 md:py-36 border-t border-white/[0.06] bg-[#08090B]">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-[12px] font-mono tracking-widest text-[#A78BFA] uppercase">
            FAQ
          </span>
          <span className="h-[1px] w-12 bg-white/[0.1]" />
        </div>

        <h2 className="text-[38px] sm:text-[48px] font-normal leading-[1.08] tracking-tight text-[#F4F3F0] mb-12">
          Questions, <br />
          <span className="text-[#A6A7AE] font-serif italic">answered.</span>
        </h2>

        {/* Accordion */}
        <div className="divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={faq.q} className="py-6">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group focus:outline-none focus-visible:text-[#A78BFA]"
                >
                  <span className="text-[18px] md:text-[20px] font-normal text-[#F4F3F0] group-hover:text-[#A78BFA] transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#A6A7AE] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#A78BFA]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-[15px] md:text-[16px] leading-relaxed text-[#A6A7AE] font-light">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
