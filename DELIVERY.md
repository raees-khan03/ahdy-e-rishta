# Delivery notes — Ahd-e-Rishta front end

Companion to `README.md`. Everything below describes the state of the delivered code in this
workspace: what was built, every file, the assumptions behind it, and exactly what the client has to
replace before launch.

Build gates at hand-off:

| Gate          | Command                                   | Result                                    |
| ------------- | ----------------------------------------- | ----------------------------------------- |
| TypeScript    | `npx tsc -b`                              | exit 0, no errors                         |
| Lint          | `npx eslint .`                            | 0 errors, 0 warnings                      |
| Format        | `npx prettier --check`                    | clean                                     |
| Build         | `npm run build`                           | success, `dist/` written (~20 s, 2 cores) |
| Accessibility | axe-core WCAG 2.0/2.1/2.2 A+AA, 20 routes | 0 violations                              |
| Console       | 24 routes × 3 viewports (360/768/1440)    | no errors, no page exceptions             |
| Overflow      | same sweep, `window.scrollX` after scroll | 0 px on every route at every width        |

Size: 142 TypeScript files, ~15 000 lines under `src/`.

---

## 1. Routes delivered

| Route                                  | Page                                | Notes                                                                                                                                           |
| -------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                    | `HomePage`                          | 22 sections in the specified order                                                                                                              |
| `/profiles`                            | `ProfilesPage`                      | URL-synced filters, sort, chips, pagination, grid/list, skeletons, empty state, mobile filter sheet                                             |
| `/profiles/:id`                        | `ProfileDetailPage`                 | Breadcrumb, facts list, similar profiles, print stylesheet, no personal data in SEO head                                                        |
| `/register`                            | `RegisterPage`                      | 6-step wizard, benefits panel, "What happens next", thank-you screen with reference number                                                      |
| `/services`, `/services/:slug`         | `ServicesPage`, `ServiceDetailPage` | 6 services: `rishta-matching`, `personal-matchmaking`, `second-marriage`, `overseas-proposals`, `marriage-counselling`, `face-to-face-meetings` |
| `/packages`                            | `PackagesPage`                      | Essential / Select / Premium, horizontally scrollable comparison table, bank transfer + JazzCash + Easypaisa copy, refund note                  |
| `/how-it-works`                        | `HowItWorksPage`                    | 6-stage timeline                                                                                                                                |
| `/success-stories`                     | `SuccessStoriesPage`                | City + year filters, detail dialog, share, "sample stories" notice                                                                              |
| `/videos`                              | `VideosPage`                        | Topic chips, dialog player                                                                                                                      |
| `/about`, `/team`                      | `AboutPage`, `TeamPage`             | Founder message on the home page is mirrored in About                                                                                           |
| `/contact`                             | `ContactPage`                       | zod form, honeypot, map placeholder, office hours                                                                                               |
| `/faq`                                 | `FaqPage`                           | Search + grouped accordions                                                                                                                     |
| `/safety-tips`                         | `SafetyTipsPage`                    | Fake-matchmaker guidance + report CTA                                                                                                           |
| `/blog`, `/blog/:slug`                 | `BlogPage`, `BlogPostPage`          | 6 posts                                                                                                                                         |
| `/shortlist`                           | `ShortlistPage`                     | localStorage-backed, header count badge                                                                                                         |
| `/terms`, `/privacy`, `/refund-policy` | `LegalPage` (3 variants)            | Shared renderer, `legalContent.ts`                                                                                                              |
| `/login`                               | `LoginPage`                         | Form-only stub; clearly marked "coming soon" copy, no auth                                                                                      |
| `*`                                    | `NotFoundPage`                      | 404 with search + suggested links                                                                                                               |

Plus `ErrorBoundary` around the router and a route-level `Suspense` fallback (`PageSkeleton`) for
every lazy chunk.

---

## 2. File inventory — everything created

Only files listed here were created; nothing pre-existed in the workspace.

### Root / config (15)

