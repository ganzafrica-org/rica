import type { UnitContentSpec } from "@/data/units/content-spec";

/**
 * Import Inspection Unit.
 *
 * No operational forms or datasets were reviewed for this unit in the source
 * doc. The content below is a plausible placeholder built from the unit's
 * mandate — inspection of consignments at points of entry — and should be
 * replaced once the real forms are shared.
 */
export const importInspectionContent: UnitContentSpec = {
  unit: "iiu",
  services: {
    all: {
      facilityPrefixes: [
        "Gatuna",
        "Rusumo",
        "Kagitumba",
        "Rubavu",
        "Kigali Logistics",
        "Bugesera",
      ],
      facilitySuffixes: [
        "Border Post",
        "Dry Port",
        "Bonded Warehouse",
        "Airport Cargo",
        "Customs Terminal",
      ],
      classifications: [
        "Land Border Post",
        "Airport Cargo",
        "Bonded Warehouse",
        "Dry Port",
      ],
      workloadScale: 44,
      activities: [
        {
          id: "consignments-by-entry",
          title: "Consignments Inspected by Point of Entry",
          caption: "Import consignments cleared in the selected period",
          kind: "bar",
          categories: [
            "Gatuna",
            "Rusumo",
            "Kagitumba",
            "Airport Cargo",
            "Dry Port",
          ],
          scale: 20,
        },
        {
          id: "consignment-decisions",
          title: "Consignment Decisions",
          kind: "donut",
          categories: ["Released", "Detained", "Re-exported", "Destroyed"],
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
