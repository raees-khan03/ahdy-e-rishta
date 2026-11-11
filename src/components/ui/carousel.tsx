import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;

export interface CarouselProps extends React.ComponentProps<"div"> {
  opts?: UseCarouselParameters[0];
  plugins?: UseCarouselParameters[1];
  setApi?: (api: CarouselApi) => void;
}

interface CarouselContextValue {
  carouselRef: UseEmblaCarouselType[0];
  api: CarouselApi;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  isAutoplayRunning: boolean;
  toggleAutoplay: () => void;
  hasAutoplay: boolean;
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel(): CarouselContextValue {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within a <Carousel />");
  return context;
}

export function Carousel({ opts, plugins, setApi, className, children, ...props }: CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    { align: "start", containScroll: "trimSnaps", ...opts },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [isAutoplayRunning, setIsAutoplayRunning] = React.useState(false);

  const autoplayPlugin = React.useMemo(() => {
    const found = plugins?.find((plugin) => (plugin as { name?: string }).name === "autoplay");
    return found as { stop: () => void; play: () => void; isPlaying: () => boolean } | undefined;
  }, [plugins]);

  const onSelect = React.useCallback((emblaApi: NonNullable<CarouselApi>) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    if (autoplayPlugin) setIsAutoplayRunning(autoplayPlugin.isPlaying());
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect, autoplayPlugin]);

  React.useEffect(() => {
    if (setApi) setApi(api);
  }, [api, setApi]);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

  const toggleAutoplay = React.useCallback(() => {
    if (!autoplayPlugin) return;
    if (autoplayPlugin.isPlaying()) {
      autoplayPlugin.stop();
      setIsAutoplayRunning(false);
    } else {
      autoplayPlugin.play();
      setIsAutoplayRunning(true);
    }
  }, [autoplayPlugin]);

  const value = React.useMemo<CarouselContextValue>(
    () => ({
      carouselRef,
      api,
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
      isAutoplayRunning,
      toggleAutoplay,
      hasAutoplay: Boolean(autoplayPlugin),
    }),
    [
      carouselRef,
      api,
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
      isAutoplayRunning,
      toggleAutoplay,
      autoplayPlugin,
    ],
  );

  return (
    <CarouselContext.Provider value={value}>
      <div
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

const CarouselContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    const { carouselRef } = useCarousel();
    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div ref={ref} className={cn("-ms-4 flex touch-pan-y", className)} {...props} />
      </div>
    );
  },
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full ps-4", className)}
      {...props}
    />
  ),
);
CarouselItem.displayName = "CarouselItem";

function CarouselControls({ className, label }: { className?: string; label: string }) {
  const {
    scrollPrev,
    scrollNext,
    canScrollPrev,
    canScrollNext,
    hasAutoplay,
    isAutoplayRunning,
    toggleAutoplay,
  } = useCarousel();
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {hasAutoplay ? (
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={toggleAutoplay}
          aria-label={isAutoplayRunning ? `Pause ${label}` : `Play ${label}`}
          aria-pressed={isAutoplayRunning}
        >
          {isAutoplayRunning ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </Button>
      ) : null}
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label={`Previous ${label}`}
      >
        <ArrowLeft aria-hidden="true" className="rtl:rotate-180" />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label={`Next ${label}`}
      >
        <ArrowRight aria-hidden="true" className="rtl:rotate-180" />
      </Button>
    </div>
  );
}

export { CarouselContent, CarouselItem, CarouselControls, useCarousel };
