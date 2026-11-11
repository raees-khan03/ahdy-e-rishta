/**
 * DUMMY DATA, replace with real data or API.
 * Package prices are placeholders. The office confirms the current fee in writing.
 *
 * Five tiers: Basic, Silver, Gold (most popular), Premium (exclusive) and Elite (VIP).
 * The comparison rows use the same labels for every plan so the packages page can
 * line them up in one table.
 */
import type { Plan } from "@/schemas/content.schema";
import { base } from "@/api/mock/records";

type Row =
  | "online"
  | "physical"
  | "meetups"
  | "video"
  | "social"
  | "featured"
  | "activation"
  | "priority"
  | "management";

/** Row labels, in the order the comparison table shows them. */
const rows: { key: Row; label: string }[] = [
  { key: "online", label: "Online match making" },
  { key: "physical", label: "Physical match making" },
  { key: "meetups", label: "Physical meetups" },
  { key: "video", label: "Video introduction" },
  { key: "social", label: "Social media promotion" },
  { key: "featured", label: "Featured on top of the website" },
  { key: "activation", label: "File activation" },
  { key: "priority", label: "Priority in meetups" },
  { key: "management", label: "Direct contact with management" },
];

const compare = (included: Row[]) =>
  rows.map((row) => ({ label: row.label, included: included.includes(row.key) }));

export const dummyPlans: Plan[] = [
  base("plan-basic", 1, {
    name: "Basic",
    price: 2000,
    currency: "PKR",
    duration: "2 months",
    shortDescription: "For families who want to start online and keep the first step light.",
    features: [
      "Just online dealing",
      "Simple graphic",
      "Social media promotion",
      "Two months file activation",
      "30 connections",
    ],
    highlighted: false,
    ctaLabel: "Ask about Basic",
    whatsappMessage: "I would like details about the Basic package.",
    comparisonFeatures: compare(["online", "social", "activation"]),
  }),
  base("plan-silver", 2, {
    name: "Silver",
    price: 5000,
    currency: "PKR",
    duration: "4 months",
    shortDescription: "Online and in person match making, with a weekly list of new proposals.",
    features: [
      "Online match making",
      "Physical match making",
      "Weekly new proposals lists",
      "Simple graphic",
      "Simple video",
      "Social media promotion",
      "Four months file activation",
      "50 connections",
    ],
    highlighted: false,
    ctaLabel: "Ask about Silver",
    whatsappMessage: "I would like details about the Silver package.",
    comparisonFeatures: compare(["online", "physical", "video", "social", "activation"]),
  }),
  base("plan-gold", 3, {
    name: "Gold",
    price: 10000,
    currency: "PKR",
    duration: "6 months",
    shortDescription: "Our most popular plan: meetups, a fuller video and a longer activation.",
    features: [
      "Online match making",
      "Physical match making",
      "Physical meetups",
      "Gold graphic with demand",
      "Gold video with full detail",
      "Six months file activation",
      "70 connections",
    ],
    badge: "Most popular",
    highlighted: true,
    ctaLabel: "Ask about Gold",
    whatsappMessage: "I would like details about the Gold package.",
    comparisonFeatures: compare(["online", "physical", "meetups", "video", "social", "activation"]),
  }),
  base("plan-premium", 4, {
    name: "Premium",
    price: 15000,
    currency: "PKR",
    duration: "6 months",
    shortDescription: "Your profile is pushed in the areas you ask for, plus a premium ad.",
    features: [
      "Boost profile on social media in your demanded area",
      "Feature profile on top of the website",
      "Online match making",
      "Physical match making",
      "Physical meetups",
      "Weekly new proposals lists",
      "Premium ad and premium video",
      "Full social media promotion",
      "Six months file activation",
      "100 connections",
    ],
    badge: "Exclusive",
    highlighted: false,
    ctaLabel: "Ask about Premium",
    whatsappMessage: "I would like details about the Premium package.",
    comparisonFeatures: compare([
      "online",
      "physical",
      "meetups",
      "video",
      "social",
      "featured",
      "activation",
      "priority",
    ]),
  }),
  base("plan-vip", 5, {
    name: "Elite",
    price: 25000,
    currency: "PKR",
    duration: "12 months",
    shortDescription:
      "The VIP service: a named agent, priority meetups and a full year of support.",
    features: [
      "Direct contact with CEO and top management",
      "Personalised matchmaking agent assigned",
      "VIP priority in physical meetups",
      "Boost profile on social media, national and international",
      "Feature profile on top of the website for one year",
      "Premium gold ad and cinematic video",
      "Unlimited connections",
      "One year full file activation and support",
    ],
    badge: "VIP service",
    highlighted: false,
    ctaLabel: "Ask about Elite",
    whatsappMessage: "I would like details about the Elite VIP package.",
    comparisonFeatures: compare([
      "online",
      "physical",
      "meetups",
      "video",
      "social",
      "featured",
      "activation",
      "priority",
      "management",
    ]),
  }),
];
