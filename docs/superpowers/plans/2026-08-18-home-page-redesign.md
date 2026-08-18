# Home Page Redesign (v2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage at `/` with a full recreation of the reference one-page design: 15 sections, a scoped dark/light theme system, full animation fidelity (parallax, Ken Burns, scroll-reveal, marquee, pulse), and responsive layout at the reference's exact breakpoints.

**Architecture:** The home route moves out of the `(marketing)` route group to a root `src/app/page.tsx`, so it stops sharing the site-wide `SiteHeader`/`SiteFooter` and gets its own self-contained header/footer/floating-action-button, matching the reference. `src/features/home/` is rebuilt from scratch. Server Components render all static content; small `'use client'` leaves handle the theme toggle, mobile nav panel, scroll-reveal, parallax, and the testimonial carousel. All new colors/fonts are scoped under a `[data-home]` wrapper so the rest of the site (which stays light-only) is unaffected.

**Tech Stack:** Next.js 16.2.11 (App Router), React 19.2.4, TypeScript strict, Tailwind CSS v4 (CSS-first, arbitrary value/breakpoint variants), `next/font/google` (Bricolage Grotesque + Manrope, additive to the existing Plus Jakarta Sans + Sora), `next/image` for all photos. No new npm dependencies.

**Spec:** `docs/superpowers/specs/2026-08-18-home-page-redesign-design.md`

## Global Constraints

- Follow `CLAUDE.md`'s feature-based folder architecture: routing lives in `app/`, real content in `src/features/home/`, shared config in `src/config/`. This feature does not use the shared `src/components/layout/SiteHeader.tsx`/`SiteFooter.tsx` — it has its own.
- Import via the `@/*` alias. No `../../..` relative chains.
- Server Components by default. `'use client'` only on the specific leaf that needs state/effects/browser APIs: `ThemeToggleButton`, `HomeThemeProvider`, `MobileNavPanel`, `Reveal`, `useParallax`-consuming leaves, `FloatingActions`, `TestimonialsSection`.
- Tailwind v4 is CSS-first. New home-page color tokens are plain CSS custom properties scoped to `[data-home]` in `src/app/globals.css` — **do not** add them to the global `@theme` block (that would create new global utilities and risks colliding with the existing `--color-primary`/`--color-accent`/etc. tokens the rest of the site depends on). Consume them via Tailwind arbitrary-value utilities, e.g. `bg-[var(--home-bg)]`.
- New fonts (`--font-bricolage`, `--font-manrope`) are added in `src/app/layout.tsx` as additional `next/font/google` loaders. They are applied only inside the home page's `[data-home]` wrapper via a scoped `.font-display` class (defined in Task 1) for headings; body text inherits Manrope from the wrapper's own `font-family`. They must **not** be added to the global `@theme` block's `--font-sans`/`--font-heading`, which stay Plus Jakarta Sans/Sora for every other page.
- Breakpoints must match the reference exactly using Tailwind arbitrary variants (`min-[Npx]:`/`max-[Npx]:`), not the default `sm`/`md`/`lg` scale: full nav collapses under 1120px, bento/facility grids adjust under 1024px, all two-column split sections stack under 900px, tightest spacing/FAB changes under 640px.
- All copy is ported verbatim from the reference (see the spec's "Content model & copy" section) — do not paraphrase, shorten, or "improve" it.
- Images: use the existing real files in `public/images/` per the spec's Images table. Do not fetch new images or invent new filenames beyond what's listed there.
- Every animation (`sj-up`, `sj-tick`, `sj-pulse`, `sj-burns`, `sj-sheen`, `sj-scan`, and the `Reveal`/`useParallax` primitives) must be disabled under `prefers-reduced-motion: reduce`.
- The services bento grid (Task 7) and facilities grid (Task 9) differ from the spec's literal file list in one place: bento tiles are hardcoded JSX (not a generic data array) because their 8 layouts are structurally heterogeneous (one accent hero tile, two wide photo tiles, five plain tiles) and forcing them through one generic shape would need more conditional branching than just writing them out — facilities' 4 cards stay data-driven since they share one shape. This keeps content still 100% ported verbatim; only the internal representation differs from the spec's file list.
- No automated test suite exists in this repo (`CLAUDE.md`: "No test runner is configured yet"). Every task's verification is `npx tsc --noEmit`, `npm run lint`, and a manual check in the browser. `npm run build` runs once, in the final task.
- This repo's ESLint config (`eslint-config-next`'s React Compiler-oriented `eslint-plugin-react-hooks` rule set) enforces two rules this plan's code must satisfy everywhere: (1) `react-hooks/set-state-in-effect` — never call `setState` synchronously in a `useEffect`'s top-level body (calling it inside an async callback like an event listener or `IntersectionObserver` callback is fine); (2) `react-hooks/refs` — never access a hook's returned ref via member-expression (`someHookResult.ref`) when the hook returns an object containing a ref — always destructure it to a plain local variable first (`const { ref, offset } = useParallax(...)`), everywhere `useParallax` is used in this plan.
- `next lint`/`tsc` must stay clean (no `any`, no unused vars/imports) throughout.

Start the dev server once, before Task 1, and leave it running for the rest of implementation:

```bash
npm run dev
```

Open `http://localhost:3000` and keep the tab open — Fast Refresh updates it live as files change.

---

### Task 1: Visual system foundations — tokens, keyframes, fonts, nav config

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Create: `src/config/homeNavigation.ts`

**Interfaces:**
- Consumes: nothing (first task).
- Produces (used by every later task):
  - CSS custom properties on `[data-home]` / `[data-home][data-theme="light"]`: `--home-bg`, `--home-surface`, `--home-surface-2`, `--home-heading`, `--home-body`, `--home-muted`, `--home-hairline`, `--home-accent`, `--home-accent-soft`, `--home-on-accent`.
  - `.font-display` class (scoped under `[data-home]`) setting `font-family: var(--font-bricolage)`.
  - Animation utility classes: `.animate-sj-up`, `.animate-sj-tick`, `.animate-sj-pulse`, `.animate-sj-burns`, `.animate-sj-sheen`, `.animate-sj-scan`, all no-op under `prefers-reduced-motion: reduce`.
  - `--font-bricolage`, `--font-manrope` CSS variables set on `<html>` via `next/font/google`.
  - `src/config/homeNavigation.ts` exports `homeNavigation: NavItem[]` (reusing the existing `NavItem` type from `@/config/navigation`).

- [x] **Step 1: Append to `src/app/globals.css`**

Add this block at the end of the existing file (after the current `@media (prefers-reduced-motion: reduce)` block that ends the file):

```css

/* ---- Home page (v2 redesign) — scoped design system ---- */

[data-home] {
  --home-bg: #060b1f;
  --home-surface: #0b1846;
  --home-surface-2: #081a3a;
  --home-heading: #ffffff;
  --home-body: rgba(242, 246, 255, 0.82);
  --home-muted: rgba(242, 246, 255, 0.6);
  --home-hairline: rgba(242, 246, 255, 0.14);
  --home-accent: #2ca6f0;
  --home-accent-soft: #7fcbff;
  --home-on-accent: #04122b;
  font-family: var(--font-manrope), system-ui, sans-serif;
}

[data-home][data-theme="light"] {
  --home-bg: #f1f5fc;
  --home-surface: #ffffff;
  --home-surface-2: #ffffff;
  --home-heading: #0a1030;
  --home-body: #0a1030;
  --home-muted: #4b587a;
  --home-hairline: rgba(10, 16, 48, 0.16);
  --home-accent: #0b6fc0;
  --home-accent-soft: #0b6fc0;
  --home-on-accent: #ffffff;
}

[data-home] .font-display {
  font-family: var(--font-bricolage), system-ui, sans-serif;
}

@keyframes sj-up {
  from {
    opacity: 0;
    transform: translateY(26px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes sj-tick {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes sj-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(44, 166, 240, 0.55);
  }
  50% {
    box-shadow: 0 0 0 16px rgba(44, 166, 240, 0);
  }
}

@keyframes sj-burns {
  0% {
    transform: scale(1.04) translate3d(0, 0, 0);
  }
  50% {
    transform: scale(1.16) translate3d(-2.5%, -1.5%, 0);
  }
  100% {
    transform: scale(1.04) translate3d(0, 0, 0);
  }
}

@keyframes sj-sheen {
  0% {
    opacity: 0.25;
    transform: translate3d(-12%, 0, 0);
  }
  50% {
    opacity: 0.6;
    transform: translate3d(10%, 0, 0);
  }
  100% {
    opacity: 0.25;
    transform: translate3d(-12%, 0, 0);
  }
}

@keyframes sj-scan {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(700%);
  }
}

.animate-sj-up {
  animation: sj-up 0.8s ease both;
}

.animate-sj-tick {
  animation: sj-tick 34s linear infinite;
}

.animate-sj-pulse {
  animation: sj-pulse 2.2s ease-in-out infinite;
}

.animate-sj-burns {
  animation: sj-burns 26s ease-in-out infinite;
}

.animate-sj-sheen {
  animation: sj-sheen 18s ease-in-out infinite;
}

.animate-sj-scan {
  animation: sj-scan 14s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-sj-up,
  .animate-sj-tick,
  .animate-sj-pulse,
  .animate-sj-burns,
  .animate-sj-sheen,
  .animate-sj-scan {
    animation: none;
  }
}
```

- [x] **Step 2: Modify `src/app/layout.tsx`**

Replace the full file with (adds the two new font loaders and their variable classes; keeps everything else identical):

```tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora, Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "St. Joseph Hospital Negombo | To Live Is a Privilege",
  description:
    "US-standard healthcare in Negombo, Sri Lanka. 24/7 OPD, Emergency, Pharmacy, in-house doctors, and digital X-ray, with inpatient rooms from 10,000 LKR.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${sora.variable} ${bricolageGrotesque.variable} ${manrope.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <noscript>
          <style>{`[data-reveal] { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
```

- [x] **Step 3: Create `src/config/homeNavigation.ts`**

```ts
import type { NavItem } from "@/config/navigation";

export const homeNavigation: NavItem[] = [
  { label: "Services", href: "#services" },
  { label: "Facilities", href: "#facilities" },
  { label: "Pharmacy", href: "#pharmacy" },
  { label: "Health Tips", href: "#tips" },
  { label: "International Patient Care", href: "#international" },
  { label: "School Wellness", href: "#wellness" },
  { label: "Network", href: "#network" },
  { label: "Media", href: "#media" },
  { label: "Careers", href: "#career" },
];
```

- [x] **Step 4: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit with no errors.

Check the browser: `http://localhost:3000` should render exactly as before (the old homepage is still in place; this task only adds unused-so-far tokens/fonts/config). No visual change is expected yet.

- [x] **Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/config/homeNavigation.ts
git commit -m "Add home page v2 design tokens, fonts, and nav config"
```

---

### Task 2: Theme engine

**Files:**
- Create: `src/features/home/components/HomeThemeScript.tsx`
- Create: `src/features/home/hooks/useHomeTheme.tsx`
- Create: `src/features/home/components/ThemeToggleButton.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces (used from Task 4 onward):
  - `HomeThemeScript(): JSX.Element` — Server Component, renders the FOUC-prevention inline script. Must be rendered once, as an early child of the `#home-root` wrapper.
  - `HomeThemeProvider({ children }): JSX.Element` and `useHomeTheme(): { theme: "dark" | "light"; toggle: () => void }` from `@/features/home/hooks/useHomeTheme` — the provider must wrap everything rendered inside `#home-root`.
  - `ThemeToggleButton(): JSX.Element` — `'use client'`, renders a sun/moon icon button that calls `toggle()`.

- [x] **Step 1: Create `src/features/home/components/HomeThemeScript.tsx`**

```tsx
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = window.localStorage.getItem('sj-home-theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    var root = document.getElementById('home-root');
    if (root) root.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export function HomeThemeScript() {
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
```

- [x] **Step 2: Create `src/features/home/hooks/useHomeTheme.tsx`**

```tsx
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";
type HomeThemeContextValue = { theme: Theme; toggle: () => void };

const HomeThemeContext = createContext<HomeThemeContextValue | null>(null);
const STORAGE_KEY = "sj-home-theme";

function getSnapshot(): Theme {
  const attr = document.getElementById("home-root")?.getAttribute("data-theme");
  return attr === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function subscribe(onStoreChange: () => void) {
  const node = document.getElementById("home-root");
  if (!node) return () => {};
  const observer = new MutationObserver(onStoreChange);
  observer.observe(node, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function HomeThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const node = document.getElementById("home-root");
    const current = node?.getAttribute("data-theme");
    const next: Theme = current === "light" ? "dark" : "light";
    node?.setAttribute("data-theme", next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return (
    <HomeThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </HomeThemeContext.Provider>
  );
}

export function useHomeTheme() {
  const ctx = useContext(HomeThemeContext);
  if (!ctx) {
    throw new Error("useHomeTheme must be used within HomeThemeProvider");
  }
  return ctx;
}
```

Note: this reads the `data-theme` attribute on `#home-root` as the single source of truth via `useSyncExternalStore` (subscribed through a `MutationObserver`), rather than mirroring it into a separate `useState` updated from a `useEffect` — the latter pattern trips this repo's `react-hooks/set-state-in-effect` ESLint rule (part of `eslint-config-next`'s React Compiler-oriented rule set). `toggle()` mutates the DOM attribute directly and persists the choice; the `MutationObserver` subscription is what notifies React to re-render consumers, so no component-level effect ever calls `setState`.

