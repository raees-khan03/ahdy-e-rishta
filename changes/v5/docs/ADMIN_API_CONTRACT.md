# Admin API contract

Yeh document back end team ke liye hai. Front end in endpoints ko `src/api/` ki services se
call karta hai. Har response `zod` se validate hota hai, is liye field ka naam ya type badalne
par UI chup chaap tootne ke bajaye saaf error dega.

Base URL: `VITE_API_URL` (default `http://localhost:4000/api`).

## 0. Aam qawaid

**Record shape.** Har collection ka record yeh paanch fields rakhta hai:

```json
{
  "id": "plan-select",
  "isActive": true,
  "sortOrder": 2,
  "createdAt": "2026-09-14T08:30:00.000Z",
  "updatedAt": "2026-09-14T08:30:00.000Z"
}
```

- `isActive: false` wala record kabhi public list mein nahi aata. Front end use filter karta
  hai aur server bhi filter kare.
- `sortOrder` chhota number pehle. Barabar ho to `createdAt` se tie break.
- Public endpoints sirf `isActive: true` bhejein. Admin endpoints sab bhejein.

**Auth.** Session httpOnly cookie par (`credentials: "include"`). Role:
`public` (koi login nahi), `user` (member), `admin` (office). Koi endpoint 401 de to front end
session saaf karke `/login` par bhej deta hai; 403 par sirf error message dikhata hai.

**Error shape.**

```json
{ "message": "Number or password is incorrect.", "code": "INVALID_CREDENTIALS" }
```

`message` hi UI mein dikhta hai, is liye wo logon ki samajh mein aane wali English mein ho.
Login ka error hamesha generic rahe, taake pata na chale ke number majood hai ya nahi.

**Pagination.** List endpoints `?page=1&perPage=20` lete hain aur yeh shape dete hain:

```json
{ "items": [], "page": 1, "perPage": 20, "total": 96, "totalPages": 5 }
```

`perPage` ki hadd 1 se 60. Baqi endpoints poora array bhejte hain (chhoti lists hain).

**Reorder.**

```
PATCH /admin/{collection}/reorder
body: { "ids": ["plan-essential", "plan-select", "plan-premium"] }
```

Server `sortOrder` ko 1 se shuru karke isi tarteeb se likhe. Jawab: `204 No Content`.

**Activate / deactivate.**

```
PATCH /admin/{collection}/{id}/status
body: { "isActive": false }
```

Jawab: poora updated record.

**Image upload.**

```
POST /admin/uploads
Content-Type: multipart/form-data
field: file
```

- Allowed: `image/jpeg`, `image/png`, `image/webp`, `image/avif`, `image/svg+xml`
  (SVG sirf logo ke liye).
- Maximum size: 4 MB per file (logo 1 MB). Dimension: hero 1600x900 se chhoti na ho,
  profile photo 640x800 recommended, OG image 1200x630.
- Server file ka naam badal de, SVG ko sanitise kare.
- Jawab: `{ "url": "https://cdn.../file.webp", "width": 1600, "height": 900, "bytes": 214233 }`

---

## 1. Auth

| Method | Path                    | Role   | Body                               | Response             |
| ------ | ----------------------- | ------ | ---------------------------------- | -------------------- |
| POST   | `/auth/login`           | public | `{ phone, password }`              | `{ token, user }`    |
| POST   | `/auth/logout`          | user   | none                               | `204`                |
| GET    | `/auth/me`              | user   | none                               | `AuthUser` ya `401`  |
| POST   | `/auth/password-reset`  | public | `{ phone }`                        | `{ sent: true }`     |
| POST   | `/auth/verify-otp`      | public | `{ phone, code }`                  | `{ verified: true }` |
| POST   | `/auth/reset-password`  | public | `{ phone, code, password }`        | `{ ok: true }`       |
| POST   | `/auth/change-password` | user   | `{ currentPassword, newPassword }` | `{ ok: true }`       |

`AuthUser`:

