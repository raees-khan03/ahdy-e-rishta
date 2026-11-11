# Motion batch 3: profiles list, shortlist heart, videos grid

1. **Profiles list animation** (`ProfilesPage.tsx`): filter badalne par cards ab `AnimatePresence`
   (`mode="popLayout"`) + `layout` ke saath smoothly aate, hatate aur jagah badalte hain. Grid/list
   toggle par bhi cards apni nayi jagah tak slide karte hain. Reduced motion par sab kuch foran.
2. **Shortlist dil ka pop** (`ShortlistButton.tsx`): save/remove par dil chhota sa pop karta hai
   (1 → 1.32 → 1, 0.34s). Page load par nahi hilta. Toast pehle se maujood tha.
3. **Card photo zoom** (`ProfileCard.tsx`): hover par photo halka zoom (1.05, 500ms). Card ka lift
   pehle se tha.
4. **Videos grid** (`VideosSection.tsx`): plain grid ki jagah `RevealGroup` + `RevealItem`, taake
   videos ek ke baad ek aayein.

Plans, branches, consultants, services, stats, trust strip mein pehle se stagger tha (ScrollReveal),
is liye unhe chheda nahi. FAQ accordion mein pehle se height animation + plus ka rotate-45 tha.

## Checks

- tsc, eslint (0 errors), prettier, build, 24-route sweep, console errors none
- axe WCAG 2.1 AA `/profiles` (1440 + 390) clean
- Shortlist: aria-label "Save AER-1100 to shortlist" → "Remove AER-1100 from shortlist", toast aata hai
- RTL (Urdu): `dir="rtl"`, `/profiles` aur home par horizontal scroll nahi (scrollWidth 1440 = clientWidth)
- Reduced motion: list ke cards seedha opacity 1
