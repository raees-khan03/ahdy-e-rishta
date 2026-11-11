import { trustItemSchema, type TrustItem } from "@/schemas/content.schema";
import { createListApi } from "@/api/createListApi";
import { dummyTrustItems } from "@/api/mock/trustItems.mock";

export const getTrustItems = createListApi<TrustItem>({
  path: "/trust-items",
  itemSchema: trustItemSchema,
  getMock: () => dummyTrustItems,
  delay: 120,
});
