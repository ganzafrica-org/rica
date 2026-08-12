import {
  accentColors,
  complianceOutcomeColors,
  complianceOutcomeLabels,
  districts,
  monthLabels,
  weekLabels,
  weekdayLabels,
} from "@/data/reference";
import { getService, unitContent, unitDefinitions } from "@/data/units";
import type {
  ActivityChartSpec,
  ServiceContentSpec,
} from "@/data/units/content-spec";
import {
  rngFromString,
  rngInt,
  rngPick,
  rngSeries,
  rngSplit,
} from "@/lib/seeded-random";
import type { StatusKey } from "@/components/ui/status-chip";
import type {
  ActivityChart,
  AssignedFacility,
  InspectorDashboardData,
  KpiCard,
  TrendPoint,
} from "@/types/dashboard";
import type { AccentKey, ServiceKey, UnitKey } from "@/types";

const registrationStatuses: StatusKey[] = [
  "approved",
  "approved",
  "pending",
  "not-started",
];

/** Accent for the current selection — the service's own, or RICA green. */
function accentFor(unit: UnitKey, service: ServiceKey | "all"): AccentKey {
  if (service === "all") return "accent";
  return getService(unit, service)?.accent ?? "accent";
}

/**
 * Merge every service's content when no single service is selected, so "All"
 * shows the unit as a whole rather than an arbitrary service.
 */
function resolveContent(
  unit: UnitKey,
  service: ServiceKey | "all",
): ServiceContentSpec | undefined {
  const content = unitContent[unit];
  if (!content) return undefined;

  if (service !== "all") return content.services[service];

  const specs = Object.values(content.services).filter(
    (spec): spec is ServiceContentSpec => Boolean(spec),
  );
  if (specs.length === 0) return undefined;
  if (specs.length === 1) return specs[0];

  return {
    facilityPrefixes: specs.flatMap((spec) => spec.facilityPrefixes),
    facilitySuffixes: specs.flatMap((spec) => spec.facilitySuffixes),
    classifications: specs.flatMap((spec) => spec.classifications),
    workloadScale: specs.reduce((sum, spec) => sum + spec.workloadScale, 0),
    // "All" shows each service's headline chart rather than a merged blur.
    activities: specs.flatMap((spec) => spec.activities.slice(0, 1)),
    sampling: specs.flatMap((spec) => spec.sampling.slice(0, 1)),
  };
}

function buildActivityCharts(
  specs: readonly ActivityChartSpec[],
  seedPrefix: string,
  accent: AccentKey,
): ActivityChart[] {
  return specs.map((spec) => {
    const rng = rngFromString(`${seedPrefix}:${spec.id}`);
    const palette = [
      accentColors.seed,
      accentColors.slaughterhouse,
      accentColors.agrochemical,
      accentColors["seed-producer"],
      accentColors.accent,
    ];

    return {
      id: spec.id,
      title: spec.title,
      caption: spec.caption,
      kind: spec.kind,
      data: spec.categories.map((name, index) => ({
        name,
        value: rngInt(rng, Math.round(spec.scale * 0.25), spec.scale),
        color: spec.kind === "donut" ? palette[index % palette.length]! : accentColors[accent],
      })),
    };
  });
}

function buildTrend(
  seedPrefix: string,
  labels: readonly string[],
  base: number,
): TrendPoint[] {
  const rng = rngFromString(`${seedPrefix}:trend`);
  const completed = rngSeries(rng, {
    length: labels.length,
    start: base,
    drift: base * 0.04,
    jitter: base * 0.3,
    min: 1,
  });
  const pending = rngSeries(rng, {
    length: labels.length,
    start: base * 0.55,
    drift: -base * 0.01,
    jitter: base * 0.22,
    min: 1,
  });

  return labels.map((period, index) => ({
    period,
    completed: completed[index]!,
    pending: pending[index]!,
  }));
}

export function buildInspectorDashboard(args: {
  unit: UnitKey;
  service?: ServiceKey | "all";
  period?: string;
}): InspectorDashboardData {
  const { unit, service = "all", period = "2026-Q3" } = args;
  const seedPrefix = `${unit}:${service}:${period}`;
  const rng = rngFromString(seedPrefix);

  const definition = unitDefinitions[unit];
  const content = unitContent[unit];
  const spec = resolveContent(unit, service);
  const accent = accentFor(unit, service);

  const workloadScale = spec?.workloadScale ?? 30;
  const assigned = rngInt(rng, workloadScale, Math.round(workloadScale * 1.6));
  const completed = rngInt(
    rng,
    Math.round(assigned * 0.45),
    Math.round(assigned * 0.82),
  );
  const pending = assigned - completed;

  const kpis: KpiCard[] = [
    {
      id: "assigned",
      label: "Total Assigned Inspections",
      value: String(assigned),
      hint: `${definition.shortLabel} · current period`,
      tone: accent,
    },
    {
      id: "pending",
      label: "Pending Inspections",
      value: String(pending),
      hint: `${Math.round((pending / assigned) * 100)}% of assigned workload`,
      tone: accent,
    },
    {
      id: "completed",
      label: "Completed Inspections",
      value: String(completed),
      hint: `${Math.round((completed / assigned) * 100)}% completion rate`,
      tone: accent,
    },
  ];

  // Assigned facilities
  const facilityCount = rngInt(rng, 6, 9);
  const facilities: AssignedFacility[] = Array.from(
    { length: facilityCount },
    (_, index) => {
      const facilityRng = rngFromString(`${seedPrefix}:facility:${index}`);
      const prefix = spec
        ? rngPick(facilityRng, spec.facilityPrefixes)
        : rngPick(facilityRng, districts);
      const suffix = spec
        ? rngPick(facilityRng, spec.facilitySuffixes)
        : "Facility";

      return {
        id: `facility-${index}`,
        name: `${prefix} ${suffix}`,
        classification: spec
          ? rngPick(facilityRng, spec.classifications)
          : "General",
        district: rngPick(facilityRng, districts),
        registrationStatus: rngPick(facilityRng, registrationStatuses),
      };
    },
  );

  // Compliance
  const averageScore = rngInt(rng, 68, 94);
  const outcomeTotals = rngSplit(rng, completed, complianceOutcomeLabels.length);
  const outcomes = complianceOutcomeLabels.map((outcome, index) => ({
    outcome,
    count: outcomeTotals[index]!,
    color: complianceOutcomeColors[index]!,
  }));

  return {
    unit,
    service,
    workload: { kpis },
    progress: {
      donut: [
        {
          name: "Completed",
          value: completed,
          color: accentColors.seed,
        },
        {
          name: "Pending",
          value: pending,
          color: accentColors["seed-producer"],
        },
      ],
      trend: {
        daily: buildTrend(`${seedPrefix}:daily`, weekdayLabels, workloadScale / 6),
        weekly: buildTrend(`${seedPrefix}:weekly`, weekLabels, workloadScale / 3),
        monthly: buildTrend(`${seedPrefix}:monthly`, monthLabels, workloadScale),
      },
    },
    facilities,
    compliance: { averageScore, outcomes },
    activities: spec
      ? buildActivityCharts(spec.activities, `${seedPrefix}:activity`, accent)
      : [],
    sampling: spec
      ? buildActivityCharts(spec.sampling, `${seedPrefix}:sampling`, accent)
      : [],
    futureModules: content ? [...content.futureModules] : [],
  };
}
