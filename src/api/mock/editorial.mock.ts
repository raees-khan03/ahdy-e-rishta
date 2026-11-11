/**
 * DUMMY DATA, replace with real data or API.
 * Process steps, safety tips, milestones, legal pages and the option lists the
 * filters use. All of it is editable from the admin panel later.
 */
import type {
  CategoryGroup,
  LegalPage,
  Milestone,
  SafetyTip,
  StepItem,
} from "@/schemas/content.schema";
import { base } from "@/api/mock/records";

export const dummyProcessSteps: StepItem[] = [
  base("step-1", 1, {
    title: "Register with the office",
    description:
      "You can use the form or simply message the office. We ask for the basics: who the proposal is for, family background, education, work and what you are looking for.",
    note: "Usually 10 minutes",
  }),
  base("step-2", 2, {
    title: "We write and check the file",
    description:
      "A consultant calls the contact person and confirms every detail. Then identity, phone and one family reference are checked. If something cannot be verified, we say so before writing the profile.",
    note: "1 to 2 working days",
  }),
  base("step-3", 3, {
    title: "Proposals that fit",
    description:
      "Your consultant shares a short written list with your family, not a link to hundreds of pictures. Each suggestion says why it fits and what to keep in mind.",
    note: "While the search is active",
  }),
  base("step-4", 4, {
    title: "Family meeting",
    description:
      "Once both families agree, we fix the first meeting: at our office, at a family home, or a supervised video call for overseas families. Nothing is decided on the day.",
    note: "Within your timeline",
  }),
  base("step-5", 5, {
    title: "Follow up after the meeting",
    description:
      "We call both families the next day and note what each side said, so nothing is left guessed.",
    note: "Next working day",
  }),
  base("step-6", 6, {
    title: "Nikah and after",
    description:
      "Paperwork checklist, counselling if you want it, and one call after three months to see how things are going.",
    note: "First three months",
  }),
];

export const dummyVerificationSteps: StepItem[] = [
  base("verify-1", 1, {
    title: "Identity check",
    description: "We see the CNIC in person or on video. It is never posted anywhere.",
    icon: "file-text",
  }),
  base("verify-2", 2, {
    title: "Phone call back",
    description: "We call the number ourselves instead of trusting a number passed along.",
    icon: "phone",
  }),
  base("verify-3", 3, {
    title: "Family reference",
    description: "One relative or a local reference confirms the household details in the file.",
    icon: "users",
  }),
  base("verify-4", 4, {
    title: "Photo permission",
    description: "A photograph goes out only when the candidate or guardian says yes in writing.",
    icon: "camera",
  }),
];

