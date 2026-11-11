# Typography: kaun sa font kahan use hua hai

Site par **chaar** fonts hain, aur sab **apne project mein bundled** hain (`@fontsource`
packages). Google Fonts se live load nahi hote, is liye speed behtar hai aur visitor ka data
kisi doosri site par nahi jata.

## 1. Fraunces (headings)

- **Naam:** Fraunces Variable (variable serif, Google Fonts family)
- **Kahan:** saari headings: `h1`-`h4`, section titles, hero ka bara title, package ka naam aur
  price, profile card ke naam, page titles
- **Settings:** weight 600, letter-spacing `-0.015em` (thoda tight), line-height `1.12`
- **Sizes:**

| Jagah                         | Mobile | Desktop                             |
| ----------------------------- | ------ | ----------------------------------- |
| Hero (home) title             | 32px   | 54px (`lg:text-[3.4rem]`)           |
| Page hero / section title     | 30px   | 48-60px (`sm:text-4xl lg:text-5xl`) |
| Card title (package, profile) | 20px   | 24px                                |
| Price                         | 30px   | 30px (`text-3xl`, tabular numbers)  |

Fraunces kyun: yeh ek modern serif hai jis mein thodi "old-style" warmth hai. Shaadi aur family
ke business ke liye trustworthy lagta hai, magar purana ya sarkari nahi lagta.

## 2. Plus Jakarta Sans (sub-heading, body, buttons, UI)

- **Naam:** Plus Jakarta Sans Variable (variable sans-serif)
- **Kahan:** har jagah jo heading nahi hai: sub-heading/description paragraphs, body text,
  form labels, buttons, header aur mobile menu ke links, badges, tables, footer
- **Settings:** body 16px, line-height `1.7`; description text `text-sm` (14px) with `leading-6/7`;
  buttons aur nav 14px semibold (600)
- **Eyebrow labels** (chhoti uppercase line, jaise "BEGIN HERE" ya "MEMBERSHIP"): Plus Jakarta
  Sans, 11-12px, semibold, uppercase, letter-spacing `0.3em`, maroon colour

Plus Jakarta Sans kyun: geometric magar friendly sans hai, chhoti size par bhi saaf parhta hai
(forms, numbers, Urdu ke saath English mix), aur mobile par crisp rehta hai.

## 3. Great Vibes (script accent)

- **Naam:** Great Vibes (cursive script)
- **Kahan:** sirf khoobsurti ke liye: logo ke neeche "Trusted Rishta Service" tagline, founder
  ka signature, director ka naam
- **Kabhi nahi:** body text ya lambi lines mein. Script lambi lines mein parhna mushkil hota hai.

## 4. Noto Nastaliq Urdu (Urdu)

- **Naam:** Noto Nastaliq Urdu Variable
- **Kahan:** jab user Urdu language select karta hai (header ka EN / اردو switcher), poora page
  Urdu font mein badal jata hai
- **Settings:** line-height `2.1` (Nastaliq ko lambi height chahiye warna harf kate lagte hain),
  headings `1.9`, letter-spacing `0`
- Sirf language switcher Urdu badalta hai: site ka default content English hai

## Ek line ka jawab client ke liye

"Headings aur titles ke liye **Fraunces** naam ka elegant serif font use kiya hai, aur sub-heading,
paragraph, buttons aur poori UI ke liye **Plus Jakarta Sans** naam ka clean sans-serif. Logo ke
neeche ki script line **Great Vibes** se hai, aur Urdu version ke liye **Noto Nastaliq Urdu**.
Saare fonts website ke andar bundle kiye hue hain, is liye load tez hai aur koi third-party
tracking nahi."

## Technical note (developer ko)

- Fonts `src/main.tsx` mein import hote hain:
  `@fontsource-variable/fraunces`, `@fontsource-variable/plus-jakarta-sans`,
  `@fontsource/great-vibes`, `@fontsource-variable/noto-nastaliq-urdu`
- Tailwind theme tokens `src/index.css` mein: `--font-heading`, `--font-sans`, `--font-script`,
  `--font-urdu`. Is liye code mein `font-heading`, `font-sans`, `font-script` classes use hoti hain
- Fallback stack: heading → `Georgia, Times New Roman, serif`; body → system UI sans
