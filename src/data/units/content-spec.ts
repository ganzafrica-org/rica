import type { ServiceKey, UnitKey } from "@/types";

/**
 * Declarative vocabulary for one unit's demo data. The generator turns this
 * into numbers; adding a new unit means writing one of these, not new code.
 */
export type ActivityChartSpec = {
  id: string;
  title: string;
  caption?: string;
  kind: "bar" | "donut";
  /** Category labels the generator assigns values to. */
  categories: readonly string[];
  /** Rough magnitude of the largest bucket. */
  scale: number;
};

export type ServiceContentSpec = {
  /** Words combined into facility names, e.g. "Kigali Seed Cooperative". */
  facilityPrefixes: readonly string[];
  facilitySuffixes: readonly string[];
  /** Facility classification values for the assigned-facilities table. */
  classifications: readonly string[];
  activities: readonly ActivityChartSpec[];
  sampling: readonly ActivityChartSpec[];
  /** Baseline workload — the generator jitters around this. */
  workloadScale: number;
};

export type UnitContentSpec = {
  unit: UnitKey;
  /** Per-service content. Units without services use the "all" key alone. */
  services: Partial<Record<ServiceKey | "all", ServiceContentSpec>>;
  futureModules: readonly { id: string; label: string; note: string }[];
};
