import {
  accentColors,
  monthLabels,
  weekLabels,
  weekdayLabels,
} from "@/data/reference";
import {
  provinceDefinitions,
  rwandaDistricts,
  type DistrictGeo,
} from "@/data/geo";
import { unitContent, unitDefinitions, unitList } from "@/data/units";
import { rngFromString, rngInt, rngSeries } from "@/lib/seeded-random";
import type {
  ComplianceByServicePoint,
  ExecutiveDashboardData,
  ExecutiveTrendPoint,
  GeoPoint,
  HighlightCard,
  KpiCard,
  TrendGranularity,
  UnitPerformanceRow,
} from "@/types/dashboard";
import type { AccentKey, ProvinceKey, ServiceKey, UnitKey } from "@/types";

const DEFAULT_PERIOD = "2026-Q3";

/** One accent per unit — AccentKey happens to have exactly five values. */
const unitAccents: Record<UnitKey, AccentKey> = {
  "farm-products": "seed",
  "registration-licensing": "slaughterhouse",
  "industries-market-surveillance": "agrochemical",
  "import-inspection": "seed-producer",
  "competition-consumer-protection": "accent",
};

/** Regulated categories the coverage map can be filtered by. */
const coverageCategories = [
  { id: "all", label: "All registered entities" },
  { id: "seed-producers", label: "Seed Producers" },
  { id: "agrochemical-dealers", label: "Agrochemical Dealers" },
  { id: "butcheries", label: "Butcheries" },
  { id: "meat-carriers", label: "Meat Carriers" },
];

/** Sum of a unit's service workloadScales — its relative size. */
function mergedWorkloadScale(unit: UnitKey): number {
  const content = unitContent[unit];
  if (!content) return 30;

  const scales = Object.values(content.services)
    .filter((spec) => Boolean(spec))
    .map((spec) => spec!.workloadScale);

  if (scales.length === 0) return 30;
  return scales.reduce((sum, scale) => sum + scale, 0);
}

type UnitFigures = {
  unit: UnitKey;
  scale: number;
  applications: number;
  inspections: number;
  approved: number;
  rejected: number;
  pending: number;
  turnaroundDays: number;
};

/**
 * The single primitive every executive figure derives from. Everything else is
 * arithmetic over these records, so the KPI cards, the unit table and the
 * highlights always agree with one another.
 */
function buildUnitFigures(unit: UnitKey, period: string): UnitFigures {
  const rng = rngFromString(`exec:${unit}:${period}`);
  const scale = mergedWorkloadScale(unit);

  // An org-level unit handles far more than one inspector's caseload.
  const applications = rngInt(rng, scale * 14, scale * 20);
  const inspections = rngInt(
    rng,
    Math.round(applications * 0.55),
    Math.round(applications * 0.8),
  );
  const approved = rngInt(
    rng,
    Math.round(applications * 0.58),
    Math.round(applications * 0.78),
  );
  const rejected = rngInt(
    rng,
    Math.round(applications * 0.06),
    Math.round(applications * 0.16),
  );
  const pending = Math.max(0, applications - approved - rejected);
  const turnaroundDays = rngInt(rng, 40, 180) / 10;

  return {
    unit,
    scale,
    applications,
    inspections,
    approved,
    rejected,
    pending,
    turnaroundDays,
  };
}

/** Deterministic share of national activity attributable to a province. */
function provinceWeight(province: ProvinceKey): number {
  const rng = rngFromString(`exec:province-weight:${province}`);
  // Kigali carries more regulated activity than the rural provinces.
  const base = province === "kigali" ? 0.3 : 0.14;
  return base + rng() * 0.06;
}

function buildExecutiveTrend(
  seedPrefix: string,
  labels: readonly string[],
  base: number,
): ExecutiveTrendPoint[] {
  const rng = rngFromString(`${seedPrefix}:exec-trend`);

  const received = rngSeries(rng, {
    length: labels.length,
    start: base,
    drift: base * 0.03,
    jitter: base * 0.28,
    min: 1,
  });
  const approved = rngSeries(rng, {
    length: labels.length,
    start: base * 0.68,
    drift: base * 0.025,
    jitter: base * 0.2,
    min: 1,
  });

  return labels.map((period, index) => ({
    period,
    // Approvals can never exceed what was received.
    received: received[index]!,
    approved: Math.min(received[index]!, approved[index]!),
  }));
}

