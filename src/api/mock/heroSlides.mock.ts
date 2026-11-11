/**
 * DUMMY DATA, replace with real data or API.
 * Bundled placeholder photographs so the slider works offline. The admin uploads
 * the bureau's own pictures later.
 */
import type { HeroSlide } from "@/schemas/content.schema";
import { base } from "@/api/mock/records";
import heroOne from "@/assets/photos/hero-1.jpg";
import heroTwo from "@/assets/photos/hero-2.jpg";
import heroThree from "@/assets/photos/hero-3.jpg";

export const dummyHeroSlides: HeroSlide[] = [
  base("slide-1", 1, {
    image: heroOne,
    alt: "Bride in a maroon and gold lehenga standing beside the groom in an ivory sherwani",
    heading: "Where families meet with honour",
    subheading:
      "A bureau-managed rishta service in Lahore. Every proposal is reviewed by our team before it reaches your family.",
  }),
  base("slide-2", 2, {
    image: heroTwo,
    alt: "Groom kneeling beside the bride in a maroon bridal dress in a decorated hall",
    heading: "Guidance at every step",
    subheading:
      "From the first phone call to the family meeting, one consultant stays with your case.",
  }),
  base("slide-3", 3, {
    image: heroThree,
    alt: "Couple walking together, bride in a maroon dupatta and groom in an ivory sherwani",
  }),
];
