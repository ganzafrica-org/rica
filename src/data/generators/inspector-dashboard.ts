import {
  accentColors,
  complianceOutcomeColors,
  complianceOutcomeLabels,
  districts,
  monthLabels,
  weekLabels,
  weekdayLabels,
} from "@/data/reference";
import {
  iiuDecisionColors,
  iiuHsCodes,
  iiuInspectionDecisions,
} from "@/data/iiu";
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
  InspectorPendingSection,
  KpiCard,
  PendingInspectionRow,
  TrendPoint,
} from "@/types/dashboard";
import type { AccentKey, ServiceKey, UnitKey } from "@/types";

const registrationStatuses: StatusKey[] = [
  "approved",
  "approved",
  "pending",
  "not-started",
];

const inspectionStatuses: StatusKey[] = [
  "pending",
  "completed",
  "not-started",
  "ongoing",
];

const pendingStatuses: StatusKey[] = ["pending", "not-started", "ongoing"];

const livestockTypes = [
  "Slaughterhouse",
  "Butchery",
  "Meat Carrier",
  "Feed Retailer",
  "Feed Processing Unit",
  "Beekeeper Cooperative",
  "Honey Collection Center",
  "Honey Processing Unit",
  "Milk Collection Center",
  "Milk Kiosk",
  "MAP",
] as const;

const plantCommodities = [
  "Coffee",
  "Tea",
  "Chili",
  "Cut flowers",
  "Fresh fruit",
] as const;

const destinations = ["UAE", "Netherlands", "UK", "Belgium", "Kenya"] as const;

const seedStages = [
  "Producer Onsite Verification",
  "Field Inspection",
  "Potato Seed Store Inspection",
  "Seed Sampling",
] as const;

const seedCrops = [
  "Maize · RHM-1402",
  "Beans · Gasore",
  "Soybean · SB-24",
  "Irish Potato · Ngwinurare",
  "Rice · Kigega",
] as const;

const dealerCategories = [
  "Importer",
  "Distributor",
  "Retailer",
  "Manufacturer",
  "Exporter",
] as const;

function buildPendingRows(
  seedPrefix: string,
  count: number,
  buildRow: (rng: () => number, index: number) => Omit<PendingInspectionRow, "id" | "status" | "district">,
): PendingInspectionRow[] {
  return Array.from({ length: count }, (_, index) => {
    const rng = rngFromString(`${seedPrefix}:${index}`);
    const fields = buildRow(rng, index);
    return {
      id: `${seedPrefix}-${index}`,
      district: rngPick(rng, districts),
      status: rngPick(rng, pendingStatuses),
      ...fields,
    };
  });
}

