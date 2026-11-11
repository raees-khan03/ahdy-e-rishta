import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(48).default(12),
});

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export const paginatedSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    items: z.array(item),
    page: z.number().int(),
    pageSize: z.number().int(),
    total: z.number().int(),
    totalPages: z.number().int(),
  });

/** Pakistani mobile: 03XXXXXXXXX or +923XXXXXXXXX (also accepts 0092 / spaces / dashes). */
export const pakistaniPhoneSchema = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .transform((value) => value.replace(/[\s()-]/g, ""))
  .refine((value) => /^(?:\+92|0092|92|0)3\d{9}$/.test(value), {
    message: "Enter a valid Pakistani mobile number, e.g. 0300 1234567",
  });

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email address")
  .max(120, "Email is too long");

export const shortText = (label: string, min = 1, max = 120) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} must be under ${max} characters`)
    .refine((value) => value.length >= min, {
      message: `${label} must be at least ${min} characters`,
    });

/** Honeypot field: must stay empty (bots fill it). */
export const honeypotSchema = z.string().max(0, "Spam detected").optional().or(z.literal(""));
