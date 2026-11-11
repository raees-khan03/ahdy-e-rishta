import { siteSettingsSchema, type SiteSettings } from "@/schemas/content.schema";
import { httpRequest } from "@/api/http";
import { env } from "@/lib/env";
import { mockDelay } from "@/api/mock/delay";
import { dummySiteSettings } from "@/api/mock/siteSettings.mock";

let cached: SiteSettings = dummySiteSettings;

export async function getSiteSettings(signal?: AbortSignal): Promise<SiteSettings> {
  if (env.useMockApi) {
    await mockDelay(120, signal);
    return cached;
  }
  return httpRequest("/site-settings", { schema: siteSettingsSchema, signal });
}

/** Used by the admin panel later. Keeps the mock copy in memory for this session. */
export async function updateSiteSettings(patch: Partial<SiteSettings>): Promise<SiteSettings> {
  if (env.useMockApi) {
    await mockDelay(200);
    cached = siteSettingsSchema.parse({ ...cached, ...patch, updatedAt: new Date().toISOString() });
    return cached;
  }
  return httpRequest("/site-settings", {
    method: "PATCH",
    body: patch,
    schema: siteSettingsSchema,
  });
}
