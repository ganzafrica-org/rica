import type { UnitContentSpec } from "@/data/units/content-spec";

/**
 * Farm Products & Processes Inspection Unit.
 *
 * Activities and sampling follow the source spec: Seed inspectors report fields
 * by crop and crop quality; agrochemical inspectors report premises by dealer
 * category and licensing outcomes; slaughterhouse by classification; butchery
 * and meat carrier by inspection outcome.
 */
export const farmProductsContent: UnitContentSpec = {
  unit: "farm-products",
  services: {
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
        "Agri Seed Co.",
      ],
      classifications: [
        "Seed Producer",
        "Seed Multiplier",
        "Seed Processor",
        "Seed Distributor",
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
          id: "crop-quality",
          title: "Crop Quality Assessment",
          caption: "Field quality rating at inspection",
          kind: "donut",
          categories: ["Excellent", "Good", "Fair", "Below Standard"],
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
          id: "samples-by-variety",
          title: "Samples Collected by Variety",
          kind: "bar",
          categories: ["RHM-1402", "SB-24", "Gasore", "Ngwinurare", "Kigega"],
          scale: 12,
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
          categories: ["Licensed", "Conditional", "Refused"],
          scale: 26,
        },
      ],
      sampling: [
        {
          id: "product-samples",
          title: "Product Samples Collected by Category",
          kind: "bar",
          categories: [
            "Fertilizers",
            "Pesticides",
            "Veterinary Drugs",
            "Animal Feeds",
          ],
          scale: 14,
        },
      ],
    },

    slaughterhouse: {
      facilityPrefixes: ["Nyabugogo", "Gikondo", "Musanze", "Rwamagana", "Huye"],
      facilitySuffixes: [
        "Abattoir",
        "Slaughterhouse",
        "Meat Processing Ltd",
        "Livestock Facility",
      ],
      classifications: ["Small", "Medium", "Large"],
      workloadScale: 28,
      activities: [
        {
          id: "slaughterhouses-by-classification",
          title: "Slaughterhouses Inspected by Classification",
          caption: "Facility size at time of inspection",
          kind: "bar",
          categories: ["Small", "Medium", "Large"],
          scale: 16,
        },
        {
          id: "slaughterhouse-outcomes",
          title: "Inspection Outcomes",
          kind: "donut",
          categories: ["Approved", "Corrective Action", "Rejected"],
          scale: 22,
        },
      ],
      sampling: [],
    },

    butchery: {
      facilityPrefixes: ["Kimironko", "Remera", "Nyamirambo", "Kicukiro", "Musanze"],
      facilitySuffixes: [
        "Butchery",
        "Meat Shop",
        "Fresh Meat Ltd",
        "Butchery & Grill",
      ],
      classifications: ["Standard", "Premium", "Market Stall"],
      workloadScale: 34,
      activities: [
        {
          id: "butcheries-inspected",
          title: "Butcheries Inspected by District",
          kind: "bar",
          categories: ["Gasabo", "Kicukiro", "Nyarugenge", "Musanze", "Rubavu"],
          scale: 18,
        },
        {
          id: "butchery-outcomes",
          title: "Inspection Outcomes",
          kind: "donut",
          categories: ["Approved", "Corrective Action", "Rejected"],
          scale: 24,
        },
      ],
      sampling: [],
    },

    "meat-carrier": {
      facilityPrefixes: ["RAB", "Kigali", "Eastern", "Northern", "Western"],
      facilitySuffixes: [
        "Meat Transport",
        "Cold Chain Ltd",
        "Carrier Services",
        "Logistics Co.",
      ],
      classifications: ["Refrigerated Van", "Insulated Truck", "Motorcycle Box"],
      workloadScale: 22,
      activities: [
        {
          id: "vehicles-inspected",
          title: "Vehicles Inspected by Type",
          kind: "bar",
          categories: ["Refrigerated Van", "Insulated Truck", "Motorcycle Box"],
          scale: 14,
        },
        {
          id: "carrier-outcomes",
          title: "Inspection Outcomes",
          kind: "donut",
          categories: ["Approved", "Corrective Action", "Rejected"],
          scale: 18,
        },
      ],
      sampling: [],
    },
  },

  futureModules: [
    {
      id: "controlled-plot",
      label: "Controlled Plot",
      note: "Form design pending clarification",
    },
    {
      id: "seed-sampling-report",
      label: "Seed Sampling Report",
      note: "Awaiting agreed reporting fields",
    },
    {
      id: "bean-data-collection",
      label: "Bean Data Collection Sheet",
      note: "Requires review before dashboard design",
    },
  ],
};
