import { z } from "zod";

/**
 * Runtime-validated environment. Every variable is optional so the app can boot
 * in a preview environment without secrets; sensible placeholders are used.
 */
const envSchema = z.object({
  VITE_API_URL: z.string().url().default("http://localhost:4000/api"),
  VITE_USE_MOCK_API: z
    .enum(["true", "false"])
    .default("true")
    .transform((value) => value === "true"),
  VITE_WHATSAPP_NUMBER: z
    .string()
    .regex(/^\d{10,15}$/, "WhatsApp number must be digits only, e.g. 923001234567")
    .default("923001234567"),
  VITE_WHATSAPP_MESSAGE: z
    .string()
    .min(1)
    .default("Assalam-o-Alaikum, I would like to know more about Ahd-e-Rishta."),
  VITE_SITE_URL: z.string().url().default("https://ahde-rishta.example.com"),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success && import.meta.env.DEV) {
  console.warn(
    "[env] Invalid environment variables, falling back to defaults.",
    parsed.error.flatten(),
  );
}

const safe = parsed.success
  ? parsed.data
  : {
      VITE_API_URL: "http://localhost:4000/api",
      VITE_USE_MOCK_API: true,
      VITE_WHATSAPP_NUMBER: "923001234567",
      VITE_WHATSAPP_MESSAGE: "Assalam-o-Alaikum, I would like to know more about Ahd-e-Rishta.",
      VITE_SITE_URL: "https://ahde-rishta.example.com",
    };

export const env = {
  apiUrl: safe.VITE_API_URL,
  useMockApi: safe.VITE_USE_MOCK_API,
  whatsappNumber: safe.VITE_WHATSAPP_NUMBER,
  whatsappMessage: safe.VITE_WHATSAPP_MESSAGE,
  siteUrl: safe.VITE_SITE_URL,
} as const;
