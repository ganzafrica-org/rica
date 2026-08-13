import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Units",
};

/** Units index → first unit; sidebar Units dropdown opens each unit page. */
export default async function SeniorDirectorUnitsPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  redirect("/senior-director/units/fpu");
}
