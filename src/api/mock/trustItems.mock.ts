/** DUMMY DATA, replace with real data or API. Short trust points for the strip under the hero. */
import type { TrustItem } from "@/schemas/content.schema";
import { base } from "@/api/mock/records";

export const dummyTrustItems: TrustItem[] = [
  base("trust-1", 1, {
    title: "Office in Lahore",
    description: "You can visit us, sit down and see the file.",
    icon: "badge-check",
  }),
  base("trust-2", 2, {
    title: "Every profile checked",
    description: "Identity, phone and family details are confirmed.",
    icon: "shield",
  }),
  base("trust-3", 3, {
    title: "Numbers stay private",
    description: "No phone number or address is posted online.",
    icon: "eye-off",
  }),
  base("trust-4", 4, {
    title: "One consultant",
    description: "The same person answers your calls.",
    icon: "phone",
  }),
  base("trust-5", 5, {
    title: "Families involved",
    description: "Parents and walidain are part of the process.",
    icon: "users",
  }),
  base("trust-6", 6, {
    title: "Photos with consent",
    description: "A picture goes out only if the family allows it.",
    icon: "hand-heart",
  }),
];
