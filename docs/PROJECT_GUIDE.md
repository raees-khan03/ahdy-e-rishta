# Ahd-e-Rishta front end: project guide

Aap ke hawalay ki gayi site ka front end ab mukammal hai. Har section ka text, tasveer, plan
aur video admin panel se badla ja sakta hai, kyunke components mein koi content hard-coded
nahi hai. Filhaal data mock services se aa raha hai, aur asli API lagane ke liye sirf ek
environment variable badalna hai.

Yeh guide do cheezon ke liye hai: developer jo site chalaye, aur bureau ka wo shakhs jo
content update karega.

---

## 1. Roman Urdu summary (short)

- Website React, TypeScript aur Tailwind se bani hai. Sab kuch mobile se pehle design hua hai,
  yani 360 px ki screen par bhi horizontal scroll nahi aata.
- Har page ka content `src/api/` ki services se aata hai. Filhaal yeh services mock data
  (`src/api/mock/`) bhejti hain, magar JSON ka shape wahi hai jo asli API bhejegi.
  `VITE_USE_MOCK_API=false` karne par wahi components asli API se baat karenge.
- Har record ke paas `id`, `isActive`, `sortOrder`, `createdAt` aur `updatedAt` hain. Admin
  jab koi record band karta hai (`isActive: false`), wo site se khud hat jata hai. Poora
  section khali ho jaye to page par saaf "kuch publish nahi hua" wala message aata hai.
- Logo aap ka diya hua file hai (`src/assets/logo.png`). Favicon aur social share image usi
  logo se banaye gaye hain. Logo ka URL site settings ka field hai, is liye admin baad mein
  naya file upload kar sakta hai.
- Login sirf un logon ke liye hai jin ka account office banata hai. Public sign up nahi hai,
  aur registration par OTP nahi maanga jata.
- Register form aap ki di hui 6 step wali form hai: submit par details WhatsApp par khulti
  hain, aur ek copy bureau ke records ke liye service se bhi jama hoti hai.

---

## 2. Chalane aur banane ka tareeqa

```bash
npm install          # pehli baar
npm run dev          # http://localhost:5173
npm run build        # production build, dist/ mein
npm run preview      # built site ko local par test karein
npm run lint         # eslint
npx tsc -b           # type check
```

Node 20+ chahiye. Dev server `0.0.0.0` par bind hota hai, is liye preview link kisi bhi host
se khul jata hai.

### Agar dev server band ho jaye

Bahut chhoti machine (2 GB RAM) par `npm run dev` ke waqt Node band ho sakta hai, kyunke Vite
saari dependencies ek saath optimize karta hai. Yeh app ka masla nahi hai. Hal:

```bash
NODE_OPTIONS=--max-old-space-size=768 npm run dev
```

Is se memory ki hadd tay ho jati hai aur server chal jata hai. Normal laptop par iski zaroorat
nahi. Isi liye har tabdeeli ke baad `npm run build && npm run preview` se bhi tasdeeq karein.

Yeh masla build par bhi aa sakta tha, kyunke Tailwind v4 khud se poore project folder ko scan karta
hai aur `uploads/` ke bare text files (jaise `project-code.txt`) bhi parh leta hai. Is liye
`src/index.css` mein source detection band kar ke sirf asli files batayi gayi hain:

```css
@import "tailwindcss" source(none);

@source "../index.html";
@source "./**/*.{ts,tsx}";
```

Is se build 25 second se 10 second par aa gaya, memory ka spike khatam ho gaya, aur CSS bhi
chhoti ho gayi (junk classes nikal gayin). Naya folder `src/` ke bahar banayein to us mein
classes na likhein, warna woh CSS mein shamil nahi hongi.

**Zaroori baat:** `vite.config.ts` mein `server.allowedHosts: true` hai. Dev server chalte
waqt is file ko na chherein, warna server band ho jata hai. Config badalne ke baad
`npm run preview` se tasdeeq karein.

---

## 3. Folder tree (per file)

