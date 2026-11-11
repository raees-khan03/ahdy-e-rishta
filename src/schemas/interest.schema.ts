import { z } from "zod";
import { contentRecordSchema } from "@/schemas/content.schema";

export const INTEREST_STATUSES = ["sent", "accepted", "declined", "pending"] as const;

export const interestSchema = contentRecordSchema.extend({
  profileId: z.string(),
  status: z.enum(INTEREST_STATUSES),
  note: z.string().optional(),
});

export type Interest = z.infer<typeof interestSchema>;
export type InterestStatus = (typeof INTEREST_STATUSES)[number];
