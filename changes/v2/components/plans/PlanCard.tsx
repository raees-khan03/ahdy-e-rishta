import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import type { Plan } from "@/schemas/content.schema";

export function formatPrice(plan: Plan): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: plan.currency,
    maximumFractionDigits: 0,
  }).format(plan.price);
}

interface PlanCardProps {
  plan: Plan;
  className?: string;
  /** Shorter card used in the home page carousel. */
  compact?: boolean;
}

/** One package. Everything shown here comes from the plans service. */
export function PlanCard({ plan, className, compact = false }: PlanCardProps) {
  return (
    <article
      id={plan.id === "plan-vip" ? "vip" : undefined}
      className={cn(
        "scroll-mt-24",
        "flex h-full flex-col rounded-3xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-maroon-900/10",
        plan.highlighted
          ? "border-maroon-700/40 bg-cream-50 ring-1 ring-maroon-700/20"
          : "border-border",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1.5">
        <div>
          <h3 className="font-heading text-xl font-semibold text-maroon-900">{plan.name}</h3>
          <p className="mt-0.5 font-sans text-xs font-semibold whitespace-nowrap uppercase tracking-[0.12em] text-maroon-600">
            {plan.duration}
          </p>
        </div>
        {plan.badge ? <Badge variant="peach">{plan.badge}</Badge> : null}
      </div>

      <p className="mt-4 font-heading text-3xl font-semibold text-maroon-900 tabular-nums">
        {formatPrice(plan)}
      </p>
      <p className="mt-1 font-sans text-sm leading-6 text-muted-foreground">
        {plan.shortDescription}
      </p>

      {compact ? null : (
        <ul className="mt-5 mb-6 space-y-2.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-2 font-sans text-sm leading-6 text-maroon-900/85">
              <Check className="mt-1 size-4 shrink-0 text-green-700" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      )}

      <Button
        asChild
        variant={plan.highlighted ? "whatsapp" : "outline"}
        className="mt-auto w-full [&>a]:w-full"
      >
        <a
          href={buildWhatsAppUrl(plan.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { source: "plan", plan: plan.name })}
        >
          <WhatsAppIcon />
          {plan.ctaLabel}
        </a>
      </Button>
    </article>
  );
}
