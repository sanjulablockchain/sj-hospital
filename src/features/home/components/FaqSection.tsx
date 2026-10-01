import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { GENERAL_EMAIL } from "@/config/contactEmails";
import type { Locale } from "@/lib/i18n/locales";
import { localeHref } from "@/lib/i18n/paths";
import type { HomeContent } from "../data/getContent";
import { FaqList } from "./FaqList";
import { HomeIcon } from "./HomeIcon";
import { Container, Eyebrow, displayHeading, pillButton, ArrowRight } from "./primitives";

/** `#faq`: intro and the brand "Still have a question?" card on the left, the seven rows on the right. */
export function FaqSection({ content, locale }: { content: HomeContent["faq"]; locale: Locale }) {
  return (
    <section id="faq" className="pb-20 sm:pb-27.5">
      <Container className="grid items-start gap-10 sm:gap-14 [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
        <Reveal className="flex flex-col gap-5">
          <Eyebrow>{content.sectionEyebrow}</Eyebrow>
          <h2 className={displayHeading}>{content.heading}</h2>
          <p className="m-0 max-w-[460px] text-[16.5px] leading-[1.65] text-[var(--home-muted)]">{content.body}</p>
          <div className="mt-2 flex max-w-[460px] flex-col gap-3.5 rounded-[14px] bg-[var(--home-brand)] p-7 text-white">
            <span className="text-[18px] font-extrabold">{content.still.title}</span>
            <span className="text-[14.5px] leading-[1.55] text-white/86">{content.still.body}</span>
            <div className="flex flex-wrap gap-2.5">
              <a href="tel:+94117848484" className={`${pillButton("surface")} h-[46px] gap-2 px-4.5 text-[14.5px] tabular-nums`}>
                <HomeIcon name="phone" size={16} stroke={2} /> 0117 84 84 84 / 031
              </a>
              <a
                href={`mailto:${GENERAL_EMAIL}`}
                className="inline-flex h-[46px] items-center rounded-full border-[1.5px] border-white/50 px-4.5 text-[14.5px] font-extrabold text-white transition-colors hover:bg-white/10 hover:text-white"
              >
                {GENERAL_EMAIL}
              </a>
            </div>
          </div>
        </Reveal>
        <div className="flex flex-col gap-2.5">
          <FaqList items={content.items} />
          <Link
            href={localeHref(content.seeAll.href, locale)}
            className="mt-2 inline-flex items-center gap-2 self-start text-[15px] font-extrabold text-[var(--home-brand-text)] hover:text-[var(--home-accent-soft)]"
          >
            {content.seeAll.cta} <ArrowRight />
          </Link>
        </div>
      </Container>
    </section>
  );
}
