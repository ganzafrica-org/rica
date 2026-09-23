"use client";

import { useMemo, useState } from "react";
import { AssignedFacilitiesTable } from "@/components/shared/assigned-facilities-table";
import { ImuAssignedInspections } from "@/components/shared/imu-assigned-inspections";
import { PendingInspectionsTable } from "@/components/shared/pending-inspections-table";
import { ServiceFilter } from "@/components/shared/service-filter";
import { PageTitle } from "@/components/layout/page-title";
import { ContentSwap, PageTransition } from "@/components/motion/page-transition";
import { FilterDateRange } from "@/components/ui";
import { buildInspectorDashboard } from "@/data/generators/inspector-dashboard";
import { imuAssignmentCount } from "@/data/imu";
import { iiuAssignedTableCopy } from "@/data/iiu";
import { getUnit } from "@/data/units";
import type { ServiceKey, UnitKey } from "@/types";

type FacilitiesViewProps = {
  unitId: UnitKey;
  initialService?: ServiceKey | "all";
};

export function FacilitiesView({
  unitId,
  initialService = "all",
}: FacilitiesViewProps) {
  const services = getUnit(unitId).services;
  const [service, setService] = useState<ServiceKey | "all">(initialService);

  const data = useMemo(
    () => buildInspectorDashboard({ unit: unitId, service }),
    [unitId, service],
  );

  return (
    <PageTransition className="space-y-6">
      <PageTitle
        title={
          unitId === "iiu" || unitId === "imu"
            ? "Assigned Inspections"
            : "Assigned Facilities"
        }
      />

      {unitId === "imu" ? (
        <div className="page-title flex min-w-0 items-center justify-between gap-3 border border-border bg-surface px-4 py-3 shadow-sm">
          <p className="text-sm text-muted">
            Number of assignments · {imuAssignmentCount}
          </p>
          <FilterDateRange label="Date range" />
        </div>
      ) : (
        <ServiceFilter
          services={services}
          value={service}
          onChange={setService}
        />
      )}

      <ContentSwap motionKey={service} className="space-y-6">
        {unitId === "imu" ? (
          <ImuAssignedInspections />
        ) : unitId === "fpu" && data.pendingSections.length > 0 ? (
          data.pendingSections.map((section) => (
            <PendingInspectionsTable key={section.id} section={section} />
          ))
        ) : (
          <AssignedFacilitiesTable
            facilities={data.facilities}
            title={
              unitId === "iiu"
                ? iiuAssignedTableCopy.countTitle(data.facilities.length)
                : `${data.facilities.length} facilities`
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
        )}
      </ContentSwap>
    </PageTransition>
  );
}
