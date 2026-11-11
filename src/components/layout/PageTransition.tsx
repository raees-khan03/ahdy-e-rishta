import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";

/**
 * Har route badalne par page ka content halka sa oopar uthta hua aata hai.
 * delay 0.7s isliye hai ke PageIntro ka parda theek 0.7s par uthta hai:
 * parda khulte hi content nazar aaye.
 * Agar PageIntro ka timing badlein to is delay ko bhi badal dein.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      className="flex flex-1 flex-col"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
