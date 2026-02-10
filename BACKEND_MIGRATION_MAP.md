# Backend Migration Map

Backend scanned: `C:\Users\DELL\Desktop\backend\gh-notice-board`
Frontend repo: `d:\KLASIQUE STUFF\D-klasique-projects\gh-notice-board`

## 1) Confirmed API base + app routers
- Global prefix: `/api/` from `gh_notice_board/urls.py`.
- Core app routers:
- Auth: `/api/register/`, `/api/login/`, `/api/token/refresh/`, `/api/users/*`
- News: `/api/articles/*`
- Events: `/api/events/*`, `/api/categories/*`, `/api/registrations/*`
- Opportunities: `/api/opportunities/*`, `/api/applications/*`, `/api/saved-opportunities/*`
- Diaspora: `/api/diaspora/*`
- Announcements: `/api/announcements/*`
- Interactions: `/api/interactions/*` (like/bookmark/review/stats)
- Tags: `/api/categories/*`, `/api/tags/*`, `/api/subscriptions/*`
- Submissions: `/api/submissions/content/*`, `/api/submissions/contact/*`
- Newsletters: `/api/newsletters/subscribers/*`, `/api/newsletters/*`

## 2) High-value endpoint map for current frontend features

### News
- List/detail: `GET /api/articles/`, `GET /api/articles/{slug}/`
- Extra actions: `/trending/`, `/breaking/`, `/featured/`, `/{slug}/like/`, `/{slug}/bookmark/`, `/{slug}/share/`, `/{slug}/comments/`
- Filters supported: `search`, `category` (UUID), `category_slug`, `tag`, `author`, `status`, `is_featured`, `is_breaking`, `is_trending`, `is_ai_generated`, `date_from`, `date_to`, `ordering`, `page`

### Events
- List/detail: `GET /api/events/`, `GET /api/events/{slug}/`
- Actions: `/{slug}/register/`, `/{slug}/unregister/`, `/{slug}/registrations/`, `/{slug}/like/`, `/{slug}/bookmark/`, `/{slug}/share/`
- Collection actions: `/upcoming/`, `/past/`, `/today/`, `/featured/`, `/popular/`, `/my_events/`, `/registered/`
- Filters supported by backend: `search`, `category` (UUID), `category_slug`, `tag`, `organizer` (UUID), `event_type`, `status`, `date_from`, `date_to`, `is_virtual`, `is_free`, `is_featured`, `location`, `city`, `region`, `ordering`, `page`

### Opportunities
- List/detail: `GET /api/opportunities/`, `GET /api/opportunities/{slug}/`
- Collection actions: `/featured/`, `/active/`, `/jobs/`, `/scholarships/`, `/diaspora/`
- Filters supported: `opportunity_type`, `category__slug`, `is_featured`, `is_remote`, `is_diaspora`, `search`, `ordering`, `page`
- Applications: `GET/POST /api/applications/`
- Saved opportunities: `GET/POST /api/saved-opportunities/`

### Diaspora
- List/detail: `GET /api/diaspora/`, `GET /api/diaspora/{slug}/`
- Collection actions: `/featured/`, `/urgent/`, `/embassy/`, `/immigration/`, `/by_country/`
- Filters supported: `content_type`, `category__slug`, `country`, `region`, `is_featured`, `is_urgent`, `search`, `ordering`, `page`

### Announcements
- List/detail: `GET /api/announcements/`, `GET /api/announcements/{slug}/`
- Collection actions: `/emergency/`, `/urgent/`, `/national/`

### Auth/profile
- Register/login/refresh: `POST /api/register/`, `POST /api/login/`, `POST /api/token/refresh/`
- Current user: `GET /api/users/me/`
- Profile update: `PUT/PATCH /api/users/update_profile/`
- Password change: `POST /api/users/change_password/`

### Generic bookmarks/interactions
- Toggle bookmark: `POST /api/interactions/bookmark/`
- List bookmarks: `GET /api/interactions/bookmarks/`
- Like/dislike/review/stats also available under `/api/interactions/*`

## 3) Frontend/backed mismatches to fix first (critical)

