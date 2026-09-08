import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { localeHref } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/locales";
import type { HealthTip } from "../data/healthTips";

export function HealthTipsSection({
  items,
  eyebrow,
  heading,
  cta,
  locale,
}: {
  items: readonly HealthTip[];
  eyebrow: string;
  heading: { line1: string; line2: string; line3: string };
  cta: string;
  locale: Locale;
}) {
  return (
    <section id="tips" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div className="min-w-0">
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              {eyebrow}
            </div>
            <h2 className="font-display mt-4.5 wrap-break-word text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              {heading.line1}
              <br />
              {heading.line2}
              <br />
              {heading.line3}
            </h2>
          </div>
          <Link
            href={localeHref("/health-tips", locale)}
            className="sj-invert inline-flex items-center gap-2.5 border border-[var(--home-hairline-strong)] px-5.5 py-3.5 text-[14.5px] font-bold text-[var(--home-heading)]"
          >
            {cta} <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </Reveal>
      <RevealStagger className="mt-12 border-t border-[var(--home-hairline)]">
        {items.map((tip, index) => (
          <Link
            key={index}
            href={localeHref("/health-tips", locale)}
            className="sj-row-fill grid grid-cols-1 gap-3 border-b border-[var(--home-hairline)] px-1 py-6.5 text-inherit min-[640px]:grid-cols-[minmax(0,0.5fr)_minmax(0,1.5fr)_minmax(0,1fr)] min-[640px]:items-baseline min-[640px]:gap-6"
          >
            <span className="text-[13px] font-bold tracking-[0.14em] text-[var(--home-accent)] uppercase">
              {tip.category}
            </span>
            <span className="font-display wrap-break-word text-[clamp(21px,2.1vw,30px)] leading-[1.1] font-semibold tracking-[-0.025em] text-[var(--home-heading)]">
              {tip.title}
            </span>
            <span className="text-[14.5px] leading-[1.55] text-[var(--home-muted)]">{tip.excerpt}</span>
          </Link>
        ))}
      </RevealStagger>
    </section>
  );
}
