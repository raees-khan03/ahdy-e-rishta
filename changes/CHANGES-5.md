# Detail page: dark cards wala naya look

Aap ke bheje hue screenshot ke mutabiq detail page dobara banaya. Data, privacy rules,
WhatsApp, shortlist, share, print, SEO aur "Similar proposals" sab pehle jaise kaam karte hain.

**Main file:** `src/pages/ProfileDetailPage.tsx`

## Page ka naya structure

1. **Hero** (pehle jaisa, cream): naam, "Groom/Bride · age · city", aur Enquire / Save / Share /
   Print buttons.
2. **Dark section** (`#120a0e`): us par halka khaki pattern aur do maroon roshni ke dhabbe.
3. Us ke andar cards:
   - **About**: chhoti photo (ya "Photograph on request"), Office verified / plan / ID ke pills,
     aur about ki tehreer
   - **Personal Information**: Gender, Age, Height, Skin tone, Caste, Marital status, Religion,
     Sect, Country, City, Languages
   - **Education & Career**: Education, Profession, Monthly income
   - **Family Details**: Brothers, Sisters, Family type, Children
   - **Partner Preferences**: Age range, Preferred height, Preferred education, Preferred marital
     status, Preferred caste, Preferred profession, Preferred city, Preferred country, aur neeche
     **Additional remarks** ka alag dabba
   - **Contact card**: "Contact details are never shown publicly" + Message the office + Save
   - Us ke neeche chhoti line: listing bureau ki taraf se hai, milne se pehle mahram ke saath
     milein
4. **Similar proposals** (pehle jaisa).

## Har tile ka look

Gol icon + chhota label (bara harf, spacing ke saath) + value. Tile dark hai
(`bg-white/[0.035]`, border `white/[0.07]`), hover par thora roshan hota hai. Card
`bg-[#191016]`, border `white/[0.08]`, ooper ek patli roshni ki line.

## Data ke liye 3 chhoti tabdeeliyan

Screenshot mein kuch cheezein aisi thin jo profile model mein maujood nahi thin. Is liye optional
fields add kiye, taake purana data bhi chalta rahe:

- `src/schemas/profile.schema.ts`: `skinTone?`, `brothers?`, `sisters?`, aur
  `partnerDemands.caste?`, `partnerDemands.country?`
- `src/api/mock/profiles.mock.ts`: dummy values (skin tone list, brothers/sisters, preferred caste
  aur country)
- `docs/ADMIN_API_CONTRACT.md`: naye optional fields likh diye, aur note ke admin form mein inhe
  khaali chhorna theek hai

**Ahem:** page par tile sirf tab banta hai jab us ki value maujood ho. Matlab agar kisi profile
mein skin tone ya brothers/sisters nahi hain to wahan koi khali dabba nahi aayega. Agar aap chahte
hain ke ye tiles hamesha dikhein (khali bhi), bata dein to "Not shared" likhne ka option bhi laga
deta hoon.

## Check jo kiye gaye

| Check                                          | Natija                       |
| ---------------------------------------------- | ---------------------------- |
| `npx tsc -b`                                   | pass                         |
| `npx eslint src`                               | 0 errors (6 purane warnings) |
| `npx prettier --check src`                     | pass                         |
| `npm run build`                                | pass                         |
| 24 routes sweep                                | 24/24, console errors none   |
| axe WCAG 2.1 AA detail page (desktop + mobile) | clean                        |
| 390px par horizontal scroll                    | nahi                         |
