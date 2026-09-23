"use client";

import { useMemo, useState } from "react";
import { ActivityCharts } from "@/components/shared/activity-charts";
import { AssignedFacilitiesTable } from "@/components/shared/assigned-facilities-table";
import { ImuAssignedInspections } from "@/components/shared/imu-assigned-inspections";
import { ComplianceSummary } from "@/components/shared/compliance-summary";
import { DonutChart } from "@/components/shared/donut-chart";
import { InspectionTrendChart } from "@/components/shared/inspection-trend-chart";
import { KpiCards } from "@/components/shared/kpi-cards";
import { PendingInspectionsTable } from "@/components/shared/pending-inspections-table";
import { ServiceFilter } from "@/components/shared/service-filter";
import { PageTitle } from "@/components/layout/page-title";
import { ContentSwap, PageTransition } from "@/components/motion/page-transition";
import { FilterDateRange } from "@/components/ui";
import { buildInspectorDashboard } from "@/data/generators/inspector-dashboard";
import { iiuAssignedTableCopy } from "@/data/iiu";
import { getUnit } from "@/data/units";
import type { ServiceKey, UnitKey } from "@/types";
import type { ActivityChart } from "@/types/dashboard";

type InspectorDashboardProps = {
  unitId: UnitKey;
  initialService?: ServiceKey | "all";
  streamTitle?: string;
  facilityTitle?: string;
};

export function InspectorDashboard({
  unitId,
  initialService = "all",
  streamTitle,
  facilityTitle,
}: InspectorDashboardProps) {
  const unit = getUnit(unitId);
  const isFpu = unitId === "fpu";
  const [service, setService] = useState<ServiceKey | "all">(initialService);

  const data = useMemo(
    () => buildInspectorDashboard({ unit: unitId, service }),
    [unitId, service],
  );

  const isFpuHome = isFpu && !streamTitle && !facilityTitle;
  const extraDashboardCharts = useMemo((): ActivityChart[] => {
    if (!isFpuHome) return [];
    const facilityMix = data.activities[0];
    const outcomes: ActivityChart = {
      id: "inspection-outcomes",
      title: "Inspection Outcomes",
      kind: "donut",
      data: data.compliance.outcomes.map((outcome) => ({
        name: outcome.outcome,
        value: outcome.count,
        color: outcome.color,
      })),
    };
    return facilityMix ? [facilityMix, outcomes] : [outcomes];
  }, [isFpuHome, data.activities, data.compliance.outcomes]);

  return (
    <PageTransition className="space-y-6">
      <PageTitle
        title={facilityTitle ?? streamTitle ?? unit.label}
        description={
          facilityTitle && streamTitle ? streamTitle : undefined
        }
      />

      {isFpu || unitId === "imu" ? (
        <div className="page-title flex min-w-0 items-center justify-between gap-3 border border-border bg-surface px-4 py-3 shadow-sm">
          <p className="text-sm text-muted">
            {unitId === "imu" ? "Period · Q3 2026" : "Date range · All Dates"}
          </p>
          <FilterDateRange label="Date range" />
        </div>
      ) : (
        <ServiceFilter
          services={unit.services}
          value={service}
          onChange={setService}
        />
      )}

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

        {extraDashboardCharts.length > 0 ? (
          <ActivityCharts charts={extraDashboardCharts} />
        ) : null}

        {!isFpu ? (
          <ComplianceSummary
            averageScore={data.compliance.averageScore}
            outcomes={data.compliance.outcomes}
            outcomesTitle={
              unitId === "iiu" ? "Inspection Decisions" : "Inspection Outcomes"
            }
          />
        ) : null}

        {isFpu && service !== "all"
          ? data.pendingSections.map((section) => (
              <PendingInspectionsTable key={section.id} section={section} />
            ))
          : null}

        {unitId === "imu" ? <ImuAssignedInspections /> : null}

        {!isFpu && unitId !== "imu" ? (
          <AssignedFacilitiesTable
            facilities={data.facilities}
            title={
              unitId === "iiu"
                ? iiuAssignedTableCopy.tableTitle
                : "Assigned Facilities"
            }
            columnLabels={
              unitId === "iiu" ? iiuAssignedTableCopy.columns : undefined
            }
            emptyMessage={
              unitId === "iiu" ? iiuAssignedTableCopy.emptyMessage : undefined
            }
            ariaLabel={
              unitId === "iiu" ? iiuAssignedTableCopy.ariaLabel : undefined
            }
          />
        ) : null}

        {!isFpu && (data.activities.length > 0 || data.sampling.length > 0) ? (
          <ActivityCharts charts={[...data.activities, ...data.sampling]} />
        ) : null}
      </ContentSwap>
    </PageTransition>
  );
}
