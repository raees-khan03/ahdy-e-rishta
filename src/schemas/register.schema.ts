import { z } from "zod";

export const MIN_AGE = 18;
export const MAX_AGE = 70;

/** Height strings look like 5'7". Allowed range is 4'0" to 7'0". */
const HEIGHT_PATTERN = /^([4-7])'(\d{1,2})"$/;
/** Weight strings look like 62 kg. Allowed range is 40 to 150 kg. */
const WEIGHT_PATTERN = /^(\d{2,3}) kg$/;

const phone = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .transform((value) => value.replace(/[\s()-]/g, ""))
  .refine((value) => /^(?:\+92|0092|92|0)3\d{9}$/.test(value), {
    message: "Enter a valid mobile number, for example 0300 1234567",
  });

function ageOn(dateOfBirth: string, today = new Date()): number {
  const dob = new Date(dateOfBirth);
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) age -= 1;
  return age;
}

function isTodayOrFuture(value: string): boolean {
  const dob = new Date(`${value}T00:00:00`);
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return dob.getTime() >= startOfToday.getTime();
}

const required = (message: string) => z.string().trim().min(1, message);

export const registerSchema = z
  .object({
    /* Step 1: personal details */
    gender: required("Please select gender"),
    fullName: z
      .string()
      .trim()
      .min(1, "Full name is required")
      .min(3, "Please write the full name")
      .max(80, "Name is too long"),
    dateOfBirth: z
      .string()
      .min(1, "Date of birth is required")
      .refine((value) => !Number.isNaN(new Date(`${value}T00:00:00`).getTime()), {
        message: "Please pick a valid date",
      })
      .refine((value) => !isTodayOrFuture(value), {
        message: "Date of birth cannot be today or a future date",
      })
      .refine((value) => ageOn(value) >= MIN_AGE, {
        message: `The candidate must be at least ${MIN_AGE} years old`,
      })
      .refine((value) => ageOn(value) <= MAX_AGE, {
        message: `Please contact the office for ages above ${MAX_AGE}`,
      }),
    height: required("Please select height").refine(
      (value) => value === "" || HEIGHT_PATTERN.test(value),
      { message: "Pick a height between 4'0\" and 7'0\"" },
    ),
    weight: required("Please select weight").refine(
      (value) => {
        if (value === "") return true;
        const match = WEIGHT_PATTERN.exec(value);
        if (!match) return false;
        const kg = Number(match[1]);
        return kg >= 40 && kg <= 150;
      },
      { message: "Weight should be between 40 kg and 150 kg" },
    ),
    disability: required("Please select an option or write None"),
    maritalStatus: required("Please select marital status"),

    /* Step 2: education and career */
    qualification: required("Qualification is required"),
    institution: z
      .string()
      .trim()
      .max(120, "Institution name is too long")
      .optional()
      .or(z.literal("")),
    occupation: required("Occupation is required"),
    sector: required("Please select government or private"),
    jobNature: required("Please select nature of job"),
    monthlyIncome: required("Monthly income is required"),

    /* Step 3: religion and home */
    religion: required("Please select religion"),
    sect: required("Please select sect"),
    caste: required("Caste is required"),
    homeOwnership: required("Please select home ownership"),
    homeSize: required("Please select home size"),
    area: z.string().trim().max(120, "Area is too long").optional().or(z.literal("")),
    city: required("Please select city"),
    nationality: required("Please select nationality"),
    vehicle: required("Please select vehicle"),
    otherProperties: z
      .string()
      .trim()
      .max(200, "Please keep this under 200 characters")
      .optional()
      .or(z.literal("")),

    /* Step 4: family details */
    fatherName: z.string().trim().min(1, "Father's name is required").max(80, "Name is too long"),
    fatherOccupation: required("Father's occupation is required"),
    motherOccupation: required("Mother's occupation is required"),
    totalSiblings: required("Please select total siblings"),
    brothers: required("Please select number of brothers"),
    sisters: required("Please select number of sisters"),
    marriedBrothers: required("Please select married brothers"),
    marriedSisters: required("Please select married sisters"),

    /* Step 5: partner demands */
    prefAge: required("Please select a preferred age"),
    prefHeight: required("Please select a preferred height"),
    prefCaste: required("Please select a preferred caste"),
    prefSect: required("Please select a preferred sect"),
    prefCity: required("Please select a preferred city"),
    prefQualification: required("Please select a preferred qualification"),
    otherRequirements: z
      .string()
      .trim()
      .max(600, "Please keep this under 600 characters")
      .optional()
      .or(z.literal("")),

    /* Step 6: contact */
    phone,
    whatsapp: phone,

    declaration: z.literal(true, {
      errorMap: () => ({ message: "Please tick the declaration before submitting" }),
    }),
  })
  .superRefine((values, ctx) => {
    const total = Number(values.totalSiblings);
    const brothers = Number(values.brothers);
    const sisters = Number(values.sisters);

    if (values.totalSiblings !== "" && values.brothers !== "" && values.sisters !== "") {
      if (brothers + sisters !== total) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["totalSiblings"],
          message: `Brothers and sisters add up to ${brothers + sisters}, so total siblings should be ${brothers + sisters}`,
        });
      }
    }

    if (values.marriedBrothers !== "" && values.brothers !== "") {
      if (Number(values.marriedBrothers) > brothers) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["marriedBrothers"],
          message: "Married brothers cannot be more than total brothers",
        });
      }
    }

    if (values.marriedSisters !== "" && values.sisters !== "") {
      if (Number(values.marriedSisters) > sisters) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["marriedSisters"],
          message: "Married sisters cannot be more than total sisters",
        });
      }
    }

    if (values.phone !== "" && values.whatsapp !== "" && values.phone === values.whatsapp) {
      // Same number on both fields is fine; nothing to report.
    }
  });

export type RegisterInput = z.input<typeof registerSchema>;
export type RegisterOutput = z.output<typeof registerSchema>;

export function ageFromDate(dateOfBirth: string): number {
  return ageOn(dateOfBirth);
}
