/**
 * DUMMY DATA, replace with real data or API.
 * Section headings, page intros and short paragraphs. The admin edits these
 * blocks instead of asking a developer to change text inside a component.
 */
import type { ContentBlock } from "@/schemas/content.schema";
import { base } from "@/api/mock/records";

interface BlockSeed {
  key: string;
  title?: string;
  eyebrow?: string;
  subtitle?: string;
  body?: string;
  items?: { title: string; text: string }[];
}

const seeds: BlockSeed[] = [
  {
    key: "home.findMatch",
    eyebrow: "Begin here",
    title: "Find your perfect match",
    subtitle:
      "Choose what matters to your family. Our team checks the results before any proposal moves forward.",
  },
  {
    key: "home.services",
    eyebrow: "What we do",
    title: "Services for every family",
    subtitle:
      "Some families need a full search, some need one introduction done properly. Pick what fits your situation.",
  },
  {
    key: "home.cities",
    eyebrow: "Where families are",
    title: "Browse by city",
    subtitle:
      "Most of our proposals are from Lahore, Karachi and Islamabad, and a good number are from overseas.",
  },
  {
    key: "home.proposals",
    eyebrow: "Fresh proposals",
    title: "Proposals added this month",
    subtitle:
      "Every profile here has been spoken to by a consultant. Photographs are shared only with consent.",
  },
  {
    key: "home.featured",
    eyebrow: "Selected by our team",
    title: "Featured grooms and brides",
    subtitle: "Families who completed verification and want a quicker introduction.",
  },
  {
    key: "home.howItWorks",
    eyebrow: "The process",
    title: "How the bureau works",
    subtitle: "Six steps from the first phone call to the families meeting each other.",
  },
  {
    key: "home.secondMarriage",
    eyebrow: "Second marriage",
    title: "For widowed and divorced candidates",
    subtitle:
      "A quiet, respectful search. No public profiles, no photographs without your permission.",
    body: "Many families come to us after a difficult chapter. We keep these proposals separate, talk to you first, and share details only with families you approve.",
  },
  {
    key: "home.plans",
    eyebrow: "Membership",
    title: "Our packages",
    subtitle: "The office confirms the current fee in writing before any payment.",
  },
  {
    key: "home.consultants",
    eyebrow: "Our team",
    title: "The people you will speak to",
    subtitle: "You get one consultant for the whole search, not a new person every call.",
  },
  {
    key: "home.director",
    eyebrow: "From the director's desk",
  },
  {
    key: "home.safety",
    eyebrow: "Stay safe",
    title: "Avoid fake matchmakers",
    subtitle: "Most complaints we hear about start with a WhatsApp number and no office.",
  },
  {
    key: "home.stories",
    eyebrow: "Families we worked with",
    title: "Their words, not ours",
    subtitle:
      "Sample stories written for this website. Real families decide later whether their story is published.",
  },
  {
    key: "home.videos",
    eyebrow: "Watch",
    title: "Short videos for families",
    subtitle: "Plain advice about the rishta process. Nothing plays until you press play.",
  },
  {
    key: "home.why",
    eyebrow: "Why families choose us",
    title: "Checked before it reaches you",
    subtitle: "What our team does with every profile before it is shown to another family.",
  },
  {
    key: "home.latest",
    eyebrow: "Just added",
    title: "Latest proposals",
    subtitle:
      "The newest profiles in the office, sorted by the date our team completed the interview.",
  },
  {
    key: "home.faq",
    eyebrow: "Questions",
    title: "What families ask us",
    subtitle: "If your question is not here, message the office on WhatsApp.",
  },
  {
    key: "home.newsletter",
    eyebrow: "Stay in touch",
    title: "Guidance for families, once a month",
    subtitle:
      "One short email with new proposals by city and one piece of advice. No forwards, no sharing of your address.",
  },
  {
    key: "home.cta",
    eyebrow: "Start now",
    title: "Talk to a consultant this week",
    body: "Fill the form or send one WhatsApp message. We will call you back, usually the same day.",
  },
  {
    key: "home.app",
    eyebrow: "On your phone",
    title: "The office, in your pocket",
    subtitle:
      "Follow your case, read your shortlist and message your consultant. The app is optional, everything also works in the browser.",
  },
  {
    key: "page.profiles",
    eyebrow: "Find a match",
    title: "Browse proposals",
    subtitle: "Filter by city, caste, education and age. Contact details stay with the office.",
  },
  {
    key: "page.register",
    eyebrow: "Register",
    title: "Register with the bureau",
    subtitle: "Six short steps. When you submit, your details open in WhatsApp for our team.",
  },
  {
    key: "page.services",
    eyebrow: "Services",
    title: "How we can help",
    subtitle: "Six services, one office, one consultant who knows your case.",
  },
  {
    key: "page.packages",
    eyebrow: "Packages",
    title: "Membership plans",
    subtitle:
      "Compare what each plan includes. The office confirms the fee in writing before payment.",
  },
  {
    key: "page.howItWorks",
    eyebrow: "Process",
    title: "From first call to nikah",
    subtitle: "The same six steps for every family, in the same order.",
  },
  {
    key: "page.stories",
    eyebrow: "Success stories",
    title: "Families who found each other",
    subtitle: "Sample stories. Real families approve their own words before anything is published.",
  },
  {
    key: "page.videos",
    eyebrow: "Videos",
    title: "Guidance in short clips",
    subtitle: "Practical advice for parents and candidates, recorded by our team.",
  },
  {
    key: "page.about",
    eyebrow: "About us",
    title: "A small bureau in Lahore",
    subtitle:
      "We started in 2009 with one office and a notebook. The notebook is now a system, the approach is the same.",
  },
  {
    key: "page.team",
    eyebrow: "Our team",
    title: "Meet the consultants",
    subtitle: "Four consultants, all of them trained to speak to families respectfully.",
  },
  {
    key: "page.contact",
    eyebrow: "Contact",
    title: "Come to the office or call us",
    subtitle: "We answer calls during office hours and WhatsApp messages in the evening as well.",
  },
  {
    key: "page.faq",
    eyebrow: "FAQ",
    title: "Questions families ask",
    subtitle: "Search below or send your question on WhatsApp.",
  },
  {
    key: "page.safety",
    eyebrow: "Safety",
    title: "How to spot a fake matchmaker",
    subtitle: "Six checks to run before you send money or photographs to anyone.",
  },
  {
    key: "page.blog",
    eyebrow: "Guidance",
    title: "Notes for families",
    subtitle: "Short articles written by our consultants for parents and candidates.",
  },
  {
    key: "page.shortlist",
    eyebrow: "Shortlist",
    title: "Proposals you saved",
    subtitle: "Saved on this device. Sign in to keep the same list on your account.",
  },
  {
    key: "page.login",
    eyebrow: "Login",
    title: "Sign in to your account",
    subtitle: "Use the phone number you gave the office and the password they set for you.",
  },
  {
    key: "page.forgot",
    eyebrow: "Password help",
    title: "Reset your password",
    subtitle: "We will send a code to your registered phone number.",
  },
  {
    key: "page.account",
    eyebrow: "My account",
    title: "Your account",
    subtitle: "Your saved proposals, interests and password in one place.",
  },
  {
    key: "page.legal",
    eyebrow: "Legal",
    title: "Terms and policies",
    subtitle: "Short and readable. Ask the office if anything is unclear.",
  },
  {
    key: "register.intro",
    eyebrow: "Register",
    title: "Start your search for a trusted rishta",
    subtitle:
      "Share a few details about yourself and what you are looking for. It takes about five minutes, in six short steps.",
  },
  {
    key: "login.intro",
    eyebrow: "Login",
    title: "Welcome back to Ahd-e-Rishta",
    subtitle:
      "Sign in with your phone number and password to see your saved proposals and messages from the office.",
    items: [
      {
        title: "Private by default",
        text: "Your number, your file and your shortlist stay with the office.",
      },
      {
        title: "Pick up where you left off",
        text: "Saved proposals and messages from your consultant, in one place.",
      },
    ],
  },
];

export const dummyContentBlocks: ContentBlock[] = seeds.map((seed, index) =>
  base(`block-${seed.key}`, index + 1, {
    key: seed.key,
    title: seed.title ?? "",
    eyebrow: seed.eyebrow,
    subtitle: seed.subtitle,
    body: seed.body,
    items: seed.items,
  }),
);
