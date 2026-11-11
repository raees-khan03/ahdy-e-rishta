/**
 * DUMMY DATA, replace with real data or API.
 * Sample stories written for layout. They are labelled as samples on the site and
 * must be replaced with stories a family has approved in writing.
 */
import type { SuccessStory } from "@/schemas/content.schema";
import { base } from "@/api/mock/records";
import storyOne from "@/assets/photos/story-1.jpg";
import storyTwo from "@/assets/photos/story-2.jpg";
import storyThree from "@/assets/photos/story-3.jpg";
import storyFour from "@/assets/photos/story-4.jpg";
import storyFive from "@/assets/photos/story-5.jpg";
import storySix from "@/assets/photos/story-6.jpg";

const storyPhotos = [storyOne, storyTwo, storyThree, storyFour, storyFive, storySix];
let storyCursor = 0;
const couple = () => storyPhotos[storyCursor++ % storyPhotos.length];

export const dummySuccessStories: SuccessStory[] = [
  base("story-1", 1, {
    coupleLabel: "A and H",
    city: "Lahore",
    year: 2025,
    quote: "The consultant called my father first. That was the reason we said yes to the meeting.",
    story:
      "A's family had been searching for almost two years. The office suggested three families, and the first meeting was arranged at our office with both fathers present. Nikah took place four months later.",
    serviceUsed: "Select package",
    isSample: true,
    imageUrl: couple(),
  }),
  base("story-2", 2, {
    coupleLabel: "S and M",
    city: "Karachi",
    year: 2025,
    quote: "I was widowed and did not want my picture anywhere. They respected that from day one.",
    story:
      "S came to the second marriage desk. Her profile went out without a photograph and only to families she approved. M's family met her at the Karachi desk, and both families agreed within six weeks.",
    serviceUsed: "Second marriage desk",
    isSample: true,
    imageUrl: couple(),
  }),
  base("story-3", 3, {
    coupleLabel: "R and F",
    city: "Islamabad",
    year: 2024,
    quote:
      "He was in Manchester, I was in Islamabad. The calls were arranged around my father's shifts.",
    story:
      "Both families wanted the same things but lived in different time zones. The overseas desk arranged three calls and one visit, and R travelled to Islamabad in the winter.",
    serviceUsed: "Premium package",
    isSample: true,
    imageUrl: couple(),
  }),
  base("story-4", 4, {
    coupleLabel: "N and B",
    city: "Faisalabad",
    year: 2024,
    quote: "They told us honestly that one proposal was not right. Nobody else did that.",
    story:
      "N's parents were in a hurry. Our consultant asked them to slow down and explained why one family's expectations did not match. The next proposal worked out within three months.",
    serviceUsed: "Essential package",
    isSample: true,
    imageUrl: couple(),
  }),
  base("story-5", 5, {
    coupleLabel: "T and Z",
    city: "Multan",
    year: 2023,
    quote:
      "No one asked us for money on the phone. Everything was written and signed in the office.",
    story:
      "T's family had already lost money to an online matchmaker. They came to the office, saw the file system and the fee in writing, and registered the same day.",
    serviceUsed: "Select package",
    isSample: true,
    imageUrl: couple(),
  }),
  base("story-6", 6, {
    coupleLabel: "K and A",
    city: "Peshawar",
    year: 2023,
    quote: "Two meetings, no pressure, and my mother could ask everything she wanted.",
    story:
      "K's mother wanted caste and family background checked properly. The consultant visited the family home once and put everything in writing before the second meeting.",
    serviceUsed: "Premium package",
    isSample: true,
    imageUrl: couple(),
  }),
];
