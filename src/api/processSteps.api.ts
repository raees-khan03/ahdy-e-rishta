import { stepItemSchema, type StepItem } from "@/schemas/content.schema";
import { createListApi } from "@/api/createListApi";
import { dummyProcessSteps } from "@/api/mock/editorial.mock";

export const getProcessSteps = createListApi<StepItem>({
  path: "/process-steps",
  itemSchema: stepItemSchema,
  getMock: () => dummyProcessSteps,
  delay: 150,
});
