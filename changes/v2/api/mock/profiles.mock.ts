/**
 * DUMMY DATA, replace with real data or API.
 * Profiles are built deterministically so pagination, filters and sorting
 * behave like a real dataset. Photographs are free placeholder portraits from
 * randomuser.me. They are not real members and must be replaced with consented
 * photographs before launch.
 */
import type { Profile } from "@/schemas/profile.schema";

const femaleNames = [
  "Ayesha",
  "Fatima",
  "Hira",
  "Mahnoor",
  "Zainab",
  "Iqra",
  "Sana",
  "Maryam",
  "Noor",
  "Rabia",
  "Anam",
  "Sadia",
  "Laiba",
  "Komal",
  "Mehwish",
  "Sumaira",
  "Areeba",
  "Bushra",
  "Hafsa",
  "Sehrish",
  "Nida",
  "Aiman",
  "Tehreem",
  "Warda",
  "Iman",
  "Sanam",
  "Rida",
  "Aqsa",
  "Kinza",
  "Mehreen",
];

const maleNames = [
  "Ahmed",
  "Bilal",
  "Hamza",
  "Usman",
  "Fahad",
  "Zain",
  "Hasan",
  "Talha",
  "Saad",
  "Arsalan",
  "Kamran",
  "Umair",
  "Nauman",
  "Faizan",
  "Rehan",
  "Junaid",
  "Adnan",
  "Shahzeb",
  "Waqas",
  "Danish",
  "Irfan",
  "Nabeel",
  "Rizwan",
  "Sufyan",
  "Haris",
  "Moiz",
  "Owais",
  "Taimoor",
  "Zeeshan",
  "Anas",
];

const lastInitials = ["A.", "B.", "F.", "H.", "K.", "M.", "N.", "Q.", "R.", "S.", "T.", "Z."];

const castes = [
  "Arain",
  "Awan",
  "Bhatti",
  "Butt",
  "Chaudhry",
  "Gujjar",
  "Jat",
  "Kashmiri",
  "Malik",
  "Memon",
  "Mughal",
  "Niazi",
  "Paracha",
  "Qureshi",
  "Rajput",
  "Rana",
  "Rao",
  "Sheikh",
  "Syed",
];

const educations = [
  "Bachelors",
  "Masters",
  "MBBS / BDS",
  "Engineering (BE / BSc)",
  "CSS / PMS Qualified",
  "LLB",
  "Intermediate / A-Levels",
  "PhD",
  "Diploma / Certificate",
];

const occupationsByGender: Record<"male" | "female", string[]> = {
  male: [
    "Doctor",
    "Engineer",
    "Software Professional",
    "Government Officer",
    "Banker / Finance",
    "Business Owner",
    "Lawyer",
    "Pharmacist",
    "Teacher / Lecturer",
    "Army / Defence",
  ],
  female: [
    "Teacher / Lecturer",
    "Doctor",
    "Homemaker",
    "Software Professional",
    "Banker / Finance",
    "Pharmacist",
    "Student",
    "Business Owner",
    "Government Officer",
    "Doctor",
  ],
};

const incomes = [
  "Under PKR 50,000",
  "PKR 50,000 to 100,000",
  "PKR 100,000 to 200,000",
  "PKR 200,000 to 400,000",
  "Above PKR 400,000",
];

const pakistanLocations = [
  { city: "Lahore", country: "Pakistan" },
  { city: "Karachi", country: "Pakistan" },
  { city: "Islamabad", country: "Pakistan" },
  { city: "Faisalabad", country: "Pakistan" },
  { city: "Multan", country: "Pakistan" },
  { city: "Peshawar", country: "Pakistan" },
  { city: "Rawalpindi", country: "Pakistan" },
  { city: "Gujranwala", country: "Pakistan" },
  { city: "Sialkot", country: "Pakistan" },
  { city: "Hyderabad", country: "Pakistan" },
  { city: "Bahawalpur", country: "Pakistan" },
  { city: "Sargodha", country: "Pakistan" },
];

const overseasLocations = [
  { city: "London", country: "United Kingdom" },
  { city: "Manchester", country: "United Kingdom" },
  { city: "Birmingham", country: "United Kingdom" },
  { city: "New York", country: "United States" },
  { city: "Houston", country: "United States" },
  { city: "Chicago", country: "United States" },
  { city: "Toronto", country: "Canada" },
  { city: "Dubai", country: "United Arab Emirates" },
  { city: "Abu Dhabi", country: "United Arab Emirates" },
  { city: "Riyadh", country: "Saudi Arabia" },
  { city: "Doha", country: "Qatar" },
  { city: "Sydney", country: "Australia" },
  { city: "Melbourne", country: "Australia" },
  { city: "Berlin", country: "Germany" },
  { city: "Oslo", country: "Norway" },
];

const tongues = ["Urdu", "English", "Punjabi", "Sindhi", "Pashto", "Saraiki", "Hindko", "Kashmiri"];

const packageNames = ["Essential", "Select", "Premium", null, null, "Select"];

const aboutFemale = [
  "A practising Muslimah who values Salah, family time and quiet evenings at home. Currently working in a professional role while completing further studies.",
  "Family-oriented and soft-spoken, with a love for reading, cooking and hosting relatives. Looking for a respectful partnership built on deen and trust.",
  "Brought up in a close-knit household where elders are respected and decisions are made together. Enjoys teaching, calligraphy and travelling with family.",
  "A working professional who balances career with home responsibilities. Prefers a simple nikkah and a family that values kindness over display.",
];

