# Career Popup Responsive Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the career page's role-detail popup behave like a full-screen
app sheet with a sticky top bar on phones/portrait-tablets, and a centered
dialog on landscape-tablet/desktop, restyling its internals to match a
reference mockup's visual language using this project's existing design
tokens.

**Architecture:** The shared `Modal` component (`src/components/ui/Modal.tsx`)
gains a `title` prop and renders two Tailwind-responsive header treatments
from one JSX tree (no JS media-query/state — pure `md:` breakpoint classes,
so it works identically server- and client-rendered). `OpenRoles.tsx` stops
building its own header and switches its requirements list to pill rows.
`JobApplicationForm.tsx` gets a focus-ring utility added to its inputs. A new
`ArrowLeftIcon` is added to the shared icon set.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript (strict), Tailwind
CSS v4 (CSS-first config in `src/app/globals.css`, no `tailwind.config.js`).
No test runner is configured in this repo — verification is `npm run lint`,
`npm run build`, and manual browser checks (no Playwright, per explicit
project instruction).

## Global Constraints

- Follow `src/app/globals.css` `@theme inline` tokens (`--color-primary`,
  `--color-accent`, `--color-surface`, `--color-ink`, `--color-muted`,
  `--font-heading`) — do not introduce new colors or fonts.
- `Modal` is currently used only by `OpenRoles.tsx` — no other consumer to
  keep compatible.
- Breakpoint split for the sheet/dialog behavior is `md` (768px): below `md`
  = full-screen sheet, `md` and up = centered dialog.
- No automated tests exist in this repo and none should be added — verify
  each task with `npm run lint`, `npm run build`, and the manual browser
  checks described in each task's steps.
- Component files stay PascalCase; imports use the `@/*` alias, no relative
  `../../` chains.

---

### Task 1: Add `ArrowLeftIcon` to the shared icon set

**Files:**
- Modify: `src/components/ui/Icons.tsx`

**Interfaces:**
- Consumes: nothing new (same `IconProps = { className?: string }` already
  defined at the top of this file).
- Produces: `ArrowLeftIcon({ className }: IconProps): JSX.Element`, exported
  from `src/components/ui/Icons.tsx`, for Task 2 to import.

- [ ] **Step 1: Add the icon component**

