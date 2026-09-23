import type { HomeIconKey } from "../types";

const PATHS: Record<HomeIconKey, string[]> = {
  steth: ["M5 3H4v6a5 5 0 0 0 10 0V3h-1", "M9 14v1a6 6 0 0 0 12 0v-3", "M21 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"],
  phone: [
    "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z",
  ],
  ambulance: [
    "M2 17V6h12v11",
    "M14 9h4.5L22 13v4h-8",
    "M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z",
    "M15 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z",
    "M8 8.5v5M5.5 11h5",
  ],
  nurse: [
    "M7 7V4l5-2 5 2v3",
    "M10.5 4.5h3M12 3v3",
    "M7 7a5 5 0 0 0 10 0",
    "M4 22v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2",
    "M12 16v4M10 18h4",
  ],
  pin: ["M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z", "M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"],
  clock: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M12 6v6l4 2"],
  grid: ["M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"],
  building: ["M4 21V5l8-3 8 3v16", "M2 21h20", "M9 21v-4h6v4", "M10 8h4M12 6v4", "M8 13h.01M12 13h.01M16 13h.01"],
  spark: [
    "M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7-4.7-1.8 4.7-1.8Z",
    "M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z",
  ],
  plane: [
    "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z",
  ],
  pill: ["M10.5 20.5 20.5 10.5a5 5 0 0 0-7-7L3.5 13.5a5 5 0 0 0 7 7Z", "M8.5 8.5l7 7"],
  home: ["M3 10.5 12 3l9 7.5V21H3Z", "M12 11v6M9 14h6"],
  globe: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M2 12h20", "M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z"],
  school: ["M22 9 12 4 2 9l10 5 10-5Z", "M6 11v5c3 2.5 9 2.5 12 0v-5", "M22 9v6"],
  bed: ["M2 19V6", "M2 15h20v4", "M22 15v-4a3 3 0 0 0-3-3h-8v7", "M6.5 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"],
  shield: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z", "M9 12l2 2 4-4"],
  drop: ["M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z", "M9 14a3 3 0 0 0 3 3"],
  report: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z", "M14 2v6h6", "M8 14l2.5 2.5L16 11"],
  flask: ["M9 3h6M10 3v6L4 19a2 2 0 0 0 1.7 3h12.6A2 2 0 0 0 20 19l-6-10V3", "M7 15h10"],
  left: ["M19 12H5", "M12 19l-7-7 7-7"],
  right: ["M5 12h14", "M12 5l7 7-7 7"],
  arrow: ["M5 12h14", "M13 6l6 6-6 6"],
  chat: ["M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.5A9 9 0 1 1 21 12Z"],
};

/**
 * The home page's line icons: the reference's own path data, 24-unit grid,
 * stroked in `currentColor`. Decorative everywhere they are used (each sits
 * beside a label), so they are hidden from assistive tech.
 */
export function HomeIcon({
  name,
  size = 24,
  stroke = 1.8,
  className,
}: {
  name: HomeIconKey;
  size?: number;
  stroke?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ? `block ${className}` : "block"}
    >
      {PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
