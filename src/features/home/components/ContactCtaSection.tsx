import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { LOGO_MARK } from "@/config/brand";
import type { Locale } from "@/lib/i18n/locales";
import { localeHref } from "@/lib/i18n/paths";
import type { HomeContent } from "../data/getContent";
import { HomeIcon } from "./HomeIcon";
import { Container } from "./primitives";

/**
 * `#contact`: the brand card with the ghosted leaf, beside four tall link
 * rows. Routes go through `localeHref`; `tel:` and `https:` stay as they are.
 */
export function ContactCtaSection({
  content,
  locale,
}: {
  content: HomeContent["content"]["contactCta"];
  locale: Locale;
}) {
  const rowClass =
    "font-display flex flex-1 items-center justify-between gap-4 border-b border-[var(--home-hairline)] px-6 py-6.5 text-[20px] font-extrabold tracking-[-0.01em] text-[var(--home-heading)] transition-colors hover:bg-[var(--home-surface)] hover:text-[var(--home-brand-text)] sm:px-9 sm:text-[24px]";

  return (
    <section id="contact" className="pb-20 sm:pb-27.5">
      <Container>
        <Reveal className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,480px),1fr))]">
          <div className="relative flex min-h-[400px] flex-col justify-center gap-5 overflow-hidden bg-[var(--home-brand)] p-8 text-white sm:px-12 sm:py-14">
            <Image
              src={LOGO_MARK.src}
              alt=""
              aria-hidden
              width={LOGO_MARK.width}
              height={LOGO_MARK.height}
              className="pointer-events-none absolute -top-8 -right-15 h-[120%] w-auto opacity-[0.12]"
            />
            <span className="relative text-[12px] font-extrabold tracking-[0.2em] text-[#CFE9F8] uppercase">{content.eyebrow}</span>
            <h2 className="font-display relative m-0 text-[clamp(42px,5vw,72px)] leading-[0.92] font-extrabold tracking-[-0.04em] uppercase">
              {content.heading}
            </h2>
            <p className="relative m-0 max-w-[420px] text-[16.5px] leading-[1.6] text-[#EDEAF8]">{content.body}</p>
          </div>
          <div className="flex flex-col border border-[var(--home-hairline)] min-[960px]:border-l-0">
            {content.contactRows.map((row) => {
              const icon = (
                <span className="text-[var(--home-brand-text)]">
                  <HomeIcon name={row.icon} size={26} stroke={row.icon === "arrow" ? 2 : 1.8} />
                </span>
              );
              return row.href.startsWith("/") ? (
                <Link key={row.label} href={localeHref(row.href, locale)} className={rowClass}>
                  {row.label} {icon}
                </Link>
              ) : (
                <a key={row.label} href={row.href} className={`${rowClass} tabular-nums`}>
                  {row.label} {icon}
                </a>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
