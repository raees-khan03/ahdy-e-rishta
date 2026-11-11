import { useTranslation } from "react-i18next";
import { changeLanguage, type SupportedLanguage } from "@/i18n";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  tone?: "light" | "dark";
  className?: string;
}

export function LanguageSwitcher({ tone = "light", className }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation();
  const current: SupportedLanguage = i18n.language === "ur" ? "ur" : "en";

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 rounded-full border p-0.5",
        tone === "dark" ? "border-cream-200/25" : "border-khaki-300/80",
        className,
      )}
      role="group"
      aria-label={t("nav.language")}
    >
      {(["en", "ur"] as const).map((language) => (
        <button
          key={language}
          type="button"
          onClick={() => changeLanguage(language)}
          aria-pressed={current === language}
          lang={language}
          className={cn(
            "rounded-full px-2.5 py-1 font-sans text-xs font-semibold transition-colors",
            current === language
              ? tone === "dark"
                ? "bg-cream-100 text-maroon-900"
                : "bg-maroon-800 text-cream-50"
              : tone === "dark"
                ? "text-cream-200 hover:bg-white/10"
                : "text-maroon-800/80 hover:bg-cream-100",
          )}
        >
          {language === "en" ? "EN" : "اردو"}
        </button>
      ))}
    </div>
  );
}
