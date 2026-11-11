import { Reveal } from "@/components/layout/Reveal";
import { Check, CreditCard, Minus, ShieldCheck } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { useFaqs, usePlans } from "@/hooks/useApiQueries";
import { useSiteSettings } from "@/context/SiteSettingsProvider";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ErrorState, EmptyState } from "@/components/common/DataState";
import { PlanCard } from "@/components/plans/PlanCard";
import { formatPrice } from "@/components/plans/PlanCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const paymentMethods = [
  {
    name: "Bank transfer",
    detail: "Ask the office for the account title and IBAN in writing. Keep the receipt.",
  },
  {
    name: "JazzCash",
    detail: "Pay only to the bureau's registered merchant number, never a personal account.",
  },
  {
    name: "Easypaisa",
    detail: "Same rule. The office writes the number on your receipt before you pay.",
  },
];

export default function PackagesPage() {
  const { block } = useSiteSettings();
  const heading = block("page.packages");
  const { data: plans, isLoading, isError, refetch } = usePlans();
  const { data: faqs } = useFaqs();
  const packageFaqs = (faqs ?? []).filter((faq) => faq.category === "packages");
  const allPlans = plans ?? [];

  useSeo({
    title: heading?.title ?? "Membership plans",
    description:
      "Compare Ahd-e-Rishta membership plans, what each includes, payment methods and refund terms.",
    path: "/packages",
  });

  return (
    <>
      <PageHero
        eyebrow={heading?.eyebrow}
        title={heading?.title ?? "Membership plans"}
        description={heading?.subtitle}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Packages" }]}
      />

      <Reveal from="up">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          {isError ? (
            <ErrorState onRetry={() => void refetch()} />
          ) : isLoading ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-96 rounded-3xl" />
              ))}
            </div>
          ) : allPlans.length === 0 ? (
            <EmptyState
              title="No plans published"
              description="The office is updating its fee schedule. Please call or message us for current rates."
            />
          ) : (
            <>
              {/* Grid, carousel nahi: paanchon tiers ek nazar mein, taake VIP card bhi
                seedha nazar aaye aur #vip anchor kaam kare. */}
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
                {allPlans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>

              {/* Comparison table. Columns and rows are both built from the plans data. */}
              <section aria-labelledby="compare-heading" className="mt-14">
                <SectionHeading
                  align="start"
                  id="compare-heading"
                  eyebrow="Side by side"
                  title="Compare the plans"
                  description="Scroll the table sideways on a phone. Every row comes straight from the office's plan list."
                />

                <div
                  className="mt-6 overflow-x-auto rounded-3xl border border-border bg-white"
                  role="region"
                  aria-label="Plan comparison table, scrolls sideways on small screens"
                  tabIndex={0}
                >
                  <table className="w-full min-w-[640px] border-collapse text-start">
                    <caption className="sr-only">Features included in each membership plan</caption>
                    <thead>
                      <tr className="border-b border-border bg-cream-50">
                        <th
                          scope="col"
                          className="p-4 text-start font-sans text-xs font-semibold uppercase tracking-[0.16em] text-maroon-700"
                        >
                          Feature
                        </th>
                        {allPlans.map((plan) => (
                          <th
                            key={plan.id}
                            scope="col"
                            className={cn(
                              "p-4 text-center font-heading text-sm font-semibold text-maroon-900",
                              plan.highlighted && "bg-cream-100",
                            )}
                          >
                            <span className="block">{plan.name}</span>
                            <span className="mt-0.5 block font-sans text-xs font-normal text-muted-foreground">
                              {formatPrice(plan)} · {plan.duration}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {allPlans[0].comparisonFeatures.map((row) => (
                        <tr key={row.label} className="border-b border-border last:border-0">
                          <th
                            scope="row"
                            className="p-4 text-start font-sans text-sm font-medium text-maroon-900"
                          >
                            {row.label}
                          </th>
                          {allPlans.map((plan) => {
                            const match = plan.comparisonFeatures.find(
                              (feature) => feature.label === row.label,
                            );
                            return (
                              <td
                                key={plan.id}
                                className={cn("p-4 text-center", plan.highlighted && "bg-cream-50")}
                              >
                                {match?.included ? (
                                  <Check
                                    className="mx-auto size-4 text-green-700"
                                    aria-label="Included"
                                  />
                                ) : (
                                  <Minus
                                    className="mx-auto size-4 text-maroon-900/30"
                                    aria-label="Not included"
                                  />
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          <section aria-labelledby="payment-heading" className="mt-14">
            <SectionHeading
              align="start"
              id="payment-heading"
              eyebrow="Payment"
              title="How to pay the fee"
              description="Pay the office, get a receipt, keep it in a safe place."
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {paymentMethods.map((method) => (
                <div key={method.name} className="rounded-3xl border border-border bg-white p-5">
                  <div className="flex items-center gap-2">
                    <CreditCard className="size-4 text-maroon-700" aria-hidden="true" />
                    <h3 className="font-heading text-base font-semibold text-maroon-900">
                      {method.name}
                    </h3>
                  </div>
                  <p className="mt-2 font-sans text-sm leading-6 text-muted-foreground">
                    {method.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3 rounded-3xl border border-maroon-700/20 bg-cream-50 p-5">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-maroon-700" aria-hidden="true" />
              <p className="font-sans text-sm leading-7 text-maroon-900/85">
                Refunds follow the written policy. If no proposal has been shared, you can ask for a
                refund within seven days of payment. Once proposals are shared, the fee covers the
                work done. Please read the{" "}
                <a
                  href="/refund-policy"
                  className="font-semibold text-maroon-700 underline-offset-4 hover:underline"
                >
                  refund policy
                </a>{" "}
                before paying.
              </p>
            </div>
          </section>

          {packageFaqs.length > 0 ? (
            <section aria-labelledby="package-faq-heading" className="mt-14">
              <SectionHeading
                align="start"
                id="package-faq-heading"
                eyebrow="Questions"
                title="About fees and plans"
              />
              <Accordion
                type="single"
                collapsible
                className="mt-6 rounded-3xl border border-border bg-white px-5"
              >
                {packageFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-start font-heading text-lg font-semibold text-maroon-900">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-sans text-[15px] leading-7 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ) : null}
        </div>
      </Reveal>
    </>
  );
}
