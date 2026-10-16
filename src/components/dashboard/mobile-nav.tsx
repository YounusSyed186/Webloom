'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Link as LinkIcon, Palette, User, FolderGit2, BarChart3, Settings, X, Layers, ExternalLink } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { clsx } from 'clsx';
import { WebloomFlowerLogo } from '@/components/ui/webloom-logo';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const { profile } = useApp();

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: Sparkles },
    { label: 'Links', href: '/dashboard/links', icon: LinkIcon },
    { label: 'Appearance', href: '/dashboard/appearance', icon: Palette },
    { label: 'Profile', href: '/dashboard/profile', icon: User },
    { label: 'Projects', href: '/dashboard/projects', icon: FolderGit2 },
    { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <>
      {/* Bottom Floating Navigation for Quick Access on Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-800/80 px-2 py-2 flex items-center justify-around">
        {navItems.slice(0, 5).map(item => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-medium transition-colors",
                isActive ? "text-blue-400" : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              <Icon className={clsx("w-4 h-4", isActive ? "text-blue-400" : "text-zinc-400")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Full Drawer for Mobile */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="relative w-4/5 max-w-xs h-full bg-zinc-900 border-r border-zinc-800 p-5 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#14121F] border border-white/[0.12] flex items-center justify-center text-white shrink-0">
                      <WebloomFlowerLogo className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-sm text-white">Webloom</span>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Links */}
                <div className="py-4 space-y-1">
                  {navItems.map(item => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={clsx(
                          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors",
                          isActive
                            ? "bg-blue-600/15 text-blue-400 border border-blue-500/30"
                            : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-zinc-800">
                <a
                  href={`/${profile.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/80 text-xs font-medium text-white"
                >
                  <span>Open Public Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
