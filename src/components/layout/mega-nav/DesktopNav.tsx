"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { MegaNavMenu, MegaNavSection } from "@/config/megaNavigation";
import type { Locale } from "@/lib/i18n/locales";
import { localeHref } from "@/lib/i18n/paths";
import { MegaNavPanel } from "./MegaNavPanel";

type DesktopNavProps = {
  sections: MegaNavSection[];
  locale: Locale;
  /** Reports whether any panel is open, so the header can go solid behind it. */
  onOpenChange: (open: boolean) => void;
};

// Hover intent. A pointer crossing the row on its way to the Book now button
// should not flick three panels open, so the first open waits; switching from
// one open menu to the next is immediate, as it is in every desktop menu bar.
// Leaving waits a little longer than opening so the pointer can cross the gap
// between the trigger row and the panel without the panel vanishing under it.
const OPEN_DELAY_MS = 90;
const CLOSE_DELAY_MS = 180;

const triggerClass =
  "inline-flex h-10 items-center gap-1.5 border border-transparent px-3.5 text-[13.5px] font-semibold whitespace-nowrap text-[var(--sj-chrome-fg-soft)] transition-colors duration-200 hover:text-[var(--sj-chrome-fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sj-chrome-accent)]";

/**
 * The `lg:` navigation: three menu triggers and a plain link, with the open
 * menu's panel dropped in below the bar. Follows the WAI-ARIA disclosure
 * navigation pattern rather than `role="menu"`: the panels hold ordinary
 * links, so Tab walks them and screen readers announce them as links.
 *
 * Opens on hover (mouse only, after `OPEN_DELAY_MS`), on click, on Enter or
 * Space, and on ArrowDown, which also moves focus into the panel. Closes on
 * Escape (focus returns to the trigger), on a pointer leaving both row and
 * panel, on focus leaving, on a click anywhere else, and on navigation.
 * ArrowLeft and ArrowRight move between the top-level items.
 */
export function DesktopNav({ sections, locale, onOpenChange }: DesktopNavProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const clearTimers = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  }, []);

  const open = useCallback(
    (id: string) => {
      clearTimers();
      setOpenId(id);
    },
    [clearTimers]
  );

  const close = useCallback(() => {
    clearTimers();
    setOpenId(null);
  }, [clearTimers]);

  const scheduleOpen = useCallback(
    (id: string) => {
      clearTimers();
      // Already showing a panel: switch straight away.
      if (openId) {
        setOpenId(id);
        return;
      }
      openTimer.current = setTimeout(() => setOpenId(id), OPEN_DELAY_MS);
    },
    [clearTimers, openId]
  );

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimer.current = setTimeout(() => setOpenId(null), CLOSE_DELAY_MS);
  }, [clearTimers]);

  useEffect(() => {
    onOpenChange(openId !== null);
  }, [openId, onOpenChange]);

  // A soft navigation leaves the header mounted, so the panel that was open
  // when the link was clicked would still be open on the next page. Reset
  // during render (React's "adjusting state when a prop changes" shape) rather
  // than in an effect, which would paint the stale panel for a frame first.
  const [seenPathname, setSeenPathname] = useState(pathname);
  if (seenPathname !== pathname) {
    setSeenPathname(pathname);
    setOpenId(null);
  }

  useEffect(() => clearTimers, [clearTimers]);

  // Click anywhere outside the nav closes it. `pointerdown` rather than
  // `click` so the panel is gone before whatever was clicked reacts.
  useEffect(() => {
    if (!openId) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpenId(null);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openId]);

  const triggerId = (id: string) => `mega-trigger-${id}`;

  function focusTrigger(id: string) {
    document.getElementById(triggerId(id))?.focus();
  }

  function focusFirstLink(id: string) {
    // The panel mounts on the state change, so the query has to wait a frame.
    requestAnimationFrame(() => {
      document.querySelector<HTMLAnchorElement>(`#mega-panel-${id} a`)?.focus();
    });
  }

  function onRootKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      if (!openId) return;
      event.preventDefault();
      const wasOpen = openId;
      close();
      focusTrigger(wasOpen);
      return;
    }

    const target = event.target as HTMLElement;
    const index = sections.findIndex((s) => target.id === triggerId(s.id));
    if (index === -1) return;

    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const step = event.key === "ArrowRight" ? 1 : -1;
      const next = sections[(index + step + sections.length) % sections.length];
      focusTrigger(next.id);
      // Moving along the row while a panel is open shows the neighbour's panel,
      // the way a native menu bar does; over a plain link there is nothing to show.
      if (openId) {
        if (next.kind === "menu") open(next.id);
        else close();
      }
      return;
    }

    const section = sections[index];
    if (event.key === "ArrowDown" && section.kind === "menu") {
      event.preventDefault();
      open(section.id);
      focusFirstLink(section.id);
    }
  }

  function onRootBlur(event: React.FocusEvent<HTMLElement>) {
    // Tabbing out of the last link (or shift-tabbing off the first trigger)
    // closes; moving between the row and the panel does not.
    if (!rootRef.current?.contains(event.relatedTarget as Node)) close();
  }

  function onRootPointerLeave(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType === "mouse") scheduleClose();
  }

  function onRootPointerEnter(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType === "mouse" && closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  const openMenu = sections.find((s): s is MegaNavMenu => s.kind === "menu" && s.id === openId);

  return (
    <nav
      ref={rootRef}
      aria-label="Primary"
      onKeyDown={onRootKeyDown}
      onBlur={onRootBlur}
      onPointerLeave={onRootPointerLeave}
      onPointerEnter={onRootPointerEnter}
      className="flex flex-1 items-center justify-center"
    >
      <ul className="flex items-center gap-0.5">
        {sections.map((section) =>
          section.kind === "link" ? (
            <li key={section.id}>
              <a
                id={triggerId(section.id)}
                href={localeHref(section.href, locale)}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse" && openId) scheduleClose();
                }}
                className={triggerClass}
              >
                {section.label}
              </a>
            </li>
          ) : (
            <li key={section.id}>
              <button
                id={triggerId(section.id)}
                type="button"
                aria-expanded={openId === section.id}
                aria-controls={`mega-panel-${section.id}`}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") scheduleOpen(section.id);
                }}
                onClick={() => (openId === section.id ? close() : open(section.id))}
                className={`group ${triggerClass} aria-expanded:border-[var(--sj-chrome-hairline)] aria-expanded:bg-[var(--sj-chrome-tint)] aria-expanded:text-[var(--sj-chrome-fg)]`}
              >
                {section.label}
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden
                  className="h-3 w-3 shrink-0 opacity-70 transition-transform duration-200 group-aria-expanded:rotate-180"
                >
                  <path d="m3.5 6 4.5 4.5L12.5 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </li>
          )
        )}
      </ul>

      {openMenu && (
        // Positioned against the fixed header (the nearest positioned ancestor),
        // full width, so the panel can centre on the page rather than on the row.
        <div className="absolute inset-x-0 top-full px-3 pt-1.5 sm:px-8 lg:px-11">
          <MegaNavPanel menu={openMenu} locale={locale} labelledBy={triggerId(openMenu.id)} onNavigate={close} />
        </div>
      )}
    </nav>
  );
}
