import type { Metadata } from "next";
import { PortalHome } from "@/components/dashboard/portal-home";

export const metadata: Metadata = {
  title: "Streams",
};

export default function DirectorStreamsPage() {
  return (
    <PortalHome
      title="Regulatory streams"
      description="Cross-stream view of inspection activity for your unit."
    />
  );
}
