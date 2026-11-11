import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { useBranches } from "@/hooks/useApiQueries";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ErrorState } from "@/components/common/DataState";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { BranchCard } from "@/components/branches/BranchCard";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";

export function BranchesSection() {
  const { data, isLoading, isError, refetch } = useBranches();
  const branches = data ?? [];

  return (
    <section aria-labelledby="branches-heading" className="bg-cream-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <SectionHeading
          id="branches-heading"
          eyebrow="Visit us"
          title="Our offices"
          description="Each office has its own number on WhatsApp. Call the branch nearest to you, or message it and a consultant will reply during office hours."
        />

        {isError ? (
          <ErrorState onRetry={() => void refetch()} className="mt-10" />
        ) : isLoading ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            <span className="sr-only">Loading offices…</span>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-3xl border border-border bg-white p-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="mt-3 h-4 w-24" />
                <Skeleton className="mt-4 h-4 w-full" />
                <Skeleton className="mt-4 h-10 w-full rounded-full" />
              </div>
            ))}
          </div>
        ) : branches.length === 0 ? null : (
          <ScrollReveal
            stagger
            className="mt-10 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {branches.map((branch) => (
              <RevealItem key={branch.id} className="h-full">
                <BranchCard branch={branch} compact />
              </RevealItem>
            ))}
          </ScrollReveal>
        )}

        {branches.length > 0 ? (
          <div className="mt-8 flex justify-center">
            <Button asChild variant="outline">
              <Link to="/branches">
                <MapPin aria-hidden="true" />
                All offices and timings
                <ArrowRight aria-hidden="true" className="rtl:rotate-180" />
              </Link>
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
