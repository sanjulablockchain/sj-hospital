import { Reveal } from "@/components/ui/Reveal";
import type { EChannelingContent } from "../data/getContent";

/**
 * `#help`: the closing accent rail, ported out of DoctorDirectory.tsx where it
 * used to sit as static markup inside the client component that holds the
 * directory's filter state. `helpRail`'s heading and body are that old rail's
 * own copy, verbatim.
 *
 * No numbered eyebrow: this page has one job (`#directory`), and dressing a
 * two-line phone/email prompt as a second numbered section would overstate
 * it.
 *
 * `callCtaTemplate` carries a `{phone}` token rather than a fixed "Call " +
 * number split, so word order can move between languages; the whole
 * interpolated string sits inside one clickable `<a>`, unlike the
 * emergency-note pattern elsewhere that has to keep a link mid-sentence.
 *
 * The button wrapper is `min-w-0 flex-wrap`, not `shrink-0`: in the
 * `sm:flex-row` band (roughly 640-1023px) `shrink-0` forbade the wrapper from
 * giving up any width, and the Tamil `callCta` (its `{phone}` interpolation
 * makes it the longest of the three locales) plus the Email button no longer
 * fit beside the text block, overflowing the row and the page by 41px at
 * 768px. `min-w-0` lets the wrapper shrink so the two buttons drop to their
 * own line instead; each `<a>` keeps `whitespace-nowrap` so its own label
 * never breaks mid-word, the same split this feature's own hero CTA row
 * (`ChannelingHero.tsx`) and `pharmacy`/`home-care`'s `BookSection.tsx` use.
 */
export function HelpSection({ content }: { content: EChannelingContent }) {
  const { helpRail } = content;
  const callCta = helpRail.callCtaTemplate.replace("{phone}", helpRail.phone);
  return (
    <section id="help" className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-11 max-[640px]:py-10">
      <Reveal className="flex flex-col items-center gap-5 bg-[var(--home-accent)] p-8 text-center text-[var(--home-on-accent)] sm:flex-row sm:justify-between sm:p-11 sm:text-left">
        <div>
          <p className="font-display text-[22px] font-bold tracking-[-0.02em] uppercase">
            {helpRail.heading}
          </p>
          <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed opacity-85">{helpRail.body}</p>
        </div>
        <div className="flex min-w-0 flex-wrap justify-center gap-3">
          <a
            href={helpRail.phoneHref}
            className="sj-invert inline-flex h-12 items-center bg-[var(--home-on-accent)] px-6 text-sm font-bold whitespace-nowrap text-[var(--home-accent)]"
          >
            {callCta}
          </a>
          <a
            href={`mailto:${helpRail.email}`}
            className="inline-flex h-12 items-center border border-[var(--home-on-accent)]/40 px-6 text-sm font-bold whitespace-nowrap transition-colors hover:bg-[var(--home-on-accent)]/10"
          >
            {helpRail.emailCta}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