```
index.html                      Title, meta, favicon, OG image
vite.config.ts                  Alias @ -> src, allowedHosts
tsconfig*.json                  Strict TS, noUnusedLocals
eslint.config.js                Flat config
.env / .env.example             Environment variables (neeche list hai)
public/
  favicon.png                   Logo se banaya gaya favicon
  apple-touch-icon.png          Logo se banaya gaya iOS icon
  og-image.jpg                  Logo se banaya gaya share image
  robots.txt, sitemap.xml       Crawler files
src/
  main.tsx                      Providers: Query, Router, SiteSettings, Auth, Tooltip
  App.tsx                       Saare routes (neeche table)
  index.css                     Tailwind v4 theme: maroon, peach, cream, khaki
  assets/
    logo.png                    Aap ka diya hua logo (header, footer, login, register, 404)
    rose-banner.svg             Halka decorative banner, koi mark nahi
    register-couple.jpeg        Register page ki side tasveer
    login-couple.jpeg           Login page ki side tasveer
    photos/male-1.svg           Profile photo fail hone par fallback (male)
    photos/female-1.svg         Profile photo fail hone par fallback (female)
    photos/hero-1..3.jpg        Hero slider, dulha dulhan couple poses (maroon theme), 1600x1000
    photos/story-1..6.jpg       Story cards
    photos/service-1..6.jpg     Service pages
    photos/profile-f-1..4.jpg   Bride portraits, placeholder
    photos/profile-m-1..4.jpg   Groom portraits, placeholder
    photos/team-1..4.jpg        Consultants
    photos/director.jpg         Director message
    photos/video-1..6.jpg       Video posters
    photos/post-1..6.svg        Blog covers
  schemas/
    common.schema.ts            Paginated shape, shared helpers
    content.schema.ts           Site settings, blocks, hero, stats, plans, consultants,
                                director, stories, testimonials, videos, faqs, services,
                                posts, cities, steps, safety tips, milestones, legal,
                                categories
    profile.schema.ts           Profile + filters
    register.schema.ts          Aap ki di hui register validation
    login.schema.ts             Phone normalise, login, OTP, new password
    auth.schema.ts              User, role, session
    matchFilter.schema.ts       Find match fields
    inquiry.schema.ts           Contact form
    interest.schema.ts          Interest record
  api/
    http.ts                     Typed fetch + zod validation + ApiError + timeout
    createListApi.ts            Read-only collections ka ek factory
    siteSettings.api.ts         get / update site settings
    contentBlocks.api.ts        Har section ki heading copy
    heroSlides.api.ts, stats.api.ts, trustItems.api.ts, cities.api.ts
    plans.api.ts, consultants.api.ts, directorMessage.api.ts
    successStories.api.ts, testimonials.api.ts, videos.api.ts, faqs.api.ts
    services.api.ts, posts.api.ts, processSteps.api.ts, verificationSteps.api.ts
    safetyTips.api.ts, milestones.api.ts, legalPages.api.ts, categories.api.ts
    profiles.api.ts             List, detail, similar, featured, latest, second marriage
    inquiries.api.ts, newsletter.api.ts, registrations.api.ts
    interests.api.ts            Member ki shortlist / interest requests
    auth.api.ts                 Login, logout, session, reset, change password
    mock/
      records.ts                base(), visible(), SEED_TIME
      delay.ts                  Fake latency
      profiles.mock.ts          96 dummy profiles, AER-1041 se shuru
      profiles.query.ts         Filter, sort, paginate (asli API ka reference)
      siteSettings.mock.ts, contentBlocks.mock.ts, heroSlides.mock.ts
      stats.mock.ts, trustItems.mock.ts, cities.mock.ts, plans.mock.ts
      consultants.mock.ts, director.mock.ts, successStories.mock.ts
      testimonials.mock.ts, videos.mock.ts, faqs.mock.ts, services.mock.ts
      posts.mock.ts, editorial.mock.ts (steps, safety, milestones, legal, categories)
      auth.mock.ts              Dev-only dummy accounts
      interests.mock.ts, submissions.mock.ts
  context/
    SiteSettingsProvider.tsx    settings + block(key) helper
    AuthProvider.tsx            Session, login, logout, 401 par auto sign out
  hooks/
    useApiQueries.ts            Sab ke sab TanStack Query hooks
    useShortlist.ts             localStorage shortlist + account sync
    useSeo.ts                   Title, meta, OG, canonical, JSON-LD
    useProfileFilters.ts        URL se filters padhna / likhna
  lib/
    env.ts                      Runtime-validated env
    navigation.ts               Nav, footer aur account links
    homeContent.ts              Home ki copy: trust badges, safety list, why-us, steps
    site.ts                     Office details aur nav links (footer, contact)
    whatsapp.ts                 WhatsApp deep link builder
    filterOptions.ts            Dropdown options (cities, education, income)
    filterChips.ts              Active filter chips
    analytics.ts                No-op event tracker, consent ke baghair kuch nahi bhejta
    utils.ts                    cn() helper
    animations/variants.ts      Motion variants
  components/
    layout/                     Layout, Header, Footer, AnnouncementBar, CookieConsent,
                                FloatingActions, LanguageSwitcher, ScrollToTop, ErrorBoundary
    home/                       HeroCarousel, FindMatchSection + 20 data-driven sections
    forms/                      RegisterForm, registerSteps, registerMessage, RegisterSuccess,
                                RegisterIntro, LoginForm, LoginIntro, ComboboxField,
                                FormField, ContactForm, NewsletterForm
    profiles/                   ProfileCard, ProfileCarousel, ProfilePhoto, FilterPanel,
                                ShortlistButton, ShareButton
    plans/                      PlanCard (+ formatPrice), PlanCarousel
    common/                     SectionHeading, PageHero, DataState (EmptyState + skeleton),
                                DynamicIcon, ScrollReveal, StoryCard, VideoDialog, Logo,
                                WhatsAppIcon, PageSkeleton
    auth/                       ProtectedRoute
    ui/                         20 shadcn/ui wrappers (button, input, dialog, sheet, ...)
  pages/                        23 pages, ek page = ek route
  i18n/                         English + Urdu resources, dir switch, Nastaliq font
```

