import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { homeServices } from "@/lib/homeContent";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";
import { DynamicIcon } from "@/components/common/DynamicIcon";

export function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="services-heading"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20"
    >
      <SectionHeading
        id="services-heading"
        eyebrow="Our services"
        title={t("home.servicesTitle")}
        description={t("home.servicesDesc")}
      />

      <ScrollReveal stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {homeServices.map((service) => (
          <RevealItem key={service.slug}>
            <Link
              to={`/services/${service.slug}`}
              className="group flex h-full flex-col gap-3 rounded-3xl border border-border bg-white p-6 shadow-sm shadow-maroon-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-maroon-200 hover:shadow-lg hover:shadow-maroon-900/10 focus-visible:ring-2 focus-visible:ring-maroon-700 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-cream-100 to-peach-100 text-maroon-800 transition-colors group-hover:from-maroon-800 group-hover:to-maroon-900 group-hover:text-cream-50">
                <DynamicIcon name={service.icon} className="size-5" />
              </span>
              <h3 className="font-heading text-xl font-semibold text-maroon-900">
                {service.title}
              </h3>
              <p className="font-sans text-sm leading-7 text-muted-foreground">
                {service.description}
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-sans text-sm font-semibold text-maroon-700">
                Learn more
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                />
              </span>
            </Link>
          </RevealItem>
        ))}
      </ScrollReveal>
    </section>
  );
}
