# Lendsqr Admin Dashboard (Frontend)

**Vite + React 19 + TypeScript + SCSS + Vitest**

A fully-featured admin dashboard for Lendsqr built with modern frontend technologies. Consumes a Node/Express JSON API to manage user listings, filtering, search, pagination, and user mutations (activate/blacklist/deactivate).

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Project Structure](#project-structure)
5. [Styling System](#styling-system)
6. [Component Structure](#component-structure)
7. [Hooks & Utilities](#hooks--utilities)
8. [API Integration](#api-integration)
9. [Testing](#testing)
10. [Deployment](#deployment)
11. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts Vite dev server at `http://localhost:5173`

### Build

```bash
npm run build
```

Compiles TypeScript and bundles with Vite.

### Testing

```bash
npm run test              # Watch mode
npm run test:run         # Single run
npm run test:cov         # With coverage report
```

### Linting

```bash
npm lint
```

---

## Features

### Core UI/UX

- **Dashboard Layout**: Top navigation + fixed sidebar + responsive main content
- **Data Table**: Horizontal scrolling on mobile, header filters, inline actions
- **Portal-based Dropdowns**: Filter dropdown & row action menus rendered via React portals to avoid stacking context issues
- **Responsive Design**: Mobile-first approach with breakpoints at 820px, 690px, 400px
- **Skeleton Loading**: Animated skeleton screens with shimmer effect
- **Status Pills**: Styled user status indicators (active, inactive, pending, blacklisted)
- **Star Ratings**: Interactive/read-only star rating component for user tier display

### Data Management

- **Pagination**: Page-based with customizable page size (10, 20, 50, 100)
- **Search**: Full-text search across all user fields
- **Filtering**: Multi-field filters (organization, username, email, phone, status, date)
- **User Actions**:
  - View user details (dedicated detail page)
  - Activate/deactivate users
  - Blacklist/unblacklist users
- **Stats Dashboard**: Real-time card displays (total users, active users, users with loans, users with savings)

### Notifications

- Toast notifications via `react-hot-toast`
- Success, error, and loading states
- Auto-dismiss timers

### Authentication

- Token-based authentication (localStorage)
- Protected routes via `ProtectedRoute` component
- Automatic redirect to login for unauthenticated users

---

## Architecture

### High-Level Flow

```
App (BrowserRouter)
  → MainLayout (Route setup)
    → ProtectedRoute (auth guard)
      → DashboardLayout (header + sidebar)
        → Outlet (dynamic pages)
          → UserPage (users list)
            → UsersTable (data display)
            → Pagination (navigation)
          → UserDetails (individual user page)
```

### State Management

- **URL-based state**: Uses React Router search params as source of truth for pagination, filters, search
- **Local state**: Component-level state for UI toggles (filter open/close), loading states
- **Custom hook**: `useCustomParams()` for URL query parameter management

### Data Flow

```
UserPage (fetches data based on URL params)
  ↓
  useEffect watches location.search
  ↓
  Calls listUsers(filters, pagination, search)
  ↓
  Sets userData & stats
  ↓
  UsersTable renders rows
  ↓
  RowMenu handles mutations (activate/blacklist)
  ↓
  API call → Toast notification → Refetch
```

---

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── loginPage.tsx           # Login form with email/password
│   ├── dashboard/
│   │   ├── layout.tsx              # Main dashboard wrapper (sidebar + navbar + outlet)
│   │   ├── navBar.tsx              # Top navigation bar with logo, search, user menu
│   │   ├── sideBar.tsx             # Left sidebar with navigation items
│   │   ├── userPage.tsx            # Users listing page (stats + table + pagination)
│   │   ├── userTable.tsx           # Data table component (with row actions)
│   │   ├── userInfo.tsx            # User details page (personal, education, socials, guarantors)
│   │   ├── pagination.tsx          # Pagination controls
│   │   └── table.tsx               # Generic table components (THead, TBody, Tr, Td, etc.)
│   └── ui/
│       ├── mainLayout.tsx          # Router setup (protected routes, redirects)
│       ├── protectedRoute.tsx       # Auth guard wrapper
│       ├── button.tsx              # Button component with variants
│       ├── card.tsx                # Card wrapper component
│       ├── filterDrop.tsx           # Filter dropdown (portal-based)
│       ├── menu.tsx                # Row action menu (portal-based)
│       ├── loading.tsx             # Skeleton loader
│       ├── ratings.tsx             # Star rating component
│       └── mobileNav.tsx           # Mobile sidebar drawer
├── pages/
│   ├── login.tsx                   # Login page wrapper
│   ├── users.tsx                   # Users page wrapper
│   ├── usersDetail.tsx             # User detail page wrapper
│   ├── notFound.tsx                # 404 page
│   └── users.test.tsx              # Unit tests
├── hooks/
│   └── useCustomParam.ts           # URL search params management
├── server/
│   ├── server.ts                   # API client (fetch wrapper + endpoints)
│   └── error.ts                    # HttpError class
├── types/
│   └── type.ts                     # TypeScript interfaces & types
├── utils/
│   ├── helpers.ts                  # Utility functions (formatDate, formatNumber, etc.)
│   └── formatDate.ts               # Date formatting helper (using Intl.DateTimeFormat)
├── constants/
│   └── constant.ts                 # Navigation items, stats config, image imports
├── styles/
│   ├── index.scss                  # Main stylesheet (imports all others)
│   ├── _buttons.scss               # Button styles & variants
│   ├── _table.scss                 # Table styles & responsive rules
│   ├── _skeleton.scss              # Skeleton loader animations
│   ├── _rowMenu.scss               # Row action menu styles
│   ├── _ratings.scss               # Star rating styles
│   ├── _mobileNav.scss             # Mobile sidebar styles
│   ├── card.scss                   # Card component styles
│   ├── utilities/
│   │   └── _layout.scss            # Utility classes (flex, grid, gaps, spacing)
│   └── variables/
│       ├── tokens.scss             # Design tokens (spacing, typography, colors)
│       └── colors.scss             # Color palette
├── test/
│   ├── setup.ts                    # Vitest setup (jest-dom, cleanup)
│   └── utils.tsx                   # Test utilities (renderWithRouter)
├── assets/                         # (empty, for future use)
├── App.tsx                         # Root app component
├── main.tsx                        # Entry point (React 19 strict mode, router, toaster)
├── index.css                       # Global CSS reset
└── api.test.ts                     # API client unit tests
```

### Key Directories

| Directory     | Purpose                                           |
| ------------- | ------------------------------------------------- |
| `components/` | React components (pages, layouts, UI elements)    |
| `pages/`      | Page-level components matched to routes           |
| `server/`     | API communication (fetch wrapper, error handling) |
| `hooks/`      | Custom React hooks                                |
| `types/`      | TypeScript type definitions                       |
| `styles/`     | SCSS stylesheets with design tokens               |
| `constants/`  | Hardcoded data, navigation, image imports         |
| `utils/`      | Helper functions & utilities                      |
| `test/`       | Test setup & utilities                            |

---

## Styling System

### Design Tokens (SCSS)

The project uses a **4px base scale** with semantic naming via `tokens.scss`:

#### Spacing

```scss
@function s($key) {
  @return map.get($space, $key);
}

$space: (
  0: 0,
  1: 0.25rem,
  // 4px
  2: 0.5rem,
  // 8px
  3: 0.75rem,
  // 12px
  4: 1rem,
  // 16px
  6: 1.5rem,
  // 24px
  8: 2rem,
  // 32px
  10: 2.5rem,
  // 40px
  12: 3rem,
  // 48px
  16: 4rem,
  // 64px
  24: 6rem,
  // 96px
  32: 8rem,
  // 128px
  56: 14rem,
  // 224px
   // ... more tokens
);
```

Usage: `padding: s(4);` → `1rem`

#### Typography

```scss
$font: (xs: 0.75rem, sm: 0.875rem, base: 1rem, lg: 1.125rem, xl: 1.25rem, 2xl: 1.5rem)
$fw: (regular: 400, medium: 500, semibold: 600, bold: 700)
$lh: (tight: 1.2, normal: 1.5, relaxed: 1.65)

@function fs($key) { @return map.get($font, $key); }
@function fw($key) { @return map.get($fw, $key); }
@function lh($key) { @return map.get($lh, $key); }
```

#### Colors

```scss
// Primary
$cyan-color: #39cdcc

// Status colors
$red-600: #e4033b           // danger
$green-500: #39cd62         // active
$yellow-500: #e9b200        // pending
$orange-500: #f55f44        // loans
$pink-500: #ff3366          // savings
$purple-500: #df18ff        // users

// Neutrals
$gray-blue-primary: #213f7d
$gray-blue-400: #545f7d
$white-color: #ffffff
$white-color-200: #fbfbfb
```

### SCSS Architecture (`@use` modules)

```scss
/* index.scss */
@use "./variables/tokens.scss" as t;
@use "./variables/colors.scss" as color;
@use "./buttons.scss" as btn;
@use "./card.scss" as card;
@use "./utilities/layout.scss" as layout;
@use "./table.scss" as tb;
@use "./skeleton.scss" as sk;
```

**Benefits**:

- Namespaced imports prevent collisions
- Mixins/functions inherit automatically
- DRY design tokens across components

### Component Styles

| File                     | Components                                                                   |
| ------------------------ | ---------------------------------------------------------------------------- |
| `_buttons.scss`          | Primary, secondary, outline, danger, pending, active variants                |
| `_table.scss`            | Table cells, responsive hiding (date, phone, email at different breakpoints) |
| `_card.scss`             | Card wrapper, icon badges (themed by variant)                                |
| `_skeleton.scss`         | Animated shimmer loader                                                      |
| `_rowMenu.scss`          | Dropdown menu (now portal-based, fixed positioning)                          |
| `utilities/_layout.scss` | Flex/grid utilities, gap, margins, positioning                               |

### Responsive Breakpoints

```scss
@media (max-width: 1200px) { .date { display: none; } }
@media (max-width: 1024px) { .phone { display: none; } }
@media (max-width: 800px)  { .email { display: none; } }
@media (max-width: 690px)  { .grid-3 becomes 2-col; hide user tier }
@media (max-width: 400px)  { .grid-4/5 becomes 1-col }
```

**Mobile Navigation**: Hidden by default, revealed with hamburger menu below 820px.

---

## Component Structure

### Container Components

#### `DashboardLayout`

Main layout wrapper combining:

- Fixed header (top navigation)
- Fixed sidebar (left navigation)
- Scrollable main content area

#### `UserPage`

Manages all users listing logic:

- Fetches users + stats from API based on URL params
- Handles loading/error states
- Passes data to `UsersTable` & `Pagination`
- Manages refetch key for mutations

Key state: URL params (`page`, `pageSize`, `search`, filters) via `location.search`

#### `UserInfo`

Detailed user view with:

- User personal information
- Education & employment data
- Social media links
- Guarantor information
- Activation/blacklist buttons

### Presentational Components

#### `UsersTable`

Renders user rows with:

- Column headers with filter icons
- Responsive column hiding
- Inline `RowMenu` for actions
- Portal-based `FilterDropDown` on header click

**Features**:

- Generic table components (THead, TBody, Tr, Td, Th)
- Memoized columns configuration
- Status pills with color coding

#### `Pagination`

Smart pagination component:

- Displays "Showing X out of Y"
- Page size selector (10, 20, 50, 100)
- Previous/Next buttons with disabled states
- Smart page number generation (e.g., "1 2 3 … 8 9 10")

#### `RowMenu`

Action menu rendered via portal:

- Three-dot trigger button
- Fixed positioning relative to trigger
- Items: "View Details", "Blacklist/Unblacklist", "Activate/Deactivate"
- Async operations with loading toast
- Proper event handling to prevent propagation

#### `FilterDropDown`

Portal-based filter form:

- Organization (select dropdown)
- Username (text input)
- Email (text input)
- Phone (number input)
- Date (date input)
- Status (select dropdown)
- Reset / Apply buttons

Now uses portal positioning for proper stacking above table overflow.

### UI Components

| Component          | Purpose                                                                            |
| ------------------ | ---------------------------------------------------------------------------------- |
| `Card`             | White wrapper with shadow, border, padding                                         |
| `CustomBtn`        | Styled button with variants (primary, secondary, outline, danger, active, pending) |
| `Skeleton`         | Animated loading placeholder with shimmer                                          |
| `StarRating`       | Interactive/read-only star display with gradient fill                              |
| `MobileSidebarNav` | Slide-out drawer for mobile navigation                                             |

---

## Hooks & Utilities

### Custom Hooks

#### `useCustomParams()`

Wrapper around React Router's `useSearchParams`:

```tsx
const { getParam, updateQuery, updateMany, getMany } = useCustomParams();

// Get single param
const page = getParam("page");

// Update single param
updateQuery("page", "2");

// Batch update
updateMany({ page: "1", pageSize: "20" });

// Get multiple params
const filters = getMany(["organization", "status"]);
```

**Why**: Provides cleaner API + reduces boilerplate for query param management.

### Utility Functions

#### `formatDate(date: string | Date | number): string`

Uses `Intl.DateTimeFormat` for locale-aware formatting:

```tsx
formatDate("2026-01-24T10:30:00Z");
// → "Jan 24, 2026 10:30 AM"
```

#### `formatNumber(value: number | string, opts?: FormatNumberOptions): string`

Formats numbers with locale, decimals, currency, compact notation:

```tsx
formatNumber(200000, { locale: "en-NG", compact: true });
// → "200K"

formatNumber(200000, { locale: "en-NG", currency: "NGN" });
// → "₦200,000.00"
```

#### `capitalizeFirst(input: string): string`

Capitalizes first letter of string.

#### `getToken()` / `setLocalStorage(key, value)`

LocalStorage helpers for token management.

---

## API Integration

### Base Architecture

**File**: `src/server/server.ts`

```tsx
const BASE_URL = import.meta.env.VITE_API_URL;

async function request<T>(
  path: string,
  opts?: { method?, body?, headers? }
): Promise<T>

// Endpoints
export const listUsers = (params: ListUsersParams) => request<UsersResponse>(...)
export const getUserById = (id: string) => request<User>(...)
export const updateUser = (id: string, patch: Partial<User>) => request<User>(...)
export const deleteUser = (id: string) => request<{ ok: true }>(...)
export const getStats = () => request<StatsResponse>(...)
export const getOrganizations = () => request<{ organizations: string[] }>(...)
export const login = (email: string, password: string) => request<LoginResponse>(...)
```

### Environment Variables

```env
# .env.development
VITE_API_URL=https://lendsqr-be-rq0x.onrender.com

# .env.production
VITE_API_URL=https://lendsqr-be-rq0x.onrender.com
```

### Error Handling

```tsx
class HttpError extends Error {
  status: number;
  data?: unknown;
}

// Backend error with JSON
throw new HttpError("Invalid credentials", 401, { error: "..." });

// Backend error with text
throw new HttpError("Server error", 500);
```

Toast notifications handle error display:

```tsx
try {
  await updateUser(id, patch);
  toast.success("Success!");
} catch (e: any) {
  toast.error(e.message);
}
```

### Query String Building

`buildUsersQuery()` constructs query strings:

```tsx
buildUsersQuery({
  page: 2,
  pageSize: 20,
  search: "John",
  filters: { status: "active", organization: "Lendsqr" },
});
// → "page=2&pageSize=20&search=John&status=active&organization=Lendsqr"
```

Empty values are omitted (cleaner URLs).

---

## Testing

### Test Setup

**File**: `vitest.config.ts`

```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    restoreMocks: true,
    clearMocks: true,
  },
});
```

**Setup file** (`src/test/setup.ts`):

- Imports `@testing-library/jest-dom` for DOM matchers
- Auto-cleanup after each test
- Polyfills for `navigator.clipboard`

### Test Files

#### `src/api.test.ts` — API Client Tests

Tests the `request()` wrapper, error handling, query building.

**Positive scenarios**:

- Query string includes all provided params
- Empty values are omitted
- POST/PATCH requests include `Content-Type: application/json`
- Successful responses are parsed as JSON

**Negative scenarios**:

- Backend JSON error (`{ error: "..." }`) throws `HttpError` with message
- Backend text error throws `HttpError` with text
- Non-2xx response with 404 or 500 includes correct status

#### `src/pages/users.test.tsx` — Component Tests

Tests the `Users` page component with API mocking.

**Positive scenarios**:

- Component loads users on mount
- Table renders correct columns & data
- Stats card displays formatted numbers
- Pagination updates query params on nav

**Negative scenarios**:

- Handles API failure gracefully (no crash)
- Page size change resets to page 1

### Running Tests

```bash
npm run test              # Watch mode
npm run test:run         # Single run
npm run test:cov         # Coverage report

# Watch specific file
npm run test -- src/api.test.ts
```

### Test Patterns

```typescript
// Mock API
vi.mock("../server/server", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, listUsers: vi.fn() };
});

const listUsersMock = vi.mocked(usersApi.listUsers);

// Setup
beforeEach(() => vi.clearAllMocks());

// Render with Router
render(
  <MemoryRouter initialEntries={["/users?page=1&pageSize=10"]}>
    <Users />
  </MemoryRouter>
);

// Assert
expect(await screen.findByText("John Doe")).toBeInTheDocument();
```

---

## Deployment

### Build

```bash
npm run build
```

Outputs to `dist/` directory.

### Before Deploy

1. **Environment**: Set `VITE_API_URL` for production API
2. **ESLint**: Run `npm lint` to check for issues
3. **Tests**: Run `npm run test:run` to verify
4. **Build**: Ensure `npm run build` completes without errors

### Deployment Options

- **Vercel**: Drop `dist/` folder in Vercel dashboard
- **Netlify**: Connect Git repo, set build command to `npm run build`, publish folder to `dist`
- **Docker**: Create Dockerfile with Node builder + nginx server
- **AWS S3 + CloudFront**: Upload `dist` to S3, invalidate CloudFront cache

### Production Checklist

- [ ] API URL is production endpoint
- [ ] Build succeeds without warnings
- [ ] Tests pass
- [ ] No console errors in browser
- [ ] Mobile responsive (test at 400px, 690px, 820px)
- [ ] Token refresh logic (if applicable)
- [ ] Error boundaries for unforeseen failures

---

## Key Features & Implementation Details

### Portal-based Dropdowns

Both `RowMenu` and `FilterDropDown` use React portals to render at the document body level, avoiding stacking context issues with table overflow:

```tsx
return createPortal(
  <div
    style={{
      position: "fixed",
      top: `${position.top}px`,
      left: `${position.left}px`,
      zIndex: 9999,
    }}
  >
    {/* dropdown content */}
  </div>,
  document.body,
);
```

**Benefits**:

- Rendered outside DOM hierarchy
- Unaffected by parent `overflow: hidden`
- Proper z-index stacking on top of everything

### URL-Based State Management

All pagination, filtering, and search state lives in URL params:

```tsx
// Instead of:
const [page, setPage] = useState(1);

// We use:
const page = new URLSearchParams(location.search).get("page") || 1;
```

**Benefits**:

- Shareable URLs (users can bookmark filtered views)
- Back/forward button works
- Refresh preserves state
- Easy to debug (visible in URL bar)

### Responsive Table

Uses media queries to hide columns at smaller breakpoints:

```scss
@media (max-width: 1200px) {
  .date {
    display: none;
  }
}
@media (max-width: 1024px) {
  .phone {
    display: none;
  }
}
@media (max-width: 800px) {
  .email {
    display: none;
  }
}
```

**Mobile**: Table becomes horizontal-scrollable with essential columns visible.

### Async User Mutations

Row actions (activate, blacklist) are async with proper loading state:

```tsx
const handleActivation = async (status, type, id) => {
  toast.loading("Updating...");
  try {
    await updateUser(id, { status: newStatus });
    toast.success("Success!");
    setRefetchKey((k) => k + 1); // Trigger refetch
  } catch (e) {
    toast.error(e.message);
  }
};
```

**Refetch mechanism**: Increment `refetchKey` to trigger `useEffect` dependency change, causing new API call.

---

## Troubleshooting

### Port Already in Use

```bash
npm run dev -- --port 3000
```

### Module Not Found

Clear node_modules and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Tests Failing

Ensure all mocks are set up before import:

```tsx
// ❌ Wrong
import * as api from "../server/server";
vi.mock("../server/server");

// ✅ Correct
vi.mock("../server/server");
import * as api from "../server/server";
```

### SCSS Compilation Errors

Check for missing `@use` statements or undefined variables. Verify all imports in `styles/index.scss`.

---

## Technologies & Versions

| Technology             | Version | Purpose                  |
| ---------------------- | ------- | ------------------------ |
| React                  | 19.2.0  | UI library               |
| TypeScript             | 5.9.3   | Type safety              |
| Vite                   | 7.2.4   | Build tool & dev server  |
| React Router           | 7.13.0  | Client-side routing      |
| SCSS (Sass)            | 1.97.3  | Stylesheets              |
| @mui/icons             | 7.3.7   | Icon library             |
| react-hot-toast        | 2.6.0   | Toast notifications      |
| Vitest                 | 4.0.18  | Unit testing             |
| @testing-library/react | 16.3.2  | Component testing        |
| jsdom                  | 27.4.0  | DOM simulation for tests |
| ESLint                 | 9.39.1  | Code linting             |

---

## Future Enhancements

- [ ] User creation/editing forms
- [ ] Advanced reporting/analytics
- [ ] User activity timeline
- [ ] Bulk user operations
- [ ] Dark mode support
- [ ] Accessibility audit & improvements
- [ ] E2E tests with Playwright/Cypress
- [ ] Error boundaries
- [ ] Performance monitoring (Sentry integration)
- [ ] Multi-language support (i18n)

---

## Contributing

1. Create feature branch: `git checkout -b feature/my-feature`
2. Follow code style: `npm lint`
3. Write tests for new features
4. Submit pull request

---

## License

Proprietary © Lendsqr 2026
