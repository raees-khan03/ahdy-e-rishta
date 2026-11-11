import { Reveal } from "@/components/layout/Reveal";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { useService, useServices } from "@/hooks/useApiQueries";
import { whatsappForService } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { PageHero } from "@/components/common/PageHero";
import { DynamicIcon } from "@/components/common/DynamicIcon";
import { ErrorState } from "@/components/common/DataState";
import { CtaSection } from "@/components/home/CtaSection";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ServiceDetailPage() {
  const { slug = "" } = useParams();
  const { data: service, isLoading, isError, refetch } = useService(slug);
  const { data: allServices } = useServices();

  useSeo({
    title: service ? service.title : "Service",
    description: service ? service.shortDescription : "A bureau-managed rishta service.",
    path: `/services/${slug}`,
    jsonLd: service
      ? {
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.shortDescription,
          provider: { "@type": "Organization", name: "Ahd-e-Rishta" },
          areaServed: "Pakistan",
        }
      : undefined,
  });

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6" aria-busy="true">
        <span className="sr-only">Loading service…</span>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="mt-4 h-12 w-2/3" />
        <Skeleton className="mt-6 h-40 w-full rounded-3xl" />
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <ErrorState
          title="We could not find that service"
          description="It may have been renamed. Browse all services instead."
          onRetry={() => void refetch()}
        />
        <div className="mt-5 flex justify-center">
          <Button asChild>
            <Link to="/services">All services</Link>
          </Button>
        </div>
      </div>
    );
  }

  const related = (allServices ?? []).filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.shortDescription}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <Button
            asChild
            variant="whatsapp"
            onClick={() =>
              trackEvent("whatsapp_click", { source: "service_hero", service: service.title })
            }
          >
            <a href={whatsappForService(service.title)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Ask about this service
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/register">Register a proposal</Link>
          </Button>
        </div>
      </PageHero>

      <Reveal from="up">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <span className="grid size-12 place-items-center rounded-2xl bg-cream-100 text-maroon-800">
                <DynamicIcon name={service.icon} className="size-5" />
              </span>
              <p className="mt-4 max-w-[65ch] font-sans text-base leading-7 text-maroon-900/85">
                {service.intro}
              </p>

              <section aria-labelledby="benefits-heading" className="mt-10">
                <h2
                  id="benefits-heading"
                  className="font-heading text-2xl font-semibold text-maroon-800"
                >
                  What you can expect
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {service.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex gap-2 rounded-2xl border border-border bg-white p-3.5"
                    >
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-green-800"
                        aria-hidden="true"
                      />
                      <span className="font-sans text-sm leading-6 text-maroon-900/85">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="process-heading" className="mt-10">
                <h2
                  id="process-heading"
                  className="font-heading text-2xl font-semibold text-maroon-800"
                >
                  How the process works
                </h2>
                <ol className="mt-4 space-y-3">
                  {service.process.map((step, index) => (
                    <li
                      key={step.title}
                      className="flex gap-3 rounded-2xl border border-border bg-white p-4"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-maroon-800 font-sans text-xs font-bold text-cream-50">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-heading text-base font-semibold text-maroon-900">
                          {step.title}
                        </h3>
                        <p className="mt-0.5 font-sans text-sm leading-6 text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <section aria-labelledby="service-faq-heading" className="mt-10">
                <h2
                  id="service-faq-heading"
                  className="font-heading text-2xl font-semibold text-maroon-800"
                >
                  Questions about this service
                </h2>
                <Accordion
                  type="single"
                  collapsible
                  className="mt-3 rounded-3xl border border-border bg-white px-5"
                >
                  {service.faqs.map((faq) => (
                    <AccordionItem key={faq.question} value={faq.question}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </div>

            <aside className="space-y-4 lg:col-span-4">
              <div className="rounded-3xl border border-border bg-cream-100/70 p-5">
                <h2 className="font-heading text-lg font-semibold text-maroon-900">Suited for</h2>
                <ul className="mt-2 space-y-1.5">
                  {service.suitedFor.map((item) => (
                    <li key={item} className="flex gap-2 font-sans text-sm text-maroon-900/80">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-maroon-600"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-border bg-white p-5 shadow-sm shadow-maroon-900/5">
                <h2 className="font-heading text-lg font-semibold text-maroon-900">
                  Other services
                </h2>
                <ul className="mt-2 space-y-1">
                  {related.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`/services/${item.slug}`}
                        className="flex items-center justify-between gap-2 rounded-xl px-2 py-2 font-sans text-sm text-maroon-800 transition-colors hover:bg-cream-100"
                      >
                        {item.title}
                        <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-maroon-950 p-5 text-cream-100">
                <p className="font-heading text-lg font-semibold text-cream-50">
                  Not sure which to choose?
                </p>
                <p className="mt-1 font-sans text-xs leading-5 text-cream-200/80">
                  Message the office and a consultant will suggest the right service for your
                  family, honestly.
                </p>
                <Button asChild variant="whatsapp" size="sm" className="mt-3 w-full">
                  <a
                    href={whatsappForService(service.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon /> Ask a consultant
                  </a>
                </Button>
              </div>
            </aside>
          </div>
        </div>

        <CtaSection />
      </Reveal>
    </>
  );
}