function buildFpuPendingSections(
  seedPrefix: string,
  service: ServiceKey | "all",
): InspectorPendingSection[] {
  const sections: InspectorPendingSection[] = [
    {
      id: "livestock",
      title: "Livestock inspection",
      nameHeader: "Facility Name",
      typeHeader: "Facility Type",
      rows: buildPendingRows(`${seedPrefix}:livestock`, 16, (rng) => ({
        name: `${rngPick(rng, ["Nyabugogo", "Gikondo", "Musanze", "Huye", "Kimironko"])} ${rngPick(rng, ["Abattoir", "Butchery", "Depot", "Centre"])}`,
        type: rngPick(rng, livestockTypes),
      })),
    },
    {
      id: "plant-warehouse",
      title: "Plant and warehouse Inspection",
      nameHeader: "Exporter Name",
      typeHeader: "Commodity",
      extraHeader: "Destination Country",
      rows: buildPendingRows(`${seedPrefix}:plant`, 14, (rng) => ({
        name: `${rngPick(rng, ["Kigali", "Musanze", "Rubavu", "Rusumo"])} ${rngPick(rng, ["Exporters Ltd", "Packhouse", "Export Co."])}`,
        type: rngPick(rng, plantCommodities),
        extra: rngPick(rng, destinations),
      })),
    },
    {
      id: "seed",
      title: "Seed Inspection",
      nameHeader: "Producer / Field / Store",
      typeHeader: "Crop & Variety",
      extraHeader: "Visit Stage",
      rows: buildPendingRows(`${seedPrefix}:seed`, 15, (rng) => ({
        name: `${rngPick(rng, ["Kigali", "Musanze", "Nyagatare", "Karongi"])} ${rngPick(rng, ["Seed Cooperative", "Seed Farm", "Potato Store"])}`,
        type: rngPick(rng, seedCrops),
        extra: rngPick(rng, seedStages),
      })),
    },
    {
      id: "agrochemical",
      title: "Agrochemical Inspection",
      nameHeader: "Business Name",
      typeHeader: "Dealer Category",
      rows: buildPendingRows(`${seedPrefix}:agro`, 12, (rng) => ({
        name: `${rngPick(rng, ["Kigali", "Rubavu", "Muhanga", "Huye"])} ${rngPick(rng, ["Agro Dealers", "Agrovet Ltd", "Farm Inputs Co."])}`,
        type: rngPick(rng, dealerCategories),
      })),
    },
  ];

  if (service === "all") return sections;
  return sections.filter((section) => section.id === service);
}

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
  const awaitingNext = rngInt(
    rng,
    Math.max(1, Math.round(pending * 0.35)),
    Math.max(1, Math.round(pending * 0.7)),
  );
  const notStarted = Math.max(0, pending - awaitingNext);

  const kpis: KpiCard[] = [
    {
      id: "assigned",
      label: "Total Assigned Inspections",
      value: String(assigned),
      hint:
        unit === "imu"
          ? "Q3 2026 · business outlets, industries, and service provisions"
          : `${definition.shortLabel} · current period`,
      tone: accent,
    },
    {
      id: "pending",
      label: "Pending Inspections",
      value: String(pending),
      hint:
        unit === "fpu"
          ? `${awaitingNext} awaiting next visit • ${notStarted} not yet started`
          : `${Math.round((pending / assigned) * 100)}% of assigned workload`,
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

  const iiuHsLabels = iiuHsCodes.map((code) => code.label);

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

      const isIiu = unit === "iiu";
      return {
        id: `facility-${index}`,
        name: isIiu ? prefix : `${prefix} ${suffix}`.trim(),
        classification: spec
          ? rngPick(facilityRng, spec.classifications)
          : "General",
        district: isIiu
          ? rngPick(facilityRng, iiuHsLabels)
          : rngPick(facilityRng, districts),
        registrationStatus: rngPick(
          facilityRng,
          isIiu ? inspectionStatuses : registrationStatuses,
        ),
      };
    },
  );

  // Compliance — IIU uses inspection decisions, not registration outcomes.
  const averageScore = rngInt(rng, 68, 94);
  const lowestScore = rngInt(rng, 42, Math.min(67, averageScore - 4));
  const highestScore = rngInt(rng, Math.max(averageScore + 2, 88), 98);
  const scoredCount = Math.max(1, completed);
  const iiuOutcomeLabels = iiuInspectionDecisions.map(
    (decision) => decision.label,
  );
  const outcomeLabels =
    unit === "iiu" ? iiuOutcomeLabels : complianceOutcomeLabels;
  const outcomeColors =
    unit === "iiu" ? iiuDecisionColors : complianceOutcomeColors;
  const outcomeTotals = rngSplit(rng, completed, outcomeLabels.length);
  const outcomes = outcomeLabels.map((outcome, index) => ({
    outcome,
    count: outcomeTotals[index]!,
    color: outcomeColors[index]!,
  }));

  if (unit === "fpu") {
    kpis.push({
      id: "compliance",
      label: "Average Compliance Score",
      value: `${averageScore}%`,
      hint: `Lowest ${lowestScore}% · Highest ${highestScore}% · n = ${scoredCount}`,
      tone: accent,
      progress: averageScore,
    });
  }

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
    pendingSections:
      unit === "fpu" ? buildFpuPendingSections(seedPrefix, service) : [],
    compliance: {
      averageScore,
      outcomes,
      lowestScore,
      highestScore,
      scoredCount,
    },
    activities: spec
      ? buildActivityCharts(spec.activities, `${seedPrefix}:activity`, accent)
      : [],
    sampling: spec
      ? buildActivityCharts(spec.sampling, `${seedPrefix}:sampling`, accent)
      : [],
    futureModules: content ? [...content.futureModules] : [],
  };
}
