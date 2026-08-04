import type { Metadata } from "next";
import { StreamPageView } from "@/components/dashboard/stream-page-view";

export const metadata: Metadata = {
  title: "Agrochemical Dealership Licensing",
};

export default function AgrochemicalPage() {
  return <StreamPageView streamId="agrochemical" />;
}
