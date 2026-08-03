# Interior Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add seven interior marketing pages (Contact Us, Career, About Us, Accommodation, Services, e-Channeling, Privacy Policy) to the St. Joseph Hospital Next.js site, with real content/images sourced from `sjhospital.lk`, a working Nodemailer contact form, and an interactive OpenStreetMap location map.

**Architecture:** Server Components for all static content, with small `'use client'` leaves only where genuinely needed: the contact form (`useActionState` around a Server Action), the Leaflet map, and the e-Channeling doctor-directory filter. One new shared `PageBanner` component reused as the top-of-page band on 6 of the 7 pages. Each page is a thin route in `src/app/(marketing)/` rendering a composed page component from its own `src/features/<name>/`, except Privacy Policy, which is pure static content colocated under its route folder.

**Tech Stack:** Next.js 16.2.11 (App Router), React 19.2.4, TypeScript strict, Tailwind CSS v4, `next/image`, plus three new dependencies: `nodemailer` (email), `zod` (input validation), `leaflet` (map).

## Global Constraints

- Follow `CLAUDE.md`'s feature-based folder architecture: routing-only `app/`, real content in `src/features/<domain>/`, shared chrome in `src/components/layout/`, shared primitives in `src/components/ui/`, config in `src/config/`. Cross-feature use goes through a feature's `index.ts` (e.g. Accommodation imports `ContactForm`/`ContactInfo` from `@/features/contact`, never from `@/features/contact/components/...` directly).
- Import via the `@/*` alias. No `../../..` relative chains.
- Server Components by default. `'use client'` only on the specific leaf that needs it.
- No `tailwind.config.js` — this project's theme tokens already exist in `src/app/globals.css`'s `@theme inline` block (`primary`, `primary-dark`, `primary-mid`, `accent`, `accent-dark`, `surface`, `ink`, `muted`, `font-heading`). Nothing in this plan needs new theme tokens or new global CSS.
- No em dashes (`—`) anywhere in shipped copy — use a comma or period instead. All copy in this plan already follows that rule.
- Real photos for About, Career, Accommodation, and e-Channeling are already downloaded and committed at the paths listed in each task (see the `f7e61ff` "Prepare real image assets" commit) — do not re-fetch them. Contact, Services, and Accommodation's page banner reuse existing homepage images (`/images/welcome.jpg`, `/images/doctors.jpg`, `/images/rooms/wards-1.jpg`).
- The e-Channeling doctor dataset in Task 12 reproduces all 71 doctors and their Calendly links exactly as they appear on the live site, including known name/link mismatches (flagged via a `linkMismatch` field per the 2026-08-04 design decision) — do not "fix" any of the flagged links.
- Never commit real SMTP credentials. `.env.local.example` (Task 1) documents variable names only; real values go in a local, gitignored `.env.local`.
- `npx tsc --noEmit` and `npm run lint` must stay clean after every task (no `any`, no unused imports/vars).
- No automated tests are configured or requested (`CLAUDE.md`: "No test runner is configured yet"). Each task's verification is `tsc`/`lint` plus a manual check in the browser. `npm run build` runs once, in the final task.

Start the dev server once, before Task 1, and leave it running for the rest of implementation:

```bash
npm run dev
```

Then open `http://localhost:3000` and keep the tab open; Fast Refresh updates it as files change.

---

### Task 1: Dependencies and environment scaffolding

**Files:**
- Modify: `package.json` (via `npm install`)
- Modify: `.gitignore`
- Create: `.env.local.example`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: `nodemailer`, `zod`, `leaflet`, `server-only` available as imports for every later task; documented env var names (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `CONTACT_TO_EMAILS`).

- [ ] **Step 1: Install runtime and type dependencies**

```bash
npm install nodemailer zod leaflet server-only
npm install -D @types/nodemailer @types/leaflet
```

- [ ] **Step 2: Add a gitignore exception for the env template**

The repo's `.gitignore` already has a blanket `.env*` ignore rule (which would also swallow the template file this task creates). Open `.gitignore` and find:

```
# env files (can opt-in for committing if needed)
.env*
```

Change it to:

```
# env files (can opt-in for committing if needed)
.env*
!.env.local.example
```

- [ ] **Step 3: Create `.env.local.example`**

```
# SMTP credentials for the contact form (sent via Nodemailer). Copy this file
# to .env.local and fill in real values there — .env.local is gitignored and
# must never be committed.
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM="St. Joseph Hospital Website <no-reply@sjhospital.lk>"

# Comma-separated recipients for contact form submissions.
CONTACT_TO_EMAILS=sanjula.rajapaksha@ktdoctor.com,sanjulablockchain@gmail.com
```

- [ ] **Step 4: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
git status
```

Expected: `tsc`/`lint` exit clean (no source files changed yet, so this just confirms the install didn't break anything). `git status` shows `.env.local.example` as an untracked file ready to be added (confirming the gitignore exception worked) and does **not** list any `.env.local` (there isn't one yet, and if you create one locally to test SMTP later, it must never appear here).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json .gitignore .env.local.example
git commit -m "Add nodemailer, zod, leaflet dependencies and env template for interior pages"
```

---

### Task 2: PageBanner shared component

**Files:**
- Create: `src/components/layout/PageBanner.tsx`

**Interfaces:**
- Consumes: nothing new (plain Server Component using `next/image`).
- Produces: `PageBanner({ title, subtitle?, imageSrc?, imageAlt? }): JSX.Element` from `@/components/layout/PageBanner`, used by every interior page's composition in Tasks 7-12.

- [ ] **Step 1: Create `src/components/layout/PageBanner.tsx`**

```tsx
import Image from "next/image";

type PageBannerProps = {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function PageBanner({ title, subtitle, imageSrc, imageAlt }: PageBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-mid">
      {imageSrc && (
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            fill
            sizes="100vw"
            className="object-cover opacity-25"
            priority
          />
        </div>
      )}
      <div className="relative mx-auto max-w-[1240px] px-6 py-16 sm:py-20">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit clean. Nothing renders yet (no page uses `PageBanner` until Task 7 onward).

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/PageBanner.tsx
git commit -m "Add shared PageBanner component for interior pages"
```

---

### Task 3: Navigation and header/footer link updates

**Files:**
- Modify: `src/config/navigation.ts`
- Modify: `src/components/layout/SiteHeader.tsx`
- Modify: `src/components/layout/SiteFooter.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: nav items and header/footer CTAs now point at the internal routes this plan creates in Tasks 7-13, instead of homepage anchors or the external live site.

- [ ] **Step 1: Update `src/config/navigation.ts`**

Replace the `primaryNavigation` array:

```ts
export const primaryNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Medical Services", href: "/services" },
  { label: "Accommodation", href: "/accommodation" },
  { label: "About Us", href: "/about-us" },
  { label: "Career", href: "/career" },
  { label: "Contact Us", href: "/contact-us" },
];
```

- [ ] **Step 2: Update `src/components/layout/SiteHeader.tsx`**

Change both occurrences of:

```tsx
href="https://sjhospital.lk/e-channeling/"
```

to:

```tsx
href="/e-channeling"
```

(one in the top contact bar's "Book Appointment" `Link`, one in the desktop nav's "Appointments" `Link`.) Change:

```tsx
href="https://sjhospital.lk/accommodation/"
```

to:

```tsx
href="/accommodation"
```

(the "Inpatient Room Booking" `Link`).

- [ ] **Step 3: Update `src/components/layout/MobileNav.tsx`**

Change the mobile menu's "Appointments" link:

```tsx
<Link
  href="https://sjhospital.lk/e-channeling/"
```

to:

```tsx
<Link
  href="/e-channeling"
```

- [ ] **Step 4: Update `src/components/layout/SiteFooter.tsx`**

Change:

```tsx
<Link href="https://sjhospital.lk/privacy-policy/" className="hover:text-white">
  Privacy Policy
</Link>
```

to:

```tsx
<Link href="/privacy-policy" className="hover:text-white">
  Privacy Policy
</Link>
```

Leave the "Gallery" link and the footer's `id="contact"` attribute unchanged (no gallery page is in scope; the id is a harmless, no-longer-used-by-nav anchor target).

- [ ] **Step 5: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit clean.

In the browser, hover the nav items: "Medical Services", "Accommodation", "About Us", "Career", and "Contact Us" now show internal paths (`/services`, `/accommodation`, etc.) instead of `#anchor` or external URLs (clicking them 404s until Tasks 7-13 add the routes — that's expected at this point in the plan). Confirm "Book Appointment", "Appointments", and "Inpatient Room Booking" in the header, and the mobile menu's "Appointments" link, all point at internal paths too.

- [ ] **Step 6: Commit**

```bash
git add src/config/navigation.ts src/components/layout/SiteHeader.tsx src/components/layout/SiteFooter.tsx src/components/layout/MobileNav.tsx
git commit -m "Point nav and header/footer CTAs at new internal interior-page routes"
```

---

### Task 4: Contact feature - schema, mailer, and server action

**Files:**
- Create: `src/features/contact/schemas.ts`
- Create: `src/features/contact/lib/mailer.ts`
- Create: `src/features/contact/actions/sendContactMessage.ts`

**Interfaces:**
- Consumes: `zod`, `nodemailer`, `server-only` (Task 1).
- Produces: `contactMessageSchema` (Zod schema) and `type ContactMessageInput` from `./schemas`; `sendContactEmail(input: ContactMessageInput): Promise<void>` from `./lib/mailer`; `sendContactMessage(prevState: ContactFormState, formData: FormData): Promise<ContactFormState>`, `initialContactFormState: ContactFormState`, and `type ContactFormState` from `./actions/sendContactMessage` — used by `ContactForm` in Task 5.

- [ ] **Step 1: Create `src/features/contact/schemas.ts`**

```ts
import { z } from "zod";

export const contactMessageSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  message: z.string().trim().optional(),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
```

- [ ] **Step 2: Create `src/features/contact/lib/mailer.ts`**

```ts
import "server-only";
import nodemailer from "nodemailer";
import type { ContactMessageInput } from "../schemas";

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "SMTP is not configured: set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in .env.local"
    );
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function sendContactEmail(input: ContactMessageInput) {
  const { SMTP_FROM, CONTACT_TO_EMAILS } = process.env;

  if (!SMTP_FROM || !CONTACT_TO_EMAILS) {
    throw new Error("Missing SMTP_FROM or CONTACT_TO_EMAILS in .env.local");
  }

  const transporter = getTransporter();

  await transporter.sendMail({
    from: SMTP_FROM,
    to: CONTACT_TO_EMAILS.split(",").map((address) => address.trim()),
    replyTo: input.email,
    subject: `New website message from ${input.firstName} ${input.lastName}`,
    text: [
      `Name: ${input.firstName} ${input.lastName}`,
      `Email: ${input.email}`,
      "",
      input.message?.trim() || "(no message provided)",
    ].join("\n"),
  });
}
```

