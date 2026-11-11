import { branchSchema, type Branch } from "@/schemas/content.schema";
import { createListApi } from "@/api/createListApi";
import { dummyBranches } from "@/api/mock/branches.mock";

export const getBranches = createListApi<Branch>({
  path: "/branches",
  itemSchema: branchSchema,
  getMock: () => dummyBranches,
  delay: 180,
});
