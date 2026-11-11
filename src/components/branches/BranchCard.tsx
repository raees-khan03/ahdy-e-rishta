import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Branch } from "@/schemas/content.schema";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BranchCardProps {
  branch: Branch;
  /** Home page cards are shorter: no hours list. */
  compact?: boolean;
  className?: string;
}

/** One office: address, its own number, WhatsApp and a map link. */
export function BranchCard({ branch, compact = false, className }: BranchCardProps) {
  const mapsHref = branch.mapsQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapsQuery)}`
    : null;

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-3xl border border-border bg-white p-5 shadow-sm shadow-maroon-900/5 transition-shadow hover:shadow-lg hover:shadow-maroon-900/10 sm:p-6",
        branch.isMain && "border-maroon-700/35 ring-1 ring-maroon-700/15",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-heading text-xl font-semibold text-maroon-900">{branch.name}</h3>
        {branch.isMain ? <Badge variant="peach">Main office</Badge> : null}
      </div>

      <p className="mt-1 flex items-center gap-1.5 font-sans text-sm font-semibold text-maroon-700">
        <MapPin className="size-4 shrink-0" aria-hidden="true" />
        {branch.city}
      </p>

      <p className="mt-3 font-sans text-sm leading-7 text-muted-foreground">{branch.address}</p>

      <ul className="mt-4 space-y-2.5 font-sans text-sm text-maroon-900/85">
        <li className="flex items-start gap-2.5">
          <Phone className="mt-0.5 size-4 shrink-0 text-maroon-700" aria-hidden="true" />
          <a
            href={`tel:+${branch.phone ?? branch.whatsapp}`}
            className="hover:text-maroon-700"
            aria-label={`Call ${branch.name} on ${branch.phoneDisplay}`}
          >
            {branch.phoneDisplay}
          </a>
        </li>
        {branch.email ? (
          <li className="flex items-start gap-2.5">
            <Mail className="mt-0.5 size-4 shrink-0 text-maroon-700" aria-hidden="true" />
            <a href={`mailto:${branch.email}`} className="break-all hover:text-maroon-700">
              {branch.email}
            </a>
          </li>
        ) : null}
        {compact ? null : (
          <li className="flex items-start gap-2.5">
            <Clock className="mt-0.5 size-4 shrink-0 text-maroon-700" aria-hidden="true" />
            <span className="leading-6">
              {branch.hours.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </li>
        )}
      </ul>

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        <Button
          asChild
          variant="whatsapp"
          size="sm"
          onClick={() =>
            trackEvent("whatsapp_click", { source: "branch_card", branch: branch.name })
          }
        >
          <a
            href={buildWhatsAppUrl({
              number: branch.whatsapp,
              message: `I would like to speak with the ${branch.name}, ${branch.city}.`,
            })}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${branch.name} on ${branch.phoneDisplay}`}
          >
            <WhatsAppIcon /> WhatsApp
          </a>
        </Button>
        {mapsHref ? (
          <Button asChild variant="outline" size="sm">
            <a href={mapsHref} target="_blank" rel="noopener noreferrer">
              <Navigation aria-hidden="true" />
              Directions
            </a>
          </Button>
        ) : null}
      </div>
    </article>
  );
}
