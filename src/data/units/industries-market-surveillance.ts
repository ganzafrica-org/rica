import type { UnitContentSpec } from "@/data/units/content-spec";

/**
 * Industries & Market Surveillance Unit.
 *
 * The source doc has no forms or datasets for this unit yet ("to be defined
 * following review of business processes"). The content below is a plausible
 * placeholder built from the unit's mandate — market surveillance of goods on
 * sale, product standards and labelling — and should be replaced once RICA
 * shares the real inspection forms.
 */
export const industriesMarketSurveillanceContent: UnitContentSpec = {
  unit: "imu",
  services: {
    all: {
      facilityPrefixes: [
        "Nyabugogo",
        "Kimironko",
        "Nyarugenge",
        "Musanze",
        "Rubavu",
        "Huye",
      ],
      facilitySuffixes: [
        "Market",
        "Supermarket",
        "Wholesale Depot",
        "Retail Outlet",
        "Manufacturing Plant",
      ],
      classifications: [
        "Manufacturer",
        "Wholesaler",
        "Retailer",
        "Open Market Trader",
      ],
      workloadScale: 38,
      activities: [
        {
          id: "industry-sme",
          title: "Industry/SME inspection",
          caption: "Assigned industry and SME inspections",
          kind: "bar",
          categories: [
            "Large industries",
            "Small & medium enterprises",
            "Micro enterprises",
          ],
          scale: 16,
        },
        {
          id: "market-surveillance",
          title: "Market surveillance",
          caption: "Assigned trading-centre inspections",
          kind: "bar",
          categories: [
            "Boutique",
            "Supermarket",
            "Wholesale shop",
            "Open market stall",
            "Hardware",
          ],
          scale: 18,
        },
        {
          id: "service-provisions",
          title: "Service provisions",
          caption: "Assigned service-provision inspections",
          kind: "bar",
          categories: [
            "Garage",
            "Car wash",
            "Welding",
            "Salon",
            "Pharmacy",
          ],
          scale: 14,
        },
      ],
      sampling: [
        {
          id: "product-samples",
          title: "Product Samples Taken by Category",
          kind: "bar",
          categories: [
            "Food & Beverage",
            "Cosmetics",
            "Textiles",
            "Electronics",
            "Building Materials",
          ],
          scale: 14,
        },
      ],
    },
  },

  futureModules: [
    {
      id: "surveillance-form",
      label: "Market Surveillance Checklist",
      note: "Inspection form not yet shared for this unit",
    },
    {
      id: "product-recall",
      label: "Product Recall Tracking",
      note: "Process to be defined with the unit",
    },
  ],
};
