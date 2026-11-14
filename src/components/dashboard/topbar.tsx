'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Share2, Search, Check, Eye, Menu, UserCheck, LogIn, Sun, Moon } from 'lucide-react';
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
    setAuthModalMode,
    themeMode,
    toggleThemeMode,
  } = useApp();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const isDark = themeMode === 'dark';

  const getPageTitle = () => {
    if (pathname.includes('/links')) return 'Links Management';
    if (pathname.includes('/blocks')) return 'Modular Blocks Studio';
    if (pathname.includes('/store')) return 'Digital Commerce & Store';
    if (pathname.includes('/bookings')) return '1-on-1 Consultations';
    if (pathname.includes('/audience')) return 'Audience CRM & Leads';
    if (pathname.includes('/ai')) return 'AI Creative Studio';
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
      <header
        className={`h-16 border-b sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 backdrop-blur-xl transition-colors duration-200 ${
          isDark
            ? 'bg-[#181411]/85 border-[#332B23] text-[#F4EFE6]'
            : 'bg-[#FAF6EE]/85 border-[#EAE2D3] text-[#1F1A16]'
        }`}
      >
        {/* Left: Page Title & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className={`md:hidden p-2 rounded-xl transition-colors ${
              isDark
                ? 'text-[#A89F91] hover:text-[#F4EFE6] hover:bg-[#26201B]'
                : 'text-[#6E6254] hover:text-[#1F1A16] hover:bg-[#F6F0E4]'
            }`}
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs hidden sm:inline ${isDark ? 'text-[#85796C]' : 'text-[#8E8272]'}`}>
                Webloom /
              </span>
              <h1 className="text-sm sm:text-base font-semibold tracking-tight font-serif">
                {getPageTitle()}
              </h1>
            </div>
          </div>
        </div>

        {/* Right: Autosave Status, Search trigger, Theme Toggle, Share, Preview buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Autosave Pill */}
          <div
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium transition-colors ${
              isDark
                ? 'bg-[#221C17] border-[#382F26] text-[#A89F91]'
                : 'bg-[#F6F0E4] border-[#E5DEC9] text-[#6E6254]'
            }`}
          >
            {isSaving ? (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>Saved</span>
              </>
            )}
          </div>

          {/* Search / Command trigger */}
          <button
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
            }}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-colors ${
              isDark
                ? 'bg-[#221C17] hover:bg-[#2C241E] border-[#382F26] text-[#A89F91]'
                : 'bg-[#F6F0E4] hover:bg-[#EFE7DA] border-[#E5DEC9] text-[#6E6254]'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search...</span>
            <kbd
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                isDark
                  ? 'bg-[#2E2721] border-[#44382E] text-[#C8BDB0]'
                  : 'bg-[#EAE2D3] border-[#DACBB4] text-[#544B41]'
              }`}
            >
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleThemeMode}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className={`p-2 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
              isDark
                ? 'bg-[#26201B] hover:bg-[#342B24] border-[#3E332A] text-[#F7DC6F]'
                : 'bg-[#F6F0E4] hover:bg-[#EAE2D3] border-[#E5DEC9] text-[#5A4D3E]'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Status / Sign In button */}
          {!user ? (
            <button
              onClick={() => handleOpenAuth('signin')}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl border transition-colors ${
                isDark
                  ? 'bg-[#221C17] border-[#382F26] text-[#F4EFE6] hover:bg-[#2C241E]'
                  : 'bg-[#F6F0E4] border-[#E5DEC9] text-[#1F1A16] hover:bg-[#EFE7DA]'
              }`}
            >
              <LogIn className={`w-3.5 h-3.5 ${isDark ? 'text-[#E6B86A]' : 'text-[#967137]'}`} />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          ) : (
            <div
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-medium ${
                isDark
                  ? 'bg-[#26201B] border-[#3E342B] text-[#E6B86A]'
                  : 'bg-[#F4ECE0] border-[#E2D4BF] text-[#7A5623]'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="truncate max-w-[100px]">{user.name || user.email}</span>
            </div>
          )}

          {/* Share Modal Trigger */}
          <button
            onClick={() => setIsShareOpen(true)}
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl border transition-colors ${
              isDark
                ? 'bg-[#221C17] border-[#382F26] text-[#F4EFE6] hover:bg-[#2C241E]'
                : 'bg-[#F6F0E4] border-[#E5DEC9] text-[#1F1A16] hover:bg-[#EFE7DA]'
            }`}
          >
            <Share2 className={`w-3.5 h-3.5 ${isDark ? 'text-[#E6B86A]' : 'text-[#967137]'}`} />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* View Live Profile Link */}
          <a
            href={`/${profile.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center text-xs font-medium px-3.5 py-2 rounded-xl transition-all gap-1.5 active:scale-95 shadow-sm ${
              isDark
                ? 'bg-[#E6B86A] hover:bg-[#F2C97E] text-[#181410] font-semibold'
                : 'bg-[#1F1A16] hover:bg-black text-[#FAF6EE]'
            }`}
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
