import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ExecutiveDashboard } from "@/components/shared/executive-dashboard";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Executive Dashboard",
};

export default async function SeniorDirectorDashboardPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  return <ExecutiveDashboard />;
}
