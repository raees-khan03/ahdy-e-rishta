import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * Screen ke sab se oopar patli si line jo page scroll ke hisab se bharti hai.
 * z-[70] rakha hai taake PageIntro (z-80) ke neeche rahe.
 */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-maroon-700 via-khaki-400 to-peach-300 print:hidden"
    />
  );
}
