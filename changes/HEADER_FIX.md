# Header: mobile menu mein active tab ka fix

## Asal wajah (yeh React Router ka masla nahi, Radix Slot ka hai)

Mobile menu mein link aise likha hua tha:

```tsx
<SheetClose asChild>
  <NavLink to={item.href} className={({ isActive }) => cn(...isActive ? "..." : "...")}>
```

`SheetClose asChild` Radix `Slot` se banta hai. Slot apne props child ke saath **milata** hai, aur
`className` ko string bana kar jor deta hai:

```
[slotClassName, childClassName].filter(Boolean).join(" ")
```

`childClassName` ek function tha, is liye wo string ban gaya. Browser mein class attribute ban jata tha:

```html
<a class='function P4({isActive:a}){return St("flex min-h-11 ..." ...)}' href="/profiles"></a>
```

Yani active aur inactive dono classes ek hi string mein, aur wo asal class names kabhi apply hi nahi
hoti thin. Isi liye mobile menu mein active tab ka rang/kaj nahi aata tha. (Desktop nav theek chalta
tha kyunke wahan Slot nahi hai.)

## Hal

`className` ko function ke bajaye **plain string** dijiya, aur active page khud `useLocation()` se
check kiya:

```tsx
function useIsActive() {
  const { pathname } = useLocation();
  return (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
```

```tsx
const isActive = useIsActive();

<SheetClose asChild>
  <NavLink to={item.href} end={item.href === "/"} className={mobileLinkClass(isActive(item.href))}>
    ...
  </NavLink>
</SheetClose>;
```

`aria-current="page"` phir bhi NavLink khud lagata hai, is liye screen reader ke liye kuch nahi bigda.

## Mobile par active tab kaise nazar aata hai

- Poori row par halka maroon background (`bg-maroon-800/12`) aur bold text
- Baayein (RTL mein daayein) 4px maroon patti
- Daayein taraf chevron ka rang maroon
- Neeche wale chhote chips (How it works, Our team, Guidance blog, Shortlist) bhi active page par
  maroon border aur tint le lete hain

## Mobile responsive jo behtar kiya

| Cheez               | Pehle                                 | Ab                                                   |
| ------------------- | ------------------------------------- | ---------------------------------------------------- |
| Nav link ki height  | `py-2.5` (38 px)                      | `min-h-11` (44 px touch target)                      |
| Active nishan       | sirf halka rang (nazar nahi aata tha) | patti + tint + bold + chevron                        |
| `end` prop          | sirf desktop par                      | mobile par bhi (warna "/" har page par active rehta) |
| Sheet ka background | Radix default                         | `bg-cream-50` (site ke rang ke mutabiq)              |
| User ka naam        | overflow ho sakta tha                 | `max-w-28 truncate`                                  |
| `mainNav` render    | do jagah alag alag                    | desktop aur mobile dono `isActive()` se              |

## Files

| File                               | Kya badla                                                                                                                                             |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/layout/Header.tsx` | Sirf yeh zaroori hai. Poora code `changes/Header.tsx` mein.                                                                                           |
| `src/components/ui/sheet.tsx`      | Optional, magar tajweez hai: close button 32px se 40px kar diya (touch target) aur header se overlap na ho is liye `pe-14`. Copy `changes/sheet.tsx`. |

Badlav ke baad:

```bash
npm run build
npm run preview
```

Browser mein **Ctrl + Shift + R**.

## Verify (mobile par)

1. Kisi bhi page par jayein, hamburger kholein: us page ka link tinted, bold, baayein patti ke saath.
2. `/how-it-works`, `/blog`, `/team`, `/shortlist` kholein: neeche wala chip bhi highlight ho.
3. Active link par screen reader `aria-current="page"` parhta hai.
4. 390, 768, 1024 par header mein koi horizontal scroll nahi (maine check kiya).
