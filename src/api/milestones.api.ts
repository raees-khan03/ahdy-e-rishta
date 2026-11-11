import { milestoneSchema, type Milestone } from "@/schemas/content.schema";
import { createListApi } from "@/api/createListApi";
import { dummyMilestones } from "@/api/mock/editorial.mock";

export const getMilestones = createListApi<Milestone>({
  path: "/milestones",
  itemSchema: milestoneSchema,
  getMock: () => dummyMilestones,
  delay: 150,
});
