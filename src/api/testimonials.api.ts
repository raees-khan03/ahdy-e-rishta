import { testimonialSchema, type Testimonial } from "@/schemas/content.schema";
import { createListApi } from "@/api/createListApi";
import { dummyTestimonials } from "@/api/mock/testimonials.mock";

export const getTestimonials = createListApi<Testimonial>({
  path: "/testimonials",
  itemSchema: testimonialSchema,
  getMock: () => dummyTestimonials,
  delay: 180,
});
