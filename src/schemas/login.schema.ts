import { z } from "zod";

/** Accepts 0300 1234567 or +92 300 1234567 and stores +923001234567. */
export function normalizePhone(value: string): string {
  const digits = value
    .replace(/[^\d+]/g, "")
    .replace(/^\+?92/, "0")
    .replace(/^0092/, "0");
  const national = digits.startsWith("0") ? digits.slice(1) : digits;
  return `+92${national}`;
}

export function isPakistaniMobile(value: string): boolean {
  const digits = value.replace(/[\s()+-]/g, "");
  return /^(?:92|0)?3\d{9}$/.test(digits);
}

export const loginSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine(isPakistaniMobile, "Enter a valid mobile number, for example 0300 1234567"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.input<typeof loginSchema>;
export type LoginOutput = z.output<typeof loginSchema>;

export const forgotPhoneSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine(isPakistaniMobile, "Enter a valid mobile number, for example 0300 1234567"),
});

export const otpSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Enter the code we sent you")
    .regex(/^\d{6}$/, "The code is six digits"),
});

export const newPasswordSchema = z
  .object({
    password: z.string().min(8, "Use at least 8 characters"),
    confirmPassword: z.string().min(1, "Please repeat the password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Both passwords should match",
    path: ["confirmPassword"],
  });

export type NewPasswordValues = z.infer<typeof newPasswordSchema>;
