import type { Metadata } from "next";
import { StreamPageView } from "@/components/dashboard/stream-page-view";

export const metadata: Metadata = {
  title: "Seed Inspection & Certification",
};

export default function SeedInspectionPage() {
  return <StreamPageView streamId="seed" />;
}
