import type { UnitContentSpec } from "@/data/units/content-spec";

/**
 * Competition & Consumer Protection Unit.
 *
 * No operational forms or datasets were reviewed for this unit in the source
 * doc. The content below is a plausible placeholder built from the unit's
 * mandate — consumer complaints, unfair trade practices and competition
 * cases — and should be replaced once the real processes are shared.
 */
export const competitionConsumerProtectionContent: UnitContentSpec = {
  unit: "ccpu",
  services: {
    all: {
      facilityPrefixes: [
        "Kigali",
        "Musanze",
        "Rubavu",
        "Huye",
        "Rwamagana",
        "Muhanga",
      ],
      facilitySuffixes: [
        "Retail Group",
        "Telecom Agent",
        "Financial Services",
        "Trading Company",
        "Service Provider",
      ],
      classifications: [
        "Retail & Trade",
        "Telecommunications",
        "Financial Services",
        "Transport",
        "Utilities",
      ],
      workloadScale: 32,
      activities: [
        {
          id: "cases-by-sector",
          title: "Cases Handled by Sector",
          caption: "Complaints and investigations assigned to you",
          kind: "bar",
          categories: [
            "Retail & Trade",
            "Telecoms",
            "Financial Services",
            "Transport",
            "Utilities",
          ],
          scale: 16,
        },
        {
          id: "case-resolution",
          title: "Case Resolution Outcomes",
          kind: "donut",
          categories: [
            "Resolved",
            "Mediation",
            "Referred",
            "Dismissed",
          ],
          scale: 18,
        },
      ],
      sampling: [
        {
          id: "practice-checks",
          title: "Trade Practice Checks Conducted",
          kind: "bar",
          categories: [
            "Pricing Display",
            "Contract Terms",
            "Advertising Claims",
            "Warranty Handling",
          ],
          scale: 13,
        },
      ],
    },
  },

  futureModules: [
    {
      id: "complaints-intake",
      label: "Consumer Complaints Intake Form",
      note: "Process not yet reviewed for this unit",
    },
    {
      id: "competition-cases",
      label: "Competition Case File",
      note: "Case workflow to be defined with the unit",
    },
  ],
};
