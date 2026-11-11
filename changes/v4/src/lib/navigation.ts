export interface NavItem {
  /** i18n key for the label. */
  label: string;
  href: string;
}

/** Routes are structure, not content, so they stay in code. */
export const mainNav: NavItem[] = [
  { label: "nav.home", href: "/" },
  { label: "nav.findMatch", href: "/profiles" },
  { label: "nav.services", href: "/services" },
  { label: "nav.packages", href: "/packages" },
  { label: "nav.successStories", href: "/success-stories" },
  { label: "nav.videos", href: "/videos" },
  { label: "nav.about", href: "/about" },
  { label: "nav.branches", href: "/branches" },
  { label: "nav.contact", href: "/contact" },
];

export const supportLinks: NavItem[] = [
  { label: "footer.faq", href: "/faq" },
  { label: "footer.terms", href: "/terms" },
  { label: "footer.privacy", href: "/privacy" },
  { label: "footer.refund", href: "/refund-policy" },
  { label: "footer.safety", href: "/safety-tips" },
];

export const footerQuickLinks: NavItem[] = [
  { label: "nav.findMatch", href: "/profiles" },
  { label: "footer.howItWorks", href: "/how-it-works" },
  { label: "nav.services", href: "/services" },
  { label: "nav.packages", href: "/packages" },
  { label: "footer.team", href: "/team" },
  { label: "nav.branches", href: "/branches" },
  { label: "footer.blog", href: "/blog" },
  { label: "nav.register", href: "/register" },
  { label: "footer.shortlist", href: "/shortlist" },
];

export const accountNav: NavItem[] = [
  { label: "nav.accountOverview", href: "/account" },
  { label: "footer.shortlist", href: "/shortlist" },
];
