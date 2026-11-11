import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useVideos } from "@/hooks/useApiQueries";
import { SectionHeading } from "@/components/common/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/layout/Reveal";
import { VideoCard } from "@/components/common/VideoDialog";
import { ErrorState } from "@/components/common/DataState";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function VideosSection() {
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = useVideos();
  const videos = data?.slice(0, 3) ?? [];

  return (
    <section aria-labelledby="videos-heading" className="bg-cream-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <SectionHeading
          id="videos-heading"
          eyebrow="Watch and learn"
          title={t("home.videosTitle")}
          description="Short, practical videos on preparing a profile, meeting a family and staying safe. Playback only starts when you press play."
        />

        {isError ? (
          <ErrorState onRetry={() => void refetch()} className="mt-10" />
        ) : isLoading ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            <span className="sr-only">Loading videos…</span>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-3xl border border-border bg-white p-4">
                <Skeleton className="aspect-video w-full" />
                <Skeleton className="mt-4 h-5 w-3/4" />
                <Skeleton className="mt-2 h-4 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, index) => (
              <RevealItem key={video.id} className="h-full">
                <VideoCard video={video} priority={index === 0} />
              </RevealItem>
            ))}
          </RevealGroup>
        )}

        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline">
            <Link to="/videos">
              All videos and guidance
              <ArrowRight aria-hidden="true" className="rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
