import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { howItWorksSteps } from "@/lib/homeContent";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";
import { DynamicIcon } from "@/components/common/DynamicIcon";
import { Button } from "@/components/ui/button";

export function HowItWorksSection() {
  return (
    <section aria-labelledby="how-it-works-heading" className="bg-cream-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <SectionHeading
          id="how-it-works-heading"
          eyebrow="How it works"
          title="Four calm steps, no pressure"
          description="You never have to chase us. The office calls you, explains the next step, and waits for your family to decide."
        />

        <ScrollReveal stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((step, index) => (
            <RevealItem key={step.title} className="relative">
              <div className="flex h-full flex-col gap-3 rounded-3xl border border-border bg-white p-6 shadow-sm shadow-maroon-900/5">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-maroon-800 text-cream-50">
                    <DynamicIcon name={step.icon} className="size-5" />
                  </span>
                  <span className="font-heading text-4xl font-semibold text-peach-300 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-maroon-900">{step.title}</h3>
                <p className="font-sans text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </ScrollReveal>

        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline">
            <Link to="/how-it-works">
              See the full process
              <ArrowRight aria-hidden="true" className="rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
