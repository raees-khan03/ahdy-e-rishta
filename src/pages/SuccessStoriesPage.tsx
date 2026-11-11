import { Reveal } from "@/components/layout/Reveal";
import { useMemo, useState } from "react";
import { useSuccessStories } from "@/hooks/useApiQueries";
import { useSeo } from "@/hooks/useSeo";
import { PageHero } from "@/components/common/PageHero";
import { StoryCard } from "@/components/common/StoryCard";
import { EmptyState, ErrorState } from "@/components/common/DataState";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SuccessStoriesPage() {
  const { data, isLoading, isError, refetch } = useSuccessStories();
  const [city, setCity] = useState("all");
  const [year, setYear] = useState("all");

  useSeo({
    title: "Success stories",
    description:
      "Sample stories from families who used the Ahd-e-Rishta service. Real stories are published only with the written consent of both families.",
    path: "/success-stories",
  });

  const cities = useMemo(() => {
    const set = new Set((data ?? []).map((story) => story.city));
    return ["all", ...Array.from(set).sort()];
  }, [data]);

  const years = useMemo(() => {
    const set = new Set((data ?? []).map((story) => story.year));
    return [
      "all",
      ...Array.from(set)
        .sort((a, b) => Number(b) - Number(a))
        .map(String),
    ];
  }, [data]);

  const filtered = (data ?? []).filter(
    (story) =>
      (city === "all" || story.city === city) && (year === "all" || String(story.year) === year),
  );

  return (
    <>
      <PageHero
        eyebrow="Success stories"
        title="Families we have served"
        description="These are sample stories used to show the layout. Real stories will appear only when both families give written consent, and their names are still never published."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Success stories" }]}
      />

      <Reveal from="up">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          <div className="flex flex-col gap-4 rounded-3xl border border-border bg-white p-4 shadow-sm shadow-maroon-900/5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-wrap gap-3">
              <div>
                <label
                  htmlFor="story-city"
                  className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                >
                  City
                </label>
                <select
                  id="story-city"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  className="mt-1 block h-10 rounded-full border border-input bg-white px-3 pe-8 font-sans text-sm text-maroon-900 focus-visible:border-maroon-700 focus-visible:outline-none"
                >
                  {cities.map((option) => (
                    <option key={option} value={option}>
                      {option === "all" ? "All cities" : option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="story-year"
                  className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                >
                  Year
                </label>
                <select
                  id="story-year"
                  value={year}
                  onChange={(event) => setYear(event.target.value)}
                  className="mt-1 block h-10 rounded-full border border-input bg-white px-3 pe-8 font-sans text-sm text-maroon-900 focus-visible:border-maroon-700 focus-visible:outline-none"
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option === "all" ? "Any year" : option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p aria-live="polite" className={cn("font-sans text-sm text-muted-foreground")}>
              {filtered.length} {filtered.length === 1 ? "story" : "stories"}
            </p>
          </div>

          <div className="mt-6">
            {isError ? (
              <ErrorState onRetry={() => void refetch()} />
            ) : isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
                <span className="sr-only">Loading stories…</span>
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="rounded-3xl border border-border bg-white p-6">
                    <Skeleton className="h-5 w-6" />
                    <Skeleton className="mt-4 h-16 w-full" />
                    <Skeleton className="mt-4 h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState
                title="No stories for this filter yet"
                description="Try another city or year. New stories are added after both families give consent."
              >
                <Button
                  variant="secondary"
                  onClick={() => {
                    setCity("all");
                    setYear("all");
                  }}
                >
                  Reset filters
                </Button>
              </EmptyState>
            ) : (
              <ul className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((story) => (
                  <li key={story.id} id={story.id}>
                    <StoryCard story={story} className="h-full" />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-8 rounded-3xl border border-amber-300/60 bg-amber-50 p-5">
            <p className="font-sans text-sm leading-7 text-amber-900">
              <span className="font-semibold">A note on honesty:</span> we do not publish fake
              testimonials, celebrity photographs or invented success rates. Everything on this page
              is visibly marked as a sample until the bureau supplies consented stories.
            </p>
          </div>
        </div>
      </Reveal>
    </>
  );
}
