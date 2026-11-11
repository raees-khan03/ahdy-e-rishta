import { z } from "zod";
import { httpRequest } from "@/api/http";
import { env } from "@/lib/env";
import { mockDelay } from "@/api/mock/delay";
import { inquiryStore, makeId } from "@/api/mock/submissions.mock";
import type { ContactInquiry } from "@/schemas/inquiry.schema";

const responseSchema = z.object({ id: z.string(), receivedAt: z.string() });

export async function submitInquiry(payload: ContactInquiry, signal?: AbortSignal) {
  if (env.useMockApi) {
    await mockDelay(520, signal);
    const record = {
      id: makeId("INQ"),
      fullName: payload.name,
      phone: payload.phone,
      city: payload.city,
      message: payload.message,
      source: payload.topic,
      createdAt: new Date().toISOString(),
    };
    inquiryStore.unshift(record);
    return { id: record.id, receivedAt: record.createdAt };
  }
  return httpRequest("/inquiries", {
    method: "POST",
    body: payload,
    schema: responseSchema,
    signal,
  });
}
