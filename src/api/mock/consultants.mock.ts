/** DUMMY DATA, replace with real data or API. Consultant names, photos and experience are placeholders. */
import type { Consultant } from "@/schemas/content.schema";
import { base } from "@/api/mock/records";
import teamOne from "@/assets/photos/team-1.jpg";
import teamTwo from "@/assets/photos/team-2.jpg";
import teamThree from "@/assets/photos/team-3.jpg";
import teamFour from "@/assets/photos/team-4.jpg";

export const dummyConsultants: Consultant[] = [
  base("consultant-1", 1, {
    name: "Uzma Siddiqui",
    role: "Senior consultant, Lahore",
    experience: "14 years with the bureau",
    languages: ["Urdu", "Punjabi", "English"],
    cities: ["Lahore", "Faisalabad", "Multan"],
    bio: "Uzma sits with every family before a proposal moves. She handles most of our second marriage cases and prefers a slow, quiet process.",
    photoUrl: teamTwo,
    focus: ["Second marriage", "Family meetings"],
    whatsapp: "923001234567",
    phoneDisplay: "0300 1234567",
  }),
  base("consultant-2", 2, {
    name: "Adeel Raza",
    role: "Consultant, Karachi",
    experience: "9 years with the bureau",
    languages: ["Urdu", "Sindhi", "English"],
    cities: ["Karachi", "Hyderabad", "Sukkur"],
    bio: "Adeel looks after the Karachi desk and works with families who are looking at proposals from the Gulf.",
    photoUrl: teamOne,
    focus: ["Overseas candidates", "Verification"],
    whatsapp: "923012345678",
    phoneDisplay: "0301 2345678",
  }),
  base("consultant-3", 3, {
    name: "Farah Naz",
    role: "Consultant, Islamabad",
    experience: "7 years with the bureau",
    languages: ["Urdu", "Punjabi", "Pashto"],
    cities: ["Islamabad", "Rawalpindi", "Peshawar"],
    bio: "Farah handles the northern desk. She speaks to candidates themselves, not only to the parents, before anything is shared.",
    photoUrl: teamThree,
    focus: ["Working candidates", "Counselling"],
    whatsapp: "923021234567",
    phoneDisplay: "0302 1234567",
  }),
  base("consultant-4", 4, {
    name: "Hamid Bukhari",
    role: "Overseas desk",
    experience: "11 years with the bureau",
    languages: ["Urdu", "English"],
    cities: ["United Kingdom", "United States", "Canada", "Gulf"],
    bio: "Hamid works the overseas clock. He takes calls in the evening so families abroad do not have to wake up early.",
    photoUrl: teamFour,
    focus: ["Overseas families", "Paperwork"],
    whatsapp: "923031234567",
    phoneDisplay: "0303 1234567",
  }),
];
