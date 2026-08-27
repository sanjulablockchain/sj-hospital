"use client";

import { useEffect, useState } from "react";
import { roomTypes } from "../data/content";

// Derived from `roomTypes` rather than a locally hardcoded list, so the ids
// this component observes can never drift from the sections the page
// actually renders. `shortName` (not `name`) keeps the chip labels matching
// the short forms the jump cards and footer already use ("Standard", "Super
// Deluxe"), not the fuller "Standard Rooms" / "Super Deluxe Rooms".
const rooms = roomTypes.map(({ id, shortName }) => ({ id, label: shortName }));

/**
 * The sticky room-type bar sits at `top-0`: `ThemedHeader` is `relative`
 * inside the hero (the layout's `flowHeader` prop), not sticky itself, so
 * there is no header height to offset this bar by, and none to add to the
 * `IntersectionObserver`'s `rootMargin` either. `RoomsSection.tsx`'s
 * `scroll-mt-[88px]` on each room wrapper is derived from this bar's own
 * rendered height; see the comment there for the arithmetic.
 */
export function RoomTypeNav() {
  const [activeId, setActiveId] = useState(rooms[0].id);

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
      // -64px is this bar's own rendered height (a 1px bottom border + `py-3`'s
      // 24px + a chip's 36px, rounded up), so a section only counts as
      // "reached" once it has scrolled clear of the bar sitting over it.
      { rootMargin: "-64px 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-0 z-30 border-b border-[var(--home-hairline)] bg-[var(--home-bg)]/95 backdrop-blur-md">
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
