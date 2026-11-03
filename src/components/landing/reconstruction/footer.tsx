import React from 'react';
import Link from 'next/link';
import { WebloomBrand } from './webloom-logo';

export function WebloomFooter() {
  return (
    <footer className="w-full bg-[#FAF6EE] border-t border-[#E8DDCE]/70 py-12 select-none">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <WebloomBrand />
          <span className="text-[12.5px] text-[#786D5F]">
            — Your corner of the internet.
          </span>
        </div>

        <div className="flex items-center gap-6 text-[12.5px] font-medium text-[#786D5F]">
          <Link href="#product" className="hover:text-black transition-colors">
            Product
          </Link>
          <Link href="#templates" className="hover:text-black transition-colors">
            Templates
          </Link>
          <Link href="#pricing" className="hover:text-black transition-colors">
            Pricing
          </Link>
          <span className="text-[#D5CAA8]">·</span>
          <span>© {new Date().getFullYear()} Webloom</span>
        </div>
      </div>
    </footer>
  );
}

