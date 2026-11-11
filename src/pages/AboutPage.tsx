import { Reveal } from "@/components/layout/Reveal";
import { Link } from "react-router-dom";
import { Lock, ShieldCheck, Users } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { useDirectorMessage, useMilestones } from "@/hooks/useApiQueries";
import { useSiteSettings } from "@/context/SiteSettingsProvider";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CtaSection } from "@/components/home/CtaSection";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const values = [
  {
    title: "Honesty before optimism",
    description:
      "If a proposal is wrong for your family, we say so. A polite no saves months of confusion.",
    icon: ShieldCheck,
  },
  {
    title: "Privacy as the default",
    description:
      "Photographs and phone numbers stay with the office. Nothing goes out without permission.",
    icon: Lock,
  },
  {
    title: "Families decide",
    description:
      "We guide and we arrange. The decision belongs to the family and the candidate, never to us.",
    icon: Users,
  },
];

export default function AboutPage() {
  const { settings, block } = useSiteSettings();
  const heading = block("page.about");
  const { data: director } = useDirectorMessage();
  const { data: milestones, isLoading } = useMilestones();

  useSeo({
    title: heading?.title ?? "About the bureau",
    description:
      "Ahd-e-Rishta is a marriage bureau in Lahore that works with families. Read how the office started and how it works today.",
    path: "/about",
  });

  return (
    <>
      <PageHero
        eyebrow={heading?.eyebrow}
        title={heading?.title ?? "About us"}
        description={heading?.subtitle}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
      >
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/register">Register a proposal</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/team">Meet the team</Link>
          </Button>
        </div>
      </PageHero>

      <Reveal from="up">
        <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading align="start" eyebrow="Our story" title="Why the bureau began" />
              <div className="mt-4 space-y-4">
                {director?.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 20)}
                    className="max-w-[65ch] font-sans text-base leading-7 text-maroon-900/85"
                  >
                    {paragraph}
                  </p>
                ))}
                <p className="max-w-[65ch] font-sans text-base leading-7 text-maroon-900/85">
                  Our work is small on purpose. A limited number of active families means your
                  consultant remembers your details, your preferences and your last conversation.
                </p>
              </div>
            </div>

            {director ? (
              <div className="lg:col-span-5">
                <img
                  src={director.photoUrl}
                  alt={`${director.name}, ${director.role}`}
                  width={480}
                  height={560}
                  loading="lazy"
                  decoding="async"
                  className="aspect-4/5 w-full rounded-3xl object-cover"
                />
                <p className="mt-3 font-script text-3xl text-maroon-800">{director.name}</p>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-maroon-700">
                  {director.role}
                </p>
                {director.signOff ? (
                  <p className="mt-1 font-sans text-xs text-muted-foreground">{director.signOff}</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>

        <section className="bg-cream-100">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
            <SectionHeading
              align="start"
              eyebrow="How we work"
              title="Three rules the office follows"
            />
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {values.map((value) => (
                <li key={value.title} className="rounded-3xl border border-border bg-white p-5">
                  <span className="grid size-11 place-items-center rounded-2xl bg-cream-100 text-maroon-700">
                    <value.icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 font-heading text-lg font-semibold text-maroon-900">
                    {value.title}
                  </h3>
                  <p className="mt-1 font-sans text-sm leading-6 text-muted-foreground">
                    {value.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <SectionHeading align="start" eyebrow="Timeline" title="How the office grew" />
          {isLoading ? (
            <Skeleton className="mt-6 h-40 w-full rounded-3xl" />
          ) : (
            <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(milestones ?? []).map((milestone) => (
                <li key={milestone.id} className="rounded-2xl border border-border bg-white p-5">
                  <p className="font-heading text-2xl font-semibold text-maroon-700">
                    {milestone.year}
                  </p>
                  <h3 className="mt-1 font-heading text-base font-semibold text-maroon-900">
                    {milestone.title}
                  </h3>
                  <p className="mt-1 font-sans text-sm leading-6 text-muted-foreground">
                    {milestone.description}
                  </p>
                </li>
              ))}
            </ol>
          )}

          <p className="mt-6 max-w-[70ch] rounded-2xl bg-cream-100 p-4 font-sans text-xs leading-6 text-muted-foreground">
            Office address: {settings.address}. {settings.registrationLine}
          </p>
        </section>

        <CtaSection />
      </Reveal>
    </>
  );
}
