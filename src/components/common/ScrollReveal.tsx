import type { ElementType, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeIn, fadeUp, staggerParent } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

export interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
  as?: ElementType;
  amount?: number;
}

/** Reveals content once as it scrolls into view. Honors prefers-reduced-motion. */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  stagger = false,
  as = "div",
  amount = 0.2,
}: ScrollRevealProps) {
  const reducedMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reducedMotion) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={stagger ? staggerParent : fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

export interface RevealItemProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/** Child item for a staggered ScrollReveal. */
export function RevealItem({ children, className, as = "div" }: RevealItemProps) {
  const reducedMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reducedMotion) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={cn(className)} variants={fadeUp}>
      {children}
    </MotionTag>
  );
}
