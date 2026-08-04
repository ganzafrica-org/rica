export const kpiCards = [
  {
    id: "assigned",
    label: "Total assigned",
    value: "38",
    hint: "Across all streams",
    tone: "seed" as const,
  },
  {
    id: "pending",
    label: "Pending inspections",
    value: "9",
    hint: "Awaiting field action",
    tone: "slaughterhouse" as const,
  },
  {
    id: "completed",
    label: "Completed",
    value: "29",
    hint: "+76% completion rate",
    tone: "agrochemical" as const,
  },
  {
    id: "compliance",
    label: "Avg. compliance",
    value: "83.4%",
    hint: "+4.2% vs last period",
    tone: "seed-producer" as const,
  },
];

/** Line chart — completed inspections by regulatory stream */
export const streamGrowthOverTime = [
  { year: "2021", seed: 42, slaughterhouse: 28, agrochemical: 18, producer: 12 },
  { year: "2022", seed: 58, slaughterhouse: 35, agrochemical: 24, producer: 16 },
  { year: "2023", seed: 71, slaughterhouse: 44, agrochemical: 31, producer: 22 },
  { year: "2024", seed: 86, slaughterhouse: 52, agrochemical: 39, producer: 28 },
  { year: "2025", seed: 98, slaughterhouse: 61, agrochemical: 47, producer: 34 },
];

/** Grouped bars — average processing days by stream */
export const streamProcessingTime = [
  { year: "2021", seed: 9, slaughterhouse: 6, agrochemical: 11, producer: 8 },
  { year: "2022", seed: 8, slaughterhouse: 5, agrochemical: 10, producer: 7 },
  { year: "2023", seed: 7, slaughterhouse: 5, agrochemical: 9, producer: 6 },
  { year: "2024", seed: 6, slaughterhouse: 4, agrochemical: 8, producer: 6 },
  { year: "2025", seed: 5, slaughterhouse: 4, agrochemical: 7, producer: 5 },
];

export const chartPeriodOptions = [
  { id: "2021-2025", label: "2021-2025" },
  { id: "2024-2028", label: "2024-2028" },
  { id: "2020-2024", label: "2020-2024" },
] as const;

export const streamSeries = [
  { key: "seed", label: "Seed Inspection", color: "var(--stream-seed)" },
  {
    key: "slaughterhouse",
    label: "Slaughterhouse",
    color: "var(--stream-slaughterhouse)",
  },
  {
    key: "agrochemical",
    label: "Agrochemical",
    color: "var(--stream-agrochemical)",
  },
  {
    key: "producer",
    label: "Seed Producer",
    color: "var(--stream-seed-producer)",
  },
] as const;

export const unitInspections = [
  {
    reference: "FPU-2026-0142",
    facility: "Nkurunziza J. — Field 04",
    stream: "Seed Inspection",
    district: "Gasabo",
    inspector: "Jean d'Amour",
    scheduled: "04 Aug 2026",
    status: "ongoing",
  },
  {
    reference: "FPU-2026-0143",
    facility: "Nyabugogo Small Abattoir Ltd",
    stream: "Slaughterhouse",
    district: "Nyarugenge",
    inspector: "Jean d'Amour",
    scheduled: "05 Aug 2026",
    status: "not-started",
  },
  {
    reference: "FPU-2026-0138",
    facility: "Kaneza Agro Supplies",
    stream: "Agrochemical",
    district: "Kicukiro",
    inspector: "Uwase Claire",
    scheduled: "01 Aug 2026",
    status: "completed",
  },
  {
    reference: "FPU-2026-0139",
    facility: "Mukamana Seed Co.",
    stream: "Seed Producer",
    district: "Musanze",
    inspector: "Habimana Eric",
    scheduled: "02 Aug 2026",
    status: "pending",
  },
  {
    reference: "FPU-2026-0140",
    facility: "Uwimana A. — Field 12",
    stream: "Seed Inspection",
    district: "Rwamagana",
    inspector: "Jean d'Amour",
    scheduled: "03 Aug 2026",
    status: "approved",
  },
] as const;
