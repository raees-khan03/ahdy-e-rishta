import { z } from "zod";
import { httpRequest } from "@/api/http";
import { env } from "@/lib/env";
import { mockDelay } from "@/api/mock/delay";
import { interestSchema, type Interest } from "@/schemas/interest.schema";
import { dummyInterests } from "@/api/mock/interests.mock";
import { visible } from "@/api/mock/records";

const store: Interest[] = [...dummyInterests];

/** Admin side: this is what the office sees when a member shows interest. */
export async function getMyInterests(signal?: AbortSignal): Promise<Interest[]> {
  if (env.useMockApi) {
    await mockDelay(220, signal);
    return visible(store);
  }
  const items = await httpRequest("/me/interests", { schema: z.array(interestSchema), signal });
  return visible(items);
}

export async function expressInterest(profileId: string, note?: string): Promise<Interest> {
  if (env.useMockApi) {
    await mockDelay(320);
    const existing = store.find((item) => item.profileId === profileId);
    if (existing) return existing;
    const created: Interest = {
      id: `interest-${Date.now().toString(36)}`,
      isActive: true,
      sortOrder: store.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      profileId,
      status: "sent",
      note,
    };
    store.unshift(created);
    return created;
  }
  return httpRequest("/me/interests", {
    method: "POST",
    body: { profileId, note },
    schema: interestSchema,
  });
}
