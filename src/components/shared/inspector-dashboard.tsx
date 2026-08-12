"use client";

import { useMemo, useState } from "react";
import { ActivityCharts } from "@/components/shared/activity-charts";
import { AssignedFacilitiesTable } from "@/components/shared/assigned-facilities-table";
import { ComplianceSummary } from "@/components/shared/compliance-summary";
import { DonutChart } from "@/components/shared/donut-chart";
import { FutureModulesCard } from "@/components/shared/future-modules-card";
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

  const activeService =
    service === "all"
      ? null
      : unit.services.find((item) => item.id === service) ?? null;

  return (
    <PageTransition className="space-y-6">
      <PageTitle
        title={unit.label}
        description={
          activeService
            ? `${activeService.label}${activeService.formCode ? ` · ${activeService.formCode}` : ""}`
            : "Your assigned workload across all services in this unit"
        }
      />

      <ServiceFilter
        services={unit.services}
        value={service}
        onChange={setService}
      />

      <ContentSwap motionKey={service} className="space-y-6">
        {/* Workload Summary */}
        <section className="space-y-3">
          <SectionHeading title="Workload Summary" />
          <KpiCards cards={data.workload.kpis} />
        </section>

        {/* Inspection Progress */}
        <section className="space-y-3">
          <SectionHeading title="Inspection Progress" />
          <div className="grid gap-6 lg:grid-cols-2">
            <DonutChart
              title="Completed vs Pending"
              yLabel="Share of your assigned inspections"
              slices={data.progress.donut}
              centerLabel="Assigned"
              showPeriodSelect={false}
            />
            <InspectionTrendChart trend={data.progress.trend} />
          </div>
        </section>

        {/* Assigned Facilities — the card carries its own title. */}
        <AssignedFacilitiesTable facilities={data.facilities} />

        {/* Compliance Summary */}
        <section className="space-y-3">
          <SectionHeading title="Compliance Summary" />
          <ComplianceSummary
            averageScore={data.compliance.averageScore}
            outcomes={data.compliance.outcomes}
          />
        </section>

        {/* Inspection Activities */}
        {data.activities.length > 0 ? (
          <section className="space-y-3">
            <SectionHeading title="Inspection Activities" />
            <ActivityCharts charts={data.activities} />
          </section>
        ) : null}

        {/* Sampling Activities */}
        {data.sampling.length > 0 ? (
          <section className="space-y-3">
            <SectionHeading title="Sampling Activities" />
            <ActivityCharts charts={data.sampling} />
          </section>
        ) : null}

        {/* Future Modules */}
        {data.futureModules.length > 0 ? (
          <FutureModulesCard modules={data.futureModules} />
        ) : null}
      </ContentSwap>
    </PageTransition>
  );
}
