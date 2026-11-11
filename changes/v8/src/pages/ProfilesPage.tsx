import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProfileFilters } from "@/hooks/useProfileFilters";
import { useProfiles } from "@/hooks/useApiQueries";
import { useSeo } from "@/hooks/useSeo";
import { buildFilterChips } from "@/lib/filterChips";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { formatCount } from "@/lib/utils";
import { PageHero } from "@/components/common/PageHero";
import { ProfileCard } from "@/components/profiles/ProfileCard";
import { FilterPanel } from "@/components/profiles/FilterPanel";
import { EmptyState, ErrorState } from "@/components/common/DataState";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

const SORT_OPTIONS = [
  { label: "Newest first", value: "newest" },
  { label: "Age: youngest first", value: "age-asc" },
  { label: "Age: oldest first", value: "age-desc" },
  { label: "Height: shortest first", value: "height-asc" },
  { label: "Height: tallest first", value: "height-desc" },
];

export default function ProfilesPage() {
  const { filters, setFilters, removeFilter, clearAll, activeCount } = useProfileFilters();
  const { data, isLoading, isError, isFetching, refetch } = useProfiles(filters);
  const [sheetOpen, setSheetOpen] = useState(false);
  const reduce = useReducedMotion();

  const chips = useMemo(() => buildFilterChips(filters), [filters]);
  const view = filters.view ?? "grid";

  useSeo({
    title: "Find a match, verified rishta proposals",
    description:
      "Browse bureau-verified rishta proposals across Pakistan and overseas. Filter by city, caste, education, age and marital status. Contact only through the office.",
    path: "/profiles",
    noIndex: true,
  });

  const handleChange = (patch: Record<string, string | number | undefined>) => {
    trackEvent("filter_change", { ...patch });
    setFilters(patch);
  };

  const resultLabel =
    data === undefined
      ? "Loading proposals…"
      : `${formatCount(data.total)} ${data.total === 1 ? "proposal" : "proposals"}`;

  return (
    <>
      <PageHero
        eyebrow="Find a match"
        title="Browse verified proposals"
        description="Every profile below has been reviewed by our team. Contact details and photographs are shared only through the office, with the family's consent."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Find a match" }]}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Desktop sidebar */}
          <aside aria-label="Profile filters" className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28 max-h-[calc(100dvh-8rem)] overflow-y-auto scroll-area rounded-3xl border border-border bg-white p-5 shadow-sm shadow-maroon-900/5">
              <FilterPanel
                filters={filters}
                onChange={handleChange}
                onClearAll={clearAll}
                activeCount={activeCount}
              />
            </div>
          </aside>

          <div className="lg:col-span-9">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-border bg-white p-3.5 shadow-sm shadow-maroon-900/5">
              <div className="flex items-center gap-2">
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <SlidersHorizontal aria-hidden="true" />
                      Filters
                      {activeCount > 0 ? (
                        <span className="grid size-5 place-items-center rounded-full bg-maroon-800 text-[11px] font-bold text-cream-50">
                          {activeCount}
                        </span>
                      ) : null}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="start" title="Profile filters" className="p-0">
                    <div className="flex h-full flex-col">
                      <div className="border-b border-border px-5 py-4">
                        <p className="font-heading text-xl font-semibold text-maroon-900">
                          Filters
                        </p>
                        <p className="font-sans text-xs text-muted-foreground">{resultLabel}</p>
                      </div>
                      <div className="flex-1 overflow-y-auto scroll-area px-5 py-5">
                        <FilterPanel
                          filters={filters}
                          onChange={handleChange}
                          onClearAll={clearAll}
                          activeCount={activeCount}
                          showTitle={false}
                        />
                      </div>
                      <div className="border-t border-border p-4">
                        <SheetClose asChild>
                          <Button className="w-full">
                            Show {data ? formatCount(data.total) : ""} results
                          </Button>
                        </SheetClose>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <p aria-live="polite" className="font-sans text-sm font-semibold text-maroon-900">
                  {resultLabel}
                </p>
                {isFetching && !isLoading ? (
                  <span className="font-sans text-xs text-muted-foreground">Updating…</span>
                ) : null}
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <label htmlFor="sort" className="sr-only">
                    Sort results
                  </label>
                  <select
                    id="sort"
                    value={filters.sort ?? "newest"}
                    onChange={(event) => handleChange({ sort: event.target.value })}
                    className="h-9 rounded-full border border-input bg-white ps-3 pe-8 font-sans text-[13px] font-semibold text-maroon-900 focus-visible:border-maroon-700 focus-visible:ring-2 focus-visible:ring-maroon-700/20 focus-visible:outline-none"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div
                  className="flex items-center gap-1 rounded-full border border-input p-0.5"
                  role="group"
                  aria-label="View mode"
                >
                  {(
                    [
                      { value: "grid", label: "Grid view", Icon: LayoutGrid },
                      { value: "list", label: "List view", Icon: List },
                    ] as const
                  ).map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFilters({ view: option.value })}
                      aria-pressed={view === option.value}
                      aria-label={option.label}
                      className={cn(
                        "grid size-8 place-items-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-maroon-700 focus-visible:outline-none",
                        view === option.value
                          ? "bg-maroon-800 text-cream-50"
                          : "text-maroon-800/70 hover:bg-cream-100",
                      )}
                    >
                      <option.Icon className="size-4" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {chips.length > 0 ? (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Active
                </span>
                {chips.map((chip) => (
                  <button
                    key={`${chip.key}-${chip.label}`}
                    type="button"
                    onClick={() => removeFilter(chip.key)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-maroon-200 bg-maroon-50 px-3 py-1 font-sans text-xs font-semibold text-maroon-900 transition-colors hover:bg-maroon-100 focus-visible:ring-2 focus-visible:ring-maroon-700 focus-visible:outline-none"
                  >
                    {chip.label}
                    <X className="size-3" aria-hidden="true" />
                    <span className="sr-only">Remove filter</span>
                  </button>
                ))}
                <Button variant="ghost" size="sm" onClick={clearAll} className="text-maroon-700">
                  Clear all
                </Button>
              </div>
            ) : null}

            {/* Results */}
            <div className="mt-6">
              {isError ? (
                <ErrorState onRetry={() => void refetch()} />
              ) : isLoading ? (
                <div
                  className={cn(
                    "grid gap-4",
                    view === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1",
                  )}
                  aria-busy="true"
                >
                  <span className="sr-only">Loading proposals…</span>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="rounded-3xl border border-border bg-white p-3">
                      <Skeleton className="aspect-4/5 w-full" />
                      <Skeleton className="mt-3 h-5 w-2/3" />
                      <Skeleton className="mt-2 h-4 w-1/2" />
                      <Skeleton className="mt-3 h-9 w-full rounded-full" />
                    </div>
                  ))}
                </div>
              ) : !data || data.items.length === 0 ? (
                <EmptyState
                  title="No proposals match these filters"
                  description="Try widening the age or height range, or removing a city filter. Our consultants may also have suitable proposals that are not published online."
                >
                  <Button onClick={clearAll} variant="secondary">
                    Clear filters
                  </Button>
                  <Button asChild>
                    <Link to="/register">Register a proposal</Link>
                  </Button>
                  <Button asChild variant="whatsapp">
                    <a
                      href={buildWhatsAppUrl({
                        message: "I could not find a match on the website. Can you help?",
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("whatsapp_click", { source: "profiles_empty_state" })
                      }
                    >
                      <WhatsAppIcon /> Ask a consultant
                    </a>
                  </Button>
                </EmptyState>
              ) : (
                <>
                  <ul
                    className={cn(
                      "grid list-none gap-4",
                      view === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1",
                    )}
                  >
                    {/* Filter badalne par cards smoothly hatate, aate aur jagah badalte hain */}
                    <AnimatePresence mode="popLayout" initial={false}>
                      {data.items.map((profile, index) =>
                        reduce ? (
                          <li key={profile.id}>
                            <ProfileCard
                              profile={profile}
                              layout={view === "list" ? "list" : "grid"}
                              priority={index < 3}
                              className="h-full"
                            />
                          </li>
                        ) : (
                          <motion.li
                            key={profile.id}
                            layout
                            initial={{ opacity: 0, scale: 0.97, y: 14 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.18 } }}
                            transition={{
                              duration: 0.4,
                              ease: [0.22, 1, 0.36, 1],
                              delay: Math.min(index, 6) * 0.02,
                            }}
                          >
                            <ProfileCard
                              profile={profile}
                              layout={view === "list" ? "list" : "grid"}
                              priority={index < 3}
                              className="h-full"
                            />
                          </motion.li>
                        ),
                      )}
                    </AnimatePresence>
                  </ul>

                  <Pagination
                    className="mt-8"
                    page={data.page}
                    totalPages={data.totalPages}
                    onPageChange={(page) => {
                      setFilters({ page });
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                </>
              )}
            </div>

            <div className="mt-10 rounded-3xl border border-border bg-cream-100/70 p-5">
              <p className="font-sans text-sm leading-7 text-maroon-900/80">
                <span className="font-semibold">A note on privacy:</span> profiles show a first name
                with a last initial and a profile ID. Phone numbers and addresses are never
                published. Every enquiry goes through the office, so both families are protected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
