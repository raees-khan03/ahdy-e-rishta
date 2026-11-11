import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSiteSettings } from "@/context/SiteSettingsProvider";

interface LogoProps {
  tone?: "light" | "dark";
  className?: string;
  onClick?: () => void;
  /** Hides the name, for tight spaces. */
  compact?: boolean;
}

/**
 * The bureau logo comes from site settings. If the admin removes the file the
 * header falls back to plain text, so nothing is ever drawn or invented here.
 */
export function Logo({ tone = "light", className, onClick, compact = false }: LogoProps) {
  const { settings } = useSiteSettings();
  const hasLogo = Boolean(settings.logoUrl);

  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${settings.siteName}, ${settings.tagline}, home`}
      className={cn("group flex items-center gap-2.5 rounded-xl", className)}
    >
      {hasLogo ? (
        <img
          src={settings.logoUrl}
          alt=""
          width={44}
          height={44}
          className="size-10 shrink-0 rounded-full object-contain sm:size-11"
        />
      ) : null}

      {compact && hasLogo ? null : (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "whitespace-nowrap font-heading text-lg font-semibold tracking-tight sm:text-xl",
              tone === "dark" ? "text-cream-50" : "text-maroon-900",
            )}
          >
            {settings.siteName}
          </span>
          <span
            className={cn(
              "mt-1 whitespace-nowrap font-script text-[14px] leading-none",
              tone === "dark" ? "text-peach-300" : "text-maroon-600",
            )}
          >
            {settings.tagline}
          </span>
        </span>
      )}
    </Link>
  );
}
