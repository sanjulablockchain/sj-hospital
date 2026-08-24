import { Ticker } from "@/components/ui/Ticker";

const tickerItems = [
  "Emergency open 24/7",
  "Surgical theatres to US protocol",
  "Cleaned every two hours",
  "Reports same day, checked twice",
  "Rooms from 10,000 LKR",
];

export function StatTicker() {
  return <Ticker items={tickerItems} />;
}
