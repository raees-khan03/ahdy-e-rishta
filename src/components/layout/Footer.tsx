import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "motion/react";
import {
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
import { supportLinks, footerQuickLinks as quickLinks } from "@/lib/navigation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { Logo } from "@/components/common/Logo";

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  tiktok: Music2,
} as const;

interface CloudConfig {
  id: string;
  x: number;
  y: number;
  scale: number;
  /** Aahista aahista idhar udhar hilne ki doori */
  drift: number;
  /** Ek taraf se doosri taraf jane ka waqt (seconds) */
  duration: number;
  /** Hover ya click par kitna dur chala jaye */
  shift: number;
}

const clouds: CloudConfig[] = [
  { id: "a", x: 120, y: 150, scale: 1.3, drift: 80, duration: 16, shift: 320 },
  { id: "b", x: 390, y: 185, scale: 1, drift: -70, duration: 20, shift: -280 },
  { id: "c", x: 650, y: 140, scale: 1.5, drift: 90, duration: 24, shift: 300 },
  { id: "d", x: 910, y: 182, scale: 1.1, drift: -80, duration: 18, shift: -320 },
  { id: "e", x: 1100, y: 148, scale: 1.2, drift: 70, duration: 22, shift: -360 },
];

/** Aik baadal: kuch ellipses jo mil kar ek gol matol baadal banate hain */
function CloudShape() {
  return (
    <>
      <ellipse cx="0" cy="0" rx="74" ry="26" />
      <ellipse cx="-48" cy="8" rx="46" ry="22" />
      <ellipse cx="52" cy="7" rx="52" ry="24" />
      <ellipse cx="8" cy="-16" rx="42" ry="26" />
    </>
  );
}

/**
 * Neeche bara brand naam. Hurf ke andar baadal aahista aahista hilte hain.
 * Mouse hover ya click (touch par tap) karne par baadal door tak sarak jate hain,
 * dobara hover hatane ya click karne par wapas aa jate hain.
 * Ye sirf sajawat hai, is liye screen readers se chhupa hua hai.
 */
function FooterWordmark({ name }: { name: string }) {
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const text = name.toUpperCase();
  const active = hovered || clicked;

  return (
    <div
      aria-hidden="true"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setClicked((value) => !value)}
      className="relative mt-12 cursor-pointer select-none overflow-hidden"
    >
      <svg
        viewBox="0 0 1200 240"
        preserveAspectRatio="xMidYMax meet"
        className="relative block h-auto w-full"
        focusable="false"
      >
        <defs>
          <linearGradient id="footer-letter-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7d2ba" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#fbe6e7" stopOpacity="0.4" />
          </linearGradient>
          <clipPath id="footer-letter-clip">
            <text
              x="600"
              y="206"
              textAnchor="middle"
              textLength="1160"
              lengthAdjust="spacingAndGlyphs"
              fontSize="150"
              letterSpacing="-3"
              className="font-heading font-semibold"
            >
              {text}
            </text>
          </clipPath>
          <filter
            id="footer-cloud-blur"
            filterUnits="userSpaceOnUse"
            x="-300"
            y="0"
            width="1800"
            height="240"
          >
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        {/* Hurf ka halka rang */}
        <text
          x="600"
          y="206"
          textAnchor="middle"
          textLength="1160"
          lengthAdjust="spacingAndGlyphs"
          fontSize="150"
          letterSpacing="-3"
          fill="url(#footer-letter-fill)"
          stroke="#fbe6e7"
          strokeOpacity="0.28"
          strokeWidth="1.5"
          className="font-heading font-semibold"
        >
          {text}
        </text>

        {/* Baadal, sirf hurf ke andar nazar aate hain */}
        <g clipPath="url(#footer-letter-clip)">
          <g filter="url(#footer-cloud-blur)" fill="#fdf5f0">
            {clouds.map((cloud) => (
              <g
                key={cloud.id}
                transform={`translate(${cloud.x} ${cloud.y}) scale(${cloud.scale})`}
              >
                <motion.g
                  animate={{ x: active && !reducedMotion ? cloud.shift : 0 }}
                  transition={{ duration: 2.4, ease: "easeInOut" }}
                >
                  <motion.g
                    animate={reducedMotion ? { x: 0 } : { x: [0, cloud.drift] }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : {
                            duration: cloud.duration,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "mirror",
                          }
                    }
                    fillOpacity={active ? 0.95 : 0.7}
                  >
                    <CloudShape />
                  </motion.g>
                </motion.g>
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const { settings } = useSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 overflow-hidden bg-[linear-gradient(158deg,#4a0f1f_0%,#3a0a15_46%,#280710_100%)] text-cream-100">
      {/* Background ka halka garam (peach) nur, ooper ki taraf */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(243,184,148,0.16),transparent_75%)]"
      />
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

        <div className="mt-10 border-t border-cream-200/15 pt-6">
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

      {/* Neeche bara brand naam, baadalon ke saath */}
      <div className="relative mx-auto max-w-7xl px-4 pb-2 sm:px-6">
        <FooterWordmark name={settings.siteName} />
      </div>
    </footer>
  );
}
