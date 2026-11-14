'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  maxWidth = 'md',
}: DialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className={twMerge(
              clsx(
                "relative w-full bg-[#FAF6EE] dark:bg-[#1E1915] border border-[#DACBB4] dark:border-[#3E342A] rounded-2xl shadow-2xl p-6 overflow-hidden z-10 my-8 text-[#1F1A16] dark:text-[#F4EFE6] transition-colors duration-200",
                maxWidthClasses[maxWidth],
                className
              )
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                {title && <h3 className="text-lg font-serif font-semibold tracking-tight text-[#1F1A16] dark:text-[#F4EFE6]">{title}</h3>}
                {description && <p className="text-xs text-[#6E6254] dark:text-[#A89F91] mt-1">{description}</p>}
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-[#6E6254] hover:text-[#1F1A16] hover:bg-[#EAE2D3] dark:text-[#A89F91] dark:hover:text-[#F4EFE6] dark:hover:bg-[#2C241E] transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = true,
}: ConfirmDialogProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={title} maxWidth="sm">
      <div className="space-y-4">
        <p className="text-sm text-[#544B41] dark:text-[#C8BDB0]">{message}</p>
        <div className="flex justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium rounded-xl text-[#6E6254] hover:bg-[#EAE2D3] dark:text-[#A89F91] dark:hover:bg-[#2C241E] transition-colors cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={clsx(
              "px-4 py-2 text-xs font-medium rounded-xl text-white transition-all shadow-sm active:scale-95 cursor-pointer",
              isDestructive
                ? "bg-red-600 hover:bg-red-500 shadow-red-600/20"
                : "bg-[#1F1A16] hover:bg-black dark:bg-[#E6B86A] dark:text-[#181410] dark:hover:bg-[#F2C97E]"
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
