import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-medium text-[#544B41] dark:text-[#C8BDB0]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#786E62] dark:text-[#8E8272]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={twMerge(
              clsx(
                "w-full bg-[#FAF6EE] dark:bg-[#1E1915] border border-[#DACBB4] dark:border-[#3E342A] text-[#1F1A16] dark:text-[#F4EFE6] placeholder-[#A49685] dark:placeholder-[#6E6356] text-sm rounded-xl px-3.5 py-2.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#C89D54]/25 focus:border-[#C89D54] dark:focus:border-[#E6B86A] hover:border-[#C4B39A] dark:hover:border-[#524436] disabled:opacity-50 disabled:cursor-not-allowed",
                leftIcon && "pl-10",
                rightIcon && "pr-10",
                error && "border-red-500/80 focus:ring-red-500/30 focus:border-red-500",
                className
              )
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-[#786E62] dark:text-[#8E8272]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        {hint && !error && <p className="text-xs text-[#786E62] dark:text-[#8E8272]">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
