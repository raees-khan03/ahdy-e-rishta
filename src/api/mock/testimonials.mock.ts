/** DUMMY DATA, replace with real data or API. Short quotes from families, written as placeholders. */
import type { Testimonial } from "@/schemas/content.schema";
import { base } from "@/api/mock/records";

export const dummyTestimonials: Testimonial[] = [
  base("testimonial-1", 1, {
    name: "Shazia K.",
    city: "Lahore",
    relation: "Mother of the bride",
    quote:
      "They called me back the same evening. Small thing, but it told me the office was serious.",
  }),
  base("testimonial-2", 2, {
    name: "Imran S.",
    city: "Karachi",
    relation: "Groom",
    quote: "No one pushed me to decide quickly. I met two families and chose the second.",
  }),
  base("testimonial-3", 3, {
    name: "Nadia A.",
    city: "Islamabad",
    relation: "Candidate",
    quote: "My photograph was never sent anywhere without my permission. That mattered to me.",
  }),
  base("testimonial-4", 4, {
    name: "Rashid M.",
    city: "Manchester",
    relation: "Father of the groom",
    quote:
      "Being abroad, the evening calls were the only way this could work. Hamid understood that.",
  }),
];