- [x] **Step 3: Create `src/features/home/components/ThemeToggleButton.tsx`**

```tsx
"use client";

import { useHomeTheme } from "../hooks/useHomeTheme";

export function ThemeToggleButton() {
  const { theme, toggle } = useHomeTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="inline-flex h-11 w-11 items-center justify-center border border-[var(--home-hairline)] bg-transparent text-[16px] text-[var(--home-heading)]"
    >
      <span aria-hidden>{isDark ? "☀" : "☽"}</span>
      <span className="sr-only">{isDark ? "Switch to light mode" : "Switch to dark mode"}</span>
    </button>
  );
}
```

- [x] **Step 4: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit with no errors. Nothing renders yet (no host uses these components until Task 4), so there is no browser check for this task.

- [x] **Step 5: Commit**

```bash
git add src/features/home/components/HomeThemeScript.tsx src/features/home/hooks/useHomeTheme.tsx src/features/home/components/ThemeToggleButton.tsx
git commit -m "Add home page theme engine (script, provider, toggle button)"
```

---

### Task 3: Scroll-reveal and parallax primitives

**Files:**
- Create: `src/features/home/components/Reveal.tsx`
- Create: `src/features/home/hooks/useParallax.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces (used from Task 5 onward):
  - `Reveal({ children, className? }): JSX.Element` — `'use client'`, wraps children, fades/slides them in once when scrolled into view; renders visible immediately under `prefers-reduced-motion: reduce`.
  - `useParallax(factor?: number, maxOffsetPx?: number): { ref: RefObject<HTMLDivElement | null>; offset: number }` — `'use client'` hook, `offset` is a translateY in px, `0` (no-op) under `prefers-reduced-motion: reduce`.

- [x] **Step 1: Create `src/features/home/components/Reveal.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export function Reveal({ children, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[850ms] ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[34px]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

- [x] **Step 2: Create `src/features/home/hooks/useParallax.ts`**

```ts
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-linked translateY offset for background-image parallax layers,
 * matching the reference's data-px factors (0.05-0.16). Disabled under
 * prefers-reduced-motion.
 */
export function useParallax(factor = 0.1, maxOffsetPx = 120) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    let ticking = false;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const distanceFromCenter = rect.top + rect.height / 2 - viewportCenter;
      const raw = distanceFromCenter * factor;
      setOffset(Math.max(-maxOffsetPx, Math.min(maxOffsetPx, raw)));
      ticking = false;
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [factor, maxOffsetPx]);

  return { ref, offset };
}
```

- [x] **Step 3: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit with no errors. No browser check yet (no host until Task 5).

- [x] **Step 4: Commit**

```bash
git add src/features/home/components/Reveal.tsx src/features/home/hooks/useParallax.ts
git commit -m "Add scroll-reveal and parallax primitives for the home page"
```

---

### Task 4: Routing shell — page skeleton, footer, floating actions

**Files:**
- Delete: `src/app/(marketing)/page.tsx`
- Create: `src/app/page.tsx`
- Create: `src/features/home/components/icons.tsx`
- Create: `src/features/home/components/FloatingActions.tsx`
- Create: `src/features/home/components/HomeFooter.tsx`
- Create: `src/features/home/components/HomePage.tsx`
- Create: `src/features/home/index.ts`
- Delete: everything currently under `src/features/home/components/` from the old implementation (`CtaBanner.tsx`, `Doctors.tsx`, `Hero.tsx`, `HeroImageCard.tsx`, `HeroParallaxLayer.tsx`, `Services.tsx`, `StatsBar.tsx`, `Testimonials.tsx`, `Welcome.tsx`, `WhyChooseUs.tsx`) and the old `src/features/home/index.tsx`

**Interfaces:**
- Consumes: `HomeThemeScript`, `HomeThemeProvider` (Task 2).
- Produces: `HomePage(): JSX.Element` from `@/features/home`, rendering the `#home-root` wrapper with theme script + provider + empty `<main>` (sections added starting Task 5) + `HomeFooter` + `FloatingActions`. The `/` route renders this directly (no shared `SiteHeader`/`SiteFooter`). `WhatsAppIcon`, `FacebookIcon`, `InstagramIcon`, `LinkedInIcon`, `CallIcon`: `(props: { className?: string }) => JSX.Element` from `./icons`, reused by `FloatingActions` and `HomeFooter`.

- [x] **Step 1: Remove the old home feature implementation and old home route**

```bash
git rm src/app/\(marketing\)/page.tsx
git rm src/features/home/index.tsx
git rm src/features/home/components/CtaBanner.tsx src/features/home/components/Doctors.tsx src/features/home/components/Hero.tsx src/features/home/components/HeroImageCard.tsx src/features/home/components/HeroParallaxLayer.tsx src/features/home/components/Services.tsx src/features/home/components/StatsBar.tsx src/features/home/components/Testimonials.tsx src/features/home/components/Welcome.tsx src/features/home/components/WhyChooseUs.tsx
```

- [x] **Step 2: Create `src/features/home/components/icons.tsx`**

```tsx
type IconProps = {
  className?: string;
};

export function FacebookIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden className={className}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z" />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.96.24 2.65.51.71.28 1.31.65 1.91 1.25.6.6.97 1.2 1.25 1.91.27.69.46 1.48.51 2.65.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.96-.51 2.65a5.15 5.15 0 0 1-1.25 1.91c-.6.6-1.2.97-1.91 1.25-.69.27-1.48.46-2.65.51-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.96-.24-2.65-.51a5.15 5.15 0 0 1-1.91-1.25 5.15 5.15 0 0 1-1.25-1.91c-.27-.69-.46-1.48-.51-2.65C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.24-1.96.51-2.65.28-.71.65-1.31 1.25-1.91.6-.6 1.2-.97 1.91-1.25.69-.27 1.48-.46 2.65-.51C8.42 2.17 8.8 2.16 12 2.16zm0 1.98c-3.15 0-3.49.01-4.72.07-.95.04-1.47.2-1.81.34-.46.18-.78.39-1.12.73-.34.34-.55.66-.73 1.12-.13.34-.3.86-.34 1.81-.06 1.23-.07 1.57-.07 4.72s.01 3.49.07 4.72c.04.95.2 1.47.34 1.81.18.46.39.78.73 1.12.34.34.66.55 1.12.73.34.13.86.3 1.81.34 1.23.06 1.57.07 4.72.07s3.49-.01 4.72-.07c.95-.04 1.47-.2 1.81-.34.46-.18.78-.39 1.12-.73.34-.34.55-.66.73-1.12.13-.34.3-.86.34-1.81.06-1.23.07-1.57.07-4.72s-.01-3.49-.07-4.72c-.04-.95-.2-1.47-.34-1.81a3.02 3.02 0 0 0-.73-1.12 3.02 3.02 0 0 0-1.12-.73c-.34-.13-.86-.3-1.81-.34-1.23-.06-1.57-.07-4.72-.07zm0 3.37a4.49 4.49 0 1 1 0 8.98 4.49 4.49 0 0 1 0-8.98zm0 7.4a2.91 2.91 0 1 0 0-5.82 2.91 2.91 0 0 0 0 5.82zm5.72-7.6a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.83v1.64h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.63c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.19 1.45-2.19 2.97V21h-4V9z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden className={className}>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.83c0 1.86.5 3.6 1.4 5.1L2 22l5.2-1.55a9.85 9.85 0 0 0 4.84 1.25c5.43 0 9.83-4.4 9.83-9.83S17.47 2 12.04 2zm0 17.9c-1.6 0-3.1-.44-4.38-1.2l-.31-.19-3.09.92.93-3.02-.2-.32a7.99 7.99 0 0 1-1.24-4.26c0-4.43 3.62-8.04 8.06-8.04 4.43 0 8.04 3.61 8.04 8.04 0 4.43-3.61 8.07-8.04 8.07zm4.5-5.85c-.24-.12-1.46-.72-1.68-.8-.23-.09-.4-.13-.56.12-.17.25-.65.8-.8.97-.14.16-.29.18-.53.06a6.5 6.5 0 0 1-1.92-1.18 7.3 7.3 0 0 1-1.33-1.66c-.14-.24-.02-.38.1-.5.12-.13.28-.33.42-.5.13-.16.17-.28.26-.46.09-.18.04-.34-.02-.47-.06-.12-.55-1.33-.75-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.25-.85.83-.85 2.02 0 1.2.87 2.35.99 2.51.12.17 1.7 2.6 4.1 3.55 2.42.94 2.42.63 2.86.59.44-.04 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
    </svg>
  );
}

export function CallIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden className={className}>
      <path d="M6.6 10.8c1.2 2.4 3.2 4.4 5.6 5.6l1.9-1.9c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V19c0 .6-.4 1-1 1-8.3 0-15-6.7-15-15 0-.6.4-1 1-1h3.1c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .7-.2 1l-1.9 1.8z" />
    </svg>
  );
}
```

- [x] **Step 3: Create `src/features/home/components/FloatingActions.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon, CallIcon } from "./icons";

export function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-[14px] right-[14px] z-[60] flex flex-col items-end gap-2.5 sm:bottom-[22px] sm:right-[22px]">
      {showBackToTop && (
        <button
          type="button"
          title="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-[52px] w-[52px] items-center justify-center border border-[var(--home-hairline)] bg-[var(--home-bg)]/70 text-[18px] text-[var(--home-heading)] backdrop-blur-sm"
        >
          <span aria-hidden>&uarr;</span>
        </button>
      )}
      <a
        href="https://wa.me/94742223334"
        title="WhatsApp us"
        className="inline-flex items-center justify-center gap-2.5 bg-[#1FAF54] px-5 py-3.5 text-[14.5px] font-bold text-[#04220F] shadow-[0_18px_34px_-18px_rgba(0,0,0,0.75)] max-[639px]:h-[52px] max-[639px]:w-[52px] max-[639px]:px-0"
      >
        <WhatsAppIcon />
        <span className="max-[639px]:hidden">WhatsApp</span>
      </a>
      <a
        href="tel:+94117848484"
        title="Call us"
        className="animate-sj-pulse inline-flex items-center justify-center gap-2.5 bg-[var(--home-accent)] px-5 py-3.5 text-[14.5px] font-bold text-[var(--home-on-accent)] shadow-[0_18px_34px_-18px_rgba(0,0,0,0.75)] max-[639px]:h-[52px] max-[639px]:w-[52px] max-[639px]:px-0"
      >
        <CallIcon />
        <span className="max-[639px]:hidden">Call us</span>
      </a>
    </div>
  );
}
```

- [x] **Step 4: Create `src/features/home/components/HomeFooter.tsx`**

```tsx
import Image from "next/image";
import { FacebookIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from "./icons";

const careLinks = [
  { label: "Services", href: "#services" },
  { label: "Surgical care", href: "#surgical" },
  { label: "Pharmacy", href: "#pharmacy" },
  { label: "Accommodation", href: "#rooms" },
];

const hospitalLinks = [
  { label: "Facilities", href: "#facilities" },
  { label: "International patient care", href: "#international" },
  { label: "Health tips", href: "#tips" },
  { label: "School wellness", href: "#wellness" },
  { label: "Network", href: "#network" },
  { label: "Media", href: "#media" },
  { label: "Careers", href: "#career" },
];

export function HomeFooter() {
  return (
    <footer id="contact" className="mx-auto max-w-[1440px] px-5 pb-10 pt-26 sm:px-8 lg:px-11">
      <div className="flex flex-wrap items-start justify-between gap-13">
        <div className="max-w-[34ch]">
          <span className="flex items-center gap-3.5">
            <Image src="/images/logo.png" alt="St. Joseph Hospital" width={60} height={60} className="h-15 w-auto" />
            <span className="block leading-[1.1]">
              <span className="font-display block text-[20px] font-extrabold tracking-[-0.02em] text-[var(--home-heading)]">
                ST. JOSEPH HOSPITAL
              </span>
              <span className="mt-1 block text-[10.5px] tracking-[0.22em] text-[var(--home-accent-soft)]">
                TO LIVE IS A PRIVILEGE
              </span>
            </span>
          </span>
          <p className="mt-4.5 text-[15px] leading-[1.62] text-[var(--home-muted)]">
            Compassionate, patient centered care, bringing American healthcare standards to Sri Lanka.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.facebook.com/sjhospitalNegombo"
              title="Facebook"
              className="flex h-[46px] w-[46px] items-center justify-center border border-[var(--home-hairline)] text-[var(--home-heading)]"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com/sjhospital.lk/"
              title="Instagram"
              className="flex h-[46px] w-[46px] items-center justify-center border border-[var(--home-hairline)] text-[var(--home-heading)]"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.linkedin.com/company/sjhnegomb/"
              title="LinkedIn"
              className="flex h-[46px] w-[46px] items-center justify-center border border-[var(--home-hairline)] text-[var(--home-heading)]"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://wa.me/94742223334"
              title="WhatsApp"
              className="flex h-[46px] w-[46px] items-center justify-center border border-[var(--home-hairline)] text-[var(--home-heading)]"
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 text-[15px]">
          <span className="mb-2 text-[11.5px] tracking-[0.22em] text-[var(--home-accent)] uppercase">Care</span>
          {careLinks.map((item) => (
            <a key={item.href} href={item.href} className="text-[var(--home-body)] opacity-90 hover:opacity-100">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2.5 text-[15px]">
          <span className="mb-2 text-[11.5px] tracking-[0.22em] text-[var(--home-accent)] uppercase">Hospital</span>
          {hospitalLinks.map((item) => (
            <a key={item.href} href={item.href} className="text-[var(--home-body)] opacity-90 hover:opacity-100">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2.5 text-[15px]">
          <span className="mb-2 text-[11.5px] tracking-[0.22em] text-[var(--home-accent)] uppercase">Reach us</span>
          <span className="text-[var(--home-body)] opacity-90">229/10 St. Joseph Street, Negombo</span>
          <a href="tel:+94117848484" className="text-[var(--home-body)] opacity-90 tabular-nums hover:opacity-100">
            0117 84 84 84
          </a>
          <a href="https://wa.me/94742223334" className="text-[var(--home-body)] opacity-90 tabular-nums hover:opacity-100">
            WhatsApp 074 222 333 4
          </a>
          <a href="mailto:info@sjhospital.lk" className="text-[var(--home-body)] opacity-90 hover:opacity-100">
            info@sjhospital.lk
          </a>
        </div>
      </div>

      <div className="mt-15 flex flex-wrap items-center justify-between gap-5 border-t border-[var(--home-hairline)] pt-5 text-[13px]">
        <span className="text-[var(--home-muted)]">&copy; 2026 St. Joseph Hospital, Negombo</span>
        <span className="tracking-[0.18em] text-[var(--home-muted)] uppercase">To live is a privilege</span>
      </div>
    </footer>
  );
}
```

- [x] **Step 5: Create `src/features/home/components/HomePage.tsx`**

```tsx
import { HomeThemeScript } from "./HomeThemeScript";
import { HomeThemeProvider } from "../hooks/useHomeTheme";
import { HomeFooter } from "./HomeFooter";
import { FloatingActions } from "./FloatingActions";

export function HomePage() {
  return (
    <div
      id="home-root"
      data-home
      data-theme="dark"
      suppressHydrationWarning
      className="min-h-screen bg-[var(--home-bg)] text-[var(--home-body)] antialiased"
    >
      <HomeThemeScript />
      <HomeThemeProvider>
        <main>{/* sections are added starting Task 5 */}</main>
        <HomeFooter />
        <FloatingActions />
      </HomeThemeProvider>
    </div>
  );
}
```

- [x] **Step 6: Create `src/features/home/index.ts`**

```ts
export { HomePage } from "./components/HomePage";
```

- [x] **Step 7: Create `src/app/page.tsx`**

```tsx
import { HomePage } from "@/features/home";

export default function Page() {
  return <HomePage />;
}
```

- [x] **Step 8: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit with no errors.

Check the browser: `http://localhost:3000` now shows a dark, empty page (no shared `SiteHeader` at the top anymore) with the new footer at the bottom and the WhatsApp/Call floating buttons at the bottom-right (the pulsing call button should visibly pulse). Click the theme toggle... wait, there's no toggle yet (that's added with the header in Task 5) — instead, confirm in the browser devtools that `<div id="home-root">` has `data-theme="dark"`. Confirm every other route (`/about-us`, `/services`, `/career`, `/contact-us`, `/accommodation`, `/e-channeling`) still renders with the old shared header/footer, unaffected.

- [x] **Step 9: Commit**

```bash
git add -A
git commit -m "Add home page routing shell, footer, and floating actions"
```

---

### Task 5: Header and hero section

**Files:**
- Create: `src/features/home/components/MobileNavPanel.tsx`
- Create: `src/features/home/components/HomeHeader.tsx`
- Create: `src/features/home/components/StatTicker.tsx`
- Create: `src/features/home/components/HeroParallaxBackground.tsx`
- Create: `src/features/home/components/HeroSection.tsx`
- Modify: `src/features/home/components/HomePage.tsx`

**Interfaces:**
- Consumes: `homeNavigation` (`@/config/homeNavigation`, Task 1), `ThemeToggleButton` (Task 2), `useParallax` (`../hooks/useParallax`, Task 3). Uses `/images/hero.jpg`. Note: `Reveal` (Task 3) is NOT used here — hero content animates once on load via the `sj-up` CSS class (already applied directly in the JSX below), not on scroll-into-view, since the hero is always in view on page load. Do not import `Reveal` in this task's files.
- `HeroParallaxBackground(): JSX.Element` — `'use client'` leaf, wraps the hero photo: outer wrapper gets the scroll-linked parallax offset from `useParallax(0.16, 130)` (matching the reference's `data-px="0.16"` on this exact layer), inner `<Image>` gets the `animate-sj-burns` Ken Burns zoom. These two motions must stay on separate elements — putting both a CSS `animation` and an inline `style.transform` on the same element makes them fight over the `transform` property.
- Produces: `HeroSection(): JSX.Element`, wired as the first child of `HomePage`'s `<main>`. Renders `HomeHeader` internally (matching the reference: the header lives inside the hero section and scrolls away with it — it is **not** a persistent sticky bar). Declares the `id="top"` anchor. `MobileNavPanel({ items }: { items: NavItem[] }): JSX.Element`.

- [x] **Step 1: Create `src/features/home/components/MobileNavPanel.tsx`**

```tsx
"use client";

import { useState } from "react";
import type { NavItem } from "@/config/navigation";

type MobileNavPanelProps = {
  items: NavItem[];
};

export function MobileNavPanel({ items }: MobileNavPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="ml-auto min-[1120px]:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="home-mobile-nav-panel"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-11 w-11 items-center justify-center border border-[var(--home-hairline)] text-[17px] text-[var(--home-heading)]"
      >
        <span aria-hidden>{isOpen ? "✕" : "☰"}</span>
      </button>

      {isOpen && (
        <div
          id="home-mobile-nav-panel"
          className="absolute inset-x-0 top-full z-30 border-t border-[var(--home-hairline)] bg-[var(--home-bg)] px-5 py-5"
        >
          <nav className="flex flex-col gap-1">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="px-2 py-3 text-[15px] font-semibold text-[var(--home-body)] hover:text-[var(--home-heading)]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setIsOpen(false)}
              className="mt-2 bg-[var(--home-accent)] px-5 py-3 text-center text-[15px] font-bold text-[var(--home-on-accent)]"
            >
              Book now
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
```

- [x] **Step 2: Create `src/features/home/components/HomeHeader.tsx`**

```tsx
import Image from "next/image";
import { homeNavigation } from "@/config/homeNavigation";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { MobileNavPanel } from "./MobileNavPanel";

export function HomeHeader() {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-[1440px] items-center gap-5 px-5 py-5 sm:px-8 lg:px-11">
      <a href="#top" className="flex items-center gap-3">
        <Image src="/images/logo.png" alt="St. Joseph Hospital" width={48} height={48} className="h-12 w-auto" priority />
        <span className="block leading-[1.05]">
          <span className="font-display block text-[16.5px] font-extrabold tracking-[-0.02em] text-white">
            ST. JOSEPH
          </span>
          <span className="block text-[10px] tracking-[0.22em] text-[#7FCBFF]">HOSPITAL &middot; NEGOMBO</span>
        </span>
      </a>

      <nav className="ml-auto hidden items-center gap-5 text-[13px] font-semibold min-[1120px]:flex max-[1279px]:gap-4 max-[1279px]:text-[12.5px]">
        {homeNavigation.map((item) => (
          <a key={item.href} href={item.href} className="text-white/82 hover:text-white">
            {item.label}
          </a>
        ))}
      </nav>

      <MobileNavPanel items={homeNavigation} />

      <ThemeToggleButton />

      <a
        href="#book"
        className="inline-flex items-center gap-2.5 whitespace-nowrap bg-[var(--home-accent)] px-5 py-3.5 text-[13.5px] font-bold text-[var(--home-on-accent)]"
      >
        Book now <span aria-hidden>&rarr;</span>
      </a>
    </header>
  );
}
```

Note: the hero always renders on the reference's dark background regardless of the page's theme (`data-fixed-dark` in the reference), so the header here uses hardcoded white/near-white text rather than the `--home-heading`/`--home-body` tokens, matching that fixed-dark behavior.

- [x] **Step 3: Create `src/features/home/components/StatTicker.tsx`**

```tsx
const tickerItems = [
  "Emergency open 24/7",
  "Surgical theatres to US protocol",
  "Cleaned every two hours",
  "Reports same day, checked twice",
  "Rooms from 10,000 LKR",
];

function TickerTrack({ hidden }: { hidden?: boolean }) {
  return (
    <span
      aria-hidden={hidden}
      className="flex items-center gap-8 pr-8 text-[12.5px] font-bold tracking-[0.2em] whitespace-nowrap text-white/72 uppercase"
    >
      {tickerItems.map((item, index) => (
        <span key={index} className="flex items-center gap-8">
          <span>{item}</span>
          <span className="text-[var(--home-accent)]">&#10022;</span>
        </span>
      ))}
    </span>
  );
}

export function StatTicker() {
  return (
    <div className="relative z-10 overflow-hidden border-y border-white/14 bg-black/20 py-3.5">
      <div className="animate-sj-tick flex w-max">
        <TickerTrack />
        <TickerTrack hidden />
      </div>
    </div>
  );
}
```

- [x] **Step 4: Create `src/features/home/components/HeroParallaxBackground.tsx`**

```tsx
"use client";

import Image from "next/image";
import { useParallax } from "../hooks/useParallax";

export function HeroParallaxBackground() {
  const { ref, offset } = useParallax(0.16, 130);

  return (
    <div
      ref={ref}
      style={{ transform: `translateY(${offset}px)` }}
      className="absolute inset-x-0 -top-[14%] h-[128%] overflow-hidden"
    >
      <Image
        src="/images/hero.jpg"
        alt="St. Joseph Hospital building at dusk"
        fill
        priority
        className="animate-sj-burns object-cover"
        style={{ objectPosition: "60% 50%" }}
      />
    </div>
  );
}
```

Note: the parallax offset (translateY, from scroll position) goes on the outer wrapper via inline `style`; the Ken Burns zoom (`animate-sj-burns`, a CSS `animation` on `transform: scale(...)`) goes on the inner `<Image>`. Keeping them on separate elements is required — an element cannot have both an animated `transform` and an inline-style `transform` without one overriding the other.

Note: `useParallax`'s return value is destructured (`const { ref, offset } = useParallax(...)`) rather than held as a single object and accessed via `.ref`/`.offset`. This repo's ESLint config (`eslint-plugin-react-hooks`'s `react-hooks/refs` rule, part of `eslint-config-next`'s React Compiler rule set) flags member-expression access on any object returned from a hook when one of its properties is a ref — destructuring to plain local variables avoids the false positive. Every other use of `useParallax` in this plan (Surgical, Pharmacy, Rooms, School Wellness sections) follows this same destructured pattern.

- [x] **Step 5: Create `src/features/home/components/HeroSection.tsx`**

```tsx
import { HomeHeader } from "./HomeHeader";
import { HeroParallaxBackground } from "./HeroParallaxBackground";
import { StatTicker } from "./StatTicker";

export function HeroSection() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden bg-[#060B1F]">
      <HeroParallaxBackground />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(6,11,31,0.84) 0%, rgba(6,11,31,0.4) 40%, rgba(6,11,31,0.95) 100%)",
        }}
      />
      <div
        className="animate-sj-sheen absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 78% 26%, rgba(44,166,240,0.34) 0%, rgba(6,11,31,0) 66%)",
        }}
      />
      <div
        className="animate-sj-scan pointer-events-none absolute inset-x-0 top-0 h-[14%]"
        style={{
          background:
            "linear-gradient(rgba(127,203,255,0) 0%, rgba(127,203,255,0.16) 60%, rgba(127,203,255,0) 100%)",
        }}
      />

      <HomeHeader />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 gap-10 px-5 pb-13 sm:px-8 lg:px-11">
        <div className="hidden flex-col items-center gap-4.5 pb-2.5 min-[900px]:flex" style={{ flex: "0 0 44px" }}>
          <span
            className="text-[11px] tracking-[0.3em] text-white/50 uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            Negombo, Sri Lanka
          </span>
          <span className="w-px flex-1 bg-gradient-to-b from-white/40 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col justify-end pb-13">
          <div className="animate-sj-up mb-0 inline-flex items-center gap-3 text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
            <span className="h-px w-11 bg-[var(--home-accent)]" />
            Managed from Los Angeles, USA
          </div>
          <h1 className="font-display animate-sj-up mt-5 text-[clamp(52px,9vw,152px)] leading-[0.86] font-extrabold tracking-[-0.045em] text-white uppercase">
            To live is
            <br />
            <span style={{ color: "transparent", WebkitTextStroke: "1.4px rgba(242,246,255,0.75)" }}>a</span>{" "}
            <span className="text-[var(--home-accent)]">privilege.</span>
          </h1>
          <div className="animate-sj-up mt-10 flex flex-col items-start gap-6.5">
            <p className="max-w-[46ch] text-[18px] leading-[1.6] text-white/82" style={{ textWrap: "pretty" }}>
              American healthcare standards in Negombo: 24 hour emergency care, surgical theatres, in-house
              doctors, a modern laboratory, digital X-ray and a pharmacy that never closes.
            </p>
            <a
              href="tel:+94117848484"
              className="inline-flex items-center gap-3 border border-white/30 px-6 py-4 text-[15px] font-bold whitespace-nowrap text-white tabular-nums"
            >
              <span className="animate-sj-pulse h-2 w-2 rounded-full bg-[var(--home-accent)]" />
              0117 84 84 84
            </a>
          </div>
        </div>
      </div>

      <StatTicker />
    </section>
  );
}
```

- [x] **Step 6: Wire it into `src/features/home/components/HomePage.tsx`**

```tsx
import { HomeThemeScript } from "./HomeThemeScript";
import { HomeThemeProvider } from "../hooks/useHomeTheme";
import { HeroSection } from "./HeroSection";
import { HomeFooter } from "./HomeFooter";
import { FloatingActions } from "./FloatingActions";

export function HomePage() {
  return (
    <div
      id="home-root"
      data-home
      data-theme="dark"
      suppressHydrationWarning
      className="min-h-screen bg-[var(--home-bg)] text-[var(--home-body)] antialiased"
    >
      <HomeThemeScript />
      <HomeThemeProvider>
        <main>
          <HeroSection />
        </main>
        <HomeFooter />
        <FloatingActions />
      </HomeThemeProvider>
    </div>
  );
}
```

- [x] **Step 7: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit with no errors.

Check the browser: the hero fills the viewport with the dusk hospital photo, a slow Ken Burns zoom/drift (and, if you scroll a little, a slight parallax drift on the whole photo layer, independent of the zoom), the headline "To live is **a** privilege." (the word "a" outlined, "privilege." in blue), the pulsing phone CTA, and the looping stat ticker below. Click the sun/moon icon; confirm `data-theme` on `#home-root` flips and persists across a page reload (check `localStorage.sj-home-theme`). Resize below 1120px and confirm the inline nav disappears and the hamburger appears; open it and confirm all 9 links + Book now work and close the panel. Resize to phone width and confirm the vertical "Negombo, Sri Lanka" rail disappears and the hero still reads cleanly. Toggle OS reduced-motion and confirm the Ken Burns zoom, sheen, scan, ticker, and pulse all stop.

- [x] **Step 8: Commit**

```bash
git add src/features/home
git commit -m "Add home page header and hero section"
```

---

### Task 6: Who we are section

**Files:**
- Create: `src/features/home/components/WhoWeAreSection.tsx`
- Modify: `src/features/home/components/HomePage.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 3).
- Produces: `WhoWeAreSection(): JSX.Element`, wired after `HeroSection`. Declares `id="standards"`.

- [x] **Step 1: Create `src/features/home/components/WhoWeAreSection.tsx`**

```tsx
import { Reveal } from "./Reveal";

const stats = [
  { value: "24", caption: "Hours a day, every service open" },
  { value: "2h", caption: "Cleaning cycle, US specification" },
  { value: "0", caption: "Tests ordered that you don't need" },
];

export function WhoWeAreSection() {
  return (
    <section id="standards" className="mx-auto max-w-[1440px] px-5 pt-27 sm:px-8 lg:px-11">
      <div className="grid gap-18 min-[900px]:grid-cols-[0.85fr_1.15fr] min-[900px]:items-start">
        <div className="min-[900px]:sticky min-[900px]:top-10">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            01 / Who we are
          </div>
          <h2 className="font-display mt-5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            A US hospital
            <br />
            in a Sri Lankan
            <br />
            neighbourhood
          </h2>
        </div>
        <div>
          <Reveal>
            <p className="max-w-[52ch] text-[21px] leading-[1.55] font-semibold text-[var(--home-heading)]" style={{ textWrap: "pretty" }}>
              St. Joseph Hospital is managed and operated by the Kids &amp; Teens Pediatric Medical Group of Los
              Angeles: the standards, protocols and clinical discipline of American care, priced for families in
              Negombo.
            </p>
          </Reveal>
          <Reveal className="mt-5.5">
            <p className="max-w-[56ch] text-[16.5px] leading-[1.7] text-[var(--home-muted)]">
              Consumables are never reused. Waste is managed to international protocol. Every surface is cleaned
              on a two hour cycle. Our in-house doctors order only the tests you genuinely need, and every
              report is read by two of them before it reaches you.
            </p>
          </Reveal>
          <Reveal className="mt-13.5">
            <div className="grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[640px]:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.caption} className="bg-[var(--home-bg)] px-6.5 py-7.5">
                  <div className="font-display text-[76px] leading-[0.82] font-extrabold tracking-[-0.05em] text-[var(--home-accent)] tabular-nums">
                    {stat.value}
                  </div>
                  <div className="mt-3.5 text-[12.5px] leading-[1.5] tracking-[0.14em] text-[var(--home-muted)] uppercase">
                    {stat.caption}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

- [x] **Step 2: Wire it into `HomePage.tsx`**

In `src/features/home/components/HomePage.tsx`, add the import and render it after `<HeroSection />`:

```tsx
import { WhoWeAreSection } from "./WhoWeAreSection";
```

```tsx
        <main>
          <HeroSection />
          <WhoWeAreSection />
        </main>
```

- [x] **Step 3: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit with no errors.

Check the browser: below the hero, "A US hospital in a Sri Lankan neighbourhood" appears on the left with body copy and three stat tiles (24 / 2h / 0) on the right. Scroll it into view and confirm the paragraphs and stat row fade/slide in once. On a wide viewport, scroll past the heading and confirm the left column stays pinned (`sticky`) while the right column continues scrolling. Resize below 900px and confirm it stacks to one column with no stickiness. Resize below 640px and confirm the 3 stat tiles stack to 1 column.

- [x] **Step 4: Commit**

```bash
git add src/features/home
git commit -m "Add who-we-are section"
```

---

### Task 7: Services bento grid

**Files:**
- Create: `src/features/home/components/ServicesBentoSection.tsx`
- Modify: `src/features/home/components/HomePage.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 3). Uses `/images/about-facility.jpg`, `/images/doctors.jpg`.
- Produces: `ServicesBentoSection(): JSX.Element`, wired after `WhoWeAreSection`. Declares `id="services"`.

- [x] **Step 1: Create `src/features/home/components/ServicesBentoSection.tsx`**

```tsx
import Image from "next/image";
import { Reveal } from "./Reveal";

export function ServicesBentoSection() {
  return (
    <section id="services" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              02 / What we do
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              Eight ways we
              <br />
              look after you
            </h2>
          </div>
          <span className="text-[13px] tracking-[0.12em] text-[var(--home-muted)] uppercase">
            Every tile opens a service
          </span>
        </div>
      </Reveal>

      <Reveal className="mt-11.5">
        <div
          className="grid gap-3.5 max-[639px]:grid-cols-1 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-4"
          style={{ gridAutoRows: "minmax(178px, auto)" }}
        >
          <a
            href="#book"
            className="group relative col-span-2 row-span-2 flex flex-col justify-between overflow-hidden bg-[var(--home-accent)] p-8 text-[var(--home-on-accent)] max-[639px]:col-span-1"
          >
            <span className="flex items-center justify-between gap-4 text-[12px] font-bold tracking-[0.2em] uppercase opacity-72">
              <span>/01 Emergency &amp; OPD</span>
              <span className="inline-flex items-center gap-2">
                <span className="animate-sj-pulse h-2 w-2 rounded-full bg-[var(--home-on-accent)]" />
                Open now
              </span>
            </span>
            <span className="block">
              <span className="font-display block text-[clamp(34px,4.2vw,62px)] leading-[0.92] font-extrabold tracking-[-0.04em] uppercase">
                Walk in at
                <br />
                any hour
              </span>
              <span className="mt-3.5 block max-w-[34ch] text-[15.5px] leading-[1.55] opacity-85">
                Emergency care, outpatient consultations, laboratory and digital X-ray, live around the clock
                every day of the year.
              </span>
            </span>
          </a>

          <a
            href="#surgical"
            className="relative col-span-2 flex min-h-[178px] flex-col justify-end overflow-hidden bg-[#0B1846] p-7 text-white max-[639px]:col-span-1"
          >
            <Image src="/images/about-facility.jpg" alt="" fill className="object-cover opacity-32" />
            <span
              className="absolute inset-0"
              style={{
                background: "linear-gradient(105deg, rgba(6,11,31,0.94) 20%, rgba(6,11,31,0.55) 100%)",
              }}
            />
            <span className="relative flex flex-wrap items-end justify-between gap-5">
              <span className="block">
                <span className="block text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">
                  /02 Surgical care
                </span>
                <span className="font-display mt-3 block text-[clamp(26px,2.8vw,38px)] leading-[0.98] font-bold tracking-[-0.03em] text-white">
                  Theatres, consultant led
                </span>
                <span className="mt-2.5 block max-w-[40ch] text-[14.5px] leading-[1.5] text-white/72">
                  Elective and emergency surgery with sterile instrument tracking and an assigned recovery
                  nurse.
                </span>
              </span>
              <span className="inline-flex items-center gap-2.5 text-[14px] font-bold whitespace-nowrap text-white">
                Surgical services <span aria-hidden className="text-[18px]">&rarr;</span>
              </span>
            </span>
          </a>

          <a
            href="#rooms"
            className="row-span-2 flex flex-col justify-between border border-[var(--home-hairline)] bg-[#0B1846] p-6.5 text-inherit"
          >
            <span className="text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">/03 Rooms</span>
            <span className="block">
              <span className="font-display block text-[clamp(38px,4vw,58px)] leading-[0.86] font-extrabold tracking-[-0.045em] text-[var(--home-accent)] tabular-nums">
                10,000
              </span>
              <span className="mt-2.5 block text-[14px] leading-[1.5] text-white/70">
                LKR a night. Private and semi private, sanitised every two hours, nursing that knows your name.
              </span>
            </span>
          </a>

          <a
            href="#pharmacy"
            className="flex flex-col justify-between border border-[var(--home-hairline)] bg-[#0B1846] p-6.5 text-inherit"
          >
            <span className="text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">/04 Pharmacy</span>
            <span className="block">
              <span className="font-display block text-[26px] leading-none font-bold tracking-[-0.03em] text-white">
                Authorized stock, 24/7
              </span>
              <span className="mt-2 block text-[14px] leading-[1.5] text-white/70">
                Verified medicine only. No substitutes.
              </span>
            </span>
          </a>

          <a
            href="#facilities"
            className="flex flex-col justify-between border border-[var(--home-hairline)] bg-[#0B1846] p-6.5 text-inherit"
          >
            <span className="text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">/05 Digital X-ray</span>
            <span className="block">
              <span className="font-display block text-[26px] leading-none font-bold tracking-[-0.03em] text-white">
                Lower dose, sharper plates
              </span>
              <span className="mt-2 block text-[14px] leading-[1.5] text-white/70">
                Read within the hour, not the week.
              </span>
            </span>
          </a>

          <a
            href="#facilities"
            className="relative col-span-2 flex min-h-[178px] items-end overflow-hidden bg-[#081A3A] p-6.5 text-inherit max-[639px]:col-span-1"
          >
            <Image src="/images/doctors.jpg" alt="" fill className="object-cover opacity-42" />
            <span
              className="absolute inset-0"
              style={{ background: "linear-gradient(rgba(6,11,31,0.3) 20%, rgba(6,11,31,0.92) 100%)" }}
            />
            <span className="relative flex w-full flex-wrap items-end justify-between gap-5">
              <span className="block">
                <span className="block text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">
                  /06 Laboratory
                </span>
                <span className="font-display mt-3 block text-[clamp(24px,2.6vw,34px)] leading-none font-bold tracking-[-0.03em] text-white">
                  Two doctors read every report
                </span>
              </span>
              <span className="text-[14px] whitespace-nowrap text-white/75">10% off for OPD patients</span>
            </span>
          </a>

          <a
            href="#book"
            className="flex flex-col justify-between border border-[var(--home-hairline)] bg-[#0B1846] p-6.5 text-inherit"
          >
            <span className="text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">/07 Home visits</span>
            <span className="block">
              <span className="font-display block text-[26px] leading-none font-bold tracking-[-0.03em] text-white">
                We come to you
              </span>
              <span className="mt-2 block text-[14px] leading-[1.5] text-white/70">
                Doctors, nurses and lab technicians at your door.
              </span>
            </span>
          </a>

          <a
            href="#pharmacy"
            className="flex flex-col justify-between border border-[var(--home-hairline)] bg-[#0B1846] p-6.5 text-inherit"
          >
            <span className="text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">/08 Delivery</span>
            <span className="block">
              <span className="font-display block text-[26px] leading-none font-bold tracking-[-0.03em] text-white">
                Medicine to your door
              </span>
              <span className="mt-2 block text-[14px] leading-[1.5] text-white/70">
                Across Negombo, from our own counter.
              </span>
            </span>
          </a>
        </div>
      </Reveal>

      <Reveal>
        <a
          href="#surgical"
          className="mt-8.5 flex flex-wrap items-center justify-between gap-7.5 bg-[var(--home-accent)] px-9 py-8.5 text-[var(--home-on-accent)] transition-colors"
        >
          <span className="block">
            <span className="block text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">
              Full service directory
            </span>
            <span className="font-display mt-2.5 block text-[clamp(28px,3.4vw,46px)] leading-none font-extrabold tracking-[-0.035em] uppercase">
              Go to surgical care &amp; services
            </span>
          </span>
          <span className="inline-flex items-center gap-3 text-[15px] font-bold whitespace-nowrap">
            Open the page <span aria-hidden className="text-[22px]">&rarr;</span>
          </span>
        </a>
      </Reveal>
    </section>
  );
}
```

- [x] **Step 2: Wire it into `HomePage.tsx`**

Add the import and render after `<WhoWeAreSection />`:

```tsx
import { ServicesBentoSection } from "./ServicesBentoSection";
```

```tsx
          <WhoWeAreSection />
          <ServicesBentoSection />
```

- [x] **Step 3: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit with no errors.

Check the browser: an 8-tile grid appears (accent-filled "Walk in at any hour" tile spanning 2x2, two photo-background wide tiles, five plain tiles), followed by the full-width "Go to surgical care & services" banner. Resize to ~1000px and confirm the grid becomes 2 columns; resize to phone width and confirm it becomes 1 column with every tile still fully readable. Confirm the "Open now" dot pulses.

- [x] **Step 4: Commit**

```bash
git add src/features/home
git commit -m "Add services bento grid section"
```

---

### Task 8: Surgical care section

**Files:**
- Create: `src/features/home/components/SurgicalSection.tsx`
- Modify: `src/features/home/components/HomePage.tsx`

**Interfaces:**
- Consumes: `Reveal`, `useParallax` (Task 3). Uses `/images/about-facility.jpg`.
- Produces: `SurgicalSection(): JSX.Element`, wired after `ServicesBentoSection`. Declares `id="surgical"`.

- [x] **Step 1: Create `src/features/home/components/SurgicalSection.tsx`**

```tsx
"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { useParallax } from "../hooks/useParallax";

const procedures = [
  { name: "General surgery", note: "Elective and emergency" },
  { name: "Obstetric theatre", note: "Consultant led" },
  { name: "Orthopaedic procedures", note: "Day case and inpatient" },
  { name: "Endoscopy suite", note: "Same day reporting" },
  { name: "Post-operative care", note: "Assigned recovery nurse" },
];

export function SurgicalSection() {
  const { ref: bgRef, offset: bgOffset } = useParallax(0.12, 80);

  return (
    <section id="surgical" className="relative mt-30 overflow-hidden bg-[#081A3A]">
      <div ref={bgRef} style={{ transform: `translateY(${bgOffset}px)` }} className="absolute inset-x-0 -top-[10%] h-[120%]">
        <Image src="/images/about-facility.jpg" alt="" fill className="object-cover opacity-34" />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, #060B1F 4%, rgba(6,11,31,0.86) 52%, rgba(6,11,31,0.74) 100%)",
        }}
      />
      <div className="relative mx-auto max-w-[1440px] px-5 py-26 sm:px-8 lg:px-11">
        <div className="grid gap-15 min-[900px]:grid-cols-2 min-[900px]:items-center">
          <Reveal>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
              03 / Surgical care
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(40px,5.2vw,78px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-white uppercase">
              Theatres run
              <br />
              to protocol,
              <br />
              not to habit
            </h2>
            <p className="mt-6 max-w-[46ch] text-[17.5px] leading-[1.65] text-white/80" style={{ textWrap: "pretty" }}>
              Elective and emergency surgery with consultant anaesthesia, single use consumables, sterile
              tracking on every instrument set and a nurse assigned to your recovery from theatre to discharge.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#book" className="inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]">
                Request a surgical consult <span aria-hidden>&rarr;</span>
              </a>
              <a href="tel:+94117848484" className="inline-flex items-center gap-2.5 border border-white/30 px-6 py-4 text-[15px] font-bold text-white">
                Speak to the theatre desk
              </a>
            </div>
          </Reveal>
          <Reveal>
            <div className="flex flex-col gap-px bg-white/18">
              {procedures.map((item) => (
                <div key={item.name} className="flex items-baseline justify-between gap-5 bg-[#081A3A] px-7 py-5.5">
                  <span className="text-[17px] font-bold text-white">{item.name}</span>
                  <span className="text-right text-[14px] text-white/66">{item.note}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

- [x] **Step 2: Wire it into `HomePage.tsx`**

```tsx
import { SurgicalSection } from "./SurgicalSection";
```

```tsx
          <ServicesBentoSection />
          <SurgicalSection />
```

- [x] **Step 3: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit with no errors.

Check the browser: a full-bleed section with a faint background photo appears, "Theatres run to protocol, not to habit" on the left with two buttons, and a 5-row procedure list on the right. Scroll past it and confirm the background photo drifts slightly (parallax) rather than staying pinned. Resize below 900px and confirm it stacks to one column.

- [x] **Step 4: Commit**

```bash
git add src/features/home
git commit -m "Add surgical care section"
```

---

### Task 9: Facilities section

**Files:**
- Create: `src/features/home/data/facilities.ts`
- Create: `src/features/home/components/FacilitiesSection.tsx`
- Modify: `src/features/home/components/HomePage.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 3).
- Produces: `facilities: FacilityCard[]` from `../data/facilities`; `FacilitiesSection(): JSX.Element`, wired after `SurgicalSection`. Declares `id="facilities"`.

- [x] **Step 1: Create `src/features/home/data/facilities.ts`**

```ts
export type FacilityCard = {
  index: string;
  title: string;
  body: string;
  linkLabel: string;
  href: string;
  photo?: string;
  photoAlt?: string;
  accent?: boolean;
};

export const facilities: FacilityCard[] = [
  {
    index: "01",
    title: "Six floor hospital",
    body: "Purpose built in Negombo, with ambulance bay and covered arrival.",
    linkLabel: "Ambulance bay open 24/7",
    href: "#facilities",
    photo: "/images/hero.jpg",
    photoAlt: "Hospital exterior",
  },
  {
    index: "02",
    title: "Outpatient wing",
    body: "Consulting suites with same day triage and no shared waiting crush.",
    linkLabel: "Same day triage",
    href: "#facilities",
    photo: "/images/welcome.jpg",
    photoAlt: "Outpatient reception",
  },
  {
    index: "03",
    title: "Imaging, lab & theatres",
    body: "Digital X-ray, 24 hour laboratory and sterile surgical suites.",
    linkLabel: "Reports read twice",
    href: "#facilities",
    photo: "/images/doctors.jpg",
    photoAlt: "Imaging and diagnostics",
  },
  {
    index: "04",
    title: "Inpatient rooms",
    body: "Private and semi private, sanitised every two hours. From 10,000 LKR a night.",
    linkLabel: "See rooms",
    href: "#rooms",
    accent: true,
  },
];
```

- [x] **Step 2: Create `src/features/home/components/FacilitiesSection.tsx`**

```tsx
import Image from "next/image";
import { Reveal } from "./Reveal";
import { facilities } from "../data/facilities";

export function FacilitiesSection() {
  return (
    <section id="facilities" className="mx-auto max-w-[1440px] pt-30">
      <Reveal className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-11">
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          04 / Facilities
        </div>
        <h2 className="font-display mt-4.5 mb-7.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
          Built like a
          <br />
          US facility
        </h2>
      </Reveal>

      <Reveal>
        <div className="grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[640px]:grid-cols-2 min-[1024px]:grid-cols-4">
          {facilities.map((card) =>
            card.accent ? (
              <article
                key={card.index}
                className="relative flex min-h-[430px] flex-col justify-end overflow-hidden bg-[var(--home-accent)]"
              >
                <div className="absolute inset-x-0 bottom-0 h-1 bg-[var(--home-on-accent)]" />
                <div className="relative p-7 text-[var(--home-on-accent)]">
                  <div className="text-[12px] font-bold tracking-[0.18em] opacity-65">{card.index}</div>
                  <h3 className="font-display mt-3 text-[26px] leading-[1.06] font-semibold tracking-[-0.025em]">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.55] opacity-82">{card.body}</p>
                  <a
                    href={card.href}
                    className="mt-4.5 inline-flex items-center gap-2 border-b border-[var(--home-on-accent)]/40 pb-0.5 text-[14px] font-bold"
                  >
                    {card.linkLabel} <span aria-hidden>&rarr;</span>
                  </a>
                </div>
              </article>
            ) : (
              <article key={card.index} className="group relative flex min-h-[430px] items-end overflow-hidden bg-[#081A3A]">
                {card.photo && (
                  <Image src={card.photo} alt={card.photoAlt ?? ""} fill className="object-cover opacity-55 transition-transform duration-700 group-hover:scale-[1.09] group-hover:opacity-78" />
                )}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(rgba(6,11,31,0.08) 30%, rgba(6,11,31,0.94) 100%)" }}
                />
                <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[var(--home-accent)] transition-transform duration-[450ms] group-hover:scale-x-100" />
                <div className="relative p-7 transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="text-[12px] font-bold tracking-[0.18em] text-[#7FCBFF]">{card.index}</div>
                  <h3 className="font-display mt-3 text-[26px] leading-[1.06] font-semibold tracking-[-0.025em] text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.55] text-white/78">{card.body}</p>
                  <a
                    href={card.href}
                    className="mt-3.5 inline-flex translate-y-2.5 items-center gap-2 text-[13.5px] font-bold text-[#7FCBFF] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    {card.linkLabel} <span aria-hidden>&rarr;</span>
                  </a>
                </div>
              </article>
            )
          )}
        </div>
      </Reveal>
    </section>
  );
}
```

- [x] **Step 3: Wire it into `HomePage.tsx`**

```tsx
import { FacilitiesSection } from "./FacilitiesSection";
```

```tsx
          <SurgicalSection />
          <FacilitiesSection />
```

- [x] **Step 4: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit with no errors.

Check the browser: 4 cards appear (3 photo cards + 1 accent-filled "Inpatient rooms" card with no photo). Hover a photo card on desktop and confirm the photo zooms slightly, the bottom accent bar grows in from the left, and the "..." link fades up into view. Resize below 1024px and confirm 2 columns, below 640px and confirm 1 column.

- [x] **Step 5: Commit**

```bash
git add src/features/home
git commit -m "Add facilities section"
```

---

### Task 10: Pharmacy section

**Files:**
- Create: `src/features/home/components/PharmacySection.tsx`
- Modify: `src/features/home/components/HomePage.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 3), `useParallax` (Task 3). Uses `/images/logo.png` as a faint watermark.
- Produces: `PharmacySection(): JSX.Element`, wired after `FacilitiesSection`. Declares `id="pharmacy"`.

- [x] **Step 1: Create `src/features/home/components/PharmacySection.tsx`**

```tsx
"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { useParallax } from "../hooks/useParallax";

const stats = [
  { label: "Counter hours", value: "24 / 7" },
  { label: "Home delivery radius", value: "Negombo" },
  { label: "Prescriptions on file", value: "Digital", accent: true },
  { label: "OPD patient lab discount", value: "10%" },
];

export function PharmacySection() {
  const { ref: watermarkRef, offset: watermarkOffset } = useParallax(0.1, 60);

  return (
    <section id="pharmacy" className="relative mt-30 overflow-hidden bg-[#081A3A]">
      <div
        ref={watermarkRef}
        style={{ transform: `translateY(${watermarkOffset}px)` }}
        className="pointer-events-none absolute -top-[20%] -left-[6%] w-[32%] opacity-12"
      >
        <Image src="/images/logo.png" alt="" width={480} height={480} className="h-auto w-full" />
      </div>
      <div className="relative mx-auto max-w-[1440px] px-5 py-25 sm:px-8 lg:px-11">
        <div className="grid gap-15 min-[900px]:grid-cols-2 min-[900px]:items-center">
          <Reveal>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">05 / Pharmacy</div>
            <h2 className="font-display mt-4.5 text-[clamp(40px,5.2vw,78px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-white uppercase">
              Authorized
              <br />
              medicine.
              <br />
              Nothing else.
            </h2>
            <p className="mt-6 max-w-[46ch] text-[17.5px] leading-[1.65] text-white/78" style={{ textWrap: "pretty" }}>
              Our in-house pharmacy stocks only verified, authorized stock, dispensed by pharmacists who can
              read your file, at any hour of the night.
            </p>
            <div className="mt-7.5 flex flex-wrap gap-3">
              <a href="#book" className="inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]">
                Order a delivery <span aria-hidden>&rarr;</span>
              </a>
              <a href="tel:+94742223334" className="inline-flex items-center gap-2.5 border border-white/30 px-6 py-4 text-[15px] font-bold text-white">
                Ask a pharmacist
              </a>
            </div>
          </Reveal>
          <Reveal>
            <div className="flex flex-col gap-px bg-white/16">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-baseline justify-between gap-5 bg-[#081A3A] px-7.5 py-6">
                  <span className="text-[15px] text-white/72">{stat.label}</span>
                  <span
                    className={`font-display text-[32px] font-extrabold tracking-[-0.03em] ${
                      stat.accent ? "text-[var(--home-accent)]" : "text-white"
                    }`}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

- [x] **Step 2: Wire it into `HomePage.tsx`**

```tsx
import { PharmacySection } from "./PharmacySection";
```

```tsx
          <FacilitiesSection />
          <PharmacySection />
```

- [x] **Step 3: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit with no errors.

Check the browser: "Authorized medicine. Nothing else." appears with two buttons on the left and a 4-row stat list (24/7, Negombo, Digital, 10%) on the right, with a faint logo watermark in the top-left corner that drifts very slightly as you scroll. Resize below 900px and confirm it stacks.

- [x] **Step 4: Commit**

```bash
git add src/features/home
git commit -m "Add pharmacy section"
```

---

### Task 11: Rooms section

**Files:**
- Create: `src/features/home/components/RoomsSection.tsx`
- Modify: `src/features/home/components/HomePage.tsx`

**Interfaces:**
- Consumes: `Reveal`, `useParallax` (Task 3). Uses a photo from `/images/rooms/`.
- Produces: `RoomsSection(): JSX.Element`, wired after `PharmacySection`. Declares `id="rooms"`.

- [x] **Step 1: Create `src/features/home/components/RoomsSection.tsx`**

```tsx
"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { useParallax } from "../hooks/useParallax";

const perks = ["Private and semi private options", "Attendant space for family", "Meals prepared to dietary orders"];

export function RoomsSection() {
  const { ref: bgRef, offset: bgOffset } = useParallax(0.14, 90);

  return (
    <section id="rooms" className="relative overflow-hidden bg-[#081A3A]">
      <div ref={bgRef} style={{ transform: `translateY(${bgOffset}px)` }} className="absolute inset-x-0 -top-[10%] h-[120%]">
        <Image src="/images/rooms/deluxe-1.jpg" alt="" fill className="object-cover opacity-32" />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, #060B1F 6%, rgba(6,11,31,0.84) 58%, rgba(6,11,31,0.72) 100%)",
        }}
      />
      <div className="relative mx-auto max-w-[1440px] px-5 py-26 sm:px-8 lg:px-11">
        <div className="grid gap-15 min-[900px]:grid-cols-[1.1fr_0.9fr] min-[900px]:items-center">
          <Reveal>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">06 / Stay with us</div>
            <h2 className="font-display mt-4.5 text-[clamp(40px,5.4vw,82px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-white uppercase">
              A room that
              <br />
              feels like
              <br />
              recovery
            </h2>
            <p className="mt-6 max-w-[46ch] text-[17.5px] leading-[1.65] text-white/78" style={{ textWrap: "pretty" }}>
              Quiet, private and sanitised on a two hour cycle, with nursing that knows your name and a doctor
              on the floor at all times.
            </p>
            <a href="#book" className="mt-8 inline-flex items-center gap-3 bg-white px-6.5 py-4.5 text-[15px] font-bold text-[#060B1F]">
              Reserve a room <span aria-hidden>&rarr;</span>
            </a>
          </Reveal>
          <Reveal className="border-l border-white/24 pl-8">
            <div className="text-[12px] tracking-[0.18em] text-white/55 uppercase">Rooms from</div>
            <div className="font-display mt-2.5 text-[clamp(62px,8vw,126px)] leading-[0.82] font-extrabold tracking-[-0.05em] text-[var(--home-accent)] tabular-nums">
              10,000
            </div>
            <div className="mt-3 text-[15px] text-white/70">LKR per night, all inclusive of nursing care</div>
            <div className="mt-7 flex flex-col gap-3 text-[15px] text-white/80">
              {perks.map((perk) => (
                <span key={perk} className="flex gap-3">
                  <span className="text-[var(--home-accent)]">&#10022;</span> {perk}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

- [x] **Step 2: Wire it into `HomePage.tsx`**

```tsx
import { RoomsSection } from "./RoomsSection";
```

```tsx
          <PharmacySection />
          <RoomsSection />
```

- [x] **Step 3: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit with no errors.

Check the browser: "A room that feels like recovery" appears on the left with a "Reserve a room" button, and a large "10,000 LKR per night" figure with 3 bullet perks on the right, over a faint room photo background. Resize below 900px and confirm it stacks.

- [x] **Step 4: Commit**

```bash
git add src/features/home
git commit -m "Add rooms section"
```

---

### Task 12: International patient care section

**Files:**
- Create: `src/features/home/data/internationalCare.ts`
- Create: `src/features/home/components/InternationalCareSection.tsx`
- Modify: `src/features/home/components/HomePage.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 3).
- Produces: `internationalCareItems: InternationalCareItem[]` from `../data/internationalCare`; `InternationalCareSection(): JSX.Element`, wired after `RoomsSection`. Declares `id="international"`.

- [x] **Step 1: Create `src/features/home/data/internationalCare.ts`**

```ts
export type InternationalCareItem = {
  index: string;
  title: string;
  body: string;
};

export const internationalCareItems: InternationalCareItem[] = [
  {
    index: "01",
    title: "Airport to bedside",
    body: "Ten minutes from Bandaranaike International. We arrange transfer and admission before you land.",
  },
  {
    index: "02",
    title: "Estimates in writing",
    body: "A costed treatment plan in your currency, approved before anything begins.",
  },
  {
    index: "03",
    title: "Insurance and claims",
    body: "Documentation prepared for international insurers and travel policies.",
  },
  {
    index: "04",
    title: "Language support",
    body: "English speaking clinicians, with interpreters arranged on request.",
  },
  {
    index: "05",
    title: "Records to take home",
    body: "Digital reports, imaging and discharge notes sent to your doctor at home.",
  },
  {
    index: "06",
    title: "Follow up online",
    body: "Post treatment review by telemedicine once you have travelled back.",
  },
];
```

- [x] **Step 2: Create `src/features/home/components/InternationalCareSection.tsx`**

```tsx
import { Reveal } from "./Reveal";
import { internationalCareItems } from "../data/internationalCare";

export function InternationalCareSection() {
  return (
    <section id="international" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <div className="grid gap-15 min-[900px]:grid-cols-[0.9fr_1.1fr] min-[900px]:items-start">
        <div className="min-[900px]:sticky min-[900px]:top-10">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            07 / International patient care
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(38px,4.6vw,70px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-[var(--home-heading)] uppercase">
            Travelling
            <br />
            for care, or
            <br />
            just visiting
          </h2>
          <p className="mt-5.5 max-w-[40ch] text-[17px] leading-[1.65] text-[var(--home-muted)]">
            Negombo sits ten minutes from the international airport. We look after visitors, expatriates and
            medical travellers from arrival to follow up at home.
          </p>
          <a href="mailto:international@sjhospital.lk" className="mt-7 inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-5.5 py-3.5 text-[14.5px] font-bold text-[var(--home-on-accent)]">
            Talk to the international desk <span aria-hidden>&rarr;</span>
          </a>
        </div>
        <Reveal className="grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[640px]:grid-cols-2">
          {internationalCareItems.map((item) => (
            <div key={item.index} className="bg-[var(--home-bg)] px-7 py-7.5">
              <div className="text-[12px] font-bold tracking-[0.18em] text-[var(--home-accent)]">{item.index}</div>
              <h3 className="font-display mt-3.5 text-[24px] leading-[1.08] font-semibold tracking-[-0.025em] text-[var(--home-heading)]">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-[1.6] text-[var(--home-muted)]">{item.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
```

- [x] **Step 3: Wire it into `HomePage.tsx`**

```tsx
import { InternationalCareSection } from "./InternationalCareSection";
```

```tsx
          <RoomsSection />
          <InternationalCareSection />
```

- [x] **Step 4: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit with no errors.

Check the browser: "Travelling for care, or just visiting" appears on the left (sticky on scroll, desktop) with a 2x3 grid of 6 items on the right. Resize below 900px and confirm one column with no stickiness; below 640px confirm the 2x3 grid becomes a single column.

- [x] **Step 5: Commit**

```bash
git add src/features/home
git commit -m "Add international patient care section"
```

---

### Task 13: Health tips section

**Files:**
- Create: `src/features/home/data/healthTips.ts`
- Create: `src/features/home/components/HealthTipsSection.tsx`
- Modify: `src/features/home/components/HomePage.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 3).
- Produces: `healthTips: HealthTip[]` from `../data/healthTips`; `HealthTipsSection(): JSX.Element`, wired after `InternationalCareSection`. Declares `id="tips"`.

- [x] **Step 1: Create `src/features/home/data/healthTips.ts`**

```ts
export type HealthTip = {
  category: string;
  title: string;
  excerpt: string;
};

export const healthTips: HealthTip[] = [
  {
    category: "Pediatrics",
    title: "Fever in a child: when to wait, when to come in",
    excerpt: "The three signs that make a night visit worth it.",
  },
  {
    category: "Prevention",
    title: "The five yearly checks worth doing after forty",
    excerpt: "What our physicians order, and what they skip.",
  },
  {
    category: "Dengue",
    title: "Monsoon season: cutting dengue risk at home",
    excerpt: "Twenty minutes a week around your garden and gutters.",
  },
  {
    category: "Recovery",
    title: "Eating well in the two weeks after surgery",
    excerpt: "Protein, fluid and sleep targets that speed healing.",
  },
];
```

- [x] **Step 2: Create `src/features/home/components/HealthTipsSection.tsx`**

```tsx
import { Reveal } from "./Reveal";
import { healthTips } from "../data/healthTips";

export function HealthTipsSection() {
  return (
    <section id="tips" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              08 / Health tips
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              Small habits,
              <br />
              written by
              <br />
              our doctors
            </h2>
          </div>
          <a href="#tips" className="inline-flex items-center gap-2.5 border border-[var(--home-hairline)] px-5.5 py-3.5 text-[14.5px] font-bold text-[var(--home-heading)]">
            All health tips <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </Reveal>
      <Reveal className="mt-12 border-t border-[var(--home-hairline)]">
        {healthTips.map((tip) => (
          <a
            key={tip.title}
            href="#tips"
            className="grid grid-cols-1 gap-3 border-b border-[var(--home-hairline)] py-6.5 text-inherit min-[640px]:grid-cols-[0.5fr_1.5fr_1fr] min-[640px]:items-baseline min-[640px]:gap-6"
          >
            <span className="text-[13px] font-bold tracking-[0.14em] text-[var(--home-accent)] uppercase">
              {tip.category}
            </span>
            <span className="font-display text-[clamp(21px,2.1vw,30px)] leading-[1.1] font-semibold tracking-[-0.025em] text-[var(--home-heading)]">
              {tip.title}
            </span>
            <span className="text-[14.5px] leading-[1.55] text-[var(--home-muted)]">{tip.excerpt}</span>
          </a>
        ))}
      </Reveal>
    </section>
  );
}
```

- [x] **Step 3: Wire it into `HomePage.tsx`**

```tsx
import { HealthTipsSection } from "./HealthTipsSection";
```

```tsx
          <InternationalCareSection />
          <HealthTipsSection />
```

- [x] **Step 4: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit with no errors.

Check the browser: "Small habits, written by our doctors" with an "All health tips" button, followed by 4 rows (Pediatrics/Prevention/Dengue/Recovery). Resize to phone width and confirm each row stacks to 3 lines (category, title, excerpt) instead of 3 columns.

- [x] **Step 5: Commit**

```bash
git add src/features/home
git commit -m "Add health tips section"
```

---

### Task 14: School wellness section

**Files:**
- Create: `src/features/home/components/SchoolWellnessSection.tsx`
- Modify: `src/features/home/components/HomePage.tsx`

**Interfaces:**
- Consumes: `Reveal`, `useParallax` (Task 3). Uses `/images/career-staff.jpg`.
- Produces: `SchoolWellnessSection(): JSX.Element`, wired after `HealthTipsSection`. Declares `id="wellness"`.

- [x] **Step 1: Create `src/features/home/components/SchoolWellnessSection.tsx`**

```tsx
"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { useParallax } from "../hooks/useParallax";

const rows = [
  { title: "Annual health screening", note: "On campus, per grade" },
  { title: "Vision, hearing & dental", note: "Referral report to parents" },
  { title: "Teacher first aid training", note: "Half day, certified" },
];

export function SchoolWellnessSection() {
  const { ref: photoRef, offset: photoOffset } = useParallax(0.08, 50);

  return (
    <section id="wellness" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <div className="grid gap-15 min-[900px]:grid-cols-[1.05fr_0.95fr] min-[900px]:items-center">
        <Reveal>
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            09 / School wellness
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(38px,4.6vw,70px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-[var(--home-heading)] uppercase">
            We come to
            <br />
            the classroom
          </h2>
          <p className="mt-5.5 max-w-[48ch] text-[17.5px] leading-[1.65] text-[var(--home-muted)]" style={{ textWrap: "pretty" }}>
            A pediatric led programme for Negombo schools: annual screening, vision and hearing checks, growth
            tracking, vaccination drives and teacher first aid training, run by the same doctors who see your
            children in clinic.
          </p>
          <div className="mt-8 flex flex-col border-t border-[var(--home-hairline)]">
            {rows.map((row) => (
              <div key={row.title} className="flex items-baseline justify-between gap-5 border-b border-[var(--home-hairline)] py-4.5">
                <span className="text-[17px] font-bold text-[var(--home-heading)]">{row.title}</span>
                <span className="text-[14px] text-[var(--home-muted)]">{row.note}</span>
              </div>
            ))}
          </div>
          <a href="#contact" className="mt-7 inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]">
            Bring it to our school <span aria-hidden>&rarr;</span>
          </a>
        </Reveal>
        <Reveal className="relative min-h-[450px] overflow-hidden bg-[#0B1846]">
          <div ref={photoRef} style={{ transform: `translateY(${photoOffset}px)` }} className="absolute inset-x-0 -top-[8%] h-[116%]">
            <Image src="/images/career-staff.jpg" alt="Pediatric doctor with a young patient" fill className="object-cover" />
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(6,11,31,0) 40%, rgba(6,11,31,0.8) 100%)" }} />
          <div className="absolute bottom-0 left-0 bg-[var(--home-accent)] px-6 py-4.5 text-[14px] font-bold text-[var(--home-on-accent)]">
            Kids &amp; Teens pediatric protocol
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [x] **Step 2: Wire it into `HomePage.tsx`**

```tsx
import { SchoolWellnessSection } from "./SchoolWellnessSection";
```

```tsx
          <HealthTipsSection />
          <SchoolWellnessSection />
```

- [x] **Step 3: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit with no errors.

Check the browser: "We come to the classroom" appears with a 3-row list and a "Bring it to our school" button on the left, and a photo with a "Kids & Teens pediatric protocol" badge on the right. Resize below 900px and confirm it stacks (text above photo).

- [x] **Step 4: Commit**

```bash
git add src/features/home
git commit -m "Add school wellness section"
```

---

### Task 15: Network section

**Files:**
- Create: `src/features/home/data/network.ts`
- Create: `src/features/home/components/NetworkSection.tsx`
- Modify: `src/features/home/components/HomePage.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 3).
- Produces: `networkNodes: NetworkNode[]` from `../data/network`; `NetworkSection(): JSX.Element`, wired after `SchoolWellnessSection`. Declares `id="network"`.

- [x] **Step 1: Create `src/features/home/data/network.ts`**

```ts
export type NetworkNode = {
  location: string;
  name: string;
  body: string;
};

export const networkNodes: NetworkNode[] = [
  {
    location: "Negombo, LK",
    name: "St. Joseph Hospital",
    body: "Flagship hospital: emergency, OPD, surgery, inpatient, laboratory, imaging and pharmacy.",
  },
  {
    location: "Los Angeles, US",
    name: "Kids & Teens Medical Group",
    body: "Managing group: clinical governance, protocols and physician training.",
  },
  {
    location: "Negombo, LK",
    name: "School wellness programme",
    body: "On campus screening and vaccination across partner schools.",
  },
  {
    location: "Island wide, LK",
    name: "Telemedicine & delivery",
    body: "Remote consultations and medicine dispatch beyond the Negombo district.",
  },
];
```

- [x] **Step 2: Create `src/features/home/components/NetworkSection.tsx`**

```tsx
import { Reveal } from "./Reveal";
import { networkNodes } from "../data/network";

export function NetworkSection() {
  return (
    <section id="network" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              10 / Network
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              One group,
              <br />
              two countries
            </h2>
          </div>
          <p className="max-w-[36ch] text-[16.5px] leading-[1.6] text-[var(--home-muted)]">
            Our Negombo hospital shares clinical governance with the largest pediatric group in Los Angeles.
          </p>
        </div>
      </Reveal>
      <Reveal className="mt-11.5 border-t border-[var(--home-hairline)]">
        {networkNodes.map((node) => (
          <div
            key={node.name}
            className="grid grid-cols-1 gap-3 border-b border-[var(--home-hairline)] py-6.5 min-[640px]:grid-cols-[0.6fr_1.4fr_1fr] min-[640px]:items-baseline min-[640px]:gap-6"
          >
            <span className="text-[13px] font-bold tracking-[0.16em] text-[var(--home-accent)] uppercase">
              {node.location}
            </span>
            <span className="font-display text-[clamp(21px,2.2vw,32px)] leading-[1.08] font-semibold tracking-[-0.025em] text-[var(--home-heading)]">
              {node.name}
            </span>
            <span className="text-[14.5px] leading-[1.55] text-[var(--home-muted)]">{node.body}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
```

- [x] **Step 3: Wire it into `HomePage.tsx`**

```tsx
import { NetworkSection } from "./NetworkSection";
```

```tsx
          <SchoolWellnessSection />
          <NetworkSection />
```

- [x] **Step 4: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit with no errors.

Check the browser: "One group, two countries" with 4 rows (Negombo hospital, LA medical group, school wellness, telemedicine). Resize to phone width and confirm rows stack to 3 lines each.

- [x] **Step 5: Commit**

```bash
git add src/features/home
git commit -m "Add network section"
```

---

### Task 16: Media section

**Files:**
- Create: `src/features/home/data/media.ts`
- Create: `src/features/home/components/MediaSection.tsx`
- Modify: `src/features/home/components/HomePage.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 3).
- Produces: `mediaItems: MediaItem[]` from `../data/media`; `MediaSection(): JSX.Element`, wired after `NetworkSection`. Declares `id="media"`.

- [x] **Step 1: Create `src/features/home/data/media.ts`**

```ts
export type MediaItem = {
  date: string;
  title: string;
  tag: string;
};

export const mediaItems: MediaItem[] = [
  { date: "12 Jul 2026", title: "Digital X-ray suite opens to outpatients", tag: "News" },
  { date: "28 May 2026", title: "5,000 students screened in the school wellness drive", tag: "Report" },
  { date: "09 Mar 2026", title: "Inside a hospital cleaned every two hours", tag: "Press" },
  { date: "21 Jan 2026", title: "New surgical wing: opening gallery", tag: "Gallery" },
];
```

- [x] **Step 2: Create `src/features/home/components/MediaSection.tsx`**

```tsx
import { Reveal } from "./Reveal";
import { mediaItems } from "../data/media";

export function MediaSection() {
  return (
    <section id="media" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              11 / Media
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              News, press
              <br />
              &amp; gallery
            </h2>
          </div>
          <a href="#media" className="inline-flex items-center gap-2.5 border border-[var(--home-hairline)] px-5.5 py-3.5 text-[14.5px] font-bold text-[var(--home-heading)]">
            Media enquiries <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </Reveal>
      <Reveal className="mt-11.5 border-t border-[var(--home-hairline)]">
        {mediaItems.map((item) => (
          <a
            key={item.title}
            href="#media"
            className="grid grid-cols-1 gap-3 border-b border-[var(--home-hairline)] py-6.5 text-inherit min-[640px]:grid-cols-[0.5fr_1.6fr_0.9fr] min-[640px]:items-baseline min-[640px]:gap-6"
          >
            <span className="text-[13.5px] font-bold tracking-[0.1em] text-[var(--home-muted)] tabular-nums">
              {item.date}
            </span>
            <span className="font-display text-[clamp(20px,2.1vw,30px)] leading-[1.1] font-semibold tracking-[-0.025em] text-[var(--home-heading)]">
              {item.title}
            </span>
            <span className="text-[13px] font-bold tracking-[0.14em] text-[var(--home-accent)] uppercase">
              {item.tag}
            </span>
          </a>
        ))}
      </Reveal>
    </section>
  );
}
```

- [x] **Step 3: Wire it into `HomePage.tsx`**

```tsx
import { MediaSection } from "./MediaSection";
```

```tsx
          <NetworkSection />
          <MediaSection />
```

- [x] **Step 4: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit with no errors.

Check the browser: "News, press & gallery" with a "Media enquiries" button, then 4 dated rows. Resize to phone width and confirm each row stacks to 3 lines.

- [x] **Step 5: Commit**

```bash
git add src/features/home
git commit -m "Add media section"
```

---

### Task 17: Careers section

**Files:**
- Create: `src/features/home/data/careers.ts`
- Create: `src/features/home/components/CareersSection.tsx`
- Modify: `src/features/home/components/HomePage.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 3).
- Produces: `jobOpenings: JobOpening[]` from `../data/careers`; `CareersSection(): JSX.Element`, wired after `MediaSection`. Declares `id="career"`.

- [x] **Step 1: Create `src/features/home/data/careers.ts`**

```ts
export type JobOpening = {
  title: string;
  department: string;
  type: string;
};

export const jobOpenings: JobOpening[] = [
  { title: "Medical Officer, Emergency", department: "Emergency", type: "Full time" },
  { title: "Theatre Nurse", department: "Surgical", type: "Full time" },
  { title: "Pharmacist (night shift)", department: "Pharmacy", type: "Shift" },
  { title: "Medical Laboratory Technologist", department: "Laboratory", type: "Full time" },
  { title: "Radiographer, Digital X-ray", department: "Imaging", type: "Full time" },
];
```

- [x] **Step 2: Create `src/features/home/components/CareersSection.tsx`**

```tsx
import { Reveal } from "./Reveal";
import { jobOpenings } from "../data/careers";

export function CareersSection() {
  return (
    <section id="career" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <div className="grid gap-15 min-[900px]:grid-cols-[0.8fr_1.2fr] min-[900px]:items-start">
        <div className="min-[900px]:sticky min-[900px]:top-10">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            12 / Careers
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            Work where
            <br />
            the standard
            <br />
            is the point
          </h2>
          <p className="mt-5.5 max-w-[34ch] text-[16.5px] leading-[1.65] text-[var(--home-muted)]">
            Clinicians and staff trained to US protocol, supported by a group that invests in them.
          </p>
          <a href="mailto:careers@sjhospital.lk" className="mt-6 inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-5.5 py-3.5 text-[14.5px] font-bold text-[var(--home-on-accent)]">
            Send your CV <span aria-hidden>&rarr;</span>
          </a>
        </div>
        <Reveal className="border-t border-[var(--home-hairline)]">
          {jobOpenings.map((job) => (
            <a
              key={job.title}
              href="mailto:careers@sjhospital.lk"
              className="grid grid-cols-1 gap-2 border-b border-[var(--home-hairline)] py-6 text-inherit min-[640px]:grid-cols-[1.4fr_0.8fr_0.7fr_auto] min-[640px]:items-center min-[640px]:gap-5"
            >
              <span className="font-display text-[clamp(20px,2vw,29px)] leading-[1.08] font-semibold tracking-[-0.025em] text-[var(--home-heading)]">
                {job.title}
              </span>
              <span className="text-[14.5px] text-[var(--home-muted)]">{job.department}</span>
              <span className="text-[14.5px] text-[var(--home-muted)]">{job.type}</span>
              <span className="text-[20px] opacity-60 min-[640px]:justify-self-end" aria-hidden>
                &rarr;
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
```

- [x] **Step 3: Wire it into `HomePage.tsx`**

```tsx
import { CareersSection } from "./CareersSection";
```

```tsx
          <MediaSection />
          <CareersSection />
```

- [x] **Step 4: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit with no errors.

Check the browser: "Work where the standard is the point" on the left (sticky on desktop) with 5 job rows on the right, each a clickable `mailto:` row. Resize below 900px and confirm one column, no stickiness; below 640px confirm each row stacks to lines instead of a 4-column grid.

- [x] **Step 5: Commit**

```bash
git add src/features/home
git commit -m "Add careers section"
```

---

### Task 18: Testimonials section

**Files:**
- Create: `src/features/home/data/testimonials.ts`
- Create: `src/features/home/components/TestimonialsSection.tsx`
- Modify: `src/features/home/components/HomePage.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 3).
- Produces: `testimonials: Testimonial[]` from `../data/testimonials`; `TestimonialsSection(): JSX.Element` — `'use client'`, wired after `CareersSection`. Declares `id="voices"`.

- [x] **Step 1: Create `src/features/home/data/testimonials.ts`**

```ts
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "My reports were read by two doctors and sent the same day. They actually explained what was wrong with me.",
    name: "Michael Perera",
    role: "OPD patient",
  },
];
```

- [x] **Step 2: Create `src/features/home/components/TestimonialsSection.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { testimonials } from "../data/testimonials";

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  const goPrev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const goNext = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <section id="voices" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          13 / Patient voices
        </div>
        <blockquote className="font-display mt-6.5 max-w-[26ch] text-[clamp(27px,3.9vw,58px)] leading-[1.06] font-normal tracking-[-0.03em] text-[var(--home-heading)]" style={{ textWrap: "pretty" }}>
          {current.quote}
        </blockquote>
        <div className="mt-7 flex items-baseline gap-3.5">
          <span className="text-[15px] font-bold text-[var(--home-accent)]">{current.name}</span>
          <span className="text-[13.5px] tracking-[0.1em] text-[var(--home-muted)] uppercase">{current.role}</span>
        </div>
        <div className="mt-9 flex gap-2.5 border-t border-[var(--home-hairline)] pt-5.5">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={goPrev}
            disabled={testimonials.length < 2}
            className="flex h-13 w-13 items-center justify-center border border-[var(--home-hairline)] text-[18px] text-[var(--home-heading)] disabled:opacity-40"
          >
            <span aria-hidden>&larr;</span>
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={goNext}
            disabled={testimonials.length < 2}
            className="flex h-13 w-13 items-center justify-center border border-[var(--home-hairline)] text-[18px] text-[var(--home-heading)] disabled:opacity-40"
          >
            <span aria-hidden>&rarr;</span>
          </button>
          <span className="ml-auto self-center text-[13px] tracking-[0.14em] text-[var(--home-muted)] tabular-nums">
            {index + 1} / {testimonials.length}
          </span>
        </div>
      </Reveal>
    </section>
  );
}
```

- [x] **Step 3: Wire it into `HomePage.tsx`**

```tsx
import { TestimonialsSection } from "./TestimonialsSection";
```

```tsx
          <CareersSection />
          <TestimonialsSection />
```

- [x] **Step 4: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit with no errors.

Check the browser: the Michael Perera quote appears with prev/next arrow buttons and "1 / 1". Since there's only one testimonial, both arrow buttons should be disabled (dimmed) — confirm clicking them does nothing.

- [x] **Step 5: Commit**

```bash
git add src/features/home
git commit -m "Add testimonials section"
```

---

### Task 19: Contact CTA section

**Files:**
- Create: `src/features/home/components/ContactCtaSection.tsx`
- Modify: `src/features/home/components/HomePage.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: `ContactCtaSection(): JSX.Element`, wired after `TestimonialsSection` and before `HomeFooter`. Declares `id="book"`.

- [x] **Step 1: Create `src/features/home/components/ContactCtaSection.tsx`**

```tsx
export function ContactCtaSection() {
  return (
    <section id="book" className="mx-auto max-w-[1440px] px-5 pt-31.5 sm:px-8 lg:px-11">
      <div className="grid grid-cols-1 gap-px bg-white/16 min-[900px]:grid-cols-[1.15fr_0.85fr]">
        <div className="bg-[var(--home-accent)] p-9 py-13 text-[var(--home-on-accent)] sm:p-11">
          <div className="text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">14 / Come see us</div>
          <h2 className="font-display mt-4.5 text-[clamp(36px,5vw,72px)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase">
            Open right
            <br />
            now. Yes,
            <br />
            right now.
          </h2>
          <p className="mt-5.5 max-w-[40ch] text-[17px] leading-[1.6] opacity-85">
            229/10 St. Joseph Street, Negombo. Walk in, call us, or send a message on WhatsApp.
          </p>
        </div>
        <div className="flex flex-col bg-[var(--home-bg)]">
          <a
            href="#surgical"
            className="font-display flex flex-1 items-center justify-between gap-5 border-b border-white/16 px-8 py-7 text-[25px] font-semibold tracking-[-0.02em] text-white"
          >
            Surgical care <span aria-hidden>&rarr;</span>
          </a>
          <a
            href="#rooms"
            className="font-display flex flex-1 items-center justify-between gap-5 border-b border-white/16 px-8 py-7 text-[25px] font-semibold tracking-[-0.02em] text-white"
          >
            Reserve a room <span aria-hidden>&rarr;</span>
          </a>
          <a
            href="tel:+94117848484"
            className="font-display flex flex-1 items-center justify-between gap-5 px-8 py-7 text-[25px] font-semibold tracking-[-0.02em] text-white tabular-nums"
          >
            0117 84 84 84 <span aria-hidden>&#9742;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [x] **Step 2: Wire it into `HomePage.tsx`**

```tsx
import { ContactCtaSection } from "./ContactCtaSection";
```

```tsx
          <TestimonialsSection />
          <ContactCtaSection />
```

- [x] **Step 3: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit with no errors.

Check the browser: an accent-filled "Open right now. Yes, right now." panel appears alongside 3 stacked link rows (Surgical care, Reserve a room, phone number), directly above the footer. Resize below 900px and confirm it stacks to one column.

- [x] **Step 4: Commit**

```bash
git add src/features/home
git commit -m "Add contact CTA section"
```

---

### Task 20: Final integration and full verification

**Files:**
- Modify: `src/features/home/components/HomePage.tsx` (only if the running section order needs correcting — it shouldn't, since each prior task appended in the correct order)

**Interfaces:**
- Consumes: every section component from Tasks 5-19.
- Produces: nothing new — this task is verification only.

- [x] **Step 1: Confirm final section order in `src/features/home/components/HomePage.tsx`**

Read the file and confirm `<main>` renders, in this exact order: `HeroSection`, `WhoWeAreSection`, `ServicesBentoSection`, `SurgicalSection`, `FacilitiesSection`, `PharmacySection`, `RoomsSection`, `InternationalCareSection`, `HealthTipsSection`, `SchoolWellnessSection`, `NetworkSection`, `MediaSection`, `CareersSection`, `TestimonialsSection`, `ContactCtaSection` — followed by `HomeFooter` and `FloatingActions` outside `<main>`. Fix the order if any task's wiring step landed a section out of sequence.

- [x] **Step 2: Full type check, lint, and production build**

Run:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Expected: all three exit with no errors. `npm run build` in particular catches anything `next dev` tolerates but production doesn't (e.g. `next/image` misconfiguration).

- [x] **Step 3: Full manual QA pass in the browser**

With `npm run dev` running, on `http://localhost:3000`:

- Scroll the entire page top to bottom once. Every one of the 15 numbered sections (01 through 14, plus the hero and footer) should appear, in order, with no layout breakage or overlapping text.
- Click every nav link in the header (desktop) and confirm each scrolls smoothly to the matching section.
- Toggle the theme button and confirm every section re-themes correctly (backgrounds, text, borders) except the intentionally-always-dark sections (hero, surgical, rooms, pharmacy watermark, school wellness photo), which should stay dark in both modes.
- Reload the page after toggling to light mode and confirm it stays light (persisted via `localStorage`).
- At `375px` width (mobile): open the hamburger menu, confirm all 9 links + Book now work and the panel closes on click; confirm the FAB buttons shrink to icon-only; confirm every section's grid/columns collapse to a single readable column.
- At `768px` width (tablet): confirm the bento grid shows 2 columns, facilities grid shows 2 columns, and two-column split sections have started stacking (below 900px) or are still side-by-side (at/above 900px, check both sides of that boundary).
- At `1280px`+ width (desktop): confirm the full multi-column layout, sticky columns (Who we are, International care, Careers) pinning correctly while their sibling column scrolls.
- Enable OS-level "reduce motion" and reload: confirm the hero photo doesn't zoom, the ticker doesn't scroll (or scrolls but content is still fully readable via the duplicated `aria-hidden` track), the pulse dots don't animate, and all `Reveal`-wrapped content is visible immediately without a fade-in.
- Confirm every other route (`/about-us`, `/services`, `/career`, `/contact-us`, `/accommodation`, `/e-channeling`, `/privacy-policy`) still renders exactly as before, with the shared light-only `SiteHeader`/`SiteFooter`, completely unaffected by this work.

- [x] **Step 4: Commit**

If Step 1 required a fix:

```bash
git add src/features/home/components/HomePage.tsx
git commit -m "Fix home page section order"
```

If no fix was needed, there is nothing to commit for this task — it was verification only.
