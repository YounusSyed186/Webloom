'use client';

import { useEffect, useState } from 'react';

export interface CursorRevealBackgroundProps {
  /**
   * Optional fallback/ambient image path.
   */
  imageSrc?: string;
  /**
   * Crisp circular reveal radius (in pixels).
   * @default 85
   */
  revealRadius?: number;
  /**
   * Legacy prop kept for API compatibility.
   */
  edgeSoftness?: number;
  /**
   * Legacy prop kept for API compatibility.
   */
  smoothing?: number;
  /**
   * Legacy prop kept for API compatibility.
   */
  centerCreamAlpha?: number;
}

/**
 * Hook that determines whether the device supports fine-pointer hover and
 * standard motion, avoiding duplicate DOM rendering on mobile/touch devices.
 */
export function useCanRenderDarkReplica(): boolean {
  const [canRender, setCanRender] = useState(true);

  useEffect(() => {
    const touchQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setCanRender(!touchQuery.matches && !motionQuery.matches);
    };

    update();
    touchQuery.addEventListener('change', update);
    motionQuery.addEventListener('change', update);
    return () => {
      touchQuery.removeEventListener('change', update);
      motionQuery.removeEventListener('change', update);
    };
  }, []);

  return canRender;
}

/**
 * CursorRevealBackground
 * ----------------------
 * High-performance, zero-lag, razor-sharp circular clip-path controller:
 * - Writes CSS variables to documentElement (`--cursor-radius`, `--cursor-win-x`,
 *   `--cursor-win-y`, `--cursor-doc-x`, `--cursor-doc-y`).
 * - Never breaks when React re-renders or switches between Light and Dark mode.
 * - 1:1 instant pointer following without lag or delay.
 * - Hardware-accelerated vector circle clip-path with a sharp edge matching reference.
 */
export function CursorRevealBackground({
  revealRadius = 85,
}: CursorRevealBackgroundProps) {
  useEffect(() => {
    const root = document.documentElement;

    const isTouchOrCoarse = window.matchMedia(
      '(hover: none), (pointer: coarse)'
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (isTouchOrCoarse || prefersReducedMotion) {
      root.style.setProperty('--cursor-radius', '0px');
      return;
    }

    let currentX = window.innerWidth * 0.5;
    let currentY = window.innerHeight * 0.38;
    let targetR = 0;
    let currentR = 0;
    let isPointerInside = false;
    let rafId: number | null = null;

    const updateCSSVariables = (x: number, y: number, r: number) => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const scrollX = window.scrollX || window.pageXOffset || 0;
      root.style.setProperty('--cursor-radius', `${Math.max(0, r).toFixed(1)}px`);
      root.style.setProperty('--cursor-win-x', `${x.toFixed(1)}px`);
      root.style.setProperty('--cursor-win-y', `${y.toFixed(1)}px`);
      root.style.setProperty('--cursor-doc-x', `${(x + scrollX).toFixed(1)}px`);
      root.style.setProperty('--cursor-doc-y', `${(y + scrollY).toFixed(1)}px`);
    };

    const tick = () => {
      const dr = targetR - currentR;
      currentR += dr * 0.35;

      updateCSSVariables(currentX, currentY, currentR);

      if (Math.abs(dr) > 0.25) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        currentR = targetR;
        updateCSSVariables(currentX, currentY, currentR);
        rafId = null;
      }
    };

    const startRadiusAnimation = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      if ('pointerType' in e && e.pointerType === 'touch') return;

      currentX = e.clientX;
      currentY = e.clientY;

      if (!isPointerInside) {
        isPointerInside = true;
        targetR = revealRadius;
        startRadiusAnimation();
      } else {
        // Direct instant update for 0ms lag
        updateCSSVariables(currentX, currentY, currentR);
      }
    };

    const handleScroll = () => {
      if (!isPointerInside && currentR <= 0.1) return;
      updateCSSVariables(currentX, currentY, currentR);
    };

    const handlePointerLeave = () => {
      isPointerInside = false;
      targetR = 0;
      startRadiusAnimation();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave, {
      passive: true,
    });

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handlePointerLeave);
      root.style.setProperty('--cursor-radius', '0px');
    };
  }, [revealRadius]);

  return null;
}
