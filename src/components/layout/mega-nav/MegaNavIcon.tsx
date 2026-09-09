import type { ReactNode } from "react";
import type { MegaNavIconKey } from "@/config/megaNavigation";

/**
 * The tile icons for the Patient Care and About panels: 24-unit line icons at
 * a 1.6 stroke, drawn to sit beside a 14px bold title. Keyed by the strings in
 * `megaNavigation.ts` so the tree stays plain data. Same shape as `Icons.tsx`:
 * `currentColor`, `aria-hidden`, sized by the caller.
 */
const PATHS: Record<MegaNavIconKey, ReactNode> = {
  building: (
    <>
      <path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h7A1.5 1.5 0 0 1 14 5.5V21" />
      <path d="M14 10h4.5A1.5 1.5 0 0 1 20 11.5V21" />
      <path d="M2.5 21h19" />
      <path d="M7 8h2M7 12h2M7 16h2M17 14h.5M17 17.5h.5" />
    </>
  ),
  pill: (
    <>
      <path d="m10.5 4.5-6 6a4.243 4.243 0 0 0 6 6l6-6a4.243 4.243 0 0 0-6-6Z" />
      <path d="m7.5 7.5 6 6" />
      <path d="M17.5 13.5a3 3 0 1 1 3 3" />
    </>
  ),
  home: (
    <>
      <path d="M3.5 11 12 4l8.5 7" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M12 12v5M9.5 14.5h5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.6 2.3 3.9 5.1 3.9 8.5S14.6 18.2 12 20.5c-2.6-2.3-3.9-5.1-3.9-8.5S9.4 5.8 12 3.5Z" />
    </>
  ),
  school: (
    <>
      <path d="m2.5 9 9.5-4.5L21.5 9 12 13.5 2.5 9Z" />
      <path d="M6.5 11.2V16c1.6 1.4 3.4 2 5.5 2s3.9-.6 5.5-2v-4.8" />
      <path d="M21.5 9v5" />
    </>
  ),
  bed: (
    <>
      <path d="M3 18.5V7.5" />
      <path d="M3 12.5h18v6" />
      <path d="M3 16h18" />
      <path d="M6 12.5V10a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1v2.5" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5" />
      <path d="M12 7.5h.01" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5.5" r="2.25" />
      <circle cx="5.5" cy="17.5" r="2.25" />
      <circle cx="18.5" cy="17.5" r="2.25" />
      <path d="m10.9 7.5-4 8M13.1 7.5l4 8M7.75 17.5h8.5" />
    </>
  ),
  newspaper: (
    <>
      <path d="M4.5 5.5h13v13a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 4.5 18.5v-13Z" />
      <path d="M17.5 9.5h2v9a1.5 1.5 0 0 1-1.5 1.5" />
      <path d="M7.5 9h4v4h-4zM14 9.5h1M14 12.5h1M7.5 16h7.5" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3.5" y="7.5" width="17" height="12" rx="1.5" />
      <path d="M8.5 7.5V6a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 6v1.5" />
      <path d="M3.5 12.5h17" />
      <path d="M10.5 11v3h3v-3" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.4 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />
      <path d="M6.5 12.5h3l1.25-2.5 1.5 4 1.25-2.5h3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 5 6.5v5c0 4.3 3 7.6 7 9 4-1.4 7-4.7 7-9v-5l-7-3Z" />
      <path d="m9 12 2 2 4-4.5" />
    </>
  ),
};

export function MegaNavIcon({ name, className = "" }: { name: MegaNavIconKey; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
