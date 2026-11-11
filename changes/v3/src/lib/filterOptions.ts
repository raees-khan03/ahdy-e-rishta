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
  { label: "Married", value: "married" },
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
/* Pakistani biradaris aur caste names, alphabetical. Search box se koi bhi mil jata hai,
   aur jo naam list mein na ho wo "Use \"...\"" se khud likha ja sakta hai. */
const casteList = [
  "Abbasi",
  "Afridi",
  "Ahmad",
  "Akhtar",
  "Alvi",
  "Ansari",
  "Arain",
  "Arbab",
  "Awan",
  "Aziz",
  "Bajwa",
  "Baloch",
  "Bhatti",
  "Bhutta",
  "Bughio",
  "Burkī",
  "Butt",
  "Chandio",
  "Chaudhry",
  "Cheema",
  "Chishti",
  "Dar",
  "Daudzai",
  "Dawar",
  "Dhillon",
  "Dogar",
  "Dhund",
  "Farooqi",
  "Gabol",
  "Gakhar",
  "Gardezi",
  "Ghauri",
  "Ghumman",
  "Gilani",
  "Gill",
  "Gondal",
  "Gujjar",
  "Gul",
  "Hashmi",
  "Hassan",
  "Hussaini",
  "Indhar",
  "Jadoon",
  "Jamali",
  "Jat",
  "Jatoi",
  "Jutt",
  "Kamboh",
  "Kasi",
  "Kasuri",
  "Kayani",
  "Kazmi",
  "Khakwani",
  "Khan",
  "Kharal",
  "Khatri",
  "Khattak",
  "Khokhar",
  "Khuhro",
  "Khwaja",
  "Kiyani",
  "Laghari",
  "Langah",
  "Lashari",
  "Leghari",
  "Lodhi",
  "Lone",
  "Magsi",
  "Malik",
  "Mangi",
  "Marwat",
  "Mazari",
  "Memon",
  "Mengal",
  "Minhas",
  "Mir",
  "Mirza",
  "Mughal",
  "Naich",
  "Narejo",
  "Nasir",
  "Niazi",
  "Nizamani",
  "Panhwar",
  "Paracha",
  "Pasha",
  "Pathan",
  "Piracha",
  "Qazi",
  "Qureshi",
  "Rabbani",
  "Rajput",
  "Rana",
  "Ranjha",
  "Rao",
  "Rathore",
  "Rind",
  "Rizvi",
  "Sadozai",
  "Sahi",
  "Sardar",
  "Shah",
  "Shaikh",
  "Sheikh",
  "Sherwani",
  "Sial",
  "Siddiqui",
  "Sindhi",
  "Sipra",
  "Solangi",
  "Soomro",
  "Syed",
  "Talpur",
  "Tarar",
  "Tareen",
  "Tiwana",
  "Tunio",
  "Usmani",
  "Uttra",
  "Virk",
  "Warraich",
  "Wattoo",
  "Wazir",
  "Yousafzai",
  "Zaidi",
  "Zardari",
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
  "Diploma or certificate",
  "Madrasa / Dars-e-Nizami",
  "Hafiz-e-Quran",
  "Bachelors",
  "BA",
  "BSc",
  "BCom",
  "BBA",
  "BS",
  "B.Ed",
  "BCS",
  "BS Computer Science",
  "BS Engineering",
  "B.Tech",
  "B.Arch",
  "Pharm-D",
  "DPT",
  "MBBS",
  "BDS",
  "LLB",
  "Masters",
  "MA",
  "MSc",
  "MBA",
  "MS",
  "M.Ed",
  "MPhil",
  "LLM",
  "PhD",
  "CA",
  "ACCA",
  "CSS / PMS qualified",
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
  "Chartered accountant",
  "Consultant",
  "Civil servant",
  "HR professional",
  "Sales professional",
  "Pilot",
  "Imam or religious scholar",
  "Tailor",
  "Chef",
  "Overseas worker",
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
