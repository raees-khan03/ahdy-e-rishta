import { Reveal } from "@/components/layout/Reveal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { useServices } from "@/hooks/useApiQueries";
import { PageHero } from "@/components/common/PageHero";
import { DynamicIcon } from "@/components/common/DynamicIcon";
import { ErrorState } from "@/components/common/DataState";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";
import { CtaSection } from "@/components/home/CtaSection";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServicesPage() {
  const { data, isLoading, isError, refetch } = useServices();

  useSeo({
    title: "Our rishta services",
    description:
      "Seven bureau-managed matrimonial services: rishta matching, personal matchmaking, second marriage, overseas proposals, face-to-face meetings, marriage counselling and profile verification.",
    path: "/services",
    jsonLd: data
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: data.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service.title,
            description: service.shortDescription,
          })),
        }
      : undefined,
  });

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Guidance for every stage of the search"
        description="Whether you are beginning the search, returning to it after a loss, or coordinating between two countries, one of these services will fit your family."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
      >
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/register">Register a proposal</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/packages">See membership plans</Link>
          </Button>
        </div>
      </PageHero>

      <Reveal from="up">
        <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          {isError ? (
            <ErrorState onRetry={() => void refetch()} />
          ) : isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
              <span className="sr-only">Loading services…</span>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="rounded-3xl border border-border bg-white p-6">
                  <Skeleton className="size-12 rounded-2xl" />
                  <Skeleton className="mt-4 h-6 w-2/3" />
                  <Skeleton className="mt-2 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-5/6" />
                </div>
              ))}
            </div>
          ) : (
            <ScrollReveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(data ?? []).map((service) => (
                <RevealItem key={service.id} className="h-full">
                  <Link
                    to={`/services/${service.slug}`}
                    className="group flex h-full flex-col gap-3 rounded-3xl border border-border bg-white p-6 shadow-sm shadow-maroon-900/5 transition-all hover:-translate-y-1 hover:border-maroon-200 hover:shadow-lg hover:shadow-maroon-900/10 focus-visible:ring-2 focus-visible:ring-maroon-700 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <span className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-cream-100 to-peach-100 text-maroon-800 transition-colors group-hover:from-maroon-800 group-hover:to-maroon-900 group-hover:text-cream-50">
                      <DynamicIcon name={service.icon} className="size-5" />
                    </span>
                    <h2 className="font-heading text-xl font-semibold text-maroon-900">
                      {service.title}
                    </h2>
                    <p className="font-sans text-sm leading-7 text-muted-foreground">
                      {service.shortDescription}
                    </p>
                    <ul className="mt-1 flex flex-wrap gap-1.5">
                      {service.suitedFor.slice(0, 2).map((item) => (
                        <li
                          key={item}
                          className="rounded-full bg-cream-100 px-2.5 py-1 font-sans text-[11px] font-medium text-maroon-800"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-sans text-sm font-semibold text-maroon-700">
                      Learn more
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180"
                      />
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </ScrollReveal>
          )}
        </section>

        <CtaSection />
      </Reveal>
    </>
  );
}
