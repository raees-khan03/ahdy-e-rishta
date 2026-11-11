import { z } from "zod";
import { httpRequest } from "@/api/http";
import { env } from "@/lib/env";
import { mockDelay } from "@/api/mock/delay";
import { makeId, newsletterStore } from "@/api/mock/submissions.mock";

const responseSchema = z.object({ id: z.string() });

/** Adds an address to the newsletter list the admin will manage. */
export async function subscribeToNewsletter(email: string, signal?: AbortSignal) {
  if (env.useMockApi) {
    await mockDelay(420, signal);
    const id = makeId("SUB");
    newsletterStore.unshift({ id, email, createdAt: new Date().toISOString() });
    return { id };
  }
  return httpRequest("/newsletter-subscribers", {
    method: "POST",
    body: { email },
    schema: responseSchema,
    signal,
  });
}
