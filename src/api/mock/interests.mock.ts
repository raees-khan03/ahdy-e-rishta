/**
 * DUMMY DATA, replace with real data or API.
 * Expressions of interest sent by the signed-in member. The real service reads
 * them from the member's account.
 */
import type { Interest } from "@/schemas/interest.schema";
import { base } from "@/api/mock/records";

export const dummyInterests: Interest[] = [
  base("interest-1", 1, { profileId: "AER-1043", status: "accepted" }),
  base("interest-2", 2, { profileId: "AER-1051", status: "sent" }),
  base("interest-3", 3, { profileId: "AER-1068", status: "pending" }),
];