1. Diaspora endpoint path mismatch
- Frontend currently calls `/diaspora/posts/` in `app/lib/diaspora.ts`.
- Backend exposes `/api/diaspora/` (router basename `diaspora`).
- Fix: update list/detail/featured URLs in `app/lib/diaspora.ts`.

2. Events date filter mismatch
- Frontend sends `start_date__gte` / `start_date__lte` in `app/lib/events.ts`.
- Backend filter keys are `date_from` / `date_to`.
- Fix: align `EventFilters` + query param mapping.

3. Events API route uses wrong filter keys
- `app/api/events/route.ts` includes non-backend keys (`is_trending`, `is_upcoming`, `start_date_from`, `start_date_to`, etc).
- Fix: send only backend-supported keys.

4. Event ordering mismatch
- Frontend hook includes `-registration_count` sort (`hooks/useEventFilters.tsx`).
- Backend model exposes `registered_count`; view also references inconsistent `registration_count` internally.
- Fix frontend to safe sort fields now (`start_date`, `-start_date`, `-created_at`, `-views_count`, `price`, `-price`) until backend is normalized.

5. Opportunities category filter mismatch
- Backend expects `category__slug`; frontend libs mix `category` and `category_slug`.
- Fix: standardize to `category__slug` in URL params from UI layer.

6. Home still mock-backed
- `app/(root)/page.tsx` uses `mockNews` and `mockEvents`.
- Replace with `getBreakingNews()` and events from `getUpcomingEvents()` (after events filter fixes).

7. Dashboard mock zones
- Applications pages still use `mockApplications*`.
- Saved items page still uses `mockSavedItems*`.
- Analytics page still uses `mockAnalyticsData` (no dedicated backend analytics endpoint yet).

## 4) Mock replacement map (frontend file -> backend endpoint)

### Ready now
- `app/(root)/page.tsx`
- Breaking news -> `GET /api/articles/?is_breaking=true&ordering=-published_at`
- Upcoming events -> `GET /api/events/?date_from=<now>&ordering=start_date`

- `app/(dashboard)/dashboard/applications/page.tsx`
- `GET /api/applications/?page=...&status=...`

- `app/(dashboard)/dashboard/applications/[id]/page.tsx`
- Use `GET /api/applications/` + filter client-side for now, or add backend retrieve by id route usage directly.

- `app/(dashboard)/dashboard/saved-items/page.tsx`
- `GET /api/interactions/bookmarks/` (generic cross-content bookmarks)

- `app/(dashboard)/dashboard/profile/page.tsx`
- `GET /api/users/me/`

- `app/(dashboard)/dashboard/profile/edit/page.tsx`
- `PATCH /api/users/update_profile/`

- `app/(dashboard)/dashboard/settings/security/page.tsx`
- `POST /api/users/change_password/`

### Needs frontend plumbing first
- `app/(root)/announcements/page.tsx` and `app/(root)/announcements/[slug]/page.tsx`
- Backing API exists: `/api/announcements/`, `/api/announcements/{slug}/`

## 5) Suggested migration sequence (lowest risk)
1. Fix data-layer mismatches (`app/lib/events.ts`, `app/lib/diaspora.ts`, `app/api/events/route.ts`).
2. Replace home mocks.
3. Replace dashboard applications and saved-items mocks.
4. Replace profile/settings dummy user usage with `/users/me`.
5. Add announcements listing/detail with real backend.
6. Keep analytics mocked until backend analytics endpoints are added.

## 6) Backend issues to track (do not block frontend wiring)
- `events/views.py` has inconsistent `registration_count`/`registered_count` usage.
- `tags/views.py` references `news.models.Article` in recommendation flow; backend model is `NewsArticle`.
- `gh_notice_board/settings.py` has `ASGI_APPLICATION = 'config.asgi.application'` but project module is `gh_notice_board`.

## 7) Next implementation target
Start with this practical slice:
- Fix `events` + `diaspora` lib param/path mismatches.
- Convert `app/(root)/page.tsx` from `mockNews/mockEvents` to real API calls.

Then continue with dashboard applications + saved-items in the same PR.
