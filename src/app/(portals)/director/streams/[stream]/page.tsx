import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { DirectorStreamsView } from "@/components/director";
import {
  directorCategoryLabels,
  directorProductsByCategory,
  directorStreamLabels,
  isDirectorCategoryId,
  isDirectorProductCategoryId,
  isDirectorStreamId,
} from "@/data/navigation";
import { getSessionUser } from "@/lib/session";

type PageProps = {
  params: Promise<{ stream: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { stream } = await params;
  const user = await getSessionUser();

  if (user?.unit === "rlu" && isDirectorCategoryId(stream)) {
    return { title: directorCategoryLabels[stream] };
  }
  if (isDirectorStreamId(stream)) {
    return { title: directorStreamLabels[stream] };
  }
  if (isDirectorCategoryId(stream)) {
    return { title: directorCategoryLabels[stream] };
  }
  return { title: "Unit deep-dive" };
}

export default async function DirectorDeepDivePage({ params }: PageProps) {
  const { stream } = await params;
  const user = await getSessionUser();

  // RLU licensing categories (sidebar dropdown)
  if (user?.unit === "rlu") {
    if (!isDirectorCategoryId(stream)) notFound();
    return <DirectorStreamsView categoryId={stream} />;
  }

  // IIU: category URLs only expand in the sidebar — open the first product.
  if (user?.unit === "iiu") {
    if (!isDirectorProductCategoryId(stream)) notFound();
    const firstProduct = directorProductsByCategory[stream][0];
    if (!firstProduct) notFound();
    redirect(`/director/streams/${stream}/${firstProduct.id}`);
  }

  // FPU regulatory streams (sidebar dropdown)
  if (isDirectorStreamId(stream)) {
    return <DirectorStreamsView streamId={stream} />;
  }

  notFound();
}
