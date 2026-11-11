import type { ReactNode } from "react";
import roseCorner from "@/assets/rose-corner.svg";
import flowerLines from "@/assets/flower-lines.svg";
import { cn } from "@/lib/utils";

const roseClass =
  "pointer-events-none absolute -z-10 w-56 select-none opacity-70 sm:w-72 lg:w-80";

interface FloralBackgroundProps {
  children: ReactNode;
  className?: string;
}

export function FloralBackground({ children, className }: FloralBackgroundProps) {
  return (
    <div
      className={cn(
        "relative isolate flex items-start justify-center overflow-hidden bg-cream-50 px-4 py-10 sm:px-8 lg:items-center lg:py-14",
        className,
      )}
    >
      {/* Light line-art flowers over the whole blank area */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-90"
        style={{ backgroundImage: `url(${flowerLines})`, backgroundSize: "520px" }}
      />

      {/* Bigger roses in the four corners, behind the card */}
      <img src={roseCorner} alt="" aria-hidden="true" className={`${roseClass} -right-16 -top-16`} />
      <img src={roseCorner} alt="" aria-hidden="true" className={`${roseClass} -left-16 -top-16 -scale-x-100`} />
      <img src={roseCorner} alt="" aria-hidden="true" className={`${roseClass} -bottom-16 -left-16 rotate-180`} />
      <img src={roseCorner} alt="" aria-hidden="true" className={`${roseClass} -bottom-16 -right-16 -scale-y-100`} />

      {children}
    </div>
  );
}