"use client";

import { SurfaceCard } from "@/components/ui/surface-card";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { StatusChip, type StatusKey } from "@/components/ui/status-chip";
import type { TableRowAction } from "@/components/ui/table-row-actions";
import { unitInspections } from "@/data/dashboard";
import { unitName } from "@/lib/constants";

type UnitInspection = (typeof unitInspections)[number];

const columns: DataTableColumn<UnitInspection>[] = [
  {
    key: "reference",
    header: "Reference",
    isRowHeader: true,
  },
  {
    key: "facility",
    header: "Facility / producer",
  },
  {
    key: "stream",
    header: "Regulatory stream",
  },
  {
    key: "district",
    header: "District",
  },
  {
    key: "inspector",
    header: "Inspector",
  },
  {
    key: "scheduled",
    header: "Scheduled",
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusChip status={row.status as StatusKey} />,
  },
];

function handleRowAction(action: TableRowAction, row: UnitInspection) {
  // Wire to real handlers later (drawer/modal/routes).
  console.info(`[inspection ${row.reference}] ${action}`);
}

export function UnitInspectionsTable() {
  return (
    <SurfaceCard
      title="Recent inspections"
      description={`Assigned and completed work under ${unitName}`}
    >
      <DataTable
        ariaLabel="Unit inspections"
        columns={columns}
        rows={unitInspections}
        getRowKey={(row) => row.reference}
        onRowAction={handleRowAction}
      />
    </SurfaceCard>
  );
}