`src/data/` aur `src/types/` hata diye gaye hain: dono khali ya ghair-istemal shuda thay.

---

## 4. Routes

| Path                                   | Page               | Notes                                   |
| -------------------------------------- | ------------------ | --------------------------------------- |
| `/`                                    | HomePage           | Hero + 21 data-driven sections          |
| `/profiles`                            | ProfilesPage       | Find match filters URL mein rehte hain  |
| `/profiles/:id`                        | ProfileDetailPage  | Photo ya "Photograph on request"        |
| `/register`                            | RegisterPage       | Aap ki 6 step form, WhatsApp par submit |
| `/services`                            | ServicesPage       |                                         |
| `/services/:slug`                      | ServiceDetailPage  |                                         |
| `/packages`                            | PackagesPage       | Plan carousel + comparison table        |
| `/how-it-works`                        | HowItWorksPage     | Timeline + verification checks          |
| `/success-stories`                     | SuccessStoriesPage |                                         |
| `/videos`                              | VideosPage         | Card par click, dialog mein iframe      |
| `/about`                               | AboutPage          | Director message, milestones            |
| `/team`                                | TeamPage           | Consultants                             |
| `/contact`                             | ContactPage        | Form + office details + map             |
| `/faq`                                 | FaqPage            | Category tabs + search                  |
| `/safety-tips`                         | SafetyTipsPage     | Red flags, never-ask list, report steps |
| `/blog`                                | BlogPage           |                                         |
| `/blog/:slug`                          | BlogPostPage       |                                         |
| `/shortlist`                           | ShortlistPage      | Device par mehfooz                      |
| `/terms`, `/privacy`, `/refund-policy` | LegalPage          | `useLegalPage` se                       |
| `/login`                               | LoginPage          | Public sign up nahi                     |
| `/forgot-password`                     | ForgotPasswordPage | Phone, code, new password               |
| `/account`                             | AccountPage        | `ProtectedRoute` (user, admin)          |
| `*`                                    | NotFoundPage       | Logo + ghar wapas link                  |

---

## 5. Data flow

```
Component  ->  hook (useApiQueries / useShortlist / useAuth)
                 |
                 v
            src/api/*.api.ts        (agar VITE_USE_MOCK_API=true to mock, warna asli API)
                 |
                 v
            http.ts  ->  zod schema se response validate  ->  ApiError on failure
```

- Query cache TanStack Query ke paas hai: `staleTime` 5 minute, `retry: 1`, window focus par
  refetch band. Keys `src/hooks/useApiQueries.ts` ke `queryKeys` mein ek jagah likhi hui hain.
- `createListApi` har read-only list par `isActive: false` records hata deta hai, mock aur
  asli API dono par.
- `SiteSettingsProvider` `block("home.services")` jaisi keys se section ki heading, eyebrow
  aur subtitle deta hai. Admin block delete kar de to heading chhup jati hai aur layout tootta
  nahi.
- `AuthProvider` session `localStorage` key `ahd-e-rishta:session` mein rakhta hai. Koi bhi
  API 401 de to session saaf ho kar user `/login` par chala jata hai.
- Shortlist device par `ahd-e-rishta.shortlist.v1` mein hai. Sign in par wo account wali key
  mein merge ho jati hai, is liye pehle save kiye hue profiles zaya nahi hote.

### Content block keys

`home.findMatch`, `home.services`, `home.cities`, `home.proposals`, `home.featured`,
`home.howItWorks`, `home.secondMarriage`, `home.plans`, `home.consultants`, `home.director`,
`home.safety`, `home.stories`, `home.videos`, `home.why`, `home.latest`, `home.faq`,
`home.newsletter`, `home.cta`, `home.app`, `page.profiles`, `page.register`, `page.services`,
`page.packages`, `page.howItWorks`, `page.stories`, `page.videos`, `page.about`, `page.team`,
`page.contact`, `page.faq`, `page.safety`, `page.blog`, `page.shortlist`, `page.login`,
`page.forgot`, `page.account`, `page.legal`, `register.intro`, `login.intro`.

