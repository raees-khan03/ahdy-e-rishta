/**
 * DUMMY DATA, replace with real data or API.
 * Home page copy and decorative content. Nothing here is a verified claim.
 */
export interface TrustBadge {
  icon: "shield-check" | "lock" | "users" | "message-circle" | "badge-check" | "heart-handshake";
  title: string;
  description: string;
}

export const trustBadges: TrustBadge[] = [
  {
    icon: "shield-check",
    title: "Verified profiles",
    description: "Identity, phone and family details checked by the office.",
  },
  {
    icon: "lock",
    title: "Privacy protected",
    description: "No public phone numbers. Photos only with written consent.",
  },
  {
    icon: "users",
    title: "Family values",
    description: "Both families involved, with elders respected at every step.",
  },
  {
    icon: "message-circle",
    title: "Personal guidance",
    description: "A named consultant who answers your questions honestly.",
  },
  {
    icon: "badge-check",
    title: "Free consultation",
    description: "The first conversation with a consultant costs nothing.",
  },
];

export interface HomeService {
  slug: string;
  title: string;
  description: string;
  icon:
    | "heart-handshake"
    | "user-round-search"
    | "heart-crack"
    | "globe"
    | "messages-square"
    | "users-round";
}

export const homeServices: HomeService[] = [
  {
    slug: "rishta-matching",
    title: "Rishta matching",
    description:
      "A considered search from a screened list of proposals, matched to your family's priorities.",
    icon: "heart-handshake",
  },
  {
    slug: "personal-matchmaking",
    title: "Personal matchmaking",
    description:
      "A dedicated consultant who knows your family and follows up without you having to chase.",
    icon: "user-round-search",
  },
  {
    slug: "second-marriage",
    title: "Second marriage",
    description:
      "Private, dignified support for divorced and widowed candidates, including families with children.",
    icon: "heart-crack",
  },
  {
    slug: "overseas-proposals",
    title: "Overseas proposals",
    description:
      "Rishtas between Pakistan and the UK, North America, the Gulf, Europe and Australia.",
    icon: "globe",
  },
  {
    slug: "marriage-counselling",
    title: "Marriage counselling",
    description:
      "Practical guidance on expectations, money, in-laws and boundaries before the nikkah.",
    icon: "messages-square",
  },
  {
    slug: "face-to-face-meetings",
    title: "Face-to-face meetings",
    description:
      "Supervised family meetings at our office or a respectful third place, arranged by us.",
    icon: "users-round",
  },
];

export interface Step {
  title: string;
  description: string;
  icon: "file-text" | "search" | "users" | "heart-handshake" | "phone" | "camera";
}

export const howItWorksSteps: Step[] = [
  {
    title: "Register with the office",
    description:
      "Share your family's details through the form or WhatsApp. A consultant calls you back to understand what you are looking for.",
    icon: "file-text",
  },
  {
    title: "We prepare and verify",
    description:
      "We write a respectful profile and check identity, phone and family references before anything is shared.",
    icon: "search",
  },
  {
    title: "Curated introductions",
    description:
      "Your consultant shortlists proposals that genuinely fit and explains why, instead of sending an endless list.",
    icon: "users",
  },
  {
    title: "Family meeting",
    description:
      "With both families' consent we arrange a meeting at the office or a suitable venue, with a consultant nearby.",
    icon: "heart-handshake",
  },
];

export const verificationSteps: Step[] = [
  {
    title: "Identity check",
    description: "National identity details are reviewed by the office and never published.",
    icon: "file-text",
  },
  {
    title: "Phone verification",
    description: "We call the number on record and confirm the family connection.",
    icon: "phone",
  },
  {
    title: "Family details check",
    description: "A local reference confirms the household details in the profile.",
    icon: "users",
  },
  {
    title: "Photo consent",
    description: "A photo appears only with written consent from the candidate or guardian.",
    icon: "camera",
  },
];

export interface SafetyTip {
  title: string;
  description: string;
}

export const safetyTips: SafetyTip[] = [
  {
    title: "Never send money to a stranger",
    description:
      "Our office only accepts payment against a written receipt. Refuse any request for cash, mobile top-ups or transfers to a personal account.",
  },
  {
    title: "Insist on a family meeting",
    description:
      "A genuine proposal is always willing to meet with a mahram and both families present. Excuses about travel or documents are a warning sign.",
  },
  {
    title: "Verify through the office",
    description:
      "Contact the bureau's official number before acting on any message. Ask for the profile ID and confirm it exists.",
  },
  {
    title: "Do not share documents early",
    description:
      "CNIC copies, bank details and passport scans should only be shared once both families have met and agreed to proceed.",
  },
  {
    title: "Be careful with photos",
    description:
      "We never request private photographs. If someone does, stop the conversation and report it to the office immediately.",
  },
  {
    title: "Talk to your elders",
    description:
      "Involve your parents or a trusted elder before any commitment. Secrecy is the tool fraudsters rely on most.",
  },
];

export const cityTiles = [
  { label: "Lahore", href: "/profiles?city=Lahore", count: "Profiles from the Lahore office" },
  { label: "Karachi", href: "/profiles?city=Karachi", count: "Sindh region proposals" },
  { label: "Islamabad", href: "/profiles?city=Islamabad", count: "Federal capital families" },
  { label: "Faisalabad", href: "/profiles?city=Faisalabad", count: "Central Punjab" },
  { label: "Multan", href: "/profiles?city=Multan", count: "South Punjab" },
  { label: "Peshawar", href: "/profiles?city=Peshawar", count: "Khyber Pakhtunkhwa" },
  { label: "Overseas", href: "/profiles?country=United%20Kingdom", count: "UK, USA, Canada, Gulf" },
];

export const founderMessage = {
  quote:
    "A rishta is not a transaction. It is an amanat, something placed in your care. We try to remember that in every phone call.",
  body: [
    "Ahd-e-Rishta began because too many families were being pushed through apps and anonymous directories with no one to ask. Parents were sharing photographs with strangers and hoping for the best.",
    "We built a small, bureau-led service instead. Every family speaks to a named consultant. Every detail is checked before it is shared. Every profile can be removed the day you ask for it.",
    "If we think a proposal is not right for you, we will say so, politely and plainly. That is the whole of our promise.",
  ],
  name: "Muhammad Faheem Iqbal",
  role: "Founder & Director",
  yearsLabel: "",
};

export const milestones = [
  {
    year: "2009",
    title: "The first office",
    description: "A single room in Lahore, and six families in the first year.",
  },
  {
    year: "2014",
    title: "Karachi desk",
    description: "A second consultant covering Sindh and Balochistan enquiries.",
  },
  {
    year: "2018",
    title: "Overseas desk",
    description: "Dedicated coordination for families in the UK and the Gulf.",
  },
  {
    year: "2022",
    title: "Second-marriage programme",
    description: "A private pathway for divorced and widowed candidates.",
  },
  {
    year: "2026",
    title: "Verification standard",
    description: "Four-step checks applied to every profile before sharing.",
  },
];

export const statsBand = [
  { value: "4-step", label: "Verification", caption: "Identity, phone, family, consent" },
  { value: "6", label: "Services", caption: "One bureau, one process" },
  { value: "1:1", label: "Consultants", caption: "You always speak to the same person" },
  { value: "0", label: "Public numbers", caption: "Contact only through the office" },
];
