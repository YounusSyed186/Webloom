'use client';

import React from 'react';
import Link from 'next/link';
import { WebloomBrand } from './webloom-logo';
import { useWebloomTheme } from './webloom-dual-theme-context';

export function WebloomFooter() {
  const theme = useWebloomTheme();
  const isDark = theme === 'dark';

  return (
    <footer
      className={`w-full border-t py-12 select-none ${
        isDark
          ? 'bg-[#161310] border-[#2E261F]'
          : 'bg-[#FAF6EE] border-[#E8DDCE]/70'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <WebloomBrand />
          <span
            className={`text-[12.5px] ${
              isDark ? 'text-[#A89B8C]' : 'text-[#786D5F]'
            }`}
          >
            — Your corner of the internet.
          </span>
        </div>

        <div
          className={`flex items-center gap-6 text-[12.5px] font-medium ${
            isDark ? 'text-[#A89B8C]' : 'text-[#786D5F]'
          }`}
        >
          <Link
            href="#product"
            className={`transition-colors ${
              isDark ? 'hover:text-[#F4EFE6]' : 'hover:text-black'
            }`}
          >
            Product
          </Link>
          <Link
            href="#templates"
            className={`transition-colors ${
              isDark ? 'hover:text-[#F4EFE6]' : 'hover:text-black'
            }`}
          >
            Templates
          </Link>
          <Link
            href="#pricing"
            className={`transition-colors ${
              isDark ? 'hover:text-[#F4EFE6]' : 'hover:text-black'
            }`}
          >
            Pricing
          </Link>
          <span className={isDark ? 'text-[#4A3E33]' : 'text-[#D5CAA8]'}>·</span>
          <span>© {new Date().getFullYear()} Webloom</span>
        </div>
      </div>
    </footer>
  );
}
