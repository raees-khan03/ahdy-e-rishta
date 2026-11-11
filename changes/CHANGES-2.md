# Round 2: filter, header, packages, auth fixes

Yeh list un saare kaamon ki hai jo aap ne is round mein maange. Har point ke saath file ka naam bhi hai.

## 1. Dropdown kholne par neeche space / jitter (har jagah)

**File:** `src/components/forms/ComboboxField.tsx`

Pehle dropdown panel form ke andar hi ban raha tha (in-flow), is liye kholte hi neeche ka content
dhakel jata tha aur card ka balance bigad jata tha.

Ab panel **portal** ke zariye page ke oopar alag layer mein khulta hai:

- `position: fixed`, trigger ki position se naapa jata hai
- Form ki height bilkul nahi badalti (maine measure kiya: page height 1670px pehle bhi, baad mein bhi)
- Screen ke neeche jagah kam ho to panel **oopar** khul jata hai, is liye mobile par bhi kabhi cut nahi hota
- Scroll ya resize par panel apni jagah khud adjust karta hai
- Card, sidebar ya sheet is ko clip nahi kar sakte

Yeh component poore app mein use hota hai (home ka find match card, register form, profiles
filters), is liye **har jagah** dropdown theek ho gaya.

Saath hi ek bug bhi theek hua: dropdown kholte hi "Please select height" jaisi error aa jati thi,
kyunke focus panel ke search box par jata tha. Ab panel khula ho to blur report nahi hota.

## 2. Search mein pehla letter likhne par result nahi aata tha

**File:** `src/components/forms/ComboboxField.tsx`

Pehle filter simple `includes` tha, is liye "l" likhne par 470+ cities aa jati thin aur Lahore
list mein kahin neeche chala jata tha. Ab ranking wala matcher hai:

1. Jo option us letter se **shuru** hota hai (sab se pehle)
2. Jis ke kisi lafz ka aaghaz us letter se hota hai
3. Jo us letter ko contain karta hai

Natije: "l" likhein to **Lachi, Ladhewala Waraich, Lahore, Lakhi, Lakki, Lala Musa** (Lahore
saaf nazar aata hai). "lah" likhein to Lahore pehle. Accent bhi normalize hote hain
(`Qila Saifullāh` bhi `saifullah` se mil jata hai).

Search box ka placeholder ab "Search by first letter" hai, aur screen reader ko field ka naam
bhi milta hai (maslan "Search City").

## 3. Home filter card: "More filters" hata diya, sab filters ek jagah

**File:** `src/components/home/FindMatchSection.tsx`

- "More filters" toggle aur `showAdvanced` state khatam
- Saare 11 filters ek hi grid mein: Looking for, Marital status, City, Country, Religion, Sect,
  Education, Caste / biradari, Age from, Age to, Name or profile ID
- Neeche "Reset" aur "Show matches" (Reset se sab filters aur profile ID khaali ho jate hain)
- **"Ask a consultant" button hata diya**

## 4. Header

**File:** `src/components/layout/Header.tsx` (+ `src/i18n/resources.ts` mein 3 naye labels)

- **WhatsApp button header se hata diya** (desktop par bhi, mobile menu mein bhi). Mobile menu ke
  neeche ab sirf do gol icons hain: WhatsApp aur Call, koi text nahi.
- **Success Stories aur Videos ek dropdown mein:** naya "Stories" tab hover/click par khulta hai
  (keyboard: Enter se khulta, Escape se band). Is se header ke tabs kam ho gaye.
- Header ke tabs ab: **Home, Find a Match, Services, Packages, Stories ▾, About, Contact**
  (pehle 8 thay, ab 7 + dropdown)
- **VIP option:** header ke daayein taraf sonay (peach) rang ka "VIP Packages" chip, jo
  `/packages#vip` par le jata hai. Mobile menu mein "VIP package" row.
- Mobile menu: VIP row par active page ka nishan nahi lagta (warna Packages bhi active lagta)
- Mobile menu ka bottom hissa: language switcher, Sign in / Register, aur do icon buttons

## 5. Carousel (hero) mein WhatsApp sirf icon

**File:** `src/components/home/HeroCarousel.tsx`

