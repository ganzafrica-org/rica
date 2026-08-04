import type { Metadata } from "next";
import { PortalHome } from "@/components/dashboard/portal-home";

export const metadata: Metadata = {
  title: "Reports",
};

export default function DirectorReportsPage() {
  return (
    <PortalHome
      title="Director reports"
      description="Summaries and exports for director-level review."
    />
  );
}
