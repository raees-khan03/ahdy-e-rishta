import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHeroSlides } from "@/hooks/useApiQueries";
import type { HeroSlide } from "@/schemas/content.schema";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { useSiteSettings } from "@/context/SiteSettingsProvider";

export interface HeroCarouselProps {
  slides?: HeroSlide[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

/**
 * Full width hero slider. One photograph fills the screen edge to edge, the
 * words sit on it, and the office controls the pictures from the admin panel
 * (the `hero-slides` collection: image, alt, optional heading, order, on/off).
 */
export function HeroCarousel({ slides, isLoading, isError }: HeroCarouselProps) {
  const query = useHeroSlides();
  const rows = slides ?? query.data ?? [];
  const loading = isLoading ?? query.isLoading;
  const failed = isError ?? query.isError;
  const reducedMotion = useReducedMotion();
  const { settings } = useSiteSettings();

  const plugins = useMemo(
    () =>
      reducedMotion
        ? []
        : [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })],
    [reducedMotion],
  );

  const [api, setApi] = useState<CarouselApi | undefined>(undefined);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!api) return;
    const sync = () => setActive(api.selectedScrollSnap());
    sync();
    api.on("select", sync);
    return () => {
      api.off("select", sync);
    };
  }, [api]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!api) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        api.scrollNext();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        api.scrollPrev();
      }
    },
    [api],
  );

  if (loading) {
    return (
      <section aria-label="Welcome" className="relative h-[60vh] min-h-100 w-full bg-cream-100">
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-4 pb-14 sm:px-6">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-4 h-12 w-3/4 max-w-lg" />
          <Skeleton className="mt-3 h-12 w-2/3 max-w-md" />
          <Skeleton className="mt-5 h-11 w-40 rounded-full" />
        </div>
      </section>
    );
  }

  if (failed || rows.length === 0) {
    return (
      <section aria-label="Welcome" className="relative w-full bg-maroon-950 py-16 text-cream-50">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <h1 className="max-w-2xl font-heading text-3xl leading-tight font-semibold sm:text-4xl">
            {settings.siteName}
          </h1>
          <p className="mt-3 max-w-xl font-sans text-sm leading-7 text-cream-200/85">
            {settings.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/register">Register a proposal</Link>
            </Button>
            <Button asChild size="lg" variant="whatsapp" className="rounded-full">
              <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> WhatsApp us
              </a>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const first = rows[0];
  const current = rows[active] ?? first;
  const heading = current.heading ?? first.heading ?? settings.siteName;
  const subheading = current.subheading ?? first.subheading ?? settings.description;
  const count = rows.length;

  return (
    <section aria-label="Welcome to Ahd-e-Rishta" className="relative w-full">
      {count > 1 ? (
        <div className="pointer-events-none absolute inset-x-0 top-5 z-20">
          <div className="mx-auto flex max-w-7xl justify-end gap-2 px-4 sm:px-6">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              aria-label="Previous picture"
              className="pointer-events-auto grid size-10 place-items-center rounded-full border border-cream-100/40 bg-maroon-950/35 text-cream-50 backdrop-blur transition-colors hover:bg-maroon-950/60 focus-visible:ring-2 focus-visible:ring-cream-50 focus-visible:outline-none"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              aria-label="Next picture"
              className="pointer-events-auto grid size-10 place-items-center rounded-full border border-cream-100/40 bg-maroon-950/35 text-cream-50 backdrop-blur transition-colors hover:bg-maroon-950/60 focus-visible:ring-2 focus-visible:ring-cream-50 focus-visible:outline-none"
            >
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}

      <Carousel
        opts={{ loop: count > 1, align: "start" }}
        plugins={plugins}
        setApi={setApi}
        onKeyDown={handleKeyDown}
        className="w-full"
        aria-roledescription="carousel"
        aria-label="Pictures of families the bureau has worked with"
      >
        <CarouselContent className="ms-0">
          {rows.map((slide, index) => (
            <CarouselItem key={slide.id} className="basis-full ps-0">
              <div className="relative h-[calc(100svh-116px)] max-h-205 min-h-120 w-full overflow-hidden bg-maroon-950">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  width={1600}
                  height={1000}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                  className="absolute inset-0 size-full object-cover object-[62%_20%] sm:object-[50%_10%]"
                />
                {/* Scrim, so the words stay readable on any photograph. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-maroon-950/92 via-maroon-950/55 to-maroon-950/15"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Words sit on top of the pictures, in one place, so the layout never jumps. */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-end pb-24 sm:pb-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="pointer-events-auto max-w-2xl">
              <p className="font-sans text-[11px] font-bold tracking-[0.26em] text-peach-300 uppercase">
                {settings.tagline || "Trusted rishta service"}
              </p>

              <h1
                key={`heading-${current.id}`}
                className="mt-3 font-heading text-[2rem] leading-[1.12] font-semibold text-cream-50 sm:text-5xl lg:text-[3.4rem]"
              >
                {heading}
              </h1>

              {subheading ? (
                <p
                  key={`sub-${current.id}`}
                  className="mt-4 max-w-xl font-sans text-sm leading-7 text-cream-100/90 sm:text-base"
                >
                  {subheading}
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <Button asChild size="lg" variant="secondary" className="rounded-full">
                  <Link to="/register">Register a proposal</Link>
                </Button>
                <Button asChild size="lg" variant="whatsapp" className="rounded-full">
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click", { source: "hero" })}
                  >
                    <WhatsAppIcon /> WhatsApp us
                  </a>
                </Button>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-cream-100/25 pt-4">
                <a
                  href={`tel:${settings.phones[0]}`}
                  className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-cream-50 underline-offset-4 hover:underline"
                >
                  <PhoneCall className="size-3.5" aria-hidden="true" />
                  {settings.phoneDisplay}
                </a>
                <p className="inline-flex items-center gap-1.5 font-sans text-xs text-cream-100/80">
                  <ShieldCheck className="size-3.5 text-peach-300" aria-hidden="true" />
                  Every enquiry goes through the office
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Arrows, dots and counter, bottom right. */}
        {count > 1 ? (
          <div className="absolute inset-x-0 bottom-6 z-20">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
              <div className="flex items-center gap-2" role="tablist" aria-label="Choose a picture">
                {rows.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={index === active}
                    aria-label={`Picture ${index + 1}`}
                    onClick={() => api?.scrollTo(index)}
                    className={cn(
                      "h-1.5 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-cream-50 focus-visible:ring-offset-2 focus-visible:ring-offset-maroon-950 focus-visible:outline-none",
                      index === active
                        ? "w-9 bg-cream-50"
                        : "w-3 bg-cream-50/45 hover:bg-cream-50/70",
                    )}
                  />
                ))}
                <span className="ms-2 font-sans text-xs font-semibold tabular-nums text-cream-100/80">
                  {active + 1} / {count}
                </span>
              </div>

              <span aria-hidden="true" />
            </div>
          </div>
        ) : null}
      </Carousel>
    </section>
  );
}
