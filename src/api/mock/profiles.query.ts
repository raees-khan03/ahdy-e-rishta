/**
 * DUMMY DATA query helpers. Mirrors the filtering rules the real API will use.
 */
import type { Profile, ProfileFilters, ProfileSort } from "@/schemas/profile.schema";
import type { Paginated } from "@/schemas/common.schema";
import { dummyProfiles } from "@/api/mock/profiles.mock";

function matchesFilters(profile: Profile, filters: ProfileFilters): boolean {
  const {
    gender,
    maritalStatus,
    ageFrom,
    ageTo,
    heightFrom,
    heightTo,
    religion,
    sect,
    caste,
    education,
    occupation,
    income,
    city,
    country,
    language,
    familyType,
    q,
    category,
  } = filters;

  if (gender && profile.gender !== gender) return false;
  if (maritalStatus && profile.maritalStatus !== maritalStatus) return false;
  if (ageFrom && profile.age < ageFrom) return false;
  if (ageTo && profile.age > ageTo) return false;
  if (heightFrom && profile.heightCm < heightFrom) return false;
  if (heightTo && profile.heightCm > heightTo) return false;
  if (religion && profile.religion !== religion) return false;
  if (sect && profile.sect !== sect) return false;
  if (caste && profile.caste !== caste) return false;
  if (education && profile.education !== education) return false;
  if (occupation && profile.occupation !== occupation) return false;
  if (income && profile.income !== income) return false;
  if (city && profile.city !== city) return false;
  if (country && profile.country !== country) return false;
  if (language && !profile.languages.includes(language)) return false;
  if (familyType && profile.familyType !== familyType) return false;

  if (category === "featured" && !profile.featured) return false;
  if (category === "latest") {
    /* no extra filter, ordering handles it */
  }
  if (category === "second-marriage" && profile.maritalStatus === "never-married") return false;

  if (q) {
    const needle = q.toLowerCase();
    const haystack = [
      profile.id,
      profile.displayName,
      profile.city,
      profile.country,
      profile.occupation,
    ]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(needle)) return false;
  }

  return true;
}

function sortProfiles(profiles: Profile[], sort: ProfileSort = "newest"): Profile[] {
  const sorted = [...profiles];
  switch (sort) {
    case "age-asc":
      return sorted.sort((a, b) => a.age - b.age);
    case "age-desc":
      return sorted.sort((a, b) => b.age - a.age);
    case "height-asc":
      return sorted.sort((a, b) => a.heightCm - b.heightCm);
    case "height-desc":
      return sorted.sort((a, b) => b.heightCm - a.heightCm);
    default:
      return sorted.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }
}

export function queryProfiles(filters: ProfileFilters): Paginated<Profile> {
  const page = filters.page ?? 1;
  const pageSize = 12;
  const filtered = sortProfiles(
    dummyProfiles.filter((profile) => matchesFilters(profile, filters)),
    filters.sort,
  );
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: filtered.slice(start, start + pageSize),
    page: safePage,
    pageSize,
    total,
    totalPages,
  };
}

export function findProfile(id: string): Profile | undefined {
  return dummyProfiles.find((profile) => profile.id.toLowerCase() === id.toLowerCase());
}

export function similarProfiles(profile: Profile, limit = 6): Profile[] {
  return dummyProfiles
    .filter(
      (candidate) =>
        candidate.id !== profile.id &&
        candidate.gender === profile.gender &&
        (candidate.city === profile.city || candidate.caste === profile.caste),
    )
    .slice(0, limit);
}

export function featuredProfiles(gender: "male" | "female", limit = 8): Profile[] {
  return dummyProfiles.filter((p) => p.featured && p.gender === gender).slice(0, limit);
}

export function latestProfiles(gender: "male" | "female", limit = 8): Profile[] {
  return sortProfiles(dummyProfiles.filter((p) => p.gender === gender)).slice(0, limit);
}

export function secondMarriageProfiles(
  maritalStatus: "divorced" | "widowed" | "all",
  limit = 8,
): Profile[] {
  /* "all" = second marriage desk: divorced aur widowed dono. */
  const matches = (status: Profile["maritalStatus"]) =>
    maritalStatus === "all"
      ? status === "divorced" || status === "widowed"
      : status === maritalStatus;
  return dummyProfiles.filter((p) => matches(p.maritalStatus)).slice(0, limit);
}

export function profilesByLocation(
  filter: { city?: string; country?: string; region?: string },
  limit = 4,
): Profile[] {
  return dummyProfiles
    .filter((profile) => {
      if (filter.city) return profile.city === filter.city;
      if (filter.country) return profile.country === filter.country;
      return true;
    })
    .slice(0, limit);
}

export function profilesByCategory(category: "grooms" | "brides", limit = 8): Profile[] {
  return dummyProfiles
    .filter((p) => p.gender === (category === "grooms" ? "male" : "female"))
    .slice(0, limit);
}
