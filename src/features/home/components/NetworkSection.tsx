import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { NetworkAccordion } from "./NetworkAccordion";
import { localeHref } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/locales";
import type { NetworkNode } from "../data/network";

export function NetworkSection({
  nodes,
  eyebrow,
  heading,
  body,
  cta,
  accordionAria,
  locale,
}: {
  nodes: readonly NetworkNode[];
  eyebrow: string;
  heading: { line1: string; line2: string };
  body: string;
  cta: string;
  accordionAria: { show: string; open: string };
  locale: Locale;
}) {
  return (
    <section id="network" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
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
            </h2>
          </div>
          <div className="min-w-0">
            <p className="max-w-[36ch] text-[16.5px] leading-[1.6] text-[var(--home-muted)]">{body}</p>
            <Link
              href={localeHref("/network", locale)}
              className="mt-5 sj-invert inline-flex items-center gap-2.5 border border-[var(--home-hairline-strong)] px-5.5 py-3.5 text-[14.5px] font-bold text-[var(--home-heading)]"
            >
              {cta} <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </Reveal>
      <Reveal className="mt-11.5">
        <NetworkAccordion nodes={nodes} aria={accordionAria} locale={locale} />
      </Reveal>
    </section>
  );
}
