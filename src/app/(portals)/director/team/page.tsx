import type { Metadata } from "next";
import { DirectorTeamView } from "@/components/director";

export const metadata: Metadata = {
  title: "Team",
};

export default function DirectorTeamPage() {
  return <DirectorTeamView />;
}
