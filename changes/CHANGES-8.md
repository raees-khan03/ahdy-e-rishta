# Poore site ka motion pass (final)

## Batch 3 (pehle bata chuka hoon)

- `/profiles` mein filter change par `AnimatePresence` + `layout`: cards aate, hatate, jagah badalte
- Shortlist dil ka pop + toast, card photo hover zoom, videos grid stagger

## Batch 4 (yeh)

Pages (har page par hero ke baad ka content ek halke `Reveal` mein, hero khud nahi hilta):

`AboutPage`, `AccountPage` (jaisa tha), `BlogPage`, `BlogPostPage`, `BranchesPage`, `ContactPage`,
`FaqPage`, `HowItWorksPage`, `LegalPage`, `PackagesPage`, `SafetyTipsPage`, `ServiceDetailPage`,
`ServicesPage`, `ShortlistPage`, `SuccessStoriesPage`, `TeamPage`, `VideosPage`

- `LegalPage`: sirf article ko reveal kiya, TOC (sticky) ko bahar rakha, warna sticky band ho jata
- `ShortlistPage`: saved profiles bhi `AnimatePresence` se hatate/hote hain
- `PageIntro`: ajnabi route (404) par bhi parda aata hai, taake PageTransition ka 0.7s blank na lage
- `ProfilePhoto`: photo load hote hi fade-in (reduced motion par foran), cache wali photo ka bhi
  khayal (`img.complete`)
- `FloatingActions`: back to top ka halka entrance (pehle se sirf 240px ke baad aata hai, ring
  progress pehle se maujood)

## Jo jaan boojh kar nahi kiya

- Auth pages (login/register/forgot): koi motion nahi, jaisa aap ne kaha
- Header ke nav links par underline: wahan pehle se pill hover hai, dono mil kar bhare hue lagte
- Cookie banner: feature flag se band hai, animation add nahi ki
- Trust strip ko marquee: us se layout badalta, jo rule C mein mana hai (component ban chuka hai,
  zaroorat ho to istemal ho sakta hai)

## Verification

- 26 routes: console errors none
- Har page ko neeche tak scroll kar ke check kiya: koi reveal wrapper adhoora (opacity < 0.5) nahi
- axe WCAG 2.1 AA: home, profiles, profile detail + 10 naye pages (packages, branches, about, faq,
  team, contact, terms, videos, success-stories, shortlist) sab clean
- Reduced motion: koi hidden wrapper nahi, photos foran, hero zoom band
- Print: wrappers opacity 1 / transform none / filter none
- Build: tsc, eslint 0 errors, prettier, `npm run build` pass
