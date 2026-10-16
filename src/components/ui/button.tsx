import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass' | 'danger' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-600/20 hover:shadow-blue-500/30",
    secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700/80 border border-zinc-700/60 shadow-sm",
    outline: "bg-transparent text-zinc-200 hover:bg-zinc-800/60 border border-zinc-700/80 hover:border-zinc-600",
    ghost: "bg-transparent text-zinc-300 hover:bg-zinc-800/60 hover:text-zinc-100",
    glass: "bg-white/10 backdrop-blur-md text-white border border-white/15 hover:bg-white/15 hover:border-white/25 shadow-lg",
    danger: "bg-red-600 text-white hover:bg-red-500 shadow-md shadow-red-600/20",
    gradient: "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white hover:opacity-95 shadow-lg shadow-indigo-500/25",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 rounded-lg gap-1.5",
    md: "text-sm px-4 py-2 rounded-xl gap-2",
    lg: "text-base px-6 py-3 rounded-2xl gap-2.5",
    icon: "h-9 w-9 rounded-xl p-0",
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Loading...</span>
        </>
      ) : children}
    </button>
  );
}