```json
{
  "id": "user-ayesha",
  "fullName": "Ayesha K.",
  "phone": "+923001234567",
  "role": "user",
  "city": "Lahore",
  "memberSince": "2025-03-11"
}
```

Validation:

- `phone`: `03XXXXXXXXX` ya `+923XXXXXXXXX`, normalise ho kar `+923XXXXXXXXX` ban jaye.
  Sirf Pakistani mobile. Boht ghair mulki number admin manually add kare.
- `password`: kam az kam 8 characters. Sign up public nahi, is liye koi register endpoint
  nahi hai. Account admin banata hai.
- `code`: 6 digits, 10 minute tak valid, ek dafa chalta hai. Server par 5 ghalat koshishon ke
  baad 15 minute ka block (client ka throttle sirf UI ke liye hai).
- Reset ka jawab hamesha `{ sent: true }`, chahe number majood ho ya na ho.
- Login failure par hamesha `401` aur wahi generic message: `Number or password is incorrect.`

---

## 2. Site settings (single record)

| Method | Path             | Role   | Body                   | Response       |
| ------ | ---------------- | ------ | ---------------------- | -------------- |
| GET    | `/site-settings` | public | none                   | `SiteSettings` |
| PATCH  | `/site-settings` | admin  | partial `SiteSettings` | `SiteSettings` |

Fields: `siteName`, `tagline`, `taglineUrdu`, `logoUrl`, `description`, `phones[]` (kam az kam
ek), `phoneDisplay`, `whatsappNumber` (digits only), `whatsappMessage`, `email`, `address`,
`city`, `mapsQuery`, `workingHours[]`, `socialLinks[]`, `footerText`, `registrationLine`,
`appLinks` (`{ playStore, appStore }` ya `null`), `announcement` (`{ text, linkLabel?,
linkHref?, isActive }`), `seo` (`{ titleSuffix, defaultTitle, defaultDescription,
ogImageUrl }`).

`socialLinks[]` item: `{ id, label, href, icon: facebook|instagram|youtube|tiktok|linkedin,
isActive, sortOrder }`.

Validation: `phones[]` kam az kam ek, `whatsappNumber` 10 se 15 digits, `email` valid,
`logoUrl` upload se aaya hua URL, `href` sirf `https`.

---

## 3. Content blocks (section copy)

| Method | Path                         | Role   |
| ------ | ---------------------------- | ------ |
| GET    | `/content-blocks`            | public |
| POST   | `/admin/content-blocks`      | admin  |
| PATCH  | `/admin/content-blocks/{id}` | admin  |
| DELETE | `/admin/content-blocks/{id}` | admin  |

Item: `{ id, key, eyebrow?, title, subtitle?, body?, items?: [{ title, text }],
isActive, sortOrder, createdAt, updatedAt }`.

`key` unique hai (jaise `home.services`). Naya key invent na ho: front end sirf apni known keys
padhta hai. `key` badalna allowed nahi, sirf text.

---

## 4. Read-only collections

Yeh sab `GET` public hain, `GET /admin/{collection}` admin, aur har ek par `POST`, `PATCH /{id}`,
`DELETE /{id}`, `PATCH /reorder`, `PATCH /{id}/status` admin ke liye majood hain.

