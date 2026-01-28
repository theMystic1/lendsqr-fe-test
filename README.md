# Lendsqr Admin Dashboard (Frontend) — Vite + React + TS + SCSS

A Lendsqr-style admin dashboard frontend built with **Vite + React + TypeScript**, using an SCSS token system + utility classes, and consuming a **Node/Express JSON API** (no DB) for users listing, filtering, search, pagination, and mutations (activate/blacklist).

---

## Features

### UI / UX

- Standard admin layout: **Top Nav + Sidebar + Main content (Outlet)**
- Responsive table container (horizontal scroll on small screens)
- Mobile-only slide-in sidebar (left drawer), scrollable with max-height
- Reusable UI components: **Card**, **Button variants**, **Table family**, **Skeleton loader**, **Status pill**
- Row actions menu (three dots) rendered via **Portal** for proper stacking above table

### Data / Ops

- Users list with:
  - Pagination (`page`, `pageSize`)
  - Full-text Search (`search`) across **all fields** (name, email, phone, nested guarantors, etc.)
  - Filters:
    - `organization`, `userName`, `emailAddress`, `phoneNumber`, `status`, `date`
  - Sort (optional): `sortBy`, `sortDir`
- User mutation:
  - Activate / Deactivate
  - Blacklist / Unblacklist
- Stats cards (from `/stats`)
- Filter dropdown options (from `/filters`)

### Notifications

- `react-hot-toast` for load/success/error messages
- `<Toaster />` mounted once at app root

---

## Tech Stack

- React 19 + TypeScript
- Vite
- React Router
- SCSS (Dart Sass) with `@use`
- Material UI Icons (`@mui/icons-material`)
- react-hot-toast

---

## Project Structure (recommended)

```txt
src/
  components/
    dashboard/
      pagination/
      userTable/
    ui/
      button/
      card/
      table/
      loading/
  hooks/
    useCustomParam.ts
  layouts/
    DashboardLayout.tsx
  pages/
    Login.tsx
    Users.tsx
    UserDetails.tsx
    NotFound.tsx
  server/
    api.ts
  styles/
    variables/
      tokens.scss
      colors.scss
    utilities/
      layout.scss      # flex/grid/gap utilities
    components/
      table.scss
      card.scss
      button.scss
    index.scss
  types/
    type.ts
  utils/
    helpers.ts
main.tsx
App.tsx
```

## Unit Tests (Vitest) — Positive + Negative Scenarios

This project includes **unit tests for the frontend API client** (query builder + request wrapper). The goal is to verify both:

- **Positive scenarios**: correct query construction, successful fetch flows, correct JSON parsing.
- **Negative scenarios**: non-2xx responses throw a typed `HttpError` with the backend message (JSON or text).

### What we tested

**Query building**

- Builds `/users` query string with `page`, `pageSize`, `search`, `sortBy`, `sortDir`
- Includes filter fields only when provided
- **Does not include** empty/undefined filter keys

  **Successful requests**

- `listUsers()` calls `fetch()` with the correct URL + query string
- `login()` and `updateUser()` send JSON with `Content-Type: application/json`

  **Error handling (negative tests)**

- When backend returns `{ error: "..." }` with `application/json`, client throws `HttpError` with:
  - `message = backend error`
  - `status = HTTP status`
  - `data = parsed JSON`

- When backend returns `text/plain`, client throws `HttpError` with:
  - `message = returned text`
  - `status = HTTP status`

---

### Setup

Install dev dependencies (if not already):

```bash
npm i -D vitest jsdom
```

Add a test script to `package.json`:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

> If you use `vite.config.ts`, ensure Vitest config is inside `defineConfig({ test: {...} })` (Vitest v4+ expects that config shape).

---

### Test File Location

Create:

```txt
src/api.test.ts
```

### Running Tests

```bash
npm run test
```

Vitest will watch by default. Quit with `q`.

---

### Notes / Common Pitfalls

- **BASE_URL becomes `undefined` in tests** if `VITE_API_URL` isn’t set _before importing_ the module.
  - That’s why tests use: `vi.stubEnv("VITE_API_URL", "...")` **before** `import()`.

- If `instanceof HttpError` fails, it usually means `HttpError` is imported from **two different module instances**.
  - Keep `HttpError` imported from **one canonical path** across the app.
