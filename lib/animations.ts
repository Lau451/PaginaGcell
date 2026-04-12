/**
 * Animation Design Tokens
 *
 * Centralized animation configs following ui-design-system principles.
 * Use these in all Framer Motion components for consistency.
 */

// ── Spring Configs ──
// Use these for natural, organic micro-interactions
export const spring = {
  // Quick, snappy feedback (buttons, FAB)
  snappy: { type: "spring" as const, stiffness: 400, damping: 28 },
  // Bouncy, playful (cards, hover)
  bouncy: { type: "spring" as const, stiffness: 300, damping: 20 },
  // Smooth, elegant (full-page transitions)
  smooth: { type: "spring" as const, stiffness: 200, damping: 30 },
}

// ── Durations (seconds) ──
export const duration = {
  fast: 0.2,      // micro-interactions (button tap)
  normal: 0.35,   // default for most animations
  slow: 0.6,      // scroll-triggered, full page
}

// ── Easing Curves ──
export const easing = {
  easeInOut: [0.4, 0, 0.2, 1],    // Smooth curve for entrances
  easeOut: [0.4, 0, 1, 1],        // Deceleration
  // WOW Factor V1 — extended easing tokens
  entrance: [0.22, 1, 0.36, 1],   // Fast out, slow finish (premium feel)
  exit: [0.55, 0, 1, 0.45],       // Fast acceleration on exit
  bouncy: [0.34, 1.56, 0.64, 1],  // Overshoot — playful bounce
}

// ── Reusable Variants ──

// Fade in from nothing
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

// Fade in + slide up (most common entrance)
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// Fade in + slide up with scale (cards, products)
export const slideUp = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

// Fade out + slide down (exit animation)
export const slideDown = {
  hidden: { opacity: 0, y: -16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

// Slide in from left
export const slideInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

// Slide in from right
export const slideInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
}

// Slide in from left (exit direction)
export const slideOutLeft = {
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

// Slide in from right (exit direction)
export const slideOutRight = {
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

// Scale up entrance
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

// ── WOW Factor V1: Hero Variant Configs ──

// Entrance bezier tuple — typed for Framer Motion compatibility
const entranceCurve = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Hero image entrance: blur dissolve (desktop only — mobile uses opacity only)
export const heroImageEntrance = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: entranceCurve },
  },
}

// Mobile version: opacity only (no blur — avoids GPU pressure on low-end)
export const heroImageEntranceMobile = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: entranceCurve },
  },
}

// Per-word stagger: each word slides up with stagger (desktop)
export const wordVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: entranceCurve },
  },
}

// Per-word stagger: mobile version (20% faster)
export const wordVariantMobile = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: entranceCurve },
  },
}

// Counter reveal: count up from 0 — used with useMotionValue
export const counterReveal = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: entranceCurve },
  },
}

// ── Container Variants (for staggering children) ──

// Hero text word-stagger container (desktop)
export const staggerHeroText = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

// Hero text word-stagger container (mobile — tighter timing)
export const staggerHeroTextMobile = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.064,
      delayChildren: 0.08,
    },
  },
}

// Standard stagger: 0.08s delay between children
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

// Faster stagger for quick sequences (FAB popup items)
export const staggerContainerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
}

// Scroll-aware stagger: waits for whileInView to trigger
export const staggerOnScroll = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.0,
    },
  },
}

// ── Transition Defaults ──
export const transitionDefaults = {
  // Default for most animations
  normal: {
    duration: duration.normal,
    ease: easing.easeInOut,
  },
  // Fast for micro-interactions
  fast: {
    duration: duration.fast,
    ease: easing.easeOut,
  },
  // Spring-based (feels natural)
  spring: spring.smooth,
}
