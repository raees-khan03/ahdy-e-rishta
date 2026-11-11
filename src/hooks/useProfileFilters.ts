import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { profileFiltersSchema, type ProfileFilters } from "@/schemas/profile.schema";
import { PROFILE_FILTER_KEYS } from "@/schemas/profile.schema";

export interface ProfileFiltersApi {
  filters: ProfileFilters;
  setFilters: (patch: Record<string, string | number | undefined>) => void;
  removeFilter: (key: keyof ProfileFilters) => void;
  clearAll: () => void;
  activeCount: number;
}

const FILTER_DEFAULTS: ProfileFilters = { page: 1, sort: "newest", view: "grid" };

/** Keeps profile filters in the URL so links are shareable and back/forward works. */
export function useProfileFilters(): ProfileFiltersApi {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo<ProfileFilters>(() => {
    const raw: Record<string, string> = {};
    PROFILE_FILTER_KEYS.forEach((key) => {
      const value = searchParams.get(key);
      if (value !== null && value !== "") raw[key] = value;
    });
    const parsed = profileFiltersSchema.safeParse(raw);
    if (!parsed.success) return { ...FILTER_DEFAULTS };
    return { ...FILTER_DEFAULTS, ...parsed.data };
  }, [searchParams]);

  const setFilters = useCallback(
    (patch: Record<string, string | number | undefined>) => {
      const next = new URLSearchParams(searchParams);
      Object.entries(patch).forEach(([key, value]) => {
        if (value === undefined || value === "" || value === null) {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });
      const isPaging = Object.keys(patch).length === 1 && Object.keys(patch)[0] === "page";
      if (!isPaging) next.delete("page");
      setSearchParams(next, { replace: false });
    },
    [searchParams, setSearchParams],
  );

  const removeFilter = useCallback(
    (key: keyof ProfileFilters) => {
      const next = new URLSearchParams(searchParams);
      next.delete(key);
      next.delete("page");
      setSearchParams(next);
    },
    [searchParams, setSearchParams],
  );

  const clearAll = useCallback(() => {
    const next = new URLSearchParams();
    const view = searchParams.get("view");
    if (view === "list") next.set("view", "list");
    setSearchParams(next);
  }, [searchParams, setSearchParams]);

  const activeCount = useMemo(
    () =>
      Array.from(searchParams.keys()).filter((key) => !["page", "sort", "view"].includes(key))
        .length,
    [searchParams],
  );

  return { filters, setFilters, removeFilter, clearAll, activeCount };
}
