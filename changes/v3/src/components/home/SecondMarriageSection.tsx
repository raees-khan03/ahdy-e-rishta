import { useState } from "react";
import { Link } from "react-router-dom";
import { HeartHandshake, Lock } from "lucide-react";
import { useSecondMarriageProfiles } from "@/hooks/useApiQueries";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProfileCarousel } from "@/components/profiles/ProfileCarousel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SecondMarriageSection() {
  const [tab, setTab] = useState<"divorced" | "widowed" | "all">("divorced");
  const divorced = useSecondMarriageProfiles("divorced");
  const widowed = useSecondMarriageProfiles("widowed");
  /* "all" = divored aur widowed dono, ek hi list mein. */
  const secondMarriage = useSecondMarriageProfiles("all");

  return (
    <section
      aria-labelledby="second-marriage-heading"
      className="relative overflow-hidden bg-maroon-950"
    >
      <div
        aria-hidden="true"
        className="pattern-khaki pointer-events-none absolute inset-0 opacity-[0.05]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-24 top-10 size-72 rounded-full bg-peach-400/10 blur-3xl"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <SectionHeading
              align="start"
              tone="dark"
              id="second-marriage-heading"
              eyebrow="With dignity"
              title="Second marriages, handled with care"
              description="For divorced and widowed candidates, and for families with children. These enquiries are handled privately by a senior consultant."
            />
            <ul className="mt-6 space-y-3">
              {[
                { icon: Lock, text: "Marital history is never published in detail." },
                {
                  icon: HeartHandshake,
                  text: "Introductions only to families comfortable with the situation.",
                },
              ].map((item) => (
                <li
                  key={item.text}
                  className="flex items-start gap-2.5 font-sans text-sm leading-6 text-cream-200/85"
                >
                  <item.icon className="mt-0.5 size-4 shrink-0 text-peach-300" aria-hidden="true" />
                  {item.text}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild variant="peach" size="sm">
                <Link to="/services/second-marriage">Second marriage service</Link>
              </Button>
              <Button asChild variant="secondary" size="sm">
                <Link to="/safety-tips">Safety and privacy</Link>
              </Button>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-8">
            <Tabs
              value={tab}
              onValueChange={(value) => setTab(value as "divorced" | "widowed" | "all")}
            >
              <TabsList
                aria-label="Choose a list"
                className="border-cream-200/20 bg-white/5 [&_button]:text-cream-200/80 [&_button]:hover:bg-white/10 [&_button]:hover:text-cream-50 [&_button[data-state=active]]:bg-cream-100 [&_button[data-state=active]]:text-maroon-900"
              >
                {/* Sirf naam: "Divorced", "Widowed", "Second marriage". */}
                <TabsTrigger value="divorced">Divorced</TabsTrigger>
                <TabsTrigger value="widowed">Widowed</TabsTrigger>
                <TabsTrigger value="all">Second marriage</TabsTrigger>
              </TabsList>

              <TabsContent value="divorced">
                <ProfileCarousel
                  tone="dark"
                  ariaLabel="Divorced candidates"
                  profiles={divorced.data}
                  isLoading={divorced.isLoading}
                  isError={divorced.isError}
                  onRetry={() => void divorced.refetch()}
                  viewAllHref="/profiles?maritalStatus=divorced"
                  emptyTitle="No divorced profiles published right now"
                />
              </TabsContent>
              <TabsContent value="widowed">
                <ProfileCarousel
                  tone="dark"
                  ariaLabel="Widowed candidates"
                  profiles={widowed.data}
                  isLoading={widowed.isLoading}
                  isError={widowed.isError}
                  onRetry={() => void widowed.refetch()}
                  viewAllHref="/profiles?maritalStatus=widowed"
                  emptyTitle="No widowed profiles published right now"
                />
              </TabsContent>
              <TabsContent value="all">
                <ProfileCarousel
                  tone="dark"
                  ariaLabel="Second marriage candidates"
                  profiles={secondMarriage.data}
                  isLoading={secondMarriage.isLoading}
                  isError={secondMarriage.isError}
                  onRetry={() => void secondMarriage.refetch()}
                  viewAllHref="/profiles?category=second-marriage"
                  emptyTitle="No second marriage profiles published right now"
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
