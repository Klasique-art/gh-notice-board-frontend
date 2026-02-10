# agent.md

## Purpose
This file helps any coding agent contribute to `gh-notice-board` in a way that matches the existing codebase style, architecture, and migration phase.

## Project Snapshot
- Stack: Next.js App Router (`app/`), TypeScript, React 19, Tailwind CSS v4, Framer Motion.
- Design direction: Ghana-first visual identity (green/red/gold tokens), bold card UI, rounded corners, rich badges, and motion for list/detail transitions.
- Data state: Hybrid.
- Some routes/features are real API-backed (`app/lib/*`, `app/api/*`, root listing/detail pages).
- Some dashboard and home areas still use simulated data (`data/mock*.ts`, `data/dummy*.ts`).

## Coding Style (Observed)
- Use TypeScript everywhere and keep types explicit for API contracts.
- Prefer feature-focused files and folders (`components/news/*`, `components/events/*`, etc.).
- Use `@/*` imports instead of deep relative paths.
- Keep naming descriptive and domain-specific (`getDiasporaPosts`, `OpportunityPageContent`, `is_featured`, etc.).
- Keep backend field names in snake_case in request/response models to match Django serializers.
- Use early returns and small guard blocks for errors and empty states.
- Keep comments practical and limited (why, not what).

## UI/Theming Conventions
- Reuse shared semantic classes from `app/globals.css`:
- Typography: `massive-text`, `big-text-*`, `normal-text*`, `small-text*`.
- Layout helpers: `inner-wrapper`, `dash-page`, `flex-center`.
- Reuse theme tokens (`primary`, `accent`, `secondary`) instead of ad-hoc colors when possible.
- Keep styling utility-first with Tailwind class composition in JSX.
- Existing visual language favors:
- `rounded-xl`/`rounded-2xl`
- `border-2 border-slate-200`
- subtle hover elevation and animated state changes
- Framer Motion for staged card/list appearance

## App Architecture Patterns
- Server page components fetch initial data and pass it down to client interactive components.
- Client components own filters, sorting, and pagination interactions.
- Filters are URL-synced via custom hooks (`useNewsFilters`, `useEventFilters`, etc.).
- API access is centralized in `app/lib/*` with typed filter args and typed responses.
- Route handlers in `app/api/*` typically adapt query params and proxy to `app/lib/*`.
- Barrel exports are maintained in `components/index.ts`.

## Data and API Rules During Migration
- Do not remove mock data blindly. Replace feature-by-feature with compatibility in mind.
- Preferred migration path:
1. Add/confirm types in `types/*.ts` for backend payloads.
2. Add/extend fetch helpers in `app/lib/*.ts`.
3. Use/adjust `app/api/*` handlers when client-side fetch indirection is needed.
4. Keep UI props stable; map backend payloads to existing component expectations.
5. Only then remove now-unused mock imports.
- Keep graceful fallbacks in place while endpoints are being stabilized.
- If backend field names differ from UI assumptions, create mapping logic in data layer, not inside presentation components.

## Error Handling and Resilience
- For list pages: render useful fallback UI instead of crashing the whole page.
- For detail pages: return `notFound()` when entity is missing.
- Log actionable errors with context (`feature + operation + identifier`).
- Keep caching intentional:
- highly dynamic listings often use `cache: 'no-store'`
- selected diaspora flows use `revalidate` windows

## Authentication Patterns
- Auth tokens are cookie-based (HttpOnly cookies set in `/api/auth/*` routes).
- Client auth fetch flow uses `fetchWithAuth` with refresh handling.
- Server auth flow uses `app/lib/serverAuth.ts` helpers.
- When adding protected calls, align with existing cookie/token strategy rather than introducing localStorage auth.

## File/Component Conventions
- Page-level route files:
- export `metadata` or `generateMetadata` where applicable
- fetch data on server when possible
- keep page composition thin
- Feature content components (e.g. `*PageContent`) should:
- accept initial server data
- manage filter/sort/load-more lifecycle
- preserve URL state
- Reusable UI pieces belong in `components/ui` and should stay generic.

## Quality Checklist for New Changes
- Types match backend reality.
- No new hardcoded mock data for already-migrated features.
- Theme and typography utility classes are reused.
- Loading/error/empty states are handled.
- URL filter state remains shareable and stable.
- `npm run lint` passes.

## Known Active Mock Zones (Current)
- Home page breaking news + upcoming events still consume `data/mockNews` and `data/mockEvents`.
- Dashboard analytics/applications/saved-items currently use mock datasets.
- Profile/settings areas still include dummy user usage.

## Practical Do/Don't
- Do preserve current UX while swapping data sources.
- Do make data-layer changes first, UI-layer changes second.
- Do keep contracts typed and explicit.
- Do not mix backend transformation logic into visual components.
- Do not change naming conventions from snake_case to camelCase at API boundary unless fully mapped and documented.
- Do not remove mock support from partially migrated flows without replacement parity.