const aboutMale = [
  "A God-fearing professional who prays regularly and supports his parents. Values honesty, patience and a calm household over extravagance.",
  "Raised in a family that believes in education for both sons and daughters. Enjoys cricket, reading and weekend trips with siblings.",
  "Settled in a stable career with plans to buy a home in the next two years. Looking for a companion who will be a partner in deen and dunya.",
  "Quiet, hardworking and family-first. Prefers a modest wedding and clear communication between both families.",
];

/** Deterministic pseudo-random generator so mock data never changes between builds. */
function createRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

/** Bundled placeholder portraits, six per gender, cycled so every card has a face. */
import femaleOne from "@/assets/photos/profile-f-1.jpg";
import femaleTwo from "@/assets/photos/profile-f-2.jpg";
import femaleThree from "@/assets/photos/profile-f-3.jpg";
import femaleFour from "@/assets/photos/profile-f-4.jpg";
import maleOne from "@/assets/photos/profile-m-1.jpg";
import maleTwo from "@/assets/photos/profile-m-2.jpg";
import maleThree from "@/assets/photos/profile-m-3.jpg";
import maleFour from "@/assets/photos/profile-m-4.jpg";

const femalePortraits = [femaleOne, femaleTwo, femaleThree, femaleFour];
const malePortraits = [maleOne, maleTwo, maleThree, maleFour];

function portrait(gender: "male" | "female", index: number): string {
  const pool = gender === "female" ? femalePortraits : malePortraits;
  return pool[index % pool.length];
}

function pad(value: number, size = 4): string {
  return String(value).padStart(size, "0");
}

function buildProfiles(count: number): Profile[] {
  const random = createRandom(20261109);
  const profiles: Profile[] = [];
  let womenSeen = 0;
  let menSeen = 0;

  for (let index = 0; index < count; index += 1) {
    const gender: "male" | "female" = index % 2 === 0 ? "female" : "male";
    const isOverseas = random() < 0.22;
    const location = isOverseas
      ? overseasLocations[Math.floor(random() * overseasLocations.length)]
      : pakistanLocations[Math.floor(random() * pakistanLocations.length)];

    const ageRoll = random();
    const age = ageRoll < 0.55 ? 22 + Math.floor(random() * 8) : 30 + Math.floor(random() * 12);

    const maritalRoll = random();
    const maritalStatus =
      maritalRoll < 0.74 ? "never-married" : maritalRoll < 0.9 ? "divorced" : "widowed";

    const name =
      gender === "female"
        ? femaleNames[Math.floor(random() * femaleNames.length)]
        : maleNames[Math.floor(random() * maleNames.length)];
    const displayName = `${name} ${lastInitials[Math.floor(random() * lastInitials.length)]}`;

    const heightCm =
      gender === "female" ? 145 + Math.floor(random() * 23) : 163 + Math.floor(random() * 26);

    // Most families allow a photograph. The rest show "Photograph on request".
    const photoVisible = random() < 0.88;
    const portraitIndex = gender === "female" ? womenSeen++ : menSeen++;

    const birthday = new Date();
    birthday.setFullYear(birthday.getFullYear() - age);
    birthday.setMonth(Math.floor(random() * 12));
    birthday.setDate(1 + Math.floor(random() * 27));

    const created = new Date();
    created.setDate(created.getDate() - Math.floor(random() * 90));

    const languageCount = 1 + Math.floor(random() * 3);
    const languages = Array.from(
      new Set([
        gender === "male" ? "English" : "Urdu",
        ...Array.from(
          { length: languageCount },
          () => tongues[Math.floor(random() * tongues.length)],
        ),
      ]),
    ).slice(0, 4);

    const cityIndexSeed = Math.floor(random() * 100);

    profiles.push({
      id: `AER-${pad(1041 + index)}`,
      isActive: true,
      sortOrder: index + 1,
      updatedAt: "2026-09-14T08:30:00.000Z",
      displayName,
      gender,
      age,
      dateOfBirth: birthday.toISOString().slice(0, 10),
      heightCm,
      maritalStatus,
      hasChildren: maritalStatus !== "never-married" && random() < 0.45,
      religion: "Islam",
      sect: random() < 0.82 ? "Sunni" : "Shia",
      caste: castes[cityIndexSeed % castes.length],
      education: educations[Math.floor(random() * educations.length)],
      occupation: occupationsByGender[gender][Math.floor(random() * 10)],
      income: incomes[Math.floor(random() * incomes.length)],
      city: location.city,
      country: location.country,
      languages,
      familyType: random() < 0.45 ? "joint" : "nuclear",
      about:
        gender === "female"
          ? aboutFemale[Math.floor(random() * aboutFemale.length)]
          : aboutMale[Math.floor(random() * aboutMale.length)],
      partnerDemands: {
        ageRange: `${Math.max(18, age - 4)} to ${age + 6} years`,
        heightRange: gender === "female" ? `5' 6" and above` : `5' 0" to 5' 8"`,
        maritalStatus: maritalStatus === "never-married" ? "Single preferred" : "Open to all",
        education: "Bachelors or above preferred",
        occupation: "Any respectable profession",
        city: isOverseas ? "Pakistan or same country" : location.city,
        notes: "A family that values deen, education and kindness. Simple wedding preferred.",
      },
      photoVisible,
      photoUrl: photoVisible ? portrait(gender, portraitIndex) : null,
      verified: random() < 0.9,
      packageName: packageNames[Math.floor(random() * packageNames.length)],
      featured: index % 7 === 0 || index % 11 === 0,
      createdAt: created.toISOString(),
    });
  }

  return profiles.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export const dummyProfiles: Profile[] = buildProfiles(96);
