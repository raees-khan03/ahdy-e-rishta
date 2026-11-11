import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown, ChevronRight, Heart, LogOut, Menu, Phone, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav, footerQuickLinks } from "@/lib/navigation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { useShortlist } from "@/hooks/useShortlist";
import { useAuth } from "@/context/AuthProvider";
import { useSiteSettings } from "@/context/SiteSettingsProvider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { Logo } from "@/components/common/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

/** VIP package anchor on the packages page. */
const VIP_HREF = "/packages#vip";

/** Desktop nav link. */
function navLinkClass(isActive: boolean) {
  return cn(
    "relative whitespace-nowrap rounded-full px-2 py-2 font-sans text-[13px] font-semibold transition-colors xl:px-2.5",
    isActive ? "text-maroon-900" : "text-maroon-800/75 hover:bg-cream-100 hover:text-maroon-900",
  );
}

/** Mobile (sheet) nav link: active page saaf nazar aata hai. */
function mobileLinkClass(isActive: boolean) {
  return cn(
    "flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 font-sans text-[15px] transition-colors",
    isActive
      ? "bg-maroon-800/12 font-bold text-maroon-900"
      : "font-semibold text-maroon-800 hover:bg-cream-100 active:bg-maroon-800/10",
  );
}

/** Chhote chip links, sheet ke neeche wali grid. */
function chipClass(isActive: boolean) {
  return cn(
    "flex min-h-10 items-center justify-center gap-1.5 rounded-lg border px-2 text-center font-sans text-[13px] transition-colors",
    isActive
      ? "border-maroon-700 bg-maroon-800/12 font-bold text-maroon-900"
      : "border-khaki-300/70 font-semibold text-maroon-800 hover:bg-cream-100 active:bg-maroon-800/10",
  );
}

/** Chhoti "VIP" pill, nav aur mobile menu dono mein. */
function VipPill() {
  return (
    <span className="rounded-full bg-peach-400 px-1.5 py-px font-sans text-[9px] font-bold tracking-[0.12em] text-maroon-950 uppercase">
      VIP
    </span>
  );
}

/**
 * Active page khud check karte hain, NavLink ke className function se nahi.
 *
 * Wajah: `<SheetClose asChild>` Radix Slot se banta hai aur Slot `className` ko
 * string mein jod deta hai. className function dene par wo string ban kar class
 * attribute mein chala jata hai ("function isActive(){...}") aur mobile menu mein
 * active tab ki styling kabhi lagti hi nahi. Plain string class se yeh masla
 * khatam ho jata hai. `aria-current` phir bhi NavLink khud lagata hai.
 */
