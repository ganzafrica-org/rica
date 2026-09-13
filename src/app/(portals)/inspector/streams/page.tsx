import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session";

export default async function InspectorStreamsIndexPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (user.unit !== "fpu") redirect("/inspector");
  redirect("/inspector/streams/livestock/slaughterhouse");
}
