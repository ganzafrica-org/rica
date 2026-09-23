import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DirectorDashboard } from "@/components/director";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Director Dashboard",
};

export const dynamic = "force-dynamic";

export default async function DirectorDashboardPage() {
  const user = await getSessionUser();
  if (user?.role === "senior-inspector") {
    redirect(`/director/streams/${user.imuSpecialty ?? "market"}`);
  }
  return <DirectorDashboard />;
}
