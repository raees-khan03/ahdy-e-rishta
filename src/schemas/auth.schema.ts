import { z } from "zod";

export const ROLES = ["user", "admin"] as const;
export type Role = (typeof ROLES)[number];

export const authUserSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  phone: z.string(),
  role: z.enum(ROLES),
  city: z.string(),
  memberSince: z.string(),
});

export type AuthUser = z.infer<typeof authUserSchema>;

export const loginResponseSchema = z.object({
  /** The real API sets an httpOnly cookie. The mock returns a token string. */
  token: z.string(),
  user: authUserSchema,
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const passwordChangeResponseSchema = z.object({ ok: z.boolean() });
