import type { AuthUser } from "@/types";

/** Demo accounts for local sign-in. Password: password */
export const demoUsers: AuthUser[] = [
  {
    id: "inspector-farm",
    email: "inspector.farm@rica.gov.rw",
    aliases: ["inspector@rica.gov.rw"],
    name: "Jeannine Uwase",
    role: "inspector",
    title: "Inspector · Farm Products",
    unit: "farm-products",
    homeService: "seed",
  },
  {
    id: "inspector-licensing",
    email: "inspector.licensing@rica.gov.rw",
    name: "Eric Habimana",
    role: "inspector",
    title: "Inspector · Registration & Licensing",
    unit: "registration-licensing",
  },
  {
    id: "inspector-market",
    email: "inspector.market@rica.gov.rw",
    name: "Claudine Mukamana",
    role: "inspector",
    title: "Inspector · Market Surveillance",
    unit: "industries-market-surveillance",
  },
  {
    id: "inspector-imports",
    email: "inspector.imports@rica.gov.rw",
    name: "Patrick Nkurunziza",
    role: "inspector",
    title: "Inspector · Import Inspection",
    unit: "import-inspection",
  },
  {
    id: "inspector-competition",
    email: "inspector.competition@rica.gov.rw",
    name: "Aline Ingabire",
    role: "inspector",
    title: "Inspector · Consumer Protection",
    unit: "competition-consumer-protection",
  },
  {
    id: "director-1",
    email: "director@rica.gov.rw",
    name: "Gentille Uwamahoro",
    role: "director",
    title: "Director · Farm Products Unit",
    unit: "farm-products",
  },
  {
    id: "senior-1",
    email: "senior.director@rica.gov.rw",
    name: "Jannine Uwase",
    role: "senior-director",
    title: "Senior Director",
    unit: "farm-products",
  },
];

export const demoPassword = "password";
