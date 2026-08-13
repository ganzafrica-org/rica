"use client";

import { PageTitle } from "@/components/layout/page-title";
import { PageTransition } from "@/components/motion/page-transition";
import { SurfaceCard } from "@/components/ui/surface-card";

type PortalPlaceholderProps = {
  title: string;
  description?: string;
  hint?: string;
};

/** Stand-in for screens that are routed and navigable but not yet built. */
export function PortalPlaceholder({
  title,
  description,
  hint,
}: PortalPlaceholderProps) {
  return (
    <PageTransition className="space-y-6">
      <PageTitle title={title} description={description} />
      <SurfaceCard title="Coming next" description={hint} />
    </PageTransition>
  );
}
