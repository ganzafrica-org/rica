import type { Metadata } from "next";
import { StreamPageView } from "@/components/dashboard/stream-page-view";

export const metadata: Metadata = {
  title: "Slaughterhouse Inspection",
};

export default function SlaughterhousePage() {
  return <StreamPageView streamId="slaughterhouse" />;
}
