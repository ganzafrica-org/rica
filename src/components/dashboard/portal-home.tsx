"use client";

import { PageTransition } from "@/components/motion/page-transition";
import { PageTitle } from "@/components/layout/page-title";
import { SurfaceCard } from "@/components/ui/surface-card";

type PortalHomeProps = {
  title: string;
  description: string;
  hint?: string;
};

export function PortalHome({ title, description, hint }: PortalHomeProps) {
  return (
    <PageTransition className="space-y-6">
      <PageTitle title={title} description={description} />
      <SurfaceCard title="Coming next" description={hint}>
        <p className="rica-body text-muted">
          Role-specific screens and permissions will be wired here. For now this
          portal is reachable after sign-in with the matching demo account.
        </p>
      </SurfaceCard>
    </PageTransition>
  );
}
