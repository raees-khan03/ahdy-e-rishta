# Round 4: header, background, page intro, director line

## 1. Header: ek hi "Packages", aur us ki jagah "Branches"

**File:** `src/components/layout/Header.tsx`, `src/lib/navigation.ts`

- Pehle do jagah "Packages" tha: nav mein ek link, aur daayein "VIP Packages" chip. Ab nav se
  saada "Packages" link nikal diya, sirf daayein wala **VIP Packages** chip bacha hai.
- Us ki jagah nav mein **Branches** aa gaya (desktop aur mobile dono mein).
- Header ke tabs ab: **Home, Find a Match, Services, Branches, Stories ▾, About, Contact** +
  daayein VIP Packages chip, shortlist, Sign in, Register.
- Mobile menu: Home, Find a Match, Services, Branches, VIP package, About, Contact.

## 2. "Verified profiles" strip ko khoobsurat background

**File:** `src/components/home/TrustStrip.tsx`

- Strip ke peeche halka cream gradient band
- Us par **nakshi (damask) pattern**, ooper aur neeche se fade hota hua (hard edge nahi)
- Do soft roshni ke dhabbe (peach aur maroon)
- Cards ab halke shishe jaise (`bg-white/80` + blur), hover par thora ooper uthte hain aur icon
  ka rang maroon ho jata hai

## 3. Har page par intro effect (perfectrishtay jaisa)

**Naye files:** `src/components/layout/PageIntro.tsx` (+ `src/index.css` mein animation,
`Layout.tsx` mein lagaya gaya)

- Jab bhi koi page khulta hai, ~1 second ke liye maroon parda aata hai jis par **us page ka naam**
  bara likha hota hai (maslan "Home", "Our offices", "Find a Match", "Success stories")
- Peeche wahi nakshi pattern halka sa, do roshni ke dhabbe
- Phir parda **oopar khisak jata hai** aur page khul jata hai
- Naam ke ooper aur neeche sonay (peach) rang ki do patli lines
- **Ahem:** parda sirf dikhawa hai: `aria-hidden`, `pointer-events: none`, is liye screen reader
  ise nahi parhta aur click bilkul page tak pahunchta hai (test kiya)
- Jo log "reduce motion" on rakhte hain, un ke liye yeh effect **bilkul nahi chalta**

## 4. "Guiding families since 2009" hata diya

**Files:** `src/api/mock/director.mock.ts`, `src/lib/homeContent.ts`,
`src/components/home/FounderMessageSection.tsx`, `src/pages/AboutPage.tsx`

- Director message ke sign-off se yeh line hata di
- Home ke founder message section se bhi hata di
- Dono jagah agar line khaali ho to wo dikhti hi nahi (layout nahi bigadta)
- Aap ke kehne par sirf yeh line hatai hai. Site par **2009** ab bhi do jagah hai:
  "Started in 2009" stat aur timeline ka "2009 - The first office". Bolein to wo bhi hata dein ya
  badal dein.

## 5. Footer: bg gradient, baqi sab waisa hi

**File:** `src/components/layout/Footer.tsx`

Footer pehle jaisa hi hai. Sirf do cheezein:

1. **Background ab gradient hai:** ooper ki taraf thora roshan maroon jo neeche gehra ho jata hai
   (`#4a0f1f` se `#280710` tak, 158 degree), aur ooper se ek halka garam (peach) nur aata hai.
   Purane halke baadal, khaki pattern aur timtimate dhabbe waise hi hain.
2. **Neeche bare naam (AHD-E-RISHTA) par clouds:** hurf ke andar baadal aahista hilte rehte hain,
   aur mouse hover karne (ya click / mobile par tap) par baadal door tak sarak jate hain, hover
   hatane par wapas aa jate hain. Reduce-motion par yeh hilta nahi.

Jo cheezein pichli koshish mein add hui thin (Start here card, marquee, mouse glow, shimmer,
sitaray, link arrows, contact tiles) wo sab **hata di gayi hain**. `src/index.css` aur
`src/i18n/resources.ts` mein koi extra addition nahi (resources.ts bilkul waisa hi hai).

## Check jo kiye gaye

| Check                                                                                  | Natija                               |
| -------------------------------------------------------------------------------------- | ------------------------------------ |
| `npx tsc -b`                                                                           | pass                                 |
| `npx eslint src`                                                                       | 0 errors (6 purane warnings)         |
| `npx prettier --check src`                                                             | pass                                 |
| `npm run build`                                                                        | pass                                 |
| 24 routes sweep                                                                        | 24/24, console errors none           |
| axe WCAG 2.1 AA (home desktop + mobile, branches desktop + mobile, register, profiles) | clean                                |
| Intro ka label har page par                                                            | sahi ("Our offices", "Home" waghera) |
| Intro ke doran click                                                                   | page tak pahunchta hai               |
| Reduce motion on                                                                       | intro nahi chalta                    |

## Files

`changes/v4/` mein badli hui files wahin ke raste par rakhi hain.
