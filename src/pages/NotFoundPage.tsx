import { Link } from "react-router-dom";
import { Compass, Home, Search } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

export default function NotFoundPage() {
  useSeo({
    title: "Page not found",
    description: "The page you were looking for has moved or never existed.",
    noIndex: true,
  });

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <span className="grid size-16 place-items-center rounded-full border border-khaki-300 bg-cream-100 text-maroon-700">
        <Compass className="size-7" aria-hidden="true" />
      </span>
      <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-maroon-600">
        404 · Page not found
      </p>
      <h1 className="mt-3 font-heading text-4xl font-semibold text-maroon-800 sm:text-5xl">
        This page has moved
      </h1>
      <p className="mt-4 max-w-md font-sans text-[15px] leading-7 text-muted-foreground">
        The link may be old, or the page may never have existed. Our proposals, services and contact
        details are all still here.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-2">
        <Button asChild>
          <Link to="/">
            <Home aria-hidden="true" /> Back to home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/profiles">
            <Search aria-hidden="true" /> Browse proposals
          </Link>
        </Button>
        <Button asChild variant="whatsapp">
          <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> Ask the office
          </a>
        </Button>
      </div>
      <p className="mt-8 font-sans text-sm text-muted-foreground">
        Looking for a specific profile?{" "}
        <Link to="/profiles" className="font-semibold text-maroon-800 underline underline-offset-4">
          Search by profile ID
        </Link>
        .
      </p>
    </section>
  );
}
