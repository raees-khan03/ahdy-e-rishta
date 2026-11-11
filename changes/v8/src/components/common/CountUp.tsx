import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

export interface CountUpProps {
  /** Aakhri number. */
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Seconds. */
  duration?: number;
  /** 2480 ko "2,480" likhna hai? */
  groupDigits?: boolean;
}

/**
 * Number 0 se `value` tak ginta hai, sirf pehli dafa jab wo screen par aata hai.
 *
 * SEO/print/accessibility:
 * - DOM mein hamesha aakhri number hota hai; aakhri number screen reader ke liye
 *   `sr-only` mein bhi rehta hai, is liye ginti ke beech bhi sahi parha jata hai.
 * - Element screen par aane se pehle bhi aakhri number dikhata hai, is liye print
 *   ya JS band hone par bhi 0 nahi chhapta.
 * - Reduced motion? Number seedha aakhri value par rehta hai.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  className,
  duration = 1.6,
  groupDigits = false,
}: CountUpProps) {
  const format = (input: number) => (groupDigits ? input.toLocaleString("en-US") : String(input));
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {prefix}
        {format(display)}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {format(value)}
        {suffix}
      </span>
    </span>
  );
}
