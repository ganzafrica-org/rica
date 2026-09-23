import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { FacilitiesView } from "@/components/shared/facilities-view";
import { iiuAssignedTableCopy } from "@/data/iiu";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getSessionUser();
  return {
    title:
      user?.unit === "iiu" || user?.unit === "imu"
        ? "Assigned Inspections"
        : "Assigned Facilities",
  };
}

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
