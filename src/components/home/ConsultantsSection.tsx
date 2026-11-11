import { useTranslation } from "react-i18next";
import { Phone } from "lucide-react";
import { useConsultants } from "@/hooks/useApiQueries";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ErrorState } from "@/components/common/DataState";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";

export function ConsultantsSection() {
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = useConsultants();
  const consultants = data?.slice(0, 4) ?? [];

  return (
    <section
      aria-labelledby="consultants-heading"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20"
    >
      <SectionHeading
        id="consultants-heading"
        eyebrow="The people you will speak to"
        title={t("home.consultantsTitle")}
        description={t("home.consultantsDesc")}
      />

      {isError ? (
        <ErrorState onRetry={() => void refetch()} className="mt-10" />
      ) : isLoading ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true">
          <span className="sr-only">Loading consultants…</span>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-3xl border border-border bg-white p-5">
              <Skeleton className="size-16 rounded-full" />
              <Skeleton className="mt-4 h-5 w-2/3" />
              <Skeleton className="mt-2 h-4 w-1/2" />
              <Skeleton className="mt-4 h-10 w-full rounded-full" />
            </div>
          ))}
        </div>
      ) : (
        <ScrollReveal stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {consultants.map((consultant) => (
            <RevealItem key={consultant.id} className="h-full">
              <article className="flex h-full flex-col items-start gap-3 rounded-3xl border border-border bg-white p-5 shadow-sm shadow-maroon-900/5 transition-shadow hover:shadow-lg hover:shadow-maroon-900/10">
                <div className="flex w-full items-center gap-3">
                  <img
                    src={consultant.photoUrl}
                    alt={`Portrait of ${consultant.name}`}
                    width={112}
                    height={112}
                    loading="lazy"
                    decoding="async"
                    className="size-14 shrink-0 rounded-full border border-khaki-300/60 object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="truncate font-heading text-lg font-semibold text-maroon-900">
                      {consultant.name}
                    </h3>
                    <p className="truncate font-sans text-xs text-muted-foreground">
                      {consultant.role}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant="muted">{consultant.experience}</Badge>
                  {consultant.focus.slice(0, 2).map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>

                <p className="font-sans text-sm leading-7 text-muted-foreground">
                  {consultant.bio}
                </p>

                <p className="font-sans text-xs text-maroon-800/70">
                  <span className="font-semibold">Languages:</span>{" "}
                  {consultant.languages.join(", ")}
                </p>

                {/* Har consultant ka apna number, seedha usi ko call ya WhatsApp. */}
                <div className="mt-auto w-full space-y-2 pt-3">
                  <a
                    href={`tel:+${consultant.whatsapp}`}
                    aria-label={`Call ${consultant.name} on ${consultant.phoneDisplay}`}
                    className="flex items-center gap-2 font-sans text-sm font-semibold text-maroon-900 transition-colors hover:text-maroon-700"
                  >
                    <Phone className="size-4 shrink-0 text-maroon-700" aria-hidden="true" />
                    {consultant.phoneDisplay}
                  </a>
                  <a
                    href={buildWhatsAppUrl({
                      number: consultant.whatsapp,
                      message: `I would like to speak with consultant ${consultant.name}.`,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("whatsapp_click", {
                        source: "consultant_card",
                        consultant: consultant.name,
                      })
                    }
                    aria-label={`WhatsApp ${consultant.name} on ${consultant.phoneDisplay}`}
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-green-800 font-sans text-sm font-semibold text-white transition-colors hover:bg-green-900"
                  >
                    <WhatsAppIcon /> WhatsApp
                  </a>
                </div>
              </article>
            </RevealItem>
          ))}
        </ScrollReveal>
      )}
    </section>
  );
}
