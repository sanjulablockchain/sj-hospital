"use client";

import { useCallback } from "react";
import { useCountUp } from "../hooks/useCountUp";

// Locale is pinned so the server and client format identically.
const grouper = new Intl.NumberFormat("en-US");

type CountUpProps = {
  /** Value to land on. Also the value rendered on the server. */
  to: number;
  /** Value to start from. Defaults to 0. */
  from?: number;
  durationMs?: number;
  /** Render with thousands separators, e.g. 10,000. */
  grouped?: boolean;
  className?: string;
};

export function CountUp({ to, from, durationMs, grouped = false, className }: CountUpProps) {
  const format = useCallback(
    (value: number) => (grouped ? grouper.format(value) : String(value)),
    [grouped]
  );
  const ref = useCountUp(to, { from, durationMs, format });

  return (
    <span ref={ref} className={className}>
      {format(to)}
    </span>
  );
}
