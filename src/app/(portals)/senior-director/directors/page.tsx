import type { Metadata } from "next";
import { PortalHome } from "@/components/dashboard/portal-home";

export const metadata: Metadata = {
  title: "Directors",
};

export default function SeniorDirectorsPage() {
  return (
    <PortalHome
      title="Directors"
      description="Directors reporting into the senior directorate."
    />
  );
}