| File                                                         | Purpose                                                                                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `package.json`                                               | deps + scripts (`dev`, `build`, `preview`, `lint`, `typecheck`, `format`)                                                 |
| `package-lock.json`                                          | lockfile                                                                                                                  |
| `vite.config.ts`                                             | react + tailwind v4 plugins, `@` → `./src`, dev/preview on `0.0.0.0` with `allowedHosts`, `manualChunks` (vendor, motion) |
| `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` | strict, `noUnusedLocals`, `@/*` paths                                                                                     |
| `eslint.config.js`                                           | flat config: typescript-eslint recommended, react-hooks, react-refresh, `no-console` (warn/error/info allowed)            |
| `.prettierrc`                                                | project formatting                                                                                                        |
| `.env` / `.env.example`                                      | API + WhatsApp variables                                                                                                  |
| `.gitignore`                                                 | node_modules, dist, env                                                                                                   |
| `components.json`                                            | shadcn/ui manifest (`@/components`, Tailwind v4, no config file)                                                          |
| `index.html`                                                 | lang="en", fonts preconnect-free, base meta, noscript                                                                     |
| `public/favicon.svg`                                         | monogram mark                                                                                                             |
| `public/robots.txt`                                          | allows all, points to sitemap                                                                                             |
| `public/sitemap.xml`                                         | all static routes, `http://www.sitemaps.org/schemas/sitemap/0.9`                                                          |
| `README.md`, `DELIVERY.md`                                   | this documentation                                                                                                        |

### Application shell (5)

`src/main.tsx` (QueryClient, i18n, router, Sonner, ErrorBoundary) · `src/App.tsx` (23 lazy routes under `Layout`) ·
`src/index.css` (Tailwind v4 `@theme` tokens, base layer, RTL/Urdu rules, print rules, `--animate-*`) ·
`src/vite-env.d.ts` · `src/types/index.ts` (shared view-model types).

### `src/lib/` (10)

| File                     | Purpose                                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `site.ts`                | `siteConfig`: name, tagline, phone, email, address, office hours, social links, `appLinks` (empty → app section hides)                            |
| `env.ts`                 | zod-validated env with demo fallbacks                                                                                                             |
| `whatsapp.ts`            | `buildWhatsAppUrl({ context, profileId, plan })` — every wa.me link goes through this                                                             |
| `analytics.ts`           | `trackEvent()` no-op placeholder with one documented integration point                                                                            |
| `filterOptions.ts`       | Cities, countries, sects, castes, education, occupation, income bands (country-state-city for the country list)                                   |
| `filterChips.ts`         | Active-filter chip descriptors + removal mapping                                                                                                  |
| `homeContent.ts`         | Trust badges, services summary, stats, cities, proposals tabs, how-it-works steps, membership per-band copy, safety tips, why-choose-us, app copy |
| `legalContent.ts`        | Terms, privacy, refund policy documents                                                                                                           |
| `utils.ts`               | `cn()`                                                                                                                                            |
| `animations/variants.ts` | fade/slide/stagger variants honouring reduced motion                                                                                              |

### `src/schemas/` (6)

`common.schema.ts` (Pakistani mobile regex, email, name, `shortText` helper) · `profile.schema.ts` ·
`matchFilter.schema.ts` (the URL filter contract, all fields optional + coercion) · `register.schema.ts`
(the 6-step wizard) · `inquiry.schema.ts` (contact form + honeypot) · `content.schema.ts` (stories,
videos, posts, plans, services, FAQs, consultants, stats).

### `src/api/` (19)

`http.ts` (fetch wrapper, timeout, error normalising, zod parse) · `mock/delay.ts` (artificial latency

- abort support) · `mock/profiles.mock.ts` (96 profiles) · `mock/profiles.query.ts` (filter/sort/paginate) ·
  `mock/content.mock.ts` (services, plans, FAQs, consultants, stories, videos, stats) · `mock/posts.mock.ts` (6 posts) ·
  and one thin API module per resource: `profiles`, `services`, `plans`, `faqs`, `consultants`,
  `successStories`, `videos`, `posts`, `stats`, `heroSlides`, `inquiries`, `registrations`, `newsletter`.

**Endpoint contract to implement server-side** (`VITE_USE_MOCK_API=false`):

```
GET  /profiles?...filters&page&pageSize   -> { items, page, pageSize, total, totalPages }
GET  /profiles/:id                        -> Profile
GET  /profiles?ids=AER-1045,AER-1061      -> Profile[]
GET  /services | /services/:slug          -> Service[] | Service
GET  /plans | /faqs | /consultants | /stats | /hero-slides
GET  /success-stories | /videos | /posts | /posts/:slug
POST /inquiries | /registrations | /newsletter  -> { id }
```

