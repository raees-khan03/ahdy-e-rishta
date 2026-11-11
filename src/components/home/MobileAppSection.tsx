import { QrCode, Smartphone } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/common/SectionHeading";

/**
 * Rendered only when the bureau supplies store links in siteConfig.appLinks.
 * Hidden by default so we never advertise an app that does not exist.
 */
export function MobileAppSection() {
  if (!siteConfig.appLinks) return null;

  return (
    <section aria-labelledby="app-heading" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
      <div className="grid gap-8 rounded-[2rem] border border-border bg-white p-6 shadow-sm shadow-maroon-900/5 sm:p-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            align="start"
            id="app-heading"
            eyebrow="Mobile app"
            title="Keep your shortlist in your pocket"
            description="Browse verified proposals, save favourites and message the office from the app."
          />
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild>
              <a href={siteConfig.appLinks.playStore} target="_blank" rel="noopener noreferrer">
                <Smartphone aria-hidden="true" /> Google Play
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={siteConfig.appLinks.appStore} target="_blank" rel="noopener noreferrer">
                <Smartphone aria-hidden="true" /> App Store
              </a>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 rounded-3xl bg-cream-100 p-6">
          <span className="grid size-24 place-items-center rounded-2xl bg-white text-maroon-800 shadow-sm">
            <QrCode className="size-12" aria-hidden="true" />
          </span>
          <p className="max-w-44 font-sans text-sm leading-6 text-maroon-900/75">
            Replace this placeholder with the live QR code supplied by the bureau.
          </p>
        </div>
      </div>
    </section>
  );
}
