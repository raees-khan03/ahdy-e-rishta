import { z } from "zod";
import { httpRequest } from "@/api/http";
import { env } from "@/lib/env";
import { mockDelay } from "@/api/mock/delay";
import { directorMessageSchema, type DirectorMessage } from "@/schemas/content.schema";
import { dummyDirectorMessage } from "@/api/mock/director.mock";

export async function getDirectorMessage(signal?: AbortSignal): Promise<DirectorMessage | null> {
  if (env.useMockApi) {
    await mockDelay(150, signal);
    return dummyDirectorMessage.isActive ? dummyDirectorMessage : null;
  }
  return httpRequest("/director-message", {
    schema: z.union([directorMessageSchema, z.null()]),
    signal,
  });
}
