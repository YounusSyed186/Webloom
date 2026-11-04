'use client';

import React from 'react';
import { useWebloomTheme } from './webloom-dual-theme-context';

export function WebloomFlowerIcon({
  className = 'w-6 h-6',
  strokeColor,
}: {
  className?: string;
  strokeColor?: string;
}) {
  const theme = useWebloomTheme();
  const resolvedStroke = strokeColor ?? (theme === 'dark' ? '#F4EFE6' : '#1F1A16');

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 8 rounded petals rosette */}
      <circle cx="12" cy="12" r="2.8" stroke={resolvedStroke} strokeWidth="1.6" fill="none" />
      <circle cx="12" cy="6" r="2.4" stroke={resolvedStroke} strokeWidth="1.5" />
      <circle cx="12" cy="18" r="2.4" stroke={resolvedStroke} strokeWidth="1.5" />
      <circle cx="6" cy="12" r="2.4" stroke={resolvedStroke} strokeWidth="1.5" />
      <circle cx="18" cy="12" r="2.4" stroke={resolvedStroke} strokeWidth="1.5" />
      <circle cx="7.8" cy="7.8" r="2.4" stroke={resolvedStroke} strokeWidth="1.5" />
      <circle cx="16.2" cy="16.2" r="2.4" stroke={resolvedStroke} strokeWidth="1.5" />
      <circle cx="16.2" cy="7.8" r="2.4" stroke={resolvedStroke} strokeWidth="1.5" />
      <circle cx="7.8" cy="16.2" r="2.4" stroke={resolvedStroke} strokeWidth="1.5" />
    </svg>
  );
}

export function WebloomBrand({ className = '' }: { className?: string }) {
  const theme = useWebloomTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <WebloomFlowerIcon
        className="w-5 h-5"
        strokeColor={isDark ? '#F4EFE6' : '#1F1A16'}
      />
      <span
        className={`font-semibold text-[17px] tracking-tight font-sans ${
          isDark ? 'text-[#F4EFE6]' : 'text-[#1F1A16]'
        }`}
      >
        Webloom
      </span>
    </div>
  );
}
