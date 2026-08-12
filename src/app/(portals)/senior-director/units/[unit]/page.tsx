import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { UnitDetailDashboard } from "@/components/dashboard/unit-detail-dashboard";
import { getUnit, isUnitKey, unitList } from "@/data/units";
import { getSessionUser } from "@/lib/session";

type PageProps = {
  // Next 16: route params arrive as a Promise and must be awaited.
  params: Promise<{ unit: string }>;
};

export function generateStaticParams() {
  return unitList.map((unit) => ({ unit: unit.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { unit } = await params;

  if (!isUnitKey(unit)) {
    return { title: "Unit" };
  }

  return { title: `${getUnit(unit).shortLabel} · Executive View` };
}

export default async function UnitDetailPage({ params }: PageProps) {
  const [{ unit }, user] = await Promise.all([params, getSessionUser()]);

  if (!user) {
    redirect("/login");
  }

  if (!isUnitKey(unit)) {
    notFound();
  }

  return <UnitDetailDashboard unitId={unit} />;
}
