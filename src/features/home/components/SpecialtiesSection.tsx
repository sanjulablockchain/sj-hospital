import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import type { Locale } from "@/lib/i18n/locales";
import { localeHref } from "@/lib/i18n/paths";
import type { HomeContent } from "../data/getContent";
import { SpecialtiesCarousel } from "./SpecialtiesCarousel";
import { Container, Eyebrow, displayHeading, pillButton, ArrowRight } from "./primitives";

/** `#services`: centred intro, the carousel, and the accent "View all" pill, over a lavender-to-sky gradient. */
export function SpecialtiesSection({
  content,
  servicesCount,
  locale,
}: {
  content: HomeContent["content"]["specialties"];
  servicesCount: number;
  locale: Locale;
}) {
  const count = String(servicesCount);
  return (
    <section
      id="services"
      className="py-18 sm:py-25"
      style={{ background: "linear-gradient(var(--home-surface), var(--home-sky-bg))" }}
    >
      <Container className="flex flex-col items-center gap-8">
        <Reveal className="flex max-w-[880px] flex-col items-center gap-3.5 text-center">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className={displayHeading} style={{ textWrap: "balance" }}>
            {content.headingTemplate.replace("{count}", count)}
          </h2>
          <p className="m-0 text-[16.5px] leading-[1.65] text-[var(--home-muted)]" style={{ textWrap: "pretty" }}>
            {content.body}
          </p>
        </Reveal>
        <SpecialtiesCarousel
          tabs={content.tabs}
          topServicesHeading={content.topServicesHeading}
          countTemplate={content.countTemplate}
          findDoctor={content.findDoctor}
          exploreMore={content.exploreMore}
          ariaPrev={content.ariaPrev}
          ariaNext={content.ariaNext}
          locale={locale}
        />
        <Link
          href={localeHref(content.viewAll.href, locale)}
          className={`${pillButton("accent")} h-[54px] px-7.5 text-[14px] tracking-[0.06em] uppercase`}
        >
          {content.viewAll.ctaTemplate.replace("{count}", count)} <ArrowRight />
        </Link>
      </Container>
    </section>
  );
}
