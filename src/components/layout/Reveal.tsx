import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/** Poori site ka ek hi easing, aur ek hi reveal rhythm. */
const ease = [0.22, 1, 0.36, 1] as const;

type From = "up" | "left" | "right" | "scale" | "blur";

const hiddenState: Record<From, Record<string, number | string>> = {
  up: { opacity: 0, y: 70 },
  left: { opacity: 0, x: -90 },
  right: { opacity: 0, x: 90 },
  scale: { opacity: 0, scale: 0.9, y: 40 },
  blur: { opacity: 0, y: 40, filter: "blur(14px)" },
};

const shownState = { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Section kis taraf se aaye: up, left, right, scale (zoom), blur */
  from?: From;
  delay?: number;
  duration?: number;
}

/**
 * Scroll karne par element apni direction se smoothly aata hai.
 * Sirf ek dafa chalta hai, aur reduced-motion walon ke liye bilkul band rehta hai.
 *
 * `data-motion-reveal` print CSS ke liye hai: print par har wrapper ka
 * opacity 1, transform none aur filter none ho jata hai, is liye kaghaz par
 * kuch bhi blank nahi aata.
 */
export function Reveal({
  children,
  className = "",
  from = "up",
  delay = 0,
  duration = 0.95,
}: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div data-motion-reveal className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      data-motion-reveal
      // left/right se aate waqt horizontal scrollbar na bane
      className={`overflow-x-clip ${className}`}
      initial={hiddenState[from]}
      whileInView={shownState}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -6% 0px" }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Cards ki grid ke liye: bachay ek ke baad ek aate hain (stagger). */
export function RevealGroup({
  children,
  className,
  gap = 0.12,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div data-motion-reveal className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      data-motion-reveal
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div data-motion-reveal className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      data-motion-reveal
      className={className}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.96 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease } },
      }}
    >
      {children}
    </motion.div>
  );
}
