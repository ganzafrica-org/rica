"use client";

import { useMemo } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { PageTransition } from "@/components/motion/page-transition";
import { PageTitle } from "@/components/layout/page-title";
import { DirectorFilters } from "@/components/director/filters";
import {
  applyDirectorFilters,
  useDirectorFilterState,
} from "@/components/director/apply-filters";
import {
  chartColors,
  DirectorBarChart,
  DirectorDonutChart,
  DirectorLineChart,
  DirectorStackedBarChart,
} from "@/components/director/charts";
import { DirectorKpiGrid } from "@/components/director/kpi-grid";
import { SurfaceCard } from "@/components/ui/surface-card";
import {
  directorDashboards,
  stackedOutcomeSeries,
} from "@/data/director/dashboard";
import { businessUnits } from "@/data/units";

/** Unit-wide IMU bar charts on the dashboard (§3.2). */
const imuDashboardChartIds = new Set(["business", "assessment"]);

/** Unit-wide IIU charts on the dashboard (§4.2). */
const iiuDashboardChartIds = new Set([
  "physical",
  "physical-decisions",
  "doc-review",
  "samples",
  "missing-docs",
]);

export function DirectorDashboard() {
  const { user } = useAuth();
  const unitKey = user?.unit ?? "fpu";
  const unit = businessUnits[unitKey];
  const data = directorDashboards[unitKey];
  const { filters, onFilterChange } = useDirectorFilterState();
  const filtered = useMemo(
    () => applyDirectorFilters(data, filters),
    [data, filters],
  );

  const trendData =
    unitKey === "rlu" || unitKey === "iiu"
      ? filtered.completionTrend
      : filtered.complianceTrend;
  const trendTitle =
    unitKey === "rlu"
      ? "Monthly applications completed"
      : unitKey === "iiu"
        ? "Monthly trend of consignments reviewed"
        : "Average compliance score over time";
  const trendLabel =
    unitKey === "rlu" || unitKey === "iiu" ? "Completed" : "Score";

  const operatorsSection = filtered.sectionCharts.find(
    (section) => section.id === "operators",
  );
  const licensingOutcomesSection = filtered.sectionCharts.find(
    (section) => section.id === "approval-by-cat",
  );

  const imuSummaryKpis =
    unitKey === "imu"
      ? [
          ...filtered.sectionOverviewKpis,
          ...(filtered.sectionCharts.find(
            (section) => section.id === "product-surveillance",
          )?.kpis ?? []),
        ]
      : [];

  const iiuSummaryKpis =
    unitKey === "iiu" ? filtered.sectionOverviewKpis : [];

  const imuSummaryCharts =
    unitKey === "imu"
      ? filtered.sectionCharts.filter((section) =>
          imuDashboardChartIds.has(section.id),
        )
      : [];

  const iiuSummaryCharts =
    unitKey === "iiu"
      ? filtered.sectionCharts.filter((section) =>
          iiuDashboardChartIds.has(section.id),
        )
      : [];

  // Category / IMU deep-dives use the sidebar; IIU keeps full §4.2 filters here.
  const dashboardFilterMode =
    data.filterMode === "categories" || data.filterMode === "imu"
      ? "basic"
      : data.filterMode;

  const renderSectionChart = (
    section: (typeof iiuSummaryCharts)[number],
    index: number,
  ) => {
    if (section.bars && section.bars.length > 0) {
      return (
        <DirectorBarChart
          key={section.id}
          title={section.title}
          data={section.bars}
          colorOffset={index}
        />
      );
    }
    if (
      section.stacked &&
      section.stacked.length > 0 &&
      section.stackedKeys
    ) {
      return (
        <DirectorStackedBarChart
          key={section.id}
          title={section.title}
          data={section.stacked}
          series={section.stackedKeys}
        />
      );
    }
    return null;
  };

  if (unitKey === "iiu") {
    return (
      <PageTransition className="space-y-6">
        <PageTitle title={unit.name} />

        <DirectorFilters
          filterMode={dashboardFilterMode}
          values={filters}
          onChange={onFilterChange}
        />

        {iiuSummaryKpis.length > 0 ? (
          <DirectorKpiGrid items={iiuSummaryKpis} />
        ) : null}

        <div className="grid gap-6 lg:grid-cols-2">
          <DirectorBarChart
            title="Unit-wide decision instances (final stage)"
            data={filtered.outcomes}
            colorOffset={0}
          />
          <DirectorStackedBarChart
            title="Outcomes by office"
            data={filtered.outcomesByProvince}
            series={stackedOutcomeSeries}
          />
          <DirectorLineChart
            title={trendTitle}
            data={trendData}
            valueLabel={trendLabel}
            color={chartColors[0]}
          />
          <DirectorLineChart
            title="Year-on-year comparison"
            data={filtered.yoyTrend}
            showPrevious
            valueLabel="This year"
            previousLabel="Last year"
            color={chartColors[2]}
            previousColor={chartColors[3]}
          />
          {iiuSummaryCharts.map((section, index) =>
            renderSectionChart(section, index + 2),
          )}
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="space-y-6">
      <PageTitle title={unit.name} />

      <DirectorFilters
        filterMode={dashboardFilterMode}
        values={filters}
        onChange={onFilterChange}
      />

      {operatorsSection?.kpis && operatorsSection.kpis.length > 0 ? (
        <DirectorKpiGrid items={operatorsSection.kpis} />
      ) : null}

      {imuSummaryKpis.length > 0 ? (
        <DirectorKpiGrid items={imuSummaryKpis} />
      ) : null}

      {operatorsSection?.bars?.length ||
      licensingOutcomesSection?.bars?.length ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {operatorsSection?.bars && operatorsSection.bars.length > 0 ? (
            <DirectorBarChart
              title="Licensed operators by category"
              data={operatorsSection.bars}
              colorOffset={1}
            />
          ) : null}
          {licensingOutcomesSection?.bars &&
          licensingOutcomesSection.bars.length > 0 ? (
            <DirectorBarChart
              title="Licensing outcomes"
              data={licensingOutcomesSection.bars}
              colorOffset={2}
            />
          ) : null}
        </div>
      ) : null}

      {imuSummaryCharts.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {imuSummaryCharts.map((section, index) =>
            renderSectionChart(section, index),
          )}
        </div>
      ) : null}

      {data.showOutcomes ? (
        <section className="space-y-4">
          <h2 className="rica-title text-foreground">Regulatory outcomes</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {data.outcomesChart === "donut" ? (
              <DirectorDonutChart
                title="The outcomes of my unit's activities"
                data={filtered.outcomes}
              />
            ) : (
              <DirectorBarChart
                title="Unit-wide decision instances (final stage)"
                data={filtered.outcomes}
                colorOffset={0}
              />
            )}
            <DirectorStackedBarChart
              title="Outcomes by province"
              data={filtered.outcomesByProvince}
              series={stackedOutcomeSeries}
            />
          </div>
          {filtered.outcomesByStream ? (
            <div className="grid gap-6 lg:grid-cols-2">
              <DirectorStackedBarChart
                title="Outcomes by regulatory stream"
                data={filtered.outcomesByStream}
                series={stackedOutcomeSeries}
              />
            </div>
          ) : null}
        </section>
      ) : (
        <SurfaceCard title="Regulatory outcomes" />
      )}

      <section className="space-y-4">
        <h2 className="rica-title text-foreground">Performance trends</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <DirectorLineChart
            title={trendTitle}
            data={trendData}
            valueLabel={trendLabel}
            color={chartColors[0]}
          />
          <DirectorLineChart
            title="Year-on-year comparison"
            data={filtered.yoyTrend}
            showPrevious
            valueLabel="This year"
            previousLabel="Last year"
            color={chartColors[2]}
            previousColor={chartColors[3]}
          />
        </div>
      </section>
    </PageTransition>
  );
}
