import type { StatusKey } from "@/components/ui/status-chip";
import type { AccentKey, ProvinceKey, ServiceKey, UnitKey } from "@/types";

export type KpiCard = {
  id: string;
  label: string;
  value: string;
  hint: string;
  tone: AccentKey;
};

export type DonutSlice = {
  name: string;
  value: number;
  color: string;
};

export type TrendGranularity = "daily" | "weekly" | "monthly";

export type TrendPoint = {
  period: string;
  completed: number;
  pending: number;
};

export type AssignedFacility = {
  id: string;
  name: string;
  classification: string;
  district: string;
  registrationStatus: StatusKey;
};

export type ComplianceOutcome = {
  outcome: string;
  count: number;
  color: string;
};

/**
 * One chart in a unit/service-specific section. A single union keeps the
 * renderer generic, so a new unit is a data entry rather than a new component.
 */
export type ActivityChart = {
  id: string;
  title: string;
  caption?: string;
  kind: "bar" | "donut";
  data: { name: string; value: number; color: string }[];
};

export type FutureModule = {
  id: string;
  label: string;
  note: string;
};

export type InspectorDashboardData = {
  unit: UnitKey;
  service: ServiceKey | "all";
  workload: { kpis: KpiCard[] };
  progress: {
    donut: DonutSlice[];
    trend: Record<TrendGranularity, TrendPoint[]>;
  };
  facilities: AssignedFacility[];
  compliance: { averageScore: number; outcomes: ComplianceOutcome[] };
  activities: ActivityChart[];
  sampling: ActivityChart[];
  futureModules: FutureModule[];
};

/* ------------------------------------------------------------------ *
 * Executive dashboard (senior director)
 * ------------------------------------------------------------------ */

/**
 * Org-wide trend point. A sibling of `TrendPoint` rather than a widening of
 * it — `InspectionTrendChart` hardcodes completed/pending.
 */
export type ExecutiveTrendPoint = {
  period: string;
  received: number;
  approved: number;
};

/** One of the four Executive Highlights cards. */
export type HighlightCard = {
  id: string;
  /** What was measured, e.g. "Highest Approval Rate". */
  label: string;
  /** The winning service or unit — the answer, so it reads largest. */
  headline: string;
  /** Pre-formatted figure that won it, e.g. "1,284" or "92%". */
  value: string;
  hint: string;
  tone: AccentKey;
  href?: string;
};

/** One row of the Unit Performance summary table. */
export type UnitPerformanceRow = {
  unit: UnitKey;
  unitLabel: string;
  applications: number;
  inspections: number;
  /** Whole percent, 0–100. */
  approvalRate: number;
  /** Average processing turnaround in days, one decimal. */
  turnaroundDays: number;
  href: string;
};

/** A district bubble on the regulatory coverage map. */
export type GeoPoint = {
  id: string;
  name: string;
  province: ProvinceKey;
  provinceLabel: string;
  lat: number;
  lng: number;
  value: number;
  color: string;
};

/** Approval vs rejection for one service — needs two series per category. */
export type ComplianceByServicePoint = {
  name: string;
  approved: number;
  rejected: number;
};

export type ExecutiveDashboardData = {
  /** Echo of the active filters, so the view can caption itself. */
  scope: {
    unit: UnitKey | "all";
    service: ServiceKey | "all";
    province: ProvinceKey | "all";
    district: string | "all";
    period: string;
  };
  highlights: HighlightCard[];
  organizational: {
    kpis: KpiCard[];
    trend: Record<TrendGranularity, ExecutiveTrendPoint[]>;
  };
  coverage: {
    kpis: KpiCard[];
    points: GeoPoint[];
    categories: { id: string; label: string }[];
  };
  compliance: {
    byService: ComplianceByServicePoint[];
    approvalTrend: Record<TrendGranularity, ExecutiveTrendPoint[]>;
  };
  unitPerformance: UnitPerformanceRow[];
};
