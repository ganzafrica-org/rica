import type { Metadata } from "next";
import { PortalPlaceholder } from "@/components/shared/portal-placeholder";

export const metadata: Metadata = {
  title: "Inspectors",
};

export default function SeniorDirectorInspectorsPage() {
  return (
    <PortalPlaceholder
      title="Inspectors"
      description="Inspectors across all units under senior oversight"
      hint="Needs an inspector roster before this can show real data."
    />
  );
}
