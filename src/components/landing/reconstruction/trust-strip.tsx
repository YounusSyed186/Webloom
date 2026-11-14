'use client';

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useWebloomTheme, useIsWebloomOverlay } from './webloom-dual-theme-context';

export function TrustStripReconstructed() {
  const theme = useWebloomTheme();
  const isOverlay = useIsWebloomOverlay();
  const isDark = theme === 'dark';
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
  });

  const rotateX = useTransform(smoothScroll, [0, 0.5, 1], [11, 0, -8]);
  const stripX = useTransform(smoothScroll, [0, 0.5, 1], [-14, 0, 14]);
  const stripZ = useTransform(smoothScroll, [0, 0.5, 1], [-30, 0, -15]);

  return (
    <section
      ref={sectionRef}
      style={{ perspective: 1200 }}
      className="w-full pt-6 pb-8 md:pt-8 md:pb-10 select-none overflow-hidden"
    >
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : {
                rotateX,
                z: stripZ,
                transformStyle: 'preserve-3d',
              }
        }
        className="max-w-6xl mx-auto px-6 text-center"
      >
        <motion.p
          initial={isOverlay ? false : { opacity: 0, y: 8 }}
          animate={isOverlay ? { opacity: 1, y: 0 } : undefined}
          whileInView={isOverlay ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className={`text-[12px] sm:text-[13px] font-medium tracking-wide mb-6 ${
            isDark ? 'text-[#A89B8C]' : 'text-[#786D5F]'
          }`}
        >
          Trusted by creators, students, and professionals
        </motion.p>

        <motion.div
          style={prefersReducedMotion ? undefined : { x: stripX }}
          initial={isOverlay ? false : "hidden"}
          animate={isOverlay ? "visible" : undefined}
          whileInView={isOverlay ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
          variants={
            isOverlay
              ? undefined
              : {
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06 } },
                }
          }
          className={`flex flex-wrap items-center justify-center gap-7 sm:gap-10 md:gap-14 ${
            isDark ? 'text-[#EAE0D2]' : 'text-[#221E1B]'
          }`}
        >
          {/* Notion */}
          <motion.div
            initial={isOverlay ? false : undefined}
            animate={isOverlay ? { opacity: 0.85, y: 0 } : undefined}
            variants={
              isOverlay
                ? undefined
                : {
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 0.85, y: 0 },
                  }
            }
            whileHover={{ opacity: 1, y: -3, scale: 1.06 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.093-.373L18.3 2.296a1.98 1.98 0 0 0-1.213-.42l-11.488.7c-.513.047-.653.28-.466.466l-.674 1.166zm.84 3.033v13.533c0 .84.42 1.165 1.26 1.119l13.495-.793c.84-.047 1.026-.606 1.026-1.213V6.261c0-.606-.233-.886-.793-.84l-14.195.84c-.56.047-.793.373-.793.98zm12.37.747c.093.42 0 .84-.42.886l-.7.14v9.846c-.466.28-1.026.466-1.54.466-.84 0-1.26-.373-1.96-.98l-4.76-7.466v7.28l1.4.326s0 .747-.933.747l-3.36.187c-.093-.187 0-.606.373-.7l.933-.233V8.874l-1.306-.14c-.093-.42.14-.84.606-.886l3.593-.233 4.993 7.653v-6.953l-1.26-.14c-.093-.42.14-.84.606-.886l3.367-.233c.093 0 .42.28.42.747z" />
            </svg>
            <span className="font-semibold text-[13.5px] tracking-tight">Notion</span>
          </motion.div>

          {/* Figma */}
          <motion.div
            initial={isOverlay ? false : undefined}
            animate={isOverlay ? { opacity: 0.85, y: 0 } : undefined}
            variants={
              isOverlay
                ? undefined
                : {
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 0.85, y: 0 },
                  }
            }
            whileHover={{ opacity: 1, y: -3, scale: 1.06 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <svg className="w-3.5 h-4.5 fill-current" viewBox="0 0 38 57">
              <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
              <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
              <path d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z" />
              <path d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z" />
              <path d="M19 0h9.5a9.5 9.5 0 0 1 0 19H19V0z" />
            </svg>
            <span className="font-semibold text-[13.5px] tracking-tight">Figma</span>
          </motion.div>

          {/* Vercel */}
          <motion.div
            initial={isOverlay ? false : undefined}
            animate={isOverlay ? { opacity: 0.85, y: 0 } : undefined}
            variants={
              isOverlay
                ? undefined
                : {
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 0.85, y: 0 },
                  }
            }
            whileHover={{ opacity: 1, y: -3, scale: 1.06 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 1L24 22H0L12 1Z" />
            </svg>
            <span className="font-semibold text-[13.5px] tracking-tight">Vercel</span>
          </motion.div>

          {/* GitHub */}
          <motion.div
            initial={isOverlay ? false : undefined}
            animate={isOverlay ? { opacity: 0.85, y: 0 } : undefined}
            variants={
              isOverlay
                ? undefined
                : {
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 0.85, y: 0 },
                  }
            }
            whileHover={{ opacity: 1, y: -3, scale: 1.06 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="font-semibold text-[13.5px] tracking-tight">GitHub</span>
          </motion.div>

          {/* Spotify */}
          <motion.div
            initial={isOverlay ? false : undefined}
            animate={isOverlay ? { opacity: 0.85, y: 0 } : undefined}
            variants={
              isOverlay
                ? undefined
                : {
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 0.85, y: 0 },
                  }
            }
            whileHover={{ opacity: 1, y: -3, scale: 1.06 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <span className="font-semibold text-[13.5px] tracking-tight">Spotify</span>
          </motion.div>

          {/* Adobe */}
          <motion.div
            initial={isOverlay ? false : undefined}
            animate={isOverlay ? { opacity: 0.85, y: 0 } : undefined}
            variants={
              isOverlay
                ? undefined
                : {
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 0.85, y: 0 },
                  }
            }
            whileHover={{ opacity: 1, y: -3, scale: 1.06 }}
            className="flex items-center gap-2 cursor-pointer transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M13.96 0H24v24L13.96 0zM0 0h10.04L0 24V0zm4.5 24h3.69l2.76-7.07h4.09L8.19 24z" />
            </svg>
            <span className="font-semibold text-[13.5px] tracking-tight">Adobe</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
