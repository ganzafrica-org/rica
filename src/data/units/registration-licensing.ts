import type { UnitContentSpec } from "@/data/units/content-spec";

/**
 * Registration & Licensing Unit.
 *
 * The source doc specifies this unit at Director level only (Licensing
 * Overview, Application Trends, Application Types, Licensed Operators,
 * Geographic Distribution, Licensing Outcomes). The inspector view below is
 * derived from those sections: an inspector here verifies applicants and
 * licensed operators rather than running field inspections.
 */
export const registrationLicensingContent: UnitContentSpec = {
  unit: "rlu",
  services: {
    all: {
      facilityPrefixes: [
        "Kigali",
        "Musanze",
        "Rubavu",
        "Huye",
        "Nyagatare",
        "Muhanga",
      ],
      facilitySuffixes: [
        "Seed Producers Ltd",
        "Agro Dealers",
        "Butchery",
        "Meat Carriers Co.",
        "Electronics Traders",
        "Trading Company",
      ],
      classifications: [
        "Seed Producer",
        "Agrochemical Dealer",
        "Butchery",
        "Meat Carrier",
        "Used Electronics",
      ],
      workloadScale: 46,
      activities: [
        {
          id: "applications-by-category",
          title: "Applications Reviewed by Category",
          caption: "Operator category of applications handled",
          kind: "bar",
          categories: [
            "Seed Producers",
            "Agrochemical Dealers",
            "Butcheries",
            "Meat Carriers",
            "Used Electronics",
          ],
          scale: 22,
        },
        {
          id: "application-types",
          title: "First-time vs Renewal Applications",
          kind: "donut",
          categories: ["First-time", "Renewal"],
          scale: 34,
        },
      ],
      sampling: [
        {
          id: "documents-verified",
          title: "Supporting Documents Verified",
          kind: "bar",
          categories: [
            "Business Licence",
            "Tax Clearance",
            "Premises Proof",
            "Technical Staff",
          ],
          scale: 20,
        },
      ],
    },
  },

  futureModules: [
    {
      id: "renewal-reminders",
      label: "Automated Renewal Reminders",
      note: "Scope pending confirmation with the licensing team",
    },
    {
      id: "operator-register",
      label: "Consolidated Operator Register",
      note: "Awaiting agreed data-sharing rules across units",
    },
  ],
};
