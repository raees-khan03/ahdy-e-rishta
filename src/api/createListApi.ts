import { z } from "zod";
import { httpRequest } from "@/api/http";
import { env } from "@/lib/env";
import { mockDelay } from "@/api/mock/delay";
import { visible } from "@/api/mock/records";

interface ListApiConfig<T extends { isActive: boolean; sortOrder: number }> {
  /** Endpoint the real API will serve, for example "/faqs". */
  path: string;
  itemSchema: z.ZodType<T>;
  getMock: () => T[];
  delay?: number;
}

/**
 * One factory for every read-only collection: mock data now, the same JSON
 * shape from the API later. Inactive items are filtered out on both paths.
 */
export function createListApi<T extends { isActive: boolean; sortOrder: number }>({
  path,
  itemSchema,
  getMock,
  delay = 220,
}: ListApiConfig<T>) {
  return async function list(signal?: AbortSignal): Promise<T[]> {
    if (env.useMockApi) {
      await mockDelay(delay, signal);
      return visible(getMock());
    }
    const items = await httpRequest(path, { schema: z.array(itemSchema), signal });
    return visible(items);
  };
}
