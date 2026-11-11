import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteSettings } from "@/context/SiteSettingsProvider";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

const STORAGE_KEY = "ahd-e-rishta.announcement-dismissed";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(false);
  const { settings } = useSiteSettings();
  const announcement = settings.announcement;

  useEffect(() => {
    try {
      setVisible(window.localStorage.getItem(STORAGE_KEY) !== "1");
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible || !announcement.isActive || !announcement.text.trim()) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="relative bg-maroon-950 text-cream-100">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-10 py-2.5 text-center font-sans text-[13px] leading-5 sm:px-12">
        <p>{announcement.text}</p>
        <a
          href={buildWhatsAppUrl({ message: announcement.text })}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { source: "announcement_bar" })}
          className="hidden shrink-0 items-center gap-1.5 rounded-full border border-peach-300/40 px-3 py-1 font-semibold text-peach-300 transition-colors hover:bg-peach-300/10 sm:inline-flex"
        >
          <WhatsAppIcon className="size-3.5" />
          {announcement.linkLabel ?? "Message us"}
        </a>
        {announcement.linkHref ? (
          <Link
            to={announcement.linkHref}
            className="hidden shrink-0 rounded-full text-cream-200 underline decoration-peach-300/50 underline-offset-4 hover:text-white md:inline"
          >
            Read more
          </Link>
        ) : null}
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute end-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-cream-200/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-peach-300 focus-visible:outline-none"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
