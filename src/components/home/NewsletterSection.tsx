import { useTranslation } from "react-i18next";
import { Mail } from "lucide-react";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function NewsletterSection() {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-khaki-300/70 bg-linear-to-br from-cream-50 via-cream-100 to-peach-100 px-6 py-10 sm:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-10 -top-10 size-40 rounded-full bg-white/50 blur-2xl"
        />
        <div className="relative grid gap-6 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-maroon-700">
              <Mail className="size-3.5" aria-hidden="true" /> Newsletter
            </span>
            <h2
              id="newsletter-heading"
              className="mt-3 font-heading text-2xl font-semibold text-maroon-800 sm:text-3xl"
            >
              {t("home.newsletterTitle")}
            </h2>
            <p className="mt-2 max-w-lg font-sans text-sm leading-7 text-maroon-900/75">
              {t("home.newsletterDesc")}
            </p>
          </div>
          <div className="lg:justify-self-end">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
