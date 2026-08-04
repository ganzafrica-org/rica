"use client";

import { SurfaceCard } from "@/components/ui/surface-card";

type AppCardProps = {
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
};

/** @deprecated Prefer SurfaceCard — kept as a thin alias for compatibility. */
export function AppCard({
  title,
  description,
  className,
  children,
}: AppCardProps) {
  return (
    <SurfaceCard title={title} description={description} className={className}>
      {children}
    </SurfaceCard>
  );
}
