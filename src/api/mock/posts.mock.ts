/**
 * DUMMY DATA, replace with real data or API.
 * Guidance articles written for layout. The bureau must approve or replace them.
 */
import type { BlogPost } from "@/schemas/content.schema";
import { base } from "@/api/mock/records";
import coverOne from "@/assets/photos/post-1.svg";
import coverTwo from "@/assets/photos/post-2.svg";
import coverThree from "@/assets/photos/post-3.svg";
import coverFour from "@/assets/photos/post-4.svg";
import coverFive from "@/assets/photos/post-5.svg";
import coverSix from "@/assets/photos/post-6.svg";

export const dummyPosts: BlogPost[] = [
  base("post-1", 1, {
    slug: "questions-before-saying-yes",
    title: "Six questions to ask before saying yes",
    excerpt:
      "The conversations that save families from most misunderstandings later are not about furniture or the function. Here is what to discuss early.",
    category: "guidance",
    author: "Ahd-e-Rishta guidance desk",
    publishedAt: "2026-09-22",
    readingMinutes: 6,
    imageUrl: coverOne,
    relatedIds: ["post-2", "post-4"],
    body: [
      {
        heading: "Start with the ordinary week",
        paragraphs: [
          "Ask what a normal Tuesday looks like for the other person. Where do they work, who cooks, when do they see their parents, how late do they sleep. Ordinary answers tell you more than big promises.",
          "Families often begin with education and income because those are easy to measure. They matter, but a household runs on routine.",
        ],
      },
      {
        heading: "Money, spoken plainly",
        paragraphs: [
          "Who pays the bills, who keeps the savings, what happens if one salary stops for three months. Ask before the nikah, not after.",
          "If the family avoids the question, treat that as an answer in itself.",
        ],
      },
      {
        heading: "Where will you live",
        paragraphs: [
          "Joint family, separate flat, same city as the in laws or a different one. Living arrangements cause more friction than almost anything else.",
          "Ask whether that plan is final or still open. A plan that can change is safer than a plan everyone pretends is fixed.",
        ],
      },
      {
        heading: "Children, health and work after marriage",
        paragraphs: [
          "Ask whether the bride will continue working. Ask about health conditions in the family that the couple should know about. These are not rude questions, they are fair ones.",
          "Write down what both sides say. Memory changes after the wedding.",
        ],
      },
    ],
  }),
  base("post-2", 2, {
    slug: "spot-a-fake-matchmaker",
    title: "How to spot a fake matchmaker",
    excerpt:
      "A real bureau has an office, a file and a receipt. If one of those is missing, slow down.",
    category: "safety",
    author: "Ahd-e-Rishta guidance desk",
    publishedAt: "2026-09-08",
    readingMinutes: 5,
    imageUrl: coverTwo,
    relatedIds: ["post-1", "post-6"],
    body: [
      {
        heading: "They ask for money before meeting you",
        paragraphs: [
          "Advance payment to a personal JazzCash or Easypaisa account is the most common pattern in the complaints we hear. A real office gives you a written fee, on letterhead, before any payment.",
        ],
      },
      {
        heading: "There is no address",
        paragraphs: [
          "Ask for the office address and visit it. If the answer is a house in a residential street, a hotel lobby, or a WhatsApp number only, walk away.",
        ],
      },
      {
        heading: "Photographs arrive too quickly",
        paragraphs: [
          "A dozen photographs of unrelated women in one message is a warning sign, not a service. Consent takes time.",
        ],
      },
      {
        heading: "The story keeps changing",
        paragraphs: [
          "First the family is in Lahore, then in Manchester, then the boy is travelling. Ask for one clear file and see whether it stays the same next week.",
        ],
      },
    ],
  }),
  base("post-3", 3, {
    slug: "second-marriage-with-dignity",
    title: "Second marriage, handled with dignity",
    excerpt:
      "For widowed and divorced candidates the search can feel like an examination. It does not have to be.",
    category: "families",
    author: "Uzma Siddiqui",
    publishedAt: "2026-08-19",
    readingMinutes: 7,
    imageUrl: coverThree,
    relatedIds: ["post-1", "post-5"],
    body: [
      {
        heading: "Privacy first",
        paragraphs: [
          "A second marriage file should never sit in the same pile as a first marriage file. In our office it does not. Photographs are shared only when the candidate says so, and never on a public page.",
        ],
      },
      {
        heading: "Children are part of the conversation",
        paragraphs: [
          "If there are children from the first marriage, the other family should know before the first meeting, not after the second one. We put it on the first page of the file.",
        ],
      },
      {
        heading: "Slow is fine",
        paragraphs: [
          "Most of these matches take longer, and that is not a failure. Taking three months to find the right family is better than three weeks spent explaining a mistake.",
        ],
      },
    ],
  }),
  base("post-4", 4, {
    slug: "overseas-rishta-checklist",
    title: "Overseas rishta: a short checklist",
    excerpt:
      "Time zones, visas and one visit. What to settle before a family from abroad starts meeting candidates.",
    category: "process",
    author: "Hamid Bukhari",
    publishedAt: "2026-07-30",
    readingMinutes: 6,
    imageUrl: coverFour,
    relatedIds: ["post-2", "post-6"],
    body: [
      {
        heading: "Documents before introductions",
        paragraphs: [
          "Status, income and family details should be checked before the first call to a candidate family. Doing it after wastes everyone's time.",
        ],
      },
      {
        heading: "One visit, planned properly",
        paragraphs: [
          "Most overseas matches need one visit to Pakistan. Fix the dates early and plan two or three meetings, not eight.",
        ],
      },
      {
        heading: "Be clear about the visa",
        paragraphs: [
          "Tell the other family the honest timeline for a spouse visa. A vague promise today becomes a serious problem in six months.",
        ],
      },
    ],
  }),
  base("post-5", 5, {
    slug: "what-a-consultant-actually-does",
    title: "What a consultant actually does all day",
    excerpt:
      "Phone calls, file checks and family meetings. A short look at the work behind one introduction.",
    category: "process",
    author: "Adeel Raza",
    publishedAt: "2026-07-11",
    readingMinutes: 4,
    imageUrl: coverFive,
    relatedIds: ["post-3", "post-6"],
    body: [
      {
        heading: "The first call is never about matching",
        paragraphs: [
          "It is about understanding the family. Who is making the decision, what the candidate wants, and what the family will not compromise on.",
        ],
      },
      {
        heading: "Then the boring part",
        paragraphs: [
          "Checking a CNIC, calling a number back, confirming an employer. Two-thirds of the job is this, and it is the part that protects families.",
        ],
      },
      {
        heading: "Saying no",
        paragraphs: [
          "Half the value of a consultant is telling a family that a proposal is not suitable, and explaining why plainly.",
        ],
      },
    ],
  }),
  base("post-6", 6, {
    slug: "parents-and-the-search",
    title: "For parents: how to help without pushing",
    excerpt:
      "The family should be part of the search, not the whole search. Some practical lines for parents.",
    category: "families",
    author: "Farah Naz",
    publishedAt: "2026-06-27",
    readingMinutes: 5,
    imageUrl: coverSix,
    relatedIds: ["post-1", "post-3"],
    body: [
      {
        heading: "Ask, then listen",
        paragraphs: [
          "Ask your child what they want in a partner, and write it down. Compare it with what you want. Where the two lists differ, talk about it before the first meeting.",
        ],
      },
      {
        heading: "One meeting is not a decision",
        paragraphs: [
          "Give the candidate room to say no after one meeting. A family that allows a second look usually ends up with a better match.",
        ],
      },
      {
        heading: "Do not hide the difficult facts",
        paragraphs: [
          "Health, money, a previous marriage, a visa problem. Whatever it is, disclose it early. It always comes out later, and later is worse.",
        ],
      },
    ],
  }),
];
