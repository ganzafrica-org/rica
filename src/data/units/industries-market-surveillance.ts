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
  unit: "industries-market-surveillance",
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
          id: "outlets-by-type",
          title: "Outlets Inspected by Type",
          caption: "Premises visited during market surveillance",
          kind: "bar",
          categories: [
            "Supermarket",
            "Wholesale Depot",
            "Retail Outlet",
            "Open Market",
            "Manufacturing Plant",
          ],
          scale: 18,
        },
        {
          id: "non-compliance-type",
          title: "Non-compliance by Type",
          kind: "donut",
          categories: [
            "Labelling",
            "Expired Goods",
            "Substandard Quality",
            "Unregistered Product",
          ],
          scale: 16,
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
