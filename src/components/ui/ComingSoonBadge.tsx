import { ChromeText } from "@/components/i18n/ChromeText";

/**
 * The "Coming soon" pill shown beside any preview of, or link to, a service
 * the hospital does not run yet (`config/comingSoon.ts`). The text is chrome
 * copy, so it reads in the visitor's language wherever the badge sits, server
 * or client component alike.
 *
 * `onDark` is for the fixed-dark, photo-backed bands (each page's hero), where
 * the accent tint is drawn on white text instead of the theme's surface.
 */
export function ComingSoonBadge({ size = "sm", onDark = false }: { size?: "sm" | "md"; onDark?: boolean }) {
  const sizing =
    size === "md" ? "min-h-7 px-3 text-[11.5px] tracking-[0.16em]" : "min-h-5 px-2 text-[10px] tracking-[0.12em]";
  const colours = onDark
    ? "bg-[color-mix(in_srgb,var(--home-accent)_30%,transparent)] text-white"
    : "bg-[color-mix(in_srgb,var(--home-accent)_16%,transparent)] text-[var(--home-accent)]";
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full font-bold whitespace-nowrap uppercase ${sizing} ${colours}`}
    >
      <ChromeText id="comingSoon" />
    </span>
  );
}
