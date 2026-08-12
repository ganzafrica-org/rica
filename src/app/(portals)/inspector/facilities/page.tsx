import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { FacilitiesView } from "@/components/dashboard/facilities-view";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Assigned Facilities",
};

export default async function InspectorFacilitiesPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <FacilitiesView
      unitId={user.unit}
      initialService={user.homeService ?? "all"}
    />
  );
}
