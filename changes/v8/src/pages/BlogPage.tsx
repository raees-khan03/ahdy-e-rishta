import { Reveal } from "@/components/layout/Reveal";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { usePosts } from "@/hooks/useApiQueries";
import { useSeo } from "@/hooks/useSeo";
import { PageHero } from "@/components/common/PageHero";
import { EmptyState, ErrorState } from "@/components/common/DataState";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const categories = [
  { value: "all", label: "All articles" },
  { value: "guidance", label: "Guidance" },
  { value: "families", label: "For families" },
  { value: "process", label: "The process" },
  { value: "safety", label: "Safety" },
] as const;

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogPage() {
  const { data, isLoading, isError, refetch } = usePosts();
  const [category, setCategory] = useState<(typeof categories)[number]["value"]>("all");

  useSeo({
    title: "Guidance blog",
    description:
      "Practical articles on rishta etiquette, family conversations, overseas proposals and avoiding matrimonial fraud.",
    path: "/blog",
  });

  const filtered = useMemo(
    () => (data ?? []).filter((post) => category === "all" || post.category === category),
    [data, category],
  );

  return (
    <>
      <PageHero
        eyebrow="Guidance"
        title="Notes for families"
        description="Short, practical articles written by our consultants. No hype and no promises, just what we have learned from the families we work with."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <Reveal from="up">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          <div
            className="flex flex-wrap items-center gap-1.5"
            role="group"
            aria-label="Article categories"
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
                <span className="sr-only">Loading articles…</span>
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="rounded-3xl border border-border bg-white p-4">
                    <Skeleton className="aspect-video w-full" />
                    <Skeleton className="mt-4 h-5 w-3/4" />
                    <Skeleton className="mt-2 h-4 w-full" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState
                title="No articles in this category yet"
                description="New guidance is published every month."
              />
            ) : (
              <ul className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post, index) => (
                  <li key={post.id}>
                    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-sm shadow-maroon-900/5 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-maroon-900/10">
                      <Link
                        to={`/blog/${post.slug}`}
                        aria-label={`Read: ${post.title}`}
                        className="block focus-visible:outline-none"
                      >
                        <img
                          src={post.imageUrl}
                          alt=""
                          width={1200}
                          height={675}
                          loading={index < 3 ? "eager" : "lazy"}
                          decoding="async"
                          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col gap-2 p-5">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary">{post.category}</Badge>
                          <span className="inline-flex items-center gap-1 font-sans text-[11px] text-muted-foreground">
                            <Clock className="size-3" aria-hidden="true" /> {post.readingMinutes}{" "}
                            min read
                          </span>
                        </div>
                        <h2 className="font-heading text-lg font-semibold leading-snug text-maroon-900">
                          <Link
                            to={`/blog/${post.slug}`}
                            className="hover:underline underline-offset-4"
                          >
                            {post.title}
                          </Link>
                        </h2>
                        <p className="font-sans text-sm leading-6 text-muted-foreground">
                          {post.excerpt}
                        </p>
                        <p className="mt-auto pt-2 font-sans text-[11px] text-muted-foreground">
                          {post.author} · {formatDate(post.publishedAt)}
                        </p>
                        <span className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-maroon-700">
                          Read article
                          <ArrowRight
                            aria-hidden="true"
                            className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180"
                          />
                        </span>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Reveal>
    </>
  );
}
