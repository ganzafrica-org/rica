import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { InspectorDashboard } from "@/components/shared/inspector-dashboard";
import {
  directorStreamFacilityLabel,
  directorStreamLabels,
  isDirectorStreamFacilityId,
  isDirectorStreamId,
} from "@/data/navigation";
import { getSessionUser } from "@/lib/session";

type PageProps = {
  params: Promise<{ stream: string; facility: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { stream, facility } = await params;
  if (!isDirectorStreamId(stream)) return { title: "Inspection" };
  const label = directorStreamFacilityLabel(stream, facility);
  return {
    title: label
      ? `${label} · ${directorStreamLabels[stream]}`
      : directorStreamLabels[stream],
  };
}

export default async function InspectorStreamFacilityPage({
  params,
}: PageProps) {
  const { stream, facility } = await params;
  const user = await getSessionUser();

  if (!user) redirect("/login");
  if (user.unit !== "fpu") notFound();
  if (!isDirectorStreamId(stream)) notFound();
  if (!isDirectorStreamFacilityId(stream, facility)) notFound();

  return (
    <InspectorDashboard
      unitId={user.unit}
      initialService={stream}
      streamTitle={directorStreamLabels[stream]}
      facilityTitle={directorStreamFacilityLabel(stream, facility)}
    />
  );
}