Open `src/components/ui/Icons.tsx` and add this function after `CloseIcon`
(matching the existing icons' size/stroke conventions in that file):

```tsx
export function ArrowLeftIcon({ className = "" }: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run lint`
Expected: no new errors or warnings.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Icons.tsx
git commit -m "feat(ui): add ArrowLeftIcon for mobile sheet back button"
```

---

### Task 2: Make `Modal` breakpoint-aware with a `title` header

**Files:**
- Modify: `src/components/ui/Modal.tsx`

**Interfaces:**
- Consumes: `ArrowLeftIcon` and `CloseIcon` from `@/components/ui/Icons`
  (Task 1 produced `ArrowLeftIcon`; `CloseIcon` already exists).
- Produces: `Modal` component with props
  `{ open: boolean; onClose: () => void; title: string; labelledBy?: string; children: React.ReactNode }`
  — note `title` is now a **required** prop (the only consumer,
  `OpenRoles.tsx`, always has one to show; Task 3 updates that call site).
  The component renders its own header — consumers no longer render a
  title/close row inside `children`.

- [ ] **Step 1: Replace the file contents**

Replace the full contents of `src/components/ui/Modal.tsx` with:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { ArrowLeftIcon, CloseIcon } from "@/components/ui/Icons";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  labelledBy?: string;
  children: React.ReactNode;
};

export function Modal({ open, onClose, title, labelledBy, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <>
      {open && (
        <div
          aria-hidden="true"
          onClick={onClose}
          className="fixed inset-0 z-40 hidden bg-ink/60 backdrop-blur-sm md:block"
        />
      )}
      <dialog
        ref={dialogRef}
        aria-labelledby={labelledBy}
        onClose={onClose}
        className="fixed inset-0 z-50 h-full w-full overflow-hidden rounded-none border-0 bg-white p-0 shadow-none md:m-auto md:h-fit md:w-[calc(100%-2rem)] md:max-w-lg md:rounded-[22px] md:border md:border-ink/10 md:shadow-[0_40px_80px_-30px_rgba(20,10,50,0.45)]"
      >
        <div className="themed-scrollbar h-full overflow-y-auto md:h-auto md:max-h-[85vh]">
          <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-ink/10 bg-white/90 px-4 py-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] backdrop-blur-md md:static md:items-start md:gap-4 md:border-0 md:bg-transparent md:px-8 md:pt-8 md:pb-0 md:backdrop-blur-none">
            <button
              type="button"
              onClick={onClose}
              aria-label="Back"
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink transition hover:bg-surface md:hidden"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>

            <h3
              id={labelledBy}
              className="min-w-0 flex-1 truncate text-center font-heading text-base font-bold text-ink md:overflow-visible md:text-clip md:whitespace-normal md:text-left md:text-2xl md:font-extrabold"
            >
              {title}
            </h3>

            <span aria-hidden="true" className="h-9 w-9 shrink-0 md:hidden" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="hidden h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted transition hover:bg-surface hover:text-ink md:flex"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          {children}
        </div>
      </dialog>
    </>
  );
}
```

What changed vs. the previous version, and why:
- `title` prop + the header block: the component now owns the header instead
  of each consumer building one inside `children`.
- Below `md`: the back button (left) and a same-sized invisible spacer
  (right) keep the title visually centered, mirroring a native app top bar.
  The header is `sticky top-0` inside the single scrolling container, with a
  bottom border and safe-area-aware top padding for notched phones. The
  `<dialog>` itself is `fixed inset-0 h-full w-full` with square corners — a
  full-screen sheet.
- At `md` and up: the back button, spacer, and sticky/border/blur styling are
  all turned off (`md:hidden`, `md:static`, `md:border-0`,
  `md:bg-transparent`, `md:backdrop-blur-none`); the close (`X`) button
  appears instead (`md:flex`); the `<dialog>` reverts to the original
  centered card sizing (`md:m-auto md:h-fit md:w-[calc(100%-2rem)]
  md:max-w-lg md:rounded-[22px] ...`). The title drops its mobile `truncate`
  behavior (`md:overflow-visible md:text-clip md:whitespace-normal`) so long
  titles can wrap onto two lines as before.
- The backdrop-dimming `div` is `hidden md:block` — not shown (or clickable)
  below `md`, since the full-screen sheet already covers the viewport.

This is intentionally one JSX tree controlled entirely by Tailwind `md:`
variants — no `useMediaQuery`/`matchMedia` state — so there's no
server/client render mismatch and no extra JS.

- [ ] **Step 2: Verify the project still builds**

Run: `npm run build`
Expected: This will currently **fail or show a type error**, because
`OpenRoles.tsx` (Task 3) still calls `<Modal>` without a `title` prop and
still renders its own header/close button inside `children`. That's
expected at this point — confirm the failure is specifically a missing
`title` prop on the `<Modal>` call in `OpenRoles.tsx`, not something else in
this file. If the error points anywhere inside `Modal.tsx` itself, fix that
before moving on.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Modal.tsx
git commit -m "feat(ui): make Modal a full-screen sheet below md, dialog above"
```

---

### Task 3: Update `OpenRoles.tsx` — use the new `title` prop, pill-row requirements

**Files:**
- Modify: `src/features/career/components/OpenRoles.tsx`

**Interfaces:**
- Consumes: `Modal` with the new required `title` prop (Task 2).
- Produces: no new exports — this is the top-level `OpenRoles` component,
  unchanged in name/signature.

- [ ] **Step 1: Remove the now-unused `CloseIcon` import**

In `src/features/career/components/OpenRoles.tsx`, delete this line (the
close button it supported is now rendered by `Modal` itself):

```tsx
import { CloseIcon } from "@/components/ui/Icons";
```

- [ ] **Step 2: Rename `CheckItem` to `RequirementRow` and restyle as a pill**

Replace the existing `CheckItem` function:

```tsx
function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-ink/80">
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
      {children}
    </li>
  );
}
```

with:

```tsx
function RequirementRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2.5 rounded-full bg-surface px-4 py-2 text-sm text-ink/80">
      <svg
        width="16"
        height="16"
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
      {children}
    </li>
  );
}
```

- [ ] **Step 3: Use `RequirementRow` in the requirements list**

Find:

```tsx
            <ul className="mb-5 space-y-2">
              {activeRole.requirements.map((requirement) => (
                <CheckItem key={requirement}>{requirement}</CheckItem>
              ))}
            </ul>
