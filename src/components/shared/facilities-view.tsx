"use client";

import { useMemo, useState } from "react";
import { AssignedFacilitiesTable } from "@/components/shared/assigned-facilities-table";
import { PendingInspectionsTable } from "@/components/shared/pending-inspections-table";
import { ServiceFilter } from "@/components/shared/service-filter";
import { PageTitle } from "@/components/layout/page-title";
import { ContentSwap, PageTransition } from "@/components/motion/page-transition";
import { buildInspectorDashboard } from "@/data/generators/inspector-dashboard";
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
      <PageTitle title="Assigned Facilities" />

      <ServiceFilter
        services={services}
        value={service}
        onChange={setService}
      />

      <ContentSwap motionKey={service} className="space-y-6">
        {unitId === "fpu" && data.pendingSections.length > 0 ? (
          data.pendingSections.map((section) => (
            <PendingInspectionsTable key={section.id} section={section} />
          ))
        ) : (
          <AssignedFacilitiesTable
            facilities={data.facilities}
            title={`${data.facilities.length} facilities`}
          />
        )}
      </ContentSwap>
    </PageTransition>
  );
}
