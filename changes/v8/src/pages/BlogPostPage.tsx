import { Reveal } from "@/components/layout/Reveal";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
import { toast } from "sonner";
import { usePost, usePosts } from "@/hooks/useApiQueries";
import { useSeo } from "@/hooks/useSeo";
import { PageHero } from "@/components/common/PageHero";
import { ErrorState } from "@/components/common/DataState";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPostPage() {
  const { slug = "" } = useParams();
  const { data: post, isLoading, isError, refetch } = usePost(slug);
  const { data: posts } = usePosts();

  useSeo({
    title: post ? post.title : "Article",
    description: post ? post.excerpt : "Guidance from the Ahd-e-Rishta consultants.",
    path: `/blog/${slug}`,
    type: "article",
    image: post?.imageUrl,
    jsonLd: post
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          author: { "@type": "Organization", name: post.author },
          image: post.imageUrl,
        }
      : undefined,
  });

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: post?.title ?? "Article", url: window.location.href });
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied.");
    } catch {
      toast.info("Press and hold the address bar to copy this link.");
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6" aria-busy="true">
        <span className="sr-only">Loading article…</span>
        <Skeleton className="h-5 w-24" />
        <Skeleton className="mt-4 h-10 w-3/4" />
        <Skeleton className="mt-6 aspect-video w-full rounded-3xl" />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <ErrorState
          title="We could not find that article"
          description="It may have been renamed or removed."
          onRetry={() => void refetch()}
        />
        <div className="mt-5 flex justify-center">
          <Button asChild>
            <Link to="/blog">All articles</Link>
          </Button>
        </div>
      </div>
    );
  }

  const related = (posts ?? []).filter((item) => post.relatedIds.includes(item.id)).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3 font-sans text-sm text-muted-foreground">
          <span>{post.author}</span>
          <span aria-hidden="true">·</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden="true" /> {post.readingMinutes} min read
          </span>
          <Button variant="outline" size="sm" onClick={() => void share()}>
            <Share2 aria-hidden="true" /> Share
          </Button>
        </div>
      </PageHero>

      <Reveal from="up">
        <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
          <img
            src={post.imageUrl}
            alt=""
            width={1200}
            height={675}
            loading="eager"
            decoding="async"
            className="aspect-video w-full rounded-3xl border border-border object-cover"
          />

          <div className="mt-8 space-y-8">
            {post.body.map((section) => (
              <section key={section.heading}>
                <h2 className="font-heading text-xl font-semibold text-maroon-800 sm:text-2xl">
                  {section.heading}
                </h2>
                <div className="mt-2 space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 24)}
                      className="max-w-[65ch] font-sans text-base leading-7 text-maroon-900/85"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 rounded-3xl bg-cream-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans text-sm leading-6 text-maroon-900/80">
              Have a question about this topic? A consultant will answer it personally.
            </p>
            <Button asChild variant="whatsapp" size="sm">
              <a
                href={buildWhatsAppUrl({
                  message: `I read your article "${post.title}" and have a question.`,
                })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon /> Ask on WhatsApp
              </a>
            </Button>
          </div>

          <div className="mt-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-maroon-800 underline-offset-4 hover:underline"
            >
              <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" /> All articles
            </Link>
          </div>
        </article>

        {related.length > 0 ? (
          <section className="mx-auto w-full max-w-3xl px-4 pb-14 sm:px-6">
            <h2 className="font-heading text-xl font-semibold text-maroon-800">Related reading</h2>
            <ul className="mt-4 grid list-none gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/blog/${item.slug}`}
                    className="flex h-full flex-col gap-1.5 rounded-2xl border border-border bg-white p-4 transition-colors hover:bg-cream-50"
                  >
                    <Badge variant="secondary" className="w-fit">
                      {item.category}
                    </Badge>
                    <p className="font-heading text-base font-semibold text-maroon-900">
                      {item.title}
                    </p>
                    <p className="font-sans text-xs leading-5 text-muted-foreground">
                      {item.excerpt}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Reveal>
    </>
  );
}
