# RICA — Farm Products & Processes Inspection Unit

Inspector portal for **RICA** (Rwanda Inspectorate, Competition and Consumer Protection Authority). Demo app with role-based portals for Inspectors, Directors, and Senior Directors.

## What’s done

- Glassmorphism **login page** with email/password and one-tap demo account cards
- **Cookie-based demo auth** (`/api/auth/login`, `/logout`, `/me`)
- **Role routing** via `src/proxy.ts` — each user only reaches their portal
- **Unit-aware inspector portal** (primary build) — all 5 units:
  - Inspectors belong to one of RICA's 5 units; `/inspector` renders that unit's dashboard
  - 7-section dashboard per the KPI spec: Workload Summary, Inspection Progress,
    Assigned Facilities, Compliance Summary, Inspection Activities, Sampling
    Activities, Future Modules
  - Farm Products' 5 services (Seed, Agrochemical, Slaughterhouse, Butchery,
    Meat Carrier) act as **filters** across every section
  - Assigned Facilities and Inspection Activities also have full pages
  - Demo data is generated from a **seeded PRNG**, so numbers are stable across
    SSR and hydration (`src/lib/seeded-random.ts`)

> **KPI provenance:** Farm Products follows the source spec exactly. Registration
> & Licensing is derived from that unit's Director-level sections. Market
> Surveillance, Import Inspection and Consumer Protection are **plausible
> placeholders** — the source doc has no forms or datasets for them yet, so their
> content specs in `src/data/units/` should be replaced once RICA shares the real
> inspection forms.
- **Senior Director executive dashboard** — org-wide across all 5 units:
  - Executive Highlights, Organizational Performance, Regulatory Coverage,
    Compliance, Unit Performance, and Director Dashboards
  - **Leaflet + OpenStreetMap** map of registered entities across all 30 Rwandan
    districts, sized by volume and filterable by category, province and district
  - Per-unit drill-down at `/senior-director/units/[unit]`
- **Director** portal routes + nav shell (placeholder screens)
- Shared **UI kit** on HeroUI (buttons, inputs, tables, cards, chips, etc.)
- RICA design tokens (green accent, stream colors, shell vs body radius)

## Technologies

| Layer | Stack |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) 16 (App Router, Turbopack) |
| UI | [React](https://react.dev) 19, [HeroUI](https://www.heroui.com) 3, [Tailwind CSS](https://tailwindcss.com) 4 |
| Charts | [Recharts](https://recharts.org) |
| Maps | [Leaflet](https://leafletjs.com) + [React Leaflet](https://react-leaflet.js.org), [OpenStreetMap](https://www.openstreetmap.org) tiles |
| Motion | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev) |
| Data fetching | [TanStack Query](https://tanstack.com/query) (wired in providers) |
| Language | TypeScript |

## Project structure

```text
src/
├── app/
│   ├── (portals)/              # Authenticated portals (shared AppShell)
│   │   ├── inspector/          # Dashboard, facilities, activities, reports
│   │   ├── director/           # Director portal (placeholder pages)
│   │   └── senior-director/    # Executive dashboard + units/[unit] drill-down
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
├── data/                       # Unit registry, per-unit content specs,
│                               # seeded generators, navigation, demo users
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
npm run check:data  # Assert the seeded generators stay deterministic & consistent
```

### Demo accounts

Password for all: `password`

| Role | Unit | Email | Lands on |
| --- | --- | --- | --- |
| Inspector | Farm Products | `inspector.farm@rica.gov.rw` | `/inspector` |
| Inspector | Registration & Licensing | `inspector.licensing@rica.gov.rw` | `/inspector` |
| Inspector | Industries & Market Surveillance | `inspector.market@rica.gov.rw` | `/inspector` |
| Inspector | Import Inspection | `inspector.imports@rica.gov.rw` | `/inspector` |
| Inspector | Competition & Consumer Protection | `inspector.competition@rica.gov.rw` | `/inspector` |
| Director | Farm Products | `director@rica.gov.rw` | `/director` |
| Senior Director | — | `senior.director@rica.gov.rw` | `/senior-director` |

`inspector@rica.gov.rw` still works as an alias for the Farm Products inspector.
Each inspector lands on their own unit's dashboard.

> Auth is **demo-only** (shared password, cookie session). Not for production security.

### Tip

On the login page, tap any demo account card to auto-fill its email and password.
