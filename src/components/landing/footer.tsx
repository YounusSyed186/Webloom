'use client';

import React from 'react';
import Link from 'next/link';
import { WebloomFlowerLogo } from '@/components/ui/webloom-logo';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#08090B] py-16 text-[#A6A7AE] text-[14px]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/[0.06]">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <WebloomFlowerLogo className="w-6 h-6" />
              <span className="font-semibold text-[17px] text-[#F5F3F7] tracking-tight">
                Webloom
              </span>
            </div>
            <p className="text-[13px] text-[#F4F3F0] font-normal">
              Your corner of the internet.
            </p>
            <p className="text-[13px] text-[#6F7179] max-w-xs">
              A personal home for everything you make, share, and care about.
            </p>
          </div>

          {/* Product Links */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#F4F3F0] block">
              Product
            </span>
            <div className="flex flex-col gap-2 text-[13px]">
              <a href="#your-page" className="hover:text-[#F4F3F0] transition-colors">Features</a>
              <a href="#projects" className="hover:text-[#F4F3F0] transition-colors">Projects</a>
              <a href="#analytics" className="hover:text-[#F4F3F0] transition-colors">Analytics</a>
              <a href="#pricing" className="hover:text-[#F4F3F0] transition-colors">Pricing</a>
            </div>
          </div>

          {/* Resources */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#F4F3F0] block">
              Resources
            </span>
            <div className="flex flex-col gap-2 text-[13px]">
              <a href="#faq" className="hover:text-[#F4F3F0] transition-colors">Help & FAQ</a>
              <a href="#your-page" className="hover:text-[#F4F3F0] transition-colors">Guides</a>
              <a href="#customization" className="hover:text-[#F4F3F0] transition-colors">Changelog</a>
            </div>
          </div>

          {/* Company & Legal */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#F4F3F0] block">
              Company
            </span>
            <div className="flex flex-col gap-2 text-[13px]">
              <a href="#privacy" className="hover:text-[#F4F3F0] transition-colors">About</a>
              <a href="#privacy" className="hover:text-[#F4F3F0] transition-colors">Contact</a>
              <a href="#privacy" className="hover:text-[#F4F3F0] transition-colors">Privacy Policy</a>
              <a href="#privacy" className="hover:text-[#F4F3F0] transition-colors">Terms of Service</a>
            </div>
          </div>

          {/* Social */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#F4F3F0] block">
              Social
            </span>
            <div className="flex flex-col gap-2 text-[13px]">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#F4F3F0] transition-colors">GitHub</a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-[#F4F3F0] transition-colors">X / Twitter</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#F4F3F0] transition-colors">Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#F4F3F0] transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] font-mono text-[#6F7179]">
          <span>© 2026 Webloom. All rights reserved.</span>
          <span>Your corner. Online.</span>
        </div>
      </div>
    </footer>
  );
}
