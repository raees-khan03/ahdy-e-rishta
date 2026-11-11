import { planSchema, type Plan } from "@/schemas/content.schema";
import { createListApi } from "@/api/createListApi";
import { dummyPlans } from "@/api/mock/plans.mock";

export const getPlans = createListApi<Plan>({
  path: "/plans",
  itemSchema: planSchema,
  getMock: () => dummyPlans,
  delay: 180,
});
