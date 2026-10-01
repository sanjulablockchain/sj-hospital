import Image from "next/image";
import { ChromeText } from "@/components/i18n/ChromeText";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { LOGO_LOCKUP_BRAND } from "@/config/brand";
import { homeFooterColumns } from "@/config/homeNavigation";
import { navLabel, translateFooterColumns } from "@/config/navigationLabels";
import type { Locale } from "@/lib/i18n/locales";

/**
 * The home page's own footer, in the v4 layout: the lockup and tagline, three
 * link columns, "Reach us", and the copyright bar with the motto set as a
 * mark. The reference has no social icons and no email here, so neither does
 * this; ThemedFooter still carries both for every other page.
 *
 * The motto and the copyright line stay English in every locale, for the
 * reasons ThemedFooter's own comment gives: the motto is a brand mark here,
 * uppercase and letterspaced to match the lockup.
 */
export function HomeFooter({ locale }: { locale: Locale }) {
  const columns = translateFooterColumns(homeFooterColumns, locale);
  return (
    <footer className="border-t border-[var(--home-hairline)] bg-[var(--home-surface)]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-5 pt-14 pb-8 sm:px-8 sm:pt-18 lg:px-11">
        <div className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
          <div className="flex flex-col gap-4.5">
            <Image
              src={LOGO_LOCKUP_BRAND.src}
              alt="St. Joseph Hospital"
              width={LOGO_LOCKUP_BRAND.width}
              height={LOGO_LOCKUP_BRAND.height}
              data-logo
              className="-mx-4 -mt-2 block h-18 w-auto self-start"
            />
            <span className="max-w-[300px] text-[14px] leading-[1.7] text-[var(--home-muted)]">
              <ChromeText id="tagline" />
            </span>
          </div>
          {columns.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3">
              <span className="text-[12px] font-extrabold tracking-[0.16em] text-[var(--home-brand-text)] uppercase">{column.heading}</span>
              {column.links.map((link) => (
                <LocaleLink
                  key={link.href}
                  href={link.href}
                  className="text-[14px] text-[var(--home-heading)] transition-colors hover:text-[var(--home-brand-text)]"
                >
                  {link.label}
                </LocaleLink>
              ))}
            </div>
          ))}
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-extrabold tracking-[0.16em] text-[var(--home-brand-text)] uppercase">{navLabel("Reach us", locale)}</span>
            <span className="text-[14px] leading-[1.5] text-[var(--home-heading)]">229/10 St. Joseph Street, Negombo</span>
            <a href="tel:+94117848484" className="text-[14px] font-extrabold text-[var(--home-heading)] tabular-nums hover:text-[var(--home-brand-text)]">
              0117 84 84 84 / 031
            </a>
            <a href="https://wa.me/94742223334" className="text-[14px] text-[var(--home-heading)] tabular-nums hover:text-[var(--home-brand-text)]">
              WhatsApp 074 222 333 4
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-[var(--home-hairline)] pt-6 text-[13px] text-[var(--home-muted-2)]">
          <span>&copy; 2026 St. Joseph Hospital, Negombo</span>
          <span className="font-extrabold tracking-[0.2em] text-[var(--home-brand-text)]">TO LIVE IS A PRIVILEGE</span>
        </div>
      </div>
    </footer>
  );
}
