import { z } from "zod";
import { httpRequest } from "@/api/http";
import { env } from "@/lib/env";
import { mockDelay } from "@/api/mock/delay";
import { legalPageSchema } from "@/schemas/content.schema";
import { dummyLegalPages } from "@/api/mock/editorial.mock";

export type LegalSlug = "terms" | "privacy" | "refund";

export async function getLegalPage(slug: LegalSlug, signal?: AbortSignal) {
  if (env.useMockApi) {
    await mockDelay(140, signal);
    return dummyLegalPages.find((page) => page.slug === slug && page.isActive) ?? null;
  }
  return httpRequest(`/legal-pages/${slug}`, {
    schema: z.union([legalPageSchema, z.null()]),
    signal,
  });
}
