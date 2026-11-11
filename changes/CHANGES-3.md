# Round 3: client ki 12 hidayaat

Har point ke saath file bhi likhi hai. Jo cheez backend/admin ka kaam hai, wo aakhir mein alag
likhi hai.

## 1. Marital status: Single, Divorced, Widowed, Married

- **Files:** `src/lib/filterOptions.ts`, `src/schemas/profile.schema.ts`,
  `src/components/forms/registerSteps.ts`
- Home ka find match card, profiles page ka filter aur register form, teeno par ab chaar options
  isi tarteeb se: **Single, Divorced, Widowed, Married**
- Profile card aur profile detail page par bhi "Married" dikhta hai
- Register form se purana "Separated" hata diya, client ki list ke mutabiq

## 2. Filters backend se

Aaj option lists front end mein hain (`src/lib/filterOptions.ts`). Backend banne par sirf wahi
lists API se aani hain, front end ka code badalne ki zaroorat nahi. Poori list aur contract
`docs/ADMIN_API_CONTRACT.md` ke hisse 5 mein likh diya hai.

## 3. Age filter 18 se 70, ghalat value par error

- **Files:** `src/schemas/matchFilter.schema.ts`, `src/schemas/profile.schema.ts`,
  `src/components/home/FindMatchSection.tsx`, `src/components/profiles/FilterPanel.tsx`
- Dono jagah minimum 18 aur maximum 70
- 18 se kam par: "Minimum age is 18", 70 se zyada par: "Maximum age is 70",
  aur minimum maximum se bara ho to: "Minimum age must be less than maximum age"
- Profiles page ke filter panel mein bhi yehi message nazar aata hai

## 4 aur 5. "Proposal by city" aur "by category" home se hataye

- **File:** `src/pages/HomePage.tsx` (aur teen files delete: `BrowseByCitySection.tsx`,
  `ProposalsTabsSection.tsx`, `WhyChooseUsSection.tsx`)
- Home page ka flow ab: Hero, Find your perfect match, Trust strip, Services, Stats,
  Featured profiles, How it works, Second marriages, Plans, Consultants, **Offices**,
  Founder message, Safety, Success stories, Videos, Latest profiles, App, FAQ, Newsletter, CTA

## 6. Second marriage section: Divorced, Widowed, Second marriage

- **Files:** `src/components/home/SecondMarriageSection.tsx`, `src/api/profiles.api.ts`,
  `src/api/mock/profiles.query.ts`, `src/hooks/useApiQueries.ts`
- Tabs ke naam ab sirf **Divorced**, **Widowed**, **Second marriage** (pehle "Divorced proposals",
  "Widowed proposals" thay)
- Teesra tab dono lists ek saath dikhata hai, "View all" profiles page ke second marriage filter
  par le jata hai
- Kahin bhi "proposal" ka lafz status ke saath nahi lagaya

## 7. Consultants: apna apna number, "Meet the full team" hata diya

- **Files:** `src/components/home/ConsultantsSection.tsx`, `src/schemas/content.schema.ts`,
  `src/api/mock/consultants.mock.ts`, `src/lib/whatsapp.ts`
- Har consultant card par ab us ka **apna phone number** (call link) aur **apna WhatsApp**
  (usi number par khulta hai, office ke number par nahi)
- Neeche se "Meet the full team" button hata diya
- Admin panel mein har consultant ke `whatsapp` aur `phoneDisplay` field hongi, is liye office
  khud numbers badal sakega

## 8. Videos: YouTube link admin se

Video section pehle se API se chalta hai (`youtubeId` field). Backend/admin banne par office
poora YouTube link paste karega, backend id nikaal lega, aur video usi section mein aa jayegi
(thumbnail khud ban jata hai). Abhi ke liye jo hai wahi chal raha hai, jaisa aap ne kaha.
Tafseel `docs/ADMIN_API_CONTRACT.md` mein.

## 9. "A verification process, not a promise" home se hata diya

Wo poora section (`WhyChooseUsSection`) home page se nikal diya, taake koi jhoota wada nazar na
aaye.

## 10. Naya footer: brand naam par lehar aur baadal