---

## 6. Section / data file / fields / admin control

| Section (page)                                    | Data file (service)                                 | Main fields                                                                                                                                                                                                                                 | Admin kya control karta hai                                                   |
| ------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Header, footer, contact details                   | `siteSettings.api.ts`                               | `siteName`, `tagline`, `taglineUrdu`, `logoUrl`, `phones`, `phoneDisplay`, `whatsappNumber`, `whatsappMessage`, `email`, `address`, `city`, `mapsQuery`, `workingHours`, `socialLinks`, `footerText`, `registrationLine`, `appLinks`, `seo` | Poora brand: naam, logo, numbers, address, timings, social links, footer line |
| Announcement bar                                  | `siteSettings.announcement`                         | `text`, `linkLabel`, `linkHref`, `isActive`                                                                                                                                                                                                 | Bar on/off aur uska text                                                      |
| Hero slider (home)                                | `heroSlides.api.ts`                                 | `image`, `alt`, `heading`, `subheading`, `isActive`, `sortOrder`                                                                                                                                                                            | Tasveer, alt text, optional heading/subheading, tarteeb                       |
| Find match form (home)                            | `contentBlocks` `home.findMatch`                    | eyebrow, title, subtitle                                                                                                                                                                                                                    | Heading copy. Form ke fields `matchFilter.schema.ts` se                       |
| Trust strip (home)                                | `trustItems.api.ts`                                 | `title`, `description`, `icon`                                                                                                                                                                                                              | Char items tak, icon list se                                                  |
| Stats (home, about)                               | `stats.api.ts`                                      | `value`, `label`, `caption`                                                                                                                                                                                                                 | Number aur label                                                              |
| Services (home, `/services`)                      | `services.api.ts`                                   | `slug`, `title`, `shortDescription`, `intro`, `icon`, `imageUrl`, `benefits`, `process`, `faqs`, `suitedFor`                                                                                                                                | Har service ka poora page                                                     |
| Browse by city                                    | `cities.api.ts`                                     | `name`, `slug`, `province`, `profileCount`, `imageUrl`                                                                                                                                                                                      | Konsa shehar dikhe aur uski tasveer                                           |
| Proposals tabs, featured, latest, second marriage | `profiles.api.ts`                                   | Profile schema (neeche), `featured`, `photoVisible`, `photoUrl`                                                                                                                                                                             | Konsa profile kis section mein aaye                                           |
| How it works timeline                             | `processSteps.api.ts`                               | `title`, `description`, `icon`, `note`                                                                                                                                                                                                      | Steps aur unka waqt                                                           |
| Verification checks                               | `verificationSteps.api.ts`                          | `title`, `description`, `icon`                                                                                                                                                                                                              | Checks                                                                        |
| Safety page                                       | `safetyTips.api.ts`                                 | `title`, `description`, `kind` (`tip`, `redFlag`, `neverAsk`, `reportStep`)                                                                                                                                                                 | Teen listein aur report steps                                                 |
| Plans (home, `/packages`)                         | `plans.api.ts`                                      | `name`, `price`, `currency`, `duration`, `shortDescription`, `features[]`, `badge`, `highlighted`, `ctaLabel`, `whatsappMessage`, `comparisonFeatures[]`                                                                                    | Plan ki qeemat, features, badge, highlight, comparison table                  |
| Consultants (home, `/team`)                       | `consultants.api.ts`                                | `name`, `role`, `experience`, `languages`, `cities`, `bio`, `photoUrl`, `focus[]`                                                                                                                                                           | Team ka data aur tasveer                                                      |
| Director message (home, about)                    | `directorMessage.api.ts`                            | `name`, `role`, `photoUrl`, `quote`, `paragraphs`, `signOff`                                                                                                                                                                                | Message aur tasveer                                                           |
| Milestones (about)                                | `milestones.api.ts`                                 | `year`, `title`, `description`                                                                                                                                                                                                              | Timeline                                                                      |
| Success stories                                   | `successStories.api.ts`                             | `coupleLabel`, `city`, `year`, `quote`, `story`, `serviceUsed`, `imageUrl`, `isSample`                                                                                                                                                      | Stories, aur sample flag                                                      |
| Testimonials                                      | `testimonials.api.ts`                               | `name`, `city`, `relation`, `quote`                                                                                                                                                                                                         | Reviews                                                                       |
| Videos                                            | `videos.api.ts`                                     | `title`, `description`, `youtubeId`, `category`, `durationLabel`, `publishedAt`                                                                                                                                                             | Video add/remove, category                                                    |
| FAQ (home, `/faq`, packages)                      | `faqs.api.ts`                                       | `category`, `question`, `answer`                                                                                                                                                                                                            | Sawal jawab aur category                                                      |
| Blog                                              | `posts.api.ts`                                      | `slug`, `title`, `excerpt`, `body[]`, `category`, `author`, `publishedAt`, `readingMinutes`, `imageUrl`, `relatedIds`                                                                                                                       | Articles                                                                      |
| Membership strip (home)                           | `contentBlocks` `home.plans`                        | heading copy                                                                                                                                                                                                                                | Heading copy                                                                  |
| CTA band                                          | `contentBlocks` `home.cta`                          | eyebrow, title, subtitle                                                                                                                                                                                                                    | Copy                                                                          |
| App section                                       | `siteSettings.appLinks`, `contentBlocks` `home.app` | `playStore`, `appStore`, heading                                                                                                                                                                                                            | Links on/off                                                                  |
| Newsletter                                        | `newsletter.api.ts`                                 | email + honeypot                                                                                                                                                                                                                            | Sign-ups ki list                                                              |
| Contact form                                      | `inquiries.api.ts`                                  | name, phone, email, topic, message                                                                                                                                                                                                          | Enquiries ki list                                                             |
| Register form                                     | `registrations.api.ts`                              | `RegisterOutput` (aap ki 22 fields)                                                                                                                                                                                                         | Received registrations                                                        |
| Account: interests                                | `interests.api.ts`                                  | `profileId`, `status`, `note`                                                                                                                                                                                                               | Member ke interest requests                                                   |
| Login, reset, password                            | `auth.api.ts`                                       | `AuthUser`, role, token                                                                                                                                                                                                                     | Accounts sirf office banata hai                                               |
| Legal pages                                       | `legalPages.api.ts`                                 | `slug`, `title`, `intro`, `lastReviewed`, `sections[]`                                                                                                                                                                                      | Terms, privacy, refund                                                        |
| Filter dropdowns                                  | `categories.api.ts`                                 | grouped options                                                                                                                                                                                                                             | Filters ke options                                                            |

