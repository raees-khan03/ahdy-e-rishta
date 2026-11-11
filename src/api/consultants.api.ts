import { consultantSchema, type Consultant } from "@/schemas/content.schema";
import { createListApi } from "@/api/createListApi";
import { dummyConsultants } from "@/api/mock/consultants.mock";

export const getConsultants = createListApi<Consultant>({
  path: "/consultants",
  itemSchema: consultantSchema,
  getMock: () => dummyConsultants,
  delay: 180,
});
