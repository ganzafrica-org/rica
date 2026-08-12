import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { UnitsIndex } from "@/components/dashboard/units-index";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Units",
};

export default async function SeniorDirectorUnitsPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  return <UnitsIndex />;
}
