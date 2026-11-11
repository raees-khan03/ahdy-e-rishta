# Backend aur admin panel: ready guide + copy-paste prompt

Yeh file do kaam karti hai:

1. Aap ko (ya kisi bhi developer ko) batati hai ke backend aur admin panel banate waqt kya kya chahiye.
2. Neeche ek **poora prompt** hai jo aap kisi bhi AI assistant ya developer ko de sakte hain, aur
   woh bina sawal kiye kaam shuru kar sake.

Front end tayyar hai. Har screen already API se data maangti hai, is liye backend banne ke baad
sirf `.env` mein do line badalni hain.

---

## Part 1: Ab kya majood hai

| Cheez       | Halat                                                                       |
| ----------- | --------------------------------------------------------------------------- |
| Front end   | 24 pages, mobile-first, English + Urdu                                      |
| Data        | Filhaal mock (`src/api/mock/`), magar shape asli API jaisa hi hai           |
| API client  | `src/api/http.ts`, zod se validate, `ApiError(message, status, details)`    |
| Auth        | Mock accounts, `localStorage` session, `AuthProvider`, protected `/account` |
| Uploads     | Koi nahi. Tasveerein abhi `src/assets/photos/` mein bundled hain            |
| Admin panel | Koi nahi                                                                    |

Switch karne ka tareeqa:

```bash
# .env
VITE_API_URL=https://api.ahde-rishta.pk/api
VITE_USE_MOCK_API=false
```

Bas. Har page asli API se baat karega. Jo field shape API nahi degi, wahan screen khali
dikhegi, is liye neeche diya gaya contract exactly follow karein.

Endpoints ki poori list `docs/ADMIN_API_CONTRACT.md` mein hai. Backend usi contract ko follow kare.

---

## Part 2: Backend ka dhancha

### Stack (koi bhi ho sakta hai, magar yeh sab se seedha hai)

- Node 20 + Fastify (ya Express) + TypeScript
- PostgreSQL 15 + Prisma
- Sessions: httpOnly cookie (`Secure`, `SameSite=Lax`), ya JWT in httpOnly cookie
- Passwords: bcrypt (cost 12)
- File uploads: S3 ya Cloudflare R2, signed URLs
- Images: upload par convert to WebP, 3 sizes (400, 900, 1600 px wide)
- Rate limit: `@fastify/rate-limit`
- Validation: zod (wahi schemas jo front end mein hain, copy kar lein)

### Tables

Har content table mein yeh paanch column honge: `id` (text, seedha slug ya uuid),
`isActive` boolean default true, `sortOrder` int, `createdAt`, `updatedAt`.

