# Motion layer: batch 1 (shell) + batch 2 (home, detail page)

## Shell (batch 1)

- Naye: `Reveal.tsx` (Reveal, RevealGroup, RevealItem), `ScrollProgress.tsx`, `PageTransition.tsx`,
  `useHeaderScroll.ts`, `CountUp.tsx`, `Marquee.tsx`
- `Layout.tsx`: ScrollProgress + PageTransition lagaye
- `PageIntro.tsx`: ab kul 1.5s, parda 0.7s par uthna shuru (PageTransition ka delay bhi 0.7s)
- `Header.tsx`: scroll par blur + shadow, neeche chhupna, ooper wapas. Mobile menu khula ho ya
  focus header ke andar ho to nahi chhupta. Height jaan boojh kar nahi badli (CLS se bachne ke liye)
- `SectionHeading.tsx`: patli line heading ke aate hi khud khinchti hai
- `index.css`: motion.css block (`lift`, `img-fade`, `nav-underline`, `cta-arrow`, reduced-motion
  aur print reset) + do keyframes retimed

## Home (batch 2)

- `HomePage.tsx`: hero ke baad har section `Reveal` mein, direction section ke hisab se
  (stats/CTA `scale`, founder `left`, safety `right`, newsletter `blur`, baqi `up`)
- `HeroCarousel.tsx`: hero photo par bahut halka slow zoom, aur heading/eyebrow/subheading/buttons
  ek ke baad ek aate hain. Reduced motion par dono band
- `StatsSection.tsx`: numbers 0 se ginte hain (saal 2009 nahi ginta, aur "4-step"/"1:1" jaise text
  waise hi rehte hain). Print aur screen reader ko hamesha aakhri number milta hai
- `CountUp.tsx`: `groupDigits` option (2,480)

## Detail page (batch 2)

- `ProfileDetailPage.tsx`: aap ki approved file waisi hi (sticky left column, ek card per topic).
  Sirf itna: About, chaaron detail cards, amber note, CTA aur similar carousel `Reveal` mein.
  Left sticky column ko jaan boojh kar Reveal se bahar rakha (warna sticky kaam karna band ho jata)

## Checks

tsc, eslint (0 errors), prettier, build, 24-route sweep, axe (home 1440/390 + detail) clean.
Print media mein 9/9 reveal wrappers poori tarah visible. Reduced motion par hero zoom nahi,
reveals foran.
