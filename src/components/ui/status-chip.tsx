"use client";

import { Chip } from "@heroui/react";

const statusMap = {
  ongoing: { color: "warning" as const, label: "Ongoing" },
  "not-started": { color: "default" as const, label: "Not started" },
  completed: { color: "success" as const, label: "Completed" },
  approved: { color: "success" as const, label: "Approved" },
  rejected: { color: "danger" as const, label: "Rejected" },
  pending: { color: "warning" as const, label: "Pending" },
};

export type StatusKey = keyof typeof statusMap;

type StatusChipProps = {
  status: StatusKey;
  className?: string;
};

export function StatusChip({ status, className }: StatusChipProps) {
  const config = statusMap[status];

  return (
    <Chip
      className={className}
      color={config.color}
      size="sm"
      variant="soft"
    >
      {config.label}
    </Chip>
  );
}
