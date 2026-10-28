import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import type { NetworkContent } from "../data/getContent";

/**
 * `#parent`: the Kids & Teens Medical Group teaser directly under the hero,
 * above the jump cards. The card's facts (logo, name, body, chips, link) are
 * the group's own entry in `orgGroups`, found by slug, so the family section
 * further down and this teaser can never disagree; only the eyebrow, the
 * note and the CTA are the teaser's own.
 *
 * An accent tinted panel with the logo on a white chip, stacked below 640px
 * and side by side above. The CTA is an external link in a new tab, with
 * the same `rel` the org cards carry.
 */
export function ParentTeaser({ content }: { content: NetworkContent }) {
  const parent = content.orgGroups.flatMap((group) => group.orgs).find((org) => org.slug === "kids-and-teens");
  if (!parent || !parent.href) throw new Error("the Kids & Teens org entry is missing from orgGroups");
  const { parentTeaser } = content;

  return (
    <section id="parent" className="mx-auto max-w-[1440px] px-5 pt-16 sm:px-8 lg:px-11">
      <Reveal className="grid gap-5 border border-[var(--home-accent)] bg-[var(--home-accent-tint)] p-6 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-7 sm:p-9">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center bg-white ring-1 ring-[var(--home-hairline-strong)]">
          <Image src={parent.logo} alt="" width={144} height={144} sizes="64px" className="h-14 w-14 object-contain" />
        </span>
        <div className="min-w-0">
          <div className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
            {parentTeaser.eyebrow}
          </div>
          <h2 className="font-display wrap-break-word mt-2.5 text-[clamp(26px,3vw,40px)] leading-[1.04] font-semibold tracking-[-0.03em] text-[var(--home-heading)]">
            {parent.name}
          </h2>
          <p className="mt-3.5 max-w-[62ch] text-[16px] leading-[1.6] text-[var(--home-body)]" style={{ textWrap: "pretty" }}>
            {parent.body}
          </p>
          <p className="mt-2.5 max-w-[62ch] text-[14.5px] leading-[1.6] text-[var(--home-muted)]">{parentTeaser.note}</p>
          <ul className="mt-4.5 flex flex-wrap gap-2">
            {parent.chips.map((chip) => (
              <li
                key={chip}
                className="border border-[var(--home-hairline-strong)] bg-[var(--home-bg)] px-2.75 py-1.75 text-[12px] font-semibold text-[var(--home-muted)]"
              >
                {chip}
              </li>
            ))}
          </ul>
          <a
            href={parent.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2.5 bg-[var(--home-accent)] px-5 text-[14.5px] font-bold text-[var(--home-on-accent)] transition-colors hover:bg-[var(--home-accent-hover)]"
          >
            {parentTeaser.cta} <span aria-hidden>&nearr;</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
