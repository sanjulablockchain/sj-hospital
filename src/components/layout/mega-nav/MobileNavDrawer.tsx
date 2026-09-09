"use client";

import type React from "react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeMenuToggle } from "@/components/theme/ThemeMenuToggle";
import { LanguageMenuToggle } from "@/components/i18n/LanguageMenuToggle";
import { chromeCopyFor } from "@/components/layout/chromeCopy";
import { LOGO_MARK } from "@/config/brand";
import type { MegaNavMenu, MegaNavSection } from "@/config/megaNavigation";
import type { Locale } from "@/lib/i18n/locales";
import { localeHref } from "@/lib/i18n/paths";
import { MegaNavIcon } from "./MegaNavIcon";

type MobileNavDrawerProps = {
  sections: MegaNavSection[];
  locale: Locale;
  bookHref: string;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * The hamburger and the drawer it opens, for every width under `lg`. The
 * drawer slides in from the right, over a dimmed page, as a modal dialog: body
 * scroll is locked, Tab cycles inside it, Escape closes it, and focus returns
 * to the hamburger afterwards.
 *
 * It is portalled into `#sj-root` rather than `document.body`: the header is
 * a fixed stacking context, so a drawer left inside it could never rise above
 * the floating action rail, and the `--home-*` tokens it paints with are
 * scoped to that root, so `body` would leave it unstyled.
 */
export function MobileNavDrawer({ sections, locale, bookHref }: MobileNavDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const dialogId = useId();
  const copy = chromeCopyFor(locale);
  const pathname = usePathname();

  // Same render-time reset DesktopNav uses: a soft navigation (the language
  // switch) must not leave the drawer open over the new page.
  const [seenPathname, setSeenPathname] = useState(pathname);
  if (seenPathname !== pathname) {
    setSeenPathname(pathname);
    setIsOpen(false);
  }

  // `isOpen` is false on the server and on the hydrating render, so `document`
  // is only ever touched after a click, on the client.
  const portalRoot = isOpen ? document.getElementById("sj-root") : null;

  useEffect(() => {
    if (!isOpen) return;
    const { documentElement } = document;
    const previousOverflow = documentElement.style.overflow;
    documentElement.style.overflow = "hidden";

    // Focus the close button rather than the first link so the first thing a
    // screen reader announces is where it is and how to leave.
    requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>("[data-close]")?.focus();
    });

    // The hamburger stays mounted across the open/close cycle, so the node
    // captured here is the one to return focus to.
    const trigger = buttonRef.current;
    return () => {
      documentElement.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [isOpen]);

  function onDialogKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      return;
    }
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={dialogId}
        aria-label={isOpen ? copy.closeMenu : copy.openMenu}
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--sj-chrome-hairline)] text-[var(--sj-chrome-fg)] transition-colors sm:h-11 sm:w-11"
      >
        <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
          <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      {isOpen &&
        portalRoot &&
        createPortal(
          <div className="fixed inset-0 z-[80] lg:hidden">
            <div
              aria-hidden
              onClick={() => setIsOpen(false)}
              className="animate-sj-fade-in absolute inset-0 bg-[#060b1f]/60 backdrop-blur-sm"
            />
            <div
              ref={dialogRef}
              id={dialogId}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              onKeyDown={onDialogKeyDown}
              className="animate-sj-drawer-in absolute inset-y-0 right-0 flex w-[min(100%,26rem)] flex-col border-l border-[var(--home-hairline)] bg-[var(--home-bg)] text-[var(--home-body)] shadow-[-30px_0_60px_-30px_rgba(0,0,0,0.6)]"
            >
              <div className="flex h-[var(--sj-header-h)] shrink-0 items-center justify-between border-b border-[var(--home-hairline)] px-5">
                <a href={localeHref("/", locale)} className="flex items-center gap-2.5">
                  <Image src={LOGO_MARK.src} alt="" width={LOGO_MARK.width} height={LOGO_MARK.height} className="block h-9 w-auto" />
                  <span className="block leading-[1.05]">
                    <span className="font-display block text-[14px] font-extrabold tracking-[-0.02em] text-[var(--home-heading)]">
                      ST. JOSEPH
                    </span>
                    <span className="block text-[9px] tracking-[0.18em] text-[var(--home-accent-soft)]">
                      HOSPITAL &middot; NEGOMBO
                    </span>
                  </span>
                </a>
                <button
                  type="button"
                  data-close
                  aria-label={copy.closeMenu}
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 w-10 items-center justify-center border border-[var(--home-hairline-strong)] text-[var(--home-heading)]"
                >
                  <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
                    <path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav aria-label="Primary" className="themed-scrollbar flex-1 overflow-y-auto px-5 py-3">
                <DrawerSections sections={sections} locale={locale} />
              </nav>

              <div className="shrink-0 border-t border-[var(--home-hairline)] px-5 pb-5 pt-4">
                <a
                  href={localeHref(bookHref, locale)}
                  className="flex items-center justify-center gap-2.5 bg-[var(--home-accent)] px-5 py-3.5 text-[14px] font-bold text-[var(--home-on-accent)]"
                >
                  {copy.bookNow} <span aria-hidden>&rarr;</span>
                </a>
                <div className="mt-2">
                  <LanguageMenuToggle onChoose={() => setIsOpen(false)} />
                  <ThemeMenuToggle />
                </div>
              </div>
            </div>
          </div>,
          portalRoot
        )}
    </>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className={`h-3.5 w-3.5 shrink-0 text-[var(--home-muted)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="m3.5 6 4.5 4.5L12.5 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Menus as accordions, one open at a time. The Services directory nests a
 * second level (one accordion per group) so its thirty-six links never land
 * on screen at once.
 */
function DrawerSections({ sections, locale }: { sections: MegaNavSection[]; locale: Locale }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <ul className="flex flex-col divide-y divide-[var(--home-hairline)]">
      {sections.map((section) =>
        section.kind === "link" ? (
          <li key={section.id}>
            <a
              href={localeHref(section.href, locale)}
              className="flex items-center justify-between py-4 text-[16px] font-bold text-[var(--home-heading)]"
            >
              {section.label}
              <span aria-hidden className="text-[var(--home-muted)]">
                &rarr;
              </span>
            </a>
          </li>
        ) : (
          <li key={section.id}>
            <button
              type="button"
              aria-expanded={openId === section.id}
              aria-controls={`drawer-${section.id}`}
              onClick={() => setOpenId((current) => (current === section.id ? null : section.id))}
              className="flex w-full items-center justify-between py-4 text-left text-[16px] font-bold text-[var(--home-heading)]"
            >
              {section.label}
              <Chevron open={openId === section.id} />
            </button>
            {openId === section.id && (
              <div id={`drawer-${section.id}`} className="pb-4">
                <DrawerMenu menu={section} locale={locale} />
              </div>
            )}
          </li>
        )
      )}
    </ul>
  );
}

function DrawerMenu({ menu, locale }: { menu: MegaNavMenu; locale: Locale }) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <>
      {menu.layout === "columns" ? (
        <ul className="flex flex-col border-l border-[var(--home-hairline)] pl-4">
          {menu.columns.map((column) => {
            const heading = column.heading ?? "";
            const open = openGroup === heading;
            return (
              <li key={heading}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenGroup(open ? null : heading)}
                  className="flex w-full items-center justify-between py-2.5 text-left text-[14px] font-semibold text-[var(--home-body)]"
                >
                  <span>
                    {heading}
                    <span className="ml-2 text-[12px] font-medium text-[var(--home-muted)]">{column.links.length}</span>
                  </span>
                  <Chevron open={open} />
                </button>
                {open && (
                  <ul className="mb-2 flex flex-col border-l border-[var(--home-hairline)] pl-4">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={localeHref(link.href, locale)}
                          className="block py-2 text-[14px] text-[var(--home-body)] hover:text-[var(--home-heading)]"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="flex flex-col gap-1 border-l border-[var(--home-hairline)] pl-4">
          {menu.columns.flatMap((column) =>
            column.links.map((link) => (
              <li key={link.href}>
                <a href={localeHref(link.href, locale)} className="flex items-start gap-3 py-2">
                  {link.icon && <MegaNavIcon name={link.icon} className="mt-0.5 h-5 w-5 shrink-0 text-[var(--home-accent-soft)]" />}
                  <span className="block">
                    <span className="block text-[14.5px] font-semibold text-[var(--home-heading)]">{link.label}</span>
                    {link.description && (
                      <span className="mt-0.5 block text-[12.5px] leading-[1.45] text-[var(--home-muted)]">{link.description}</span>
                    )}
                  </span>
                </a>
              </li>
            ))
          )}
        </ul>
      )}

      {menu.footer && (
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-l border-[var(--home-hairline)] pl-4">
          <a
            href={localeHref(menu.footer.primary.href, locale)}
            className="inline-flex items-center gap-1.5 py-1 text-[13.5px] font-bold text-[var(--home-accent-soft)]"
          >
            {menu.footer.primary.label} <span aria-hidden>&rarr;</span>
          </a>
          {menu.footer.links.map((link) => (
            <a
              key={link.href}
              href={localeHref(link.href, locale)}
              className="py-1 text-[13px] font-semibold text-[var(--home-muted)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
