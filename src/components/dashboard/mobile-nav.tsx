'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Link as LinkIcon, 
  Palette, 
  User, 
  FolderGit2, 
  BarChart3, 
  Settings, 
  X, 
  ExternalLink,
  LayoutGrid,
  ShoppingBag,
  Users,
  Calendar,
  Wand2,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { clsx } from 'clsx';
import { WebloomFlowerLogo } from '@/components/ui/webloom-logo';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const { profile, themeMode } = useApp();
  const isDark = themeMode === 'dark';

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: Sparkles },
    { label: 'Links', href: '/dashboard/links', icon: LinkIcon },
    { label: 'Blocks', href: '/dashboard/blocks', icon: LayoutGrid },
    { label: 'Store', href: '/dashboard/store', icon: ShoppingBag },
    { label: 'Audience', href: '/dashboard/audience', icon: Users },
    { label: 'Bookings', href: '/dashboard/bookings', icon: Calendar },
    { label: 'AI Studio', href: '/dashboard/ai', icon: Wand2 },
    { label: 'Appearance', href: '/dashboard/appearance', icon: Palette },
    { label: 'Profile', href: '/dashboard/profile', icon: User },
    { label: 'Projects', href: '/dashboard/projects', icon: FolderGit2 },
    { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
    { label: 'Admin', href: '/admin', icon: ShieldCheck },
  ];

  return (
    <>
      {/* Bottom Floating Navigation for Quick Access on Mobile */}
      <nav
        className={clsx(
          "md:hidden fixed bottom-0 left-0 right-0 z-30 backdrop-blur-xl border-t px-2 py-2 flex items-center justify-around transition-colors duration-200",
          isDark
            ? "bg-[#181411]/95 border-[#332B23] text-[#F4EFE6]"
            : "bg-[#F6F0E4]/95 border-[#EAE2D3] text-[#1F1A16]"
        )}
      >
        {navItems.slice(0, 5).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-medium transition-colors",
                isActive
                  ? isDark
                    ? "text-[#E6B86A] font-semibold"
                    : "text-[#967137] font-semibold"
                  : isDark
                  ? "text-[#85796C] hover:text-[#C8BDB0]"
                  : "text-[#8E8272] hover:text-[#1F1A16]"
              )}
            >
              <Icon
                className={clsx(
                  "w-4 h-4",
                  isActive
                    ? isDark
                      ? "text-[#E6B86A]"
                      : "text-[#967137]"
                    : isDark
                    ? "text-[#85796C]"
                    : "text-[#8E8272]"
                )}
              />
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
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className={clsx(
                "relative w-4/5 max-w-xs h-full border-r p-5 flex flex-col justify-between shadow-2xl transition-colors duration-200",
                isDark
                  ? "bg-[#181411] border-[#332B23] text-[#F4EFE6]"
                  : "bg-[#F6F0E4] border-[#EAE2D3] text-[#1F1A16]"
              )}
            >
              <div>
                {/* Header */}
                <div
                  className={clsx(
                    "flex items-center justify-between pb-4 border-b",
                    isDark ? "border-[#332B23]" : "border-[#EAE2D3]"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={clsx(
                        "w-8 h-8 rounded-lg border flex items-center justify-center shrink-0",
                        isDark ? "bg-[#241F1A] border-[#3E342B]" : "bg-[#FAF6EE] border-[#DACBB4]"
                      )}
                    >
                      <WebloomFlowerLogo className="w-5 h-5" />
                    </div>
                    <span className="font-serif font-bold text-base">Webloom</span>
                  </div>
                  <button
                    onClick={onClose}
                    className={clsx(
                      "p-1.5 rounded-lg transition-colors",
                      isDark
                        ? "text-[#A89F91] hover:text-[#F4EFE6] hover:bg-[#26201B]"
                        : "text-[#6E6254] hover:text-[#1F1A16] hover:bg-[#EFE7DA]"
                    )}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Links */}
                <div className="py-4 space-y-1">
                  {navItems.map((item) => {
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
                            ? isDark
                              ? "bg-[#28211B] text-[#F4EFE6] border border-[#3E342B] font-semibold"
                              : "bg-[#EFE7DA] text-[#1F1A16] border border-[#DFCFC0] font-semibold"
                            : isDark
                            ? "text-[#A89F91] hover:text-[#F4EFE6] hover:bg-[#221C17]"
                            : "text-[#6E6254] hover:text-[#1F1A16] hover:bg-[#EFE7DA]/60"
                        )}
                      >
                        <Icon
                          className={clsx(
                            "w-4 h-4",
                            isActive
                              ? isDark
                                ? "text-[#E6B86A]"
                                : "text-[#967137]"
                              : isDark
                              ? "text-[#85796C]"
                              : "text-[#8E8272]"
                          )}
                        />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div
                className={clsx(
                  "pt-4 border-t",
                  isDark ? "border-[#332B23]" : "border-[#EAE2D3]"
                )}
              >
                <a
                  href={`/${profile.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    "flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-colors",
                    isDark
                      ? "bg-[#221C17] border-[#382F26] text-[#F4EFE6]"
                      : "bg-[#FAF6EE] border-[#EAE2D3] text-[#1F1A16]"
                  )}
                >
                  <span className="truncate">View @{profile.username}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
