"use client";

import dynamic from "next/dynamic";
import type { EntityMapProps } from "./entity-map.client";

/**
 * Leaflet touches `window` at import time, so the map must never render on the
 * server. `ssr: false` is only legal inside a client component — hence this
 * shim, kept module-scoped so the dynamic component identity stays stable
 * across renders.
 */
const EntityMapClient = dynamic(() => import("./entity-map.client"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center border border-border bg-default/40">
      <span className="text-sm text-muted">Loading map…</span>
    </div>
  ),
});

export function EntityMap(props: EntityMapProps) {
  return <EntityMapClient {...props} />;
}
