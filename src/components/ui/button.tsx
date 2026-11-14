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
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89D54]/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98] cursor-pointer";

  const variants = {
    primary: "bg-[#1F1A16] text-[#FAF6EE] hover:bg-black dark:bg-[#E6B86A] dark:text-[#181410] dark:hover:bg-[#F2C97E] shadow-sm",
    secondary: "bg-[#EAE2D3] text-[#1F1A16] hover:bg-[#DFD5C4] border border-[#DACBB4] dark:bg-[#26201B] dark:text-[#F4EFE6] dark:hover:bg-[#342B24] dark:border-[#3E342A] shadow-xs",
    outline: "bg-transparent text-[#1F1A16] hover:bg-[#F6F0E4] border border-[#DACBB4] dark:text-[#F4EFE6] dark:hover:bg-[#26201B] dark:border-[#3E342A]",
    ghost: "bg-transparent text-[#544B41] hover:bg-[#EAE2D3]/60 hover:text-[#1F1A16] dark:text-[#A89F91] dark:hover:bg-[#26201B] dark:hover:text-[#F4EFE6]",
    glass: "bg-[#F6F0E4]/80 backdrop-blur-md text-[#1F1A16] border border-[#DACBB4]/60 hover:bg-[#F6F0E4] dark:bg-[#26201B]/80 dark:text-[#F4EFE6] dark:border-[#3E342A]/60 shadow-sm",
    danger: "bg-red-600 text-white hover:bg-red-500 shadow-sm",
    gradient: "bg-gradient-to-r from-[#C89D54] to-[#E6B86A] text-[#181410] font-semibold hover:opacity-95 shadow-sm",
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
