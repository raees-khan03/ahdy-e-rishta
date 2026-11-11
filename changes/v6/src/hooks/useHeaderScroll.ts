import { useEffect, useState } from "react";

interface HeaderScrollState {
  /** Page thora sa neeche chala gaya: header halka blur aur shadow le leta hai. */
  scrolled: boolean;
  /** Neeche scroll karne par header chhup jata hai, ooper aane par wapas. */
  hidden: boolean;
}

/**
 * Header ka scroll behaviour.
 *
 * - `locked` true ho (mobile menu khula ho) to header kabhi chhupta nahi.
 * - Agar focus header ke andar kisi cheez par ho (dropdown, link) to bhi nahi chhupta.
 * - Reduced motion? Phir sirf blur/shadow, chhupna band.
 */
export function useHeaderScroll(locked = false): HeaderScrollState {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 10);

      if (reduce || locked) {
        setHidden(false);
        lastY = y;
        return;
      }

      // Focus header ke andar ho to header na chhupein
      const active = document.activeElement;
      if (active instanceof HTMLElement && active.closest("header")) {
        setHidden(false);
        lastY = y;
        return;
      }

      if (y < 220) {
        setHidden(false);
      } else if (y > lastY + 8) {
        setHidden(true);
      } else if (y < lastY - 8) {
        setHidden(false);
      }
      lastY = y;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [locked]);

  return { scrolled, hidden };
}
