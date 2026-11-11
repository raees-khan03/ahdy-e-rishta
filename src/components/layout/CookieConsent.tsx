import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "ahd-e-rishta.cookie-consent";

/**
 * Consent banner, ready to switch on. Rendered only when analytics is enabled,
 * no vendor is wired up yet, so nothing is collected today.
 */
export function CookieConsent() {
  const analyticsEnabled = false;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!analyticsEnabled) return;
    try {
      setVisible(window.localStorage.getItem(STORAGE_KEY) === null);
    } catch {
      setVisible(false);
    }
  }, [analyticsEnabled]);

  if (!analyticsEnabled || !visible) return null;

  const decide = (value: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-50 rounded-3xl border border-khaki-300 bg-cream-50 p-4 shadow-xl shadow-maroon-900/15 sm:inset-x-auto sm:end-5 sm:bottom-20 sm:max-w-sm"
    >
      <p className="font-sans text-sm leading-6 text-maroon-900">
        We use privacy-friendly analytics to understand which pages help families most. Read our{" "}
        <Link to="/privacy" className="underline underline-offset-2">
          privacy policy
        </Link>
        .
      </p>
      <div className="mt-3 flex gap-2">
        <Button size="sm" onClick={() => decide("accepted")}>
          Accept
        </Button>
        <Button size="sm" variant="outline" onClick={() => decide("declined")}>
          Decline
        </Button>
      </div>
    </div>
  );
}
