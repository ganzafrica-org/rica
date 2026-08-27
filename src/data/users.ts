import type { AuthUser } from "@/types";

/** Demo accounts for local sign-in. Password: password */
export const demoUsers: AuthUser[] = [
  // Inspectors — one per unit
  {
    id: "inspector-fpu",
    email: "inspector.farm@rica.gov.rw",
    aliases: ["inspector@rica.gov.rw"],
    name: "Jeannine Uwase",
    role: "inspector",
    title: "Inspector · Farm Products",
    unit: "fpu",
    homeService: "seed",
  },
  {
    id: "inspector-rlu",
    email: "inspector.licensing@rica.gov.rw",
    name: "Eric Habimana",
    role: "inspector",
    title: "Inspector · Registration & Licensing",
    unit: "rlu",
  },
  {
    id: "inspector-imu",
    email: "inspector.market@rica.gov.rw",
    name: "Claudine Mukamana",
    role: "inspector",
    title: "Inspector · Market Surveillance",
    unit: "imu",
  },
  {
    id: "inspector-iiu",
    email: "inspector.imports@rica.gov.rw",
    name: "Patrick Nkurunziza",
    role: "inspector",
    title: "Inspector · Import Inspection",
    unit: "iiu",
  },

  // Directors — one per unit
  {
    id: "director-fpu-1",
    email: "director.farm@rica.gov.rw",
    aliases: ["director@rica.gov.rw"],
    name: "Gentille Uwamahoro",
    role: "director",
    title: "Director · Farm Products",
    unit: "fpu",
  },
  {
    id: "director-rlu-1",
    email: "director.licensing@rica.gov.rw",
    name: "Claire Mukamana",
    role: "director",
    title: "Director · Registration & Licensing",
    unit: "rlu",
  },
  {
    id: "director-imu-1",
    email: "director.market@rica.gov.rw",
    name: "Eric Habimana",
    role: "director",
    title: "Director · Market Surveillance",
    unit: "imu",
  },
  {
    id: "director-iiu-1",
    email: "director.imports@rica.gov.rw",
    name: "Alice Uwimana",
    role: "director",
    title: "Director · Import Inspection",
    unit: "iiu",
  },

  // Senior director — org-wide, so the unit is nominal.
  {
    id: "senior-1",
    email: "senior.director@rica.gov.rw",
    name: "Jannine Uwase",
    role: "senior-director",
    title: "Senior Director",
    unit: "fpu",
  },
];

export const demoPassword = "password";

export const directorDemoUsers = demoUsers.filter(
  (user) => user.role === "director",
);
