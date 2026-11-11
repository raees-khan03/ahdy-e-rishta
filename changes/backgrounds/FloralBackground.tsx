import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Halka line-art phoolon ka pattern. Koi image file nahi chahiye, sab inline SVG hai.
 * `children` card ke oopar aata hai, pattern card ke peeche rehta hai.
 */
interface FloralBackgroundProps {
  children: ReactNode;
  className?: string;
  color?: string;
  opacity?: number;
}

const flower = (
  <g fill="none" strokeWidth="2" strokeLinecap="round">
    <circle cx="80" cy="80" r="9" />
    {[0, 60, 120, 180, 240, 300].map((angle) => (
      <ellipse key={angle} cx="80" cy="48" rx="12" ry="22" transform={`rotate(${angle} 80 80)`} />
    ))}
    <path d="M80 100 C80 120 78 132 72 144" />
    <path d="M74 128 C64 124 58 116 58 108 C68 110 74 118 74 128Z" />
  </g>
);

export function FloralBackground({
  children,
  className,
  color = "#7c1b2c",
  opacity = 0.12,
}: FloralBackgroundProps) {
  return (
    <div className={cn("relative isolate overflow-hidden", className)}>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full select-none"
        style={{ opacity }}
      >
        <defs>
          <pattern
            id="ah-floral-tile"
            width={160}
            height={160}
            viewBox="0 0 160 160"
            patternUnits="userSpaceOnUse"
          >
            <g stroke={color}>{flower}</g>
            <g stroke={color} transform="translate(80 80) rotate(30) scale(0.62)">
              {flower}
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ah-floral-tile)" />
      </svg>

      {children}
    </div>
  );
}
