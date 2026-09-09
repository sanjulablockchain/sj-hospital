import type { MegaNavLink, MegaNavMenu } from "@/config/megaNavigation";
import type { Locale } from "@/lib/i18n/locales";
import { localeHref } from "@/lib/i18n/paths";
import { MegaNavIcon } from "./MegaNavIcon";

type MegaNavPanelProps = {
  menu: MegaNavMenu;
  locale: Locale;
  /** The trigger's element id, for aria-labelledby. */
  labelledBy: string;
  /** Called on every link so the owner can close the panel. */
  onNavigate: () => void;
};

/**
 * One open menu's contents. Two frames, like the reference: a quiet outer
 * frame in the page colour carrying the footer row, and an inner box in the
 * surface colour carrying the columns. Both are hairline-bordered and square,
 * the site's own idiom; the shadow is what lifts the panel off the hero photo
 * behind it.
 *
 * `columns` is the Services directory: six eyebrow-headed columns of dense
 * title-only links. `tiles` is a three-column grid of icon, title and one
 * line, for the two menus with six entries each.
 */
export function MegaNavPanel({ menu, locale, labelledBy, onNavigate }: MegaNavPanelProps) {
  const isTiles = menu.layout === "tiles";

  return (
    <div
      id={`mega-panel-${menu.id}`}
      role="region"
      aria-labelledby={labelledBy}
      className={`animate-sj-menu-in mx-auto w-full ${isTiles ? "max-w-[960px]" : "max-w-[1320px]"}`}
    >
      {/* Opaque, not translucent: the hero's fact strip sits right behind the
          footer row on every page and read through anything less. */}
      <div className="border border-[var(--home-hairline)] bg-[var(--home-bg)] p-1.5 shadow-[0_36px_70px_-30px_rgba(0,0,0,0.7)]">
        <div
          className={`max-h-[calc(100vh-var(--sj-header-h)-96px)] overflow-y-auto themed-scrollbar border border-[var(--home-hairline)] bg-[var(--home-surface)] ${
            isTiles ? "grid grid-cols-3" : "grid grid-cols-6"
          }`}
        >
          {menu.columns.map((column, index) => (
            <div
              key={column.heading ?? index}
              className={`${index > 0 ? "border-l border-[var(--home-hairline)]" : ""} ${
                isTiles ? "flex flex-col" : "px-5 py-5"
              }`}
            >
              {column.heading && (
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--home-muted)]">
                  {column.heading}
                </p>
              )}
              {isTiles ? (
                column.links.map((link) => (
                  <TileLink key={link.href} link={link} locale={locale} onNavigate={onNavigate} />
                ))
              ) : (
                <ul className="flex flex-col">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={localeHref(link.href, locale)}
                        onClick={onNavigate}
                        className="block py-[7px] text-[13.5px] font-semibold leading-[1.3] text-[var(--home-body)] transition-[color,transform] duration-200 ease-out hover:translate-x-0.5 hover:text-[var(--home-accent-soft)] focus-visible:text-[var(--home-accent-soft)] focus-visible:outline-none"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {menu.footer && (
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 px-5 py-3.5">
            <a
              href={localeHref(menu.footer.primary.href, locale)}
              onClick={onNavigate}
              className="group inline-flex items-center gap-2 text-[13px] font-bold text-[var(--home-accent-soft)] transition-colors hover:text-[var(--home-heading)] focus-visible:text-[var(--home-heading)] focus-visible:outline-none"
            >
              {menu.footer.primary.label}
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
              {menu.footer.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={localeHref(link.href, locale)}
                    onClick={onNavigate}
                    className="text-[12.5px] font-semibold text-[var(--home-muted)] transition-colors hover:text-[var(--home-heading)] focus-visible:text-[var(--home-heading)] focus-visible:outline-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function TileLink({ link, locale, onNavigate }: { link: MegaNavLink; locale: Locale; onNavigate: () => void }) {
  return (
    <a
      href={localeHref(link.href, locale)}
      onClick={onNavigate}
      className="group flex flex-1 items-start gap-3.5 px-5 py-5 transition-colors duration-200 hover:bg-[var(--home-accent-tint-soft)] focus-visible:bg-[var(--home-accent-tint-soft)] focus-visible:outline-none"
    >
      {link.icon && (
        <MegaNavIcon
          name={link.icon}
          className="mt-px h-5 w-5 shrink-0 text-[var(--home-accent-soft)] transition-transform duration-200 group-hover:-translate-y-0.5"
        />
      )}
      <span className="block min-w-0">
        <span className="block text-[14px] font-bold leading-[1.25] text-[var(--home-heading)]">{link.label}</span>
        {link.description && (
          <span className="mt-1 block text-[12.5px] leading-[1.45] text-[var(--home-muted)]">{link.description}</span>
        )}
      </span>
    </a>
  );
}
