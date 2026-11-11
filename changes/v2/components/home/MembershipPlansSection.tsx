import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlans } from "@/hooks/useApiQueries";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { formatPrice } from "@/components/plans/PlanCard";
import { trackEvent } from "@/lib/analytics";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ErrorState } from "@/components/common/DataState";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";

export function MembershipPlansSection() {
  const { data, isLoading, isError, refetch } = usePlans();

  return (
    <section
      aria-labelledby="plans-heading"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20"
    >
      <SectionHeading
        id="plans-heading"
        eyebrow="Membership"
        title="Plans that fit your family's pace"
        description="Prices shown are placeholders until the bureau confirms its current fee schedule. Ask the office for the written policy before paying."
      />

      {isError ? (
        <ErrorState onRetry={() => void refetch()} className="mt-10" />
      ) : isLoading ? (
        <div className="mt-10 grid gap-4 lg:grid-cols-3" aria-busy="true">
          <span className="sr-only">Loading plans…</span>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-3xl border border-border bg-white p-6">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="mt-3 h-10 w-32" />
              <Skeleton className="mt-6 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-5/6" />
              <Skeleton className="mt-6 h-11 w-full rounded-full" />
            </div>
          ))}
        </div>
      ) : (
        <ScrollReveal
          stagger
          className="mt-10 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {(data ?? []).map((plan) => (
            <RevealItem key={plan.id} className="h-full">
              <div
                id={plan.id === "plan-vip" ? "vip" : undefined}
                className={cn(
                  "relative flex h-full scroll-mt-24 flex-col rounded-3xl border p-6 shadow-sm transition-transform hover:-translate-y-1",
                  plan.highlighted
                    ? "border-maroon-800/30 bg-linear-to-b from-maroon-900 to-maroon-950 text-cream-100 shadow-lg shadow-maroon-900/20"
                    : "border-border bg-white shadow-maroon-900/5",
                )}
              >
                {plan.badge ? (
                  <span className="absolute -top-3 start-6 inline-flex items-center rounded-full bg-peach-400 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-maroon-950">
                    {plan.badge}
                  </span>
                ) : null}

                <h3
                  className={cn(
                    "font-heading text-2xl font-semibold",
                    plan.highlighted ? "text-cream-50" : "text-maroon-900",
                  )}
                >
                  {plan.name}
                </h3>
                <p
                  className={cn(
                    "mt-1 font-sans text-xs",
                    plan.highlighted ? "text-cream-200/75" : "text-muted-foreground",
                  )}
                >
                  {plan.duration}
                </p>

                <div className="mt-4">
                  <p
                    className={cn(
                      "font-heading text-3xl font-semibold tabular-nums",
                      plan.highlighted ? "text-cream-50" : "text-maroon-800",
                    )}
                  >
                    {formatPrice(plan)}
                  </p>
                </div>

                <p
                  className={cn(
                    "mt-4 font-sans text-sm leading-7",
                    plan.highlighted ? "text-cream-100/85" : "text-muted-foreground",
                  )}
                >
                  {plan.shortDescription}
                </p>

                <ul className="mt-5 space-y-2">
                  {plan.features.slice(0, 5).map((featureText) => {
                    const feature = { label: featureText, included: true, note: "" };
                    return (
                      <li
                        key={feature.label}
                        className={cn(
                          "flex items-start gap-2 font-sans text-sm leading-6",
                          plan.highlighted ? "text-cream-100/90" : "text-maroon-900/85",
                        )}
                      >
                        <Check
                          className={cn(
                            "mt-0.5 size-4 shrink-0",
                            plan.highlighted ? "text-peach-300" : "text-green-800",
                          )}
                          aria-hidden="true"
                        />
                        <span>{feature.label}</span>
                      </li>
                    );
                  })}
                  {plan.features.length > 5 ? (
                    <li
                      className={cn(
                        "font-sans text-xs font-semibold",
                        plan.highlighted ? "text-peach-200/85" : "text-maroon-700",
                      )}
                    >
                      + {plan.features.length - 5} more in this plan
                    </li>
                  ) : null}
                </ul>

                <div className="mt-auto space-y-2 pt-6">
                  <Button
                    asChild
                    variant="whatsapp"
                    className="w-full"
                    onClick={() =>
                      trackEvent("whatsapp_click", { source: "plan_card", plan: plan.name })
                    }
                  >
                    <a
                      href={buildWhatsAppUrl(plan.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon /> Ask about {plan.name}
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant={plan.highlighted ? "secondary" : "outline"}
                    className="w-full"
                  >
                    <Link to="/register">Register first</Link>
                  </Button>
                </div>
              </div>
            </RevealItem>
          ))}
        </ScrollReveal>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="outline">
          <Link to="/packages#compare">Compare plans</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link to="/packages">All plans and payment methods</Link>
        </Button>
      </div>
    </section>
  );
}
