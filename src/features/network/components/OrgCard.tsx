import Image from "next/image";
import type { Org } from "../types";

/**
 * One group company.
 *
 * The reference's `[data-org]` hover is `translateY(-6px)` plus a
 * `rgba(44,166,240,0.1)` wash on a `0.35s / 0.45s cubic-bezier(0.2,0.8,0.2,1)`
 * transition, cancelled under `prefers-reduced-motion`. That is the shared
 * `sj-tint` utility exactly, down to `--home-accent-tint` already being that
 * colour, so no new CSS is needed here.
 *
 * The flagship marker is the reference's `[data-accent="1"]` rule: a 3px accent
 * inset along the top edge, drawn as an inset box-shadow rather than a border
 * so it does not change the card's box and shift the grid by a pixel.
 *
 * `min-h-[356px]` is the reference's figure. It keeps the hover CTA on the
 * baseline across a row of cards whose bodies differ in length, since
 * `mt-auto` pushes the CTA to the bottom of whichever card is tallest.
 *
 * The logo tile is one deliberate departure from the reference, which has no
 * logos at all: it renders the company's real 144x144 logo mark, object-contain,
 * on a solid white 48x48 chip in both themes. Several of the marks carry dark
 * or gold lettering on white and would be illegible on a translucent dark chip,
 * so the chip is kept white rather than tinted, and the flagship's accent fill
 * is dropped from it. The card-level accent inset still distinguishes the two
 * flagships.
 */
export function OrgCard({ org }: { org: Org }) {
  const inner = (
    <>
      {/* opacity lift on card hover, per the reference's [data-org-logo]. */}
      <span className="flex h-12 items-center gap-3 opacity-88 transition-opacity duration-[400ms] [@media(hover:hover)]:group-hover:opacity-100">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-white">
          <Image
            src={org.logo}
            alt=""
            width={144}
            height={144}
            className="h-full w-full object-contain"
          />
        </span>
        <span className="font-display block max-w-[150px] text-[15px] leading-[1.12] font-bold tracking-[-0.02em] text-[var(--home-heading)] uppercase">
          {org.wordmark}
        </span>
      </span>

      <span className="mt-5.5 text-[11px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
        {org.badge}
      </span>
      <span className="font-display mt-2.5 text-[24px] leading-[1.06] font-semibold tracking-[-0.03em] text-[var(--home-heading)]">
        {org.name}
      </span>
      <span className="mt-2 text-[15px] leading-[1.5] font-semibold text-[var(--home-body)]">
        {org.tagline}
      </span>
      <span className="mt-2.5 text-[14.5px] leading-[1.58] text-[var(--home-muted)]">
        {org.body}
      </span>

      <span className="mt-4 flex flex-wrap gap-1.75">
        {org.chips.map((chip) => (
          <span
            key={chip}
            className="border border-[var(--home-hairline-strong)] px-2.75 py-1.75 text-[12px] font-semibold text-[var(--home-muted)]"
          >
            {chip}
          </span>
        ))}
      </span>

      {/* Hidden until the card is hovered, and only where hover is a real
          input: on a touch screen there is no hover to end, so an unguarded
          reveal latches visible after the first tap. Same pattern as
          features/health-tips/components/LibrarySection.tsx. */}
      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[13.5px] font-bold text-[var(--home-accent-soft)] transition-[opacity,transform] duration-[450ms] motion-reduce:transform-none [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
        {org.cta} <span aria-hidden>&rarr;</span>
      </span>
    </>
  );

  const className = `sj-tint group flex min-h-[356px] flex-col bg-[var(--home-bg)] px-6.5 pt-7.5 pb-7 ${
    org.flagship ? "shadow-[inset_0_3px_0_0_var(--home-accent)]" : ""
  }`;

  // St. Joseph Hospital is this site, so its card is not a link out. Everything
  // else opens the company's own site in a new tab.
  if (!org.href) {
    return <div className={className}>{inner}</div>;
  }

  return (
    <a href={org.href} target="_blank" rel="noreferrer noopener" className={className}>
      {inner}
    </a>
  );
}
