/**
 * Data-layer safety net.
 *
 * The dashboards render numbers produced by seeded generators. If those ever
 * stop being deterministic, React hydration breaks in ways that are painful to
 * trace; if they stop being internally consistent, the demo falls apart under
 * anyone who adds up a column. This script asserts both.
 *
 * Run with:  npx tsx scripts/check-generators.ts
 */

import { buildInspectorDashboard } from "../src/data/generators/inspector-dashboard";
import { buildExecutiveDashboard } from "../src/data/generators/executive-dashboard";
import { unitList } from "../src/data/units";
import { rwandaDistricts } from "../src/data/geo";
import type { ServiceKey } from "../src/types";

let failures = 0;

function check(condition: boolean, message: string) {
  if (!condition) {
    failures += 1;
    console.error(`  FAIL  ${message}`);
  }
}

function toNumber(value: string): number {
  return Number(value.replace(/,/g, ""));
}

/* ---------------------------------------------------------------- *
 * Inspector generator
 * ---------------------------------------------------------------- */
console.log("Inspector dashboards");

for (const unit of unitList) {
  const selections: (ServiceKey | "all")[] = [
    "all",
    ...unit.services.map((service) => service.id),
  ];

  for (const service of selections) {
    const a = buildInspectorDashboard({ unit: unit.id, service });
    const b = buildInspectorDashboard({ unit: unit.id, service });
    const label = `${unit.id}/${service}`;

    check(
      JSON.stringify(a) === JSON.stringify(b),
      `${label} is not deterministic`,
    );

    const assigned = Number(a.workload.kpis[0]!.value);
    const pending = Number(a.workload.kpis[1]!.value);
    const completed = Number(a.workload.kpis[2]!.value);

    check(
      pending + completed === assigned,
      `${label}: ${completed} + ${pending} !== ${assigned}`,
    );
    check(
      a.progress.donut.reduce((sum, slice) => sum + slice.value, 0) === assigned,
      `${label}: donut total !== assigned`,
    );
    check(a.facilities.length > 0, `${label}: no facilities`);
    check(a.activities.length > 0, `${label}: no activities`);

    for (const chart of [...a.activities, ...a.sampling]) {
      check(chart.data.length > 0, `${label}: chart ${chart.id} is empty`);
      check(
        chart.data.every((point) => Boolean(point.color)),
        `${label}: chart ${chart.id} has an uncoloured point`,
      );
    }
  }
}
console.log(`  ${unitList.length} units checked`);

/* ---------------------------------------------------------------- *
 * Executive generator
 * ---------------------------------------------------------------- */
console.log("Executive dashboard");

const exec = buildExecutiveDashboard();

check(
  JSON.stringify(exec) === JSON.stringify(buildExecutiveDashboard()),
  "executive dashboard is not deterministic",
);

// The headline KPI must equal the sum of the table it sits above.
const tableApplications = exec.unitPerformance.reduce(
  (sum, row) => sum + row.applications,
  0,
);
check(
  toNumber(exec.organizational.kpis[0]!.value) === tableApplications,
  `applications KPI !== Σ table rows (${exec.organizational.kpis[0]!.value} vs ${tableApplications})`,
);

const tableInspections = exec.unitPerformance.reduce(
  (sum, row) => sum + row.inspections,
  0,
);
check(
  toNumber(exec.organizational.kpis[1]!.value) === tableInspections,
  "inspections KPI !== Σ table rows",
);

// Highlights must name the actual winners in the table.
const maxApplications = Math.max(
  ...exec.unitPerformance.map((row) => row.applications),
);
const bestRate = Math.max(
  ...exec.unitPerformance.map((row) => row.approvalRate),
);
const worstRate = Math.min(
  ...exec.unitPerformance.map((row) => row.approvalRate),
);
check(
  toNumber(exec.highlights[0]!.value) === maxApplications,
  "highlight 'most applications' disagrees with the table",
);
check(
  exec.highlights[1]!.value === `${bestRate}%`,
  "highlight 'best approval' disagrees with the table",
);
check(
  exec.highlights[2]!.value === `${worstRate}%`,
  "highlight 'worst approval' disagrees with the table",
);

// Approvals can never exceed applications received.
for (const granularity of ["daily", "weekly", "monthly"] as const) {
  for (const point of exec.organizational.trend[granularity]) {
    check(
      point.approved <= point.received,
      `${granularity} trend: approved > received at ${point.period}`,
    );
  }
}

// Geography must actually be in Rwanda.
check(
  exec.coverage.points.length === rwandaDistricts.length,
  `expected ${rwandaDistricts.length} map points, got ${exec.coverage.points.length}`,
);
check(
  exec.coverage.points.every((point) => point.lat < 0),
  "a district has a non-negative latitude (Rwanda is south of the equator)",
);
check(
  exec.coverage.points.every(
    (point) => point.lng > 28.5 && point.lng < 31.2,
  ),
  "a district longitude falls outside Rwanda",
);
check(
  exec.coverage.points.every((point) => point.value > 0),
  "a district has no entities",
);

// Filters must actually change the output.
const perUnit = unitList.map((unit) =>
  JSON.stringify(buildExecutiveDashboard({ unit: unit.id })),
);
check(
  new Set(perUnit).size === unitList.length,
  "two unit filters produced identical dashboards",
);
check(
  buildExecutiveDashboard({ province: "kigali" }).coverage.points.length === 3,
  "province filter did not narrow the map to Kigali's 3 districts",
);

console.log(`  ${unitList.length} unit filters + geography checked`);

/* ---------------------------------------------------------------- */
if (failures === 0) {
  console.log("\nAll generator checks passed.");
} else {
  console.error(`\n${failures} check(s) failed.`);
  process.exit(1);
}
