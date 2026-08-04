"use client";

import { PageTransition } from "@/components/motion/page-transition";
import { PageTitle } from "@/components/layout/page-title";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { StreamGrowthChart } from "@/components/dashboard/stream-growth-chart";
import { StreamProcessingChart } from "@/components/dashboard/stream-processing-chart";
import { UnitInspectionsTable } from "@/components/dashboard/unit-inspections-table";
import { unitName } from "@/lib/constants";

export function DashboardOverview() {
  return (
    <PageTransition className="space-y-6">
      <PageTitle title={unitName} />
      <KpiCards />
      <div className="grid gap-6 lg:grid-cols-2">
        <StreamGrowthChart />
        <StreamProcessingChart />
      </div>
      <UnitInspectionsTable />
    </PageTransition>
  );
}
