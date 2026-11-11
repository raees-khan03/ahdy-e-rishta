import { useMemo } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Profile } from "@/schemas/profile.schema";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from "@/components/ui/carousel";
import { ProfileCard } from "@/components/profiles/ProfileCard";
import { EmptyState, ErrorState } from "@/components/common/DataState";

export interface ProfileCarouselProps {
  profiles: Profile[] | undefined;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  /** Accessible name, e.g. "Featured grooms". */
  ariaLabel: string;
  emptyTitle?: string;
  viewAllHref?: string;
  className?: string;
  tone?: "light" | "dark";
  priority?: boolean;
}

export function ProfileCarousel({
  profiles,
  isLoading = false,
  isError = false,
  onRetry,
  ariaLabel,
  emptyTitle = "No profiles to show yet",
  viewAllHref,
  className,
  tone = "light",
  priority = false,
}: ProfileCarouselProps) {
  const reducedMotion = useReducedMotion();

  const plugins = useMemo(() => {
    if (reducedMotion) return [];
    return [Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true })];
  }, [reducedMotion]);

  if (isError) {
    return <ErrorState onRetry={onRetry} className={className} />;
  }

  if (isLoading) {
    return (
      <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)} aria-busy="true">
        <span className="sr-only">Loading profiles…</span>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-3xl border border-border bg-white p-3">
            <Skeleton className="aspect-4/5 w-full" />
            <Skeleton className="mt-3 h-5 w-2/3" />
            <Skeleton className="mt-2 h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (!profiles || profiles.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description="New proposals are added by the office every week."
      />
    );
  }

  return (
    <div className={cn("min-w-0", className)}>
      <Carousel
        opts={{ loop: profiles.length > 4 }}
        plugins={plugins}
        aria-label={ariaLabel}
        className="min-w-0"
      >
        <CarouselContent>
          {profiles.map((profile, index) => (
            <CarouselItem
              key={profile.id}
              className="min-w-0 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <ProfileCard
                profile={profile}
                priority={priority && index === 0}
                className="h-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          {viewAllHref ? (
            <Button asChild variant={tone === "dark" ? "secondary" : "outline"} size="sm">
              <Link to={viewAllHref}>
                View all
                <ArrowRight aria-hidden="true" className="rtl:rotate-180" />
              </Link>
            </Button>
          ) : (
            <span />
          )}
          <CarouselControls label={ariaLabel.toLowerCase()} />
        </div>
      </Carousel>
    </div>
  );
}
