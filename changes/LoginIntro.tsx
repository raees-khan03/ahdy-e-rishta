import { HeartHandshake, Lock } from "lucide-react";
import couple from "@/assets/login-couple.jpeg";
import { useSiteSettings } from "@/context/SiteSettingsProvider";

// Icons are picked by position; the words come from the login.intro block.
const featureIcons = [Lock, HeartHandshake];

/** Side panel beside the login form. Hidden below large screens. */
export function LoginIntro() {
  const { settings, block } = useSiteSettings();
  const intro = block("login.intro");
  const features = intro?.items ?? [];

  return (
    <div className="relative hidden overflow-hidden bg-maroon-950 text-cream-100 lg:block">
      <img
        src={couple}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover object-[center_25%]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-maroon-950/90 via-maroon-950/60 to-maroon-950/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-maroon-950/85 via-transparent to-transparent"
      />

      <div className="relative z-10 flex h-full flex-col justify-center gap-6 px-10 py-16">
        {settings.logoUrl ? (
          <span className="grid size-24 place-items-center rounded-full bg-white p-1 shadow-lg ring-2 ring-peach-400/60">
            <img
              src={settings.logoUrl}
              alt={settings.siteName}
              width={88}
              height={88}
              className="size-full object-contain"
            />
          </span>
        ) : null}

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-peach-400">
          {intro?.eyebrow ?? "Login"}
        </p>

        <h1 className="font-heading text-4xl leading-tight font-bold text-cream-100 xl:text-5xl">
          {intro?.title ?? "Welcome back"}
        </h1>

        {intro?.subtitle ? (
          <p className="max-w-md text-lg text-white/90">{intro.subtitle}</p>
        ) : null}

        <ul className="mt-2 space-y-5">
          {features.map((item, index) => {
            const Icon = featureIcons[index % featureIcons.length];
            return (
              <li key={item.title} className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <Icon className="size-6 text-peach-400" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-semibold text-white">{item.title}</h2>
                  <p className="text-sm text-white/80">{item.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
