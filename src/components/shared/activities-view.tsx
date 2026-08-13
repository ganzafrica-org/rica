"use client";

import { useMemo, useState } from "react";
import { ActivityCharts } from "@/components/shared/activity-charts";
import { ServiceFilter } from "@/components/shared/service-filter";
import { PageTitle } from "@/components/layout/page-title";
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

  const hasContent = data.activities.length > 0 || data.sampling.length > 0;

  return (
    <PageTransition className="space-y-6">
      <PageTitle title="Inspection Activities" />

      <ServiceFilter
        services={services}
        value={service}
        onChange={setService}
      />

      <ContentSwap motionKey={service} className="space-y-6">
        {data.activities.length > 0 ? (
          <section className="space-y-3">
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              Inspection Activities
            </h3>
            <ActivityCharts charts={data.activities} />
          </section>
        ) : null}

        {data.sampling.length > 0 ? (
          <section className="space-y-3">
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              Sampling Activities
            </h3>
            <ActivityCharts charts={data.sampling} />
          </section>
        ) : null}

        {!hasContent ? (
          <SurfaceCard title="No activity data" />
        ) : null}
      </ContentSwap>
    </PageTransition>
  );
}
