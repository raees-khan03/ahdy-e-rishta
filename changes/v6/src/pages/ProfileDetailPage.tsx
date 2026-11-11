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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { Reveal, RevealGroup, RevealItem } from "@/components/layout/Reveal";

/* ------------------------------------------------------------------ *
 * Har topic ka apna section (card). Jo field khaali ho wo Fact render
 * hi nahi hota, is liye khali dabbay nahi bante.
 * ------------------------------------------------------------------ */

interface DetailSectionProps {
  id: string;
  title: string;
  icon: typeof Info;
  children: React.ReactNode;
}

function DetailSection({ id, title, icon: Icon, children }: DetailSectionProps) {
  return (
    <section aria-labelledby={id} className="rounded-3xl border border-border bg-white p-5 sm:p-6">
      <h2
        id={id}
        className="flex items-center gap-2.5 font-heading text-xl font-semibold text-maroon-800"
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-cream-100 text-maroon-700">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

interface FactProps {
  icon: typeof Cake;
  label: string;
  value: string;
}

function Fact({ icon: Icon, label, value }: FactProps) {
  return (
    <li className="flex items-start gap-3 rounded-2xl bg-cream-100/60 p-3.5">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-maroon-700">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="font-sans text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
          {label}
        </p>
        <p className="mt-0.5 font-sans text-sm font-medium break-words text-maroon-900">{value}</p>
      </div>
    </li>
  );
}

function FactGrid({ children }: { children: React.ReactNode }) {
  return <ul className="mt-4 grid list-none gap-3 sm:grid-cols-2">{children}</ul>;
}

function DetailSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6" aria-busy="true">
      <span className="sr-only">Loading profile…</span>
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Skeleton className="aspect-4/5 w-full rounded-3xl" />
        </div>
        <div className="space-y-4 lg:col-span-8">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-40 w-full rounded-3xl" />
          <Skeleton className="h-40 w-full rounded-3xl" />
          <Skeleton className="h-40 w-full rounded-3xl" />
        </div>
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

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left: photo, badges, contact (sticky), arrangement unchanged */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-4">
              <ProfilePhoto
                profile={profile}
                priority
                className="aspect-4/5 w-full rounded-3xl border border-border"
              />
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary" className="gap-1">
                  <BadgeCheck className="size-3.5 text-green-800" aria-hidden="true" />
                  {profile.verified ? "Office verified" : "Verification in progress"}
                </Badge>
                {profile.packageName ? (
                  <Badge variant="peach">{profile.packageName} plan</Badge>
                ) : null}
                <Badge variant="outline">ID {profile.id}</Badge>
              </div>

              <div className="rounded-3xl border border-border bg-cream-100/70 p-4" data-print-hide>
                <p className="flex items-center gap-2 font-sans text-sm font-semibold text-maroon-900">
                  <ShieldCheck className="size-4 text-green-800" aria-hidden="true" />
                  Contact through the office
                </p>
                <p className="mt-1.5 font-sans text-xs leading-5 text-maroon-900/75">
                  We never publish phone numbers, addresses or full names. Message the office with
                  this profile ID and a consultant will arrange a respectful introduction.
                </p>
                <Button asChild variant="whatsapp" size="sm" className="mt-3 w-full">
                  <a
                    href={whatsappForProfile(profile.id, profile.displayName)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon /> Message the office
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Right: about, then one section per topic */}
          <div className="lg:col-span-8">
            <Reveal from="up" duration={0.85}>
              <section aria-labelledby="about-heading">
                <h2
                  id="about-heading"
                  className="font-heading text-2xl font-semibold text-maroon-800"
                >
                  About this proposal
                </h2>
                <p className="mt-3 max-w-[65ch] font-sans text-[15px] leading-7 text-maroon-900/85">
                  {profile.about}
                </p>
              </section>
            </Reveal>

            <Separator className="my-7" />

            <RevealGroup className="space-y-5" gap={0.1}>
              {/* Personal information */}
              <RevealItem>
                <DetailSection id="personal-heading" title="Personal Information" icon={UserRound}>
                  <FactGrid>
                    <Fact icon={UserRound} label="Gender" value={genderLabel(profile.gender)} />
                    <Fact icon={Cake} label="Age" value={`${profile.age} years`} />
                    <Fact icon={Ruler} label="Height" value={formatHeight(profile.heightCm)} />
                    {profile.skinTone ? (
                      <Fact icon={Sun} label="Skin tone" value={profile.skinTone} />
                    ) : null}
                    <Fact icon={Tag} label="Caste / biradari" value={profile.caste} />
                    <Fact
                      icon={HeartHandshake}
                      label="Marital status"
                      value={maritalLabel(profile.maritalStatus)}
                    />
                    <Fact icon={MoonStar} label="Religion" value={profile.religion} />
                    <Fact icon={BookOpen} label="Sect" value={profile.sect} />
                    <Fact icon={Globe} label="Country" value={profile.country} />
                    <Fact icon={MapPin} label="City" value={profile.city} />
                    <Fact icon={Languages} label="Languages" value={profile.languages.join(", ")} />
                  </FactGrid>
                </DetailSection>
              </RevealItem>

              {/* Education and career */}
              <RevealItem>
                <DetailSection id="career-heading" title="Education & Career" icon={GraduationCap}>
                  <FactGrid>
                    <Fact icon={GraduationCap} label="Education" value={profile.education} />
                    <Fact icon={Briefcase} label="Profession" value={profile.occupation} />
                    <Fact icon={Banknote} label="Monthly income" value={profile.income} />
                  </FactGrid>
                </DetailSection>
              </RevealItem>

              {/* Family details */}
              <RevealItem>
                <DetailSection id="family-heading" title="Family Details" icon={Users}>
                  <FactGrid>
                    {typeof profile.brothers === "number" ? (
                      <Fact icon={Users} label="Brothers" value={String(profile.brothers)} />
                    ) : null}
                    {typeof profile.sisters === "number" ? (
                      <Fact icon={UsersRound} label="Sisters" value={String(profile.sisters)} />
                    ) : null}
                    <Fact
                      icon={Home}
                      label="Family type"
                      value={profile.familyType === "joint" ? "Joint family" : "Nuclear family"}
                    />
                    <Fact icon={HeartHandshake} label="Children" value={children} />
                  </FactGrid>
                </DetailSection>
              </RevealItem>

              {/* Partner preferences */}
              <RevealItem>
                <DetailSection
                  id="preferences-heading"
                  title="Partner Preferences"
                  icon={HeartHandshake}
                >
                  <FactGrid>
                    <Fact
                      icon={CalendarRange}
                      label="Age range"
                      value={profile.partnerDemands.ageRange}
                    />
                    <Fact
                      icon={Ruler}
                      label="Preferred height"
                      value={profile.partnerDemands.heightRange}
                    />
                    <Fact
                      icon={GraduationCap}
                      label="Preferred education"
                      value={profile.partnerDemands.education}
                    />
                    <Fact
                      icon={HeartHandshake}
                      label="Preferred marital status"
                      value={profile.partnerDemands.maritalStatus}
                    />
                    {profile.partnerDemands.caste ? (
                      <Fact
                        icon={Tag}
                        label="Preferred caste"
                        value={profile.partnerDemands.caste}
                      />
                    ) : null}
                    <Fact
                      icon={Briefcase}
                      label="Preferred profession"
                      value={profile.partnerDemands.occupation}
                    />
                    <Fact
                      icon={MapPin}
                      label="Preferred city"
                      value={profile.partnerDemands.city}
                    />
                    {profile.partnerDemands.country ? (
                      <Fact
                        icon={Globe}
                        label="Preferred country"
                        value={profile.partnerDemands.country}
                      />
                    ) : null}
                  </FactGrid>

                  {profile.partnerDemands.notes ? (
                    <div className="mt-4 rounded-2xl bg-cream-100/60 p-3.5">
                      <p className="font-sans text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                        Additional remarks
                      </p>
                      <p className="mt-1 max-w-[65ch] font-sans text-sm leading-7 text-maroon-900/85 italic">
                        {profile.partnerDemands.notes}
                      </p>
                    </div>
                  ) : null}
                </DetailSection>
              </RevealItem>
            </RevealGroup>

            <Reveal from="up" delay={0.05}>
              <div className="mt-6 flex items-start gap-3 rounded-3xl border border-amber-300/60 bg-amber-50 p-4">
                <Info className="mt-0.5 size-4 shrink-0 text-amber-700" aria-hidden="true" />
                <p className="font-sans text-xs leading-5 text-amber-900">
                  This listing is prepared by the bureau from information supplied by the family.
                  Our team checks identity, phone and family references before sharing, but families
                  should still meet in person with a mahram before agreeing to anything.
                </p>
              </div>
            </Reveal>

            <Reveal from="scale" duration={0.8}>
              <div className="mt-8" data-print-hide>
                <Button asChild variant="whatsapp" size="lg" className="w-full sm:w-auto">
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
                    <WhatsAppIcon /> Enquire about {profile.id}
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <section className="bg-cream-100" data-print-hide>
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
          <SectionHeading
            align="start"
            eyebrow="You may also consider"
            title="Similar proposals"
            description="Selected by the office based on city, caste and preferences."
          />
          <Reveal from="up" className="mt-8">
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
          </Reveal>
        </div>
      </section>
    </>
  );
}
