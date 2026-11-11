import { Reveal } from "@/components/layout/Reveal";
import { Link } from "react-router-dom";
import { AlertCircle, FileText } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { useLegalPage } from "@/hooks/useApiQueries";
import type { LegalSlug } from "@/api/legalPages.api";
import { PageHero } from "@/components/common/PageHero";
import { EmptyState } from "@/components/common/DataState";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export type LegalVariant = LegalSlug;

const documents: Record<LegalSlug, { label: string; path: string }> = {
  terms: { label: "Terms of use", path: "/terms" },
  privacy: { label: "Privacy policy", path: "/privacy" },
  refund: { label: "Refund policy", path: "/refund-policy" },
};

const otherLinks = [
  { label: "Terms of use", href: "/terms" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Refund policy", href: "/refund-policy" },
  { label: "Safety tips", href: "/safety-tips" },
  { label: "FAQ", href: "/faq" },
];

interface LegalPageProps {
  variant: LegalVariant;
}

export default function LegalPage({ variant }: LegalPageProps) {
  const meta = documents[variant];
  const { data: document, isLoading } = useLegalPage(variant);

  useSeo({
    title: document?.title ?? meta.label,
    description: document?.intro,
    path: meta.path,
  });

  return (
    <>
      <PageHero
        eyebrow="Documents"
        title={document?.title ?? meta.label}
        description={document?.intro}
        breadcrumb={[{ label: "Home", href: "/" }, { label: meta.label }]}
      />

      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-12">
        <Reveal from="up" duration={0.8} className="lg:col-span-8">
          <article>
            {isLoading && (
              <div className="space-y-3">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-24 w-full rounded-2xl" />
                <Skeleton className="h-24 w-full rounded-2xl" />
              </div>
            )}

            {!isLoading && !document && (
              <EmptyState
                title="This document is being updated"
                description="The office has removed the wording while it is reviewed. Message us and we will send it to you."
              />
            )}

            {document && (
              <>
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-300/60 bg-amber-50 p-4">
                  <AlertCircle
                    className="mt-0.5 size-5 shrink-0 text-amber-700"
                    aria-hidden="true"
                  />
                  <p className="font-sans text-sm leading-6 text-amber-900">
                    <span className="font-semibold">Draft wording.</span> The bureau reviews this
                    page before launch. Ask the office for anything you want explained.
                  </p>
                </div>

                <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Last reviewed {document.lastReviewed}
                </p>

                <div className="mt-6 space-y-8">
                  {document.sections.map((section) => (
                    <section key={section.heading}>
                      <h2 className="font-heading text-xl font-semibold text-maroon-900 sm:text-2xl">
                        {section.heading}
                      </h2>
                      <div className="mt-2 space-y-3">
                        {section.paragraphs.map((paragraph, index) => (
                          <p
                            key={`${section.heading}-${index}`}
                            className="max-w-[65ch] font-sans text-[15px] leading-7 text-maroon-900/80"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </>
            )}
          </article>
        </Reveal>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 rounded-3xl border border-border bg-white p-5 shadow-sm shadow-maroon-900/5">
            <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-maroon-900">
              <FileText className="size-4 text-maroon-700" aria-hidden="true" />
              Other documents
            </h2>
            <Separator className="my-3" />
            <ul className="space-y-2">
              {otherLinks
                .filter((link) => link.href !== meta.path)
                .map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="block rounded-xl px-2 py-1.5 font-sans text-sm text-maroon-800 transition-colors hover:bg-cream-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
            <p className="mt-4 rounded-xl bg-cream-100 p-3 font-sans text-xs leading-5 text-maroon-900/70">
              Questions about this document? Message the office and a consultant will explain it in
              plain language.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
