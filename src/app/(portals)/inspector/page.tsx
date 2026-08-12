import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { InspectorDashboard } from "@/components/shared/inspector-dashboard";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Inspector Dashboard",
};

export default async function InspectorDashboardPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <InspectorDashboard
      unitId={user.unit}
      initialService={user.homeService ?? "all"}
    />
  );
}
