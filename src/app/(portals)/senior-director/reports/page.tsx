import type { Metadata } from "next";
import { PortalHome } from "@/components/dashboard/portal-home";

export const metadata: Metadata = {
  title: "Reports",
};

export default function SeniorReportsPage() {
  return (
    <PortalHome
      title="Senior reports"
      description="Organization-wide reporting and compliance summaries."
    />
  );
}
