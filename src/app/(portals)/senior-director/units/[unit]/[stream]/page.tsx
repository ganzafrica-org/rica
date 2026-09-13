import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Farm Products",
};

/** Senior managers use the unit summary — no stream drill-down. */
export default async function SeniorUnitStreamPage({
  params,
}: {
  params: Promise<{ unit: string; stream: string }>;
}) {
  const { unit } = await params;
  redirect(`/senior-director/units/${unit}`);
}
