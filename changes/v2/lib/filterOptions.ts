/** DUMMY DATA, replace with real data or API. Option lists used across filters and forms. */
import { City, Country } from "country-state-city";

export interface Option {
  label: string;
  value: string;
}

export const genderOptions: Option[] = [
  { label: "Groom (male)", value: "male" },
  { label: "Bride (female)", value: "female" },
];

export const maritalStatusOptions: Option[] = [
  { label: "Single", value: "never-married" },
  { label: "Divorced", value: "divorced" },
  { label: "Widowed", value: "widowed" },
];

export const familyTypeOptions: Option[] = [
  { label: "Nuclear family", value: "nuclear" },
  { label: "Joint family", value: "joint" },
];

export const religionOptions: Option[] = [
  "Islam",
  "Christianity",
  "Hinduism",
  "Sikhism",
  "Buddhism",
  "Judaism",
  "Jainism",
  "Zoroastrianism",
  "Other",
  "Prefer not to say",
].map((v) => ({ label: v, value: v }));

export const sectOptions: Option[] = [
  "Sunni",
  "Shia",
  "Deobandi",
  "Barelvi",
  "Ahl-e-Hadith",
  "Ismaili",
  "Bohra",
  "Salafi",
  "Catholic",
  "Protestant",
  "Orthodox",
  "No sect",
  "Other",
  "Prefer not to say",
].map((v) => ({ label: v, value: v }));

/** Common biradari names, plus an opt-out for families who do not filter on caste. */
const casteList = [
  "Arain",
  "Awan",
  "Abbasi",
  "Ansari",
  "Bhatti",
  "Butt",
  "Bajwa",
  "Baloch",
  "Chaudhry",
  "Cheema",
  "Dar",
  "Dhund",
  "Gujjar",
  "Gakhar",
  "Hashmi",
  "Hussaini",
  "Jat",
  "Jutt",
  "Jadoon",
  "Kamboh",
  "Kashmiri",
  "Kayani",
  "Khan",
  "Khatri",
  "Khokhar",
  "Khwaja",
  "Lodhi",
  "Malik",
  "Memon",
  "Minhas",
  "Mirza",
  "Mughal",
  "Niazi",
  "Paracha",
  "Pathan",
  "Qureshi",
  "Rajput",
  "Rana",
  "Rao",
  "Rathore",
  "Ranjha",
  "Sial",
  "Siddiqui",
  "Sheikh",
  "Sindhi",
  "Sipra",
  "Solangi",
  "Syed",
  "Tarar",
  "Tareen",
  "Tiwana",
  "Usmani",
  "Warraich",
  "Wattoo",
  "Other",
  "No caste bar",
];

export const casteOptions: Option[] = casteList.map((v) => ({ label: v, value: v }));

export const educationOptions: Option[] = [
  "No formal education",
  "Primary",
  "Middle",
  "Matric",
  "O Levels",
  "Intermediate",
  "FA",
  "FSc (Pre-Medical)",
  "FSc (Pre-Engineering)",
  "A Levels",
  "Bachelors",
  "BA",
  "BSc",
  "BCom",
  "BBA",
  "BS",
  "Masters",
  "MA",
  "MSc",
  "MBA",
  "MS",
  "MPhil",
  "PhD",
  "MBBS",
  "BDS",
  "LLB",
  "LLM",
  "CA",
  "ACCA",
  "CSS / PMS qualified",
  "Diploma or certificate",
  "Other",
].map((v) => ({ label: v, value: v }));

export const occupationOptions: Option[] = [
  "Doctor",
  "Dentist",
  "Engineer",
  "Software professional",
  "Teacher",
  "Lecturer or professor",
  "Government officer",
  "Army or defence",
  "Police officer",
  "Lawyer",
  "Banker or finance",
  "Accountant",
  "Pharmacist",
  "Nurse",
  "Business owner",
  "Shopkeeper",
  "Landlord or farmer",
  "Journalist",
  "Designer",
  "Skilled worker",
  "Driver",
  "Student",
  "Homemaker",
  "Not working",
  "Other",
].map((v) => ({ label: v, value: v }));

export const incomeOptions: Option[] = [
  "Under PKR 50,000",
  "PKR 50,000 to 100,000",
  "PKR 100,000 to 200,000",
  "PKR 200,000 to 300,000",
  "PKR 300,000 to 400,000",
  "PKR 400,000 to 600,000",
  "Above PKR 600,000",
  "Prefer not to say",
].map((v) => ({ label: v, value: v }));

