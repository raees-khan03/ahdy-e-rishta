import { useQuery } from "@tanstack/react-query";
import { getHeroSlides } from "@/api/heroSlides.api";
import { getStats } from "@/api/stats.api";
import { getPlans } from "@/api/plans.api";
import { getConsultants } from "@/api/consultants.api";
import { getBranches } from "@/api/branches.api";
import { getSuccessStories } from "@/api/successStories.api";
import { getVideos } from "@/api/videos.api";
import { getFaqs } from "@/api/faqs.api";
import { getPosts, getPostBySlug } from "@/api/posts.api";
import { getServices, getServiceBySlug } from "@/api/services.api";
import { getTrustItems } from "@/api/trustItems.api";
import { getCities } from "@/api/cities.api";
import { getTestimonials } from "@/api/testimonials.api";
import { getDirectorMessage } from "@/api/directorMessage.api";
import { getProcessSteps } from "@/api/processSteps.api";
import { getVerificationSteps } from "@/api/verificationSteps.api";
import { getSafetyTips } from "@/api/safetyTips.api";
import { getMilestones } from "@/api/milestones.api";
import { getCategories } from "@/api/categories.api";
import { getLegalPage, type LegalSlug } from "@/api/legalPages.api";
import { getMyInterests } from "@/api/interests.api";
import {
  getFeaturedProfiles,
  getLatestProfiles,
  getProfileById,
  getProfiles,
  getProfilesByIds,
  getProfilesByLocation,
  getSecondMarriageProfiles,
  getSimilarProfiles,
} from "@/api/profiles.api";
import type { Profile, ProfileFilters } from "@/schemas/profile.schema";

export const queryKeys = {
  heroSlides: ["hero-slides"] as const,
  stats: ["stats"] as const,
  plans: ["plans"] as const,
  consultants: ["consultants"] as const,
  branches: ["branches"] as const,
  successStories: ["success-stories"] as const,
  videos: ["videos"] as const,
  faqs: ["faqs"] as const,
  posts: ["posts"] as const,
  post: (slug: string) => ["posts", slug] as const,
  services: ["services"] as const,
  trustItems: ["trust-items"] as const,
  cities: ["cities"] as const,
  testimonials: ["testimonials"] as const,
  directorMessage: ["director-message"] as const,
  processSteps: ["process-steps"] as const,
  verificationSteps: ["verification-steps"] as const,
  safetyTips: ["safety-tips"] as const,
  milestones: ["milestones"] as const,
  categories: ["categories"] as const,
  legalPage: (slug: LegalSlug) => ["legal-page", slug] as const,
  myInterests: ["me", "interests"] as const,
  service: (slug: string) => ["services", slug] as const,
  profiles: (filters: ProfileFilters) => ["profiles", filters] as const,
  profile: (id: string) => ["profile", id] as const,
  similarProfiles: (id: string) => ["profiles", id, "similar"] as const,
  featured: (gender: "male" | "female") => ["profiles", "featured", gender] as const,
  latest: (gender: "male" | "female") => ["profiles", "latest", gender] as const,
  secondMarriage: (status: "divorced" | "widowed" | "all") =>
    ["profiles", "second-marriage", status] as const,
  byLocation: (key: string) => ["profiles", "location", key] as const,
  byIds: (ids: string[]) => ["profiles", "by-ids", ids.join(",")] as const,
};

export function useHeroSlides() {
  return useQuery({
    queryKey: queryKeys.heroSlides,
    queryFn: ({ signal }) => getHeroSlides(signal),
  });
}

export function useStats() {
  return useQuery({ queryKey: queryKeys.stats, queryFn: ({ signal }) => getStats(signal) });
}

export function usePlans() {
  return useQuery({ queryKey: queryKeys.plans, queryFn: ({ signal }) => getPlans(signal) });
}

export function useConsultants() {
  return useQuery({
    queryKey: queryKeys.consultants,
    queryFn: ({ signal }) => getConsultants(signal),
  });
}

export function useBranches() {
  return useQuery({
    queryKey: queryKeys.branches,
    queryFn: ({ signal }) => getBranches(signal),
  });
}

export function useSuccessStories() {
  return useQuery({
    queryKey: queryKeys.successStories,
    queryFn: ({ signal }) => getSuccessStories(signal),
  });
}

export function useVideos() {
  return useQuery({ queryKey: queryKeys.videos, queryFn: ({ signal }) => getVideos(signal) });
}

export function useFaqs() {
  return useQuery({ queryKey: queryKeys.faqs, queryFn: ({ signal }) => getFaqs(signal) });
}

