# RICA IMS — Director Dashboards

Demo app for **RICA** (Rwanda Inspectorate, Competition and Consumer Protection Authority) with unit-scoped **Director** portals.

> Inspector and Senior Director portals are owned elsewhere and are not part of this codebase.

## What’s done

- Glassmorphism **login page** with email/password + demo account picker
- **Cookie-based demo auth** (frontend session cookie)
- **Role routing** via `src/proxy.ts` — signed-in users only reach `/director`
- **Unit scoping** — each Director is assigned to one business unit and only sees that unit’s dashboard data
- **Director portal** (KPI framework Rev. 2) — Dashboard, Team, unit deep-dives
- Shared **UI kit** on HeroUI + RICA design tokens

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
│   ├── (portals)/                 # Authenticated shell
│   │   └── director/              # /director routes (unit-scoped)
│   │       ├── page.tsx           # Dashboard
│   │       ├── team/
│   │       └── streams/
│   ├── api/auth/                  # login, logout, me
│   ├── api/health/                # health check for hosting
│   └── login/
├── components/
│   ├── director/                  # All Director UI
│   ├── shared/                    # Cross-portal pieces
│   ├── auth/
│   ├── layout/
│   ├── motion/
│   └── ui/
├── data/
│   ├── director/                  # Director KPI mock data
│   ├── navigation.ts
│   ├── units.ts
│   └── users.ts
├── lib/
├── types/
└── proxy.ts                       # Auth + role guards
```

Path alias: `@/*` → `./src/*`

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

Copy `.env.example` to `.env.local` if you need local overrides (optional for this demo).

### Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Run production build (hosting)
npm run lint     # ESLint
```

### Demo accounts

Password for all: `Admin@123!`

| Role | Unit | Email | Lands on |
| --- | --- | --- | --- |
| Director | Farm Products (FPU) | `gentilleuwamahoro28@gmail.com` | `/director` |
| Director | Registration & Licensing (RLU) | `claire.mukamana@gmail.com` | `/director` |
| Director | Market Surveillance (IMU) | `eric.habimana@gmail.com` | `/director` |
| Director | Import Inspection (IIU) | `alice.uwimana@gmail.com` | `/director` |
| Director | Competition & Consumer (CCPU) | `patrick.nsengimana@gmail.com` | `/director` |

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

Set `PORT` if your host requires it (Next.js reads it automatically). Ensure the process can keep cookies (`rica_session`) over HTTPS in production.

### Tip

On login, use the **demo account** dropdown, the sparkle button, or Continue with Google to fill credentials.
