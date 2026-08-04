import type { Metadata } from "next";
import { PortalHome } from "@/components/dashboard/portal-home";

export const metadata: Metadata = {
  title: "Director Dashboard",
};

export default function DirectorDashboardPage() {
  return (
    <PortalHome
      title="Director portal"
      description="Oversee inspectors, stream activity, and unit performance."
      hint="Inspector oversight and approvals will land here."
    />
  );
}
