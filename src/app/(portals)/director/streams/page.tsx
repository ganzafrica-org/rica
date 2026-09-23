import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DirectorStreamsView } from "@/components/director";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Unit deep-dive",
};

export default async function DirectorStreamsIndexPage() {
  const user = await getSessionUser();

  // FPU / RLU / IIU open deep-dives from the sidebar dropdown.
  if (!user?.unit || user.unit === "fpu") {
    redirect("/director/streams/livestock/slaughterhouse");
  }
  if (user.unit === "rlu") {
    redirect("/director/streams/seed-producers");
  }
  if (user.unit === "iiu") {
    redirect("/director/streams/food/rice");
  }
  if (user.unit === "imu") {
    if (user.role === "senior-inspector") {
      redirect(`/director/streams/${user.imuSpecialty ?? "market"}`);
    }
    redirect("/director/streams/industries");
  }

  return <DirectorStreamsView />;
}