function buildGeoPoints(args: {
  figures: UnitFigures[];
  category: string;
  province: ProvinceKey | "all";
  district: string | "all";
  period: string;
  unit: UnitKey | "all";
}): GeoPoint[] {
  const { figures, category, province, district, period, unit } = args;

  // Tint the bubbles with the unit's accent when one unit is in scope.
  const pointColor =
    unit === "all" ? accentColors.accent : accentColors[unitAccents[unit]];

  const totalEntities = figures.reduce(
    (sum, figure) => sum + figure.applications,
    0,
  );

  let districts: readonly DistrictGeo[] = rwandaDistricts;
  if (province !== "all") {
    districts = districts.filter((item) => item.province === province);
  }
  if (district !== "all") {
    districts = districts.filter((item) => item.id === district);
  }

  return districts.map((item) => {
    const rng = rngFromString(
      `exec:geo:${item.id}:${category}:${period}`,
    );
    const weight = provinceWeight(item.province);
    const share = (weight / (districtCountFor(item.province) || 1)) * 1.4;
    const value = Math.max(
      4,
      Math.round(totalEntities * share * (0.55 + rng() * 0.9)),
    );

    return {
      id: item.id,
      name: item.name,
      province: item.province,
      provinceLabel: provinceDefinitions[item.province].shortLabel,
      lat: item.lat,
      lng: item.lng,
      value,
      // Resolves because --stream-*/--accent live on :root. If those vars are
      // ever scoped to a subtree, Leaflet's SVG attrs will stop picking them up.
      color: pointColor,
    };
  });
}

function districtCountFor(province: ProvinceKey): number {
  return rwandaDistricts.filter((item) => item.province === province).length;
}

function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

