import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { DirectorStreamsView } from "@/components/director";
import {
  directorCategoryLabels,
  directorProductCategoryLabels,
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
  if (user?.unit === "iiu" && isDirectorProductCategoryId(stream)) {
    return { title: directorProductCategoryLabels[stream] };
  }
  if (isDirectorStreamId(stream)) {
    return { title: directorStreamLabels[stream] };
  }
  if (isDirectorCategoryId(stream)) {
    return { title: directorCategoryLabels[stream] };
  }
  return { title: "Unit deep-dive" };
}

export const dynamic = "force-dynamic";

export default async function DirectorDeepDivePage({ params }: PageProps) {
  const { stream } = await params;
  const user = await getSessionUser();

  // RLU licensing categories (sidebar dropdown)
  if (user?.unit === "rlu") {
    if (!isDirectorCategoryId(stream)) notFound();
    return <DirectorStreamsView categoryId={stream} />;
  }

  // IIU: checklist categories open the first product; General Category is a page.
  if (user?.unit === "iiu") {
    if (!isDirectorProductCategoryId(stream)) notFound();
    const products = directorProductsByCategory[stream];
    if (products.length === 0) {
      return <DirectorStreamsView productCategoryId={stream} />;
    }
    redirect(`/director/streams/${stream}/${products[0].id}`);
  }

  // FPU regulatory streams (sidebar dropdown)
  if (isDirectorStreamId(stream)) {
    return <DirectorStreamsView streamId={stream} />;
  }

  notFound();
}
