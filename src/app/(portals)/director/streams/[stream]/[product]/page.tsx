import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DirectorAssignmentList,
  DirectorStreamsView,
} from "@/components/director";
import {
  imuAssignedListLabels,
  isImuBusinessCategoryId,
} from "@/data/imu";
import {
  directorProductCategoryLabels,
  directorProductLabel,
  directorStreamFacilityLabel,
  directorStreamLabels,
  isDirectorProductCategoryId,
  isDirectorProductId,
  isDirectorStreamFacilityId,
  isDirectorStreamId,
} from "@/data/navigation";
import { getSessionUser } from "@/lib/session";

type PageProps = {
  params: Promise<{ stream: string; product: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { stream, product } = await params;
  const user = await getSessionUser();

  if (user?.unit === "fpu" && isDirectorStreamId(stream)) {
    const facility = directorStreamFacilityLabel(stream, product);
    return {
      title: facility
        ? `${facility} · ${directorStreamLabels[stream]}`
        : directorStreamLabels[stream],
    };
  }

  if (
    (user?.unit === "imu" || user?.role === "senior-inspector") &&
    product === "assigned" &&
    isImuBusinessCategoryId(stream)
  ) {
    return { title: imuAssignedListLabels[stream] };
  }

  if (!isDirectorProductCategoryId(stream)) return { title: "Import operations" };
  const label = directorProductLabel(stream, product);
  return {
    title: label
      ? `${label} · ${directorProductCategoryLabels[stream]}`
      : directorProductCategoryLabels[stream],
  };
}

export default async function DirectorNestedStreamPage({ params }: PageProps) {
  const { stream, product } = await params;
  const user = await getSessionUser();

  if (user?.unit === "fpu") {
    if (!isDirectorStreamId(stream)) notFound();
    if (!isDirectorStreamFacilityId(stream, product)) notFound();
    return (
      <DirectorStreamsView streamId={stream} streamFacilityId={product} />
    );
  }

  if (
    (user?.unit === "imu" || user?.role === "senior-inspector") &&
    product === "assigned" &&
    isImuBusinessCategoryId(stream)
  ) {
    return <DirectorAssignmentList imuCategory={stream} />;
  }

  if (user?.unit !== "iiu") notFound();
  if (!isDirectorProductCategoryId(stream)) notFound();
  if (!isDirectorProductId(stream, product)) notFound();

  return (
    <DirectorStreamsView
      productCategoryId={stream}
      productNameId={product}
    />
  );
}
