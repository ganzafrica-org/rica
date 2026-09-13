"use client";

import { useMemo, useState } from "react";
import { ActivityCharts } from "@/components/shared/activity-charts";
import { ServiceFilter } from "@/components/shared/service-filter";
import { ContentSwap, PageTransition } from "@/components/motion/page-transition";
import { SurfaceCard } from "@/components/ui/surface-card";
import { buildInspectorDashboard } from "@/data/generators/inspector-dashboard";
import { getUnit } from "@/data/units";
import type { ServiceKey, UnitKey } from "@/types";

type ActivitiesViewProps = {
  unitId: UnitKey;
  initialService?: ServiceKey | "all";
};

export function ActivitiesView({
  unitId,
  initialService = "all",
}: ActivitiesViewProps) {
  const services = getUnit(unitId).services;
  const [service, setService] = useState<ServiceKey | "all">(initialService);

  const data = useMemo(
    () => buildInspectorDashboard({ unit: unitId, service }),
    [unitId, service],
  );

  const charts = [...data.activities, ...data.sampling];

  return (
    <PageTransition className="space-y-6">
      <ServiceFilter
        services={services}
        value={service}
        onChange={setService}
      />

      <ContentSwap motionKey={service} className="space-y-6">
        {charts.length > 0 ? <ActivityCharts charts={charts} /> : null}

        {charts.length === 0 ? <SurfaceCard title="No activity data" /> : null}
      </ContentSwap>
    </PageTransition>
  );
}
