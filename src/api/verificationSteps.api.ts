import { stepItemSchema, type StepItem } from "@/schemas/content.schema";
import { createListApi } from "@/api/createListApi";
import { dummyVerificationSteps } from "@/api/mock/editorial.mock";

export const getVerificationSteps = createListApi<StepItem>({
  path: "/verification-steps",
  itemSchema: stepItemSchema,
  getMock: () => dummyVerificationSteps,
  delay: 150,
});
