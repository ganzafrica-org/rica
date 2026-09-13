import type { UnitContentSpec } from "@/data/units/content-spec";

/**
 * Farm Products & Processes Inspection Unit — four MIS subunits.
 *
 * Livestock covers the former slaughterhouse / butchery / meat-carrier
 * checklists plus feed, honey, and dairy premises. Seed covers producer
 * verification, field inspection, potato seed store, and sampling.
 */
export const farmProductsContent: UnitContentSpec = {
  unit: "fpu",
  services: {
    livestock: {
      facilityPrefixes: [
        "Nyabugogo",
        "Gikondo",
        "Musanze",
        "Rwamagana",
        "Huye",
        "Kimironko",
        "Nyagatare",
      ],
      facilitySuffixes: [
        "Abattoir",
        "Butchery",
        "Meat Transport",
        "Feed Depot",
        "Honey Centre",
        "Milk Collection",
      ],
      classifications: [
        "Slaughterhouse",
        "Butchery",
        "Meat Carrier",
        "Feed Retailer",
        "Feed Processing Unit",
        "Beekeeper Cooperative",
        "Honey Collection Center",
        "Honey Processing Unit",
        "Milk Collection Center",
        "Milk Kiosk",
        "MAP",
      ],
      workloadScale: 48,
      activities: [
        {
          id: "livestock-by-type",
          title: "Inspections by Facility Type",
          caption: "Livestock and premises visits in the selected period",
          kind: "bar",
          categories: [
            "Slaughterhouse",
            "Butchery",
            "Meat Carrier",
            "Feed",
            "Honey",
            "Dairy",
          ],
          scale: 22,
        },
        {
          id: "livestock-outcomes",
          title: "Inspection Outcomes",
          kind: "donut",
          categories: [
            "Quick registration",
            "Continue & correct",
            "Temporary closure",
            "Closure & relocation",
          ],
          scale: 28,
        },
      ],
      sampling: [],
    },

    "plant-warehouse": {
      facilityPrefixes: [
        "Kigali",
        "Musanze",
        "Rubavu",
        "Rusumo",
        "Huye",
        "Nyagatare",
      ],
      facilitySuffixes: [
        "Exporters Ltd",
        "Produce Warehouse",
        "Cold Store",
        "Packhouse",
        "Export Co.",
      ],
      classifications: [
        "Coffee",
        "Tea",
        "Fresh fruit",
        "Vegetables",
        "Cut flowers",
        "Chili",
      ],
      workloadScale: 32,
      activities: [
        {
          id: "consignments-by-decision",
          title: "Consignment Decisions",
          caption: "Phytosanitary export and warehouse inspections",
          kind: "donut",
          categories: [
            "Confirmed / Accepted All",
            "Laboratory Diagnosis",
            "Only [X] kgs Accepted",
            "Rejected All",
          ],
          scale: 24,
        },
        {
          id: "consignments-by-destination",
          title: "Consignments by Destination",
          kind: "bar",
          categories: ["UAE", "Netherlands", "UK", "Belgium", "Kenya"],
          scale: 16,
        },
      ],
      sampling: [
        {
          id: "pest-interceptions",
          title: "Pest / Disease Interceptions",
          kind: "bar",
          categories: [
            "Fruit fly",
            "False codling moth",
            "Thrips",
            "Bacterial wilt",
          ],
          scale: 10,
        },
      ],
    },

    seed: {
      facilityPrefixes: [
        "Kigali",
        "Musanze",
        "Huye",
        "Rwamagana",
        "Nyagatare",
        "Karongi",
      ],
      facilitySuffixes: [
        "Seed Cooperative",
        "Seed Farm",
        "Seed Producers Ltd",
        "Multiplication Site",
        "Potato Store",
      ],
      classifications: [
        "Producer Onsite Verification",
        "Field Inspection",
        "Potato Seed Store Inspection",
        "Seed Sampling",
      ],
      workloadScale: 42,
      activities: [
        {
          id: "fields-by-crop",
          title: "Fields Inspected by Crop",
          caption: "Field visits completed in the selected period",
          kind: "bar",
          categories: ["Maize", "Beans", "Soybean", "Wheat", "Irish Potato", "Rice"],
          scale: 24,
        },
        {
          id: "seed-decisions",
          title: "Field Inspection Decisions",
          kind: "donut",
          categories: ["Approved", "Downgraded", "Rejected", "Inspection ongoing"],
          scale: 30,
        },
      ],
      sampling: [
        {
          id: "samples-by-crop",
          title: "Samples Collected by Crop",
          kind: "bar",
          categories: ["Maize", "Beans", "Soybean", "Wheat", "Irish Potato"],
          scale: 18,
        },
        {
          id: "certification-type",
          title: "Sample Certification Type",
          kind: "donut",
          categories: ["National", "ISTA"],
          scale: 16,
        },
      ],
    },

    agrochemical: {
      facilityPrefixes: ["Kigali", "Rubavu", "Muhanga", "Nyagatare", "Huye"],
      facilitySuffixes: [
        "Agro Dealers",
        "Agrovet Ltd",
        "Farm Inputs Co.",
        "Agrochemical Depot",
        "Agri Supplies",
      ],
      classifications: [
        "Importer",
        "Distributor",
        "Retailer",
        "Manufacturer",
        "Exporter",
      ],
      workloadScale: 36,
      activities: [
        {
          id: "premises-by-dealer",
          title: "Premises Inspected by Dealer Category",
          caption: "Dealer premises visited in the selected period",
          kind: "bar",
          categories: [
            "Importer",
            "Exporter",
            "Retailer",
            "Distributor",
            "Manufacturer",
          ],
          scale: 20,
        },
        {
          id: "licensing-outcomes",
          title: "Licensing Outcomes",
          kind: "donut",
          categories: ["Qualifies for License", "Rejected"],
          scale: 26,
        },
      ],
      sampling: [
        {
          id: "product-samples",
          title: "Product Samples Collected by Category",
          kind: "bar",
          categories: [
            "Pesticides",
            "Fertilizers",
            "Seeds treatment",
            "Other",
          ],
          scale: 14,
        },
      ],
    },
  },

  futureModules: [
    {
      id: "sample-tat",
      label: "Average Sample Test Turnaround Time",
      note: "Not available — no result-issued date field in FPU-FRM-035/036 (Seed Sampling).",
    },
    {
      id: "informal-registration",
      label: "Registration Status — Informal / Unregistered",
      note: "Cannot be derived from applicant records; requires a separate field-survey dataset.",
    },
  ],
};
