import { Reveal } from "@/components/layout/Reveal";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useFaqs } from "@/hooks/useApiQueries";
import { useSeo } from "@/hooks/useSeo";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { PageHero } from "@/components/common/PageHero";
import { EmptyState, ErrorState } from "@/components/common/DataState";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn, titleCase } from "@/lib/utils";
import type { FaqCategory } from "@/schemas/content.schema";

const categoryLabels: Record<FaqCategory, string> = {
  general: "General",
  profiles: "Profiles",
  packages: "Packages & fees",
  privacy: "Privacy",
  process: "The process",
};

export default function FaqPage() {
  const { data, isLoading, isError, refetch } = useFaqs();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FaqCategory | "all">("all");

  useSeo({
    title: "Frequently asked questions",
    description:
      "Answers about registration, verification, privacy, photographs, membership plans and the rishta process at Ahd-e-Rishta.",
    path: "/faq",
    jsonLd: data
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: data.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : undefined,
  });

  const categories = useMemo(() => {
    const set = new Set((data ?? []).map((faq) => faq.category));
    return ["all", ...Array.from(set)] as (FaqCategory | "all")[];
  }, [data]);

  const filtered = (data ?? []).filter((faq) => {
    const matchesCategory = category === "all" || faq.category === category;
    const needle = query.trim().toLowerCase();
    const matchesQuery =
      !needle ||
      faq.question.toLowerCase().includes(needle) ||
      faq.answer.toLowerCase().includes(needle);
    return matchesCategory && matchesQuery;
  });

  const grouped = useMemo(() => {
    const map = new Map<FaqCategory, typeof filtered>();
    filtered.forEach((faq) => {
      const list = map.get(faq.category) ?? [];
      list.push(faq);
      map.set(faq.category, list);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <>
      <PageHero
        eyebrow="Help centre"
        title="Frequently asked questions"
        description="Search the answers below, or message the office. A consultant replies personally, usually within one working day."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <Reveal from="up">
        <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
          <div className="rounded-3xl border border-border bg-white p-4 shadow-sm shadow-maroon-900/5">
            <label htmlFor="faq-search" className="sr-only">
              Search questions
            </label>
            <div className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-maroon-800/50"
              />
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search questions, e.g. photographs, refund, verification"
                className="h-11 w-full rounded-full border border-input bg-cream-50 ps-11 pe-4 font-sans text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:border-maroon-700 focus-visible:ring-2 focus-visible:ring-maroon-700/20 focus-visible:outline-none"
              />
            </div>

            <div
              className="mt-3 flex flex-wrap gap-1.5"
              role="group"
              aria-label="Filter by category"
            >
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  className={cn(
                    "rounded-full border px-3 py-1.5 font-sans text-[13px] font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-maroon-700 focus-visible:ring-offset-2 focus-visible:outline-none",
                    category === item
                      ? "border-maroon-800 bg-maroon-800 text-cream-50"
                      : "border-khaki-300/70 bg-white text-maroon-800 hover:bg-cream-100",
                  )}
                >
                  {item === "all" ? "All" : categoryLabels[item]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            {isError ? (
              <ErrorState onRetry={() => void refetch()} />
            ) : isLoading ? (
              <div className="space-y-3" aria-busy="true">
                <span className="sr-only">Loading questions…</span>
                {Array.from({ length: 8 }).map((_, index) => (
                  <Skeleton key={index} className="h-14 w-full rounded-2xl" />
                ))}
              </div>
            ) : grouped.length === 0 ? (
              <EmptyState
                title="No questions match your search"
                description="Try a different word, or ask us directly. We answer every message."
              >
                <Button
                  variant="secondary"
                  onClick={() => {
                    setQuery("");
                    setCategory("all");
                  }}
                >
                  Reset search
                </Button>
                <Button asChild variant="whatsapp">
                  <a
                    href={buildWhatsAppUrl({ message: "I could not find my question in the FAQ." })}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon /> Ask on WhatsApp
                  </a>
                </Button>
              </EmptyState>
            ) : (
              <div className="space-y-8">
                {grouped.map(([groupCategory, items]) => (
                  <section key={groupCategory} aria-labelledby={`faq-group-${groupCategory}`}>
                    <h2
                      id={`faq-group-${groupCategory}`}
                      className="font-heading text-xl font-semibold text-maroon-800"
                    >
                      {categoryLabels[groupCategory] ?? titleCase(groupCategory)}
                    </h2>
                    <Accordion
                      type="single"
                      collapsible
                      className="mt-3 rounded-3xl border border-border bg-white px-5"
                    >
                      {items.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger>{faq.question}</AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col items-start gap-3 rounded-3xl bg-maroon-950 p-6 text-cream-100 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-xl font-semibold text-cream-50">Still unsure?</h2>
              <p className="mt-1 font-sans text-sm text-cream-200/80">
                Message the office. No obligation, no sales script.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="whatsapp">
                <a
                  href={buildWhatsAppUrl({ message: "I have a question about the service." })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon /> WhatsApp
                </a>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/contact">Contact form</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </>
  );
}
