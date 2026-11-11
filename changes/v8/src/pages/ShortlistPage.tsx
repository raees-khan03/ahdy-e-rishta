import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/layout/Reveal";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, LayoutGrid, List, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useShortlist } from "@/hooks/useShortlist";
import { useProfilesByIds } from "@/hooks/useApiQueries";
import { useSeo } from "@/hooks/useSeo";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { PageHero } from "@/components/common/PageHero";
import { ProfileCard } from "@/components/profiles/ProfileCard";
import { EmptyState, ErrorState } from "@/components/common/DataState";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

export default function ShortlistPage() {
  const { ids, clear } = useShortlist();
  const { data, isLoading, isError, refetch } = useProfilesByIds(ids);
  const [view, setView] = useState<"grid" | "list">("grid");
  const reduce = useReducedMotion();

  useSeo({
    title: "My shortlist",
    description: "Profiles you have saved while browsing Ahd-e-Rishta.",
    path: "/shortlist",
    noIndex: true,
  });

  const handleClear = () => {
    clear();
    trackEvent("shortlist_toggle", { action: "clear_all" });
    toast.success("Shortlist cleared.");
  };

  return (
    <>
      <PageHero
        eyebrow="Saved profiles"
        title="My shortlist"
        description="Saved on this device only. Nothing is sent to the office unless you message us. Share the profile IDs with your consultant to discuss them."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Shortlist" }]}
      >
        {ids.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="whatsapp">
              <a
                href={buildWhatsAppUrl({
                  message: `I would like to discuss these profiles from my shortlist: ${ids.join(", ")}`,
                })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "shortlist_page" })}
              >
                <WhatsAppIcon /> Discuss my shortlist
              </a>
            </Button>
            <Button variant="secondary" onClick={handleClear}>
              <Trash2 aria-hidden="true" /> Clear shortlist
            </Button>
          </div>
        ) : null}
      </PageHero>

      <Reveal from="up">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          {ids.length === 0 ? (
            <EmptyState
              title="Your shortlist is empty"
              description="Tap the heart on any profile card to save it here. Your shortlist stays on this device."
              icon={<Heart className="size-5" aria-hidden="true" />}
            >
              <Button asChild>
                <Link to="/profiles">Browse proposals</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/register">Register a proposal</Link>
              </Button>
            </EmptyState>
          ) : isError ? (
            <ErrorState onRetry={() => void refetch()} />
          ) : isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
              <span className="sr-only">Loading saved profiles…</span>
              {Array.from({ length: Math.min(ids.length, 6) }).map((_, index) => (
                <div key={index} className="rounded-3xl border border-border bg-white p-3">
                  <Skeleton className="aspect-4/5 w-full" />
                  <Skeleton className="mt-3 h-5 w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mb-5 flex items-center justify-between gap-3">
                <p aria-live="polite" className="font-sans text-sm font-semibold text-maroon-900">
                  {data?.length ?? 0} saved {data?.length === 1 ? "profile" : "profiles"}
                </p>
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
                      onClick={() => setView(option.value)}
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

              <ul
                className={cn(
                  "grid list-none gap-4",
                  view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
                )}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {(data ?? []).map((profile) =>
                    reduce ? (
                      <li key={profile.id}>
                        <ProfileCard
                          profile={profile}
                          layout={view === "list" ? "list" : "grid"}
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
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ProfileCard
                          profile={profile}
                          layout={view === "list" ? "list" : "grid"}
                          className="h-full"
                        />
                      </motion.li>
                    ),
                  )}
                </AnimatePresence>
              </ul>

              {data && data.length < ids.length ? (
                <p className="mt-4 font-sans text-sm text-muted-foreground">
                  Some saved profiles ({ids.length - data.length}) are no longer listed. They may
                  have been matched or paused by the family.
                </p>
              ) : null}
            </>
          )}
        </div>
      </Reveal>
    </>
  );
}
