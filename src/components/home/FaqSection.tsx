import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useFaqs } from "@/hooks/useApiQueries";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ErrorState } from "@/components/common/DataState";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { trackEvent } from "@/lib/analytics";

export function FaqSection() {
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = useFaqs();
  const faqs = data?.slice(0, 10) ?? [];

  return (
    <section aria-labelledby="faq-heading" className="bg-cream-100">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <SectionHeading
            align="start"
            id="faq-heading"
            eyebrow="Questions"
            title={t("home.faqTitle")}
            description={t("home.faqDesc")}
          />
          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              asChild
              variant="whatsapp"
              onClick={() => trackEvent("whatsapp_click", { source: "faq_section" })}
            >
              <a
                href={buildWhatsAppUrl({ message: "I have a question about the rishta process." })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon /> Ask on WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/faq">
                All questions
                <ArrowRight aria-hidden="true" className="rtl:rotate-180" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-8">
          {isError ? (
            <ErrorState onRetry={() => void refetch()} />
          ) : isLoading ? (
            <div className="space-y-3" aria-busy="true">
              <span className="sr-only">Loading questions…</span>
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-14 w-full rounded-2xl" />
              ))}
            </div>
          ) : (
            <Accordion
              type="single"
              collapsible
              className="rounded-3xl border border-border bg-white px-5 sm:px-6"
            >
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                    {index === faqs.length - 1 ? (
                      <span className="mt-3 block">
                        <Link
                          to="/faq"
                          className="font-semibold text-maroon-800 underline underline-offset-4"
                        >
                          See every question
                        </Link>
                      </span>
                    ) : null}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </section>
  );
}
