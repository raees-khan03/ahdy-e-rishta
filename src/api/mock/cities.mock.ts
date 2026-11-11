/** DUMMY DATA, replace with real data or API. Cities shown on the home page and used by the city filter. */
import type { CityContent } from "@/schemas/content.schema";
import { base } from "@/api/mock/records";

export const dummyCities: CityContent[] = [
  base("city-lahore", 1, { name: "Lahore", slug: "lahore", province: "Punjab", profileCount: 34 }),
  base("city-karachi", 2, {
    name: "Karachi",
    slug: "karachi",
    province: "Sindh",
    profileCount: 22,
  }),
  base("city-islamabad", 3, {
    name: "Islamabad",
    slug: "islamabad",
    province: "Islamabad Capital Territory",
    profileCount: 18,
  }),
  base("city-faisalabad", 4, {
    name: "Faisalabad",
    slug: "faisalabad",
    province: "Punjab",
    profileCount: 11,
  }),
  base("city-multan", 5, { name: "Multan", slug: "multan", province: "Punjab", profileCount: 9 }),
  base("city-peshawar", 6, {
    name: "Peshawar",
    slug: "peshawar",
    province: "Khyber Pakhtunkhwa",
    profileCount: 7,
  }),
  base("city-overseas", 7, {
    name: "Overseas families",
    slug: "overseas",
    province: "United Kingdom, Gulf, North America",
    profileCount: 26,
  }),
];
