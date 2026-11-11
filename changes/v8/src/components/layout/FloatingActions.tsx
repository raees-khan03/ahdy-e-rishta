import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

const BUTTON = 44;
const RADIUS = (BUTTON - 6) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Back to top button with a ring that fills as the page scrolls. The ring is
 * drawn with stroke-dasharray/stroke-dashoffset so the progress is always
 * visible, including on the very first scroll event.
 */
export function FloatingActions() {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const frame = useRef(0);

  useEffect(() => {
    const read = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      setProgress(Math.min(Math.max(ratio, 0), 1));
      setShowTop(window.scrollY > 240);
      frame.current = 0;
    };

    const onScroll = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  const scrollToTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  const percent = Math.round(progress * 100);

  return (
    <div
      className="fixed end-3 bottom-3 z-30 flex flex-col items-end gap-2 sm:end-5 sm:bottom-5"
      /* keeps the buttons off the very edge on iOS safe areas without covering content */
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={`${t("common.backToTop")}, ${percent}% of the page read`}
        className={cn(
          "relative grid place-items-center rounded-full border border-khaki-300 bg-cream-50 text-maroon-800 shadow-md shadow-maroon-900/15 transition-all duration-300 hover:bg-white focus-visible:ring-2 focus-visible:ring-maroon-700 focus-visible:ring-offset-2 focus-visible:outline-none motion-safe:animate-[fade-in_0.25s_ease-out]",
          showTop
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0",
        )}
        style={{ width: BUTTON, height: BUTTON }}
      >
        <svg
          className="pointer-events-none absolute inset-0"
          viewBox={`0 0 ${BUTTON} ${BUTTON}`}
          aria-hidden="true"
        >
          <circle
            cx={BUTTON / 2}
            cy={BUTTON / 2}
            r={RADIUS}
            fill="none"
            stroke="#e7d6c2"
            strokeWidth={3}
          />
          <circle
            cx={BUTTON / 2}
            cy={BUTTON / 2}
            r={RADIUS}
            fill="none"
            stroke="#7c1b2c"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
            transform={`rotate(-90 ${BUTTON / 2} ${BUTTON / 2})`}
            style={{ transition: "stroke-dashoffset 120ms linear" }}
          />
        </svg>
        <ArrowUp className="relative size-4" aria-hidden="true" />
      </button>

      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_click", { source: "floating_button" })}
        aria-label={`${t("common.whatsappUs")}, opens WhatsApp in a new tab`}
        className="group flex size-12 items-center justify-center gap-2 rounded-full bg-green-800 text-white shadow-lg shadow-green-900/30 transition-transform hover:scale-105 hover:bg-green-900 focus-visible:ring-2 focus-visible:ring-green-800 focus-visible:ring-offset-2 focus-visible:outline-none lg:h-12 lg:w-auto lg:px-4"
      >
        <WhatsAppIcon className="size-5" />
        <span className="hidden font-sans text-sm font-semibold lg:inline">
          {t("common.whatsapp")}
        </span>
      </a>
    </div>
  );
}
