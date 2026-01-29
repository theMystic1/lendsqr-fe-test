# Lendsqr Admin Dashboard (Frontend)

**Vite + React 19 + TypeScript + SCSS + Vitest**

Welcome! This is the **admin dashboard interface** for Lendsqr, a fintech platform. Think of it as the "control center" where administrators can:

- 👥 View all customers (users) in a table
- 🔍 Search for specific users by name, email, or phone number
- 🎯 Filter users by status (active, inactive, pending, blacklisted), organization, and date range
- ⚙️ Perform actions on users (activate them, blacklist them, deactivate them, or view their full details)
- 📊 See quick statistics (total users, active users, etc.)

**Built with**: React 19 (modern UI library), TypeScript (safe code), Vite (super fast), and SCSS (beautiful styling).

**Where does it connect?** This dashboard talks to a backend API (a Node/Express server) that stores all the user data and handles the actual changes when you click buttons.

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

### What You'll Need

Before you start, make sure you have these installed on your computer:

- **Node.js 18+** - JavaScript runtime (download from nodejs.org)
- **npm** - Package manager (comes automatically with Node.js)

### Getting Started (3 Steps)

#### Step 1: Install Dependencies

Think of this like installing all the "building blocks" your app needs to run:

```bash
npm install
```

This reads the `package.json` file and downloads all required packages into a `node_modules` folder.

#### Step 2: Start the Development Server

Now you can run the app locally on your computer and see changes instantly as you code:

```bash
npm run dev
```

This starts a local server at **http://localhost:5173** — open this in your browser to see the dashboard!

The page will automatically refresh when you save changes (called "hot reload" — super helpful for development).

#### Step 3: Make Changes & Test

Open the `src/` folder and start editing files. Any changes will appear instantly in the browser.

### Test Login Credentials

The backend only accepts **3 dummy admin accounts**. Use these to log in and test the dashboard:

| Email                       | Password        | Name            |
| --------------------------- | --------------- | --------------- |
| `lucky.admin@example.com`   | `Lucky@2026!`   | Lucky Ugochukwu |
| `grace.admin@example.com`   | `Grace@2026!`   | Grace Okafor    |
| `chinedu.admin@example.com` | `Chinedu@2026!` | Chinedu Adeleke |

**Steps to test:**

1. Start the dev server: `npm run dev`
2. Open http://localhost:5173 in your browser
3. You'll see a login page
4. Enter one of the emails and passwords above
5. Click "Log In"
6. You're now in the dashboard! Test the features (search, filter, activate users, etc.)

### Other Important Commands

```bash
# Build for production (creates optimized "dist" folder)
npm run build

# Run tests once
npm run test:run

# Run tests in watch mode (re-runs when you change files)
npm run test

# Check code quality
npm lint
```

---

## Features: What Can You Do?

### The Main Page: Users Dashboard

When you log in, you see a list of all users in a **data table** (like an Excel spreadsheet). Here's what you can do:

**📋 View Users**

- See all users in one place
- Each row shows: name, email, organization, phone, date joined, and status (active/blacklisted/etc.)
- The table is **responsive** — on mobile phones, it automatically hides less important columns (like phone number) to fit the screen

**🔍 Search Functionality**

