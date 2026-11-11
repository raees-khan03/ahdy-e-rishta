import { Reveal } from "@/components/layout/Reveal";
import { Link } from "react-router-dom";
import { Languages, MapPin } from "lucide-react";
import { useConsultants } from "@/hooks/useApiQueries";
import { useSeo } from "@/hooks/useSeo";
import { useSiteSettings } from "@/context/SiteSettingsProvider";
import { PageHero } from "@/components/common/PageHero";
import { ErrorState, EmptyState } from "@/components/common/DataState";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TeamPage() {
  const { block } = useSiteSettings();
  const heading = block("page.team");
  const { data, isLoading, isError, refetch } = useConsultants();
  const consultants = data ?? [];

  useSeo({
    title: heading?.title ?? "Our team",
    description:
      "Meet the Ahd-e-Rishta consultants. Each family is assigned one consultant for the whole search.",
    path: "/team",
  });

  return (
    <>
      <PageHero
        eyebrow={heading?.eyebrow}
        title={heading?.title ?? "Our team"}
        description={heading?.subtitle}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Team" }]}
      />

      <Reveal from="up">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          {isError ? (
            <ErrorState onRetry={() => void refetch()} />
          ) : isLoading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-80 rounded-3xl" />
              ))}
            </div>
          ) : consultants.length === 0 ? (
            <EmptyState
              title="No consultants listed"
              description="Please call the office and we will put you through to a consultant."
            />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {consultants.map((consultant) => (
                <article
                  key={consultant.id}
                  className="flex flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-sm shadow-maroon-900/5"
                >
                  <img
                    src={consultant.photoUrl}
                    alt={`${consultant.name}, ${consultant.role}`}
                    width={480}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    className="aspect-4/3 w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-heading text-xl font-semibold text-maroon-900">
                      {consultant.name}
                    </h2>
                    <p className="font-sans text-sm font-semibold text-maroon-600">
                      {consultant.role}
                    </p>
                    <p className="mt-2 font-sans text-sm leading-7 text-muted-foreground">
                      {consultant.bio}
                    </p>
                    <ul className="mt-3 space-y-1.5 font-sans text-xs text-maroon-900/75">
                      <li className="inline-flex items-center gap-1.5">
                        <MapPin className="size-3.5" aria-hidden="true" />
                        {consultant.cities.join(", ")}
                      </li>
                      <li className="inline-flex items-center gap-1.5">
                        <Languages className="size-3.5" aria-hidden="true" />
                        {consultant.languages.join(", ")}
                      </li>
                    </ul>
                    <p className="mt-2 font-sans text-xs text-muted-foreground">
                      {consultant.experience}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {consultant.focus.map((item) => (
                        <Badge key={item} variant="secondary">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-10 rounded-3xl bg-cream-100 p-6 text-center">
            <h2 className="font-heading text-2xl font-semibold text-maroon-900">
              Not sure who to ask for?
            </h2>
            <p className="mx-auto mt-2 max-w-xl font-sans text-sm leading-7 text-muted-foreground">
              Send one message. We will match you with the consultant who handles your city and your
              kind of case.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Button asChild>
                <Link to="/contact">Contact the office</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/register">Register your rishta</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </>
  );
}
