# Content checklist

Yeh list office ke us shakhs ke liye hai jo site ka content sambhalega. Har item ke saath
bataya gaya hai kahan badalna hai. Sab kuch text files mein hai, koi database ya panel ki
zaroorat nahi.

Pehle ek dafa `npm run dev` chala kar site kholein, phir neeche wali tarteeb se kaam karein.

## 1. Pehchan (sab se pehle)

| Kaam                    | File                                | Kya dekhna hai                                                                                             |
| ----------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Bureau ka naam, tagline | `src/api/mock/siteSettings.mock.ts` | `siteName`, `tagline`, `taglineUrdu`                                                                       |
| Logo                    | `src/assets/logo.png`               | Aap ka diya hua logo. Badalne par `public/` wali favicon aur OG image dobara banayein (guide ka section 9) |
| Phone, WhatsApp, email  | `siteSettings.mock.ts`              | `phones`, `phoneDisplay`, `whatsappNumber`, `email`                                                        |
| Office address aur map  | `siteSettings.mock.ts`              | `address`, `city`, `mapsQuery` (Google Maps mein wahi naam likhein jo wahan chalta hai)                    |
| Office timings          | `siteSettings.mock.ts`              | `workingHours` (har line alag)                                                                             |
| Social links            | `siteSettings.mock.ts`              | Sirf asli accounts rakhein, baqi par `isActive: false`                                                     |
| Footer line             | `siteSettings.mock.ts`              | `footerText`, `registrationLine`                                                                           |
| Announcement bar        | `siteSettings.mock.ts`              | `announcement.text`. Khatam campaign par `isActive: false`                                                 |

- [ ] Naam, tagline aur Urdu tagline durust hain
- [ ] Dono phone numbers asli hain
- [ ] WhatsApp number par test message bhej kar dekha
- [ ] Address aur map pin sahi jagah khulte hain
- [ ] Har social link khul raha hai
- [ ] Jhoote ya purane social accounts band kiye gaye

## 2. Hero aur ghar ka page

| Kaam                             | File                                                   |
| -------------------------------- | ------------------------------------------------------ |
| Hero ki tasveerein, alt, heading | `src/api/mock/heroSlides.mock.ts`                      |
| Section headings (20 blocks)     | `src/api/mock/contentBlocks.mock.ts`                   |
| Numbers wali strip               | `src/api/mock/stats.mock.ts`                           |
| "Kyun hum" points                | `src/api/mock/trustItems.mock.ts`                      |
| Cities cards                     | `src/api/mock/cities.mock.ts`                          |
| App links                        | `siteSettings.mock.ts` → `appLinks` (na hon to `null`) |

- [ ] Hero par bureau ki apni tasveerein lagayi gayi hain, abhi wali AI couple-pose tasveerein placeholder hain
- [ ] Portrait placeholder (`profile-f-*.jpg`, `profile-m-*.jpg`) asli, likhi hui ijazat wali tasveeron se badal diye gaye
- [ ] Har tasveer ka `alt` asaan Urdu ya English mein likha gaya hai
- [ ] Har heading mein emoji, em dash ya marketing wali hype nahi hai
- [ ] Stats asli hain. Jhoote number, jaise "100% success", kahin nahi
- [ ] Cities ke `profileCount` asli hain, warna wo field hata dein
- [ ] App store links asli hain, warna section band

## 3. Profiles

File: `src/api/mock/profiles.mock.ts` (96 dummy records).

Har profile par:

- [ ] `displayName` mein pehla naam aur aakhri naam ka sirf pehla harf hai (misal: Ayesha K.)
- [ ] `photoVisible` sirf un par `true` hai jinke ghar ne likh kar ijazat di
- [ ] `photoUrl` mein asli, ijazat shuda tasveer hai
- [ ] Phone number ya CNIC profile mein kahin nahi
- [ ] `dateOfBirth` sahi hai (site sirf umar dikhati hai)
- [ ] `verified` sirf un par `true` hai jo waqai check ho chuke
- [ ] `about` aur `partnerDemands` family ki apni zubaan mein likhe gaye hain
- [ ] `isActive: false` un sab par jo ab available nahi

## 4. Services aur plans

| Kaam                     | File                            | Note                                                |
| ------------------------ | ------------------------------- | --------------------------------------------------- |
| 6 services ka poora page | `src/api/mock/services.mock.ts` | `benefits`, `process`, `faqs`, `suitedFor`          |
| Plans aur qeemat         | `src/api/mock/plans.mock.ts`    | `price`, `duration`, `features`, `badge`            |
| Comparison table         | `plans.mock.ts`                 | Har plan ka `comparisonFeatures` (label + included) |

