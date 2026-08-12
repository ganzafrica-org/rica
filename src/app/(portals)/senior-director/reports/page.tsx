import type { Metadata } from "next";
import { PortalPlaceholder } from "@/components/shared/portal-placeholder";

export const metadata: Metadata = {
  title: "Senior reports",
};

export default function SeniorDirectorReportsPage() {
  return (
    <PortalPlaceholder
      title="Reports"
      description="Organization-wide reporting and compliance summaries"
      hint="Executive report formats are still to be agreed."
    />
  );
}
