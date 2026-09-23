/** Shared Import Inspection Unit vocabulary — director filters and inspector tables. */

export const iiuEntryOfficeCodes = [
  { id: "11gi", label: "11GI" },
  { id: "11-gis", label: "11 GIS" },
  { id: "11-gia", label: "11 GIA" },
  { id: "11-sdv", label: "11 SDV" },
  { id: "11dpw", label: "11DPW" },
  { id: "bisct", label: "BISCT" },
  { id: "kemba", label: "KEMBA" },
  { id: "kesct", label: "KESCT" },
  { id: "tzdl", label: "TZDL" },
  { id: "tzsct", label: "TZSCT" },
  { id: "ugsct", label: "UGSCT" },
] as const;

export const iiuInspectionDecisions = [
  { id: "normal-release", label: "Normal release" },
  { id: "released-under-seal", label: "Released under seal" },
  { id: "rejection", label: "Rejection" },
  { id: "released-with-warning", label: "Released with warning" },
  { id: "sampling", label: "Sampling" },
] as const;

export const iiuHsCodes = [
  { id: "1006-30", label: "1006.30" },
  { id: "1511-90", label: "1511.90" },
  { id: "2203-00", label: "2203.00" },
  { id: "3102-10", label: "3102.10" },
  { id: "8471-30", label: "8471.30" },
  { id: "8703-23", label: "8703.23" },
] as const;

export const iiuTinNumbers = [
  { id: "102345678", label: "102345678" },
  { id: "103456789", label: "103456789" },
  { id: "104567890", label: "104567890" },
  { id: "105678901", label: "105678901" },
  { id: "106789012", label: "106789012" },
] as const;

export const iiuOfficeAliases: Record<string, string[]> = Object.fromEntries(
  iiuEntryOfficeCodes.map((office) => [
    office.id,
    [office.label.toLowerCase(), office.id.replace(/-/g, " ")],
  ]),
);

export const iiuDecisionAliases: Record<string, string[]> = {
  "normal-release": ["normal release"],
  "released-under-seal": ["released under seal", "rus"],
  rejection: ["rejection", "rejected"],
  "released-with-warning": [
    "released with warning",
    "warned",
    "warning",
    "warn",
  ],
  sampling: ["sampling", "control sample"],
};

export const iiuStackedDecisionSeries = [
  {
    key: "release",
    label: "Normal release",
    color: "var(--stream-seed)",
  },
  {
    key: "seal",
    label: "Released under seal",
    color: "var(--stream-agrochemical)",
  },
  {
    key: "rejection",
    label: "Rejection",
    color: "var(--danger)",
  },
  {
    key: "warning",
    label: "Released with warning",
    color: "var(--stream-seed-producer)",
  },
  {
    key: "sampling",
    label: "Sampling",
    color: "var(--stream-slaughterhouse)",
  },
] as const;

export const iiuDecisionColors = [
  "var(--stream-seed)",
  "var(--stream-agrochemical)",
  "var(--danger)",
  "var(--stream-seed-producer)",
  "var(--stream-slaughterhouse)",
] as const;

export type IiuConsignmentRow = {
  id: string;
  office: string;
  product: string;
  hsCode: string;
  tin: string;
  origin: string;
  decision: string;
  inspector: string;
  assignedOn: string;
  status: "pending" | "completed" | "not-started" | "ongoing";
};

export const iiuConsignments: IiuConsignmentRow[] = [
  {
    id: "iiu-1",
    office: "11GI",
    product: "Rice (semi-milled)",
    hsCode: "1006.30",
    tin: "102345678",
    origin: "India",
    decision: "Normal release",
    inspector: "Inspector Ange",
    assignedOn: "04 Aug 2026",
    status: "completed",
  },
  {
    id: "iiu-2",
    office: "11 GIS",
    product: "Palm oil",
    hsCode: "1511.90",
    tin: "103456789",
    origin: "UAE",
    decision: "Released with warning",
    inspector: "Inspector Bruno",
    assignedOn: "11 Aug 2026",
    status: "completed",
  },
  {
    id: "iiu-3",
    office: "11 GIA",
    product: "Beer",
    hsCode: "2203.00",
    tin: "104567890",
    origin: "Kenya",
    decision: "Sampling",
    inspector: "Inspector Carine",
    assignedOn: "22 Aug 2026",
    status: "ongoing",
  },
  {
    id: "iiu-4",
    office: "11 SDV",
    product: "Urea fertilizer",
    hsCode: "3102.10",
    tin: "105678901",
    origin: "China",
    decision: "Released under seal",
    inspector: "Inspector Delphin",
    assignedOn: "01 Sep 2026",
    status: "pending",
  },
  {
    id: "iiu-5",
    office: "11DPW",
    product: "Portable computers",
    hsCode: "8471.30",
    tin: "106789012",
    origin: "EU",
    decision: "Rejection",
    inspector: "Inspector Eliane",
    assignedOn: "28 Jul 2026",
    status: "completed",
  },
  {
    id: "iiu-6",
    office: "BISCT",
    product: "Passenger vehicles",
    hsCode: "8703.23",
    tin: "102345678",
    origin: "China",
    decision: "Normal release",
    inspector: "Inspector Fabrice",
    assignedOn: "08 Sep 2026",
    status: "not-started",
  },
  {
    id: "iiu-7",
    office: "KEMBA",
    product: "Rice (semi-milled)",
    hsCode: "1006.30",
    tin: "103456789",
    origin: "India",
    decision: "Sampling",
    inspector: "Inspector Giselle",
    assignedOn: "06 Sep 2026",
    status: "pending",
  },
  {
    id: "iiu-8",
    office: "KESCT",
    product: "Palm oil",
    hsCode: "1511.90",
    tin: "104567890",
    origin: "UAE",
    decision: "Released with warning",
    inspector: "Inspector Hubert",
    assignedOn: "16 Aug 2026",
    status: "completed",
  },
  {
    id: "iiu-9",
    office: "TZDL",
    product: "Beer",
    hsCode: "2203.00",
    tin: "105678901",
    origin: "Kenya",
    decision: "Normal release",
    inspector: "Inspector Ineza",
    assignedOn: "03 Sep 2026",
    status: "ongoing",
  },
  {
    id: "iiu-10",
    office: "UGSCT",
    product: "Urea fertilizer",
    hsCode: "3102.10",
    tin: "106789012",
    origin: "China",
    decision: "Rejection",
    inspector: "Inspector Jules",
    assignedOn: "10 Sep 2026",
    status: "pending",
  },
];

export const iiuAssignedTableCopy = {
  pageTitle: "Assigned Inspections",
  navLabel: "Assigned Inspections",
  navShortLabel: "Inspections",
  tableTitle: "Assigned Inspections",
  countTitle: (count: number) => `${count} inspections`,
  emptyMessage: "No inspections assigned for this selection.",
  ariaLabel: "Assigned inspections",
  columns: {
    name: "Entry office code",
    classification: "TIN number",
    district: "HS code",
    status: "Inspection status",
  },
} as const;
