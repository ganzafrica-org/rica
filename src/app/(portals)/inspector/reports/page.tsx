import type { Metadata } from "next";
import { PortalPlaceholder } from "@/components/shared/portal-placeholder";

export const metadata: Metadata = {
  title: "Reports",
};

export default function InspectorReportsPage() {
  return <PortalPlaceholder title="Reports" />;
}
