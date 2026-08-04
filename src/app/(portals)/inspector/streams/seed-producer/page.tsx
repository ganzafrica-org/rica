import type { Metadata } from "next";
import { StreamPageView } from "@/components/dashboard/stream-page-view";

export const metadata: Metadata = {
  title: "Seed Producer Onsite Verification",
};

export default function SeedProducerPage() {
  return <StreamPageView streamId="seed-producer" />;
}
