@AGENTS.md

# SJ Hospital

Public website for St. Joseph Hospital, Negombo (sjhospital.lk), in English, Sinhala and Tamil. Next.js 16 App Router + React 19 + TypeScript (strict) + Tailwind CSS v4.

> Next.js 16 differs from older versions in ways that matter (see "Next.js 16 gotchas" below). The bundled docs in `node_modules/next/dist/docs/` are the source of truth: read the relevant one before writing framework code. Do not code Next.js from memory.

## Commands

```bash
npm run dev     # dev server → http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint    # ESLint (flat config: eslint.config.mjs)
npm test        # node --test over src/**/*.test.ts
npm run check   # check:dashes + check:images + check:audit (see Rules)
npm run i18n:status   # translation overlays still awaiting a native speaker

# Docker
docker compose -f docker-compose.dev.yml up --build   # containerized dev server with hot reload → http://localhost:3000
docker compose up --build                              # containerized production build + serve → http://localhost:3000

# Windows/Docker Desktop: live hot-reload doesn't auto-compile: restart with "docker compose -f docker-compose.dev.yml restart web" or use npm run dev
```

Package manager: **npm** (`package-lock.json`). `npm test` runs `node --test` over `src/**/*.test.ts`.

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
├── app/                          # Routing only
│   ├── [locale]/                 # Every page, once per locale (en, si, ta); English keeps unprefixed URLs via proxy.ts
│   │   ├── layout.tsx            # Root layout: fonts, ThemeScript, html lang
│   │   ├── page.tsx              # Home
│   │   ├── <page>/               # about-us, services, e-channeling, careers… (kebab-case, one per feature)
│   │   │   ├── layout.tsx / page.tsx
│   │   │   ├── [slug]/           # Detail pages where a feature has them (services)
│   │   │   └── _components/      # Route-only UI that is never reused (privacy-policy)
│   ├── global-not-found.tsx      # Branded 404 for URLs no locale matches
│   ├── sitemap.ts
│   ├── icon.png
│   └── globals.css               # Tailwind entry, theme tokens, base layer, keyframes
├── features/<domain>/            # One per page area: home, services, e-channeling, career, contact…
│   ├── components/               # Feature-scoped UI
│   ├── data/                     # Copy and content: content.ts (English) + content.si.ts / content.ta.ts overlays, getContent.ts
│   ├── actions/                  # Server Actions ('use server'), for features with a form
│   ├── lib/                      # Feature-only server helpers (e.g. the mailer for that form)
│   ├── hooks/                    # Feature-only client hooks
│   ├── schemas.ts                # zod schemas for this feature's inputs, with .si / .ta messages
│   ├── types.ts
│   └── index.ts                  # Public surface: other code imports from here, not internals
├── components/
│   ├── ui/                       # Shared primitives: Modal, Reveal*, ParallaxLayer, Icons, AccordionList…
│   ├── layout/                   # Site chrome: ThemedShell, ThemedHeader, mega-nav, ThemedFooter, BookingModal
│   ├── theme/                    # ThemeScript, useSiteTheme, theme toggles
│   └── i18n/                     # LocaleLink, language toggles, ChromeText
├── lib/                          # Shared helpers: i18n/ (locales, routing, overlays), mailer.ts, email.ts
├── hooks/                        # Shared client hooks (useScrollParallax, useMeasuredHeight)
├── config/                       # Navigation per page, page metadata (+ .si / .ta), brand, contact emails
└── proxy.ts                      # Locale routing only (was middleware), sits beside app/
scripts/                          # Node checks and one-off tooling (check:*, i18n:*)
docs/                             # Plans, specs and records (image credits, removed consultants)
```

Translations: every user-facing string has its English home in a feature's `data/` (or `config/`, or `components/layout/chromeCopy.ts`) and a `.si.ts` / `.ta.ts` overlay beside it. Overlays carry a `__review` marker; `npm run i18n:status` lists any still awaiting a native speaker.

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

## Rules (non negotiable)

### Responsive
Every page and component must work on mobile, tablet and desktop. Build mobile first, then add wider overrides with `min-*` variants. Check at 375px, 768px and 1280px. No horizontal scroll at any width. Tap targets at least 44px. Reuse the breakpoints already in the codebase: `sm:` (640px), `min-[900px]:` / `max-[899px]:` and `lg:` (1024px). Only invent a new arbitrary threshold when a component genuinely needs one.

### No dash punctuation in visible text
Never use em dashes, en dashes, or a hyphen as punctuation (" - ") in any copy, headings, labels, alt text, metadata, button text or translated strings (English, Sinhala and Tamil alike). Rewrite the sentence with a comma, colon, semicolon, parentheses, a full stop or "and" instead. Hyphens are fine in code, class names, URLs, filenames and compound words. The ban covers every encoding: the literal characters (U+2014, U+2013), the `&mdash;` / `&ndash;` entities, and the numeric forms `&#8212;` / `&#x2014;` / `&#8211;` / `&#x2013;`. `npm run check:dashes` enforces this for every string and JSX text under `src` (comments and code are ignored). Outside `src`, grep for all the forms above; a search for the bare character alone misses entity-encoded ones. Also avoid them in commit messages and docs we write.

