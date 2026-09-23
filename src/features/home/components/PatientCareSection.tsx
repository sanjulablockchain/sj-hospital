import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import type { Locale } from "@/lib/i18n/locales";
import { localeHref } from "@/lib/i18n/paths";
import type { HomeContent } from "../data/getContent";
import { patientCareTiles } from "../data/patientCareTiles";
import { isHomeIconKey } from "../types";
import { HomeIcon } from "./HomeIcon";
import { Container, pillButton, ArrowRight } from "./primitives";

/**
 * `#care`: the uppercase brand heading and two paragraphs on the left, a
 * 2 / 3 column grid of brand tiles on the right (accent on hover), each a
 * Patient Care destination from the site header's own menu.
 */
export function PatientCareSection({
  content,
  locale,
}: {
  content: HomeContent["content"]["patientCare"];
  locale: Locale;
}) {
  const tiles = patientCareTiles();
  return (
    <section id="care" className="py-20 sm:py-27.5">
      <Container className="grid items-center gap-10 sm:gap-14 [grid-template-columns:repeat(auto-fit,minmax(min(100%,460px),1fr))]">
        <Reveal className="flex flex-col gap-5">
          <h2
            className="font-display m-0 text-[clamp(34px,3.8vw,52px)] leading-[1.02] font-extrabold tracking-[-0.03em] text-[var(--home-brand-text)] uppercase"
            style={{ textWrap: "balance" }}
          >
            {content.heading}
          </h2>
          <p className="m-0 text-[16.5px] leading-[1.7] text-[var(--home-body)]" style={{ textWrap: "pretty" }}>
            {content.body1}
          </p>
          <p className="m-0 text-[16.5px] leading-[1.7] text-[var(--home-muted)]" style={{ textWrap: "pretty" }}>
            {content.body2}
          </p>
          <Link href={localeHref(content.href, locale)} className={`${pillButton("brand")} h-[50px] self-start px-6.5 text-[14.5px]`}>
            {content.cta} <ArrowRight />
          </Link>
        </Reveal>
        <RevealStagger className="grid grid-cols-2 gap-0.5 bg-[var(--home-bg)] min-[560px]:grid-cols-3">
          {tiles.map((tile) => (
            <Link
              key={tile.href}
              href={localeHref(tile.href, locale)}
              className="flex aspect-[1/0.92] flex-col items-center justify-center gap-3.5 bg-[var(--home-brand)] p-4.5 text-center text-white transition-colors hover:bg-[var(--home-accent)] hover:text-[var(--home-on-accent)]"
            >
              {/* The header's icon vocabulary is wider than the home page's;
                  a key without path data renders no icon rather than throwing.
                  patientCareTiles.test.ts pins that today's six all resolve. */}
              {isHomeIconKey(tile.icon) ? <HomeIcon name={tile.icon} size={48} stroke={1.3} /> : null}
              <span className="text-[15.5px] font-extrabold">{tile.label}</span>
              <span className="max-w-[170px] text-[12.5px] leading-[1.4] opacity-85">{tile.description}</span>
            </Link>
          ))}
        </RevealStagger>
      </Container>
    </section>
  );
}
