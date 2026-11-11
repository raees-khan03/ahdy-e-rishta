import { Reveal } from "@/components/layout/Reveal";
import { MapPin, Phone } from "lucide-react";
import { useBranches } from "@/hooks/useApiQueries";
import { useSeo } from "@/hooks/useSeo";
import { useSiteSettings } from "@/context/SiteSettingsProvider";
import { PageHero } from "@/components/common/PageHero";
import { ErrorState, EmptyState } from "@/components/common/DataState";
import { Skeleton } from "@/components/ui/skeleton";
import { BranchCard } from "@/components/branches/BranchCard";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

export default function BranchesPage() {
  const { block, settings } = useSiteSettings();
  const heading = block("page.branches");
  const { data, isLoading, isError, refetch } = useBranches();
  const branches = data ?? [];

  useSeo({
    title: heading?.title ?? "Our offices",
    description:
      "Addresses, timings and each office's own phone and WhatsApp number for Ahd-e-Rishta.",
    path: "/branches",
  });

  return (
    <>
      <PageHero
        eyebrow={heading?.eyebrow ?? "Visit us"}
        title={heading?.title ?? "Our offices"}
        description={
          heading?.subtitle ??
          "Every office has its own number. Call or message the one nearest to you and a consultant will reply during office hours."
        }
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Branches" }]}
      />

      <Reveal from="up">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          {isError ? (
            <ErrorState onRetry={() => void refetch()} />
          ) : isLoading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-96 rounded-3xl" />
              ))}
            </div>
          ) : branches.length === 0 ? (
            <EmptyState
              title="No offices listed yet"
              description="Please call the head office and we will guide you to the nearest branch."
            />
          ) : (
            <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {branches.map((branch) => (
                <BranchCard key={branch.id} branch={branch} />
              ))}
            </div>
          )}

          <aside className="mt-12 flex flex-col items-start gap-4 rounded-3xl border border-khaki-300/60 bg-white p-6 shadow-sm shadow-maroon-900/5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-xl font-semibold text-maroon-900">
                Not sure which office to contact?
              </h2>
              <p className="mt-1 max-w-xl font-sans text-sm leading-6 text-muted-foreground">
                The head office will put you through to the right consultant. Calls are answered
                during office hours only.
              </p>
              <p className="mt-2 flex items-center gap-2 font-sans text-sm font-semibold text-maroon-900">
                <Phone className="size-4 text-maroon-700" aria-hidden="true" />
                <a href={`tel:${settings.phones[0]}`} className="hover:text-maroon-700">
                  {settings.phoneDisplay}
                </a>
                <span aria-hidden="true" className="text-maroon-800/30">
                  ·
                </span>
                <MapPin className="size-4 text-maroon-700" aria-hidden="true" />
                {settings.city}
              </p>
            </div>
            <Button
              asChild
              variant="whatsapp"
              onClick={() => trackEvent("whatsapp_click", { source: "branches_page" })}
            >
              <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> Message the head office
              </a>
            </Button>
          </aside>
        </div>
      </Reveal>
    </>
  );
}
