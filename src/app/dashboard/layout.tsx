'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Topbar } from '@/components/dashboard/topbar';
import { LivePreview } from '@/components/dashboard/live-preview';
import { MobileNav } from '@/components/dashboard/mobile-nav';
import { CommandMenu } from '@/components/ui/command-menu';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden font-geist">
      {/* 1. Desktop Sidebar */}
      <Sidebar />

      {/* 2. Mobile Nav Drawer & Bottom Bar */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* 3. Main Center Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Topbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>

      {/* 4. Right Live Preview Simulator on Desktop */}
      <div className="hidden xl:block w-[380px] 2xl:w-[440px] h-full flex-shrink-0">
        <LivePreview />
      </div>

      {/* 5. Command Menu (⌘K) */}
      <CommandMenu />
    </div>
  );
}