| Table                                                                                                                                                                                                                                   | Ahem columns                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `users`                                                                                                                                                                                                                                 | id, fullName, phone (unique), passwordHash, role (`user`/`admin`/`editor`), city, memberSince, isActive                                                                                                                                                                            |
| `password_resets`                                                                                                                                                                                                                       | id, userId, codeHash, expiresAt, usedAt, attempts                                                                                                                                                                                                                                  |
| `site_settings`                                                                                                                                                                                                                         | ek hi row: siteName, tagline, taglineUrdu, logoUrl, description, phones[], phoneDisplay, whatsappNumber, whatsappMessage, email, address, city, mapsQuery, workingHours[], footerText, registrationLine, appLinks json, announcement json, seo json                                |
| `social_links`                                                                                                                                                                                                                          | label, href, icon, isActive, sortOrder                                                                                                                                                                                                                                             |
| `content_blocks`                                                                                                                                                                                                                        | key (unique), eyebrow, title, subtitle, body, items json, isActive, sortOrder                                                                                                                                                                                                      |
| `hero_slides`                                                                                                                                                                                                                           | image, alt, heading, subheading, isActive, sortOrder                                                                                                                                                                                                                               |
| `services`                                                                                                                                                                                                                              | slug (unique), title, shortDescription, intro, icon, imageUrl, benefits[], process json, faqs json, suitedFor[]                                                                                                                                                                    |
| `plans`                                                                                                                                                                                                                                 | name, price int, currency, duration, shortDescription, features[], badge, highlighted bool, ctaLabel, whatsappMessage, comparisonFeatures json                                                                                                                                     |
| `profiles`                                                                                                                                                                                                                              | profileId (unique, `AER-1041`), displayName, gender, age, dateOfBirth, heightCm, maritalStatus, hasChildren, religion, sect, caste, education, occupation, income, city, country, languages[], about, partnerDemands json, photoVisible, photoUrl, verified, packageName, featured |
| `cities`, `stats`, `trust_items`, `consultants`, `director_message`, `milestones`, `process_steps`, `verification_steps`, `safety_tips`, `faqs`, `videos`, `success_stories`, `testimonials`, `blog_posts`, `legal_pages`, `categories` | jaisa `ADMIN_API_CONTRACT.md` mein hai                                                                                                                                                                                                                                             |
| `registrations`                                                                                                                                                                                                                         | values json (aap ki 22 register fields), reference, createdAt                                                                                                                                                                                                                      |
| `inquiries`                                                                                                                                                                                                                             | name, phone, email, topic, message, createdAt                                                                                                                                                                                                                                      |
| `newsletter_subscribers`                                                                                                                                                                                                                | email unique, source, createdAt                                                                                                                                                                                                                                                    |
| `interests`                                                                                                                                                                                                                             | userId, profileId, status, note, isActive                                                                                                                                                                                                                                          |
| `shortlists`                                                                                                                                                                                                                            | userId, profileId                                                                                                                                                                                                                                                                  |
| `media`                                                                                                                                                                                                                                 | url, width, height, bytes, alt, uploadedBy, createdAt                                                                                                                                                                                                                              |
| `audit_log`                                                                                                                                                                                                                             | actorId, action, collection, recordId, before json, after json, at                                                                                                                                                                                                                 |

### Qawaid jo backend ko khud lagane chahiye

- Har public `GET` sirf `isActive: true` bheje, `sortOrder` se sorted, phir `createdAt`.
- `perPage` 1 se 60. Default 20.
- Public endpoints par kabhi phone number, CNIC ya poora naam na jaye.
- `photoVisible: false` ho to `photoUrl` response mein na ho.
- Login ka error hamesha wahi: `Number or password is incorrect.` (401)
- Password reset ka jawab hamesha `{ sent: true }`, chahe number majood ho ya na ho.
- OTP 6 digits, 10 minute valid, ek dafa chalne wala, 5 ghalat koshishon par 15 minute block.
- Public form submit: 5 requests per 10 minute per IP. Honeypot bhara ho to 200 wapas, record na bane.
- Delete hamesha soft (`isActive: false`).
- Har write par `audit_log` entry.
- Upload: max 4 MB, sirf jpeg/png/webp (logo ke liye svg), SVG sanitise ho, naam badal do.
- Har list response `{ items, page, perPage, total, totalPages }`.

---

## Part 3: Admin panel ke screens

### 1. Login

Email/phone + password. Do roles: `admin` (sab kuch) aur `editor` (content likh sakta hai, users aur
settings nahi).

### 2. Dashboard

Aaj ke numbers: naye registrations, nayi inquiries, newsletter count, active profiles,
pending interests. Neeche "recently changed" list, taake pata chale kis ne kya badla.

### 3. Hero slider (carousel)

Yahi screen aap ke sawal ka jawab hai:

- Har slide ek card: tasveer ka preview, alt text, heading, subheading, up/down arrows (tarteeb),
  on/off switch, delete.
- "Add slide" par: tasveer upload (ya media library se chunein), alt text likhein (zaroori, 80
  characters tak, kyunke screen reader isi se parhta hai), heading aur subheading optional.
