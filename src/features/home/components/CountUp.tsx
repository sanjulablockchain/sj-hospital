import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { splitCount } from "../countFormat";

/**
 * A stat figure that counts up from zero the first time it scrolls into view:
 * "24/7" runs 0 to 24 and keeps its "/7", "2h" keeps its "h", "10%" its "%".
 * A figure with no digits ("Negombo", "Digital") renders as plain text. The
 * counting itself is the shared `AnimatedCounter`, a Client Component that
 * holds still under prefers-reduced-motion; this wrapper is a Server
 * Component that only decides what to hand it.
 */
export function CountUp({ display, className }: { display: string; className?: string }) {
  const split = splitCount(display);
  if (!split) return <span className={className}>{display}</span>;
  return (
    <AnimatedCounter
      target={split.value}
      prefix={split.prefix}
      suffix={split.suffix}
      durationMs={2800}
      className={className}
    />
  );
}
