import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettings } from "@/api/siteSettings.api";
import { getContentBlocks, findBlock } from "@/api/contentBlocks.api";
import { configureWhatsApp } from "@/lib/whatsapp";
import type { ContentBlock, SiteSettings } from "@/schemas/content.schema";
import { dummySiteSettings } from "@/api/mock/siteSettings.mock";

interface SiteSettingsValue {
  settings: SiteSettings;
  blocks: ContentBlock[];
  isLoading: boolean;
  block: (key: string) => ContentBlock | undefined;
}

const SiteSettingsContext = createContext<SiteSettingsValue | null>(null);

/**
 * Site settings and content blocks are needed by the header, the footer, the
 * logo and almost every page, so they are loaded once here and read from context.
 * Until they arrive the bundled defaults are used, which keeps the first paint
 * stable instead of flashing empty text.
 */
export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const settingsQuery = useQuery({
    queryKey: ["site-settings"],
    queryFn: ({ signal }) => getSiteSettings(signal),
    staleTime: 5 * 60 * 1000,
  });

  const blocksQuery = useQuery({
    queryKey: ["content-blocks"],
    queryFn: ({ signal }) => getContentBlocks(signal),
    staleTime: 5 * 60 * 1000,
  });

  const settings = settingsQuery.data ?? dummySiteSettings;
  const blocks = blocksQuery.data ?? [];

  // The WhatsApp number and greeting live in settings, not in the components.
  useEffect(() => {
    configureWhatsApp({
      number: settings.whatsappNumber,
      message: settings.whatsappMessage,
    });
  }, [settings.whatsappNumber, settings.whatsappMessage]);

  const value = useMemo<SiteSettingsValue>(
    () => ({
      settings,
      blocks,
      isLoading: settingsQuery.isLoading,
      block: (key: string) => findBlock(blocks, key),
    }),
    [settings, blocks, settingsQuery.isLoading],
  );

  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings(): SiteSettingsValue {
  const value = useContext(SiteSettingsContext);
  if (!value) throw new Error("useSiteSettings must be used inside SiteSettingsProvider");
  return value;
}

/** Shorthand for a section heading. Returns undefined when the admin removed the block. */
export function useContentBlock(key: string): ContentBlock | undefined {
  const { blocks } = useSiteSettings();
  return findBlock(blocks, key);
}
