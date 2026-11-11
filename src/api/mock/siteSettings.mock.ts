/**
 * DUMMY DATA, replace with real data or API.
 * Site settings. The admin panel will edit this single record.
 */
import type { SiteSettings } from "@/schemas/content.schema";
import { SEED_TIME } from "@/api/mock/records";
import logoFile from "@/assets/logo.png";

export const dummySiteSettings: SiteSettings = {
  id: "site-settings",
  siteName: "Ahd-e-Rishta",
  tagline: "Trusted Rishta Service",
  taglineUrdu: "رشتوں کی بات، اعتماد کے ساتھ",
  // Bundled copy of the bureau logo. The admin can upload a new file later.
  logoUrl: logoFile,
  description:
    "A marriage bureau in Lahore that works with families. Our team speaks to every candidate and every family before a proposal is shared.",
  phones: ["+923001234567", "+924235789000"],
  phoneDisplay: "+92 300 1234567",
  whatsappNumber: "923001234567",
  whatsappMessage: "Assalam-o-Alaikum, I would like to know more about Ahd-e-Rishta.",
  email: "salam@ahde-rishta.example",
  address: "Office 2, 2nd Floor, Gulberg Business Centre, Main Boulevard, Lahore",
  city: "Lahore",
  mapsQuery: "Gulberg Business Centre, Main Boulevard, Lahore",
  workingHours: [
    "Monday to Saturday: 10:00 AM to 7:00 PM",
    "Sunday: closed, WhatsApp replies only",
    "Ramadan: 10:00 AM to 4:00 PM",
  ],
  socialLinks: [
    {
      id: "social-facebook",
      label: "Facebook",
      href: "https://facebook.com",
      icon: "facebook",
      isActive: true,
      sortOrder: 1,
    },
    {
      id: "social-instagram",
      label: "Instagram",
      href: "https://instagram.com",
      icon: "instagram",
      isActive: true,
      sortOrder: 2,
    },
    {
      id: "social-youtube",
      label: "YouTube",
      href: "https://youtube.com",
      icon: "youtube",
      isActive: true,
      sortOrder: 3,
    },
  ],
  announcement: {
    text: "Overseas families: we now reply on WhatsApp within one working day.",
    linkLabel: "Message us",
    linkHref: "/contact",
    isActive: true,
  },
  footerText:
    "Ahd-e-Rishta works with families across Pakistan and overseas. Contact details of candidates are never published on this website.",
  registrationLine: "Office timings may change on public holidays. Please call before visiting.",
  seo: {
    titleSuffix: "Ahd-e-Rishta",
    defaultTitle: "Ahd-e-Rishta | Marriage bureau in Lahore for Pakistani families",
    defaultDescription:
      "Family-first rishta service in Lahore. Our team checks every proposal before it reaches your family. Browse proposals, read guidance and register with the bureau.",
    ogImageUrl: "/og-image.jpg",
  },
  appLinks: null,
  isActive: true,
  sortOrder: 1,
  createdAt: SEED_TIME,
  updatedAt: SEED_TIME,
};
