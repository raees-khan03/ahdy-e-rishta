import { z } from "zod";

export const GENDERS = ["male", "female"] as const;
export const MARITAL_STATUSES = ["never-married", "divorced", "widowed", "married"] as const;
export const FAMILY_TYPES = ["nuclear", "joint"] as const;
export const RELIGIONS = ["Islam", "Christianity", "Hinduism", "Sikhism"] as const;
export const SECTS = [
  "Sunni",
  "Shia",
  "Deobandi",
  "Barelvi",
  "Ahl-e-Hadith",
  "Other",
  "Prefer not to say",
] as const;

export const genderSchema = z.enum(GENDERS);
export const maritalStatusSchema = z.enum(MARITAL_STATUSES);
export const familyTypeSchema = z.enum(FAMILY_TYPES);

export const partnerDemandsSchema = z.object({
  ageRange: z.string(),
  heightRange: z.string(),
  maritalStatus: z.string(),
  education: z.string(),
  occupation: z.string(),
  city: z.string(),
  /** Optional: office fills these only when the family has said so. */
  caste: z.string().optional(),
  country: z.string().optional(),
  notes: z.string(),
});

export type PartnerDemands = z.infer<typeof partnerDemandsSchema>;

export const profileSchema = z.object({
  id: z.string(),
  /** Admin fields shared by every CMS record. */
  isActive: z.boolean(),
  sortOrder: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string(),
  /** First name + last initial only (privacy by design). */
  displayName: z.string(),
  gender: genderSchema,
  age: z.number().int().min(18).max(80),
  /** ISO date. Used for age, never rendered raw on public pages. */
  dateOfBirth: z.string(),
  heightCm: z.number().int().min(120).max(215),
  maritalStatus: maritalStatusSchema,
  hasChildren: z.boolean(),
  religion: z.string(),
  sect: z.string(),
  caste: z.string(),
  education: z.string(),
  occupation: z.string(),
  income: z.string(),
  city: z.string(),
  country: z.string(),
  languages: z.array(z.string()),
  familyType: familyTypeSchema,
  /** Optional extras from the family's form. Hidden on the page when empty. */
  skinTone: z.string().optional(),
  brothers: z.number().int().min(0).max(20).optional(),
  sisters: z.number().int().min(0).max(20).optional(),
  about: z.string(),
  partnerDemands: partnerDemandsSchema,
  /** Photos are only published when the family has given written consent. */
  photoVisible: z.boolean(),
  photoUrl: z.string().nullable(),
  verified: z.boolean(),
  packageName: z.string().nullable(),
  featured: z.boolean(),
});

export type Profile = z.infer<typeof profileSchema>;
export type Gender = z.infer<typeof genderSchema>;
export type MaritalStatus = z.infer<typeof maritalStatusSchema>;
export type FamilyType = z.infer<typeof familyTypeSchema>;

export const PROFILE_SORTS = [
  "newest",
  "age-asc",
  "age-desc",
  "height-asc",
  "height-desc",
] as const;
export type ProfileSort = (typeof PROFILE_SORTS)[number];

export const profileSortSchema = z.enum(PROFILE_SORTS).catch("newest");

export const profileFiltersSchema = z.object({
  gender: genderSchema.optional(),
  maritalStatus: maritalStatusSchema.optional(),
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
  heightFrom: z.coerce.number().int().min(120).max(215).optional(),
  heightTo: z.coerce.number().int().min(120).max(215).optional(),
  religion: z.string().optional(),
  sect: z.string().optional(),
  caste: z.string().optional(),
  education: z.string().optional(),
  occupation: z.string().optional(),
  income: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  language: z.string().optional(),
  familyType: familyTypeSchema.optional(),
  q: z.string().trim().max(80).optional(),
  sort: profileSortSchema.optional(),
  page: z.coerce.number().int().min(1).optional(),
  view: z.enum(["grid", "list"]).optional(),
  category: z.string().optional(),
});

export type ProfileFilters = z.infer<typeof profileFiltersSchema>;

export const PROFILE_FILTER_KEYS = [
  "gender",
  "maritalStatus",
  "ageFrom",
  "ageTo",
  "heightFrom",
  "heightTo",
  "religion",
  "sect",
  "caste",
  "education",
  "occupation",
  "income",
  "city",
  "country",
  "language",
  "familyType",
  "q",
  "sort",
  "page",
  "view",
  "category",
] as const satisfies readonly (keyof ProfileFilters)[];

export function profileHref(id: string): string {
  return `/profiles/${id}`;
}

export function formatHeight(cm: number): string {
  const totalInches = Math.round(cm / 2.54);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return `${feet}' ${inches}"`;
}

export function genderLabel(gender: Gender): string {
  return gender === "male" ? "Groom" : "Bride";
}

export function maritalLabel(status: MaritalStatus): string {
  switch (status) {
    case "divorced":
      return "Divorced";
    case "widowed":
      return "Widowed";
    case "married":
      return "Married";
    default:
      return "Single";
  }
}
