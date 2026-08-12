"use client";

import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { StatusChip } from "@/components/ui/status-chip";
import { SurfaceCard } from "@/components/ui/surface-card";
import type { AssignedFacility } from "@/types/dashboard";

const columns: DataTableColumn<AssignedFacility>[] = [
  { key: "name", header: "Facility Name", isRowHeader: true },
  { key: "classification", header: "Facility Classification" },
  { key: "district", header: "District" },
  {
    key: "registrationStatus",
    header: "Registration Status",
    render: (row) => <StatusChip status={row.registrationStatus} />,
  },
];

type AssignedFacilitiesTableProps = {
  facilities: readonly AssignedFacility[];
  title?: string;
  description?: string;
};

export function AssignedFacilitiesTable({
  facilities,
  title = "Assigned Facilities",
  description = "Facilities assigned to you and their current status",
}: AssignedFacilitiesTableProps) {
  return (
    <SurfaceCard title={title} description={description}>
      <DataTable
        ariaLabel="Assigned facilities"
        columns={columns}
        rows={facilities}
        getRowKey={(row) => row.id}
        emptyMessage="No facilities assigned for this selection."
        showActions={false}
      />
    </SurfaceCard>
  );
}
