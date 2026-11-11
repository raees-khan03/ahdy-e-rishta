import { useEffect } from "react";
import { env } from "@/lib/env";
import { useSiteSettings } from "@/context/SiteSettingsProvider";

interface SeoOptions {
  title: string;
  /** Omitted when the admin has not written a description yet. */
  description?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
  /** Path such as "/profiles". Used for the canonical link. */
  path?: string;
}

function upsertMeta(selector: string, attrs: Record<string, string>): void {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attrs).forEach(([key, value]) => element?.setAttribute(key, value));
}

function upsertLink(rel: string, href: string): void {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}

const JSON_LD_ID = "ahd-e-rishta-jsonld";

/** Sets document title, description, Open Graph, canonical URL and optional JSON-LD. */
export function useSeo({
  title,
  description,
  image,
  type = "website",
  jsonLd,
  noIndex = false,
  path,
}: SeoOptions): void {
  const { settings } = useSiteSettings();

  useEffect(() => {
    const siteName = settings.seo.titleSuffix || settings.siteName;
    const ogImage = image || `${env.siteUrl.replace(/\/$/, "")}${settings.seo.ogImageUrl}`;
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
    document.title = fullTitle;

    if (description) {
      upsertMeta('meta[name="description"]', { name: "description", content: description });
    }
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noIndex ? "noindex, nofollow" : "index, follow",
    });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: fullTitle });
    if (description) {
      upsertMeta('meta[property="og:description"]', {
        property: "og:description",
        content: description,
      });
    }
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: settings.siteName,
    });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: ogImage });
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: fullTitle });
    if (description) {
      upsertMeta('meta[name="twitter:description"]', {
        name: "twitter:description",
        content: description,
      });
    }

    const canonicalPath = path ?? window.location.pathname;
    const canonical = `${env.siteUrl.replace(/\/$/, "")}${canonicalPath}`;
    upsertLink("canonical", canonical);
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });

    document.getElementById(JSON_LD_ID)?.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = JSON_LD_ID;
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(JSON_LD_ID)?.remove();
    };
  }, [
    title,
    description,
    image,
    type,
    jsonLd,
    noIndex,
    path,
    settings.seo.titleSuffix,
    settings.seo.ogImageUrl,
    settings.siteName,
  ]);
}
