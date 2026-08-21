@AGENTS.md

# SJ Hospital

Hospital management web app. Next.js 16 App Router + React 19 + TypeScript (strict) + Tailwind CSS v4.

> Next.js 16 differs from older versions in ways that matter (see "Next.js 16 gotchas" below). The bundled docs in `node_modules/next/dist/docs/` are the source of truth: read the relevant one before writing framework code. Do not code Next.js from memory.

## Commands

```bash
npm run dev     # dev server → http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint    # ESLint (flat config: eslint.config.mjs)

# Docker
docker compose -f docker-compose.dev.yml up --build   # containerized dev server with hot reload → http://localhost:3000
docker compose up --build                              # containerized production build + serve → http://localhost:3000

# Windows/Docker Desktop: live hot-reload doesn't auto-compile: restart with "docker compose -f docker-compose.dev.yml restart web" or use npm run dev
```

Package manager: **npm** (`package-lock.json`). No test runner is configured yet.

## Next.js 16 gotchas (changed from earlier versions)

- **Middleware is now Proxy.** Use `src/proxy.ts` with a default or named `proxy` export, not `middleware.ts`. One proxy file per project (import submodules into it). Keep it to fast optimistic checks (e.g. redirects), never data fetching or full auth.
- **`params` and `searchParams` are async.** They are Promises: `const { id } = await params`. Same in `generateMetadata`.
- **Server Components by default.** Add `'use client'` only for state, effects, event handlers, or browser APIs, at the smallest leaf component, never high in the tree. Pass Server Components into Client Components via `children` rather than importing them across the boundary.
- **Caching = Cache Components model.** `use cache` directive with `cacheLife` / `cacheTag` / `updateTag` from `next/cache`, enabled by `cacheComponents: true` in `next.config.ts`. Runtime data (`cookies`, `headers`, `searchParams`) must live inside a `<Suspense>` boundary or the build errors. If `cacheComponents` is off, follow the "Caching and Revalidating (Previous Model)" guide instead.
- **Protect secrets.** Only `NEXT_PUBLIC_*` env vars reach the client. Put `import 'server-only'` at the top of any module with secrets or DB access so it can never be bundled into a Client Component.
- **Tailwind v4 is CSS-first.** Config lives in `src/app/globals.css` via `@import "tailwindcss"` and `@theme`; there is **no** `tailwind.config.js`. PostCSS plugin: `@tailwindcss/postcss`.

## Folder architecture (feature-based)

`app/` is the **routing layer only**: keep `page.tsx` / `layout.tsx` thin and push real logic into `features/` and `lib/`.

```
src/
├── app/                     # Routing only: layouts, pages, route handlers
│   ├── (marketing)/         # Public site, route group, own layout (no URL segment)
│   ├── (dashboard)/         # Authenticated app, route group, own layout
│   ├── api/                 # route.ts handlers (only when a real HTTP endpoint is needed)
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Tailwind entry + theme
│   └── page.tsx
├── features/<domain>/       # Self-contained domains: patients, appointments, doctors, billing, staff…
│   ├── components/          # Feature-scoped UI
│   ├── server/              # Data access / queries; start files with `import 'server-only'`
│   ├── actions/             # Server Actions (`'use server'`)
│   ├── hooks/               # Client hooks
│   ├── schemas.ts           # Validation for this domain's inputs
│   ├── types.ts
│   └── index.ts             # Public surface: other features import from here, not internals
├── components/ui/           # Shared design-system primitives (Button, Input, Dialog…)
├── components/              # Shared cross-feature composite components
├── lib/                     # Shared clients & helpers (db, auth, http, utils, env)
├── hooks/                   # Shared client hooks
├── config/                  # Constants, navigation, feature flags
├── types/                   # Global shared types
└── proxy.ts                 # Request proxy (was middleware), sits beside app/
```

Rules:
- **Import via the `@/*` alias** (→ `src/*`). No `../../..` chains.
- A **feature owns** its UI, data, actions, schemas, and types. Cross-feature use goes through `components/ui`, `lib`, or a feature's `index.ts`; never reach into another feature's internals.
- **Colocate** route-only files inside the route segment using private folders (`_components`, `_lib`) when they'll never be reused; promote to `features/` or `components/` only once shared.
- Add `loading.tsx` and `error.tsx` beside routes for streaming + error boundaries.
- Create folders when a feature needs them; don't scaffold empty directories up front.

## Conventions

- Component files: `PascalCase.tsx`. Hooks: `useXxx.ts`. Route folders: `kebab-case`.
- Validate every external input (forms, route params, API bodies) against a schema at the boundary before use.
- Default every component to a Server Component; extract interactive pieces into small `'use client'` leaves.
- Never use the em dash (U+2014) in UI copy or documentation. Restructure the sentence, or use a comma, colon, semicolon, parentheses, or a full stop instead.
