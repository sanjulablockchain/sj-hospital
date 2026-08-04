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
        html: '<div style="width:34px;height:34px;border-radius:9999px;background:#4A2A82;border:3px solid #33B4E5;box-shadow:0 6px 16px rgba(74,42,130,0.45);"></div>',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      L.marker(HOSPITAL_COORDS, { icon: marker })
        .addTo(map)
        .bindPopup("St. Joseph Hospital Negombo");

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
      role="img"
      aria-label="Map showing St. Joseph Hospital Negombo location"
      className="h-80 w-full overflow-hidden rounded-2xl border border-ink/10"
    />
  );
}
