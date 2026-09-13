# RICA IMS — Inspection Dashboards

Demo app for **RICA** (Rwanda Inspectorate, Competition and Consumer Protection
Authority), covering all three actors from the KPI framework: **Inspectors**,
**Directors**, and the **Senior Director / Executive** view.

## What’s done

- Glassmorphism **login page** with email/password and one-tap demo account cards
- **Cookie-based demo auth** (`/api/auth/login`, `/logout`, `/me`)
- **Role routing** via `src/proxy.ts` — each user only reaches their own portal
- **Unit scoping** — inspectors and directors are assigned to one of RICA's four
  business units and only see that unit's data

### Inspector portal — all 4 units

- `/inspector` renders the signed-in inspector's unit
- Workload KPIs (including Average Compliance Score on Farm Products), progress
  donut + trend, and unit activity charts
- Farm Products uses **4 regulatory streams**: Livestock, Plant and warehouse,
  Seed, and Agrochemical, with facility types nested under each stream
- Assigned Facilities and Inspection Activities have their own pages

### Director portal — unit-scoped (KPI framework Rev. 3)

- Dashboard, Team, and per-unit deep dives (streams / categories / products)
- Farm Products sidebar nests facility/checklist types under the 4 streams
- Date-range, province, and district filters

### Senior Director — executive dashboard

- Org-wide across all four units: Executive Highlights, Organizational
  Performance, Regulatory Coverage, Compliance, Unit Performance, and
  Director Dashboards
- **Leaflet + OpenStreetMap** map of registered entities across all 30 Rwandan
  districts, sized by volume and filterable by category, province and district
- One summary page per unit at `/senior-director/units/[unit]` (no Farm Products
  stream dropdowns)

> **KPI provenance:** Farm Products follows the source spec exactly. Registration
> & Licensing is derived from that unit's Director-level sections. Market
> Surveillance and Import Inspection are **plausible placeholders** — the source
> doc has no forms or datasets for them yet, so the content specs in
> `src/data/units/` should be replaced once RICA shares the real inspection forms.

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
│   │   ├── director/           # Dashboard, team, unit deep-dives
│   │   └── senior-director/    # Executive dashboard + units/[unit] drill-down
│   ├── api/auth/               # login, logout, me
│   ├── api/health/             # health check for hosting
│   ├── login/                  # Public login page
│   └── globals.css             # RICA theme + login styles
├── components/
│   ├── director/               # Director UI
│   ├── shared/                 # Inspector + executive dashboards, charts, map
│   ├── auth/ · layout/ · motion/ · ui/
├── data/
│   ├── director/               # Director KPI mock data
│   ├── units/                  # Per-unit content specs
│   ├── generators/             # Seeded inspector + executive data
│   ├── geo.ts                  # 30 districts, provinces, coordinates
│   ├── navigation.ts · units.ts · users.ts
├── lib/                        # Auth, session, seeded RNG, utils
├── types/
└── proxy.ts                    # Auth + role guards
```

Path alias: `@/*` → `./src/*`

### Deterministic demo data

Inspector and executive numbers come from a **seeded PRNG**
(`src/lib/seeded-random.ts`) keyed on unit/service/period — never `Math.random()`
or the clock. Server and client therefore compute identical values, so hydration
stays clean and figures don't shuffle between refreshes.

`npm run check:data` asserts both generators stay deterministic and internally
consistent (the KPI totals equal the sum of the table rows they sit above).

## Getting started

### Requirements

- Node.js 20+
- npm

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you’ll be redirected to `/login`.

### Scripts

```bash
npm run dev         # Development server
npm run build       # Production build
npm run start       # Run production build (hosting)
npm run lint        # ESLint
npm run check:data  # Assert the seeded generators stay deterministic
```

### Demo accounts

Password for all: `password`

| Role | Unit | Email |
| --- | --- | --- |
| Inspector | Farm Products (FPU) | `inspector.farm@rica.gov.rw` |
| Inspector | Registration & Licensing (RLU) | `inspector.licensing@rica.gov.rw` |
| Inspector | Market Surveillance (IMU) | `inspector.market@rica.gov.rw` |
| Inspector | Import Inspection (IIU) | `inspector.imports@rica.gov.rw` |
| Director | Farm Products (FPU) | `director.farm@rica.gov.rw` |
| Director | Registration & Licensing (RLU) | `director.licensing@rica.gov.rw` |
| Director | Market Surveillance (IMU) | `director.market@rica.gov.rw` |
| Director | Import Inspection (IIU) | `director.imports@rica.gov.rw` |
| Senior Director | org-wide | `senior.director@rica.gov.rw` |

`inspector@rica.gov.rw` and `director@rica.gov.rw` still work as aliases for the
Farm Products accounts.

> Auth is **demo-only** (shared password, cookie session). Not for production security.

## Deploy / hosting

This app needs a **Node.js** host (App Router + API routes). Static export is not supported.

### Vercel (recommended)

1. Push the repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Framework preset: **Next.js** (auto-detected)
4. Build command: `npm run build` · Output: default
5. Deploy — health check: `GET /api/health`

### Other Node hosts (Railway, Render, VPS)

```bash
npm ci
npm run build
npm run start
```

> **Map tiles:** the executive map uses OpenStreetMap's public tile servers,
> which are fine for a demo but not covered for production traffic. Swap in
> MapTiler, Stadia, or self-hosted tiles before any public deployment.
