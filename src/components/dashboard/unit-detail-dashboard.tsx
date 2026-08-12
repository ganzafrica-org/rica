"use client";

import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ExecutiveTrendChart } from "@/components/dashboard/executive-trend-chart";
import { FutureModulesCard } from "@/components/dashboard/future-modules-card";
import { GroupedBarChart } from "@/components/dashboard/grouped-bar-chart";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { RegulatoryCoverageMap } from "@/components/dashboard/regulatory-coverage-map";
import { UnitPerformanceTable } from "@/components/dashboard/unit-performance-table";
import { PageTitle } from "@/components/layout/page-title";
import { ContentSwap, PageTransition } from "@/components/motion/page-transition";
import { LinkButton } from "@/components/ui/link-button";
import { buildExecutiveDashboard } from "@/data/generators/executive-dashboard";
import { unitContent, getUnit } from "@/data/units";
import type { ProvinceKey, UnitKey } from "@/types";

function SectionHeading({ title }: { title: string }) {
  return (
    <h3 className="text-sm font-semibold tracking-tight text-foreground">
      {title}
    </h3>
  );
}

type UnitDetailDashboardProps = {
  unitId: UnitKey;
};

export function UnitDetailDashboard({ unitId }: UnitDetailDashboardProps) {
  const unit = getUnit(unitId);
  const [category, setCategory] = useState("all");
  const [province, setProvince] = useState<ProvinceKey | "all">("all");
  const [district, setDistrict] = useState<string | "all">("all");

  const data = useMemo(
    () =>
      buildExecutiveDashboard({
        unit: unitId,
        category,
        province,
        district,
      }),
    [unitId, category, province, district],
  );

  const futureModules = unitContent[unitId]?.futureModules ?? [];

  return (
    <PageTransition className="space-y-6">
      <PageTitle
        title={unit.label}
        description="Executive view of this unit's performance"
        actions={
          <LinkButton href="/senior-director" variant="outline" size="sm">
            <ArrowLeft className="size-4" />
            Back to overview
          </LinkButton>
        }
      />

      <ContentSwap motionKey={unitId} className="space-y-6">
        <section className="space-y-3">
          <SectionHeading title="Unit Performance" />
          <KpiCards
            cards={data.organizational.kpis}
            className="xl:grid-cols-5"
          />
          <ExecutiveTrendChart
            trend={data.organizational.trend}
            yLabel="Applications received vs approved"
          />
        </section>

        <section className="space-y-3">
          <SectionHeading title="Compliance" />
          <div className="grid gap-6 lg:grid-cols-2">
            <GroupedBarChart
              title="Approval vs Rejection"
              data={data.compliance.byService}
              yLabel={
                unit.services.length > 0
                  ? "Decisions by regulatory stream"
                  : "Decisions for this unit"
              }
            />
            <ExecutiveTrendChart
              trend={data.compliance.approvalTrend}
              title="Approval Trend Over Time"
              yLabel="Applications received vs approved"
            />
          </div>
        </section>

        <section className="space-y-3">
          <SectionHeading title="Summary" />
          <UnitPerformanceTable rows={data.unitPerformance} />
        </section>
      </ContentSwap>

      {/* Outside ContentSwap — see ExecutiveDashboard for why. */}
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

      {futureModules.length > 0 ? (
        <FutureModulesCard modules={futureModules} />
      ) : null}
    </PageTransition>
  );
}