---

## 7. Home page: pehla build wapas lagaya gaya

Aap ke kehne par home page ka poora layout us pehle build jaisa wapas kar diya gaya hai. Sab 22
sections, unhi headings, unhi tarteeb aur unhi cards ke saath:

HeroCarousel, FindMatchSection, TrustStrip, ServicesSection, StatsSection, BrowseByCitySection,
ProposalsTabsSection, FeaturedProfilesSection, HowItWorksSection, SecondMarriageSection,
MembershipPlansSection, ConsultantsSection, FounderMessageSection, SafetySection,
SuccessStoriesSection, VideosSection, WhyChooseUsSection, LatestProfilesSection,
MobileAppSection, FaqSection, NewsletterSection, CtaSection.

Purani copy `src/lib/homeContent.ts` aur office ki details `src/lib/site.ts` mein wapas aa gayi
hain. Inko badalna ho to wahi files edit karein. Data wali sections pehle ki tarah services se
aati hain, is liye admin panel se unhe badla ja sakta hai.

Sirf teen cheezein nayi hain, jaisa aap ne kaha tha:

1. Hero carousel naya hai aur poison screen chaura hai: ek HD tasveer poore screen par (width
   100%, height screen minus header), uske oopar cream text: eyebrow, headline, subheading, do
   buttons, phone number, aur neeche dots + counter; arrows upar daayein kone mein. 3 second
   autoplay, hover par rukta hai, reduced motion par band, swipe aur keyboard arrows chalta hai.
   Tasveer ka focal point upar ki taraf rakha gaya hai (`object-position: 50% 10%`, mobile par
   `62% 20%`), taake chhoti ya chaudi screen par bhi dulha dulhan ke chehre aur pagri kabhi
   header ke neeche na katein.
2. Tasveerein. Neeche section 8 dekhein.
3. Back to top button par ab progress ring hai jo scroll ke saath bharta hai. Browser ke
   scroll se seedha hisab hota hai, is liye 0 se 100 tak theek chalta hai.

### Login / register ke peeche background

Form wale column ke peeche do decorative SVG hain (`src/components/forms/backgrounds/`):
`DamaskBackground` (nakshi pattern, `opacity 0.09`) aur `RoseBackground` (4 gulab, `opacity 0.2`).
Teesra `FloralBackground` bhi mojood hai (halka phoolon ka pattern, `children` leta hai) agar kabhi
badalna ho. Koi image file nahi chahiye, sab inline SVG hai.