export function usePosts() {
  return useQuery({ queryKey: queryKeys.posts, queryFn: ({ signal }) => getPosts(signal) });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: queryKeys.post(slug),
    queryFn: ({ signal }) => getPostBySlug(slug, signal),
    enabled: Boolean(slug),
  });
}

export function useServices() {
  return useQuery({ queryKey: queryKeys.services, queryFn: ({ signal }) => getServices(signal) });
}

export function useService(slug: string) {
  return useQuery({
    queryKey: queryKeys.service(slug),
    queryFn: ({ signal }) => getServiceBySlug(slug, signal),
    enabled: Boolean(slug),
  });
}

export function useTrustItems() {
  return useQuery({
    queryKey: queryKeys.trustItems,
    queryFn: ({ signal }) => getTrustItems(signal),
  });
}

export function useCities() {
  return useQuery({ queryKey: queryKeys.cities, queryFn: ({ signal }) => getCities(signal) });
}

export function useTestimonials() {
  return useQuery({
    queryKey: queryKeys.testimonials,
    queryFn: ({ signal }) => getTestimonials(signal),
  });
}

export function useDirectorMessage() {
  return useQuery({
    queryKey: queryKeys.directorMessage,
    queryFn: ({ signal }) => getDirectorMessage(signal),
  });
}

export function useProcessSteps() {
  return useQuery({
    queryKey: queryKeys.processSteps,
    queryFn: ({ signal }) => getProcessSteps(signal),
  });
}

export function useVerificationSteps() {
  return useQuery({
    queryKey: queryKeys.verificationSteps,
    queryFn: ({ signal }) => getVerificationSteps(signal),
  });
}

export function useSafetyTips() {
  return useQuery({
    queryKey: queryKeys.safetyTips,
    queryFn: ({ signal }) => getSafetyTips(signal),
  });
}

export function useMilestones() {
  return useQuery({
    queryKey: queryKeys.milestones,
    queryFn: ({ signal }) => getMilestones(signal),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: ({ signal }) => getCategories(signal),
    staleTime: 10 * 60 * 1000,
  });
}

export function useLegalPage(slug: LegalSlug) {
  return useQuery({
    queryKey: queryKeys.legalPage(slug),
    queryFn: ({ signal }) => getLegalPage(slug, signal),
  });
}

export function useMyInterests() {
  return useQuery({
    queryKey: queryKeys.myInterests,
    queryFn: ({ signal }) => getMyInterests(signal),
  });
}

export function useProfiles(filters: ProfileFilters) {
  return useQuery({
    queryKey: queryKeys.profiles(filters),
    queryFn: ({ signal }) => getProfiles(filters, signal),
    placeholderData: (previous) => previous,
  });
}

export function useProfile(id: string) {
  return useQuery({
    queryKey: queryKeys.profile(id),
    queryFn: ({ signal }) => getProfileById(id, signal),
    enabled: Boolean(id),
    retry: false,
  });
}

export function useSimilarProfiles(profile: Profile | undefined) {
  return useQuery({
    queryKey: queryKeys.similarProfiles(profile?.id ?? "none"),
    queryFn: ({ signal }) => getSimilarProfiles(profile as Profile, signal),
    enabled: Boolean(profile),
  });
}

export function useFeaturedProfiles(gender: "male" | "female") {
  return useQuery({
    queryKey: queryKeys.featured(gender),
    queryFn: ({ signal }) => getFeaturedProfiles(gender, signal),
  });
}

export function useLatestProfiles(gender: "male" | "female") {
  return useQuery({
    queryKey: queryKeys.latest(gender),
    queryFn: ({ signal }) => getLatestProfiles(gender, signal),
  });
}

export function useSecondMarriageProfiles(status: "divorced" | "widowed" | "all") {
  return useQuery({
    queryKey: queryKeys.secondMarriage(status),
    queryFn: ({ signal }) => getSecondMarriageProfiles(status, signal),
  });
}

export function useProfilesByIds(ids: string[]) {
  return useQuery({
    queryKey: queryKeys.byIds(ids),
    queryFn: ({ signal }) => getProfilesByIds(ids, signal),
    enabled: ids.length > 0,
  });
}

export function useProfilesByLocation(filter: { city?: string; country?: string }, limit = 4) {
  const key = filter.city ?? filter.country ?? "all";
  return useQuery({
    queryKey: queryKeys.byLocation(key),
    queryFn: ({ signal }) => getProfilesByLocation(filter, limit, signal),
  });
}
