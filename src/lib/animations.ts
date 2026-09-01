import type { Variants, Transition } from "framer-motion";

/** Shared easing — a soft overshoot-free curve used across every section. */
export const ease = [0.16, 1, 0.3, 1] as const;

export const transition: Transition = { duration: 0.65, ease };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition },
};

/**
 * Parent wrapper: children using `fadeUp` animate in sequence rather than all
 * at once. `delayChildren` lets a section's heading land first.
 */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Viewport config shared by every scroll-triggered section. */
export const viewport = { once: true, margin: "-80px" } as const;
