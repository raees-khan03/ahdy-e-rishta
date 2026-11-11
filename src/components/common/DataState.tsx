import type { ReactNode } from "react";
import { AlertTriangle, Inbox, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function SectionSkeleton({ className, count = 3 }: { className?: string; count?: number }) {
  return (
    <div
      className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading content…</span>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-3xl border border-border bg-white p-5">
          <Skeleton className="aspect-4/5 w-full rounded-2xl" />
          <Skeleton className="mt-4 h-5 w-2/3" />
          <Skeleton className="mt-2 h-4 w-1/2" />
          <Skeleton className="mt-4 h-9 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function ErrorState({
  title = "We could not load this section",
  description = "Please check your connection and try again. If it keeps happening, message the office on WhatsApp.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center gap-3 rounded-3xl border border-red-200 bg-red-50/60 px-6 py-10 text-center",
        className,
      )}
    >
      <span className="grid size-12 place-items-center rounded-full bg-red-100 text-red-700">
        <AlertTriangle className="size-5" aria-hidden="true" />
      </span>
      <h3 className="font-heading text-lg font-semibold text-maroon-900">{title}</h3>
      <p className="max-w-md text-sm leading-7 text-muted-foreground">{description}</p>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-1">
          <RefreshCw aria-hidden="true" /> Try again
        </Button>
      ) : null}
    </div>
  );
}

export function EmptyState({
  tone = "light",
  title,
  description,
  children,
  className,
  icon,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-3xl border border-dashed px-6 py-12 text-center",
        tone === "dark" ? "border-cream-200/25 bg-white/5" : "border-khaki-300 bg-cream-100/60",
        className,
      )}
    >
      <span
        className={cn(
          "grid size-12 place-items-center rounded-full shadow-sm",
          tone === "dark" ? "bg-white/10 text-peach-300" : "bg-white text-maroon-700",
        )}
      >
        {icon ?? <Inbox className="size-5" aria-hidden="true" />}
      </span>
      <h3
        className={cn(
          "font-heading text-lg font-semibold",
          tone === "dark" ? "text-cream-50" : "text-maroon-900",
        )}
      >
        {title}
      </h3>
      {description ? (
        <p
          className={cn(
            "max-w-md text-sm leading-7",
            tone === "dark" ? "text-cream-200/80" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
      {children ? (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">{children}</div>
      ) : null}
    </div>
  );
}
