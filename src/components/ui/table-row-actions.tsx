"use client";

import { EllipsisVertical } from "lucide-react";
import { Dropdown } from "@heroui/react";

export type TableRowAction = "view" | "update" | "delete";

type TableRowActionsProps<T> = {
  row: T;
  onAction?: (action: TableRowAction, row: T) => void;
};

export function TableRowActions<T>({ row, onAction }: TableRowActionsProps<T>) {
  return (
    <Dropdown>
      <Dropdown.Trigger
        aria-label="Row actions"
        className="inline-flex size-8 items-center justify-center text-muted transition-colors hover:bg-default hover:text-foreground"
      >
        <EllipsisVertical className="size-4" />
      </Dropdown.Trigger>
      <Dropdown.Popover className="min-w-[160px]" placement="bottom end">
        <Dropdown.Menu
          aria-label="Row actions"
          onAction={(key) => onAction?.(key as TableRowAction, row)}
        >
          <Dropdown.Item id="view" textValue="View details">
            View details
          </Dropdown.Item>
          <Dropdown.Item id="update" textValue="Update">
            Update
          </Dropdown.Item>
          <Dropdown.Item id="delete" textValue="Delete" className="text-danger">
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