"WhatsApp us" wali lambi button ab gol green icon button hai (accessible label ke saath), "Register
a proposal" ke saath inline. Aap ka notice: neeche daayein wala floating WhatsApp bubble abhi bhi
text ke saath hai, wo poore site ka hai; chahen to us ko bhi icon bana dete hain.

## 6. Packages section theek aur VIP card

**Files:** `src/api/mock/plans.mock.ts`, `src/components/plans/PlanCard.tsx`,
`src/components/home/MembershipPlansSection.tsx`, `src/pages/PackagesPage.tsx`

- Ab **5 packages** hain, aap ke diye hue content ke mutabiq:
  Basic Rs 2,000 (2 months) | Silver Rs 5,000 (4) | Gold Rs 10,000 (6, _Most popular_) |
  Premium Rs 15,000 (6, _Exclusive_) | Elite Rs 25,000 (12, _VIP service_)
- Har card ki features bilkul wahi jo aap ne bheji thin (30, 50, 70, 100, unlimited connections,
  file activation, VIP priority, CEO contact waghera)
- Purana masla: price ka bara text title ke oopar aa raha tha, cards ki height alag alag thi,
  buttons alag jagah thay. Ab:
  - Price apni jagah, title ke neeche, koi overlap nahi
  - Sab cards ek hi height ke, "Ask about ..." button har card ke **neeche** fix
  - Badge (Most popular / Exclusive / VIP service) card ke ooper kinare par
  - Ek hi palette: maroon, cream, gold. Purple/navy wale bikhre rang khatam
  - Packages page par carousel ki jagah seedha **grid**: paanchon tiers ek nazar mein
  - Home par har card mein pehli 5 features + "N more in this plan" (home saaf rehta hai)
- Comparison table ab 9 rows, 5 plans ke saath line se
- `#vip` anchor: header ka VIP chip seedha Elite card par le jata hai

## 7. Register aur login pages ki congestion

**Files:** `src/components/forms/RegisterForm.tsx`, `src/components/forms/LoginForm.tsx`,
`src/pages/LoginPage.tsx`, `src/pages/RegisterPage.tsx`

- Register card chaura (`max-w-2xl` → `max-w-3xl`) aur andar zyada padding (`p-6 sm:p-10`)
- Fields ke darmiyan gap barha (`gap-x-6 gap-y-5`), note box ka padding aur line-height behtar
- Step progress, heading aur footer buttons ke darmiyan zyada space; footer par halki border line
- Login card: `sm:p-10`, fields ke beech `space-y-6`, neeche wale notes ko zyada space
- Dono pages par oopar/neeche zyada saans lene ki jagah (`sm:py-14 lg:py-20`)

## Check jo kiye gaye

| Check                                                                 | Natija                                    |
| --------------------------------------------------------------------- | ----------------------------------------- |
| `npx tsc -b`                                                          | pass                                      |
| `npx eslint src`                                                      | 0 errors (6 purane fast-refresh warnings) |
| `npx prettier --check src`                                            | pass                                      |
| `npm run build`                                                       | pass                                      |
| 23 routes ka sweep                                                    | 23/23, console errors none                |
| axe (WCAG 2.1 AA): home, packages, login, register (desktop + mobile) | clean                                     |
| Dropdown kholne par page ki height                                    | bilkul same (koi shift nahi)              |
| Horizontal overflow 390 / 768 / 1280                                  | kahin nahi                                |
| Mobile menu active tab                                                | sahi, `aria-current="page"`               |

## Files (copies)

`changes/v2/` mein badli hui files wahin ke raste par rakhi hain, maslan
`changes/v2/components/forms/ComboboxField.tsx`. Sirf yeh files apne project mein copy karein.

## 8. "Never married" ab "Single"

**Files:** `src/lib/filterOptions.ts`, `src/schemas/profile.schema.ts`,
`src/api/mock/profiles.mock.ts`

- Filter dropdown (home ka find match card, profiles page, register form): **Single**
- Profile card aur profile detail page par marital status: **Single**
- Preference text: "Single preferred" (pehle "Never married preferred")
- Register wizard mein pehle se hi "Single" likha tha, ab poora site ek jaisa hai

Data ki value (`never-married`) waisi hi hai, sirf label badla hai, is liye purane links aur
data kuch nahi toota.
