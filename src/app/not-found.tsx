'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#08090B] text-[#F4F3F0] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-10 h-10 rounded-lg bg-[#12141A] border border-white/[0.12] flex items-center justify-center mb-6">
        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#A78BFA] to-[#E9E1D5]" />
      </div>
      <h1 className="text-[44px] font-normal tracking-tight font-serif mb-2">
        404
      </h1>
      <p className="text-[17px] text-[#A6A7AE] font-light max-w-sm mb-8">
        This corner of the internet hasn&apos;t bloomed yet.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#12141A] border border-white/[0.12] hover:border-[#A78BFA]/50 text-[#F4F3F0] text-[14px] transition-all"
      >
        <ArrowLeft className="w-4 h-4 text-[#A78BFA]" />
        <span>Return to Webloom</span>
      </Link>
    </div>
  );
}
