"use client";

import { useMemo, useState } from "react";
import { ActivityCharts } from "@/components/shared/activity-charts";
import { AssignedFacilitiesTable } from "@/components/shared/assigned-facilities-table";
import { ComplianceSummary } from "@/components/shared/compliance-summary";
import { DonutChart } from "@/components/shared/donut-chart";
import { InspectionTrendChart } from "@/components/shared/inspection-trend-chart";
import { KpiCards } from "@/components/shared/kpi-cards";
import { ServiceFilter } from "@/components/shared/service-filter";
import { PageTitle } from "@/components/layout/page-title";
import { ContentSwap, PageTransition } from "@/components/motion/page-transition";
import { buildInspectorDashboard } from "@/data/generators/inspector-dashboard";
import { getUnit } from "@/data/units";
import type { ServiceKey, UnitKey } from "@/types";

type InspectorDashboardProps = {
  unitId: UnitKey;
  initialService?: ServiceKey | "all";
};

function SectionHeading({ title }: { title: string }) {
  return (
    <h3 className="text-sm font-semibold tracking-tight text-foreground">
      {title}
    </h3>
  );
}

export function InspectorDashboard({
  unitId,
  initialService = "all",
}: InspectorDashboardProps) {
  const unit = getUnit(unitId);
  const [service, setService] = useState<ServiceKey | "all">(initialService);

  const data = useMemo(
    () => buildInspectorDashboard({ unit: unitId, service }),
    [unitId, service],
  );

  return (
    <PageTransition className="space-y-6">
      <PageTitle title={unit.label} />

      <ServiceFilter
        services={unit.services}
        value={service}
        onChange={setService}
      />

      <ContentSwap motionKey={service} className="space-y-6">
        <KpiCards cards={data.workload.kpis} />

        <div className="grid gap-6 lg:grid-cols-2">
          <DonutChart
            title="Completed vs Pending"
            slices={data.progress.donut}
            centerLabel="Assigned"
            showPeriodSelect={false}
          />
          <InspectionTrendChart trend={data.progress.trend} />
        </div>

        <AssignedFacilitiesTable facilities={data.facilities} />

        <section className="space-y-3">
          <SectionHeading title="Compliance Summary" />
          <ComplianceSummary
            averageScore={data.compliance.averageScore}
            outcomes={data.compliance.outcomes}
          />
        </section>

        {data.activities.length > 0 ? (
          <section className="space-y-3">
            <SectionHeading title="Inspection Activities" />
            <ActivityCharts charts={data.activities} />
          </section>
        ) : null}

        {data.sampling.length > 0 ? (
          <section className="space-y-3">
            <SectionHeading title="Sampling Activities" />
            <ActivityCharts charts={data.sampling} />
          </section>
        ) : null}
      </ContentSwap>
    </PageTransition>
  );
}
