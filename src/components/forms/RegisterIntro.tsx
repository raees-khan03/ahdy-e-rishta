import { ShieldCheck, Users } from "lucide-react";
import couple from "@/assets/register-couple.jpeg";
import { useSiteSettings } from "@/context/SiteSettingsProvider";

const features = [
  {
    icon: ShieldCheck,
    title: "Private and confidential",
    text: "Your details are used only to find you a suitable rishta.",
  },
  {
    icon: Users,
    title: "Family-first matchmaking",
    text: "We respect your values, background and expectations.",
  },
];

/** Side panel beside the register wizard. Hidden below large screens. */
export function RegisterIntro() {
  const { settings, block } = useSiteSettings();
  const intro = block("register.intro");

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
          {intro?.eyebrow ?? "Register"}
        </p>

        <h1 className="font-heading text-4xl leading-tight font-bold text-cream-100 xl:text-5xl">
          {intro?.title ?? "Start your search for a trusted rishta"}
        </h1>

        <p className="max-w-md text-lg text-white/90">{intro?.subtitle ?? ""}</p>

        <ul className="mt-2 space-y-5">
          {features.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <Icon className="size-6 text-peach-400" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-semibold text-white">{title}</h2>
                <p className="text-sm text-white/80">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