### Always follow the theme
Colours come from the `--home-*` custom properties in `src/app/globals.css`, defined on `[data-sj]` (dark) and overridden under `[data-sj][data-theme="light"]`, with the brand palette layered on by `[data-sj][data-palette="brand"]`. In components, reach them through Tailwind arbitrary values (`bg-[var(--home-surface)]`, `text-[var(--home-heading)]`), never raw hex or `rgb()`. To tint a token, use `color-mix(in srgb, var(--home-accent) 40%, transparent)`. Need a new value? Add the token to every block it belongs in (dark, light and brand) in `globals.css` first, then use it. Text on accent fills uses `--home-on-accent`.
The one deliberate exception is the fixed-dark, photo-backed bands (each page's hero and its dark content bands), which stay dark in both themes and use the brand literals recorded in their files. Do not add new literals outside that pattern.

### Light mode and dark mode
Everything must look right in both. The theme is `data-theme` on `#sj-root` (not on `<html>`), driven by `src/components/theme/useSiteTheme.tsx`, persisted to `localStorage` under `sj-home-theme`, and set before paint by `src/components/theme/ThemeScript.tsx`. Light is the default when nothing is saved. Every colour token has a dark and a light value; when adding one, define both. Check every change in both themes (toggle with the header control) with readable contrast (WCAG AA).

### Styling is Tailwind v4
Style with Tailwind utility classes in the component itself. No CSS Modules, styled-components, inline `style` for colours, or new CSS files. `src/app/globals.css` holds only the theme tokens, the base layer, shared keyframes (`animate-sj-*`) and the few site-wide rules that cannot be utilities.

### Scroll motion reuses what exists
Use `Reveal`, `RevealOnScroll`, `RevealStagger` and `ParallaxLayer` from `@/components/ui`, and `useScrollParallax` from `@/hooks`, not new scroll listeners, observers or animation libraries. Keep the `prefers-reduced-motion` bail-out they all have. Scroll the full page to confirm timing before calling work done.

### Images optimized for fast loading
Every image must be light and load fast on slow networks:
- Always render with `next/image` (never a raw `<img>`). It serves AVIF / WebP at the right size in production (dev has optimization turned off on purpose, see `next.config.ts`).
- Always set `sizes` for responsive images and `width` / `height` (or `fill` with a sized parent) so there is no layout shift.
- Only the first visible (above the fold) image gets `preload` (Next 16 replaces `priority`); everything else lazy loads.
- Use `placeholder="blur"` for large photos (a static import gives the blur data for free).
- Before committing, resize to at most 2x the largest display size and compress. Photos as `.webp` or `.jpg`, graphics and logos as optimized `.svg` (or `.png` when only a raster master exists). Limits: raster 300 KB, SVG 50 KB.
- When replacing an image, give it a new filename so cached copies don't linger.
- `npm run check:images` enforces the size limits, bans raw `<img>`, and rejects external image URLs.
- Real hospital photography comes from the hospital's own media library, not stock.

### No external image links
Every image (photos, logos, icons, backgrounds, Open Graph images) is downloaded into `public/images` and served from our own domain. Never use a CDN, hotlink or third party URL for an image. The one approved exception is the OpenStreetMap tile server used by the Leaflet map in `features/contact`.

### Tight security, always
Think about security in every change:
- There are no security headers or CSP yet. When they are added in `next.config.ts`, never loosen them (new external domains, `unsafe-eval` in production, removing headers) without asking the user first.
- No third party scripts, trackers, embeds or iframes without explicit user approval. Plain outbound links (Calendly, maps, socials) are fine. Load fonts only through `next/font` (self hosted).
- Never commit secrets. Keep them in `.env.local` (gitignored); `.env.local.example` lists the names only. Only `NEXT_PUBLIC_*` values reach the browser, so never put secrets in them, and put `import 'server-only'` on every module that reads them (for example `lib/mailer.ts`).
- Never use `dangerouslySetInnerHTML`, `eval` or unsanitized user input in the DOM. The one allowed use is the fixed theme bootstrap string in `ThemeScript.tsx`.
- Forms: validate and sanitize on the server (Server Actions with the feature's zod schema), limit input length and upload size, add spam protection, and never trust client side validation alone. Escape user input before it goes into an email body.
- External links use `target="_blank" rel="noopener noreferrer"`.
- Treat any patient or health information (appointment details, symptoms, CVs, contact form messages) as sensitive: never log it, never put it in URLs or query strings.
- Add dependencies only when needed, prefer well maintained packages, and keep `npm run check:audit` (production dependencies) clean.

### Commit everything
Small, focused commits using Conventional Commits with the feature as scope where it fits (`feat(e-channeling):`, `fix:`, `chore:`, `style:`, `refactor:`, `docs:`, `test:`). Never leave work uncommitted at the end of a task; the working tree must be clean when done. Run `npm run lint`, `npm test`, `npm run check` and `npm run build` before calling a feature finished.

### New feature means a new git worktree
Never build features directly on `main`. Worktrees live under `.claude/worktrees/` (gitignored), one branch each named `worktree-<feature>`:

```bash
git worktree add .claude/worktrees/<feature> -b worktree-<feature>
cd .claude/worktrees/<feature> && npm ci   # a worktree has no node_modules of its own
# work, commit
```

When the work is done, report and **wait for the user to confirm** before merging. Then, from the main checkout:

```bash
git merge --no-ff worktree-<feature>
git worktree remove .claude/worktrees/<feature> && git branch -d worktree-<feature>
```

Restart the dev server inside a worktree before each visual check; it does not pick up file changes on its own. Small chores (docs, config) and one line fixes may go straight to `main`.

### Follow the folder architecture
Put new files where the Folder architecture section says they belong. Do not invent new top level folders under `src/` without updating this file.
