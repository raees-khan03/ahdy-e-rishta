import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  BadgeCheck,
  Banknote,
  BookOpen,
  Briefcase,
  Cake,
  CalendarRange,
  Globe,
  GraduationCap,
  HeartHandshake,
  Home,
  Info,
  Languages,
  MapPin,
  MoonStar,
  Printer,
  Ruler,
  ShieldCheck,
  Sun,
  Tag,
  UserRound,
  Users,
  UsersRound,
} from "lucide-react";
import { useProfile, useSimilarProfiles } from "@/hooks/useApiQueries";
import { useSeo } from "@/hooks/useSeo";
import { env } from "@/lib/env";
import { whatsappForProfile } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { formatHeight, genderLabel, maritalLabel } from "@/schemas/profile.schema";
import { PageHero } from "@/components/common/PageHero";
import { ProfilePhoto } from "@/components/profiles/ProfilePhoto";
import { ProfileCarousel } from "@/components/profiles/ProfileCarousel";
import { ShortlistButton } from "@/components/profiles/ShortlistButton";
import { ShareButton } from "@/components/profiles/ShareButton";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ErrorState } from "@/components/common/DataState";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

/* ------------------------------------------------------------------ *
 * Dark detail cards. Sab kuch data se aata hai; jo field khaali ho wo
 * tile render hi nahi hota, is liye khali dabbay nahi bante.
 * ------------------------------------------------------------------ */

interface DetailCardProps {
  id: string;
  title: string;
  icon: typeof Info;
  className?: string;
  children: React.ReactNode;
}

