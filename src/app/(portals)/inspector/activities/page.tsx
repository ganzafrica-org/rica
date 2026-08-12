import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ActivitiesView } from "@/components/shared/activities-view";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Inspection Activities",
};

export default async function InspectorActivitiesPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <ActivitiesView
      unitId={user.unit}
      initialService={user.homeService ?? "all"}
    />
  );
}