- [ ] **Step 3: Create `src/features/contact/actions/sendContactMessage.ts`**

```ts
"use server";

import { contactMessageSchema } from "../schemas";
import { sendContactEmail } from "../lib/mailer";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"firstName" | "lastName" | "email" | "message", string[]>>;
};

export const initialContactFormState: ContactFormState = {
  status: "idle",
  message: "",
};

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validated = contactMessageSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validated.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    await sendContactEmail(validated.data);
  } catch (error) {
    console.error("Failed to send contact message:", error);
    return {
      status: "error",
      message: "We couldn't send your message right now. Please call us at 0117 84 84 84 instead.",
    };
  }

  return {
    status: "success",
    message: "Thanks for reaching out. We'll get back to you within one business day.",
  };
}
```

- [ ] **Step 4: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit clean. Nothing renders yet, these files have no UI consumer until Task 5.

- [ ] **Step 5: Commit**

```bash
git add src/features/contact/schemas.ts src/features/contact/lib src/features/contact/actions
git commit -m "Add contact form schema, Nodemailer transport, and Server Action"
```

---

### Task 5: Contact feature - ContactForm and ContactInfo components

**Files:**
- Create: `src/features/contact/components/ContactForm.tsx`
- Create: `src/features/contact/components/ContactInfo.tsx`

**Interfaces:**
- Consumes: `sendContactMessage`, `initialContactFormState`, `type ContactFormState` from `../actions/sendContactMessage` (Task 4); `PhoneIcon`, `SmartphoneIcon`, `MailIcon` from `@/components/ui/Icons`.
- Produces: `ContactForm(): JSX.Element`, `ContactInfo(): JSX.Element`, both used in Task 7 and reused directly by Accommodation in Task 10.

- [ ] **Step 1: Create `src/features/contact/components/ContactForm.tsx`**

