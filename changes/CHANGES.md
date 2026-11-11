# Login / Register: background aur gap ka solution

Do alag kaam hain, dono alag alag files ke saath:

- **A. Background** (nakshi damask + gulab): 3 nayi files + 2 pages. Neeche hissa "A".
- **B. Gap** (neeche safed patti): 5 files. Neeche hissa "B".

---

# A. Login aur Register form ke peeche background

Aap ke purane code ke teen background components `src/components/forms/backgrounds/` mein rakh diye
hain. Sab inline SVG hain, koi image file nahi chahiye.

| File                               | Kya hai                                                                                                                                                                                                                                   |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `backgrounds/DamaskBackground.tsx` | Maroon nakshi (damask) pattern, poore area par tile hota hai                                                                                                                                                                              |
| `backgrounds/RoseBackground.tsx`   | Bade gulab (4, konon mein), SVG sprite se                                                                                                                                                                                                 |
| `backgrounds/FloralBackground.tsx` | Halka phoolon ka line pattern. Aap ke purane code mein ye `rose-corner.svg` aur `flower-lines.svg` use karta tha; wo files is project mein nahi thin, is liye ise inline SVG se dobara likh diya, API wahi hai (`children` + `className`) |

Ab ye background login aur register ke form wale column ke peeche lagta hai (jahan pehle cream/blank
tha). Dekhein: `changes/LoginPage.tsx` aur `changes/RegisterPage.tsx`.

### `src/pages/LoginPage.tsx` aur `src/pages/RegisterPage.tsx`

```tsx
// import
import { DamaskBackground } from "@/components/forms/backgrounds/DamaskBackground";
import { RoseBackground } from "@/components/forms/backgrounds/RoseBackground";
```

```tsx
// purani
<div className="flex items-start justify-center px-4 py-10 sm:px-8 lg:py-14">
  <RegisterForm />
</div>

// nayi
<div className="relative isolate flex items-start justify-center overflow-hidden px-4 py-10 sm:px-8 lg:py-14">
  {/* Nakshi pattern aur gulab, sirf decoration. */}
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
    <DamaskBackground color="#5e1322" opacity={0.09} size={220} />
    <RoseBackground opacity={0.2} />
  </div>
  <RegisterForm />
</div>
```

Login page par bhi bilkul wahi, sirf padding classes alag hain (`py-12`, `size={200}`) aur
`<LoginForm />`.

### Zaroori points (aage change karte waqt)

1. Parent `div` par `relative isolate` zaroori hai. Background SVG `absolute inset-0` hai; `-z-10`
   wrapper ke bagair wo card ke **oopar** aa jata hai.
2. Pattern halka rakhna hai, warna form ki likhai kamzor lagti hai. Abhi damask `0.09` aur gulab
   `0.2` par hain. Zyada gehri chahiye to `opacity` barha dein, bashart ke contrast check ho jaye.
3. `FloralBackground` istemal karna ho to ye `children` leta hai:
   `<FloralBackground className="bg-cream-50"><LoginForm /></FloralBackground>`

---

# B. Login / Register ke gap ka solution (5 files)

Agar login ya register page par neeche khali (white) jagah reh jati hai, ya left wali tasveer beech mein
khatam ho jati hai, to wajah yeh hai:

1. **`min-h-screen`** ka matlab hai 100vh (poori screen). Magar header pehle se 123px le raha hai
   (announcement bar + header), is liye page 100vh + header ke barabar lamba ho jata hai aur footer ke
   oopar ek extra khali patti bach jati hai.
2. **`RegisterIntro` par `lg:sticky ... lg:h-[calc(100dvh-5rem)] lg:self-start`** tha. Is se left panel
   ki height fix ho jati thi. Jab form (6 steps) us se lamba hota, to left taraf neeche sab khali
   (white) reh jata tha.
3. **Footer par `mt-16`** (64px) hai. Doosre pages par yeh nazar nahi aata kyunke wahan background cream
   hota hai, magar auth page par dark panel ke baad safed patti dikhti hai.

## Kya badla (5 files)

| #   | File                | Kahan rakhna hai                         |
| --- | ------------------- | ---------------------------------------- |
| 1   | `Layout.tsx`        | `src/components/layout/Layout.tsx`       |
| 2   | `LoginPage.tsx`     | `src/pages/LoginPage.tsx`                |
| 3   | `RegisterPage.tsx`  | `src/pages/RegisterPage.tsx`             |
| 4   | `LoginIntro.tsx`    | `src/components/forms/LoginIntro.tsx`    |
| 5   | `RegisterIntro.tsx` | `src/components/forms/RegisterIntro.tsx` |

Poori files isi folder mein hain, copy paste kar dein. Sirf yeh lines badli hain:

### 1. `src/components/layout/Layout.tsx`

```tsx
// purani
<main id="main-content" tabIndex={-1} className="flex-1 pb-16 focus-visible:outline-none sm:pb-0">
// nayi  (flex + flex-col)
<main id="main-content" tabIndex={-1} className="flex flex-1 flex-col pb-16 focus-visible:outline-none sm:pb-0">
```

### 2. `src/pages/LoginPage.tsx` aur `src/pages/RegisterPage.tsx`

```tsx
// purani
<div className="grid min-h-[calc(100dvh-4rem)] lg:grid-cols-2">
// nayi
<div className="grid flex-1 lg:-mb-16 lg:grid-cols-2">
```

`flex-1` ka matlab: "main ke andar jo jagah bachi hai, wo bhar do". Koi 100vh ka hisab nahi, is liye
announcement bar ho ya na ho, header chhota ho ya bara, gap nahi aayega.
`lg:-mb-16` sirf itna karta hai ke dark panel footer se seedha mil jaye (desktop par).

### 3. `src/components/forms/LoginIntro.tsx`

```tsx
// purani
<div className="relative hidden min-h-screen overflow-hidden bg-maroon-950 text-cream-100 lg:block">
// nayi
<div className="relative hidden overflow-hidden bg-maroon-950 text-cream-100 lg:block">
```

### 4. `src/components/forms/RegisterIntro.tsx`

```tsx
// purani
<div className="relative hidden min-h-screen overflow-hidden bg-maroon-950 text-cream-100 lg:sticky lg:top-20 lg:block lg:h-[calc(100dvh-5rem)] lg:self-start">
// nayi
<div className="relative hidden overflow-hidden bg-maroon-950 text-cream-100 lg:block">
```

Grid ka default behaviour hai `align-items: stretch`, is liye ab panel khud ba khud form wali column ke
barabar lamba hota hai. Tasveer andar `absolute inset-0 size-full object-cover` se bharti hai, is liye
kitna bhi lamba ho, poori bharti rahegi. Sticky hata dene se wo "aadhi tasveer, neeche safed jagah"
masla khatam ho gaya.

## Badlav ke baad

```bash
npm run build
npm run preview
```

Browser mein **Ctrl + Shift + R** (hard refresh).

## Verify (30 second)

1. `/login` kholein: left tasveer neeche tak bhari hui ho, footer se milti ho, beech mein safed patti na ho.
2. `/register` kholein, form ke aakhir step tak scroll karein: left tasveer poore waqt bhari rahe.
3. Window chhoti aur lambi (resize) karein: gap na aaye.
4. Mobile (390px): left panel chhupa hua ho (jaisa design hai), form ke baad normal spacing ho.
5. Doosre pages (`/`, `/packages`, `/profiles`) par footer ka 64px gap waisa hi rahe, kahin kuch na
   bigde (yeh maine check kiya hai).
