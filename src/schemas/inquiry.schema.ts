import { z } from "zod";
import {
  honeypotSchema,
  emailSchema,
  pakistaniPhoneSchema,
  shortText,
} from "@/schemas/common.schema";

export const CONTACT_TOPICS = [
  "General enquiry",
  "Profile registration",
  "Membership plans",
  "Second marriage",
  "Overseas proposals",
  "Report a suspicious profile",
] as const;

export const contactInquirySchema = z.object({
  name: shortText("Full name", 2, 80),
  phone: pakistaniPhoneSchema,
  city: shortText("City", 2, 60),
  topic: z.enum(CONTACT_TOPICS, { errorMap: () => ({ message: "Please choose a topic" }) }),
  message: shortText("Message", 10, 1200),
  /** Honeypot: hidden from humans, must stay empty. */
  company: honeypotSchema,
});

export type ContactInquiry = z.infer<typeof contactInquirySchema>;

export const newsletterSubscriptionSchema = z.object({
  email: emailSchema,
  company: honeypotSchema,
});

export type NewsletterSubscription = z.infer<typeof newsletterSubscriptionSchema>;
