import { Skeleton } from "@/components/ui/skeleton";

/** Route-level fallback shown while a lazily loaded page chunk arrives. */
export function PageSkeleton() {
  return (
    <div
      className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading page…</span>
      <Skeleton className="h-5 w-28 rounded-full" />
      <Skeleton className="mt-4 h-10 w-3/4 max-w-lg" />
      <Skeleton className="mt-3 h-4 w-full max-w-2xl" />
      <Skeleton className="mt-2 h-4 w-2/3 max-w-xl" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-3xl border border-border bg-white p-4">
            <Skeleton className="aspect-4/5 w-full" />
            <Skeleton className="mt-4 h-4 w-1/2" />
            <Skeleton className="mt-2 h-3 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
