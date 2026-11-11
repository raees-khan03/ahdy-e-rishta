import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "motion/react";
import { DamaskBackground } from "@/components/forms/backgrounds/DamaskBackground";

/** Har page ka apna naam, jo intro ke doran bara likh kar aata hai. */
const staticLabels: Record<string, string> = {
  "/team": "Our team",
  "/blog": "Guidance blog",
  "/faq": "Questions families ask",
  "/how-it-works": "How it works",
  "/safety-tips": "Safety and privacy",
  "/branches": "Our offices",
  "/shortlist": "Your shortlist",
  "/register": "Register",
  "/login": "Sign in",
  "/forgot-password": "Reset your password",
  "/account": "Your account",
  "/terms": "Terms of service",
  "/privacy": "Privacy policy",
  "/refund-policy": "Refund and cancellation",
  "/videos": "Videos",
  "/success-stories": "Success stories",
};

function usePageLabel() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  if (staticLabels[pathname]) return staticLabels[pathname];
  if (pathname.startsWith("/profiles/")) return t("nav.findMatch");
  if (pathname.startsWith("/services/")) return t("nav.services");
  if (pathname.startsWith("/blog/")) return "Guidance blog";

  const navKeys: Record<string, string> = {
    "/": "nav.home",
    "/profiles": "nav.findMatch",
    "/services": "nav.services",
    "/packages": "nav.packages",
    "/success-stories": "nav.successStories",
    "/videos": "nav.videos",
    "/about": "nav.about",
    "/contact": "nav.contact",
    "/branches": "nav.branches",
  };
  return navKeys[pathname] ? t(navKeys[pathname]) : "";
}

/**
 * Page khulte waqt ek chhota intro: maroon parda, us par page ka naam, phir parda
 * oopar khisak jata hai. Har navigation par ek dafa, ~1 second.
 *
 * Poora hissa decorative hai: aria-hidden, pointer-events none, aur jo log motion kam
 * chahte hain un ke liye yeh bilkul chalta hi nahi.
 */
export function PageIntro() {
  const { pathname } = useLocation();
  const label = usePageLabel();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 1050);
    return () => window.clearTimeout(timer);
  }, [pathname, reducedMotion]);

  if (!visible || reducedMotion || !label) return null;

  return (
    <div
      key={pathname}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80] grid place-items-center overflow-hidden bg-maroon-950 motion-safe:animate-[page-wipe_1.05s_cubic-bezier(0.65,0,0.35,1)_forwards]"
    >
      <div className="absolute inset-0 opacity-[0.12]">
        <DamaskBackground color="#f3b894" opacity={0.5} size={200} />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-24 top-1/4 size-72 rounded-full bg-maroon-700/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-20 bottom-1/4 size-80 rounded-full bg-peach-400/10 blur-3xl"
      />

      <div className="relative px-6 text-center motion-safe:animate-[page-intro-label_1s_ease-out_forwards]">
        <span className="mx-auto block h-px w-10 bg-peach-300/60" />
        <p className="mt-4 font-heading text-3xl font-semibold tracking-tight text-cream-50 sm:text-4xl">
          {label}
        </p>
        <span className="mx-auto mt-4 block h-px w-10 bg-peach-300/60" />
      </div>
    </div>
  );
}
