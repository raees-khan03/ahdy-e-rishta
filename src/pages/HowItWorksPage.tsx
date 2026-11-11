import { Reveal } from "@/components/layout/Reveal";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { useProcessSteps, useVerificationSteps } from "@/hooks/useApiQueries";
import { useSiteSettings } from "@/context/SiteSettingsProvider";
import { PageHero } from "@/components/common/PageHero";
import { DynamicIcon } from "@/components/common/DynamicIcon";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/DataState";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";
import { CtaSection } from "@/components/home/CtaSection";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

export default function HowItWorksPage() {
  const { block } = useSiteSettings();
  const heading = block("page.howItWorks");
  const { data: steps } = useProcessSteps();
  const { data: verification } = useVerificationSteps();

  useSeo({
    title: heading?.title ?? "How it works",
    description: heading?.subtitle,
    path: "/how-it-works",
  });

  return (
    <>
      <PageHero
        eyebrow={heading?.eyebrow}
        title={heading?.title ?? "How it works"}
        description={heading?.subtitle}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "How it works" }]}
      >
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/register">Start registration</Link>
          </Button>
          <Button asChild variant="whatsapp">
            <a href={buildWhatsAppUrl("Please walk me through the process.")}>
              <WhatsAppIcon /> Ask a question
            </a>
          </Button>
        </div>
      </PageHero>

      <Reveal from="up">
        <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
          {steps && steps.length === 0 && (
            <EmptyState
              title="Nothing published here yet"
              description="The office is updating this page. Message us and a consultant will explain the process."
            />
          )}

          <ol className="relative space-y-6 border-s border-dashed border-khaki-400/70 ps-6 sm:ps-10">
            {steps?.map((step, index) => (
              <li key={step.id} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -start-[2.1rem] top-1 grid size-9 place-items-center rounded-full bg-maroon-800 font-sans text-xs font-bold text-cream-50 shadow-sm sm:-start-[3.4rem]"
                >
                  {index + 1}
                </span>
                <div className="rounded-3xl border border-border bg-white p-5 shadow-sm shadow-maroon-900/5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="grid size-9 place-items-center rounded-xl bg-cream-100 text-maroon-700">
                      <DynamicIcon name={step.icon} className="size-4" />
                    </span>
                    <h2 className="font-heading text-xl font-semibold text-maroon-900">
                      {step.title}
                    </h2>
                    {step.note && (
                      <span className="ms-auto rounded-full bg-cream-100 px-2.5 py-1 font-sans text-[11px] font-semibold text-maroon-800">
                        {step.note}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 max-w-[62ch] font-sans text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {verification && verification.length > 0 && (
          <section className="bg-cream-100">
            <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
              <SectionHeading
                eyebrow="Before anything is shared"
                title="Every profile passes these checks"
                description="Verification happens before a profile is visible to anyone, not as a label added afterwards."
              />
              <ScrollReveal stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {verification.map((step, index) => (
                  <RevealItem key={step.id} className="h-full">
                    <div className="flex h-full flex-col gap-2 rounded-3xl border border-border bg-white p-5">
                      <div className="flex items-center justify-between">
                        <span className="grid size-10 place-items-center rounded-2xl bg-cream-100 text-maroon-800">
                          <DynamicIcon name={step.icon} className="size-4" />
                        </span>
                        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-khaki-500">
                          Check {index + 1}
                        </span>
                      </div>
                      <h3 className="font-heading text-base font-semibold text-maroon-900">
                        {step.title}
                      </h3>
                      <p className="font-sans text-sm leading-6 text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </RevealItem>
                ))}
              </ScrollReveal>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 rounded-3xl border border-border bg-white px-5 py-4">
                <ShieldCheck className="size-5 text-green-800" aria-hidden="true" />
                <p className="font-sans text-sm text-maroon-900/80">
                  You may ask for your profile to be paused or removed at any time.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/safety-tips">
                    Read our safety guide
                    <ArrowRight aria-hidden="true" className="rtl:rotate-180" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        <CtaSection />
      </Reveal>
    </>
  );
}
