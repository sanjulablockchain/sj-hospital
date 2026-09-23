import type { ReactNode } from "react";

/** The reference's 1440px container with 44px gutters on desktop, 32px from `sm`, 20px on phones. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-11 ${className}`}>{children}</div>;
}

/** The section eyebrow: a 32x2 accent bar and 12px extrabold tracked uppercase in brand text. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`flex items-center gap-3 text-[12px] font-extrabold tracking-[0.2em] text-[var(--home-brand-text)] uppercase ${className}`}
    >
      <span aria-hidden className="h-0.5 w-8 shrink-0 bg-[var(--home-accent)]" />
      {children}
    </span>
  );
}

/** The display heading most bands share: Bricolage, 34 to 54px, tight leading and tracking. */
export const displayHeading =
  "font-display m-0 text-[clamp(34px,3.8vw,54px)] leading-[1.02] font-extrabold tracking-[-0.03em] text-[var(--home-heading)]";

type PillVariant = "brand" | "outline" | "accent" | "surface";

/**
 * The reference's four pill buttons. `brand` fills purple and darkens on
 * hover; `outline` is a 1.5px ink border that fills ink on hover (the
 * `sj-invert` tokens); `accent` fills sky; `surface` is white on a brand
 * background. Height and padding vary per band, so the caller adds them.
 */
export function pillButton(variant: PillVariant): string {
  const base = "inline-flex items-center gap-2.5 rounded-full font-extrabold whitespace-nowrap transition-colors";
  switch (variant) {
    case "brand":
      return `${base} bg-[var(--home-brand)] text-white hover:bg-[var(--home-brand-hover)] hover:text-white`;
    case "outline":
      return `${base} sj-invert border-[1.5px] border-[var(--home-heading)] bg-[var(--home-bg)] text-[var(--home-heading)]`;
    case "accent":
      return `${base} bg-[var(--home-accent)] text-[var(--home-on-accent)] hover:bg-[var(--home-accent-hover)]`;
    case "surface":
      return `${base} bg-[var(--home-bg)] text-[var(--home-heading)] hover:text-[var(--home-brand-text)]`;
  }
}

/** The trailing arrow every CTA carries. */
export function ArrowRight() {
  return <span aria-hidden>&rarr;</span>;
}
