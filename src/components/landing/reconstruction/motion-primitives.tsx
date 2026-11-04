'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useScroll,
  MotionValue,
} from 'framer-motion';

/**
 * Top 2.5px warm golden-ochre scroll progress bar
 */
export function ScrollProgressThread() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#C89D54] via-[#F7DC6F] to-[#9C7248] origin-left z-[100] pointer-events-none shadow-[0_1px_6px_rgba(230,184,76,0.45)]"
    />
  );
}

/**
 * Hook that returns continuous, reversible scroll progress (0 -> 0.5 -> 1)
 * and spring-smoothed 3D camera transforms for any section.
 */
export function useSceneCamera(
  ref: React.RefObject<HTMLElement | null>,
  options?: {
    enterRotateX?: number;
    exitRotateX?: number;
    enterZ?: number;
    exitZ?: number;
    enterY?: number;
    exitY?: number;
  }
) {
  const {
    enterRotateX = 10.5,
    exitRotateX = -6.5,
    enterZ = -75,
    exitZ = 24,
    enterY = 34,
    exitY = -22,
  } = options ?? {};

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.5,
  });

  const rotateX = useTransform(
    smoothProgress,
    [0, 0.36, 0.66, 1],
    [enterRotateX, 0, 0, exitRotateX]
  );
  const z = useTransform(
    smoothProgress,
    [0, 0.36, 0.66, 1],
    [enterZ, 0, 0, exitZ]
  );
  const y = useTransform(
    smoothProgress,
    [0, 0.35, 0.68, 1],
    [enterY, 0, 0, exitY]
  );
  const scale = useTransform(
    smoothProgress,
    [0, 0.35, 0.68, 1],
    [0.935, 1, 1, 0.975]
  );
  const opacity = useTransform(
    smoothProgress,
    [0, 0.16, 0.86, 1],
    [0.35, 1, 1, 0.65]
  );

  return {
    scrollYProgress,
    smoothProgress,
    rotateX,
    z,
    y,
    scale,
    opacity,
  };
}

/**
 * Scroll-synchronized 3D Camera Scene Wrapper
 */
export function CinematicCameraScene({
  children,
  className = '',
  perspective = 1400,
  enterRotateX = 6.5,
  exitRotateX = -3.5,
  enterY = 24,
  exitY = -16,
}: {
  children: React.ReactNode;
  className?: string;
  perspective?: number;
  enterRotateX?: number;
  exitRotateX?: number;
  enterY?: number;
  exitY?: number;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { rotateX, z, y, scale } = useSceneCamera(sceneRef, {
    enterRotateX,
    exitRotateX,
    enterY,
    exitY,
  });

  return (
    <div
      ref={sceneRef}
      style={{ perspective }}
      className={`relative w-full ${className}`}
    >
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : {
                rotateX,
                z,
                y,
                scale,
                transformStyle: 'preserve-3d',
              }
        }
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Cinematic Section Transition Bridge
 */
export function CinematicSectionBridge({
  variant = 'gold',
}: {
  variant?: 'gold' | 'sage';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'end 35%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative w-full h-7 sm:h-9 flex flex-col items-center justify-center pointer-events-none overflow-hidden"
    >
      <div className="w-[1px] h-full bg-[#E5DAC8]/70 relative overflow-hidden">
        <motion.div
          style={{ scaleY: prefersReducedMotion ? 1 : scaleY, originY: 0 }}
          className={`w-full h-full ${
            variant === 'gold'
              ? 'bg-gradient-to-b from-[#C89D54] via-[#F7DC6F] to-[#9C7248]'
              : 'bg-gradient-to-b from-[#7E9674] via-[#B4C6A6] to-[#7E9674]'
          }`}
        />
      </div>
      <motion.span
        style={{ scale: prefersReducedMotion ? 1 : scaleY }}
        className="w-1.5 h-1.5 rounded-full bg-[#C89D54] -mt-1 shadow-[0_0_6px_rgba(200,157,84,0.6)]"
      />
    </div>
  );
}

/**
 * Magnetic wrapper for CTA buttons on desktop pointers
 */
export function MagneticWrapper({
  children,
  strength = 0.22,
  className = 'inline-block',
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 190, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 190, damping: 16, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Interactive 3D perspective tilt wrapper for paper cards & browser mockups
 */
export function Tilt3DCard({
  children,
  className = '',
  maxTilt = 7,
  scaleOnHover = 1.018,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scaleOnHover?: number;
  style?: React.CSSProperties | Record<string, unknown>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 180,
    damping: 22,
  });
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['15%', '85%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['15%', '85%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
    if (!isHovered) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={prefersReducedMotion ? undefined : { scale: scaleOnHover, y: -4 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      style={{
        ...(style as Record<string, MotionValue<number> | string | number>),
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformPerspective: 1100,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-30 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.22 : 0,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx} ${gy}, rgba(255,244,214,0.38) 0%, rgba(255,244,214,0) 48%)`
            ),
          }}
        />
      )}
    </motion.div>
  );
}

/**
 * Animated number counter when scrolled into view
 */
export function AnimatedCounter({
  value,
  suffix = '',
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(() =>
    value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;
    const el = ref.current;
    let frameId: number;
    let hasRun = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasRun) {
          hasRun = true;
          const duration = 900;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = value * eased;
            setDisplay(
              current.toLocaleString('en-US', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              })
            );
            if (progress < 1) {
              frameId = requestAnimationFrame(tick);
            }
          };
          frameId = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [value, decimals, prefersReducedMotion]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
