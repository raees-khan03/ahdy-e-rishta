import { z } from "zod";

/** Quick filter used in the home page "Find your perfect match" card. */
export const matchFilterSchema = z
  .object({
    gender: z.string().optional(),
    caste: z.string().optional(),
    maritalStatus: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    religion: z.string().optional(),
    sect: z.string().optional(),
    education: z.string().optional(),
    ageFrom: z.coerce
      .number()
      .int()
      .min(18, "Minimum age is 18")
      .max(70, "Maximum age is 70")
      .optional(),
    ageTo: z.coerce
      .number()
      .int()
      .min(18, "Minimum age is 18")
      .max(70, "Maximum age is 70")
      .optional(),
    q: z.string().trim().max(80).optional(),
  })
  .refine((values) => !values.ageFrom || !values.ageTo || values.ageFrom <= values.ageTo, {
    message: "Minimum age must be less than maximum age",
    path: ["ageTo"],
  });

export type MatchFilterValues = z.infer<typeof matchFilterSchema>;

/** Builds a /profiles query string, dropping empty values. */
export function buildProfilesQuery(
  values: Record<string, string | number | undefined | null>,
): string {
  const params = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    const stringValue = String(value).trim();
    if (!stringValue) return;
    params.set(key, stringValue);
  });
  const query = params.toString();
  return query ? `/profiles?${query}` : "/profiles";
}