```

Replace with:

```tsx
            <ul className="mb-5 space-y-2">
              {activeRole.requirements.map((requirement) => (
                <RequirementRow key={requirement}>{requirement}</RequirementRow>
              ))}
            </ul>
```

- [ ] **Step 4: Pass `title` to `Modal` and drop the manual header block**

Find:

```tsx
      <Modal open={activeRole !== null} onClose={() => setOpenIndex(null)} labelledBy={titleId}>
        {activeRole && (
          <div className="p-7 sm:p-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <h3 id={titleId} className="font-heading text-xl font-extrabold text-ink sm:text-2xl">
                {activeRole.title}
              </h3>
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label="Close job details"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted transition hover:bg-surface hover:text-ink"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-muted">{activeRole.summary}</p>
```

Replace with:

```tsx
      <Modal
        open={activeRole !== null}
        onClose={() => setOpenIndex(null)}
        title={activeRole?.title ?? ""}
        labelledBy={titleId}
      >
        {activeRole && (
          <div className="p-7 sm:p-8">
            <p className="mb-5 text-sm leading-relaxed text-muted">{activeRole.summary}</p>
```

(Everything after that `<p>` — Requirements, Location, How to Apply, Apply
Now / `JobApplicationForm` — stays exactly as it is, just with one fewer
enclosing `<div>` level removed above it.)

- [ ] **Step 5: Verify the project builds and lints clean**

Run: `npm run build`
Expected: succeeds with no type errors (this resolves the expected failure
from Task 2, Step 2).

Run: `npm run lint`
Expected: no errors (in particular, no "unused import" warning for
`CloseIcon`, and no "unused variable" warning for the old `CheckItem` name).

- [ ] **Step 6: Manual check — mobile sheet**

Run: `npm run dev`, open `http://localhost:3000/career` in a browser at a
375px-wide viewport (phone). Click "View Full Details" on a role card.
Verify:
- The popup fills the entire screen (no visible page content or rounded
  corners at the edges).
- A sticky bar sits at the top with a left-pointing arrow button on the
  left, the role title centered, and a bottom border under the whole bar.
- Scrolling the popup content keeps that bar pinned at the top.
- Tapping the arrow button closes the popup back to the role list.

- [ ] **Step 7: Manual check — desktop dialog**

Widen the browser to ≥1024px wide (or use DevTools responsive mode). Open
the same popup. Verify:
- It renders as a centered card with visible rounded corners and a dimmed
  backdrop behind it, not full-screen.
- The role title is top-left with an `X` close button top-right (no arrow
  button, no sticky bar).
- Clicking the dimmed backdrop, clicking the `X`, and pressing `Esc` each
  close the popup.

- [ ] **Step 8: Manual check — requirements pills**

At any width, confirm each requirement in the "Requirements" section renders
as a full-width rounded bar with a light background and a cyan checkmark, not
a plain bulleted line.

- [ ] **Step 9: Commit**

```bash
git add src/features/career/components/OpenRoles.tsx
git commit -m "feat(career): drive popup header from Modal, pill-style requirements"
```

---

### Task 4: Add focus-ring styling to `JobApplicationForm` inputs

**Files:**
- Modify: `src/features/career/components/JobApplicationForm.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: no signature change — same `JobApplicationForm({ roleTitle }: JobApplicationFormProps)`.

- [ ] **Step 1: Add the focus ring class to each text-style field**

In `src/features/career/components/JobApplicationForm.tsx`, there are five
fields sharing the class fragment
`"... outline-none focus:border-primary"` (First Name, Last Name, Email,
Phone inputs, and the Cover Note textarea). For each of those five elements,
change:

```
outline-none focus:border-primary"
```

to:

```
outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
```

Do **not** change the file-input's hidden `<input type="file">` (it uses
`className="sr-only"` and has no focus-ring styling to touch) or the
"Choose File" label/submit button.

- [ ] **Step 2: Verify it builds and lints clean**

Run: `npm run build && npm run lint`
Expected: both succeed with no errors.

- [ ] **Step 3: Manual check**

At any viewport width, open the popup, tab through First Name, Last Name,
Email, Phone, and Cover Note. Verify each field shows both the existing blue
border color change and a soft ring around the field when focused.

- [ ] **Step 4: Commit**

```bash
git add src/features/career/components/JobApplicationForm.tsx
git commit -m "style(career): add focus ring to job application form fields"
```
