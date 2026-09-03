import { Ticker } from "@/components/ui/Ticker";

export function StatTicker({ items }: { items: readonly string[] }) {
  return <Ticker items={items} />;
}
