import type { Metadata } from "next";
import { PortalHome } from "@/components/dashboard/portal-home";

export const metadata: Metadata = {
  title: "Inspectors",
};

export default function SeniorInspectorsPage() {
  return (
    <PortalHome
      title="Inspectors"
      description="Inspectors across units under senior oversight."
    />
  );
}