Pattern lagate waqt parent par `relative isolate` rakhein aur background ko `-z-10` wrapper mein, warna
SVG card ke oopar aa jata hai.

### Login / register par gap ka masla

Auth pages (login, register) ke neeche khali safed patti aati thi. Teen wajahain thin:

1. `min-h-screen` (100vh) page par laga hua tha, magar oopar header 123px le raha hai, is liye page
   100vh + header lamba ho jata tha.
2. `RegisterIntro` par `lg:sticky` + fixed height thi, is liye jab form lamba hota to left panel ke
   neeche safed jagah bach jati thi.
3. Footer par `mt-16` (64px) hai, jo dark panel ke baad safed patti jaisa lagta hai.

Hal: `Layout.tsx` ka `<main>` ab `flex flex-col` hai, aur auth pages ka wrapper `grid flex-1
lg:-mb-16 lg:grid-cols-2` hai. Matlab viewport ka koi hisab nahi, bachi hui jagah bhar di jati hai.
Intro panels se `min-h-screen` aur sticky hata diya, ab wo grid ki poori height lete hain.

### Carousel mein admin kya badalta hai

Hero ki har tasveer ek `hero-slide` record hai: `image`, `alt`, `heading`, `subheading`,
`sortOrder`, `isActive`. Admin panel ki "Hero slider" screen se office:

1. Naya slide add karta hai (tasveer upload 1600x900, alt text zaroori, heading optional).
2. Slide ko on/off karta hai: off karne par wo site se hat jati hai, delete nahi hoti.
3. Arrows se tarteeb badalta hai: autoplay bhi usi tarteeb se chalta hai.

Code mein kuch badalne ki zaroorat nahi. Screen ka poora plan `docs/BACKEND_ADMIN_PROMPT.md`
ke Part 3 mein hai.

## 8. Changelog vs aap ke original files (aap ke originals jeete hain)

| File                                                                                  | Kya hua                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `FindMatchSection.tsx`                                                                | Aap ka 10-field version hero ke neeche wapas lagaya gaya. Fields, validation aur labels waise hi hain. Sirf `@/` alias ke import paths theek kiye, aur submit `/profiles` par wahi query params bhejta hai. `/profiles` ki filter panel bhi wahi fields use karti hai.                                                                                                                                             |
| `RegisterForm.tsx`                                                                    | Aap ki 6 step wizard wapas. Green-800 "Submit & WhatsApp", `console.log("Registration form submitted:", values)`, `saveRegistrationLocally`, WhatsApp deep link aur "Thank you, {name}!" screen bilkul waise hi. Sirf ek cheez jodi: submit par `submitRegistration()` se ek copy bureau ke records mein bhi jati hai (agar wo call fail ho jaye to form ka behaviour nahi badalta, WhatsApp phir bhi khulta hai). |
| `registerSteps.ts`, `register.schema.ts`, `registerMessage.ts`, `RegisterSuccess.tsx` | Aap ke files waise hi. Har field khali shuru hoti hai, date 18 se 70 saal, Pakistani mobile, sibling cross-check, heights 4'0" se 7'0", weights 40 se 150 kg.                                                                                                                                                                                                                                                      |
| `HeroCarousel.tsx`                                                                    | Aap ke kehne par naya carousel likha gaya: poori chaurai ki HD tasveer (screen minus header), uske oopar bottom-left cream text, dots + counter, upar daayein arrows. 3 second autoplay, hover par pause, reduced-motion par band, loop, swipe, keyboard arrows. `object-position` upar ki taraf rakha gaya hai taake chehre kabhi kate na.                                                                        |
| `heroSlides` data                                                                     | Bundled HD couple-pose tasveerein, maroon range (`src/assets/photos/hero-1..3.jpg`, 1600x1000). Pehli do par heading aur subheading, teesri sirf tasveer.                                                                                                                                                                                                                                                          |
| `ComboboxField.tsx`, `FormField.tsx`                                                  | Aap ke files waise hi, sirf import path.                                                                                                                                                                                                                                                                                                                                                                           |
| `filterOptions.ts`                                                                    | Aap ki doosri file wali poori option lists yahan merge ki gayi hain: 11 religions, 14 sects, 54 biradari, 32 education levels, 25 occupations, 8 income bands, 15 languages, Pakistan ke 458 cities aur 250 mulk. `matchFilter.schema.ts` waise hi hai.                                                                                                                                                            |
| Logo                                                                                  | Aap ka `uploads/logo.png` → `src/assets/logo.png`. Favicon, apple icon aur OG image isi se banaye. `settings.logoUrl` field se admin naya logo laga sakta hai.                                                                                                                                                                                                                                                     |
| Hero ke baqi sections                                                                 | Rule 1 ke mutabiq dobara likhe gaye, sab data-driven. Koi certificate, award, government registration ya celebrity endorsement ka dawa nahi hai.                                                                                                                                                                                                                                                                   |
| Big Buck Bunny video                                                                  | Hata diya. Uski jagah 6 asli YouTube videos, jinhein oembed se check kiya gaya, thumbnail `i.ytimg.com` se, iframe `youtube-nocookie` aur sirf click par.                                                                                                                                                                                                                                                          |
| `src/lib/site.ts`, `src/lib/homeContent.ts`                                           | Wapas lagaye gaye, kyunke home ke purane sections inhi se copy lete hain. `legalContent.ts`, `src/data/`, `src/types/` delete rahenge.                                                                                                                                                                                                                                                                             |
| `README.md`, `DELIVERY.md`                                                            | Purane notes. Yeh `docs/` folder unki jagah leta hai; dono files baaqi hain magar sirf reference ke liye.                                                                                                                                                                                                                                                                                                          |

