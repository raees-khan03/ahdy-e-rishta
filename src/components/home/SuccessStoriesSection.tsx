import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Autoplay from "embla-carousel-autoplay";
import { useMemo } from "react";
import { useReducedMotion } from "motion/react";
import { useSuccessStories } from "@/hooks/useApiQueries";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StoryCard } from "@/components/common/StoryCard";
import { ErrorState } from "@/components/common/DataState";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from "@/components/ui/carousel";

export function SuccessStoriesSection() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const { data, isLoading, isError, refetch } = useSuccessStories();

  const plugins = useMemo(() => {
    if (reducedMotion) return [];
    return [Autoplay({ delay: 7000, stopOnInteraction: true, stopOnMouseEnter: true })];
  }, [reducedMotion]);

  return (
    <section
      aria-labelledby="stories-heading"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20"
    >
      <SectionHeading
        id="stories-heading"
        eyebrow="In their words"
        title={t("home.storiesTitle")}
        description="Sample stories for now. Real stories will be published only with the written consent of both families."
      />

      {isError ? (
        <ErrorState onRetry={() => void refetch()} className="mt-10" />
      ) : isLoading ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
          <span className="sr-only">Loading stories…</span>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-3xl border border-border bg-white p-6">
              <Skeleton className="h-5 w-6" />
              <Skeleton className="mt-4 h-16 w-full" />
              <Skeleton className="mt-4 h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <Carousel
          plugins={plugins}
          opts={{ loop: (data?.length ?? 0) > 3 }}
          className="mt-10"
          aria-label="Success stories"
        >
          <CarouselContent>
            {(data ?? []).map((story) => (
              <CarouselItem key={story.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
                <StoryCard story={story} className="h-full" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-5 flex items-center justify-between gap-3">
            <Button asChild variant="outline" size="sm">
              <Link to="/success-stories">
                All stories
                <ArrowRight aria-hidden="true" className="rtl:rotate-180" />
              </Link>
            </Button>
            <CarouselControls label="success stories" />
          </div>
        </Carousel>
      )}
    </section>
  );
}
