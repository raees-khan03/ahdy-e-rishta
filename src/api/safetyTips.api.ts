import { safetyTipSchema, type SafetyTip } from "@/schemas/content.schema";
import { createListApi } from "@/api/createListApi";
import { dummySafetyTips } from "@/api/mock/editorial.mock";

export const getSafetyTips = createListApi<SafetyTip>({
  path: "/safety-tips",
  itemSchema: safetyTipSchema,
  getMock: () => dummySafetyTips,
  delay: 150,
});
