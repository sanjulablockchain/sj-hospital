"use client";

import { useEffect, useState } from "react";
import { roomTypes } from "../data/content";

// Derived from `roomTypes` rather than a locally hardcoded list, so the ids
// this component observes can never drift from the sections the page
// actually renders.
const rooms = roomTypes.map(({ id, name }) => ({ id, label: name }));

export function RoomTypeNav() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [activeId, setActiveId] = useState(rooms[0].id);

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const updateHeight = () => setHeaderHeight(header.getBoundingClientRect().height);
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(header);
    return () => resizeObserver.disconnect();
  }, []);

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
      { rootMargin: `-${headerHeight + 76}px 0px -55% 0px`, threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [headerHeight]);

  return (
    <div
      className="sticky z-30 border-b border-[var(--home-hairline)] bg-[var(--home-bg)]/95 backdrop-blur-md"
      style={{ top: headerHeight }}
    >
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