- Type someone's name, email, or phone in the search bar
- Results update instantly (doesn't require clicking a button)

**🎯 Filter Users**

- Click the filter icon on a column header (e.g., "Status")
- A dropdown form appears with options like:
  - Organization (company name)
  - Username
  - Email
  - Phone number
  - Date range
  - Status (Active, Inactive, Pending, Blacklisted)
- Click "Apply" to filter, or "Reset" to clear filters

**⚙️ User Actions (Three-Dot Menu)**

- Click the three dots (⋮) on any row
- A menu appears with options:
  - **View Details** → Opens a detailed profile page with full user info
  - **Activate** → Make the user active (if they're inactive)
  - **Deactivate** → Deactivate the user
  - **Blacklist** → Add user to blacklist
  - **Unblacklist** → Remove from blacklist

**📄 Pagination**

- Shows "Showing 1-10 of 4,000 users" (for example)
- Click page numbers, Previous/Next buttons to navigate
- Change how many users per page: 10, 20, 50, or 100

### The Details Page: Individual User Profile

When you click "View Details" for a user, you see:

- **Personal Info**: Name, email, phone, bvn, gender, marital status, date of birth, employment status
- **Education**: Level, school name, qualification
- **Socials**: Twitter, Instagram, LinkedIn profiles
- **Guarantors**: Information about their loan guarantors
- **Action Buttons**: Activate, Deactivate, Blacklist, Unblacklist

### Stats Dashboard

At the top of the Users page, you see 4 cards showing:

- **Total Users** - How many users exist
- **Active Users** - How many are currently active
- **Users with Loans** - How many borrowed money
- **Users with Savings** - How many are saving

These numbers update in real-time from the server.

### Smart UI Features

**Loading States**

- When data is loading, you see animated skeleton screens (gray placeholder boxes)
- This makes the UI feel faster and less broken

**Status Badges**

- Each user has a colored status pill:
  - 🟢 Green = Active
  - 🔴 Red = Blacklisted
  - 🟠 Orange = Pending
  - ⚫ Gray = Inactive

**Toast Notifications**

- When you click a button (like "Activate"), a small notification pops up:
  - "Loading..." → "Success!" (green)
  - Or "Error: Failed to activate user" (red)
- They auto-dismiss after 3 seconds

**Authentication**

- You must log in with email and password
- Your token is saved in the browser (localStorage)
- If you refresh or close the browser, you stay logged in (until you log out)

---

## How the App Works (Architecture)

### The Big Picture

Think of the app like a restaurant:

1. **You (the User)** click buttons and see the interface
2. **The Kitchen (Components)** prepares the data and displays it nicely
3. **The Delivery Driver (API)** goes to the backend server to fetch data or make changes
4. **The Restaurant (Backend)** stores everything and processes requests

### Data Flow Example: Viewing Users

Here's what happens when you load the Users page:

```
1. You navigate to /users in the browser
   ↓
2. React loads the UserPage component
   ↓
3. UserPage checks the URL for search params:
   - page = 1
   - pageSize = 10
   - search = (empty)
   ↓
4. A useEffect hook runs (a React timer that watches for changes)
   ↓
5. Calls API: listUsers({ page: 1, pageSize: 10 })
   ↓
6. Backend returns: { data: [...], totalCount: 4000 }
   ↓
7. React stores this in state (setState)
   ↓
8. Components re-render with the new data
   ↓
9. You see the user table on screen!
```

### State Management: "Remembering Things"

This app uses **URL-based state** — instead of storing things in memory, we store them in the URL itself.

**Why?**

- If you refresh the page, your filters/page/search stays the same
- You can bookmark a filtered view and share the URL
- The back/forward buttons work correctly

**Example:**

```
# You filter to show only "Active" users on page 2
/users?page=2&pageSize=10&status=active

# Refresh the page → you're still on page 2, status=active
# Share the URL → your colleague sees the same filtered view
# Click back button → returns to previous search/filter
```

**Code example:**

```tsx
// Instead of using useState for page number:
// const [page, setPage] = useState(1);

// We use the URL directly:
const searchParams = new URLSearchParams(location.search);
const page = searchParams.get("page") || 1;

// To update, we change the URL:
searchParams.set("page", "2");
window.history.pushState({}, "", `?${searchParams}`);
```

### Component Hierarchy: "Who's the Boss?"

```
App (the root)
  ├── MainLayout (sets up routing)
  │   ├── LoginPage (login screen)
  │   └── ProtectedRoute (prevents unauthorized access)
  │       └── DashboardLayout (sidebar + header + content area)
  │           ├── NavBar (top bar with logo, search, user menu)
  │           ├── SideBar (left navigation)
  │           └── Outlet (dynamic content — changes based on current page)
  │               ├── UserPage (shows user list)
  │               │   ├── Stats (4 cards showing numbers)
  │               │   ├── UsersTable (the actual table)
  │               │   │   ├── FilterDropDown (hidden by default, shows on filter click)
  │               │   │   └── RowMenu (hidden by default, shows on three-dots click)
  │               │   └── Pagination (page navigation)
  │               └── UserDetailPage (shows one user's details)
```

**Key insight:** Components at the top control components at the bottom. The UserPage manages all the data fetching, then passes it down to UsersTable, FilterDropDown, etc.

### How "Portals" Work (Advanced Concept)

**Problem:** When you click the filter icon, a dropdown appears. But if the table has `overflow: hidden` (to hide scrollbars), the dropdown gets hidden too!

**Solution:** We use React Portals — they teleport the dropdown to render at the very top level (`<body>`), outside the table's overflow area.

```tsx
// The dropdown renders here (outside the table overflow)
createPortal(
  <div style={{ position: "fixed", top: "100px", left: "200px", zIndex: 9999 }}>
    Filter form goes here
  </div>,
  document.body, // ← render at document.body instead of current location
);
```

**Result:** The dropdown appears on top of everything, not hidden behind the table.

---

## Project Structure: Where Everything Lives

Before diving into code, here's what each folder contains:

```
src/
├── components/              👈 React components (the building blocks of the UI)
├── pages/                   👈 Full page components
├── hooks/                   👈 Custom React functions
├── server/                  👈 API communication code
├── types/                   👈 TypeScript type definitions
├── styles/                  👈 SCSS stylesheets
├── constants/               👈 Hardcoded data (image paths, nav items)
├── utils/                   👈 Helper functions
├── test/                    👈 Test setup and utilities
├── App.tsx                  👈 Root component
├── main.tsx                 👈 Entry point (where the app starts)
└── index.css                👈 Global CSS
```

### Components Folder (Most Important!)

```
components/
├── auth/
│   └── loginPage.tsx              # Login form (email + password)
├── dashboard/
│   ├── layout.tsx                 # Main dashboard wrapper
│   ├── navBar.tsx                 # Top bar with logo, search, user menu
│   ├── sideBar.tsx                # Left sidebar with nav items
│   ├── userPage.tsx               # Users list page
│   ├── userTable.tsx              # The table component
│   ├── userInfo.tsx               # User details page
│   ├── pagination.tsx             # Page navigation
│   └── table.tsx                  # Generic table parts (THead, TBody, etc.)
└── ui/
    ├── mainLayout.tsx             # Route setup
    ├── protectedRoute.tsx          # Auth guard
    ├── button.tsx                 # Reusable button
    ├── card.tsx                   # Reusable card wrapper
    ├── filterDrop.tsx             # Filter dropdown (appears on filter click)
    ├── menu.tsx                   # Three-dot menu (appears on row click)
    ├── loading.tsx                # Loading skeleton
    ├── ratings.tsx                # Star rating display
    └── mobileNav.tsx              # Mobile sidebar
```

**Quick Understanding:**

- **components/dashboard/** = Pages and large sections
- **components/ui/** = Small reusable pieces (buttons, cards, dropdowns)
- **components/auth/** = Login-related components

### Understanding Key Files

#### `src/main.tsx` - The Entry Point

This is the **first file that runs** when you visit the app:

```tsx
// main.tsx
ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>,
);
```

Translation: "Start React, load the router (which handles which page to show), and set up toast notifications."

#### `src/App.tsx` - The Root Component

This is the main React component that wraps everything:

```tsx
export default function App() {
  return <MainLayout />;
}
```

#### `src/pages/users.tsx` - The Users Page

When you navigate to `/users`, this page component loads.

#### `src/server/server.ts` - The API Communicator

This file talks to the backend. Think of it as your mailman:

```tsx
// "Hey backend, give me the user list"
const users = await listUsers({ page: 1, pageSize: 10 });

// "Hey backend, make this user active"
await updateUser("user-123", { status: "active" });
```

### Styling Organization

```
styles/
├── index.scss               # Main file (imports everything)
├── _buttons.scss            # Button styles
├── _table.scss              # Table styles
├── _skeleton.scss           # Loading animation
├── _rowMenu.scss            # Three-dot menu styles
├── _ratings.scss            # Star rating styles
├── card.scss                # Card styles
├── utilities/
│   └── _layout.scss         # Helper classes (flex, spacing, etc.)
└── variables/
    ├── tokens.scss          # Design system values
    └── colors.scss          # All colors used in the app
```

**The Flow:** index.scss imports everything, so when a component needs styles, they're already available.

### Types & Constants

#### `src/types/type.ts`

Defines TypeScript types (like blueprints for data):

```tsx
interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  status: "active" | "inactive" | "blacklisted" | "pending";
  // ... more fields
}
```

#### `src/constants/constant.ts`

Stores fixed data that doesn't change:

```tsx
import whitelistIcon from "/images/whitelist.png";
import blacklistIcon from "/images/blacklist.png";
// ... all image imports

export const navItems = [
  { label: "Dashboard", icon: homeIcon, path: "/" },
  { label: "Users", icon: usersIcon, path: "/users" },
  // ... more nav items
];
```

---

## Styling System: Making Things Look Good

### What Are Design Tokens?

A **design token** is a reusable value used throughout the app. Instead of writing colors randomly everywhere, we define them once and reuse them:

**Example (Bad way):**

```scss
.button {
  padding: 16px; // Random number
  background: #39cdcc; // Random color
}
.card {
  padding: 16px; // Same number, but defined separately
}
```

**Example (Good way - using tokens):**

```scss
// Define once
$spacing-4: 16px;
$primary-color: #39cdcc;

// Use everywhere
.button {
  padding: s(4); // Uses token
  background: color.$primary; // Uses token
}
.card {
  padding: s(4); // Same token!
}
```

**Why?** If you want to change the padding from 16px to 20px, you change it in ONE place instead of hunting through the entire codebase.

### The 4px Scale (Spacing)

All spacing in this app is based on **4px**:

```
4px, 8px, 12px, 16px, 24px, 32px, 40px, 48px, 64px...
```

Why? It looks organized. Humans like multiples of 4.

**Usage:**

```scss
// In SCSS files
padding: s(4); // 16px (4 × 4)
margin-bottom: s(3); // 12px
gap: s(2); // 8px
```

### Color Palette

We have semantic colors (meaning = specific purpose):

**Primary Color:**

- `$cyan-color: #39cdcc` — Used for buttons, links, active states

**Status Colors (what does each color mean?):**

- 🟢 `$green-500: #39cd62` — User is active/successful
- 🔴 `$red-600: #e4033b` — Danger, user blacklisted, error
- 🟠 `$yellow-500: #e9b200` — Pending, warning
- 🟣 `$purple-500: #df18ff` — Savings feature
- 🟠 `$orange-500: #f55f44` — Loans feature
- 🩷 `$pink-500: #ff3366` — Additional savings feature

**Neutrals (grayscale for text, backgrounds):**

- `$gray-blue-primary: #213f7d` — Dark text
- `$gray-blue-400: #545f7d` — Medium gray text
- `$white-color: #ffffff` — Pure white
- `$white-color-200: #fbfbfb` — Off-white background

### How Styling Works

The SCSS system uses **modules** (groups of styles). Here's how they connect:

```
index.scss (main file)
  ├── imports tokens.scss (spacings, font sizes, font weights)
  ├── imports colors.scss (color variables)
  ├── imports buttons.scss (button styles)
  ├── imports card.scss (card styles)
  ├── imports table.scss (table styles)
  └── imports utilities/layout.scss (helper classes)
```

**Why?** If a component needs a button, the button styles are already loaded.

### Example: Styling a Button

**Step 1: Define in SCSS**

```scss
// styles/_buttons.scss
@use "./variables/colors.scss" as color;
@use "./variables/tokens.scss" as t;

.btn-primary {
  padding: t.s(4) t.s(6); // Uses spacing tokens
  background: color.$cyan-color; // Uses color token
  border-radius: 4px;
  font-weight: t.fw(semibold); // Uses font weight token
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: darken(color.$cyan-color, 10%); // Slightly darker on hover
  }
}
```

**Step 2: Use in React**

```tsx
// components/ui/button.tsx
import "./styles/_buttons.scss";

export function Button({ children, variant = "primary" }) {
  return <button className={`btn-${variant}`}>{children}</button>;
}
```

**Step 3: Use in a page**

```tsx
<Button variant="primary">Click Me</Button>
// Renders: <button class="btn-primary">Click Me</button>
```

### Responsive Design (Mobile to Desktop)

The app looks good on all screen sizes. Here's how:

**Breakpoints** (screen width thresholds):

- **1200px and above** — Desktop (show all columns)
- **1024px to 1199px** — Tablet landscape (hide date column)
- **820px to 1023px** — Tablet portrait (hide phone column)
- **690px to 819px** — Large phone (hide email column)
- **Below 690px** — Small phone (show minimal columns)

**How it works in SCSS:**

```scss
.date-column {
  display: table-cell; // Show by default on desktop

  @media (max-width: 1200px) {
    display: none; // Hide on smaller screens
  }
}
```

**Mobile Navigation:**

On phones (below 820px), the sidebar gets replaced with a hamburger menu that slides in from the side when clicked.

### Utility Classes: Quick Styling Helpers

Instead of writing CSS, sometimes you use utility classes:

```tsx
<div className="flex gap-2 justify-between align-center">
  // This div is: flex layout, 8px gap, space items apart, center aligned
</div>
```

These are defined in `styles/utilities/_layout.scss` and let you style without writing CSS.

---

## Understanding Components (The Building Blocks)

### What's a Component?

A component is a **reusable piece of the UI**. Think of it like LEGO blocks — you build small pieces, then combine them into bigger pieces.

**Simple component (Button):**

```tsx
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

// Use it anywhere
<Button label="Click Me" onClick={() => alert("Clicked!")} />;
```

**Complex component (UsersTable):**

```tsx
function UsersTable({ users, onRowClick }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} onClick={() => onRowClick(user.id)}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### Large Components (Pages)

#### DashboardLayout

The main "wrapper" that contains:

- **Top bar (NavBar)** — Logo, search, user profile menu
- **Left sidebar (SideBar)** — Navigation links (Dashboard, Users, Settings, etc.)
- **Main area** — Content that changes based on the current page

Think of it like a website template where the header and sidebar stay the same, but the main content changes.

#### UserPage

The "Users List" page. This is where most of the action happens:

```tsx
function UserPage() {
  // 1. Get page number, search, filters from URL
  const params = useCustomParams();

  // 2. Fetch users from API based on current URL params
  useEffect(() => {
    const data = await listUsers(params);
    setUsers(data);
  }, [params]);

  // 3. Render the UI
  return (
    <div>
      <StatsCards users={data.stats} />
      <UsersTable users={data.users} />
      <Pagination page={params.page} totalPages={data.totalPages} />
    </div>
  );
}
```

**What this component does:**

1. Watches the URL for changes (page number, filters, search term)
2. When URL changes, fetches new data from the API
3. Renders the stats, table, and pagination with that data

#### UserInfo

Shows one user's complete profile with:

- Personal information (name, email, phone, etc.)
- Education details
- Social media profiles
- Loan guarantors
- Buttons to activate/blacklist/deactivate the user

### Small Components (UI Building Blocks)

#### Button

A reusable button with different styles:

```tsx
<Button variant="primary">Active</Button>       // Blue button
<Button variant="outline">Cancel</Button>       // White button with border
<Button variant="danger">Delete</Button>        // Red button
<Button isLoading={true}>Loading...</Button>    // Shows spinner
```

#### Card

A white box with shadow and padding (for organizing content):

```tsx
<Card title="User Stats">
  <div>4,234 users</div>
</Card>
```

#### StatusPill

A colored badge showing user status:

```tsx
<StatusPill status="active" />      // 🟢 Green pill
<StatusPill status="blacklisted" /> // 🔴 Red pill
<StatusPill status="pending" />     // 🟠 Orange pill
```

### The Table Components

The table is made of smaller components:

```tsx
<Table>
  <TableHead>
    <TableRow>
      <TableHeader>Name</TableHeader>
      <TableHeader>Email</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableData>John Doe</TableData>
      <TableData>john@example.com</TableData>
    </TableRow>
  </TableBody>
</Table>
```

This approach means:

- Table styling is in one place
- Rows are consistent
- Easy to add/remove columns

### Portal-Based Dropdown Components

Two dropdowns use "portals" (special React feature):

#### FilterDropDown

When you click the filter icon on a column header:

1. A form appears **above everything else** (fixed position)
2. Shows input fields: organization, username, email, phone, status, date
3. Has "Reset" and "Apply" buttons
4. Closes when you click outside or press Escape

**Why portals?** Without them, the dropdown would get hidden behind the table's scrollable area.

#### RowMenu (Three-Dot Menu)

When you click the three dots ⋮ on a user row:

1. A menu appears **next to the dots** (positioned accurately)
2. Shows options: View Details, Blacklist, Activate, etc.
3. Closes when you click a button or outside

**Same portal solution** — renders at the document top level.

---

## Helpers & Utilities: Shortcut Functions

### What's a Utility Function?

A utility is a **reusable function** that does a specific job. Instead of writing the same code everywhere, you write it once and reuse it.

**Example (Bad way - repeating code):**

```tsx
// In component A
const formattedDate = new Date("2026-01-24").toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

// In component B
const formattedDate = new Date("2026-01-24").toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
// Same code repeated!
```

**Example (Good way - using a utility):**

```tsx
// utils/formatDate.ts
export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// In component A
const formattedDate = formatDate("2026-01-24");

// In component B
const formattedDate = formatDate("2026-01-24");
// Same function, much cleaner!
```

### Custom Hook: `useCustomParams()`

A hook is a **React function** that does something special. This one helps manage URL search parameters.

**Why do you need it?**

When you want to update filters/page/search, you need to change the URL. This function makes it easier.

**How to use it:**

```tsx
function UserPage() {
  const { getParam, updateQuery, updateMany } = useCustomParams();

  // Get values from URL
  const page = getParam("page") || "1";
  const status = getParam("status");

  // Update page when user clicks "next"
  const handleNextPage = () => {
    updateQuery("page", String(parseInt(page) + 1));
    // URL changes: /users?page=2
  };

  // Update multiple at once
  const handleResetFilters = () => {
    updateMany({ page: "1", status: "", organization: "" });
    // URL changes: /users?page=1
  };

  return (
    <div>
      <p>Current page: {page}</p>
      <button onClick={handleNextPage}>Next</button>
      <button onClick={handleResetFilters}>Reset Filters</button>
    </div>
  );
}
```

### Utility Functions

#### `formatDate(date: string | Date | number): string`

Converts a date into a human-readable format:

```tsx
formatDate("2026-01-24T10:30:00Z");
// Output: "January 24, 2026"

formatDate(new Date("2026-01-24"));
// Output: "January 24, 2026"

formatDate(1611432600000); // Milliseconds since 1970
// Output: "January 24, 2026"
```

**Why this function?** Instead of writing `new Date(...).toLocaleDateString()` everywhere, you just call `formatDate()`.

#### `formatNumber(value: number | string, options): string`

Formats numbers with thousands separators, currency, or compact notation:

```tsx
// With thousands separator
formatNumber(200000, { locale: "en-US" });
// Output: "200,000"

// As currency
formatNumber(200000, { locale: "en-NG", currency: "NGN" });
// Output: "₦200,000.00"

// Compact (for big numbers)
formatNumber(200000, { compact: true });
// Output: "200K"

// With specific decimal places
formatNumber(1234.5678, { decimals: 2 });
// Output: "1,234.57"
```

#### `capitalizeFirst(input: string): string`

Makes the first letter uppercase:

```tsx
capitalizeFirst("john doe");
// Output: "John doe"

capitalizeFirst("organization");
// Output: "Organization"
```

#### LocalStorage Helpers

These functions manage data saved in the browser:

```tsx
// Save user token
setLocalStorage("auth_token", "abc123xyz");

// Get user token
const token = getToken();

// Later, even after refresh, the token is still there
```

**Why?** So users stay logged in even after refreshing the page.

---

## Talking to the Backend: API Communication

### The Big Picture

Your React app (frontend) needs to talk to a backend server to get user data and save changes.

**Journey of a request:**

```
React App (Your browser)
  ↓
Makes a request: "Hey backend, give me user list page 1"
  ↓
Backend (Server) processes the request
  ↓
Sends back: { users: [...], totalCount: 4000 }
  ↓
React App receives data and updates the screen
```

### The API Client (`src/server/server.ts`)

This file handles **all communication** with the backend. It's like the postman of your app.

**The base function:**

```tsx
async function request<T>(
  path: string,
  opts?: { method?: "GET" | "POST"; body?: object },
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: opts?.method || "GET",
    headers: { "Content-Type": "application/json" },
    body: opts?.body ? JSON.stringify(opts.body) : undefined,
  });

  const data = await response.json();

  // If backend returned an error, throw it
  if (!response.ok) {
    throw new HttpError("Failed to fetch", response.status, data);
  }

  return data;
}
```

**What it does:**

1. Takes a URL path (like `/users`)
2. Makes a fetch request to the backend
3. If successful, returns the data
4. If failed, throws an error

### Available API Endpoints

Here are all the "doors" you can knock on:

#### Get Users List

```tsx
const response = await listUsers({
  page: 1,
  pageSize: 10,
  search: "john",
  filters: {
    status: "active",
    organization: "Tech Corp",
  },
});

// Returns:
// {
//   paginatedData: { data: [...], total: 4000, totalPages: 400 },
//   stats: { total: 4000, active: 2500, loans: 1200, savings: 800 }
// }
```

#### Get Single User

```tsx
const user = await getUserById("user-123");
// Returns: { id, email, first_name, ... all user details }
```

#### Update User

```tsx
const updated = await updateUser("user-123", {
  status: "active",
});
// Returns: Updated user object
```

#### Delete User

```tsx
const result = await deleteUser("user-123");
// Returns: { ok: true }
```

#### Get Stats

```tsx
const stats = await getStats();
// Returns: { total: 4000, active: 2500, loans: 1200, savings: 800 }
```

#### Get Organizations (Dropdown List)

```tsx
const orgs = await getOrganizations();
// Returns: ["Tech Corp", "Finance Inc", ...]
```

#### Login

```tsx
const response = await login("john@example.com", "password123");
// Returns: { access_token: "abc123xyz", user: {...} }
```

### Environment Variables

The backend URL is stored in `.env` files (not committed to Git for security):

```
# .env.development (local machine)
VITE_API_URL=https://lendsqr-be-rq0x.onrender.com

# .env.production (when deployed)
VITE_API_URL=https://lendsqr-be-rq0x.onrender.com
```

**Why separate files?** You might have different URLs for development vs production.

### Error Handling

When something goes wrong, we use a custom `HttpError` class:

```tsx
class HttpError extends Error {
  status: number; // 404, 500, etc.
  data?: unknown; // Error message from backend
}

// When you call an API and it fails:
try {
  await updateUser("user-123", { status: "active" });
} catch (error) {
  console.log(error.message); // "User not found"
  console.log(error.status); // 404

  // Show error to user
  toast.error(error.message);
}
```

### Example: How a Button Click Works

Let's trace what happens when you click "Activate User":

```tsx
// 1. User clicks the button
<button onClick={handleActivate}>Activate</button>;

// 2. Handler function runs
async function handleActivate(userId) {
  toast.loading("Updating..."); // Show loading state

  try {
    // 3. Make API request
    const updated = await updateUser(userId, { status: "active" });

    // 4. Success! Show success message
    toast.success("User activated successfully!");

    // 5. Refresh the table (re-fetch users)
    setRefetchKey((key) => key + 1); // Trigger useEffect to re-fetch
  } catch (error) {
    // 6. If something went wrong, show error
    toast.error(error.message);
  }
}
```

### Building Query Strings

When fetching users, we need to build a URL with all the filters:

```
/users?page=1&pageSize=10&search=john&status=active
```

This is done with `buildUsersQuery()`:

```tsx
const query = buildUsersQuery({
  page: 1,
  pageSize: 10,
  search: "john",
  filters: { status: "active" },
});
// Returns: "page=1&pageSize=10&search=john&status=active"

// The full URL becomes:
const url = `/users?${query}`;
```

**Smart feature:** Empty values are left out (keeps URLs clean):

```tsx
buildUsersQuery({
  page: 1,
  search: "", // This is empty, so it's NOT included
  status: "active",
});
// Returns: "page=1&status=active"
```

---

## Testing: Making Sure Nothing Breaks

### What is Testing?

Testing means **checking if your code works correctly** before shipping it to users.

**Without testing:**

- You click buttons manually
- You hope nothing breaks
- You find bugs only after users report them 😅

**With testing:**

- Code automatically checks if things work
- Bugs are caught before users see them
- Developers can refactor with confidence

### Testing Setup

**The test environment (`vitest.config.ts`):**

```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // Simulates a browser
    globals: true, // No need to import test functions
    setupFiles: ["./src/test/setup.ts"], // Runs before tests
  },
});
```

**What's `jsdom`?** It's a fake browser that runs in Node.js. So tests can run without opening a real browser (much faster!).

### Test Files Explained

#### `src/api.test.ts` - Testing the API Client

This tests that the `request()` function works correctly:

**Test 1: "Should include all params in query string"**

```tsx
it("should include all params in query string", async () => {
  // 1. Set up a mock API response
  const mockResponse = { users: [], total: 0 };

  // 2. Call listUsers with some params
  await listUsers({ page: 1, search: "john", status: "active" });

  // 3. Check that the URL contains all params
  expect(mockFetch).toHaveBeenCalledWith(
    expect.stringContaining("page=1&search=john&status=active"),
  );
});
```

**Test 2: "Should handle API errors gracefully"**

```tsx
it("should throw HttpError on 404", async () => {
  // 1. Mock the API to return 404
  mockFetch.mockResolvedValueOnce({
    ok: false,
    status: 404,
    json: async () => ({ error: "Not found" }),
  });

  // 2. Call the API
  // 3. Expect it to throw an error
  expect(async () => {
    await getUserById("invalid-id");
  }).rejects.toThrow(HttpError);
});
```

#### `src/pages/users.test.tsx` - Testing the Users Page

This tests that the page component works correctly:

**Test: "Should load users on mount"**

```tsx
it("should load users on mount", async () => {
  // 1. Mock the API to return user data
  listUsersMock.mockResolvedValueOnce({
    paginatedData: { data: [{ id: "1", first_name: "John" }], total: 1 },
    stats: { total: 1, active: 1, loans: 0, savings: 0 },
  });

  // 2. Render the Users page
  render(<Users />);

  // 3. Wait for and find "John" in the DOM
  const johnElement = await screen.findByText("John");

  // 4. Assert that it's there
  expect(johnElement).toBeInTheDocument();
});
```

### Running Tests

**Run once (CI/CD):**

```bash
npm run test:run
```

**Run in watch mode (development):**

```bash
npm run test
```

Watches for file changes and re-runs tests automatically.

**Run with coverage report:**

```bash
npm run test:cov
```

Shows what % of code is tested.

**Run specific file:**

```bash
npm run test -- src/api.test.ts
```

### Writing Your Own Tests

When you add a new feature, write tests for it:

**Step 1: Create test file**

```tsx
// src/components/button.test.tsx
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button component", () => {
  // Tests go here
});
```

**Step 2: Write a test**

```tsx
it("should render button with text", () => {
  render(<Button>Click Me</Button>);

  const button = screen.getByText("Click Me");
  expect(button).toBeInTheDocument();
});
```

**Step 3: Write another test (for interaction)**

```tsx
it("should call onClick when clicked", async () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click Me</Button>);

  const button = screen.getByText("Click Me");
  await userEvent.click(button);

  expect(handleClick).toHaveBeenCalled();
});
```

**Step 4: Run tests**

```bash
npm run test
```

### Testing Patterns (Common Approaches)

#### Mock API Calls

```tsx
// Tell tests to "pretend" the API works
vi.mock("../server/server", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    listUsers: vi.fn()  // Fake function
  };
});

// Set the fake return value
const listUsersMock = vi.mocked(listUsers);
listUsersMock.mockResolvedValue({ ... });
```

#### Render with Router

```tsx
// Components that use useNavigate() or useParams() need the router
render(
  <MemoryRouter initialEntries={["/users?page=1"]}>
    <Users />
  </MemoryRouter>,
);
```

#### Simulate User Interaction

```tsx
// Click a button
await userEvent.click(screen.getByText("Click Me"));

// Type in an input
await userEvent.type(screen.getByRole("textbox"), "john");

// Select a dropdown option
await userEvent.selectOptions(screen.getByRole("combobox"), "active");
```

#### Assert Results

```tsx
// Element is visible
expect(element).toBeInTheDocument();

// Element has correct text
expect(element).toHaveTextContent("Success");

// Element has correct attribute
expect(element).toHaveAttribute("aria-label", "Close");

// Function was called
expect(mockFunction).toHaveBeenCalled();

// Function was called with specific args
expect(mockFunction).toHaveBeenCalledWith("expected-value");
```

### Why Test?

| Benefit                    | Example                                          |
| -------------------------- | ------------------------------------------------ |
| Catch bugs early           | Test fails before user finds bug                 |
| Document expected behavior | Tests show how code should work                  |
| Refactor safely            | Change code without breaking things              |
| Save time                  | Tests run in seconds; manual testing takes hours |
| Team confidence            | Everyone knows the code works                    |

---

## Deployment: Getting Your App Online

### What's Deployment?

Deployment means **putting your app on the internet** so real users can access it (not just you on localhost:5173).

**Steps:**

1. Build the app (optimize code)
2. Deploy to a server (like Vercel, Netlify, etc.)
3. Get a URL (like https://lendsqr-admin.com)

### Building for Production

When users visit your app, you don't want to send all your code. Instead, you send a **optimized version** called a "build".

```bash
npm run build
```

**What it does:**

- Minifies code (removes spaces, shortens variable names)
- Bundles everything into a few files
- Creates a `dist/` folder with production files

**Output:**

```
dist/
├── index.html          # Main HTML file
├── assets/
│   ├── main-abc123.js  # Your app code (minified)
│   └── style-def456.css # Your styles (minified)
└── ...
```

These files are **super small and fast** — that's what users download.

### Before You Deploy

**Checklist:**

```
□ Backend URL is correct (VITE_API_URL in .env)
□ Run npm lint - no errors
□ Run npm run test:run - all tests pass
□ Run npm run build - no errors
□ No console errors in browser
□ Mobile responsive works (test at 400px, 690px, 820px widths)
□ All buttons and links work
□ User can login and logout
□ Search and filters work
□ User activation/blacklist works
```

### Deployment Options

#### Option 1: Vercel (Easiest)

1. Push code to GitHub
2. Go to vercel.com and sign in with GitHub
3. Click "New Project" → Select your repo
4. Set build command: `npm run build`
5. Deploy (it's automatic!)

**Pros:** Free, automatic deployments on Git push, super fast

#### Option 2: Netlify

1. Push code to GitHub
2. Go to netlify.com and sign in with GitHub
3. Click "New site from Git" → Select your repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy

**Pros:** Free, easy, good for static sites

#### Option 3: AWS S3 + CloudFront

```bash
# Build your app
npm run build

# Upload dist folder to S3
aws s3 sync dist/ s3://your-bucket-name/

# Invalidate CloudFront cache (make sure updates show)
aws cloudfront create-invalidation --distribution-id ABC123 --paths "/*"
```

**Pros:** Cheap, scalable, integrates with other AWS services

#### Option 4: Docker + Your Own Server

```dockerfile
# Dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Pros:** Full control, can run anywhere

### Environment Variables in Production

Before deploying, set the production API URL:

```
# Create .env.production file
VITE_API_URL=https://api.production.com
```

Or set it through your hosting platform (Vercel, Netlify, etc. have a UI for this).

### Verifying the Deployment

After deployment:

```bash
# Visit your deployed URL
https://your-app.vercel.app

# Open DevTools (F12) → Console
# Check for errors

# Test features:
# 1. Login works
# 2. Users load
# 3. Search works
# 4. Filters work
# 5. Activate/blacklist buttons work
# 6. Mobile layout looks good
```

### Troubleshooting Deployment

| Problem                             | Solution                                                  |
| ----------------------------------- | --------------------------------------------------------- |
| "Cannot find module"                | Make sure all imports are correct, reinstall dependencies |
| API calls fail                      | Check VITE_API_URL is correct in production               |
| Page is blank                       | Check browser console (F12) for errors                    |
| Styles are missing                  | Make sure SCSS files are imported in components           |
| Build succeeds but deployment fails | Check logs on Vercel/Netlify dashboard                    |

### Speed Optimization

To make your app faster:

```tsx
// 1. Lazy load pages (don't load all pages on startup)
const UsersPage = React.lazy(() => import("./pages/users"));

// 2. Use Suspense to show loading while page loads
<Suspense fallback={<Skeleton />}>
  <UsersPage />
</Suspense>

// 3. Memoize expensive components
const UsersTable = React.memo(({ data }) => {
  // Only re-renders if 'data' actually changed
  return ...;
});
```

### Monitoring in Production

After deployment, watch for issues:

**Tools:**

- **Sentry** — Error tracking (get notified when something breaks)
- **LogRocket** — User session replay (see what users did before bug)
- **Google Analytics** — User traffic and behavior
- **New Relic** — Performance monitoring

**Example Sentry setup:**

```tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://your-sentry-url",
  environment: "production",
  tracesSampleRate: 1.0,
});

export default Sentry.withProfiler(App);
```

Now if something breaks, you get an email alert!

## Key Features & How They Work

### 🌐 Portal-Based Dropdowns (Advanced Feature)

**The Problem:**

When you click a filter icon, a dropdown should appear. But the table has `overflow: hidden` (to hide scrollbars), which also hides the dropdown!

```css
.table {
  overflow: hidden; /* Hides scrollbars but also hides dropdowns! */
}
```

**The Solution: React Portals**

Instead of rendering the dropdown inside the table, we "teleport" it to the very top of the page (`<body>`):

```tsx
// Old way (doesn't work - hidden by overflow)
return (
  <div className="table">
    {dropdown content}  {/* Gets hidden! */}
  </div>
);

// New way (works - rendered outside table)
return (
  <div className="table">
    {trigger button}
    {createPortal(
      <div style={{ position: "fixed", zIndex: 9999 }}>
        {dropdown content}  {/* Visible on top! */}
      </div>,
      document.body  {/* Render here, not in table */}
    )}
  </div>
);
```

**Result:** Dropdown is rendered at the very bottom of the DOM tree, outside any overflow containers, with `zIndex: 9999` to stay on top.

### 🔗 URL-Based State (Smart Pattern)

**The Idea:**

Instead of storing page/filters/search in component state, we store them in the **URL itself**.

**Why?**

1. **Shareable URLs** — Users can bookmark and share filtered views
2. **Browser history** — Back/forward buttons work correctly
3. **Refreshable** — Refresh the page, everything stays the same
4. **Debuggable** — See the state right in the URL bar

**How it works:**

```tsx
// User is on this URL
/users?page=2&pageSize=20&status=active&search=john

// React reads these values from URL
const page = new URLSearchParams(location.search).get("page");     // "2"
const pageSize = new URLSearchParams(location.search).get("pageSize");  // "20"
const status = new URLSearchParams(location.search).get("status");    // "active"
const search = new URLSearchParams(location.search).get("search");    // "john"

// User clicks "next page" button
// Component updates the URL
window.history.pushState({}, "", "/users?page=3&pageSize=20&status=active&search=john");

// URL changes, useEffect detects change
// Component re-fetches data with new page number
useEffect(() => {
  fetchUsers();  // Runs again because location.search changed
}, [location.search]);
```

**Result:** Users can share URLs, bookmarks work, back button works, everything syncs automatically!

### 📱 Responsive Table (Mobile-First)

**The Challenge:**

A table has many columns. On mobile (small screen), all columns don't fit.

**The Solution:**

Hide less important columns on smaller screens:

```scss
// On desktop (1200px+): Show all columns
.name {
  display: table-cell;
}
.email {
  display: table-cell;
}
.phone {
  display: table-cell;
}
.date {
  display: table-cell;
}

// On tablet (1024px): Hide date
@media (max-width: 1200px) {
  .date {
    display: none;
  }
}

// On large phone (820px): Hide phone too
@media (max-width: 1024px) {
  .phone {
    display: none;
  }
}

// On small phone (400px): Show only essential
@media (max-width: 820px) {
  .email {
    display: none;
  }
}
```

**Result:**

```
Desktop (1200px):  Name | Email | Phone | Date | Status
Tablet (1024px):   Name | Email | Phone | Status
Phone (820px):     Name | Email | Status
Small Phone (400px): Name | Status
```

### ⚡ Async Mutations with Refetch

**What's a mutation?**

A mutation is when you **change data** (activate user, blacklist user, etc).

**The Flow:**

```tsx
// User clicks "Activate"
async function handleActivate(userId) {
  try {
    // 1. Show loading toast
    toast.loading("Activating...");

    // 2. Call API to update user
    await updateUser(userId, { status: "active" });

    // 3. Show success
    toast.success("User activated!");

    // 4. Refetch the table data
    setRefetchKey((k) => k + 1); // Change the key
    // This triggers useEffect to run again
    // Which re-fetches users from API
    // The table updates with new data!
  } catch (error) {
    // If error, show it
    toast.error(error.message);
  }
}
```

**Why refetch?**

Because the backend updated the user, so the old data in our frontend is outdated. We need to fetch the fresh data.

**Alternative approaches:**

Instead of refetching, you could:

```tsx
// Approach 1: Update state directly
setUsers((prev) =>
  prev.map((u) => (u.id === userId ? { ...u, status: "active" } : u)),
);

// Approach 2: Use React Query (library for data fetching)
const { refetch } = useQuery("users", listUsers);
await updateUser(userId, patch);
refetch();
```

But refetching is safest because the backend might have changed other fields too.

### 🎨 Color-Coded Status Badges

Each user status has a **semantic color** (color has meaning):

```tsx
<StatusBadge status="active">Active</StatusBadge>        // 🟢 Green
<StatusBadge status="blacklisted">Blacklisted</StatusBadge>  // 🔴 Red
<StatusBadge status="pending">Pending</StatusBadge>      // 🟠 Orange
<StatusBadge status="inactive">Inactive</StatusBadge>    // ⚪ Gray
```

**SCSS:**

```scss
.status {
  padding: s(2) s(3);
  border-radius: 100px;
  font-weight: fw(medium);

  &.active {
    background: rgba($green-500, 0.1); // Light green background
    color: $green-500; // Dark green text
  }

  &.blacklisted {
    background: rgba($red-600, 0.1); // Light red background
    color: $red-600; // Dark red text
  }

  // ... more statuses
}
```

**Benefit:** Users instantly recognize the status by color (no need to read).

## Troubleshooting: When Things Go Wrong

### Common Issues & Solutions

#### "npm: command not found"

**Problem:** You don't have Node.js installed.

**Solution:**

1. Go to nodejs.org
2. Download Node.js LTS (Long-Term Support)
3. Install it
4. Restart your terminal
5. Try `npm --version` to verify

#### "Port 5173 already in use"

**Problem:** Another app is already using port 5173.

**Solution:**

Option 1 - Kill the other process:

```bash
# Find what's using port 5173
lsof -i :5173

# Kill it
kill -9 <PID>

# Start dev server again
npm run dev
```

Option 2 - Use different port:

```bash
npm run dev -- --port 3000
```

#### "Cannot find module XXX"

**Problem:** You're trying to import a file that doesn't exist or has a typo.

**Example:**

```tsx
import Button from "./Button"; // File is named "button.tsx" not "Button"
```

**Solution:**

1. Check file name spelling (case matters on Mac/Linux!)
2. Check file actually exists
3. Check the path is correct (use relative paths like `../`)
4. Don't add file extension: `import X from "./file"` not `"./file.tsx"`

#### "Can't find SCSS variables or functions"

**Problem:** Component can't find `s()` function or color variables.

**Solution:**

Add missing `@use` statement at top of SCSS file:

```scss
// ❌ Wrong
.button {
  padding: s(4); // s() is undefined!
}

// ✅ Correct
@use "./variables/tokens.scss" as t;

.button {
  padding: t.s(4); // Now it works
}
```

#### "Tests are failing"

**Problem:** Test file is failing.

**Common causes:**

1. **Mock not working**

```tsx
// ❌ Wrong - import BEFORE mocking
import * as api from "../server/server";
vi.mock("../server/server");

// ✅ Correct - mock BEFORE import
vi.mock("../server/server");
import * as api from "../server/server";
```

2. **Async test timeout**

```tsx
// ❌ Wrong
it("should load users", async () => {
  render(<UsersPage />);
  const name = await screen.findByText("John"); // Takes time
  expect(name).toBeInTheDocument();
});

// ✅ Correct - add timeout if needed
it("should load users", async () => {
  render(<UsersPage />);
  const name = await screen.findByText("John", {}, { timeout: 5000 });
  expect(name).toBeInTheDocument();
}, 10000); // 10 second timeout
```

3. **Router not set up**

```tsx
// ❌ Wrong - component uses routing but no router
render(<Users />);

// ✅ Correct - wrap with router
render(
  <MemoryRouter initialEntries={["/users"]}>
    <Users />
  </MemoryRouter>,
);
```

#### "Build fails with TypeScript errors"

**Problem:** `npm run build` shows TypeScript errors.

**Solution:**

1. Read the error message carefully
2. Navigate to the file mentioned
3. Fix the issue:

```tsx
// ❌ Error: "Cannot find name 'T'"
function myFunc<T>() {
  // Oops, forgot to declare T
  const x: T = null;
}

// ✅ Fixed
function myFunc<T>() {
  // Now T is declared as a generic
  const x: T = null;
}
```

4. Run `npm run build` again

#### "API calls fail with 404 or 500 errors"

**Problem:** When you click a button, nothing happens or you see an error toast.

**Solution:**

1. **Check backend is running:**

```bash
# Try to access the API in browser or curl
curl https://lendsqr-be-rq0x.onrender.com/api/users

# Should return JSON, not an error
```

2. **Check VITE_API_URL is correct:**

```env
# Check .env file
VITE_API_URL=https://lendsqr-be-rq0x.onrender.com
```

3. **Check browser console (F12) → Network tab:**

- Click the button
- Look at the request to `/api/...`
- Check status code (200 = good, 4xx = your fault, 5xx = backend's fault)
- Check the response body for error message

4. **Check token is being sent:**

```tsx
// Debug helper - add to top of page temporarily
console.log("Token:", localStorage.getItem("auth_token"));

// API should include token in headers
const token = localStorage.getItem("auth_token");
fetch(url, {
  headers: { Authorization: `Bearer ${token}` },
});
```

#### "Page is blank after deployment"

**Problem:** Deployed app shows blank page.

**Solution:**

1. Open browser DevTools (F12) → Console tab
2. Look for red error messages
3. Most common causes:

**Missing environment variable:**

```env
# Add this to your hosting platform (Vercel, Netlify, etc)
VITE_API_URL=https://your-backend-url.com
```

**Import error:**

```tsx
// Check that the path is correct
import Button from "./components/Button"; // Right path?
```

**Router issue:**

```tsx
// Make sure basename is set correctly (if deploying to subdirectory)
<BrowserRouter basename="/admin">{/* ... */}</BrowserRouter>
```

#### "Styles are not loading"

**Problem:** Deployed app has no styling.

**Possible causes:**

1. **SCSS not imported in component**

```tsx
// ❌ Wrong
export function Button() {
  return <button>Click</button>;
}

// ✅ Correct
import "./button.scss";
export function Button() {
  return <button>Click</button>;
}
```

2. **Missing index.scss import in main.tsx**

```tsx
// Check src/main.tsx has this
import "./index.css";
import "./styles/index.scss";
```

### Getting Help

**When something is broken:**

1. Read the error message (it usually tells you what's wrong!)
2. Google the error message
3. Check the file mentioned in the error
4. Look at similar working code
5. Ask for help with:
   - Full error message
   - Code that's causing the issue
   - Steps to reproduce
   - What you expected vs what happened

**Resources:**

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [MDN Web Docs](https://developer.mozilla.org)
- GitHub Issues (search existing issues first!)
- Stack Overflow (but read other answers first)

## Tech Stack: What Powers This App?

| Technology           | Version | What It Does                                    |
| -------------------- | ------- | ----------------------------------------------- |
| **React**            | 19.2.0  | UI library - creates interactive web interfaces |
| **TypeScript**       | 5.9.3   | Makes JavaScript safer by adding types          |
| **Vite**             | 7.2.4   | Fast build tool and dev server                  |
| **React Router**     | 7.13.0  | Handles page navigation (routing)               |
| **SCSS**             | 1.97.3  | Advanced CSS with variables and functions       |
| **@mui/icons**       | 7.3.7   | Beautiful pre-made icons                        |
| **react-hot-toast**  | 2.6.0   | Toast notifications (success/error messages)    |
| **Vitest**           | 4.0.18  | Test runner (testing framework)                 |
| **@testing-library** | 16.3.2  | Tools for testing React components              |
| **jsdom**            | 27.4.0  | Fake browser for running tests                  |
| **ESLint**           | 9.39.1  | Finds bugs in your code                         |

### Why These Tools?

**React** - Most popular UI library, easy to learn, great community

**TypeScript** - Catches bugs before they happen (type safety)

**Vite** - 10x faster than older tools like Create React App

**React Router** - Official routing library, works great with React

**SCSS** - CSS is powerful but repetitive; SCSS fixes that with variables

**Vitest** - Modern testing, fast, integrates with Vite

**ESLint** - Enforces code style, catches common mistakes

---

## Future Enhancements (Nice-to-Have Features)

Things that could be added later:

- [ ] **User Creation Form** — Let admins add new users through the dashboard
- [ ] **Bulk Operations** — Activate/blacklist multiple users at once with checkboxes
- [ ] **Advanced Analytics** — Charts showing user trends, revenue, etc.
- [ ] **Activity Timeline** — See what each user did (when they logged in, etc.)
- [ ] **Dark Mode** — Night-friendly theme
- [ ] **Accessibility Improvements** — Better support for screen readers and keyboard navigation
- [ ] **E2E Tests** — Test the full user journey (Cypress or Playwright)
- [ ] **Error Boundaries** — Gracefully handle crashes instead of blank screen
- [ ] **Performance Monitoring** — Track app speed, errors in production (Sentry)
- [ ] **Internationalization (i18n)** — Support multiple languages
- [ ] **Export to CSV** — Download user data as spreadsheet
- [ ] **Role-Based Access Control** — Different admin levels with different permissions

---

## Development Workflow

### Daily Development Steps

1. **Start dev server:**

```bash
npm run dev
```

2. **Make changes** to code in `src/` folder

3. **See changes instantly** (hot reload)

4. **Test your changes:**

```bash
npm run test
```

5. **Check code quality:**

```bash
npm lint
```

6. **Commit and push:**

```bash
git add .
git commit -m "Add feature X"
git push
```

### Adding a New Feature

**Example: Add a "Delete User" button**

1. **Create component:**

```tsx
// src/components/ui/deleteButton.tsx
export function DeleteButton({ userId, onDelete }) {
  const handleClick = async () => {
    if (confirm("Really delete?")) {
      await deleteUser(userId);
      onDelete();
    }
  };

  return <button onClick={handleClick}>Delete</button>;
}
```

2. **Add to row menu:**

```tsx
// src/components/ui/menu.tsx - add to menu items
<MenuItem onClick={() => handleDelete(userId)}>Delete User</MenuItem>
```

3. **Create API endpoint** (backend):

```tsx
// src/server/server.ts
export const deleteUser = (id: string) =>
  request(`/users/${id}`, { method: "DELETE" });
```

4. **Write test:**

```tsx
// src/components/deleteButton.test.tsx
it("should delete user on confirmation", async () => {
  const onDelete = vi.fn();
  render(<DeleteButton userId="1" onDelete={onDelete} />);

  window.confirm = vi.fn(() => true);
  await userEvent.click(screen.getByText("Delete"));

  expect(onDelete).toHaveBeenCalled();
});
```

5. **Test manually:**

- Run `npm run dev`
- Navigate to users page
- Click delete button
- Verify it works

6. **Run tests:**

```bash
npm run test:run
```

7. **Commit:**

```bash
git add .
git commit -m "Add delete user feature"
git push
```

---

## File Naming Conventions

The project follows these naming rules:

```
📁 folders/
   └── use kebab-case (lowercase, hyphens)
   └── examples: src/components, auth/, ui/

📄 Components (React)
   └── PascalCase.tsx
   └── examples: Button.tsx, UserTable.tsx, DashboardLayout.tsx

📄 Utilities & Hooks
   └── camelCase.ts
   └── examples: useCustomParams.ts, formatDate.ts, helpers.ts

📄 Types
   └── camelCase.ts (or match file name, e.g., type.ts)
   └── examples: type.ts

📄 Styles
   └── kebab-case with underscore prefix (optional)
   └── examples: _buttons.scss, _table.scss, index.scss

📄 Tests
   └── Match component name + .test.tsx
   └── examples: Button.test.tsx, users.test.tsx
```

---

## Code Style Guide

### React Components

```tsx
// ✅ Good - functional component with clear props
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export function Button({
  label,
  onClick,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
```

### TypeScript

```tsx
// ✅ Good - clear types
interface User {
  id: string;
  email: string;
  status: "active" | "inactive" | "blacklisted";
  createdAt: Date;
}

// ❌ Avoid - implicit any
const user = {};
user.email = "test@example.com"; // Type is 'any'

// ✅ Better - explicit type
const user: User = {
  id: "1",
  email: "test@example.com",
  status: "active",
  createdAt: new Date(),
};
```

### SCSS

```scss
// ✅ Good - use tokens and variables
@use "./variables/tokens.scss" as t;
@use "./variables/colors.scss" as color;

.button {
  padding: t.s(4) t.s(6);
  background: color.$cyan-color;
  border-radius: 4px;

  &:hover {
    background: darken(color.$cyan-color, 10%);
  }
}

// ❌ Avoid - hardcoded values
.button {
  padding: 16px 24px;
  background: #39cdcc;
  border-radius: 4px;
}
```

---

## Quick Reference: Common Tasks

### I want to...

**Add a new page**

1. Create component in `src/pages/`
2. Add route in `src/components/ui/mainLayout.tsx`
3. Import and use it

**Change a color**

1. Edit `src/styles/variables/colors.scss`
2. All uses automatically update!

**Make text larger**

1. Edit `src/styles/variables/tokens.scss` font sizes
2. Or use className="text-xl" (if utility class exists)

**Add a new feature to the table**

1. Edit `src/components/dashboard/userTable.tsx`
2. Add column
3. Style it in `src/styles/_table.scss`

**Fix a bug**

1. Locate the component/file
2. Read the code carefully
3. Find the issue
4. Fix it
5. Run tests: `npm run test`
6. Test manually in browser

**Deploy the app**

1. Commit changes: `git commit -m "message"`
2. Push to GitHub: `git push`
3. Vercel/Netlify auto-deploys!

---

## Support & Community

**Having issues?**

1. Check this README first
2. Check the troubleshooting section
3. Google the error message
4. Check GitHub Issues
5. Ask your team lead

**Want to learn more?**

- [React Official Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [SCSS Documentation](https://sass-lang.com/documentation)
- [Vitest Documentation](https://vitest.dev/)

**Found a bug in the code?**

1. Create a GitHub Issue with:
   - Clear description of bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if visual
2. Or submit a Pull Request with fix

---

## License

This project is **Proprietary** — all rights reserved to Lendsqr © 2026.

Unauthorized copying, distribution, or use is prohibited.
