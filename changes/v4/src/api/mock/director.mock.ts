/** DUMMY DATA, replace with real data or API. Director name, photo and message are placeholders. */
import type { DirectorMessage } from "@/schemas/content.schema";
import { base } from "@/api/mock/records";
import directorPhoto from "@/assets/photos/director.jpg";

export const dummyDirectorMessage: DirectorMessage = base("director", 1, {
  name: "Muhammad Faheem Iqbal",
  role: "Founder and Director",
  photoUrl: directorPhoto,
  quote:
    "A rishta is not a transaction. It is an amanat, something placed in your care. We try to remember that in every phone call.",
  paragraphs: [
    "Ahd-e-Rishta began because too many families were pushing their children through apps and anonymous directories with nobody to ask. Parents were sharing photographs with strangers and hoping for the best.",
    "We built a small bureau instead. Every family speaks to a named consultant. Every detail is checked before it is shared. A profile can be removed the day you ask for it.",
    "If we think a proposal is not right for you, we will say so, politely and plainly. That is the whole promise.",
  ],
  signOff: "",
});
