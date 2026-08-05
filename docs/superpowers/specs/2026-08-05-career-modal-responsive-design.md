# Career Popup (Role Detail Modal) — Responsive Redesign

## Context

The career page's "View Full Details" popup (role summary + requirements +
`JobApplicationForm`) is built on the shared `Modal` component
(`src/components/ui/Modal.tsx`), used only by `OpenRoles.tsx`. The user
supplied a reference mockup (`code.html`, an "Inpatient Room Booking" mobile
page) and asked for its structural ideas — a sticky mobile top-app-bar with a
back button, card-sectioned content, pill-style checklist rows, and the input
focus treatment — to be carried into this popup, across mobile/tablet/desktop.

The reference's own color tokens (deep purple primary, cyan secondary) are
close to this project's real design tokens (`--color-primary: #4a2a82`,
`--color-accent: #33b4e5` in `src/app/globals.css`), so this design reuses the
project's existing tokens rather than importing the reference's palette.

`Modal` currently has no `title` prop; each consumer builds its own header
inside `children`. It renders as a `<dialog>` with `showModal()`, sized as a
centered card (`max-w-lg`, rounded corners) at all viewport widths — there is
no full-screen/mobile-sheet behavior today.

## Decisions

- **Breakpoint split:** full-screen sheet below `md` (768px) — phones and
  portrait tablets; centered dialog at `md` and up (landscape tablet/desktop).
  This matches the reference's own `md:hidden` cutoff for its app bar/bottom
  nav.
- **No other `Modal` consumers exist**, so its behavior can change freely
  without a compatibility shim.
- **No known pre-existing bugs to fix** — this is a from-scratch responsive
  redesign; the user will manually verify the result (no Playwright).

## Design

### 1. `Modal` (`src/components/ui/Modal.tsx`)

Add an optional `title?: string` prop. `Modal` now owns rendering the header;
consumers stop building their own title/close row in `children`.

**Below `md` (full-screen sheet):**
- Container becomes `fixed inset-0 h-full w-full` (no rounded corners, no
  `max-w`), single scrollable element (`overflow-y-auto` on the whole sheet,
  not a separate inner scroll div).
- Header is `sticky top-0 z-10` inside that scrollable element — mirrors
  `SiteHeader`'s sticky style: `bg-white/90 backdrop-blur-md border-b
  border-ink/10`. Left: a back-arrow icon button (new `ArrowLeftIcon` in
  `Icons.tsx`) calling `onClose`. Center: `title` (`font-heading text-base
  font-bold text-ink`, truncated if long). Include top safe-area padding
  (`pt-[env(safe-area-inset-top)]`) for notched phones.
- Backdrop dimming div is not rendered below `md` (the sheet is opaque and
  covers the full viewport already).

**At `md` and up (centered dialog, current behavior preserved):**
- Same sizing as today: `m-auto h-fit w-[calc(100%-2rem)] max-w-lg
  rounded-[22px] border border-ink/10 bg-white shadow-[...]`, backdrop dimming
  div shown and click-to-close active.
- Header renders inline at the top of the content instead of a sticky bar:
  `title` on the left (`font-heading text-xl font-extrabold` sizing, matching
  today's in-dialog title), a round X-close button (existing `CloseIcon`) on
  the right — i.e., today's `OpenRoles` header markup moves into `Modal`,
  parameterized by `title` and a fixed `onClose` handler.
- Both breakpoints keep `themed-scrollbar` on the scrolling element.

**Both breakpoints:**
- Esc key still closes (native `<dialog>` behavior, unchanged).
- `children` no longer needs to render its own heading/close button — just
  the body content below the header.

### 2. `OpenRoles.tsx`

- Remove the manual `<div className="mb-5 flex items-start justify-between ...">`
  header block (title `<h3>` + close `<button>`); pass `title={activeRole.title}`
  to `<Modal>` instead. Keep the existing `useId`/`labelledBy` wiring as-is —
  `OpenRoles` still generates `titleId` and passes it to `Modal` via
  `labelledBy`, and `Modal` attaches that id to whichever title element it
  renders (sticky-bar title below `md`, inline title at `md`+) so
  `aria-labelledby` stays correct at both breakpoints.
- Restyle the "Requirements" `<ul>` from plain bullet rows into pill-chip rows:
  each requirement becomes a `flex items-center gap-2.5 bg-surface rounded-full
  px-4 py-2` row, keeping the existing cyan checkmark SVG (`CheckItem`'s icon)
  and text styling. This is the one place the reference's "Specialties"
  checklist look gets adopted.
- No changes to the summary/location/how-to-apply blocks or to the "Apply Now"
  section — they already stack cleanly at every width.

### 3. `JobApplicationForm.tsx`

- Add `focus:ring-2 focus:ring-primary/20` alongside the existing
  `focus:border-primary` on the four text-style inputs and the textarea
  (`firstName`, `lastName`, `email`, `phone`, `message`), matching the
  reference's focus treatment. The file-picker label/button and submit button
  are unchanged.
- No layout changes: the existing `sm:grid-cols-2` name-field split and the
  submit button's `w-full sm:w-auto` sizing already behave correctly across
  breakpoints and are orthogonal to the `md`-based sheet/dialog split in
  `Modal`.

### 4. `Icons.tsx`

- Add `ArrowLeftIcon` (same stroke/size conventions as the existing icons in
  this file) for the mobile sheet's back button.

## Files touched

- `src/components/ui/Modal.tsx`
- `src/components/ui/Icons.tsx`
- `src/features/career/components/OpenRoles.tsx`
- `src/features/career/components/JobApplicationForm.tsx`

## Out of scope

- No changes to `PageBanner`, `Intro`, or `WhyWorkWithUs`.
- No new `Modal` consumers are added or refactored.
- No automated/browser testing — user verifies manually across breakpoints.