---

## 9. Dummy inventory (launch se pehle badalna zaroori)

| Cheez              | Kitni                                                                                                      | Kahan                              |
| ------------------ | ---------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Profiles           | 96 (`AER-1041` se)                                                                                         | `src/api/mock/profiles.mock.ts`    |
| Portrait photos    | randomuser.me (men/women)                                                                                  | `profiles.mock.ts` ka `portrait()` |
| Hero slides        | 3 Unsplash photos                                                                                          | `heroSlides.mock.ts`               |
| Plans              | 3: Essential Rs 25,000 (3 months), Select Rs 45,000 (6 months, highlighted), Premium Rs 75,000 (12 months) | `plans.mock.ts`                    |
| Consultants        | 4                                                                                                          | `consultants.mock.ts`              |
| Services           | 6                                                                                                          | `services.mock.ts`                 |
| Cities             | 7                                                                                                          | `cities.mock.ts`                   |
| Stats              | 4                                                                                                          | `stats.mock.ts`                    |
| Trust items        | 6                                                                                                          | `trustItems.mock.ts`               |
| Process steps      | 6                                                                                                          | `editorial.mock.ts`                |
| Verification steps | 4                                                                                                          | `editorial.mock.ts`                |
| Safety items       | 24 (6 per kind)                                                                                            | `editorial.mock.ts`                |
| Milestones         | 5                                                                                                          | `editorial.mock.ts`                |
| Success stories    | 6, `isSample: true`                                                                                        | `successStories.mock.ts`           |
| Testimonials       | 4                                                                                                          | `testimonials.mock.ts`             |
| Videos             | 6 real YouTube clips                                                                                       | `videos.mock.ts`                   |
| FAQs               | 10                                                                                                         | `faqs.mock.ts`                     |
| Blog posts         | 6                                                                                                          | `posts.mock.ts`                    |
| Legal pages        | 3 draft documents                                                                                          | `editorial.mock.ts`                |
| Filter categories  | 8 groups                                                                                                   | `editorial.mock.ts`                |
| Office details     | `+92 300 1234567`, Gulberg Business Centre, Lahore                                                         | `siteSettings.mock.ts`             |
| Dev accounts       | 2 (neeche)                                                                                                 | `auth.mock.ts`                     |

Har mock file ke shuru mein `DUMMY DATA` likha comment hai, is liye `grep -rn "DUMMY DATA" src`
se poori list mil jati hai.

### Tasveeron ke bare mein (HD, site ke andar)

- Hero ki 3 tasveerein, 6 story tasveerein, 6 service tasveerein, 12 portrait (4 bride,
  4 groom, team aur director) aur 6 video poster sab `src/assets/photos/` ke andar
  rakhi gayi hain. Sab HD (1600x1000 hero, 820x1100 portrait, 1280x720 poster) aur
  site ke saath bundle hain, is liye internet band ho ya preview frame network na de,
  phir bhi tasveerein nazar aati hain. Hero aur story wali tasveerein asli shaadi ki
  photographs hain (Wikimedia Commons, free licence), portrait placeholder hain.
- Profiles ki tasveerein placeholder portraits hain, asli members nahi. `photoVisible:
false` hone par card "Photograph on request" dikhata hai, jaisa aap ne kaha.
- Consultant, director, story aur service ki tasveerein bhi dummy hain.
- Agar remote tasveer load na ho (band network, ya jo preview iframe internet nahi deta), to
  profile cards local placeholder par chale jate hain aur hero slider local `hero-*.jpg` par.
  Is liye site kabhi tooti hui tasveer nahi dikhati.