- [ ] Qeemat PKR mein, poore number ke saath (25,000 nahi, 25000 likhein)
- [ ] Har plan ka `comparisonFeatures` wahi labels use karta hai, warna table adhoora lagta hai
- [ ] Sirf ek plan par `highlighted: true`
- [ ] `whatsappMessage` mein plan ka naam hai, taake office ko pata chale
- [ ] Refund aur payment wali line legal page se match karti hai

## 5. Team aur director

| Kaam             | File                                                 |
| ---------------- | ---------------------------------------------------- |
| Consultants      | `src/api/mock/consultants.mock.ts`                   |
| Director message | `src/api/mock/director.mock.ts`                      |
| Milestones       | `src/api/mock/editorial.mock.ts` → `dummyMilestones` |

- [ ] Har consultant ki asli tasveer hai
- [ ] `experience` saal mein hai, koi bara dawa nahi
- [ ] Kisi consultant ke naam par certificate, award ya government registration ka dawa nahi
- [ ] Director ka message unhi ke alfaz mein hai

## 6. Stories, videos, FAQ, blog

| Kaam            | File                                  |
| --------------- | ------------------------------------- |
| Success stories | `src/api/mock/successStories.mock.ts` |
| Testimonials    | `src/api/mock/testimonials.mock.ts`   |
| Videos          | `src/api/mock/videos.mock.ts`         |
| FAQs            | `src/api/mock/faqs.mock.ts`           |
| Blog            | `src/api/mock/posts.mock.ts`          |

- [ ] Har story par dono gharon ki likhi hui ijazat hai
- [ ] Story ka `isSample` `false` hai (asli story par), `coupleLabel` mein poora naam nahi
- [ ] Video ka `youtubeId` sahi hai aur clip public hai. Embed allowed ho, warna card khali
      khulega
- [ ] Video ki category `nikah`, `guidance` ya `families` mein se ek hai
- [ ] Kisi video mein kisi family ki private baat nahi
- [ ] FAQ ke jawab chhote aur seedhe hain (60 shabdon se zyada nahi)
- [ ] Blog post ka `readingMinutes` asli hai, `author` asli consultant ka naam

## 7. Safety aur legal

| Kaam                                          | File                                                 |
| --------------------------------------------- | ---------------------------------------------------- |
| Red flags, never-ask list, report steps, tips | `src/api/mock/editorial.mock.ts` → `dummySafetyTips` |
| Terms, privacy, refund                        | `src/api/mock/editorial.mock.ts` → `dummyLegalPages` |

- [ ] Tehreer mein koi wada nahi jo nibhaya na ja sake ("guaranteed rishta" bilkul nahi)
- [ ] Fees, refund aur cancellation ki line office ki asli policy se match karti hai
- [ ] Legal pages wakil ne parh li hain, aur "Draft wording" wala note hata diya gaya
- [ ] `lastReviewed` date aaj ki hai
- [ ] Har page par `sections` mein kam az kam ek heading aur ek paragraph hai

## 8. Register form ka message

| Kaam                                         | File                                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------ |
| Submit ke baad WhatsApp par jaane wali lines | `src/components/forms/registerMessage.ts`                                |
| Form ke steps ke labels                      | `src/components/forms/registerSteps.ts` (sirf labels, logic na chherein) |

- [ ] WhatsApp message mein wahi maloomat jati hai jo office ko chahiye
- [ ] Message mein koi technical word ya emoji nahi
- [ ] Har field ka label parhne mein asaan hai

## 9. Login aur account

- [ ] Office ne har member ka account bana diya hai (koi public sign up nahi)
- [ ] Har member ko phone number aur password WhatsApp par diya gaya hai
- [ ] Password kam az kam 8 characters ka hai
- [ ] Purane dummy accounts (`03001234567`, `03009999999`) production se hata diye gaye hain
- [ ] Forgot-password par member sach mein code receive kar raha hai (asli API lagne ke baad)
- [ ] Sign out ke baad wapas `/account` kholne par login maanga jata hai

## 10. Aakhri golai (publish se pehle)

- [ ] Poori site phone par khol kar har page dekha (chhoti se chhoti screen par bhi)
- [ ] Har button daba kar dekha: WhatsApp, call, register, shortlist, login
- [ ] Har page ka title browser tab mein theek dikhta hai
- [ ] Screen par koi placeholder ya angrezi filler text nazar nahi aata
- [ ] Koi jagah "coming soon" wala adhoora section nahi bacha
- [ ] Logo header, footer, login, register aur 404 par ek jaisa lagta hai
- [ ] Favicon browser tab mein sahi dikhta hai
- [ ] Site ka link WhatsApp par bhej kar dekha ke share card theek aata hai
- [ ] `npm run build` chala kar `npm run preview` se poori site dobara dekhi

Har cheez tick hone ke baad hi site live karein.
