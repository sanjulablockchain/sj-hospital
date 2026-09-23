"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { localeHref } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/locales";
import type { NetworkNode } from "../data/network";

/** Fills a `{name}` token into a translated screen-reader sentence. */
function fillName(template: string, name: string): string {
  return template.replace("{name}", name);
}

/**
 * Horizontal accordion across the network nodes, in the v4 reference's dress:
 * rounded cards with a 12px gap, the open panel widening to show its
 * photograph and description under a bottom-up ink gradient, the rest
 * collapsed to a 90px spine (64px tall, stacked vertically, under 760px)
 * carrying just the index and location.
 *
 * Every panel's text stays in the DOM in both states, so the collapse is purely
 * visual and assistive tech always has the full content.
 *
 * Two hit targets, in this order: the button that opens a panel, and, once a
 * panel is open, a link over the whole of it that leaves for the node's page.
 * Opening first and navigating second is what makes the panel work on a touch
 * screen, where there is no hover to open it: first tap opens, second tap
 * goes. With a mouse, hover has already opened the panel, so a click on it
 * navigates straight away. The button sits before the content in the DOM so
 * tabbing runs open, then follow, then on to the next panel.
 */
export function NetworkAccordion({
  nodes,
  aria,
  locale,
}: {
  nodes: readonly NetworkNode[];
  aria: { show: string; open: string };
  locale: Locale;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = nodes.length - 1;
    let nextIndex: number;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = index === lastIndex ? 0 : index + 1;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = index === 0 ? lastIndex : index - 1;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = lastIndex;
        break;
      default:
        return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);
    buttonRefs.current[nextIndex]?.focus();
  };

  return (
    <ul className="m-0 flex h-[760px] list-none flex-col gap-3 p-0 min-[760px]:h-[540px] min-[760px]:flex-row">
      {nodes.map((node, index) => {
        const isActive = index === activeIndex;
        const contentId = `${baseId}-network-${index}`;

        return (
          <li
            key={node.index}
            // Collapsed panels hold a fixed spine (64px tall stacked, 90px wide
            // in a row) and the open one takes whatever is left.
            className={`relative min-h-0 min-w-0 overflow-hidden rounded-[22px] bg-[#1A1540] shadow-[0_24px_48px_-30px_rgba(26,21,64,0.55)] transition-[flex-basis,flex-grow] duration-[600ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none ${
              isActive ? "grow basis-0" : "grow-0 basis-16 min-[760px]:basis-[90px]"
            }`}
          >
            <Image src={node.photo} alt="" fill sizes="(min-width: 760px) 75vw, 100vw" className="object-cover" />
            <div
              aria-hidden
              className="absolute inset-0 transition-[background] duration-[400ms] motion-reduce:transition-none"
              style={{
                background: isActive
                  ? "linear-gradient(rgba(26,21,64,0) 35%, rgba(26,21,64,0.9) 100%)"
                  : "rgba(35,26,92,0.72)",
              }}
            />

            <button
              ref={(element) => {
                buttonRefs.current[index] = element;
              }}
              type="button"
              aria-expanded={isActive}
              aria-controls={contentId}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className="absolute inset-0 z-10 flex items-center justify-center text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[var(--home-accent)] min-[760px]:items-end min-[760px]:pb-6"
            >
              <span className="sr-only">
                {isActive ? fillName(aria.open, node.name) : fillName(aria.show, node.name)}
              </span>
              <span
                aria-hidden
                className={`text-[12px] font-extrabold tracking-[0.2em] whitespace-nowrap text-white uppercase transition-opacity duration-[380ms] motion-reduce:transition-none min-[760px]:rotate-180 min-[760px]:[writing-mode:vertical-rl] ${
                  isActive ? "opacity-0" : "opacity-100 delay-[180ms]"
                }`}
              >
                {node.index} / {node.location}
              </span>
            </button>

            {/* Click-through except for the link, so the button below stays the
                hit target for a collapsed panel. Above the button while open,
                so the link's own stretched hit area covers the whole panel. */}
            <div
              id={contentId}
              className={`pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-2.5 border-b-[3px] border-[var(--home-accent)] p-6 text-white sm:p-8 ${
                isActive ? "animate-sj-fade-slow z-20 opacity-100 [animation-delay:200ms]" : "opacity-0"
              }`}
            >
              <span className="text-[12px] font-extrabold tracking-[0.2em] text-[#9FD6F5] uppercase">
                {node.index} / {node.location}
              </span>
              <h3 className="font-display m-0 wrap-break-word text-[clamp(26px,2.6vw,38px)] leading-[1.04] font-extrabold tracking-[-0.02em] text-white">
                {node.name}
              </h3>
              <p className="m-0 max-w-[440px] text-[15px] leading-[1.55] text-white/88">{node.body}</p>
              {/* Rendered for every panel, open or not, so all four
                  destinations are in the served HTML rather than appearing
                  only once a panel has been opened. A closed panel's link
                  takes no clicks and is out of the tab order; its own button
                  is how you reach it. */}
              <Link
                href={localeHref(node.href, locale)}
                tabIndex={isActive ? undefined : -1}
                className={`inline-flex w-fit items-center gap-2 text-[14px] font-extrabold text-[#9FD6F5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--home-accent)] ${
                  isActive ? "pointer-events-auto" : ""
                }`}
              >
                {node.linkLabel} <span aria-hidden>&rarr;</span>
                {/* Stretches the link over the panel: the parent already spans
                    it, and this span is the link's only positioned descendant
                    of it. */}
                <span className="absolute inset-0" />
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
