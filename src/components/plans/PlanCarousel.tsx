import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { PlanCard } from "@/components/plans/PlanCard";
import { cn } from "@/lib/utils";
import type { Plan } from "@/schemas/content.schema";

interface PlanCarouselProps {
  plans: Plan[];
  compact?: boolean;
  className?: string;
}

/** Any number of plans, one card on mobile, two on tablet and three on desktop. */
export function PlanCarousel({ plans, compact = false, className }: PlanCarouselProps) {
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);
  const [index, setIndex] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setIndex(api.selectedScrollSnap());
      setSnaps(api.scrollSnapList());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  if (plans.length === 0) return null;

  return (
    <div className={cn("relative", className)}>
      <Carousel opts={{ align: "start", loop: plans.length > 3 }} setApi={setApi}>
        <CarouselContent className="-ms-4">
          {plans.map((plan) => (
            <CarouselItem key={plan.id} className="basis-full ps-4 sm:basis-1/2 xl:basis-1/3">
              <PlanCard plan={plan} compact={compact} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {plans.length > 1 ? (
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {snaps.map((_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={() => api?.scrollTo(dotIndex)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  dotIndex === index ? "w-6 bg-maroon-700" : "w-2 bg-maroon-800/20",
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label="Previous plans"
              onClick={() => api?.scrollPrev()}
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label="Next plans"
              onClick={() => api?.scrollNext()}
            >
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