| Collection         | Path                  | Extra fields                                                                                                                                                 |
| ------------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Hero slides        | `/hero-slides`        | `image`, `alt`, `heading?`, `subheading?`                                                                                                                    |
| Stats              | `/stats`              | `value`, `label`, `caption?`                                                                                                                                 |
| Trust items        | `/trust-items`        | `title`, `description`, `icon`                                                                                                                               |
| Cities             | `/cities`             | `name`, `slug`, `province`, `profileCount`, `imageUrl?`                                                                                                      |
| Plans              | `/plans`              | `name`, `price`, `currency`, `duration`, `shortDescription`, `features[]`, `badge?`, `highlighted`, `ctaLabel`, `whatsappMessage`, `comparisonFeatures[]`    |
| Consultants        | `/consultants`        | `name`, `role`, `experience`, `languages[]`, `cities[]`, `bio`, `photoUrl`, `focus[]`, `whatsapp`, `phoneDisplay`                                            |
| Branches           | `/branches`           | `name`, `city`, `address`, `whatsapp`, `phoneDisplay`, `email?`, `phone?`, `hours[]`, `mapsQuery?`, `isMain`                                                 |
| Director message   | `/director-message`   | single record: `name`, `role`, `photoUrl`, `quote`, `paragraphs[]`, `signOff`                                                                                |
| Success stories    | `/success-stories`    | `coupleLabel`, `city`, `year`, `quote`, `story`, `serviceUsed`, `imageUrl`, `isSample`                                                                       |
| Testimonials       | `/testimonials`       | `name`, `city`, `relation`, `quote`                                                                                                                          |
| Videos             | `/videos`             | `title`, `description`, `youtubeId` (admin can paste any YouTube link, backend extracts the id), `category`, `durationLabel`, `publishedAt`, `thumbnailUrl?` |
| FAQs               | `/faqs`               | `category`, `question`, `answer`                                                                                                                             |
| Services           | `/services`           | `slug`, `title`, `shortDescription`, `intro`, `icon`, `imageUrl`, `benefits[]`, `process[]`, `faqs[]`, `suitedFor[]`                                         |
| Blog posts         | `/blog-posts`         | `slug`, `title`, `excerpt`, `body[]`, `category`, `author`, `publishedAt`, `readingMinutes`, `imageUrl`, `relatedIds[]`                                      |
| Process steps      | `/process-steps`      | `title`, `description`, `icon`, `note?`                                                                                                                      |
| Verification steps | `/verification-steps` | `title`, `description`, `icon`                                                                                                                               |
| Safety tips        | `/safety-tips`        | `title`, `description`, `kind`                                                                                                                               |
| Milestones         | `/milestones`         | `year`, `title`, `description`                                                                                                                               |
| Filter categories  | `/categories`         | grouped option lists                                                                                                                                         |

Allowed icon names:

- trust items: `shield`, `eye-off`, `users`, `phone`, `badge-check`, `hand-heart`
- steps: `file-text`, `search`, `users`, `heart-handshake`, `phone`, `camera`
- services: `heart-handshake`, `user-round-search`, `heart-crack`, `globe`, `messages-square`,
  `users-round`
- videos: `nikah`, `guidance`, `families`
- faq: `general`, `profiles`, `packages`, `privacy`, `process`
- safety kinds: `tip`, `redFlag`, `neverAsk`, `reportStep`

Validation: `price` integer, PKR mein, zero se bara. `youtubeId` 11 characters, oembed se
verify ho. `slug` lowercase, hyphen, unique. `year` 2000 se aaj tak. Blog ka `body[]` kam az
kam ek section. `alt` khali na ho (accessibility).

---

## 5. Profiles

| Method | Path                                          | Role   | Notes                                      |
| ------ | --------------------------------------------- | ------ | ------------------------------------------ |
| GET    | `/profiles`                                   | public | Filters + pagination (neeche)              |
| GET    | `/profiles/{id}`                              | public | `404` agar inactive                        |
| GET    | `/profiles/{id}/similar`                      | public | 4 tak                                      |
| GET    | `/profiles/featured?gender=`                  | public | `male` ya `female`                         |
| GET    | `/profiles/latest?gender=`                    | public |                                            |
| GET    | `/profiles/second-marriage?maritalStatus=`    | public | `divorced` ya `widowed`                    |
| GET    | `/profiles/by-location?city=&country=&limit=` | public | Home ke city cards ke liye                 |
| GET    | `/profiles/by-ids?ids=A,B,C`                  | public | Shortlist render karne ke liye, max 60 ids |
| POST   | `/admin/profiles`                             | admin  | Naya profile                               |
| PATCH  | `/admin/profiles/{id}`                        | admin  |                                            |
| DELETE | `/admin/profiles/{id}`                        | admin  | Soft delete: `isActive: false`             |
| PATCH  | `/admin/profiles/{id}/status`                 | admin  |                                            |

