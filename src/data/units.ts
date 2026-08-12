import type { BusinessUnitKey } from "@/types";

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
  ccpu: {
    key: "ccpu",
    name: "Competition & Consumer Protection Unit",
    shortName: "Competition & Consumer",
    code: "CCPU",
  },
};

export const businessUnitList = Object.values(businessUnits);
