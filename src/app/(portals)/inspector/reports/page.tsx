import type { Metadata } from "next";
import { PortalPlaceholder } from "@/components/shared/portal-placeholder";

export const metadata: Metadata = {
  title: "Reports",
};

export default function InspectorReportsPage() {
  return (
    <PortalPlaceholder
      title="Reports"
      description="Exports and summaries for your assigned inspections"
      hint="Report templates are pending confirmation with the unit."
    />
  );
}
