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
