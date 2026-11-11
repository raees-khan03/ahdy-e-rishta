import { successStorySchema, type SuccessStory } from "@/schemas/content.schema";
import { createListApi } from "@/api/createListApi";
import { dummySuccessStories } from "@/api/mock/successStories.mock";

export const getSuccessStories = createListApi<SuccessStory>({
  path: "/success-stories",
  itemSchema: successStorySchema,
  getMock: () => dummySuccessStories,
  delay: 220,
});