function DetailCard({ id, title, icon: Icon, className = "", children }: DetailCardProps) {
  return (
    <section
      aria-labelledby={id}
      className={`rounded-2xl border border-white/[0.08] bg-[#191016] p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:p-5 print:border-border print:bg-white ${className}`}
    >
      <h2
        id={id}
        className="flex items-center gap-2 font-heading text-[15px] font-semibold text-cream-50 sm:text-base print:text-maroon-900"
      >
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-maroon-300/10 text-maroon-300 print:bg-cream-100 print:text-maroon-700">
          <Icon className="size-3.5" aria-hidden="true" />
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

interface TileProps {
  icon: typeof Info;
  label: string;
  value: string;
}

function Tile({ icon: Icon, label, value }: TileProps) {
  return (
    <li className="flex items-start gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.035] p-2.5 transition-colors hover:border-white/15 hover:bg-white/[0.06] print:border-border print:bg-white">
      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md bg-white/[0.06] text-maroon-200 print:bg-cream-100 print:text-maroon-700">
        <Icon className="size-3.5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="font-sans text-[10px] font-medium tracking-[0.16em] text-[#c9b8b2] uppercase print:text-muted-foreground">
          {label}
        </p>
        <p className="mt-0.5 font-sans text-[13px] leading-5 font-semibold break-words text-[#f7eee7] print:text-maroon-900">
          {value}
        </p>
      </div>
    </li>
  );
}

function TileGrid({ children }: { children: React.ReactNode }) {
  return <ul className="mt-3.5 grid gap-2 sm:grid-cols-2">{children}</ul>;
}

function DetailSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6" aria-busy="true">
      <span className="sr-only">Loading profile…</span>
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-40 rounded-2xl lg:col-span-2" />
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-44 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    </div>
  );
}

export default function ProfileDetailPage() {
  const { id = "" } = useParams();
  const { data: profile, isLoading, isError, refetch } = useProfile(id);
  const similar = useSimilarProfiles(profile);

  const profileJsonLd = useMemo(() => {
    if (!profile) return undefined;
    // No personal data in structured data: no names, no birth dates, no contact details.
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Rishta proposal ${profile.id}`,
      description: `A bureau-verified matrimonial proposal (${profile.id}) listed by Ahd-e-Rishta. Contact is handled by the office.`,
      url: `${env.siteUrl}/profiles/${profile.id}`,
      isPartOf: { "@type": "WebSite", name: "Ahd-e-Rishta", url: env.siteUrl },
    };
  }, [profile]);

  useSeo({
    title: profile ? `Proposal ${profile.id}, verified rishta profile` : "Proposal",
    description: profile
      ? `Bureau-verified matrimonial proposal ${profile.id}. ${genderLabel(profile.gender)}, ${profile.age} years, ${profile.city}. Contact only through the Ahd-e-Rishta office.`
      : "Verified rishta proposal listed by Ahd-e-Rishta.",
    path: `/profiles/${id}`,
    noIndex: true,
    jsonLd: profileJsonLd,
  });

  if (isLoading) return <DetailSkeleton />;

  if (isError || !profile) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <ErrorState
          title="This profile is no longer listed"
          description="It may have been matched, paused or removed at the family's request. Our consultants can suggest similar proposals."
          onRetry={() => void refetch()}
        />
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Button asChild>
            <Link to="/profiles">Browse all proposals</Link>
          </Button>
          <Button asChild variant="whatsapp">
            <a
              href={whatsappForProfile(id, "")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "profile_error" })}
            >
              <WhatsAppIcon /> Ask about {id}
            </a>
          </Button>
        </div>
      </div>
    );
  }

  const children =
    profile.maritalStatus === "never-married"
      ? "Not applicable"
      : profile.hasChildren
        ? "Has children from a previous marriage"
        : "No children";

  return (
    <>
      <PageHero
        eyebrow={`Proposal ${profile.id}`}
        title={profile.displayName}
        description={`${genderLabel(profile.gender)} · ${profile.age} years · ${profile.city}, ${profile.country}`}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Find a match", href: "/profiles" },
          { label: profile.id },
        ]}
      >
        <div className="flex flex-wrap items-center gap-2" data-print-hide>
          <Button
            asChild
            variant="whatsapp"
            onClick={() =>
              trackEvent("whatsapp_click", { source: "profile_detail", profileId: profile.id })
            }
          >
            <a
              href={whatsappForProfile(profile.id, profile.displayName)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon /> Enquire about {profile.id}
            </a>
          </Button>
          <ShortlistButton profileId={profile.id} size="md" withLabel className="bg-white/90" />
          <ShareButton title={`${profile.displayName} (${profile.id})`} className="size-11" />
          <Button variant="secondary" size="default" onClick={() => window.print()}>
            <Printer aria-hidden="true" /> Print
          </Button>
        </div>
      </PageHero>

      <section
        aria-label="Proposal details"
        className="relative isolate overflow-hidden bg-[#120a0e]"
      >
        <div
          aria-hidden="true"
          className="pattern-khaki pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -start-24 top-10 -z-10 size-72 rounded-full bg-maroon-700/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-24 bottom-0 -z-10 size-72 rounded-full bg-maroon-800/30 blur-3xl"
        />

        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-12">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* About + photo + badges */}
            <DetailCard
              id="about-heading"
              title="About"
              icon={Info}
              className="lg:col-span-2 print:block"
            >
              <div className="mt-3.5 flex gap-4">
                <ProfilePhoto
                  profile={profile}
                  priority
                  className="aspect-4/5 w-24 shrink-0 rounded-xl border border-white/10 sm:w-28 md:w-32"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-sans text-[11px] font-semibold print:bg-white ${
                        profile.verified
                          ? "border-green-400/25 bg-green-500/10 text-green-200 print:border-green-700/40 print:text-green-900"
                          : "border-amber-400/25 bg-amber-500/10 text-amber-200 print:border-amber-600/40 print:text-amber-900"
                      }`}
                    >
                      <BadgeCheck className="size-3.5" aria-hidden="true" />
                      {profile.verified ? "Office verified" : "Verification in progress"}
                    </span>
                    {profile.packageName ? (
                      <span className="inline-flex items-center rounded-full border border-peach-300/25 bg-peach-300/10 px-2.5 py-1 font-sans text-[11px] font-semibold text-peach-200 print:border-peach-400/50 print:bg-white print:text-peach-700">
                        {profile.packageName} plan
                      </span>
                    ) : null}
                    <span className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.06] px-2.5 py-1 font-sans text-[11px] font-semibold text-cream-100 print:border-border print:bg-white print:text-maroon-900">
                      ID {profile.id}
                    </span>
                  </div>
                  <p className="mt-3 max-w-[62ch] font-sans text-[13.5px] leading-6 text-[#e8dcd6] print:text-maroon-900/85">
                    {profile.about}
                  </p>
                </div>
              </div>
            </DetailCard>

            {/* Personal information */}
            <DetailCard id="personal-heading" title="Personal Information" icon={UserRound}>
              <TileGrid>
                <Tile icon={UserRound} label="Gender" value={genderLabel(profile.gender)} />
                <Tile icon={Cake} label="Age" value={`${profile.age} years`} />
                <Tile icon={Ruler} label="Height" value={formatHeight(profile.heightCm)} />
                {profile.skinTone ? (
                  <Tile icon={Sun} label="Skin tone" value={profile.skinTone} />
                ) : null}
                <Tile icon={Tag} label="Caste" value={profile.caste} />
                <Tile
                  icon={HeartHandshake}
                  label="Marital status"
                  value={maritalLabel(profile.maritalStatus)}
                />
                <Tile icon={MoonStar} label="Religion" value={profile.religion} />
                <Tile icon={BookOpen} label="Sect" value={profile.sect} />
                <Tile icon={Globe} label="Country" value={profile.country} />
                <Tile icon={MapPin} label="City" value={profile.city} />
                <Tile icon={Languages} label="Languages" value={profile.languages.join(", ")} />
              </TileGrid>
            </DetailCard>

            {/* Education and career */}
            <DetailCard id="career-heading" title="Education & Career" icon={GraduationCap}>
              <TileGrid>
                <Tile icon={GraduationCap} label="Education" value={profile.education} />
                <Tile icon={Briefcase} label="Profession" value={profile.occupation} />
                <Tile icon={Banknote} label="Monthly income" value={profile.income} />
              </TileGrid>
            </DetailCard>

            {/* Family details */}
            <DetailCard id="family-heading" title="Family Details" icon={Users}>
              <TileGrid>
                {typeof profile.brothers === "number" ? (
                  <Tile icon={Users} label="Brothers" value={String(profile.brothers)} />
                ) : null}
                {typeof profile.sisters === "number" ? (
                  <Tile icon={UsersRound} label="Sisters" value={String(profile.sisters)} />
                ) : null}
                <Tile
                  icon={Home}
                  label="Family type"
                  value={profile.familyType === "joint" ? "Joint family" : "Nuclear family"}
                />
                <Tile icon={HeartHandshake} label="Children" value={children} />
              </TileGrid>
            </DetailCard>

            {/* Partner preferences */}
            <DetailCard id="preferences-heading" title="Partner Preferences" icon={HeartHandshake}>
              <TileGrid>
                <Tile
                  icon={CalendarRange}
                  label="Age range"
                  value={profile.partnerDemands.ageRange}
                />
                <Tile
                  icon={Ruler}
                  label="Preferred height"
                  value={profile.partnerDemands.heightRange}
                />
                <Tile
                  icon={GraduationCap}
                  label="Preferred education"
                  value={profile.partnerDemands.education}
                />
                <Tile
                  icon={HeartHandshake}
                  label="Preferred marital status"
                  value={profile.partnerDemands.maritalStatus}
                />
                {profile.partnerDemands.caste ? (
                  <Tile icon={Tag} label="Preferred caste" value={profile.partnerDemands.caste} />
                ) : null}
                <Tile
                  icon={Briefcase}
                  label="Preferred profession"
                  value={profile.partnerDemands.occupation}
                />
                <Tile icon={MapPin} label="Preferred city" value={profile.partnerDemands.city} />
                {profile.partnerDemands.country ? (
                  <Tile
                    icon={Globe}
                    label="Preferred country"
                    value={profile.partnerDemands.country}
                  />
                ) : null}
              </TileGrid>

              <div className="mt-3 rounded-xl border border-white/[0.07] bg-maroon-900/25 p-3 print:border-border print:bg-cream-100">
                <p className="font-sans text-[10px] font-medium tracking-[0.16em] text-[#c9b8b2] uppercase print:text-muted-foreground">
                  Additional remarks
                </p>
                <p className="mt-1 font-sans text-[13px] leading-6 text-[#f0e2db] italic print:text-maroon-900">
                  {profile.partnerDemands.notes}
                </p>
              </div>
            </DetailCard>

            {/* Contact through the office */}
            <div className="lg:col-span-2" data-print-hide>
              <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-[#191016] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-green-500/10 text-green-200">
                    <ShieldCheck className="size-3.5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-sans text-[13px] font-semibold text-[#f7eee7]">
                      Contact details are never shown publicly
                    </p>
                    <p className="mt-0.5 max-w-[70ch] font-sans text-[11.5px] leading-5 text-[#c9b8b2]">
                      Connection happens through the office. Message with this profile ID and a
                      consultant will arrange a respectful introduction with the family.
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Button asChild variant="whatsapp" size="sm">
                    <a
                      href={whatsappForProfile(profile.id, profile.displayName)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("whatsapp_click", {
                          source: "profile_detail_footer",
                          profileId: profile.id,
                        })
                      }
                    >
                      <WhatsAppIcon /> Message the office
                    </a>
                  </Button>
                  <ShortlistButton profileId={profile.id} size="md" withLabel />
                </div>
              </div>

              <p className="mt-3 max-w-[80ch] px-1 font-sans text-[11px] leading-5 text-[#a89893]">
                This listing is prepared by the bureau from information supplied by the family. Our
                team checks identity, phone and family references before sharing, but families
                should still meet in person with a mahram before agreeing to anything.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream-100" data-print-hide>
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
          <SectionHeading
            align="start"
            eyebrow="You may also consider"
            title="Similar proposals"
            description="Selected by the office based on city, caste and preferences."
          />
          <div className="mt-8">
            <ProfileCarousel
              ariaLabel="Similar proposals"
              profiles={similar.data}
              isLoading={similar.isLoading}
              isError={similar.isError}
              onRetry={() => void similar.refetch()}
              viewAllHref={
                profile.gender === "male" ? "/profiles?gender=male" : "/profiles?gender=female"
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}
