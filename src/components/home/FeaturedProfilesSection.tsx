import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFeaturedProfiles } from "@/hooks/useApiQueries";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProfileCarousel } from "@/components/profiles/ProfileCarousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FeaturedTab = "brides" | "grooms";

export function FeaturedProfilesSection() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<FeaturedTab>("brides");
  const brides = useFeaturedProfiles("female");
  const grooms = useFeaturedProfiles("male");

  return (
    <section
      aria-labelledby="featured-heading"
      className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6"
    >
      <Tabs value={tab} onValueChange={(value) => setTab(value as FeaturedTab)}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="featured-heading"
            align="start"
            eyebrow="Selected by our consultants"
            title="Featured proposals"
            description="A handful of proposals our team currently recommends. Ask the office for the full, up-to-date list."
          />
          <TabsList aria-label="Choose featured list">
            <TabsTrigger value="brides">{t("home.bridesTitle")}</TabsTrigger>
            <TabsTrigger value="grooms">{t("home.groomsTitle")}</TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-8">
          <TabsContent value="brides" className="mt-0">
            <ProfileCarousel
              ariaLabel={t("home.bridesTitle")}
              profiles={brides.data}
              isLoading={brides.isLoading}
              isError={brides.isError}
              onRetry={() => void brides.refetch()}
              viewAllHref="/profiles?gender=female&category=featured"
            />
          </TabsContent>
          <TabsContent value="grooms" className="mt-0">
            <ProfileCarousel
              ariaLabel={t("home.groomsTitle")}
              profiles={grooms.data}
              isLoading={grooms.isLoading}
              isError={grooms.isError}
              onRetry={() => void grooms.refetch()}
              viewAllHref="/profiles?gender=male&category=featured"
            />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
