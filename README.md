# Ahd-e-Rishta front end

Front end for Ahd-e-Rishta, a bureau-managed matrimonial service in Lahore. 23 routes, no
public sign up, and every piece of content comes from a typed service layer, so the office can
change text, photos, plans and videos without touching a component.

```bash
npm install
cp .env.example .env       # optional: set the WhatsApp number and API URL
npm run dev                # http://localhost:5173
npm run build              # tsc -b && vite build  ->  dist/
npm run preview            # serve dist/ on :4173
npm run lint               # eslint
npm run format             # prettier --write
```

Node 20+. On a small machine (2 GB RAM) run `NODE_OPTIONS=--max-old-space-size=768 npm run dev`
if Vite is killed while pre-bundling dependencies.

## Docs

| File                         | What is inside                                                                                                                                                                               |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/PROJECT_GUIDE.md`      | Roman Urdu summary, run and build, full folder tree, routes, data flow, admin controls per section, changelog, dummy inventory, environment variables, dev-only values, pre-launch checklist |
| `docs/ADMIN_API_CONTRACT.md` | Every endpoint the front end expects: method, path, body, response, validation, role, upload limits, reorder, activate, pagination                                                           |
| `docs/CONTENT_CHECKLIST.md`  | The office's own checklist before launch: what to replace and where                                                                                                                          |

## Dev-only values

Mock login is on while `VITE_USE_MOCK_API=true`. These accounts exist in the mock layer only and
must never reach production:

- member: `03001234567` / `Rishta@2026`
- admin: `03009999999` / `Bureau@2026`
- password reset code: `123456`

## Structure at a glance

```
src/api/       services (mock now, same JSON shape as the future API)
src/schemas/   zod schemas, the single source of truth for every record
src/hooks/     TanStack Query hooks, shortlist, SEO
src/components home sections, forms, profile cards, plans, layout, ui
src/pages/     one file per route
src/lib/       env, navigation, WhatsApp, filters, analytics
```

`DELIVERY.md` is the earlier handover note and is kept for reference only; `docs/` supersedes it.
