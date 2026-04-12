"use client";

import { useReducedMotion } from "framer-motion";
import { useBreakpoint, type Breakpoint } from "./use-breakpoint";

interface MotionSafeResult {
  /**
   * Whether animations are enabled.
   * False when: user prefers-reduced-motion OR breakpoint triggers safe mode.
   */
  enabled: boolean;

  /**
   * Returns the appropriate variant key.
   * - If animations disabled: returns the final visible state key ("visible" by default)
   * - If enabled: returns the provided variant key unchanged
   */
  safeVariant: (variant: string, fallback?: string) => string;

  /** Current breakpoint for conditional logic in components */
  breakpoint: Breakpoint;
}

/**
 * Combines useReducedMotion() + useBreakpoint() to give a single
 * source of truth for animation safety across the app.
 *
 * Usage:
 *   const { enabled, safeVariant, breakpoint } = useMotionSafe();
 *   <motion.div animate={safeVariant("visible")} />
 */
export function useMotionSafe(): MotionSafeResult {
  const prefersReducedMotion = useReducedMotion();
  const breakpoint = useBreakpoint();

  // Animations are always safe on all breakpoints as long as reduced-motion is not set.
  // Components can still use `breakpoint` to tune timing/easing.
  const enabled = !prefersReducedMotion;

  const safeVariant = (variant: string, fallback = "visible"): string => {
    return enabled ? variant : fallback;
  };

  return { enabled, safeVariant, breakpoint };
}
