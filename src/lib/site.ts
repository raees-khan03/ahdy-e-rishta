export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  nameUrdu: string;
  tagline: string;
  taglineUrdu: string;
  description: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  address: string;
  city: string;
  mapsQuery: string;
  workingHours: string[];
  social: {
    label: string;
    href: string;
    icon: "facebook" | "instagram" | "youtube" | "linkedin";
  }[];
  nav: NavLink[];
  supportLinks: NavLink[];
  footerQuickLinks: NavLink[];
  /** Fill in to enable the mobile app section on the home page. */
  appLinks?: { playStore: string; appStore: string };
  registrationNumber: string;
}

/**
 * DUMMY DATA, replace with real data or API.
 * All contact details below are placeholders for the bureau to replace.
 */
export const siteConfig: SiteConfig = {
  name: "Ahd-e-Rishta",
  nameUrdu: "عہدِ رشتہ",
  tagline: "Trusted Rishta Service",
  taglineUrdu: "بھروسے کا رشتہ",
  description:
    "A bureau-managed matrimonial service built on family values, privacy and personal guidance. Every profile is screened by our team before it is shared.",
  phone: "+923001234567",
  phoneDisplay: "+92 300 1234567",
  email: "salam@ahde-rishta.example",
  address: "Office 2, 2nd Floor, Gulberg Business Centre, Main Boulevard, Lahore, Pakistan",
  city: "Lahore",
  mapsQuery: "Gulberg Business Centre, Main Boulevard, Lahore",
  workingHours: [
    "Monday to Saturday: 10:00 AM to 7:00 PM",
    "Sunday: Closed (WhatsApp replies only)",
    "Ramadan timings: 10:00 AM to 4:00 PM",
  ],
  social: [
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
  ],
  nav: [
    { label: "nav.home", href: "/" },
    { label: "nav.findMatch", href: "/profiles" },
    { label: "nav.services", href: "/services" },
    { label: "nav.packages", href: "/packages" },
    { label: "nav.successStories", href: "/success-stories" },
    { label: "nav.videos", href: "/videos" },
    { label: "nav.about", href: "/about" },
    { label: "nav.contact", href: "/contact" },
  ],
  supportLinks: [
    { label: "footer.faq", href: "/faq" },
    { label: "footer.terms", href: "/terms" },
    { label: "footer.privacy", href: "/privacy" },
    { label: "footer.refund", href: "/refund-policy" },
    { label: "footer.safety", href: "/safety-tips" },
  ],
  footerQuickLinks: [
    { label: "nav.findMatch", href: "/profiles" },
    { label: "footer.howItWorks", href: "/how-it-works" },
    { label: "nav.services", href: "/services" },
    { label: "nav.packages", href: "/packages" },
    { label: "footer.team", href: "/team" },
    { label: "footer.blog", href: "/blog" },
    { label: "nav.register", href: "/register" },
    { label: "footer.shortlist", href: "/shortlist" },
  ],
  // appLinks intentionally omitted: the section is skipped until the bureau supplies links.
  registrationNumber: "PLACEHOLDER-REG-0000",
};
