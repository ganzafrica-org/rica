import type { UnitContentSpec } from "@/data/units/content-spec";
import {
  iiuEntryOfficeCodes,
  iiuInspectionDecisions,
  iiuTinNumbers,
} from "@/data/iiu";

/**
 * Import Inspection Unit — consignment inspections at entry offices.
 */
export const importInspectionContent: UnitContentSpec = {
  unit: "iiu",
  services: {
    all: {
      facilityPrefixes: iiuEntryOfficeCodes.map((office) => office.label),
      facilitySuffixes: [""],
      classifications: iiuTinNumbers.map((tin) => tin.label),
      workloadScale: 44,
      activities: [
        {
          id: "consignments-by-entry",
          title: "Consignments Inspected by Point of Entry",
          caption: "By entry office code",
          kind: "bar",
          categories: iiuEntryOfficeCodes.map((office) => office.label),
          scale: 20,
        },
        {
          id: "consignment-decisions",
          title: "Inspection Decisions",
          kind: "donut",
          categories: iiuInspectionDecisions.map((decision) => decision.label),
          scale: 24,
        },
      ],
      sampling: [
        {
          id: "samples-by-commodity",
          title: "Samples Taken by Commodity",
          kind: "bar",
          categories: [
            "Agro Inputs",
            "Foodstuffs",
            "Animal Products",
            "Used Electronics",
          ],
          scale: 15,
        },
      ],
    },
  },

  futureModules: [
    {
      id: "import-form",
      label: "Import Inspection Checklist",
      note: "Inspection form not yet reviewed for this unit",
    },
    {
      id: "customs-integration",
      label: "Customs System Integration",
      note: "Data exchange with RRA to be scoped",
    },
  ],
};
