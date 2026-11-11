/**
 * DUMMY DATA, replace with real data or API.
 * Helpers shared by the mock collections so every record carries the same
 * admin fields the future CMS will return.
 */
import type { ContentRecord } from "@/schemas/content.schema";

/** Fixed stamp so the mock data looks stable across reloads. */
export const SEED_TIME = "2026-09-14T08:30:00.000Z";

/**
 * Builds one record. The caller names the type it wants, which lets every
 * collection reuse the same four admin fields.
 */
export function base<T extends ContentRecord>(
  id: string,
  sortOrder: number,
  overrides: Partial<Omit<T, keyof ContentRecord>> = {},
): T {
  return {
    id,
    isActive: true,
    sortOrder,
    createdAt: SEED_TIME,
    updatedAt: SEED_TIME,
    ...overrides,
  } as T;
}

/** The admin can hide an item; hidden items never reach the website. */
export function visible<T extends { isActive: boolean; sortOrder: number }>(items: T[]): T[] {
  return items.filter((item) => item.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}
