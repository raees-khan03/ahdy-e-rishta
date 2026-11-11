import { z } from "zod";
import { httpRequest } from "@/api/http";
import { env } from "@/lib/env";
import { mockDelay } from "@/api/mock/delay";
import { makeId, registrationStore } from "@/api/mock/submissions.mock";
import type { RegisterOutput } from "@/schemas/register.schema";

const responseSchema = z.object({ reference: z.string(), receivedAt: z.string() });

/**
 * Sends a finished registration to the bureau. The register form still opens
 * WhatsApp, so the office gets the details even if this request fails.
 */
export async function submitRegistration(values: RegisterOutput, signal?: AbortSignal) {
  if (env.useMockApi) {
    await mockDelay(600, signal);
    const reference = makeId("REG");
    registrationStore.unshift({ id: reference, values, createdAt: new Date().toISOString() });
    return { reference, receivedAt: new Date().toISOString() };
  }
  return httpRequest("/registrations", {
    method: "POST",
    body: values,
    schema: responseSchema,
    signal,
  });
}

/** Admin only: the list of received registrations. */
export async function listRegistrations(signal?: AbortSignal) {
  if (env.useMockApi) {
    await mockDelay(200, signal);
    return registrationStore;
  }
  return httpRequest("/registrations", {
    schema: z.array(
      z.object({ id: z.string(), values: z.record(z.unknown()), createdAt: z.string() }),
    ),
    signal,
  });
}