export const dummySafetyTips: SafetyTip[] = [
  base("tip-1", 1, {
    kind: "tip" as const,
    title: "Never send money to a person",
    description:
      "The office takes payment against a written receipt. Refuse cash, mobile top ups or transfers to a personal account.",
  }),
  base("tip-2", 2, {
    kind: "tip" as const,
    title: "Ask for the office address",
    description:
      "A real bureau has a door you can knock on. If the address changes every week, stop and check again.",
  }),
  base("tip-3", 3, {
    kind: "tip" as const,
    title: "Confirm everything through the office",
    description:
      "Before you act on any message, call our office number and ask for the profile ID. We will confirm it exists.",
  }),
  base("tip-4", 4, {
    kind: "tip" as const,
    title: "Do not share documents early",
    description:
      "CNIC copies, bank details and passport scans come after both families have met and agreed to go ahead.",
  }),
  base("tip-5", 5, {
    kind: "tip" as const,
    title: "Be careful with photographs",
    description:
      "We never ask for private photographs. If someone does, stop the conversation and tell the office.",
  }),
  base("tip-6", 6, {
    kind: "tip" as const,
    title: "Keep your elders in the loop",
    description:
      "Talk to your parents or a trusted elder before any commitment. Secrecy is what fraudsters ask for first.",
  }),
  base("flag-1", 1, {
    kind: "redFlag" as const,
    title: "Asks for money before any meeting",
    description: "Mobile top ups, gift cards or a transfer to a personal account. Stop there.",
  }),
  base("flag-2", 2, {
    kind: "redFlag" as const,
    title: "Avoids meeting with a mahram present",
    description: "Insists on meeting alone or outside the office. That is not how a rishta starts.",
  }),
  base("flag-3", 3, {
    kind: "redFlag" as const,
    title: "Wants private photographs early",
    description: "Or asks for CNIC scans and bank details before the families have even spoken.",
  }),
  base("flag-4", 4, {
    kind: "redFlag" as const,
    title: "Pushes for a decision in days",
    description: "Urgency, or a threat when you ask for time, is a pressure tactic.",
  }),
  base("flag-5", 5, {
    kind: "redFlag" as const,
    title: "Profile the office cannot confirm",
    description: "You call the office and nobody can find the ID. Then it is not our listing.",
  }),
  base("flag-6", 6, {
    kind: "redFlag" as const,
    title: "Calls from a personal number",
    description: "Our consultants call from the office line only. Ask for a callback instead.",
  }),
  base("never-1", 1, {
    kind: "neverAsk" as const,
    title: "Bank details or OTP codes",
    description:
      "No consultant will ever ask for your card number, PIN or a code sent to your phone.",
  }),
  base("never-2", 2, {
    kind: "neverAsk" as const,
    title: "Payment to an individual number",
    description:
      "Fees go to the office against a receipt, never to a consultant's personal account.",
  }),
  base("never-3", 3, {
    kind: "neverAsk" as const,
    title: "Private photographs",
    description: "We only share a photo the candidate or guardian has allowed in writing.",
  }),
  base("never-4", 4, {
    kind: "neverAsk" as const,
    title: "A decision on the first meeting",
    description:
      "Nobody should be asked to commit on the day two families meet for the first time.",
  }),
  base("never-5", 5, {
    kind: "neverAsk" as const,
    title: "CNIC or passport before families meet",
    description: "Documents come later, in person, once both sides have agreed to go ahead.",
  }),
  base("never-6", 6, {
    kind: "neverAsk" as const,
    title: "Contact through personal social accounts",
    description: "Everything runs through the office number, the site or a confirmed email.",
  }),
  base("report-1", 1, {
    kind: "reportStep" as const,
    title: "Stop the conversation",
    description: "Send nothing more. Take screenshots before you block anyone.",
  }),
  base("report-2", 2, {
    kind: "reportStep" as const,
    title: "Note the profile ID",
    description: "Every listing has an ID such as AER-1042. Have it ready when you call.",
  }),
  base("report-3", 3, {
    kind: "reportStep" as const,
    title: "Call the office number",
    description: "Use the number printed on this site, not one the other party sent you.",
  }),
  base("report-4", 4, {
    kind: "reportStep" as const,
    title: "We review in two working days",
    description: "Listings that fail verification are removed and the number is blocked.",
  }),
];

export const dummyMilestones: Milestone[] = [
  base("milestone-1", 1, {
    year: "2009",
    title: "One room in Lahore",
    description: "The bureau opened with a table, a phone and six families in the first year.",
  }),
  base("milestone-2", 2, {
    year: "2014",
    title: "Karachi desk",
    description: "A second consultant started covering Sindh enquiries.",
  }),
  base("milestone-3", 3, {
    year: "2018",
    title: "Overseas desk",
    description: "Evening calls for families in the UK and the Gulf became a separate service.",
  }),
  base("milestone-4", 4, {
    year: "2022",
    title: "Second marriage desk",
    description:
      "A quieter pathway for widowed and divorced candidates, handled by one consultant.",
  }),
  base("milestone-5", 5, {
    year: "2026",
    title: "The file system moved online",
    description: "Paper files are still printed, but the checks now run through one system.",
  }),
];

