import { Link } from "react-router-dom";
import { ArrowRight, PhoneCall } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

export function CtaSection() {
  return (
    <section aria-labelledby="cta-heading" className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-maroon-800 via-maroon-900 to-maroon-950 px-6 py-12 text-cream-50 shadow-xl shadow-maroon-900/20 sm:px-12">
        <div
          aria-hidden="true"
          className="pattern-khaki pointer-events-none absolute inset-0 opacity-[0.07]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-16 -top-16 size-64 rounded-full bg-peach-400/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-peach-300">
            Begin with a conversation
          </p>
          <h2
            id="cta-heading"
            className="mt-3 font-heading text-3xl font-semibold leading-tight text-cream-50 text-balance sm:text-4xl"
          >
            Register your family, or simply ask us a question
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-sans text-[15px] leading-7 text-cream-100/85">
            The first consultation is free. There is no obligation, and nothing is shared with
            anyone until you say yes.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            <Button asChild size="lg" variant="peach">
              <Link to="/register">
                Register a proposal
                <ArrowRight aria-hidden="true" className="rtl:rotate-180" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="whatsapp"
              onClick={() => trackEvent("whatsapp_click", { source: "cta_band" })}
            >
              <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> WhatsApp the office
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="border-cream-200/30 bg-white/10 text-cream-50 hover:bg-white/20"
            >
              <a href={`tel:${siteConfig.phone}`}>
                <PhoneCall aria-hidden="true" /> {siteConfig.phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
