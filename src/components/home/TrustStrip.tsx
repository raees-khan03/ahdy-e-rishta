import { useTranslation } from "react-i18next";
import { trustBadges } from "@/lib/homeContent";
import { DynamicIcon } from "@/components/common/DynamicIcon";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";
import { DamaskBackground } from "@/components/forms/backgrounds/DamaskBackground";

export function TrustStrip() {
  const { t } = useTranslation();

  return (
    <section aria-label={t("home.trustTitle")} className="relative isolate overflow-hidden">
      {/* Halka cream band + nakshi pattern + do soft roshni ke dhabbe */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-b from-cream-100 via-cream-50 to-cream-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.1] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]"
      >
        <DamaskBackground color="#7c1b2c" opacity={0.3} size={260} />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-16 top-1/2 -z-10 size-64 -translate-y-1/2 rounded-full bg-peach-300/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-16 top-1/3 -z-10 size-72 rounded-full bg-maroon-300/15 blur-3xl"
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-14">
        <ScrollReveal stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {trustBadges.map((badge) => (
            <RevealItem
              key={badge.title}
              className="group flex items-start gap-3 rounded-3xl border border-white/70 bg-white/80 p-4 shadow-sm shadow-maroon-900/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-maroon-200/70 hover:bg-white hover:shadow-lg hover:shadow-maroon-900/10"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-cream-100 to-peach-100 text-maroon-700 shadow-inner transition-colors group-hover:from-maroon-800 group-hover:to-maroon-900 group-hover:text-cream-50">
                <DynamicIcon name={badge.icon} className="size-5" />
              </span>
              <div>
                <h3 className="font-heading text-[15px] font-semibold text-maroon-900">
                  {badge.title}
                </h3>
                <p className="mt-0.5 font-sans text-xs leading-5 text-muted-foreground">
                  {badge.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
