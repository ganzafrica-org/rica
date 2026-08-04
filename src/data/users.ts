import type { AuthUser } from "@/types";

/** Demo accounts for local sign-in. Password: Admin@123! */
export const demoUsers: AuthUser[] = [
  {
    id: "inspector-1",
    email: "jeannine.uwase@gmail.com",
    name: "Jeannine Uwase",
    role: "inspector",
    title: "Inspector · Kigali",
  },
  {
    id: "director-1",
    email: "gentilleuwamahoro28@gmail.com",
    name: "Gentille Uwamahoro",
    role: "director",
    title: "Director · Farm Products Unit",
  },
  {
    id: "senior-1",
    email: "jannine.uwase@gmail.com",
    name: "Jannine Uwase",
    role: "senior-director",
    title: "Senior Director",
  },
];

export const demoPassword = "Admin@123!";
