"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { networkNodes } from "../data/network";

/**
 * Horizontal accordion across the network nodes: the open panel widens to show
 * its photograph and description, the rest collapse to a spine carrying just
 * the location. Below 640px it lays out vertically, where a horizontal
 * accordion has no room to work.
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
export function NetworkAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = networkNodes.length - 1;
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
    <ul className="flex h-[610px] flex-col gap-px bg-[var(--home-hairline)] min-[640px]:h-[540px] min-[640px]:flex-row">
      {networkNodes.map((node, index) => {
        const isActive = index === activeIndex;
        const contentId = `${baseId}-network-${index}`;

        return (
          <li
            key={node.name}
            // Collapsed panels hold a fixed spine width (height on mobile) and
            // the open one takes whatever is left, which reads far better than
            // splitting the row proportionally.
            style={{
              flexGrow: isActive ? 1 : 0,
              flexBasis: isActive ? "0%" : "5.5rem",
            }}
            className="relative overflow-hidden bg-[#08123A] transition-[flex-basis,flex-grow] duration-[620ms] ease-[cubic-bezier(0.22,0.68,0.24,1)] motion-reduce:transition-none"
          >
            <Image
              src={node.photo}
              alt=""
              fill
              sizes="(min-width: 640px) 75vw, 100vw"
              className={`object-cover transition-[opacity,transform] duration-[900ms] ease-out motion-reduce:transition-none ${
                isActive ? "scale-100 opacity-60" : "scale-[1.08] opacity-25"
              }`}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(rgba(6,11,31,0.24) 18%, rgba(6,11,31,0.62) 58%, rgba(6,11,31,0.95) 100%)",
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
              className="absolute inset-0 z-10 flex items-center px-6 text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[var(--home-accent)] min-[640px]:justify-center min-[640px]:px-0"
            >
              <span className="sr-only">
                {isActive ? `${node.name}, open` : `Show ${node.name}`}
              </span>
              <span
                aria-hidden
                className={`text-[12px] font-bold tracking-[0.2em] whitespace-nowrap text-white/80 uppercase transition-opacity duration-[380ms] motion-reduce:transition-none min-[640px]:rotate-180 min-[640px]:[writing-mode:vertical-rl] ${
                  isActive ? "opacity-0" : "opacity-100 delay-[180ms]"
                }`}
              >
                <span className="text-[var(--home-accent)]">{node.index}</span>
                &nbsp;&nbsp;{node.location}
              </span>
            </button>

            {/* Click-through except for the link, so the button below stays the
                hit target for a collapsed panel. Above the button while open,
                so the link's own stretched hit area covers the whole panel. */}
            <div
              id={contentId}
              className={`pointer-events-none absolute inset-0 flex flex-col justify-end p-6 transition-[opacity,transform] duration-[520ms] ease-out motion-reduce:transition-none min-[640px]:p-7.5 ${
                isActive
                  ? "z-20 translate-y-0 opacity-100 delay-[140ms]"
                  : "translate-y-3 opacity-0 min-[640px]:opacity-0"
              }`}
            >
              <span className="text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">
                {node.index} &nbsp;/&nbsp; {node.location}
              </span>
              <h3 className="font-display mt-3 text-[clamp(24px,2.6vw,38px)] leading-[1.04] font-semibold tracking-[-0.03em] text-white">
                {node.name}
              </h3>
              <p className="mt-3 max-w-[42ch] text-[14.5px] leading-[1.55] text-white/78">{node.body}</p>
              {/* Rendered for every panel, open or not, so all four
                  destinations are in the served HTML rather than appearing
                  only once a panel has been opened. A closed panel's link
                  takes no clicks and is out of the tab order; its own button
                  is how you reach it. */}
              <Link
                href={node.href}
                tabIndex={isActive ? undefined : -1}
                className={`mt-4.5 inline-flex w-fit items-center gap-2 border-b border-[#7FCBFF]/40 pb-0.5 text-[14px] font-bold text-[#7FCBFF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--home-accent)] ${
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

            <div
              aria-hidden
              className={`absolute z-30 bg-[var(--home-accent)] transition-transform duration-[520ms] ease-out motion-reduce:transition-none max-[639px]:inset-y-0 max-[639px]:left-0 max-[639px]:w-[3px] max-[639px]:origin-top min-[640px]:inset-x-0 min-[640px]:bottom-0 min-[640px]:h-[3px] min-[640px]:origin-left ${
                isActive ? "scale-100" : "max-[639px]:scale-y-0 min-[640px]:scale-x-0"
              }`}
            />
          </li>
        );
      })}
    </ul>
  );
}
