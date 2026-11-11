import { z } from "zod";

/**
 * Every collection item in the CMS shares these four admin fields.
 * The admin panel will edit isActive and sortOrder; createdAt/updatedAt are server managed.
 */
export const contentRecordSchema = z.object({
  id: z.string(),
  isActive: z.boolean(),
  sortOrder: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ContentRecord = z.infer<typeof contentRecordSchema>;

/* ---------------- Site settings (single record) ---------------- */

export const socialLinkSchema = z.object({
  id: z.string(),
  label: z.string(),
  href: z.string(),
  icon: z.enum(["facebook", "instagram", "youtube", "tiktok", "linkedin"]),
  isActive: z.boolean(),
  sortOrder: z.number().int(),
});

export const announcementSchema = z.object({
  text: z.string(),
  linkLabel: z.string().optional(),
  linkHref: z.string().optional(),
  isActive: z.boolean(),
});

export const seoDefaultsSchema = z.object({
  titleSuffix: z.string(),
  defaultTitle: z.string(),
  defaultDescription: z.string(),
  ogImageUrl: z.string(),
});

export const siteSettingsSchema = z.object({
  id: z.string(),
  siteName: z.string(),
  tagline: z.string(),
  taglineUrdu: z.string(),
  /** Logo file the admin uploads. Empty string means only the site name is shown. */
  logoUrl: z.string(),
  description: z.string(),
  phones: z.array(z.string()).min(1),
  phoneDisplay: z.string(),
  whatsappNumber: z.string(),
  whatsappMessage: z.string(),
  email: z.string(),
  address: z.string(),
  city: z.string(),
  mapsQuery: z.string(),
  workingHours: z.array(z.string()),
  socialLinks: z.array(socialLinkSchema),
  announcement: announcementSchema,
  footerText: z.string(),
  registrationLine: z.string(),
  seo: seoDefaultsSchema,
  appLinks: z.object({ playStore: z.string(), appStore: z.string() }).nullable(),
  isActive: z.boolean(),
  sortOrder: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SiteSettings = z.infer<typeof siteSettingsSchema>;

/* ---------------- Content blocks (section headings and intros) ---------------- */

export const contentBlockSchema = contentRecordSchema.extend({
  /** Stable key used by the page, for example "home.featured". */
  key: z.string(),
  eyebrow: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  body: z.string().optional(),
  /** Short bullet list shown beside a form or panel when the design calls for one. */
  items: z
    .array(
      z.object({
        title: z.string(),
        text: z.string(),
      }),
    )
    .optional(),
});

export type ContentBlock = z.infer<typeof contentBlockSchema>;

/* ---------------- Hero slides ---------------- */

export const heroSlideSchema = contentRecordSchema.extend({
  image: z.string(),
  alt: z.string(),
  heading: z.string().optional(),
  subheading: z.string().optional(),
});

export type HeroSlide = z.infer<typeof heroSlideSchema>;

/* ---------------- Stats ---------------- */

export const statSchema = contentRecordSchema.extend({
  value: z.string(),
  label: z.string(),
  caption: z.string().optional(),
});

export type Stat = z.infer<typeof statSchema>;

/* ---------------- Trust strip ---------------- */

export const trustItemSchema = contentRecordSchema.extend({
  title: z.string(),
  description: z.string(),
  icon: z.enum(["shield", "eye-off", "users", "phone", "badge-check", "hand-heart"]),
});

export type TrustItem = z.infer<typeof trustItemSchema>;

/* ---------------- Cities ---------------- */

export const citySchema = contentRecordSchema.extend({
  name: z.string(),
  slug: z.string(),
  province: z.string(),
  profileCount: z.number().int(),
  imageUrl: z.string().optional(),
});

export type CityContent = z.infer<typeof citySchema>;

/* ---------------- Plans ---------------- */

export const planSchema = contentRecordSchema.extend({
  name: z.string(),
  price: z.number(),
  currency: z.string(),
  duration: z.string(),
  shortDescription: z.string(),
  features: z.array(z.string()),
  badge: z.string().optional(),
  highlighted: z.boolean(),
  ctaLabel: z.string(),
  whatsappMessage: z.string(),
  /** Features the comparison table shows as columns. */
  comparisonFeatures: z.array(z.object({ label: z.string(), included: z.boolean() })),
});

export type Plan = z.infer<typeof planSchema>;

/* ---------------- Branches ---------------- */

export const branchSchema = contentRecordSchema.extend({
  name: z.string(),
  city: z.string(),
  /** Full street address as the office writes it. */
  address: z.string(),
  /** Digits only with country code, used for wa.me links, e.g. 923001234567. */
  whatsapp: z.string(),
  /** Same number in the office's own style, e.g. 042 3571 2345. */
  phoneDisplay: z.string(),
  email: z.string().optional(),
  /** Landline style number for the tel: link, digits only. */
  phone: z.string().optional(),
  hours: z.array(z.string()),
  /** Google Maps search text, opened in a new tab. */
  mapsQuery: z.string().optional(),
  /** Main office gets a badge. */
  isMain: z.boolean(),
});

export type Branch = z.infer<typeof branchSchema>;

/* ---------------- Consultants ---------------- */

export const consultantSchema = contentRecordSchema.extend({
  name: z.string(),
  role: z.string(),
  experience: z.string(),
  languages: z.array(z.string()),
  cities: z.array(z.string()),
  bio: z.string(),
  photoUrl: z.string(),
  focus: z.array(z.string()),
  /** Direct line for this consultant, digits only with country code, e.g. 923001234567. */
  whatsapp: z.string(),
  /** Same number in the form the office writes it, e.g. 0300 1234567. */
  phoneDisplay: z.string(),
});

export type Consultant = z.infer<typeof consultantSchema>;

/* ---------------- Director message ---------------- */

export const directorMessageSchema = contentRecordSchema.extend({
  name: z.string(),
  role: z.string(),
  photoUrl: z.string(),
  quote: z.string(),
  paragraphs: z.array(z.string()),
  signOff: z.string(),
});

export type DirectorMessage = z.infer<typeof directorMessageSchema>;

/* ---------------- Success stories ---------------- */

export const successStorySchema = contentRecordSchema.extend({
  coupleLabel: z.string(),
  city: z.string(),
  year: z.number().int(),
  quote: z.string(),
  story: z.string(),
  serviceUsed: z.string(),
  imageUrl: z.string(),
  /** Sample stories are labelled on the site until a family approves their own words. */
  isSample: z.boolean(),
});

export type SuccessStory = z.infer<typeof successStorySchema>;

/* ---------------- Testimonials ---------------- */

export const testimonialSchema = contentRecordSchema.extend({
  name: z.string(),
  city: z.string(),
  relation: z.string(),
  quote: z.string(),
});

export type Testimonial = z.infer<typeof testimonialSchema>;

/* ---------------- Videos ---------------- */

export const VIDEO_CATEGORIES = ["nikah", "guidance", "families"] as const;

export const videoItemSchema = contentRecordSchema.extend({
  title: z.string(),
  description: z.string(),
  youtubeId: z.string(),
  /** Optional poster image. Falls back to the YouTube thumbnail. */
  thumbnailUrl: z.string().optional(),
  category: z.enum(VIDEO_CATEGORIES),
  durationLabel: z.string(),
  publishedAt: z.string(),
});

export type VideoItem = z.infer<typeof videoItemSchema>;
export type VideoCategory = (typeof VIDEO_CATEGORIES)[number];

/* ---------------- FAQ ---------------- */

export const FAQ_CATEGORIES = ["general", "profiles", "packages", "privacy", "process"] as const;

export const faqItemSchema = contentRecordSchema.extend({
  category: z.enum(FAQ_CATEGORIES),
  question: z.string(),
  answer: z.string(),
});

export type FaqItem = z.infer<typeof faqItemSchema>;
export type FaqCategory = (typeof FAQ_CATEGORIES)[number];

/* ---------------- Blog ---------------- */

export const blogPostSchema = contentRecordSchema.extend({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  body: z.array(z.object({ heading: z.string(), paragraphs: z.array(z.string()) })),
  category: z.enum(["guidance", "families", "process", "safety"]),
  author: z.string(),
  publishedAt: z.string(),
  readingMinutes: z.number().int(),
  imageUrl: z.string(),
  relatedIds: z.array(z.string()),
});

export type BlogPost = z.infer<typeof blogPostSchema>;

/* ---------------- Services ---------------- */

export const SERVICE_ICONS = [
  "heart-handshake",
  "user-round-search",
  "heart-crack",
  "globe",
  "messages-square",
  "users-round",
] as const;

export const serviceSchema = contentRecordSchema.extend({
  slug: z.string(),
  title: z.string(),
  shortDescription: z.string(),
  intro: z.string(),
  icon: z.enum(SERVICE_ICONS),
  imageUrl: z.string(),
  benefits: z.array(z.string()),
  process: z.array(z.object({ title: z.string(), description: z.string() })),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
  suitedFor: z.array(z.string()),
});

export type ServiceContent = z.infer<typeof serviceSchema>;

/* ---------------- Process and verification steps ---------------- */

export const STEP_ICONS = [
  "file-text",
  "search",
  "users",
  "heart-handshake",
  "phone",
  "camera",
] as const;

export const stepItemSchema = contentRecordSchema.extend({
  title: z.string(),
  description: z.string(),
  icon: z.enum(STEP_ICONS),
  /** Optional timing label shown beside the step, e.g. "1-2 working days". */
  note: z.string().optional(),
});

export type StepItem = z.infer<typeof stepItemSchema>;

/* ---------------- Safety tips ---------------- */

export const SAFETY_TIP_KINDS = ["tip", "redFlag", "neverAsk", "reportStep"] as const;

export const safetyTipSchema = contentRecordSchema.extend({
  title: z.string(),
  description: z.string(),
  kind: z.enum(SAFETY_TIP_KINDS),
});

export type SafetyTip = z.infer<typeof safetyTipSchema>;

/* ---------------- Milestones (about page) ---------------- */

export const milestoneSchema = contentRecordSchema.extend({
  year: z.string(),
  title: z.string(),
  description: z.string(),
});

export type Milestone = z.infer<typeof milestoneSchema>;

/* ---------------- Legal pages ---------------- */

export const legalSectionSchema = z.object({
  heading: z.string(),
  paragraphs: z.array(z.string()),
});

export const legalPageSchema = contentRecordSchema.extend({
  slug: z.enum(["terms", "privacy", "refund"]),
  title: z.string(),
  intro: z.string(),
  lastReviewed: z.string(),
  sections: z.array(legalSectionSchema),
});

export type LegalPage = z.infer<typeof legalPageSchema>;

/* ---------------- Filter categories ---------------- */

export const categoryGroupSchema = contentRecordSchema.extend({
  key: z.string(),
  label: z.string(),
  options: z.array(z.string()),
});

export type CategoryGroup = z.infer<typeof categoryGroupSchema>;
