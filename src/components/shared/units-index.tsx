"use client";

import { useMemo } from "react";
import { DirectorDashboardLinks } from "@/components/shared/director-dashboard-links";
import { UnitPerformanceTable } from "@/components/shared/unit-performance-table";
import { PageTitle } from "@/components/layout/page-title";
import { PageTransition } from "@/components/motion/page-transition";
import { buildExecutiveDashboard } from "@/data/generators/executive-dashboard";

/** Landing page for the unit drill-downs. */
export function UnitsIndex() {
  const data = useMemo(() => buildExecutiveDashboard(), []);

  return (
    <PageTransition className="space-y-6">
      <PageTitle
        title="Units"
        description="Open a unit for its detailed executive view"
      />

      <DirectorDashboardLinks rows={data.unitPerformance} />

      <UnitPerformanceTable rows={data.unitPerformance} />
    </PageTransition>
  );
}
