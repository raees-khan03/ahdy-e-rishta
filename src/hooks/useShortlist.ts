import { useCallback, useSyncExternalStore } from "react";

const VISITOR_KEY = "ahd-e-rishta.shortlist.v1";
const listeners = new Set<() => void>();

/** Signed-in members keep a copy per account; visitors keep the shared key. */
let activeKey = VISITOR_KEY;

let snapshot: string[] = [];

function readStorage(): string[] {
  try {
    const raw = window.localStorage.getItem(activeKey);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((value): value is string => typeof value === "string").slice(0, 200);
  } catch {
    return [];
  }
}

function writeStorage(ids: string[]): void {
  try {
    window.localStorage.setItem(activeKey, JSON.stringify(ids));
  } catch {
    /* storage may be unavailable (private mode or quota), so fail silently */
  }
}

function emit(): void {
  listeners.forEach((listener) => listener());
}

/**
 * Called after sign in and sign out. The visitor list is merged into the account
 * list so nothing saved before signing in is lost. The real API will keep this
 * on the server; here it is a second localStorage key.
 */
export function switchShortlistOwner(userId: string | null): void {
  const previous = getSnapshot();
  if (!userId) {
    activeKey = VISITOR_KEY;
    snapshot = readStorage();
    emit();
    return;
  }

  activeKey = `${VISITOR_KEY}.${userId}`;
  const stored = readStorage();
  const merged = [...new Set([...previous, ...stored])].slice(0, 200);
  writeStorage(merged);
  snapshot = merged;
  emit();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): string[] {
  const stored = readStorage();
  const same =
    stored.length === snapshot.length && stored.every((id, index) => snapshot[index] === id);
  if (!same) snapshot = stored;
  return snapshot;
}

function getServerSnapshot(): string[] {
  return snapshot;
}

export interface ShortlistApi {
  ids: string[];
  count: number;
  has: (id: string) => boolean;
  toggle: (id: string) => boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}

/** Visitor shortlist persisted in localStorage. Shared by ProfileCard, detail page and header. */
export function useShortlist(): ShortlistApi {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const update = useCallback((next: string[]) => {
    writeStorage(next);
    snapshot = next;
    emit();
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const add = useCallback(
    (id: string) => {
      if (ids.includes(id)) return;
      update([id, ...ids]);
    },
    [ids, update],
  );

  const remove = useCallback(
    (id: string) => {
      update(ids.filter((item) => item !== id));
    },
    [ids, update],
  );

  const toggle = useCallback(
    (id: string) => {
      if (ids.includes(id)) {
        update(ids.filter((item) => item !== id));
        return false;
      }
      update([id, ...ids]);
      return true;
    },
    [ids, update],
  );

  const clear = useCallback(() => update([]), [update]);

  return { ids, count: ids.length, has, toggle, add, remove, clear };
}
