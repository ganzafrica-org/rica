"use client";

import { useMemo, useState } from "react";
import { ExecutiveHighlightsChart } from "@/components/shared/executive-highlights-chart";
import { ExecutiveTrendChart } from "@/components/shared/executive-trend-chart";
import { GroupedBarChart } from "@/components/shared/grouped-bar-chart";
import { KpiCards } from "@/components/shared/kpi-cards";
import { RegulatoryCoverageMap } from "@/components/shared/regulatory-coverage-map";
import { UnitPerformanceTable } from "@/components/shared/unit-performance-table";
import { PageTitle } from "@/components/layout/page-title";
import { PageTransition } from "@/components/motion/page-transition";
import { buildExecutiveDashboard } from "@/data/generators/executive-dashboard";
import type { ProvinceKey } from "@/types";

/**
 * Senior Director overview:
 * 5 KPIs → Organizational + Highlights → Approval charts →
 * Unit comparison → Distribution of Registered Entities map.
 */
export function ExecutiveDashboard() {
  const [category, setCategory] = useState("all");
  const [province, setProvince] = useState<ProvinceKey | "all">("all");
  const [district, setDistrict] = useState<string | "all">("all");

  const data = useMemo(
    () =>
      buildExecutiveDashboard({
        unit: "all",
        category,
        province,
        district,
      }),
    [category, province, district],
  );

  return (
    <PageTransition className="space-y-6">
      <PageTitle title="Executive Dashboard" />

      <KpiCards cards={data.organizational.kpis} />

      <div className="grid gap-6 lg:grid-cols-2">
        <GroupedBarChart
          title="Approval vs Rejection"
          data={data.compliance.byService}
        />
        <ExecutiveTrendChart
          trend={data.compliance.approvalTrend}
          title="Approval Trend Over Time"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
        <ExecutiveTrendChart
          className="h-full"
          trend={data.organizational.trend}
          title="Organizational Performance"
        />
        <ExecutiveHighlightsChart
          className="h-full"
          cards={data.highlights}
          rows={data.unitPerformance}
        />
      </div>

      <UnitPerformanceTable
        rows={data.unitPerformance}
        title="Unit comparison"
      />

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
    </PageTransition>
  );
}
