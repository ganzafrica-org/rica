import { redirect } from "next/navigation";

/** Legacy path — Team moved to /director/team */
export default function DirectorInspectorsRedirectPage() {
  redirect("/director/team");
}
