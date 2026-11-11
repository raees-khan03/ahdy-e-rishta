import { useTranslation } from "react-i18next";
import { Quote } from "lucide-react";
import { founderMessage } from "@/lib/homeContent";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function FounderMessageSection() {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="founder-heading" className="relative overflow-hidden bg-cream-100">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -start-20 top-8 size-64 rounded-full bg-peach-200/50 blur-3xl" />
        <div className="absolute -end-16 bottom-0 size-72 rounded-full bg-maroon-100/60 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:items-center lg:py-20">
        <div className="lg:col-span-4">
          <div className="relative mx-auto w-full max-w-xs">
            <div className="aspect-4/5 overflow-hidden rounded-[2rem] border border-khaki-300/60 bg-linear-to-br from-cream-50 to-peach-100 shadow-lg shadow-maroon-900/10">
              <div className="flex size-full flex-col items-center justify-center gap-2 p-6 text-center">
                <span
                  aria-hidden="true"
                  className="grid size-16 place-items-center rounded-full border border-khaki-300 bg-white/70 font-heading text-xl font-semibold text-maroon-800"
                >
                  MT
                </span>
                <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700">
                  Photo placeholder
                </p>
                <p className="max-w-40 font-sans text-[11px] leading-5 text-muted-foreground">
                  Replace with the director&apos;s approved photograph.
                </p>
              </div>
            </div>
            <span
              aria-hidden="true"
              className="absolute -bottom-4 -end-4 hidden size-16 rounded-full border border-khaki-300/60 bg-cream-50/80 backdrop-blur sm:grid sm:place-items-center"
            >
              <Quote className="size-6 text-maroon-700" />
            </span>
          </div>
        </div>

        <div className="lg:col-span-8">
          <SectionHeading
            align="start"
            id="founder-heading"
            eyebrow="From the director's desk"
            title={t("home.founderTitle")}
          />

          <blockquote className="relative mt-10">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -start-3 -top-14 select-none font-script text-7xl leading-none text-peach-400/70 sm:-start-8 sm:text-9xl"
            >
              &ldquo;
            </span>
            <p className="relative font-heading text-2xl italic leading-snug text-maroon-900 text-pretty sm:text-3xl">
              {founderMessage.quote}
            </p>
          </blockquote>

          <ScrollReveal className="mt-6 space-y-4">
            {founderMessage.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="max-w-[62ch] font-sans text-base leading-7 text-maroon-900/80"
              >
                {paragraph}
              </p>
            ))}
          </ScrollReveal>

          <div className="mt-7 flex flex-col gap-1">
            <p className="font-script text-4xl leading-none text-maroon-800 sm:text-5xl">
              {founderMessage.name}
            </p>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-maroon-700">
              {founderMessage.role}
            </p>
            {founderMessage.yearsLabel ? (
              <p className="font-sans text-xs text-muted-foreground">{founderMessage.yearsLabel}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