Filter query: `ageFrom`, `ageTo` (18 se 80), `heightFrom`, `heightTo` (cm 120 se 215),
`religion`, `sect`, `caste`, `education`, `occupation`, `income`, `city`, `country`,
`language`, `q` (max 80 characters), `page`, `perPage`, `sort`.
`sort` ki values: `newest`, `age-asc`, `age-desc`.

Profile fields: `profileId` (`AER-1041`), `displayName` (pehla naam + aakhri harf),
`gender`, `age`, `dateOfBirth`, `heightCm`, `maritalStatus`, `hasChildren`, `religion`,
`sect`, `caste`, `education`, `occupation`, `income`, `city`, `country`, `languages[]`,
`familyType`, `about`, `partnerDemands{ ageRange, heightRange, maritalStatus, education,
occupation, city, caste?, country?, notes }`, `photoVisible`, `photoUrl`, `verified`,
`packageName`, `featured`.

Naye optional fields (detail page par tile sirf tab dikhta hai jab value aaye):

- `skinTone` (string, maslan `Fair`, `Wheatish`, `Dusky`, `Olive`)
- `brothers` (number 0 se 20)
- `sisters` (number 0 se 20)
- `partnerDemands.caste` (string)
- `partnerDemands.country` (string)

Inhe admin form mein optional rakhein; khaali chhorein to public page par us ki jagah kuch
nahi aata, koi khali dabba nahi banta.

Validation aur privacy:

- `photoVisible: false` ho to `photoUrl` kabhi response mein na aaye (front end tab bhi
  "Photograph on request" dikhata hai).
- `displayName` mein poora naam na jaye. Sirf pehla naam aur aakhri naam ka pehla harf.
- Phone number kabhi profile object mein shamil na ho.
- `dateOfBirth` user ko poora na dikhe, sirf `age`.
- Admin ko `PHI` jaisi cheezein (CNIC) upload karne ki zaroorat nahi; agar kahein to alag
  private table mein rakhein.

---

## 6. Member endpoints

| Method | Path                 | Role | Body                   | Response             |
| ------ | -------------------- | ---- | ---------------------- | -------------------- |
| GET    | `/me/interests`      | user | none                   | `Interest[]`         |
| POST   | `/me/interests`      | user | `{ profileId, note? }` | `Interest`           |
| DELETE | `/me/interests/{id}` | user | none                   | `204`                |
| GET    | `/me/shortlist`      | user | none                   | `{ profileIds: [] }` |
| PUT    | `/me/shortlist`      | user | `{ profileIds: [] }`   | `{ profileIds: [] }` |

`Interest`: `{ id, profileId, status: sent|accepted|declined|pending, note?, isActive,
sortOrder, createdAt, updatedAt }`.

Validation: ek profile par ek hi active interest (duplicate par maujooda record wapas).
`profileIds` max 200, duplicate na ho.

> Front end `localStorage` mein shortlist rakhta hai aur sign in par `/me/shortlist` se merge
> karta hai. Server endpoint contract ke liye majood hai, filhaal mock mode mein local hi chalta
> hai.

---

## 7. Submissions

| Method | Path                            | Role   | Body                                      | Response                         |
| ------ | ------------------------------- | ------ | ----------------------------------------- | -------------------------------- |
| POST   | `/registrations`                | public | `RegisterOutput`                          | `{ reference, receivedAt }`      |
| GET    | `/registrations`                | admin  | none                                      | `{ id, values, createdAt }[]`    |
| POST   | `/inquiries`                    | public | `{ name, phone, email?, topic, message }` | `{ reference, receivedAt }`      |
| GET    | `/admin/inquiries`              | admin  | none                                      | `Inquiry[]`                      |
| POST   | `/newsletter-subscribers`       | public | `{ email, source? }`                      | `{ ok: true }`                   |
| GET    | `/admin/newsletter-subscribers` | admin  | none                                      | `{ email, source, createdAt }[]` |

