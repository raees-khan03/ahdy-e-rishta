/**
 * DUMMY DATA, replace with real data or API.
 * Submissions are kept in memory for this preview. The real API stores them and
 * the admin panel reads them from there.
 */
import type { RegisterOutput } from "@/schemas/register.schema";

export interface InquirySubmission {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  message: string;
  source: string;
  createdAt: string;
}

export interface NewsletterSubmission {
  id: string;
  email: string;
  createdAt: string;
}

export interface RegistrationSubmissionRecord {
  id: string;
  values: RegisterOutput;
  createdAt: string;
}

export const inquiryStore: InquirySubmission[] = [];
export const newsletterStore: NewsletterSubmission[] = [];
export const registrationStore: RegistrationSubmissionRecord[] = [];

export function makeId(prefix: string): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const tail = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${stamp}${tail}`;
}