### `src/hooks/` (6)

`useShortlist.ts` (`ids, count, has, toggle, add, remove, clear`; storage key `ahd-e-rishta.shortlist.v1`) ·
`useProfileFilters.ts` (URL ↔ zod filter object, `activeCount`, `removeFilter`, `clearAll`) ·
`useApiQueries.ts` (TanStack Query wrappers incl. `useProfilesByIds`) · `useSeo.ts` (title, meta, OG,
canonical, JSON-LD) · `useMediaQuery.ts` (`useIsDesktop` = ≥1024px) · `useDebouncedValue.ts` (350 ms).

### `src/i18n/` (2)

`index.ts` (i18next init, language persistence, lazy Urdu font import, `html lang/dir` sync) ·
`resources.ts` (EN + UR namespaces: `nav`, `common`, `home`, `forms`, `errors`, `footer`, `language`).

### `src/components/ui/` (19)

`accordion` · `badge` · `breadcrumb` · `button` (variants incl. `whatsapp`, `peach`) · `card` ·
`carousel` (embla + autoplay) · `checkbox` · `dialog` · `input` · `label` · `option-select` (native
select styled to match) · `pagination` · `separator` · `sheet` · `skeleton` · `sonner` · `tabs` ·
`textarea` · `tooltip`.

### `src/components/common/` (10)

`SectionHeading` (eyebrow / heading / gradient bar / description) · `ScrollReveal` + `RevealItem` ·
`DataState` (loading / error / empty in one place) · `PageHero` · `PageSkeleton` · `Logo` · `DynamicIcon` ·
`VideoDialog` + `VideoCard` (youtube-nocookie, iframe only after a click) · `StoryCard` ·
`WhatsAppIcon`.

### `src/components/layout/` (9)

`Header` (announcement bar, mega-free desktop nav, language switcher, register + WhatsApp CTA,
shortlist badge, mobile sheet with phone fallback) · `AnnouncementBar` (dismissible, persisted) ·
`LanguageSwitcher` (EN / اردو) · `Footer` (4 columns, legal links, newsletter, contact, socials) ·
`FloatingActions` (WhatsApp pill + back-to-top, compact below `lg`) · `ScrollToTop` (route change) ·
`CookieConsent` (persisted) · `Layout` (skip link, header, `<main>`, footer, floating actions) ·
`ErrorBoundary` (friendly recovery screen).

### `src/components/forms/` (9)

`FormField.tsx` (label, hint, error, wires `aria-describedby`/`aria-invalid` via `cloneElement`) ·
`ComboboxField.tsx` (searchable select for city/caste/education) · `NewsletterForm.tsx` ·
`ContactForm.tsx` (zod + honeypot) · `RegisterForm.tsx` (wizard shell, step validation, review step) ·
`registerSteps.ts` (step definitions + per-step schemas) · `registerMessage.ts` (WhatsApp summary
text of a submission) · `RegisterSuccess.tsx` (thank-you screen, reference number, WhatsApp hand-off).

### `src/components/profiles/` (6)