`RegisterOutput` (aap ki form ke fields): `gender`, `fullName`, `dateOfBirth`, `height`,
`weight`, `maritalStatus`, `city`, `sect`, `caste`, `education`, `occupation`, `income`,
`homeOwnership`, `vehicle`, `familyType`, `siblings`, `siblingsMarried`, `contactPhone`,
`contactRelation`, `photoConsent`, `about`, `preferences`.

Validation:

- Public submit par rate limit: ek IP se 5 requests per 10 minute. Honeypot field bhara hua ho
  to `200` wapas karein magar record na banayein.
- `contactPhone` Pakistani mobile, `dateOfBirth` se umar 18 se 70.
- `message` max 2000 characters, `email` valid.
- `reference` shape: `REG-2026-0001` jaisa. Public ko sirf yahi dikhta hai, poora payload nahi.

---

## 8. Admin panel ko jo chahiye

Yeh endpoints UI ke liye tayyar contract hain, front end unhein filhaal use nahi karta:

| Method | Path                    | Role  | Kaam                                                                   |
| ------ | ----------------------- | ----- | ---------------------------------------------------------------------- |
| GET    | `/admin/stats/overview` | admin | `{ activeProfiles, newRegistrations, openInterests, newsletterCount }` |
| GET    | `/admin/audit`          | admin | `{ id, actor, action, collection, recordId, at }[]`                    |
| GET    | `/admin/media`          | admin | Uploaded files, paginated                                              |

Har write par audit entry bane: kaun, kab, kya badla. Delete soft ho (`isActive: false`),
taake ghalti wapas ho sake.

---

## 9. Front end kya expect karta hai (checklist)

- [ ] Har list `id`, `isActive`, `sortOrder`, `createdAt`, `updatedAt` ke saath aaye.
- [ ] Public endpoints inactive records kabhi na bhejein, `sortOrder` se sorted.
- [ ] Har response ka shape `docs/` ke saath match kare, kyunke zod strict hai.
- [ ] 401 par front end khud sign out kar deta hai, is liye `401` sirf session ke liye rakhein.
- [ ] Images ke liye `width`/`height` ya aspect ratio dein, taake layout na hile.
- [ ] Text fields mein HTML na ho; plain text. Line breaks `\n` se.
- [ ] Emoji aur em dash backend content mein na aayein, front end unhein render kar dega
      magar bureau ki writing style waisi nahi hai.

## 5. Filters aur admin: agla kaam (client ki hidayat)

- **Filters backend se chalenge.** Abhi option lists front end mein hain
  (`src/lib/filterOptions.ts`). Backend banne par yehi lists `GET /filters/options` se aani
  chahiye: caste, education, occupation, income, city, country, religion, sect, marital status,
  language. Front end ka code already ek hi jagah se lists leta hai, is liye sirf API jodni hogi.
  Marital status chaar: **Single, Divorced, Widowed, Married**.
- **Age filter 18 se 70** hai. 18 se kam ya 70 se zyada likhne par form khud error deta hai
  ("Minimum age is 18", "Maximum age is 70"), aur minimum maximum se bara ho to bhi.
- **Videos screen** admin panel mein: title, description, YouTube link (poora link ya id), category,
  duration, publish date, on/off. Link se thumbnail khud ban jata hai.
- **Branches screen** admin panel mein: branch ka naam, city, address, apna WhatsApp number,
  phone, email, timings, Google Maps query, "main office" switch, on/off aur tarteeb.
  Website ke `/branches` page aur footer dono isi list se chalte hain.
- **Consultants screen** mein har consultant ka apna WhatsApp number aur phone number ho, taake
  family seedha usi consultant ko call kar sake.
