import { Reveal } from "@/components/layout/Reveal";
import { useMemo, useState } from "react";
import { useVideos } from "@/hooks/useApiQueries";
import { useSeo } from "@/hooks/useSeo";
import { PageHero } from "@/components/common/PageHero";
import { VideoCard } from "@/components/common/VideoDialog";
import { EmptyState, ErrorState } from "@/components/common/DataState";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const categories = [
  { value: "all", label: "All videos" },
  { value: "guidance", label: "Guidance" },
  { value: "families", label: "For families" },
  { value: "bureau", label: "Our bureau" },
] as const;

export default function VideosPage() {
  const { data, isLoading, isError, refetch } = useVideos();
  const [category, setCategory] = useState<(typeof categories)[number]["value"]>("all");

  useSeo({
    title: "Videos and guidance",
    description:
      "Short videos on preparing a rishta profile, meeting a family and staying safe. Playback starts only when you press play.",
    path: "/videos",
  });

  const filtered = useMemo(
    () => (data ?? []).filter((video) => category === "all" || video.category === category),
    [data, category],
  );

  return (
    <>
      <PageHero
        eyebrow="Watch"
        title="Videos and guidance"
        description="Practical advice from our consultants. Nothing loads from YouTube until you press play, and we use the privacy-enhanced player."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Videos" }]}
      />

      <Reveal from="up">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          <div
            className="flex flex-wrap items-center gap-1.5"
            role="group"
            aria-label="Video categories"
          >
            {categories.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setCategory(item.value)}
                aria-pressed={category === item.value}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 font-sans text-[13px] font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-maroon-700 focus-visible:ring-offset-2 focus-visible:outline-none",
                  category === item.value
                    ? "border-maroon-800 bg-maroon-800 text-cream-50"
                    : "border-khaki-300/70 bg-white text-maroon-800 hover:bg-cream-100",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {isError ? (
              <ErrorState onRetry={() => void refetch()} />
            ) : isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
                <span className="sr-only">Loading videos…</span>
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="rounded-3xl border border-border bg-white p-4">
                    <Skeleton className="aspect-video w-full" />
                    <Skeleton className="mt-4 h-5 w-3/4" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState
                title="No videos in this category yet"
                description="New videos are added each month."
              />
            ) : (
              <ul className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((video, index) => (
                  <li key={video.id}>
                    <VideoCard video={video} priority={index < 3} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="mt-8 rounded-3xl border border-border bg-cream-100/70 p-5 font-sans text-sm leading-7 text-maroon-900/80">
            Prefer reading? Our{" "}
            <a href="/blog" className="font-semibold underline underline-offset-4">
              guidance blog
            </a>{" "}
            covers the same topics in written form, and the{" "}
            <a href="/faq" className="font-semibold underline underline-offset-4">
              FAQ
            </a>{" "}
            answers the most common questions.
          </p>
        </div>
      </Reveal>
    </>
  );
}
