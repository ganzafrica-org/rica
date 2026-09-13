import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { InspectorDashboard } from "@/components/shared/inspector-dashboard";
import {
  directorStreamFacilities,
  directorStreamLabels,
  isDirectorStreamId,
} from "@/data/navigation";
import { getSessionUser } from "@/lib/session";

type PageProps = {
  params: Promise<{ stream: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { stream } = await params;
  if (!isDirectorStreamId(stream)) return { title: "Inspection" };
  return { title: directorStreamLabels[stream] };
}

export default async function InspectorStreamPage({ params }: PageProps) {
  const { stream } = await params;
  const user = await getSessionUser();

  if (!user) redirect("/login");
  if (user.unit !== "fpu") notFound();
  if (!isDirectorStreamId(stream)) notFound();

  const first = directorStreamFacilities[stream][0];
  if (first) {
    redirect(`/inspector/streams/${stream}/${first.id}`);
  }

  return (
    <InspectorDashboard
      unitId={user.unit}
      initialService={stream}
      streamTitle={directorStreamLabels[stream]}
    />
  );
}
