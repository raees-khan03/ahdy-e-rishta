import type { RegisterInput } from "@/schemas/register.schema";
import {
  casteSuggestions,
  citySuggestions,
  educationSuggestions,
  heightRegisterSuggestions,
  incomeSuggestions,
  occupationSuggestions,
  religionSuggestions,
  sectSuggestions,
} from "@/lib/filterOptions";

export type FieldName = Exclude<keyof RegisterInput, "declaration">;

export interface SelectOption {
  value: string;
  label: string;
}

interface FieldBase {
  name: FieldName;
  label: string;
  fullWidth?: boolean;
}

interface TextField extends FieldBase {
  kind: "text";
  placeholder: string;
  inputType?: "text" | "date" | "tel";
  inputMode?: "text" | "numeric" | "tel";
  autoComplete?: string;
}

/** Simple dropdown: user sirf list mein se chun sakta hai */
interface SelectField extends FieldBase {
  kind: "select";
  options: SelectOption[];
}

/** Searchable dropdown: allowCustom true ho to user apni value bhi likh sakta hai */
interface ComboboxFieldConfig extends FieldBase {
  kind: "combobox";
  options: SelectOption[];
  allowCustom: boolean;
}

interface TextareaField extends FieldBase {
  kind: "textarea";
  placeholder: string;
}

export type StepField = TextField | SelectField | ComboboxFieldConfig | TextareaField;

export interface RegisterStep {
  id: string;
  title: string;
  description: string;
  fields: StepField[];
}

// ------------------------------
// Option helpers
// ------------------------------

const toOptions = (items: string[]): SelectOption[] =>
  items.map((item) => ({ value: item, label: item }));

const withAny = (items: string[], label = "Any"): string[] => [label, ...items];

const numberOptions = (from: number, to: number, suffix = ""): SelectOption[] =>
  Array.from({ length: to - from + 1 }, (_, i) => {
    const text = `${from + i}${suffix}`;
    return { value: text, label: text };
  });

const disabilityList = [
  "None",
  "Hearing impairment",
  "Visual impairment",
  "Physical disability",
  "Other",
];

const jobNatureList = [
  "Permanent",
  "Contract",
  "Part-time",
  "Self-employed",
  "Daily wages",
  "Other",
];

const homeSizeList = [
  "Below 3 Marla",
  "3 Marla",
  "5 Marla",
  "7 Marla",
  "10 Marla",
  "1 Kanal",
  "2 Kanal",
  "Above 2 Kanal",
  "Apartment / Flat",
  "Other",
];

const nationalityList = [
  "Pakistani",
  "British",
  "American",
  "Canadian",
  "Australian",
  "Emirati",
  "Saudi",
  "Other",
];

const prefAgeList = [
  "Any",
  "18 - 22",
  "23 - 27",
  "28 - 32",
  "33 - 37",
  "38 - 42",
  "43 - 50",
  "Above 50",
];

// Siblings ki counts: 0 se 20
const countOptions = numberOptions(0, 20);

// ------------------------------
// Steps
// ------------------------------

