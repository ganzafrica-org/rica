import type { Metadata } from "next";
import { PortalHome } from "@/components/dashboard/portal-home";

export const metadata: Metadata = {
  title: "Inspectors",
};

export default function DirectorInspectorsPage() {
  return (
    <PortalHome
      title="Inspectors"
      description="People under your directorate and their assigned workload."
    />
  );
}
