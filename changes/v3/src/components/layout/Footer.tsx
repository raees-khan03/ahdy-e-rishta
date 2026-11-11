import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Music2,
  Phone,
  Youtube,
} from "lucide-react";
import { useSiteSettings } from "@/context/SiteSettingsProvider";
import { useBranches } from "@/hooks/useApiQueries";
import { supportLinks, footerQuickLinks as quickLinks } from "@/lib/navigation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { Logo } from "@/components/common/Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  tiktok: Music2,
} as const;

/**
 * Bara brand naam, neeche se "paani" ki lehar us mein bhar aati hai.
 * Do layers: pehle poori line halki (ghost), phir wahi line lehar ke clip ke andar
 * gradient ke saath. Cloud blobs peeche aahista aahista hilte hain.
 */
function FooterWordmark({ name }: { name: string }) {
  const text = name.toUpperCase();
  const wave =
    "M0 128 C 120 92 240 166 360 136 C 480 106 600 174 720 140 C 840 106 960 170 1080 134 C 1140 116 1180 126 1200 120 L1200 240 L0 240 Z";
  const line =
    "M0 128 C 120 92 240 166 360 136 C 480 106 600 174 720 140 C 840 106 960 170 1080 134 C 1140 116 1180 126 1200 120";
  const font = {
    fontFamily: '"Fraunces Variable", Georgia, "Times New Roman", serif',
    fontWeight: 600,
    fontSize: 150,
    letterSpacing: "-0.02em",
  } as const;

  return (
    <div aria-hidden="true" className="relative mt-12 select-none overflow-hidden">
      <svg
        viewBox="0 0 1200 240"
        preserveAspectRatio="xMidYMax meet"
        className="relative block h-auto w-full"
        focusable="false"
      >
        <defs>
          <linearGradient id="footer-wordmark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7d2ba" stopOpacity="0.30" />
            <stop offset="55%" stopColor="#fbe6e7" stopOpacity="0.62" />
            <stop offset="100%" stopColor="#fdf5f0" stopOpacity="0.94" />
          </linearGradient>
          <linearGradient id="footer-wave-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f3b894" stopOpacity="0" />
            <stop offset="50%" stopColor="#f3b894" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#f3b894" stopOpacity="0" />
          </linearGradient>
          <clipPath id="footer-wave-clip">
            <path d={wave} />
          </clipPath>
        </defs>

        {/* Ghost line */}
        <text
          x="600"
          y="206"
          textAnchor="middle"
          textLength="1160"
          lengthAdjust="spacingAndGlyphs"
          fill="#fbe6e7"
          fillOpacity="0.1"
          style={font}
        >
          {text}
        </text>

        {/* Water line filling the letters */}
        <g clipPath="url(#footer-wave-clip)">
          <text
            x="600"
            y="206"
            textAnchor="middle"
            textLength="1160"
            lengthAdjust="spacingAndGlyphs"
            fill="url(#footer-wordmark-fill)"
            style={font}
          >
            {text}
          </text>
        </g>

        <path d={line} fill="none" stroke="url(#footer-wave-line)" strokeWidth="2" />
      </svg>
    </div>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const { settings } = useSiteSettings();
  const { data: branches } = useBranches();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 overflow-hidden bg-maroon-950 text-cream-100">
      <div
        aria-hidden="true"
        className="pattern-khaki pointer-events-none absolute inset-0 opacity-[0.06]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-32 -top-32 size-80 rounded-full bg-peach-400/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-24 top-1/3 size-72 rounded-full bg-maroon-700/40 blur-3xl"
      />
      {/* Halke baadal, footer ke neeche wale hisse mein aahista aahista hilte hain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-16 start-[8%] size-56 rounded-full bg-cream-100/10 blur-3xl motion-safe:animate-[footer-drift_20s_ease-in-out_infinite]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 end-[12%] size-64 rounded-full bg-peach-300/10 blur-3xl motion-safe:animate-[footer-drift_26s_ease-in-out_infinite_reverse]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 start-1/2 size-48 rounded-full bg-cream-50/10 blur-3xl motion-safe:animate-[footer-drift_32s_ease-in-out_infinite]"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="dark" />
            <p className="mt-4 max-w-sm font-sans text-sm leading-7 text-cream-200/80">
              {settings.footerText}
            </p>
            <div className="mt-5 flex items-center gap-2">
              {settings.socialLinks.map((item) => {
                const Icon = socialIcons[item.icon];
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${settings.siteName} on ${item.label} (opens in a new tab)`}
                    className="grid size-9 place-items-center rounded-full border border-cream-200/20 text-cream-200 transition-colors hover:border-peach-300/60 hover:bg-white/5 hover:text-peach-300"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
            <div className="mt-6">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-peach-300">
                {t("home.newsletterTitle")}
              </p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-cream-200/70">
                {t("home.newsletterDesc")}
              </p>
              <NewsletterForm tone="dark" className="mt-3" />
            </div>
          </div>

          <nav aria-label="Quick links" className="lg:col-span-2">
            <h2 className="font-heading text-base font-semibold text-cream-50">
              {t("footer.quickLinks")}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-cream-200/75 transition-colors hover:text-peach-300"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Support" className="lg:col-span-2">
            <h2 className="font-heading text-base font-semibold text-cream-50">
              {t("footer.support")}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-cream-200/75 transition-colors hover:text-peach-300"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/login"
                  className="font-sans text-sm text-cream-200/75 transition-colors hover:text-peach-300"
                >
                  Client portal
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="font-heading text-base font-semibold text-cream-50">
              {t("footer.contact")}
            </h2>
            <ul className="mt-4 space-y-3 font-sans text-sm text-cream-200/80">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-peach-300" aria-hidden="true" />
                <span className="leading-6">{settings.address}</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-peach-300" aria-hidden="true" />
                <a href={`tel:${settings.phones[0]}`} className="hover:text-peach-300">
                  {settings.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-peach-300" aria-hidden="true" />
                <a href={`mailto:${settings.email}`} className="break-all hover:text-peach-300">
                  {settings.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-peach-300" aria-hidden="true" />
                <span className="leading-6">
                  {settings.workingHours.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "footer" })}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-600/40 bg-green-800/20 px-4 py-2 font-sans text-sm font-semibold text-cream-50 transition-colors hover:bg-green-800/40"
            >
              <WhatsAppIcon /> {t("common.whatsappUs")}
            </a>
          </div>
        </div>

        {/* Branches strip: har office ka apna number */}
        {branches?.length ? (
          <div className="mt-10 rounded-3xl border border-cream-200/15 bg-white/[0.04] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-peach-300">
                {t("nav.branches")}
              </h2>
              <Link
                to="/branches"
                className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-cream-100/80 transition-colors hover:text-peach-300"
              >
                All offices and timings
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {branches.map((branch) => (
                <li key={branch.id}>
                  <a
                    href={buildWhatsAppUrl({ number: branch.whatsapp })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("whatsapp_click", { source: "footer_branch", branch: branch.name })
                    }
                    className="group flex items-center gap-2.5 rounded-2xl border border-cream-200/10 px-3 py-2.5 transition-colors hover:border-peach-300/40 hover:bg-white/5"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-green-800/30 text-green-200">
                      <WhatsAppIcon />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-sans text-sm font-semibold text-cream-50">
                        {branch.city}
                        {branch.isMain ? " · main" : ""}
                      </span>
                      <span className="block truncate font-sans text-xs text-cream-200/70">
                        {branch.phoneDisplay}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-8 border-t border-cream-200/15 pt-6">
          <p className="font-sans text-xs leading-6 text-cream-200/55">{t("footer.disclaimer")}</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans text-xs text-cream-200/60">
              © {year} {settings.siteName}. {t("footer.rights")}
            </p>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {[
                { label: t("footer.terms"), href: "/terms" },
                { label: t("footer.privacy"), href: "/privacy" },
                { label: t("footer.refund"), href: "/refund-policy" },
                { label: t("footer.safety"), href: "/safety-tips" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-sans text-xs text-cream-200/60 transition-colors hover:text-peach-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Neeche bara brand naam, lehar ke saath */}
      <div className="relative mx-auto max-w-7xl px-4 pb-2 sm:px-6">
        <FooterWordmark name={settings.siteName} />
      </div>
    </footer>
  );
}