export const registerSteps: RegisterStep[] = [
  {
    id: "personal",
    title: "Personal details",
    description: "Tell us a little about yourself.",
    fields: [
      {
        kind: "select",
        name: "gender",
        label: "Gender",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
      },
      {
        kind: "text",
        name: "fullName",
        label: "Full Name",
        placeholder: "Your full name",
        autoComplete: "name",
      },
      {
        kind: "text",
        name: "dateOfBirth",
        label: "Date of Birth",
        placeholder: "dd/mm/yyyy",
        inputType: "date",
      },
      {
        kind: "combobox",
        name: "height",
        label: "Height",
        options: toOptions(heightRegisterSuggestions), // 4'0" se 7'0" tak
        allowCustom: false,
      },
      {
        kind: "combobox",
        name: "weight",
        label: "Weight",
        options: numberOptions(40, 150, " kg"),
        allowCustom: false,
      },
      {
        kind: "combobox",
        name: "disability",
        label: "Disability (if any)",
        options: toOptions(disabilityList),
        allowCustom: true,
      },
      {
        kind: "select",
        name: "maritalStatus",
        label: "Marital Status",
        options: [
          { value: "never_married", label: "Single" },
          { value: "divorced", label: "Divorced" },
          { value: "widowed", label: "Widowed" },
          { value: "married", label: "Married" },
        ],
      },
    ],
  },
  {
    id: "career",
    title: "Education & career",
    description: "Your studies and work.",
    fields: [
      {
        kind: "combobox",
        name: "qualification",
        label: "Qualification",
        options: toOptions(educationSuggestions),
        allowCustom: true,
      },
      {
        kind: "text",
        name: "institution",
        label: "College/University",
        placeholder: "Institution name",
      },
      {
        kind: "combobox",
        name: "occupation",
        label: "Job / Business",
        options: toOptions(occupationSuggestions),
        allowCustom: true,
      },
      {
        kind: "select",
        name: "sector",
        label: "Govt or Private",
        options: [
          { value: "government", label: "Government" },
          { value: "private", label: "Private" },
          { value: "business", label: "Own business" },
        ],
      },
      {
        kind: "combobox",
        name: "jobNature",
        label: "Nature of Job",
        options: toOptions(jobNatureList),
        allowCustom: true,
      },
      {
        kind: "combobox",
        name: "monthlyIncome",
        label: "Monthly Income / Salary (PKR)",
        options: toOptions(incomeSuggestions),
        allowCustom: true,
      },
    ],
  },
  {
    id: "home",
    title: "Religion & home",
    description: "Your background and where you live.",
    fields: [
      {
        kind: "combobox",
        name: "religion",
        label: "Religion",
        options: toOptions(religionSuggestions),
        allowCustom: true,
      },
      {
        kind: "combobox",
        name: "sect",
        label: "Sect",
        options: toOptions(sectSuggestions),
        allowCustom: true,
      },
      {
        kind: "combobox",
        name: "caste",
        label: "Caste",
        options: toOptions(casteSuggestions),
        allowCustom: true,
      },
      {
        kind: "select",
        name: "homeOwnership",
        label: "Home Ownership",
        options: [
          { value: "owned", label: "Owned" },
          { value: "rented", label: "Rented" },
          { value: "family", label: "Family home" },
        ],
      },
      {
        kind: "combobox",
        name: "homeSize",
        label: "Home Size",
        options: toOptions(homeSizeList),
        allowCustom: true,
      },
      {
        kind: "text",
        name: "area",
        label: "Location / Area",
        placeholder: "Area / neighborhood",
      },
      {
        kind: "combobox",
        name: "city",
        label: "City",
        options: toOptions(citySuggestions),
        allowCustom: true,
      },
      {
        kind: "combobox",
        name: "nationality",
        label: "Nationality",
        options: toOptions(nationalityList),
        allowCustom: true,
      },
      {
        kind: "select",
        name: "vehicle",
        label: "Vehicle",
        options: [
          { value: "none", label: "None" },
          { value: "bike", label: "Bike" },
          { value: "car", label: "Car" },
          { value: "both", label: "Car and bike" },
        ],
      },
      {
        kind: "text",
        name: "otherProperties",
        label: "Other Properties",
        placeholder: "Any other properties / assets",
        fullWidth: true,
      },
    ],
  },
  {
    id: "family",
    title: "Family details",
    description: "A little about your family.",
    fields: [
      {
        kind: "text",
        name: "fatherName",
        label: "Father's Name",
        placeholder: "Father's full name",
      },
      {
        kind: "combobox",
        name: "fatherOccupation",
        label: "Father's Occupation",
        options: toOptions([...occupationSuggestions, "Late"]),
        allowCustom: true,
      },
      {
        kind: "combobox",
        name: "motherOccupation",
        label: "Mother's Occupation",
        options: toOptions(["Housewife", ...occupationSuggestions, "Late"]),
        allowCustom: true,
      },
      { kind: "select", name: "totalSiblings", label: "Total Siblings", options: countOptions },
      { kind: "select", name: "brothers", label: "Number of Brothers", options: countOptions },
      { kind: "select", name: "sisters", label: "Number of Sisters", options: countOptions },
      { kind: "select", name: "marriedBrothers", label: "Married Brothers", options: countOptions },
      { kind: "select", name: "marriedSisters", label: "Married Sisters", options: countOptions },
    ],
  },
  {
    id: "preferences",
    title: "Partner demands",
    description: "What you demand in a partner.",
    fields: [
      {
        kind: "combobox",
        name: "prefAge",
        label: "Age Limit",
        options: toOptions(prefAgeList),
        allowCustom: true,
      },
      {
        kind: "combobox",
        name: "prefHeight",
        label: "Height",
        options: toOptions(withAny(heightRegisterSuggestions)),
        allowCustom: true,
      },
      {
        kind: "combobox",
        name: "prefCaste",
        label: "Caste",
        options: toOptions(withAny(casteSuggestions, "Any / No bar")),
        allowCustom: true,
      },
      {
        kind: "combobox",
        name: "prefSect",
        label: "Sect / Maslak",
        options: toOptions(withAny(sectSuggestions)),
        allowCustom: true,
      },
      {
        kind: "combobox",
        name: "prefCity",
        label: "City",
        options: toOptions(withAny(citySuggestions)),
        allowCustom: true,
      },
      {
        kind: "combobox",
        name: "prefQualification",
        label: "Qualification",
        options: toOptions(withAny(educationSuggestions)),
        allowCustom: true,
      },
      {
        kind: "textarea",
        name: "otherRequirements",
        label: "Other Requirements",
        placeholder: "Family background, expectations, values...",
        fullWidth: true,
      },
    ],
  },
  {
    id: "contact",
    title: "Contact details",
    description: "How should we reach you?",
    fields: [
      {
        kind: "text",
        name: "phone",
        label: "Phone Number",
        placeholder: "+92 3XX XXXXXXX",
        inputType: "tel",
        inputMode: "tel",
        autoComplete: "tel",
      },
      {
        kind: "text",
        name: "whatsapp",
        label: "WhatsApp Number",
        placeholder: "+92 3XX XXXXXXX",
        inputType: "tel",
        inputMode: "tel",
      },
    ],
  },
];
