"use client";

import { useMemo, useState } from "react";
import { DirectorDashboardLinks } from "@/components/dashboard/director-dashboard-links";
import { ExecutiveTrendChart } from "@/components/dashboard/executive-trend-chart";
import { GroupedBarChart } from "@/components/dashboard/grouped-bar-chart";
import { HighlightCards } from "@/components/dashboard/highlight-cards";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { RegulatoryCoverageMap } from "@/components/dashboard/regulatory-coverage-map";
import { UnitFilter } from "@/components/dashboard/unit-filter";
import { UnitPerformanceTable } from "@/components/dashboard/unit-performance-table";
import { PageTitle } from "@/components/layout/page-title";
import { ContentSwap, PageTransition } from "@/components/motion/page-transition";
import { buildExecutiveDashboard } from "@/data/generators/executive-dashboard";
import { unitDefinitions, unitList } from "@/data/units";
import type { ProvinceKey, UnitKey } from "@/types";

function SectionHeading({ title }: { title: string }) {
  return (
    <h3 className="text-sm font-semibold tracking-tight text-foreground">
      {title}
    </h3>
  );
}

export function ExecutiveDashboard() {
  const [unit, setUnit] = useState<UnitKey | "all">("all");
  const [category, setCategory] = useState("all");
  const [province, setProvince] = useState<ProvinceKey | "all">("all");
  const [district, setDistrict] = useState<string | "all">("all");

  const data = useMemo(
    () =>
      buildExecutiveDashboard({ unit, category, province, district }),
    [unit, category, province, district],
  );

  const scopeLabel =
    unit === "all"
      ? "All five RICA units"
      : unitDefinitions[unit].label;

  return (
    <PageTransition className="space-y-6">
      <PageTitle
        title="Executive Dashboard"
        description={`Organization-wide performance · ${scopeLabel}`}
      />

      <UnitFilter units={unitList} value={unit} onChange={setUnit} />

      <ContentSwap motionKey={unit} className="space-y-6">
        {/* 1 — Executive Highlights */}
        <section className="space-y-3">
          <SectionHeading title="Executive Highlights" />
          <HighlightCards cards={data.highlights} />
        </section>

        {/* 2 — Organizational Performance */}
        <section className="space-y-3">
          <SectionHeading title="Organizational Performance" />
          <KpiCards
            cards={data.organizational.kpis}
            className="xl:grid-cols-5"
          />
          <ExecutiveTrendChart
            trend={data.organizational.trend}
            yLabel="Applications received vs approved"
          />
        </section>
      </ContentSwap>

      {/*
        3 — Regulatory Coverage.
        Deliberately outside ContentSwap: that wrapper keys on the unit filter,
        so it would remount the subtree and re-initialise the Leaflet map.
      */}
      <section className="space-y-3">
        <SectionHeading title="Regulatory Coverage" />
        <KpiCards cards={data.coverage.kpis} />
        <RegulatoryCoverageMap
          points={data.coverage.points}
          categories={data.coverage.categories}
          category={category}
          onCategoryChange={setCategory}
          province={province}
          onProvinceChange={setProvince}
          district={district}
          onDistrictChange={setDistrict}
        />
      </section>

      <ContentSwap motionKey={`${unit}-lower`} className="space-y-6">
        {/* 4 — Compliance */}
        <section className="space-y-3">
          <SectionHeading title="Compliance" />
          <div className="grid gap-6 lg:grid-cols-2">
            <GroupedBarChart
              title="Approval vs Rejection"
              data={data.compliance.byService}
              yLabel={
                unit === "farm-products"
                  ? "Decisions by regulatory stream"
                  : "Decisions by unit"
              }
            />
            <ExecutiveTrendChart
              trend={data.compliance.approvalTrend}
              title="Approval Trend Over Time"
              yLabel="Applications received vs approved"
            />
          </div>
        </section>

        {/* 5 — Unit Performance */}
        <section className="space-y-3">
          <SectionHeading title="Unit Performance" />
          <UnitPerformanceTable rows={data.unitPerformance} />
        </section>

        {/* 6 — Director Dashboards */}
        <section className="space-y-3">
          <SectionHeading title="Director Dashboards" />
          <DirectorDashboardLinks rows={data.unitPerformance} />
        </section>
      </ContentSwap>
    </PageTransition>
  );
}