```tsx
"use client";

import { useActionState } from "react";
import { sendContactMessage, initialContactFormState } from "../actions/sendContactMessage";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialContactFormState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-sm font-semibold text-ink">
            First Name*
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
          />
          {state.fieldErrors?.firstName && (
            <p className="mt-1 text-xs font-semibold text-red-600">{state.fieldErrors.firstName[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-sm font-semibold text-ink">
            Last Name*
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
          />
          {state.fieldErrors?.lastName && (
            <p className="mt-1 text-xs font-semibold text-red-600">{state.fieldErrors.lastName[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
          Email*
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
        />
        {state.fieldErrors?.email && (
          <p className="mt-1 text-xs font-semibold text-red-600">{state.fieldErrors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">
          Comment or Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-primary px-7 py-3 text-sm font-bold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send a Message"}
      </button>

      {state.status !== "idle" && (
        <p
          role="status"
          aria-live="polite"
          className={`text-sm font-semibold ${state.status === "success" ? "text-green-700" : "text-red-600"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
```

- [ ] **Step 2: Create `src/features/contact/components/ContactInfo.tsx`**

```tsx
import { PhoneIcon, SmartphoneIcon, MailIcon } from "@/components/ui/Icons";

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-0.5 shrink-0 text-accent-dark"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <div>
          <p className="text-sm font-bold text-ink">Location</p>
          <p className="text-sm text-muted">229/10 St. Joseph Street, Negombo</p>
        </div>
      </div>

      <div className="flex gap-3">
        <PhoneIcon className="mt-0.5 shrink-0 text-accent-dark" />
        <div>
          <p className="text-sm font-bold text-ink">Call Us</p>
          <a href="tel:+94117848484" className="block text-sm text-muted hover:text-primary">
            0117 84 84 84
          </a>
        </div>
      </div>

      <div className="flex gap-3">
        <SmartphoneIcon className="mt-0.5 shrink-0 text-accent-dark" />
        <div>
          <p className="text-sm font-bold text-ink">WhatsApp / Mobile</p>
          <a href="tel:+94742223334" className="block text-sm text-muted hover:text-primary">
            074 222 333 4
          </a>
        </div>
      </div>

      <div className="flex gap-3">
        <MailIcon className="mt-0.5 shrink-0 text-accent-dark" />
        <div>
          <p className="text-sm font-bold text-ink">Email</p>
          <a href="mailto:info@sjhospital.lk" className="block text-sm text-muted hover:text-primary">
            info@sjhospital.lk
          </a>
          <a
            href="mailto:appointments@sjhospital.lk"
            className="block text-sm text-muted hover:text-primary"
          >
            appointments@sjhospital.lk
          </a>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit clean. Neither component has a page host yet (Task 7 wires `ContactForm` in), so there is nothing to check in the browser for this task.

- [ ] **Step 4: Commit**

```bash
git add src/features/contact/components/ContactForm.tsx src/features/contact/components/ContactInfo.tsx
git commit -m "Add ContactForm and ContactInfo components"
```

---

### Task 6: Contact feature - LocationMap (Leaflet)

**Files:**
- Create: `src/features/contact/components/LocationMap.tsx`

**Interfaces:**
- Consumes: `leaflet` (Task 1).
- Produces: `LocationMap(): JSX.Element`, used in Task 7.

- [ ] **Step 1: Create `src/features/contact/components/LocationMap.tsx`**

```tsx
"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";

const HOSPITAL_COORDS: [number, number] = [7.206699127328975, 79.8453343846586];

export function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !container) return;

      const map = L.map(container, {
        center: HOSPITAL_COORDS,
        zoom: 16,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const marker = L.divIcon({
        className: "",
        html: '<div style="width:34px;height:34px;border-radius:9999px;background:#4A2A82;border:3px solid #33B4E5;box-shadow:0 6px 16px rgba(74,42,130,0.45);"></div>',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      L.marker(HOSPITAL_COORDS, { icon: marker })
        .addTo(map)
        .bindPopup("St. Joseph Hospital Negombo");

      mapRef.current = map;
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Map showing St. Joseph Hospital Negombo location"
      className="h-80 w-full overflow-hidden rounded-2xl border border-ink/10"
    />
  );
}
```

- [ ] **Step 2: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit clean. No page host yet (Task 7 wires this in).

- [ ] **Step 3: Commit**

```bash
git add src/features/contact/components/LocationMap.tsx
git commit -m "Add Leaflet-based LocationMap component"
```

---

### Task 7: Contact Us page

**Files:**
- Create: `src/features/contact/components/ContactPageContent.tsx`
- Create: `src/features/contact/index.ts`
- Create: `src/app/(marketing)/contact-us/page.tsx`

**Interfaces:**
- Consumes: `PageBanner` (Task 2); `ContactForm`, `ContactInfo` (Task 5); `LocationMap` (Task 6).
- Produces: `ContactPageContent(): JSX.Element` and re-exports of `ContactForm`/`ContactInfo`/`LocationMap` from `@/features/contact` (the feature's public surface, consumed cross-feature by Accommodation in Task 10). The `/contact-us` route goes live.

- [ ] **Step 1: Create `src/features/contact/components/ContactPageContent.tsx`**

```tsx
import { PageBanner } from "@/components/layout/PageBanner";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";
import { LocationMap } from "./LocationMap";

export function ContactPageContent() {
  return (
    <>
      <PageBanner
        title="Get In Touch"
        subtitle="We will contact you within one business day."
        imageSrc="/images/welcome.jpg"
        imageAlt="Reception desk at St. Joseph Hospital Negombo"
      />

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <ContactInfo />

          <div className="flex flex-col gap-10">
            <div className="rounded-[22px] border border-ink/10 bg-surface p-7 sm:p-8">
              <h2 className="mb-1 font-heading text-2xl font-extrabold text-ink">Drop Us a Line</h2>
              <p className="mb-6 text-sm text-muted">We will contact you within one business day.</p>
              <ContactForm />
            </div>

            <LocationMap />
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Create `src/features/contact/index.ts`**

```ts
export { ContactForm } from "./components/ContactForm";
export { ContactInfo } from "./components/ContactInfo";
export { LocationMap } from "./components/LocationMap";
export { ContactPageContent } from "./components/ContactPageContent";
```

- [ ] **Step 3: Create `src/app/(marketing)/contact-us/page.tsx`**

```tsx
import type { Metadata } from "next";
import { ContactPageContent } from "@/features/contact";

export const metadata: Metadata = {
  title: "Contact Us | St. Joseph Hospital Negombo",
  description:
    "Get in touch with St. Joseph Hospital Negombo: address, phone, email, and a contact form.",
};

export default function Page() {
  return <ContactPageContent />;
}
```

- [ ] **Step 4: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit clean.

In the browser, go to `http://localhost:3000/contact-us`. Confirm: the purple banner reads "Get In Touch"; below it, contact info (location/phone/WhatsApp/email) sits beside the "Drop Us a Line" form; below the form, a Leaflet map renders with a purple/cyan marker over Negombo, roughly at the hospital's real location. Submit the form with an empty first name and confirm an inline "First name is required" error appears without a page reload. Fill in all fields and submit: if `.env.local` has no real SMTP credentials yet, expect the friendly fallback message ("We couldn't send your message right now...") rather than a crash or blank error, confirming the try/catch in `sendContactMessage` works. Resize to phone width and confirm the two-column layout stacks.

- [ ] **Step 5: Commit**

```bash
git add src/features/contact/components/ContactPageContent.tsx src/features/contact/index.ts src/app/\(marketing\)/contact-us
git commit -m "Add Contact Us page"
```

---

### Task 8: About Us page

**Files:**
- Create: `src/features/about/components/Intro.tsx`
- Create: `src/features/about/components/WhyDifferent.tsx`
- Create: `src/features/about/components/MissionVision.tsx`
- Create: `src/features/about/components/ParentGroup.tsx`
- Create: `src/features/about/index.tsx`
- Create: `src/app/(marketing)/about-us/page.tsx`

**Interfaces:**
- Consumes: `PageBanner` (Task 2); `RevealOnScroll` from `@/components/ui/RevealOnScroll`. Uses `/images/about-facility.jpg` (2162x1441), `/images/kids-teens-logo.png` (446x436), `/images/partners/partner-{1..5}.png` — all already committed.
- Produces: `AboutPage(): JSX.Element` from `@/features/about`. The `/about-us` route goes live.

- [ ] **Step 1: Create `src/features/about/components/Intro.tsx`**

```tsx
import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const paragraphs = [
  "St. Joseph Hospital in Negombo delivers US standard, high-quality healthcare to Sri Lankans at affordable prices. Our hospital was recently refurbished with a USD 1 million investment led by Kids & Teens Pediatric Medical Group (Los Angeles) and Asia Corp.",
  "We are the first hospital in Negombo to offer corporate insurance acceptance at our OPD, ensuring convenience and accessibility to healthcare for the local community.",
  "Our modern and advanced laboratory is known to be one of the best in Sri Lanka. It has the latest high-quality equipment. The digital X-ray machine at the hospital is one of the latest in the industry to give you accurate information for the right diagnosis.",
  "We also provide digital file access for our patients' convenience. Visit us today to experience international standard healthcare here in Sri Lanka.",
];

export function Intro() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <RevealOnScroll>
          <div className="space-y-4 text-base leading-relaxed text-ink/75">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll
          delayMs={120}
          className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(20,10,50,0.35)]"
        >
          <Image
            src="/images/about-facility.jpg"
            alt="St. Joseph Hospital Negombo facility"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/features/about/components/WhyDifferent.tsx`**

```tsx
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Reason = { title: string; description: string };

const reasons: Reason[] = [
  {
    title: "Managed and Operated by USA",
    description: "International standards with American healthcare management expertise.",
  },
  {
    title: "Affordable US Healthcare Standards",
    description: "High-quality healthcare at accessible prices for Sri Lankan families.",
  },
  {
    title: "Advanced Technology",
    description: "State-of-the-art equipment including digital X-ray and modern laboratory.",
  },
  {
    title: "Commitment to Safety and Hygiene",
    description: "Maintaining the highest standards of cleanliness and patient safety.",
  },
  {
    title: "Convenient Location and Comprehensive Services",
    description: "Easily accessible location in Negombo with full-service healthcare.",
  },
  {
    title: "Evidence Based Billing",
    description: "Transparent and accurate billing practices with digital file access.",
  },
];

export function WhyDifferent() {
  return (
    <section className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-[1240px]">
        <RevealOnScroll className="mx-auto mb-13 max-w-xl text-center">
          <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-accent-dark">
            Why Choose Us
          </p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            What Makes Us Different
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <RevealOnScroll key={reason.title} delayMs={(index % 3) * 80}>
              <div className="h-full rounded-[22px] border border-ink/10 bg-white p-7">
                <h3 className="mb-2.5 font-heading text-[17px] font-bold text-ink">{reason.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{reason.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `src/features/about/components/MissionVision.tsx`**

```tsx
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function MissionVision() {
  return (
    <section className="bg-white px-6 pb-20">
      <div className="mx-auto grid max-w-[1240px] gap-6 sm:grid-cols-2">
        <RevealOnScroll>
          <div className="h-full rounded-[22px] bg-gradient-to-br from-primary to-primary-mid p-8 text-white">
            <h3 className="mb-3 font-heading text-xl font-extrabold">Our Mission</h3>
            <p className="text-sm leading-relaxed text-white/85">
              Our aim is to provide our community with complete healthcare solutions that combine
              advanced technology with patient-centered care, empowering them to take charge of their
              health.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={100}>
          <div className="h-full rounded-[22px] border border-ink/10 bg-surface p-8">
            <h3 className="mb-3 font-heading text-xl font-extrabold text-ink">Our Vision</h3>
            <p className="text-sm leading-relaxed text-muted">
              We aim to make the highest quality healthcare available to everyone in Sri Lanka
              through collective efforts.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `src/features/about/components/ParentGroup.tsx`**

```tsx
import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const partnerLogos = [
  "/images/partners/partner-1.png",
  "/images/partners/partner-2.png",
  "/images/partners/partner-3.png",
  "/images/partners/partner-4.png",
  "/images/partners/partner-5.png",
];

export function ParentGroup() {
  return (
    <section className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-[1240px]">
        <RevealOnScroll className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center">
          <Image
            src="/images/kids-teens-logo.png"
            alt="Kids & Teens Medical Group logo"
            width={223}
            height={218}
            className="h-28 w-auto"
          />
          <div>
            <h2 className="mb-4 font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              About Kids &amp; Teens Medical Group
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-ink/75">
              Kids &amp; Teens Medical Group, a leading pediatric care provider in Southern
              California, is dedicated to delivering compassionate and comprehensive healthcare
              services for children and adolescents. With a team of over 50 board-certified
              pediatricians, they offer a wide range of services, including primary care, urgent
              care, telehealth consultations, and after-hours care, ensuring that young patients
              receive timely and personalized medical attention.
            </p>
            <p className="text-sm leading-relaxed text-ink/75">
              This strategic expansion reflects Kids &amp; Teens Medical Group&apos;s commitment to
              extending their expertise beyond the United States, bringing their patient-centric
              approach and high-quality pediatric care to families in Sri Lanka. The revitalized St.
              Joseph Hospital is set to become a cornerstone of pediatric healthcare in Negombo,
              offering state-of-the-art medical services and facilities for children and adolescents.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-10">
          {partnerLogos.map((src) => (
            <Image
              key={src}
              src={src}
              alt="Partner organization logo"
              width={140}
              height={70}
              className="h-12 w-auto object-contain opacity-80 grayscale"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create `src/features/about/index.tsx`**

```tsx
import { PageBanner } from "@/components/layout/PageBanner";
import { Intro } from "./components/Intro";
import { WhyDifferent } from "./components/WhyDifferent";
import { MissionVision } from "./components/MissionVision";
import { ParentGroup } from "./components/ParentGroup";

export function AboutPage() {
  return (
    <>
      <PageBanner
        title="About Us"
        subtitle="US standard, high-quality healthcare, brought to Negombo."
        imageSrc="/images/about-facility.jpg"
        imageAlt="St. Joseph Hospital Negombo facility"
      />
      <Intro />
      <WhyDifferent />
      <MissionVision />
      <ParentGroup />
    </>
  );
}
```

- [ ] **Step 6: Create `src/app/(marketing)/about-us/page.tsx`**

```tsx
import type { Metadata } from "next";
import { AboutPage } from "@/features/about";

export const metadata: Metadata = {
  title: "About Us | St. Joseph Hospital Negombo",
  description:
    "US standard, high-quality healthcare in Negombo, Sri Lanka, managed by Kids & Teens Medical Group, USA.",
};

export default function Page() {
  return <AboutPage />;
}
```

- [ ] **Step 7: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit clean.

In the browser, go to `http://localhost:3000/about-us`. Confirm the banner reads "About Us" over the facility photo; below it, the 4-paragraph intro sits beside the facility photo; a 6-card "What Makes Us Different" grid follows (3 columns on desktop, 2 on tablet, 1 on phone); then Mission/Vision side-by-side cards; then the Kids & Teens Medical Group section with its logo and the 5 partner logos in a row. Click "About Us" in the header nav from any other page and confirm it navigates here (no more 404).

- [ ] **Step 8: Commit**

```bash
git add src/features/about src/app/\(marketing\)/about-us
git commit -m "Add About Us page"
```

---

### Task 9: Career page

**Files:**
- Create: `src/features/career/components/Intro.tsx`
- Create: `src/features/career/components/WhyWorkWithUs.tsx`
- Create: `src/features/career/components/OpenRoles.tsx`
- Create: `src/features/career/index.tsx`
- Create: `src/app/(marketing)/career/page.tsx`

**Interfaces:**
- Consumes: `PageBanner` (Task 2); `RevealOnScroll`. Uses `/images/career-staff.jpg` (980x653, already committed).
- Produces: `CareerPage(): JSX.Element` from `@/features/career`. The `/career` route goes live.

- [ ] **Step 1: Create `src/features/career/components/Intro.tsx`**

```tsx
import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const paragraphs = [
  "At St. Joseph Hospital Negombo, we believe that our people are the heart of our success. From our skilled medical professionals to our compassionate support staff, every team member plays a vital role in delivering exceptional care to our community.",
  "We are proudly operated and managed by California's largest pediatric group, Kids and Teens Medical Group (USA), bringing world-class expertise and global standards of care right here to Negombo. Joining us is not just a career move. It's an opportunity to work with internationally recognized leaders in healthcare and add exceptional value to your CV.",
  "We are always looking for passionate, qualified, and service-driven individuals to join our growing family. If you're guided by compassion, committed to excellence, and eager to contribute to world-class patient care, then St. Joseph Hospital is the place for you.",
  "Start your journey with us and discover a career where every role makes a meaningful difference.",
];

export function Intro() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <RevealOnScroll className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(20,10,50,0.35)]">
          <Image
            src="/images/career-staff.jpg"
            alt="St. Joseph Hospital Negombo staff"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </RevealOnScroll>

        <RevealOnScroll delayMs={120}>
          <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-accent-dark">
            Building a Healthier Tomorrow, Together
          </p>
          <div className="space-y-4 text-base leading-relaxed text-ink/75">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/features/career/components/WhyWorkWithUs.tsx`**

```tsx
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Benefit = { title: string; description: string };

const benefits: Benefit[] = [
  {
    title: "Supportive, Team-Based Culture",
    description: "Work alongside colleagues who value collaboration and mutual respect.",
  },
  {
    title: "Growth & Development",
    description: "Ongoing training and clear paths to advance your career.",
  },
  {
    title: "Modern Facilities & Technology",
    description: "Work with US-standard equipment, including digital X-ray and a modern laboratory.",
  },
  {
    title: "Competitive Pay & Health Benefits",
    description: "Fair compensation and health coverage for you and your family.",
  },
  {
    title: "Inclusive & Respectful Work Culture",
    description: "An environment where every team member is valued.",
  },
  {
    title: "Work-Life Balance",
    description: "Schedules that respect your time outside of work.",
  },
  {
    title: "Opportunities for All Roles",
    description: "From clinical to administrative, every role makes a real difference here.",
  },
];

export function WhyWorkWithUs() {
  return (
    <section className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-[1240px]">
        <RevealOnScroll className="mx-auto mb-13 max-w-xl text-center">
          <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-accent-dark">
            Why Work With Us
          </p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Experience a Career That&apos;s Fulfilling and Impactful
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <RevealOnScroll key={benefit.title} delayMs={(index % 3) * 80}>
              <div className="flex h-full items-start gap-3 rounded-[20px] border border-ink/10 bg-white p-6">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#33B4E5"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <div>
                  <h3 className="mb-1.5 font-heading text-[15px] font-bold text-ink">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{benefit.description}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `src/features/career/components/OpenRoles.tsx`**

The live site's two job flyers are stock photos with the job text baked into the JPG (one includes a discriminatory "Male candidates are preferred to apply" line that cannot be edited out of a raster image), so this reproduces the job text as structured HTML instead of embedding the flyer images, per the 2026-08-04 design decision.

```tsx
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Role = {
  title: string;
  summary: string;
  requirements: string[];
  location: string;
  apply: string;
};

const roles: Role[] = [
  {
    title: "Pharmacist",
    summary:
      "Dispense medication, advise patients on drug use, manage inventory, and collaborate with a multidisciplinary team to ensure high-quality patient care.",
    requirements: [
      "Bachelor's in Pharmacy",
      "Valid SLMC / pharmaceutical registration",
      "1-2 years of hospital or retail pharmacy experience preferred",
      "Strong interpersonal skills, team player",
    ],
    location: "St. Joseph Hospital, Negombo",
    apply:
      'Send your CV to hr@ktdoctor.com or contact us at 074 220 8704 for more information. Please include "Pharmacist" in the subject line.',
  },
  {
    title: "Business Development / Insurance Coordinator",
    summary:
      "Develop sales strategies, build partnerships with insurance companies, engage with potential clients, and coordinate insurance coverage to expand the insured client base.",
    requirements: [
      "2+ years of insurance sales, healthcare marketing, or business development experience",
      "Understanding of health insurance, claims, and the Sri Lanka healthcare landscape",
      "Self-motivated with strong record-keeping habits",
      "Fluent in English and Sinhala (Tamil a plus)",
    ],
    location: "Negombo",
    apply: "Send your CV to hr@ktdoctor.com. For inquiries, call 074 220 8704.",
  },
];

export function OpenRoles() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-[1240px]">
        <RevealOnScroll className="mx-auto mb-13 max-w-xl text-center">
          <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-accent-dark">
            We&apos;re Hiring
          </p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Open Roles
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {roles.map((role, index) => (
            <RevealOnScroll key={role.title} delayMs={index * 100}>
              <div className="h-full rounded-[22px] border border-ink/10 bg-surface p-7">
                <h3 className="mb-2 font-heading text-xl font-bold text-ink">{role.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted">{role.summary}</p>
                <ul className="mb-5 space-y-2">
                  {role.requirements.map((requirement) => (
                    <li key={requirement} className="flex items-start gap-2.5 text-sm text-ink/80">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#33B4E5"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-1 shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {requirement}
                    </li>
                  ))}
                </ul>
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-accent-dark">Location</p>
                <p className="mb-4 text-sm text-ink/80">{role.location}</p>
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-accent-dark">
                  How to Apply
                </p>
                <p className="text-sm text-ink/80">{role.apply}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `src/features/career/index.tsx`**

```tsx
import { PageBanner } from "@/components/layout/PageBanner";
import { Intro } from "./components/Intro";
import { WhyWorkWithUs } from "./components/WhyWorkWithUs";
import { OpenRoles } from "./components/OpenRoles";

export function CareerPage() {
  return (
    <>
      <PageBanner
        title="Join the Team That Heals With Purpose"
        subtitle="More than a career, it's a calling to care, serve, and make a difference in lives."
        imageSrc="/images/career-staff.jpg"
        imageAlt="St. Joseph Hospital Negombo staff"
      />
      <Intro />
      <WhyWorkWithUs />
      <OpenRoles />
    </>
  );
}
```

- [ ] **Step 5: Create `src/app/(marketing)/career/page.tsx`**

```tsx
import type { Metadata } from "next";
import { CareerPage } from "@/features/career";

export const metadata: Metadata = {
  title: "Career | St. Joseph Hospital Negombo",
  description: "Open roles at St. Joseph Hospital Negombo and why it's a great place to build your career.",
};

export default function Page() {
  return <CareerPage />;
}
```

- [ ] **Step 6: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit clean.

In the browser, go to `http://localhost:3000/career`. Confirm the banner headline "Join the Team That Heals With Purpose"; the staff photo + 4-paragraph intro; the 7-item "Why Work With Us" grid; and two "Open Roles" cards (Pharmacist, Business Development / Insurance Coordinator) each showing requirements, location, and how-to-apply as real text (no image with unreadable or discriminatory baked-in text). Click "Career" in the header nav and confirm it lands here instead of the old external site.

- [ ] **Step 7: Commit**

```bash
git add src/features/career src/app/\(marketing\)/career
git commit -m "Add Career page"
```

---

### Task 10: Accommodation page

**Files:**
- Create: `src/features/accommodation/components/RoomTypes.tsx`
- Create: `src/features/accommodation/components/SpecialtiesChecklist.tsx`
- Create: `src/features/accommodation/index.tsx`
- Create: `src/app/(marketing)/accommodation/page.tsx`

**Interfaces:**
- Consumes: `PageBanner` (Task 2); `RevealOnScroll`; `ContactForm`, `ContactInfo` from `@/features/contact` (Task 7) - cross-feature reuse, matching the live site's own contact form on this page. Uses `/images/rooms/{standard,deluxe,super-deluxe,wards}-{1,2}.jpg` (already committed).
- Produces: `AccommodationPage(): JSX.Element` from `@/features/accommodation`. The `/accommodation` route goes live.

- [ ] **Step 1: Create `src/features/accommodation/components/RoomTypes.tsx`**

```tsx
import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type RoomType = {
  id: string;
  name: string;
  description: string;
  amenities: string[];
  photos: { src: string; alt: string }[];
};

const roomTypes: RoomType[] = [
  {
    id: "standard",
    name: "Standard Rooms",
    description:
      "Our standard rooms offer essential comfort to suit your basics and function, backed by comprehensive medical support.",
    amenities: [
      "Hot & cool water",
      "TV",
      "Wi-Fi",
      "Bystander bed & chair",
      "Air conditioning",
      "Necessary medical support",
    ],
    photos: [
      { src: "/images/rooms/standard-1.jpg", alt: "Standard room at St. Joseph Hospital Negombo" },
      { src: "/images/rooms/standard-2.jpg", alt: "Standard room detail" },
    ],
  },
  {
    id: "deluxe",
    name: "Deluxe Rooms",
    description: "A larger space with added comfort for patients who want a bit more.",
    amenities: [
      "Hot & cool water",
      "TV",
      "Wi-Fi",
      "Bystander bed & sofa",
      "Air conditioning",
      "Pantry area with tea station",
      "Coffee table",
      "Hot water kettle",
    ],
    photos: [
      { src: "/images/rooms/deluxe-1.jpg", alt: "Deluxe room at St. Joseph Hospital Negombo" },
      { src: "/images/rooms/deluxe-2.jpg", alt: "Deluxe room detail" },
    ],
  },
  {
    id: "super-deluxe",
    name: "Super Deluxe Rooms",
    description: "Our most premium inpatient rooms, with dedicated steward service.",
    amenities: [
      "Hot & cool water",
      "TV",
      "Wi-Fi",
      "Bystander bed, sofa & chair",
      "Air conditioning",
      "Pantry with tea station",
      "Coffee table",
      "Hot water kettle",
      "Morning papers",
      "Separate steward service",
    ],
    photos: [
      { src: "/images/rooms/super-deluxe-1.jpg", alt: "Super Deluxe room at St. Joseph Hospital Negombo" },
      { src: "/images/rooms/super-deluxe-2.jpg", alt: "Super Deluxe room detail" },
    ],
  },
  {
    id: "wards",
    name: "Wards",
    description:
      "Comfortable shared wards with 3-bed and 2-bed options and bed separators for privacy. Upon discharge, patients may receive a complimentary fruit or chocolate basket. Discounts may also be available at the attending physician's discretion, and VIP service is available for those seeking enhanced care.",
    amenities: [
      "Air conditioning",
      "Hot & cool water",
      "Individual bystander beds & chairs",
      "TV",
      "3-bed & 2-bed options",
      "Common washroom",
      "Bed separators for privacy",
    ],
    photos: [
      { src: "/images/rooms/wards-1.jpg", alt: "Ward at St. Joseph Hospital Negombo" },
      { src: "/images/rooms/wards-2.jpg", alt: "Ward detail" },
    ],
  },
];

export function RoomTypes() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-[1240px]">
        <RevealOnScroll className="mx-auto mb-13 max-w-2xl text-center">
          <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-accent-dark">
            Our Inpatient Room Types
          </p>
          <h2 className="mb-3 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Rooms ranging from functional to premium
          </h2>
          <p className="text-base text-muted">
            Enjoy three daily meals with a choice of Eastern, Western, or Sri Lankan cuisine,
            including a diabetic menu option, plus tea or coffee with a snack.
          </p>
        </RevealOnScroll>

        <div className="flex flex-col gap-16">
          {roomTypes.map((room, index) => (
            <RevealOnScroll key={room.id} delayMs={index * 60}>
              <div id={room.id} className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                  <h3 className="mb-2.5 font-heading text-2xl font-bold text-ink">{room.name}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted">{room.description}</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2.5">
                    {room.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2 text-sm font-semibold text-ink">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#33B4E5"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`grid grid-cols-2 gap-3 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  {room.photos.map((photo) => (
                    <div key={photo.src} className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 1024px) 22vw, 45vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/features/accommodation/components/SpecialtiesChecklist.tsx`**

```tsx
const specialties = [
  "Comfortable & Spacious Rooms",
  "24/7 Medical Assistance",
  "Advanced Patient Monitoring",
  "Private & Semi-Private Options",
  "High-Quality Hygiene & Safety",
  "Personalized Meal Plans",
  "Family-Friendly Facilities",
  "Television & Wi-Fi Access",
  "Emergency Response System",
  "Pharmacy & Diagnostic Support",
];

export function SpecialtiesChecklist() {
  return (
    <div className="rounded-[22px] border border-ink/10 bg-surface p-7 sm:p-8">
      <h3 className="mb-5 font-heading text-xl font-bold text-ink">
        Specialties of Our Inpatient Rooms
      </h3>
      <ul className="space-y-3">
        {specialties.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-sm font-semibold text-ink">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#33B4E5"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/features/accommodation/index.tsx`**

```tsx
import { PageBanner } from "@/components/layout/PageBanner";
import { ContactForm, ContactInfo } from "@/features/contact";
import { RoomTypes } from "./components/RoomTypes";
import { SpecialtiesChecklist } from "./components/SpecialtiesChecklist";

export function AccommodationPage() {
  return (
    <>
      <PageBanner
        title="Experience US Standard Comfort and Facilities in Our Inpatient Rooms"
        subtitle="Starting at affordable rates."
        imageSrc="/images/rooms/wards-1.jpg"
        imageAlt="Inpatient room at St. Joseph Hospital Negombo"
      />
      <RoomTypes />

      <section className="bg-surface px-6 py-20">
        <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-2">
          <SpecialtiesChecklist />

          <div className="rounded-[22px] border border-ink/10 bg-white p-7 sm:p-8">
            <h3 className="mb-1 font-heading text-xl font-bold text-ink">Book an Inpatient Room</h3>
            <p className="mb-6 text-sm text-muted">
              Send us a message and our team will help you find the right room.
            </p>
            <ContactForm />
            <div className="mt-8 border-t border-ink/10 pt-6">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Create `src/app/(marketing)/accommodation/page.tsx`**

```tsx
import type { Metadata } from "next";
import { AccommodationPage } from "@/features/accommodation";

export const metadata: Metadata = {
  title: "Accommodation | St. Joseph Hospital Negombo",
  description:
    "Standard, Deluxe, Super Deluxe rooms, and Wards at St. Joseph Hospital Negombo, starting at affordable rates.",
};

export default function Page() {
  return <AccommodationPage />;
}
```

- [ ] **Step 5: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit clean.

In the browser, go to `http://localhost:3000/accommodation`. Confirm the banner; then 4 room-type sections (Standard, Deluxe, Super Deluxe, Wards), each alternating photo-left/photo-right on desktop with its own amenities list; then a 2-column section with the specialties checklist beside a "Book an Inpatient Room" card containing the same `ContactForm` used on `/contact-us`, plus `ContactInfo` below it. Confirm submitting this form behaves identically to the one on `/contact-us` (same validation, same success/error messaging), proving the reuse works. Resize to phone width and confirm each room section stacks (photo below text) and the specialties/form section becomes single-column.

- [ ] **Step 6: Commit**

```bash
git add src/features/accommodation src/app/\(marketing\)/accommodation
git commit -m "Add Accommodation page"
```

---

### Task 11: Services page

**Files:**
- Create: `src/features/services/components/DepartmentIcons.tsx`
- Create: `src/features/services/components/MainServicesGrid.tsx`
- Create: `src/features/services/components/DepartmentGrid.tsx`
- Create: `src/features/services/index.tsx`
- Create: `src/app/(marketing)/services/page.tsx`

**Interfaces:**
- Consumes: `PageBanner` (Task 2); `RevealOnScroll`. Uses `/images/doctors.jpg` (already committed from the homepage build).
- Produces: `AboutPage`-style `ServicesPage(): JSX.Element` from `@/features/services`. The `/services` route goes live. `DepartmentIcons.tsx` exports 21 icon components, each `({ className }: { className?: string }) => JSX.Element`, reused across the 29 main-service/department entries (mirroring how the live site itself reuses a handful of Font Awesome glyphs across departments).

- [ ] **Step 1: Create `src/features/services/components/DepartmentIcons.tsx`**

```tsx
type IconProps = { className?: string };

export function StethoscopeIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 3v5a3 3 0 0 0 6 0V3" />
      <path d="M11 12v3a5 5 0 0 0 5 5 5 5 0 0 0 5-5v-1" />
      <circle cx="19" cy="7" r="2" />
    </svg>
  );
}

export function HeartIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 21c-4.6-4-9-7.5-9-11.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 3.5C21 13.5 16.6 17 12 21Z" />
    </svg>
  );
}

export function ActivityIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="3 12 8 12 10 18 14 6 16 12 21 12" />
    </svg>
  );
}

export function HeartPulseIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 20s-6.5-4-8.5-8A4 4 0 0 1 12 8a4 4 0 0 1 8.5 4c-2 4-8.5 8-8.5 8Z" />
      <polyline points="7 12 9.5 12 11 9 13 15 14.5 12 17 12" />
    </svg>
  );
}

export function ScanIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 3v18M15 3v18" />
    </svg>
  );
}

export function FlaskIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 3h6v5l4 9a2 2 0 0 1-1.8 3H6.8A2 2 0 0 1 5 17l4-9V3Z" />
      <path d="M7.5 13h9" />
    </svg>
  );
}

export function PillIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  );
}

export function VenusIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="9" r="6" />
      <path d="M12 15v6M9 18h6" />
    </svg>
  );
}

export function SmileIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

export function EyeIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EarIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 4a5 5 0 0 1 4 8c-1 1-1 2-1 4a3 3 0 0 1-6 0v-2" />
      <path d="M9 8a4 4 0 0 0-2 7c1 1 1 2 2 2" />
    </svg>
  );
}

export function DropletIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13Z" />
    </svg>
  );
}

export function LeafIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 21c9 0 14-5 14-14V4h-3C11 4 5 9 5 18v3Z" />
      <path d="M5 21c4-4 6-8 6-13" />
    </svg>
  );
}

export function WheelchairIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="9" cy="17" r="4" />
      <path d="M9 13V6a2 2 0 0 1 2-2" />
      <path d="M9 13h6l3 6" />
      <circle cx="18" cy="5" r="1.5" />
    </svg>
  );
}

export function SyringeIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m18 2 4 4" />
      <path d="m17 7 3-3" />
      <path d="M19 5 8.5 15.5a2 2 0 0 0 0 2.8l.2.2a2 2 0 0 0 2.8 0L22 8" />
      <path d="m9 11 4 4" />
      <path d="m3 21 4-1 1-4" />
    </svg>
  );
}

export function MonitorIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m22 8-6 4 6 4V8Z" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}

export function CommentIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
      <line x1="8" y1="9" x2="16" y2="9" />
      <line x1="8" y1="13" x2="13" y2="13" />
    </svg>
  );
}

export function InfinityIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8.5 8a4 4 0 1 0 0 8c2.5 0 4-2 5.5-4 1.5 2 3 4 5.5 4a4 4 0 1 0 0-8c-2.5 0-4 2-5.5 4-1.5-2-3-4-5.5-4Z" />
    </svg>
  );
}

export function AmbulanceIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
      <line x1="6" y1="8" x2="6" y2="12" />
      <line x1="4" y1="10" x2="8" y2="10" />
    </svg>
  );
}

export function BoltIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

export function BedIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 9v11" />
      <path d="M22 20v-8a2 2 0 0 0-2-2H8v8" />
      <path d="M2 14h20" />
      <circle cx="6" cy="10" r="2" />
    </svg>
  );
}
```

- [ ] **Step 2: Create `src/features/services/components/MainServicesGrid.tsx`**

```tsx
import type { ReactNode } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { InfinityIcon, StethoscopeIcon, PillIcon, AmbulanceIcon, BoltIcon, BedIcon, FlaskIcon } from "./DepartmentIcons";

type MainService = { title: string; description: string; icon: ReactNode };

const mainServices: MainService[] = [
  {
    title: "Emergency",
    description: "Immediate medical attention available 24/7 for all critical conditions.",
    icon: <InfinityIcon className="text-white" />,
  },
  {
    title: "OPD",
    description: "Open 24/7, with free consultations from 7:00 AM to 12:00 PM daily.",
    icon: <StethoscopeIcon className="text-white" />,
  },
  {
    title: "Pharmacy",
    description: "Get authorized medicines from our 24/7 open pharmacy.",
    icon: <PillIcon className="text-white" />,
  },
  {
    title: "Home Visiting Services",
    description: "24/7 home consultations with 6 dedicated vehicles for patient care.",
    icon: <AmbulanceIcon className="text-white" />,
  },
  {
    title: "X-Ray Service",
    description: "Advanced digital X-ray diagnostics available 24/7 for fast, accurate results.",
    icon: <BoltIcon className="text-white" />,
  },
  {
    title: "Inpatient Rooms",
    description: "Comfortable standard, deluxe, and super deluxe rooms, bookable 24/7.",
    icon: <BedIcon className="text-white" />,
  },
  {
    title: "Laboratory Services",
    description: "Open 24/7, with discounts available.",
    icon: <FlaskIcon className="text-white" />,
  },
];

export function MainServicesGrid() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-[1240px]">
        <RevealOnScroll className="mx-auto mb-13 max-w-xl text-center">
          <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-accent-dark">
            Our Main Services
          </p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Comprehensive care, all in one place
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mainServices.map((service, index) => (
            <RevealOnScroll key={service.title} delayMs={(index % 4) * 70}>
              <div className="h-full rounded-[22px] border border-ink/10 bg-white p-7 transition hover:-translate-y-2 hover:shadow-[0_26px_48px_-24px_rgba(74,42,130,0.4)]">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-mid">
                  {service.icon}
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-ink">{service.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{service.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `src/features/services/components/DepartmentGrid.tsx`**

```tsx
import type { ReactNode } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import {
  StethoscopeIcon,
  HeartIcon,
  ActivityIcon,
  HeartPulseIcon,
  ScanIcon,
  FlaskIcon,
  PillIcon,
  VenusIcon,
  SmileIcon,
  EyeIcon,
  EarIcon,
  DropletIcon,
  LeafIcon,
  WheelchairIcon,
  CommentIcon,
  SyringeIcon,
  MonitorIcon,
} from "./DepartmentIcons";

type Department = { title: string; icon: ReactNode };
type DepartmentCategory = { name: string; items: Department[] };

const departmentCategories: DepartmentCategory[] = [
  {
    name: "Emergency and Critical Care",
    items: [
      { title: "General Physician", icon: <StethoscopeIcon /> },
      { title: "Pediatrics", icon: <HeartIcon /> },
      { title: "Orthopedic", icon: <ActivityIcon /> },
      { title: "Cardiology", icon: <HeartPulseIcon /> },
      { title: "Surgeon", icon: <StethoscopeIcon /> },
    ],
  },
  {
    name: "Diagnostic and Imaging Services",
    items: [
      { title: "ECG (Electrocardiogram)", icon: <ActivityIcon /> },
      { title: "CTG (Cardiotocography)", icon: <HeartPulseIcon /> },
      { title: "Scanning", icon: <ScanIcon /> },
      { title: "Clinical Laboratory", icon: <FlaskIcon /> },
      { title: "Pharmacy", icon: <PillIcon /> },
    ],
  },
  {
    name: "Specialized Medical Care",
    items: [
      { title: "Gynecology", icon: <VenusIcon /> },
      { title: "Dermatology", icon: <SmileIcon /> },
      { title: "Eye Specialist", icon: <EyeIcon /> },
      { title: "ENT (Ear, Nose, and Throat)", icon: <EarIcon /> },
      { title: "Diabetes Care", icon: <DropletIcon /> },
      { title: "Nutrition", icon: <LeafIcon /> },
      { title: "Rheumatology", icon: <WheelchairIcon /> },
    ],
  },
  {
    name: "Rehabilitation Services",
    items: [
      { title: "Physiotherapy", icon: <WheelchairIcon /> },
      { title: "Speech Therapy", icon: <CommentIcon /> },
      { title: "PTA (Physical Therapy Assistant)", icon: <WheelchairIcon /> },
      { title: "Vaccination Clinic", icon: <SyringeIcon /> },
      { title: "Telemedicine", icon: <MonitorIcon /> },
    ],
  },
];

export function DepartmentGrid() {
  return (
    <section className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-[1240px]">
        <RevealOnScroll className="mx-auto mb-13 max-w-xl text-center">
          <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-accent-dark">
            Departments
          </p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Specialties We Cover
          </h2>
        </RevealOnScroll>

        <div className="flex flex-col gap-12">
          {departmentCategories.map((category) => (
            <div key={category.name}>
              <h3 className="mb-5 font-heading text-lg font-bold text-ink">{category.name}</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {category.items.map((item) => (
                  <RevealOnScroll key={item.title}>
                    <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-ink/10 bg-white p-5 text-center">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF7FD] text-accent-dark">
                        {item.icon}
                      </div>
                      <p className="text-sm font-semibold text-ink">{item.title}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `src/features/services/index.tsx`**

```tsx
import { PageBanner } from "@/components/layout/PageBanner";
import { MainServicesGrid } from "./components/MainServicesGrid";
import { DepartmentGrid } from "./components/DepartmentGrid";

export function ServicesPage() {
  return (
    <>
      <PageBanner
        title="Receive USA Standard Healthcare at Affordable Prices Here in Sri Lanka"
        imageSrc="/images/doctors.jpg"
        imageAlt="Doctors at St. Joseph Hospital Negombo"
      />
      <MainServicesGrid />
      <DepartmentGrid />
    </>
  );
}
```

- [ ] **Step 5: Create `src/app/(marketing)/services/page.tsx`**

```tsx
import type { Metadata } from "next";
import { ServicesPage } from "@/features/services";

export const metadata: Metadata = {
  title: "Medical Services | St. Joseph Hospital Negombo",
  description:
    "USA standard healthcare services at St. Joseph Hospital Negombo: Emergency, OPD, Pharmacy, Home Visiting, X-Ray, Inpatient Rooms, Laboratory, and 22 specialized departments.",
};

export default function Page() {
  return <ServicesPage />;
}
```

- [ ] **Step 6: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit clean.

In the browser, go to `http://localhost:3000/services`. Confirm the banner over the doctors photo; the 7-card "Our Main Services" grid (4 columns desktop, 2 tablet, 1 phone); then four department category blocks ("Emergency and Critical Care", "Diagnostic and Imaging Services", "Specialized Medical Care", "Rehabilitation Services") each showing their icon chips (5 columns desktop, shrinking on smaller screens). Confirm every icon renders as a distinct visible shape (no broken/empty SVGs) and that reused icons (e.g. the stethoscope on both "General Physician" and "Surgeon") look intentional, not like a mistake. Click "Medical Services" in the header nav and confirm it lands here.

- [ ] **Step 7: Commit**

```bash
git add src/features/services src/app/\(marketing\)/services
git commit -m "Add Services page"
```

---

### Task 12: e-Channeling page

**Files:**
- Create: `src/features/e-channeling/data/doctors.ts`
- Create: `src/features/e-channeling/components/Intro.tsx`
- Create: `src/features/e-channeling/components/DoctorDirectory.tsx`
- Create: `src/features/e-channeling/index.tsx`
- Create: `src/app/(marketing)/e-channeling/page.tsx`

**Interfaces:**
- Consumes: `PageBanner` (Task 2); `RevealOnScroll`. Uses `/images/echanneling-hero.jpg` (already committed).
- Produces: `CALENDLY_BASE: string`, `type Doctor`, `doctors: Doctor[]` from `./data/doctors`; `DoctorDirectory({ doctors: Doctor[] }): JSX.Element`; `EChannelingPage(): JSX.Element` from `@/features/e-channeling`. The `/e-channeling` route goes live, and the header/footer "Book Appointment"/"Appointments"/mobile-menu links from Task 3 now resolve to a real page.

- [ ] **Step 1: Create `src/features/e-channeling/data/doctors.ts`**

This reproduces all 71 doctors from the live site's e-Channeling directory exactly, including the ~35 rows whose Calendly link slug names a different doctor than the row (a pre-existing bug on sjhospital.lk, flagged via `linkMismatch` rather than corrected, per the 2026-08-04 design decision).

```ts
export const CALENDLY_BASE = "https://calendly.com/appointments-sjhospital/";

export type Doctor = {
  name: string;
  specialization: string;
  calendlySlug: string;
  /**
   * True when the live site's Calendly link for this row points at a slug
   * naming a different doctor (a pre-existing sjhospital.lk data bug, not
   * introduced here). Reproduced as-is per the 2026-08-04 design decision;
   * St. Joseph Hospital's team should verify and correct the underlying
   * Calendly account assignments.
   */
  linkMismatch?: boolean;
};

export const doctors: Doctor[] = [
  // Gynecologist
  { name: "Dr. Athula Fernando", specialization: "Gynecologist", calendlySlug: "consultant-gynecologist-dr-m-i-k-naeem-clone", linkMismatch: true },
  { name: "Dr. Chandana Jayasundara", specialization: "Gynecologist", calendlySlug: "consultant-gynecologist-dr-chandanajayasundara" },
  { name: "Prof. H. M. Jagath N. Herath", specialization: "Gynecologist", calendlySlug: "consultant-gynecologist-prof-jagath-herath" },
  { name: "Dr. Prabath Randombage", specialization: "Gynecologist", calendlySlug: "consultant-gynecologist-dr-prabath-randombage" },
  { name: "Dr. Sabaretnam Jeyakumar", specialization: "Gynecologist", calendlySlug: "consultantgynecologist-dr-sabarathnamjeyakumar" },

  // Pediatrician
  { name: "Dr. Ananda Piyatissa", specialization: "Pediatrician", calendlySlug: "consultant-pediatrician-dr-anandapiyatissa" },
  { name: "Dr. Aruni Wijesinghe", specialization: "Pediatrician", calendlySlug: "consultant-pediatrician-dr-aruniwijesinghe" },
  { name: "Dr. Champa Wickramasinghe", specialization: "Pediatrician", calendlySlug: "consultant-pediatrician-dr-champa-wickramasinghe" },
  { name: "Dr. Himali Wijesinghe", specialization: "Pediatrician", calendlySlug: "consultant-pediatrician-dr-himali-wijesinghe" },
  { name: "Dr. Lakkumar Fernando", specialization: "Pediatrician", calendlySlug: "consultant-gynecologist-dr-lakkumar-fernando", linkMismatch: true },
  { name: "Dr. Nimalika Hettiarachchi", specialization: "Pediatrician", calendlySlug: "pediatrician-dr-nimalika-hettiarachchi" },
  { name: "Dr. Sandaya Doluweera", specialization: "Pediatrician", calendlySlug: "consultant-pediatrician-dr-himali-wijesinghe-clone", linkMismatch: true },
  { name: "Dr. A. Windsor Perera", specialization: "Pediatrician", calendlySlug: "consultant-pediatrician-dr-ananda-piyatissa-clone", linkMismatch: true },

  // Physician
  { name: "Dr. Champa Jayamanna", specialization: "Physician", calendlySlug: "consultant-physician-dr-n-sritharan-clone", linkMismatch: true },
  { name: "Dr. Damintha Dissanayake", specialization: "Physician", calendlySlug: "consultant-physician-dr-damintha-dissanayake" },
  { name: "Dr. Lalindra Dias", specialization: "Physician", calendlySlug: "consultant-physician-dr-damintha-dissanayake-clone", linkMismatch: true },
  { name: "Dr. N. Sritharan", specialization: "Physician", calendlySlug: "consultant-pediatrician-dr-champa-wickramasi-clone", linkMismatch: true },
  { name: "Dr. Raja Hettiarachchi", specialization: "Physician", calendlySlug: "consultant-physician-dr-champa-jayamanna-clone", linkMismatch: true },
  { name: "Dr. Saman Wijetunge", specialization: "Physician", calendlySlug: "consultant-physician-dr-thusith-gunawardhana-clone", linkMismatch: true },
  { name: "Dr. Thusith Gunawardhana", specialization: "Physician", calendlySlug: "consultant-physician-dr-raja-hettiarachchi-clone", linkMismatch: true },

  // Surgeon
  { name: "Dr. E. Rajasekaran", specialization: "Surgeon", calendlySlug: "consultant-physician-dr-saman-wijetunge-clone", linkMismatch: true },
  { name: "Dr. Kailanathan", specialization: "Surgeon", calendlySlug: "consultant-surgeon-dr-ranjith-perera-clone", linkMismatch: true },
  { name: "Dr. M.R.M Ziyard", specialization: "Surgeon", calendlySlug: "consultant-surgeon-dr-m-r-m-ziyard" },
  { name: "Dr. Prabath Kumarasinghe", specialization: "Surgeon", calendlySlug: "cosmetic-dermatologist-dr-lakmali-pathiraja-clone", linkMismatch: true },
  { name: "Dr. R.D. Yapa", specialization: "Surgeon", calendlySlug: "consultant-surgeon-dr-r-d-yapa" },
  { name: "Dr. Ranjith Perera", specialization: "Surgeon", calendlySlug: "consultant-surgeon-dr-e-rajasekaran-clone", linkMismatch: true },
  { name: "Dr. Roshan Dassanayake", specialization: "Surgeon", calendlySlug: "consultant-surgeon-dr-roshan-dassanayake" },

  // Orthopaedic Surgeon
  { name: "Dr. Rushantha Premadasa", specialization: "Orthopaedic Surgeon", calendlySlug: "dr-rushanthapremadasa" },
  { name: "Dr. Thushara De Almeida", specialization: "Orthopaedic Surgeon", calendlySlug: "consultant-orthopedic-dr-thushara-de-almeida" },

  // Rheumatologist
  { name: "Dr. Dilrukshi Thennakoon", specialization: "Rheumatologist", calendlySlug: "consultant-rheumatology-rehabilitation" },
  { name: "Dr. Gunendrika Kasthurirathne", specialization: "Rheumatologist", calendlySlug: "dr-gunendrikakasthurirathne" },
  { name: "Dr. Lalith S. Wijerathne", specialization: "Rheumatologist", calendlySlug: "consultant-in-rheumatology-rehabilitation-dr-lalith" },

  // Cardiologist
  { name: "Dr. Ajith Wanniarachchi", specialization: "Cardiologist", calendlySlug: "consultant-cardiologist-dr-ajith-wanniarachchi" },
  { name: "Dr. Nimali Fernando", specialization: "Cardiologist", calendlySlug: "consultant-cardiologist-dr-nimali-fernando" },
  { name: "Dr. Tharanga Fernando", specialization: "Cardiologist", calendlySlug: "consultant-cardiologist-dr-taranga-fernando" },
  { name: "Dr. Wasantha Abeywickrama", specialization: "Cardiologist", calendlySlug: "consultant-cardiologist-dr-wasantha-abeywickrama" },

  // Eye Surgeon
  { name: "Dr. Jayan De Silva", specialization: "Eye Surgeon", calendlySlug: "consultant-eye-surgeon-dr-jayan-de-silva" },
  { name: "Dr. Nihal Ganegoda", specialization: "Eye Surgeon", calendlySlug: "consultant-eye-surgeon-dr-nihal-ganegoda" },
  { name: "Dr. Pradeepa K. Siriwardana", specialization: "Eye Surgeon", calendlySlug: "consultant-eye-surgeon-dr-pradeepa-k" },

  // Dermatologist / Skin Specialist
  { name: "Dr. Ahamed Uwyes", specialization: "Dermatologist / Skin Specialist", calendlySlug: "consultant-dermatologist-dr-ahamed-uwyes" },
  { name: "Dr. Dulcy Tissera", specialization: "Dermatologist / Skin Specialist", calendlySlug: "consultant-dermatologist-dr-dulcy-tissera" },
  { name: "Dr. Lakmali Pathiraja", specialization: "Dermatologist / Skin Specialist", calendlySlug: "pta-physical-therapy-assistant-mr-lilangit-clone", linkMismatch: true },
  { name: "Dr. Punya Abeygunawardana", specialization: "Dermatologist / Skin Specialist", calendlySlug: "consultant-dermatologist-dr-punya" },

  // Neurologist / Neuro Physician
  { name: "Dr. Dhanushka Withanawasam", specialization: "Neurologist / Neuro Physician", calendlySlug: "consultant-neurologist-dr-dhanushka-withanawasam" },
  { name: "Dr. M. Saamir Mohideen", specialization: "Neurologist / Neuro Physician", calendlySlug: "consultant-neurologist-dr-m-samir-mohideen" },

  // Nephrologist
  { name: "Dr. Dinith Galabada", specialization: "Nephrologist", calendlySlug: "consultant-nephrologist-dr-dinith-galabada" },

  // Psychiatrist
  { name: "Dr. Prabath Wickrama", specialization: "Psychiatrist", calendlySlug: "consultant-psychiatrist-dr-prabath-wickrama" },
  { name: "Dr. Saman Weerawardhana", specialization: "Psychiatrist", calendlySlug: "consultant-psychiatrist-dr-saman-weerawardhana" },

  // ENT Surgeon
  { name: "Dr. Yasath Weerakkody", specialization: "ENT Surgeon", calendlySlug: "ent-surgeon-dr-yasathweerakkody" },
  { name: "Dr. V. Centuran", specialization: "ENT Surgeon", calendlySlug: "ent-surgeon-dr-vcenturan" },
  { name: "Dr. Premalal De Mel", specialization: "ENT Surgeon", calendlySlug: "ent-surgeon-dr-premalaldemel" },

  // Gastroenterologist / Liver Specialist
  { name: "Dr. Ruwan Perera", specialization: "Gastroenterologist / Liver Specialist", calendlySlug: "consultant-gastro-enterologist-dr-ruwan-perera" },

  // Endocrinologist
  { name: "Dr. Tharanga Samarasekara", specialization: "Endocrinologist", calendlySlug: "consultant-endocrinologist-diabetologist-dr-tharanga-samarasekara" },

  // Respiratory / Chest Physician
  { name: "Dr. Bodhika Samarasekara", specialization: "Respiratory / Chest Physician", calendlySlug: "consultant-respiratory-chest-physician-dr-bodhika" },
  { name: "Dr. Wathsala Gunasinghe", specialization: "Respiratory / Chest Physician", calendlySlug: "consultant-respiratory-physician-dr-wathsala-gunasinghe" },

  // Neuro Surgeon
  { name: "Dr. Lakmal Hewage", specialization: "Neuro Surgeon", calendlySlug: "clinical-embryologist-reproductive-medicine-sp-clone", linkMismatch: true },

  // Hematologist
  { name: "Dr. Aruna Jayawardhana", specialization: "Hematologist", calendlySlug: "consultant-psychiatrist-dr-saman-weerawardha-clone", linkMismatch: true },

  // Urologist
  { name: "Dr. Ishan Jayasuriya", specialization: "Urologist", calendlySlug: "consultant-urologist-dr-ishan-jayasuriya" },

  // Histopathologist
  { name: "Dr. Ineesha Jayasinghe", specialization: "Histopathologist", calendlySlug: "consultant-histopathologist-dr-ineesha-jayasinghe" },

  // Radiologist
  { name: "Dr. Prasanna Rupasinghe", specialization: "Radiologist", calendlySlug: "consultant-radiologist-dr-prasanna-rupasinghe" },
  { name: "Dr. Ranjita Sivapatham", specialization: "Radiologist", calendlySlug: "consultant-radiologist-dr-ranjieta-sivapatham" },
  { name: "Dr. Wasantha Hewapathirana", specialization: "Radiologist", calendlySlug: "consultant-radiologist-dr-wasantha-hewapathirana" },

  // Audiologist
  { name: "Mrs. Dinusha Manathunga", specialization: "Audiologist", calendlySlug: "counselor-ms-romin-fernando-clone", linkMismatch: true },
  { name: "Mr. Lilangith Silva", specialization: "Audiologist", calendlySlug: "eeg-electroencephalogram-technician-mr-sam-clone", linkMismatch: true },

  // Clinical Embryologist / Fertility Counselor
  { name: "Dr. H. Rathnayaka", specialization: "Clinical Embryologist / Fertility Counselor", calendlySlug: "consultant-surgeon-liver-transplant-hepatob-clone", linkMismatch: true },

  // Speech Therapist
  { name: "Mrs. Mayuri Bandara", specialization: "Speech Therapist", calendlySlug: "consultant-radiologist-dr-prasanna-rupasingh-clone", linkMismatch: true },

  // Physiotherapist
  { name: "Mr. Gamini De Mel", specialization: "Physiotherapist", calendlySlug: "speech-therapist-mrs-mayuri-bandara-clone", linkMismatch: true },
  { name: "Mrs. Yamuna Perera", specialization: "Physiotherapist", calendlySlug: "physiotherapists-mr-demal-clone", linkMismatch: true },

  // Nutritionist
  { name: "Mrs. Thiloka Sammani", specialization: "Nutritionist", calendlySlug: "physiotherapists-mrs-yamuna-perera-clone-clone", linkMismatch: true },

  // Psychological Counselling
  { name: "Ms. Romin Fernando", specialization: "Psychological Counselling", calendlySlug: "neurosurgeon-dr-lakmal-hewage-clone", linkMismatch: true },

  // Counseling Psychologist
  { name: "Dr. S.A.M. Randika Rupasinghe", specialization: "Counseling Psychologist", calendlySlug: "cosmetic-dermatologist-dr-lakmali-pathiraja-clone-1", linkMismatch: true },
];
```

- [ ] **Step 2: Create `src/features/e-channeling/components/Intro.tsx`**

```tsx
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Intro() {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-[1240px]">
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Our Expert Doctors
          </h2>
          <p className="text-base leading-relaxed text-muted">
            Meet our team of experienced and compassionate doctors dedicated to providing
            exceptional care and personalized medical attention. With diverse specialties and a
            commitment to your health, our doctors are here to support you on your wellness
            journey. Book your appointment today to receive expert medical guidance.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `src/features/e-channeling/components/DoctorDirectory.tsx`**

```tsx
"use client";

import { useMemo, useState } from "react";
import { CALENDLY_BASE, type Doctor } from "../data/doctors";

type DoctorDirectoryProps = {
  doctors: Doctor[];
};

export function DoctorDirectory({ doctors }: DoctorDirectoryProps) {
  const [nameFilter, setNameFilter] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");

  const filtered = useMemo(() => {
    const name = nameFilter.trim().toLowerCase();
    const specialization = specializationFilter.trim().toLowerCase();
    return doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(name) &&
        doctor.specialization.toLowerCase().includes(specialization)
    );
  }, [doctors, nameFilter, specializationFilter]);

  const grouped = useMemo(() => {
    const groups = new Map<string, Doctor[]>();
    for (const doctor of filtered) {
      const existing = groups.get(doctor.specialization) ?? [];
      existing.push(doctor);
      groups.set(doctor.specialization, existing);
    }
    return Array.from(groups.entries());
  }, [filtered]);

  return (
    <div>
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          value={nameFilter}
          onChange={(event) => setNameFilter(event.target.value)}
          placeholder="Filter by doctor name"
          aria-label="Filter by doctor name"
          className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
        />
        <input
          type="text"
          value={specializationFilter}
          onChange={(event) => setSpecializationFilter(event.target.value)}
          placeholder="Filter by specialization"
          aria-label="Filter by specialization"
          className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
        />
      </div>

      {grouped.length === 0 && <p className="text-sm text-muted">No doctors match your search.</p>}

      <div className="flex flex-col gap-10">
        {grouped.map(([specialization, group]) => (
          <div key={specialization}>
            <h3 className="mb-4 font-heading text-lg font-bold text-ink">{specialization}</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.map((doctor) => (
                <a
                  key={doctor.name + doctor.calendlySlug}
                  href={`${CALENDLY_BASE}${doctor.calendlySlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-white p-4 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary"
                >
                  {doctor.name}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-accent-dark"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `src/features/e-channeling/index.tsx`**

```tsx
import { PageBanner } from "@/components/layout/PageBanner";
import { Intro } from "./components/Intro";
import { DoctorDirectory } from "./components/DoctorDirectory";
import { doctors } from "./data/doctors";

export function EChannelingPage() {
  return (
    <>
      <PageBanner
        title="Make An Appointment"
        subtitle="Consult our in-house doctors at St. Joseph Hospital in Negombo. We have a 24/7 online doctor channeling system to help you book online."
        imageSrc="/images/echanneling-hero.jpg"
        imageAlt="Doctors and nurses with medical equipment at St. Joseph Hospital Negombo"
      />
      <Intro />
      <section className="bg-surface px-6 pb-20">
        <div className="mx-auto max-w-[1240px]">
          <DoctorDirectory doctors={doctors} />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 5: Create `src/app/(marketing)/e-channeling/page.tsx`**

```tsx
import type { Metadata } from "next";
import { EChannelingPage } from "@/features/e-channeling";

export const metadata: Metadata = {
  title: "Book an Appointment | St. Joseph Hospital Negombo",
  description:
    "Browse St. Joseph Hospital Negombo's doctors by specialization and book an appointment online via Calendly.",
};

export default function Page() {
  return <EChannelingPage />;
}
```

- [ ] **Step 6: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit clean.

In the browser, click "Book Appointment" (top bar), "Appointments" (nav), or "Inpatient Room Booking" is separate, but confirm the appointment CTAs now land on `/e-channeling` instead of 404ing or leaving the site. Confirm the banner, the "Our Expert Doctors" intro, then the filter inputs and the full doctor directory grouped by specialization (28 groups). Type "cardio" into the specialization filter and confirm only the 4 Cardiologist entries remain; clear it and type a doctor's first name into the name filter and confirm it narrows correctly. Click one doctor link and confirm it opens `calendly.com/appointments-sjhospital/...` in a new tab. Count the total rendered doctor cards with filters cleared (open devtools and run `document.querySelectorAll('a[href*="calendly.com"]').length` in the console) and confirm it equals 71.

- [ ] **Step 7: Commit**

```bash
git add src/features/e-channeling src/app/\(marketing\)/e-channeling
git commit -m "Add e-Channeling page with full 71-doctor directory"
```

---

### Task 13: Privacy Policy page

**Files:**
- Create: `src/app/(marketing)/privacy-policy/_components/PolicyContent.tsx`
- Create: `src/app/(marketing)/privacy-policy/page.tsx`

**Interfaces:**
- Consumes: nothing beyond plain Tailwind classes (pure static content, no shared components needed).
- Produces: the `/privacy-policy` route goes live; the footer's "Privacy Policy" link from Task 3 now resolves to a real page.

- [ ] **Step 1: Create `src/app/(marketing)/privacy-policy/_components/PolicyContent.tsx`**

This reproduces the live site's TermsFeed-generated legal text verbatim (captured during this project's research), minus the mobile-app "Delete Your Personal Data" account-deletion form, which is out of scope (there is no mobile app in this project).

```tsx
type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

const blocks: Block[] = [
  { type: "p", text: "Last updated: August 31, 2025" },
  {
    type: "p",
    text: "This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.",
  },
  {
    type: "p",
    text: "We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.",
  },
  { type: "h2", text: "Interpretation and Definitions" },
  { type: "h3", text: "Interpretation" },
  {
    type: "p",
    text: "The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.",
  },
  { type: "h3", text: "Definitions" },
  { type: "p", text: "For the purposes of this Privacy Policy:" },
  {
    type: "ul",
    items: [
      "Account means a unique account created for You to access our Service or parts of our Service.",
      'Affiliate means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.',
      "Application refers to SJ Hospital, Health Care, the software program provided by the Company.",
      'Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to ST. JOSEPH CHILDREN & ADULT HOSPITAL (PVT) LTD, St. Joseph Hospital Negombo, 229/10 St. Joseph Street, Negombo.',
      "Country refers to Sri Lanka.",
      "Device means any device that can access the Service such as a computer, a cellphone, or a digital tablet.",
      "Personal Data is any information that relates to an identified or identifiable individual.",
      "Service refers to the Application.",
      "Service Provider means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service, or to assist the Company in analyzing how the Service is used.",
      "Usage Data refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself, for example, the duration of a page visit.",
      "You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.",
    ],
  },
  { type: "h2", text: "Collecting and Using Your Personal Data" },
  { type: "h3", text: "Types of Data Collected" },
  { type: "h3", text: "Personal Data" },
  {
    type: "p",
    text: "While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:",
  },
  { type: "ul", items: ["Email address", "First name and last name", "Address, State, Province, ZIP/Postal code, City", "Usage Data"] },
  { type: "h3", text: "Usage Data" },
  { type: "p", text: "Usage Data is collected automatically when using the Service." },
  {
    type: "p",
    text: "Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.",
  },
  {
    type: "p",
    text: "When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers, and other diagnostic data.",
  },
  {
    type: "p",
    text: "We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.",
  },
  { type: "h3", text: "Use of Your Personal Data" },
  { type: "p", text: "The Company may use Personal Data for the following purposes:" },
  {
    type: "ul",
    items: [
      "To provide and maintain our Service, including to monitor the usage of our Service.",
      "To manage Your Account: to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.",
      "For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items, or services You have purchased, or of any other contract with Us through the Service.",
      "To contact You: by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications, regarding updates or informative communications related to the functionalities, products, or contracted services, including security updates, when necessary or reasonable for their implementation.",
      "To provide You with news, special offers, and general information about other goods, services, and events which we offer that are similar to those that You have already purchased or enquired about, unless You have opted not to receive such information.",
      "To manage Your requests: to attend and manage Your requests to Us.",
      "For business transfers: We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.",
      "For other purposes: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns, and to evaluate and improve our Service, products, services, marketing, and your experience.",
    ],
  },
  { type: "p", text: "We may share Your personal information in the following situations:" },
  {
    type: "ul",
    items: [
      "With Service Providers: to monitor and analyze the use of our Service, and to contact You.",
      "For business transfers: in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.",
      "With Affiliates: We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners, or other companies that We control or that are under common control with Us.",
      "With business partners: to offer You certain products, services, or promotions.",
      "With other users: when You share personal information or otherwise interact in public areas with other users, such information may be viewed by all users and may be publicly distributed outside.",
      "With Your consent: for any other purpose with Your consent.",
    ],
  },
  { type: "h3", text: "Retention of Your Personal Data" },
  {
    type: "p",
    text: "The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.",
  },
  {
    type: "p",
    text: "The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.",
  },
  { type: "h3", text: "Transfer of Your Personal Data" },
  {
    type: "p",
    text: "Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to, and maintained on, computers located outside of Your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in Your jurisdiction.",
  },
  { type: "p", text: "Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer." },
  {
    type: "p",
    text: "The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy, and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place, including the security of Your data and other personal information.",
  },
  { type: "h3", text: "Delete Your Personal Data" },
  { type: "p", text: "You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You." },
  { type: "p", text: "Our Service may give You the ability to delete certain information about You from within the Service." },
  {
    type: "p",
    text: "You may update, amend, or delete Your information at any time by signing in to Your Account, if You have one, and visiting the account settings section that allows You to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.",
  },
  { type: "p", text: "Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so." },
  { type: "h3", text: "Disclosure of Your Personal Data" },
  { type: "h3", text: "Business Transactions" },
  {
    type: "p",
    text: "If the Company is involved in a merger, acquisition, or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.",
  },
  { type: "h3", text: "Law Enforcement" },
  {
    type: "p",
    text: "Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities, such as a court or a government agency.",
  },
  { type: "h3", text: "Other Legal Requirements" },
  { type: "p", text: "The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:" },
  {
    type: "ul",
    items: [
      "Comply with a legal obligation",
      "Protect and defend the rights or property of the Company",
      "Prevent or investigate possible wrongdoing in connection with the Service",
      "Protect the personal safety of Users of the Service or the public",
      "Protect against legal liability",
    ],
  },
  { type: "h3", text: "Security of Your Personal Data" },
  {
    type: "p",
    text: "The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.",
  },
  { type: "h2", text: "Children's Privacy" },
  {
    type: "p",
    text: "Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.",
  },
  {
    type: "p",
    text: "If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.",
  },
  { type: "h2", text: "Links to Other Websites" },
  {
    type: "p",
    text: "Our Service may contain links to other websites that are not operated by Us. If You click on a third-party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.",
  },
  { type: "p", text: "We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services." },
  { type: "h2", text: "Changes to this Privacy Policy" },
  { type: "p", text: "We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page." },
  {
    type: "p",
    text: 'We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective, and update the "Last updated" date at the top of this Privacy Policy.',
  },
  { type: "p", text: "You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page." },
  { type: "h2", text: "Contact Us" },
  { type: "p", text: "If you have any questions about this Privacy Policy, You can contact us:" },
  {
    type: "ul",
    items: [
      "By email: info@sjhospital.lk",
      "By visiting this page on our website: https://sjhospital.lk",
      "By phone number: 0117 84 84 84",
      "By mail: St. Joseph Hospital Negombo, 229/10 St. Joseph Street, Negombo",
    ],
  },
];

export function PolicyContent() {
  return (
    <div className="mx-auto max-w-3xl space-y-5 px-6 py-16 text-sm leading-relaxed text-ink/80 sm:py-20">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2 key={index} className="pt-4 font-heading text-xl font-bold text-ink">
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3 key={index} className="pt-2 font-heading text-base font-bold text-ink">
              {block.text}
            </h3>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={index} className="list-disc space-y-1.5 pl-5">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/app/(marketing)/privacy-policy/page.tsx`**

```tsx
import type { Metadata } from "next";
import { PolicyContent } from "./_components/PolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | St. Joseph Hospital Negombo",
  description:
    "St. Joseph Hospital Negombo's privacy policy: how we collect, use, and protect your personal data.",
};

export default function Page() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-mid px-6 py-14">
        <div className="mx-auto max-w-[1240px]">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Privacy Policy
          </h1>
        </div>
      </section>
      <PolicyContent />
    </>
  );
}
```

- [ ] **Step 3: Verify**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit clean.

In the browser, go to `http://localhost:3000/privacy-policy`. Confirm the plain purple banner (no photo) reads "Privacy Policy", followed by the full legal text with visible section headings ("Interpretation and Definitions", "Collecting and Using Your Personal Data", "Children's Privacy", "Links to Other Websites", "Changes to this Privacy Policy", "Contact Us") and bullet lists rendering correctly. Click "Privacy Policy" in the footer from any page and confirm it navigates here instead of the old external site.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(marketing)/privacy-policy"
git commit -m "Add Privacy Policy page"
```

---

### Task 14: Full-site verification

**Files:** none (verification only).

**Interfaces:**
- Consumes: every route and component from Tasks 1-13.
- Produces: a production build proving the whole set of interior pages compiles and renders correctly together.

- [ ] **Step 1: Run the full verification suite**

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Expected: all three exit with no errors. `npm run build` additionally prints a route list; confirm it includes `/`, `/contact-us`, `/career`, `/about-us`, `/accommodation`, `/services`, `/e-channeling`, and `/privacy-policy`.

- [ ] **Step 2: Manual cross-page pass in the browser**

With `npm run dev` still running (or `npm start` after the build), click through the header nav to all 6 new pages plus the "Book Appointment"/"Appointments"/"Inpatient Room Booking" CTAs, at three widths: a phone width (~375px), a tablet width (~768px), and a desktop width (~1280px+). Confirm on every page: the header/footer render identically to the homepage's; no layout overflows horizontally at any width; all real photos load (no broken image icons); and the mobile hamburger menu's links all resolve correctly (no more external/anchor links left over from before Task 3).

- [ ] **Step 3: Confirm no leftover placeholder or dead links**

Run:

```bash
grep -rn "sjhospital.lk/e-channeling\|sjhospital.lk/accommodation\|sjhospital.lk/career\|sjhospital.lk/privacy-policy" src/
```

Expected: no matches (all of these should now be internal `Link`s). Any match indicates a leftover external link Task 3 was supposed to replace, and should be fixed before considering this plan complete.

- [ ] **Step 4: Final commit (only if Steps 1-3 required fixes)**

If everything already passed in Tasks 1-13, there is nothing to commit here. If this task's verification surfaced and you fixed any issues, commit them:

```bash
git add -A
git commit -m "Fix cross-page issues found in final interior-pages verification"
```
