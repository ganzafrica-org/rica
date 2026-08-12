import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DirectorStreamsView } from "@/components/director";
import {
  directorProductCategoryLabels,
  directorProductLabel,
  isDirectorProductCategoryId,
  isDirectorProductId,
} from "@/data/navigation";
import { getSessionUser } from "@/lib/session";

type PageProps = {
  params: Promise<{ stream: string; product: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { stream, product } = await params;
  if (!isDirectorProductCategoryId(stream)) return { title: "Import operations" };
  const label = directorProductLabel(stream, product);
  return {
    title: label
      ? `${label} · ${directorProductCategoryLabels[stream]}`
      : directorProductCategoryLabels[stream],
  };
}

export default async function DirectorImportProductPage({ params }: PageProps) {
  const { stream, product } = await params;
  const user = await getSessionUser();

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