export function buildExecutiveDashboard(args?: {
  unit?: UnitKey | "all";
  service?: ServiceKey | "all";
  province?: ProvinceKey | "all";
  district?: string | "all";
  category?: string;
  period?: string;
}): ExecutiveDashboardData {
  const {
    unit = "all",
    service = "all",
    province = "all",
    district = "all",
    category = "all",
    period = DEFAULT_PERIOD,
  } = args ?? {};

  // Iterate unitList explicitly so ordering is source-declared.
  const allFigures = unitList.map((definition) =>
    buildUnitFigures(definition.id, period),
  );
  const scoped =
    unit === "all"
      ? allFigures
      : allFigures.filter((figure) => figure.unit === unit);

  // A province filter narrows the org totals to that province's share.
  const geographicShare =
    province === "all" ? 1 : Math.min(1, provinceWeight(province) * 1.6);

  const scale = (value: number) => Math.round(value * geographicShare);

  const totals = scoped.reduce(
    (acc, figure) => ({
      applications: acc.applications + figure.applications,
      inspections: acc.inspections + figure.inspections,
      approved: acc.approved + figure.approved,
      rejected: acc.rejected + figure.rejected,
      pending: acc.pending + figure.pending,
    }),
    { applications: 0, inspections: 0, approved: 0, rejected: 0, pending: 0 },
  );

  const seedPrefix = `exec:${unit}:${service}:${province}:${district}:${period}`;

  /* --- Section 2: Organizational Performance --- */
  const organizationalKpis: KpiCard[] = [
    {
      id: "applications",
      label: "Applications Received",
      value: formatNumber(scale(totals.applications)),
      hint: unit === "all" ? "Across all five units" : unitDefinitions[unit].shortLabel,
      tone: "accent",
    },
    {
      id: "inspections",
      label: "Inspections Conducted",
      value: formatNumber(scale(totals.inspections)),
      hint: `${Math.round((totals.inspections / Math.max(1, totals.applications)) * 100)}% of applications`,
      tone: "seed",
    },
    {
      id: "approved",
      label: "Total Approved",
      value: formatNumber(scale(totals.approved)),
      hint: `${Math.round((totals.approved / Math.max(1, totals.applications)) * 100)}% approval rate`,
      tone: "slaughterhouse",
    },
    {
      id: "rejected",
      label: "Total Rejected",
      value: formatNumber(scale(totals.rejected)),
      hint: `${Math.round((totals.rejected / Math.max(1, totals.applications)) * 100)}% rejection rate`,
      tone: "agrochemical",
    },
    {
      id: "pending",
      label: "Total Pending",
      value: formatNumber(scale(totals.pending)),
      hint: "Awaiting decision",
      tone: "seed-producer",
    },
  ];

  const trendBase = Math.max(8, Math.round(scale(totals.applications) / 12));
  const organizationalTrend: Record<TrendGranularity, ExecutiveTrendPoint[]> = {
    daily: buildExecutiveTrend(`${seedPrefix}:daily`, weekdayLabels, trendBase / 5),
    weekly: buildExecutiveTrend(`${seedPrefix}:weekly`, weekLabels, trendBase / 2),
    monthly: buildExecutiveTrend(`${seedPrefix}:monthly`, monthLabels, trendBase),
  };

  /* --- Section 5: Unit Performance (built before highlights, which read it) --- */
  const unitPerformance: UnitPerformanceRow[] = scoped.map((figure) => ({
    unit: figure.unit,
    unitLabel: unitDefinitions[figure.unit].shortLabel,
    applications: scale(figure.applications),
    inspections: scale(figure.inspections),
    approvalRate: Math.round(
      (figure.approved / Math.max(1, figure.applications)) * 100,
    ),
    turnaroundDays: figure.turnaroundDays,
    href: `/senior-director/units/${figure.unit}`,
  }));

  /* --- Section 1: Executive Highlights --- */
  const byApplications = [...unitPerformance].sort(
    (a, b) => b.applications - a.applications,
  );
  const byApproval = [...unitPerformance].sort(
    (a, b) => b.approvalRate - a.approvalRate,
  );
  const byInspections = [...unitPerformance].sort(
    (a, b) => b.inspections - a.inspections,
  );

  const mostApplications = byApplications[0];
  const bestApproval = byApproval[0];
  const worstApproval = byApproval[byApproval.length - 1];
  const busiest = byInspections[0];

  const highlights: HighlightCard[] = [
    {
      id: "most-applications",
      label: "Highest Applications Received",
      headline: mostApplications?.unitLabel ?? "—",
      value: formatNumber(mostApplications?.applications ?? 0),
      hint: "Applications in the selected period",
      tone: "accent",
      href: mostApplications?.href,
    },
    {
      id: "best-approval",
      label: "Highest Approval Rate",
      headline: bestApproval?.unitLabel ?? "—",
      value: `${bestApproval?.approvalRate ?? 0}%`,
      hint: "Approved as a share of applications",
      tone: "seed",
      href: bestApproval?.href,
    },
    {
      id: "worst-approval",
      label: "Lowest Approval Rate",
      headline: worstApproval?.unitLabel ?? "—",
      value: `${worstApproval?.approvalRate ?? 0}%`,
      hint: "May warrant review",
      tone: "agrochemical",
      href: worstApproval?.href,
    },
    {
      id: "busiest-unit",
      label: "Highest Operational Workload",
      headline: busiest?.unitLabel ?? "—",
      value: formatNumber(busiest?.inspections ?? 0),
      hint: "Inspections conducted",
      tone: "slaughterhouse",
      href: busiest?.href,
    },
  ];

  /* --- Section 3: Regulatory Coverage --- */
  const coverageRng = rngFromString(`${seedPrefix}:coverage`);
  const coverageKpis: KpiCard[] = [
    {
      id: "seed-producers",
      label: "Registered Seed Producers",
      value: formatNumber(scale(rngInt(coverageRng, 280, 460))),
      hint: "Active registrations",
      tone: "seed",
    },
    {
      id: "agrochemical-dealers",
      label: "Registered Agrochemical Dealers",
      value: formatNumber(scale(rngInt(coverageRng, 320, 520))),
      hint: "Active licences",
      tone: "agrochemical",
    },
    {
      id: "butcheries",
      label: "Registered Butcheries",
      value: formatNumber(scale(rngInt(coverageRng, 540, 880))),
      hint: "Active registrations",
      tone: "seed-producer",
    },
    {
      id: "meat-carriers",
      label: "Registered Meat Carriers",
      value: formatNumber(scale(rngInt(coverageRng, 180, 340))),
      hint: "Licensed vehicles",
      tone: "slaughterhouse",
    },
  ];

  const points = buildGeoPoints({
    figures: scoped,
    category,
    province,
    district,
    period,
    unit,
  });

  /* --- Section 4: Compliance --- */
  // Break down by service for Farm Products, otherwise by unit.
  const complianceSource =
    unit === "farm-products" && unitDefinitions[unit].services.length > 0
      ? unitDefinitions[unit].services.map((definition) => ({
          name: definition.shortLabel,
          seed: `${seedPrefix}:svc:${definition.id}`,
        }))
      : scoped.map((figure) => ({
          name: unitDefinitions[figure.unit].shortLabel,
          seed: `${seedPrefix}:unit:${figure.unit}`,
        }));

  const byService: ComplianceByServicePoint[] = complianceSource.map((item) => {
    const rng = rngFromString(item.seed);
    const approved = rngInt(rng, 120, 460);
    const rejected = rngInt(
      rng,
      Math.round(approved * 0.08),
      Math.round(approved * 0.3),
    );
    return { name: item.name, approved: scale(approved), rejected: scale(rejected) };
  });

  const approvalTrend: Record<TrendGranularity, ExecutiveTrendPoint[]> = {
    daily: buildExecutiveTrend(`${seedPrefix}:appr-daily`, weekdayLabels, trendBase / 6),
    weekly: buildExecutiveTrend(`${seedPrefix}:appr-weekly`, weekLabels, trendBase / 2.5),
    monthly: buildExecutiveTrend(`${seedPrefix}:appr-monthly`, monthLabels, trendBase * 0.85),
  };

  return {
    scope: { unit, service, province, district, period },
    highlights,
    organizational: { kpis: organizationalKpis, trend: organizationalTrend },
    coverage: { kpis: coverageKpis, points, categories: coverageCategories },
    compliance: { byService, approvalTrend },
    unitPerformance,
  };
}