function useIsActive() {
  const { pathname } = useLocation();
  return (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

interface NavDropdownItem {
  label: string;
  href: string;
}

/**
 * Chhota dropdown: Success Stories aur Videos ek hi tab ke andar, taake header
 * par links ki bheed na ho. Hover, click aur keyboard (Escape, Tab) teeno chalte hain.
 */
function NavDropdown({
  label,
  items,
  active,
  closeOnNavigate,
}: {
  label: string;
  items: NavDropdownItem[];
  active: boolean;
  closeOnNavigate?: () => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  const openNow = () => {
    window.clearTimeout(timer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(timer.current);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onBlur={(event) => {
        if (!wrapRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(navLinkClass(active), "inline-flex items-center gap-1")}
        onClick={() => setOpen(true)}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={cn("size-3.5 transition-transform", open && "rotate-180")}
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 -bottom-1 mx-auto h-0.5 w-5 rounded-full bg-linear-to-r from-maroon-700 to-peach-400 transition-opacity",
            active ? "opacity-100" : "opacity-0",
          )}
        />
      </button>

      {open ? (
        <div
          role="menu"
          aria-label={label}
          className="absolute start-1/2 top-full z-50 w-56 -translate-x-1/2 pt-2"
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-white p-1.5 shadow-xl shadow-maroon-900/15">
            {items.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  closeOnNavigate?.();
                }}
                className={({ isActive: itemActive }) =>
                  cn(
                    "flex min-h-10 items-center justify-between gap-2 rounded-xl px-3 font-sans text-sm font-semibold transition-colors hover:bg-cream-100",
                    itemActive ? "bg-cream-100 text-maroon-900" : "text-maroon-800",
                  )
                }
              >
                {t(item.label)}
                <ChevronRight className="size-3.5 text-maroon-800/30" aria-hidden="true" />
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function Header() {
  const { t } = useTranslation();
  const { count } = useShortlist();
  const { user, logout } = useAuth();
  const { settings } = useSiteSettings();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isActive = useIsActive();

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/");
  };

  const label = (key: string) => t(key);

  /* Header par kam tabs: Home, Find a Match, Services, Packages, VIP, About,
     Contact. Success Stories aur Videos ek "Stories" dropdown mein hain. */
  const primaryHrefs = ["/", "/profiles", "/services", "/packages", VIP_HREF, "/about", "/contact"];
  const primaryNav = primaryHrefs.map((href) =>
    href === VIP_HREF
      ? { href, label: label("nav.vipPackage"), vip: true }
      : { href, label: label(mainNav.find((item) => item.href === href)?.label ?? ""), vip: false },
  );
  const storyItems = mainNav.filter((item) => ["/success-stories", "/videos"].includes(item.href));
  const chipHrefs = ["/success-stories", "/videos", "/how-it-works", "/team", "/blog"];

  return (
    <>
      {/* Announcement bar sticky nahi: scroll karne pe chala jata hai, mobile pe jagah bachti hai */}
      <AnnouncementBar />

      <header className="sticky top-0 z-40 border-b border-border/80 bg-cream-50/95 backdrop-blur supports-[backdrop-filter]:bg-cream-50/80">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-3 sm:h-16 sm:gap-3 sm:px-6 lg:h-18">
          {/* min-w-0 + shrink: chhoti screen pe logo buttons ko dhakelta nahi */}
          <div className="min-w-0 shrink">
            <Logo />
          </div>

          <nav aria-label="Main navigation" className="hidden items-center gap-0 xl:flex">
            {primaryNav.slice(0, 4).map((item) => {
              const active = isActive(item.href);
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === "/"}
                  className={navLinkClass(active)}
                >
                  <span className="relative inline-block">
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-0 -bottom-1 mx-auto h-0.5 w-5 rounded-full bg-linear-to-r from-maroon-700 to-peach-400 transition-opacity",
                        active ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </span>
                </NavLink>
              );
            })}

            <NavDropdown
              label={label("nav.stories")}
              items={storyItems}
              active={storyItems.some((item) => isActive(item.href))}
            />

            {primaryNav.slice(5).map((item) => {
              const active = isActive(item.href);
              return (
                <NavLink key={item.href} to={item.href} className={navLinkClass(active)}>
                  <span className="relative inline-block">
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-0 -bottom-1 mx-auto h-0.5 w-5 rounded-full bg-linear-to-r from-maroon-700 to-peach-400 transition-opacity",
                        active ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </span>
                </NavLink>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* VIP: header ka sab se alag link, packages page ke VIP card par le jata hai */}
            <NavLink
              to={VIP_HREF}
              className="hidden items-center gap-1.5 rounded-full border border-peach-400/70 bg-peach-400/15 px-2.5 py-1.5 font-sans text-[12px] font-bold tracking-wide text-maroon-900 transition-colors hover:bg-peach-400/30 xl:inline-flex"
            >
              <VipPill />
              {label("nav.packages")}
            </NavLink>

            {/* Shortlist mobile pe bhi nazar aata hai. size-10 = 40px touch target */}
            <Link
              to="/shortlist"
              aria-label={`${t("nav.shortlist")}, ${count} saved`}
              className="relative grid size-10 place-items-center rounded-full border border-khaki-300/80 text-maroon-800 transition-colors hover:bg-cream-100"
            >
              <Heart aria-hidden="true" className="size-4" />
              {count > 0 ? (
                <span className="absolute -end-1 -top-1 grid min-w-5 place-items-center rounded-full bg-maroon-700 px-1 font-sans text-[11px] font-bold text-cream-50 tabular-nums">
                  {count}
                </span>
              ) : null}
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="hidden items-center gap-2 rounded-full border border-khaki-300/80 px-2.5 py-1.5 font-sans text-[13px] font-semibold text-maroon-900 transition-colors hover:bg-cream-100 lg:inline-flex"
                  >
                    <span className="grid size-6 place-items-center rounded-full bg-maroon-800 font-sans text-[11px] font-bold text-cream-50">
                      {user.fullName.slice(0, 1)}
                    </span>
                    <span className="max-w-28 truncate">{user.fullName.split(" ")[0]}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user.role === "admin" ? "Office admin" : "Member"}
                  </DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link to="/account">
                      <UserRound className="size-4" aria-hidden="true" />
                      My account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/shortlist">
                      <Heart className="size-4" aria-hidden="true" />
                      My shortlist
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem destructive onSelect={() => void handleLogout()}>
                    <LogOut className="size-4" aria-hidden="true" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="hidden lg:inline-flex">
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="hidden lg:inline-flex">
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}

            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="size-10 xl:hidden"
                  aria-label="Open menu"
                >
                  <Menu aria-hidden="true" className="size-6" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="end"
                title="Menu"
                className="flex h-dvh w-[88vw] max-w-sm flex-col gap-0 bg-cream-50 p-0"
              >
                {/* 1. Fixed top: logo (close button Sheet ka apna hai) */}
                <div className="flex shrink-0 items-center border-b border-border px-4 py-3 pe-14">
                  <Logo onClick={() => setMenuOpen(false)} />
                </div>

                {/* 2. Scrollable middle: links */}
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2.5 py-3">
                  {user ? (
                    <p className="mb-2 flex items-center gap-3 rounded-xl bg-cream-100 px-3 py-2 font-sans text-sm font-semibold text-maroon-900">
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-maroon-800 text-xs font-bold text-cream-50">
                        {user.fullName.slice(0, 1)}
                      </span>
                      <span className="truncate">{user.fullName}</span>
                    </p>
                  ) : null}

                  <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
                    {primaryNav.map((item) => {
                      // VIP anchors to a card on the packages page, is liye use active
                      // page ka nishan nahi dete (warna Packages bhi active lagta).
                      const active = item.vip ? false : isActive(item.href);
                      const inner = (
                        <>
                          <span className="flex min-w-0 items-center gap-2.5">
                            {/* Active page ka nishan: maroon patti */}
                            <span
                              aria-hidden="true"
                              className={cn(
                                "h-5 w-1 shrink-0 rounded-full transition-colors",
                                active ? "bg-maroon-700" : "bg-transparent",
                              )}
                            />
                            <span className="truncate">{item.label}</span>
                          </span>
                          <ChevronRight
                            aria-hidden="true"
                            className={cn(
                              "size-4 shrink-0 transition-colors",
                              active ? "text-maroon-700" : "text-maroon-800/25",
                            )}
                          />
                        </>
                      );

                      return (
                        <SheetClose asChild key={item.href}>
                          {item.vip ? (
                            <Link to={item.href} className={mobileLinkClass(false)}>
                              {inner}
                            </Link>
                          ) : (
                            <NavLink
                              to={item.href}
                              end={item.href === "/"}
                              aria-current={active ? "page" : undefined}
                              className={mobileLinkClass(active)}
                            >
                              {inner}
                            </NavLink>
                          )}
                        </SheetClose>
                      );
                    })}
                  </nav>

                  {/* Secondary links: 2 columns mein, jagah bachti hai */}
                  <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3">
                    {chipHrefs.map((href) => {
                      const item = footerQuickLinks.find((link) => link.href === href);
                      const itemLabel = mainNav.find((link) => link.href === href)?.label;
                      return (
                        <SheetClose asChild key={href}>
                          <NavLink to={href} end className={chipClass(isActive(href))}>
                            {label(itemLabel ?? item?.label ?? "")}
                          </NavLink>
                        </SheetClose>
                      );
                    })}

                    <SheetClose asChild>
                      <NavLink to="/shortlist" end className={chipClass(isActive("/shortlist"))}>
                        <Heart className="size-4" aria-hidden="true" />
                        {t("nav.shortlist")}
                        {count > 0 ? (
                          <span className="grid min-w-5 place-items-center rounded-full bg-maroon-700 px-1 text-[11px] font-bold text-cream-50 tabular-nums">
                            {count}
                          </span>
                        ) : null}
                      </NavLink>
                    </SheetClose>
                  </div>
                </div>

                {/* 3. Fixed bottom: actions hamesha nazar aate hain */}
                <div className="shrink-0 space-y-2 border-t border-border bg-cream-50 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                  <LanguageSwitcher className="w-fit [&_button]:min-h-10 [&_button]:items-center" />

                  {user ? (
                    <div className="grid grid-cols-2 gap-2">
                      <Button asChild variant="outline" className="h-10">
                        <Link to="/account" onClick={() => setMenuOpen(false)}>
                          My account
                        </Link>
                      </Button>
                      <Button variant="ghost" className="h-10" onClick={() => void handleLogout()}>
                        Sign out
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <Button asChild variant="outline" className="h-10">
                        <Link to="/login" onClick={() => setMenuOpen(false)}>
                          Sign in
                        </Link>
                      </Button>
                      <Button asChild className="h-10">
                        <Link to="/register" onClick={() => setMenuOpen(false)}>
                          Register
                        </Link>
                      </Button>
                    </div>
                  )}

                  {/* Contact: sirf icons, text nahi */}
                  <div className="flex items-center justify-end gap-2">
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t("common.whatsappUs")}, opens in a new tab`}
                      onClick={() => trackEvent("whatsapp_click", { source: "mobile_menu" })}
                      className="grid size-10 place-items-center rounded-full bg-green-800 text-white transition-colors hover:bg-green-900"
                    >
                      <WhatsAppIcon />
                    </a>
                    <a
                      href={`tel:${settings.phones[0]}`}
                      aria-label={`Call ${settings.phoneDisplay}`}
                      className="grid size-10 place-items-center rounded-full border border-khaki-300 text-maroon-900"
                    >
                      <Phone className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
