import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "start";
  tone?: "light" | "dark";
  className?: string;
  id?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
  id,
  as: Heading = "h2",
}: SectionHeadingProps) {
  const reduce = useReducedMotion();
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-start",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "font-sans text-xs font-semibold uppercase tracking-[0.3em]",
            tone === "dark" ? "text-peach-300" : "text-maroon-600",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "font-heading text-3xl font-semibold tracking-tight leading-tight text-balance sm:text-4xl lg:text-5xl",
          tone === "dark" ? "text-cream-50" : "text-maroon-700",
        )}
      >
        {title}
      </Heading>
      {/* Patli khaki line: heading screen par aate hi khud khinchti hai */}
      <motion.span
        aria-hidden="true"
        className={cn(
          "h-1 w-16 origin-left rounded-full bg-linear-to-r",
          tone === "dark" ? "from-peach-300 to-cream-200" : "from-maroon-700 to-peach-400",
        )}
        initial={reduce ? false : { scaleX: 0, opacity: 0.4 }}
        whileInView={reduce ? undefined : { scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      />
      {description ? (
        <p
          className={cn(
            "max-w-[62ch] font-sans text-[15px] leading-7 sm:text-base",
            tone === "dark" ? "text-cream-200/90" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
