'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Share2, ExternalLink, Search, Check, Eye, Menu, UserCheck, LogIn } from 'lucide-react';
import { useApp } from '@/lib/context/app-context';
import { Button } from '@/components/ui/button';
import { ShareModal } from '@/components/sharing/share-modal';
import { AuthModal } from '@/components/auth/auth-modal';

interface TopbarProps {
  onMobileMenuToggle?: () => void;
}

export function Topbar({ onMobileMenuToggle }: TopbarProps) {
  const pathname = usePathname();
  const { 
    user, 
    profile, 
    isSaving, 
    isAuthModalOpen, 
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode
  } = useApp();
  const [isShareOpen, setIsShareOpen] = useState(false);

  const getPageTitle = () => {
    if (pathname.includes('/links')) return 'Links Management';
    if (pathname.includes('/appearance')) return 'Appearance & Themes';
    if (pathname.includes('/profile')) return 'Profile Details';
    if (pathname.includes('/projects')) return 'Portfolio Projects';
    if (pathname.includes('/analytics')) return 'Analytics & Clicks';
    if (pathname.includes('/settings')) return 'Account Settings';
    return 'Dashboard Overview';
  };

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <header className="h-16 border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6">
        {/* Left: Page Title & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 hidden sm:inline">Webloom /</span>
              <h1 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                {getPageTitle()}
              </h1>
            </div>
          </div>
        </div>

        {/* Right: Autosave Status, Search trigger, Share, Preview buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Autosave Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400">
            {isSaving ? (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Saved</span>
              </>
            )}
          </div>

          {/* Search / Command trigger */}
          <button
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
            }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800 text-xs text-zinc-400 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search...</span>
            <kbd className="text-[10px] font-mono bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700 text-zinc-400">⌘K</kbd>
          </button>

          {/* User Status / Sign In button */}
          {!user ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenAuth('signin')}
              className="gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Sign In</span>
            </Button>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <UserCheck className="w-3.5 h-3.5" />
              <span className="truncate max-w-[100px]">{user.name || user.email}</span>
            </div>
          )}

          {/* Share Modal Trigger */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsShareOpen(true)}
            className="gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Share</span>
          </Button>

          {/* View Live Profile Link */}
          <a
            href={`/${profile.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-xs font-medium px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/20 transition-all gap-1.5 active:scale-95"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Preview Profile</span>
          </a>
        </div>
      </header>

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        profile={profile}
      />

      {/* Auth Modal Dialog */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
}