`ProfileCard.tsx` (photo, name + last initial, ID, facts, shortlist button, no contact data) ·
`ProfilePhoto.tsx` (local SVG placeholder art, `aspect-square sm:aspect-4/5`) · `ShortlistButton.tsx`
(accessible toggle + toast) · `ShareButton.tsx` (Web Share + clipboard fallback) ·
`ProfileCarousel.tsx` (embla, keyboard accessible) · `FilterPanel.tsx` (all filters, `showTitle` prop
so the mobile sheet doesn't repeat the heading).

### `src/components/home/` (22)

`HeroCarousel` (3 slides with locally bundled photography, one `h1`) · `FindMatchSection` ·
`TrustStrip` · `ServicesSection` · `StatsSection` · `BrowseByCitySection` · `ProposalsTabsSection`
(Pakistan / Overseas tabs, 4 cards each) · `FeaturedProfilesSection` (Grooms / Brides in one `Tabs`
root) · `HowItWorksSection` · `SecondMarriageSection` (dark maroon band, divorced/widowed tabs) ·
`MembershipPlansSection` · `ConsultantsSection` · `FounderMessageSection` (Great Vibes quote marks +
signature) · `SafetySection` · `SuccessStoriesSection` · `VideosSection` · `WhyChooseUsSection` ·
`LatestProfilesSection` · `MobileAppSection` (renders only if `siteConfig.appLinks` is non-empty) ·
`FaqSection` (10 questions) · `NewsletterSection` · `CtaSection`.

### `src/pages/` (21 files, 23 routes)

`HomePage` · `ProfilesPage` · `ProfileDetailPage` · `RegisterPage` · `ServicesPage` ·
`ServiceDetailPage` · `PackagesPage` · `HowItWorksPage` · `SuccessStoriesPage` · `VideosPage` ·
`AboutPage` · `TeamPage` · `ContactPage` · `FaqPage` · `SafetyTipsPage` · `BlogPage` ·
`BlogPostPage` · `ShortlistPage` · `LegalPage` · `LoginPage` · `NotFoundPage`.

### `src/assets/photos/` (15)

- `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg` — the three home hero photographs (floral still life,
  hands over embroidery, candlelit celebration table). Generated for this project, bundled locally,
  and free of faces so no likeness is implied.
- `post-1..6.svg` — six on-brand abstract article covers (arches, lattice, rings, chevrons, dot grid,
  layered arcs) in the khaki/maroon palette, ~1 kB each and inlined by Vite.
- `female-1..3.svg`, `male-1..3.svg` — abstract, non-photographic placeholder profile portraits (no
  real people, so no likeness rights issue while the client sources consented photography).

`public/og-image.jpg` — 1200×630 social share image cropped from `hero-1.jpg`, referenced as the
default OG image by `useSeo`.

---

## 3. Assumptions made

1. **Language scope.** The i18n _infrastructure_ is complete and toggling to اردو flips direction,
   navigation, footer and shared UI strings. Page body copy (hero paragraphs, service descriptions,
   blog posts, legal text) is English-only in this delivery — a full Urdu translation pass is content
   work, not code work. The hero headline and description remain English when اردو is selected; the
   layout, fonts and direction switch correctly.
2. **Imagery is placeholder.** The three hero photographs and six article covers were produced for
   this build and ship inside the bundle; the profile portraits are abstract SVGs. Nothing is
   borrowed from a competitor or a stock library, so the client can swap in their own approved
   photography without a licensing trail. Video thumbnails are the only remote images (YouTube's
   CDN) and they degrade to a local arch pattern if the network blocks them.
3. **No real profiles.** All 96 profiles, 6 success stories, 6 videos, 6 blog posts and 4 consultants
   are invented. Photos are abstract SVGs rather than stock people, matching the brief's ban on copied
   competitor imagery. Video entries point at placeholder YouTube ids — the player uses
   `youtube-nocookie.com` and only mounts an iframe after a click.
4. **App section hidden.** `siteConfig.appLinks` is empty, so the mobile-app band is not rendered.
   Filling in the two store URLs makes it appear; nothing else changes.
5. **Payments are copy only.** Packages mention bank transfer, JazzCash and Easypaisa as _offline_
   steps with a refund note; there is deliberately no gateway, card field or "Pay now" flow.
6. **Bureau model.** There is no self-service messaging between members. Every contact path is a
   WhatsApp deep link with a context string, or the register/inquiry forms. The profile detail page
   withholds all direct contact data by design.
7. **Login is a stub.** `/login` renders a validated form and a "member area coming soon" notice, and
   submits nothing. Removing it is a single route deletion if the client prefers.
8. **Mock latency.** Mock services add 200–450 ms so loading skeletons are visible during review;
   set `VITE_USE_MOCK_API=false` to remove them entirely.
9. **Numbers are illustrative.** Stats such as "profiles reviewed" are round, obviously-placeholder
   figures and the UI never claims percentages, awards, registrations or celebrity endorsements.
10. **Fonts are self-hosted** through Fontsource exactly as instructed, so no third-party font request
    is made at runtime and the Urdu face is only fetched when the language is switched.
11. **Deployment target is a static host.** Sitemap/robots assume the site is served at the root of
    `siteConfig.url`; hash-free client routing means the host needs an SPA rewrite to `index.html`
    (`/profiles` must not 404). No SSR, no server functions.

---

## 4. Placeholders the client must replace

All of these carry the marker `// DUMMY DATA, replace with real data or API`.

**Brand and contact** — `src/lib/site.ts`: `name`, `legalName`, `tagline`, `phone` / `phoneDisplay`,
`email`, office `addressLines`, `officeHours`, `social` URLs, `url` (used for canonical + sitemap),
`appLinks.playStore` / `appLinks.appStore`.

**WhatsApp** — `.env`: `VITE_WHATSAPP_NUMBER` (currently `923001234567`) and `VITE_WHATSAPP_MESSAGE`.
This number appears in the header, footer, floating pill, every CTA band and the register hand-off.

**Imagery** — `src/assets/photos/`: replace `hero-1..3.jpg` with the bureau's approved photography
(keep the same filenames and the imports in `src/api/mock/content.mock.ts` stay valid), swap
`post-1..6.svg` for real article images if desired, and replace the six abstract profile portraits
with consented photographs from the office. Regenerate `public/og-image.jpg` (1200×630) to match the
final hero image. Consultant names, roles and the founder name live in
`src/api/mock/content.mock.ts` and `homeContent.ts`.

**Profiles** — `src/api/mock/profiles.mock.ts`: 96 sample profiles (IDs `AER-1001`…). Whether these
come from the API or SQL, the card contract is `first name + last initial + profile ID` only.

**Content collections** — `src/api/mock/content.mock.ts` (services, plans and pricing, FAQs,
consultants, success stories, videos, stats) and `src/api/mock/posts.mock.ts` (6 blog posts).

**Legal** — `src/lib/legalContent.ts`: terms, privacy policy, refund policy. These are structural
templates, not legal advice — a Pakistani lawyer should review them before launch.

**Page copy** — `src/lib/homeContent.ts` (trust badges, how-it-works steps, safety tips, why-choose-us,
membership band copy) and the JSX strings inside `src/pages/*` for the About/Team narrative.

**Analytics** — `src/lib/analytics.ts`: `trackEvent()` currently a no-op. Add the GA4/GTM/Meta Pixel
call in the single documented place.

**Map** — `src/pages/ContactPage.tsx`: styled map placeholder. Drop in a Google Maps embed or a
keyed Mapbox component where the placeholder sits.

**SEO assets** — `index.html`, `public/og-image.jpg`, `VITE_SITE_URL`, `public/sitemap.xml` (replace the demo domain and
re-generate when blog/service slugs are final), `src/lib/site.ts` `url`.

**Urdu translations** — `src/i18n/resources.ts`: fill the `ur` block per page; the plumbing already
handles direction, fonts and persistence.

---

## 5. Verified behaviour (manual + scripted QA)

- Filters on `/profiles` round-trip through the URL, restore on reload, render removable chips, and
  reset with "Clear all"; sort and grid/list toggle persist in the query string.
- Mobile filter sheet opens from the toolbar, applies and closes; results count updates.
- Register wizard: blocks on a missing required select with `role="alert"`, advances through all six
  steps, and a full submit reaches the thank-you screen with a generated reference number
  (`REG-…`) and no console output of submitted data.
- Shortlist: heart toggles without navigating, badge count in the header updates, `/shortlist`
  restores from localStorage after reload, discussion CTA opens WhatsApp with the shortlist context.
- Newsletter rejects a malformed address with the inline message "Enter a valid email address";
  contact form surfaces four field-level alerts and a honeypot that silently rejects bots.
- RTL: switching to اردو sets `<html lang="ur" dir="rtl">`, mirrors navigation, hero and footer, and
  loads the Nastaliq face; no layout breakage at 360 px.
- Print: `/profiles/:id` prints without chrome (header, footer and floating actions hidden), with the
  bureau contact block at the top.
- Reduced motion: all reveal/carousel motion collapses under `prefers-reduced-motion: reduce`.

---

## 6. Known limitations (by design, not bugs)

- Single-page app: needs an SPA fallback on the host for deep links.
- No authentication, no member area, no payment gateway, no admin — out of scope per the brief.
- Urdu covers navigation and shared UI strings only (see assumption 1).
- YouTube is the only remote dependency: thumbnails load from `i.ytimg.com` (with a local fallback
  pattern if blocked) and the privacy-enhanced player only mounts after a visitor clicks. In a
  network-isolated preview the player area will stay black — that is expected, and it works in a
  normal browser.
- `dist/` warns that the main chunk is ~568 kB before gzip because shadcn/Radix + motion are bundled;
  vendor and motion are already split into separate chunks and the page is route-lazy-loaded. Further
  trimming would mean dropping Radix primitives, which the stack requires.
