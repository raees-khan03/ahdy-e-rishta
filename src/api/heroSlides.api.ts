import { z } from "zod";
import { httpRequest } from "@/api/http";
import { env } from "@/lib/env";
import { mockDelay } from "@/api/mock/delay";
import { heroSlideSchema, type HeroSlide } from "@/schemas/content.schema";
import { visible } from "@/api/mock/records";
import { dummyHeroSlides } from "@/api/mock/heroSlides.mock";

export async function getHeroSlides(signal?: AbortSignal): Promise<HeroSlide[]> {
  if (env.useMockApi) {
    await mockDelay(160, signal);
    return visible(dummyHeroSlides);
  }
  const slides = await httpRequest("/hero-slides", { schema: z.array(heroSlideSchema), signal });
  return visible(slides);
}
