import { statSchema, type Stat } from "@/schemas/content.schema";
import { createListApi } from "@/api/createListApi";
import { dummyStats } from "@/api/mock/stats.mock";

export const getStats = createListApi<Stat>({
  path: "/stats",
  itemSchema: statSchema,
  getMock: () => dummyStats,
  delay: 160,
});
