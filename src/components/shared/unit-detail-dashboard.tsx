"use client";

import { useMemo, type ReactNode } from "react";
import {
  chartColors,
  DirectorBarChart,
  DirectorDonutChart,
  DirectorLineChart,
  DirectorStackedBarChart,
} from "@/components/director/charts";
import { KpiCards } from "@/components/shared/kpi-cards";
import { PageTitle } from "@/components/layout/page-title";
import { ContentSwap, PageTransition } from "@/components/motion/page-transition";
import { SurfaceCard } from "@/components/ui/surface-card";
import {
  directorDashboards,
  stackedOutcomeSeries,
  type KpiItem,
} from "@/data/director/dashboard";
import { buildExecutiveDashboard } from "@/data/generators/executive-dashboard";
import { getUnit } from "@/data/units";
import type { UnitKey } from "@/types";
import type { KpiCard } from "@/types/dashboard";

function SectionHeading({ title }: { title: string }) {
  return (
    <h3 className="text-sm font-semibold tracking-tight text-foreground">
      {title}
    </h3>
  );
}

/** Director chart ids to surface on each senior-director unit page. */
const unitSummaryChartIds: Record<UnitKey, readonly string[]> = {
  fpu: ["seed", "slaughterhouse", "agrochemical", "seed-producer"],
  rlu: ["operators", "approval-by-cat", "geo-operators", "renewals"],
  imu: [
    "business",
    "assessment",
    "product-surveillance",
    "decisions-by-product",
  ],
  iiu: [
    "doc-review",
    "physical",
    "physical-decisions",
    "samples",
    "missing-docs",
    "origin",
  ],
  ccpu: [],
};

function toKpiCard(item: KpiItem): KpiCard {
  return {
    id: item.id,
    label: item.label,
    value: item.value,
    hint: item.hint ?? "",
    tone: item.tone ?? "accent",
  };
}

function collectUnitKpis(unitId: UnitKey): KpiCard[] {
  const director = directorDashboards[unitId];
  const cards: KpiCard[] = [];

  for (const item of director.sectionOverviewKpis) {
    cards.push(toKpiCard(item));
  }

  // RLU operators + IMU product surveillance KPIs live on section charts.
  for (const section of director.sectionCharts) {
    if (
      section.id === "operators" ||
      section.id === "product-surveillance"
    ) {
      for (const item of section.kpis ?? []) {
        cards.push(toKpiCard(item));
      }
    }
  }

  // FPU overview KPIs sit on stream sections — take Seed’s headline set.
  if (cards.length === 0 && unitId === "fpu") {
    const seed = director.sectionCharts.find((section) => section.id === "seed");
    for (const item of seed?.kpis ?? []) {
      cards.push(toKpiCard(item));
    }
  }

  // CCPU / empty units — fall back to executive org KPIs for that unit.
  if (cards.length === 0) {
    const executive = buildExecutiveDashboard({ unit: unitId });
    return executive.organizational.kpis.slice(0, 5);
  }

  return cards.slice(0, 5);
}

type UnitDetailDashboardProps = {
  unitId: UnitKey;
};

/**
 * Per-unit senior view — sidebar Units dropdown selects the unit.
 * Content is pulled from Director dashboards so each unit has its own data.
 */
export function UnitDetailDashboard({ unitId }: UnitDetailDashboardProps) {
  const unit = getUnit(unitId);
  const director = directorDashboards[unitId];

  const kpis = useMemo(() => collectUnitKpis(unitId), [unitId]);

  const trendData =
    unitId === "rlu" || unitId === "iiu"
      ? director.completionTrend
      : director.complianceTrend;
  const trendTitle =
    unitId === "rlu"
      ? "Monthly applications completed"
      : unitId === "iiu"
        ? "Monthly consignments reviewed"
        : unitId === "ccpu"
          ? "Monthly unit KPI trend"
          : "Average compliance score over time";
  const trendLabel =
    unitId === "rlu" || unitId === "iiu" ? "Completed" : "Score";

  const summarySections = director.sectionCharts.filter((section) =>
    unitSummaryChartIds[unitId].includes(section.id),
  );

  const unitCharts = useMemo(() => {
    const items: ReactNode[] = [];

    summarySections.forEach((section, index) => {
      if (section.bars?.length) {
        items.push(
          <DirectorBarChart
            key={`${section.id}-bars`}
            title={section.title}
            data={section.bars}
            colorOffset={index}
          />,
        );
      }
      if (section.donut?.length) {
        items.push(
          <DirectorDonutChart
            key={`${section.id}-donut`}
            title={section.title}
            data={section.donut}
            colorOffset={index + 1}
          />,
        );
      }
      if (section.stacked?.length && section.stackedKeys) {
        items.push(
          <DirectorStackedBarChart
            key={`${section.id}-stacked`}
            title={section.title}
            data={section.stacked}
            series={section.stackedKeys}
          />,
        );
      }
      if (section.line?.length) {
        items.push(
          <DirectorLineChart
            key={`${section.id}-line`}
            title={section.title}
            data={section.line}
            valueLabel="Received"
            color={chartColors[index % chartColors.length]}
          />,
        );
      }
    });

    return items;
  }, [summarySections]);

  return (
    <PageTransition className="space-y-6">
      <PageTitle title={unit.shortLabel} />

      <ContentSwap motionKey={unitId} className="space-y-6">
        <KpiCards cards={kpis} />

        {director.showOutcomes ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {director.outcomesChart === "donut" ? (
              <DirectorDonutChart
                title="Unit outcomes"
                data={director.outcomes}
              />
            ) : (
              <DirectorBarChart
                title="Unit decision instances"
                data={director.outcomes}
                colorOffset={0}
              />
            )}
            <DirectorStackedBarChart
              title="Outcomes by province"
              data={director.outcomesByProvince}
              series={stackedOutcomeSeries}
            />
          </div>
        ) : (
          <SurfaceCard title="Regulatory outcomes">
            <p className="text-sm text-muted">
              Unit-specific outcomes pending checklist and dataset.
            </p>
          </SurfaceCard>
        )}

        <section className="space-y-3">
          <SectionHeading title="Performance trends" />
          <div className="grid gap-6 lg:grid-cols-2">
            <DirectorLineChart
              title={trendTitle}
              data={trendData}
              valueLabel={trendLabel}
              color={chartColors[0]}
            />
            <DirectorLineChart
              title="Year-on-year comparison"
              data={director.yoyTrend}
              showPrevious
              valueLabel="This year"
              previousLabel="Last year"
              color={chartColors[2]}
              previousColor={chartColors[3]}
            />
          </div>
        </section>

        {unitCharts.length > 0 ? (
          <section className="space-y-3">
            <SectionHeading title="Unit activity" />
            <div className="grid gap-6 lg:grid-cols-2">{unitCharts}</div>
          </section>
        ) : null}
      </ContentSwap>
    </PageTransition>
  );
}
