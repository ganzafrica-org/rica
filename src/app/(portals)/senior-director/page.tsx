import type { Metadata } from "next";
import { PortalHome } from "@/components/dashboard/portal-home";

export const metadata: Metadata = {
  title: "Senior Director Dashboard",
};

export default function SeniorDirectorDashboardPage() {
  return (
    <PortalHome
      title="Senior Director portal"
      description="Organization-wide oversight across directors and inspectors."
      hint="Director performance and escalations will land here."
    />
  );
}