- **Files:** `src/components/layout/Footer.tsx`, `src/index.css`
- Footer ke sab se neeche bara brand naam (**AHD-E-RISHTA**) hai. Us ke ooper se ek halki lehar
  guzarti hai: naam ka ooper wala hissa phika hai, neeche wala hissa chamakdar, bilkul us
  reference image ki tarah
- Peeche teen halke baadal aahista aahiste hilte hain (jo log motion kam chahte hain, un ke liye
  animation band rehti hai)
- Footer mein naya **Branches strip** bhi hai: har office ka city aur WhatsApp number, ek click
  par usi branch ki chat
- Quick links mein **Branches** ka link add ho gaya

## 11. Branches page aur section

- **Naye files:** `src/pages/BranchesPage.tsx`, `src/components/home/BranchesSection.tsx`,
  `src/components/branches/BranchCard.tsx`, `src/api/branches.api.ts`,
  `src/api/mock/branches.mock.ts` (schema `branchSchema`)
- Route: **`/branches`**, footer aur home section dono se khulta hai
- Har branch card par: naam, city, poora address, us ka apna phone, WhatsApp button,
  email, timings aur "Directions" (Google Maps)
- Main office par "Main office" badge
- Home page par chhota version (3 offices) + "All offices and timings" button
- Number, address, timings sab dummy hain: office confirm karega

## 12. Register form: caste aur education ki poori lists

- **File:** `src/lib/filterOptions.ts`
- Caste/biradari list **50 se barha kar 128** kar di (Abbasi, Afridi, Arain, Awan, Bhatti, Butt,
  Bajwa, Baloch, Chaudhry, Cheema, Dar, Gill, Gondal, Gujjar, Hashmi, Jadoon, Jat, Jutt, Kamboh,
  Kayani, Kazmi, Khakwani, Khan, Khattak, Khokhar, Laghari, Lodhi, Malik, Memon, Minhas, Mirza,
  Mughal, Niazi, Paracha, Pathan, Qureshi, Rajput, Rana, Rao, Rizvi, Sheikh, Sial, Siddiqui,
  Soomro, Syed, Talpur, Tarar, Tareen, Tiwana, Virk, Warraich, Wattoo, Yousafzai, Zaidi,
  "No caste bar", "Other" waghera)
- List searchable hai: "kh" likhein to Khakwani, Khan, Khattak, Khokhar saamne aa jate hain;
  jo naam list mein na ho wo "Use ..." se khud likha ja sakta hai
- Education list mein bhi izafa: Matric / O Levels, FSc / A Levels, Diploma, Madrasa / Dars-e-Nizami,
  Hafiz-e-Quran, BA/BSc/BCom/BBA/BS, B.Ed, BCS, BS Computer Science, BS Engineering, B.Tech,
  B.Arch, Pharm-D, DPT, MBBS, BDS, LLB, Masters/MA/MSc/MBA/MS, M.Ed, MPhil, LLM, PhD, CA, ACCA,
  CSS/PMS
- Occupation list mein bhi 11 naye options (Chartered accountant, Civil servant, Pilot,
  Imam or religious scholar, Overseas worker waghera)

## Check jo kiye gaye

| Check                                                                                   | Natija                                    |
| --------------------------------------------------------------------------------------- | ----------------------------------------- |
| `npx tsc -b`                                                                            | pass                                      |
| `npx eslint src`                                                                        | 0 errors (6 purane fast-refresh warnings) |
| `npx prettier --check`                                                                  | pass                                      |
| `npm run build`                                                                         | pass                                      |
| 24 routes ka sweep (naya `/branches` shamil)                                            | 24/24, console errors none                |
| axe (WCAG 2.1 AA): home desktop + mobile, branches desktop + mobile, register, profiles | clean                                     |
| Mobile par horizontal overflow                                                          | kahin nahi                                |
| Age error messages                                                                      | "Minimum age is 18", "Maximum age is 70"  |
| Marital dropdown                                                                        | Single, Divorced, Widowed, Married        |
| Home page par hataye gaye sections                                                      | ab nahi hain                              |
| Second marriage tabs                                                                    | Divorced, Widowed, Second marriage        |
| Consultant numbers                                                                      | har card par alag number                  |

## Files

`changes/v3/` mein saari badli hui files wahin ke raste par rakhi hain (jaise
`changes/v3/components/home/ConsultantsSection.tsx`). Delete hui teen files ka naam upar point 4/5
mein hai.