export const dummyLegalPages: LegalPage[] = [
  base("legal-terms", 1, {
    slug: "terms",
    title: "Terms of use",
    intro:
      "These terms explain how the bureau works for families and candidates. This text is a template and must be reviewed by the office before launch.",
    lastReviewed: "2026-09-01",
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          "Ahd-e-Rishta is a marriage bureau based in Lahore. We are not a government office and we do not issue any certificate or registration number for a marriage.",
          "Our work is to interview families, check the details they give us, and introduce suitable proposals.",
        ],
      },
      {
        heading: "What we promise",
        paragraphs: [
          "Every family speaks to a named consultant. Every profile is checked before it is shared. Contact details of candidates are never published.",
          "If we think a proposal is not suitable, we will say so and explain why.",
        ],
      },
      {
        heading: "What we cannot promise",
        paragraphs: [
          "We cannot promise a marriage, a timeline, or an outcome. Families decide for themselves after meeting each other.",
          "We do not arrange marriages for immigration purposes and we refuse any request of that kind.",
        ],
      },
      {
        heading: "Your responsibilities",
        paragraphs: [
          "Give true information. Tell us if anything changes. Do not send money to another family and do not share your documents before you are comfortable.",
        ],
      },
    ],
  }),
  base("legal-privacy", 2, {
    slug: "privacy",
    title: "Privacy policy",
    intro:
      "Privacy is the base of this service. This policy is a template the office must approve before launch.",
    lastReviewed: "2026-09-01",
    sections: [
      {
        heading: "What we collect",
        paragraphs: [
          "Name, date of birth, city, education, work, family details and a phone number. A photograph only if you allow it.",
          "We do not collect bank details, CNIC copies or passport scans for the website. Those are seen in the office when needed.",
        ],
      },
      {
        heading: "Who sees it",
        paragraphs: [
          "Your consultant, and the families your consultant introduces you to, after you agree.",
          "Public pages show a first name, a last initial and a profile ID. No phone number, no address, no exact date of birth.",
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: [
          "Until you ask us to remove it. One message to the office is enough, and the file stops going out the same day.",
        ],
      },
      {
        heading: "Your choices",
        paragraphs: [
          "You can ask to see your file, correct it, or close it. You can say no to sharing a photograph at any time.",
        ],
      },
    ],
  }),
  base("legal-refund", 3, {
    slug: "refund",
    title: "Refund policy",
    intro: "A short policy on fees. The office must confirm the final wording before launch.",
    lastReviewed: "2026-09-01",
    sections: [
      {
        heading: "Before any proposal is shared",
        paragraphs: [
          "If you paid and we have not shared a single proposal, you can ask for a refund within seven days of the payment.",
        ],
      },
      {
        heading: "After proposals are shared",
        paragraphs: [
          "Once proposals have been shared, the fee covers the work done and is not refundable. This is written on the receipt you receive.",
        ],
      },
      {
        heading: "How to ask",
        paragraphs: [
          "Call the office or message on WhatsApp and quote your receipt number. We reply within three working days.",
        ],
      },
      {
        heading: "Payment methods",
        paragraphs: [
          "Bank transfer, JazzCash and Easypaisa only, paid to the office account with a written receipt. Never to a personal account.",
        ],
      },
    ],
  }),
];

export const dummyCategories: CategoryGroup[] = [
  base("categories-caste", 1, {
    key: "caste",
    label: "Caste",
    options: [
      "Arain",
      "Awan",
      "Bhatti",
      "Butt",
      "Chaudhry",
      "Gujjar",
      "Jat",
      "Kashmiri",
      "Malik",
      "Memon",
      "Mughal",
      "Niazi",
      "Paracha",
      "Qureshi",
      "Rajput",
      "Rana",
      "Rao",
      "Sheikh",
      "Syed",
      "Other",
    ],
  }),
  base("categories-sect", 2, {
    key: "sect",
    label: "Sect",
    options: ["Sunni", "Shia", "Deobandi", "Barelvi", "Ahl-e-Hadith", "Other"],
  }),
  base("categories-education", 3, {
    key: "education",
    label: "Education",
    options: [
      "Matric / O-Levels",
      "Intermediate / A-Levels",
      "Bachelors",
      "Masters",
      "MBBS / BDS",
      "Engineering (BE / BSc)",
      "CSS / PMS Qualified",
      "LLB",
      "PhD",
      "Diploma / Certificate",
    ],
  }),
  base("categories-occupation", 4, {
    key: "occupation",
    label: "Occupation",
    options: [
      "Doctor",
      "Engineer",
      "Teacher / Lecturer",
      "Government Officer",
      "Banker / Finance",
      "Business Owner",
      "Software Professional",
      "Lawyer",
      "Pharmacist",
      "Homemaker",
      "Student",
      "Army / Defence",
      "Other",
    ],
  }),
  base("categories-income", 5, {
    key: "income",
    label: "Monthly income",
    options: [
      "Under PKR 50,000",
      "PKR 50,000 to 100,000",
      "PKR 100,000 to 200,000",
      "PKR 200,000 to 400,000",
      "Above PKR 400,000",
      "Prefer not to say",
    ],
  }),
];
