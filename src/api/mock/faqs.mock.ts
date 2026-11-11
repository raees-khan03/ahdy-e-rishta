/** DUMMY DATA, replace with real data or API. Answers are placeholders the bureau must approve. */
import type { FaqItem } from "@/schemas/content.schema";
import { base } from "@/api/mock/records";

export const dummyFaqs: FaqItem[] = [
  base("faq-1", 1, {
    category: "general",
    question: "What is Ahd-e-Rishta and how is it different from an app?",
    answer:
      "We are a marriage bureau with an office in Lahore. A consultant speaks to you and to the other family before any detail is shared. There is no swiping and no public profile page to browse freely.",
  }),
  base("faq-2", 2, {
    category: "general",
    question: "Do I have to come to the office?",
    answer:
      "For the registration interview, yes, if you live in Lahore. Families in other cities can do the interview on a video call, and we visit overseas families when the consultant travels.",
  }),
  base("faq-3", 3, {
    category: "process",
    question: "How long does a search usually take?",
    answer:
      "It varies. Some families meet the right family in six weeks, others take a year. Our consultant tells you honestly after the first interview what to expect for your requirements.",
  }),
  base("faq-4", 4, {
    category: "profiles",
    question: "Will my photograph be shown to everyone?",
    answer:
      "No. A photograph goes out only when you allow it and only to a family our consultant has already spoken to. If you say no, we show the words Photograph on request.",
  }),
  base("faq-5", 5, {
    category: "privacy",
    question: "Who can see my phone number?",
    answer:
      "Only the office. We never publish numbers or addresses. If a family wants to speak to you, we arrange the call and stay in the loop until both sides are comfortable.",
  }),
  base("faq-6", 6, {
    category: "profiles",
    question: "Can I remove my profile later?",
    answer:
      "Yes, any time. One message to the office is enough. We close the file and it stops going out the same day.",
  }),
  base("faq-7", 7, {
    category: "packages",
    question: "How do I pay the fee?",
    answer:
      "Bank transfer, JazzCash or Easypaisa. The office gives you the fee in writing before you pay, and a receipt after. Please do not send money to any personal account.",
  }),
  base("faq-8", 8, {
    category: "packages",
    question: "Is the fee refundable?",
    answer:
      "Partly, and only in the cases written in our refund policy. If we have not shared any proposal yet, you can ask for a refund within seven days. Ask for the policy in writing before paying.",
  }),
  base("faq-9", 9, {
    category: "process",
    question: "Do you handle second marriages and widowed candidates?",
    answer:
      "Yes, and quietly. These proposals are kept on a separate desk and shared only with families you approve. Most of these cases are handled by our senior consultant.",
  }),
  base("faq-10", 10, {
    category: "privacy",
    question: "What if a family asks for money after the introduction?",
    answer:
      "Tell the office immediately. We do not allow any extra payment between families, and we will stop working with a family that asks for one.",
  }),
];
