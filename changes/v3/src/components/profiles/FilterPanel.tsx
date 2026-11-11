import { useEffect, useState } from "react";
import { RotateCcw, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProfileFilters } from "@/schemas/profile.schema";
import {
  casteOptions,
  cityOptions,
  countryOptions,
  educationOptions,
  familyTypeOptions,
  genderOptions,
  heightOptions,
  incomeOptions,
  languageOptions,
  maritalStatusOptions,
  occupationOptions,
  religionOptions,
  sectOptions,
} from "@/lib/filterOptions";
import { Button } from "@/components/ui/button";
import { FormField, controlClass } from "@/components/forms/FormField";
import { ComboboxField } from "@/components/forms/ComboboxField";
import { Separator } from "@/components/ui/separator";

export interface FilterPanelProps {
  filters: ProfileFilters;
  onChange: (patch: Record<string, string | number | undefined>) => void;
  onClearAll: () => void;
  activeCount: number;
  className?: string;
  /** The mobile sheet already renders a title, so the panel can skip its own. */
  showTitle?: boolean;
}

/** Prepend an "Any ..." choice so a filter can be cleared from the dropdown. */
const withAny = (options: { label: string; value: string }[], label: string) => [
  { value: "", label },
  ...options,
];

const numberOrUndefined = (value: string): number | undefined => {
  if (value.trim() === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

/** All profile filters. Shared by the desktop sidebar and the mobile sheet. */
export function FilterPanel({
  filters,
  onChange,
  onClearAll,
  activeCount,
  className,
  showTitle = true,
}: FilterPanelProps) {
  const [query, setQuery] = useState(filters.q ?? "");

  /* Age ko 18 se 70 ke darmiyan rakhte hain, aur ghalat value par saaf message. */
  const ageError =
    (filters.ageFrom !== undefined && (filters.ageFrom < 18 || filters.ageFrom > 70)) ||
    (filters.ageTo !== undefined && (filters.ageTo < 18 || filters.ageTo > 70))
      ? "Age must be between 18 and 70."
      : filters.ageFrom !== undefined &&
          filters.ageTo !== undefined &&
          filters.ageFrom > filters.ageTo
        ? "Minimum age must be less than maximum age."
        : null;

  useEffect(() => {
    setQuery(filters.q ?? "");
  }, [filters.q]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = query.trim();
      if (trimmed === (filters.q ?? "")) return;
      onChange({ q: trimmed || undefined });
    }, 400);
    return () => clearTimeout(timer);
  }, [query, filters.q, onChange]);

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <div>
        <div
          className={
            showTitle
              ? "flex items-center justify-between gap-2"
              : "flex items-center justify-end gap-2"
          }
        >
          {showTitle ? (
            <h2 className="font-heading text-lg font-semibold text-maroon-900">Filters</h2>
          ) : null}
          {activeCount > 0 ? (
            <Button variant="ghost" size="sm" onClick={onClearAll} className="text-maroon-700">
              <RotateCcw aria-hidden="true" /> Clear all
            </Button>
          ) : null}
        </div>
        <p className="mt-1 font-sans text-xs leading-5 text-muted-foreground">
          Every list is reviewed by a consultant. Filters help us prepare the right proposals.
        </p>
      </div>

      <FormField label="Search by name or profile ID" htmlFor="filter-q">
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-maroon-800/50"
          />
          <input
            id="filter-q"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. Ayesha or AER-1042"
            className={cn(controlClass, "ps-10")}
          />
        </div>
      </FormField>

      <Separator />

      <FormField label="Looking for" htmlFor="filter-gender">
        <ComboboxField
          id="filter-gender"
          options={withAny(genderOptions, "Bride or groom")}
          placeholder="Bride or groom"
          value={filters.gender ?? ""}
          onChange={(value) => onChange({ gender: value || undefined })}
        />
      </FormField>

      <FormField label="Marital status" htmlFor="filter-marital">
        <ComboboxField
          id="filter-marital"
          options={withAny(maritalStatusOptions, "Any status")}
          placeholder="Any status"
          value={filters.maritalStatus ?? ""}
          onChange={(value) => onChange({ maritalStatus: value || undefined })}
        />
      </FormField>

      <fieldset>
        <legend className="font-sans text-sm font-medium text-maroon-900">Age range</legend>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="filter-age-from" className="sr-only">
              Minimum age
            </label>
            <input
              id="filter-age-from"
              type="number"
              inputMode="numeric"
              min={18}
              max={70}
              placeholder="From 18"
              value={filters.ageFrom ?? ""}
              onChange={(event) => onChange({ ageFrom: numberOrUndefined(event.target.value) })}
              className={controlClass}
            />
          </div>
          <div>
            <label htmlFor="filter-age-to" className="sr-only">
              Maximum age
            </label>
            <input
              id="filter-age-to"
              type="number"
              inputMode="numeric"
              min={18}
              max={70}
              placeholder="To 60"
              value={filters.ageTo ?? ""}
              onChange={(event) => onChange({ ageTo: numberOrUndefined(event.target.value) })}
              className={controlClass}
            />
          </div>
        </div>
        {ageError ? (
          <p role="alert" className="mt-1.5 font-sans text-xs font-medium text-red-700">
            {ageError}
          </p>
        ) : null}
      </fieldset>

      <fieldset>
        <legend className="font-sans text-sm font-medium text-maroon-900">Height range</legend>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="filter-height-from" className="sr-only">
              Minimum height
            </label>
            <ComboboxField
              id="filter-height-from"
              options={withAny(heightOptions, "From")}
              placeholder="From"
              value={filters.heightFrom ? String(filters.heightFrom) : ""}
              onChange={(value) => onChange({ heightFrom: numberOrUndefined(value) })}
            />
          </div>
          <div>
            <label htmlFor="filter-height-to" className="sr-only">
              Maximum height
            </label>
            <ComboboxField
              id="filter-height-to"
              options={withAny(heightOptions, "To")}
              placeholder="To"
              value={filters.heightTo ? String(filters.heightTo) : ""}
              onChange={(value) => onChange({ heightTo: numberOrUndefined(value) })}
            />
          </div>
        </div>
      </fieldset>

      <FormField label="City" htmlFor="filter-city">
        <ComboboxField
          id="filter-city"
          options={withAny(cityOptions, "Any city")}
          placeholder="Any city"
          value={filters.city ?? ""}
          onChange={(value) => onChange({ city: value || undefined })}
        />
      </FormField>

      <FormField label="Country" htmlFor="filter-country">
        <ComboboxField
          id="filter-country"
          options={withAny(countryOptions, "Any country")}
          placeholder="Any country"
          value={filters.country ?? ""}
          onChange={(value) => onChange({ country: value || undefined })}
        />
      </FormField>

      <FormField label="Education" htmlFor="filter-education">
        <ComboboxField
          id="filter-education"
          options={withAny(educationOptions, "Any education")}
          placeholder="Any education"
          value={filters.education ?? ""}
          onChange={(value) => onChange({ education: value || undefined })}
        />
      </FormField>

      <FormField label="Occupation" htmlFor="filter-occupation">
        <ComboboxField
          id="filter-occupation"
          options={withAny(occupationOptions, "Any occupation")}
          placeholder="Any occupation"
          value={filters.occupation ?? ""}
          onChange={(value) => onChange({ occupation: value || undefined })}
        />
      </FormField>

      <FormField label="Monthly income" htmlFor="filter-income">
        <ComboboxField
          id="filter-income"
          options={withAny(incomeOptions, "Any income")}
          placeholder="Any income"
          value={filters.income ?? ""}
          onChange={(value) => onChange({ income: value || undefined })}
        />
      </FormField>

      <FormField label="Religion" htmlFor="filter-religion">
        <ComboboxField
          id="filter-religion"
          options={withAny(religionOptions, "Any religion")}
          placeholder="Any religion"
          value={filters.religion ?? ""}
          onChange={(value) => onChange({ religion: value || undefined })}
        />
      </FormField>

      <FormField label="Sect" htmlFor="filter-sect">
        <ComboboxField
          id="filter-sect"
          options={withAny(sectOptions, "Any sect")}
          placeholder="Any sect"
          value={filters.sect ?? ""}
          onChange={(value) => onChange({ sect: value || undefined })}
        />
      </FormField>

      <FormField label="Caste / biradari" htmlFor="filter-caste">
        <ComboboxField
          id="filter-caste"
          options={withAny(casteOptions, "Any caste")}
          placeholder="Any caste"
          value={filters.caste ?? ""}
          onChange={(value) => onChange({ caste: value || undefined })}
        />
      </FormField>

      <FormField label="Language" htmlFor="filter-language">
        <ComboboxField
          id="filter-language"
          options={withAny(languageOptions, "Any language")}
          placeholder="Any language"
          value={filters.language ?? ""}
          onChange={(value) => onChange({ language: value || undefined })}
        />
      </FormField>

      <FormField label="Family type" htmlFor="filter-family">
        <ComboboxField
          id="filter-family"
          options={withAny(familyTypeOptions, "Any family type")}
          placeholder="Any family type"
          value={filters.familyType ?? ""}
          onChange={(value) => onChange({ familyType: value || undefined })}
        />
      </FormField>
    </div>
  );
}
