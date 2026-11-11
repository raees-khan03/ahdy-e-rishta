import { categoryGroupSchema, type CategoryGroup } from "@/schemas/content.schema";
import { createListApi } from "@/api/createListApi";
import { dummyCategories } from "@/api/mock/editorial.mock";

/** Option lists for the filters. The admin can add or retire a caste, sect or city. */
export const getCategories = createListApi<CategoryGroup>({
  path: "/categories",
  itemSchema: categoryGroupSchema,
  getMock: () => dummyCategories,
  delay: 120,
});
