# RICA — Farm Products & Processes Inspection Unit

Inspector portal for **RICA** (Rwanda Inspectorate, Competition and Consumer Protection Authority). Demo app with role-based portals for Inspectors, Directors, and Senior Directors.

## What’s done

- Glassmorphism **login page** with email/password and demo account fill
- **Cookie-based demo auth** (`/api/auth/login`, `/logout`, `/me`)
- **Role routing** via `src/proxy.ts` — each user only reaches their portal
- **Inspector portal** (primary build):
  - Collapsible sidebar + top navbar with profile dropdown (Profile, Setting, Logout)
  - Dashboard with KPI cards, Recharts charts, and inspections data table
  - Regulatory stream pages (Seed Inspection, Slaughterhouse, Agrochemical, Seed Producer)
  - Reports page
- **Director** and **Senior Director** portal routes + nav shells (placeholder screens)
- Shared **UI kit** on HeroUI (buttons, inputs, tables, cards, chips, etc.)
- RICA design tokens (green accent, stream colors, shell vs body radius)

## Technologies

| Layer | Stack |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) 16 (App Router, Turbopack) |
| UI | [React](https://react.dev) 19, [HeroUI](https://www.heroui.com) 3, [Tailwind CSS](https://tailwindcss.com) 4 |
| Charts | [Recharts](https://recharts.org) |
| Motion | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev) |
| Data fetching | [TanStack Query](https://tanstack.com/query) (wired in providers) |
| Language | TypeScript |

## Project structure

```text
src/
├── app/
│   ├── (portals)/              # Authenticated portals (shared AppShell)
│   │   ├── inspector/          # Inspector dashboard, streams, reports
│   │   ├── director/           # Director portal (placeholder pages)
│   │   └── senior-director/    # Senior Director portal (placeholder pages)
│   ├── api/auth/               # login, logout, me
│   ├── api/health/
│   ├── login/                  # Public login page
│   ├── globals.css             # RICA theme + login styles
│   ├── layout.tsx
│   └── providers.tsx
├── components/
│   ├── auth/                   # AuthProvider, LoginForm
│   ├── dashboard/              # KPIs, charts, tables, portal home
│   ├── layout/                 # AppShell, sidebar, navbar, page title
│   ├── motion/
│   └── ui/                     # HeroUI wrappers + DataTable, StatusChip, …
├── data/                       # Navigation, dashboard mock data, demo users
├── hooks/
├── lib/                        # Auth helpers, session, constants, utils
├── types/
└── proxy.ts                    # Auth + role guards (Next.js Proxy)
```

Path alias: `@/*` → `./src/*`

## Getting started

### Requirements

- Node.js 20+ (recommended)
- npm

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you’ll be redirected to `/login`.

### Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Run production build
npm run lint     # ESLint
```

### Demo accounts

Password for all: `Admin@123!`

| Role | Email | Lands on |
| --- | --- | --- |
| Inspector | `jeannine.uwase@gmail.com` | `/inspector` |
| Director | `gentilleuwamahoro28@gmail.com` | `/director` |
| Senior Director | `jannine.uwase@gmail.com` | `/senior-director` |

> Auth is **demo-only** (shared password, cookie session). Not for production security.

### Tip

On the login page, use the sparkle button (bottom-right) or **Continue with Google** to cycle/fill demo credentials quickly.
