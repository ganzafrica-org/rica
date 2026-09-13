import { farmProductsContent } from "@/data/units/farm-products";
import { importInspectionContent } from "@/data/units/import-inspection";
import { industriesMarketSurveillanceContent } from "@/data/units/industries-market-surveillance";
import { registrationLicensingContent } from "@/data/units/registration-licensing";
import type { UnitContentSpec } from "@/data/units/content-spec";
import type {
  BusinessUnitKey,
  ServiceDefinition,
  ServiceKey,
  UnitDefinition,
  UnitKey,
} from "@/types";

export type BusinessUnit = {
  key: BusinessUnitKey;
  name: string;
  shortName: string;
  code: string;
};

export const businessUnits: Record<BusinessUnitKey, BusinessUnit> = {
  fpu: {
    key: "fpu",
    name: "Farm Products & Processes Inspection Unit",
    shortName: "Farm Products",
    code: "FPU",
  },
  rlu: {
    key: "rlu",
    name: "Registration & Licensing Unit",
    shortName: "Registration & Licensing",
    code: "RLU",
  },
  imu: {
    key: "imu",
    name: "Industries & Market Surveillance Unit",
    shortName: "Market Surveillance",
    code: "IMU",
  },
  iiu: {
    key: "iiu",
    name: "Import Inspection Unit",
    shortName: "Import Inspection",
    code: "IIU",
  },
};

export const businessUnitList = Object.values(businessUnits);

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
    id: "livestock",
    label: "Livestock inspection",
    shortLabel: "Livestock",
    formCode: "FPU-FRM-007",
    description:
      "Slaughterhouse, butchery, meat carrier, feed, honey, and dairy premises",
    icon: "slaughterhouse",
    accent: "slaughterhouse",
  },
  {
    id: "plant-warehouse",
    label: "Plant and warehouse Inspection",
    shortLabel: "Plant & warehouse",
    formCode: "FPU-FRM-022",
    description: "Phytosanitary export and warehouse consignments",
    icon: "warehouse",
    accent: "seed-producer",
  },
  {
    id: "seed",
    label: "Seed Inspection",
    shortLabel: "Seed",
    formCode: "FPU-FRM-013",
    description:
      "Producer verification, field inspection, potato seed store, and sampling",
    icon: "seed",
    accent: "seed",
  },
  {
    id: "agrochemical",
    label: "Agrochemical Inspection",
    shortLabel: "Agrochemical",
    formCode: "RLU-FRM-099",
    description: "Agrochemical dealership licensing",
    icon: "agrochemical",
    accent: "agrochemical",
  },
];

/** Inspector/executive view of each unit, built on the businessUnits registry. */
export const unitDefinitions: Record<UnitKey, UnitDefinition> = {
  fpu: {
    id: "fpu",
    label: businessUnits.fpu.name,
    shortLabel: businessUnits.fpu.shortName,
    icon: "seed",
    services: farmProductsServices,
    sections: allSections,
  },
  rlu: {
    id: "rlu",
    label: businessUnits.rlu.name,
    shortLabel: businessUnits.rlu.shortName,
    icon: "building",
    services: [],
    sections: allSections,
  },
  imu: {
    id: "imu",
    label: businessUnits.imu.name,
    shortLabel: businessUnits.imu.shortName,
    icon: "building",
    services: [],
    sections: allSections,
  },
  iiu: {
    id: "iiu",
    label: businessUnits.iiu.name,
    shortLabel: businessUnits.iiu.shortName,
    icon: "building",
    services: [],
    sections: allSections,
  },
};

export const unitList: UnitDefinition[] = Object.values(unitDefinitions);

/** Content specs, keyed by unit. */
export const unitContent: Partial<Record<UnitKey, UnitContentSpec>> = {
  fpu: farmProductsContent,
  rlu: registrationLicensingContent,
  imu: industriesMarketSurveillanceContent,
  iiu: importInspectionContent,
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
