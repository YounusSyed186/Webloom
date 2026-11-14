'use client';

import React, { createContext, useContext, useState } from 'react';
import type { WebloomThemeMode } from '@/lib/webloom-theme-assets';
import { useApp } from '@/lib/context/app-context';

interface WebloomThemeContextValue {
  theme: WebloomThemeMode;
  isOverlay: boolean;
}

const WebloomThemeContext = createContext<WebloomThemeContextValue>({
  theme: 'light',
  isOverlay: false,
});

export function WebloomThemeProvider({
  theme,
  isOverlay = false,
  children,
}: {
  theme: WebloomThemeMode;
  isOverlay?: boolean;
  children: React.ReactNode;
}) {
  return (
    <WebloomThemeContext.Provider value={{ theme, isOverlay }}>
      {children}
    </WebloomThemeContext.Provider>
  );
}

export function useWebloomTheme(): WebloomThemeMode {
  return useContext(WebloomThemeContext).theme;
}

export function useIsWebloomOverlay(): boolean {
  return useContext(WebloomThemeContext).isOverlay;
}

/**
 * Shared Interactive State Context
 */
interface WebloomSyncStateValue {
  // Hero states
  activeStudioTab: string;
  setActiveStudioTab: React.Dispatch<React.SetStateAction<string>>;
  activeSiteId: string;
  setActiveSiteId: React.Dispatch<React.SetStateAction<string>>;
  checkedNotes: Record<string, boolean>;
  toggleNote: (item: string) => void;

  // Templates section state
  selectedTemplateIdx: number;
  setSelectedTemplateIdx: React.Dispatch<React.SetStateAction<number>>;

  // How It Works section state
  claimHandle: string;
  setClaimHandle: React.Dispatch<React.SetStateAction<string>>;

  // Insights & Sharing section state
  copiedLink: boolean;
  triggerCopyLink: () => void;

  // Pricing section state
  billingCycle: 'annual' | 'monthly';
  setBillingCycle: React.Dispatch<React.SetStateAction<'annual' | 'monthly'>>;
  currency: 'USD' | 'INR';
  setCurrency: React.Dispatch<React.SetStateAction<'USD' | 'INR'>>;

  // FAQ section state
  openFaqIdx: number | null;
  setOpenFaqIdx: React.Dispatch<React.SetStateAction<number | null>>;

  // Navbar hover state
  hoveredNav: string | null;
  setHoveredNav: React.Dispatch<React.SetStateAction<string | null>>;

  // Dark/Light Theme Mode toggle
  themeMode: 'light' | 'dark';
  setThemeMode: (mode: 'light' | 'dark') => void;
  toggleThemeMode: () => void;
}

const WebloomSyncStateContext = createContext<WebloomSyncStateValue | null>(null);

export function WebloomSyncStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeStudioTab, setActiveStudioTab] = useState<string>('Pages');
  const [activeSiteId, setActiveSiteId] = useState<string>('villa');
  const [checkedNotes, setCheckedNotes] = useState<Record<string, boolean>>({
    Portfolio: true,
    Blog: false,
    Links: false,
    Projects: false,
    'More...': false,
  });

  const [selectedTemplateIdx, setSelectedTemplateIdx] = useState<number>(2);
  const [claimHandle, setClaimHandle] = useState<string>('ayaan');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const { themeMode, setThemeMode, toggleThemeMode } = useApp();

  const toggleNote = (item: string) => {
    setCheckedNotes((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const triggerCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <WebloomSyncStateContext.Provider
      value={{
        activeStudioTab,
        setActiveStudioTab,
        activeSiteId,
        setActiveSiteId,
        checkedNotes,
        toggleNote,
        selectedTemplateIdx,
        setSelectedTemplateIdx,
        claimHandle,
        setClaimHandle,
        copiedLink,
        triggerCopyLink,
        billingCycle,
        setBillingCycle,
        currency,
        setCurrency,
        openFaqIdx,
        setOpenFaqIdx,
        hoveredNav,
        setHoveredNav,
        themeMode,
        setThemeMode,
        toggleThemeMode,
      }}
    >
      {children}
    </WebloomSyncStateContext.Provider>
  );
}

export function useWebloomSyncState(): WebloomSyncStateValue {
  const ctx = useContext(WebloomSyncStateContext);
  if (!ctx) {
    throw new Error('useWebloomSyncState must be used within WebloomSyncStateProvider');
  }
  return ctx;
}
