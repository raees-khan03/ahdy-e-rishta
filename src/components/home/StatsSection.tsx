import { useStats } from "@/hooks/useApiQueries";
import { statsBand } from "@/lib/homeContent";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";
import { CountUp } from "@/components/common/CountUp";
import { ErrorState } from "@/components/common/DataState";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Stat ki value aksar number hoti hai ("2,480") magar kabhi text bhi
 * ("4-step", "1:1"). Sirf saaf numbers ko count-up karte hain, aur saal
 * (maslan 2009) ko nahi, kyunki saal gina nahi jata.
 */
function StatValue({ value }: { value: string }) {
  const isNumber = /^[\d,]+$/.test(value);
  const numeric = Number(value.replace(/,/g, ""));
  const isYear = numeric >= 1900 && numeric <= 2100;

  if (!isNumber || !Number.isFinite(numeric) || isYear) return <>{value}</>;

  return <CountUp value={numeric} groupDigits duration={1.4} />;
}

export function StatsSection() {
  const { data, isLoading, isError, refetch } = useStats();
  const stats =
    data && data.length > 0
      ? data
      : statsBand.map((item, index) => ({ id: `local-${index}`, ...item }));

  return (
    <section aria-label="Service at a glance" className="bg-maroon-900">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-14">
        {isError ? (
          <ErrorState
            onRetry={() => void refetch()}
            className="border-cream-200/30 bg-maroon-950/40"
          />
        ) : isLoading ? (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4" aria-busy="true">
            <span className="sr-only">Loading statistics…</span>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-10 w-24 bg-cream-200/20" />
                <Skeleton className="h-4 w-32 bg-cream-200/15" />
              </div>
            ))}
          </div>
        ) : (
          <ScrollReveal stagger className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <RevealItem key={stat.id}>
                <p className="font-heading text-3xl font-semibold text-cream-50 tabular-nums sm:text-4xl">
                  <StatValue value={stat.value} />
                </p>
                <p className="mt-1 font-sans text-sm font-semibold tracking-[0.18em] text-peach-300 uppercase">
                  {stat.label}
                </p>
                {stat.caption ? (
                  <p className="mt-1.5 font-sans text-xs leading-5 text-cream-200/70">
                    {stat.caption}
                  </p>
                ) : null}
              </RevealItem>
            ))}
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
