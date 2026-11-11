import { registerSteps, type StepField } from "@/components/forms/registerSteps";
import type { RegisterOutput } from "@/schemas/register.schema";

const STORAGE_KEY = "ahd-e-rishta:last-registration";

/** Dropdowns store a value like "never_married", so show the label instead */
function displayValue(field: StepField, value: string): string {
  if (field.kind !== "select") return value;
  return field.options.find((option) => option.value === value)?.label ?? value;
}

/** One labelled line per field, grouped by step */
export function buildRegistrationMessage(values: RegisterOutput): string {
  const lines: string[] = [
    "Assalam-o-Alaikum, I have just filled the registration form on Ahd-e-Rishta. My details:",
    "",
  ];

  for (const step of registerSteps) {
    lines.push(`*${step.title}*`);
    for (const field of step.fields) {
      const value = displayValue(field, values[field.name] ?? "").trim();
      lines.push(`${field.label}: ${value || "-"}`);
    }
    lines.push("");
  }

  return lines.join("\n").trim();
}

/** Keeps a copy in this browser. Storage can be blocked (private mode), so failures are ignored. */
export function saveRegistrationLocally(values: RegisterOutput): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ savedAt: new Date().toISOString(), values }),
    );
  } catch {
    // The WhatsApp message still carries all the data.
  }
}

export function readLastRegistration(): { savedAt: string; values: RegisterOutput } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as { savedAt: string; values: RegisterOutput }) : null;
  } catch {
    return null;
  }
}
