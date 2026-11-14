import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-medium text-[#544B41] dark:text-[#C8BDB0]">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          className={twMerge(
            clsx(
              "w-full bg-[#FAF6EE] dark:bg-[#1E1915] border border-[#DACBB4] dark:border-[#3E342A] text-[#1F1A16] dark:text-[#F4EFE6] placeholder-[#A49685] dark:placeholder-[#6E6356] text-sm rounded-xl px-3.5 py-2.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#C89D54]/25 focus:border-[#C89D54] dark:focus:border-[#E6B86A] hover:border-[#C4B39A] dark:hover:border-[#524436] disabled:opacity-50 disabled:cursor-not-allowed resize-none min-h-[90px]",
              error && "border-red-500/80 focus:ring-red-500/30 focus:border-red-500",
              className
            )
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        {hint && !error && <p className="text-xs text-[#786E62] dark:text-[#8E8272]">{hint}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
