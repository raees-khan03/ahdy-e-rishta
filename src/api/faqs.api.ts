import { faqItemSchema, type FaqItem } from "@/schemas/content.schema";
import { createListApi } from "@/api/createListApi";
import { dummyFaqs } from "@/api/mock/faqs.mock";

export const getFaqs = createListApi<FaqItem>({
  path: "/faqs",
  itemSchema: faqItemSchema,
  getMock: () => dummyFaqs,
  delay: 160,
});
