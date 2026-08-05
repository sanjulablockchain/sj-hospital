"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";

const HOSPITAL_COORDS: [number, number] = [7.206699127328975, 79.8453343846586];

export function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !container) return;

      const map = L.map(container, {
        center: HOSPITAL_COORDS,
        zoom: 16,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const marker = L.divIcon({
        className: "",
        html: `
          <svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg"
            style="filter:drop-shadow(0 6px 8px rgba(30,27,46,0.35));">
            <path d="M18 0C8.06 0 0 8.06 0 18c0 12.5 18 28 18 28s18-15.5 18-28C36 8.06 27.94 0 18 0Z"
              fill="#4A2A82" stroke="#33B4E5" stroke-width="2" />
            <circle cx="18" cy="18" r="7" fill="#ffffff" />
          </svg>
        `,
        iconSize: [36, 46],
        iconAnchor: [18, 46],
        popupAnchor: [0, -42],
      });

      const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${HOSPITAL_COORDS[0]},${HOSPITAL_COORDS[1]}`;

      L.marker(HOSPITAL_COORDS, { icon: marker })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:inherit;min-width:180px;">
            <p style="margin:0 0 6px;font-weight:700;color:#1e1b2e;">St. Joseph Hospital Negombo</p>
            <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer"
              style="color:#14769f;font-weight:600;text-decoration:none;">Get Directions &rarr;</a>
          </div>`
        );

      mapRef.current = map;
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-label="Interactive map showing St. Joseph Hospital Negombo location"
      className="relative isolate h-80 w-full overflow-hidden rounded-2xl border border-ink/10"
    />
  );
}
