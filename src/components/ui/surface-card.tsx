"use client";

import { Card } from "@heroui/react";
import { cn } from "@/lib/utils";

export type SurfaceCardProps = {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  children?: React.ReactNode;
};

/** Reusable dashboard card with optional header and actions. */
export function SurfaceCard({
  title,
  description,
  actions,
  className,
  headerClassName,
  contentClassName,
  children,
}: SurfaceCardProps) {
  const hasHeader = Boolean(title || description || actions);

  return (
    <Card className={cn("border-border/70 bg-surface shadow-sm", className)}>
      {hasHeader ? (
        <Card.Header
          className={cn(
            "flex flex-row items-start justify-between gap-3 px-4 py-3",
            headerClassName,
          )}
        >
          <div className="min-w-0">
            {title ? (
              <Card.Title className="text-base font-semibold tracking-tight">
                {title}
              </Card.Title>
            ) : null}
            {description ? (
              <Card.Description className="rica-caption mt-0.5">
                {description}
              </Card.Description>
            ) : null}
          </div>
          {actions ? (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          ) : null}
        </Card.Header>
      ) : null}
      {children ? (
        <Card.Content className={cn("px-4 pb-3 pt-0", contentClassName)}>
          {children}
        </Card.Content>
      ) : null}
    </Card>
  );
}
