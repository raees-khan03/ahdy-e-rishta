/** DUMMY DATA, replace with real data or API. Service descriptions are placeholders for the client to approve. */
import type { ServiceContent } from "@/schemas/content.schema";
import { base } from "@/api/mock/records";
import serviceOne from "@/assets/photos/service-1.jpg";
import serviceTwo from "@/assets/photos/service-2.jpg";
import serviceThree from "@/assets/photos/service-3.jpg";
import serviceFour from "@/assets/photos/service-4.jpg";
import serviceFive from "@/assets/photos/service-5.jpg";
import serviceSix from "@/assets/photos/service-6.jpg";

const servicePhotos = [serviceOne, serviceTwo, serviceThree, serviceFour, serviceFive, serviceSix];
let serviceCursor = 0;
const photo = () => servicePhotos[serviceCursor++ % servicePhotos.length];

export const dummyServices: ServiceContent[] = [
  base("service-1", 1, {
    slug: "rishta-matching",
    title: "Rishta matching",
    shortDescription: "Screened proposals that match what your family actually asked for.",
    intro:
      "Our main service. We interview you, write your file by hand, and match it against the proposals already in the office. Nothing goes out until both sides have been spoken to.",
    icon: "heart-handshake",
    imageUrl: photo(),
    benefits: [
      "Interview with a consultant, in person or on video",
      "Proposals matched on caste, city, education and age",
      "One consultant stays with your case",
      "Feedback after every meeting you attend",
    ],
    process: [
      {
        title: "Interview",
        description: "About 45 minutes with a consultant, with the family present if you wish.",
      },
      {
        title: "File written",
        description: "We type your details and check them on the phone before use.",
      },
      {
        title: "Proposals shared",
        description: "You get a short list, not a long one, with photographs only where allowed.",
      },
    ],
    faqs: [
      {
        question: "Do you match outside my caste?",
        answer:
          "Only if your file says so. We follow what the family has written, not what is convenient for us.",
      },
    ],
    suitedFor: ["First marriages", "Families who want a checked search"],
  }),
  base("service-7", 7, {
    slug: "personal-matchmaking",
    title: "Personal matchmaking",
    shortDescription: "One named consultant who knows your family and follows up.",
    intro:
      "For families who would rather speak to a person than scroll a list. Your consultant keeps the file, remembers what you said last time, and calls you when something genuinely fits.",
    icon: "user-round-search",
    imageUrl: photo(),
    benefits: [
      "One consultant for the whole search",
      "Notes from every call kept on your file",
      "Candidates spoken to directly, not only their parents",
      "Nothing shared without your say so",
    ],
    process: [
      { title: "First call", description: "Forty minutes, mostly listening to your family." },
      {
        title: "Shortlist",
        description: "Two or three proposals at a time, each with the reason it was chosen.",
      },
      {
        title: "Follow up",
        description: "A call after every meeting, whether it went well or not.",
      },
    ],
    faqs: [
      {
        question: "Can we change consultants?",
        answer: "Yes. Tell the office and the file is handed over with a proper briefing.",
      },
    ],
    suitedFor: ["Busy families", "Overseas parents", "Families who prefer speaking to a person"],
  }),
  base("service-2", 2, {
    slug: "second-marriage",
    title: "Second marriage desk",
    shortDescription: "A quiet search for widowed and divorced candidates.",
    intro:
      "Second marriages need a different tone. These proposals are kept on a separate desk, handled by our senior consultant, and shared only with families the candidate approves.",
    icon: "heart-crack",
    imageUrl: photo(),
    benefits: [
      "Handled by the senior consultant only",
      "No photographs shared unless you allow it",
      "Children and custody details discussed openly",
      "Meetings arranged at the office, not at home",
    ],
    process: [
      { title: "Private interview", description: "You can come alone; the family can join later." },
      {
        title: "Short list",
        description: "A small number of families who have agreed to a second marriage.",
      },
      { title: "Meeting", description: "Both families sit with the consultant present." },
    ],
    faqs: [
      {
        question: "Will people know I am divorced?",
        answer:
          "Your file says it plainly, because we do not hide it from the other family. It is not published anywhere public.",
      },
    ],
    suitedFor: ["Widowed candidates", "Divorced candidates", "Candidates with children"],
  }),
  base("service-3", 3, {
    slug: "overseas-proposals",
    title: "Overseas proposals",
    shortDescription: "For families in the UK, Gulf and North America.",
    intro:
      "Our overseas desk works in your time zone. Calls are arranged in the evening, documents are checked early, and the consultant keeps both families informed at the same speed.",
    icon: "globe",
    imageUrl: photo(),
    benefits: [
      "Evening and weekend calls for families abroad",
      "Visa and status documents checked before any meeting",
      "Video meetings arranged with the consultant present",
      "Honest advice on timing and visit plans",
    ],
    process: [
      {
        title: "Call",
        description: "A short call to understand the family and the visa situation.",
      },
      {
        title: "Documents",
        description: "Status, income and family details checked before matching.",
      },
      {
        title: "Introductions",
        description: "Video meetings first, then a visit when both sides agree.",
      },
    ],
    faqs: [
      {
        question: "Can you find a spouse for a visa?",
        answer:
          "No. We do not arrange marriages for immigration. Families who ask for that are refused.",
      },
    ],
    suitedFor: ["British Pakistani families", "Gulf based candidates", "North America"],
  }),
  base("service-4", 4, {
    slug: "face-to-face-meetings",
    title: "Face-to-face meetings",
    shortDescription: "The first meeting arranged properly, at our office.",
    intro:
      "Most families are nervous about the first meeting. We arrange it at the office, with a consultant present, tea on the table and a fixed time so nobody sits waiting.",
    icon: "users-round",
    imageUrl: photo(),
    benefits: [
      "Neutral place for both families",
      "Consultant present for the whole meeting",
      "Private room for the candidate conversation",
      "Written feedback collected afterwards",
    ],
    process: [
      { title: "Date fixed", description: "We find a time that suits both families." },
      {
        title: "Meeting",
        description: "Ninety minutes, with a short private conversation if both sides want it.",
      },
      { title: "Follow up", description: "The consultant calls both families the next day." },
    ],
    faqs: [
      {
        question: "Can the candidate meet alone?",
        answer: "Yes, in our office meeting room, with both families nearby and the door open.",
      },
    ],
    suitedFor: ["First meetings", "Families living in different cities"],
  }),
  base("service-5", 5, {
    slug: "marriage-counselling",
    title: "Marriage counselling",
    shortDescription: "Two sessions before the nikah, and support after it.",
    intro:
      "A short, practical counselling block for the couple. Money, housing, in-laws and work are discussed before the families finalise the date.",
    icon: "messages-square",
    imageUrl: photo(),
    benefits: [
      "Two sessions before the nikah",
      "Money and housing discussed openly",
      "Separate session for the bride if she prefers",
      "One follow up call after three months",
    ],
    process: [
      { title: "First session", description: "Expectations, family setup and money." },
      { title: "Second session", description: "Practical plan for the first year." },
      { title: "Follow up", description: "A call after three months, no charge." },
    ],
    faqs: [
      {
        question: "Is this religious advice?",
        answer:
          "No. Our counsellor is not an aalim. For religious questions we point you to your own family scholar.",
      },
    ],
    suitedFor: ["Engaged couples", "Second marriages"],
  }),
  base("service-6", 6, {
    slug: "verification",
    title: "Profile verification",
    shortDescription: "Identity, phone and family details checked before sharing.",
    intro:
      "Every profile passes the same checks. Nothing complicated, just the work most websites skip: a phone call, a document and one conversation with a family member.",
    icon: "user-round-search",
    imageUrl: photo(),
    benefits: [
      "CNIC seen in person or on video",
      "Phone number called back",
      "One family member spoken to",
      "Employment or business details confirmed",
    ],
    process: [
      { title: "Documents", description: "CNIC and, where relevant, degree or employment letter." },
      {
        title: "Call back",
        description: "We call the number ourselves, never a number given by a third party.",
      },
      { title: "Note added", description: "The file is marked as checked, with the date." },
    ],
    faqs: [
      {
        question: "Are all profiles verified the same way?",
        answer: "Yes. If a document is missing, the file stays incomplete and is not shared.",
      },
    ],
    suitedFor: ["All new families", "Families checking an existing proposal"],
  }),
];
