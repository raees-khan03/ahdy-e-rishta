import type { ProfileFilters } from "@/schemas/profile.schema";
import {
  casteOptions,
  cityOptions,
  countryOptions,
  educationOptions,
  familyTypeOptions,
  heightOptions,
  incomeOptions,
  languageOptions,
  maritalStatusOptions,
  occupationOptions,
  religionOptions,
  sectOptions,
} from "@/lib/filterOptions";

export interface FilterChip {
  key: keyof ProfileFilters;
  label: string;
}

function labelOf(options: { label: string; value: string }[], value: string | undefined): string {
  if (!value) return "";
  return options.find((option) => option.value === value)?.label ?? value;
}

function heightLabel(value: number | undefined): string {
  if (!value) return "";
  return heightOptions.find((option) => Number(option.value) === value)?.label ?? `${value} cm`;
}

/** Human-readable chips for the active filters shown above the results. */
export function buildFilterChips(filters: ProfileFilters): FilterChip[] {
  const chips: FilterChip[] = [];

  if (filters.q) chips.push({ key: "q", label: `Search: ${filters.q}` });
  if (filters.category === "featured") chips.push({ key: "category", label: "Featured only" });
  if (filters.category === "second-marriage")
    chips.push({ key: "category", label: "Second marriage" });
  if (filters.gender) {
    chips.push({ key: "gender", label: filters.gender === "male" ? "Groom" : "Bride" });
  }
  if (filters.maritalStatus) {
    chips.push({
      key: "maritalStatus",
      label: labelOf(maritalStatusOptions, filters.maritalStatus),
    });
  }
  if (filters.ageFrom || filters.ageTo) {
    chips.push({
      key: filters.ageFrom ? "ageFrom" : "ageTo",
      label: `Age ${filters.ageFrom ?? 18} to ${filters.ageTo ?? 80}`,
    });
  }
  if (filters.heightFrom || filters.heightTo) {
    chips.push({
      key: filters.heightFrom ? "heightFrom" : "heightTo",
      label: `Height ${heightLabel(filters.heightFrom) || "4' 0\""} to ${
        heightLabel(filters.heightTo) || "7' 0\""
      }`,
    });
  }
  if (filters.city) chips.push({ key: "city", label: labelOf(cityOptions, filters.city) });
  if (filters.country)
    chips.push({ key: "country", label: labelOf(countryOptions, filters.country) });
  if (filters.education)
    chips.push({ key: "education", label: labelOf(educationOptions, filters.education) });
  if (filters.occupation)
    chips.push({ key: "occupation", label: labelOf(occupationOptions, filters.occupation) });
  if (filters.income) chips.push({ key: "income", label: labelOf(incomeOptions, filters.income) });
  if (filters.religion)
    chips.push({ key: "religion", label: labelOf(religionOptions, filters.religion) });
  if (filters.sect) chips.push({ key: "sect", label: labelOf(sectOptions, filters.sect) });
  if (filters.caste) chips.push({ key: "caste", label: labelOf(casteOptions, filters.caste) });
  if (filters.language)
    chips.push({ key: "language", label: labelOf(languageOptions, filters.language) });
  if (filters.familyType) {
    chips.push({ key: "familyType", label: labelOf(familyTypeOptions, filters.familyType) });
  }

  return chips;
}
