"use client";

import { Chip } from "@/components/ui";
import { SurfaceCard } from "@/components/ui/surface-card";
import type { FutureModule } from "@/types/dashboard";

type FutureModulesCardProps = {
  modules: readonly FutureModule[];
};

export function FutureModulesCard({ modules }: FutureModulesCardProps) {
  if (modules.length === 0) return null;

  return (
    <SurfaceCard
      title="Future Modules"
      description="Forms awaiting clarification before dashboard design"
    >
      <ul className="divide-y divide-border">
        {modules.map((module) => (
          <li
            key={module.id}
            className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {module.label}
              </p>
              <p className="rica-caption">{module.note}</p>
            </div>
            <Chip size="sm" variant="soft" color="default">
              Pending
            </Chip>
          </li>
        ))}
      </ul>
    </SurfaceCard>
  );
}
