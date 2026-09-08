import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import type { MediaContent } from "../data/getContent";

/**
 * `#kit`: what the press kit contains, and how to ask for it.
 *
 * The reference renders these rows as downloads. None of the nine files exists
 * in this repo, so `KitAsset` has no `href` and the rows are a manifest rather
 * than a set of links: a download button that 404s is worse for a journalist on
 * deadline than a clear "write to us and we will send it".
 * `content.test.ts` fails if a URL or a filename appears in one of these rows.
 *
 * `sj-tint-row` washes each row on hover without the lift the card grids take,
 * since a table row that jumps is distracting when eight of them sit together.
 *
 * Below 1024px the note column is dropped and the row becomes name plus format,
 * then a single stacked column below 900px, per the reference's own
 * `[data-r="kitrow"]` and `[data-r="kitnote"]` rules.
 */
export function PressKitSection({ content }: { content: MediaContent }) {
  const { kit, MEDIA_EMAIL, kitHeading, kitIntro, kitRequestCta, kitRequestSubject, kitRulesCta, sectionEyebrows } =
    content;
  return (
    <section id="kit" className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18.5">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div className="min-w-0">
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              {sectionEyebrows.kit}
            </div>
            <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              {kitHeading.line1}
              <br />
              {kitHeading.line2}
            </h2>
          </div>
          <p className="max-w-[38ch] text-[16.5px] leading-[1.6] text-[var(--home-muted)]">{kitIntro}</p>
        </div>
      </Reveal>

      <RevealStagger
        stepMs={45}
        className="mt-10 border-t border-[var(--home-hairline-strong)]"
      >
        {kit.map((asset) => (
          <div
            key={asset.name}
            className="sj-tint-row grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.1fr)_minmax(0,0.5fr)] items-baseline gap-5.5 border-b border-[var(--home-hairline-strong)] px-1 py-5.25 max-[1023px]:grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)] max-[899px]:grid-cols-1 max-[899px]:gap-y-1.5"
          >
            <span className="text-[17.5px] font-bold text-[var(--home-heading)]">{asset.name}</span>
            {/* Dropped below 1024px and stays dropped, per the reference: the
                note is the widest column and the row reads fine without it. */}
            <span className="text-[14.5px] leading-[1.5] text-[var(--home-muted)] max-[1023px]:hidden">
              {asset.note}
            </span>
            <span className="text-right text-[13.5px] font-bold text-[var(--home-accent-soft)] max-[899px]:text-left">
              {asset.format}
            </span>
          </div>
        ))}
      </RevealStagger>

      <Reveal className="mt-7 flex flex-wrap gap-3">
        <a
          href={`mailto:${MEDIA_EMAIL}?subject=${encodeURIComponent(kitRequestSubject)}`}
          className="sj-invert inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]"
        >
          {kitRequestCta} <span aria-hidden>&rarr;</span>
        </a>
        <a
          href="#usage"
          className="sj-invert inline-flex items-center gap-2.5 border border-[var(--home-hairline-strong)] px-6 py-4 text-[15px] font-bold text-[var(--home-heading)]"
        >
          {kitRulesCta}
        </a>
      </Reveal>
    </section>
  );
}
