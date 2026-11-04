'use client';

import React from 'react';
import { useWebloomTheme } from './webloom-dual-theme-context';

export function SparkleStar({
  className = 'w-4 h-4',
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const theme = useWebloomTheme();
  const strokeColor = theme === 'dark' ? '#E6B86A' : '#2E2822';

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* 4-point star hand drawn */}
      <path
        d="M12 2C12.5 7.5 16.5 11.5 22 12C16.5 12.5 12.5 16.5 12 22C11.5 16.5 7.5 12.5 2 12C7.5 11.5 11.5 7.5 12 2Z"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
