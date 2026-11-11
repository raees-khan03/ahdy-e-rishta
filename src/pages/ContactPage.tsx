import { Reveal } from "@/components/layout/Reveal";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Clock, Mail, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { useSiteSettings } from "@/context/SiteSettingsProvider";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { PageHero } from "@/components/common/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

export default function ContactPage() {
  const { t } = useTranslation();
  const { settings, block } = useSiteSettings();
  const heading = block("page.contact");
  const [searchParams] = useSearchParams();
  const initialTopic = searchParams.get("topic") ?? undefined;

  useSeo({
    title: "Contact the office",
    description:
      "Speak to the Ahd-e-Rishta office in Lahore. Call, email or message on WhatsApp, Monday to Saturday, 10:00 AM to 7:00 PM.",
    path: "/contact",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: settings.siteName,
      telephone: settings.phones[0],
      email: settings.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: settings.address,
        addressLocality: settings.city,
        addressCountry: "PK",
      },
      openingHours: "Mo-Sa 10:00-19:00",
    },
  });

  return (
    <>
      <PageHero
        eyebrow={heading?.eyebrow}
        title={heading?.title ?? "Contact the office"}
        description={heading?.subtitle}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Reveal from="up">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ContactForm initialTopic={initialTopic} />

              <div className="mt-6 rounded-3xl border border-border bg-cream-100/70 p-5">
                <h2 className="font-heading text-lg font-semibold text-maroon-900">
                  Reporting a suspicious profile
                </h2>
                <p className="mt-1.5 max-w-[62ch] font-sans text-sm leading-7 text-maroon-900/80">
                  Send the profile ID and what happened. Please do not forward identity documents.
                  We review every report within two working days and remove profiles that fail
                  verification.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    asChild
                    variant="whatsapp"
                    size="sm"
                    onClick={() => trackEvent("whatsapp_click", { source: "contact_report" })}
                  >
                    <a
                      href={buildWhatsAppUrl({
                        message: "I want to report a suspicious profile. Profile ID:",
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon /> Report on WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href="/safety-tips">Read the safety guide</a>
                  </Button>
                </div>
              </div>
            </div>

            <aside className="space-y-4 lg:col-span-5">
              <div className="rounded-3xl border border-border bg-white p-5 shadow-sm shadow-maroon-900/5">
                <h2 className="font-heading text-xl font-semibold text-maroon-900">
                  {t("footer.contact")}
                </h2>
                <ul className="mt-3 space-y-3.5">
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-maroon-700" aria-hidden="true" />
                    <div>
                      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {t("common.address")}
                      </p>
                      <p className="font-sans text-sm leading-6 text-maroon-900">
                        {settings.address}
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <PhoneCall
                      className="mt-0.5 size-4 shrink-0 text-maroon-700"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {t("common.phone")}
                      </p>
                      <a
                        href={`tel:${settings.phones[0]}`}
                        className="font-sans text-sm text-maroon-900 underline-offset-4 hover:underline"
                      >
                        {settings.phoneDisplay}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-maroon-700" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {t("common.email")}
                      </p>
                      <a
                        href={`mailto:${settings.email}`}
                        className="break-all font-sans text-sm text-maroon-900 underline-offset-4 hover:underline"
                      >
                        {settings.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Clock className="mt-0.5 size-4 shrink-0 text-maroon-700" aria-hidden="true" />
                    <div>
                      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {t("common.workingHours")}
                      </p>
                      {settings.workingHours.map((line: string) => (
                        <p key={line} className="font-sans text-sm leading-6 text-maroon-900">
                          {line}
                        </p>
                      ))}
                    </div>
                  </li>
                </ul>

                <div className="mt-4 flex flex-col gap-2">
                  <Button asChild variant="whatsapp" className="w-full">
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("whatsapp_click", { source: "contact_page" })}
                    >
                      <WhatsAppIcon /> {t("common.whatsappUs")}
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a href={`tel:${settings.phones[0]}`}>
                      <PhoneCall aria-hidden="true" /> {t("common.callUs")}
                    </a>
                  </Button>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-border bg-cream-100">
                <div className="border-b border-border bg-white px-5 py-3">
                  <p className="flex items-center gap-2 font-sans text-sm font-semibold text-maroon-900">
                    <MapPin className="size-4 text-maroon-700" aria-hidden="true" />
                    Office location
                  </p>
                </div>
                {/* Placeholder map embed. Replace with the bureau's verified location link. */}
                <iframe
                  title="Map showing the Ahd-e-Rishta office location (placeholder)"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(settings.mapsQuery)}&z=14&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full border-0"
                />
                <p className="px-5 py-3 font-sans text-xs leading-5 text-muted-foreground">
                  Map shown for reference only. Please call before visiting so a consultant is
                  available.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-white p-5">
                <p className="flex items-center gap-2 font-sans text-sm font-semibold text-maroon-900">
                  <MessageCircle className="size-4 text-maroon-700" aria-hidden="true" />
                  Prefer a face-to-face meeting?
                </p>
                <p className="mt-1 font-sans text-xs leading-5 text-muted-foreground">
                  Book an appointment so we can keep the office private for your family.
                </p>
                <Button asChild variant="secondary" size="sm" className="mt-3">
                  <a
                    href={buildWhatsAppUrl("I would like to book an office appointment.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Request an appointment
                  </a>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </Reveal>
    </>
  );
}
