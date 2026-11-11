import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Resets scroll position on route change (skipped for in-page hash links). */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "instant" });
  }, [pathname, hash]);

  return null;
}
