/** Shared vocabulary the demo data generator draws from. */

export const districts = [
  "Gasabo",
  "Kicukiro",
  "Nyarugenge",
  "Musanze",
  "Rwamagana",
  "Huye",
  "Muhanga",
  "Rubavu",
  "Nyagatare",
  "Karongi",
] as const;

export const provinces = [
  "Kigali City",
  "Northern",
  "Southern",
  "Eastern",
  "Western",
] as const;

/** Chart colours, reusing the existing --stream-* tokens plus the RICA green. */
export const accentColors = {
  seed: "var(--stream-seed)",
  slaughterhouse: "var(--stream-slaughterhouse)",
  agrochemical: "var(--stream-agrochemical)",
  "seed-producer": "var(--stream-seed-producer)",
  accent: "var(--accent)",
} as const;

/** Outcome categories shared by every unit's compliance section. */
export const complianceOutcomeLabels = [
  "Approved",
  "Corrective Action",
  "Rejected",
] as const;

export const complianceOutcomeColors = [
  "var(--stream-seed)",
  "var(--stream-seed-producer)",
  "var(--stream-agrochemical)",
] as const;

export const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export const weekdayLabels = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const;

export const weekLabels = [
  "Wk 1",
  "Wk 2",
  "Wk 3",
  "Wk 4",
  "Wk 5",
  "Wk 6",
  "Wk 7",
  "Wk 8",
] as const;
