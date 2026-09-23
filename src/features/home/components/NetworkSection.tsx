import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import type { Locale } from "@/lib/i18n/locales";
import { localeHref } from "@/lib/i18n/paths";
import type { HomeContent } from "../data/getContent";
import { NetworkAccordion } from "./NetworkAccordion";
import { Container, Eyebrow, ArrowRight } from "./primitives";

/** `#network`: the two-line uppercase heading and the paragraph with a square outlined button, then the accordion. */
export function NetworkSection({ content, locale }: { content: HomeContent["network"]; locale: Locale }) {
  return (
    <section id="network" className="pb-20 sm:pb-27.5">
      <Container className="flex flex-col gap-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <Eyebrow>{content.sectionEyebrow}</Eyebrow>
            <h2 className="font-display m-0 text-[clamp(38px,4.6vw,68px)] leading-[0.95] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              {content.heading.line1}
              <br />
              {content.heading.line2}
            </h2>
          </div>
          <div className="flex max-w-[380px] flex-col gap-4.5">
            <p className="m-0 text-[16px] leading-[1.65] text-[var(--home-muted)]">{content.body}</p>
            <Link
              href={localeHref(content.href, locale)}
              className="sj-invert inline-flex h-12 items-center gap-2 self-start border-[1.5px] border-[var(--home-heading)] px-5.5 text-[14.5px] font-extrabold text-[var(--home-heading)]"
            >
              {content.cta} <ArrowRight />
            </Link>
          </div>
        </Reveal>
        <NetworkAccordion nodes={content.networkNodes} aria={content.accordionAria} locale={locale} />
      </Container>
    </section>
  );
}
