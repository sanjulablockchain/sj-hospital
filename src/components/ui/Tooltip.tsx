"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  triggerClassName?: string;
  panelClassName?: string;
};

export function Tooltip({
  content,
  children,
  triggerClassName = "",
  panelClassName = "",
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="group/tooltip relative h-full">
      <button
        type="button"
        aria-describedby={panelId}
        data-open={open}
        onClick={() => setOpen((value) => !value)}
        onBlur={() => setOpen(false)}
        className={`group w-full ${triggerClassName}`}
      >
        {children}
      </button>
      <div
        id={panelId}
        role="tooltip"
        className={`pointer-events-none absolute top-full left-1/2 z-20 mt-2 w-40 -translate-x-1/2 translate-y-1 rounded-xl border border-ink/10 bg-ink px-3 py-2 text-xs leading-relaxed text-white opacity-0 shadow-[0_18px_32px_-16px_rgba(20,10,50,0.55)] transition duration-200 ease-out sm:w-48 group-hover/tooltip:translate-y-0 group-hover/tooltip:opacity-100 group-hover/tooltip:pointer-events-auto group-focus-within/tooltip:translate-y-0 group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:pointer-events-auto ${
          open ? "translate-y-0 opacity-100 pointer-events-auto" : ""
        } ${panelClassName}`}
      >
        <span
          aria-hidden="true"
          className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 rounded-xs bg-ink"
        />
        {content}
      </div>
    </div>
  );
}
