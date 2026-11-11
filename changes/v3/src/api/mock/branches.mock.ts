/**
 * DUMMY DATA, replace with real data or API.
 * Branch names, numbers and addresses are placeholders. The office confirms the
 * final list before launch; nothing here should be read as a claim.
 */
import type { Branch } from "@/schemas/content.schema";
import { base } from "@/api/mock/records";

export const dummyBranches: Branch[] = [
  base("branch-lahore", 1, {
    name: "Gulberg office",
    city: "Lahore",
    address: "Office 2, 2nd Floor, Gulberg Business Centre, Main Boulevard, Lahore",
    whatsapp: "923001234567",
    phoneDisplay: "0300 1234567",
    phone: "924235712345",
    email: "lahore@ahde-rishta.example",
    hours: ["Monday to Saturday: 10:00 AM to 7:00 PM", "Sunday: closed"],
    mapsQuery: "Gulberg Business Centre Main Boulevard Lahore",
    isMain: true,
  }),
  base("branch-karachi", 2, {
    name: "Karachi desk",
    city: "Karachi",
    address: "Placeholder address, Shahrah-e-Faisal, Karachi",
    whatsapp: "923012345678",
    phoneDisplay: "0301 2345678",
    phone: "922134567890",
    email: "karachi@ahde-rishta.example",
    hours: ["Monday to Saturday: 11:00 AM to 7:00 PM", "Sunday: closed"],
    mapsQuery: "Shahrah-e-Faisal Karachi",
    isMain: false,
  }),
  base("branch-islamabad", 3, {
    name: "Islamabad desk",
    city: "Islamabad",
    address: "Placeholder address, Blue Area, Islamabad",
    whatsapp: "923021234567",
    phoneDisplay: "0302 1234567",
    phone: "92512345678",
    email: "islamabad@ahde-rishta.example",
    hours: ["Monday to Saturday: 11:00 AM to 7:00 PM", "Sunday: closed"],
    mapsQuery: "Blue Area Islamabad",
    isMain: false,
  }),
];
