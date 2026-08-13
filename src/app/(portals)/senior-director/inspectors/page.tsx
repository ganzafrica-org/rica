import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SeniorInspectorsView } from "@/components/shared/senior-inspectors-view";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Inspectors",
};

export default async function SeniorDirectorInspectorsPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  return <SeniorInspectorsView />;
}
