import { useTranslation } from "react-i18next";
import { useLatestProfiles } from "@/hooks/useApiQueries";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProfileCarousel } from "@/components/profiles/ProfileCarousel";

export function LatestProfilesSection() {
  const { t } = useTranslation();
  const brides = useLatestProfiles("female");
  const grooms = useLatestProfiles("male");

  return (
    <section
      aria-labelledby="latest-heading"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20"
    >
      <SectionHeading
        id="latest-heading"
        eyebrow="Newly added"
        title="Latest proposals from the office"
        description="New profiles are added after verification. Nothing appears here before our team has checked it."
      />

      <div className="mt-10 space-y-12">
        <div>
          <div className="mb-5 flex items-end justify-between gap-3">
            <h3 className="font-heading text-2xl font-semibold text-maroon-800">
              {t("home.latestBrides")}
            </h3>
          </div>
          <ProfileCarousel
            ariaLabel={t("home.latestBrides")}
            profiles={brides.data}
            isLoading={brides.isLoading}
            isError={brides.isError}
            onRetry={() => void brides.refetch()}
            viewAllHref="/profiles?gender=female"
            emptyTitle="No new bride proposals yet"
          />
        </div>

        <div>
          <div className="mb-5 flex items-end justify-between gap-3">
            <h3 className="font-heading text-2xl font-semibold text-maroon-800">
              {t("home.latestGrooms")}
            </h3>
          </div>
          <ProfileCarousel
            ariaLabel={t("home.latestGrooms")}
            profiles={grooms.data}
            isLoading={grooms.isLoading}
            isError={grooms.isError}
            onRetry={() => void grooms.refetch()}
            viewAllHref="/profiles?gender=male"
            emptyTitle="No new groom proposals yet"
          />
        </div>
      </div>
    </section>
  );
}
