"use client";

import { useMemo, useState } from "react";
import { AssignedFacilitiesTable } from "@/components/shared/assigned-facilities-table";
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
  const unit = getUnit(unitId);
  const [service, setService] = useState<ServiceKey | "all">(initialService);

  const data = useMemo(
    () => buildInspectorDashboard({ unit: unitId, service }),
    [unitId, service],
  );

  return (
    <PageTransition className="space-y-6">
      <PageTitle
        title="Assigned Facilities"
        description={`Facilities assigned to you across ${unit.shortLabel}`}
      />

      <ServiceFilter
        services={unit.services}
        value={service}
        onChange={setService}
      />

      <ContentSwap motionKey={service}>
        <AssignedFacilitiesTable
          facilities={data.facilities}
          title={`${data.facilities.length} facilities`}
          description="Name, classification, district and registration status"
        />
      </ContentSwap>
    </PageTransition>
  );
}
