import { useMemo } from "react";
import { useHeroSlides, useFaqs } from "@/hooks/useApiQueries";
import { useSeo } from "@/hooks/useSeo";
import { env } from "@/lib/env";
import { siteConfig } from "@/lib/site";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { FindMatchSection } from "@/components/home/FindMatchSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturedProfilesSection } from "@/components/home/FeaturedProfilesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { SecondMarriageSection } from "@/components/home/SecondMarriageSection";
import { MembershipPlansSection } from "@/components/home/MembershipPlansSection";
import { ConsultantsSection } from "@/components/home/ConsultantsSection";
import { BranchesSection } from "@/components/home/BranchesSection";
import { FounderMessageSection } from "@/components/home/FounderMessageSection";
import { SafetySection } from "@/components/home/SafetySection";
import { SuccessStoriesSection } from "@/components/home/SuccessStoriesSection";
import { VideosSection } from "@/components/home/VideosSection";
import { LatestProfilesSection } from "@/components/home/LatestProfilesSection";
import { MobileAppSection } from "@/components/home/MobileAppSection";
import { FaqSection } from "@/components/home/FaqSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { CtaSection } from "@/components/home/CtaSection";

export default function HomePage() {
  const hero = useHeroSlides();
  const faqs = useFaqs();

  const jsonLd = useMemo(() => {
    const organization = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      alternateName: siteConfig.tagline,
      url: env.siteUrl,
      description: siteConfig.description,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address,
        addressLocality: siteConfig.city,
        addressCountry: "PK",
      },
    };

    const website = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: env.siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${env.siteUrl}/profiles?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    };

    const faqPage = faqs.data?.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.data.slice(0, 8).map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

    return [organization, website, ...(faqPage ? [faqPage] : [])];
  }, [faqs.data]);

  useSeo({
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    path: "/",
    jsonLd,
  });

  return (
    <>
      <HeroCarousel
        slides={hero.data ?? []}
        isLoading={hero.isLoading}
        isError={hero.isError}
        onRetry={() => void hero.refetch()}
      />
      <FindMatchSection />
      <TrustStrip />
      <ServicesSection />
      <StatsSection />
      <FeaturedProfilesSection />
      <HowItWorksSection />
      <SecondMarriageSection />
      <MembershipPlansSection />
      <ConsultantsSection />
      <BranchesSection />
      <FounderMessageSection />
      <SafetySection />
      <SuccessStoriesSection />
      <VideosSection />
      <LatestProfilesSection />
      <MobileAppSection />
      <FaqSection />
      <NewsletterSection />
      <CtaSection />
    </>
  );
}
