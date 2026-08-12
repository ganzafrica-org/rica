import type { AuthUser } from "@/types";

/** Demo accounts for local sign-in. Password: Admin@123! */
export const demoUsers: AuthUser[] = [
  {
    id: "director-fpu-1",
    email: "gentilleuwamahoro28@gmail.com",
    name: "Gentille Uwamahoro",
    role: "director",
    title: "Director · Farm Products",
    unit: "fpu",
  },
  {
    id: "director-rlu-1",
    email: "claire.mukamana@gmail.com",
    name: "Claire Mukamana",
    role: "director",
    title: "Director · Registration & Licensing",
    unit: "rlu",
  },
  {
    id: "director-imu-1",
    email: "eric.habimana@gmail.com",
    name: "Eric Habimana",
    role: "director",
    title: "Director · Market Surveillance",
    unit: "imu",
  },
  {
    id: "director-iiu-1",
    email: "alice.uwimana@gmail.com",
    name: "Alice Uwimana",
    role: "director",
    title: "Director · Import Inspection",
    unit: "iiu",
  },
  {
    id: "director-ccpu-1",
    email: "patrick.nsengimana@gmail.com",
    name: "Patrick Nsengimana",
    role: "director",
    title: "Director · Competition & Consumer",
    unit: "ccpu",
  },
];

export const demoPassword = "Admin@123!";

export const directorDemoUsers = demoUsers.filter(
  (user) => user.role === "director",
);
