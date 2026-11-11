import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Hash, RotateCcw, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  buildProfilesQuery,
  matchFilterSchema,
  type MatchFilterValues,
} from "@/schemas/matchFilter.schema";
import {
  casteOptions,
  cityOptions,
  countryOptions,
  educationOptions,
  genderOptions,
  maritalStatusOptions,
  religionOptions,
  sectOptions,
} from "@/lib/filterOptions";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { FormField, controlClass } from "@/components/forms/FormField";
import { ComboboxField, type ComboboxOption } from "@/components/forms/ComboboxField";

/** Prepend an "Any ..." choice so a filter can be cleared from the dropdown. */
const withAny = (options: { label: string; value: string }[], label: string): ComboboxOption[] => [
  { value: "", label },
  ...options,
];

const emptyFilters: MatchFilterValues = {
  gender: "",
  maritalStatus: "",
  city: "",
  country: "",
  religion: "",
  sect: "",
  education: "",
  caste: "",
  q: "",
};

export function FindMatchSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [idQuery, setIdQuery] = useState("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MatchFilterValues>({
    resolver: zodResolver(matchFilterSchema),
    defaultValues: emptyFilters,
  });

  const onSubmit = handleSubmit((values) => {
    trackEvent("search_submit", { source: "home_find_match" });
    const { ageFrom, ageTo, ...rest } = values;
    navigate(
      buildProfilesQuery({
        ...rest,
        ageFrom: ageFrom ? String(ageFrom) : undefined,
        ageTo: ageTo ? String(ageTo) : undefined,
      }),
    );
  });

  const onIdSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = idQuery.trim();
    if (!trimmed) return;
    trackEvent("search_submit", { source: "home_profile_id" });
    if (/^AER-\d{3,6}$/i.test(trimmed)) {
      navigate(`/profiles/${trimmed.toUpperCase()}`);
      return;
    }
    navigate(buildProfilesQuery({ q: trimmed }));
  };

  /* Ek hi grid mein saare filters: "More filters" toggle nahi, is liye dropdown
     kholne par layout nahi hilta aur sab kuch ek nazar mein mil jata hai. */
  const fields: {
    name: keyof MatchFilterValues;
    label: string;
    options: ComboboxOption[];
    placeholder: string;
    custom?: boolean;
  }[] = [
    {
      name: "gender",
      label: "Looking for",
      options: withAny(genderOptions, "Bride or groom"),
      placeholder: "Bride or groom",
      custom: true,
    },
    {
      name: "maritalStatus",
      label: "Marital status",
      options: withAny(maritalStatusOptions, "Any status"),
      placeholder: "Any status",
    },
    {
      name: "city",
      label: "City",
      options: withAny(cityOptions, "Any city"),
      placeholder: "Any city",
      custom: true,
    },
    {
      name: "country",
      label: "Country",
      options: withAny(countryOptions, "Any country"),
      placeholder: "Any country",
      custom: true,
    },
    {
      name: "religion",
      label: "Religion",
      options: withAny(religionOptions, "Any religion"),
      placeholder: "Any religion",
      custom: true,
    },
    {
      name: "sect",
      label: "Sect",
      options: withAny(sectOptions, "Any sect"),
      placeholder: "Any sect",
      custom: true,
    },
    {
      name: "education",
      label: "Education",
      options: withAny(educationOptions, "Any education"),
      placeholder: "Any education",
      custom: true,
    },
    {
      name: "caste",
      label: "Caste / biradari",
      options: withAny(casteOptions, "Any caste"),
      placeholder: "Any caste",
      custom: true,
    },
  ];

  return (
    <section aria-labelledby="find-match-heading" className="relative z-10 pt-10 sm:pt-14">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl border border-khaki-300/60 bg-white p-5 shadow-xl shadow-maroon-900/10 sm:p-7">
          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-maroon-600">
              Begin here
            </p>
            <h2
              id="find-match-heading"
              className="mt-1.5 font-heading text-2xl font-semibold text-maroon-800 sm:text-3xl"
            >
              {t("home.findMatchTitle")}
            </h2>
            <p className="mt-1 max-w-xl font-sans text-sm leading-6 text-muted-foreground">
              {t("home.findMatchDesc")}
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-6" noValidate>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  label={field.label}
                  htmlFor={`fm-${field.name}`}
                  error={errors[field.name]?.message}
                >
                  <Controller
                    name={field.name}
                    control={control}
                    render={({ field: controlled }) => (
                      <ComboboxField
                        id={`fm-${field.name}`}
                        options={field.options}
                        value={(controlled.value as string | undefined) ?? ""}
                        onChange={controlled.onChange}
                        onBlur={controlled.onBlur}
                        allowCustom={field.custom}
                        searchLabel={field.label}
                        placeholder={field.placeholder}
                      />
                    )}
                  />
                </FormField>
              ))}

              <FormField label="Age from" htmlFor="fm-age-from" error={errors.ageFrom?.message}>
                <input
                  id="fm-age-from"
                  type="number"
                  min={18}
                  max={70}
                  inputMode="numeric"
                  placeholder="18"
                  className={controlClass}
                  {...register("ageFrom")}
                />
              </FormField>
              <FormField label="Age to" htmlFor="fm-age-to" error={errors.ageTo?.message}>
                <input
                  id="fm-age-to"
                  type="number"
                  min={18}
                  max={70}
                  inputMode="numeric"
                  placeholder="45"
                  className={controlClass}
                  {...register("ageTo")}
                />
              </FormField>
              <FormField
                label="Name or profile ID"
                htmlFor="fm-q"
                className="sm:col-span-2 lg:col-span-2"
              >
                <input
                  id="fm-q"
                  type="search"
                  placeholder="e.g. Ayesha or AER-1042"
                  className={controlClass}
                  {...register("q")}
                />
              </FormField>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  reset(emptyFilters);
                  setIdQuery("");
                }}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-4 font-sans text-sm font-semibold text-maroon-800 transition-colors hover:bg-cream-100 focus-visible:ring-2 focus-visible:ring-maroon-700 focus-visible:outline-none"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                Reset
              </button>
              <Button type="submit" size="lg" disabled={isSubmitting}>
                <Search aria-hidden="true" />
                Show matches
              </Button>
            </div>
          </form>

          <form
            onSubmit={onIdSearch}
            className="mt-4 flex flex-col gap-2 rounded-2xl bg-cream-100/80 p-3 sm:flex-row sm:items-center"
          >
            <p className="flex items-center gap-2 font-sans text-xs leading-5 text-maroon-900/80 sm:flex-1">
              <Hash className="size-4 shrink-0 text-maroon-600" aria-hidden="true" />
              <span>
                <span className="font-semibold">Have a profile ID?</span> Enter it here, for example
                AER-1042 from a card shared by the office.
              </span>
            </p>
            <div className="flex gap-2">
              <label htmlFor="fm-profile-id" className="sr-only">
                Profile ID
              </label>
              <input
                id="fm-profile-id"
                value={idQuery}
                onChange={(event) => setIdQuery(event.target.value)}
                placeholder="AER-1042"
                className={cn(controlClass, "h-11 w-full sm:w-40")}
              />
              <Button type="submit" variant="secondary" size="sm" className="h-11 shrink-0">
                Find
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