- "Save" par front end ka hero turant wahi tasveerein dikhata hai. Code chherne ki zaroorat nahi.
- 8 slides se zyada na rakhein. Har tasveer 1600x900 ya us se badi, landscape, 400 KB se kam ho
  to site tez rehti hai.
- On/off switch se slide site se hat jati hai magar delete nahi hoti.
- Tarteeb badalne par autoplay usi tarteeb se chalega.

### 4. Profiles

- Table: photo thumbnail, ID, name, gender, age, city, package, verified, active.
- Filters: gender, city, package, verified, active, date.
- "New profile" form: 3 tabs (Personal, Family, Partner demands). Photo upload ke saath ek
  checkbox "Family has given written consent to show this photo".
- Bulk actions: activate, deactivate. Delete kabhi hard na ho.
- Ek profile par "Featured on home page" switch.

### 5. Content sections

Ek hi generic screen har collection ke liye: list + form. Har row: title, order, active, edit.
Har form ke saath preview link (site khul jaye usi section par).

### 6. Site settings

Ek page, sections mein: Identity (naam, tagline, logo), Contact (phones, WhatsApp, email,
address, map query), Hours, Social links, Announcement bar, App links, SEO defaults.

### 7. Registrations aur inquiries

- Table + detail view. Registration detail 6 groups mein: personal, family, education, partner
  demands, contact, consents.
- "Mark as contacted" button, "Assign to consultant" dropdown, internal note field.
- CSV export.
- Phone par click karne se call ya WhatsApp khule.

### 8. Newsletter

List + CSV export.

### 9. Media library

Grid of uploaded images, copy URL button, alt text, delete (sirf agar kahin use na ho rahi ho).

### 10. Users

Members ki list, naya account banana, password reset link bhejna, role badalna, deactivate.

### 11. Legal pages

Richtext (heading + paragraphs), last reviewed date, publish/draft.

### 12. Audit log

Kaun, kab, kya badla. Filter by user, date, collection.

### Admin panel ke UX qawaid

- Saaf Roman Urdu + English labels, misal: "Tasveer / Picture".
- Har destructive action par confirm dialog: "Yeh record site se hat jayega. Delete karein?"
- Save ke baad toast: "Saved. Site par live ho gaya."
- Kabhi bhi kisi field ke bina form submit na ho jisme data zaya ho.
- Upload par progress bar, aur 4 MB se bari file par saaf error.
- Mobile par bhi chale, kyunke office wale phone se bhi kaam karte hain.

---

## Part 4: Copy-paste prompt (English)

Neeche wala block jaisa hai waisa kisi bhi AI assistant ko dein. Ismein sab context majood hai.

