import { z } from "zod";
import { httpRequest } from "@/api/http";
import { env } from "@/lib/env";
import { mockDelay } from "@/api/mock/delay";
import { paginatedSchema } from "@/schemas/common.schema";
import { profileSchema, type Profile, type ProfileFilters } from "@/schemas/profile.schema";
import {
  featuredProfiles,
  findProfile,
  latestProfiles,
  profilesByLocation,
  queryProfiles,
  secondMarriageProfiles,
  similarProfiles,
} from "@/api/mock/profiles.query";

const paginatedProfilesSchema = paginatedSchema(profileSchema);

function toQueryString(filters: ProfileFilters): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    params.set(key, String(value));
  });
  const query = params.toString();
  return query ? `?${query}` : "";
}

export interface ProfilesPage {
  items: Profile[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export async function getProfiles(
  filters: ProfileFilters,
  signal?: AbortSignal,
): Promise<ProfilesPage> {
  if (env.useMockApi) {
    await mockDelay(360, signal);
    return queryProfiles(filters);
  }
  return httpRequest(`/profiles${toQueryString(filters)}`, {
    schema: paginatedProfilesSchema,
    signal,
  });
}

export async function getProfileById(id: string, signal?: AbortSignal): Promise<Profile> {
  if (env.useMockApi) {
    await mockDelay(300, signal);
    const profile = findProfile(id);
    if (!profile) throw new Error("Profile not found");
    return profile;
  }
  return httpRequest(`/profiles/${encodeURIComponent(id)}`, { schema: profileSchema, signal });
}

export async function getProfilesByIds(ids: string[], signal?: AbortSignal): Promise<Profile[]> {
  if (ids.length === 0) return [];
  if (env.useMockApi) {
    await mockDelay(220, signal);
    return ids
      .map((id) => findProfile(id))
      .filter((profile): profile is Profile => Boolean(profile));
  }
  return httpRequest(`/profiles/by-ids?ids=${encodeURIComponent(ids.join(","))}`, {
    schema: z.array(profileSchema),
    signal,
  });
}

export async function getSimilarProfiles(
  profile: Profile,
  signal?: AbortSignal,
): Promise<Profile[]> {
  if (env.useMockApi) {
    await mockDelay(300, signal);
    return similarProfiles(profile);
  }
  return httpRequest(`/profiles/${encodeURIComponent(profile.id)}/similar`, {
    schema: z.array(profileSchema),
    signal,
  });
}

export async function getFeaturedProfiles(
  gender: "male" | "female",
  signal?: AbortSignal,
): Promise<Profile[]> {
  if (env.useMockApi) {
    await mockDelay(280, signal);
    return featuredProfiles(gender);
  }
  return httpRequest(`/profiles/featured?gender=${gender}`, {
    schema: z.array(profileSchema),
    signal,
  });
}

export async function getLatestProfiles(
  gender: "male" | "female",
  signal?: AbortSignal,
): Promise<Profile[]> {
  if (env.useMockApi) {
    await mockDelay(280, signal);
    return latestProfiles(gender);
  }
  return httpRequest(`/profiles/latest?gender=${gender}`, {
    schema: z.array(profileSchema),
    signal,
  });
}

export async function getSecondMarriageProfiles(
  maritalStatus: "divorced" | "widowed" | "all",
  signal?: AbortSignal,
): Promise<Profile[]> {
  if (env.useMockApi) {
    await mockDelay(280, signal);
    return secondMarriageProfiles(maritalStatus);
  }
  return httpRequest(`/profiles/second-marriage?maritalStatus=${maritalStatus}`, {
    schema: z.array(profileSchema),
    signal,
  });
}

export async function getProfilesByLocation(
  filter: { city?: string; country?: string },
  limit = 4,
  signal?: AbortSignal,
): Promise<Profile[]> {
  if (env.useMockApi) {
    await mockDelay(240, signal);
    return profilesByLocation(filter, limit);
  }
  const params = new URLSearchParams({ ...filter, limit: String(limit) });
  return httpRequest(`/profiles/by-location?${params.toString()}`, {
    schema: z.array(profileSchema),
    signal,
  });
}
