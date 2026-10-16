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
  Layers, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  ExternalLink, 
  LogIn
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
    setAuthModalMode 
  } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: Sparkles },
    { label: 'Links', href: '/dashboard/links', icon: LinkIcon, count: links.length > 0 ? links.length.toString() : undefined },
    { label: 'Appearance', href: '/dashboard/appearance', icon: Palette },
    { label: 'Profile', href: '/dashboard/profile', icon: User },
    { label: 'Projects', href: '/dashboard/projects', icon: FolderGit2, count: projects.length > 0 ? projects.length.toString() : undefined },
    { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  ];

  const secondaryItems = [
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <aside
      className={clsx(
        "hidden md:flex flex-col border-r border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl h-screen sticky top-0 transition-all duration-300 z-30",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between p-5 border-b border-zinc-800/80">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-[#14121F] border border-white/[0.12] flex items-center justify-center shadow-lg shadow-[#9B6BFF]/15 group-hover:scale-105 transition-transform shrink-0">
            <WebloomFlowerLogo className="w-6 h-6" />
          </div>
          {!collapsed && (
            <div>
              <span className="font-bold text-sm tracking-tight text-white block">
                Webloom
              </span>
              <span className="text-[10px] text-[#A78BFA] font-medium tracking-wider uppercase">
                Creator Studio
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {!collapsed && (
          <p className="px-3 py-1 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
            Workspace
          </p>
        )}
        {navItems.map(item => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 group relative",
                isActive
                  ? "bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={clsx("w-4 h-4 transition-colors", isActive ? "text-blue-400" : "text-zinc-400 group-hover:text-zinc-200")} />
                {!collapsed && <span>{item.label}</span>}
              </div>
              {!collapsed && item.count && (
                <span className={clsx(
                  "text-[10px] font-mono px-1.5 py-0.5 rounded-md",
                  isActive ? "bg-blue-500/20 text-blue-300" : "bg-zinc-800 text-zinc-400"
                )}>
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}

        <div className="pt-4 pb-2">
          <div className="border-t border-zinc-800/80 my-2" />
          {!collapsed && (
            <p className="px-3 py-1 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
              Preferences
            </p>
          )}
          {secondaryItems.map(item => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group",
                  isActive
                    ? "bg-blue-600/15 text-blue-400 border border-blue-500/30"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
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
      <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/40 space-y-2">
        <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <Link href="/dashboard/profile" className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-zinc-800 ring-2 ring-blue-500/30">
              {profile.avatar ? (
                <Image src={profile.avatar} alt={profile.displayName} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white bg-blue-600">
                  {profile.displayName.charAt(0)}
                </div>
              )}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{profile.displayName}</p>
                <p className="text-[10px] text-zinc-400 truncate">@{profile.username}</p>
              </div>
            )}
          </Link>
          {!collapsed && (
            <a
              href={`/${profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
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
                className="flex items-center gap-1.5 text-[11px] text-zinc-500 hover:text-red-400 transition-colors"
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
                className="flex items-center gap-1.5 text-[11px] text-blue-400 hover:underline"
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