```text
You are building the backend API and the admin panel for a live front end that is already
finished. Do not change the front end's page layouts; match its data contract exactly.

THE PRODUCT
Ahd-e-Rishta is a bureau-managed matrimonial service in Lahore, Pakistan. The public site has
24 pages: home, profiles list and detail, services, packages, how it works, success stories,
videos, about, team, contact, FAQ, safety tips, blog, shortlist, three legal pages, login,
forgot password and a protected account page. There is no public sign up; the office creates
member accounts.

WHAT EXISTS ALREADY
- React 19 + TypeScript + Vite front end, Tailwind CSS v4, TanStack Query, react-hook-form + zod.
- A typed API client in src/api/http.ts that calls `${VITE_API_URL}<path>` with
  `credentials: "include"`, validates every response with a zod schema, and throws
  ApiError(message, status, details).
- Mock data with the exact JSON shape the front end expects. Read these two documents first:
  docs/ADMIN_API_CONTRACT.md (every endpoint, body, response, validation, role) and
  docs/PROJECT_GUIDE.md (screens, data flow, admin controls per section).
- The front end switches from mocks to your API with VITE_USE_MOCK_API=false.

WHAT YOU DELIVER
1. REST API, Node 20 + TypeScript + Fastify + PostgreSQL + Prisma, all endpoints in
   ADMIN_API_CONTRACT.md, plus the admin-only endpoints listed in its section 8
   (/admin/stats/overview, /admin/audit, /admin/media).
2. Authentication with httpOnly cookie sessions, bcrypt password hashing, two staff roles
   (admin, editor) and one member role (user). Login, logout, me, password reset by OTP,
   change password. No public sign up.
3. Admin panel, same stack or React + Vite, with these screens: login, dashboard, hero slider,
   profiles, one generic screen per content collection, site settings, registrations,
   inquiries, newsletter, media library, users, legal pages, audit log.
4. Image upload pipeline to S3 or Cloudflare R2: accept jpeg, png, webp (svg only for the logo),
   max 4 MB, convert to WebP at 400, 900 and 1600 px wide, keep the original, return
   { url, width, height, bytes }.
5. Seed script that inserts the current dummy content so the site looks complete on day one,
   and a migration that creates every table.

RULES
- Every content record has id, isActive, sortOrder, createdAt, updatedAt. Public GET endpoints
  return only isActive records, ordered by sortOrder then createdAt. Delete is always soft.
- List endpoints return { items, page, perPage, total, totalPages }; perPage is 1 to 60.
- Never return phone numbers, CNIC or full names on public profile endpoints. When
  photoVisible is false, omit photoUrl entirely.
- Login failures always answer 401 with the same message: "Number or password is incorrect."
  Password reset always answers { sent: true }.
- OTP: 6 digits, valid 10 minutes, single use, 5 wrong attempts blocks the number for 15 minutes.
- Public form endpoints are rate limited to 5 requests per 10 minutes per IP; a filled honeypot
  returns 200 without creating a record.
- Every write creates an audit_log row with actor, action, collection, recordId and the diff.
- Validate every request body with zod, using the same field names as the front end.
- Errors are JSON: { message, code }. Messages are plain English a family could read, no jargon.

ADMIN PANEL DETAIL
- Hero slider screen manages the home page carousel: preview, image upload, alt text (required,
  max 80 characters), optional heading and subheading, drag to reorder, on/off switch, delete,
  and a note that shows the recommended image size of 1600x900 and a 400 KB budget.
- Profile screen: photo upload with a "written consent received" checkbox that controls
  photoVisible, plus a featured switch, package dropdown and verified switch.
- Content screens share one generic list and form component: title, order, active, edit, preview.
- Registrations and inquiries: detail view, assign to consultant, internal note, mark as
  contacted, CSV export.
- Labels are shown in Roman Urdu with an English word in brackets, for example
  "Tasveer (Picture)". Every destructive action asks for confirmation. Every save shows a toast
  saying the change is live on the site.

ACCEPTANCE
- With VITE_USE_MOCK_API=false the entire front end works with no console errors: all 24 pages,
  login, logout, protected account page, shortlist, interest requests, registration, contact
  form and newsletter.
- An editor can change a hero picture, add a profile, edit a plan price and publish a blog post
  without touching code or a database client.
- Switching off a record removes it from the public site within one page refresh.
- A 4 MB limit, an unauthenticated request to an admin route, and a 6th form submit from one IP
  are all rejected with clear messages.
- Every table change appears in the audit log.
```

---

## Part 5: Launch se pehle

- [ ] Asli domain aur HTTPS
- [ ] Cookie `Secure` + `SameSite=Lax`, CORS sirf apne domain par
- [ ] Database backup rozana, restore ek dafa test
- [ ] Admin panel HTTPS ke baghair kabhi na khule
- [ ] Do logon ke paas admin account, baqi sab editor
- [ ] `.env` mein secrets git mein na hon
- [ ] Sentry ya us jaisa error tracker
- [ ] Uptime monitor
- [ ] Purane mock accounts (`03001234567`, `03009999999`) production database mein na hon
- [ ] Uploads ka backup bhi, sirf database ka nahi
