import { competitionConsumerProtectionContent } from "@/data/units/competition-consumer-protection";
import { farmProductsContent } from "@/data/units/farm-products";
import { importInspectionContent } from "@/data/units/import-inspection";
import { industriesMarketSurveillanceContent } from "@/data/units/industries-market-surveillance";
import { registrationLicensingContent } from "@/data/units/registration-licensing";
import type { UnitContentSpec } from "@/data/units/content-spec";
import type {
  ServiceDefinition,
  ServiceKey,
  UnitDefinition,
  UnitKey,
} from "@/types";

/** Every unit renders the same seven sections unless it says otherwise. */
const allSections: UnitDefinition["sections"] = [
  "workload",
  "progress",
  "facilities",
  "compliance",
  "activities",
  "sampling",
  "future-modules",
];

const farmProductsServices: ServiceDefinition[] = [
  {
    id: "seed",
    label: "Seed Inspection & Certification",
    shortLabel: "Seed",
    formCode: "FPU-FRM-013",
    description: "Field visits tracked across growth stages",
    icon: "seed",
    accent: "seed",
  },
  {
    id: "agrochemical",
    label: "Agrochemical Dealership Licensing",
    shortLabel: "Agrochemical",
    formCode: "FPU-FRM-099",
    description: "Dealer premises checklist",
    icon: "agrochemical",
    accent: "agrochemical",
  },
  {
    id: "slaughterhouse",
    label: "Slaughterhouse Inspection",
    shortLabel: "Slaughterhouse",
    formCode: "FPU-FRM-007",
    description: "Facility checklist by classification",
    icon: "slaughterhouse",
    accent: "slaughterhouse",
  },
  {
    id: "butchery",
    label: "Butchery Inspection",
    shortLabel: "Butchery",
    formCode: "FPU-FRM-041",
    description: "Retail meat premises checklist",
    icon: "butchery",
    accent: "seed-producer",
  },
  {
    id: "meat-carrier",
    label: "Meat Carrier Inspection",
    shortLabel: "Meat Carrier",
    formCode: "FPU-FRM-052",
    description: "Cold chain and vehicle hygiene checks",
    icon: "meat-carrier",
    accent: "accent",
  },
];

export const unitDefinitions: Record<UnitKey, UnitDefinition> = {
  "farm-products": {
    id: "farm-products",
    label: "Farm Products & Processes Inspection Unit",
    shortLabel: "Farm Products",
    icon: "seed",
    services: farmProductsServices,
    sections: allSections,
  },
  "registration-licensing": {
    id: "registration-licensing",
    label: "Registration & Licensing Unit",
    shortLabel: "Registration & Licensing",
    icon: "building",
    services: [],
    sections: allSections,
  },
  "industries-market-surveillance": {
    id: "industries-market-surveillance",
    label: "Industries & Market Surveillance Unit",
    shortLabel: "Market Surveillance",
    icon: "building",
    services: [],
    sections: allSections,
  },
  "import-inspection": {
    id: "import-inspection",
    label: "Import Inspection Unit",
    shortLabel: "Import Inspection",
    icon: "building",
    services: [],
    sections: allSections,
  },
  "competition-consumer-protection": {
    id: "competition-consumer-protection",
    label: "Competition & Consumer Protection Unit",
    shortLabel: "Consumer Protection",
    icon: "users",
    services: [],
    sections: allSections,
  },
};

export const unitList: UnitDefinition[] = Object.values(unitDefinitions);

/** Content specs, keyed by unit. */
export const unitContent: Partial<Record<UnitKey, UnitContentSpec>> = {
  "farm-products": farmProductsContent,
  "registration-licensing": registrationLicensingContent,
  "industries-market-surveillance": industriesMarketSurveillanceContent,
  "import-inspection": importInspectionContent,
  "competition-consumer-protection": competitionConsumerProtectionContent,
};

export function getUnit(id: UnitKey): UnitDefinition {
  return unitDefinitions[id];
}

export function isUnitKey(value: string): value is UnitKey {
  return value in unitDefinitions;
}

export function getService(
  unitId: UnitKey,
  serviceId: ServiceKey,
): ServiceDefinition | undefined {
  return unitDefinitions[unitId].services.find(
    (service) => service.id === serviceId,
  );
}
