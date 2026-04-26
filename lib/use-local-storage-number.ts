"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Read a number from localStorage and write to it. Backed by
 * useSyncExternalStore so the value participates in render directly
 * instead of requiring a setState-in-effect to seed.
 *
 * Same-window updates fire a custom event (`${key}.change`) so multiple
 * subscribers re-render without depending on the storage event (which
 * only fires across tabs).
 *
 * Returns 0 during SSR so the initial render is deterministic; the
 * client snapshot is computed on hydration.
 */
export function useLocalStorageNumber(
  key: string,
): [number, (next: number) => void] {
  const subscribe = useCallback(
    (cb: () => void) => {
      const eventName = `${key}.change`;
      window.addEventListener("storage", cb);
      window.addEventListener(eventName, cb);
      return () => {
        window.removeEventListener("storage", cb);
        window.removeEventListener(eventName, cb);
      };
    },
    [key],
  );

  const getSnapshot = useCallback(() => {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return 0;
    const n = Number.parseInt(raw, 10);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }, [key]);

  const getServerSnapshot = useCallback(() => 0, []);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (next: number) => {
      window.localStorage.setItem(key, String(next));
      window.dispatchEvent(new Event(`${key}.change`));
    },
    [key],
  );

  return [value, setValue];
}
