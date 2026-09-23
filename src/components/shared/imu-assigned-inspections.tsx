"use client";

import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { StatusChip } from "@/components/ui/status-chip";
import { SurfaceCard } from "@/components/ui/surface-card";
import {
  imuIndustryAssignments,
  imuMarketAssignments,
  imuServiceAssignments,
  type ImuIndustryAssignment,
  type ImuMarketAssignment,
  type ImuServiceAssignment,
} from "@/data/imu";

function IndustryTable() {
  const columns: DataTableColumn<ImuIndustryAssignment>[] = [
    { key: "name", header: "Industry/company name", isRowHeader: true },
    { key: "products", header: "Manufactured products" },
    { key: "location", header: "Location (district/sector)" },
    {
      key: "status",
      header: "Activity status",
      render: (row) => <StatusChip status={row.status} />,
    },
  ];

  return (
    <SurfaceCard title="Industry/SME inspection">
      <DataTable
        ariaLabel="Industry and SME inspections"
        columns={columns}
        rows={imuIndustryAssignments}
        getRowKey={(row) => row.id}
        emptyMessage="No industry or SME inspections for this selection."
      />
    </SurfaceCard>
  );
}

function MarketTable() {
  const columns: DataTableColumn<ImuMarketAssignment>[] = [
    { key: "tradingCenter", header: "Trading center", isRowHeader: true },
    { key: "location", header: "Location (district/sector)" },
    { key: "outlets", header: "Number of inspected business outlets" },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusChip status={row.status} />,
    },
  ];

  return (
    <SurfaceCard title="Market surveillance">
      <DataTable
        ariaLabel="Market surveillance inspections"
        columns={columns}
        rows={imuMarketAssignments}
        getRowKey={(row) => row.id}
        emptyMessage="No market surveillance inspections for this selection."
      />
    </SurfaceCard>
  );
}

function ServiceTable() {
  const columns: DataTableColumn<ImuServiceAssignment>[] = [
    { key: "name", header: "Company name", isRowHeader: true },
    { key: "service", header: "Service provided" },
    { key: "location", header: "Location (district/sector)" },
    {
      key: "status",
      header: "Activity status",
      render: (row) => <StatusChip status={row.status} />,
    },
  ];

  return (
    <SurfaceCard title="Service provision inspections">
      <DataTable
        ariaLabel="Service provision inspections"
        columns={columns}
        rows={imuServiceAssignments}
        getRowKey={(row) => row.id}
        emptyMessage="No service provision inspections for this selection."
      />
    </SurfaceCard>
  );
}

export function ImuAssignedInspections() {
  return (
    <div className="space-y-6">
      <IndustryTable />
      <MarketTable />
      <ServiceTable />
    </div>
  );
}
