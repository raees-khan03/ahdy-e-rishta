import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AlertTriangle, ShieldAlert } from "lucide-react";
import { safetyTips } from "@/lib/homeContent";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

export function SafetySection() {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="safety-heading"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20"
    >
      <div className="overflow-hidden rounded-[2rem] border border-maroon-200 bg-maroon-50/70">
        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-maroon-800 px-3.5 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-cream-50">
              <ShieldAlert className="size-3.5 text-peach-300" aria-hidden="true" />
              Safety first
            </span>
            <SectionHeading
              align="start"
              id="safety-heading"
              className="mt-4"
              title={t("home.safetyTitle")}
              description="Rishta fraud usually starts with urgency and ends with a money request. Six simple habits protect your family."
            />
            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild>
                <Link to="/contact?topic=Report%20a%20suspicious%20profile">
                  Report a suspicious profile
                </Link>
              </Button>
              <Button
                asChild
                variant="whatsapp"
                onClick={() => trackEvent("whatsapp_click", { source: "safety_section" })}
              >
                <a
                  href={buildWhatsAppUrl({
                    message: "I want to report a suspicious profile or caller.",
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon /> Report on WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ScrollReveal stagger className="grid gap-3 sm:grid-cols-2">
              {safetyTips.map((tip) => (
                <RevealItem
                  key={tip.title}
                  className="rounded-2xl border border-maroon-200/70 bg-white/80 p-4"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle
                      className="mt-0.5 size-4 shrink-0 text-maroon-600"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-heading text-[15px] font-semibold text-maroon-900">
                        {tip.title}
                      </h3>
                      <p className="mt-1 font-sans text-xs leading-5 text-maroon-900/70">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </ScrollReveal>
            <Link
              to="/safety-tips"
              className="mt-4 inline-block font-sans text-sm font-semibold text-maroon-800 underline decoration-maroon-300 underline-offset-4 hover:decoration-maroon-700"
            >
              Read the full safety guide
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
