import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
  children?: ReactNode;
  tone?: "cream" | "maroon";
  className?: string;
}

/** Consistent inner-page hero used by every secondary page. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  children,
  tone = "cream",
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border",
        tone === "maroon" ? "bg-maroon-950 text-cream-50" : "bg-cream-100",
        className,
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -end-24 -top-24 size-72 rounded-full bg-peach-300/25 blur-3xl" />
        <div className="absolute -start-16 bottom-0 size-56 rounded-full bg-khaki-400/20 blur-3xl" />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        {breadcrumb?.length ? (
          <Breadcrumb className="mb-5">
            <BreadcrumbList>
              {breadcrumb.map((crumb, index) => {
                const isLast = index === breadcrumb.length - 1;
                return (
                  <BreadcrumbItem key={`${crumb.label}-${index}`}>
                    {isLast || !crumb.href ? (
                      <BreadcrumbPage className={tone === "maroon" ? "text-cream-100" : undefined}>
                        {crumb.label}
                      </BreadcrumbPage>
                    ) : (
                      <Link
                        to={crumb.href}
                        className={cn(
                          "rounded-sm transition-colors hover:underline",
                          tone === "maroon"
                            ? "text-cream-200/80 hover:text-cream-50"
                            : "hover:text-maroon-800",
                        )}
                      >
                        {crumb.label}
                      </Link>
                    )}
                    {!isLast ? <BreadcrumbSeparator /> : null}
                  </BreadcrumbItem>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        ) : null}
        {eyebrow ? (
          <p
            className={cn(
              "font-sans text-xs font-semibold uppercase tracking-[0.3em]",
              tone === "maroon" ? "text-peach-300" : "text-maroon-600",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h1
          className={cn(
            "mt-2 max-w-3xl font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl",
            tone === "maroon" ? "text-cream-50" : "text-maroon-800",
          )}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              "mt-4 max-w-[65ch] font-sans text-[15px] leading-7 sm:text-base",
              tone === "maroon" ? "text-cream-200/90" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-7">{children}</div> : null}
      </div>
    </section>
  );
}
