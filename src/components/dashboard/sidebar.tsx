'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  Sparkles, 
  Link as LinkIcon, 
  Palette, 
  User, 
  FolderGit2, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  ExternalLink, 
  LogIn,
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

export function Sidebar() {
  const pathname = usePathname();
  const { 
    user, 
    profile, 
    links, 
    projects, 
    logout, 
    setIsAuthModalOpen, 
    setAuthModalMode,
    themeMode,
  } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const isDark = themeMode === 'dark';

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: Sparkles },
    { label: 'Links', href: '/dashboard/links', icon: LinkIcon, count: links.length > 0 ? links.length.toString() : undefined },
    { label: 'Blocks', href: '/dashboard/blocks', icon: LayoutGrid },
    { label: 'Store', href: '/dashboard/store', icon: ShoppingBag },
    { label: 'Audience', href: '/dashboard/audience', icon: Users },
    { label: 'Bookings', href: '/dashboard/bookings', icon: Calendar },
    { label: 'AI Studio', href: '/dashboard/ai', icon: Wand2 },
    { label: 'Appearance', href: '/dashboard/appearance', icon: Palette },
    { label: 'Profile', href: '/dashboard/profile', icon: User },
    { label: 'Projects', href: '/dashboard/projects', icon: FolderGit2, count: projects.length > 0 ? projects.length.toString() : undefined },
    { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  ];

  const secondaryItems = [
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
    { label: 'Admin Portal', href: '/admin', icon: ShieldCheck },
  ];

  return (
    <aside
      className={clsx(
        "hidden md:flex flex-col border-r backdrop-blur-xl h-screen sticky top-0 transition-all duration-300 z-30",
        collapsed ? "w-20" : "w-64",
        isDark
          ? "border-[#332B23] bg-[#181411]/90 text-[#F4EFE6]"
          : "border-[#EAE2D3] bg-[#F6F0E4]/90 text-[#1F1A16]"
      )}
    >
      {/* Brand Header */}
      <div
        className={clsx(
          "flex items-center justify-between p-5 border-b transition-colors",
          isDark ? "border-[#332B23]" : "border-[#EAE2D3]"
        )}
      >
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div
            className={clsx(
              "w-9 h-9 rounded-xl border flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0",
              isDark
                ? "bg-[#241F1A] border-[#3E342B]"
                : "bg-[#FAF6EE] border-[#DACBB4]"
            )}
          >
            <WebloomFlowerLogo className="w-6 h-6" />
          </div>
          {!collapsed && (
            <div>
              <span className="font-serif font-bold text-base tracking-tight block">
                Webloom
              </span>
              <span
                className={clsx(
                  "text-[10px] font-medium tracking-wider uppercase",
                  isDark ? "text-[#E6B86A]" : "text-[#967137]"
                )}
              >
                Creator Studio
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={clsx(
            "p-1.5 rounded-lg transition-colors",
            isDark
              ? "text-[#A89F91] hover:text-[#F4EFE6] hover:bg-[#26201B]"
              : "text-[#6E6254] hover:text-[#1F1A16] hover:bg-[#EFE7DA]"
          )}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {!collapsed && (
          <p
            className={clsx(
              "px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
              isDark ? "text-[#85796C]" : "text-[#8E8272]"
            )}
          >
            Workspace
          </p>
        )}
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 group relative",
                isActive
                  ? isDark
                    ? "bg-[#28211B] text-[#F4EFE6] border border-[#3E342B] font-semibold shadow-xs"
                    : "bg-[#EFE7DA] text-[#1F1A16] border border-[#DFCFC0] font-semibold shadow-xs"
                  : isDark
                  ? "text-[#A89F91] hover:text-[#F4EFE6] hover:bg-[#221C17]"
                  : "text-[#6E6254] hover:text-[#1F1A16] hover:bg-[#EFE7DA]/60"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={clsx(
                    "w-4 h-4 transition-colors",
                    isActive
                      ? isDark
                        ? "text-[#E6B86A]"
                        : "text-[#967137]"
                      : isDark
                      ? "text-[#A89F91] group-hover:text-[#F4EFE6]"
                      : "text-[#6E6254] group-hover:text-[#1F1A16]"
                  )}
                />
                {!collapsed && <span>{item.label}</span>}
              </div>
              {!collapsed && item.count && (
                <span
                  className={clsx(
                    "text-[10px] font-mono px-1.5 py-0.5 rounded-md",
                    isActive
                      ? isDark
                        ? "bg-[#3A3026] text-[#E6B86A]"
                        : "bg-[#E2D6C3] text-[#6E4F1F]"
                      : isDark
                      ? "bg-[#26201B] text-[#A89F91]"
                      : "bg-[#EAE2D3] text-[#6E6254]"
                  )}
                >
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}

        <div className="pt-4 pb-2">
          <div
            className={clsx(
              "border-t my-2",
              isDark ? "border-[#332B23]" : "border-[#EAE2D3]"
            )}
          />
          {!collapsed && (
            <p
              className={clsx(
                "px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
                isDark ? "text-[#85796C]" : "text-[#8E8272]"
              )}
            >
              Preferences
            </p>
          )}
          {secondaryItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group",
                  isActive
                    ? isDark
                      ? "bg-[#28211B] text-[#F4EFE6] border border-[#3E342B] font-semibold"
                      : "bg-[#EFE7DA] text-[#1F1A16] border border-[#DFCFC0] font-semibold"
                    : isDark
                    ? "text-[#A89F91] hover:text-[#F4EFE6] hover:bg-[#221C17]"
                    : "text-[#6E6254] hover:text-[#1F1A16] hover:bg-[#EFE7DA]/60"
                )}
              >
                <Icon className="w-4 h-4" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Footer Profile */}
      <div
        className={clsx(
          "p-3 border-t space-y-2",
          isDark ? "border-[#332B23] bg-[#15120F]" : "border-[#EAE2D3] bg-[#F1E9DC]"
        )}
      >
        <div
          className={clsx(
            "flex items-center justify-between p-2 rounded-xl border transition-colors",
            isDark
              ? "bg-[#221C17] border-[#382F26]"
              : "bg-[#FAF6EE] border-[#EAE2D3]"
          )}
        >
          <Link href="/dashboard/profile" className="flex items-center gap-2.5 min-w-0 flex-1">
            <div
              className={clsx(
                "relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-2",
                isDark
                  ? "bg-[#2C241E] ring-[#E6B86A]/40"
                  : "bg-[#EAE2D3] ring-[#C89D54]/40"
              )}
            >
              {profile.avatar ? (
                <Image src={profile.avatar} alt={profile.displayName} fill className="object-cover" />
              ) : (
                <div
                  className={clsx(
                    "w-full h-full flex items-center justify-center text-xs font-bold",
                    isDark ? "text-[#181410] bg-[#E6B86A]" : "text-[#FAF6EE] bg-[#1F1A16]"
                  )}
                >
                  {profile.displayName.charAt(0)}
                </div>
              )}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-xs font-semibold truncate">{profile.displayName}</p>
                <p
                  className={clsx(
                    "text-[10px] truncate",
                    isDark ? "text-[#8E8272]" : "text-[#786E62]"
                  )}
                >
                  @{profile.username}
                </p>
              </div>
            )}
          </Link>
          {!collapsed && (
            <a
              href={`/${profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                "p-1.5 rounded-lg transition-colors",
                isDark
                  ? "text-[#A89F91] hover:text-[#F4EFE6] hover:bg-[#2C241E]"
                  : "text-[#6E6254] hover:text-[#1F1A16] hover:bg-[#EFE7DA]"
              )}
              title="Open public profile"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Auth Toggle in Footer */}
        {!collapsed && (
          <div className="flex items-center justify-between px-1">
            {user ? (
              <button
                onClick={logout}
                className={clsx(
                  "flex items-center gap-1.5 text-[11px] transition-colors",
                  isDark
                    ? "text-[#85796C] hover:text-red-400"
                    : "text-[#8E8272] hover:text-red-600"
                )}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log out</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setAuthModalMode('signin');
                  setIsAuthModalOpen(true);
                }}
                className={clsx(
                  "flex items-center gap-1.5 text-[11px] hover:underline font-medium",
                  isDark ? "text-[#E6B86A]" : "text-[#967137]"
                )}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign in to save</span>
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
