"use client";

import "leaflet/dist/leaflet.css";
import {
  CircleMarker,
  MapContainer,
  TileLayer,
  Tooltip as LeafletTooltip,
} from "react-leaflet";
import { rwandaCenter, rwandaMaxBounds } from "@/data/geo";
import { cn } from "@/lib/utils";
import type { GeoPoint } from "@/types/dashboard";

export type EntityMapProps = {
  points: readonly GeoPoint[];
  className?: string;
};

const MIN_RADIUS = 6;
const MAX_RADIUS = 26;

/**
 * Proportional-symbol map of registered entities.
 *
 * Uses CircleMarker rather than Marker: Leaflet's default marker icon resolves
 * PNG URLs through its stylesheet, which breaks under bundlers. Circles are
 * pure SVG, need no assets, and are the right form for showing distribution.
 */
export default function EntityMap({ points, className }: EntityMapProps) {
  const maxValue = points.reduce(
    (max, point) => Math.max(max, point.value),
    1,
  );

  return (
    <div
      className={cn(
        "h-[420px] w-full overflow-hidden border border-border",
        className,
      )}
    >
      <MapContainer
        center={[rwandaCenter.lat, rwandaCenter.lng]}
        zoom={8}
        minZoom={7}
        maxZoom={12}
        maxBounds={rwandaMaxBounds}
        maxBoundsViscosity={0.8}
        // A map that hijacks page scroll inside a scrolling dashboard is a
        // genuine UX defect — zoom stays on the controls.
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />

        {points.map((point) => {
          // Area-proportional: scaling the radius linearly would make the
          // largest districts look several times heavier than they are.
          const radius =
            MIN_RADIUS +
            (MAX_RADIUS - MIN_RADIUS) * Math.sqrt(point.value / maxValue);

          return (
            <CircleMarker
              key={point.id}
              center={[point.lat, point.lng]}
              radius={radius}
              pathOptions={{
                color: point.color,
                fillColor: point.color,
                fillOpacity: 0.45,
                weight: 1.5,
              }}
            >
              <LeafletTooltip direction="top" opacity={1}>
                <span className="text-xs font-medium">{point.name}</span>
                <br />
                <span className="text-xs">
                  {point.value.toLocaleString("en-US")} entities ·{" "}
                  {point.provinceLabel}
                </span>
              </LeafletTooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
