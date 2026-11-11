import { z } from "zod";
import { serviceSchema, type ServiceContent } from "@/schemas/content.schema";
import { createListApi } from "@/api/createListApi";
import { httpRequest } from "@/api/http";
import { env } from "@/lib/env";
import { mockDelay } from "@/api/mock/delay";
import { dummyServices } from "@/api/mock/services.mock";
import { visible } from "@/api/mock/records";

export const getServices = createListApi<ServiceContent>({
  path: "/services",
  itemSchema: serviceSchema,
  getMock: () => dummyServices,
  delay: 200,
});

export async function getServiceBySlug(slug: string, signal?: AbortSignal) {
  if (env.useMockApi) {
    await mockDelay(180, signal);
    return visible(dummyServices).find((service) => service.slug === slug) ?? null;
  }
  return httpRequest(`/services/${slug}`, {
    schema: z.union([serviceSchema, z.null()]),
    signal,
  });
}
