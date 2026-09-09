"use client";

import { useEffect, useState } from "react";

type Room = { id: string; label: string };

/**
 * The sticky room-type bar pins just under the site header: `ThemedHeader` is
 * fixed over every page, `--sj-header-h` tall (globals.css), so this bar sits
 * at `top-[var(--sj-header-h)]` and the `IntersectionObserver`'s `rootMargin`
 * adds the same height. `RoomsSection.tsx`'s scroll margin on each room
 * wrapper is this bar's own height plus the header's; see the comment there
 * for the arithmetic.
 *
 * `rooms` arrives as a prop rather than an import: this is a client
 * component, so it never reads `data/content.ts` directly, and its parent
 * (`RoomsSection`) builds it from the same localized `roomTypes` the room
 * headings read, using `shortName` (not `name`) for the same short forms
 * the jump cards and footer already use ("Standard", "Super Deluxe"). That
 * is what keeps the chip labels and the headings they scroll to reading the
 * same translated text: there is exactly one place this component's copy is
 * translated, and `id` (never translated) is what the observer and the
 * anchors below key off, not the label.
 */
export function RoomTypeNav({ rooms }: { rooms: Room[] }) {
  const [activeId, setActiveId] = useState(rooms[0]?.id);

  useEffect(() => {
    const sections = rooms
      .map((room) => document.getElementById(room.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const topMostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (topMostVisible) setActiveId(topMostVisible.target.id);
      },
      // 64px is this bar's own rendered height (a 1px bottom border + `py-3`'s
      // 24px + a chip's 36px, rounded up) and 88px is the fixed site header
      // above it (`--sj-header-h` at this width; rootMargin cannot read a CSS
      // variable), so a section only counts as "reached" once it has scrolled
      // clear of both.
      { rootMargin: "-152px 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [rooms]);

  return (
    <div className="sticky top-[var(--sj-header-h)] z-30 border-b border-[var(--home-hairline)] bg-[var(--home-bg)]/95 backdrop-blur-md">
      <div className="themed-scrollbar mx-auto flex max-w-[1240px] gap-2 overflow-x-auto px-6 py-3">
        {rooms.map((room) => (
          <a
            key={room.id}
            href={`#${room.id}`}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition ${
              activeId === room.id
                ? "bg-[var(--home-accent)] text-[var(--home-on-accent)]"
                : "text-[var(--home-muted)] hover:text-[var(--home-heading)]"
            }`}
          >
            {room.label}
          </a>
        ))}
      </div>
    </div>
  );
}
