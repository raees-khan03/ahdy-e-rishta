import { Reveal } from "@/components/layout/Reveal";
import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle2, PhoneCall, ShieldCheck, XCircle } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { useSafetyTips } from "@/hooks/useApiQueries";
import { useSiteSettings } from "@/context/SiteSettingsProvider";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/DataState";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import type { SafetyTip } from "@/schemas/content.schema";

function pick(tips: SafetyTip[] | undefined, kind: SafetyTip["kind"]) {
  return (tips ?? []).filter((tip) => tip.kind === kind).sort((a, b) => a.sortOrder - b.sortOrder);
}

export default function SafetyTipsPage() {
  const { settings, block } = useSiteSettings();
  const heading = block("page.safety");
  const { data: tips } = useSafetyTips();

  const redFlags = pick(tips, "redFlag");
  const neverAsks = pick(tips, "neverAsk");
  const officeTips = pick(tips, "tip");
  const reportSteps = pick(tips, "reportStep");

  useSeo({
    title: heading?.title ?? "Safety tips",
    description: heading?.subtitle,
    path: "/safety-tips",
  });

  return (
    <>
      <PageHero
        eyebrow={heading?.eyebrow}
        title={heading?.title ?? "Safety tips"}
        description={heading?.subtitle}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Safety tips" }]}
      >
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/contact?topic=Report%20a%20suspicious%20profile">Report a profile</Link>
          </Button>
          <Button
            asChild
            variant="whatsapp"
            onClick={() => trackEvent("whatsapp_click", { source: "safety_page_hero" })}
          >
            <a href={buildWhatsAppUrl("I need to report a suspicious profile or caller.")}>
              <WhatsAppIcon /> Report on WhatsApp
            </a>
          </Button>
        </div>
      </PageHero>

      <Reveal from="up">
        {redFlags.length > 0 && (
          <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
            <SectionHeading
              align="start"
              eyebrow="Warning signs"
              title="Take these seriously"
              description="Any one of them is reason enough to pause and call the office."
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {redFlags.map((flag) => (
                <li
                  key={flag.id}
                  className="flex gap-2.5 rounded-2xl border border-red-200 bg-red-50/60 p-4"
                >
                  <AlertTriangle
                    className="mt-0.5 size-4 shrink-0 text-red-700"
                    aria-hidden="true"
                  />
                  <span className="font-sans text-sm leading-6 text-maroon-900/85">
                    <span className="font-semibold">{flag.title}.</span> {flag.description}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="bg-cream-100">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {neverAsks.length > 0 && (
                <div className="rounded-3xl border border-green-200 bg-white p-6">
                  <h2 className="flex items-center gap-2 font-heading text-xl font-semibold text-maroon-900">
                    <ShieldCheck className="size-5 text-green-800" aria-hidden="true" />
                    What we will never ask for
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {neverAsks.map((item) => (
                      <li
                        key={item.id}
                        className="flex gap-2 font-sans text-sm leading-6 text-maroon-900/80"
                      >
                        <XCircle
                          className="mt-0.5 size-4 shrink-0 text-red-600"
                          aria-hidden="true"
                        />
                        <span>
                          <span className="font-semibold">{item.title}.</span> {item.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {officeTips.length > 0 && (
                <div className="rounded-3xl border border-border bg-white p-6">
                  <h2 className="flex items-center gap-2 font-heading text-xl font-semibold text-maroon-900">
                    <CheckCircle2 className="size-5 text-green-800" aria-hidden="true" />
                    What a genuine bureau does
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {officeTips.map((tip) => (
                      <li
                        key={tip.id}
                        className="flex gap-2 font-sans text-sm leading-6 text-maroon-900/80"
                      >
                        <CheckCircle2
                          className="mt-0.5 size-4 shrink-0 text-green-700"
                          aria-hidden="true"
                        />
                        <span>
                          <span className="font-semibold">{tip.title}.</span> {tip.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {neverAsks.length === 0 && officeTips.length === 0 && (
                <div className="lg:col-span-2">
                  <EmptyState title="Nothing published here yet" />
                </div>
              )}
            </div>
          </div>
        </section>

        {reportSteps.length > 0 && (
          <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
            <SectionHeading
              align="start"
              eyebrow="Report"
              title="How to report a suspicious profile"
            />
            <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {reportSteps.map((step, index) => (
                <li key={step.id} className="rounded-2xl border border-border bg-white p-4">
                  <span className="grid size-8 place-items-center rounded-full bg-maroon-800 font-sans text-xs font-bold text-cream-50">
                    {index + 1}
                  </span>
                  <h3 className="mt-2 font-heading text-base font-semibold text-maroon-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 font-sans text-xs leading-5 text-muted-foreground">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-col gap-4 rounded-3xl bg-maroon-950 p-6 text-cream-100 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-heading text-xl font-semibold text-cream-50">
                  Report to the office, not to a stranger
                </h2>
                <p className="mt-1 max-w-lg font-sans text-sm leading-6 text-cream-200/80">
                  Call {settings.phoneDisplay} or message the official WhatsApp number. Every report
                  stays between you and the consultant handling it.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="whatsapp">
                  <a href={buildWhatsAppUrl("I want to report a suspicious profile.")}>
                    <WhatsAppIcon /> WhatsApp the office
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <a href={`tel:${settings.phones[0]}`}>
                    <PhoneCall aria-hidden="true" /> Call now
                  </a>
                </Button>
              </div>
            </div>
          </section>
        )}
      </Reveal>
    </>
  );
}
