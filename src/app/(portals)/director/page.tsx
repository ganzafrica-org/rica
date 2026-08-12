import type { Metadata } from "next";
import { DirectorDashboard } from "@/components/director";

export const metadata: Metadata = {
  title: "Director Dashboard",
};

export default function DirectorDashboardPage() {
  return <DirectorDashboard />;
}