---

## 10. Asli data lagane ka tareeqa

1. Editor kholein: har collection ki ek file hai, jaise `src/api/mock/plans.mock.ts`. Fields
   badal dein, `updatedAt` aaj ki date kar dein. Jo record nahi chahiye us par
   `isActive: false` laga dein.
2. Tasveerein: `src/assets/` mein daal kar import karein, ya asli API ka URL `photoUrl` /
   `imageUrl` field mein dein.
3. Logo: `src/assets/logo.png` replace karein aur `npm run build` se `favicon.png`,
   `apple-touch-icon.png`, `og-image.jpg` dobara banayein (neeche command).
4. API lage to `.env` mein `VITE_API_URL` aur `VITE_USE_MOCK_API=false` set karein. `docs/
ADMIN_API_CONTRACT.md` wahi shape batata hai jo services expect karti hain.
5. `src/api/mock/` ka folder sirf development ke liye hai. Production mein ise bundle se
   hata dene ke liye `if (env.useMockApi)` branches delete karna sabse saaf tareeqa hai.

```bash
# logo se favicon aur share image dobara banane ke liye (ImageMagick)
convert src/assets/logo.png -resize 64x64 public/favicon.png
convert src/assets/logo.png -resize 180x180 public/apple-touch-icon.png
convert src/assets/logo.png -resize 1200x630 -background "#fdfbf7" -gravity center \
  -extent 1200x630 public/og-image.jpg
```

---

## 11. Environment variables

| Name                    | Default                           | Kaam                                              |
| ----------------------- | --------------------------------- | ------------------------------------------------- |
| `VITE_API_URL`          | `http://localhost:4000/api`       | Asli API ka base URL                              |
| `VITE_USE_MOCK_API`     | `true`                            | `false` karne par services asli API par jati hain |
| `VITE_WHATSAPP_NUMBER`  | `923001234567`                    | Sirf digits, 10 se 15                             |
| `VITE_WHATSAPP_MESSAGE` | greeting line                     | WhatsApp ka pehla message                         |
| `VITE_SITE_URL`         | `https://ahde-rishta.example.com` | Canonical URL aur OG image ka base                |

`.env` repo mein hai, `.env.example` share karne ke liye. Koi secret front end mein na rakhein:
jo bhi browser tak jata hai wo public hai.

---

## 12. Dev-only cheezein (production mein kabhi nahi)

- **Dummy login:** phone `03001234567`, password `Rishta@2026` (member Ayesha K., Lahore).
  Admin: phone `03009999999`, password `Bureau@2026`.
- **Reset code:** `123456`. Forgot-password screen dev mein yeh code screen par dikhati hai,
  taake testing asaan rahe. Asli API lagne par yeh hint khud ghayab ho jata hai, kyunke wo
  mock branch ke andar hai.
- **Mock latency:** 80 se 600 ms, sirf loading states dikhane ke liye.
- **`console.log` register form mein:** aap ki hidayat par rakha gaya hai. Launch se pehle
  hata dein ya eslint rule se allow kar dein.
- **`isSample: true` stories** aur "Draft wording" wala legal note: asli content aane par
  hata dein.
- **Throttle:** 5 ghalat koshishon ke baad 60 second ka client-side rok. Yeh sirf UI ki hifazat
  hai; asli rok server par honi chahiye.

---

## 13. Pre-launch checklist

- [ ] Saare `DUMMY DATA` records asli content se badal diye gaye.
- [ ] Profile photos consented hain, aur jinke photo nahi chahiye un par `photoVisible: false`.
- [ ] Office number, WhatsApp number, address aur timings `siteSettings` mein sahi hain.
- [ ] Social links sirf asli accounts ke hain (warna `isActive: false`).
- [ ] Legal pages wakil se check ho kar "Draft wording" note hata diya gaya.
- [ ] Noticeboard/announcement bar par koi purana campaign nahi bacha.
- [ ] Koi certificate, award, government registration ya celebrity endorsement ka dawa nahi hai.
- [ ] Hero tasveerein bureau ki apni hain, Unsplash wali dummy nahi.
- [ ] `docs/CONTENT_CHECKLIST.md` ka har item tick hua.
- [ ] `npx tsc -b`, `npm run lint`, `npm run build` teenon saaf.
- [ ] 360 px se 1440 px tak har page par horizontal scroll nahi hai.
- [ ] Login, reset, account aur logout ek dafa asli accounts par test kiye gaye.
- [ ] `.env` mein `VITE_USE_MOCK_API=false` aur asli `VITE_API_URL`.
- [ ] Favicon aur OG image naye logo se dobara banaye gaye.
