import type { ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface MarqueeProps {
  /** Ek dafa dikhne wala content. Marquee ise do dafa repeat karta hai. */
  children: ReactNode;
  className?: string;
  /** Seconds for one full loop. */
  speed?: number;
  /** Screen reader ke liye label, kyunki doosra hissa chhupa hua hai. */
  label: string;
}

/**
 * Dheere dheere chalti hui patli strip (trust badges, cities, words).
 * Hover par ruk jati hai, reduced-motion par bilkul ruk jati hai
 * (tab sirf pehla hissa sada nazar aata hai).
 */
export function Marquee({ children, className, speed = 34, label }: MarqueeProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={cn("overflow-hidden", className)}>
        <div role="group" aria-label={label} className="flex justify-center">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        className="flex w-max animate-marquee gap-8 whitespace-nowrap group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        <div role="group" aria-label={label} className="flex shrink-0 items-center gap-8">
          {children}
        </div>
        <div aria-hidden="true" className="flex shrink-0 items-center gap-8">
          {children}
        </div>
      </div>
    </div>
  );
}
