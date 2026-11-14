'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldCheck,
  Users,
  Activity,
  Layers,
  Sparkles,
  ArrowLeft,
  Server,
  Zap,
  Lock
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { clsx } from 'clsx';
import { WebloomFlowerLogo } from '@/components/ui/webloom-logo';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { themeMode } = useApp();
  const isDark = themeMode === 'dark';

  return (
    <div
      className={clsx(
        "min-h-screen flex flex-col font-sans transition-colors duration-200",
        isDark ? "bg-[#14110E] text-[#F4EFE6]" : "bg-[#F7F2E7] text-[#1F1A16]"
      )}
    >
      {/* Top Enterprise Bar */}
      <header
        className={clsx(
          "h-14 border-b px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md transition-colors",
          isDark
            ? "border-[#332B23] bg-[#181411]/90"
            : "border-[#E8DFD1] bg-[#FAF6EE]/90"
        )}
      >
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif font-bold text-sm tracking-tight block">
                Webloom Master Admin
              </span>
              <span className="text-[10px] text-red-500 font-mono uppercase tracking-wider block">
                Superuser Console
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 pl-4 border-l border-neutral-300 dark:border-neutral-800 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>PostgreSQL & RLS Healthy</span>
            </span>
            <span>·</span>
            <span className="text-neutral-400">Payment Webhooks: Active</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className={clsx(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors",
              isDark
                ? "border-[#332B23] bg-[#221C17] hover:bg-[#2A231D] text-[#C8BDB0]"
                : "border-[#DDD2BF] bg-white hover:bg-[#FAF6EE] text-[#5A4E40]"
            )}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Creator Dashboard</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