export const languageOptions: Option[] = [
  "Urdu",
  "English",
  "Punjabi",
  "Sindhi",
  "Pashto",
  "Balochi",
  "Brahvi",
  "Saraiki",
  "Hindko",
  "Kashmiri",
  "Shina",
  "Balti",
  "Arabic",
  "Persian",
  "Other",
].map((v) => ({ label: v, value: v }));

const majorPakistaniCities = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Gujranwala",
  "Sialkot",
  "Hyderabad",
  "Bahawalpur",
  "Sargodha",
  "Abbottabad",
  "Sukkur",
  "Mirpur (AJK)",
];

/** Every city the library knows for Pakistan, after the big ones, without repeats. */
const libraryPakistaniCities = (City.getCitiesOfCountry("PK") ?? [])
  .map((city) => city.name)
  .filter((name, index, all) => all.indexOf(name) === index)
  .sort((a, b) => a.localeCompare(b));

export const pakistaniCities: Option[] = [
  ...majorPakistaniCities,
  ...libraryPakistaniCities.filter((name) => !majorPakistaniCities.includes(name)),
].map((v) => ({ label: v, value: v }));

export const overseasCities: Option[] = [
  "London",
  "Manchester",
  "Birmingham",
  "New York",
  "Houston",
  "Chicago",
  "Toronto",
  "Dubai",
  "Abu Dhabi",
  "Riyadh",
  "Doha",
  "Sydney",
  "Melbourne",
  "Berlin",
  "Oslo",
  "Milan",
].map((v) => ({ label: v, value: v }));

export const cityOptions: Option[] = [...pakistaniCities, ...overseasCities].sort((a, b) =>
  a.label.localeCompare(b.label),
);

/** Countries our families actually ask about, in the order they ask. */
const countriesFamiliesAskAbout = [
  "Pakistan",
  "United Kingdom",
  "United States",
  "Canada",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Oman",
  "Kuwait",
  "Bahrain",
  "Australia",
  "Germany",
  "Norway",
  "Sweden",
  "Denmark",
  "Netherlands",
  "Ireland",
  "Italy",
  "Spain",
  "France",
  "New Zealand",
  "Singapore",
  "Malaysia",
  "Turkey",
  "South Africa",
];

const otherCountries = Country.getAllCountries()
  .map((country) => country.name)
  .filter((name) => !countriesFamiliesAskAbout.includes(name))
  .sort((a, b) => a.localeCompare(b));

export const countryOptions: Option[] = [
  ...countriesFamiliesAskAbout,
  ...otherCountries,
  "Other",
].map((v) => ({ label: v, value: v }));

export const heightOptions: Option[] = Array.from({ length: 19 }, (_, index) => {
  const totalInches = 48 + index; // 4'0" → 7'0"
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  const cm = Math.round(totalInches * 2.54);
  return { label: `${feet}' ${inches}"`, value: String(cm) };
});

/** Grouped city tabs for the home "proposals by city" section. */
export const homeCityTabs = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Faisalabad",
  "Multan",
  "Peshawar",
] as const;

export const homeOverseasTabs = ["USA", "UK", "Canada", "Gulf", "Europe", "Australia"] as const;

export const overseasTabQuery: Record<(typeof homeOverseasTabs)[number], string> = {
  USA: "United States",
  UK: "United Kingdom",
  Canada: "Canada",
  Gulf: "United Arab Emirates",
  Europe: "Germany",
  Australia: "Australia",
};

/* ------------------------------------------------------------------
   Plain string lists. The register form builds its own options from these.
   ------------------------------------------------------------------ */

const values = (options: Option[]): string[] => options.map((option) => option.value);

export const religionSuggestions: string[] = values(religionOptions);
export const sectSuggestions: string[] = values(
  sectOptions.filter((o) => o.value !== "Prefer not to say"),
);
export const casteSuggestions: string[] = values(casteOptions);
export const educationSuggestions: string[] = values(educationOptions);
export const occupationSuggestions: string[] = values(occupationOptions);
export const incomeSuggestions: string[] = values(incomeOptions);
export const citySuggestions: string[] = values(pakistaniCities);
export const countrySuggestions: string[] = values(countryOptions);

/** Heights every inch from 4'0" to 7'0", used by the register form. */
export const heightRegisterSuggestions: string[] = Array.from({ length: 37 }, (_, index) => {
  const totalInches = 48 + index;
  return `${Math.floor(totalInches / 12)}'${totalInches % 12}"`;
});
