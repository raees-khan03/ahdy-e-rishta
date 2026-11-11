/**
 * DUMMY DATA, replace with real data or API.
 * Round, believable figures only. The bureau confirms the real numbers.
 */
import type { Stat } from "@/schemas/content.schema";
import { base } from "@/api/mock/records";

export const dummyStats: Stat[] = [
  base("stat-1", 1, {
    value: "2009",
    label: "Started in",
    caption: "One office in Gulberg, Lahore",
  }),
  base("stat-2", 2, { value: "2,480", label: "Families spoken to", caption: "Since we opened" }),
  base("stat-3", 3, {
    value: "62",
    label: "Proposals on the desk",
    caption: "Interviewed this month",
  }),
  base("stat-4", 4, { value: "9", label: "Cities covered", caption: "Pakistan and overseas" }),
];
