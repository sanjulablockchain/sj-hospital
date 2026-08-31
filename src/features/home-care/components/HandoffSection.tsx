import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import type { Handoff } from "../types";

/**
 * `#medicine` and `#telemedicine`: the two bands that summarise and then get
 * out of the way. One component, rendered twice from `handoffs`.
 *
 * Set inside a hairline box rather than running full width like the bands
 * above, which is the visual difference doing real work: everything before this
 * point is content this page owns, and these two are windows onto pages that
 * own their own. The box says so before the reader reaches the link.
 *
 * The link is a `Link`, not an `<a>`: both destinations are routes, so this
 * gets client navigation and prefetch, and /pharmacy#delivery still lands on
 * the delivery band.
 */
export function HandoffSection({ id, band }: { id: string; band: Handoff }) {
  return (
    <section
      id={id}
      className="mx-auto max-w-[1440px] px-5 pt-24 sm:px-8 lg:px-11 max-[640px]:pt-16"
    >
      <Reveal className="grid grid-cols-[1fr_0.85fr] gap-x-12 gap-y-8 border border-[var(--home-hairline)] px-9 py-9 max-[899px]:grid-cols-1 max-[640px]:px-6">
        <div>
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            {band.eyebrow}
          </div>
          <h2 className="font-display mt-4 text-[clamp(28px,3vw,42px)] leading-[1.02] font-extrabold tracking-[-0.03em] text-[var(--home-heading)] uppercase">
            {band.heading}
          </h2>
          <p
            className="mt-5 max-w-[54ch] text-[16px] leading-[1.62] text-[var(--home-muted)]"
            style={{ textWrap: "pretty" }}
          >
            {band.body}
          </p>
        </div>

        <div className="flex flex-col justify-between gap-7">
          <ul className="flex flex-col gap-2.75 text-[15px] leading-[1.5]">
            {band.points.map((point) => (
              <li key={point} className="flex gap-2.75 text-[var(--home-body)]">
                <span aria-hidden className="text-[var(--home-accent)]">
                  &#10022;
                </span>
                {point}
              </li>
            ))}
          </ul>
          <Link
            href={band.href}
            className="sj-invert font-display inline-flex items-center justify-between gap-5 border border-[var(--home-hairline)] px-6 py-4.5 text-[18px] font-semibold tracking-[-0.02em] text-[var(--home-heading)]"
          >
            {band.linkLabel} <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
